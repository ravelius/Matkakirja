// KULTAINEN SÄHKEJÄLKI: verkkopelin sähkepinnan (js/sahke.js) ja pöllön sähketehtävän
// (js/fokusvirta.js) puhtaat funktiot ajetaan käsikirjoitetuilla syötteillä, ja tulokset kirjataan
// tiedostoon Kultaiset/sahkejalki.json. C#-portti (Scripts/Peli/Sahke.cs, Sahketehtava.cs) toistaa
// saman testissä Testit/SahkeTestit.cs ja vaatii identtisen jäljen.
//
// Käyttö: node Kultaiset/tee-sahkejalki.mjs [verkkopelin js-kansio]
//
// js/sahke.js ei vie sisäisiä funktioitaan ulos, ja se tuo DOM- ja äänimoduuleja. Siksi moduulin
// LÄHDETEKSTI ajetaan tässä new Function -kääreessä ilman import-rivejä: DOM, äänet, fetch, ajastimet,
// localStorage ja Math.random annetaan tynkinä. Math.random on mulberry32 (sama kuin C#:n Satunnainen),
// joten nimimerkkien ja saatteiden arvonta toistuu. fetch kirjaa pyynnön synkronisesti (sahkeKutsu
// kutsuu sitä ennen ensimmäistä awaitia), joten pyyntöjen runko ja polku ovat jäljessä sellaisinaan.
// fokusvirta.js:n viedyt funktiot tuodaan suoraan; aukkoOsuu ja ohilyonninSahke poimitaan lähteestä.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const tama = dirname(fileURLToPath(import.meta.url));
const JS = resolve(process.argv[2] ?? '/Users/Shared/Claude/Matkakirja-pelikoodari/js');
const tuo = (nimi) => import(pathToFileURL(join(JS, nimi)).href);
const { mulberry32 } = await tuo('game.js');
const fokus = await tuo('fokusvirta.js');
const { FOKUSVIRRAT } = await tuo('packs/fokusvirrat.js');

// --- sahke.js lähdetekstinä ---------------------------------------------------

const lahde = readFileSync(join(JS, 'sahke.js'), 'utf8')
  .replace(/^import .*;$/gm, '')
  .replace(/^export /gm, '');
const muisti = new Map();
const localStorage = {
  getItem: (k) => (muisti.has(k) ? muisti.get(k) : null),
  setItem: (k, v) => { muisti.set(k, String(v)); },
  removeItem: (k) => { muisti.delete(k); },
};
let pyynnot = [];
const fetch = (url, { method = 'GET', body } = {}) => {
  pyynnot.push({ metodi: method, polku: url.slice(OSOITE.length), runko: body ?? null });
  return new Promise(() => {}); // ei koskaan valmistu: vain pyynnön muoto kirjataan
};
let arpa = mulberry32(1);
const MathTynka = Object.create(Math);
MathTynka.random = () => arpa();
const tynka = () => {};
const s = new Function('sfx', 'html', 'startQuizTimer', 'stopQuizTimer', 'KAVERIAPU_HINTA', 'localStorage',
  'fetch', 'setTimeout', 'clearTimeout', 'console', 'document', 'Math', `${lahde}
  return { SAHKE_OSOITE, SAHKE_ADJEKTIIVIT, SAHKE_SUBSTANTIIVIT, sahkeArvoNimi, sahkeArvoNimet,
    SAHKE_KOODIN_MERKIT, SAHKE_KOODIN_PITUUS, sahkeSiistiKoodi, SAHKE_POHJAT, sahkePohja, sahkeTeksti,
    SAHKE_SAATTEET, SAHKE_APUPYYNNON_SAATE, sahkeVeikkauksenSaate, sahkeTunnus, sahkeAsetaTunnus,
    sahkeNahdyt, sahkeMerkitseNahdyksi, SAHKE_NAHTYJA_KATTO, sahkeKasitteleTila, sahkeVirstanpylvaat,
    sahkeTila, nollaaSahke, asetaLinja: (x) => { sahkeLinja = x; },
    sahkeLuoRetkikunta, sahkeLiityRetkikuntaan, sahkeHaeTila, sahkeLahetaPohja, sahkeLahetaApupyynto,
    sahkeLahetaVeikkaus };`)(
  { play: tynka }, tynka, tynka, tynka, 25, localStorage, fetch, () => 0, tynka,
  { warn: tynka, log: tynka }, undefined, MathTynka);
