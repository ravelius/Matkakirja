/*
 * LUENTAREAKTIOT — pulu reagoi isoisän luennan sisällä.
 *
 * Raamattu: PULU REAGOI TEKSTIN SISALLA; skeema docs/pulu-reaktiot.md
 * osiossa "Luentareaktiot (tekstin sisällä)". Testi vartioi neljää
 * asiaa, joita ei näe pelistä kuin kuuntelemalla:
 *
 *   1. ANKKURIN RATKAISU: pakin `ankkuri` löytyy äänitteen
 *      sanakohtaisista aikaleimoista sanasta sanaan, välimerkeistä ja
 *      kirjainkoosta riippumatta — TÄSMÄLLEEN KERRAN — eikä epäselvä
 *      rivi koskaan arvaa hetkeä.
 *   2. AJOITUS: reaktio ammutaan kerran ja oikeassa kohdassa; tauko ei
 *      ammu, tauolla ohitettu hetki ei purkaudu jälkikäteen, kelaus
 *      eteenpäin ei ammu väliin jääneitä, kelaus taaksepäin palauttaa
 *      ne. Luennan luonnollinen loppu saa vielä jälkireaktion.
 *   3. TAPAHTUMASOPIMUS sovittimen kanssa (js/livia-eleet.js):
 *      `luentaTunnus` on soitin, `tunnus` on reaktion tunniste, ja
 *      `reactionEnd` katkaisee eleen kaikissa muissa lopuissa paitsi
 *      luennan luonnollisessa.
 *   4. AIKALEIMATIEDOSTO ON SIDOTTU: versio 2 kantaa tekstin ja
 *      äänitteen SHA-256:n, eikä peli ammu mitään, jos jompikumpi on
 *      vaihtunut. Väärään äänitteeseen kohdistetut ajat kuulostavat
 *      toimivilta mutta osuvat viereiseen lauseeseen.
 *   5. SISÄLLÖN VARTIO: jokaisen fokusvirtapakin reaktioankkuri löytyy
 *      sen OMASTA luentatekstistä ja tarkoitus kuuluu sallittuun
 *      joukkoon. Väärä ankkuri olisi pelissä pelkkää hiljaisuutta.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { kuunteleLivianTilanteita } from '../js/livia-tilanteet.js';
import {
  AIKALEIMOJEN_VERSIO, LOPPUVARA_MS, REAKTION_TARKOITUKSET, aikaleimojenOsoite,
  kaupunkiOsoitteesta, kytkeLuentareaktiot, lataaLuentareaktiot, ratkaiseAnkkurit,
  tarkistaAikaleimat,
} from '../js/luentareaktiot.js';
import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';
import { karsiTagit } from '../tools/generoi-linssiluennat.mjs';
import {
  REAKTION_TARKOITUKSET as TYOKALUN_TARKOITUKSET, etsiAnkkuri, laskeAnkkurinOsumat, sanoiksi,
} from '../tools/kohdista-luennat.mjs';

const JUURI = new URL('..', import.meta.url);
const lue = (polku) => readFileSync(new URL(polku, JUURI), 'utf8');

/** Sama summa kuin pelissä (crypto.subtle) — testissä node:crypto riittää. */
const sha = (data) => createHash('sha256').update(data).digest('hex');

/** Äänitettä esittävät tavut: mp3:n sisällöllä ei ole tässä väliä. */
const AANI = Buffer.from('kuviteltu matkakirjaluenta — pelkkiä tavuja', 'utf8');

/**
 * Aikaleimatiedosto tekstistä: sana sekunnin välein, 400 ms per sana.
 * Muoto on VERSIO 2 eli sidottu tekstiin ja äänitteeseen; `muutos`
 * ylikirjoittaa kenttiä, kun testi haluaa rikkoa juuri yhden asian.
 */
function aikaleimat(teksti, muutos = {}) {
  const sanat = teksti.split(/\s+/).filter(Boolean).map((sana, i) => ({
    sana, alku: i * 1000, loppu: i * 1000 + 400,
  }));
  return {
    versio: AIKALEIMOJEN_VERSIO,
    kaupunki: 'testikaupunki',
    teksti,
    tekstiSha256: sha(Buffer.from(teksti, 'utf8')),
    aani: {
      nimi: 'puhe-fokus-matkakirja-testikaupunki.mp3',
      versio: 0,
      tavut: AANI.length,
      sha256: sha(AANI),
    },
    kesto: sanat.length * 1000,
    sanat,
    lauseet: [0],
    ...muutos,
  };
}

/** Soitinta esittävä EventTarget (sama tyyli kuin livia-tilanteet-testi). */
function soitin() {
  const a = new EventTarget();
  a.currentTime = 0;
  a.paused = false;
  a.ended = false;
  a.aja = (sekunnit) => { a.currentTime = sekunnit; a.dispatchEvent(new Event('timeupdate')); };
  return a;
}

