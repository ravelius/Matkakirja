/*
 * PULUN TAULU ASTRONAUTIN KAMERASSA (js/linssit/pulu-taulu.js): rivien
 * saatavuus ja valittu moodi, moodista toiseen siirtymisen askeleet,
 * avaus ja sulku (Pulun napautus, ulkopuoli, Esc) sekä yhteensovitus
 * Pulun puheen kanssa. Kello, näkymä, pallo ja soitin ovat tynkiä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  ASTRO_TAULUN_RIVIT, MOODIN_ASKEL_MS, TAULUN_HENGAHDYS_MS, TAULUN_KYSELY_MS,
  liviaPuhuu, luoAstroTaulu, moodinAskel, nykyinenMoodi, taulunRivit,
} from '../js/linssit/pulu-taulu.js';
import { lahinKohde } from '../js/linssit/satelliitti.js';

/* ---------- tynkäkello, näkymä, pallo, dokumentti ---------- */

function luoKello() {
  let nyt = 0;
  let seuraavaId = 1;
  const jono = new Map();
  return {
    setTimeout(fn, ms) {
      const id = seuraavaId++;
      jono.set(id, { fn, aika: nyt + Math.max(0, Number(ms) || 0) });
      return id;
    },
    clearTimeout(id) { jono.delete(id); },
    kulje(ms) {
      const loppu = nyt + ms;
      for (;;) {
        let seuraava = null;
        for (const [id, t] of jono) if (t.aika <= loppu && (!seuraava || t.aika < seuraava[1].aika)) seuraava = [id, t];
        if (!seuraava) break;
        jono.delete(seuraava[0]);
        nyt = seuraava[1].aika;
        seuraava[1].fn();
      }
      nyt = loppu;
    },
    nyt: () => nyt,
    ajastimia: () => jono.size,
  };
}

function luoNakyma() {
  const n = { naytetyt: [], piilotuksia: 0, purettu: false, auki: false, nakymat: null };
  return Object.assign(n, {
    nakymatNappi(v) { n.nakymat = v; },
    nayta(rivit) { n.naytetyt.push(rivit); n.auki = true; },
    piilota() { n.piilotuksia += 1; n.auki = false; },
    sisaltaa: (el) => el?.paneelissa === true,
    pura() { n.purettu = true; },
  });
}

/** Kyydin tynkä: napautus kauko → seuranta → ikkuna → seuranta, siirtymä kestää `kesto` ms. */
function luoPallo(kello, { kyyti = true, kesto = 500, paljastettu = true } = {}) {
  let tila = 'kauko';
  let siirtyyAsti = -1;
  const p = {
    napautuksia: 0,
    poistumisia: 0,
    paljastus: paljastettu,
    kyytiMoodi: kyyti ? () => ({ tila, siirtyy: kello.nyt() < siirtyyAsti }) : () => null,
    napautaIss() {
      p.napautuksia += 1;
      // Kuten js/linssit/iss-kyyti.js ilman kehittäjälippua: kauko → ikkuna, kohde → ikkuna (ISS:n rinnalla pois 2.10.2026).
      if (tila !== 'ikkuna') tila = 'ikkuna';
      siirtyyAsti = kello.nyt() + kesto;
      return true;
    },
    poistuKyydista() {
      if (tila === 'kauko') return false;
      p.poistumisia += 1;
      tila = 'kauko';
      siirtyyAsti = kello.nyt() + kesto;
      return true;
    },
    asetaTila(t) { tila = t; },
    paljastettu: () => p.paljastus,
  };
  return p;
}

function luoDokumentti() {
  const kuuntelijat = new Map();
  return {
    addEventListener(nimi, fn) { (kuuntelijat.get(nimi) ?? kuuntelijat.set(nimi, new Set()).get(nimi)).add(fn); },
    removeEventListener(nimi, fn) { kuuntelijat.get(nimi)?.delete(fn); },
    laukaise(nimi, e) { for (const fn of [...(kuuntelijat.get(nimi) ?? [])]) fn(e); },
    kuuntelijoita: () => [...kuuntelijat.values()].reduce((n, s) => n + s.size, 0),
  };
}