const OSOITE = s.SAHKE_OSOITE;

// Pieni kaupunkitaulu (id, nimi, maa): sama taulu C#:n nimifunktioksi.
const KAUPUNGIT = [
  ['tukholma', 'Tukholma', 'SWE'], ['goteborg', 'Göteborg', 'SWE'], ['helsinki', 'Helsinki', 'FIN'],
  ['turku', 'Turku', 'FIN'], ['oslo', 'Oslo', 'NOR'], ['berliini', 'Berliini', 'DEU'],
  ['strasse', 'Großstraße', 'DEU'], ['sofia', 'Sofia', 'BGR'], ['tyhja', '', 'EST'],
];
const cityById = new Map(KAUPUNGIT.map(([id, name]) => [id, { id, name }]));
const cityCountry = Object.fromEntries(KAUPUNGIT.map(([id, , maa]) => [id, maa]));
const uiNimet = { game: { board: { cityById } } };

// --- 1. nimimerkit ---------------------------------------------------------
arpa = mulberry32(20260923);
const nimet = [];
for (let i = 0; i < 12; i++) nimet.push({ montako: 3, nimet: s.sahkeArvoNimet(3) });
nimet.push({ montako: 1, nimet: [s.sahkeArvoNimi()] });
nimet.push({ montako: 40, nimet: s.sahkeArvoNimet(40) });
nimet.push({ montako: 3, nimet: s.sahkeArvoNimet(3) });

// --- 2. liittymiskoodi ---------------------------------------------------------
const KOODIT = ['', null, undefined, 'abc234', 'ABC-234', ' k7m 2pq ', 'OIS015', 'ooiiss', 'ABCDEFGHJK',
  'äöå', 'ßtraße', 'ﬀﬁ ﬂ', 'ﬅﬆ', 'ǰ', 'ıi', 'ſs', '\u{1F989}A2', 'a\nb\tc', 'zzzzzzzz', '88888', 'xyzqw4'];
const koodit = KOODIT.map((k) => ({ syote: k ?? null, koodi: s.sahkeSiistiKoodi(k) }));

// --- 3. sähketekstit -------------------------------------------------------------
const pohjaIdt = [...s.SAHKE_POHJAT.map((p) => p.id), 'tuntematon'];
const paikat = ['tukholma', 'goteborg', 'strasse', 'tyhja', 'ei-laudalla', null];
const tekstit = [];
for (const pohjaId of pohjaIdt) for (const paikkaId of paikat) {
  tekstit.push({ pohjaId, paikkaId, teksti: s.sahkeTeksti(uiNimet, pohjaId, paikkaId) });
}
const pohjat = s.SAHKE_POHJAT.map((p) => ({ id: p.id, tyyppi: p.tyyppi, nimi: p.nimi, paikat: p.paikat ?? null }));