/** Kerää reaction- ja reactionEnd-tapahtumat testin ajaksi. */
function kuuntele(t) {
  const osumat = [];
  const loput = [];
  const off = kuunteleLivianTilanteita((laji, tiedot) => {
    if (laji === 'reaction') osumat.push(tiedot);
    if (laji === 'reactionEnd') loput.push(tiedot);
  });
  t.after(off);
  return { osumat, loput };
}

test('ankkuri ratkeaa sanasta sanaan; välimerkit ja kirjainkoko eivät ratkaise', () => {
  const data = aikaleimat('Ostin palan saippuaa. Terva, kala ja suolavesi seurasivat minua.');
  const lista = ratkaiseAnkkurit([
    { id: 'a', ankkuri: 'Ostin palan.', tarkoitus: 'myotailee', voimakkuus: 0.3, siirtyma: 0 },
    { id: 'b', ankkuri: 'terva KALA ja suolavesi', tarkoitus: 'huvittuu', voimakkuus: 0.45, siirtyma: 120 },
  ], data);
  // "palan" on toinen sana: loppu 1400 ms.
  assert.deepEqual(lista[0], { id: 'a', hetki: 1400, tarkoitus: 'myotailee', voimakkuus: 0.3 });
  // "suolavesi" on seitsemäs sana (indeksi 6): loppu 6400 + siirtymä 120.
  assert.deepEqual(lista[1], { id: 'b', hetki: 6520, tarkoitus: 'huvittuu', voimakkuus: 0.45 });
});

test('löytymätön ankkuri ja tuntematon tarkoitus ohitetaan, ei arvata hetkeä', () => {
  const data = aikaleimat('Marseillen satamassa myytiin saippuaa tiiliskivinä.');
  assert.deepEqual(ratkaiseAnkkurit([
    { id: 'ei-ole', ankkuri: 'kauppias vakuutti', tarkoitus: 'epailee', voimakkuus: 0.5 },
    { id: 'vaara-tarkoitus', ankkuri: 'saippuaa tiiliskivinä', tarkoitus: 'nauraa', voimakkuus: 0.5 },
    { id: 'tyhja', ankkuri: '', tarkoitus: 'huvittuu', voimakkuus: 0.5 },
  ], data), []);
  // Ilman aikaleimoja ei synny yhtään hetkeä (ei merkkimääräarvioita).
  assert.deepEqual(ratkaiseAnkkurit([
    { id: 'a', ankkuri: 'saippuaa tiiliskivinä', tarkoitus: 'huvittuu', voimakkuus: 0.5 },
  ], null), []);
  // Puuttuva siirtymä on nolla.
  const [rivi] = ratkaiseAnkkurit([
    { id: 'a', ankkuri: 'saippuaa tiiliskivinä', tarkoitus: 'huvittuu', voimakkuus: 0.5 },
  ], data);
  assert.deepEqual(rivi, { id: 'a', hetki: 4400, tarkoitus: 'huvittuu', voimakkuus: 0.5 });
});

