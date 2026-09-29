/*
 * Dioraaman MEDIATIEDOSTOJEN (tools/dioraama/media.mjs) testit (Linnanrakentaja,
 * erä 2). Speksi: docs/raportit/dioraama-rajapinnat-era2-20260929.md kohdat 1 ja 2.
 *
 * Kaikki lähde-/kohdekansiot ovat node:os:n tmpdir()-alaisia väliaikaiskansioita
 * (mkdtempSync) — EI KOSKAAN oikeaa assets/-kansiota eikä repon sisään mitään
 * äänitiedostoa (omistajan sääntö, VARTIO-testi tests/media.test.mjs). Dummy-
 * "kuvat"/"äänet" ovat tässä pelkkää tekstiä puskurissa: kopiointifunktiot eivät
 * jäsennä sisältöä, vain kopioivat tavut sellaisenaan.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

import {
  OLETUS_ASSETS_JUURI, kopioiPinnanKuva, teeHenkilonAtlas, teeLiekinAtlas, kopioiAanet,
} from '../tools/dioraama/media.mjs';
import { teeLiekkiPaikkamerkkiAtlas } from '../tools/dioraama/liekki-paikkamerkit.mjs';
import { rakennaData } from '../tools/dioraama/rakenna.mjs';
import { LIEKIT } from '../js/dioraama/pankit/liekit.js';

function uusiTilapaisinenKansio(etuliite) {
  return mkdtempSync(join(tmpdir(), `dioraama-${etuliite}-test-`));
}

/** PNG:n leveys/korkeus IHDR-lohkosta (signature 8 t. + pituus 4 t. + "IHDR" 4 t. = tavu 16). */
function pngKoko(buf) {
  return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
}

function sha(buf) {
  return createHash('sha256').update(buf).digest('hex');
}

/* ==================== OLETUS_ASSETS_JUURI ==================== */

test('OLETUS_ASSETS_JUURI on speksin mukainen', () => {
  assert.equal(OLETUS_ASSETS_JUURI, 'assets/dioraama');
});

/* ==================== kopioiPinnanKuva ==================== */

test('kopioiPinnanKuva: pinnalla ei lahde-kenttää -> null, ei tiedostoa', () => {
  const assetsJuuri = uusiTilapaisinenKansio('assets-pinta-a');
  const kansio = uusiTilapaisinenKansio('paketti-pinta-a');
  try {
    const tulos = kopioiPinnanKuva('vari-vain', { vari: '#123456', toisto_m: 1 }, kansio, assetsJuuri);
    assert.equal(tulos, null);
    assert.equal(existsSync(join(kansio, 'pinnat', 'vari-vain.jpg')), false);
  } finally {
    rmSync(assetsJuuri, { recursive: true, force: true });
    rmSync(kansio, { recursive: true, force: true });
  }
});

test('kopioiPinnanKuva: lahde annettu mutta tiedosto puuttuu levyltä -> null, ei virhettä', () => {
  const assetsJuuri = uusiTilapaisinenKansio('assets-pinta-b');
  const kansio = uusiTilapaisinenKansio('paketti-pinta-b');
  try {
    const pinta = { vari: '#123456', toisto_m: 1, lahde: 'pinnat/puuttuva.jpg' };
    const tulos = kopioiPinnanKuva('puuttuva', pinta, kansio, assetsJuuri);
    assert.equal(tulos, null);
    assert.equal(existsSync(join(kansio, 'pinnat', 'puuttuva.jpg')), false);
  } finally {
    rmSync(assetsJuuri, { recursive: true, force: true });
    rmSync(kansio, { recursive: true, force: true });
  }
});