// --- 4. laitteen muisti ------------------------------------------------------
const muistijalki = [];
const TUNNUS = 'matkakirja-retkikunta';
const NAHDYT = 'matkakirja-sahke-nahdyt';
const kirjaaMuisti = (vaihe) => muistijalki.push({
  vaihe,
  nahdyt: s.sahkeNahdyt().size,
  nahdytLista: [...s.sahkeNahdyt()],
  tallessa: localStorage.getItem(NAHDYT),
  tunnus: s.sahkeTunnus(),
  tunnusTallessa: localStorage.getItem(TUNNUS),
});
kirjaaMuisti('tyhja');
localStorage.setItem(NAHDYT, 'rikki{');
kirjaaMuisti('rikki');
localStorage.setItem(NAHDYT, '["a",1,"b","a",null]');
kirjaaMuisti('sekalainen');
s.sahkeMerkitseNahdyksi('c', '', 'd');
kirjaaMuisti('merkitse c d');
for (let erä = 0; erä < 7; erä++) {
  s.sahkeMerkitseNahdyksi(...Array.from({ length: 50 }, (_, i) => `x${erä * 50 + i}`));
  kirjaaMuisti(`merkitse erä ${erä}`);
}
const TUNNUSSYOTTEET = ['', 'rikki', '{"koodi":"ABC234"}', '{"koodi":"ABC234","jasenId":"j1","avain":"k1"}',
  '{"koodi":"ABC234","jasenId":"j1","avain":"k1","nimimerkki":"Utelias Ilves"}', '{"koodi":"","jasenId":"j1","avain":"k1"}',
  '[1,2]', 'null'];
const tunnukset = TUNNUSSYOTTEET.map((raaka) => {
  localStorage.setItem(TUNNUS, raaka);
  return { raaka, tunnus: s.sahkeTunnus() };
});
const asetukset = [
  { koodi: 'ABC234', jasenId: 'j1', avain: 'k"1\\', nimimerkki: 'Utelias Ilves' },
  { koodi: 'ABC234', jasenId: 'j1', avain: 'k1' },
  { koodi: 'ABC234', jasenId: '', avain: 'k1', nimimerkki: 'X' },
  null,
].map((t) => {
  localStorage.setItem(TUNNUS, 'vanha');
  s.sahkeAsetaTunnus(t);
  return { asetus: t, tallessa: localStorage.getItem(TUNNUS) };
});

// --- 5. tilan käsittely ------------------------------------------------------
localStorage.removeItem(NAHDYT);
localStorage.setItem(TUNNUS, JSON.stringify({ koodi: 'ABC234', jasenId: 'j-oma', avain: 'k1', nimimerkki: 'Utelias Ilves' }));
arpa = mulberry32(73);
s.sahkeTila.jono.length = 0;
s.sahkeTila.apu = { apuId: 'apu-oma', veikkaus: null };
const TILAT = [
  {
    sahkeet: [
      { id: 's1', lahettaja: 'j-muu', pohjaId: 'aarre-loytyi', paikkaId: 'tukholma', aika: '2026-09-23T10:00:00.000Z' },
      { id: 's2', lahettaja: 'j-muu', pohjaId: 'uusi-pohja', paikkaId: 'tukholma', aika: '2026-09-23T10:01:00.000Z' },
      { id: 's3', pohjaId: 'saavuin', paikkaId: 'ei-laudalla' },
      { pohjaId: 'saavuin', paikkaId: 'oslo' },
      null,
    ],
    apupyynnot: [
      { apuId: 'a1', kysyja: 'j-kaveri', kysymys: 'Mikä on Ruotsin pääkaupunki?', vaihtoehdot: ['Oslo', 'Tukholma', 'Helsinki'] },
      { apuId: 'a2', kysyja: 'j-kaveri', kysymys: 'Yksi vaihtoehto', vaihtoehdot: ['A'] },
      { apuId: 'a3', kysymys: 'Sekalaiset?', vaihtoehdot: ['A', 7, 'B', null] },
      { apuId: 'a4', kysyja: 'j-kaveri', kysymys: '', vaihtoehdot: ['A', 'B'] },
    ],
    apuvastaukset: [{ apuId: 'apu-oma', vastaaja: 'j-kaveri', veikkaus: 1.5 }],
  },
  {
    sahkeet: [
      { id: 's1', lahettaja: 'j-muu', pohjaId: 'aarre-loytyi', paikkaId: 'tukholma' },
      { id: 's4', lahettaja: 'j-muu', pohjaId: 'vinkki-vesi', paikkaId: 'strasse', aika: 'rikki' },
      { id: 's5', lahettaja: 'j-muu', pohjaId: 'juliste-saatu', paikkaId: 'goteborg' },
    ],
    apupyynnot: [{ apuId: 'a1', kysyja: 'j-kaveri', kysymys: 'Toistettu', vaihtoehdot: ['A', 'B'] }],
    apuvastaukset: [{ apuId: 'toinen', vastaaja: 'j-x', veikkaus: 0 }, { apuId: 'apu-oma', veikkaus: '2' }],
  },
  { apuvastaukset: [{ apuId: 'apu-oma', veikkaus: 2 }, { apuId: 'apu-oma', vastaaja: 'j-y', veikkaus: 0 }] },
  { apuvastaukset: [{ apuId: 'apu-oma', vastaaja: 'j-z', veikkaus: 3 }] },
  null,
  { sahkeet: 'ei taulukko' },
];
const kasittely = TILAT.map((tila) => {
  s.sahkeKasitteleTila(tila);
  const jono = s.sahkeTila.jono.splice(0).map((v) => ({
    ...v, teksti: v.laji === 'sahke' ? s.sahkeTeksti(uiNimet, v.pohjaId, v.paikkaId) : null,
  }));
  return { tila, jono, nahdyt: [...s.sahkeNahdyt()], veikkaus: s.sahkeTila.apu.veikkaus };
});

