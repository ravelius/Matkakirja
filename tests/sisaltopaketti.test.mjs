/*
 * SISÄLTÖPAKETTI ÄMPÄRIIN — paketin skeema ja julkaisun versiointi.
 *
 * .github/workflows/vie-sisalto.yml vie jokaisesta main-mergestä
 * sisältöpaketin ämpäriin (sisalto/1/v<N>/ + uusin.json), ja natiivi peli
 * lukee sen (docs/raportit/sisallon-siirtoputki-20260923.md osa 5).
 * Työnkulku ajaa tämän testin ennen vientiä.
 *
 * Vartioidaan:
 *   1. paketti läpäisee skeemat (tools/vienti/validoi.mjs), myös
 *      kaupunkien 3D-proton pakolliset kentät (id, nimi, lat, lon, maa2);
 *   2. validaattori oikeasti hylkää rikkinäisen (ettei tarkistus ole tyhjä);
 *   3. versiointi: sama sisältö ei tee uutta versiota, muuttunut tekee,
 *      ja N lasketaan ämpärin suurimmasta versiosta (palautuksen jälkeen
 *      ei kirjoiteta olemassa olevan päälle);
 *   4. työnkulku kirjoittaa osoittimen vasta paketin jälkeen;
 *   5. skeema 1.2: kaupunkien tärkeys 0–3 (pääkaupungit ja aloitus 3) ja
 *      tiedostojen koot manifestissa;
 *   6. skeema 1.3: lehden web-riippuvuudet (web/lehti.json) ovat täydet ja
 *      tiivisteet vastaavat repon tiedostoja;
 *   7. skeema 1.4: matkustuksen hinnat (saannot) ja saapumishaut
 *      (saapuminen) vastaavat pelin omia vakioita ja funktioita;
 *   8. osa 2 (funktiot tunnisteiksi): kaupunkidatassa ei ole funktioita —
 *      pulmat nimeävät generaattorinsa, packien tekstit ovat pohjia;
 *   9. skeema 1.5: jokainen paketin funktio on luokiteltu
 *      (tools/vienti/logiikka.mjs), esilasketut vastaavat pelin funktioita.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

import { kokoaVienti, JUURI, SKEEMAVERSIO_TARKKA } from '../tools/vienti/vie-sisalto.mjs';
import { kokoaJulkaisu, tarkistaPaketti, paketinTiiviste, MIN_SOVELLUS } from '../tools/vienti/julkaise-sisalto.mjs';
import { validoiNimella } from '../tools/vienti/validoi.mjs';
import { ISO2 } from '../tools/vienti/iso2.mjs';
import { PAAKAUPUNGIT } from '../tools/vienti/paakaupungit.mjs';
import { PULMAGENERAATTORIT } from '../js/pulmageneraattorit.js';
import { taytaPohja } from '../js/tekstipohja.js';

const { tiedostot, manifest, nimiavaruudet } = await kokoaVienti();
const kaupungit = JSON.parse(tiedostot.get('kokoelmat/kaupungit.json'));
const JULKAISTU = '2026-09-23T12:00:00.000Z';

test('paketti läpäisee skeemat', () => {
  assert.deepEqual(tarkistaPaketti(tiedostot), []);
  assert.equal(JSON.parse(tiedostot.get('manifest.json')).skeemaversio, SKEEMAVERSIO_TARKKA);
});

test('kaupungeilla on 3D-proton pakolliset kentät ja jokaiselle maalle ISO2', () => {
  assert.equal(kaupungit.alkiot.length, 266);
  for (const k of kaupungit.alkiot) {
    assert.ok(k.id && k.nimi, k.id);
    assert.ok(Number.isFinite(k.lat) && Number.isFinite(k.lon), `${k.id}: lat/lon`);
    if (k.maa) assert.match(ISO2[k.maa] ?? '', /^[A-Z]{2}$/, `${k.maa}: ISO2 puuttuu tools/vienti/iso2.mjs:stä`);
    assert.equal(k.maa2, k.maa ? ISO2[k.maa] : null, k.id);
  }
  assert.equal(kaupungit.alkiot.find((k) => k.id === 'helsinki').maa2, 'FI');
});

test('skeema 1.2: tärkeys 0–3, pääkaupungit ja aloituskaupungit ovat 3', () => {
  const idt = new Map(kaupungit.alkiot.map((k) => [k.id, k]));
  for (const [maa, id] of Object.entries(PAAKAUPUNGIT)) {
    assert.ok(idt.has(id), `${maa}: ${id} ei ole laudalla (tools/vienti/paakaupungit.mjs)`);
    assert.equal(idt.get(id).maa, maa, `${id}: maa ${idt.get(id).maa}, taulussa ${maa}`);
    assert.equal(idt.get(id).tarkeys, 3, id);
  }
  const jakauma = [0, 0, 0, 0];
  for (const k of kaupungit.alkiot) {
    assert.ok(Number.isInteger(k.tarkeys) && k.tarkeys >= 0 && k.tarkeys <= 3, `${k.id}: tarkeys ${k.tarkeys}`);
    if (k.aloitus) assert.equal(k.tarkeys, 3, k.id);
    if (k.lentokentta) assert.ok(k.tarkeys >= 2, k.id);
    jakauma[k.tarkeys]++;
  }
  // Harvennus toimii vain, jos portaat oikeasti erottelevat.
  for (const n of jakauma) assert.ok(n >= 20, `tärkeysjakauma ${jakauma}`);
  assert.equal(idt.get('helsinki').tarkeys, 3);
  assert.equal(idt.get('washington'), undefined);
  assert.ok(validoiNimella({ ...kaupungit.alkiot[0], tarkeys: 4 }, 'kaupunki.schema.json').length);
});

test('skeema 1.2: manifestissa on jokaisen tiedoston koko tavuina', () => {
  const m = JSON.parse(tiedostot.get('manifest.json'));
  const koko = (polku) => Buffer.byteLength(tiedostot.get(polku));
  assert.equal(m.media.tavuja, koko(m.media.tiedosto));
  for (const r of [...m.kokoelmat, ...m.lisatiedostot, ...m.moduulit]) {
    assert.equal(r.tavuja, koko(r.tiedosto), r.tiedosto);
  }
  const { kokoelmat, ...ilman } = m;
  assert.ok(validoiNimella({ ...ilman, kokoelmat: kokoelmat.map(({ tavuja, ...k }) => k) }, 'manifest.schema.json').length);
});

test('validaattori hylkää rikkinäisen kaupungin ja osoittimen', () => {
  const hyva = kaupungit.alkiot[0];
  assert.deepEqual(validoiNimella(hyva, 'kaupunki.schema.json'), []);
  assert.ok(validoiNimella({ ...hyva, lat: 95 }, 'kaupunki.schema.json').length);
  assert.ok(validoiNimella({ ...hyva, maa2: 'fin' }, 'kaupunki.schema.json').length);
  const { id, ...ilmanId } = hyva;
  assert.ok(validoiNimella(ilmanId, 'kaupunki.schema.json').length);
  assert.ok(validoiNimella({ ...hyva, ylimaarainen: 1 }, 'kaupunki.schema.json').length);
  const { osoitin } = kokoaJulkaisu({ tiedostot, commit: 'abc1234', julkaistu: JULKAISTU });
  assert.ok(validoiNimella({ ...osoitin, polku: 'sisalto/2/v1/' }, 'osoitin.schema.json').length);
  assert.ok(validoiNimella({ ...osoitin, versio: 0 }, 'osoitin.schema.json').length);
});

test('ensimmäinen julkaisu on v1 ja osoitin kelpaa', () => {
  const j = kokoaJulkaisu({ tiedostot, commit: 'abc1234', appVersion: '2026-09-23.1200', julkaistu: JULKAISTU });
  assert.deepEqual(j.virheet, []);
  assert.equal(j.muuttui, true);
  assert.equal(j.versio, 1);
  assert.equal(j.osoitin.polku, 'sisalto/1/v1/');
  assert.equal(j.osoitin.edellinen, null);
  assert.deepEqual(j.osoitin.minSovellus, MIN_SOVELLUS);
  assert.equal(j.osoitin.sha256, paketinTiiviste(tiedostot));
});

test('sama sisältö ei tee uutta versiota, muuttunut tekee', () => {
  const eka = kokoaJulkaisu({ tiedostot, commit: 'abc1234', julkaistu: JULKAISTU }).osoitin;
  const sama = kokoaJulkaisu({ tiedostot, edellinen: eka, suurin: 1, commit: 'def5678', julkaistu: JULKAISTU });
  assert.equal(sama.muuttui, false);
  assert.equal(sama.versio, 1);

  const muutettu = new Map(tiedostot);
  const k = JSON.parse(muutettu.get('kokoelmat/kaupungit.json'));
  k.alkiot[0].nimi = `${k.alkiot[0].nimi} (muutettu)`;
  muutettu.set('kokoelmat/kaupungit.json', JSON.stringify(k));
  const toka = kokoaJulkaisu({ tiedostot: muutettu, edellinen: eka, suurin: 1, commit: 'def5678', julkaistu: JULKAISTU });
  assert.equal(toka.muuttui, true);
  assert.equal(toka.versio, 2);
  assert.equal(toka.osoitin.edellinen, 1);
  assert.notEqual(toka.osoitin.sha256, eka.sha256);
});

test('palautuksen jälkeen N lasketaan ämpärin suurimmasta versiosta', () => {
  // Osoitin palautettu v5:een, mutta ämpärissä on jo v7.
  const palautettu = { ...kokoaJulkaisu({ tiedostot, commit: 'abc1234', julkaistu: JULKAISTU }).osoitin, versio: 5, sha256: '0'.repeat(64) };
  const j = kokoaJulkaisu({ tiedostot, edellinen: palautettu, suurin: 7, commit: 'abc1234', julkaistu: JULKAISTU });
  assert.equal(j.versio, 8);
});

test('työnkulku vie paketin ennen osoitinta ja tarkistaa julkisen osoitteen välissä', () => {
  const yml = readFileSync(`${JUURI}/.github/workflows/vie-sisalto.yml`, 'utf8');
  const paketti = yml.indexOf('aws s3 sync "dist/sisalto/v$N"');
  const tarkistus = yml.indexOf('Tarkista paketti julkisesta osoitteesta');
  const osoitin = yml.indexOf('aws s3 cp dist/sisalto/uusin.json');
  assert.ok(paketti > 0 && tarkistus > paketti && osoitin > tarkistus);
  assert.match(yml, /node --test tests\/vienti\.test\.mjs tests\/sisaltopaketti\.test\.mjs/);
  assert.match(yml, /cancel-in-progress: false/);
});

test('työnkulun aws-sijoitukset kestävät bash -e:n', () => {
  // GitHub ajaa askeleet `bash -e`:llä: paljas `x=$(aws …)` lopettaa
  // askeleen hiljaa, kun aws palauttaa virheen (ensimmäinen ajo
  // 35850982363 kaatui puuttuvaan osoittimeen, 23.9.2026).
  const yml = readFileSync(`${JUURI}/.github/workflows/vie-sisalto.yml`, 'utf8');
  const sijoitukset = yml.split('\n')
    .filter((r) => !/^\s*#/.test(r) && /=\$\(\s*\{?\s*aws /.test(r));
  assert.ok(sijoitukset.length >= 2);
  for (const rivi of sijoitukset) {
    assert.ok(/if ! \w+=\$\(aws /.test(rivi) || /\|\| true/.test(rivi), `suojaamaton aws-sijoitus: ${rivi.trim()}`);
  }
});

test('skeema 1.3: lehden web-riippuvuudet WKWebView-kuorelle', () => {
  const m = JSON.parse(tiedostot.get('manifest.json'));
  const rivi = m.webNakymat.find((w) => w.nimi === 'lehti');
  assert.ok(rivi, 'manifest.webNakymat: lehti puuttuu');
  const lehti = JSON.parse(tiedostot.get(rivi.tiedosto));
  assert.deepEqual(validoiNimella(lehti, 'web-nakyma.schema.json'), []);
  const polut = new Set(lehti.moduulit.map((t) => t.polku));
  for (const p of ['js/main.js', 'js/ui.js', 'js/lehti.js', 'js/maalehti.js', 'js/packs/kulttuuri-kategoriat.js', 'js/media.js']) {
    assert.ok(polut.has(p), `${p} puuttuu lehden riippuvuuksista`);
  }
  assert.equal(lehti.sivu, 'index.html?lehti={kaupunki}');
  assert.deepEqual(lehti.sivut.map((t) => t.polku), ['index.html']);
  assert.ok(lehti.tyylit.some((t) => t.polku === 'css/styles.css'));
  // Tiivisteet vastaavat repoa: kuori voi tarkistaa hakemansa version.
  for (const t of [...lehti.moduulit, ...lehti.tyylit].slice(0, 40)) {
    const b = readFileSync(`${JUURI}/${t.polku}`);
    assert.equal(t.sha256, createHash('sha256').update(b).digest('hex'), t.polku);
    assert.equal(t.tavuja, b.length, t.polku);
  }
  assert.equal(lehti.tavuja.koodi, [...lehti.sivut, ...lehti.moduulit, ...lehti.tyylit].reduce((a, t) => a + t.tavuja, 0));
  assert.ok(validoiNimella({ ...lehti, moduulit: [{ polku: 'x.js', tavuja: 1 }] }, 'web-nakyma.schema.json').length);
});

test('skeema 1.4: matkustuksen hinnat ja sääntövakiot', async () => {
  const rules = await import('../js/rules.js');
  const game = await import('../js/game.js');
  const saannot = new Map(JSON.parse(tiedostot.get('kokoelmat/saannot.json')).alkiot.map((a) => [a.id, a]));
  for (const nimi of ['SEA_FEE', 'FLIGHT_PRICE', 'BUS_FARE']) {
    assert.equal(saannot.get(nimi).arvo, rules[nimi], nimi);
    assert.equal(saannot.get(nimi).moduuli, 'js/rules.js', nimi);
  }
  for (const nimi of ['START_MONEY', 'TURN_HOURS', 'RECORD_DAYS', 'HINT_PRICE']) {
    assert.equal(saannot.get(nimi).arvo, game[nimi], nimi);
  }
});

test('skeema 1.4: saapumishaut vastaavat pelin funktioita jokaisessa kaupungissa', async () => {
  const { MAAILMANKARTTA: P } = await import('../js/packs/maailmankartta.js');
  const { fokusvirtaKaupungille } = await import('../js/packs/fokusvirrat.js');
  const { kaupunginJuliste } = await import('../js/packs/julisteet.js');
  const { radioMaalle } = await import('../js/packs/radiot.js');
  const { vanhaTallenne } = await import('../js/packs/vanhat-aanet.js');
  const { hetketMaassa } = await import('../js/packs/historian-hetket.js');
  const rivit = JSON.parse(tiedostot.get('kokoelmat/saapuminen.json')).alkiot;
  assert.equal(rivit.length, P.cities.length);
  for (const r of rivit) {
    const maa = P.map.cityCountry?.[r.id] ?? null;
    assert.equal(r.maa, maa, r.id);
    assert.equal(r.fokusvirta !== null, Boolean(fokusvirtaKaupungille(r.id)), `${r.id}: fokusvirta`);
    assert.equal(r.juliste !== null, Boolean(kaupunginJuliste(r.id)), `${r.id}: juliste`);
    assert.deepEqual(r.radio, radioMaalle(maa), `${r.id}: radio`);
    assert.deepEqual(r.vanhaTallenne, vanhaTallenne(r.id, maa), `${r.id}: vanha tallenne`);
    assert.deepEqual(r.historianHetket, maa ? hetketMaassa(maa).map((h) => h.id) : [], `${r.id}: hetket`);
  }
  const rooma = rivit.find((r) => r.id === 'rooma');
  assert.equal(rooma.kaupunkilehti, 'rooma');
  assert.equal(rooma.paikallisaarteet, 'ITA');
});

/*
 * Kaupunkidata = packin export, jolla on cities-taulukko (laudat ja
 * lähdepackit), sekä pulmataulukot (*_PUZZLES). Natiivi lukee nämä
 * sisältöpaketista, joten niissä ei saa olla funktioita: logiikka nimetään
 * tunnisteella (pulma.generaattori → js/pulmageneraattorit.js) ja tekstit
 * ovat pohjia (js/tekstipohja.js). Generaattorirekisterit ovat logiikkaa
 * ja saavat olla funktioita.
 */