test('moottori ei arvaa: moniosuma, vajaa loppu, toistuva tunnus ja kelvoton luku hylätään', () => {
  const data = aikaleimat('Ostin palan saippuaa. Ostin palan leipää.');
  const yksi = (reaktio) => ratkaiseAnkkurit([reaktio], data).map((r) => r.id);

  // 1. Kahdesti osuva ankkuri: kumpi osuma olisi oikea? Ei kumpikaan.
  assert.deepEqual(yksi({ id: 'moni', ankkuri: 'Ostin palan', tarkoitus: 'myotailee', voimakkuus: 0.3 }), []);
  assert.deepEqual(yksi({ id: 'yksi', ankkuri: 'palan leipää', tarkoitus: 'myotailee', voimakkuus: 0.3 }), ['yksi']);

  // 2. Vajaa tiedosto: viimeiseltä sanalta puuttuu loppu → ei kurkoteta
  //    seuraavan sanan alkuun.
  const vajaa = aikaleimat('Ostin palan saippuaa.');
  delete vajaa.sanat[1].loppu;
  assert.deepEqual(ratkaiseAnkkurit([
    { id: 'a', ankkuri: 'Ostin palan', tarkoitus: 'myotailee', voimakkuus: 0.3 },
  ], vajaa), []);

  // 3. Toistuva tunnus: sovitin tunnistaa eleen tunnuksesta, joten
  //    kumpaakaan ei ammuta.
  assert.deepEqual(ratkaiseAnkkurit([
    { id: 'sama', ankkuri: 'Ostin palan saippuaa', tarkoitus: 'myotailee', voimakkuus: 0.3 },
    { id: 'sama', ankkuri: 'palan leipää', tarkoitus: 'huvittuu', voimakkuus: 0.4 },
  ], data), []);
  assert.deepEqual(ratkaiseAnkkurit([
    { id: '', ankkuri: 'palan leipää', tarkoitus: 'huvittuu', voimakkuus: 0.4 },
  ], data), []);

  // 4. Voimakkuutta EI enää rajata: kelvoton luku on sisällön virhe.
  for (const voimakkuus of [3, 0, -1, 'paljon', undefined]) {
    assert.deepEqual(yksi({ id: 'v', ankkuri: 'palan leipää', tarkoitus: 'huvittuu', voimakkuus }), [],
      `voimakkuus ${voimakkuus} olisi pitänyt hylätä`);
  }

  // 5. Siirtymä on kokonaisluku millisekunteina, ja hetken on osuttava
  //    äänitteeseen (loppuvara mukaan luettuna).
  assert.deepEqual(yksi({ id: 's', ankkuri: 'palan leipää', tarkoitus: 'huvittuu', voimakkuus: 0.4, siirtyma: 12.5 }), []);
  assert.deepEqual(yksi({ id: 's', ankkuri: 'palan leipää', tarkoitus: 'huvittuu', voimakkuus: 0.4, siirtyma: 60000 }), []);
  // Viimeinen sana loppuu 6400 ms, kesto 7000 ms: loppuvara riittää.
  assert.deepEqual(yksi({
    id: 's', ankkuri: 'palan leipää', tarkoitus: 'huvittuu', voimakkuus: 0.4, siirtyma: LOPPUVARA_MS + 600,
  }), ['s']);
  assert.deepEqual(yksi({
    id: 's', ankkuri: 'palan leipää', tarkoitus: 'huvittuu', voimakkuus: 0.4, siirtyma: LOPPUVARA_MS + 700,
  }), []);
});

test('reaktio ammutaan kerran ja vasta hetkellään; tauko ei ammu', (t) => {
  const { osumat } = kuuntele(t);
  const a = soitin();
  const purku = kytkeLuentareaktiot(a, [
    { id: 'r1', hetki: 2000, tarkoitus: 'huvittuu', voimakkuus: 0.35 },
    { id: 'r2', hetki: 3000, tarkoitus: 'epailee', voimakkuus: 0.5 },
  ], { kaupunki: 'marseille' });
  t.after(purku);

  a.dispatchEvent(new Event('playing'));
  a.aja(1.5);
  assert.equal(osumat.length, 0, 'ennen hetkeä ei ammuta');
  a.aja(2.1);
  assert.equal(osumat.length, 1);
  assert.equal(osumat[0].tunnus, 'r1');
  assert.equal(osumat[0].lahde, 'matkakirja');
  assert.equal(osumat[0].kaupunki, 'marseille');
  assert.equal(osumat[0].tarkoitus, 'huvittuu');
  assert.equal(osumat[0].voimakkuus, 0.35);
  assert.equal(osumat[0].jalkireaktio, false, 'tavallinen osuma ei ole jälkireaktio');
  // TAPAHTUMASOPIMUS: soitin kulkee mukana kentässä luentaTunnus (sama
  // olio kuin narration-tapahtuman tunnus), ei enää nimellä tunnus2.
  assert.equal(osumat[0].luentaTunnus, a);
  assert.equal('tunnus2' in osumat[0], false, 'vanha kenttä tunnus2 on poistettu');
  a.aja(2.4);
  assert.equal(osumat.length, 1, 'sama reaktio ei ammu kahdesti');

  // Tauko: kello ei etene eikä pysähtynyt soitin reagoi.
  a.paused = true;
  a.dispatchEvent(new Event('pause'));
  a.currentTime = 3.2;
  a.dispatchEvent(new Event('timeupdate'));
  assert.equal(osumat.length, 1, 'tauko ei ammu');
  a.paused = false;
  a.dispatchEvent(new Event('playing'));
  assert.equal(osumat.length, 1, 'jatko ei ammu tauolla ohitettua hetkeä');
  a.aja(3.4);
  assert.equal(osumat.length, 1, 'ohitettu hetki pysyy ohitettuna');
});