// --- 6. virstanpylväät --------------------------------------------------------
s.asetaLinja(true);
s.nollaaSahke();
const starsFound = new Map();
let nykyinen = null;
const uiPeli = {
  game: {
    world: { starsFound },
    board: { cityById },
    cityOf: () => (nykyinen ? cityById.get(nykyinen) : null),
    pack: { map: { cityCountry } },
  },
};
const VIRSTAT = [
  { loydot: ['helsinki'], kaupunki: 'helsinki' },
  { loydot: ['helsinki'], kaupunki: 'helsinki' },
  { loydot: ['helsinki', 'turku'], kaupunki: 'turku' },
  { loydot: ['helsinki', 'turku'], kaupunki: 'tukholma' },
  { loydot: ['helsinki', 'turku'], kaupunki: null },
  { loydot: ['helsinki', 'turku'], kaupunki: 'goteborg' },
  { loydot: ['helsinki', 'turku', 'oslo'], kaupunki: 'oslo' },
  { loydot: ['helsinki', 'turku', 'oslo', 'goteborg', 'sofia'], kaupunki: 'sofia' },
  { nollaa: true, loydot: ['helsinki', 'turku', 'oslo', 'goteborg', 'sofia'], kaupunki: 'berliini' },
  { loydot: ['helsinki', 'turku', 'oslo', 'goteborg', 'sofia'], kaupunki: 'helsinki' },
  { linja: false, loydot: ['helsinki', 'turku', 'oslo', 'goteborg', 'sofia', 'strasse'], kaupunki: 'strasse' },
  { linja: true, loydot: ['helsinki', 'turku', 'oslo', 'goteborg', 'sofia', 'strasse'], kaupunki: 'strasse' },
];
const virstat = VIRSTAT.map((v) => {
  if (v.nollaa) s.nollaaSahke();
  if (v.linja !== undefined) s.asetaLinja(v.linja);
  starsFound.clear();
  v.loydot.forEach((id, i) => starsFound.set(`manner${i}`, id));
  nykyinen = v.kaupunki;
  pyynnot = [];
  s.sahkeVirstanpylvaat(uiPeli);
  return {
    ...v,
    maa: v.kaupunki ? cityCountry[v.kaupunki] : null,
    pyynnot,
  };
});

// --- 7. pyyntöjen muoto -------------------------------------------------------
const tunnus = { koodi: 'ABC234', jasenId: 'j 1+/ä', avain: 'k&=?ö~*._-', nimimerkki: 'Utelias Ilves' };
pyynnot = [];
s.sahkeLuoRetkikunta('Utelias Ilves');
s.sahkeLiityRetkikuntaan('ABC234', 'Höyryävä Majakka');
s.sahkeHaeTila(tunnus);
s.sahkeLahetaPohja(tunnus, 'vinkki-vesi', 'tukholma');
s.sahkeLahetaApupyynto(tunnus, 'apu-x1', 'Mikä "laiva" nousi\nmerestä?\u0001', ['Vasa', 'Kronan\\', 'Titanic']);
s.sahkeLahetaVeikkaus(tunnus, 'apu-x1', 2);
const muodot = pyynnot;

