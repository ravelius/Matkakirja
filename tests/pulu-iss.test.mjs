/*
 * PULUN ISS-REPLIIKIT: Astronautin kameran tervetulo (A–C,
 * js/linssit/pulu-tervetulo.js) ja ISS-kyydin rajapinta (D,
 * js/linssit/pulu-iss.js). Käsikirjoitus: päätoimittaja 28.9.2026.
 *
 * Kello, kuplat, soitin, kamera ja muisti ovat tynkiä: testi mittaa
 * ajoituksen, ohituksen, kerran-muistin, mykistyksen ja vähennetyn
 * liikkeen ilman selainta ja ilman ääntä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { LIVIAN_ISS } from '../js/livia.js';
import { LIVIAN_KESTOT, LIVIAN_VERSIOIDUT_AANET } from '../js/liviapuhe.js';
import {
  PULUN_ISS_D2_VIIVE_MS, QUINDAR_KESTO_MS, QUINDAR_TAAJUUS_HZ, QUINDAR_VALI_MS,
  luoPulunIssKyyti, nollaaPulunIssIstunto, pulunIssRepliikki, soitaQuindar,
} from '../js/linssit/pulu-iss.js';
import {
  PULUN_SUOSIKKI, PULUN_TERVETULON_JAKSO, PULUN_TERVETULON_VIIVE_MS, PULUN_TERVETULO_TALLE,
  aloitaPulunTervetulo, nollaaPulunTervetuloIstunto, pulunTervetulonRepliikit,
} from '../js/linssit/pulu-tervetulo.js';

/* ---------- tynkäkello, soitin, kupla, dokumentti, muisti ---------- */

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
    /** Kuljettaa kelloa ja ajaa erääntyneet ajastimet aikajärjestyksessä. */
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
  };
}

function luoSoitin() {
  const kuuntelijat = new Map();
  return {
    paused: true,
    addEventListener(nimi, fn) { (kuuntelijat.get(nimi) ?? kuuntelijat.set(nimi, new Set()).get(nimi)).add(fn); },
    removeEventListener(nimi, fn) { kuuntelijat.get(nimi)?.delete(fn); },
    laukaise(nimi) { for (const fn of [...(kuuntelijat.get(nimi) ?? [])]) fn(); },
  };
}

function luoMuisti({ kaatuu = false } = {}) {
  const data = new Map();
  return {
    getItem(k) { if (kaatuu) throw new Error('estetty'); return data.get(k) ?? null; },
    setItem(k, v) { if (kaatuu) throw new Error('estetty'); data.set(k, String(v)); },
    data,
  };
}

function luoDokumentti() {
  const kuuntelijat = new Map();
  return {
    addEventListener(nimi, fn) { (kuuntelijat.get(nimi) ?? kuuntelijat.set(nimi, new Set()).get(nimi)).add(fn); },
    removeEventListener(nimi, fn) { kuuntelijat.get(nimi)?.delete(fn); },
    napauta() { for (const fn of [...(kuuntelijat.get('pointerdown') ?? [])]) fn(); },
    kuuntelijoita: () => [...kuuntelijat.values()].reduce((n, s) => n + s.size, 0),
  };
}

function luoKamera({ paljastettu = true } = {}) {
  const kutsut = [];
  return {
    kutsut,
    paljastettu: () => paljastettu,
    aloitustila: () => ({ pov: { lat: 10, lng: 20, altitude: 3 }, seuranta: true, pyori: false }),
    katsoKohteeseen: (lat, lon, asetukset) => { kutsut.push(['katso', lat, lon, asetukset?.kestoMs]); return true; },
    palaaAloitukseen: (tila, asetukset) => { kutsut.push(['palaa', asetukset.kestoMs, asetukset.seuraa]); return true; },
  };
}

/** Sano-tynkä: kirjaa repliikit ja antaa kullekin oman soittimen. */
function luoPuhuja({ nakyy = true } = {}) {
  const sanotut = [];
  const soittimet = [];
  return {
    sanotut,
    soittimet,
    sano: (_ui, repliikki) => {
      if (!nakyy) return null;
      sanotut.push(repliikki.avain);
      const audio = luoSoitin();
      soittimet.push(audio);
      return { audio, repliikki };
    },
  };
}