test('puskurointi (waiting) ei ammu eikä pura ohitettua hetkeä jälkikäteen', (t) => {
  const { osumat } = kuuntele(t);
  const a = soitin();
  const purku = kytkeLuentareaktiot(a, [
    { id: 'r1', hetki: 1000, tarkoitus: 'huvittuu', voimakkuus: 0.35 },
    { id: 'r2', hetki: 1500, tarkoitus: 'epailee', voimakkuus: 0.5 },
  ], { kaupunki: 'marseille' });
  t.after(purku);

  a.dispatchEvent(new Event('playing'));
  a.aja(0.8);
  assert.equal(osumat.length, 0);
  // Puskurointi ei pysäytä soitinta (paused pysyy epätotena), mutta
  // kello juoksee ilman ääntä — hetki 1,0 s kuullaan ilman reaktiota.
  a.dispatchEvent(new Event('waiting'));
  a.aja(1.1);
  assert.equal(osumat.length, 0, 'puskuroinnissa ei ammuta');
  a.dispatchEvent(new Event('playing'));
  assert.equal(osumat.length, 0, 'ohitettu hetki on jo mennyt, sitä ei ammuta jälkikäteen');
  a.aja(1.6);
  assert.deepEqual(osumat.map((o) => o.tunnus), ['r2'], 'seuraava reaktio ammutaan normaalisti');
});

test('kelaus taaksepäin sallii uudelleen, eteenpäin ohittaa väliin jääneet', (t) => {
  const { osumat } = kuuntele(t);
  const a = soitin();
  const purku = kytkeLuentareaktiot(a, [
    { id: 'r1', hetki: 2000, tarkoitus: 'huvittuu', voimakkuus: 0.35 },
    { id: 'r2', hetki: 6000, tarkoitus: 'epailee', voimakkuus: 0.5 },
    { id: 'r3', hetki: 9000, tarkoitus: 'vakavoituu', voimakkuus: 0.4 },
  ], { kaupunki: 'marseille' });
  t.after(purku);

  a.dispatchEvent(new Event('playing'));
  a.aja(1.4);
  a.aja(2.2);
  assert.deepEqual(osumat.map((o) => o.tunnus), ['r1']);

  // Eteenpäin kelaus r3:n yli: r2 ja r3 jäävät väliin eikä niitä ammuta.
  a.dispatchEvent(new Event('seeking'));
  a.currentTime = 9.5;
  a.dispatchEvent(new Event('seeked'));
  a.aja(9.5);
  assert.deepEqual(osumat.map((o) => o.tunnus), ['r1'], 'väliin jääneitä ei ammuta jälkikäteen');
  a.aja(9.8);
  assert.equal(osumat.length, 1);

  // Taaksepäin kelaus: ohitetut palaavat ammuttaviksi.
  a.dispatchEvent(new Event('seeking'));
  a.currentTime = 5.5;
  a.dispatchEvent(new Event('seeked'));
  a.aja(5.5);
  assert.equal(osumat.length, 1);
  a.aja(6.2);
  assert.deepEqual(osumat.map((o) => o.tunnus), ['r1', 'r2']);
  a.aja(7.6);
  a.aja(9.2);
  assert.deepEqual(osumat.map((o) => o.tunnus), ['r1', 'r2', 'r3']);
});

test('reactionEnd katkaisee eleen kelauksessa, tauolla ja purussa', (t) => {
  const { osumat, loput } = kuuntele(t);
  const a = soitin();
  const purku = kytkeLuentareaktiot(a, [
    { id: 'r1', hetki: 1000, tarkoitus: 'huvittuu', voimakkuus: 0.3 },
    { id: 'r2', hetki: 5000, tarkoitus: 'epailee', voimakkuus: 0.4 },
  ], { kaupunki: 'marseille' });

  a.dispatchEvent(new Event('playing'));
  a.aja(0.5);
  a.dispatchEvent(new Event('pause'));
  assert.equal(loput.length, 0, 'tyhjiä loppuja ei lähetetä, jos mitään ei ole ammuttu');

  a.dispatchEvent(new Event('playing'));
  a.aja(1.2);
  assert.equal(osumat.length, 1);
  a.dispatchEvent(new Event('seeking'));
  assert.equal(loput.length, 1, 'kelaus katkaisee eleen ennen kelauksen käsittelyä');
  assert.equal(loput[0].lahde, 'matkakirja');
  assert.equal(loput[0].kaupunki, 'marseille');
  assert.equal(loput[0].luentaTunnus, a, 'sovitin tunnistaa luentakerran soittimesta');
  a.dispatchEvent(new Event('seeked'));
  assert.equal(loput.length, 1, 'sama loppu ei toistu');

  // Uusi reaktio ja tauko: tauko katkaisee eleen.
  a.currentTime = 4.9;
  a.dispatchEvent(new Event('playing'));
  a.aja(5.2);
  assert.deepEqual(osumat.map((o) => o.tunnus), ['r1', 'r2']);
  a.paused = true;
  a.dispatchEvent(new Event('pause'));
  assert.equal(loput.length, 2);

  // Purku ilman ammuttua reaktiota ei lähetä mitään…
  purku();
  assert.equal(loput.length, 2);

  // …mutta purku kesken eleen lähettää.
  const b = soitin();
  const puraB = kytkeLuentareaktiot(b, [
    { id: 'r1', hetki: 1000, tarkoitus: 'huvittuu', voimakkuus: 0.3 },
  ], { kaupunki: 'marseille' });
  b.dispatchEvent(new Event('playing'));
  b.aja(1.1);
  assert.equal(osumat.length, 3);
  puraB();
  assert.equal(loput.length, 3);
  assert.equal(loput[2].luentaTunnus, b);
});

