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

// Reseptien nimet speksin kohdan 2 taulukosta (dioraama-rajapinnat-20260929.md) + era2b:n
// lattiareseptit (dioraama-rajapinnat-era2b-20260929.md kohta 3, tools/dioraama/reseptit-lattiat.mjs)
// + era2b:n rekvisiittareseptit (sama kohta 3, tools/dioraama/reseptit-rekvisiitta.mjs).
// Rakennuskone (A1) toteuttaa nämä; tässä validoidaan vain että A2:n data
// käyttää yhtä näistä nimistä, ei rakenneta geometriaa.
const RESEPTIT = new Set([
  'laatta', 'seina', 'torni', 'kartiokatto', 'harjakatto', 'porras',
  'kallio', 'vesi', 'poyta', 'penkki', 'tynnyri', 'pata', 'sakki',
  'tulisija', 'hylly', 'kivilattia', 'lankkulattia',
  'orsileivat', 'yrttinippu', 'riippupata', 'kattila', 'kauha', 'leikkuulauta', 'veitsi', 'kala', 'leipa',
  'nauriskori', 'puukasa', 'vesisanko', 'saavi', 'kirnu', 'huhmar', 'suolalaatikko', 'kynttilanjalka',
  'oljylamppu', 'vati', 'ruukku', 'pullo', 'luuta', 'hiillospihdit',
  // Erä 3 (dioraama-rajapinnat-era3-20260929.md kohta 2): reseptit-linna.mjs ja reseptit-kalusteet2.mjs.
  'kiekko', 'kierreportaat', 'sakarat', 'paalu', 'laiturikansi', 'vene', 'lippu', 'rako', 'kupoli',
  'alttari', 'vihkimisristi', 'kirkonpenkki', 'kynttilakruunu', 'seinasoihtu', 'arkku', 'keihasteline', 'kilpi',
  'hakapyssy', 'ruutitynnyri', 'pelilauta', 'pulpetti', 'kirja', 'koysikieppi', 'airot', 'verkko', 'kello',
  'jalkajousi', 'nuolitynnyri',
  'sinettisormus', 'kaiverrus', // Voudin sinetti 29.9.
  'kangaspakka', 'vaatepino', 'vaateorsi', // Fatabuuri vaateaitaksi 29.9.
  // Tunnelma 29.9. (tunnelma.js): lyhty tolpassa.
  'lyhty',
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
        // aani on valinnainen (era2 kohta 2 "AANET"); jos asetettu, sen pitää löytyä AANET-pankista.
        if (r.aani != null) assert.ok(Object.hasOwn(AANET, r.aani), `${tila.id}/${h.id}/${r.id}: aani '${r.aani}' ei ole AANET-pankissa`);
      }
    }
  }
});

test('taulujen kohdat[].aani (tila- ja rakennustaso) löytyvät AANET-pankista', () => {
  const taulut = [
    ['RAKENNUS.taulu', RAKENNUS.taulu],
    ...RAKENNUS.tilat.filter((t) => t.taulu).map((t) => [`${t.id}.taulu`, t.taulu]),
  ];
  for (const [nimi, taulu] of taulut) {
    for (const [i, kohta] of taulu.kohdat.entries()) {
      if (kohta.aani == null) continue; // valinnainen (era2 kohta 2 "AANET")
      assert.ok(Object.hasOwn(AANET, kohta.aani), `${nimi}.kohdat[${i}]: aani '${kohta.aani}' ei ole AANET-pankissa`);
    }
  }
});

test('tilan aanet[]-silmukat viittaavat olemassa oleviin, silmukoiviin ääniin', () => {
  for (const tila of RAKENNUS.tilat) {
    for (const [i, a] of (tila.aanet ?? []).entries()) {
      assert.equal(typeof a.aani, 'string', `${tila.id}.aanet[${i}]: aani puuttuu tai ei ole merkkijono`);
      assert.ok(Object.hasOwn(AANET, a.aani), `${tila.id}.aanet[${i}]: aani '${a.aani}' ei ole AANET-pankissa`);
      assert.ok(AANET[a.aani].silmukka, `${tila.id}.aanet[${i}]: '${a.aani}' ei silmukoi (tilan aanet-lista on ambienssia varten)`);
      if (a.voimakkuus != null) assert.ok(a.voimakkuus >= 0 && a.voimakkuus <= 1, `${tila.id}.aanet[${i}]: voimakkuus ei ole 0–1`);
    }
  }
});

