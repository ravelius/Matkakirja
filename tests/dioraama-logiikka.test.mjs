/*
 * DIORAAMAMOOTTORIN PUHTAAN LOGIIKAN TESTIT (js/dioraama/{kamera,heratys,
 * ohjaaja}.js). Kaavat ovat natiivin Kameraliike/Heratys/Ohjaaja-luokkien
 * (Assets/Matkakirja/Linssit/Ydin/Dioraama/) kanssa pariteetissa
 * testivektorein: docs/raportit/dioraama-rajapinnat-20260929.md kohta 4.
 *
 * Kaksi testikerrosta:
 * 1) REGRESSIO — tools/dioraama/tee-vektorit.mjs:n tuottama
 *    tests/fixtures/dioraama/vektorit.json toistetaan tässä; sama
 *    tiedosto (kopiona) ajetaan C#:ssa Linssit-testit/Testit/
 *    DioraamaTestit.cs:ssä, joten muutos jommassakummassa kielessä
 *    näkyy erona heti kummassakin.
 * 2) KÄSIN LASKETUT ÄÄRIARVOT — pieniä, itsenäisesti tarkistettavia
 *    tapauksia suoraan kaavoista (ei riipu fixturen sisällöstä).
 *
 * Toleranssi 1e-6 (speksin kohta 4); fixture on pyöristetty 1e-9:ään.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  smootherstep, asentoSijainti, siirtymanKesto, siirtymaAsento, pelaajanAsento,
  rajaaKierto, kiertoRajat, leijunta, OLETUS_KIERTO_TILA, OLETUS_KIERTO_YLEIS,
} from '../js/dioraama/kamera.js';
import { tilanTaso, tilanTasoJaEdellinen, hahmonTila, aanenVoimakkuus } from '../js/dioraama/heratys.js';
import { askeleenKesto, kasikirjoitusHetkella, puluLento, seuraavaKiertueella } from '../js/dioraama/ohjaaja.js';

const V = JSON.parse(readFileSync(new URL('./fixtures/dioraama/vektorit.json', import.meta.url), 'utf8'));
const TOL = 1e-6;

const lahella = (a, b, tol = TOL) => Math.abs(a - b) <= tol;
const vekLahella = (a, b, tol = TOL) => a.length === b.length && a.every((x, i) => lahella(x, b[i], tol));

function assertAsentoLahella(saatu, odotettu, viesti) {
  assert.ok(vekLahella(saatu.kohde, odotettu.kohde), `${viesti}: kohde ${saatu.kohde} != ${odotettu.kohde}`);
  assert.ok(lahella(saatu.atsimuutti, odotettu.atsimuutti), `${viesti}: atsimuutti ${saatu.atsimuutti} != ${odotettu.atsimuutti}`);
  assert.ok(lahella(saatu.korkeus, odotettu.korkeus), `${viesti}: korkeus`);
  assert.ok(lahella(saatu.etaisyys, odotettu.etaisyys), `${viesti}: etaisyys ${saatu.etaisyys} != ${odotettu.etaisyys}`);
  assert.ok(lahella(saatu.fov, odotettu.fov), `${viesti}: fov`);
  assert.ok(lahella(saatu.aukko, odotettu.aukko), `${viesti}: aukko`);
}

/* ================================================================
 * 1. KAMERA
 * ================================================================ */

test('kamera: vektorit toistuvat (regressio)', () => {
  assert.ok(V.kamera.length >= 5, 'vähintään 5 asentoparia');
  for (const par of V.kamera) {
    assert.ok(lahella(siirtymanKesto(par.p0, par.p1), par.kesto), `${par.nimi}: kesto`);
    for (const nayte of par.naytteet) {
      const asento = siirtymaAsento(par.p0, par.p1, nayte.t);
      assertAsentoLahella(asento, nayte.asento, `${par.nimi} t=${nayte.t} asento`);
      const sijaintiTulos = asentoSijainti(asento);
      assert.ok(vekLahella(sijaintiTulos.sijainti, nayte.sijainti.sijainti), `${par.nimi} t=${nayte.t} sijainti`);
      assert.ok(lahella(sijaintiTulos.etaisyys, nayte.sijainti.etaisyys), `${par.nimi} t=${nayte.t} sijainti.etaisyys`);
    }
  }
});

test('smootherstep: päätepisteet, symmetria ja rajaus 0–1', () => {
  assert.ok(lahella(smootherstep(0), 0));
  assert.ok(lahella(smootherstep(1), 1));
  assert.ok(lahella(smootherstep(0.5), 0.5)); // käyrä on pisteen (0.5, 0.5) suhteen symmetrinen
  assert.ok(lahella(smootherstep(-7), smootherstep(0))); // t rajataan 0:aan
  assert.ok(lahella(smootherstep(7), smootherstep(1))); // t rajataan 1:een
});

