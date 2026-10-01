/*
 * Blender-tuotosten osoitteisto (Linnanrakentaja 30.9.2026, TF 1.0.61:n palikkalinna): js/dioraama/rakennukset/
 * olavinlinna/blender.json kuvaa omistajan tools/dioraama/vie-blender.sh:lla ämpäriin lataaman muuttumattoman kansion.
 * rakenna.mjs kirjoittaa siitä rakennus.json:n kuori- ja valoatlaskentät; vie-dioraama.yml kopioi kansion pakettiin.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { RAKENNUS } from '../js/dioraama/rakennukset/olavinlinna.js';
import { lisaaBlender, tarkistaBlenderPaketti } from '../tools/dioraama/rakenna.mjs';

const B = JSON.parse(readFileSync(new URL('../js/dioraama/rakennukset/olavinlinna/blender.json', import.meta.url), 'utf8'));
const on = new Set(B.tiedostot.map((t) => t.polku));

test('blender.json: hash = sisältö (sama laskenta kuin vie-blender.sh), kansio muuttumaton hash-polku', () => {
  const rivit = [...B.tiedostot].sort((a, b) => (a.polku < b.polku ? -1 : 1)).map((t) => `${t.polku} ${t.sha256}\n`).join('');
  assert.equal(B.hash, createHash('sha256').update(rivit).digest('hex').slice(0, 16));
  assert.equal(B.kansio, `dioraama/${RAKENNUS.id}/blender/${B.hash}/`);
  for (const t of B.tiedostot) assert.ok(/^[0-9a-f]{64}$/.test(t.sha256) && t.tavuja > 0, t.polku);
});

test('blender.json: kuoren kaikki laatutasot ja tekstuurit sekä jokaisen kohdistettavan tilan glb ja päivä- + hämäräatlas', () => {
  for (const t of ['huippu', 'normaali', 'kevyt']) assert.ok(on.has(`ulkokuori/ulkokuori_${t}.glb`), t);
  for (const k of ['4k', '2k']) {
    for (const v of ['', '-hamara']) assert.ok(on.has(`ulkokuori/ulkokuori${v}-${k}-4x4.astcm`), `${v} ${k}`);
    assert.ok(on.has(`ulkokuori/ulkokuori-hamara-${k}.jpg`), k);
  }
  for (const tila of RAKENNUS.tilat.filter((t) => t.kohdistettava)) {
    assert.ok(on.has(`tilat/${tila.id}.glb`), `${tila.id}: leivottu glb`);
    for (const v of ['', '-hamara']) {
      for (const f of ['.jpg', '-2k.jpg', '-4x4.astcm', '-2k-4x4.astcm']) assert.ok(on.has(`valot/${tila.id}${v}${f}`), `${tila.id}${v}${f}`);
    }
  }
});

test('blender.json: ei lähdemallia eikä käyttämättömiä tiedostoja (senaatti-alkup, ulkokuori-4k.jpg)', () => {
  for (const p of on) assert.ok(!p.includes('senaatti-alkup') && p !== 'ulkokuori/ulkokuori-4k.jpg' && p !== 'ulkokuori/ulkokuori-2k.jpg', p);
});

// Palikkapaketin vartija (Päätoimittaja 30.9.): kun blender.json on olemassa, paketti ilman ulkokuorta hylätään.
const kopio = (r) => JSON.parse(JSON.stringify(r));

test('tarkistaBlenderPaketti: blender.json + ei ulkokuorta → hylätään; ilman blender.json:ia proseduraalinen käy', () => {
  assert.throws(() => tarkistaBlenderPaketti(kopio(RAKENNUS), B), /puuttuu ulkokuori \(palikkapaketti\)/);
  const osittain = kopio(RAKENNUS);
  lisaaBlender(osittain, B);
  delete osittain.ulkokuori.kevyt;
  assert.throws(() => tarkistaBlenderPaketti(osittain, B), /ulkokuori/);
  const proseduraalinen = kopio(RAKENNUS);
  lisaaBlender(proseduraalinen, B);
  proseduraalinen.tilat[0].glb = { tiedosto: `tilat/${proseduraalinen.tilat[0].id}.glb` };
  assert.throws(() => tarkistaBlenderPaketti(proseduraalinen, B), /ei ole leivottu/);
  assert.doesNotThrow(() => tarkistaBlenderPaketti(kopio(RAKENNUS), null));
});

test('jokainen js/dioraama/rakennukset/<id>/blender.json tuottaa hyväksytyn paketin (ulkokuori + leivotut tilat)', async () => {
  const juuri = new URL('../js/dioraama/rakennukset/', import.meta.url);
  const idt = readdirSync(juuri).filter((id) => existsSync(new URL(`${id}/blender.json`, juuri)));
  assert.ok(idt.includes('olavinlinna'), idt.join());
  for (const id of idt) {
    const blender = JSON.parse(readFileSync(new URL(`${id}/blender.json`, juuri), 'utf8'));
    const { RAKENNUS: R } = await import(new URL(`${id}.js`, juuri).href);
    const json = kopio(R);
    const rivit = lisaaBlender(json, blender);
    assert.doesNotThrow(() => tarkistaBlenderPaketti(json, blender), id);
    assert.equal(rivit.length, blender.tiedostot.length, id);
    assert.ok(json.tilat.length > 0 && json.tilat.every((t) => t.glb?.tiedosto.startsWith('blender/tilat/') || (t.kohdistettava === false && !t.glb)), id);
  }
});

test('äänitila: massa jää Blender-pakettiin ilman glb:tä vain äänikentin (yleisnäkymän taustaäänet, Siirtoseppä 30.9.)', () => {
  const json = kopio(RAKENNUS);
  lisaaBlender(json, B);
  const massa = json.tilat.find((t) => t.id === 'massa');
  assert.ok(massa, 'massa puuttuu');
  assert.deepEqual(Object.keys(massa).sort(), ['aanet', 'id', 'kohdistettava', 'nimi', 'rajat', 'tehosteet']);
  assert.ok(massa.aanet.length > 0);
  assert.doesNotThrow(() => tarkistaBlenderPaketti(json, B));
  for (const t of json.tilat.filter((x) => x.kohdistettava !== false)) assert.ok(t.glb.tiedosto.startsWith('blender/'), t.id);
});

test('kuoren huippu-taso: 8k-atlas vain jos se on blender.json:ssa, muuten 4k (laatusuunnitelma 30.9.)', () => {
  const ilman = kopio(RAKENNUS);
  lisaaBlender(ilman, { ...B, tiedostot: B.tiedostot.filter((t) => !t.polku.includes('-8k')) });
  assert.match(ilman.ulkokuori.tekstuurit.huippu, /ulkokuori-4k-4x4\.astcm$/);
  const lisa = ['ulkokuori/ulkokuori-8k-4x4.astcm', 'ulkokuori/ulkokuori-hamara-8k-4x4.astcm', 'ulkokuori/ulkokuori-hamara-8k.jpg']
    .map((polku) => ({ polku, sha256: 'a'.repeat(64), tavuja: 1 }));
  const kanssa = kopio(RAKENNUS);
  lisaaBlender(kanssa, { ...B, tiedostot: [...B.tiedostot.filter((t) => !t.polku.includes('-8k')), ...lisa] });
  assert.match(kanssa.ulkokuori.tekstuurit.huippu, /ulkokuori-8k-4x4\.astcm$/);
  assert.match(kanssa.ulkokuori.tekstuurit.hamara.huippu, /ulkokuori-hamara-8k-4x4\.astcm$/);
  assert.match(kanssa.ulkokuori.tekstuurit.normaali, /ulkokuori-4k-4x4\.astcm$/);
});

test('kuoren detalji (hybridi-PBR, menetelmä B): vain jos maski ja 4 kirjastomateriaalia ovat blender.json:ssa', () => {
  const ilman = kopio(RAKENNUS);
  const perus = B.tiedostot.filter((t) => !t.polku.startsWith('kirjasto/') && !t.polku.includes('hybridi/'));
  lisaaBlender(ilman, { ...B, tiedostot: perus });
  assert.equal(ilman.ulkokuori.detalji, undefined);
  const idt = ['graniittilohkomuuri', 'paanukatto', 'kivilaatta', 'kallio'];
  const lisa = ['ulkokuori/hybridi/kuori-materiaali-2k.png',
    ...idt.flatMap((id) => [`kirjasto/materiaali/${id}/${id}_diff.jpg`, `kirjasto/materiaali/${id}/${id}_nor_gl.jpg`])]
    .map((polku) => ({ polku, sha256: 'b'.repeat(64), tavuja: 1 }));
  const kanssa = kopio(RAKENNUS);
  lisaaBlender(kanssa, { ...B, tiedostot: [...perus, ...lisa] });
  const d = kanssa.ulkokuori.detalji;
  assert.equal(d.maski, 'blender/ulkokuori/hybridi/kuori-materiaali-2k.png');
  assert.deepEqual(d.kanavat.map((k) => k.id), idt);
  for (const k of d.kanavat) assert.ok(k.diff.startsWith('blender/kirjasto/') && k.nor.endsWith('_nor_gl.jpg') && k.toisto_m > 0, k.id);
});

test('ympäristö (vaihe 5, n1500): vain jos kaikki tiedostot ovat blender.json:ssa; Siirtosepän kenttänimet', () => {
  const perus = B.tiedostot.filter((t) => !t.polku.startsWith('ymparisto/'));
  const ilman = kopio(RAKENNUS);
  lisaaBlender(ilman, { ...B, tiedostot: perus });
  assert.equal(ilman.ymparisto, undefined);
  const tiedostot = ['ymparisto_huippu.glb', 'ymparisto_normaali.glb', 'ymparisto_kevyt.glb', 'puut.json', 'puukortit.png',
    'puukortit-hamara.png', 'puukortit.json', 'horisontti.glb', 'horisontti-1k.jpg', 'horisontti-hamara-1k.jpg', 'syvyys.png',
    ...['8k', '4k', '2k'].flatMap((k) => [`ymparisto-${k}-4x4.astcm`, `ymparisto-hamara-${k}-4x4.astcm`])]
    .map((p) => ({ polku: `ymparisto/${p}`, sha256: 'c'.repeat(64), tavuja: 1 }));
  const vajaa = kopio(RAKENNUS);
  lisaaBlender(vajaa, { ...B, tiedostot: [...perus, ...tiedostot.slice(1)] });
  assert.equal(vajaa.ymparisto, undefined, 'osittainen ympäristö ei kelpaa');
  const kanssa = kopio(RAKENNUS);
  lisaaBlender(kanssa, { ...B, tiedostot: [...perus, ...tiedostot] });
  const y = kanssa.ymparisto;
  assert.deepEqual(Object.keys(y).sort(), ['hamara', 'horisontti', 'horisontti_kuva', 'huippu', 'kevyt', 'normaali', 'orto', 'puukortit',
    'puukortit_tiedot', 'puut', 'syvyys'].sort());
  assert.match(y.orto.huippu, /ymparisto-8k-4x4\.astcm$/); assert.match(y.orto.kevyt, /ymparisto-2k-4x4\.astcm$/);
  assert.match(y.hamara.puukortit, /puukortit-hamara\.png$/);
  assert.ok(y.syvyys.kuva.startsWith('blender/ymparisto/') && y.syvyys.pikseli_m > 1 && y.syvyys.kerroin_m > 0 && y.syvyys.origo.length === 2);
  for (const t of ['huippu', 'normaali', 'kevyt']) assert.ok(y[t].startsWith('blender/ymparisto/'), t);
});

test('ympäristön lähimaasto ja aluskasvit: mukana vain jos tiedostot ovat blender.json:ssa', () => {
  const MAA = JSON.parse(readFileSync(new URL('../js/dioraama/rakennukset/olavinlinna/ymparisto-maasto.json', import.meta.url), 'utf8'));
  const Y = ['ymparisto_huippu.glb', 'ymparisto_normaali.glb', 'ymparisto_kevyt.glb', 'puut.json', 'puukortit.png',
    'puukortit-hamara.png', 'puukortit.json', 'horisontti.glb', 'horisontti-1k.jpg', 'horisontti-hamara-1k.jpg', 'syvyys.png',
    ...['8k', '4k', '2k'].flatMap((k) => [`ymparisto-${k}-4x4.astcm`, `ymparisto-hamara-${k}-4x4.astcm`])];
  const M = ['splat-0.png', 'splat-1.png', 'splat-normaali-0.png', ...MAA.kerrokset.flatMap((k) => [`maasto/${k.lahde}_diff_1k.jpg`, `maasto/${k.lahde}_nor_gl_1k.jpg`]),
    'aluskasvit.png', 'aluskasvit-hamara.png', 'aluskasvit.json', 'aluskasvit-lista.json'];
  const t = (l) => l.map((p) => ({ polku: `ymparisto/${p}`, sha256: 'd'.repeat(64), tavuja: 1 }));
  const perus = B.tiedostot.filter((x) => !x.polku.startsWith('ymparisto/'));
  const ilman = kopio(RAKENNUS); lisaaBlender(ilman, { ...B, tiedostot: [...perus, ...t(Y)] });
  assert.ok(ilman.ymparisto && !ilman.ymparisto.maasto && !ilman.ymparisto.aluskasvit);
  const kanssa = kopio(RAKENNUS); lisaaBlender(kanssa, { ...B, tiedostot: [...perus, ...t(Y), ...t(M)] });
  const m = kanssa.ymparisto.maasto;
  assert.equal(m.maski.length, 2); assert.equal(m.kerrokset.length, 6); assert.equal(m.alue.length, 4); assert.ok(m.lahi_m > 0);
  assert.match(m.maski_normaali, /splat-normaali-0\.png$/);
  assert.match(kanssa.ymparisto.aluskasvit.lista, /aluskasvit-lista\.json$/);
  assert.ok(!kanssa.ymparisto.taivas, 'taivas vain jos kuvat viety');
  const taivas = kopio(RAKENNUS); lisaaBlender(taivas, { ...B, tiedostot: [...perus, ...t(Y), ...t(['taivas-2k.jpg', 'taivas-hamara-2k.jpg'])] });
  assert.match(taivas.ymparisto.taivas, /taivas-2k\.jpg$/); assert.match(taivas.ymparisto.taivas_hamara, /taivas-hamara-2k\.jpg$/);
  assert.equal(taivas.ymparisto.taivas_suunta, 270);
  assert.ok(!taivas.ymparisto.puukortit_normaali);
  const nor = kopio(RAKENNUS); lisaaBlender(nor, { ...B, tiedostot: [...perus, ...t(Y), ...t(['puukortit-normaali.png'])] });
  assert.match(nor.ymparisto.puukortit_normaali, /puukortit-normaali\.png$/);
});
