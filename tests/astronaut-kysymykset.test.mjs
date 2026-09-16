import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { SATELLIITTI_KOHTEET } from '../js/linssit/satelliitti-data.js';
import { ASTRONAUTIN_KYSYMYKSET, haeAstronautinKysymykset, haeAstronautinVastaus } from '../js/linssit/astronaut-kysymykset.js';

test('all 64 camera targets have exactly two current-card-compatible questions and grounded answers', () => {
  assert.equal(Object.keys(ASTRONAUTIN_KYSYMYKSET).length, 64);
  for (const target of SATELLIITTI_KOHTEET) {
    const questions = haeAstronautinKysymykset(target.tunnus);
    assert.equal(questions.length, 2, target.tunnus);
    assert.equal(new Set(questions).size, 2);
    for (const question of questions) {
      assert.equal(typeof question, 'string');
      assert.ok(question.length <= 60);
      const result = haeAstronautinVastaus(target.tunnus, question);
      assert.ok(result.vastaus.length > 0);
      assert.ok(result.lahteet.length > 0);
      assert.ok(target.havainnot.some(image => image.id === result.havaintoId));
    }
  }
});
test('unknown targets/questions stay empty, and returned cards are safe to change locally', () => {
  assert.deepEqual(haeAstronautinKysymykset('missing'), []);
  assert.equal(haeAstronautinVastaus('etna', 'not a prepared question'), null);
  assert.equal(haeAstronautinVastaus('etna', null), null);
  assert.equal(haeAstronautinVastaus('__proto__', 'test'), null);
  const question = haeAstronautinKysymykset('etna')[0];
  const answer = haeAstronautinVastaus('etna', question);
  answer.vastaus = 'changed'; answer.lahteet[0].title = 'changed';
  assert.notEqual(haeAstronautinVastaus('etna', question).vastaus, 'changed');
  assert.notEqual(haeAstronautinVastaus('etna', question).lahteet[0].title, 'changed');
});
test('runtime text matches validated, reviewed delivery source exactly', () => {
  execFileSync(process.execPath, ['tools/astronaut/build-questions.mjs', '--check'], { cwd: new URL('../', import.meta.url), stdio: 'pipe' });
});