test('asentoSijainti: a=180 asettaa kameran kohteen eteläpuolelle (+Z)', () => {
  const p = { kohde: [0, 0, 0], atsimuutti: 180, korkeus: 0, etaisyys: 10, fov: 45, aukko: 0 };
  const { sijainti } = asentoSijainti(p);
  assert.ok(vekLahella(sijainti, [0, 0, 10]), `sijainti ${sijainti}`);
});

test('asentoSijainti: kohteen siirto näkyy sijainnissa sellaisenaan', () => {
  const p = { kohde: [3, 1, -2], atsimuutti: 90, korkeus: 0, etaisyys: 4, fov: 45, aukko: 0 };
  const { sijainti, kohde } = asentoSijainti(p);
  assert.ok(vekLahella(kohde, [3, 1, -2]));
  assert.ok(vekLahella(sijainti, [3 + 4, 1, -2])); // a=90 -> +X kohteesta
});

test('siirtymanKesto: pysyy aina välillä [2,0, 3,8] ja saavuttaa molemmat rajat', () => {
  for (const par of V.kamera) {
    const k = siirtymanKesto(par.p0, par.p1);
    assert.ok(k >= 2.0 - 1e-9 && k <= 3.8 + 1e-9, `${par.nimi}: ${k} rajojen ulkopuolella`);
  }
  const nimet = Object.fromEntries(V.kamera.map((p) => [p.nimi, p.kesto]));
  assert.ok(lahella(nimet['sama-asento'], 2.0), 'Δ=0 -> kestolattia 2,0 s');
  assert.ok(lahella(nimet['iso-siirtyma'], 3.8), 'iso Δ -> kestokatto 3,8 s');
});

test('siirtymaAsento: t=0 ja t=1 ovat tarkat päätepisteet, nosto 0 molemmissa päissä', () => {
  const p0 = { kohde: [0, 0, 0], atsimuutti: 0, korkeus: 10, etaisyys: 5, fov: 45, aukko: 0.2 };
  const p1 = { kohde: [10, 2, -4], atsimuutti: 90, korkeus: 30, etaisyys: 9, fov: 35, aukko: 0.1 };
  const a0 = siirtymaAsento(p0, p1, 0);
  const a1 = siirtymaAsento(p0, p1, 1);
  assertAsentoLahella(a0, p0, 't=0');
  assertAsentoLahella(a1, p1, 't=1');
});

test('siirtymaAsento (era 2b, kaarilento): korkeuden nousu ja etäisyyden pullistuma 0 molemmissa päissä, matka01:n mukaisia keskellä', () => {
  const p0 = { kohde: [0, 0, 0], atsimuutti: 0, korkeus: 0, etaisyys: 5, fov: 45, aukko: 0 };
  const p1 = { kohde: [10, 0, 0], atsimuutti: 0, korkeus: 0, etaisyys: 5, fov: 45, aukko: 0 }; // |Δkohde|=10
  assert.ok(lahella(siirtymaAsento(p0, p1, 0).etaisyys, 5) && lahella(siirtymaAsento(p0, p1, 0).korkeus, 0), 't=0: ei kaarta');
  assert.ok(lahella(siirtymaAsento(p0, p1, 1).etaisyys, 5) && lahella(siirtymaAsento(p0, p1, 1).korkeus, 0), 't=1: ei kaarta');
  const matka01 = 10 / 60; // ei kyllästy (< 1)
  const keski = siirtymaAsento(p0, p1, 0.5);
  assert.ok(lahella(keski.korkeus, 12 * matka01), `keski.korkeus=${keski.korkeus} (odotettu 12°·matka01)`);
  assert.ok(lahella(keski.etaisyys, 5 * (1 + 0.35 * matka01)), `keski.etaisyys=${keski.etaisyys}`);

  // |Δkohde|=100m > 60m-jakaja -> matka01 kyllästyy 1:een: huippu saa täyden 12°/0,35-vaikutuksen.
  const p1Kauas = { kohde: [100, 0, 0], atsimuutti: 0, korkeus: 0, etaisyys: 5, fov: 45, aukko: 0 };
  const kaukoKeski = siirtymaAsento(p0, p1Kauas, 0.5);
  assert.ok(lahella(kaukoKeski.korkeus, 12), `kaukoKeski.korkeus=${kaukoKeski.korkeus} (matka01=1 -> täysi 12°)`);
  assert.ok(lahella(kaukoKeski.etaisyys, 5 * 1.35), `kaukoKeski.etaisyys=${kaukoKeski.etaisyys}`);
});

