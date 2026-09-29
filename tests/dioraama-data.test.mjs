/*
 * Dioraaman lähdedatan eheystestit (erä 1, Olavinlinna). Speksi:
 * docs/raportit/dioraama-rajapinnat-20260929.md. Nämä testit eivät aja
 * rakennuskonetta (A1:n tools/dioraama/rakenna.mjs, testataan omissa
 * testeissään tests/dioraama-rakennuskone.test.mjs) — tässä varmistetaan
 * vain että A2:n kirjoittama lähdedata (js/dioraama/rakennukset/olavinlinna.js
 * + js/dioraama/pankit/*.js) on itsessään ehjä: viittaukset ratkeavat,
 * reseptit tunnetaan, rajat ovat järkeviä ja kamerat katsovat kohteisiinsa.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { RAKENNUS } from '../js/dioraama/rakennukset/olavinlinna.js';
import { PINNAT } from '../js/dioraama/pankit/pinnat.js';
import { HENKILOT } from '../js/dioraama/pankit/henkilot.js';
import { AANET } from '../js/dioraama/pankit/aanet.js';

// Reseptien nimet speksin kohdan 2 taulukosta (dioraama-rajapinnat-20260929.md).
// Rakennuskone (A1) toteuttaa nämä; tässä validoidaan vain että A2:n data
// käyttää yhtä näistä nimistä, ei rakenneta geometriaa.
const RESEPTIT = new Set([
  'laatta', 'seina', 'torni', 'kartiokatto', 'harjakatto', 'porras',
  'kallio', 'vesi', 'poyta', 'penkki', 'tynnyri', 'pata', 'sakki',
  'tulisija', 'hylly',
]);

const KIELLETYT_TAGIT = [/\[softly\]/i, /\[whispers\]/i];

/** speksin kohta 4: asentoSijainti(p) — kamera-asennon maailmansijainti. */
function asentoSijainti({ kohde, atsimuutti, korkeus, etaisyys }) {
  const d2r = Math.PI / 180;
  const k = korkeus * d2r;
  const a = atsimuutti * d2r;
  return [
    kohde[0] + etaisyys * Math.cos(k) * Math.sin(a),
    kohde[1] + etaisyys * Math.sin(k),
    kohde[2] + etaisyys * -Math.cos(k) * Math.cos(a),
  ];
}

function pisteRajoissa([x, y, z], { min, max }) {
  return x >= min[0] && x <= max[0] && y >= min[1] && y <= max[1] && z >= min[2] && z <= max[2];
}

function tilaLoytyy(id) {
  return RAKENNUS.tilat.find((t) => t.id === id);
}

