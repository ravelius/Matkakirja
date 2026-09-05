/*
 * ELÄVÄ LIEKKIVALO (js/aikajana-valo.js) JA SEN KYTKENTÄ MOOTTORIIN.
 *
 * Omistaja 5.9.2026 klo 00.45 työpöydältä, sanatarkasti: *"havainnekuvan
 * pitää häipyä kun kartan animaatio alkaa. samoin valopallo tuli nyt
 * jotenkin liikuen paikoilleen. saisiko valopallosta epäsäännöllisemmän
 * ja elävämmän muotoisen ja niin että se sykkisi kuin tulen liekki? …
 * valon syttyminenkin voisi olla animoitu niin että se hetken hehkuu
 * pienempänä ja sitten laajenee. keskiosa saisi olla kirkkaampi ja
 * sitten häipyä pidemmällä matkalla ja pehmeämmin, mutta logaritmisesti
 * (tai ainakin melkein) aivan kuin oikea valo. valot voisivat myös olla
 * hieman erilaisia keskenään varioiden kirkkautta, kokoa,
 * värilämpötilaa ja muotoa. havainnekuvan teksti saisi olla vähän
 * pienempi ja ehkä hieman tummempi. pitäisikö vuosiluvun jälkeen olla
 * tähtisymboli? joku mikä sopisi tyylillisesti"* — ja klo 00.50:
 * *"vuosipalkin voisi yläreinassa siirtää vasempaan laitaan mutta ei
 * ihan kiinni."*
 *
 * NÄMÄ RIKKOUTUVAT HILJAA — mikään ei kaada mitään, vaan näkyy vasta
 * omistajan silmässä:
 *
 *   1. PROFIILI muuttuu lineaariseksi liukuväriksi (kirkas keskusta ja
 *      pitkä häntä katoavat) tai saa kovan reunan ruudun laidalle.
 *   2. SYTTYMINEN menettää vaiheensa: valo läväyttää kerralla täyteen
 *      kokoon, eikä kukaan huomaa ennen kuin ajo katsotaan.
 *   3. VARIAATIO lakkaa olemasta deterministinen, jolloin sama keksintö
 *      saa eri valon joka kierroksella (ja kuvakaappaukset valehtelevat).
 *   4. SIJAINTI alkaa liukua: css-siirtymä tai kirjaston tween palaa,
 *      ja valo tulee taas "liikkuen paikoilleen".
 *   5. HAVAINNEKUVA jää seisomaan, kun kamera lähtee — juuri se, mistä
 *      omistaja raportoi.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  VALON_ALKUKOKO, VALON_HEHKU_MS, VALON_KEHYSKATTO, VALON_LAAJENNUS_MS,
  VALON_PIIRTOVALI_MS, VALON_RUUTU_PX, VALON_SADE_PX, VALON_SYKE_HZ,
  VALON_SYKE_KIRKKAUS, VALON_SYKE_SADE, VALON_SYTTYMA_MS, VALON_VARIAATIO_KIRKKAUS,
  VALON_VARIAATIO_KOKO, VALON_YDIN_OSUUS,
  liekinSade, luoLiekkivalot, sykkeenTila, syttymisenVaihe, valonKohina,
  valonProfiili, valonSavyt, valonVariaatio,
} from '../js/aikajana-valo.js';

const lue = (polku) => readFileSync(new URL(polku, import.meta.url), 'utf8');
const MOOTTORI = lue('../js/aikajana.js');
const VALO = lue('../js/aikajana-valo.js');
const CSS = lue('../css/aikajana.css');
const SW = lue('../sw.js');

/* ══════════════════════════════════════════════════════════════════
 * 1. PROFIILI: kirkas keskusta, pitkä pehmeä häntä, ei lineaarinen
 * ══════════════════════════════════════════════════════════════════ */