test('siirtymaAsento: kiertoero valitsee lyhimmän reitin (350° -> 10° on +20°, ei -340°)', () => {
  const p0 = { kohde: [0, 0, 0], atsimuutti: 350, korkeus: 0, etaisyys: 5, fov: 45, aukko: 0 };
  const p1 = { kohde: [0, 0, 0], atsimuutti: 10, korkeus: 0, etaisyys: 5, fov: 45, aukko: 0 };
  const e50 = siirtymaAsento(p0, p1, 0.5); // e=smootherstep(0.5)=0.5 tasan
  assert.ok(lahella(e50.atsimuutti, 360), `atsimuutti ${e50.atsimuutti} (odotettu 350+20*0,5=360)`);
});

test('pelaajanAsento: da/dk/zoom rajataan (±20, ±10, 0,75–1,3)', () => {
  const p = { kohde: [1, 2, 3], atsimuutti: 100, korkeus: 5, etaisyys: 8, fov: 45, aukko: 0.2 };
  const sisalla = pelaajanAsento(p, { da: 10, dk: 5, zoom: 1.1 });
  assert.ok(lahella(sisalla.atsimuutti, 110) && lahella(sisalla.korkeus, 10) && lahella(sisalla.etaisyys, 8.8));
  const yli = pelaajanAsento(p, { da: 999, dk: -999, zoom: 99 });
  assert.ok(lahella(yli.atsimuutti, 120) && lahella(yli.korkeus, -5) && lahella(yli.etaisyys, 8 * 1.3));
  const ali = pelaajanAsento(p, { da: -999, dk: 999, zoom: -5 });
  assert.ok(lahella(ali.atsimuutti, 80) && lahella(ali.korkeus, 15) && lahella(ali.etaisyys, 8 * 0.75));
  assert.ok(lahella(yli.fov, p.fov) && lahella(yli.aukko, p.aukko), 'fov/aukko kulkevat läpi muuttumattomina');
});

test('rajaus: vektorit toistuvat (regressio)', () => {
  assert.ok(V.rajaus.length >= 5, 'vähintään 5 rajaustapausta');
  for (const tapaus of V.rajaus) {
    const tulos = rajaaKierto(tapaus.perus, tapaus.asento, tapaus.yleisnakyma);
    assertAsentoLahella(tulos, tapaus.tulos, tapaus.nimi);
  }
});

test('leijunta: vektorit toistuvat (regressio)', () => {
  assert.ok(V.leijunta.naytteet.length >= 5, 'vähintään 5 leijuntanäytettä');
  for (const nayte of V.leijunta.naytteet) {
    assertAsentoLahella(leijunta(V.leijunta.asento, nayte.t), nayte.tulos, `leijunta t=${nayte.t}`);
  }
});

test('rajaaKierto: ei kierto-kenttää -> tila-oletus (±55° atsimuutti suhteessa perukseen, korkeus 6–65, etaisyys 0,55–1,6·perus)', () => {
  const perus = { kohde: [0, 0, 0], atsimuutti: 200, korkeus: 25, etaisyys: 4, fov: 45, aukko: 0.3 };
  const sisalla = rajaaKierto(perus, { ...perus, atsimuutti: 220, korkeus: 30, etaisyys: 4.5 });
  assert.ok(lahella(sisalla.atsimuutti, 220) && lahella(sisalla.korkeus, 30) && lahella(sisalla.etaisyys, 4.5), 'rajojen sisällä: läpi muuttumattomana');
  const ylitys = rajaaKierto(perus, { ...perus, atsimuutti: 350, korkeus: 90, etaisyys: 20 });
  assert.ok(lahella(ylitys.atsimuutti, perus.atsimuutti + OLETUS_KIERTO_TILA.atsimuuttiMax), `atsimuutti ${ylitys.atsimuutti}`);
  assert.ok(lahella(ylitys.korkeus, OLETUS_KIERTO_TILA.korkeusMax), `korkeus ${ylitys.korkeus}`);
  assert.ok(lahella(ylitys.etaisyys, perus.etaisyys * OLETUS_KIERTO_TILA.etaisyysMax), `etaisyys ${ylitys.etaisyys}`);
});

test('rajaaKierto: yleisnakyma=true -> atsimuutti VAPAA (ei rajaa), korkeus/etaisyys yleisnäkymän oletukseen', () => {
  const perus = { kohde: [0, 0, 0], atsimuutti: 180, korkeus: 35, etaisyys: 8, fov: 50, aukko: 0.1 };
  const kauas = rajaaKierto(perus, { ...perus, atsimuutti: 340, korkeus: 90, etaisyys: 20 }, true);
  assert.ok(lahella(kauas.atsimuutti, 340), `atsimuutti ${kauas.atsimuutti} pitäisi kulkea läpi rajaamattomana (vapaa 360°)`);
  assert.ok(lahella(kauas.korkeus, OLETUS_KIERTO_YLEIS.korkeusMax));
  assert.ok(lahella(kauas.etaisyys, perus.etaisyys * OLETUS_KIERTO_YLEIS.etaisyysMax));
});