/** Pulun napin tapahtuma: closest('.pollo-nappi') osuu. */
const pulunTapahtuma = (luokka = '.pollo-nappi') => {
  const e = { estetty: false, pysaytetty: false };
  e.target = { closest: (v) => (v.split(',').map((x) => x.trim()).includes(luokka) ? {} : null) };
  e.preventDefault = () => { e.estetty = true; };
  e.stopImmediatePropagation = () => { e.pysaytetty = true; };
  e.stopPropagation = () => {};
  return e;
};
const ulkoTapahtuma = () => ({ target: { closest: () => null } });

function luoTaulu({
  kello = luoKello(), pallo = luoPallo(kello), tervetulo = null, ui = {}, automaatti = true,
  kuva = { auki: false }, kuviaOn = true, paikalla = { pulu: true },
} = {}) {
  const nakyma = luoNakyma();
  const doc = luoDokumentti();
  const vaiennukset = [];
  const kuvaToimet = [];
  const kuplaPoistot = [];
  const chatit = [];
  const taulu = luoAstroTaulu({
    ui,
    avaruus: pallo,
    tervetulo,
    kello,
    doc,
    nakyma,
    automaatti,
    vahennaLiiketta: false,
    kuvaAuki: () => kuva.auki,
    suljeKuva: () => { kuvaToimet.push('sulje'); kuva.auki = false; },
    avaaKuva: () => { kuvaToimet.push('avaa'); kuva.auki = true; return true; },
    kuviaOn: () => kuviaOn,
    vaikene: () => { vaiennukset.push(kello.nyt()); if (ui.liviaAani) ui.liviaAani = null; },
    kuplatPois: () => { kuplaPoistot.push(kello.nyt()); },
    avaaChat: () => { chatit.push('auki'); return true; },
    suljeChat: () => { chatit.push('kiinni'); },
    pulunPaikalla: () => paikalla.pulu,
  });
  return { taulu, kello, pallo, nakyma, doc, vaiennukset, kuvaToimet, kuva, ui, kuplaPoistot, chatit, paikalla };
}

const soitin = () => ({ paused: false, ended: false });

/* ---------- rivit ja moodi ---------- */

test('rivit ovat dataa: tunnus, otsikko, moodi ja saatavilla(); vain moodit, ei kyydin säätimiä', () => {
  // ISS:n rinnalla poistettu pelistä (omistaja 2.10.2026 klo 10.4x).
  // Avaruuskävely (omistaja 29.9.: avataan Pulun taulusta; Päätoimittaja 2.10.: webiin, natiivi malli).
  assert.deepEqual(ASTRO_TAULUN_RIVIT.map((r) => r.tunnus), ['pallo', 'iss-sisalle', 'avaruuskavely', 'kuvat']);
  assert.doesNotMatch(ASTRO_TAULUN_RIVIT.map((r) => r.otsikko).join(' '), /rinnalla/);
  for (const r of ASTRO_TAULUN_RIVIT) {
    assert.equal(typeof r.otsikko, 'string');
    assert.equal(typeof r.saatavilla, 'function');
    assert.ok(['pallo', 'seuranta', 'ikkuna', 'kavely', 'kuvat'].includes(r.moodi));
  }
  // Omistajan tarkennus 28.9.: ei ISS:n sisäisiä toimintoja tauluun.
  const tekstit = ASTRO_TAULUN_RIVIT.map((r) => `${r.otsikko} ${r.selite}`).join(' ');
  assert.doesNotMatch(tekstit, /Lennä|nopeu|LIVE|sijainti|Kysy/i);
});

