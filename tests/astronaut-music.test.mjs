import test from 'node:test';
import assert from 'node:assert/strict';
import { LAJIT, valitseLajit, kestoRajat, lahdeMs, looppiLeikkaus, raidanTiedosto } from '../tools/generoi-siirtymamusiikki.mjs';
test('astronaut music is one explicitly selected Lyria loop, separate from hum and bulk requests',()=>{
  const music=LAJIT['astronautin-kamera'];
  assert.deepEqual(valitseLajit('astronautin-kamera'),['astronautin-kamera']);
  assert(!valitseLajit('kaikki').includes('astronautin-kamera'));
  assert.equal(raidanTiedosto(music,'lyria'),'astronautin-kamera-musiikki-lyria.mp3');
  assert.equal(music.ampariKansio,'matkakirja/aanet/linssit');
  assert.deepEqual(kestoRajat(music),{min:120,max:180});
  assert.deepEqual(looppiLeikkaus({lahde:lahdeMs(music)/1000,looppi:music.looppi,risti:music.risti,vahin:120}),{alku:8,looppi:150,risti:4});
  for(const phrase of ['No beat','no rhythm','no vocals','no speech','no fade in','no fade out','separate space station hum']) assert(music.prompt.includes(phrase),phrase);
});