test('rajaaKierto: perus.kierto (oma) voittaa OLETUS_KIERTO_YLEISin vaikka yleisnakyma=true', () => {
  const perus = {
    kohde: [0, 0, 0], atsimuutti: 200, korkeus: 25, etaisyys: 4, fov: 45, aukko: 0.3,
    kierto: { atsimuuttiMin: -10, atsimuuttiMax: 10, korkeusMin: 20, korkeusMax: 30, etaisyysMin: 0.9, etaisyysMax: 1.1 },
  };
  const tulos = rajaaKierto(perus, { ...perus, atsimuutti: 230, korkeus: 5, etaisyys: 10 }, true);
  assert.ok(lahella(tulos.atsimuutti, 210), `atsimuutti ${tulos.atsimuutti} (200+10, oman kierron mukaan, ei yleisen 360°)`);
  assert.ok(lahella(tulos.korkeus, 20));
  assert.ok(lahella(tulos.etaisyys, 4 * 1.1));
});

test('rajaaKierto: atsimuutti ei normalisoidu 0..360-välille (350+55=405, kiertoero-logiikka wrapin yli)', () => {
  const perus = { kohde: [0, 0, 0], atsimuutti: 350, korkeus: 20, etaisyys: 5, fov: 45, aukko: 0.2 };
  const tulos = rajaaKierto(perus, { ...perus, atsimuutti: 430 }); // 430≡70°, lyhin ero perukseen on +80° -> leikkautuu +55:een
  assert.ok(lahella(tulos.atsimuutti, 405), `atsimuutti ${tulos.atsimuutti} (odotettu 405, ei 45)`);
});

test('leijunta: jaksollinen (atsimuutti ±3°/24s, korkeus ±1,5°/31s), muut kentät läpi muuttumattomina', () => {
  const p = { kohde: [1, 2, 3], atsimuutti: 200, korkeus: 25, etaisyys: 4, fov: 45, aukko: 0.3 };
  const t0 = leijunta(p, 0);
  assertAsentoLahella(t0, p, 't=0: nollapoikkeama');
  const t6 = leijunta(p, 6); // neljännesjakso atsimuutille (24/4=6) -> sin(π/2)=1 -> +3°
  assert.ok(lahella(t6.atsimuutti, 203), `atsimuutti ${t6.atsimuutti}`);
  const t24 = leijunta(p, 24); // täysi jakso atsimuutille -> takaisin 0:aan
  assert.ok(lahella(t24.atsimuutti, 200), `atsimuutti ${t24.atsimuutti}`);
  const t31 = leijunta(p, 31); // täysi jakso korkeudelle -> takaisin 0:aan
  assert.ok(lahella(t31.korkeus, 25), `korkeus ${t31.korkeus}`);
  assert.ok(vekLahella(t6.kohde, p.kohde) && lahella(t6.etaisyys, p.etaisyys) && lahella(t6.fov, p.fov) && lahella(t6.aukko, p.aukko), 'muut kentät koskemattomina');
});

/* ================================================================
 * 2. HERÄTYS
 * ================================================================ */

test('heratys: vektorit toistuvat (regressio)', () => {
  const rak = V.heratys.rakennus;
  const { aikataulu } = V.heratys;
  assert.ok(V.heratys.hetket.length >= 12, 'vähintään 12 hetkeä');
  for (const hetki of V.heratys.hetket) {
    for (const odotettu of hetki.tilat) {
      const { taso, alkoi } = tilanTaso(rak, aikataulu, odotettu.tilaId, hetki.t);
      assert.equal(taso, odotettu.taso, `${odotettu.tilaId} t=${hetki.t} taso`);
      assert.ok(lahella(alkoi, odotettu.alkoi), `${odotettu.tilaId} t=${hetki.t} alkoi`);
      const { edellinenTaso } = tilanTasoJaEdellinen(rak, aikataulu, odotettu.tilaId, hetki.t);
      assert.equal(edellinenTaso, odotettu.edellinenTaso, `${odotettu.tilaId} t=${hetki.t} edellinenTaso`);
      const vol = aanenVoimakkuus(taso, alkoi, edellinenTaso, hetki.t);
      assert.ok(lahella(vol, odotettu.aanenVoimakkuus), `${odotettu.tilaId} t=${hetki.t} aanenVoimakkuus`);
    }
    for (const odotettu of hetki.hahmot) {
      const tulos = hahmonTila(rak, aikataulu, odotettu.tilaId, odotettu.hahmoIndeksi, hetki.t);
      assert.equal(tulos.naky, odotettu.naky, `${odotettu.hahmoId} t=${hetki.t} naky`);
      assert.equal(tulos.silmukka, odotettu.silmukka, `${odotettu.hahmoId} t=${hetki.t} silmukka`);
      assert.equal(tulos.ruutu, odotettu.ruutu, `${odotettu.hahmoId} t=${hetki.t} ruutu`);
    }
  }
});