test('osa 2: kaupunkidatassa ei ole funktioita', () => {
  const tarkistetut = [];
  for (const m of manifest.moduulit.filter((x) => x.luokka === 'pack')) {
    const ns = nimiavaruudet.get(m.moduuli);
    for (const e of m.exportit) {
      const arvo = ns[e.nimi];
      const onKaupunkidata = (arvo && typeof arvo === 'object' && Array.isArray(arvo.cities))
        || /_PUZZLES$/.test(e.nimi);
      if (!onKaupunkidata) continue;
      tarkistetut.push(`${m.moduuli}#${e.nimi}`);
      assert.equal(e.funktioita, 0, `${m.moduuli}#${e.nimi}: ${e.funktioita} funktiota kaupunkidatassa — käytä tunnistetta (js/pulmageneraattorit.js) tai tekstipohjaa (js/tekstipohja.js)`);
    }
  }
  assert.ok(tarkistetut.includes('js/packs/maailmankartta.js#MAAILMANKARTTA'));
  assert.ok(tarkistetut.includes('js/packs/europe-puzzles.js#EUROPE_PUZZLES'));
  assert.ok(tarkistetut.length >= 12, tarkistetut.join(', '));
});

test('osa 2: pulmien generaattorit ja tekstipohjat', () => {
  const lauta = nimiavaruudet.get('js/packs/maailmankartta.js').MAAILMANKARTTA;
  const generoidut = lauta.puzzles.filter((p) => p.generaattori);
  assert.equal(generoidut.length, 11);
  for (const p of generoidut) assert.equal(typeof PULMAGENERAATTORIT[p.generaattori], 'function', p.id);
  for (const m of manifest.moduulit.filter((x) => x.luokka === 'pack')) {
    for (const arvo of Object.values(nimiavaruudet.get(m.moduuli))) {
      const t = arvo?.texts;
      if (!t || !Array.isArray(arvo.cities)) continue;
      assert.match(t.starFound, /\{name\}.*\{city\}/, `${m.moduuli}: starFound`);
      assert.match(t.winnerStar, /\{name\}.*\{money\}/, `${m.moduuli}: winnerStar`);
    }
  }
  assert.equal(taytaPohja(lauta.texts.winnerStar, { name: 'Fogg', money: 120 }),
    'Fogg toi unohdetun aarteen kotiin 120 punnan kanssa.');
  assert.equal(taytaPohja('{name} ja {tuntematon}', { name: 'A' }), 'A ja {tuntematon}');
});

