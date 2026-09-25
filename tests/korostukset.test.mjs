/*
 * ALLEVIIVATUT SANAT — jokainen korostus on löydyttävä kortin tekstistä.
 *
 * Kohdekortin `korostukset`-lista on muotoa `'perusmuoto|näkyvä muoto'`
 * (js/fokuskohteet.js puraKorostus). Piirto etsii NÄKYVÄN muodon kortin
 * kappaleista osamerkkijonona, kirjainkoosta piittaamatta
 * (piirraKohdeKappale), ja alleviivaa löytämänsä kohdan. Jos näkyvää
 * muotoa ei ole tekstissä, mitään ei tapahdu: sana jää alleviivaamatta,
 * pelaaja ei saa Pulu-nappia eikä mikään kaadu — vika on täysin hiljainen.
 *
 * Juuri siksi tämä testi on olemassa. Nostoaudit 1.9.2026 (tehtävä #108)
 * epäili kolmea riviä; koneellinen tarkistus löysi 48 rikkinäistä
 * korostusta 484:stä eli joka kymmenennen. Tyypillinen vika oli väärä
 * sijamuoto ('Tatrat|Tatroilla', kun tekstissä lukee "Tatrojen") tai
 * sana, jota tekstiin ei koskaan kirjoitettu ('Kornatit', 'Lario').
 * Kaikki korjattiin erässä 3B, ja tämä testi estää paluun.
 *
 * KAKSI PERHETTÄ, KOSKA MEKANISMI ON VAIN NIILLÄ. Korostukset piirtää
 * js/fokuskohteet.js piirraKohdeTeksti, jonka kautta kulkevat vain
 * fokuskohteet (js/packs/fokuskohteet-<iso>.js) ja maastokohteet
 * (js/packs/maastokohteet.js). Syvennykset, skandaalit, eläintäyt ja
 * täkynostot latovat tekstinsä itse eivätkä lue kenttää lainkaan —
 * siksi viimeinen testi vaatii, ettei niille ole vahingossa kirjoitettu
 * korostuksia, jotka eivät piirtyisi mihinkään.
 *
 * MITÄ TESTI EI TARKISTA: onko korostettu sana hyvä valinta. Sen
 * ratkaisee toimittaja. Kone valvoo vain, että sana on olemassa.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import { MAASTOKOHTEET } from '../js/packs/maastokohteet.js';
import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';
import { SKANDAALIT } from '../js/packs/skandaalit.js';
import { ELAINTAKYT } from '../js/packs/elaintakyt.js';

const PACKS = path.join(import.meta.dirname, '..', 'js', 'packs');

/** Kaikki kohteet, joilla korostusmekanismi on: [tunnus, kohde]. */
async function keraaKohteet() {
  const rivit = [];
  for (const [iso, lista] of Object.entries(MAASTOKOHTEET)) {
    for (const kohde of lista) rivit.push([`maasto ${iso}/${kohde.id}`, kohde]);
  }
  const tiedostot = fs.readdirSync(PACKS)
    .filter((f) => /^fokuskohteet-[a-z]{3}\.js$/.test(f)).sort();
  for (const tiedosto of tiedostot) {
    const iso = tiedosto.slice('fokuskohteet-'.length, -'.js'.length).toUpperCase();
    const moduuli = await import(`../js/packs/${tiedosto}`);
    const lista = moduuli[`FOKUSKOHTEET_${iso}`];
    if (!Array.isArray(lista)) continue;
    for (const kohde of lista) rivit.push([`fokus ${iso}/${kohde.id}`, kohde]);
  }
  return rivit;
}

/** Sama purku kuin js/fokuskohteet.js puraKorostus. */
function puraKorostus(merkinta) {
  const teksti = String(merkinta ?? '').trim();
  if (!teksti) return null;
  const putki = teksti.indexOf('|');
  if (putki < 0) return { perus: teksti, nakyva: teksti };
  const perus = teksti.slice(0, putki).trim();
  const nakyva = teksti.slice(putki + 1).trim();
  if (!perus || !nakyva) return null;
  return { perus, nakyva };
}

/** Kortin teksti yhtenä pötkönä — kappalejako ei vaikuta hakuun. */
function korttiteksti(kohde) {
  const teksti = kohde.teksti;
  if (Array.isArray(teksti)) return teksti.map((k) => String(k ?? '')).join('\n\n');
  return String(teksti ?? '');
}

test('jokaisen korostuksen näkyvä muoto löytyy kortin tekstistä', async () => {
  const rikki = [];
  for (const [tunnus, kohde] of await keraaKohteet()) {
    const teksti = korttiteksti(kohde).toLowerCase();
    for (const merkinta of (Array.isArray(kohde.korostukset) ? kohde.korostukset : [])) {
      const korostus = puraKorostus(merkinta);
      assert.ok(korostus, `${tunnus}: kelvoton korostusmerkintä ${JSON.stringify(merkinta)}`);
      if (!teksti.includes(korostus.nakyva.toLowerCase())) {
        rikki.push(`${tunnus}: "${merkinta}" — näkyvää muotoa "${korostus.nakyva}" ei ole tekstissä`);
      }
    }
  }
  assert.deepEqual(rikki, [],
    'korostus ei osu tekstiin: sana jää alleviivaamatta eikä Pulu-nappia synny');
});

/*
 * ALARAJA EIKÄ TARKKA LUKU (sama linja kuin tests/nostolahteet.test.mjs):
 * aineisto kasvaa, eikä uusi kortti saa kaataa tätä. Luku on täällä vain
 * sen varalta, että korostukset katoaisivat kokonaan — silloin ylempi
 * testi menisi läpi tyhjällä joukolla eikä vartioisi mitään.
 */
test('korostuksia on aineistossa (tyhjä joukko ei vartioi mitään)', async () => {
  let n = 0;
  for (const [, kohde] of await keraaKohteet()) {
    n += (Array.isArray(kohde.korostukset) ? kohde.korostukset : []).length;
  }
  assert.ok(n >= 480, `korostuksia on ${n}, oli 1.9.2026 484 — katosiko aineistoa?`);
});

test('korostuksia ei ole perheissä, jotka eivät piirrä niitä', () => {
  const vaarassa = [];
  for (const [cityId, virta] of Object.entries(FOKUSVIRRAT)) {
    for (const taky of virta.takyt ?? []) {
      if (taky.korostukset) vaarassa.push(`syvennys ${cityId}/${taky.id}`);
    }
    for (const nosto of virta.takynostot ?? []) {
      if (nosto.korostukset) vaarassa.push(`täkynosto ${cityId}/${nosto.id}`);
    }
  }
  for (const [iso, lista] of Object.entries(SKANDAALIT)) {
    for (const skandaali of lista) {
      if (skandaali.korostukset) vaarassa.push(`skandaali ${iso}/${skandaali.id}`);
    }
  }
  for (const [iso, taky] of Object.entries(ELAINTAKYT)) {
    if (taky.korostukset) vaarassa.push(`eläintäky ${iso}`);
  }
  assert.deepEqual(vaarassa, [],
    'näiden perheiden piirto ei lue korostuksia — kenttä olisi kuollutta dataa');
});