test('heratys: tavoitetaso-säännöt (kohde 2, naapuri 1, muu 0, yleisnäkymä -> kohdistettavat 1)', () => {
  const rak = V.heratys.rakennus;
  const kohdistettu = [{ hetki: 0, kohde: 'sali', kesto: 0 }];
  assert.equal(tilanTaso(rak, kohdistettu, 'sali', 0).taso, 2, 'kohde itse');
  assert.equal(tilanTaso(rak, kohdistettu, 'keittio', 0).taso, 1, 'kohteen naapuri');
  assert.equal(tilanTaso(rak, kohdistettu, 'massa', 0).taso, 0, 'muu (ei naapuri eikä kohdistettava)');
  const yleisnakyma = [{ hetki: 0, kohde: null, kesto: 0 }];
  assert.equal(tilanTaso(rak, yleisnakyma, 'keittio', 0).taso, 1, 'kohdistettava yleisnäkymässä');
  assert.equal(tilanTaso(rak, yleisnakyma, 'sali', 0).taso, 1, 'kohdistettava yleisnäkymässä');
  assert.equal(tilanTaso(rak, yleisnakyma, 'massa', 0).taso, 0, 'ei kohdistettava -> pysyy 0:ssa yleisnäkymässäkin');
});

test('heratys: LASKU tapahtuu heti, NOUSU vasta hetki + 0,6·kesto', () => {
  const rak = V.heratys.rakennus;
  const { aikataulu } = V.heratys; // [{0,null,0}, {2,'keittio',3}, {9,'sali',2.5}, {15,null,3}]
  // keittiön NOUSU tasolle 2: 2 + 0,6*3 = 3,8 (ei aiemmin, ei myöhemmin)
  assert.equal(tilanTaso(rak, aikataulu, 'keittio', 3.79999).taso, 1);
  assert.equal(tilanTaso(rak, aikataulu, 'keittio', 3.8).taso, 2);
  // keittiön LASKU tasolta 2 tapahtuu HETI hetkellä 9 (ei viivettä)
  assert.equal(tilanTaso(rak, aikataulu, 'keittio', 8.99999).taso, 2);
  const laskun = tilanTaso(rak, aikataulu, 'keittio', 9);
  assert.equal(laskun.taso, 1);
  assert.equal(laskun.alkoi, 9);
  // salin NOUSU tasolle 2: 9 + 0,6*2,5 = 10,5
  assert.equal(tilanTaso(rak, aikataulu, 'sali', 10.49999).taso, 1);
  assert.equal(tilanTaso(rak, aikataulu, 'sali', 10.5).taso, 2);
  // massa (ei kohdistettava) pysyy tasolla 0 koko aikataulun ajan
  for (const t of [0, 2, 3.8, 9, 10.5, 15, 50]) assert.equal(tilanTaso(rak, aikataulu, 'massa', t).taso, 0);
});

test('heratys: sama tavoitetaso kuin nykyinen ei nollaa "alkoi":ta', () => {
  const rak = V.heratys.rakennus;
  const { aikataulu } = V.heratys;
  // keittiö laski tasolle 1 hetkellä 9; hetken 15 yleisnäkymä-tapahtuma tavoittelee taas 1:tä keittiölle
  // (kohdistettava) -> ei muutosta, alkoi pysyy 9:ssä.
  const ennenHetkea15 = tilanTaso(rak, aikataulu, 'keittio', 14);
  const jalkeenHetken15 = tilanTaso(rak, aikataulu, 'keittio', 16);
  assert.equal(ennenHetkea15.taso, 1);
  assert.equal(jalkeenHetken15.taso, 1);
  assert.equal(ennenHetkea15.alkoi, 9);
  assert.equal(jalkeenHetken15.alkoi, 9, 'alkoi ei muutu kun tavoitetaso pysyy samana');
});

test('heratys: hahmon herääminen porrastuu 0,2·hahmoIndeksi', () => {
  const rak = V.heratys.rakennus;
  const { aikataulu } = V.heratys;
  // keittiö nousee tasolle 2 hetkellä 3,8. kokki (indeksi 0) herää heti, apulainen (indeksi 1) 0,2 s myöhemmin.
  assert.equal(hahmonTila(rak, aikataulu, 'keittio', 0, 3.8).silmukka, 'tyo'); // herääminen=3,8+0=3,8
  assert.equal(hahmonTila(rak, aikataulu, 'keittio', 1, 3.8).silmukka, 'idle'); // herääminen=3,8+0,2=4,0, ei vielä
  assert.equal(hahmonTila(rak, aikataulu, 'keittio', 1, 3.99999).silmukka, 'idle');
  assert.equal(hahmonTila(rak, aikataulu, 'keittio', 1, 4.0).silmukka, 'kavely'); // t >= 4,0
});