test('skeema 1.5: jokainen paketin funktio on luokiteltu natiiville', async () => {
  const { LOGIIKKA } = await import('../tools/vienti/logiikka.mjs');
  const loydetyt = new Set();
  const kay = (o, polku, kohta) => {
    if (!o || typeof o !== 'object') return;
    if ('$funktio' in o) { loydetyt.add(`${kohta}${polku}`); return; }
    for (const [k, v] of Object.entries(o)) kay(v, `${polku}/${k}`, kohta);
  };
  for (const m of manifest.moduulit) {
    const { exportit } = JSON.parse(tiedostot.get(m.tiedosto));
    for (const [nimi, arvo] of Object.entries(exportit)) kay(arvo, '', `${m.moduuli}#${nimi}`);
  }
  for (const k of manifest.kokoelmat) {
    assert.ok(!tiedostot.get(k.tiedosto).includes('"$funktio"'), `kokoelmassa ${k.nimi} on funktio`);
  }
  const luetellut = new Set(Object.keys(LOGIIKKA));
  const puuttuvat = [...loydetyt].filter((k) => !luetellut.has(k));
  const vanhentuneet = [...luetellut].filter((k) => !loydetyt.has(k));
  assert.deepEqual(puuttuvat, [], 'uusi funktio paketissa: luokittele se tiedostoon tools/vienti/logiikka.mjs');
  assert.deepEqual(vanhentuneet, [], 'tools/vienti/logiikka.mjs:ssä on rivi funktiolle, jota ei enää ole');
  const lista = manifest.logiikka;
  assert.equal(lista.length, luetellut.size);
  for (const r of lista) {
    const vaadittu = { logiikka: 'tunniste', saanto: 'saanto', esilaskettu: 'esilaskettu', media: 'media' }[r.luokka];
    if (vaadittu) assert.ok(r[vaadittu], `${r.kohta}: ${vaadittu} puuttuu`);
  }
});