test('saatavuus: ISS-rivit vain kyydin kanssa, kuvat vain kuvallisilla kohteilla', () => {
  const kello = luoKello();
  const kaikki = taulunRivit({ avaruus: luoPallo(kello), kuvaAuki: () => false, kuviaOn: () => true });
  assert.deepEqual(kaikki.map((r) => r.tunnus), ['pallo', 'iss-sisalle', 'avaruuskavely', 'kuvat']);
  const ilmanKyytia = taulunRivit({ avaruus: luoPallo(kello, { kyyti: false }), kuvaAuki: () => false, kuviaOn: () => true });
  assert.deepEqual(ilmanKyytia.map((r) => r.tunnus), ['pallo', 'kuvat']);
  const ilmanKuvia = taulunRivit({ avaruus: luoPallo(kello), kuvaAuki: () => false, kuviaOn: () => false });
  assert.deepEqual(ilmanKuvia.map((r) => r.tunnus), ['pallo', 'iss-sisalle', 'avaruuskavely']);
  // Kaatuva saatavuus piilottaa rivin eikä kaada taulua.
  const kaatuva = [{ tunnus: 'x', moodi: 'pallo', otsikko: 'x', selite: '', saatavilla: () => { throw new Error('x'); } }];
  assert.deepEqual(taulunRivit({}, kaatuva), []);
});

test('nykyinen moodi on valittuna: pallo, seuranta, ikkuna (myös ylilento), kuvat', () => {
  const kello = luoKello();
  const pallo = luoPallo(kello);
  const k = { avaruus: pallo, kuvaAuki: () => false, kuviaOn: () => true };
  const valittu = () => taulunRivit(k).filter((r) => r.aktiivinen).map((r) => r.tunnus);
  assert.equal(nykyinenMoodi(k), 'pallo');
  assert.deepEqual(valittu(), ['pallo']);
  pallo.asetaTila('seuranta');   // vain kehittäjälipulla ?issseuranta: taulussa ei ole sille riviä
  assert.deepEqual(valittu(), []);
  pallo.asetaTila('ikkuna');
  assert.deepEqual(valittu(), ['iss-sisalle']);
  pallo.asetaTila('kohde');
  assert.deepEqual(valittu(), ['iss-sisalle']);
  pallo.asetaTila('kauko');
  assert.deepEqual(valittu(), ['pallo']);
  assert.equal(nykyinenMoodi({ ...k, kuvaAuki: () => true }), 'kuvat');
});

test('avaruuskävely: ensin Cupolaan, sitten kävely; kävelyn aikana ikkuna lopettaa, pallo poistuu', () => {
  const K = (tila, kavely = 'ei', siirtyy = false) => ({ kuva: false, kyyti: { tila, siirtyy, kavely } });
  assert.equal(moodinAskel('kavely', K('kauko')), 'napauta');
  assert.equal(moodinAskel('kavely', K('ikkuna', 'ei', true)), 'odota');
  assert.equal(moodinAskel('kavely', K('kohde')), 'napauta');
  assert.equal(moodinAskel('kavely', K('ikkuna')), 'aloitaKavely');
  assert.equal(moodinAskel('kavely', K('ulkona', 'koysi')), 'perilla');
  assert.equal(moodinAskel('ikkuna', K('ulkona', 'pulu')), 'lopetaKavely');
  assert.equal(moodinAskel('pallo', K('ulkona', 'pulu')), 'poistu');
  assert.equal(moodinAskel('kavely', { kuva: false, kyyti: null }), 'ei');
  assert.equal(nykyinenMoodi({ avaruus: { kyytiMoodi: () => ({ tila: 'ulkona', siirtyy: false, kavely: 'koysi' }) } }), 'kavely');
});