test('kopioiPinnanKuva: olemassa oleva lähde kopioituu tavu-identtisenä', () => {
  const assetsJuuri = uusiTilapaisinenKansio('assets-pinta-c');
  const kansio = uusiTilapaisinenKansio('paketti-pinta-c');
  try {
    const sisalto = Buffer.from('testikuva-pinta-tavuja-1234', 'utf8');
    mkdirSync(join(assetsJuuri, 'pinnat'), { recursive: true });
    writeFileSync(join(assetsJuuri, 'pinnat', 'kivi.jpg'), sisalto);
    const pinta = { vari: '#b8ad9c', toisto_m: 2, lahde: 'pinnat/kivi.jpg' };
    const tulos = kopioiPinnanKuva('kivi', pinta, kansio, assetsJuuri);
    assert.ok(tulos);
    assert.equal(tulos.polku, 'pinnat/kivi.jpg');
    assert.equal(tulos.sha256, sha(sisalto));
    assert.equal(tulos.tavuja, sisalto.length);
    assert.ok(readFileSync(join(kansio, 'pinnat', 'kivi.jpg')).equals(sisalto));
  } finally {
    rmSync(assetsJuuri, { recursive: true, force: true });
    rmSync(kansio, { recursive: true, force: true });
  }
});

/* ==================== teeHenkilonAtlas ==================== */

test('teeHenkilonAtlas: ei paikkamerkkiä eikä maalattua -> null', () => {
  const assetsJuuri = uusiTilapaisinenKansio('assets-henkilo-a');
  const kansio = uusiTilapaisinenKansio('paketti-henkilo-a');
  try {
    const tulos = teeHenkilonAtlas('tyhja', { nimi: 'Tyhjä' }, kansio, assetsJuuri);
    assert.equal(tulos, null);
  } finally {
    rmSync(assetsJuuri, { recursive: true, force: true });
    rmSync(kansio, { recursive: true, force: true });
  }
});

test('teeHenkilonAtlas: maalattu-lähde puuttuu levyltä -> paikkamerkki (maalattu:false), oikea koko', () => {
  const assetsJuuri = uusiTilapaisinenKansio('assets-henkilo-b');
  const kansio = uusiTilapaisinenKansio('paketti-henkilo-b');
  try {
    const henkilo = {
      nimi: 'Testi', korkeus_m: 1.7,
      paikkamerkki: { vari: '#7a3b2e', esiliina: '#e8e0cc', paine: 'myssy' },
      maalattu: { lahde: 'hahmot/testihenkilo.png' },
    };
    const tulos = teeHenkilonAtlas('testihenkilo', henkilo, kansio, assetsJuuri);
    assert.ok(tulos);
    assert.equal(tulos.maalattu, false);
    assert.equal(tulos.polku, 'hahmot/testihenkilo.png');
    const buf = readFileSync(join(kansio, 'hahmot', 'testihenkilo.png'));
    const [l, k] = pngKoko(buf);
    assert.equal(l, 1024); // paikkamerkit.mjs:n vakiokoko (RUUTU×SARAKKEET)
    assert.equal(k, 768); // RIVIT.length × RUUTU[1]
  } finally {
    rmSync(assetsJuuri, { recursive: true, force: true });
    rmSync(kansio, { recursive: true, force: true });
  }
});

test('teeHenkilonAtlas: maalattu-lähde löytyy -> kopioituu tavu-identtisenä (maalattu:true)', () => {
  const assetsJuuri = uusiTilapaisinenKansio('assets-henkilo-c');
  const kansio = uusiTilapaisinenKansio('paketti-henkilo-c');
  try {
    const sisalto = Buffer.from('maalattu-atlas-tavuja-5678', 'utf8');
    mkdirSync(join(assetsJuuri, 'hahmot'), { recursive: true });
    writeFileSync(join(assetsJuuri, 'hahmot', 'testihenkilo2.png'), sisalto);
    const henkilo = { nimi: 'Testi2', maalattu: { lahde: 'hahmot/testihenkilo2.png' } };
    const tulos = teeHenkilonAtlas('testihenkilo2', henkilo, kansio, assetsJuuri);
    assert.ok(tulos);
    assert.equal(tulos.maalattu, true);
    assert.equal(tulos.sha256, sha(sisalto));
    assert.ok(readFileSync(join(kansio, 'hahmot', 'testihenkilo2.png')).equals(sisalto));
  } finally {
    rmSync(assetsJuuri, { recursive: true, force: true });
    rmSync(kansio, { recursive: true, force: true });
  }
});