test('skeema 1.5: esilasketut ja suurennokset vastaavat pelin funktioita', async () => {
  const esi = JSON.parse(tiedostot.get('kokoelmat/esilasketut.json')).alkiot;
  const hae = (funktio, avain) => esi.find((r) => r.funktio === funktio && r.avain === avain)?.arvo;
  const { maanGenetiivi } = await import('../js/packs/maa-kategoriat.js');
  assert.equal(hae('maanGenetiivi', 'Alankomaat'), maanGenetiivi('Alankomaat'));
  assert.equal(hae('maanGenetiivi', 'Alankomaat'), 'Alankomaiden');
  const { HISTORIAN_HETKET, hetkenKuvat } = await import('../js/packs/historian-hetket.js');
  assert.deepEqual(hae('hetkenKuvat', HISTORIAN_HETKET[0].id), JSON.parse(JSON.stringify(hetkenKuvat(HISTORIAN_HETKET[0]))));
  assert.ok(hae('linssiSelite', 'topografia').length > 3);
  assert.equal(hae('pulmapiirrokset', 'kaikki').length, 11);
  const { valokuvaSuurennos } = await import('../js/packs/africa-valokuvat.js');
  const { VALOKUVAT_FLICKR } = await import('../js/packs/valokuvat-flickr.js');
  const kuvat = JSON.parse(tiedostot.get('media.json')).viitteet.filter((v) => v.laji === 'kuva-commons');
  let verrattu = 0;
  for (const v of kuvat) {
    // Rajatun Flickr-kuvan suurennos on repon oma rajaus; Nodessa peli ei
    // tiedä omaa kansiotaan, joten ne verrataan vain muotoon.
    if (VALOKUVAT_FLICKR.get(v.arvo)?.rajattu) { assert.match(v.suurennos, /assets\/valokuvat\/|_h\.jpg$/); continue; }
    assert.equal(v.suurennos, valokuvaSuurennos(v.arvo, 1600), v.arvo);
    verrattu++;
  }
  assert.ok(verrattu > 1000);
});