test('heratys: reittihahmo näkyy vain tasolla 2, muut aina', () => {
  const rak = V.heratys.rakennus;
  const { aikataulu } = V.heratys;
  assert.equal(hahmonTila(rak, aikataulu, 'keittio', 1, 0).naky, false, 'apulainen (reitti) tasolla 1: piilossa');
  assert.equal(hahmonTila(rak, aikataulu, 'keittio', 1, 3.8).naky, true, 'apulainen (reitti) tasolla 2: näkyy');
  assert.equal(hahmonTila(rak, aikataulu, 'keittio', 1, 9).naky, false, 'takaisin tasolle 1: piilossa taas');
  for (const t of [0, 3.8, 9, 20]) {
    assert.equal(hahmonTila(rak, aikataulu, 'keittio', 0, t).naky, true, `kokki (ei reitti) t=${t}: aina näkyy`);
    assert.equal(hahmonTila(rak, aikataulu, 'sali', 0, t).naky, true, `vieras (ei reitti) t=${t}: aina näkyy`);
  }
});

test('aanenVoimakkuus: tavoitteet 0 / 0,25 / 1, ei liukua kun edellinenTaso === taso', () => {
  assert.equal(aanenVoimakkuus(0, 0, 0, 100), 0);
  assert.equal(aanenVoimakkuus(1, 0, 1, 100), 0.25);
  assert.equal(aanenVoimakkuus(2, 0, 2, 100), 1);
});

test('aanenVoimakkuus: lineaarinen liuku täsmälleen 1,2 sekunnissa', () => {
  assert.ok(lahella(aanenVoimakkuus(2, 10, 0, 10), 0)); // heti vaihdon hetkellä: vielä edellisessä arvossa
  assert.ok(lahella(aanenVoimakkuus(2, 10, 0, 10.6), 0.5)); // puolivälissä (0,6/1,2)
  assert.ok(lahella(aanenVoimakkuus(2, 10, 0, 11.2), 1)); // 1,2 s kuluttua: perillä
  assert.ok(lahella(aanenVoimakkuus(2, 10, 0, 50), 1)); // pysyy perillä
});

/* ================================================================
 * 3. OHJAAJA
 * ================================================================ */

test('ohjaaja: vektorit toistuvat (regressio)', () => {
  const keittioTila = V.heratys.rakennus.tilat.find((t) => t.id === 'keittio');
  const rak = V.heratys.rakennus;
  assert.equal(V.ohjaaja.askeleet.length, 8, '8 askelta');
  V.ohjaaja.askeleet.forEach((askel, i) => {
    assert.ok(lahella(askeleenKesto(askel, keittioTila, rak), V.ohjaaja.kestot[i]), `askel ${i} (${askel.tee}) kesto`);
  });
  assert.ok(V.ohjaaja.hetket.length >= 10, 'vähintään 10 hetkeä');
  for (const hetki of V.ohjaaja.hetket) {
    const tulos = kasikirjoitusHetkella(V.ohjaaja.askeleet, V.ohjaaja.kestot, V.ohjaaja.napautukset, hetki.t);
    assert.equal(tulos.indeksi, hetki.indeksi, `t=${hetki.t} indeksi`);
    assert.ok(lahella(tulos.alku, hetki.alku), `t=${hetki.t} alku`);
    assert.ok(lahella(tulos.paikallinen, hetki.paikallinen), `t=${hetki.t} paikallinen`);
    assert.equal(tulos.valmis, hetki.valmis, `t=${hetki.t} valmis`);
  }
});

test('askeleenKesto: kaava jokaiselle askeltyypille', () => {
  const tila = {
    taulu: { kohdat: [{ teksti: 'x'.repeat(10) }] }, // merkit=10 -> 0,06*10=0,6 -> max(3,0,6)=3
    hahmot: [{
      id: 'h',
      repliikit: [{ teksti: 'x'.repeat(10), aani: null }], // 0,06*10=0,6 -> max(2,0,6)=2
      reaktio: { teksti: 'x'.repeat(200), aani: null }, // 0,06*200=12 -> max(2,12)=12
    }],
  };
  const rak = { aanet: {} };
  assert.equal(askeleenKesto({ tee: 'pulu-lenna' }, tila, rak), 1.8);
  assert.equal(askeleenKesto({ tee: 'taulu' }, tila, rak), 0.25);
  assert.equal(askeleenKesto({ tee: 'kohta', n: 0 }, tila, rak), 3);
  assert.equal(askeleenKesto({ tee: 'repliikki', hahmo: 'h' }, tila, rak), 2);
  assert.equal(askeleenKesto({ tee: 'reaktio', hahmo: 'h' }, tila, rak), 12);
  assert.equal(askeleenKesto({ tee: 'odota', s: 4.25 }, tila, rak), 4.25);
});

