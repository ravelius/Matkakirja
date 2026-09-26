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
import { kokoaJulkaisu, tarkistaPaketti, paketinTiiviste, MIN_SOVELLUS, kokoaTasoittain } from '../tools/vienti/julkaise-sisalto.mjs';
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

test('jokaisella laudan maalla on ISO2 (maat- ja maarajat-kokoelmat, natiivin maatila)', async () => {
  const { MAAILMANKARTTA } = await import('../js/packs/maailmankartta.js');
  const puuttuu = Object.keys(MAAILMANKARTTA.map.countryShapes).filter((iso) => !/^[A-Z]{2}$/.test(ISO2[iso] ?? ''));
  assert.deepEqual(puuttuu, [], 'ISO2 puuttuu tools/vienti/iso2.mjs:stä');
  assert.equal(new Set(Object.values(ISO2)).size, Object.keys(ISO2).length, 'ISO2-koodi kahdesti');
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

test('osoitinvartija: pienempi skeema ei korvaa osoitinta', async () => {
  const { saakoKorvata, vertaaSkeemaa } = await import('../tools/vienti/osoitinvartija.mjs');
  assert.ok(vertaaSkeemaa('1.10', '1.9') > 0);
  assert.equal(saakoKorvata({ skeemaversio: '1.10', versio: 11 }, { skeemaversio: '1.9' }).korvaa, false);
  assert.equal(saakoKorvata({ skeemaversio: '1.9' }, { skeemaversio: '1.9' }).korvaa, true);
  assert.equal(saakoKorvata({ skeemaversio: '1.9' }, { skeemaversio: '1.12' }).korvaa, true);
  assert.equal(saakoKorvata(null, { skeemaversio: '1.0' }).korvaa, true);
  const yml = readFileSync(`${JUURI}/.github/workflows/vie-sisalto.yml`, 'utf8');
  assert.ok(yml.indexOf('osoitinvartija.mjs') < yml.indexOf('aws s3 cp dist/sisalto/uusin.json'));
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
  // Skeema 1.14: vanhat mannerlaudat eivät ole paketissa (lahteet.mjs PAKETISTA_POISTETUT).
  assert.ok(tarkistetut.length >= 2, tarkistetut.join(', '));
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
  // Skeema 1.14: ryöstäjä pois (natiivissa ei rosvoa).
  const { robber, ...tyypit } = JSON.parse(JSON.stringify(P.tokens.types));
  assert.ok(robber, 'laudalla on yhä ryöstäjä');
  assert.deepEqual(rivi.data, { ...JSON.parse(JSON.stringify(P.tokens)), types: tyypit });
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
  const saannot = new Map(JSON.parse(tiedostot.get('kokoelmat/saannot.json')).alkiot.map((a) => [a.id, a]));
  assert.deepEqual(saannot.get('PIENI_AARRE_ARVO').arvo, tokens.PIENI_AARRE_ARVO);
  assert.deepEqual(saannot.get('ISO_AARRE_ARVO').arvo, tokens.ISO_AARRE_ARVO);
  assert.ok(!saannot.has('BOT_SKILL') && !saannot.has('DUEL_PRIZE'), 'skeema 1.14: botti ja kaksintaistelu pois');
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
  // Aikaleimat vain, jos ne on kohdistettu nykyiseen tekstiin (23.9.2026 kaikki vanhentuneita).
  if (pariisi.aikaleimaTiedosto) {
    assert.equal(JSON.parse(tiedostot.get(pariisi.aikaleimaTiedosto)).teksti, pariisi.teksti);
  } else {
    assert.equal(pariisi.reaktioHetket, null);
  }
  const { FOKUSVIRRAT } = await import('../js/packs/fokusvirrat.js');
  assert.deepEqual(pariisi.reaktiot.map(({ ele, ...r }) => r), JSON.parse(JSON.stringify(FOKUSVIRRAT.pariisi.matkakirja.reaktiot)));
  assert.match(pariisi.tekstiSha256, /^[0-9a-f]{64}$/);
  const livia = JSON.parse(tiedostot.get('kokoelmat/livianpuhe.json')).alkiot;
  assert.equal(livia.length, 45);
  const ateena = livia.find((r) => r.id === 'ateena');
  const { livianAaniOsoite } = await import('../js/liviapuhe.js');
  assert.equal(ateena.aani, livianAaniOsoite('ateena', 2));
  assert.match(ateena.eleet, /^https:\/\/media\.matkakirja\.app\/.+livia-ateena-3\.eleet\.json(\?.*)?$/);
  assert.ok(ateena.cuet.length >= 3 && ateena.cuet.every((c) => c.ankkuri && c.tarkoitus));
});

test('skeema 1.11: Livian cue-data (ele, validoidut ajat, repliikit)', async () => {
  const { livianPuheeleenTiedot, livianLuentareaktionTiedot } = await import('../js/livia-tilanteet.js');
  const livia = JSON.parse(tiedostot.get('kokoelmat/livianpuhe.json')).alkiot;
  const { lueLivianEleet } = await import('../tools/vienti/livian-eleet.mjs');
  const haetut = lueLivianEleet().kaupungit;
  for (const rivi of livia) {
    for (const cue of rivi.cuet) assert.equal(cue.ele, livianPuheeleenTiedot(cue)?.ele ?? null, cue.id);
    if (rivi.eleetTila === 'ok') {
      assert.equal(rivi.aaniSha256, haetut[rivi.id].aani.sha256);
      assert.ok(rivi.cuet.every((c) => Number.isInteger(c.alku) && c.loppu > c.alku), rivi.id);
    } else {
      assert.ok(rivi.cuet.every((c) => c.alku === null && c.loppu === null), rivi.id);
    }
  }
  assert.ok(livia.some((r) => r.eleetTila === 'ok'), 'ainakin yksi validoitu');
  const luennat = JSON.parse(tiedostot.get('kokoelmat/luennat.json')).alkiot;
  for (const r of luennat.flatMap((l) => l.reaktiot ?? [])) {
    assert.equal(r.ele, livianLuentareaktionTiedot(r)?.ele ?? null, r.id);
  }
  const repliikit = JSON.parse(tiedostot.get('kokoelmat/livianrepliikit.json')).alkiot;
  const { repliikit: lahde } = await import('../tools/generoi-pulu.mjs');
  const { livianAaniOsoite } = await import('../js/liviapuhe.js');
  assert.equal(repliikit.length, lahde().length);
  const avaus = repliikit.find((r) => r.id === 'avaus-1');
  assert.equal(avaus.aani, livianAaniOsoite('avaus', 0));
  assert.equal(repliikit.find((r) => r.id === 'ateena-3').kaupunki, 'ateena');
});

test('skeema 1.12: repon assets/-kuvat ämpärissä, Pages varana', async () => {
  const { sivustonAssetit } = await import('../tools/vienti/vie-sisalto.mjs');
  const { muuttuneet } = await import('../tools/vienti/sivustoassetit.mjs');
  const media = JSON.parse(tiedostot.get('media.json')).viitteet;
  assert.equal(media.filter((v) => v.url?.startsWith('https://matkakirja.app/')).length, 0, 'ei Pages-ensisijaisia');
  const repo = media.find((v) => v.laji === 'repo');
  assert.match(repo.url, /^https:\/\/media\.matkakirja\.app\/assets\/.+\?v=[0-9a-f]{12}$/);
  assert.deepEqual(repo.varat, [`https://matkakirja.app/${repo.avain}`]);
  const kypara = JSON.parse(tiedostot.get('kokoelmat/saannot.json')).alkiot.find((a) => a.id === 'LIVIAN_ASTRONAUTTI_KYPARA');
  assert.match(kypara.arvo.url, /assets\/livia\/livia-astronauttikypara-2x\.png\?v=/);
  const assetit = sivustonAssetit(tiedostot);
  assert.ok(assetit['assets/livia/livia-astronauttikypara-2x.png']);
  assert.ok(Object.values(assetit).every((sha) => /^[0-9a-f]{64}$/.test(sha)));
  assert.equal(repo.url.split('?v=')[1], assetit[repo.avain].slice(0, 12));
  assert.deepEqual(muuttuneet({ a: '1', b: '2' }, { a: '1', b: '3' }), ['b']);
});

test('skeema 1.13: kuvien mitat media.json:ssa', async () => {
  const { kuvanMitat } = await import('../tools/vienti/kuvamitat.mjs');
  const media = JSON.parse(tiedostot.get('media.json')).viitteet;
  const mitatut = media.filter((v) => v.leveys);
  assert.ok(mitatut.length > 10000, `mitattuja ${mitatut.length}`);
  assert.ok(mitatut.every((v) => Number.isInteger(v.leveys) && Number.isInteger(v.korkeus) && v.korkeus > 0));
  const kypara = media.find((v) => v.arvo === 'assets/livia/livia-astronauttikypara-2x.png');
  if (kypara) assert.deepEqual([kypara.leveys, kypara.korkeus], kuvanMitat(readFileSync(`${JUURI}/${kypara.arvo}`)));
  const png = Buffer.alloc(24); png.writeUInt32BE(0x89504e47, 0); png.writeUInt32BE(640, 16); png.writeUInt32BE(480, 20);
  assert.deepEqual(kuvanMitat(png), [640, 480]);
});

test('skeema 1.14: poistetut eivät ole paketissa eikä niihin viitata', async () => {
  const { PAKETISTA_POISTETUT } = await import('../tools/vienti/lahteet.mjs');
  const polut = [...tiedostot.keys()];
  assert.ok(!polut.includes('kokoelmat/kaksintaistelut.json'));
  assert.ok(!manifest.kokoelmat.some((k) => k.nimi === 'kaksintaistelut'));
  assert.ok(!polut.includes('moduulit/js/ai.json'));
  for (const m of PAKETISTA_POISTETUT) {
    assert.ok(!polut.includes(`moduulit/${m.replace(/\.js$/, '.json')}`), m);
    assert.ok(!manifest.moduulit.some((x) => x.moduuli === m), m);
  }
  const media = JSON.parse(tiedostot.get('media.json')).viitteet;
  assert.ok(media.every((v) => v.esiintymat.every((e) => !PAKETISTA_POISTETUT.has(e.moduuli) && e.moduuli !== 'js/ai.js')));
  const [laatat] = JSON.parse(tiedostot.get('kokoelmat/laatat.json')).alkiot;
  assert.ok(!('robber' in laatat.data.types) && !('robber' in laatat.kuvat));
  const kaikki = [...tiedostot.values()].join('');
  assert.ok(!kaikki.includes('kokoelmat/kaksintaistelut'), 'ei viittausta poistettuun kokoelmaan');
});

test('maakuntarajat (B17): avaimet ja renkaat', () => {
  const alueet = JSON.parse(tiedostot.get('kokoelmat/maakuntarajat.json')).alkiot;
  assert.ok(alueet.length >= 120);
  assert.ok(alueet.every((a) => a.id === `${a.iso3}:${a.id.split(':').slice(1).join(':')}` && a.nimi && a.renkaat.length));
  assert.ok(alueet.every((a) => a.renkaat.every((r) => r.length >= 4 && r.every(([lon, lat]) => Math.abs(lon) <= 180 && Math.abs(lat) <= 90))));
  const wien = alueet.find((a) => a.id === 'AUT:Wien');
  // 1.25: renkaat kaarista — jokainen renkaan jana on kaarissa, sisärajat kahdesti renkaissa, kerran kaarissa.
  const { kaaret } = JSON.parse(tiedostot.get('kokoelmat/maakuntarajat.json'));
  const jana = (p, q) => [p.join(), q.join()].sort().join('|');
  const kaarissa = new Map();
  for (const k of kaaret) for (let i = 1; i < k.length; i += 1) kaarissa.set(jana(k[i - 1], k[i]), (kaarissa.get(jana(k[i - 1], k[i])) ?? 0) + 1);
  const renkaissa = new Map();
  for (const a of alueet) for (const r of a.renkaat) for (let i = 1; i < r.length; i += 1) renkaissa.set(jana(r[i - 1], r[i]), (renkaissa.get(jana(r[i - 1], r[i])) ?? 0) + 1);
  assert.ok([...renkaissa.keys()].every((j) => kaarissa.has(j)), 'jokainen renkaan jana on kaarissa');
  assert.ok([...renkaissa.values()].every((n) => n <= 2));
  assert.ok([...renkaissa.values()].filter((n) => n === 2).length > 5000, 'sisärajat jaettu');
  assert.ok(wien.bbox[0] > 16 && wien.bbox[2] < 16.7 && wien.bbox[1] > 48 && wien.bbox[3] < 48.4);
});

test('lisenssikirjanpito: aineistot ja GPL-rajat', () => {
  const m = JSON.parse(tiedostot.get('manifest.json'));
  const l = JSON.parse(tiedostot.get(m.lisenssit.tiedosto));
  const ids = l.aineistot.map((a) => a.id);
  assert.ok(ids.includes('historical-basemaps') && ids.includes('natural-earth') && ids.includes('copernicus-dem'));
  const gpl = l.aineistot.find((a) => a.id === 'historical-basemaps');
  assert.equal(gpl.lisenssi, 'GPL-3.0');
  assert.match(gpl.kaytto, /ämpäri/);
  assert.ok(l.aineistot.every((a) => a.nimi && a.lisenssi && a.lahde && a.attribuutio && a.kaytto));
});

test('skeema 1.16: radiot luokittain ja viritysäänet', async () => {
  const { RADIOT } = await import('../js/packs/radiot.js');
  const radiot = JSON.parse(tiedostot.get('kokoelmat/radiot.json')).alkiot;
  const ensisijaiset = radiot.filter((r) => r.jarjestys === 1);
  assert.equal(ensisijaiset.length, Object.keys(RADIOT).length);
  assert.ok(radiot.every((r) => ['sallittu', 'epaselva', 'kielletty'].includes(r.luokka)));
  // Jokaisessa maassa soiva asema ensin; kielletty yleisradio vain linkkinä toisena.
  assert.ok(ensisijaiset.every((r) => r.luokka !== 'kielletty' && /^https:\/\//.test(r.url)));
  // Omistaja 23.9.2026: kiellettyjä ei pakettiin; 17 maassa soi korvaava asema.
  assert.equal(radiot.length, Object.keys(RADIOT).length);
  assert.ok(!radiot.some((r) => r.luokka === 'kielletty'));
  assert.equal(radiot.filter((r) => r.lahde === 'korvaava').length, 17);
  // iOS ATS: korvaavat ja sallitut toimivat; RaBe vaihdettu 23.9. (ei ECDHE:tä).
  assert.ok(radiot.filter((r) => r.lahde === 'korvaava').every((r) => r.toimii === true));
  assert.ok(radiot.every((r) => r.toimii !== undefined));
  assert.equal(radiot.find((r) => r.id === 'CHE').nimi, 'Radio Vostok');
  assert.ok(radiot.every((r) => r.sivu === null || /^https?:\/\//.test(r.sivu)));
  assert.notEqual(radiot.find((r) => r.id === 'FIN').url, RADIOT.FIN.url, 'Yle korvattu');
  assert.equal(radiot.find((r) => r.id === 'ITA').url, RADIOT.ITA.url);
  const { aaniUrl } = await import('../js/media.js');
  const { VIRITYSAANET, viritysPolku } = await import('../js/packs/viritysaanet.js');
  const viritys = JSON.parse(tiedostot.get('kokoelmat/aanitaulut.json')).alkiot.filter((a) => a.laji === 'viritys');
  assert.deepEqual(viritys.map((v) => v.url), VIRITYSAANET.map((a) => aaniUrl(viritysPolku(a))));
  assert.ok(viritys.every((v) => v.lisenssi && v.tekija));
});

test('skeema 1.17: kohdekartat (kuva ämpärissä, kohteet karttapisteinä)', async () => {
  const { KAUPUNKIKARTAT, karttapiste } = await import('../js/packs/maakartat.js');
  const kartat = JSON.parse(tiedostot.get('kokoelmat/kohdekartat.json')).alkiot;
  assert.equal(kartat.length, Object.keys(KAUPUNKIKARTAT).length);
  assert.ok(kartat.every((k) => /^https:\/\/media\.matkakirja\.app\/assets\/kartat\/.+\?v=/.test(k.kuva.url)));
  const tokio = kartat.find((k) => k.id === 'tokio');
  assert.equal(tokio.kuva.url, tokio.varikartta.url, 'värikartta voittaa julisteen');
  const k0 = KAUPUNKIKARTAT.tokio.kohteet[0];
  const p = karttapiste(KAUPUNKIKARTAT.tokio, k0.lat, k0.lon);
  assert.equal(tokio.kohteet[0].x, Math.round(p.x * 100) / 100);
});

test('skeema 1.17: lehtitehtävät ja pullan nimet', async () => {
  const t = JSON.parse(tiedostot.get('kokoelmat/lehtitehtavat.json')).alkiot;
  assert.ok(t.length >= 70);
  assert.ok(t.every((x) => Number.isInteger(x.visa.oikea) && x.visa.oikea < x.visa.vaihtoehdot.length));
  assert.equal(t.find((x) => x.id === 'ateena:juliste').juliste, 'ateena-nike');
  const julisteet = new Set(JSON.parse(tiedostot.get('kokoelmat/julisteet.json')).alkiot.map((j) => j.id));
  // juliste null = kaupungille ei ole julistetta (23.9.2026: bergen, sevilla; sisältöaukko myös webissä).
  assert.ok(t.filter((x) => x.palkinto === 'juliste').every((x) => x.juliste === null || julisteet.has(x.juliste)));
  assert.ok(t.filter((x) => x.palkinto === 'juliste' && x.juliste === null).length <= 2);
  const f = JSON.parse(tiedostot.get('moduulit/js/fokustehtavat.json')).exportit;
  assert.equal(f.PULLA_NIMET.GRC, 'tsoureki');
  assert.equal(f.PULLA_YLEISNIMI, 'makea pulla');
});

test('skeema 1.18: nahtavyydet ja miniatyyrit päätasolla', async () => {
  const { NAHTAVYYSJUTUT } = await import('../js/packs/nahtavyysjutut.js');
  const n = JSON.parse(tiedostot.get('kokoelmat/nahtavyydet.json')).alkiot;
  const firenze = n.find((a) => a.kaupunki === 'firenze' && a.teksti);
  assert.deepEqual(firenze.kappaleet, firenze.teksti.split('\n\n').filter(Boolean));
  assert.ok(n.every((a) => Array.isArray(a.kuvat) && a.kuvat.every((k) => /^https:\/\//.test(k.url))));
  const raakaKuvia = n.reduce((s, a) => s + (a.data?.kuvat?.length ?? 0), 0);
  const kuvia = n.reduce((s, a) => s + a.kuvat.length, 0);
  assert.ok(kuvia >= raakaKuvia - 5, `kuvia ${kuvia} / ${raakaKuvia}`);
  assert.ok(Object.keys(NAHTAVYYSJUTUT).length > 0);
  const m = JSON.parse(tiedostot.get('kokoelmat/miniatyyrit.json')).alkiot;
  assert.ok(m.every((a) => a.kuva && /^https:\/\//.test(a.kuva.url)));
  const { assetOsoite } = await import('../js/media.js');
  const tunnus = m.find((a) => typeof a.data === 'string' && !a.data.includes('/'));
  assert.equal(tunnus.kuva.url, assetOsoite('miniatyyrit', tunnus.data));
});

test('skeema 1.19: kysymykset ja pulmat päätasolla', () => {
  const k = JSON.parse(tiedostot.get('kokoelmat/kysymykset.json')).alkiot;
  assert.ok(k.every((a) => a.kysymys === a.data.q && a.fakta === a.data.fact));
  assert.ok(k.filter((a) => a.laji === 'visa').every((a) => Number.isInteger(a.oikea) && a.oikea < a.vaihtoehdot.length));
  assert.ok(k.filter((a) => a.laji === 'vaite').every((a) => typeof a.oikea === 'boolean'));
  const p = JSON.parse(tiedostot.get('kokoelmat/pulmat.json')).alkiot;
  assert.ok(p.every((a) => a.otsikko && a.kysymys));
  assert.ok(p.every((a) => a.generaattori === (a.data.generaattori ?? a.data.generate ?? null) && 'kuvat' in a));
  assert.deepEqual(p.find((a) => a.id === 'punnukset').luonnos, p.find((a) => a.id === 'punnukset').data.sketch);
});

test('skeema 1.20: elaintayt ja julisteet päätasolla', () => {
  const e = JSON.parse(tiedostot.get('kokoelmat/elaintayt.json')).alkiot;
  assert.ok(e.every((a) => a.otsikko === a.data.otsikko && Number.isFinite(a.lat)));
  assert.ok(e.filter((a) => a.data.kuva).every((a) => /^https:\/\//.test(a.kuva.url)));
  assert.equal(e.reduce((s, a) => s + a.kuvat.length, 0), e.reduce((s, a) => s + (a.data.kuvat?.length ?? 0), 0));
  const j = JSON.parse(tiedostot.get('kokoelmat/julisteet.json')).alkiot;
  assert.ok(j.every((a) => /^https:\/\/media\.matkakirja\.app\/julisteet\//.test(a.kuva.url) && a.kuva.leveys));
});

test('skeema 1.21: fokusvirrat ja laatat päätasolla', () => {
  const f = JSON.parse(tiedostot.get('kokoelmat/fokusvirrat.json')).alkiot;
  const raaka = (x) => JSON.stringify(x).match(/"(osoite|ampari|tiedosto)":/g)?.length ?? 0;
  // Kaikki kuvaoliot ratkaistu: virrassa ei ole raakoja kuva-avaimia.
  assert.equal(f.reduce((s, a) => s + raaka(a.virta), 0), 0);
  const ateena = f.find((a) => a.id === 'ateena');
  assert.match(ateena.virta.matkakirja.luentakuva.url, /^https:\/\//);
  assert.deepEqual(ateena.lehtitehtavat, ['ateena:aarre', 'ateena:juliste']);
  const [l] = JSON.parse(tiedostot.get('kokoelmat/laatat.json')).alkiot;
  // 1.30: tyyppiolioissa myös nimi, symboli, arvo ja vari; alkuperäiset avaimet ennallaan.
  for (const [id, t] of Object.entries(l.data.types)) {
    for (const [k, v] of Object.entries(t)) assert.deepEqual(l.tyypit[id][k], v, `${id}.${k}`);
  }
  assert.deepEqual(l.maarat, l.data.counts);
});

test('skeema 1.22: muutosrivi osoittimeen ja muutosloki-natiivi', async () => {
  const { muutosRivi, kokoaJulkaisu } = await import('../tools/vienti/julkaise-sisalto.mjs');
  assert.deepEqual(muutosRivi(null, { kaupunkilehdet: 5 }, '2026-09-23T20:00:00Z'), { paiva: '2026-09-23', teksti: 'Sisältö päivittyi.' });
  assert.equal(muutosRivi({ kaupunkilehdet: 5, nahtavyydet: 10 }, { kaupunkilehdet: 8, nahtavyydet: 10 }, '2026-09-24T00:00:00Z').teksti,
    'Sisältö päivittyi: 3 uutta kaupunkilehteä.');
  assert.equal(muutosRivi({ kaupunkilehdet: 5 }, { kaupunkilehdet: 5 }, '2026-09-24T00:00:00Z').teksti, 'Sisältöä päivitettiin.');
  const j = kokoaJulkaisu({ tiedostot, edellinen: null, suurin: 0, commit: 'abcdef1', julkaistu: '2026-09-23T20:00:00.000Z' });
  assert.deepEqual(j.virheet, []);
  assert.equal(j.osoitin.kokoelmaLkm.kaupungit, 266);
  assert.ok(Array.isArray(JSON.parse(tiedostot.get('kokoelmat/muutosloki-natiivi.json')).alkiot));
});

test('B7: maisemakorit pelin porrastuksella, aarreaiheet ja tilaraidat', async () => {
  const { kaupunkiKori, maaKori, tyyppiKori } = await import('../js/aani-ehdokkaat.js');
  const { MAAILMANKARTTA: P } = await import('../js/packs/maailmankartta.js');
  const a = JSON.parse(tiedostot.get('kokoelmat/aanitaulut.json')).alkiot;
  const korit = a.filter((r) => r.laji === 'maisemakori');
  assert.equal(korit.length, P.cities.length + 4);
  for (const c of P.cities.slice(0, 40)) {
    const oma = kaupunkiKori(P.id, c.id);
    const maa = oma.length ? [] : maaKori(P.id, c.id, P.map.cityCountry);
    const odotus = oma.length ? oma : maa.length ? maa : (c.ambience ? tyyppiKori(c.ambience, P.id) : []);
    assert.deepEqual(korit.find((k) => k.paikka === c.id).kori, odotus, c.id);
  }
  assert.equal(korit.find((k) => k.paikka === 'etusivu').vakio, true);
  assert.match(a.find((r) => r.id === 'aarreaihe:paa').url, /musa-paaaarre-lyria\.mp3$/);
});

test('skeema 1.23: offline-ryhmät maanosittain ja kaikki', () => {
  const o = JSON.parse(tiedostot.get('offline.json'));
  assert.deepEqual(validoiNimella(o, 'offline.schema.json'), []);
  const { maailma, kaikki, ...mantereet } = o.ryhmat;
  assert.equal(maailma.tavuja.yht, o.globaali.tavuja.yht);
  assert.equal(Object.keys(mantereet).length, 7);
  const jaettu = Object.values(mantereet).flatMap((r) => r.maat);
  assert.equal(jaettu.length, new Set(jaettu).size, 'maa vain yhdessä maanosassa');
  assert.deepEqual([...jaettu].sort(), kaikki.maat);
  assert.ok(Object.values(o.maat).every((m) => m.manner && o.ryhmat[m.manner]));
  const summa = Object.values(mantereet).reduce((a, r) => a + r.tavuja.yht, 0) + maailma.tavuja.yht;
  assert.equal(kaikki.tavuja.yht, summa);
  assert.equal(o.maat.FRA.manner, 'europe');
});

test('skeema 1.24: saapumistekstit pelin valinnalla ja jaolla (kaupungit ilman fokusvirtaa)', async () => {
  const { MAAILMANKARTTA: P } = await import('../js/packs/maailmankartta.js');
  const { SAAPUMISTEKSTIT, VALOKUVAT } = await import('../js/sisaltotaulut.js');
  const { fokusvirtaKaupungille } = await import('../js/packs/fokusvirrat.js');
  const { ekaLause, onVanhaKuva } = await import('../js/ui-apurit.js');
  const { factText, factVoice, voiceTitle } = await import('../js/pack.js');
  const { aaniUrl } = await import('../js/media.js');
  const s = JSON.parse(tiedostot.get('kokoelmat/saapumistekstit.json')).alkiot;
  const muut = P.cities.filter((c) => !fokusvirtaKaupungille(c.id));
  assert.deepEqual(s.map((r) => r.id), muut.filter((c) => SAAPUMISTEKSTIT.maailmankartta[c.id] || P.placeFacts[c.id]?.length)
    .map((c) => c.id));
  for (const r of s) {
    const v = SAAPUMISTEKSTIT.maailmankartta[r.id];
    if (r.laji === 'matkakirja') {
      const { eka, loput } = ekaLause(v.kuvaus);
      assert.equal(r.lihavoitu, eka, r.id);
      assert.equal(r.jatko, [loput, v.nosto].filter(Boolean).join(' ') || null, r.id);
      assert.equal(r.nosto?.teksti ?? null, v.nosto || null, r.id);
      assert.equal(r.otsikko, 'Matkakirjasta');
    } else {
      const f = P.placeFacts[r.id].find((x) => factVoice(x) === 'isoisa') ?? P.placeFacts[r.id][0];
      assert.equal(r.kuvaus, factText(f), r.id);
      assert.equal(r.otsikko, voiceTitle(factVoice(f)), r.id);
    }
    assert.deepEqual(r.kappaleet, [r.teksti]);
    assert.ok(r.kuvat.every((k) => /^https:\/\//.test(k.url)), r.id);
    assert.equal(r.livianRepliikki, null, 'webissä kaupunki ilman fokusvirtaa ei saa Livian kuplaa');
  }
  const tanger = s.find((r) => r.id === 'tanger');
  const vk = VALOKUVAT.maailmankartta.tanger;
  assert.equal(tanger.kuvat.length, 1 + vk.lisat.length + 1, 'historiakuva, lisat, nykykuva');
  assert.equal(tanger.kuva.arvo, vk.tiedosto);
  assert.equal(tanger.kuvat[0].vanha, onVanhaKuva(vk, true));
  assert.equal(s.find((r) => r.id === 'kairo').aani.url, aaniUrl('assets/audio/puhe-africa-saapuminen-kairo.mp3'));
  assert.ok(s.filter((r) => r.laji === 'havainto').length > 0);
});

test('skeema 1.24: karttavalot = webin pallon nostokerros (maanKohdemerkit), nimi ja paikka jokaisella', async () => {
  const { MAAILMANKARTTA: P } = await import('../js/packs/maailmankartta.js');
  const { maanKohdemerkit, kohdekartanNostopaikat } = await import('../js/fokuskohteet.js');
  const { FOKUS_POHJAT } = await import('../js/packs/fokus-grc.js');
  const { nostosymPaakategoria } = await import('../js/fokusnosto-symbolit.js');
  const { HISTORIAN_HETKET } = await import('../js/packs/historian-hetket.js');
  const valot = JSON.parse(tiedostot.get('kokoelmat/karttavalot.json')).alkiot;
  for (const iso of ['GRC', 'FRA', 'GBR']) {
    const odotus = maanKohdemerkit(P, iso, FOKUS_POHJAT[iso], () => false).filter((m) => nostosymPaakategoria(m.kategoria));
    const omat = valot.filter((v) => v.maa === iso && v.paakartalla && !['elaintaky', 'napakohde', 'maakuntasalaisuus'].includes(v.lahde));
    assert.deepEqual(omat.map((v) => v.tunnus), odotus.map((m) => m.id), iso);
    assert.deepEqual(omat.map((v) => v.aihe), odotus.map((m) => nostosymPaakategoria(m.kategoria)), iso);
  }
  assert.ok(valot.every((v) => v.nimi && v.paikka), 'nimi ja paikan nimi jokaisella valolla');
  for (const laji of ['syvennys', 'takynosto', 'maalehtinosto', 'napakohde']) {
    assert.ok(valot.some((v) => v.lahde === laji), laji);
  }
  // Kohdekartalle siirretyt: jokainen kohdekartan nosto on valo (pääkartalla tai vain kohdekartalla).
  const tunnukset = new Set(valot.map((v) => v.tunnus));
  for (const t of kohdekartanNostopaikat().keys()) assert.ok(tunnukset.has(t), t);
  const kk = valot.filter((v) => !v.paakartalla);
  assert.ok(kk.every((v) => v.kohdekartta && v.ladottu === null));
  assert.equal(valot.filter((v) => v.lahde === 'historianHetket' && !v.paakartalla).length,
    HISTORIAN_HETKET.filter((h) => !h.kartalla && kohdekartanNostopaikat().has(`hetki-${h.id}`)).length);
});

test('skeema 1.24: kohdekarttojen nostolinkeillä aihe (kaupunkiliuskan kaava)', async () => {
  const { KOHDE_MAAT, kohteenKategoria } = await import('../js/fokuskohteet.js');
  const { nostosymPaakategoria } = await import('../js/fokusnosto-symbolit.js');
  const kartat = JSON.parse(tiedostot.get('kokoelmat/kohdekartat.json')).alkiot;
  const linkit = kartat.flatMap((k) => k.kohteet.flatMap((x) => x.linkit));
  assert.ok(linkit.length >= 200);
  assert.ok(linkit.every((l) => l.aihe), 'jokaisella linkillä aihe');
  const kohteet = new Map(Object.values(KOHDE_MAAT).flat().map((k) => [k.id, k]));
  const l = linkit.find((x) => kohteet.has(x.tunnus));
  assert.equal(l.aihe, nostosymPaakategoria(kohteenKategoria(kohteet.get(l.tunnus))));
  assert.ok(kartat.every((k) => k.kohteet.every((x) => x.aihe === (x.linkit[0]?.aihe ?? null))));
});

test('skeema 1.24: Livian saapumisrepliikit ja maakohtaiset täkynostot', async () => {
  const { LIVIAN_SAAPUMISET } = await import('../js/fokusvirta.js');
  const { jaaPuheenvuoroksi } = await import('../js/ui-apurit.js');
  const l = JSON.parse(tiedostot.get('kokoelmat/liviansaapumiset.json')).alkiot;
  assert.deepEqual(l.map((r) => r.id), Object.keys(LIVIAN_SAAPUMISET).sort());
  for (const r of l) assert.deepEqual(r.osat, jaaPuheenvuoroksi(LIVIAN_SAAPUMISET[r.id]), r.id);
  const { NOSTO_MAAT, nostoKaupunginPooli, nostoLevitaLunastus } = await import('../js/fokusnosto.js');
  const { MAAILMANKARTTA: P } = await import('../js/packs/maailmankartta.js');
  const t = JSON.parse(tiedostot.get('kokoelmat/takynostot.json')).alkiot;
  assert.equal(t.length, Object.values(NOSTO_MAAT).flat().length);
  assert.deepEqual(t.filter((r) => r.maa === 'GRC').map((r) => r.id), NOSTO_MAAT.GRC.map((n) => n.id));
  const esp = t.find((r) => r.maa === 'ESP');
  assert.equal(esp.teksti, nostoLevitaLunastus([NOSTO_MAAT.ESP[0]])[0].teksti);
  const kone = t.find((r) => r.id === 'antikythera-kone');
  assert.deepEqual(kone.kaupungit, P.cities.filter((c) => P.map.cityCountry[c.id] === 'GRC'
    && nostoKaupunginPooli('GRC', c.id).some((n) => n.id === kone.id)).map((c) => c.id));
  assert.equal(kone.karttavalo, 'kohde:antikythera');
  assert.ok(t.every((r) => r.karttavalo), 'jokainen täky on kartalla (merkkinä tai kohteen kortissa)');
  const valot = JSON.parse(tiedostot.get('kokoelmat/karttavalot.json')).alkiot;
  assert.deepEqual(valot.find((v) => v.id === 'kohde:antikythera').liitetytNostot, ['antikythera-kone']);
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
  assert.equal(o.globaali.media.length, 0, 'globaali = vain laatat ja maasto');
  assert.ok(o.valinnaiset.aanet.media.length > 0 && o.valinnaiset.aanet.tavuja > 0);
  assert.ok(o.maat.ITA.media.every((u) => /^https:\/\//.test(u)));
  assert.ok(!JSON.stringify(o).includes('upload.wikimedia.org/wikipedia/commons/thumb'), 'ulkoiset kuva-URLit eivät ole pelin mediaa');
});

test('skeema 1.9: maat kartuschaa varten', async () => {
  const maat = new Map(JSON.parse(tiedostot.get('kokoelmat/maat.json')).alkiot.map((r) => [r.id, r]));
  const { MAATIEDOT } = await import('../js/sisaltotaulut.js');
  const kreikka = maat.get('GRC');
  assert.equal(kreikka.iso2, 'GR');
  assert.match(kreikka.paikallinen, /ΕΛΛΑΣ/);
  assert.deepEqual(kreikka.tiedot, JSON.parse(JSON.stringify(MAATIEDOT.maailmankartta.GRC)));
  assert.ok(/^https:\/\//.test(kreikka.lippuUrl));
  const { MAA_KATEGORIAT } = await import('../js/packs/maa-kategoriat.js');
  const [iso] = Object.keys(MAA_KATEGORIAT);
  assert.deepEqual(maat.get(iso).aiheet.map((a) => a.id), MAA_KATEGORIAT[iso].map((a) => a.id));
});

test('nippu 4: muotokuvat, laattakuvat, karttamerkit, linssiluennat, kätkökuva', async () => {
  const K = (n) => JSON.parse(tiedostot.get(`kokoelmat/${n}.json`)).alkiot;
  const { kohtaamiskuvaTavalliselleKohtaamiselle, kohtaamiskuvaKohteelle } = await import('../js/kohtaamiskuvat-data.js');
  const rooma = K('kohtaamiset').find((a) => a.id === 'rooma');
  assert.equal(rooma.muotokuva?.url ?? null, kohtaamiskuvaTavalliselleKohtaamiselle('rooma')?.osoite ?? null);
  for (const a of K('tarinakaari')) assert.equal(a.muotokuva?.url ?? null, kohtaamiskuvaKohteelle(a.kaupunki)?.osoite ?? null, a.id);
  const laatta = K('laatat')[0];
  assert.match(laatta.mannerKuvat.europe.star.url, /^https:\/\//);
  assert.ok(K('paikallisaarteet').every((a) => /^[A-Z]{3}$/.test(a.maa) && a.data.pieniAarre?.name && a.data.isoAarre?.name), 'maa, tyyppi ja nimi');
  assert.equal(K('karttamerkit').length, 11);
  const ll = K('linssiaineisto').find((r) => r.id === 'linssiluennat').data;
  const { luennanOsoite } = await import('../js/linssipuhe.js');
  const { LINSSI } = await import('../js/linssit/keksinnot.js');
  assert.equal(ll.keksinnot.pysakit[0].url, luennanOsoite(LINSSI.aikajana.tapahtumat[0]));
  assert.match(K('saannot').find((r) => r.id === 'KATKOKUVA').arvo.url, /kohtaaminen-katko\.jpg\?v=[0-9a-f]{12}$/);
});

test('nippu 4: karttavalot, maastonimet ja maarajat pallolle', async () => {
  const K = (n) => JSON.parse(tiedostot.get(`kokoelmat/${n}.json`)).alkiot;
  const valot = K('karttavalot');
  const { KARTTAVALO_TYYPIT } = await import('../js/karttavalot.js');
  assert.ok(valot.length > 2500);
  assert.ok(valot.every((v) => KARTTAVALO_TYYPIT.has(v.aihe) && Number.isFinite(v.lat) && Number.isFinite(v.lon)), 'aihe ja sijainti');
  assert.equal(new Set(valot.map((v) => v.aihe)).size, KARTTAVALO_TYYPIT.size, 'kaikki aiheet');
  const { HISTORIAN_HETKET } = await import('../js/packs/historian-hetket.js');
  // Skeema 1.24: kohdekartalle siirretyt hetket ovat valoja paakartalla = false.
  assert.equal(valot.filter((v) => v.aihe === 'hetket' && v.paakartalla).length, HISTORIAN_HETKET.filter((h) => h.kartalla).length);
  const nimet = K('maastonimet');
  const himalaja = nimet.find((n) => n.id === 'vuori:himalaja');
  assert.ok(Math.abs(himalaja.lat - 28.5) < 0.1 && Math.abs(himalaja.lon - 85) < 0.1);
  assert.ok(nimet.filter((n) => n.laji === 'joki').every((n) => n.viiva.length >= 2));
  const rajat = new Map(K('maarajat').map((r) => [r.id, r]));
  const fin = rajat.get('FIN');
  assert.equal(fin.iso2, 'FI');
  const [w, s, e, n] = fin.bbox;
  assert.ok(w > 19 && e < 32 && s > 59 && n < 71, `Suomen bbox ${fin.bbox}`);
});

test('skeema 1.10: kaupunkien korkeus (Copernicus GLO-30, null jos ruutua ei ole)', () => {
  const hel = kaupungit.alkiot.find((k) => k.id === 'helsinki');
  assert.ok(Number.isInteger(hel.korkeus) && hel.korkeus % 10 === 0 && hel.korkeus < 100, `Helsinki ${hel.korkeus}`);
  assert.ok(kaupungit.alkiot.every((k) => k.korkeus === null || (Number.isInteger(k.korkeus) && k.korkeus > -500 && k.korkeus < 6000)));
});

test('skeema 1.15: lehdet natiiville', async () => {
  const { jaaKappaleiksi } = await import('../js/ui-apurit.js');
  const { kuvatekstiLyhyt, kuvatekstiPitka } = await import('../js/kuvatekstit.js');
  const { sivunOtsikko } = await import('../js/maalehti.js');
  const { MINITEHTAVA_PALKKIO } = await import('../js/ui.js');
  const { KULTTUURI_KATEGORIAT } = await import('../js/packs/kulttuuri-kategoriat.js');
  const { MAA_KATEGORIAT } = await import('../js/packs/maa-kategoriat.js');
  const { KULTTUURI_PALKKIO } = await import('../js/packs/africa-kulttuuri.js');
  const { tulkitsePyramidi } = await import('../js/maakayrat.js');
  const kokoelma = (n) => JSON.parse(tiedostot.get(`kokoelmat/${n}.json`));
  const media = new Map(JSON.parse(tiedostot.get('media.json')).viitteet.map((v) => [v.arvo, v]));

  const tarkistaKuva = (k, lahde, polku) => {
    assert.match(k.url, /^https:\/\//, `${polku}: url`);
    assert.ok(Array.isArray(k.varat), `${polku}: varat`);
    assert.equal(k.lyhyt, kuvatekstiLyhyt(lahde) || null, `${polku}: lyhyt`);
    assert.equal(k.selite, kuvatekstiPitka(lahde) || null, `${polku}: selite`);
    const rivi = media.get(k.arvo);
    if (rivi) {
      assert.equal(k.url, rivi.url, `${polku}: url kuten media.json`);
      assert.equal(k.leveys, rivi.leveys, `${polku}: leveys kuten media.json`);
    }
  };
  const tarkistaAiheet = (aiheet, lahteet, polku) => {
    assert.deepEqual(aiheet.map((a) => a.id), lahteet.map((a) => a.id), `${polku}: aiheiden järjestys`);
    aiheet.forEach((a, i) => {
      const l = lahteet[i];
      assert.equal(a.sivunOtsikko, sivunOtsikko(l), `${polku}/${a.id}: sivunOtsikko`);
      assert.equal(a.nostot.length, (l.nostot ?? []).length);
      a.nostot.forEach((n, j) => {
        const ln = l.nostot[j];
        assert.deepEqual(n.kappaleet, jaaKappaleiksi(ln.teksti), `${polku}/${a.id}/${j}: kappaleet`);
        if (ln.tiedosto || ln.osoite || ln.ampari) tarkistaKuva(n.kuva, ln, `${polku}/${a.id}/${j}`);
        assert.equal(n.galleria.length, (ln.galleria ?? []).length);
      });
      if (l.tehtava) {
        assert.ok(Number.isInteger(a.tehtava.oikea) && a.tehtava.oikea >= 0 && a.tehtava.oikea < a.tehtava.vaihtoehdot.length);
        assert.equal(a.tehtava.palkkio, MINITEHTAVA_PALKKIO);
      } else assert.equal(a.tehtava, null);
    });
  };

  // Kaupunkilehti: jokainen KULTTUURI_KATEGORIAT-lehti aiheineen ja kansineen.
  const kl = new Map(kokoelma('kaupunkilehdet').alkiot.map((a) => [a.id, a]));
  for (const [id, lahteet] of Object.entries(KULTTUURI_KATEGORIAT)) {
    const a = kl.get(id);
    assert.equal(a.laji, 'lehti');
    tarkistaAiheet(a.aiheet, lahteet, id);
    const kansi = lahteet.find((x) => x.id === 'kaupunki');
    assert.equal(a.kansi.kansikuvat.length, (kansi.kansikuvat ?? []).length, `${id}: kansikuvat`);
    a.kansi.kansikuvat.forEach((k, i) => tarkistaKuva(k, kansi.kansikuvat[i], `${id}/kansi/${i}`));
    if (kansi.ennenNyt?.length >= 2) assert.equal(a.kansi.ennenNyt.length, 2);
    assert.equal(a.sivut[0], 'etusivu');
  }
  const lontoo = kl.get('lontoo');
  assert.ok(lontoo.kansi.avauskuvat.every((k) => k.url.startsWith('https://media.matkakirja.app/')));
  assert.equal(lontoo.menovinkitMaalta, 'GBR');
  assert.equal(lontoo.sivut.at(-1), 'menovinkit');
  // Elämää: litteät nostot yhtenä kappaleena, kuten webin vanha piirto.
  // Lajia ei vaadita: kun viimeisetkin Elämää-kaupungit saavat oman lehden
  // (N4: kongo, sahara, madagaskar), niitä on 0. Muoto tarkistetaan, jos on.
  const elama = [...kl.values()].filter((a) => a.laji === 'elama');
  for (const a of elama) {
    assert.equal(a.kansi, null);
    assert.deepEqual(a.aiheet.map((x) => x.id), ['elama']);
    assert.ok(a.aiheet[0].nostot.every((n) => n.kappaleet.length <= 1 && (!n.kuva || n.tyyppi === 'kuva')));
  }

  // Maalehti: aiheet ja menovinkkilista tyypitettynä.
  const ml = new Map(kokoelma('maalehdet').alkiot.map((a) => [a.id, a]));
  for (const [iso, lahteet] of Object.entries(MAA_KATEGORIAT)) tarkistaAiheet(ml.get(iso).aiheet, lahteet, iso);
  const vinkit = ml.get('GBR').aiheet.find((a) => a.id === 'menovinkit');
  assert.equal(vinkit.taitto, 'lista');
  assert.ok(vinkit.lista.length && vinkit.lista.every((r) => r.kohteet.every((k) => k.linkki && (!k.kuva || /^https:/.test(k.kuva.url)))));
  assert.ok(vinkit.hero?.url);

  // Kulttuurivisat.
  const visat = kokoelma('kulttuurivisat').alkiot;
  assert.ok(visat.length > 0);
  for (const v of visat) {
    assert.ok(Number.isInteger(v.oikea) && v.oikea >= 0 && v.oikea < v.vaihtoehdot.length, `${v.id}: oikea`);
    assert.equal(v.palkkio, KULTTUURI_PALKKIO);
    assert.ok(kl.has(v.id) || kaupungit.alkiot.some((k) => k.id === v.id));
  }

  // Säätiedot: 12 kuukautta.
  const saa = kokoelma('saatiedot').alkiot;
  assert.ok(saa.length > 150);
  for (const s of saa) {
    assert.equal(s.keskilampo.length, 12, s.id);
    assert.equal(s.sade.length, 12, s.id);
    assert.ok(s.ylin === null || s.ylin.length === 12);
    assert.match(s.selite, /keskilämpö/);
  }
  const saaModuuli = JSON.parse(tiedostot.get('moduulit/js/saa.json')).exportit;
  assert.equal(saaModuuli.KUUKAUDET_SSA.length, 12);
  assert.match(saaModuuli.ENNUSTE_OSOITE, /open-meteo/);
  assert.equal(JSON.parse(tiedostot.get('moduulit/js/ui-apurit.json')).exportit.LEIPAN_ALOITUS_SANOJA, 4);
  assert.match(JSON.parse(tiedostot.get('moduulit/js/lehti.json')).exportit.LEHDEN_VAKIOESITTELY, /Isoisä/);

  // Maat ja kaupungit: intro, maakartta, numerot.
  const maat = new Map(kokoelma('maat').alkiot.map((m) => [m.id, m]));
  const deu = maat.get('DEU');
  assert.ok(deu.intro && deu.maakartta.kaupungit.every((k) => k.x >= 0 && k.x <= 100 && k.y >= 0 && k.y <= 100));
  assert.ok(deu.rajat.renkaat.length && deu.radio?.url && deu.uutislahde?.syote && deu.lipputarina?.kappaleet?.length);
  const maakayrat = JSON.parse(tiedostot.get('tiedostot/assets/data/maakayrat.json'));
  assert.equal(deu.numeroina.lohkot[0].kayra, 'pyramidi');
  assert.equal(deu.numeroina.lohkot[0].tulkinta, tulkitsePyramidi(maakayrat.maat.DEU.pyramidi));
  assert.ok(deu.numeroina.ingressi && deu.numeroina.lahderivi);
  const intro = kaupungit.alkiot.find((k) => k.id === 'lontoo').intro;
  assert.deepEqual(intro.kappaleet, jaaKappaleiksi(intro.teksti));
});

test('skeemasopimus: skeemanumero vastaa kenttiä', async () => {
  const { tarkistaSopimus, VAATIMUKSET } = await import('../tools/vienti/skeemasopimus.mjs');
  assert.ok(VAATIMUKSET[SKEEMAVERSIO_TARKKA], 'nykyisellä skeemaversiolla on vaatimusrivi');
  assert.deepEqual(tarkistaSopimus(tiedostot, SKEEMAVERSIO_TARKKA), []);
  // Ämpärin v11: "1.10" ilman kaupungit.korkeutta.
  const ilman = new Map(tiedostot);
  const k = JSON.parse(ilman.get('kokoelmat/kaupungit.json'));
  for (const a of k.alkiot) delete a.korkeus;
  ilman.set('kokoelmat/kaupungit.json', JSON.stringify(k));
  assert.ok(tarkistaSopimus(ilman, SKEEMAVERSIO_TARKKA).some((v) => v.includes('kaupungit.korkeus')));
  // Uusi kenttä samalla numerolla = kenttäkuva muuttuu.
  const lisa = new Map(tiedostot);
  const r = JSON.parse(lisa.get('kokoelmat/reitit.json'));
  r.alkiot[0].uusiKentta = 1;
  lisa.set('kokoelmat/reitit.json', JSON.stringify(r));
  assert.ok(tarkistaSopimus(lisa, SKEEMAVERSIO_TARKKA).some((v) => v.includes('kentät muuttuivat')));
  assert.ok(tarkistaSopimus(tiedostot, '9.99').some((v) => v.includes('ei ole riviä')));
});

test('skeema 1.26: loput natiivin raakakentät päätasolla', () => {
  const k = (n) => JSON.parse(tiedostot.get(`kokoelmat/${n}.json`)).alkiot;
  const praha = k('tarinakaari').find((a) => a.id === 'praha');
  assert.equal(praha.kohtaaminen, praha.data.kohtaaminen);
  assert.equal(praha.kysymys.kysymys, praha.data.kysymys.q);
  assert.deepEqual(praha.kysymys.vaihtoehdot, praha.data.kysymys.vaihtoehdot);
  assert.ok(k('paikkatiedot').every((a) => typeof a.teksti === 'string' && a.teksti.length));
  assert.ok(k('kohtaamiset').every((a) => a.tervehdys && a.loyto && a.tyhja && a.vaarin));
  assert.ok(k('kohtaamiskuvat').every((a) => typeof a.tila === 'string'));
  const fin = k('paikallisaarteet').find((a) => a.id === 'FIN');
  assert.ok(fin.pieniAarre.nimi && fin.pieniAarre.url.startsWith('https://'));
  assert.ok(k('saapumispuheet').every((a) => a.url?.startsWith('https://') && a.kesto > 0));
  const sofia = k('fokusvirrat').find((a) => a.id === 'sofia');
  assert.equal(sofia.sahketehtava.id, 'sofia-varna');
  assert.equal(typeof sofia.kohtaamispiste.laudat.maailmankartta.x, 'number');
});

test('skeema 1.27: työhuoneen moduulit ilman henkilöiden sähköposteja', async () => {
  const { peitaSahkopostit } = await import('../tools/vienti/vie-sisalto.mjs');
  assert.equal(peitaSahkopostit('a etu.suku@esimerkki.fi b palaute@matkakirja.app'), 'a [sähköposti] b palaute@matkakirja.app');
  for (const [m, nimet] of [['tyohuone-raamattu', ['RAAMATTU']], ['tyohuone-tilanne', ['TILANNE', 'TESTATTAVAA', 'TUOREET']], ['tyohuone-pelit', ['PELIT']]]) {
    const t = tiedostot.get(`moduulit/js/${m}.json`);
    assert.ok(t, m);
    for (const n of nimet) assert.ok(n in JSON.parse(t).exportit, `${m}.${n}`);
    assert.doesNotMatch(t, /@(?!matkakirja\.app)[a-z0-9.-]+\.[a-z]{2,}/i, `${m}: sähköposti`);
  }
});

test('skeema 1.28: työhuoneen tilastot valmiina', async () => {
  const t = JSON.parse(tiedostot.get('kokoelmat/tyohuonetilastot.json'));
  assert.deepEqual(t.alkiot.map((a) => a.id), ['europe', 'middleeast', 'asia', 'africa', 'oceania', 'northamerica', 'southamerica']);
  const { laskeTilastot } = await import('../js/tyohuone-tilastot.js');
  assert.equal(t.alkiot[0].kaikki, laskeTilastot()[0].kaikki);
  assert.ok(t.sarakkeet.length >= 20 && t.sarakkeet.every((s) => s.avain && s.otsikko && ['kaupunki', 'maa'].includes(s.taso)));
  const avaimet = new Set(t.sarakkeet.map((s) => s.avain));
  assert.ok(Object.keys(t.alkiot[0].summa).every((k) => avaimet.has(k)));
});

test('skeema 1.34: maarajat = kaikki admin-0-renkaat (NOR Huippuvuorineen, web #3078)', () => {
  const m = new Map(JSON.parse(tiedostot.get('kokoelmat/maarajat.json')).alkiot.map((a) => [a.id, a]));
  const nor = m.get('NOR');
  assert.ok(nor.bbox[3] > 80, `NOR ${nor.bbox}`);
  assert.ok(nor.renkaat.some((r) => r.some(([, lat]) => lat > 76)), 'Huippuvuoret renkaissa');
  assert.ok([...m.values()].every((a) => a.muutRenkaat.length === 0 && a.bbox.join() === a.kokoBbox.join()));
  assert.ok(m.get('FRA').bbox[0] < -60, 'merentakaiset mukana');
});
test('skeema 1.30: äänitaulut, reittien maksu ja laattatyyppien suomenkieliset avaimet', () => {
  const k = (n) => JSON.parse(tiedostot.get(`kokoelmat/${n}.json`)).alkiot;
  const a = k('aanitaulut');
  assert.ok(a.filter((x) => x.laji === 'siirtyma').every((x) => x.ryhma === x.data.ryhma && 'nousuMs' in x));
  assert.ok(a.filter((x) => x.laji === 'tilaraita' || x.laji === 'paikkaraita').every((x) => x.tunnus));
  const r = k('reitit');
  assert.ok(r.filter((x) => x.laji === 'sea').every((x) => x.maksu === 100));
  assert.ok(r.filter((x) => x.laji !== 'sea').every((x) => x.maksu === 0));
  const [l] = k('laatat');
  assert.equal(l.tyypit.star.nimi, l.tyypit.star.name);
  assert.equal(l.mannerTyypit.europe.star.nimi, l.mannerTyypit.europe.star.name);
});

test('2.0 (major2.mjs): ei raakaa, vain natiivin moduulit, tiivisteet täsmäävät', async () => {
  const { johdaMajor2, onNatiivinModuuli } = await import('../tools/vienti/major2.mjs');
  const t2 = johdaMajor2(tiedostot);
  const m = JSON.parse(t2.get('manifest.json'));
  assert.equal(m.$skeema, 'matkakirja-vienti/2/manifest');
  assert.equal(m.skeemaversio, '2.0');
  assert.ok(!('webNakymat' in m));
  assert.ok(m.moduulit.length > 0 && m.moduulit.every((x) => x.natiivi && onNatiivinModuuli(x.moduuli)));
  assert.ok(onNatiivinModuuli('js/packs/fokuskohteet-fra.js') && !onNatiivinModuuli('js/packs/europe.js'));
  const listatut = new Set(['manifest.json']);
  for (const arvo of Object.values(m)) {
    for (const e of Array.isArray(arvo) ? arvo : [arvo]) {
      if (!e || typeof e !== 'object' || typeof e.tiedosto !== 'string') continue;
      listatut.add(e.tiedosto);
      assert.ok(t2.has(e.tiedosto), e.tiedosto);
      if (e.sha256) assert.equal(createHash('sha256').update(t2.get(e.tiedosto)).digest('hex'), e.sha256, e.tiedosto);
    }
  }
  for (const [polku, teksti] of t2) {
    assert.doesNotMatch(teksti, /matkakirja-vienti\/1\//, polku);
    if (polku.startsWith('kokoelmat/')) assert.ok(JSON.parse(teksti).alkiot.every((a) => !('data' in a)), polku);
  }
  const [laatta] = JSON.parse(t2.get('kokoelmat/laatat.json')).alkiot;
  assert.ok(laatta.tyypit.star.nimi && !('name' in laatta.tyypit.star));
  assert.ok(JSON.parse(t2.get(m.media.tiedosto)).viitteet.every((v) => !('esiintymat' in v) && v.arvo));
});

test('skeema 1.31: ennen 2.0:aa dict-raakadatan jokainen kenttä on päätasolla', () => {
  for (const nimi of ['skandaalit', 'historianHetket', 'monumentit', 'fokusvirrat', 'nahtavyydet', 'paikallisaarteet']) {
    for (const a of JSON.parse(tiedostot.get(`kokoelmat/${nimi}.json`)).alkiot) {
      if (!a.data || typeof a.data !== 'object' || Array.isArray(a.data)) continue;
      for (const k of Object.keys(a.data)) assert.ok(k in a, `${nimi}/${a.id}: ${k}`);
    }
  }
  const [lontoo] = JSON.parse(tiedostot.get('kokoelmat/kaupungit.json')).alkiot.filter((a) => a.id === 'lontoo');
  assert.deepEqual(lontoo.nimionAnkkuri, { tasaus: 'end', dx: -20, dy: 5 });
  assert.equal(lontoo.ambienssi, 'kaupunki');
});

test('2.0-vartija: jokainen dict-raakakenttä on päätasolla tai RAAKA_VASTINEET-listassa', async () => {
  const { RAAKA_VASTINEET } = await import('../tools/vienti/tyypitys.mjs');
  const m = JSON.parse(tiedostot.get('manifest.json'));
  const puuttuu = [];
  for (const { nimi, tiedosto } of m.kokoelmat) {
    for (const a of JSON.parse(tiedostot.get(tiedosto)).alkiot) {
      if (!a.data || typeof a.data !== 'object' || Array.isArray(a.data)) continue;
      for (const k of Object.keys(a.data)) if (!(k in a) && !RAAKA_VASTINEET[nimi]?.[k]) puuttuu.push(`${nimi}.${k}`);
    }
  }
  assert.deepEqual([...new Set(puuttuu)], []);
  const la = new Map(JSON.parse(tiedostot.get('kokoelmat/linssiaineisto.json')).alkiot.map((a) => [a.id, a]));
  assert.ok(la.get('maamaski').juoksut && la.get('pilvet').url && la.get('linssiluennat').keksinnot);
});

test('2.0-julkaisu: osoitin sisalto/2/, oma tarkistus', async () => {
  const { johdaMajor2 } = await import('../tools/vienti/major2.mjs');
  const { tarkistaMajor2 } = await import('../tools/vienti/julkaise-sisalto.mjs');
  const t2 = johdaMajor2(tiedostot);
  assert.deepEqual(tarkistaMajor2(t2), []);
  const j = kokoaJulkaisu({ tiedostot: t2, commit: 'abc1234', julkaistu: JULKAISTU, major: 2 });
  assert.deepEqual(j.virheet, []);
  assert.equal(j.osoitin.polku, 'sisalto/2/v1/');
  assert.equal(j.osoitin.$skeema, 'matkakirja-vienti/2/osoitin');
  assert.equal(j.osoitin.skeemaversio, '2.0');
  const rikki = new Map(t2);
  rikki.set('kokoelmat/kaupungit.json', tiedostot.get('kokoelmat/kaupungit.json'));
  assert.ok(tarkistaMajor2(rikki).length > 0);
});

test('1.x ja 2.0: sama sisältö (Fablen pyyntö 24.9.2026)', async () => {
  const { johdaMajor2, onNatiivinModuuli } = await import('../tools/vienti/major2.mjs');
  const { RAAKA_VASTINEET, TYYPITETYT, RAAKA_KOKONAAN } = await import('../tools/vienti/tyypitys.mjs');
  const t2 = johdaMajor2(tiedostot);
  const tag = (s) => s.replaceAll('matkakirja-vienti/1/', 'matkakirja-vienti/2/').replaceAll('https://matkakirja.app/vienti/1/', 'https://matkakirja.app/vienti/2/');
  const m1 = JSON.parse(tiedostot.get('manifest.json'));
  const ENG = ['name', 'symbol', 'value', 'color'];
  const ilmanEng = (o) => (o && typeof o === 'object' ? Object.fromEntries(Object.entries(o).map(([k, t]) => [k, Object.fromEntries(Object.entries(t).filter(([a]) => !ENG.includes(a)))])) : o);
  for (const { nimi, tiedosto } of m1.kokoelmat) {
    const k1 = JSON.parse(tiedostot.get(tiedosto));
    const k2 = JSON.parse(t2.get(tiedosto));
    assert.equal(k2.alkiot.length, k1.alkiot.length, nimi);
    k1.alkiot.forEach((a, i) => {
      const { data, ...ilman } = a;
      if (nimi === 'laatat') {
        ilman.tyypit = ilmanEng(ilman.tyypit);
        if (ilman.mannerTyypit) ilman.mannerTyypit = Object.fromEntries(Object.entries(ilman.mannerTyypit).map(([mm, t]) => [mm, ilmanEng(t)]));
      }
      assert.deepEqual(k2.alkiot[i], ilman, `${nimi}/${a.id}: 2.0-alkio = 1.x ilman dataa`);
      // Raakadatan jokainen tieto on 2.0:ssa: sama nimi ja arvo, eri niminen vastine tai tyypitetty kenttä.
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        for (const [kk, v] of Object.entries(data)) {
          if (RAAKA_VASTINEET[nimi]?.[kk] || TYYPITETYT[nimi]?.includes(kk)) continue;
          assert.deepEqual(k2.alkiot[i][kk], v, `${nimi}/${a.id}.${kk}`);
        }
      } else if (data != null) {
        assert.ok(RAAKA_KOKONAAN[nimi], `${nimi}: ei-olio-data ilman vastinetta`);
      }
    });
    if (nimi === 'julisteet') for (const a of k1.alkiot) assert.equal(a.nimi, a.data.kaupunki);
    if (nimi === 'kohtaamiskuvat') for (const a of k1.alkiot) assert.equal(a.kaupunginNimi, a.data.kaupunki ?? null);
    if (nimi === 'paikkatiedot') for (const a of k1.alkiot) if (typeof a.data === 'string') assert.equal(a.teksti, a.data);
    if (nimi === 'pulmaaineisto') for (const a of k1.alkiot) assert.deepEqual(a.aineisto, a.data);
    if (nimi === 'miniatyyrit') for (const a of k1.alkiot) assert.equal(a.kuva?.arvo, a.data, a.id);
  }
  for (const mo of m1.moduulit) {
    if (onNatiivinModuuli(mo.moduuli)) assert.equal(t2.get(mo.tiedosto), tag(tiedostot.get(mo.tiedosto)), mo.moduuli);
    else assert.ok(!t2.has(mo.tiedosto), mo.moduuli);
  }
  const med1 = JSON.parse(tiedostot.get(m1.media.tiedosto)).viitteet;
  const med2 = JSON.parse(t2.get(m1.media.tiedosto)).viitteet;
  assert.deepEqual(med2, med1.map(({ esiintymat, ...v }) => v));
  for (const polku of [m1.offline.tiedosto, m1.lisenssit.tiedosto, ...m1.lisatiedostot.map((l) => l.tiedosto)]) {
    assert.equal(t2.get(polku), tag(tiedostot.get(polku)), polku);
  }
});

test('skeema 1.33: maamerkit-kokoelma, tarkistus ja offline-media', async () => {
  const { tarkistaMaamerkit } = await import('../tools/vienti/maamerkit.mjs');
  const { kokoaOffline } = await import('../tools/vienti/offline.mjs');
  const k = JSON.parse(tiedostot.get('kokoelmat/maamerkit.json'));
  assert.ok(Array.isArray(k.alkiot));
  const sha = 'ab12cd34'.padEnd(64, '0');
  const hyva = {
    id: 'lontoo', kaupunki: 'lontoo', lat: 51.5051, lon: -0.115, maanKorkeus: 10, suunta: 0, mallinKorkeus: 97.2,
    malli: { url: `https://media.matkakirja.app/maamerkit/lontoo-${sha.slice(0, 8)}.glb`, sha256: sha, tavuja: 123456 },
    lisenssi: 'CC0-1.0', tekija: 'Matkakirja (oma työ)', lahde: 'Blender-skripti',
  };
  const idt = new Set(['lontoo']);
  assert.deepEqual(tarkistaMaamerkit([hyva], idt), []);
  assert.ok(tarkistaMaamerkit([{ ...hyva, maanKorkeus: '10' }], idt).length);
  assert.ok(tarkistaMaamerkit([{ ...hyva, malli: { ...hyva.malli, url: 'maamerkit/lontoo.glb' } }], idt).length);
  assert.ok(tarkistaMaamerkit([{ ...hyva, malli: { ...hyva.malli, sha256: 'f'.repeat(64) } }], idt).length);
  assert.ok(tarkistaMaamerkit([{ ...hyva, kaupunki: 'atlantis' }], idt).length);
  // Offline: malli maan medialistaan ja tavuihin.
  const t = new Map(tiedostot);
  t.set('kokoelmat/maamerkit.json', JSON.stringify({ ...k, alkiot: [hyva] }));
  const mf = JSON.parse(t.get('manifest.json'));
  const { MAAILMANKARTTA } = await import('../js/packs/maailmankartta.js');
  const ilman = kokoaOffline({ tiedostot, manifest: mf, countryShapes: MAAILMANKARTTA.map.countryShapes });
  const kanssa = kokoaOffline({ tiedostot: t, manifest: mf, countryShapes: MAAILMANKARTTA.map.countryShapes });
  assert.ok(kanssa.maat.GBR.media.includes(hyva.malli.url));
  assert.equal(kanssa.maat.GBR.tavuja.media - ilman.maat.GBR.tavuja.media, 123456);
});

test('avausluennat: teksti ja aikaleimat kohdistettu ruututekstiin (Pelikoodari #3057)', async () => {
  const { existsSync } = await import('node:fs');
  const { INTRO_TEXT, FLIGHT_FIRST } = await import('../js/ui-tekstit.js');
  const l = new Map(JSON.parse(tiedostot.get('kokoelmat/luennat.json')).alkiot.map((a) => [a.id, a]));
  for (const [id, teksti, tiedosto] of [['intro', INTRO_TEXT, 'intro-puhe'], ['lento-alku', FLIGHT_FIRST.join(' '), 'puhe-lento-alku']]) {
    const a = l.get(id);
    assert.equal(a.teksti, teksti, id);
    assert.equal(a.tekstiSha256, createHash('sha256').update(teksti).digest('hex'), id);
    const repo = new URL(`../assets/aikaleimat/${tiedosto}.aikaleimat.json`, import.meta.url);
    if (existsSync(repo)) {
      assert.equal(a.aikaleimaTiedosto, `tiedostot/assets/aikaleimat/${tiedosto}.aikaleimat.json`, id);
      assert.ok(tiedostot.has(a.aikaleimaTiedosto), `${id}: aikaleimat paketissa`);
    }
  }
});

test('skeema 1.35: maat.fokuspohja = webin FOKUS_POHJAT', async () => {
  const { FOKUS_POHJAT } = await import('../js/packs/fokus-grc.js');
  const maat = new Map(JSON.parse(tiedostot.get('kokoelmat/maat.json')).alkiot.map((a) => [a.id, a]));
  for (const [iso, p] of Object.entries(FOKUS_POHJAT)) {
    if (!maat.has(iso)) continue;
    assert.deepEqual(maat.get(iso).fokuspohja.laudalla.bbox, p.bbox, iso);
  }
  const fra = maat.get('FRA').fokuspohja.bbox;
  assert.ok(fra[0] > -20 && fra[2] < 25 && fra[1] > 30 && fra[3] < 60, `FRA ${fra}`);
});

test('skeema 1.36: merinimet kuten webin nimiötasolla (Linssiseppä)', async () => {
  const { NIMISTO_1873 } = await import('../js/packs/nimisto-1873.js');
  const W = await import('../tools/fokuskartta/maailmapiirto.js');
  const k = JSON.parse(tiedostot.get('kokoelmat/merinimet.json'));
  const lahde = NIMISTO_1873.filter((n) => n.luokka === 'meri' && (!n.aika || n.aika === 'pysyva'));
  assert.equal(k.alkiot.length, lahde.length);
  assert.ok(k.alkiot.length >= 29);
  for (const [i, r] of k.alkiot.entries()) {
    assert.equal(r.nimi, lahde[i].teksti);
    assert.equal(r.lat, lahde[i].lat);
    assert.equal(r.lon, lahde[i].lon);
    assert.match(r.id, /^[a-z0-9-]+$/);
    assert.equal(typeof r.kulma, 'number');
    assert.equal(r.kaari, null);
    assert.deepEqual(r.tasot, [4, 5, 6, 7, 8]);
    assert.ok(r.lahde && r.lisenssi);
  }
  assert.equal(new Set(k.alkiot.map((r) => r.id)).size, k.alkiot.length);
  assert.ok(k.alkiot.some((r) => r.id === 'englannin-kanaali'));
  assert.equal(k.tyyli.harvennusEm, W.NIMION_HARVENNUS_EM);
  assert.equal(k.tyyli.vari, W.NIMION_VARIT.meri);
  assert.equal(k.tyyli.fontti, W.NIMION_FONTTI);
  assert.deepEqual(k.tyyli.kirjainkorkeusPx, Object.fromEntries(Object.entries(W.NIMION_KOOT.meri).map(([z, v]) => [z, v])));
  assert.equal(k.tyyli.versaali, true);
});

test('skeema 1.37: aluenimet Karttasepän tiedostosta sellaisenaan', () => {
  const a = JSON.parse(readFileSync(new URL('../assets/data/aluenimet-natiivi.json', import.meta.url), 'utf8'));
  const k = JSON.parse(tiedostot.get('kokoelmat/aluenimet.json'));
  assert.equal(k.aineistoversio, a.versio);
  assert.deepEqual(k.tyylit, a.tyylit);
  assert.deepEqual(k.fontti, a.fontti);
  assert.equal(k.alkiot.length, a.nimet.length + a.valtameret.length);
  const idt = new Map(k.alkiot.map((r) => [r.id, r]));
  assert.equal(idt.size, k.alkiot.length);
  for (const n of a.nimet) assert.deepEqual(idt.get(n.id).paikat, n.paikat, n.id);
  for (const v of a.valtameret) assert.equal(idt.get(v.id).luokka, 'valtameri');
  for (const r of k.alkiot) assert.ok(k.tyylit[r.tyyli], `${r.id}: tyyli`);
  // Merinimet (1.36) ovat aluenimien meriosa samoin tunnuksin.
  const meret = JSON.parse(tiedostot.get('kokoelmat/merinimet.json')).alkiot;
  for (const m of meret) assert.equal(idt.get(m.id)?.luokka, 'meri', m.id);
});

test('skeema 1.38: kaupunkien asukasluku Wikidatasta (Linssiseppä)', () => {
  const a = JSON.parse(readFileSync(new URL('../tools/vienti/kaupunkien-asukkaat.json', import.meta.url), 'utf8'));
  const k = JSON.parse(tiedostot.get('kokoelmat/kaupungit.json')).alkiot;
  assert.equal(Object.keys(a.kaupungit).length, k.length);
  let luvullisia = 0;
  for (const c of k) {
    const r = a.kaupungit[c.id];
    assert.ok(r, c.id);
    assert.equal(c.asukkaat, r.asukkaat, c.id);
    if (c.asukkaat == null) {
      assert.equal(c.asukkaatLahde, null);
      assert.equal(c.asukkaatAlue, false);
      continue;
    }
    luvullisia += 1;
    assert.ok(Number.isInteger(c.asukkaat) && c.asukkaat >= 0, c.id);
    assert.match(c.asukkaatLahde, /^Wikidata P1082 \(CC0\)(, \d{4})?, Q\d+$/);
    assert.equal(typeof c.asukkaatAlue, 'boolean');
  }
  assert.ok(luvullisia >= 220, `asukasluvullisia ${luvullisia}`);
  const lontoo = k.find((c) => c.id === 'lontoo');
  assert.ok(lontoo.asukkaat > 3e6 && !lontoo.asukkaatAlue);
  assert.equal(k.find((c) => c.id === 'sumatra').asukkaatAlue, true);
});

test('skeema 1.39: karttavalojen webin ankkuri ja nimiön kylki (Natiivi-UI, löydös 50 C)', async () => {
  const { lukittuAnkkuri } = await import('../js/pallolauta/nostoankkurit.js');
  const valot = JSON.parse(tiedostot.get('kokoelmat/karttavalot.json')).alkiot;
  let ankkureita = 0;
  for (const v of valot) {
    assert.ok('ankkuri' in v && 'puoli' in v, v.id);
    assert.ok(v.puoli === null || ['oikea', 'vasen', 'yla', 'ala'].includes(v.puoli), `${v.id}: ${v.puoli}`);
    if (v.lahde !== 'fokuskohde' && v.lahde !== 'takynosto' && v.lahde !== 'maalehtinosto') continue;
    const l = lukittuAnkkuri(`nosto:${v.tunnus}`, v.maa);
    assert.deepEqual(v.ankkuri, l ? { lat: l.lat, lon: l.lng } : null, v.id);
    if (v.ankkuri) ankkureita += 1;
  }
  assert.ok(ankkureita > 400, `ankkureita ${ankkureita}`);
  // Mittauksen esimerkki: Versailles on webissä omassa paikassaan, ei Pariisin kyljessä.
  const vers = valot.find((v) => v.maa === 'FRA' && v.tunnus === 'nosto-maalehti-peilisali');
  assert.ok(vers && Math.abs(vers.ankkuri.lat - 48.806) < 0.01 && Math.abs(vers.ankkuri.lon - 2.12) < 0.01, JSON.stringify(vers?.ankkuri));
  const iraklion = valot.find((v) => v.maa === 'GRC' && v.tunnus === 'iraklion');
  assert.deepEqual(iraklion.ankkuri, { lat: 35.341508, lon: 25.133 });
});

test('skeema 1.40: kartan nimiöt mahtuvat 18 merkkiin, monumentit.nimio (Sisältökirjuri #3162)', () => {
  const valot = JSON.parse(tiedostot.get('kokoelmat/karttavalot.json')).alkiot;
  const pitkat = valot.filter((v) => v.paakartalla && v.nimio && v.nimio.length > 18);
  assert.deepEqual(pitkat.map((v) => `${v.id}: ${v.nimio}`), []);
  const mon = JSON.parse(tiedostot.get('kokoelmat/monumentit.json')).alkiot;
  assert.ok(mon.some((m) => m.nimio), 'monumentit.nimio puuttuu');
  for (const m of mon) if (m.nimio) assert.ok(m.nimio.length <= 18 && m.nimio.length < (m.nimi ?? '').length + 1, `${m.id}: ${m.nimio}`);
});

test('skeema 1.41: offline-rasteri sarjasta 2026-09-25, z9 vain kaupunkien ympärillä (Natiiviseppä, build 13)', () => {
  const o = JSON.parse(tiedostot.get('offline.json'));
  const R = o.lahteet.rasteri;
  assert.match(R.url, /\/2026-09-25-pohja-20260925\/\{z\}\/\{x\}\/\{y\}\.jpg$/);
  assert.equal(R.maxzoom, 9);
  assert.deepEqual(R.kaupunkitaso.tasot, [9]);
  const kaupungit = JSON.parse(tiedostot.get('kokoelmat/kaupungit.json')).alkiot.filter((c) => c.tyyppi === 'kaupunki');
  assert.ok(kaupungit.length >= 70);
  let valeja = 0;
  for (const [iso, m] of Object.entries(o.maat)) {
    for (const z of [6, 7, 8]) if (m.rasteri[z]) assert.equal(m.rasteri[z].length, 4, `${iso} z${z}`);
    const omat = kaupungit.filter((c) => c.maa === iso);
    if (!omat.length) { assert.equal(m.rasteri[9], undefined, iso); continue; }
    assert.equal(m.rasteri[9].length, omat.length, iso);
    for (const [x0, y0, x1, y1] of m.rasteri[9]) {
      assert.ok(x0 <= x1 && y0 <= y1 && x1 - x0 <= 3 && y1 - y0 <= 3, `${iso}: ${[x0, y0, x1, y1]}`);
    }
    valeja += m.rasteri[9].length;
  }
  assert.equal(valeja, kaupungit.filter((c) => o.maat[c.maa]).length);
  // Pariisi (48.86, 2.35) z9: laatta x = 259, y = 176 on välissä.
  const fra = o.maat.FRA.rasteri[9];
  assert.ok(fra.some(([x0, y0, x1, y1]) => x0 <= 259 && 259 <= x1 && y0 <= 176 && 176 <= y1), JSON.stringify(fra));
});

test('skeema 1.42: maakuntarajat kaikista webin maakuntamaista, juuren maat', async () => {
  const { MAAKUNTIEN_MAAT, maakunnanNimi, maakuntienMaa } = await import('../js/karttatyokalu-maakunnat.js');
  const k = JSON.parse(tiedostot.get('kokoelmat/maakuntarajat.json'));
  assert.ok(k.maat.length >= 130, `maita ${k.maat.length}`);
  const listalla = new Set(MAAKUNTIEN_MAAT.filter((m) => maakuntienMaa(m.iso)).map((m) => m.iso));
  assert.deepEqual([...listalla].sort(), k.maat.map((m) => m.iso3).sort(), 'maat = webin maakuntienMaa-maat');
  const omat = new Set(k.alkiot.map((a) => a.iso3));
  assert.deepEqual(k.maat.map((m) => m.iso3).sort(), [...omat].sort());
  for (const m of k.maat) assert.ok(listalla.has(m.iso3) && m.nimi, m.iso3);
  for (const a of k.alkiot) assert.equal(a.nimi, maakunnanNimi(a.iso3, a.id.slice(4)), a.id);
});

test('skeema 1.43: maakuntarajojen vari webin aineistosta (Natiiviseppä)', () => {
  const alueet = JSON.parse(tiedostot.get('kokoelmat/maakuntarajat.json')).alkiot;
  assert.ok(alueet.every((a) => Number.isInteger(a.vari) && a.vari >= 0 && a.vari <= 4), 'vari 0–4');
  assert.ok(new Set(alueet.map((a) => a.vari)).size >= 3);
});

test('taustapäivitys vaihe 1: hakemisto kattaa paketin ja osoittimen tiiviste lasketaan sen riveistä', () => {
  const j = kokoaJulkaisu({ tiedostot, commit: 'abc1234', julkaistu: JULKAISTU });
  assert.deepEqual(j.virheet, []);
  const h = JSON.parse(j.hakemisto.teksti);
  assert.deepEqual(h.tiedostot.map((r) => r.polku), [...tiedostot.keys()].sort());
  const sha = (t) => createHash('sha256').update(t).digest('hex');
  for (const r of h.tiedostot) {
    assert.equal(r.sha256, sha(tiedostot.get(r.polku)), r.polku);
    assert.equal(r.tavuja, Buffer.byteLength(tiedostot.get(r.polku)), r.polku);
    assert.ok(r.siirto > 0 && r.siirto <= r.tavuja + 16, r.polku);
  }
  // Natiivin tarkistus: rivit "polku\tsha256\n" aakkosjärjestyksessä → osoitin.sha256.
  assert.equal(sha(h.tiedostot.map((r) => `${r.polku}\t${r.sha256}\n`).join('')), j.osoitin.sha256);
  assert.deepEqual(j.osoitin.hakemisto, { polku: 'hakemisto.json', sha256: sha(j.hakemisto.teksti), tavuja: Buffer.byteLength(j.hakemisto.teksti) });
  assert.equal(j.osoitin.tavuja, h.tiedostot.reduce((a, r) => a + r.tavuja, 0));
  assert.ok(j.osoitin.siirto < j.osoitin.tavuja);
  assert.ok(!tiedostot.has('hakemisto.json'), 'hakemisto ei kuulu pakettiin eikä tiivisteeseen');
});

test('taustapäivitys vaihe 1: tasoittain periytyy ja uusi taso jättää vanhan viimeiseen kelpaavaan', () => {
  const eka = kokoaJulkaisu({ tiedostot, commit: 'abc1234', julkaistu: JULKAISTU }).osoitin;
  assert.deepEqual(eka.tasoittain, { ios: { [String(MIN_SOVELLUS.ios)]: 1 } });
  assert.deepEqual(kokoaTasoittain({ tasoittain: { ios: { 1: 106 } } }, 107, { ios: 1 }), { ios: { 1: 107 } });
  assert.deepEqual(kokoaTasoittain({ tasoittain: { ios: { 1: 107 } } }, 108, { ios: 2 }), { ios: { 1: 107, 2: 108 } });
  assert.deepEqual(kokoaTasoittain(null, 5, { ios: 1 }), { ios: { 1: 5 } });
  assert.ok(validoiNimella({ ...eka, tasoittain: { ios: { x: 1 } } }, 'osoitin.schema.json').length);
});

test('skeema 1.44: karttavalot.laji = webin symLaji (löydös 125, Kreikka)', () => {
  const valot = JSON.parse(tiedostot.get('kokoelmat/karttavalot.json')).alkiot;
  assert.ok(valot.every((v) => 'laji' in v), 'laji jokaisella rivillä');
  const laji = (tunnus) => valot.find((v) => v.maa === 'GRC' && v.tunnus === tunnus)?.laji;
  assert.equal(laji('parnassos'), 'vuori');
  assert.equal(laji('santorini'), 'saari');
  assert.equal(laji('egeanmeri'), 'meri');
  assert.equal(laji('aliakmonas'), 'joki');
  assert.ok(valot.filter((v) => v.lahde === 'elaintaky').every((v) => v.laji === 'elain'));
});

test('skeema 1.45: Elävä kartta — kokoluokka, maakunta ja salaisuus', async () => {
  const { NOSTOJEN_KOKOLUOKAT } = await import('../js/packs/nostojen-kokoluokat.js');
  const valot = JSON.parse(tiedostot.get('kokoelmat/karttavalot.json')).alkiot;
  assert.ok(valot.every((v) => ['paakohde', 'kohde', 'pieni'].includes(v.kokoluokka)), 'kokoluokka jokaisella');
  const grc = Object.entries(NOSTOJEN_KOKOLUOKAT.GRC);
  for (const [avain, luokka] of grc) {
    const v = valot.find((x) => x.maa === 'GRC' && `nosto:${x.tunnus}` === avain);
    if (v) assert.equal(v.kokoluokka, luokka, avain);
  }
  assert.ok(valot.filter((v) => v.kokoluokkaLahde === 'data').length >= grc.length * 0.9);
  const alueet = new Set(JSON.parse(tiedostot.get('kokoelmat/maakuntarajat.json')).alkiot.map((a) => a.id));
  assert.ok(valot.every((v) => v.maakunta === null || (alueet.has(v.maakunta) && v.maakunta.startsWith(`${v.maa}:`))));
  const maakunta = (t) => valot.find((v) => v.maa === 'GRC' && v.tunnus === t)?.maakunta;
  assert.equal(maakunta('hahmotelma-sounion'), 'GRC:Attiki');
  assert.equal(maakunta('egeanmeri'), null);
  const rajat = JSON.parse(tiedostot.get('kokoelmat/maakuntarajat.json')).alkiot;
  assert.ok(rajat.every((a) => 'salaisuus' in a));
});

test('skeema 1.46: reitit1873 (laivat ja rautatiet, lisenssi jokaisella)', () => {
  const k = JSON.parse(tiedostot.get('kokoelmat/reitit1873.json'));
  assert.ok(k.alkiot.length > 100);
  assert.ok(k.lahteet.length && k.lahteet.every((l) => l.id && l.lisenssi));
  for (const r of k.alkiot) {
    assert.ok(['laiva', 'rautatie'].includes(r.laji), r.id);
    assert.ok(r.lisenssi && typeof r.lahde === 'string' && r.lahde.length, r.id);
    assert.ok(r.viivat.length && r.viivat.every((v) => v.length >= 2 && v.every(([lon, lat]) => Math.abs(lon) <= 180 && Math.abs(lat) <= 90)), r.id);
  }
  assert.ok(k.alkiot.some((r) => r.laji === 'laiva') && k.alkiot.some((r) => r.laji === 'rautatie'));
});

test('skeema 1.47: maakuntasalaisuudet karttavaloina (Pelikoodari)', async () => {
  const { MAAKUNTASALAISUUDET } = await import('../js/packs/maakuntasalaisuudet.js');
  const valot = JSON.parse(tiedostot.get('kokoelmat/karttavalot.json')).alkiot;
  const salaiset = valot.filter((v) => v.salaisuus === true);
  assert.equal(salaiset.length, Object.keys(MAAKUNTASALAISUUDET).length);
  assert.ok(valot.every((v) => typeof v.salaisuus === 'boolean'));
  for (const v of salaiset) {
    assert.ok(v.id.startsWith('salaisuus:') && v.kokoluokka === 'paakohde' && v.lahde === 'maakuntasalaisuus', v.id);
    assert.ok(v.maakunta && v.teksti && v.lyhyt && Number.isFinite(v.lat) && Number.isFinite(v.lon) && v.aihe, v.id);
    assert.equal(MAAKUNTASALAISUUDET[v.maakunta], `nosto:${v.tunnus}`);
  }
  const rajat = JSON.parse(tiedostot.get('kokoelmat/maakuntarajat.json')).alkiot;
  assert.equal(rajat.find((a) => a.id === 'GRC:Attiki').salaisuus, 'salaisuus:salaisuus-eleusiin-mysteerit');
});

