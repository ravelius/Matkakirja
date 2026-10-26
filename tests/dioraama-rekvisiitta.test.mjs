// Testit dioraaman rekvisiittaresepteille (Linnanrakentaja 29.9.2026, ali-agentti P3, erä 2b).
// Speksi: docs/raportit/dioraama-rajapinnat-era2b-20260929.md kohta 3, era1-speksin kohdat 0, 2, 3b.
// Testataan RESEPTIT-taulukon funktioita suoraan (paikallinen kehys u, y, w) — sama tapa kuin
// tests/dioraama-reseptit-maasto.test.mjs. Ei odoteta sisarmoduulien (reseptit-rakenne/-kalusteet/
// -maasto/-lattiat.mjs) valmistumista, koska niitä ei tuoda tässä — PAITSI viimeisessä testissä
// (P3b:n täydennys 29.9.: valojen keruu rakenna.json:iin), joka ajaa oikean Olavinlinnan koko
// putken läpi ja tarvitsee siksi kaikki sisarmoduulit.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  RESEPTIT, OLETUSPINNAT,
} from '../tools/dioraama/reseptit-rekvisiitta.mjs';

const NIMET = Object.keys(RESEPTIT).sort();
const ODOTETUT = [
  'hiillospihdit', 'huhmar', 'kala', 'kattila', 'kauha', 'kirnu', 'kynttilanjalka', 'leikkuulauta', 'leipa',
  'luuta', 'nauriskori', 'oljylamppu', 'orsileivat', 'puukasa', 'pullo', 'riippupata', 'ruukku', 'saavi',
  'suolalaatikko', 'vati', 'veitsi', 'vesisanko', 'yrttinippu',
].sort();

/** Kolmion geometrinen normaali (b − a) × (c − a), normalisoitu. */
function geomNormaali(t) {
  const [a, b, c] = t.p;
  const e1 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const e2 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  const n = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]];
  const l = Math.hypot(n[0], n[1], n[2]) || 1;
  return [n[0] / l, n[1] / l, n[2] / l];
}

/** 2× kolmion pinta-ala (ristitulon pituus) — 0 = degeneroitunut. */
function ala2x(t) {
  const [a, b, c] = t.p;
  const e1 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const e2 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  const n = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]];
  return Math.hypot(n[0], n[1], n[2]);
}

test('RESEPTIT ja OLETUSPINNAT sisältävät kaikki 23 speksin reseptiä', () => {
  assert.deepEqual(NIMET, ODOTETUT);
  assert.deepEqual(Object.keys(OLETUSPINNAT).sort(), ODOTETUT);
});

test('jokainen resepti (oletusparametrein): ≥ 1 kolmio, ≤ 400 kolmiota, ei degeneroituneita, rooli tunnettu', () => {
  for (const nimi of NIMET) {
    const kolmiot = RESEPTIT[nimi]({});
    assert.ok(kolmiot.length >= 1, `${nimi}: odotettiin vähintään 1 kolmio`);
    assert.ok(kolmiot.length <= 400, `${nimi}: ${kolmiot.length} kolmiota > 400`);
    const oletus = OLETUSPINNAT[nimi];
    for (const t of kolmiot) {
      assert.ok(ala2x(t) > 1e-9, `${nimi}: degeneroitunut kolmio ${JSON.stringify(t.p)}`);
      assert.ok(typeof t.rooli === 'string' && t.rooli.length > 0, `${nimi}: kolmiolta puuttuu rooli`);
      assert.ok(t.rooli in oletus, `${nimi}: rooli '${t.rooli}' puuttuu OLETUSPINNAT:sta`);
    }
  }
});

test('jokainen resepti: soft-normaalit yksikköpituisia ja samansuuntaisia kiertosuunnan kanssa', () => {
  for (const nimi of NIMET) {
    const kolmiot = RESEPTIT[nimi]({});
    for (const t of kolmiot) {
      if (!t.n) continue;
      for (const nv of t.n) {
        assert.ok(Math.abs(Math.hypot(nv[0], nv[1], nv[2]) - 1) < 1e-6, `${nimi}: normaali ei yksikköpituinen`);
      }
      const geom = geomNormaali(t);
      const keski = [(t.n[0][0] + t.n[1][0] + t.n[2][0]) / 3, (t.n[0][1] + t.n[1][1] + t.n[2][1]) / 3, (t.n[0][2] + t.n[1][2] + t.n[2][2]) / 3];
      const dot = geom[0] * keski[0] + geom[1] * keski[1] + geom[2] * keski[2];
      assert.ok(dot > 0, `${nimi}: kiertosuunta ja pehmeä normaali ristiriidassa (kärjet väärässä järjestyksessä)`);
    }
  }
});

test('deterministinen: siemenelliset reseptit (orsileivat, nauriskori, puukasa) antavat saman siemenen samana', () => {
  for (const nimi of ['orsileivat', 'nauriskori', 'puukasa']) {
    const a = RESEPTIT[nimi]({ siemen: 7 });
    const b = RESEPTIT[nimi]({ siemen: 7 });
    assert.deepEqual(a, b, `${nimi}: sama siemen ei antanut samaa tulosta`);
  }
});