test('voimassa() epätosi purkaa kytkennän ja katkaisee eleen', (t) => {
  const { osumat, loput } = kuuntele(t);
  const a = soitin();
  let voimassa = true;
  kytkeLuentareaktiot(a, [
    { id: 'r1', hetki: 1000, tarkoitus: 'huvittuu', voimakkuus: 0.3 },
    { id: 'r2', hetki: 2000, tarkoitus: 'epailee', voimakkuus: 0.4 },
  ], { kaupunki: 'marseille', voimassa: () => voimassa });
  a.dispatchEvent(new Event('playing'));
  a.aja(1.1);
  assert.equal(osumat.length, 1);
  // Luenta vaihtui toisaalla: seuraava osuma purkaa kytkennän.
  voimassa = false;
  a.aja(2.1);
  assert.equal(osumat.length, 1, 'vanhentunut kytkentä ei ammu');
  assert.equal(loput.length, 1, 'ele katkaistaan purettaessa');
  voimassa = true;
  a.aja(2.5);
  assert.equal(osumat.length, 1, 'kuuntelijat on irrotettu lopullisesti');
});

test('luennan luonnollinen loppu ampuu jälkireaktion eikä lähetä reactionEndiä', (t) => {
  const { osumat, loput } = kuuntele(t);
  const a = soitin();
  // Marseillen loppuvitsi: hetki on äänitteen kesto-metadatan (29239 ms)
  // tuntumassa, ja soitin ehtii 'ended'-tapahtumaan ennen viimeistä
  // timeupdatea.
  kytkeLuentareaktiot(a, [
    { id: 'marseille.r6', hetki: 29359, tarkoitus: 'huvittuu', voimakkuus: 0.6 },
  ], { kaupunki: 'marseille' });
  a.dispatchEvent(new Event('playing'));
  a.aja(29.1);
  assert.equal(osumat.length, 0, 'ennen hetkeä ei ammuta');

  a.currentTime = 29.28;
  a.ended = true;
  a.dispatchEvent(new Event('ended'));
  assert.equal(osumat.length, 1, 'loppuvara ampuu viimeisen reaktion');
  assert.equal(osumat[0].tunnus, 'marseille.r6');
  assert.equal(osumat[0].jalkireaktio, true);
  assert.equal(osumat[0].luentaTunnus, a);
  assert.equal(loput.length, 0, 'jälkireaktio saa valmistua äänitteen jälkeen');

  a.ended = false;
  a.aja(30);
  assert.equal(osumat.length, 1, 'kuuntelijat irtosivat lopussa');
});

test('loppu, tyhjennys ja purku irrottavat kuuntelijat', (t) => {
  const { osumat, loput } = kuuntele(t);
  const a = soitin();
  // Hetki on kaukana loppuvaran ulkopuolella (currentTime 0), joten
  // 'ended' ei ammu sitä jälkireaktiona.
  kytkeLuentareaktiot(a, [{ id: 'r1', hetki: 10000, tarkoitus: 'huvittuu', voimakkuus: 0.3 }], {});
  a.dispatchEvent(new Event('ended'));
  a.aja(20);
  assert.equal(osumat.length, 0, 'loppunut luenta ei enää ammu');

  const b = soitin();
  const purku = kytkeLuentareaktiot(b, [{ id: 'r1', hetki: 1000, tarkoitus: 'huvittuu', voimakkuus: 0.3 }], {});
  purku();
  b.aja(2);
  assert.equal(osumat.length, 0, 'purettu kytkentä ei ammu');
  assert.equal(loput.length, 0, 'eikä tyhjä purku lähetä reactionEndiä');

  // Tyhjennys ja virhe purkavat samoin.
  const c = soitin();
  kytkeLuentareaktiot(c, [{ id: 'r1', hetki: 1000, tarkoitus: 'huvittuu', voimakkuus: 0.3 }], {});
  c.dispatchEvent(new Event('emptied'));
  c.dispatchEvent(new Event('playing'));
  c.aja(2);
  assert.equal(osumat.length, 0, 'tyhjennetty soitin ei ammu');

  const d = soitin();
  kytkeLuentareaktiot(d, [{ id: 'r1', hetki: 1000, tarkoitus: 'huvittuu', voimakkuus: 0.3 }], {});
  d.dispatchEvent(new Event('error'));
  d.dispatchEvent(new Event('playing'));
  d.aja(2);
  assert.equal(osumat.length, 0, 'virheen jälkeen ei ammuta');

  // Tyhjä lista ei kytke mitään, mutta palauttaa kelvollisen purun.
  assert.equal(typeof kytkeLuentareaktiot(soitin(), [], {}), 'function');
});