test('profiili laskee monotonisesti ykkösestä nollaan eikä jätä reunaviivaa', () => {
  assert.equal(valonProfiili(0), 1, 'keskusta ei ole täysi');
  assert.equal(valonProfiili(1), 0, 'laita ei ole nolla — reunaviiva jäisi näkyviin');
  let edellinen = Infinity;
  for (let i = 0; i <= 100; i += 1) {
    const arvo = valonProfiili(i / 100);
    assert.ok(arvo < edellinen, `profiili ei laske kohdassa ${i / 100}`);
    assert.ok(arvo >= 0 && arvo <= 1, `profiili ${arvo} ulkona väliltä 0…1`);
    edellinen = arvo;
  }
  // Ytimen reunalla noin puolet: 1 / (1 + 1) = 0,5 ennen normalisointia.
  const ytimessa = valonProfiili(VALON_YDIN_OSUUS);
  assert.ok(ytimessa > 0.45 && ytimessa < 0.53, `ytimen reunalla ${ytimessa}`);
});

test('vaimeneminen on likimain käänteinen neliö eikä suora viiva', () => {
  // Käänteinen neliö: etäisyyden kaksinkertaistuminen neljännestää
  // intensiteetin. Sallitaan 25 %, koska normalisointi (laidan arvon
  // vähennys) kaartaa hännän loppua.
  const lahi = valonProfiili(0.25);
  const kauko = valonProfiili(0.5);
  const suhde = (kauko * 4) / lahi;
  assert.ok(suhde > 0.75 && suhde < 1.25, `kaksinkertainen etäisyys ei neljännestä: ${suhde}`);
  // Lineaarinen liukuväri antaisi kohdassa 0,5 arvon 0,5 — tämä on
  // kaukana sen alla, ja juuri se on "kirkkaampi keskusta, pidempi häntä".
  assert.ok(valonProfiili(0.5) < 0.15, `puolivälissä ${valonProfiili(0.5)} — liian lineaarinen`);
  // Häntä ei kuitenkaan katoa: kolme neljäsosaa säteestä hehkuu vielä.
  assert.ok(valonProfiili(0.75) > 0.005, 'häntä katkeaa liian aikaisin');
});

test('värilämpötila kulkee lämpimästä oranssista vaaleaan kellertävään', () => {
  const lammin = valonSavyt(0);
  const vaalea = valonSavyt(1);
  assert.ok(vaalea.laita[2] > lammin.laita[2], 'vaalea pää ei ole sinisempi (kylmempi)');
  assert.ok(lammin.ydin[0] >= 250, 'ydin ei ole lähes valkoinen');
  // Puoliväli on aidosti välissä eikä hyppää päätepisteeseen.
  const keski = valonSavyt(0.5);
  assert.ok(keski.laita[2] > lammin.laita[2] && keski.laita[2] < vaalea.laita[2]);
});

/* ══════════════════════════════════════════════════════════════════
 * 2. SYTTYMINEN: ensin pieni kirkas hehku, sitten laajeneminen
 * ══════════════════════════════════════════════════════════════════ */