test('askeleenKesto: ääni korvaa tekstipohjaisen keston kokonaan', () => {
  const tila = { taulu: { kohdat: [] }, hahmot: [{ id: 'h', repliikit: [{ teksti: 'x', aani: 'a1' }], reaktio: { teksti: 'x', aani: null } }] };
  const rak = { aanet: { a1: { kesto_s: 7.25 } } };
  assert.equal(askeleenKesto({ tee: 'repliikki', hahmo: 'h' }, tila, rak), 7.25);
});

// --- era2 (dioraama-rajapinnat-era2-20260929.md kohta 2 "AANET"): kohta.aani lisää
// tauon (ei korvaa kokonaan, toisin kuin repliikki/reaktio) ja repliikki.n valitsee rivin. ---

test('askeleenKesto: kohta.aani LISÄÄ 0,6 s tekstipohjaisen/äänipohjaisen keston perään (ei korvaa)', () => {
  const tila = { taulu: { kohdat: [{ teksti: 'x'.repeat(10), aani: 'k1' }] }, hahmot: [] }; // teksti jäisi 0,6*10=... -> max(3,·)=3 ilman ääntä
  const rak = { aanet: { k1: { kesto_s: 4 } } };
  assert.equal(askeleenKesto({ tee: 'kohta', n: 0 }, tila, rak), 4.6, 'kesto_s (4) + 0,6 s tauko');
  // Sama kohta ilman aani-kenttää palaa tekstipohjaiseen kaavaan (regressio: ei riko vanhaa muotoa).
  const tilaEiAania = { taulu: { kohdat: [{ teksti: 'x'.repeat(10) }] }, hahmot: [] };
  assert.equal(askeleenKesto({ tee: 'kohta', n: 0 }, tilaEiAania, rak), 3);
});

test('askeleenKesto: repliikki.n valitsee hahmon repliikit[n]-rivin (oletus 0)', () => {
  const hahmo = {
    id: 'h',
    repliikit: [
      { teksti: 'x'.repeat(10), aani: null }, // 0,06*10=0,6 -> max(2,·)=2
      { teksti: 'y'.repeat(100), aani: null }, // 0,06*100=6
    ],
    reaktio: { teksti: 'z', aani: null },
  };
  const tila = { taulu: { kohdat: [] }, hahmot: [hahmo] };
  const rak = { aanet: {} };
  assert.equal(askeleenKesto({ tee: 'repliikki', hahmo: 'h' }, tila, rak), 2, 'n puuttuu -> oletus 0 (ennallaan)');
  assert.equal(askeleenKesto({ tee: 'repliikki', hahmo: 'h', n: 0 }, tila, rak), 2, 'n=0 eksplisiittisenä');
  assert.equal(askeleenKesto({ tee: 'repliikki', hahmo: 'h', n: 1 }, tila, rak), 6, 'n=1 -> toinen repliikki');
});

test('kasikirjoitusHetkella: napautus päättää käynnissä olevan askeleen napautushetkellä', () => {
  const kestot = [2, 2, 2];
  assert.equal(kasikirjoitusHetkella([], kestot, [1.5], 1.49999).indeksi, 0);
  const napautuksessa = kasikirjoitusHetkella([], kestot, [1.5], 1.5);
  assert.equal(napautuksessa.indeksi, 1, 'askel 0 päättyi napautukseen, askel 1 alkoi');
  assert.equal(napautuksessa.alku, 1.5);
  assert.equal(napautuksessa.paikallinen, 0);
});

test('kasikirjoitusHetkella: valmis vasta viimeisen askeleen luonnollisen keston jälkeen', () => {
  const kestot = [1, 1];
  assert.equal(kasikirjoitusHetkella([], kestot, [], 1.99999).valmis, false);
  const lopussa = kasikirjoitusHetkella([], kestot, [], 2);
  assert.equal(lopussa.valmis, true);
  assert.equal(lopussa.indeksi, 1);
  const ohiLopun = kasikirjoitusHetkella([], kestot, [], 5);
  assert.equal(ohiLopun.valmis, true);
  assert.equal(ohiLopun.indeksi, 1);
});

/* ================================================================
 * 4. PULU
 * ================================================================ */

test('pulu: vektorit toistuvat (regressio)', () => {
  assert.ok(V.pulu.length >= 3, 'vähintään 3 lentoa');
  for (const lento of V.pulu) {
    assert.ok(lento.naytteet.length >= 5, `${lento.nimi}: vähintään 5 näytettä`);
    for (const nayte of lento.naytteet) {
      const piste = puluLento(lento.alku, lento.loppu, nayte.t01);
      assert.ok(vekLahella(piste, nayte.piste), `${lento.nimi} t01=${nayte.t01}: ${piste} != ${nayte.piste}`);
    }
  }
});