/* ==================== teeLiekinAtlas / teeLiekkiPaikkamerkkiAtlas ==================== */

test('teeLiekkiPaikkamerkkiAtlas: koko = ruutu × sarakkeet/rivit (ruudukon kokoinen)', () => {
  const liekki = {
    ruutu: [40, 20], sarakkeet: 3, ruudut: 5, fps: 8, koko_m: [0.2, 0.3], pivot: [0.5, 0.1],
  };
  const png = teeLiekkiPaikkamerkkiAtlas(liekki, 'testiliekki');
  const [l, k] = pngKoko(png);
  assert.equal(l, 3 * 40); // sarakkeet × ruutuL
  assert.equal(k, Math.ceil(5 / 3) * 20); // rivit (ceil(ruudut/sarakkeet)) × ruutuK
});

test('teeLiekkiPaikkamerkkiAtlas: LIEKIT.tulisija (oikea pankki) -> 1024×512', () => {
  const png = teeLiekkiPaikkamerkkiAtlas(LIEKIT.tulisija, 'tulisija');
  const [l, k] = pngKoko(png);
  assert.equal(l, 4 * 256);
  assert.equal(k, 2 * 256);
});

test('teeLiekkiPaikkamerkkiAtlas: deterministinen (sama syöte -> sama tavujono)', () => {
  const a = teeLiekkiPaikkamerkkiAtlas(LIEKIT.kynttila, 'kynttila');
  const b = teeLiekkiPaikkamerkkiAtlas(LIEKIT.kynttila, 'kynttila');
  assert.ok(a.equals(b), 'kaksi ajoa samalla liekillä eivät tuottaneet samaa tavujonoa');
});

test('teeLiekinAtlas: lähde puuttuu levyltä -> proseduraalinen paikkamerkki, ei virhettä', () => {
  const assetsJuuri = uusiTilapaisinenKansio('assets-liekki-a');
  const kansio = uusiTilapaisinenKansio('paketti-liekki-a');
  try {
    const liekki = {
      lahde: 'liekit/puuttuu.png', ruutu: [32, 32], sarakkeet: 2, ruudut: 2, fps: 6, koko_m: [0.1, 0.1], pivot: [0.5, 0.1],
    };
    const tulos = teeLiekinAtlas('puuttuvaliekki', liekki, kansio, assetsJuuri);
    assert.ok(tulos);
    assert.equal(tulos.polku, 'liekit/puuttuvaliekki.png');
    const buf = readFileSync(join(kansio, 'liekit', 'puuttuvaliekki.png'));
    const [l, k] = pngKoko(buf);
    assert.equal(l, 64); assert.equal(k, 32);
  } finally {
    rmSync(assetsJuuri, { recursive: true, force: true });
    rmSync(kansio, { recursive: true, force: true });
  }
});

test('teeLiekinAtlas: lähde löytyy -> kopioituu tavu-identtisenä', () => {
  const assetsJuuri = uusiTilapaisinenKansio('assets-liekki-b');
  const kansio = uusiTilapaisinenKansio('paketti-liekki-b');
  try {
    const sisalto = Buffer.from('liekkiatlas-tavuja-9012', 'utf8');
    mkdirSync(join(assetsJuuri, 'liekit'), { recursive: true });
    writeFileSync(join(assetsJuuri, 'liekit', 'olemassa.png'), sisalto);
    const liekki = {
      lahde: 'liekit/olemassa.png', ruutu: [10, 10], sarakkeet: 1, ruudut: 1, fps: 1, koko_m: [0.1, 0.1], pivot: [0.5, 0.1],
    };
    const tulos = teeLiekinAtlas('olemassa', liekki, kansio, assetsJuuri);
    assert.equal(tulos.polku, 'liekit/olemassa.png');
    assert.equal(tulos.sha256, sha(sisalto));
    assert.ok(readFileSync(join(kansio, 'liekit', 'olemassa.png')).equals(sisalto));
  } finally {
    rmSync(assetsJuuri, { recursive: true, force: true });
    rmSync(kansio, { recursive: true, force: true });
  }
});

/* ==================== kopioiAanet ==================== */