test('tilan tehosteet[] ovat oikeamuotoiset ja viittaavat olemassa oleviin, kerta-ääniin', () => {
  for (const tila of RAKENNUS.tilat) {
    for (const [i, t] of (tila.tehosteet ?? []).entries()) {
      const nimi = `${tila.id}.tehosteet[${i}]`;
      assert.ok(Array.isArray(t.aanet) && t.aanet.length >= 1, `${nimi}: aanet puuttuu tai on tyhjä`);
      for (const id of t.aanet) {
        assert.ok(Object.hasOwn(AANET, id), `${nimi}: aani '${id}' ei ole AANET-pankissa`);
        assert.ok(!AANET[id].silmukka, `${nimi}: '${id}' silmukoi (tehosteet on satunnaisia KERTA-ääniä varten)`);
      }
      assert.equal(t.valit_s?.length, 2, `${nimi}: valit_s ei ole [min, max]`);
      const [min, max] = t.valit_s;
      assert.ok(min > 0 && min < max, `${nimi}: valit_s [${min}, ${max}] ei ole järkevä (0 < min < max)`);
      if (t.voimakkuus != null) assert.ok(t.voimakkuus >= 0 && t.voimakkuus <= 1, `${nimi}: voimakkuus ei ole 0–1`);
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
    // toisto_m: number (tu = tv) TAI [tu, tv] (erä 2 -speksi, esim. leikkaus/tiili [4, 1]).
    const toistoOk = typeof p.toisto_m === 'number'
      || (Array.isArray(p.toisto_m) && p.toisto_m.length === 2 && p.toisto_m.every((x) => typeof x === 'number'));
    assert.ok(toistoOk, `pinta '${id}': toisto_m ei ole number eikä [tu, tv]`);
  }
  // AANET (era2 kohta 2 "AANET"): { silmukka: bool, voimakkuus: 0–1, kesto_s > 0, lisenssi: string, versio: kokonaisluku ≥ 1 }.
  for (const [id, a] of Object.entries(AANET)) {
    assert.equal(typeof a.silmukka, 'boolean', `aani '${id}': silmukka puuttuu`);
    assert.ok(a.voimakkuus >= 0 && a.voimakkuus <= 1, `aani '${id}': voimakkuus ei ole 0–1`);
    assert.ok(typeof a.kesto_s === 'number' && a.kesto_s > 0, `aani '${id}': kesto_s ei ole positiivinen luku`);
    assert.equal(typeof a.lisenssi, 'string', `aani '${id}': lisenssi puuttuu`);
    assert.ok(Number.isInteger(a.versio) && a.versio >= 1, `aani '${id}': versio ei ole kokonaisluku ≥ 1`);
  }
});

// era2b kohta 2 "PINNAT" (P3b:n täydennys 29.9.): kaikilla pinnoilla — myös hahmojen ja
// rekvisiitan, jotka aiemmin jäivät ilman kuviota — pitää nyt olla kuvio speksin tyyppilistasta.
test('jokaisella PINNAT-pinnalla on kuvio speksin tyyppilistasta oikeamuotoisin parametrein', () => {
  const SALLITUT_TYYPIT = new Set([
    'tasainen', 'kivi', 'puu', 'lankku', 'rappaus', 'tiili', 'kallio', 'vesi', 'metalli', 'kangas', 'olki',
  ]);
  for (const [id, p] of Object.entries(PINNAT)) {
    assert.ok(p.kuvio, `pinta '${id}': kuvio puuttuu`);
    assert.ok(
      SALLITUT_TYYPIT.has(p.kuvio.tyyppi), `pinta '${id}': kuvio.tyyppi '${p.kuvio.tyyppi}' ei ole speksin listalla`,
    );
    if (p.kuvio.koko_m != null) {
      assert.equal(p.kuvio.koko_m.length, 2, `pinta '${id}': kuvio.koko_m ei ole [u, v]`);
      assert.ok(
        p.kuvio.koko_m.every((x) => typeof x === 'number' && x > 0),
        `pinta '${id}': kuvio.koko_m sisältää ei-positiivisen luvun`,
      );
    }
    if (p.kuvio.sauma_m != null) assert.ok(p.kuvio.sauma_m > 0, `pinta '${id}': kuvio.sauma_m ei ole positiivinen`);
    if (p.kuvio.vaihtelu != null) {
      assert.ok(p.kuvio.vaihtelu >= 0 && p.kuvio.vaihtelu <= 1, `pinta '${id}': kuvio.vaihtelu ei ole 0–1`);
    }
  }
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

test('RAKENNUS.valaistus on oikeamuotoinen (erä 2b, dioraama-rajapinnat-era2b-20260929.md kohta 1)', () => {
  const v = RAKENNUS.valaistus;
  assert.ok(v, 'RAKENNUS.valaistus puuttuu');
  assert.ok(v.aurinko, 'valaistus.aurinko puuttuu');
  assert.equal(typeof v.aurinko.atsimuutti, 'number', 'aurinko.atsimuutti ei ole numero');
  assert.equal(typeof v.aurinko.korkeus, 'number', 'aurinko.korkeus ei ole numero');
  assert.match(v.aurinko.vari, /^#[0-9a-f]{6}$/i, 'aurinko.vari ei ole hex-väri');
  assert.equal(typeof v.aurinko.voima, 'number', 'aurinko.voima ei ole numero');
  assert.ok(v.aurinko.voima > 0, 'aurinko.voima ei ole positiivinen');
  assert.ok(v.taivas, 'valaistus.taivas puuttuu');
  assert.match(v.taivas.yla, /^#[0-9a-f]{6}$/i, 'taivas.yla ei ole hex-väri');
  assert.match(v.taivas.ala, /^#[0-9a-f]{6}$/i, 'taivas.ala ei ole hex-väri');
  assert.equal(typeof v.taivas.voima, 'number', 'taivas.voima ei ole numero');
  assert.ok(v.taivas.voima > 0, 'taivas.voima ei ole positiivinen');
});

test('tilojen valot[] ovat oikeamuotoiset (erä 2b kohta 1: paikka, sade, voima, valinnainen vari/lepatus)', () => {
  for (const tila of RAKENNUS.tilat) {
    for (const [i, valo] of (tila.valot ?? []).entries()) {
      const nimi = `${tila.id}.valot[${i}]`;
      assert.equal(valo.paikka?.length, 3, `${nimi}: paikka ei ole [x,y,z]`);
      assert.ok(valo.paikka.every((x) => typeof x === 'number'), `${nimi}: paikka sisältää ei-numeroita`);
      assert.equal(typeof valo.sade, 'number', `${nimi}: sade puuttuu`);
      assert.ok(valo.sade > 0, `${nimi}: sade ei ole positiivinen`);
      assert.equal(typeof valo.voima, 'number', `${nimi}: voima puuttuu`);
      assert.ok(valo.voima >= 0, `${nimi}: voima ei ole ≥ 0`);
      if (valo.vari != null) assert.match(valo.vari, /^#[0-9a-f]{6}$/i, `${nimi}: vari ei ole hex-väri`);
      if (valo.lepatus != null) {
        assert.equal(typeof valo.lepatus, 'number', `${nimi}: lepatus ei ole numero`);
        assert.ok(valo.lepatus >= 0 && valo.lepatus <= 1, `${nimi}: lepatus ei ole 0–1`);
      }
    }
  }
  // Regressio (kohta 1: "Tulisijalla lepatus 0,35"): keittiön ensimmäinen valo on tulisijan valo.
  const keittio = tilaLoytyy('keittio');
  assert.ok(keittio.valot?.length >= 1, 'keittiö: valot puuttuu');
  assert.equal(keittio.valot[0].lepatus, 0.35, 'keittiön tulisijan valo: lepatus 0,35');
  assert.ok(keittio.valot[0].vari, 'keittiön tulisijan valo: vari puuttuu');
});

test('tilojen kamerakierron etäisyys on kerroin (0,2–3), ei metrejä (erä 3: kappeli/muurinharja lensivät 280 m päähän)', () => {
  for (const tila of RAKENNUS.tilat) {
    for (const nimi of ['kamera', 'kameraPysty']) {
      const e = tila[nimi]?.kierto?.etaisyys ?? tila.kierto?.etaisyys;
      if (!e) continue;
      assert.ok(e[0] >= 0.2 && e[1] <= 3 && e[0] < e[1], `${tila.id}.${nimi}: kierto.etaisyys ${e} ei ole kerroinväli`);
    }
  }
});

// Elävä linna (käsikirjoitus 29.9., omistajan hyväksyntä 22.28): yleisnäkymän elävät kohteet nimilappujen tilalla.
test('elävä linna: jokaisella kohdistettavalla tilalla on elava.kohde, vihje vain yhdellä, reitit ehjiä', () => {
  const nuoli = (p) => Array.isArray(p) && p.length === 3 && p.every(Number.isFinite);
  let vihjeita = 0;
  for (const tila of RAKENNUS.tilat.filter((t) => t.kohdistettava)) {
    const e = tila.elava;
    assert.ok(e, `${tila.id}: elava puuttuu`);
    assert.ok(nuoli(e.kohde), `${tila.id}: elava.kohde ei ole piste`);
    const laatikko = tila.leikkaus?.min ? tila.leikkaus : tila.rajat;
    assert.ok(pisteRajoissa(e.kohde, laatikko), `${tila.id}: elava.kohde ${e.kohde} ei ole tilan leikkaus-/rajalaatikossa`);
    assert.ok(e.sade > 0 && e.sade <= 12, `${tila.id}: elava.sade ${e.sade} ei ole 0–12 m`);
    if (e.vihje) vihjeita += 1;
    if (!e.reitti) continue;
    const r = e.reitti;
    assert.ok(Object.hasOwn(HENKILOT, r.henkilo), `${tila.id}: reitin henkilo '${r.henkilo}' ei ole HENKILOT-pankissa`);
    assert.ok(Object.hasOwn(HENKILOT[r.henkilo].silmukat, 'kavely'), `${tila.id}: reitin henkilöltä puuttuu 'kavely'`);
    assert.ok(Array.isArray(r.pisteet) && r.pisteet.length >= 2 && r.pisteet.every(nuoli), `${tila.id}: reitti.pisteet ≥ 2 pistettä`);
    for (const p of r.pisteet) assert.ok(pisteRajoissa(p, tila.rajat), `${tila.id}: reitin piste ${p} ei ole tilan rajoissa`);
    assert.ok(r.nopeus > 0 && r.nopeus <= 2, `${tila.id}: reitti.nopeus ${r.nopeus} ei ole kävelyvauhti`);
    assert.equal(typeof r.edestakaisin, 'boolean', `${tila.id}: reitti.edestakaisin ei ole totuusarvo`);
  }
  assert.equal(vihjeita, 1, 'sykkivä vihje (elava.vihje) täsmälleen yhdellä tilalla');
  assert.equal(RAKENNUS.tilat.find((t) => t.elava?.vihje)?.id, 'keittio');
});

test('elävä linna: RAKENNUS.saapuminen ja nimilaput ovat oikeamuotoiset', () => {
  assert.equal(RAKENNUS.nimilaput, false);
  const s = RAKENNUS.saapuminen;
  assert.ok(s && s.alku, 'saapuminen.alku puuttuu');
  for (const k of ['atsimuutti', 'etaisyys', 'korkeus']) assert.ok(Number.isFinite(s.alku[k]), `saapuminen.alku.${k}`);
  assert.ok(s.alku.atsimuutti >= 0 && s.alku.atsimuutti < 360);
  // Uusi rakenne (omistaja 30.9.): lyhyt saapuminen aina (6 s), sitten kertojan kierros.
  assert.ok(s.kesto >= 4 && s.kesto <= 8, `saapuminen.kesto ${s.kesto} s (uusi rakenne: lyhyt)`);
  assert.ok(s.lyhyt > 0 && s.lyhyt <= s.kesto, 'saapuminen.lyhyt ≤ kesto');
});

// Olavinlinnan uusi rakenne (omistaja 30.9. klo 15.28): kertoja 4 jaksoa, infotaulu + Pulun kertomus joka huoneessa,
// sinetin vihjeet infotaulun riveinä. Tekstit Päätoimittajalta; äänet vasta omistajan luvalla (aani: null).
test('Olavinlinna: kertoja 4 jaksoa (≤ 3 virkettä, ≤ 240 merkkiä), kamera, ei ääntä ennen lupaa; lyhyt saapuminen', async () => {
  const { RAKENNUS } = await import('../js/dioraama/rakennukset/olavinlinna.js');
  const j = RAKENNUS.kertoja.jaksot;
  assert.deepEqual(j.map((x) => x.id), ['jarvelta', 'tornit', 'piha', 'laituri']);
  for (const x of j) {
    assert.ok(x.teksti.length <= 240, `${x.id}: ${x.teksti.length} merkkiä`);
    assert.ok((x.teksti.match(/[.!?](\s|$)/g) ?? []).length <= 3, `${x.id}: yli 3 virkettä`);
    for (const k of [x.kamera, x.kameraPysty]) assert.ok(Array.isArray(k?.kohde) && k.kohde.length === 3 && k.etaisyys > 0, x.id);
    assert.equal(x.aani, null, `${x.id}: ääni vasta omistajan luvalla`);
  }
  const yht = j.reduce((a, x) => a + x.kesto_s, 0);
  assert.ok(yht >= 40 && yht <= 50, `kertoja ${yht} s (tavoite noin 45 s)`);
  assert.ok(RAKENNUS.saapuminen.kesto <= 8, 'saapuminen on lyhyt');
});

test('Olavinlinna: jokaisessa kohdistettavassa huoneessa infotaulu (nimi + 1–2 riviä) ja Pulun kertomus ilman ääntä', async () => {
  const { RAKENNUS } = await import('../js/dioraama/rakennukset/olavinlinna.js');
  const huoneet = RAKENNUS.tilat.filter((t) => t.kohdistettava);
  assert.equal(huoneet.length, 7);
  for (const t of huoneet) {
    assert.ok(t.infotaulu?.nimi && t.infotaulu.rivit.length >= 1 && t.infotaulu.rivit.length <= 2, t.id);
    for (const r of t.infotaulu.rivit) assert.ok(r.teksti && r.lahde, `${t.id}: rivi { teksti, lahde }`);
    assert.ok(Array.isArray(t.pulu.laskeutuminen), `${t.id}: vanha pulu.laskeutuminen säilyy`);
    assert.ok(t.pulu?.teksti?.length > 100, `${t.id}: Pulun kertomus`);
    assert.equal(t.pulu.aani, null, `${t.id}: ääni vasta omistajan luvalla`);
  }
  const vihjeet = huoneet.flatMap((t) => t.etsinta ?? []).filter((e) => e.etsinta === 'voudin-sinetti');
  assert.deepEqual(vihjeet.map((e) => e.vaihe).sort(), [1, 2, 3]);
  for (const e of vihjeet) assert.ok(e.rivi && e.rivi.length <= 80, `sinetin vaihe ${e.vaihe}: infotaulun rivi`);
});

test('Olavinlinna: kuunnelmat (kohtaus = rivijono), puhujat ratkeavat, Pulu viimeisenä, ei ääntä ennen lupaa', async () => {
  const { RAKENNUS } = await import('../js/dioraama/rakennukset/olavinlinna.js');
  const idt = new Set();
  for (const t of RAKENNUS.tilat.filter((x) => x.kohdistettava)) {
    const k = t.kuunnelma;
    assert.ok(Array.isArray(k) && k.length >= 3 && k.length <= 6, `${t.id}: kuunnelma`);
    const hahmot = new Set((t.hahmot ?? []).map((h) => h.id));
    for (const r of k) {
      assert.ok(r.puhuja === 'pulu' || hahmot.has(r.puhuja) || r.huom, `${t.id}/${r.id}: puhuja ${r.puhuja}`);
      assert.ok(r.teksti.length > 10 && r.teksti.length <= 160, `${t.id}/${r.id}: teksti`);
      assert.equal(r.aani, null, `${t.id}/${r.id}: ääni vasta omistajan luvalla`);
      assert.ok(!idt.has(r.id), `kaksois-id ${r.id}`);
      idt.add(r.id);
    }
    assert.equal(k.at(-1).puhuja, 'pulu', `${t.id}: Pulu lopuksi`);
  }
});

test('Olavinlinna: ei asia-anakronismeja (iltamessu → iltarukous, Introibo → Dominus vobiscum, Kuninkaan sali → yläsali)', async () => {
  const { readFileSync, readdirSync } = await import('node:fs');
  const juuri = new URL('../js/dioraama/rakennukset/olavinlinna/', import.meta.url);
  for (const f of readdirSync(juuri).filter((x) => x.endsWith('.js'))) {
    const teksti = readFileSync(new URL(f, juuri), 'utf8');
    for (const kielletty of [/iltamess/i, /introibo/i, /kuninkaan sali/i]) assert.ok(!kielletty.test(teksti), `${f}: ${kielletty}`);
  }
});

test('Olavinlinna: kertojan jakson valinnainen tila viittaa olemassa olevaan kohdistettavaan tilaan', async () => {
  const { RAKENNUS } = await import('../js/dioraama/rakennukset/olavinlinna.js');
  const tilat = new Set(RAKENNUS.tilat.filter((t) => t.kohdistettava).map((t) => t.id));
  for (const j of RAKENNUS.kertoja.jaksot) if (j.tila !== undefined) assert.ok(tilat.has(j.tila), `${j.id}: tila ${j.tila}`);
  assert.equal(RAKENNUS.kertoja.jaksot.find((j) => j.id === 'laituri').tila, 'laituri');
});
