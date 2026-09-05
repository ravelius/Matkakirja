/*
 * IHMISEN MATKA -AINEISTOPAKKA.
 *
 * Aikajanan aineisto rikkoutuu hiljaa: pysäkki putoaa pois, ajoitus
 * kirjoitetaan väärään muotoon, koordinaatti menee väärään pallon
 * puoliskoon tai lähde unohtuu. Nämä testit vartioivat juuri niitä
 * kohtia, joita ihmissilmä ei huomaa taulua selatessa.
 *
 * Kaksi sääntöä on tarinallista eikä teknistä, ja siksi ne on
 * kirjattu tänne: ajat sanotaan "vuotta sitten" (ei eKr.), ja taulu
 * on aikajärjestyksessä vanhimmasta nuorimpaan riippumatta siitä,
 * missä järjestyksessä pysäkit alun perin listattiin.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  IHMISEN_MATKA, IHMISEN_MATKA_KUVAJUURI,
  IHMISEN_MATKA_ESITTELY, IHMISEN_MATKA_ALOITUS, IHMISEN_MATKA_LOPPU,
} from '../js/linssit/ihmisen-matka-data.js';

/** Fablen pysäkkilista 5.9.2026 — tunnukset eivät muutu, järjestys on ajan. */
const TUNNUKSET = [
  'jebel-irhoud', 'omo-kibish', 'pinnacle-point', 'skhul-qafzeh', 'al-wusta',
  'blombos', 'lida-ajer', 'madjedbebe', 'denisova', 'bacho-kiro',
  'lake-mungo', 'tianyuan', 'niah', 'chauvet', 'yana',
  'white-sands', 'beringia', 'monte-verde', 'lapita', 'aotearoa',
];

/*
 * Kuvaputken toimitus 5.9.2026: kuvatekstit kopioitiin kuittauksesta
 * sanasta sanaan, joten niitä ei saa "siistiä" — myös Chauvet'n
 * kaareva heittomerkki on kuvaputken oma.
 */
const KUVATEKSTIT = {
  'jebel-irhoud': 'Jebel Irhoud, noin 300 000 vuotta sitten',
  'omo-kibish': 'Omo Kibish, noin 230 000 vuotta sitten',
  'pinnacle-point': 'Pinnacle Point, noin 160 000 vuotta sitten',
  blombos: 'Blombos, noin 75 000 vuotta sitten',
  'skhul-qafzeh': 'Qafzeh, noin 100 000 vuotta sitten',
  'al-wusta': 'Al Wusta, noin 85 000 vuotta sitten',
  'lida-ajer': 'Lida Ajer, noin 70 000 vuotta sitten',
  denisova: 'Denisovan luola, noin 50 000 vuotta sitten',
  madjedbebe: 'Madjedbebe, noin 65 000–50 000 vuotta sitten',
  'lake-mungo': 'Lake Mungo, noin 42 000 vuotta sitten',
  niah: 'Niahin luola, noin 40 000 vuotta sitten',
  'bacho-kiro': 'Bacho Kiro, noin 45 000 vuotta sitten',
  chauvet: 'Chauvet’n luola, noin 36 000 vuotta sitten',
  yana: 'Yana, noin 32 000 vuotta sitten',
  tianyuan: 'Tianyuan, noin 40 000 vuotta sitten',
  beringia: 'Beringia, noin 20 000 vuotta sitten',
  'white-sands': 'White Sands, noin 23 000–21 000 vuotta sitten',
  'monte-verde': 'Monte Verde, noin 14 500 vuotta sitten',
  lapita: 'Lapita, Tonga ja Samoa, noin 3 000 vuotta sitten',
  aotearoa: 'Aotearoa, noin 1250–1300 jaa.',
};