test('syttyminen hehkuu ensin pienenä ja kirkkaana, sitten laajenee täyteen', () => {
  assert.equal(syttymisenVaihe(0).kirkkaus, 0, 'valo on jo päällä ennen syttymistä');
  const hehku = syttymisenVaihe(VALON_HEHKU_MS / 2);
  assert.equal(hehku.vaihe, 'hehku');
  assert.ok(hehku.koko <= VALON_ALKUKOKO, `hehkuvaihe on liian iso: ${hehku.koko}`);
  assert.ok(hehku.kirkkaus > 1, 'hehkuvaihe ei ole täyttä kirkkaampi');

  const laajenee = syttymisenVaihe(VALON_HEHKU_MS + VALON_LAAJENNUS_MS / 2);
  assert.equal(laajenee.vaihe, 'laajenee');
  assert.ok(laajenee.koko > VALON_ALKUKOKO && laajenee.koko < 1);

  const valmis = syttymisenVaihe(VALON_SYTTYMA_MS);
  assert.deepEqual(valmis, { koko: 1, kirkkaus: 1, vaihe: 'palaa' });
  assert.equal(VALON_SYTTYMA_MS, VALON_HEHKU_MS + VALON_LAAJENNUS_MS);
  assert.equal(VALON_HEHKU_MS, 300, 'hehkuvaihe ei ole omistajan "hetken" mittainen');
  assert.equal(VALON_LAAJENNUS_MS, 900);

  // Koko kasvaa koko matkan: yhtään taaksepäin nykäisyä ei ole.
  let edellinen = -1;
  for (let ms = 0; ms <= VALON_SYTTYMA_MS; ms += 25) {
    const v = syttymisenVaihe(ms);
    assert.ok(v.koko >= edellinen, `koko pieneni kohdassa ${ms} ms`);
    edellinen = v.koko;
  }
  // Kirkkaus laskeutuu leimahduksesta täyteen: hehku on kirkkain hetki.
  assert.ok(syttymisenVaihe(VALON_HEHKU_MS).kirkkaus > syttymisenVaihe(VALON_SYTTYMA_MS).kirkkaus);
});

test('reduced motion: valo on heti täysi eikä sykettä lasketa', () => {
  assert.deepEqual(syttymisenVaihe(0, true), { koko: 1, kirkkaus: 1, vaihe: 'palaa' });
  assert.deepEqual(syttymisenVaihe(50, true), { koko: 1, kirkkaus: 1, vaihe: 'palaa' });
  const v = valonVariaatio(3);
  assert.deepEqual(sykkeenTila(1234, v, true), { sade: 1, kirkkaus: 1 });
  // Muoto on ajaton: sama kulma antaa saman säteen hetkestä riippumatta.
  assert.equal(liekinSade(1.2, 0, v, true), liekinSade(1.2, 9999, v, true));
  // Eikä kehyssilmukkaa käynnistetä lainkaan.
  assert.match(VALO, /if \(purettu \|\| silmukka \|\| reducedMotion\) return;/);
});

/* ══════════════════════════════════════════════════════════════════
 * 3. SYKE JA MUOTO: liekin epäsäännöllisyys, ei sinipumppua
 * ══════════════════════════════════════════════════════════════════ */

test('syke huojuu 5–10 % ja säde ja kirkkaus eri tahdissa', () => {
  const v = valonVariaatio(7);
  assert.ok(v.sykeHz >= VALON_SYKE_HZ[0] && v.sykeHz <= VALON_SYKE_HZ[1], `tahti ${v.sykeHz} Hz`);
  assert.ok(VALON_SYKE_SADE >= 0.05 && VALON_SYKE_SADE <= 0.1, 'sykkeen säde ei ole 5–10 %');
  assert.ok(VALON_SYKE_KIRKKAUS >= 0.05 && VALON_SYKE_KIRKKAUS <= 0.1);
  let eriTahdissa = 0;
  let vaihtelua = 0;
  let edellinen = null;
  for (let ms = 0; ms < 4000; ms += 40) {
    const s = sykkeenTila(ms, v);
    assert.ok(Math.abs(s.sade - 1) <= VALON_SYKE_SADE + 1e-9, `säde huojuu liikaa: ${s.sade}`);
    assert.ok(Math.abs(s.kirkkaus - 1) <= VALON_SYKE_KIRKKAUS + 1e-9);
    if (Math.abs((s.sade - 1) / VALON_SYKE_SADE - (s.kirkkaus - 1) / VALON_SYKE_KIRKKAUS) > 0.05) eriTahdissa += 1;
    if (edellinen !== null && Math.abs(s.sade - edellinen) > 1e-6) vaihtelua += 1;
    edellinen = s.sade;
  }
  assert.ok(eriTahdissa > 50, 'säde ja kirkkaus sykkivät yhtenä kappaleena');
  assert.ok(vaihtelua > 90, 'syke ei elä');
});