test('validaattori hylkää kaiken, mikä ei ole sidottu tähän tekstiin ja äänitteeseen', async () => {
  const teksti = 'Ostin palan saippuaa. Terva seurasi minua.';
  const aani = { tavut: AANI.length, sha256: sha(AANI) };
  const kelpo = aikaleimat(teksti);
  const syy = async (data, odotus = { teksti, aani }) => {
    const tulos = await tarkistaAikaleimat(data, odotus);
    return tulos.ok ? null : tulos.syy;
  };

  assert.equal(await syy(kelpo), null, 'kelvollinen tiedosto kelpaa');
  assert.match(await syy({ ...kelpo, versio: 999 }), /versio/);
  assert.match(await syy({ ...kelpo, versio: 1 }), /versio/);
  assert.match(await syy({ ...kelpo, teksti: `${teksti} ` }), /teksti/);
  assert.match(await syy({ ...kelpo, tekstiSha256: sha(Buffer.from('muu')) }), /tekstiSha256/);
  assert.match(await syy({ ...kelpo, sanat: [] }), /sanat/);
  assert.match(await syy({ ...kelpo, sanat: 'ei taulukko' }), /sanat/);
  assert.match(await syy({ ...kelpo, lauseet: 0 }), /lauseet/);

  // Negatiiviset, ei-kokonaiset ja ristiin menevät ajat.
  const rikki = (muutos) => {
    const sanat = kelpo.sanat.map((s) => ({ ...s }));
    muutos(sanat);
    return { ...kelpo, sanat };
  };
  assert.match(await syy(rikki((s) => { s[0].alku = -10; })), /kelvoton/);
  assert.match(await syy(rikki((s) => { s[0].loppu = 12.5; })), /kokonaisluku/);
  assert.match(await syy(rikki((s) => { s[1].loppu = s[1].alku - 1; })), /kelvoton/);
  assert.match(await syy(rikki((s) => { s[2].alku = s[1].alku - 500; })), /järjestyksessä/);
  assert.match(await syy(rikki((s) => { s[2].sana = 'väärin'; })), /sanat eivät vastaa/);
  assert.match(await syy({ ...kelpo, kesto: 10 }), /kesto/);
  assert.match(await syy({ ...kelpo, kesto: 30000.5 }), /kesto/);

  // Äänikenttien muoto ja itse sidonta.
  assert.match(await syy({ ...kelpo, aani: undefined }), /aani/);
  assert.match(await syy({ ...kelpo, aani: { ...kelpo.aani, sha256: 'lyhyt' } }), /sha256/);
  assert.match(await syy({ ...kelpo, aani: { ...kelpo.aani, tavut: 0 } }), /tavut/);
  assert.match(await syy({ ...kelpo, aani: { ...kelpo.aani, versio: '2' } }), /versio/);
  assert.match(await syy(kelpo, { teksti, aani: { tavut: AANI.length, sha256: sha(Buffer.from('toinen')) } }),
    /SHA-256/);
  assert.match(await syy(kelpo, { teksti, aani: { tavut: 1, sha256: sha(AANI) } }), /koko/);
});

test('äänisidonta: aikaleimat kelpaavat vain sille äänitteelle, joka soi', async (t) => {
  const vanhaFetch = globalThis.fetch;
  t.after(() => { globalThis.fetch = vanhaFetch; });
  const teksti = 'Marseillen satamassa myytiin saippuaa tiiliskivinä.';
  const data = aikaleimat(teksti);
  /*
   * Kaksi osoitetta, kaksi vastausta: aikaleimatiedosto tulee JSONina
   * ja äänite tavuina. Äänitteen haku kulkee js/media.js haeAani →
   * haeSitkeasti -reittiä, joka lukee vastauksesta vain `ok`,
   * `status` ja `arrayBuffer`.
   */
  const mockaa = (json, aani) => {
    globalThis.fetch = async (osoite) => (String(osoite).includes('.aikaleimat.json')
      ? { ok: true, status: 200, json: async () => json }
      : { ok: true, status: 200, arrayBuffer: async () => new Uint8Array(aani).buffer });
  };

  mockaa(data, AANI);
  assert.deepEqual(
    await lataaLuentareaktiot('sidottu', 'assets/audio/puhe-fokus-matkakirja-sidottu.mp3', { teksti }),
    data, 'oikea pari kelpaa',
  );

  // Sama tiedosto, uusiksi äänitetty luenta: ajat eivät enää päde.
  mockaa(data, Buffer.from('uusi äänitys, eri tavut'));
  assert.equal(
    await lataaLuentareaktiot('uusittu', 'assets/audio/puhe-fokus-matkakirja-uusittu.mp3', { teksti }),
    null, 'väärä äänite hylätään',
  );

  // Teksti korjattu pakissa: sanarajat siirtyvät, joten ajat hylätään.
  mockaa(data, AANI);
  assert.equal(
    await lataaLuentareaktiot('korjattu', 'assets/audio/puhe-fokus-matkakirja-korjattu.mp3',
      { teksti: `${teksti} Lisäys.` }),
    null, 'väärä teksti hylätään',
  );

  // Versio 1 ei kelpaa enää lainkaan.
  mockaa({ ...data, versio: 1 }, AANI);
  assert.equal(
    await lataaLuentareaktiot('vanha', 'assets/audio/puhe-fokus-matkakirja-vanha.mp3', { teksti }),
    null, 'versio 1 hylätään',
  );
});

