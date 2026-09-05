import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

/*
 * PALLOLAUTA, VAIHE 3: MERKIT (omistaja 5.9.2026, kysymyskortin vastaus
 * 1: kaupunkien nimet pallolaudalla *"ELAVINA tekstielementteina
 * laattojen paalla (kuten Google Earth)"*; docs/moduulit/karttapallo.md
 * luku 7, rivi 3). Vartioi ladonnan säännöt ilman selainta:
 *
 *   1. RUUTULADONTA EI LIMITY: kahden nimen laatikot eivät leikkaa, eikä
 *      nimi leikkaa annettua varausta (elävä nosto) tai pelimerkin
 *      pinoa; katto pitää (≤ 40) ja tärkein ehdokas nimetään ensin.
 *   2. PISTE VAIN NIMEN KANSSA: lauta antaa pistekerrokselle vain nimetyt
 *      kaupungit (ja oman kaupungin, kehittäjän maailmanäkymässä kaikki).
 *   3. SAMA SÄÄNTÖ KAHDELLE LAUDALLE: laudan ladonta (lado) ja pallon
 *      ruutuladonta kulkevat saman sijoitusfunktion kautta, ja laudan
 *      ladonnan tulos on pysynyt tavu tavulta entisenä (vertailu
 *      tests/karttanimet.test.mjs kattaa arvot; tässä rakenne).
 *   4. POLTETUT NOSTOT LUETAAN PALLON OMASTA LUETTELOSTA (laatat.json
 *      nostotaso.nostot), jonka tools/tee-pallolaatat.mjs kirjoittaa.
 *   5. Sallitut kerrokset eivät kasvaneet (vaihe 3 ei tarvinnut uutta),
 *      ja uudet moduulit ovat SHELLissä.
 */

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

const {
  karttanimienKaupungit, ladoRuutunimet, karttanimienLadonta, KARTTANIMI_KOOT,
} = await import('../js/karttanimet.js');
const { MAAILMANKARTTA } = await import('../js/packs/maailmankartta.js');
const { NIMIEN_KATTO } = await import('../js/pallolauta/nimet.js');
const { PALLOLAUDAN_KERROKSET, HTML_MERKKIEN_KATTO } = await import('../js/pallolauta/lauta.js');
const { NOSTOJEN_KATTO } = await import('../js/pallolauta/nostot.js');
const { pallonNostotaso, lahdetaso } = await import('../tools/tee-pallolaatat.mjs');
const { laatatSaatavilla, pallonNostoOnPoltettu, pallonLaatoissaOnNostoja } = await import('../js/pallo.js');

const leikkaa = (a, b) => a.x0 < b.x1 && a.x1 > b.x0 && a.y0 < b.y1 && a.y1 > b.y0;

/**
 * Ruudun ehdokkaat kuten pallo ne antaa: kaupungit projisoituna
 * mittakaavalla `px` (CSS-pikseliä lautayksikköä kohti) ikkunaan, joka
 * on keskitetty kaupunkiin `keskus`, tärkeysjärjestyksessä (oma kaupunki
 * ensin, sitten laudan tärkeys, sitten lähin keskipistettä).
 */
function ehdokkaat(px, keskus, w, h, oma = keskus.id) {
  const ulos = [];
  for (const c of karttanimienKaupungit(MAAILMANKARTTA)) {
    const x = (c.x - keskus.x) * px + w / 2;
    const y = (c.y - keskus.y) * px + h / 2;
    if (x < -40 || y < -40 || x > w + 40 || y > h + 40) continue;
    ulos.push({
      c, x, y, tarkeys: c.tarkeys + (c.id === oma ? 1000 : 0), etaisyys: Math.hypot(x - w / 2, y - h / 2),
    });
  }
  return ulos.sort((a, b) => (b.tarkeys - a.tarkeys) || (a.etaisyys - b.etaisyys)
    || (a.c.nimi < b.c.nimi ? -1 : 1));
}

const ateena = MAAILMANKARTTA.cities.find((c) => c.id === 'ateena');
const lontoo = MAAILMANKARTTA.cities.find((c) => c.id === 'lontoo');

