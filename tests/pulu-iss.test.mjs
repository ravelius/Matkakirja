/*
 * PULUN ISS-REPLIIKIT: Astronautin kameran tervetulo (A1–A2, omistaja 29.9.2026,
 * js/linssit/pulu-tervetulo.js) ja ISS-kyydin rajapinta (D,
 * js/linssit/pulu-iss.js). Käsikirjoitus: päätoimittaja 28.9.2026.
 *
 * Kello, kuplat, soitin, kamera ja muisti ovat tynkiä: testi mittaa
 * ajoituksen, ohituksen, kerran-muistin ja mykistyksen ilman selainta
 * ja ilman ääntä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { LIVIAN_ISS } from '../js/livia.js';
import { LIVIAN_KESTOT, LIVIAN_VERSIOIDUT_AANET } from '../js/liviapuhe.js';
import {
  PULUN_ISS_D2_VIIVE_MS, QUINDAR_KESTO_MS, QUINDAR_TAAJUUS_HZ, QUINDAR_VALI_MS,
  luoPulunIssKyyti, nollaaPulunIssIstunto, pulunIssRepliikki, sanoPulunIssRepliikkiIlmanKuplaa, soitaQuindar,
} from '../js/linssit/pulu-iss.js';
import {
  PULUN_TERVETULON_JAKSO, PULUN_TERVETULON_VIIVE_MS, PULUN_TERVETULO_TALLE,
  aloitaPulunTervetulo, nollaaPulunTervetuloIstunto,
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
      assert.match(LIVIAN_VERSIOIDUT_AANET[r.avain], /^aanet\/pulu\/versiot\/[0-9a-f]{12}\/pulu-[0-9a-f]{20}\/tasoitettu\/livia-iss-/);
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

/* ---------- A: tervetulo ---------- */

test('tervetulo: A1–A2 järjestyksessä ilman kameraliikettä (omistaja 29.9.: B ja C pois)', () => {
  assert.deepEqual(PULUN_TERVETULON_JAKSO.map((r) => `${r.ryhma}${r.indeksi}`), ['a0', 'a1']);
  const kello = luoKello();
  const kamera = luoKamera();
  const puhuja = luoPuhuja();
  const muisti = luoMuisti();
  const doc = luoDokumentti();
  const kahva = aloitaPulunTervetulo({
    avaruus: kamera, kello, varasto: muisti, doc, sano: puhuja.sano,
    mykistetty: () => false,
    vaikene: () => assert.fail('ei saa vaientaa kesken'),
  });
  assert.ok(kahva);
  // Ei puhetta ennen paljastusta ja hengähdystä.
  kello.kulje(PULUN_TERVETULON_VIIVE_MS - 1);
  assert.deepEqual(puhuja.sanotut, []);
  kello.kulje(1);
  assert.deepEqual(puhuja.sanotut, ['iss-a-1']);
  assert.equal(muisti.data.get(PULUN_TERVETULO_TALLE), '1');
  assert.equal(kahva.tila().puhuu, true);

  soitaLoppuun(kello, puhuja);
  assert.equal(kahva.tila().puhuu, false, 'hengähdyksen aikana ei puhuta');
  kello.kulje(400); // A1 → A2
  soitaLoppuun(kello, puhuja); kello.kulje(400);
  assert.deepEqual(puhuja.sanotut, ['iss-a-1', 'iss-a-2']);
  assert.equal(kahva.tila().vaihe, 'valmis');
  assert.equal(doc.kuuntelijoita(), 0, 'ohituksen kuuntelija jäi dokumenttiin');
  assert.deepEqual(kamera.kutsut, [], 'tervetulo ei liikuta kameraa');
});

test('tervetulo: napautus puheen aikana vaientaa Livian heti', () => {
  const kello = luoKello();
  const puhuja = luoPuhuja();
  const doc = luoDokumentti();
  let vaientui = 0;
  const kahva = aloitaPulunTervetulo({
    avaruus: luoKamera(), kello, varasto: luoMuisti(), doc, sano: puhuja.sano,
    mykistetty: () => false, vaikene: () => { vaientui += 1; },
  });
  // Napautus ennen ensimmäistä repliikkiä ei ohita (tavallista katselua).
  doc.napauta();
  kello.kulje(PULUN_TERVETULON_VIIVE_MS);
  assert.deepEqual(puhuja.sanotut, ['iss-a-1']);
  assert.equal(vaientui, 0);
  doc.napauta();
  assert.equal(vaientui, 1);
  assert.equal(kahva.tila().vaihe, 'ohitettu');
  assert.deepEqual(kahva.tila().tapahtumat, ['ohitus:napautus']);
  // Mitään ei enää sanota.
  kello.kulje(60000);
  puhuja.soittimet.at(-1).laukaise('ended');
  kello.kulje(60000);
  assert.deepEqual(puhuja.sanotut, ['iss-a-1']);
  assert.equal(doc.kuuntelijoita(), 0);
  assert.equal(kahva.ohita(), false, 'jo ohitettu');
});

test('tervetulo ilman kuplaa: Pulu puhuu vain, kun se saa puhua (Livia pelissä, chatti kiinni)', () => {
  const soitot = [];
  const soita = (_ui, lahde, indeksi, { teksti }) => { soitot.push([lahde, indeksi, teksti]); return { paused: true }; };
  const a1 = pulunIssRepliikki('a', 0);
  const kahva = sanoPulunIssRepliikkiIlmanKuplaa(null, a1, { puhe: () => true, soita });
  assert.equal(kahva.repliikki, a1);
  assert.deepEqual(soitot, [['iss-a', 0, a1.teksti]]);
  assert.equal(sanoPulunIssRepliikkiIlmanKuplaa(null, a1, { puhe: () => false, soita }), null);
  assert.equal(sanoPulunIssRepliikkiIlmanKuplaa(null, null, { puhe: () => true, soita }), null);
  assert.equal(soitot.length, 1, 'kun Pulu ei saa puhua, mitään ei soiteta');
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

test('tervetulo: Pulu ei voi puhua (Livia ei ole pelissä) → jakso pois, muisti ennallaan', () => {
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
  // Mykistys kesken jakson: seuraavaa repliikkiä ei sanota.
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