// --- 8. sähketehtävä (fokusvirta.js) -------------------------------------------
const poimi = (nimi) => {
  const f = readFileSync(join(JS, 'fokusvirta.js'), 'utf8');
  const m = f.match(new RegExp(`function ${nimi}\\([^]*?\\n}\\n`));
  if (!m) throw new Error(`${nimi} puuttuu fokusvirta.js:stä`);
  return new Function(`${m[0]}; return ${nimi};`)();
};
const aukkoOsuu = poimi('aukkoOsuu');
const ohilyonninSahke = poimi('ohilyonninSahke');
const PILOTIT = Object.entries(FOKUSVIRRAT).filter(([, v]) => v.sahketehtava);
if (PILOTIT.length < 2) throw new Error('sähkepilotteja on alle kaksi');

const aikataulut = [];
const lisaaAikataulu = (syote, asetukset) => {
  const a = asetukset ? fokus.sahkeKirjoitusAikataulu(syote, asetukset) : fokus.sahkeKirjoitusAikataulu(syote);
  aikataulut.push({ syote: syote ?? null, asetukset: asetukset ?? null, ...a });
};
lisaaAikataulu(['ABCD', 'EF']);
lisaaAikataulu(['X'.repeat(120)]);
lisaaAikataulu('LIVIALLE STOP\nPÖLLÖ STOP');
lisaaAikataulu('  A  \n\n  B\t\n C ');
lisaaAikataulu('');
lisaaAikataulu(null);
lisaaAikataulu(['', 'Y'.repeat(51), '', 'Z'.repeat(49), 'Q'.repeat(7)]);
const PALUU = { merkkiMs: 16, kattoMs: 700, valiMs: 220 };
for (const [, v] of PILOTIT) {
  const t = v.sahketehtava;
  lisaaAikataulu(t.sahke);
  lisaaAikataulu(t.vastaussahke, PALUU);
  lisaaAikataulu(t.lahetetty, PALUU);
}

const palkkiot = [];
for (const pohja of [200, 150, 99, 1, 0]) for (let ohi = 0; ohi <= 6; ohi++) palkkiot.push({ ohi, pohja, palkkio: fokus.sahkePalkkio(ohi, pohja) });

const NORMIT = ['Vasa 1961', '  VÄSÄ, vuonna 1961!  ', 'Varnan nekropoli (1974)', 'Göteborgissa', 'straße', 'Ångström',
  'café crème', 'İstanbul', '', null, '1 9 7 4', 'ÆØÅ æøå', 'Wasa-laiva, 1961.', 'naïve—coöperate', '٣ ١٩٧٤'];
const normit = NORMIT.map((t) => ({ syote: t, tulos: fokus.normalisoiSahketeksti(t) }));

const VAPAAT = {
  sofia: ['varna 1974', 'Varnassa vuonna 1974', 'Varnan nekropoli 1974', 'varna', '1974', 'Varna1974', 'sofia 1974',
    'VARNAN KALMISTO, 1974', 'Varna 1975', '', 'varnan  1974 ja muuta'],
  tukholma: ['vasa 1961', 'Wasa, 1961', 'Vaasa 1961', 'Laiva, joka upposi ja nousi 1961', 'vasa', '1961', 'Vasalaiva 1961',
    'Väsä 1961', 'vasa 1628', '  ', 'Vasan nosto 1961'],
};
const tulkinnat = [];
for (const [kaupunki, v] of PILOTIT) {
  for (const teksti of VAPAAT[kaupunki] ?? []) {
    const r = fokus.tulkitseVapaaSahke(teksti, v.sahketehtava);
    tulkinnat.push({ kaupunki, teksti, osui: r.osui, vaarat: r.vaarat.map((a) => a.id) });
  }
}