test('puuttuva aikaleimatiedosto (404) on hiljainen null eikä virhe', async (t) => {
  const vanha = globalThis.fetch;
  let pyyntoja = 0;
  globalThis.fetch = async () => { pyyntoja += 1; return { ok: false, status: 404 }; };
  t.after(() => { globalThis.fetch = vanha; });
  const polku = 'assets/audio/puhe-fokus-matkakirja-testikaupunki.mp3';
  assert.equal(await lataaLuentareaktiot('testikaupunki', polku, { teksti: 'mitä vain' }), null);
  // Välimuisti: toista pyyntöä ei lähetetä samalle osoitteelle.
  assert.equal(await lataaLuentareaktiot('testikaupunki', polku, { teksti: 'mitä vain' }), null);
  assert.equal(pyyntoja, 1);
  assert.match(aikaleimojenOsoite(polku), /puhe-fokus-matkakirja-testikaupunki\.aikaleimat\.json/);
  assert.equal(kaupunkiOsoitteesta(polku), 'testikaupunki');
  assert.equal(kaupunkiOsoitteesta('assets/audio/intro-puhe.mp3'), null);
});

test('rikkinäinen tai tyhjä aikaleimatiedosto ei kaada luentaa', async (t) => {
  const vanha = globalThis.fetch;
  globalThis.fetch = async () => ({ ok: true, status: 200, json: async () => ({ versio: 1, sanat: [] }) });
  t.after(() => { globalThis.fetch = vanha; });
  assert.equal(await lataaLuentareaktiot('tyhja', 'assets/audio/puhe-fokus-matkakirja-tyhja.mp3', { teksti: 'x' }), null);
  globalThis.fetch = async () => { throw new Error('verkko poikki'); };
  assert.equal(await lataaLuentareaktiot('rikki', 'assets/audio/puhe-fokus-matkakirja-rikki.mp3', { teksti: 'x' }), null);
});

test('VARTIO: jokaisen pakin reaktioankkurit löytyvät sen omasta luentatekstistä', () => {
  const kaupungit = Object.keys(FOKUSVIRRAT);
  assert.ok(kaupungit.length >= 45, `fokusvirtoja ${kaupungit.length}, odotettiin vähintään 45`);
  assert.deepEqual([...REAKTION_TARKOITUKSET], [...TYOKALUN_TARKOITUKSET],
    'pelin ja työkalun tarkoituslistat eivät saa eriytyä');
  const nahdyt = new Set();
  let reaktioita = 0;
  for (const id of kaupungit) {
    const merkinta = FOKUSVIRRAT[id]?.matkakirja;
    const reaktiot = merkinta?.reaktiot;
    if (!Array.isArray(reaktiot) || !reaktiot.length) continue;
    /*
     * ÄÄNITTEEN TEKSTI ON RUUDUN TEKSTI (Raamattu). Ankkuri kirjoitetaan
     * `teksti`-kenttää vasten, mutta kohdistus tehdään `luenta`-kentästä
     * tagit karsittuina — jos ne eriytyvät, ankkuri ei löydy pelissä.
     */
    assert.equal(karsiTagit(merkinta.luenta ?? merkinta.teksti), merkinta.teksti,
      `${id}: luenta ja teksti eriytyneet (tagit karsittuna)`);
    const sanat = sanoiksi(merkinta.teksti);
    const data = aikaleimat(merkinta.teksti);
    for (const reaktio of reaktiot) {
      reaktioita += 1;
      assert.ok(reaktio.id && !nahdyt.has(reaktio.id), `${id}: reaktion tunnus puuttuu tai toistuu (${reaktio.id})`);
      nahdyt.add(reaktio.id);
      assert.ok(REAKTION_TARKOITUKSET.includes(reaktio.tarkoitus),
        `${reaktio.id}: tarkoitus "${reaktio.tarkoitus}" ei ole sallittu`);
      assert.ok(Number.isFinite(reaktio.voimakkuus) && reaktio.voimakkuus > 0 && reaktio.voimakkuus <= 1,
        `${reaktio.id}: voimakkuus ei ole välillä 0–1`);
      assert.ok(Number.isInteger(reaktio.siirtyma ?? 0), `${reaktio.id}: siirtymä ei ole kokonaisluku`);
      assert.ok(etsiAnkkuri(sanat, reaktio.ankkuri) >= 0,
        `${reaktio.id}: ankkuria "${reaktio.ankkuri}" ei löydy ${id}-pakin tekstistä sanasta sanaan`);
      // Peli hylkää ankkurin, joka osuu useammin kuin kerran.
      assert.equal(laskeAnkkurinOsumat(sanat, reaktio.ankkuri), 1,
        `${reaktio.id}: ankkuri "${reaktio.ankkuri}" ei ole yksikäsitteinen ${id}-pakin tekstissä`);
    }
    // Sama ratkaisu kuin pelissä: jokainen rivi saa hetken.
    assert.equal(ratkaiseAnkkurit(reaktiot, data).length, reaktiot.length,
      `${id}: osa reaktioista jäi ilman hetkeä`);
  }
  assert.ok(reaktioita >= 6, `reaktioita löytyi ${reaktioita}, pilotissa on kuusi`);
});

