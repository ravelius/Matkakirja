import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { livianSvgPaa } from '../js/livia-svg-paa.js';
import { livianSvgAsento, livianEvaKerrosSvg } from '../js/livia-svg.js';

const kansio = fileURLToPath(new URL('../posti/pulu-astro-vauhti-20261006/', import.meta.url));
const lepo = livianSvgAsento('rest', 0);

test('0-vauhti säilyttää nykyisen pään täsmälleen', () => {
  assert.equal(livianSvgPaa({ ...lepo, astroVauhtiIlme: 0 }), livianSvgPaa(lepo));
  assert.equal(livianEvaKerrosSvg('perus', { ...lepo, astroVauhtiIlme: 0 }),
    livianEvaKerrosSvg('perus', lepo));
});

test('kaksi uutta ilmettä vaihtavat kasvot mutta eivät EVA-kangasta tai asentoa', () => {
  const kuvat = [0, 1, 2].map((i) => livianEvaKerrosSvg('perus',
    { ...lepo, astroVauhtiIlme: i }));
  for (const kuva of kuvat) {
    assert.match(kuva, /viewBox="0 0 152 304" width="152" height="304"/);
    assert.match(kuva, /data-part="eva-varjohahmo"/);
    assert.match(kuva, /data-part="astronautti-kypara"/);
  }
  assert.doesNotMatch(kuvat[0], /data-part="vauhti-/);
  assert.match(kuvat[1], /data-part="vauhti-hymy"/);
  assert.match(kuvat[1], /data-part="vauhti-hoyhenet"/);
  assert.match(kuvat[2], /data-part="vauhti-viirusilma"/);
  assert.match(kuvat[2], /data-part="vauhti-posket"/);
});

test('toimituksen kolme PNG:tä ovat eri sisältöä mutta samaa 3x RGBA-kokoa', () => {
  const tiivisteet = [];
  for (let i = 0; i <= 2; i++) {
    const png = readFileSync(`${kansio}pulu-astro-vauhti-${i}.png`);
    assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
    assert.equal(png.readUInt32BE(16), 456);
    assert.equal(png.readUInt32BE(20), 912);
    assert.equal(png[24], 8);
    assert.equal(png[25], 6); // RGB + alfa
    assert.ok(png.length > 20_000);
    tiivisteet.push(createHash('sha256').update(png).digest('hex'));
  }
  assert.equal(new Set(tiivisteet).size, 3);
});