test('liekin reuna on epäsäännöllinen ja liikkuu hitaasti', () => {
  const v = valonVariaatio(11);
  assert.ok(v.harmoniat.length >= 2 && v.harmoniat.length <= 4, 'harmonioita ei ole 2–4');
  for (const h of v.harmoniat) assert.ok(h.k >= 2, 'harmoninen alle kahden vääntäisi valon sivuun');
  const sateet = [];
  for (let i = 0; i < 64; i += 1) sateet.push(liekinSade((i / 64) * Math.PI * 2, 0, v));
  const pienin = Math.min(...sateet);
  const suurin = Math.max(...sateet);
  assert.ok(suurin - pienin > 0.05, `reuna on liian pyöreä: vaihtelu ${suurin - pienin}`);
  assert.ok(pienin > 0.5 && suurin < 1.6, 'reuna karkaa käsistä');
  // Muoto elää ajassa, mutta hitaasti: sekunnissa muutos on pieni.
  const nyt = liekinSade(0.7, 0, v);
  const sekunnin = liekinSade(0.7, 1000, v);
  assert.notEqual(nyt, sekunnin, 'muoto ei liiku lainkaan');
  assert.ok(Math.abs(nyt - sekunnin) < 0.5, 'muoto hyppii');
});

test('kohina on pehmeää, toistettavaa ja välillä 0…1', () => {
  for (let x = 0; x < 20; x += 0.37) {
    const a = valonKohina(x, 3);
    assert.ok(a >= 0 && a <= 1, `kohina ${a} ulkona väliltä`);
    assert.equal(a, valonKohina(x, 3), 'kohina ei ole toistettava');
    assert.ok(Math.abs(a - valonKohina(x + 0.01, 3)) < 0.1, 'kohina hyppii');
  }
  assert.notEqual(valonKohina(1.5, 3), valonKohina(1.5, 4), 'siemen ei vaikuta kohinaan');
});

/* ══════════════════════════════════════════════════════════════════
 * 4. VARIAATIO: sama numero → sama valo, eri numero → eri valo
 * ══════════════════════════════════════════════════════════════════ */

test('variaatio on deterministinen ja pysyy omistajan rajoissa', () => {
  assert.deepEqual(valonVariaatio(5), valonVariaatio(5), 'sama pysäkki sai eri valon');
  assert.notDeepEqual(valonVariaatio(5), valonVariaatio(6), 'kaikki valot ovat samanlaisia');
  const kirkkaudet = [];
  const koot = [];
  const lammot = [];
  for (let n = 0; n < 25; n += 1) {
    const v = valonVariaatio(n);
    assert.ok(Math.abs(v.kirkkaus - 1) <= VALON_VARIAATIO_KIRKKAUS + 1e-9, `kirkkaus ${v.kirkkaus}`);
    assert.ok(Math.abs(v.koko - 1) <= VALON_VARIAATIO_KOKO + 1e-9, `koko ${v.koko}`);
    assert.ok(v.lampo >= 0 && v.lampo <= 1);
    kirkkaudet.push(v.kirkkaus);
    koot.push(v.koko);
    lammot.push(v.lampo);
  }
  // Kaikki neljä ulottuvuutta oikeasti vaihtelevat kaaren mitalla.
  assert.ok(Math.max(...kirkkaudet) - Math.min(...kirkkaudet) > 0.1);
  assert.ok(Math.max(...koot) - Math.min(...koot) > 0.15);
  assert.ok(Math.max(...lammot) - Math.min(...lammot) > 0.5);
  assert.equal(VALON_VARIAATIO_KIRKKAUS, 0.15, 'kirkkauden variaatio ei ole omistajan ±15 %');
  assert.equal(VALON_VARIAATIO_KOKO, 0.2, 'koon variaatio ei ole omistajan ±20 %');
});

/* ══════════════════════════════════════════════════════════════════
 * 5. KERROS: canvas, kehysbudjetti eikä yhtään sijainnin siirtoa
 * ══════════════════════════════════════════════════════════════════ */