const AUKKOARVOT = ['1974', ' 1974 ', '1974.0', '1.974e3', '0x7B6', '0o3666', '0b11110110110', '1961', '', 'abc',
  '1974abc', '+1974', '-1974', 'Infinity', 'Varna', 'varna', 'Laiva, joka upposi ja nousi',
  'Laiva, joka kaatui tuhannen metrin jälkeen', ' Varna'];
const osumat = [];
for (const [kaupunki, v] of PILOTIT) for (const aukko of v.sahketehtava.aukot) for (const arvo of AUKKOARVOT) {
  osumat.push({ kaupunki, aukko: aukko.id, arvo, osuu: aukkoOsuu(aukko, arvo) });
}

const ohilyonnit = [];
for (const [kaupunki, v] of PILOTIT) {
  const t = v.sahketehtava;
  const aukot = t.aukot;
  const joukot = [[aukot[0]], [aukot[1]], aukot, []];
  for (const vaarat of joukot) {
    ohilyonnit.push({ kaupunki, vaarat: vaarat.map((a) => a.id), sahke: ohilyonninSahke(t, vaarat) });
    // Ilman vaarinSahke-kenttää: sanat sahkeSana ?? otsake.
    const ilman = { ...t, vaarinSahke: undefined, aukot: aukot.map((a, i) => (i === 1 ? { ...a, sahkeSana: undefined } : a)) };
    const vaaratIlman = vaarat.map((a) => ilman.aukot[aukot.indexOf(a)]);
    ohilyonnit.push({ kaupunki, ilmanVaarinSahketta: true, vaarat: vaarat.map((a) => a.id), sahke: ohilyonninSahke(ilman, vaaratIlman) });
  }
}

const fokusvirrat = {
  alkiot: PILOTIT.map(([kaupunki, v]) => ({ id: kaupunki, kaupunki, data: { sahketehtava: v.sahketehtava } })),
};

const jalki = {
  kuvaus: 'tee-sahkejalki.mjs: js/sahke.js ja js/fokusvirta.js (sähketehtävä) puhtaat funktiot',
  vakiot: {
    osoite: OSOITE, koodinMerkit: s.SAHKE_KOODIN_MERKIT, koodinPituus: s.SAHKE_KOODIN_PITUUS,
    nahtyjaKatto: s.SAHKE_NAHTYJA_KATTO, adjektiivit: s.SAHKE_ADJEKTIIVIT, substantiivit: s.SAHKE_SUBSTANTIIVIT,
    saatteet: s.SAHKE_SAATTEET, apupyynnonSaate: s.SAHKE_APUPYYNNON_SAATE, veikkauksenSaate: s.sahkeVeikkauksenSaate('Utelias Ilves'),
    merkkiMs: fokus.SAHKE_MERKKI_MS, riviKattoMs: fokus.SAHKE_RIVI_KATTO_MS, rivivaliMs: fokus.SAHKE_RIVIVALI_MS,
    sahkePalkkio: fokus.SAHKE_PALKKIO,
  },
  kaupungit: KAUPUNGIT,
  pohjat,
  nimet: { siemen: 20260923, kutsut: nimet },
  koodit,
  tekstit,
  muisti: muistijalki,
  tunnukset,
  asetukset,
  kasittely: { siemen: 73, askeleet: kasittely },
  virstat,
  muodot,
  aikataulut,
  palkkiot,
  normit,
  tulkinnat,
  osumat,
  ohilyonnit,
  fokusvirrat,
};
writeFileSync(join(tama, 'sahkejalki.json'), `${JSON.stringify(jalki, null, 1)}\n`);
console.log(`sahkejalki.json: ${nimet.length} nimikutsua, ${koodit.length} koodia, ${tekstit.length} tekstiä, `
  + `${kasittely.length} tilaa, ${virstat.length} virstaa, ${muodot.length} pyyntöä, ${aikataulut.length} aikataulua, `
  + `${tulkinnat.length} tulkintaa, ${osumat.length} aukkoarvoa`);