test('moodin askeleet: yksi toimi kerrallaan, siirtymän aikana odotetaan', () => {
  const K = (tila, siirtyy = false) => ({ kuva: false, kyyti: { tila, siirtyy } });
  assert.equal(moodinAskel('ikkuna', K('kauko')), 'napauta');
  assert.equal(moodinAskel('ikkuna', K('seuranta', true)), 'odota');
  assert.equal(moodinAskel('ikkuna', K('seuranta')), 'napauta');
  assert.equal(moodinAskel('ikkuna', K('ikkuna', true)), 'perilla');
  assert.equal(moodinAskel('ikkuna', K('kohde')), 'napauta');
  assert.equal(moodinAskel('seuranta', K('ikkuna')), 'napauta');
  assert.equal(moodinAskel('seuranta', K('seuranta')), 'perilla');
  assert.equal(moodinAskel('pallo', K('ikkuna')), 'poistu');
  assert.equal(moodinAskel('pallo', K('kauko', true)), 'odota');
  assert.equal(moodinAskel('pallo', K('kauko')), 'perilla');
  assert.equal(moodinAskel('kuvat', K('seuranta')), 'poistu');
  assert.equal(moodinAskel('kuvat', K('kauko', true)), 'odota');
  assert.equal(moodinAskel('kuvat', K('kauko')), 'avaaKuva');
  assert.equal(moodinAskel('kuvat', { kuva: true, kyyti: null }), 'perilla');
  assert.equal(moodinAskel('pallo', { kuva: true, kyyti: null }), 'suljeKuva');
  assert.equal(moodinAskel('ikkuna', { kuva: true, kyyti: { tila: 'kauko' } }), 'suljeKuva');
  // Ilman kyytiä ISS-moodeihin ei ole tietä.
  assert.equal(moodinAskel('ikkuna', { kuva: false, kyyti: null }), 'ei');
});

/* ---------- moodista toiseen taulun kautta ---------- */

test('ISS:n sisälle pallonäkymästä: yksi napautus suoraan Cupolaan (ISS:n rinnalla pois 2.10.2026)', () => {
  const { taulu, kello, pallo } = luoTaulu({ automaatti: false });
  taulu.avaa();
  assert.ok(taulu.valitse('iss-sisalle'));
  assert.equal(taulu.tila().auki, false, 'valinta sulkee taulun');
  assert.equal(pallo.napautuksia, 1);
  kello.kulje(MOODIN_ASKEL_MS * 2 + 1600);
  assert.equal(pallo.napautuksia, 1, 'ei toista napautusta: ei välivaihetta seurannassa');
  assert.equal(pallo.kyytiMoodi().tila, 'ikkuna');
  assert.equal(taulu.tila().moodi, 'ikkuna');
  assert.equal(taulu.tila().vaihto, null);
  assert.ok(taulu.tila().loki.includes('moodi:ikkuna:perilla'));
});
test('kyydistä kuviin: ensin pois kyydistä, kuvat vasta paluun jälkeen; kuvista palloon sulkee kuvan', () => {
  const { taulu, kello, pallo, kuvaToimet, kuva } = luoTaulu({ automaatti: false });
  pallo.asetaTila('seuranta');
  taulu.valitse('kuvat');
  assert.equal(pallo.poistumisia, 1);
  assert.deepEqual(kuvaToimet, []);
  kello.kulje(1000);
  assert.deepEqual(kuvaToimet, ['avaa']);
  assert.equal(kuva.auki, true);
  assert.equal(taulu.tila().moodi, 'kuvat');
  taulu.valitse('pallo');
  assert.deepEqual(kuvaToimet, ['avaa', 'sulje']);
  assert.equal(taulu.tila().moodi, 'pallo');
});

test('kuvista ISS:n sisälle: kuva kiinni ensin, sitten yksi napautus suoraan Cupolaan', () => {
  const { taulu, kello, pallo, kuvaToimet } = luoTaulu({ automaatti: false, kuva: { auki: true } });
  taulu.valitse('iss-sisalle');
  assert.deepEqual(kuvaToimet, ['sulje']);
  kello.kulje(MOODIN_ASKEL_MS);
  assert.equal(pallo.napautuksia, 1);
  kello.kulje(1000);
  assert.equal(pallo.kyytiMoodi().tila, 'ikkuna');
});
test('valittu (nykyinen) moodi vain sulkee taulun; uusi valinta korvaa kesken olevan', () => {
  const { taulu, kello, pallo } = luoTaulu({ automaatti: false });
  taulu.avaa();
  taulu.valitse('pallo');
  assert.equal(taulu.tila().auki, false);
  assert.equal(pallo.napautuksia, 0);
  taulu.valitse('iss-sisalle');
  taulu.valitse('pallo'); // kesken: napautus tehty, nyt takaisin
  kello.kulje(2000);
  assert.equal(pallo.kyytiMoodi().tila, 'kauko');
  assert.equal(pallo.napautuksia, 1, 'vanha vaihto ei jatka');
});