test('kopioiAanet: aanetKansio puuttuu -> [], ei mitään kirjoiteta (ei myöskään aanet-kansiota)', () => {
  const kansio = uusiTilapaisinenKansio('paketti-aanet-a');
  try {
    const tulos = kopioiAanet(new Set(['efekti']), kansio, null);
    assert.deepEqual(tulos, []);
    assert.equal(existsSync(join(kansio, 'aanet')), false);
  } finally {
    rmSync(kansio, { recursive: true, force: true });
  }
});

test('kopioiAanet: olemassa oleva mp3 kopioituu v1-alikansioon (oletusversio), puuttuva ohitetaan ilman virhettä', () => {
  const aanetKansio = uusiTilapaisinenKansio('aanilahde');
  const kansio = uusiTilapaisinenKansio('paketti-aanet-b');
  try {
    const sisalto = Buffer.from('mp3-nukkedataa-vain-testiin', 'utf8');
    writeFileSync(join(aanetKansio, 'olemassa.mp3'), sisalto);
    // 'puuttuva.mp3' jätetään tarkoituksella luomatta. Ei versiot-karttaa -> oletus 1.
    const tulos = kopioiAanet(new Set(['olemassa', 'puuttuva']), kansio, aanetKansio);
    assert.equal(tulos.length, 1);
    assert.equal(tulos[0].id, 'olemassa');
    assert.equal(tulos[0].polku, 'aanet/v1/olemassa.mp3');
    assert.equal(tulos[0].sha256, sha(sisalto));
    assert.ok(readFileSync(join(kansio, 'aanet', 'v1', 'olemassa.mp3')).equals(sisalto));
    assert.equal(existsSync(join(kansio, 'aanet', 'v1', 'puuttuva.mp3')), false);
  } finally {
    rmSync(aanetKansio, { recursive: true, force: true });
    rmSync(kansio, { recursive: true, force: true });
  }
});

test('kopioiAanet: versiot-kartta ohjaa kohteen v<versio>-alikansioon (lähde EI ole versioitu)', () => {
  const aanetKansio = uusiTilapaisinenKansio('aanilahde-versio');
  const kansio = uusiTilapaisinenKansio('paketti-aanet-versio');
  try {
    const sisalto = Buffer.from('mp3-uusintaotto-versio-3', 'utf8');
    writeFileSync(join(aanetKansio, 'uusittu.mp3'), sisalto); // lähdenimi ei sisällä versiota
    const tulos = kopioiAanet(new Set(['uusittu']), kansio, aanetKansio, { uusittu: 3 });
    assert.equal(tulos.length, 1);
    assert.equal(tulos[0].polku, 'aanet/v3/uusittu.mp3', 'versiot-kartan versio näkyy kohdepolussa');
    assert.ok(readFileSync(join(kansio, 'aanet', 'v3', 'uusittu.mp3')).equals(sisalto));
  } finally {
    rmSync(aanetKansio, { recursive: true, force: true });
    rmSync(kansio, { recursive: true, force: true });
  }
});

/* ==================== rakennaData: koko putki (kokki-1500 + tulisija-liekki) ====================
 * Käyttää OIKEITA HENKILOT/LIEKIT-pankkeja ('kokki-1500', 'tulisija') — ne ovat tämän
 * saman erän omaa, vakaata dataa. Fixture-tila on minimaalinen: rakennaData lukee
 * tilalta vain id/palikat/naapurit/valot/kohdistettava/hahmot/aanet/liekit.
 */
const TILA_MEDIA_TESTI = {
  id: 'mediahuone',
  kohdistettava: true,
  palikat: [
    { resepti: 'laatta', paikka: [0, 0, 0], suunta: 0, leveys: 2, syvyys: 2, paksuus: 0.2 },
  ],
  hahmot: [
    { id: 'kokki', henkilo: 'kokki-1500', paikka: [0, 0, 0], suunta: 0 },
  ],
  liekit: [
    { liekki: 'tulisija', paikka: [0, 0.5, 0], koko: 1, vaihe: 0 },
  ],
};
const RAKENNUS_MEDIA_TESTI = { id: 'media-testirakennus', versio: 1, tilat: [TILA_MEDIA_TESTI] };