test('eri siemen antaa geometrisesti erilaisen tuloksen (orsileivat, nauriskori, puukasa)', () => {
  for (const nimi of ['orsileivat', 'nauriskori', 'puukasa']) {
    const a = RESEPTIT[nimi]({ siemen: 7 });
    const c = RESEPTIT[nimi]({ siemen: 99 });
    assert.notDeepEqual(a, c, `${nimi}: eri siemen antoi identtisen tuloksen`);
  }
});

test('kynttilänjalka ja öljylamppu palauttavat .valo-tiedon speksin muodossa', () => {
  for (const nimi of ['kynttilanjalka', 'oljylamppu']) {
    const kolmiot = RESEPTIT[nimi]({});
    assert.ok(kolmiot.valo, `${nimi}: .valo puuttuu`);
    const { paikka_paikallinen: pp, sade, voima, vari } = kolmiot.valo;
    assert.equal(pp.length, 3, `${nimi}: paikka_paikallinen ei ole [u,y,w]`);
    assert.ok(Number.isFinite(sade) && sade > 0, `${nimi}: sade ei ole positiivinen luku`);
    assert.ok(Number.isFinite(voima) && voima > 0 && voima <= 1, `${nimi}: voima ei ole välillä (0,1]`);
    assert.ok(typeof vari === 'string' && /^#[0-9a-f]{6}$/i.test(vari), `${nimi}: vari ei ole hex-väri`);
    // .valo ei ole Kolmio-alkio: ei saa näkyä silmukassa/spreadissa.
    assert.ok(kolmiot.every((t) => t.p && t.rooli), `${nimi}: .valo vuosi kolmioiden joukkoon`);
  }
});

test('muut reseptit EIVÄT palauta .valo-tietoa', () => {
  for (const nimi of NIMET) {
    if (nimi === 'kynttilanjalka' || nimi === 'oljylamppu') continue;
    const kolmiot = RESEPTIT[nimi]({});
    assert.equal(kolmiot.valo, undefined, `${nimi}: odottamaton .valo`);
  }
});

test('koko-parametri skaalaa geometrian (kattila, veitsi, kala, leipa, yrttinippu, kauha)', () => {
  for (const nimi of ['kattila', 'veitsi', 'kala', 'leipa', 'yrttinippu', 'kauha']) {
    const pieni = RESEPTIT[nimi]({ koko: 0.5 });
    const iso = RESEPTIT[nimi]({ koko: 1 });
    assert.equal(pieni.length, iso.length, `${nimi}: koko ei saisi muuttaa kolmiomäärää`);
    let jokuEri = false;
    for (let i = 0; i < pieni.length && !jokuEri; i++) {
      if (JSON.stringify(pieni[i].p) !== JSON.stringify(iso[i].p)) jokuEri = true;
    }
    assert.ok(jokuEri, `${nimi}: koko=0.5 ja koko=1 antoivat identtisen geometrian`);
  }
});

test('sijoita() (reseptit.mjs) toimii uusille resepteille maailmakoordinaatistossa', async () => {
  const { sijoita, RESEPTIT: KAIKKI_RESEPTIT } = await import('../tools/dioraama/reseptit.mjs');
  for (const nimi of NIMET) assert.ok(nimi in KAIKKI_RESEPTIT, `${nimi}: ei rekisteröity reseptit.mjs:ään`);
  for (const nimi of ['kattila', 'riippupata', 'kynttilanjalka', 'nauriskori', 'hiillospihdit']) {
    const paikallinen = RESEPTIT[nimi]({});
    const maailmassa = sijoita({ resepti: nimi, paikka: [3, 1, -2], suunta: 63 });
    assert.equal(maailmassa.length, paikallinen.length, `${nimi}: sijoita() muutti kolmiomäärää`);
    for (const t of maailmassa) {
      assert.ok(Number.isFinite(t.p[0][0]), `${nimi}: sijoita() tuotti ei-numeerisen kärjen`);
      assert.ok(typeof t.pinta === 'string' && t.pinta.length > 0, `${nimi}: sijoita() ei asettanut pinta-kenttää`);
    }
  }
});

/* ==================== era2b kohta 3, P3b:n täydennys: valon maailmamuunnos + koko putki ==================== */

test('sijoita(): rekvisiitan valo muunnetaan maailmaan SAMALLA kaavalla kuin kärjet (kierretty JA siirretty palikka)', async () => {
  const { sijoita } = await import('../tools/dioraama/reseptit.mjs');
  const RAD = Math.PI / 180;
  const tapaukset = [
    ['kynttilanjalka', { korkeus: 0.2 }],
    ['oljylamppu', { sade: 0.09, korkeus: 0.12 }], // paikallinen u = sade*0.3 ≠ 0 -> kierto vaikuttaa aidosti
  ];
  for (const [nimi, parametrit] of tapaukset) {
    const paikallinen = RESEPTIT[nimi](parametrit);
    assert.ok(paikallinen.valo, `${nimi}: .valo puuttuu paikallisesta reseptistä`);
    const paikka = [5, 1.2, -3]; const suunta = 47; // kierretty (ei 0/90/180/270) JA siirretty (ei origo)
    const maailmassa = sijoita({ resepti: nimi, paikka, suunta, ...parametrit });
    assert.ok(maailmassa.valo, `${nimi}: sijoita() ei kuljettanut .valoa`);
    // Odotettu maailmanpaikka RIIPPUMATTOMALLA laskulla (ei sama koodi kuin reseptit.mjs:ssä) —
    // sama kaava kuin kärjille: paikka + u·r + w·f, r = (cos s, 0, sin s), f = (sin s, 0, −cos s).
    const s = suunta * RAD;
    const r = [Math.cos(s), 0, Math.sin(s)];
    const f = [Math.sin(s), 0, -Math.cos(s)];
    const [u, y, w] = paikallinen.valo.paikka_paikallinen;
    const odotettu = [
      paikka[0] + u * r[0] + w * f[0],
      paikka[1] + y,
      paikka[2] + u * r[2] + w * f[2],
    ];
    for (let i = 0; i < 3; i++) {
      assert.ok(
        Math.abs(maailmassa.valo.paikka[i] - odotettu[i]) < 1e-9,
        `${nimi}: valon maailmanpaikka[${i}] = ${maailmassa.valo.paikka[i]}, odotettiin ${odotettu[i]}`,
      );
    }
    // sade/voima/vari: skalaareja/väri — eivät muutu jäykässä siirrossa/kierrossa.
    assert.equal(maailmassa.valo.sade, paikallinen.valo.sade, `${nimi}: sade muuttui muunnoksessa`);
    assert.equal(maailmassa.valo.voima, paikallinen.valo.voima, `${nimi}: voima muuttui muunnoksessa`);
    assert.equal(maailmassa.valo.vari, paikallinen.valo.vari, `${nimi}: vari muuttui muunnoksessa`);
    assert.equal(maailmassa.valo.paikka_paikallinen, undefined, `${nimi}: paikallinen paikka vuosi maailman valo-olioon`);
  }
});

test('rakenna.mjs: keittiön rakennus.json:n valot sisältävät rekvisiitan kynttilät/lamput tulisijan valon jatkoksi', async () => {
  const { mkdtempSync, readFileSync, rmSync } = await import('node:fs');
  const { tmpdir } = await import('node:os');
  const { join } = await import('node:path');
  const { rakennaData } = await import('../tools/dioraama/rakenna.mjs');
  const { RAKENNUS: OLAVINLINNA } = await import('../js/dioraama/rakennukset/olavinlinna.js');

  const tmp = mkdtempSync(join(tmpdir(), 'dioraama-rekvisiitta-valot-'));
  try {
    await rakennaData(OLAVINLINNA, { ulos: tmp, saateita: 8 });
    const json = JSON.parse(readFileSync(join(tmp, OLAVINLINNA.id, 'rakennus.json'), 'utf8'));
    const keittio = json.tilat.find((t) => t.id === 'keittio');
    assert.ok(keittio, "tila 'keittio' puuttuu rakennus.json:sta");

    const omat = keittio.valot.filter((v) => v.lahde !== 'rekvisiitta');
    const rekvisiitasta = keittio.valot.filter((v) => v.lahde === 'rekvisiitta');
    // Lähdedatassa (olavinlinna.js) keittiössä on 2 kynttilänjalkaa + 1 öljylamppu.
    assert.equal(rekvisiitasta.length, 3, `odotettiin 3 rekvisiittavaloa, oli ${rekvisiitasta.length}`);
    assert.equal(
      rekvisiitasta.filter((v) => v.lepatus === 0.2).length, 2, 'odotettiin 2 kynttilänjalan valoa (lepatus 0,2)',
    );
    assert.equal(
      rekvisiitasta.filter((v) => v.lepatus === 0.1).length, 1, 'odotettiin 1 öljylampun valo (lepatus 0,1)',
    );
    for (const v of rekvisiitasta) {
      assert.equal(v.paikka.length, 3, 'valo.paikka ei ole [x,y,z]');
      assert.ok(v.paikka.every((x) => Number.isFinite(x)), 'valo.paikka sisältää ei-numeroita');
      assert.ok(v.sade > 0, 'valo.sade ei ole positiivinen');
      assert.ok(v.voima > 0, 'valo.voima ei ole positiivinen');
      assert.match(v.vari, /^#[0-9a-f]{6}$/i, 'valo.vari ei ole hex-väri');
    }
    // Jatkoksi, ei korvaajana: alkuperäiset (esim. tulisijan) valot säilyvät listan alussa.
    assert.ok(omat.length >= 1, 'keittiön omat (ei-rekvisiitta) valot katosivat');
    assert.deepEqual(
      keittio.valot.slice(0, omat.length), omat, 'rekvisiitan valot eivät olleet jatkona alkuperäisten jälkeen',
    );
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});
