import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const lue = (polku, koodaus = 'utf8') => readFileSync(new URL(polku, import.meta.url), koodaus);

test('käyttöliittymän purku peruu avauskuvat, liidon ja puheen heti', () => {
  assert.match(lue('../js/ui.js'), /destroy\(\) \{[\s\S]*?peruLivianAvaus\(\);[\s\S]*?this\.dead = true;/);
});

test('kaupunginvalinta luovuttaa avaustekstin puhevuoron lennossa tervehtivälle Pululle', () => {
  assert.match(lue('../js/ui.js'), /aloitaKartalta\(\) \{[\s\S]*?lopetaAvauksenAani\(\);[\s\S]*?stopIntroVoice\(this\);[\s\S]*?this\.aloitaPallolta\(\)/);
});

test('avauskuplan muotokuva on eksplisiittinen optio eikä muuta tavallisia kuplia', () => {
  const js = lue('../js/pollo.js');
  assert.match(js, /naytaAvauskupla\(teksti, \{[\s\S]*?muotokuva = false/);
  assert.match(js, /if \(muotokuva\) \{[\s\S]*?viisas-pollo-muotokuva-v1\.png/);
  assert.match(js, /else \{\s*kupla\.appendChild\(puhe\);\s*\}/);
  assert.doesNotMatch(js, /pollo-vihje-nimilappu[^]*?appendChild/,
    'muotokuva ei saa palauttaa nimilappua');
});

test('muotokuva varaa 2:3-tilan, kestää kuvavirheen ja toimii 320 px ruudulla', () => {
  const js = lue('../js/pollo.js');
  const css = lue('../css/styles.css');
  assert.match(js, /kuva\.width = 512;[\s\S]*?kuva\.height = 768;/);
  assert.match(js, /addEventListener\('error', \(\) => \{ kuva\.hidden = true; \}/);
  assert.match(css, /\.pollo-vihje-muotokuvapaikka \{[\s\S]*?aspect-ratio: 2 \/ 3;/);
  assert.match(css, /@media \(max-width: 340px\)[\s\S]*?grid-template-columns: 4\.35rem minmax\(0, 1fr\)/);
  assert.match(css, /\.pollo-vihje-muotokuvakuva\[hidden\] \{ display: none; \}/);
});

test('uusi portrait on oikean kokoinen PNG ja mukana offline-shellissä', () => {
  const kuva = lue('../assets/tietaja/viisas-pollo-muotokuva-v1.png', null);
  assert.deepEqual([...kuva.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  // PNG IHDR: leveys ja korkeus ovat big-endian-lukuina tavuissa 16–23.
  assert.equal(kuva.readUInt32BE(16), 512);
  assert.equal(kuva.readUInt32BE(20), 768);
  // Color type 6 = RGBA: läpinäkyvyys säilyy kuluttavaan assettiin asti.
  assert.equal(kuva[25], 6);
  assert.match(lue('../sw.js'), /\.\/assets\/tietaja\/viisas-pollo-muotokuva-v1\.png/);
});

test('vain canonical Livian avauksen indeksi 4 pyytää muotokuvan', () => {
  const livia = lue('../js/livia.js');
  const kutsu = livia.match(/polloAvauskupla\(teksti, \{[\s\S]*?\n  \}\);/);
  assert.ok(kutsu, 'avauskuplan kutsua ei löydy');
  assert.match(kutsu[0], /muotokuva: rivi\.indeksi === 4/);
});