test('kaaressa on kaksikymmentä pysäkkiä, tunnukset Fablen listasta', () => {
  assert.equal(IHMISEN_MATKA.length, 20);
  assert.deepEqual(IHMISEN_MATKA.map((p) => p.tunnus), TUNNUKSET);
  // Numerointi on juokseva: pysäkkiä ei voi poistaa numeroimatta uudelleen.
  IHMISEN_MATKA.forEach((p, i) => assert.equal(p.n, i + 1, `pysäkin ${p.tunnus} numero`));
});

test('taulu on aikajärjestyksessä vanhimmasta nuorimpaan', () => {
  for (let i = 1; i < IHMISEN_MATKA.length; i += 1) {
    const edellinen = IHMISEN_MATKA[i - 1];
    const nykyinen = IHMISEN_MATKA[i];
    assert.ok(nykyinen.vuosiaSitten < edellinen.vuosiaSitten,
      `${nykyinen.tunnus} (${nykyinen.vuosiaSitten}) ei ole nuorempi kuin `
      + `${edellinen.tunnus} (${edellinen.vuosiaSitten}) — järjestä taulu ajan mukaan.`);
  }
  assert.equal(IHMISEN_MATKA[0].vuosiaSitten, 300000);
  assert.ok(IHMISEN_MATKA[19].vuosiaSitten < 1000);
});

test('ajat sanotaan vuotta sitten, ei eKr.', () => {
  // Kaikki pelaajalle näkyvä teksti: pysäkkien kentät ja kehystekstit.
  // (Tiedoston oma ohjekommentti saa sanan mainita — se ei näy pelissä.)
  const tekstit = [IHMISEN_MATKA_ESITTELY, IHMISEN_MATKA_ALOITUS, IHMISEN_MATKA_LOPPU];
  const kerää = (arvo) => {
    if (typeof arvo === 'string') tekstit.push(arvo);
    else if (arvo && typeof arvo === 'object') Object.values(arvo).forEach(kerää);
  };
  IHMISEN_MATKA.forEach(kerää);
  for (const teksti of tekstit) {
    assert.ok(!/eKr/.test(teksti),
      `teksti sisältää "eKr.": ${teksti.slice(0, 60)}… — ajat sanotaan "vuotta sitten".`);
  }
  for (const p of IHMISEN_MATKA) {
    const viimeinen = p.tunnus === 'aotearoa';
    assert.ok(viimeinen ? /jaa\./.test(p.ajoitus) : /vuotta sitten$/.test(p.ajoitus),
      `${p.tunnus}: ajoitus "${p.ajoitus}" ei ole odotetussa muodossa.`);
    // Näytettävä haarukka ja järjestysluku eivät saa olla eri maailmoista.
    const luvut = [...p.ajoitus.matchAll(/\d[\d  ]*/g)]
      .map((m) => Number(m[0].replace(/[  ]/g, '')))
      .filter((x) => x >= 1000);
    if (luvut.length && !viimeinen) {
      const pieni = Math.min(...luvut) * 0.8;
      const iso = Math.max(...luvut) * 1.2;
      assert.ok(p.vuosiaSitten >= pieni && p.vuosiaSitten <= iso,
        `${p.tunnus}: vuosiaSitten ${p.vuosiaSitten} on kaukana ajoituksesta "${p.ajoitus}".`);
    }
  }
});

test('koordinaatit ovat rajoissa ja neljän desimaalin tarkkuudella', () => {
  for (const p of IHMISEN_MATKA) {
    assert.equal(typeof p.lat, 'number', `${p.tunnus}: lat puuttuu`);
    assert.equal(typeof p.lon, 'number', `${p.tunnus}: lon puuttuu`);
    assert.ok(p.lat >= -90 && p.lat <= 90, `${p.tunnus}: lat ${p.lat} rajojen ulkopuolella`);
    assert.ok(p.lon >= -180 && p.lon <= 180, `${p.tunnus}: lon ${p.lon} rajojen ulkopuolella`);
    assert.notEqual(`${p.lat},${p.lon}`, '0,0', `${p.tunnus}: koordinaatti on nollasaari`);
    for (const arvo of [p.lat, p.lon]) {
      const desimaalit = (String(arvo).split('.')[1] ?? '').length;
      assert.ok(desimaalit <= 4, `${p.tunnus}: ${arvo} on tarkempi kuin neljä desimaalia`);
    }
  }
  // Kaari kiertää maapallon: molemmat pallonpuoliskot ovat mukana.
  assert.ok(IHMISEN_MATKA.some((p) => p.lon < -70), 'kaaresta puuttuu Amerikka');
  assert.ok(IHMISEN_MATKA.some((p) => p.lon > 130), 'kaaresta puuttuu Tyynenmeren laita');
});