test('RAKENNUS-tason perustiedot ovat kunnossa', () => {
  assert.equal(RAKENNUS.id, 'olavinlinna');
  assert.ok(Array.isArray(RAKENNUS.tilat) && RAKENNUS.tilat.length >= 2);
  assert.ok(Array.isArray(RAKENNUS.lahteet) && RAKENNUS.lahteet.length >= 1);
  for (const l of RAKENNUS.lahteet) {
    assert.equal(typeof l.nimi, 'string');
    assert.match(l.osoite, /^https?:\/\//);
  }
});

test('jokaisella tilalla on yksilöllinen id ja järkevät rajat (min < max)', () => {
  const idt = new Set();
  for (const tila of RAKENNUS.tilat) {
    assert.ok(!idt.has(tila.id), `kaksoiskappale tila-id: ${tila.id}`);
    idt.add(tila.id);
    const { min, max } = tila.rajat;
    assert.equal(min.length, 3, `${tila.id}: rajat.min on [x,y,z]`);
    assert.equal(max.length, 3, `${tila.id}: rajat.max on [x,y,z]`);
    for (let i = 0; i < 3; i += 1) {
      assert.ok(min[i] < max[i], `${tila.id}: rajat.min[${i}] (${min[i]}) < rajat.max[${i}] (${max[i]})`);
    }
  }
});

test('naapurit viittaavat olemassa oleviin tiloihin (molemminsuuntaisesti)', () => {
  for (const tila of RAKENNUS.tilat) {
    for (const naapuriId of tila.naapurit ?? []) {
      const naapuri = tilaLoytyy(naapuriId);
      assert.ok(naapuri, `${tila.id}: naapuri '${naapuriId}' ei ole olemassa oleva tila`);
      assert.ok((naapuri.naapurit ?? []).includes(tila.id),
        `${tila.id} ↔ ${naapuriId}: naapuruus ei ole molemminsuuntainen`);
    }
  }
});

test('palikoiden reseptit ovat speksin taulukon listalla', () => {
  for (const tila of RAKENNUS.tilat) {
    for (const p of tila.palikat ?? []) {
      assert.ok(RESEPTIT.has(p.resepti),
        `${tila.id}: tuntematon resepti '${p.resepti}' (ei speksin kohdan 2 taulukossa)`);
      assert.equal(p.paikka?.length, 3, `${tila.id}/${p.resepti}: paikka on [x,y,z]`);
      assert.equal(typeof p.suunta, 'number', `${tila.id}/${p.resepti}: suunta on numero (astetta)`);
    }
  }
});

test('palikoiden pinnat-ohitukset viittaavat olemassa oleviin pintoihin', () => {
  for (const tila of RAKENNUS.tilat) {
    for (const p of tila.palikat ?? []) {
      if (!p.pinnat) continue;
      for (const [rooli, pintaId] of Object.entries(p.pinnat)) {
        assert.ok(Object.hasOwn(PINNAT, pintaId),
          `${tila.id}/${p.resepti}: pinnat.${rooli} → tuntematon pinta '${pintaId}'`);
      }
    }
  }
});

test('hahmojen henkilo-viittaukset löytyvät HENKILOT-pankista ja silmukat henkilöltä', () => {
  for (const tila of RAKENNUS.tilat) {
    for (const h of tila.hahmot ?? []) {
      assert.ok(Object.hasOwn(HENKILOT, h.henkilo),
        `${tila.id}/${h.id}: henkilo '${h.henkilo}' ei ole HENKILOT-pankissa`);
      const henkilo = HENKILOT[h.henkilo];
      assert.ok(Object.hasOwn(henkilo.silmukat, h.silmukka),
        `${tila.id}/${h.id}: silmukka '${h.silmukka}' puuttuu henkilön '${h.henkilo}' silmukista`);
      if (h.reitti) {
        assert.ok(Object.hasOwn(henkilo.silmukat, 'kavely'),
          `${tila.id}/${h.id}: reitti asetettu mutta henkilöltä '${h.henkilo}' puuttuu 'kavely'-silmukka`);
      }
    }
  }
});

test('käsikirjoituksen hahmo-id:t ja kohta-indeksit ratkeavat', () => {
  for (const tila of RAKENNUS.tilat) {
    const hahmoIdt = new Set((tila.hahmot ?? []).map((h) => h.id));
    const kohtaMaara = tila.taulu?.kohdat?.length ?? 0;
    for (const askel of tila.kasikirjoitus ?? []) {
      if (askel.tee === 'repliikki' || askel.tee === 'reaktio') {
        assert.ok(hahmoIdt.has(askel.hahmo),
          `${tila.id}: käsikirjoituksen '${askel.tee}' viittaa tuntemattomaan hahmoon '${askel.hahmo}'`);
      }
      if (askel.tee === 'kohta') {
        assert.ok(askel.n >= 0 && askel.n < kohtaMaara,
          `${tila.id}: käsikirjoituksen kohta ${askel.n} ei ole taulun ${kohtaMaara} kohdan joukossa`);
      }
    }
  }
});

test('hahmojen id:t ovat yksilöllisiä oman tilan sisällä', () => {
  for (const tila of RAKENNUS.tilat) {
    const idt = new Set();
    for (const h of tila.hahmot ?? []) {
      assert.ok(!idt.has(h.id), `${tila.id}: kaksoiskappale hahmo-id '${h.id}'`);
      idt.add(h.id);
    }
  }
});

test('taulussa on tasan 3 kohtaa, kukin enintään 110 merkkiä', () => {
  const taulut = [
    ['RAKENNUS.taulu', RAKENNUS.taulu],
    ...RAKENNUS.tilat.filter((t) => t.taulu).map((t) => [`${t.id}.taulu`, t.taulu]),
  ];
  assert.ok(taulut.length >= 2, 'odotettiin sekä linnan että vähintään yhden tilan taulua');
  for (const [nimi, taulu] of taulut) {
    assert.equal(taulu.kohdat.length, 3, `${nimi}: tasan 3 kohtaa`);
    for (const [i, kohta] of taulu.kohdat.entries()) {
      assert.ok(kohta.teksti.length <= 110, `${nimi}.kohdat[${i}]: ${kohta.teksti.length} merkkiä (max 110)`);
      assert.ok(kohta.teksti.length > 0, `${nimi}.kohdat[${i}]: teksti ei saa olla tyhjä`);
      assert.equal(typeof kohta.lahde, 'string', `${nimi}.kohdat[${i}]: lahde puuttuu`);
    }
  }
});

test('repliikeissä ja reaktioissa ei ole [softly]/[whispers]-tageja', () => {
  for (const tila of RAKENNUS.tilat) {
    for (const h of tila.hahmot ?? []) {
      const rivit = [...(h.repliikit ?? []), h.reaktio].filter(Boolean);
      assert.ok(rivit.length >= 1, `${tila.id}/${h.id}: vähintään yksi repliikki tai reaktio`);
      for (const r of rivit) {
        for (const tagi of KIELLETYT_TAGIT) {
          assert.ok(!tagi.test(r.teksti), `${tila.id}/${h.id}/${r.id}: kielletty tagi ${tagi} tekstissä "${r.teksti}"`);
        }
        // Tässä erässä kaikki äänet ovat null (ks. pankit/aanet.js-kommentti); jos joskus
        // asetetaan tiedosto, sen pitää löytyä AANET-pankista.
        if (r.aani != null) assert.ok(Object.hasOwn(AANET, r.aani), `${tila.id}/${h.id}/${r.id}: aani '${r.aani}' ei ole AANET-pankissa`);
      }
    }
  }
});

test('kamerat eivät ole oman tilansa rajojen sisällä ja katsovat kohteeseen', () => {
  for (const tila of RAKENNUS.tilat) {
    if (!tila.kamera) continue;
    const sijainti = asentoSijainti(tila.kamera);
    assert.ok(!pisteRajoissa(sijainti, tila.rajat),
      `${tila.id}: kamera (${sijainti}) on tilan omien rajojen sisällä`);
    assert.ok(pisteRajoissa(tila.kamera.kohde, tila.rajat),
      `${tila.id}: kameran kohde (${tila.kamera.kohde}) ei ole tilan rajojen sisällä — ei katso kohteeseen`);
    assert.ok(tila.kamera.etaisyys > 0 && tila.kamera.fov > 0 && tila.kamera.fov < 180,
      `${tila.id}: kameran etaisyys/fov eivät ole järkeviä`);
  }
});

test('RAKENNUS.yleiskamera (vaaka ja pysty) katsoo massa-tilaan eikä ole sen sisällä', () => {
  const massa = tilaLoytyy('massa');
  assert.ok(massa, "tila 'massa' puuttuu");
  for (const nimi of ['vaaka', 'pysty']) {
    const asento = RAKENNUS.yleiskamera[nimi];
    assert.ok(asento, `yleiskamera.${nimi} puuttuu`);
    const sijainti = asentoSijainti(asento);
    assert.ok(!pisteRajoissa(sijainti, massa.rajat), `yleiskamera.${nimi}: kamera on massa-tilan rajojen sisällä`);
    assert.ok(pisteRajoissa(asento.kohde, massa.rajat), `yleiskamera.${nimi}: kohde ei ole massa-tilan rajojen sisällä`);
  }
});

test('pulun laskeutumispisteet ovat tilansa rajojen sisällä (tilakohtaiset) tai järkeviä (RAKENNUS-taso)', () => {
  assert.equal(RAKENNUS.pulu.laskeutuminen.length, 3);
  for (const tila of RAKENNUS.tilat) {
    if (!tila.pulu) continue;
    assert.equal(tila.pulu.laskeutuminen.length, 3, `${tila.id}: pulu.laskeutuminen on [x,y,z]`);
    assert.ok(['vasen', 'oikea'].includes(tila.pulu.taulupuoli), `${tila.id}: pulu.taulupuoli on 'vasen' tai 'oikea'`);
    assert.ok(pisteRajoissa(tila.pulu.laskeutuminen, tila.rajat),
      `${tila.id}: pulun laskeutumispiste ei ole tilan rajojen sisällä`);
  }
});

test('PINNAT- ja AANET-pankit ovat oikeamuotoiset', () => {
  for (const [id, p] of Object.entries(PINNAT)) {
    assert.match(p.vari, /^#[0-9a-f]{6}$/i, `pinta '${id}': vari ei ole hex-väri`);
    assert.equal(typeof p.toisto_m, 'number', `pinta '${id}': toisto_m puuttuu`);
  }
  assert.equal(typeof AANET, 'object');
});

test('HENKILOT-pankin merkinnät ovat oikeamuotoiset', () => {
  for (const [id, h] of Object.entries(HENKILOT)) {
    assert.equal(typeof h.nimi, 'string', `${id}: nimi puuttuu`);
    assert.equal(h.ruutu.length, 2, `${id}: ruutu on [leveys, korkeus]`);
    assert.equal(typeof h.sarakkeet, 'number', `${id}: sarakkeet puuttuu`);
    assert.equal(h.pivot.length, 2, `${id}: pivot on [u, y]`);
    assert.ok(h.korkeus_m > 0 && h.korkeus_m < 3, `${id}: korkeus_m (${h.korkeus_m}) ei ole järkevä`);
    for (const [nimi, s] of Object.entries(h.silmukat)) {
      assert.equal(typeof s.rivi, 'number', `${id}.${nimi}: rivi puuttuu`);
      assert.ok(s.ruudut > 0, `${id}.${nimi}: ruudut puuttuu`);
      assert.ok(s.fps > 0, `${id}.${nimi}: fps puuttuu`);
    }
    assert.equal(typeof h.lisenssi, 'string', `${id}: lisenssi puuttuu`);
  }
});