/** Kirjaava 2D-konteksti: piirtokutsut talteen, ei selainta. */
function tynkaCanvas(kirjaus) {
  return (w, h) => {
    const canvas = {
      width: w, height: h, style: {}, className: '', maareet: {},
      setAttribute(nimi, arvo) { this.maareet[nimi] = arvo; },
      getContext() {
        return {
          canvas,
          globalAlpha: 1,
          globalCompositeOperation: 'source-over',
          fillStyle: null,
          scale(...a) { kirjaus.push(['scale', ...a]); },
          clearRect() { kirjaus.push(['clearRect']); },
          fillRect() { kirjaus.push(['fillRect']); },
          drawImage() { kirjaus.push(['drawImage']); },
          save() { kirjaus.push(['save']); },
          restore() { kirjaus.push(['restore']); },
          beginPath() {},
          moveTo() {},
          lineTo() { kirjaus.push(['lineTo']); },
          closePath() {},
          clip() { kirjaus.push(['clip']); },
          createRadialGradient() {
            const pysakit = [];
            kirjaus.push(['gradient', pysakit]);
            return { addColorStop: (t, vari) => pysakit.push([t, vari]) };
          },
        };
      },
    };
    return canvas;
  };
}

test('kerros antaa lampulle canvasin ja piirtää sen vasta syttyessä', () => {
  const kirjaus = [];
  const kerros = luoLiekkivalot({ luoCanvas: tynkaCanvas(kirjaus), kello: () => 1000 });
  assert.equal(kerros.tuettu, true);
  const el = kerros.lamppu(0);
  assert.ok(el, 'lamppu ei saanut canvasia');
  assert.equal(el.style.width, `${VALON_RUUTU_PX}px`, 'canvas ei ole ruutupikselimitassa');
  // Profiili maalataan KERRAN valoa kohti (gradientti + fillRect).
  assert.equal(kirjaus.filter((k) => k[0] === 'gradient').length, 1);
  const pysakit = kirjaus.find((k) => k[0] === 'gradient')[1];
  assert.ok(pysakit.length > 12, `liukuvärillä on vain ${pysakit.length} pysäkkiä — käyrä suoristuu`);
  assert.equal(pysakit[0][0], 0);
  assert.equal(pysakit.at(-1)[0], 1);

  kirjaus.length = 0;
  kerros.tila(0, true, true);
  assert.ok(kirjaus.some((k) => k[0] === 'clearRect'), 'kehystä ei tyhjennetä');
  // Syttymishetkellä kirkkaus on nolla (valo ei ole vielä syttynyt):
  // piirto kelataan puoli sekuntia eteenpäin.
  kirjaus.length = 0;
  kerros.piirra(1500);
  assert.ok(kirjaus.filter((k) => k[0] === 'drawImage').length >= 3, 'ydin, runko ja häntä eivät piirry');
  assert.ok(kirjaus.some((k) => k[0] === 'clip'), 'liekin muotoa ei maskata');
  assert.ok(kirjaus.filter((k) => k[0] === 'lineTo').length > 24, 'liekin reuna on liian karkea');
  // Yhtään sijainnin kirjoitusta ei ole: elementti pysyy siinä, mihin
  // kirjasto sen asetti (omistaja: "valopallo tuli liikkuen paikoilleen").
  assert.equal(el.style.left, undefined);
  assert.equal(el.style.top, undefined);
  assert.equal(el.style.transform, undefined);
  assert.equal(el.style.transition, undefined);
  kerros.pura();
});