test('moodin vaihto luovuttaa toimirajan jälkeen (ei kilpaa pelaajan kanssa)', () => {
  const kello = luoKello();
  const pallo = luoPallo(kello, { kesto: 0 });
  pallo.napautaIss = () => { pallo.napautuksia += 1; return false; }; // ei koskaan perille
  const { taulu } = luoTaulu({ kello, pallo, automaatti: false });
  taulu.valitse('iss-sisalle');
  kello.kulje(5000);
  assert.ok(pallo.napautuksia <= 4);
  assert.ok(taulu.tila().loki.includes('moodi:ikkuna:luovutti'));
});

/* ---------- avaus ja sulku ---------- */

test('Pulun napautus avaa ja sulkee taulun, ohittaa chatin vain tässä linssissä', () => {
  const { taulu, doc, nakyma } = luoTaulu({ automaatti: false });
  const e = pulunTapahtuma();
  doc.laukaise('click', e);
  assert.equal(e.estetty && e.pysaytetty, true, 'pelin oma chatti ei aukea');
  assert.equal(taulu.tila().auki, true);
  assert.equal(nakyma.naytetyt.length, 1);
  assert.equal(nakyma.naytetyt[0].find((r) => r.aktiivinen)?.tunnus, 'pallo');
  doc.laukaise('click', pulunTapahtuma());
  assert.equal(taulu.tila().auki, false);
  doc.laukaise('click', pulunTapahtuma());
  assert.equal(taulu.tila().auki, true);
  assert.equal(taulu.tila().avauksia, 2);
  // Muu klikkaus ei koske tauluun.
  doc.laukaise('click', ulkoTapahtuma());
  assert.equal(taulu.tila().auki, true);
  // Pura: kuuntelijat pois, Pulu avaa taas chatin (tapahtumaa ei estetä).
  taulu.pura();
  assert.equal(doc.kuuntelijoita(), 0);
  assert.equal(nakyma.purettu, true);
});

test('napautus taulun ulkopuolelle ja Esc sulkevat; napautus taulussa ei', () => {
  const { taulu, doc } = luoTaulu({ automaatti: false });
  taulu.avaa();
  doc.laukaise('pointerdown', { target: { paneelissa: true, closest: () => null } });
  assert.equal(taulu.tila().auki, true);
  doc.laukaise('pointerdown', ulkoTapahtuma());
  assert.equal(taulu.tila().auki, false);
  taulu.avaa();
  doc.laukaise('keydown', { key: 'Escape', stopPropagation() {} });
  assert.equal(taulu.tila().auki, false);
  assert.ok(taulu.tila().loki.includes('sulje:esc'));
});

/* ---------- yhteensovitus Pulun puheen kanssa ---------- */

function luoTervetulo(kello, { kestoMs = 5000 } = {}) {
  let vaihe = 'puhuu';
  let ohitettu = false;
  const t = {
    tila: () => ({ vaihe, puhuu: vaihe === 'puhuu' }),
    ohita() { if (vaihe === 'puhuu') { vaihe = 'ohitettu'; ohitettu = true; } },
    lopeta() { vaihe = 'valmis'; },
    ohitettu: () => ohitettu,
  };
  kello.setTimeout(() => { if (vaihe === 'puhuu') vaihe = 'valmis'; }, kestoMs);
  return t;
}