test('skeema 1.5: laatat-kokoelma on laudan tokens sellaisenaan', () => {
  const P = nimiavaruudet.get('js/packs/maailmankartta.js').MAAILMANKARTTA;
  const [rivi] = JSON.parse(tiedostot.get('kokoelmat/laatat.json')).alkiot;
  assert.equal(rivi.id, 'tokens');
  assert.deepEqual(rivi.data, JSON.parse(JSON.stringify(P.tokens)));
  assert.deepEqual(Object.keys(rivi.data), ['types', 'mannerTypes', 'counts']);
});

test('skeema 1.5: laudan pisteet ja reittien taitteet päätasolla (reittigeometria)', () => {
  const P = nimiavaruudet.get('js/packs/maailmankartta.js').MAAILMANKARTTA;
  const lontoo = kaupungit.alkiot.find((k) => k.id === 'lontoo');
  const c = P.cities.find((x) => x.id === 'lontoo');
  assert.deepEqual(lontoo.lauta, { x: c.x, y: c.y });
  const reitit = JSON.parse(tiedostot.get('kokoelmat/reitit.json')).alkiot;
  const lp = reitit.find((r) => r.a === 'lontoo' && r.b === 'pariisi');
  assert.deepEqual(lp.via, [[5894, 1353]]);
  assert.equal(lp.askelia, 3);
  assert.equal(reitit.filter((r) => r.via.length).length, P.edges.filter((e) => e.via).length);
  assert.ok(reitit.filter((r) => r.laji === 'lento').every((r) => r.askelia === null && r.via.length === 0));
});

