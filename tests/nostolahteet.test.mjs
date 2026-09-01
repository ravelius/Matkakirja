/*
 * NOSTOKORTTIEN LÄHDERIVI — jokaisella kartan tarinanostolla on lähde.
 *
 * Perustuslain totuudellisuuspilari (Raamattu): kortti esittää
 * tarkistettuja faktaväitteitä, ja pelaajan on nähtävä, mistä ne ovat.
 * Nostoaudit 1.9.2026 löysi kolme kokonaista perhettä ilman
 * `lahde`-kenttää — syvennystarinat, skandaalit ja eläintäyt, yhteensä
 * 232 korttia — ja kaksi täkynostoa. Puute korjattiin; tämä testi estää
 * sen palaamisen, koska yksi uusi kortti ilman lähdettä ei näy missään
 * muualla kuin siinä, mitä kortti jättää sanomatta.
 *
 * NELJÄ PERHETTÄ, YKSI SÄÄNTÖ. Kaikki neljä latovat kortin lähderivin
 * samalla luokalla (`fokusnosto-lahde`, css/fokusnosto.css) samaan
 * kohtaan tekstin jälkeen: js/fokusnosto.js piirraNostonSisus,
 * js/syvennys.js piirraSyvennysSisus, js/skandaalit.js
 * piirraSkandaalinSisus ja js/elaintaky.js avaaElaintaky. Rivi piirtyy
 * vain jos kentässä on tekstiä, joten tyhjä lahde on sama kuin ei
 * lähdettä lainkaan — siksi testi vaatii ei-tyhjän merkkijonon.
 *
 * MAASTOKOHTEET JA FOKUSKOHTEET EIVÄT OLE TÄSSÄ: niillä lähde on ollut
 * alusta asti (nostoaudit: 197/197 ja 238/238), ja niiden aineiston
 * vartija on tests/fokuspohjat.test.mjs. Kreikan maapooli (js/fokusnosto.js
 * NOSTO_MAAT) jää myös ulos, koska se asuu selainmoduulissa eikä
 * paketissa; sen neljällä nostolla on lähde, ja silmä riittää neljään.
 *
 * MITÄ TESTI EI TARKISTA: onko lähde oikea. Sitä ei voi mitata
 * koneellisesti — tarkistus tehdään aineistoa kirjoitettaessa ja
 * kirjataan kortin kommenttiin. Kone valvoo vain, ettei kenttä katoa.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';
import { SKANDAALIT } from '../js/packs/skandaalit.js';
import { ELAINTAKYT } from '../js/packs/elaintakyt.js';

/** Kortit perheittäin: [perhe, tunnus, kortti]. */
function keraaKortit() {
  const rivit = [];
  for (const [cityId, virta] of Object.entries(FOKUSVIRRAT)) {
    for (const taky of virta.takyt ?? []) rivit.push(['syvennys', `${cityId}/${taky.id}`, taky]);
    for (const nosto of virta.takynostot ?? []) rivit.push(['täkynosto', `${cityId}/${nosto.id}`, nosto]);
  }
  for (const [iso, lista] of Object.entries(SKANDAALIT)) {
    for (const skandaali of lista) rivit.push(['skandaali', `${iso}/${skandaali.id}`, skandaali]);
  }
  for (const [iso, taky] of Object.entries(ELAINTAKYT)) rivit.push(['eläintäky', iso, taky]);
  return rivit;
}

test('jokaisella syvennyksellä, skandaalilla, eläintäyllä ja täkynostolla on lähderivi', () => {
  const kortit = keraaKortit();
  const puuttuu = kortit.filter(([, , kortti]) => typeof kortti.lahde !== 'string' || !kortti.lahde.trim());
  assert.deepEqual(puuttuu.map(([perhe, tunnus]) => `${perhe} ${tunnus}`), [],
    'lähderivi puuttuu — kortti esittää faktaväitteitä kertomatta, mistä ne ovat');
});

test('lähderivi nimeää lähteen eikä ole täytettä', () => {
  for (const [perhe, tunnus, kortti] of keraaKortit()) {
    const lahde = kortti.lahde;
    const nimi = `${perhe} ${tunnus}`;
    assert.ok(lahde.length >= 12, `${nimi}: lähderivi "${lahde}" on liian lyhyt ollakseen lähde`);
    // Lähde on joko nimetty ulkoinen lähde tai pelin oma tarkistettu
    // aineisto polkuna — kumpikin on jäljitettävissä, "tarkistettu"
    // yksinään ei ole.
    assert.match(lahde, /Wikipedia|wikipedia\.org|js\/packs\/|docs\//,
      `${nimi}: lähderivi "${lahde}" ei nimeä lähdettä`);
  }
});

/*
 * ALARAJA EIKÄ TARKKA LUKU: aineisto kasvaa erä kerrallaan, eikä uusi
 * kortti saa kaataa tätä testiä. Luvut ovat 1.9.2026 tilanne, ja ne ovat
 * täällä vain sen varalta, että perhe katoaisi kokonaan — silloin
 * lähdetarkistus menisi läpi tyhjällä joukolla eikä vartioisi mitään.
 */
test('jokaisesta perheestä löytyy kortteja (tyhjä joukko ei vartioi mitään)', () => {
  const laskuri = {};
  for (const [perhe] of keraaKortit()) laskuri[perhe] = (laskuri[perhe] ?? 0) + 1;
  for (const [perhe, alaraja] of [['syvennys', 118], ['täkynosto', 59], ['skandaali', 83], ['eläintäky', 29]]) {
    assert.ok((laskuri[perhe] ?? 0) >= alaraja,
      `${perhe}: kortteja on ${laskuri[perhe] ?? 0}, oli 1.9.2026 ${alaraja} — katosiko aineistoa?`);
  }
});