test('ensimmäinen avaus (omistaja 29.9.): taulu heti paljastuksen jälkeen, tervetulo puhuu sen aikana', () => {
  const kello = luoKello();
  const tervetulo = luoTervetulo(kello, { kestoMs: 30000 });
  // Tervetulon ääni soi pelin soittimessa: se ei ole "muuta puhetta".
  const ui = { liviaAani: soitin() };
  const { taulu, kuplaPoistot, vaiennukset } = luoTaulu({ kello, tervetulo, ui });
  assert.equal(taulu.tila().auki, false, 'hengähdys ennen taulua');
  kello.kulje(TAULUN_HENGAHDYS_MS);
  assert.equal(taulu.tila().auki, true);
  assert.equal(taulu.tila().automaatti, 'avattu');
  assert.ok(taulu.tila().loki.includes('avaa:automaatti'));
  assert.equal(kuplaPoistot.length, 1, 'vanhat kuplat pois taulun tieltä');
  assert.deepEqual(vaiennukset, [], 'automaattinen avaus ei vaienna tervetuloa');
  assert.equal(tervetulo.ohitettu(), false);
});

test('myöhempi avaus (ei tervetuloa): taulu heti paljastuksen jälkeen ilman puhetta', () => {
  const kello = luoKello();
  const pallo = luoPallo(kello, { paljastettu: false });
  const { taulu, vaiennukset } = luoTaulu({ kello, pallo });
  kello.kulje(2000);
  assert.equal(taulu.tila().auki, false, 'musta verho: odotetaan');
  pallo.paljastus = true;
  kello.kulje(TAULUN_KYSELY_MS + TAULUN_HENGAHDYS_MS);
  assert.equal(taulu.tila().auki, true);
  assert.deepEqual(vaiennukset, []);
});

test('automaattinen avaus odottaa Livian muun puheen loppuun eikä vaienna', () => {
  const kello = luoKello();
  const ui = { liviaAani: soitin() };
  const { taulu, vaiennukset } = luoTaulu({ kello, ui });
  kello.kulje(5000);
  assert.equal(taulu.tila().auki, false);
  ui.liviaAani.ended = true;
  kello.kulje(TAULUN_KYSELY_MS + TAULUN_HENGAHDYS_MS);
  assert.equal(taulu.tila().auki, true);
  assert.deepEqual(vaiennukset, []);
});

test('Pulun napautus kesken puheen: puhe vaikenee heti ja taulu aukeaa (ei päällekkäin)', () => {
  const kello = luoKello();
  const tervetulo = luoTervetulo(kello, { kestoMs: 30000 });
  const ui = { liviaAani: soitin() };
  // Pelaaja on sulkenut taulun (tässä: ei automaattiavausta) ja napauttaa Pulua.
  const { taulu, doc, vaiennukset } = luoTaulu({ kello, tervetulo, ui, automaatti: false });
  kello.kulje(3000);
  assert.equal(taulu.tila().auki, false);
  assert.equal(liviaPuhuu(ui, tervetulo), true);
  doc.laukaise('click', pulunTapahtuma());
  assert.equal(taulu.tila().auki, true);
  assert.equal(tervetulo.ohitettu(), true);
  assert.equal(vaiennukset.length, 1);
  assert.equal(ui.liviaAani, null);
  kello.kulje(60000);
  assert.equal(taulu.tila().avauksia, 1);
});

test('automaattista avausta ei tule, jos pelaaja on jo valokuvassa tai kyydissä', () => {
  const kello = luoKello();
  const tervetulo = luoTervetulo(kello, { kestoMs: 1000 });
  const { taulu, kuva } = luoTaulu({ kello, tervetulo });
  kuva.auki = true;
  kello.kulje(5000);
  assert.equal(taulu.tila().auki, false);
  assert.equal(taulu.tila().automaatti, 'valittu');

  const kello2 = luoKello();
  const pallo = luoPallo(kello2);
  pallo.asetaTila('seuranta');
  const b = luoTaulu({ kello: kello2, pallo });
  kello2.kulje(5000);
  assert.equal(b.taulu.tila().auki, false);
});