test('rakennaData: kokki-1500 maalattu-lähde löytyy -> MAALATTU-muoto rakennus.json:ssa ja manifestissa', async () => {
  const assetsJuuri = uusiTilapaisinenKansio('assets-e2e-a');
  const ulos = uusiTilapaisinenKansio('ulos-e2e-a');
  try {
    const kokkiPng = Buffer.from('kokin-maalattu-atlas-testidataa', 'utf8');
    mkdirSync(join(assetsJuuri, 'hahmot'), { recursive: true });
    writeFileSync(join(assetsJuuri, 'hahmot', 'kokki-1500.png'), kokkiPng);

    const tulos = await rakennaData(RAKENNUS_MEDIA_TESTI, { ulos, saateita: 8, assetsJuuri });
    const rakennusJson = JSON.parse(readFileSync(join(tulos.kansio, 'rakennus.json'), 'utf8'));

    const kokki = rakennusJson.henkilot['kokki-1500'];
    assert.ok(kokki, "kokki-1500 puuttuu rakennus.json:n 'henkilot'-kentästä");
    assert.equal(kokki.nimi, 'Kokki');
    assert.equal(kokki.korkeus_m, 1.72);
    assert.deepEqual(kokki.ruutu, [256, 384]);
    assert.equal(kokki.sarakkeet, 8);
    assert.deepEqual(kokki.pivot, [0.5, 15 / 384]);
    assert.equal(kokki.px_per_m, 196);
    assert.deepEqual(Object.keys(kokki.silmukat).sort(), ['idle', 'puhe', 'tyo']);
    assert.equal(kokki.lisenssi, 'Codex (Päätoimittajan tilaus), omistajan oikeudet');
    assert.equal(kokki.atlas, 'hahmot/kokki-1500.png');
    assert.equal('paikkamerkki' in kokki, false, 'maalattu-muodossa ei saa olla paikkamerkki-kenttää');
    assert.equal('maalattu' in kokki, false, 'maalattu-lohko ei saa vuotaa sellaisenaan rakennus.json:iin');
    assert.equal('lahde' in kokki, false, '`lahde` ei saa tulostua rakennus.json:iin (kohta 2)');

    const manifest = JSON.parse(readFileSync(join(tulos.kansio, 'manifest.json'), 'utf8'));
    const rivi = manifest.tiedostot.find((t) => t.polku === 'hahmot/kokki-1500.png');
    assert.ok(rivi, 'hahmot/kokki-1500.png puuttuu manifestista');
    assert.equal(rivi.sha256, sha(kokkiPng));
    assert.equal(rivi.tavuja, kokkiPng.length);
    assert.ok(readFileSync(join(tulos.kansio, 'hahmot', 'kokki-1500.png')).equals(kokkiPng));
  } finally {
    rmSync(assetsJuuri, { recursive: true, force: true });
    rmSync(ulos, { recursive: true, force: true });
  }
});