test('kerros ei animoi sammunutta eikä ylitä kehysbudjettia', () => {
  const kirjaus = [];
  let kello = 0;
  const kerros = luoLiekkivalot({ luoCanvas: tynkaCanvas(kirjaus), kello: () => kello });
  for (let n = 0; n < 30; n += 1) kerros.lamppu(n);
  kirjaus.length = 0;
  // Yksikään ei pala: piirto ei tee mitään.
  assert.equal(kerros.piirra(0), 0);
  assert.equal(kirjaus.length, 0, 'sammunut lamppu piirretään turhaan');
  for (let n = 0; n < 30; n += 1) kerros.tila(n, true, n === 29);
  kello = 5000;
  assert.equal(kerros.piirra(5000), VALON_KEHYSKATTO, 'kehyskatto ei rajoita työtä');
  assert.equal(VALON_KEHYSKATTO, 25, 'katto ei vastaa kaaren 25 pysäkkiä');
  assert.ok(VALON_PIIRTOVALI_MS >= 30, '30 fps riittää liekille — tiheämpi on turhaa työtä');
  kerros.pura();
});

test('syttymishetki otetaan kerran eikä uudelleen nykyiseksi merkitseminen aloita alusta', () => {
  const kirjaus = [];
  let kello = 100;
  const kerros = luoLiekkivalot({ luoCanvas: tynkaCanvas(kirjaus), kello: () => kello });
  kerros.lamppu(0);
  kerros.tila(0, true, true);
  const alkoi = kerros.valot.get(0).alkoi;
  kello = 900;
  kerros.tila(0, true, true);
  assert.equal(kerros.valot.get(0).alkoi, alkoi, 'syttyminen alkoi uudestaan kesken palamisen');
  // Nykyisyyden menetys kirjataan: jälki hiipuu himmeäksi liu'ulla.
  kerros.tila(0, true, false);
  assert.equal(kerros.valot.get(0).sammui, 900);
  kerros.alusta();
  assert.equal(kerros.valot.get(0).palaa, false, 'Alusta ei sammuttanut valoa');
  kerros.pura();
  assert.equal(kerros.valot.size, 0, 'purku jätti valot muistiin');
});

test('ilman canvasia lamppu jää varapolulle eikä kaada ajoa', () => {
  const kerros = luoLiekkivalot({ luoCanvas: () => ({ }) });
  assert.equal(kerros.tuettu, false);
  assert.equal(kerros.lamppu(0), null, 'varapolku ei palauta nullia');
  kerros.tila(0, true, true);
  kerros.pura();
});

/* ══════════════════════════════════════════════════════════════════
 * 6. KYTKENTÄ MOOTTORIIN: valo syttyy paikallaan, ei liukua
 * ══════════════════════════════════════════════════════════════════ */