test('jokaisella pysäkillä on kaikki kentät ja lähde', () => {
  for (const p of IHMISEN_MATKA) {
    for (const kentta of ['otsikko', 'paikka', 'maa', 'loyto', 'selite', 'juttu', 'lahde']) {
      assert.equal(typeof p[kentta], 'string', `${p.tunnus}: ${kentta} puuttuu`);
      assert.ok(p[kentta].trim().length > 0, `${p.tunnus}: ${kentta} on tyhjä`);
    }
    assert.ok(/^en-Wikipedia "/.test(p.lahde),
      `${p.tunnus}: lähde "${p.lahde}" ei nimeä Wikipedia-artikkelia.`);
    // Tiedeliitteen teksti on kaksi kappaletta ja mitoitettu.
    const kappaleet = p.juttu.split('\n\n');
    assert.equal(kappaleet.length, 2, `${p.tunnus}: jutussa on oltava kaksi kappaletta`);
    assert.ok(p.juttu.length >= 900 && p.juttu.length <= 1250,
      `${p.tunnus}: juttu on ${p.juttu.length} merkkiä (tavoite 900–1 200).`);
    // Selite on lyhyt havainnekuvan rivi, ei toinen juttu.
    assert.ok(p.selite.length <= 320, `${p.tunnus}: selite on liian pitkä (${p.selite.length})`);
  }
});

test('kuvakentät osoittavat kuvajuureen ja kantavat kuvaputken tekstit', () => {
  for (const p of IHMISEN_MATKA) {
    assert.equal(p.kuva.osoite, `${IHMISEN_MATKA_KUVAJUURI}/${p.tunnus}.jpg`);
    assert.equal(p.esine.osoite, `${IHMISEN_MATKA_KUVAJUURI}/esine/${p.tunnus}.jpg`);
    assert.equal(p.kuva.lahde, 'Matkakirjan havainnekuva');
    assert.equal(p.esine.lahde, 'Matkakirjan havainnekuva');
    // Havainnekuvan selite on pysäkin selite — yksi teksti, ei kaksi.
    assert.equal(p.kuva.selite, p.selite, `${p.tunnus}: kuvan selite on erkaantunut`);
    // Kuvaputken kuvarivi sanasta sanaan.
    assert.equal(p.kuva.kuvateksti, KUVATEKSTIT[p.tunnus], `${p.tunnus}: kuvateksti muuttunut`);
    assert.ok(p.esine.selite.trim().length > 0, `${p.tunnus}: esineen selite puuttuu`);
    // Commons-kuva on joko tarkistettu tiedosto tai rehellisesti null.
    assert.ok(p.esineAito === null || typeof p.esineAito.tiedosto === 'string',
      `${p.tunnus}: esineAito on jotain muuta kuin null tai { tiedosto, selite }`);
  }
});

test('kehystekstit ovat olemassa ja loppusanat sitovat kaaren Foggiin', () => {
  for (const teksti of [IHMISEN_MATKA_ESITTELY, IHMISEN_MATKA_ALOITUS, IHMISEN_MATKA_LOPPU]) {
    assert.equal(typeof teksti, 'string');
    assert.ok(teksti.length > 120, 'kehysteksti on liian lyhyt');
  }
  assert.ok(/Fogg/.test(IHMISEN_MATKA_LOPPU),
    'loppusanojen viimeinen ajatus on: ihminen kiersi maapallon kerran jo — kuten Fogg.');
});