test('skeema 1.6: aarteiden arvovälit, botin taito ja tapahtumakortit', async () => {
  const tokens = await import('../js/tokens.js');
  const ai = await import('../js/ai.js');
  const saannot = new Map(JSON.parse(tiedostot.get('kokoelmat/saannot.json')).alkiot.map((a) => [a.id, a]));
  assert.deepEqual(saannot.get('PIENI_AARRE_ARVO').arvo, tokens.PIENI_AARRE_ARVO);
  assert.deepEqual(saannot.get('ISO_AARRE_ARVO').arvo, tokens.ISO_AARRE_ARVO);
  assert.equal(saannot.get('BOT_SKILL').arvo, ai.BOT_SKILL);
  assert.ok(saannot.has('FORM_WEIGHTS'), 'litteä sääntörakenne');
  assert.ok(!saannot.has('TOKEN_TYPES') && !saannot.has('ASKERS'), 'sisäkkäinen sisältö ei ole sääntö');
  const { AFRICA } = await import('../js/packs/africa.js');
  const tapahtumat = JSON.parse(tiedostot.get('kokoelmat/tapahtumat.json')).alkiot;
  assert.equal(tapahtumat.length, AFRICA.events.length);
  assert.deepEqual(new Set(tapahtumat.map((t) => t.data.effect.kind)), new Set(['raha', 'kyyti', 'viive']));
});

