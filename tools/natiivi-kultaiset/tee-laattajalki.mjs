// KULTAINEN LAATTAJÄLKI: verkkopelin js/tokens.js + js/game.js (enterWorld,
// jaaLaatat, revealToken, lukitseAarre) luovat ja kääntävät laatat usealla
// siemenellä; tulos kirjataan tiedostoon Kultaiset/laattajalki.json.
// C#-portti (Peli/Laatat.cs) toistaa saman testissä Testit/LaattaTestit.cs
// ja vaatii identtisen jäljen — erityisesti RNG-kutsujen määrän pelin
// luonnissa (matkajäljen 'rngAlussa' = laattojen jako).
//
// Lisäksi kirjoitetaan Kultaiset/paketti/laatat.json: laudan laattamäärät
// (pack.tokens.counts) samassa muodossa kuin sisältöpaketin moduulissa
// moduulit/js/packs/maailmankartta.json (exportit.MAAILMANKARTTA.tokens).
//
// Käyttö: node Kultaiset/tee-laattajalki.mjs [verkkopelin js-kansio]
//
// RAJAUKSET:
// - Linssi aarteen kylkiäisenä (linssiAarteenKylkiaisena) kytketään pois
//   (g.linssiAarteet = {}): se lukee laitteen passia (localStorage) ja voi
//   maksaa optikon hyvityksen. C#:ssa se on Matkan koukku löydön jälkeen.
// - checkWin ajetaan webissä, mutta se ei kuluta satunnaisuutta eikä
//   muuta laattoja (C#: Matkan vastuulla).
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const tama = dirname(fileURLToPath(import.meta.url));
const JS = resolve(process.argv[2] ?? '/Users/Shared/Claude/Matkakirja-pelikoodari/js');
const { Game } = await import(pathToFileURL(join(JS, 'game.js')).href);
const { packById } = await import(pathToFileURL(join(JS, 'pack.js')).href);

const pack = packById('maailmankartta');
if (pack.id !== 'maailmankartta') throw new Error('maailmankartta puuttuu');

// Koelauta: sama kartta, mutta ylimääräisiä pääaarteita (rosvolaatat on poistettu pelistä) (jaaLaatat-funktion aloituskaupunkivaihto).
// Pinon koko pysyy kaupunkien määrässä (266).
const KOE_MAARAT = { star: 20, mannerAarre: 7, isoAarre: 82, pieniAarre: 157 };
const koepaketti = { ...pack, tokens: { ...pack.tokens, counts: KOE_MAARAT } };

// Enter­Worldin jälkeinen kutsumäärä talteen (jako erikseen konstruktorista).
let rngJaonJalkeen = null;
const alkuperainenEnterWorld = Game.prototype.enterWorld;
Game.prototype.enterWorld = function (p) {
  const w = alkuperainenEnterWorld.call(this, p);
  rngJaonJalkeen = this.rngCalls;
  return w;
};

const kaupungit = pack.cities.map((c) => c.id);
const manner = (id) => pack.map.cityManner?.[id] ?? pack.id;

const AJOT = [
  { seed: 1, start: 'pariisi' },
  { seed: 7, start: 'pariisi', lukitse: 2 },
  { seed: 42, start: 'lontoo' },
  { seed: 2026, start: 'istanbul' },
  { seed: 99, start: 'tokio' },
  { seed: 13, start: 'manila' },
  { seed: 4294967295, start: 'dublin' },
  { seed: 5, start: 'kapkaupunki', pollo: 'star' },     // pöllö korvaa pääaarteen → siirto
  { seed: 11, start: 'newyork', pollo: 'muu' },          // pöllö korvaa paikallisaarteen
  { seed: 3, start: 'pariisi', koe: true, lukitse: 3 },
  { seed: 8, start: 'sydney', koe: true },
  { seed: 77, start: 'pariisi', kaksi: true },           // moninpeli: ei vaellusta, ei palkkiota
];

const jarj = (m) => [...m.entries()];