test('VARTIO: Marseillen aikaleimatiedosto on versio 2 ja sidottu repon äänitteeseen', () => {
  const data = JSON.parse(lue('assets/aikaleimat/puhe-fokus-matkakirja-marseille.aikaleimat.json'));
  assert.equal(data.versio, AIKALEIMOJEN_VERSIO);
  assert.equal(data.kaupunki, 'marseille');
  assert.equal(data.teksti, FOKUSVIRRAT.marseille.matkakirja.teksti);
  assert.equal(data.tekstiSha256, sha(Buffer.from(data.teksti, 'utf8')));
  assert.equal(data.aani.nimi, 'puhe-fokus-matkakirja-marseille.mp3');
  const mp3 = readFileSync(new URL('assets/audio/puhe-fokus-matkakirja-marseille.mp3', JUURI));
  assert.equal(data.aani.tavut, mp3.length, 'repon äänite ja aikaleimat eivät ole sama pari');
  assert.equal(data.aani.sha256, sha(mp3));
});

test('kohdistustyökalun kuiva ajo kertoo osoitteet eikä tarvitse verkkoa', () => {
  const loki = execFileSync(process.execPath, [
    fileURLToPath(new URL('tools/kohdista-luennat.mjs', JUURI)), '--kaupungit', 'marseille', '--kuiva',
  ], { encoding: 'utf8', env: { ...process.env, ELEVEN_API_KEY: '', HTTPS_PROXY: '', https_proxy: '' } });
  assert.match(loki, /KUIVA AJO/);
  assert.match(loki, /Tiedostomuoto: versio 2/);
  assert.match(loki, /--sido/);
  assert.match(loki, /audio\/puhe-fokus-matkakirja-marseille\.mp3/);
  assert.match(loki, /assets\/aikaleimat\/puhe-fokus-matkakirja-marseille\.aikaleimat\.json/);
  assert.match(loki, /marseille\.r6: ankkuri sanoissa/);
  assert.doesNotMatch(loki, /xi-api-key|ELEVEN_API_KEY=/, 'avainta ei tulosteta');
});

test('moduuli on esilatauslistassa ja niputuksessa', () => {
  assert.match(lue('sw.js'), /'\.\/js\/luentareaktiot\.js',/);
  const nippu = lue('tools/build-standalone.mjs');
  assert.match(nippu, /'js\/luentareaktiot\.js',/);
  assert.ok(nippu.indexOf("'js/luentareaktiot.js'") < nippu.indexOf("'js/luenta.js'"),
    'luentareaktiot ennen luentaa: luenta.js tuo sen staattisesti');
  assert.ok(nippu.indexOf("'js/packs/fokusvirrat.js'") < nippu.indexOf("'js/luentareaktiot.js'"),
    'fokusvirrat ennen luentareaktioita');
  assert.match(lue('js/luenta.js'),
    /import \{ kytkeMatkakirjanReaktiot \} from '\.\/luentareaktiot\.js';/);
  // Sovittimen sopimus: luenta kertoo, onko tälle luennalle ajastettuja
  // reaktioita, ja purkaa ne pysäytettäessä.
  const luenta = lue('js/luenta.js');
  assert.match(luenta, /reaktiotAjastettu: \(\) => reaktiotValmis/);
  assert.equal((luenta.match(/audio\.puraReaktiot\?\.\(\)/g) ?? []).length, 2,
    'purku ajetaan sekä stopDiaryVoicessa että haivytaLuennassa');
});