test('moottori pyytää lampun liekkikerrokselta ja purkaa sen ajon mukana', () => {
  assert.match(MOOTTORI, /import \{ luoLiekkivalot \} from '\.\/aikajana-valo\.js';/);
  assert.match(MOOTTORI, /this\.liekit = luoLiekkivalot\(\{ reducedMotion: this\.reducedMotion \}\);/);
  assert.match(MOOTTORI, /const liekki = this\.liekit\?\.lamppu\?\.\(i\);/);
  assert.match(MOOTTORI, /this\.liekit\?\.tila\(valo\.i, palaa, nykyinen\);/);
  assert.match(MOOTTORI, /this\.liekit\?\.pura\(\);/);
  // Vain pallolauta: kartan lamput ovat yhä svg:tä (kirjattu moduulissa).
  assert.match(VALO, /VAIN PALLOLAUTA/);
  assert.match(MOOTTORI, /rakennaValotPallolle\(\) \{[\s\S]{0,900}luoLiekkivalot/);
  // Moduuli kuuluu SHELLiin (offline) — sen tuo vain js/aikajana.js.
  assert.match(SW, /'\.\/js\/aikajana-valo\.js',/);
});

test('valo syttyy paikallaan: ei sijainnin siirtymää missään päässä', () => {
  // 1. Reikä ei liu'u lampusta toiseen (juurisyy, mitattu Chromiumilla).
  assert.match(MOOTTORI, /export const PALLON_REIAN_LIUKU_MS = 0;/);
  const siirto = MOOTTORI.match(/ {2}siirraReika\(valo\) \{[\s\S]*?\n {2}\}/)[0];
  assert.ok(!/requestAnimationFrame/.test(siirto), 'reikä liukuu taas kehys kerrallaan');
  assert.match(siirto, /this\.kalvo\.paivita\(maali\);/);
  // 2. Liekin canvasilla ei ole siirtymää eikä animaatiota.
  const liekki = CSS.match(/\.aikajana-valo-liekki \{[\s\S]*?\n\}/)[0];
  assert.ok(!/transition|animation|transform/.test(liekki), 'canvas sai css-liikkeen');
  // 3. Moduuli ei koske elementin paikkaan lainkaan.
  assert.ok(!/style\.(left|top|transform)/.test(VALO), 'moduuli siirtää elementtiä');
  // 4. Pallon merkin ainoa siirtymä on peittävyys (css/styles.css
  //    .pallolauta-merkki) — se on näkyvyyttä, ei paikkaa.
  const merkkiCss = lue('../css/styles.css').match(/\.pallolauta-merkki \{[\s\S]*?\n\}/)[0];
  assert.match(merkkiCss, /transition: opacity/);
  assert.ok(!/transition:[^;]*transform/.test(merkkiCss));
});

/* ══════════════════════════════════════════════════════════════════
 * 7. HAVAINNEKUVA HÄIPYY, KUN KAMERA LÄHTEE
 * ══════════════════════════════════════════════════════════════════ */

test('havainnekuva häipyy samalla hetkellä kuin kameran ennakoiva ajo alkaa', () => {
  // Häivytys lähtee ennakon kanssa samasta paikasta — ei omalla
  // ajastimella, joka voisi eriytyä kameran ajosta.
  const ennakko = MOOTTORI.match(/ {2}tarkistaKameraEnnakko\(tahti\) \{[\s\S]*?\n {2}\}/)[0];
  assert.match(ennakko, /this\.haivytaPaneeli\(\);[\s\S]*this\.ajaPysakille\(kohde,/);
  assert.match(MOOTTORI, / {2}haivytaPaneeli\(\) \{[\s\S]{0,320}classList\.add\('haipyy'\);/);
  // Uusi kuva nousee vasta syttymisessä: luokka poistuu paneelinvaihdossa.
  assert.match(MOOTTORI, /vaihdaPaneeli\(t\) \{[\s\S]*?classList\.remove\('haipyy'\);/);
  // Tauko ja Alusta eivät saa jättää paneelia näkymättömäksi.
  assert.match(MOOTTORI, / {2}pysayta\(\) \{[\s\S]*?paneeli\?\.classList\.remove\('haipyy'\)/);
  assert.match(MOOTTORI, / {2}alusta\(\) \{[\s\S]*?paneeli\.classList\.remove\('haipyy'\)/);
  // Kesto on 600 ms ja se on css:ssä samana lukuna.
  assert.match(MOOTTORI, /export const PANEELIN_ENNAKKOHAIVYTYS_MS = 600;/);
  assert.match(CSS, /opacity var\(--aikajana-ennakkohaivytys, 600ms\) ease;/);
  assert.match(CSS, /\.aikajana-ilmio\.haipyy \{ opacity: 0; \}/);
});

/* ══════════════════════════════════════════════════════════════════
 * 8. HAVAINNEKUVAN TEKSTI JA VUOSIPALKIN PAIKKA
 * ══════════════════════════════════════════════════════════════════ */

test('havainnekuvan teksti on pienempi, tummempi ja erotin on pelin oma merkki', () => {
  assert.match(MOOTTORI, /export const AIKAJANAN_EROTIN = '◈';/);
  assert.match(MOOTTORI, /solmu\('span', 'aikajana-erotin', AIKAJANAN_EROTIN\)/);
  // Erotin on koriste eikä tekstiä: ruudunlukija ohittaa sen.
  assert.match(MOOTTORI, /erotin\.setAttribute\('aria-hidden', 'true'\);/);
  const otsikko = CSS.match(/\.aikajana-ilmiokuvateksti-otsikko \{[\s\S]*?\n\}/)[0];
  const koko = otsikko.match(/font-size: clamp\(([\d.]+)rem, ([\d.]+)vw, ([\d.]+)rem\)/);
  assert.ok(koko, 'otsikon koko ei ole clamp');
  // 0,85 x entinen (0,95 / 2,4 / 1,35).
  assert.ok(Math.abs(Number(koko[1]) - 0.95 * 0.85) < 0.01, `pienin ${koko[1]}rem`);
  assert.ok(Math.abs(Number(koko[2]) - 2.4 * 0.85) < 0.01, `keskimitta ${koko[2]}vw`);
  assert.ok(Math.abs(Number(koko[3]) - 1.35 * 0.85) < 0.01, `suurin ${koko[3]}rem`);
  // Sävy on pergamentin tummaa kultaa, ei entinen lähes valkoinen.
  const teksti = CSS.match(/\.aikajana-ilmiokuvateksti \{[\s\S]*?\n\}/)[0];
  const vari = teksti.match(/color: #([0-9a-f]{6})/i)[1];
  assert.notEqual(vari.toLowerCase(), 'f1e3c2', 'teksti on yhä entinen vaalea');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(vari.slice(i, i + 2), 16));
  assert.ok(r < 0xf1 && g < 0xe3 && b < 0xc2, `sävy ${vari} ei ole entistä tummempi`);
  assert.ok(r > g && g > b, `sävy ${vari} ei ole kultainen`);
  // Erottimen oma asu: pieni, kultainen ja hieman kohotettu.
  const erotin = CSS.match(/\.aikajana-erotin \{[\s\S]*?\n\}/)[0];
  assert.match(erotin, /font-size: 0\.6em;/);
  assert.match(erotin, /color: var\(--kulta/);
  assert.match(erotin, /vertical-align: 0\.\d+em;/);
});

test('vuosipalkki on vasemmassa laidassa marginaalimuuttujalla, puhelimella keskellä', () => {
  const ylarivi = CSS.match(/\.aikajana-ylarivi \{[\s\S]*?\n\}/)[0];
  assert.match(ylarivi, /--aikajana-ylarivi-marginaali: 1\.25rem;/);
  assert.match(ylarivi, /left: var\(--aikajana-ylarivi-marginaali\);/);
  assert.ok(!/transform: translateX\(-50%\)/.test(ylarivi), 'palkki keskitetään yhä');
  assert.match(ylarivi, /top: 0\.6rem;/, 'pystysijainti muuttui');
  // Kapealla ruudulla (mitattu 390 x 844) palkki palaa keskelle.
  const puhelin = CSS.match(/@media \(max-width: 640px\) \{[\s\S]*?\n\}\n/)[0];
  assert.match(puhelin, /\.aikajana-ylarivi \{[\s\S]*?left: 50%;[\s\S]*?transform: translateX\(-50%\);/);
});

/* ══════════════════════════════════════════════════════════════════
 * 9. MITAT PYSYVÄT: valo on yhä saman kokoinen kuin ennen
 * ══════════════════════════════════════════════════════════════════ */

test('liekin mitat vastaavat entistä lamppua', () => {
  // MERKIN_SADE (7) x KAJON_SUHDE (7) = 49 — sama uloin säde kuin
  // vanhassa kajossa, jotta linssin yleisilme ei muutu.
  assert.equal(VALON_SADE_PX, 49);
  assert.match(MOOTTORI, /export const MERKIN_SADE = 7;/);
  assert.match(MOOTTORI, /export const KAJON_SUHDE = 7;/);
  // Ruutu on säteen ympärillä väljä: kokovariaatio ja syke eivät saa
  // leikata liekin laitaa suoraksi viivaksi.
  assert.ok(VALON_RUUTU_PX >= VALON_SADE_PX * 2 * 1.2, 'piirtoruutu on liian ahdas');
});