test('skeema 1.7: linssiaineisto (maskit purkautuvat, osoitteet medialistassa)', async () => {
  const rivit = new Map(JSON.parse(tiedostot.get('kokoelmat/linssiaineisto.json')).alkiot.map((r) => [r.id, r]));
  const { puraMaamaski } = await import('../js/aikajana-virrat-laskenta.js');
  const maa = rivit.get('maamaski').data;
  const ruudut = puraMaamaski(maa.juoksut, maa.leveys * maa.korkeus);
  assert.equal(ruudut.reduce((a, x) => a + x, 0), 62064, 'maaruutujen määrä (ihmisen-matka-maamaski.js)');
  const ranta = rivit.get('rantamaski').data;
  assert.ok(puraMaamaski(ranta.juoksut, ranta.leveys * ranta.korkeus).some((x) => x === 1));
  const media = new Set(JSON.parse(tiedostot.get('media.json')).viitteet.map((v) => v.arvo));
  for (const url of [rivit.get('pilvet').data.url, rivit.get('astronautin-aanet').data.humina]) {
    assert.ok(media.has(url), `${url} puuttuu media.json:sta`);
  }
  assert.match(rivit.get('kertomus').data.manifesti, /^https:\/\/media\.matkakirja\.app\/.+\/puhe\/kertomus-manifesti\.json$/);
  assert.deepEqual(rivit.get('avauskynnykset').data.kynnykset.map((k) => k.tp), [400, 800, 1400, 2200]);
});

test('skeema 1.8: äänitaulut ja musiikkiketju vastaavat peliä', async () => {
  const rivit = JSON.parse(tiedostot.get('kokoelmat/aanitaulut.json')).alkiot;
  const id = new Map(rivit.map((r) => [r.id, r]));
  const { AANITEHOSTEET, REAL_SAMPLES } = await import('../js/sound.js');
  for (const nimi of AANITEHOSTEET) assert.ok(id.has(`tehoste:${nimi}`), nimi);
  assert.deepEqual(id.get('tehoste:dice').naytte, REAL_SAMPLES.dice);
  const { musiikkiketju } = await import('../js/musiikkivalitsin.js');
  assert.deepEqual(id.get('musiikkiketju:rooma').ketju, musiikkiketju('rooma', 'ITA'));
  assert.equal(rivit.filter((r) => r.laji === 'musiikkiketju').length, 266);
  assert.deepEqual(['jalan', 'laiva', 'lento'].filter((l) => !id.has(`siirtyma:${l}`)), []);
});