test('ruutuladonta: nimet eivät limity keskenään eivätkä varausten tai pinojen kanssa; katto pitää', () => {
  // Saapumisnäkymä Ateenassa (leveys 240 / 390 px), Euroopan yleiskuva
  // Lontoosta (leveys 2000) ja koko pallonpuolisko (leveys 12000).
  const nakymat = [
    { px: 390 / 240, keskus: ateena, w: 390, h: 844 },
    { px: 390 / 2000, keskus: lontoo, w: 390, h: 844 },
    { px: 834 / 12000, keskus: lontoo, w: 834, h: 1112 },
  ];
  for (const n of nakymat) {
    const e = ehdokkaat(n.px, n.keskus, n.w, n.h);
    // Elävä nosto Ateenan itäpuolella ja pelimerkkipino pisteen päällä.
    const varaukset = [{
      x0: n.w / 2 + 8, y0: n.h / 2 - 6, x1: n.w / 2 + 70, y1: n.h / 2 + 6,
    }];
    const pinot = [{
      x0: n.w / 2 - 16, y0: n.h / 2 - 36, x1: n.w / 2 + 16, y1: n.h / 2 + 4,
    }];
    const { nimiot, pudotettu } = ladoRuutunimet(e, { varaukset, pinot, katto: NIMIEN_KATTO });
    assert.ok(nimiot.length <= NIMIEN_KATTO, `katto: ${nimiot.length}`);
    assert.equal(nimiot.length + pudotettu, e.length, 'jokainen ehdokas on joko nimetty tai pudotettu');
    if (e.length) assert.equal(nimiot[0].c, e[0].c, 'tärkein ehdokas (oma kaupunki) saa nimensä ensimmäisenä');
    for (let i = 0; i < nimiot.length; i += 1) {
      for (let j = i + 1; j < nimiot.length; j += 1) {
        assert.ok(!leikkaa(nimiot[i].r, nimiot[j].r), `${nimiot[i].c.nimi} limittyy ${nimiot[j].c.nimi} (px ${n.px.toFixed(3)})`);
      }
      for (const v of varaukset) assert.ok(!leikkaa(nimiot[i].r, v), `${nimiot[i].c.nimi} peittää noston`);
      for (const v of pinot) assert.ok(!leikkaa(nimiot[i].r, v), `${nimiot[i].c.nimi} jää pelimerkin alle`);
      // Nimi on kiinni pisteessään: siirtymä on ruutupikseleitä, ei laudan.
      assert.ok(Math.hypot(nimiot[i].dx, nimiot[i].dy) < 90, `${nimiot[i].c.nimi} karkasi pisteestään`);
      assert.ok([KARTTANIMI_KOOT.isoKaupunki, KARTTANIMI_KOOT.kaupunki].includes(nimiot[i].koko));
      assert.equal(nimiot[i].tyylitys, 'small-caps', 'kohdekaupungin asu on harvennettu kapiteeli');
    }
  }
  // Koko pallonpuoliskolla katto rajaa: ehdokkaita on yli 40, nimiä ≤ 40.
  const koko = ehdokkaat(834 / 12000, lontoo, 834, 1112);
  assert.ok(koko.length > NIMIEN_KATTO, `ehdokkaita ${koko.length}`);
  assert.equal(ladoRuutunimet(koko, { katto: NIMIEN_KATTO }).nimiot.length, NIMIEN_KATTO);
  assert.equal(ladoRuutunimet(koko, { katto: 5 }).nimiot.length, 5, 'pienempi katto pienentää');
  assert.deepEqual(ladoRuutunimet([]), { nimiot: [], pudotettu: 0 });
});

