// Valokuvakysymysten nimeäminen Tietoja-sivulla (omistaja 13.11.2026 klo 13.09: kuvalähde ei näy tehtävässä;
// KK 13.17: jokaisen CC BY / BY-SA -kuvan nimeämisrivi on Lähteet-luettelossa). Kysymysten kuvat samalla
// valinnalla kuin tools/vienti/kokoelmat.mjs kysymyskuvaKokoelmat.
import test from 'node:test';
import assert from 'node:assert/strict';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { KAIKKI_VALOKUVAT, EI_VALOKUVAKYSYMYKSEEN } from '../js/sisaltotaulut.js';
import { LAHTEET, kysymyskuvanRivi } from '../js/lahteet.js';

test('jokaisella nimeämistä vaativalla kuvakysymyksellä on rivi Lähteet-luettelossa', () => {
  const huomit = new Set(LAHTEET.flatMap((r) => r.rivit).map((r) => r.huom));
  let kuvia = 0, nimettavia = 0;
  const puuttuu = [];
  for (const c of MAAILMANKARTTA.cities) {
    if (EI_VALOKUVAKYSYMYKSEEN.has(c.id)) continue;
    const v = KAIKKI_VALOKUVAT[c.id];
    const kuva = v?.uusi?.tiedosto ? v.uusi : v;
    if (!kuva?.tiedosto) continue;
    kuvia++;
    if (!/\bCC BY\b/.test(kuva.lahde ?? '')) continue;
    nimettavia++;
    if (!huomit.has(`Wikimedia Commons: ${kuva.tiedosto}`)) puuttuu.push(`${c.id}: ${kuva.tiedosto} (${kuva.lahde})`);
  }
  assert.ok(kuvia > 200 && nimettavia > 100, `kuvia ${kuvia}, nimettäviä ${nimettavia}`);
  assert.deepEqual(puuttuu, []);
});

test('kysymyskuvan rivi: tekijä ilman Commons-mainintaa, lisenssi erikseen; PD ja CC0 ohitetaan', () => {
  assert.deepEqual(kysymyskuvanRivi('lontoo', { tiedosto: 'a.jpg', lyhyt: 'Silta', lahde: 'Arild Vågen, Commons (CC BY-SA 3.0)' }),
    { nimi: 'Silta', tekija: 'Arild Vågen', lisenssi: 'CC BY-SA 3.0', huom: 'Wikimedia Commons: a.jpg' });
  assert.equal(kysymyskuvanRivi('x', { tiedosto: 'b.jpg', lahde: 'Commonsin käyttäjä Mrsoethuaung (CC BY 4.0)' }).tekija, 'Mrsoethuaung');
  assert.equal(kysymyskuvanRivi('x', { tiedosto: 'c.jpg', lahde: 'JarrahTree, Commons (CC BY 2.5 AU)' }).lisenssi, 'CC BY 2.5 AU');
  assert.equal(kysymyskuvanRivi('x', { tiedosto: 'd.jpg', lahde: 'Tuntematon, Commons (PD)' }), null);
  assert.equal(kysymyskuvanRivi('x', { tiedosto: 'e.jpg', lahde: 'Joku, Commons (CC0)' }), null);
});