test('rakennaData: kokki-1500 maalattu-lähde PUUTTUU -> paikkamerkkimuoto; tulisija-liekki paikkamerkkiatlas oikean kokoisena', async () => {
  const assetsJuuri = uusiTilapaisinenKansio('assets-e2e-b'); // tyhjä: ei mitään lähteitä levyllä
  const ulos = uusiTilapaisinenKansio('ulos-e2e-b');
  try {
    const tulos = await rakennaData(RAKENNUS_MEDIA_TESTI, { ulos, saateita: 8, assetsJuuri });
    const rakennusJson = JSON.parse(readFileSync(join(tulos.kansio, 'rakennus.json'), 'utf8'));

    const kokki = rakennusJson.henkilot['kokki-1500'];
    assert.ok(kokki.paikkamerkki, 'paikkamerkkimuodossa paikkamerkki-kenttä pitää säilyä');
    assert.equal('px_per_m' in kokki, false, 'paikkamerkkimuodossa ei saa olla px_per_m:ää');
    assert.equal(kokki.atlas, 'hahmot/kokki-1500.png');
    assert.equal('maalattu' in kokki, false);

    const liekki = rakennusJson.liekit.tulisija;
    assert.ok(liekki, "tulisija puuttuu rakennus.json:n 'liekit'-kentästä");
    assert.deepEqual(liekki.ruutu, [256, 256]);
    assert.equal(liekki.sarakkeet, 4);
    assert.equal(liekki.ruudut, 8);
    assert.equal(liekki.fps, 12);
    assert.deepEqual(liekki.koko_m, [1.1, 1.1]);
    assert.deepEqual(liekki.pivot, [0.5, 0.06]);
    assert.equal(liekki.atlas, 'liekit/tulisija.png');
    assert.equal('lahde' in liekki, false);

    // Tilan oma liekki-instanssi periytyy sellaisenaan rakennus.json:iin (era2 kohta 2 "LIEKIT").
    assert.deepEqual(rakennusJson.tilat[0].liekit, [{ liekki: 'tulisija', paikka: [0, 0.5, 0], koko: 1, vaihe: 0 }]);

    const png = readFileSync(join(tulos.kansio, 'liekit', 'tulisija.png'));
    const [l, k] = pngKoko(png);
    assert.equal(l, 1024); assert.equal(k, 512);

    const manifest = JSON.parse(readFileSync(join(tulos.kansio, 'manifest.json'), 'utf8'));
    const rivi = manifest.tiedostot.find((t) => t.polku === 'liekit/tulisija.png');
    assert.ok(rivi);
    assert.equal(rivi.sha256, sha(png));
  } finally {
    rmSync(assetsJuuri, { recursive: true, force: true });
    rmSync(ulos, { recursive: true, force: true });
  }
});

test('rakennaData: deterministisyys (liekin paikkamerkki + kokin maalattu-kopio) kahdella ajolla', async () => {
  const assetsJuuri = uusiTilapaisinenKansio('assets-e2e-c');
  const kokkiPng = Buffer.from('determinismitesti-kokki-atlas', 'utf8');
  mkdirSync(join(assetsJuuri, 'hahmot'), { recursive: true });
  writeFileSync(join(assetsJuuri, 'hahmot', 'kokki-1500.png'), kokkiPng);
  const ulos1 = uusiTilapaisinenKansio('ulos-e2e-c1');
  const ulos2 = uusiTilapaisinenKansio('ulos-e2e-c2');
  try {
    const t1 = await rakennaData(RAKENNUS_MEDIA_TESTI, { ulos: ulos1, saateita: 8, assetsJuuri });
    const t2 = await rakennaData(RAKENNUS_MEDIA_TESTI, { ulos: ulos2, saateita: 8, assetsJuuri });
    for (const nimi of ['rakennus.json', 'manifest.json']) {
      const a = readFileSync(join(t1.kansio, nimi));
      const b = readFileSync(join(t2.kansio, nimi));
      assert.ok(a.equals(b), `${nimi} ei ollut tavu-identtinen kahdella ajolla`);
    }
    const liekkiA = readFileSync(join(t1.kansio, 'liekit', 'tulisija.png'));
    const liekkiB = readFileSync(join(t2.kansio, 'liekit', 'tulisija.png'));
    assert.ok(liekkiA.equals(liekkiB), 'liekin paikkamerkkiatlas ei ollut deterministinen kahdella ajolla');
  } finally {
    rmSync(assetsJuuri, { recursive: true, force: true });
    rmSync(ulos1, { recursive: true, force: true });
    rmSync(ulos2, { recursive: true, force: true });
  }
});

test('rakennaData: --aanet-kansio (aanetKansio) ei riko putkea kun mitään ääntä ei käytetä', async () => {
  const ulos = uusiTilapaisinenKansio('ulos-e2e-d');
  const aanetKansio = uusiTilapaisinenKansio('aanet-e2e-d');
  try {
    const tulos = await rakennaData(RAKENNUS_MEDIA_TESTI, { ulos, saateita: 8, aanetKansio });
    assert.deepEqual(tulos.aanet, []);
  } finally {
    rmSync(ulos, { recursive: true, force: true });
    rmSync(aanetKansio, { recursive: true, force: true });
  }
});