test('piste vain nimen kanssa: pistekerros lukee nimettyjen joukon; kehittäjän maailmanäkymä näyttää kaikki', () => {
  const lauta = lue('../js/pallolauta/lauta.js');
  // Avauslennolla (vaihe 5b) pisteet ovat reitin kaksi päätä ja
  // lähtövalinnassa (aalto 3A) Lontoo + valittavat; muuten sääntö on
  // ennallaan: nimetty, oma kaupunki tai maailmanäkymä.
  assert.match(lauta, /if \(lento\) return lento\.nimet\.has\(k\.id\);/);
  assert.match(lauta, /const valinta = aloitusNakyvat\(\);\n\s+if \(valinta\) return valinta\.has\(k\.id\);/);
  assert.match(lauta, /return nimet\.nimetty\(k\.id\)\n\s+\|\| ui\.game\.cityOf\?\.\(\)\?\.id === k\.id\n\s+\|\| Boolean\(ui\.maailmanakyma\?\.\(\)\);/);
  assert.match(lauta, /const nakyvat = kaupungit\.filter\(pisteNakyy\);/);
  assert.match(lauta, /pallo\.pointsData\(\[\.\.\.valot, \.\.\.nakyvat, \.\.\.helmet\]\);/);
  // Napautus kilpailee vain näkyvistä merkeistä (fokusniput sääntö 9).
  assert.match(lauta, /if \(pisteNakyy\(k\)\) ehdokkaat\.push\(\{ laji: 'kaupunki'/);
  assert.match(lauta, /for \(const o of nostot\.osumat\(\)\) ehdokkaat\.push\(\{ laji: 'nosto'/);
  // Ladonta vain levossa: sama viive kuin laadun palautuksella.
  assert.match(lauta, /export const LADONNAN_LEPOVIIVE_MS = LAATU_LEPOVIIVE_MS;/);
  assert.match(lauta, /ohjaimet\.addEventListener\('change', pyydaLadonta\);/);
  assert.match(lauta, /lepoAjastin = setTimeout\(ladoLevossa, LADONNAN_LEPOVIIVE_MS\);/);
  // Nostot ensin, nimikatto laskee kun nostoja on; kokonaiskatto 60.
  assert.equal(HTML_MERKKIEN_KATTO, 60);
  assert.equal(NIMIEN_KATTO, 40);
  assert.equal(NOSTOJEN_KATTO, 40);
  assert.match(lauta, /Math\.min\(NIMIEN_KATTO, Math\.max\(0, HTML_MERKKIEN_KATTO - pelia - nostoTulos\.maara\)\)/);
  // Avauslento rajaa ehdokkaat kahteen nimeen ja lähtövalinta Lontooseen
  // ja valittaviin (nimet.js `vain`, aalto 3A).
  assert.match(lauta, /const vain = lento\?\.nimet \?\? aloitusNakyvat\(\);/);
  assert.match(lauta, /^ {6}vain,$/m);
  assert.match(lue('../js/pallolauta/nimet.js'), /if \(vain && !vain\.has\(k\.c\.id\)\) continue;/);
  // Kortti ankkuroidaan ruutupisteestä ja seuraa merkkiään levossa.
  assert.match(lauta, /osuma\.avaa\(ankkuri\(osuma\.lat, osuma\.lng\)\);/);
  assert.match(lauta, /if \(ui\.fokuskohdeAuki\?\.ankkuri\) asemoiFokuskohde\(ui\);/);
  assert.match(lue('../js/fokuskohteet.js'), /export function avaaFokuskohde\(ui, kohde, \{ ankkuri = null \} = \{\}\)/);
  // Sulkeva napautus ei avaa mitään uutta (omistaja 31.8.2026).
  assert.match(lauta, /if \(korttiOliAuki\) \{ korttiOliAuki = false; return; \}/);
  // Selitteen laskurit pallolta.
  assert.match(lauta, /ui\.karttavaloLaskuri = \(\) => nostot\.laskurit\(\);/);
  assert.match(lue('../js/karttavalot.js'), /const omat = ui\?\.karttavaloLaskuri\?\.\(\);/);
});

test('sama sääntö kahdelle laudalle: laudan ladonta ja ruutuladonta kulkevat samasta sijoitusfunktiosta', () => {
  const src = lue('../js/karttanimet.js');
  assert.equal((src.match(/sijoitaKaupunginNimi\(\{/g) ?? []).length, 3, 'määrittely + kaksi kutsujaa (lado, ladoRuutunimet)');
  assert.match(src, /const \{ este, vapaa, varaa \} = varausruudukko\(\);/);
  assert.match(src, /const \{ este, varaa \} = varausruudukko\(\);/);
  // Laudan ladonta pakottaa (kohdekaupunki ei putoa), pallo ei.
  assert.match(src, /c, x, y, pino: merkkiVaraus\(x, y\), este, varaa,\n\s+\}\);/);
  assert.match(src, /c, x, y, pino: pino\(x, y\), este, varaa, pakota: false,/);
  // Laudan ladonnan rakenne on entinen: kaikki kaupungit nimettyjä ja
  // pakotus kirjataan (tests/karttanimet.test.mjs vertaa arvot).
  const tulos = karttanimienLadonta(MAAILMANKARTTA, 1.88);
  // Jokainen kaupunki saa merkkinsä: nimi on oma tai maastoparin (Alpit).
  assert.equal(tulos.merkit.filter((m) => m.laji === 'kaupunki').length, 261);
  assert.equal(typeof tulos.pakotettu, 'number');
  // Nimen elementti käyttää samaa kirjasinta ja luokkia kuin kartta.
  const nimet = lue('../js/pallolauta/nimet.js');
  assert.match(nimet, /teksti\.style\.fontFamily = KARTTANIMI_FONTTI;/);
  assert.match(nimet, /'karttanimi karttanimi-kaupunki'/);
  assert.match(lue('../css/styles.css'), /\.pallolauta-nimi-siirto \{ transition: transform 250ms ease-in-out; \}/);
});

test('poltetut nostot luetaan pallon omasta luettelosta, jonka laattatyökalu kirjoittaa', async () => {
  // Työkalu: pyramidin nostotaso pallon tasoina (Z = z + 1).
  const luettelo = {
    nostotaso: {
      versio: '2026-09-04a', saanto: 'v11-limitys', tasot: [5, 6, 7], nostot: { delfoi: '17516f69', olympia: '079ff219' },
    },
  };
  const nt = pallonNostotaso(luettelo, 0, 8);
  assert.deepEqual(nt.tasot, [6, 7, 8]);
  assert.equal(lahdetaso(6), 5);
  assert.deepEqual(nt.nostot, luettelo.nostotaso.nostot);
  assert.equal(pallonNostotaso({}, 0, 7), null);
  assert.match(lue('../tools/tee-pallolaatat.mjs'), /nostotaso: pallonNostotaso\(luettelo, min, max\)/);
  // Pallo: ennen luetteloa mikään ei ole poltettu.
  assert.equal(pallonNostoOnPoltettu('delfoi'), false);
  assert.equal(pallonLaatoissaOnNostoja(), false);
  const ok = await laatatSaatavilla(async () => ({
    ok: true, json: async () => ({ tasot: { min: 0, max: 8 }, nostotaso: nt }),
  }));
  assert.deepEqual(ok, { tasot: { min: 0, max: 8 } }, 'luettelo palauttaa tasot (laattatasoMax)');
  assert.equal(pallonLaatoissaOnNostoja(), true);
  assert.equal(pallonNostoOnPoltettu('delfoi'), true, 'tunnus riittää');
  assert.equal(pallonNostoOnPoltettu('delfoi', '17516f69'), true, 'tiiviste täsmää');
  assert.equal(pallonNostoOnPoltettu('delfoi', 'muuttunut'), false, 'sisältö muuttui → elävänä');
  assert.equal(pallonNostoOnPoltettu('parnassos'), false);
  // Nostokerros kysyy pallon luetteloa, ei pyramidin.
  const nostot = lue('../js/pallolauta/nostot.js');
  assert.match(nostot, /import \{ pallonNostoOnPoltettu \} from '\.\.\/pallo\.js';/);
  assert.doesNotMatch(nostot, /laattapyramidi\.js/);
  assert.match(nostot, /maanKohdemerkit\(pack, iso, pohja, onPoltettu\)/);
  assert.match(nostot, /naapurienPoltetutMerkit\(ui, nakyva, onPoltettu\)/);
  // Elävä nosto: sama merkki ja nimiö kuin kartalla, poltettu vain osuma.
  assert.match(nostot, /piirraNostosymKartalle\(g, d\.kategoria, d\.nimioNakyy \? d\.nimi : '', d\.symLaji, d\.puoli \?\? 'oikea'\);/);
  assert.match(nostot, /osumat = \[\.\.\.naytetaan, \.\.\.nakyvat\.filter\(\(r\) => r\.poltettu\)\];/);
  // Kohtaamispiste samalla tuikkeella (css/fokusvirta.css).
  assert.match(nostot, /fokuspisteKuvio\(g\);/);
  assert.match(lue('../js/fokuspiste.js'), /export function fokuspisteKuvio\(g\)/);
});

test('sallitut kerrokset eivät kasvaneet; uudet moduulit ovat SHELLissä; pallolauta ei kutsu ui.js:n koukkuja', () => {
  // Nimet ja nostot eivät tarvinneet uutta kerrosta; polygonsData tuli
  // 5.9.2026 LINSSILLE (karttapallo.md luku 10.1), ei kartalle.
  assert.deepEqual(PALLOLAUDAN_KERROKSET, ['pointsData', 'htmlElementsData', 'pathsData', 'arcsData', 'polygonsData']);
  const sw = lue('../sw.js');
  for (const nimi of ['nimet', 'nostot']) {
    assert.match(sw, new RegExp(`'\\./js/pallolauta/${nimi}\\.js'`), `${nimi}.js puuttuu SHELListä`);
  }
  for (const nimi of ['nimet', 'nostot']) {
    const src = lue(`../js/pallolauta/${nimi}.js`);
    assert.ok(!src.includes("from '../ui.js'"), `${nimi}.js tuo ui.js:ää`);
    assert.ok(!/\.(labelsData|ringsData|polygonsData)\(/.test(src), `${nimi}.js piirtää karttaa kerroksena`);
  }
  // Merkkirekisteri: yksi html-kerros, osat, häivytys ulos ja pallon taakse luokilla.
  const merkit = lue('../js/pallolauta/merkit.js');
  assert.match(merkit, /el\.classList\.toggle\('pallolauta-takana', !nakyy\);/);
  assert.match(merkit, /d\.el\.classList\.add\('pallolauta-poistuu'\);/);
  assert.match(merkit, /aseta\('peli', lista, \{ haivyta: false \}\);/);
  const css = lue('../css/styles.css');
  assert.match(css, /\.pallolauta-merkki\.pallolauta-takana,\n\.pallolauta-merkki\.pallolauta-poistuu \{ opacity: 0; \}/);
  assert.match(css, /@keyframes pallolauta-ilmesty/);
  assert.match(css, /\.pallolauta-merkki \{ transition: none; animation: none; \}/);
});