test('skeema 1.9: kuva- ja lippukysymykset pelin järjestyksessä, url kuten media.json', async () => {
  const { MAAILMANKARTTA: P } = await import('../js/packs/maailmankartta.js');
  const kuvat = JSON.parse(tiedostot.get('kokoelmat/kuvakysymykset.json')).alkiot;
  const jarjestys = P.cities.map((c) => c.id);
  const paikat = kuvat.map((k) => jarjestys.indexOf(k.kaupunki));
  assert.deepEqual(paikat, [...paikat].sort((a, b) => a - b), 'cities-järjestys');
  const media = new Map(JSON.parse(tiedostot.get('media.json')).viitteet.map((v) => [v.arvo, v]));
  for (const k of kuvat.slice(0, 50)) assert.equal(k.url, media.get(k.tiedosto)?.url, k.tiedosto);
  const liput = JSON.parse(tiedostot.get('kokoelmat/lippumaat.json')).alkiot;
  const odotus = Object.entries(P.map.countryShapes).filter(([, m]) => m.lippu && m.nimi).map(([iso]) => iso);
  assert.deepEqual(liput.map((l) => l.iso), odotus, 'countryShapes-järjestys (flagTargets)');
  assert.ok(liput.every((l) => /^https:\/\//.test(l.url)));
  const aineisto = new Map(JSON.parse(tiedostot.get('kokoelmat/pulmaaineisto.json')).alkiot.map((r) => [r.id, r]));
  const { KUUT } = await import('../js/packs/africa-puzzles.js');
  assert.deepEqual(aineisto.get('kuunvaiheet:KUUT').data, JSON.parse(JSON.stringify(KUUT)));
  assert.ok(aineisto.get('pylvaat:PYLVASKUVAT').data.every((k) => k.url && k.lahde));
});

test('skeema 1.9: luennat valmiilla ääniosoitteella', async () => {
  const rivit = new Map(JSON.parse(tiedostot.get('kokoelmat/luennat.json')).alkiot.map((r) => [r.id, r]));
  const { aaniUrl } = await import('../js/media.js');
  assert.equal(rivit.get('intro').url, aaniUrl('assets/audio/intro-puhe.mp3'));
  assert.match(rivit.get('intro').url, /\?v=2$/);
  const pariisi = rivit.get('matkakirja:pariisi');
  assert.ok(pariisi && /^https:\/\//.test(pariisi.url) && pariisi.teksti && pariisi.paikkarivi);
  assert.equal(rivit.size, 47);
  assert.ok([...rivit.values()].filter((r) => r.kesto).length >= 40, 'kestot Horatio-kuiteista');
});

test('skeema 1.9: luentojen aikaleimat ja Livian puheen cuet', async () => {
  const luennat = new Map(JSON.parse(tiedostot.get('kokoelmat/luennat.json')).alkiot.map((r) => [r.id, r]));
  const pariisi = luennat.get('matkakirja:pariisi');
  const { aikaleimojenOsoite } = await import('../js/luentareaktiot.js');
  assert.equal(pariisi.aikaleimat, aikaleimojenOsoite(pariisi.aanite));
  assert.ok(pariisi.aikaleimaTiedosto && tiedostot.has(pariisi.aikaleimaTiedosto), 'aikaleimat paketissa');
  assert.equal(JSON.parse(tiedostot.get(pariisi.aikaleimaTiedosto)).kaupunki, 'pariisi');
  const livia = JSON.parse(tiedostot.get('kokoelmat/livianpuhe.json')).alkiot;
  assert.equal(livia.length, 45);
  const ateena = livia.find((r) => r.id === 'ateena');
  const { livianAaniOsoite } = await import('../js/liviapuhe.js');
  assert.equal(ateena.aani, livianAaniOsoite('ateena', 2));
  assert.match(ateena.eleet, /^https:\/\/media\.matkakirja\.app\/.+livia-ateena-3\.eleet\.json(\?.*)?$/);
  assert.ok(ateena.cuet.length >= 3 && ateena.cuet.every((c) => c.ankkuri && c.tarkoitus));
});

test('skeema 1.9: offline-manifesti maittain (laatat, maasto, media, tavut)', async () => {
  const m = JSON.parse(tiedostot.get('manifest.json'));
  const o = JSON.parse(tiedostot.get(m.offline.tiedosto));
  assert.deepEqual(validoiNimella(o, 'offline.schema.json'), []);
  const { MAAILMANKARTTA: P } = await import('../js/packs/maailmankartta.js');
  const muodolliset = Object.entries(P.map.countryShapes).filter(([, v]) => v.renkaat?.length).map(([k]) => k);
  assert.deepEqual(Object.keys(o.maat).sort(), muodolliset.sort(), 'jokainen muodollinen maa');
  const fin = o.maat.FIN;
  assert.equal(fin.iso2, 'FI');
  assert.deepEqual(Object.keys(fin.rasteri), ['6', '7', '8']);
  assert.ok(fin.laattoja.rasteri > 0 && fin.tavuja.yht === fin.tavuja.rasteri + fin.tavuja.maasto + fin.tavuja.media);
  // Muodon leikkaus ei yliarvioi: laattoja vähemmän kuin bbox-välissä.
  const bboxLaattoja = Object.values(o.maat.NOR.rasteri).reduce((a, [x0, y0, x1, y1]) => a + (x1 - x0 + 1) * (y1 - y0 + 1), 0);
  assert.ok(o.maat.NOR.laattoja.rasteri < bboxLaattoja);
  assert.ok(Object.keys(o.maat.FRA.maasto).length > 0, 'Ranskan syvä maasto available-alueella');
  assert.deepEqual(Object.keys(o.globaali.rasteri), ['0', '1', '2', '3', '4', '5']);
  assert.ok(o.maat.ITA.media.every((u) => /^https:\/\//.test(u)));
  assert.ok(!JSON.stringify(o).includes('upload.wikimedia.org/wikipedia/commons/thumb'), 'ulkoiset kuva-URLit eivät ole pelin mediaa');
});