test('puluLento: päätepisteet tarkkoja; keskellä käyrä on puolimatkassa kontrollipisteeseen', () => {
  const alku = [0, 0, 0];
  const loppu = [10, 0, 0];
  assert.ok(vekLahella(puluLento(alku, loppu, 0), alku));
  assert.ok(vekLahella(puluLento(alku, loppu, 1), loppu));
  // Kontrollipiste (huippu.y) = 0,3*|loppu-alku|+1 = 0,3*10+1 = 4. Toisen asteen Bézierissä
  // keskikontrollipisteen paino on 2(1-s)s, joka on s=0,5:ssä 0,5 (ei 1) — ja smootherstep(0,5)=0,5
  // tasan, joten käyrän y t01=0,5:ssä on 0,5*4=2, ei 4 (huippu.y on kontrollipiste, ei käyrän arvo).
  const keski = puluLento(alku, loppu, 0.5);
  assert.ok(lahella(keski[1], 0.5 * (0.3 * 10 + 1)), `keski.y=${keski[1]} (odotettu 2)`);
});

test('puluLento: nollamatka nostaa silti pystyyn (vakiotermi +1 ei häviä)', () => {
  const y0 = 0.5;
  const piste = puluLento([2, y0, -1], [2, y0, -1], 0.5);
  assert.ok(lahella(piste[0], 2) && lahella(piste[2], -1));
  assert.ok(piste[1] > y0, `piste.y=${piste[1]} pitäisi olla korkeampi kuin alku/loppu (${y0})`);
  // huippu.y = y0 + 0,3*0 + 1 = y0+1 = 1,5; alku=loppu=y0, joten käyrän y keskellä on (y0+huippu.y)/2 = 1,0.
  assert.ok(lahella(piste[1], (y0 + (y0 + 1)) / 2), `piste.y=${piste[1]} (odotettu 1,0)`);
});

test('seuraavaKiertueella: tyhjä/puuttuva kiertue → null', () => {
  assert.equal(seuraavaKiertueella({ kiertue: [] }, 'a'), null);
  assert.equal(seuraavaKiertueella({}, null), null);
  assert.equal(seuraavaKiertueella({ kiertue: [] }, 'massa'), null);
});

test('seuraavaKiertueella: null/massa → ensimmäinen; kiertueella → seuraava; viimeinen → null; vieras → ensimmäinen', () => {
  const r = { kiertue: ['a', 'b', 'c'] };
  assert.equal(seuraavaKiertueella(r, null), 'a');
  assert.equal(seuraavaKiertueella(r, 'massa'), 'a');
  assert.equal(seuraavaKiertueella(r, 'a'), 'b');
  assert.equal(seuraavaKiertueella(r, 'b'), 'c');
  assert.equal(seuraavaKiertueella(r, 'c'), null);
  assert.equal(seuraavaKiertueella(r, 'ei-kiertueella'), 'a');
});

test('kiertoRajat: datamuoto { atsimuutti: [a, b], korkeus, etaisyys } → sisäinen muoto; null = vapaa; puuttuva → oletus', () => {
  assert.deepEqual(kiertoRajat({ atsimuutti: [-40, 40], korkeus: [10, 50], etaisyys: [0.6, 1.4] }, OLETUS_KIERTO_TILA), {
    atsimuuttiMin: -40, atsimuuttiMax: 40, korkeusMin: 10, korkeusMax: 50, etaisyysMin: 0.6, etaisyysMax: 1.4,
  });
  const vapaa = kiertoRajat({ atsimuutti: null }, OLETUS_KIERTO_TILA);
  assert.equal(vapaa.atsimuuttiMin, null);
  assert.equal(vapaa.korkeusMin, OLETUS_KIERTO_TILA.korkeusMin);
  assert.deepEqual(kiertoRajat(undefined, OLETUS_KIERTO_YLEIS), OLETUS_KIERTO_YLEIS);
  assert.equal(kiertoRajat({ atsimuutti: [-30, 30] }, OLETUS_KIERTO_TILA).etaisyysMax, OLETUS_KIERTO_TILA.etaisyysMax);
  // rajaaKierto käyttää datamuotoa: ±40° raja atsimuutille.
  const perus = { kohde: [0, 0, 0], atsimuutti: 160, korkeus: 20, etaisyys: 10, fov: 38, aukko: 0.8, kierto: { atsimuutti: [-40, 40] } };
  assert.equal(rajaaKierto(perus, { ...perus, atsimuutti: 260 }).atsimuutti, 200);
});