/** Soittaa nykyisen repliikin loppuun: 'playing' heti, 'ended' kestonsa jälkeen. */
function soitaLoppuun(kello, puhuja) {
  const audio = puhuja.soittimet.at(-1);
  const repliikki = pulunIssRepliikki(...avaimesta(puhuja.sanotut.at(-1)));
  audio.paused = false;
  audio.laukaise('playing');
  kello.kulje(repliikki.kestoMs);
  audio.laukaise('ended');
}

const avaimesta = (avain) => {
  const [, ryhma, n] = /^iss-([a-d])-(\d+)$/.exec(avain);
  return [ryhma, Number(n) - 1];
};

test.beforeEach(() => {
  nollaaPulunIssIstunto();
  nollaaPulunTervetuloIstunto();
});

/* ---------- repliikit ---------- */

test('ISS-repliikeillä on kaanoninen teksti, versioitu äänite ja kesto', () => {
  const avaimet = [];
  for (const [ryhma, tekstit] of Object.entries(LIVIAN_ISS)) {
    tekstit.forEach((teksti, i) => {
      const r = pulunIssRepliikki(ryhma, i);
      assert.equal(r.teksti, teksti);
      assert.equal(r.avain, `iss-${ryhma}-${i + 1}`);
      assert.equal(r.kestoMs, Math.round(LIVIAN_KESTOT[r.avain] * 1000));
      assert.match(LIVIAN_VERSIOIDUT_AANET[r.avain], /^aanet\/pulu\/versiot\/[0-9a-f]{12}\/pulu-[0-9a-f]{20}\/livia-iss-/);
      // Tagit eivät kuulu kaanoniin eivätkä kuplaan.
      assert.doesNotMatch(teksti, /\[/);
      avaimet.push(r.avain);
    });
  }
  assert.equal(avaimet.length, 10);
  assert.equal(pulunIssRepliikki('e', 0), null);
  // Livia puhuu itsestään Liviana; faktat ennallaan.
  assert.match(LIVIAN_ISS.d[0], /Täällä Livia/);
  assert.match(LIVIAN_ISS.a[1], /neljänsadan kilometrin/);
  assert.match(LIVIAN_ISS.d[1], /puolessatoista tunnissa/);
});

/* ---------- A–C: tervetulo ---------- */

test('tervetulo: A1–C2 järjestyksessä, kamera repliikkien tahdissa', () => {
  const kello = luoKello();
  const kamera = luoKamera();
  const puhuja = luoPuhuja();
  const muisti = luoMuisti();
  const doc = luoDokumentti();
  let vaaraAuki = 0;
  let suljettu = 0;
  const kahva = aloitaPulunTervetulo({
    avaruus: kamera, kello, varasto: muisti, doc, sano: puhuja.sano,
    mykistetty: () => false, vahennaLiiketta: false,
    avaaVaaraKohde: () => { vaaraAuki += 1; return true; }, suljeKortti: () => { suljettu += 1; },
    vaikene: () => assert.fail('ei saa vaientaa kesken'),
  });
  assert.ok(kahva);
  // Ei puhetta ennen paljastusta ja hengähdystä.
  kello.kulje(PULUN_TERVETULON_VIIVE_MS - 1);
  assert.deepEqual(puhuja.sanotut, []);
  kello.kulje(1);
  assert.deepEqual(puhuja.sanotut, ['iss-a-1']);
  assert.equal(muisti.data.get(PULUN_TERVETULO_TALLE), '1');

  soitaLoppuun(kello, puhuja); kello.kulje(400); // A1 → A2
  soitaLoppuun(kello, puhuja); kello.kulje(400); // A2 → B1
  soitaLoppuun(kello, puhuja); kello.kulje(400); // B1 → B2
  assert.deepEqual(puhuja.sanotut, ['iss-a-1', 'iss-a-2', 'iss-b-1', 'iss-b-2']);
  assert.deepEqual(kamera.kutsut, []);

  // B2: kamera ei liiku ennen kuin soitin alkaa, ja pyöräytys osuu
  // sanaan "Pyöräytän" (2,00 s) ja kestää sanaan "noin" (4,60 s).
  const b2 = puhuja.soittimet.at(-1);
  kello.kulje(500);
  assert.deepEqual(kamera.kutsut, []);
  b2.paused = false; b2.laukaise('playing');
  kello.kulje(1999);
  assert.deepEqual(kamera.kutsut, []);
  kello.kulje(1);
  assert.deepEqual(kamera.kutsut, [['katso', PULUN_SUOSIKKI.lat, PULUN_SUOSIKKI.lon, 2600]]);
  kello.kulje(pulunIssRepliikki('b', 1).kestoMs); b2.laukaise('ended'); kello.kulje(400);

  // C1: räppäisy heti [tap]-äänen kohdalla.
  assert.equal(puhuja.sanotut.at(-1), 'iss-c-1');
  const c1 = puhuja.soittimet.at(-1);
  c1.paused = false; c1.laukaise('playing');
  kello.kulje(250);
  assert.equal(vaaraAuki, 1);
  kello.kulje(pulunIssRepliikki('c', 0).kestoMs); c1.laukaise('ended'); kello.kulje(400);

  // C2: kuva kiinni ja kamera aloitukseen sanasta "Viedään" (3,08 s).
  assert.equal(puhuja.sanotut.at(-1), 'iss-c-2');
  const c2 = puhuja.soittimet.at(-1);
  c2.paused = false; c2.laukaise('playing');
  kello.kulje(3079);
  assert.equal(suljettu, 0);
  kello.kulje(1);
  assert.equal(suljettu, 1);
  assert.deepEqual(kamera.kutsut.at(-1), ['palaa', 2780, true]);
  kello.kulje(pulunIssRepliikki('c', 1).kestoMs); c2.laukaise('ended'); kello.kulje(400);

  assert.equal(kahva.tila().vaihe, 'valmis');
  assert.equal(doc.kuuntelijoita(), 0, 'ohituksen kuuntelija jäi dokumenttiin');
  assert.deepEqual(kahva.tila().toimitetut, ['pyorayta', 'rappaise', 'palaa']);
});

test('tervetulo: napautus ohittaa — Livia vaikenee heti ja näkymä palaa aloitukseen', () => {
  const kello = luoKello();
  const kamera = luoKamera();
  const puhuja = luoPuhuja();
  const doc = luoDokumentti();
  let vaientui = 0;
  let suljettu = 0;
  const kahva = aloitaPulunTervetulo({
    avaruus: kamera, kello, varasto: luoMuisti(), doc, sano: puhuja.sano,
    mykistetty: () => false, vahennaLiiketta: false,
    avaaVaaraKohde: () => true, suljeKortti: () => { suljettu += 1; },
    vaikene: () => { vaientui += 1; },
  });
  // Napautus ennen ensimmäistä repliikkiä ei ohita (tavallista katselua).
  doc.napauta();
  kello.kulje(PULUN_TERVETULON_VIIVE_MS);
  assert.deepEqual(puhuja.sanotut, ['iss-a-1']);
  for (let i = 0; i < 4; i += 1) { soitaLoppuun(kello, puhuja); kello.kulje(400); }
  // C1 alkaa, räppäisy avaa väärän kuvan.
  const c1 = puhuja.soittimet.at(-1);
  c1.paused = false; c1.laukaise('playing');
  kello.kulje(1000);
  assert.equal(kahva.tila().korttiAuki, true);
  doc.napauta();
  assert.equal(vaientui, 1);
  assert.equal(suljettu, 1);
  assert.deepEqual(kamera.kutsut.at(-1), ['palaa', 700, false]);
  assert.equal(kahva.tila().vaihe, 'ohitettu');
  // Mitään ei enää sanota eikä kamera liiku.
  const kutsuja = kamera.kutsut.length;
  kello.kulje(60000);
  c1.laukaise('ended');
  kello.kulje(60000);
  assert.equal(puhuja.sanotut.at(-1), 'iss-c-1');
  assert.equal(kamera.kutsut.length, kutsuja);
  assert.equal(doc.kuuntelijoita(), 0);
});

test('tervetulo: ohitus ennen kameraliikettä ei liikuta kameraa', () => {
  const kello = luoKello();
  const kamera = luoKamera();
  const puhuja = luoPuhuja();
  let vaientui = 0;
  const kahva = aloitaPulunTervetulo({
    avaruus: kamera, kello, varasto: luoMuisti(), doc: luoDokumentti(), sano: puhuja.sano,
    mykistetty: () => false, vahennaLiiketta: false, vaikene: () => { vaientui += 1; },
  });
  kello.kulje(PULUN_TERVETULON_VIIVE_MS);
  assert.equal(kahva.ohita(), true);
  assert.equal(vaientui, 1);
  assert.deepEqual(kamera.kutsut, []);
});

test('tervetulo kuullaan kerran: muisti laitteessa, varalla istunnossa', () => {
  const muisti = luoMuisti();
  const kello = luoKello();
  const puhuja = luoPuhuja();
  const eka = aloitaPulunTervetulo({
    avaruus: luoKamera(), kello, varasto: muisti, doc: luoDokumentti(), sano: puhuja.sano,
    mykistetty: () => false,
  });
  kello.kulje(PULUN_TERVETULON_VIIVE_MS);
  eka.pura();
  nollaaPulunTervetuloIstunto();
  // Toinen avaus (uusi istunto, sama laite): ei tervetuloa.
  assert.equal(aloitaPulunTervetulo({ avaruus: luoKamera(), kello, varasto: muisti, mykistetty: () => false }), null);

  // Muisti estetty (yksityinen selaus): istunnon lippu kantaa.
  nollaaPulunTervetuloIstunto();
  const estetty = luoMuisti({ kaatuu: true });
  const kello2 = luoKello();
  const toka = aloitaPulunTervetulo({
    avaruus: luoKamera(), kello: kello2, varasto: estetty, doc: luoDokumentti(), sano: luoPuhuja().sano,
    mykistetty: () => false,
  });
  assert.ok(toka);
  kello2.kulje(PULUN_TERVETULON_VIIVE_MS);
  toka.pura();
  assert.equal(aloitaPulunTervetulo({ avaruus: luoKamera(), varasto: estetty, mykistetty: () => false }), null);
});

test('tervetulo: kupla ei näy (Livia ei ole pelissä) → jakso pois, muisti ennallaan', () => {
  const muisti = luoMuisti();
  const kello = luoKello();
  const kahva = aloitaPulunTervetulo({
    avaruus: luoKamera(), kello, varasto: muisti, doc: luoDokumentti(),
    sano: luoPuhuja({ nakyy: false }).sano, mykistetty: () => false,
  });
  kello.kulje(PULUN_TERVETULON_VIIVE_MS);
  assert.equal(kahva.tila().vaihe, 'pois');
  assert.equal(muisti.data.has(PULUN_TERVETULO_TALLE), false);
});

test('tervetulo: mykistettynä ei aloiteta eikä muistia kuluteta', () => {
  const muisti = luoMuisti();
  assert.equal(aloitaPulunTervetulo({ avaruus: luoKamera(), varasto: muisti, mykistetty: () => true }), null);
  assert.equal(muisti.data.size, 0);
  // Mykistys kesken jakson: seuraavaa repliikkiä ei sanota, kamera palaa.
  const kello = luoKello();
  const puhuja = luoPuhuja();
  let mykka = false;
  let vaientui = 0;
  const kahva = aloitaPulunTervetulo({
    avaruus: luoKamera(), kello, varasto: luoMuisti(), doc: luoDokumentti(), sano: puhuja.sano,
    mykistetty: () => mykka, vaikene: () => { vaientui += 1; },
  });
  kello.kulje(PULUN_TERVETULON_VIIVE_MS);
  mykka = true;
  soitaLoppuun(kello, puhuja);
  kello.kulje(400);
  assert.deepEqual(puhuja.sanotut, ['iss-a-1']);
  assert.equal(kahva.tila().vaihe, 'ohitettu');
});

test('tervetulo: Vähennä liikettä → pelkkä A1–A2, kamera ei liiku', () => {
  assert.deepEqual(pulunTervetulonRepliikit({ vahennaLiiketta: true }).map((r) => `${r.ryhma}${r.indeksi}`), ['a0', 'a1']);
  assert.equal(pulunTervetulonRepliikit().length, PULUN_TERVETULON_JAKSO.length);
  const kello = luoKello();
  const kamera = luoKamera();
  const puhuja = luoPuhuja();
  const kahva = aloitaPulunTervetulo({
    avaruus: kamera, kello, varasto: luoMuisti(), doc: luoDokumentti(), sano: puhuja.sano,
    mykistetty: () => false, vahennaLiiketta: true,
  });
  kello.kulje(PULUN_TERVETULON_VIIVE_MS);
  soitaLoppuun(kello, puhuja); kello.kulje(400);
  soitaLoppuun(kello, puhuja); kello.kulje(400);
  assert.deepEqual(puhuja.sanotut, ['iss-a-1', 'iss-a-2']);
  assert.equal(kahva.tila().vaihe, 'valmis');
  assert.deepEqual(kamera.kutsut, []);
});

test('tervetulo odottaa mustan verhon poistumista', () => {
  const kello = luoKello();
  const kamera = luoKamera({ paljastettu: false });
  let paljastettu = false;
  kamera.paljastettu = () => paljastettu;
  const puhuja = luoPuhuja();
  aloitaPulunTervetulo({
    avaruus: kamera, kello, varasto: luoMuisti(), doc: luoDokumentti(), sano: puhuja.sano,
    mykistetty: () => false,
  });
  kello.kulje(5000);
  assert.deepEqual(puhuja.sanotut, []);
  paljastettu = true;
  kello.kulje(250 + PULUN_TERVETULON_VIIVE_MS);
  assert.deepEqual(puhuja.sanotut, ['iss-a-1']);
});

/* ---------- D: ISS-kyyti ---------- */

function luoKyytiTestiin({ mykistetty = () => false } = {}) {
  const kello = luoKello();
  const puhuja = luoPuhuja();
  const piippaukset = [];
  let vaientui = 0;
  const kyyti = luoPulunIssKyyti({
    kello, sano: puhuja.sano, mykistetty,
    piippaa: () => { piippaukset.push(kello.nyt()); return true; },
    vaikene: () => { vaientui += 1; },
  });
  return { kello, puhuja, piippaukset, kyyti, vaientui: () => vaientui };
}

test('kyyti: D1 piippauksin, D2 noin 20 s myöhemmin, D3 yöpuolella, D4 poistuessa', () => {
  const { kello, puhuja, piippaukset, kyyti } = luoKyytiTestiin();
  assert.equal(kyyti.kyytiAlkoi(), true);
  // Piippaus ensin, puhe vasta sen jälkeen.
  assert.deepEqual(piippaukset, [0]);
  assert.deepEqual(puhuja.sanotut, []);
  kello.kulje(QUINDAR_KESTO_MS + QUINDAR_VALI_MS);
  assert.deepEqual(puhuja.sanotut, ['iss-d-1']);
  soitaLoppuun(kello, puhuja);
  assert.equal(piippaukset.length, 2, 'loppupiippaus puuttuu');
  // Yöpuoli D1:n jälkeen: D3 jonoon.
  kello.kulje(1000);
  assert.equal(kyyti.yopuoliAlla(), true);
  assert.equal(kyyti.yopuoliAlla(), false, 'D3 vain kerran');
  kello.kulje(QUINDAR_KESTO_MS + QUINDAR_VALI_MS);
  assert.equal(puhuja.sanotut.at(-1), 'iss-d-3');
  soitaLoppuun(kello, puhuja);
  // D2 tulee 20 s D1:n alusta (jonossa D3:n jälkeen, jos se puhuu yhä).
  kello.kulje(PULUN_ISS_D2_VIIVE_MS);
  kello.kulje(QUINDAR_KESTO_MS + QUINDAR_VALI_MS);
  assert.equal(puhuja.sanotut.at(-1), 'iss-d-2');
  soitaLoppuun(kello, puhuja);
  kello.kulje(1000);
  assert.equal(kyyti.kyytiPaattyi(), true);
  kello.kulje(QUINDAR_KESTO_MS + QUINDAR_VALI_MS);
  assert.deepEqual(puhuja.sanotut, ['iss-d-1', 'iss-d-3', 'iss-d-2', 'iss-d-4']);
  soitaLoppuun(kello, puhuja);
  assert.equal(piippaukset.length, 8, 'jokaisen D-repliikin alkuun ja loppuun piippaus');
});

test('kyyti: D1 kerran per sessio; poistuminen kesken vaientaa ja D2 jää pois', () => {
  const eka = luoKyytiTestiin();
  eka.kyyti.kyytiAlkoi();
  eka.kello.kulje(QUINDAR_KESTO_MS + QUINDAR_VALI_MS + 1000);
  assert.equal(eka.kyyti.kyytiPaattyi(), true);
  assert.equal(eka.vaientui(), 1, 'kesken ollut D1 ei vaiennut');
  eka.kello.kulje(PULUN_ISS_D2_VIIVE_MS * 2);
  assert.equal(eka.puhuja.sanotut.includes('iss-d-2'), false);
  eka.kyyti.pura();
  // Sama istunto, uusi kyyti: ei D1:tä eikä D4:ää.
  const toka = luoKyytiTestiin();
  assert.equal(toka.kyyti.kyytiAlkoi(), false);
  toka.kello.kulje(PULUN_ISS_D2_VIIVE_MS * 2);
  assert.equal(toka.kyyti.kyytiPaattyi(), false);
  assert.deepEqual(toka.puhuja.sanotut, []);
  assert.deepEqual(toka.piippaukset, []);
});

test('kyyti: mykistettynä ei piippausta, ei puhetta eikä kertalippuja kuluteta', () => {
  let mykka = true;
  const { kello, puhuja, piippaukset, kyyti } = luoKyytiTestiin({ mykistetty: () => mykka });
  assert.equal(kyyti.kyytiAlkoi(), false);
  assert.equal(kyyti.yopuoliAlla(), false);
  kello.kulje(60000);
  assert.equal(kyyti.kyytiPaattyi(), false);
  assert.deepEqual(puhuja.sanotut, []);
  assert.deepEqual(piippaukset, []);
  // Ääni päälle: seuraava kyyti saa D1:n (lippua ei kulutettu).
  mykka = false;
  assert.equal(kyyti.kyytiAlkoi(), true);
});

test('kyyti: pura hiljentää ja estää kaiken myöhemmän', () => {
  const { kello, puhuja, kyyti } = luoKyytiTestiin();
  kyyti.kyytiAlkoi();
  kyyti.pura();
  kello.kulje(PULUN_ISS_D2_VIIVE_MS * 2);
  assert.deepEqual(puhuja.sanotut, []);
  assert.equal(kyyti.yopuoliAlla(), false);
  assert.equal(kyyti.kyytiPaattyi(), false);
});

test('Quindar: 2 525 Hz siniääni, 250 ms, pehmeät reunat samassa kontekstissa', () => {
  const tapahtumat = [];
  const param = (nimi) => ({
    setValueAtTime: (v, t) => tapahtumat.push([nimi, 'set', v, t]),
    linearRampToValueAtTime: (v, t) => tapahtumat.push([nimi, 'ramp', v, t]),
  });
  const osc = {
    type: '', frequency: param('taajuus'),
    connect: (g) => g, start: (t) => tapahtumat.push(['start', t]), stop: (t) => tapahtumat.push(['stop', t]),
  };
  const konteksti = {
    currentTime: 10, destination: {},
    createOscillator: () => osc,
    createGain: () => ({ gain: param('taso'), connect: (d) => { tapahtumat.push(['ulos', d === konteksti.destination]); return d; } }),
  };
  assert.equal(soitaQuindar({ konteksti, taso: 0.08, viiveMs: 500 }), true);
  assert.equal(osc.type, 'sine');
  assert.deepEqual(tapahtumat.find((t) => t[0] === 'taajuus'), ['taajuus', 'set', QUINDAR_TAAJUUS_HZ, 10.5]);
  assert.deepEqual(tapahtumat.find((t) => t[0] === 'start'), ['start', 10.5]);
  const stop = tapahtumat.find((t) => t[0] === 'stop')[1];
  assert.ok(stop >= 10.5 + QUINDAR_KESTO_MS / 1000 && stop < 10.5 + QUINDAR_KESTO_MS / 1000 + 0.05);
  const tasot = tapahtumat.filter((t) => t[0] === 'taso');
  assert.equal(tasot[0][2], 0);
  assert.equal(Math.max(...tasot.map((t) => t[2])), 0.08);
  assert.equal(tasot.at(-1)[2], 0);
  assert.ok(tapahtumat.some((t) => t[0] === 'ulos' && t[1] === true));
  // Ei kontekstia tai taso nolla (mykistys): ei piippausta.
  assert.equal(soitaQuindar({ konteksti: null, taso: 0.08 }), false);
  assert.equal(soitaQuindar({ konteksti, taso: 0 }), false);
});