test('pura kesken odotuksen: ei ajastimia, ei avausta', () => {
  const kello = luoKello();
  const tervetulo = luoTervetulo(kello, { kestoMs: 10000 });
  const { taulu } = luoTaulu({ kello, tervetulo });
  kello.kulje(1000);
  taulu.pura();
  kello.kulje(20000);
  assert.equal(taulu.tila().auki, false);
  assert.equal(taulu.avaa(), false);
});

test('lähin kohde isoympyrää pitkin (kuvat avautuvat siitä, mitä kamera katsoo)', () => {
  const kohteet = [
    { tunnus: 'a', lat: 60, lon: 25 },
    { tunnus: 'b', lat: 45, lon: 12 },
    { tunnus: 'c', lat: -30, lon: 150 },
  ];
  assert.equal(lahinKohde(kohteet, 46, 10)?.tunnus, 'b');
  assert.equal(lahinKohde(kohteet, -25, 170)?.tunnus, 'c');
  // Päivämäärärajan yli: 179° ja −179° ovat vierekkäin.
  assert.equal(lahinKohde([{ tunnus: 'x', lat: 0, lon: 179 }, { tunnus: 'y', lat: 0, lon: 100 }], 0, -179)?.tunnus, 'x');
  assert.equal(lahinKohde(kohteet, NaN, 0), null);
});

/* ---------- minipulu, Kysy Pululta ja Näkymät-nappi (Päätoimittaja 28.9.) ---------- */

test('valokuvan minipulu avaa taulun eikä chattia; auki oleva kuvan chatti sulkeutuu', () => {
  const { taulu, doc, chatit } = luoTaulu({ automaatti: false, kuva: { auki: true } });
  const e = pulunTapahtuma('.satelliitti-pulunappi');
  doc.laukaise('click', e);
  assert.equal(e.pysaytetty, true, 'minipulun oma chatti-kuuntelija ei saa napautusta');
  assert.equal(taulu.tila().auki, true);
  assert.deepEqual(chatit, ['kiinni']);
  doc.laukaise('click', pulunTapahtuma('.satelliitti-pulunappi'));
  assert.equal(taulu.tila().auki, false);
});

test('Kysy Pululta kuvamoodissa: taulu kiinni ja kuvan chatti auki heti', () => {
  const { taulu, chatit } = luoTaulu({ automaatti: false, kuva: { auki: true } });
  taulu.avaa();
  taulu.kysyPululta();
  assert.equal(taulu.tila().auki, false);
  assert.deepEqual(chatit, ['kiinni', 'auki']);
});

test('Kysy Pululta kyydistä: ensin kuvamoodiin (pois kyydistä, kuva auki), sitten chatti', () => {
  const { taulu, kello, pallo, chatit, kuvaToimet } = luoTaulu({ automaatti: false });
  pallo.asetaTila('ikkuna');
  taulu.avaa();
  taulu.kysyPululta();
  assert.equal(taulu.tila().auki, false);
  assert.deepEqual(chatit, []);
  kello.kulje(2000);
  assert.deepEqual(kuvaToimet, ['avaa']);
  assert.deepEqual(chatit, ['auki']);
});

test('Näkymät-nappi näkyy vain, kun Pulua ei ole; napautus avaa ja sulkee taulun', () => {
  const { taulu, kello, doc, nakyma, paikalla } = luoTaulu({ automaatti: false, paikalla: { pulu: false } });
  assert.equal(nakyma.nakymat, true);
  doc.laukaise('click', pulunTapahtuma('.astro-nakymat-nappi'));
  assert.equal(taulu.tila().auki, true);
  doc.laukaise('click', pulunTapahtuma('.astro-nakymat-nappi'));
  assert.equal(taulu.tila().auki, false);
  paikalla.pulu = true;
  kello.kulje(1000);
  assert.equal(nakyma.nakymat, false, 'Pulu paikalla: nappi pois');
  assert.ok(taulu.tila().loki.includes('pulu:paikalla'));
});