const jaljet = [];
for (const ajo of AJOT) {
  const { seed, start, pollo = null, koe = false, kaksi = false, lukitse = 0 } = ajo;
  const players = [{ name: 'Fogg', color: '#c9a227', start }];
  if (kaksi) players.push({ name: 'Passepartout', color: '#3a6ea5', start: 'lontoo' });
  rngJaonJalkeen = null;
  const g = new Game({ players, pack: koe ? koepaketti : pack, seed, polloAarteena: !!pollo });
  g.linssiAarteet = {};
  const rngLuonnissa = g.rngCalls;
  const tokens = g.world.tokens;
  const laatat = jarj(tokens);
  const tahdet = laatat.filter(([, t]) => t === 'star').map(([c]) => c);
  const mannerAarteet = laatat.filter(([, t]) => t === 'mannerAarre').map(([c]) => c);

  // Käännettävät kaupungit deterministisesti: kaksi pääaarretta, kaksi
  // mantereen aarretta ja askelin 37 kaupunkilistasta.
  // Pöllöajossa ensimmäinen on valitun lajin laatta.
  const valinta = [];
  const lisaa = (c) => { if (c && !valinta.includes(c)) valinta.push(c); };
  if (pollo === 'star') lisaa(tahdet[0]);
  if (pollo === 'muu') lisaa(laatat.find(([, t]) => t === 'pieniAarre')[0]);
  for (let i = 0; valinta.length < 20; i++) {
    if (i === 1) { lisaa(tahdet[1]); lisaa(mannerAarteet[0]); }
    if (i === 3) { lisaa(tahdet[2]); lisaa(mannerAarteet[3]); }
    lisaa(kaupungit[(seed + i * 37) % kaupungit.length]);
  }
  // Toisen kerran käännetty kaupunki: tyhjä tulos, ei arvontaa.
  valinta.push(valinta[2]);

  const p = g.player;
  const alku = { raha: p.money, tahdet: p.stars, xp: p.xp };
  const kaannot = [];
  for (const city of valinta) {
    const ennen = g.rngCalls;
    g.viimeAarre = null;
    const tulos = g.revealToken(city);
    kaannot.push({
      kaupunki: city,
      tulos,
      arvo: g.viimeAarre?.arvo ?? null,
      raha: p.money,
      tahdet: p.stars,
      xp: p.xp,
      starsFound: jarj(g.world.starsFound),
      polloLoydetty: g.polloLoydetty,
      rngKaanto: g.rngCalls - ennen,
      rngCalls: g.rngCalls,
      laattoja: g.world.tokens.size,
    });
  }

  // Lukitus (lukitseAarre): mantereen aarre ja pääaarre siirtyvät.
  const lukot = [];
  if (lukitse) {
    const jaljella = jarj(g.world.tokens);
    const kohteet = [
      jaljella.find(([, t]) => t === 'mannerAarre')?.[0],
      jaljella.find(([, t]) => t === 'star')?.[0],
      jaljella.find(([, t]) => t === 'pieniAarre')?.[0],
    ].filter(Boolean).slice(0, lukitse);
    for (const city of kohteet) {
      const ennen = g.rngCalls;
      const tyyppi = g.world.tokens.get(city);
      g.lukitseAarre(city);
      lukot.push({ kaupunki: city, tyyppi, rngLukitus: g.rngCalls - ennen, rngCalls: g.rngCalls });
    }
  }

  jaljet.push({
    seed, start, pollo, koe, kaksi, vaellus: g.roaming,
    maarat: Object.entries(koe ? KOE_MAARAT : pack.tokens.counts),
    rngJaonJalkeen,
    rngLuonnissa,
    alku,
    laatat,
    tahdet: tahdet.map((c) => [manner(c), c]),
    mannerAarteet: mannerAarteet.map((c) => [manner(c), c]),
    kaannot,
    lukot,
    lopuksi: {
      laatat: jarj(g.world.tokens),
      revealed: jarj(g.world.revealed),
      finds: p.finds,
      findManner: p.findManner,
      findMaa: p.findMaa,
    },
  });
}

// Tarkistus: C# lukee löydön mantereen ja maan paketin kaupungeista
// (manner, maa), web laudan cityManner/cityCountry-tauluista. Niiden on
// oltava samat (jerusalemilla ei ole maata kummassakaan).
const { readFileSync } = await import('node:fs');
const paketinKaupungit = JSON.parse(readFileSync(join(tama, 'paketti', 'kaupungit.json'), 'utf8')).alkiot;
paketinKaupungit.forEach((c, i) => {
  if (pack.cities[i]?.id !== c.id) throw new Error(`kaupunkijärjestys eroaa kohdassa ${i}`);
  if ((pack.map.cityManner?.[c.id] ?? null) !== (c.manner ?? null)) throw new Error(`manner eroaa: ${c.id}`);
  if ((pack.map.cityCountry?.[c.id] ?? null) !== (c.maa ?? null)) throw new Error(`maa eroaa: ${c.id}`);
  if (!!pack.cities[i].start !== !!c.aloitus) throw new Error(`aloitus eroaa: ${c.id}`);
});

const kannot = jaljet.reduce((s, j) => s + j.kaannot.length, 0);
writeFileSync(join(tama, 'laattajalki.json'), JSON.stringify({
  $kuvaus: 'Verkkopelin laattajako ja -käännöt (Kultaiset/tee-laattajalki.mjs). Älä muokkaa käsin.',
  lauta: 'maailmankartta',
  jaljet,
}) + '\n');

mkdirSync(join(tama, 'paketti'), { recursive: true });
writeFileSync(join(tama, 'paketti', 'laatat.json'), JSON.stringify({
  $kuvaus: 'Laudan laattamäärät (js/packs/maailmankartta.js tokens.counts), sama muoto kuin '
    + 'sisältöpaketin moduulissa moduulit/js/packs/maailmankartta.json exportit.MAAILMANKARTTA.tokens. '
    + 'Kultaiset/tee-laattajalki.mjs. Älä muokkaa käsin.',
  lahde: 'js/packs/maailmankartta.js#MAAILMANKARTTA.tokens.counts',
  lauta: pack.id,
  counts: pack.tokens.counts,
}, null, 1) + '\n');

console.log(`laattajalki.json: ${jaljet.length} ajoa, ${kannot} käännöstä, rngLuonnissa`,
  jaljet.map((j) => j.rngLuonnissa).join(','));
