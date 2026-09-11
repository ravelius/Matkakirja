import test from 'node:test';
import assert from 'node:assert/strict';
import { LIVIAN_KASVOELEET, LIVIAN_KASVOKUVA, livianKasvoAsento } from '../js/livia-kasvot.js';
import { livianMietintaEle } from '../js/livia-eleet.js';

test('Livian viisi elettä palaavat lepoilmeeseen eivätkä lähde vasemmalle', () => {
  assert.equal(LIVIAN_KASVOELEET.length, 5);
  const lepo = livianKasvoAsento('blink',0);
  for(const ele of LIVIAN_KASVOELEET){
    assert.deepEqual(livianKasvoAsento(ele.id,0),lepo);
    assert.deepEqual(livianKasvoAsento(ele.id,1),lepo);
    for(let i=0;i<=100;i++){
      const p=livianKasvoAsento(ele.id,i/100);
      assert.ok(p.x>=0,`${ele.id} siirtyy vasemmalle`);
      assert.ok(Object.values(p).every(Number.isFinite));
    }
  }
  assert.ok(livianKasvoAsento('owl',.6).x>=46,'pöllöretki on poissa ruudulta');
  assert.ok(livianKasvoAsento('peek',.3).y>=40,'kurkistus käy kokonaan viivan alla');
});

test('mietintäliike seuraa näkyvän lauseen aihetta', () => {
  assert.equal(livianMietintaEle('Hyvä kysymys. Käyn kysymässä pöllöltä, pieni hetki..'),'flyAway');
  assert.equal(livianMietintaEle('No nyt kesti. Pöllöllä on pitkä puheenvuoro..'),'listen');
  assert.equal(livianMietintaEle('Hetki, pululla pulla suussa..'),'crumb');
  assert.equal(livianMietintaEle('Hetki, murut pois kirjan päältä..'),'crumb');
  assert.equal(livianMietintaEle('Pieni hetki, arkiston hyllyt ovat minua korkeammalla..'),'peek');
  assert.equal(livianMietintaEle('Sopiva kysymys minulle. Hetki, tarkistan etten muista väärin..'),'think');
});

test('valittu B-kuvapohja haetaan pelin mediasta', () => {
  assert.equal(LIVIAN_KASVOKUVA,'https://media.matkakirja.app/hahmot/livia-kasvot-B-r20260909-v1.png');
});
