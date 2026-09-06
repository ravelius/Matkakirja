/*
 * IHMISEN MATKA VÄRIVIRTOINA — laskennan ytimen ja kytkennän vartija
 * (docs/moduulit/ihmisen-matka-virrat.md luku 8; omistajan päätökset
 * luku 11).
 *
 * 1. Maamaski: pakkaus ↔ purku, mitat, tunnetut pisteet.
 * 2. Saapumisaika synteettisellä ruudukolla: meri estää, ylitys toimii
 *    ikkunassa eikä sen ulkopuolella, portti viivyttää, sisämaa
 *    hidastaa, nauha antaa ajan janalta.
 * 3. Virtadatan eheys: lähteet maalla, ikkunat oikein päin, värit.
 * 4. Ruudun tila ja väri: rintama, vanha alue, ennen saapumista, liuku.
 * 5. Painopiste antimeridiaanin yli.
 * 6. Koko kaari oikeilla tiedoilla: Australia ennen Eurooppaa, Amerikat
 *    Siperian jälkeen, meri estää ilman porttia.
 * 7. Kaari ja moottorin koukut tekstitasolla, sw.js SHELL.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  RUUDUKON_LEVEYS, RUUDUKON_KORKEUS, pakkaaMaamaski, puraMaamaski, rannikkoMaski, ruutu,
  laskeVirta, laskeKentat, ruudunTila, virranVari, rintamienPainopisteet, kameranLeveysAsteina,
  ylityksenSaapuminen, laatikkoMaski, lahinMaa, rintamanLeveys, nopeusHetkella,
  laatikonSyvyys, laatikkoPehmea, portinLuisu, PORTIN_LUISU_ASTE, PORTIN_LUISU_OSUUS,
  pakkaaPeitto, puraPeitto, tarkennaKentat,
} from '../js/aikajana-virrat-laskenta.js';
import { MAAMASKI } from '../js/linssit/ihmisen-matka-maamaski.js';
import {
  IHMISEN_MATKA_VIRRAT, IHMISEN_MATKA_RETKI, IHMISEN_MATKA_VANHA, VIRRAN_PEITTO,
} from '../js/linssit/ihmisen-matka-virrat.js';
import { LINSSI } from '../js/linssit/ihmisen-matka.js';
import { IHMISEN_MATKA } from '../js/linssit/ihmisen-matka-data.js';

const lue = (polku) => readFileSync(new URL(polku, import.meta.url), 'utf8');

/* ---------------------------------------------------------- 1. maski */

const MAA = puraMaamaski(MAAMASKI.juoksut);

test('maamaski: 720 × 360, pakkaus palaa samana, tunnetut pisteet', () => {
  assert.equal(MAAMASKI.leveys, RUUDUKON_LEVEYS);
  assert.equal(MAAMASKI.korkeus, RUUDUKON_KORKEUS);
  assert.equal(MAA.length, 720 * 360);
  const uudelleen = puraMaamaski(pakkaaMaamaski(MAA));
  assert.deepEqual(Array.from(uudelleen), Array.from(MAA), 'pakkaus ei palaa samana');
  const maata = MAA.reduce((s, v) => s + v, 0);
  assert.ok(maata > 55000 && maata < 75000, `maaruutuja ${maata}: ei maapallon suuruusluokkaa`);
  // Maalla.
  for (const [nimi, lat, lon] of [['Siinai', 30, 33.7], ['Panama', 8.8, -80], ['Madjedbebe', -12.5, 132.9], ['Wairau', -41.5, 174.06], ['Tongatapu', -21.15, -175.2]]) {
    assert.equal(MAA[ruutu(lat, lon)], 1, `${nimi} pitäisi olla maata`);
  }
  // Meressä — myös estot.
  for (const [nimi, lat, lon] of [['Beringinsalmi', 65.8, -169], ['Gibraltar-esto', 36, -5.5], ['Atlantti', 30, -40], ['Bab-el-Mandeb-esto', 12.5, 43.25]]) {
    assert.equal(MAA[ruutu(lat, lon)], 0, `${nimi} pitäisi olla merta`);
  }
  // Pieni synteettinen maski pyöreänä matkana (alku merta, loppu maata).
  const pieni = Uint8Array.from([0, 0, 1, 1, 1, 0, 1, 0, 0, 1]);
  assert.deepEqual(Array.from(puraMaamaski(pakkaaMaamaski(pieni), 10)), Array.from(pieni));
  // Laudan sauma 175°W: Tšuktšien kärki on käsin lisätty, salmi kapea (hionta 6.9.2026).
  assert.equal(MAA[ruutu(66.2, -169.9)], 1, 'Dežnjovinniemi on maata');
  assert.equal(MAA[ruutu(64.5, -173.2)], 1, 'Provideniya on maata');
  assert.equal(MAA[ruutu(68, -172)], 0, 'Tšuktšimeri on merta');
  let salmi = 0;
  for (let lon = -175; lon < -160; lon += 0.5) if (!MAA[ruutu(66, lon + 0.25)]) salmi += 0.5;
  assert.ok(salmi <= 3, `Beringinsalmi 66°N on ${salmi}° leveä (oli 7°)`);
});

test('maapeitto: 0…9 per ruutu, pakkaus palaa samana, rannikko osittainen, sisämaa täysi', () => {
  const PEITTO = puraPeitto(MAAMASKI.peitot);
  assert.equal(PEITTO.length, MAA.length);
  const uudelleen = puraPeitto(pakkaaPeitto(PEITTO));
  assert.deepEqual(Array.from(uudelleen.subarray(0, 50000)), Array.from(PEITTO.subarray(0, 50000)), 'peiton pakkaus ei palaa samana');
  let osittaisia = 0;
  for (let i = 0; i < MAA.length; i += 1) {
    if (MAA[i]) assert.ok(PEITTO[i] >= 1 && PEITTO[i] <= 9, `maaruudun peitto ${PEITTO[i]}`);
    else assert.equal(PEITTO[i], 0, 'meriruudun peitto on 0');
    if (MAA[i] && PEITTO[i] < 9) osittaisia += 1;
  }
  assert.ok(osittaisia > 3000 && osittaisia < 12000, `osittaisia rannikkoruutuja ${osittaisia}`);
  assert.equal(PEITTO[ruutu(20, 10)], 9, 'Sahara on täyttä maata');
  assert.equal(puraPeitto(''), null, 'tyhjä peitto → null (synteettiset ruudukot)');
  assert.deepEqual(Array.from(puraPeitto(pakkaaPeitto(Uint8Array.from([0, 0, 9, 9, 3, 0, 5])), 7)), [0, 0, 9, 9, 3, 0, 5]);
});

/* ------------------------------------------- 2. synteettinen ruudukko */

/** 12 × 6 -ruudukko: rivi 0 pohjoisin. Merkkijono riviä kohti, # = maa. */
function ruudukko(rivit) {
  const leveys = rivit[0].length;
  const korkeus = rivit.length;
  const maa = new Uint8Array(leveys * korkeus);
  rivit.forEach((rivi, r) => [...rivi].forEach((m, c) => { maa[r * leveys + c] = m === '#' ? 1 : 0; }));
  return { maa, leveys, korkeus, rannikko: rannikkoMaski(maa, leveys, korkeus) };
}
/** Ruudukon ruudun keskipiste asteina (sama kaava kuin laskennassa). */
const keskus = (r, c) => ({ lat: 90 - (r + 0.5) * 0.5, lon: -180 + (c + 0.5) * 0.5 });

test('meri estää: saari jää värjäytymättä ilman ylitystä', () => {
  // Reunasarakkeet ovat merta: ruudukko kiertää pituussuunnassa kuten pallo.
  const y = ruudukko([
    '.###....##..',
    '.###....##..',
    '.###....##..',
    '.###....##..',
    '.###....##..',
    '.###....##..',
  ]);
  const { aika } = laskeVirta({ nopeus: 1, sisamaa: 1, lahteet: [{ ...keskus(2, 1), aika: 1000 }] }, y);
  assert.ok(aika[2 * 12 + 1] === 1000, 'lähde saa oman aikansa');
  assert.ok(aika[2 * 12 + 3] > 0 && aika[2 * 12 + 3] < 1000, 'sama manner värjäytyy');
  for (let r = 0; r < 6; r += 1) for (let c = 8; c < 10; c += 1) assert.equal(aika[r * 12 + c], 0, 'meren takainen maa ei värjäydy');
});

test('ylitys toimii aikaikkunassa ja on kiinni sen ulkopuolella', () => {
  const rivit = ['.###....##..', '.###....##..', '.###....##..', '.###....##..', '.###....##..', '.###....##..'];
  const y = ruudukko(rivit);
  const perus = { nopeus: 1, sisamaa: 1, lahteet: [{ ...keskus(2, 1), aika: 1000 }] };
  const ylitys = { a: keskus(2, 3), b: keskus(2, 8), kesto: 50 };
  // Ikkuna auki: rintama ehtii a:han (~1000 − 100 v) ja odottaa avautumista 800.
  const auki = laskeVirta({ ...perus, ylitykset: [{ ...ylitys, ikkuna: [800, 300] }] }, y);
  assert.ok(auki.aika[2 * 12 + 8] > 0, 'saari värjäytyy ylityksellä');
  assert.equal(Math.round(auki.aika[2 * 12 + 8]), 750, 'lähtö ikkunan avautuessa + kesto');
  // Ikkuna sulkeutuu (996) ennen kuin rintama ehtii a:han (994).
  const kiinni = laskeVirta({ ...perus, ylitykset: [{ ...ylitys, ikkuna: [999, 996] }] }, y);
  assert.equal(kiinni.aika[2 * 12 + 8], 0, 'suljettu ikkuna ei päästä yli');
  // Apufunktio samasta säännöstä.
  assert.equal(ylityksenSaapuminen(33000, [17000, 11000], 300), 16700);
  assert.equal(ylityksenSaapuminen(9000, [17000, 11000], 300), 0, 'ikkuna kiinni → 0');
  assert.equal(ylityksenSaapuminen(0, [17000, 11000], 300), 0, 'saavuttamaton lähtöpää → 0');
});

test('portti viivyttää alueeseen tulon ja sisämaa hidastaa', () => {
  const y = ruudukko(['############', '############', '############', '############', '############', '############']);
  const lahteet = [{ ...keskus(2, 0), aika: 10000 }];
  const vapaa = laskeVirta({ nopeus: 1, sisamaa: 1, lahteet }, y);
  const portilla = laskeVirta({
    // Terävä portti ilman luisua: ulkopuoli ei muutu lainkaan.
    nopeus: 1, sisamaa: 1, lahteet, portit: [{ alue: [{ lat: [-90, 90], lon: [keskus(0, 6).lon - 0.25, 180] }], avautuu: 5000, hajonta: 0, reuna: 0, luisu: null }],
  }, y);
  assert.ok(vapaa.aika[2 * 12 + 9] > 5000, 'ilman porttia väri ehtii itään ennen 5 000');
  assert.ok(portilla.aika[2 * 12 + 9] <= 5000 && portilla.aika[2 * 12 + 9] > 4000, `portti pidättää: ${portilla.aika[2 * 12 + 9]}`);
  assert.equal(Math.round(vapaa.aika[2 * 12 + 4]), Math.round(portilla.aika[2 * 12 + 4]), 'portin ulkopuoli ennallaan');
  // Sisämaakerroin: keskirivi (ei merinaapuria) on hitaampi kuin reuna.
  const meri = ruudukko(['............', '.##########.', '.##########.', '.##########.', '............', '............']);
  const hidas = laskeVirta({ nopeus: 1, sisamaa: 0.25, lahteet: [{ ...keskus(1, 1), aika: 10000 }, { ...keskus(3, 1), aika: 10000 }, { ...keskus(2, 1), aika: 10000 }] }, meri);
  assert.ok(hidas.aika[2 * 12 + 9] < hidas.aika[1 * 12 + 9], 'sisämaan ruutu värjäytyy rannikkoa myöhemmin');
});

test('portin luisu: ulkokaista viivästyy jatkuvasti rajaa kohti, kauempana ennallaan', () => {
  const y = ruudukko(['############', '############', '############', '############', '############', '############']);
  // Lähde rivillä 0; portti on rivit 4–5 (raja rivien 3 ja 4 välissä), luisu 1° = rivit 2–3.
  const lahteet = [{ ...keskus(0, 0), aika: 10000 }];
  const raja = keskus(4, 0).lat + 0.25;
  const laatikko = { lat: [-90, raja] };
  const vapaa = laskeVirta({ nopeus: 1, sisamaa: 1, lahteet }, y);
  const luisulla = laskeVirta({
    nopeus: 1, sisamaa: 1, lahteet,
    portit: [{ alue: [laatikko], avautuu: 5000, reuna: 0, luisu: { leveys: 1, vuodet: 3000 } }],
  }, y);
  // Syvyys: lähin reuna asteina; pituussuunnassa cos φ:llä skaalattuna.
  assert.ok(Math.abs(laatikonSyvyys(keskus(3, 0).lat, keskus(3, 0).lon, laatikko) + 0.25) < 1e-9, 'rivi 3 on 0,25° rajan ulkopuolella');
  assert.ok(laatikonSyvyys(keskus(4, 0).lat, keskus(4, 0).lon, laatikko) > 0, 'rivi 4 sisällä');
  // Keskellä: leveyssuunnassa 10°, pituussuunnassa 10° × cos 50° = 6,43° → lähin voittaa.
  assert.ok(Math.abs(laatikonSyvyys(50, 10, { lat: [40, 60], lon: [0, 20] }) - 10 * Math.cos(50 * Math.PI / 180)) < 1e-9);
  assert.equal(laatikonSyvyys(50, 10, { lat: [40, 60] }), 10, 'ilman pituusrajaa 10° reunaan');
  assert.equal(laatikonSyvyys(30, 10, { lat: [40, 60], lon: [0, 20] }), -10, '10° laatikon eteläpuolella');
  // Koko kierroksen laatikko ei tee reunaa antimeridiaanille.
  assert.equal(laatikonSyvyys(50, -179.9, { lat: [40, 60], lon: [-180, 180] }), 10);
  const sarake = (r) => luisulla.aika[r * 12 + 3];
  // Kaistan ulkopuolella ennallaan; kaistalla viive kasvaa rajaa kohti (6 687 → 5 187); sisällä portti (≤ 5 000).
  assert.equal(Math.round(sarake(1)), Math.round(vapaa.aika[1 * 12 + 3]), 'rivi 1 ennallaan');
  assert.ok(sarake(1) > sarake(2) && sarake(2) > sarake(3) && sarake(3) > sarake(4), `jatkuva lasku: ${[1, 2, 3, 4].map((r) => Math.round(sarake(r)))}`);
  assert.ok(Math.abs(sarake(2) - 6687.5) < 1 && Math.abs(sarake(3) - 5187.5) < 1, `kaista neliöllisesti: ${Math.round(sarake(2))}, ${Math.round(sarake(3))}`);
  assert.ok(sarake(4) <= 5000 && sarake(4) > 4900, 'sisällä portti');
  // Oletusluisu datasta: leveys ja viive avautumisajasta; null poistaa.
  assert.deepEqual(portinLuisu({ avautuu: 10000 }), { leveys: PORTIN_LUISU_ASTE, vuodet: 10000 * PORTIN_LUISU_OSUUS });
  assert.equal(portinLuisu({ avautuu: 10000, luisu: null }), null);
  // Pehmeä laatikkomaski: 1 syvällä, 0,5 rajalla, 0 ulkona.
  const pehmea = laatikkoPehmea([{ lat: [40, 60], lon: [0, 20] }], { pehmeys: 2 });
  assert.equal(pehmea[ruutu(50, 10)], 1);
  assert.ok(Math.abs(pehmea[ruutu(40.25, 10)] - 0.625) < 0.01, `rajan tuntumassa ${pehmea[ruutu(40.25, 10)]}`);
  assert.equal(pehmea[ruutu(30, 10)], 0);
});

test('nauha antaa ajan janalta ja meriruudut merikenttään', () => {
  const y = ruudukko(['............', '#...........', '............', '............', '...........#', '............']);
  const { aika, meri } = laskeVirta({
    nopeus: 1, sisamaa: 1, lahteet: [],
    nauhat: [{ sade: 60, meriSade: 60, pisteet: [[...Object.values(keskus(1, 0)), 3000], [...Object.values(keskus(4, 11)), 1000]] }],
  }, y);
  assert.equal(Math.round(aika[1 * 12 + 0]), 3000, 'nauhan alkupää');
  assert.equal(Math.round(aika[4 * 12 + 11]), 1000, 'nauhan loppupää');
  let meria = 0;
  for (let i = 0; i < meri.length; i += 1) if (meri[i] > 0) meria += 1;
  assert.ok(meria >= 6, `nauhan meriruutuja ${meria}`);
  const keski = meri[2 * 12 + 5] || meri[2 * 12 + 4] || meri[3 * 12 + 6];
  assert.ok(keski > 1000 && keski < 3000, `keskellä aika on välissä (${keski})`);
});

test('nopeus ajan mukaan ja rintaman leveys', () => {
  const taulu = [[300000, 0.05], [90000, 2.0], [50000, 0.9]];
  assert.equal(nopeusHetkella(taulu, 200000), 0.05);
  assert.equal(nopeusHetkella(taulu, 90000), 2.0);
  assert.equal(nopeusHetkella(taulu, 70000), 2.0);
  assert.equal(nopeusHetkella(taulu, 10000), 0.9);
  assert.equal(nopeusHetkella(1.2, 999), 1.2);
  // Päätös 3: kymmenesosa kellon lukemasta, vähintään 600 v.
  assert.equal(rintamanLeveys(30000), 3000);
  assert.equal(rintamanLeveys(1000), 600);
});

/* ---------------------------------------------------------- 3. data */

test('virtadata: viisi virtaa päätöksen mukaan, lähteet maalla, ikkunat ja liuku oikein päin', () => {
  assert.deepEqual(IHMISEN_MATKA_VIRRAT.map((v) => v.tunnus), ['paavirta', 'eurooppa', 'siperia', 'amerikat', 'tyynimeri']);
  const heksa = /^#[0-9A-Fa-f]{6}$/;
  for (const v of IHMISEN_MATKA_VIRRAT) {
    assert.match(v.vari.vanha, heksa, `${v.tunnus} vanha`);
    assert.match(v.vari.rintama, heksa, `${v.tunnus} rintama`);
    for (const l of v.lahteet ?? []) assert.ok(lahinMaa(MAA, l.lat, l.lon, 3) >= 0, `${v.tunnus}: lähde ${l.nimi} ei ole maan lähellä`);
    for (const y of v.ylitykset ?? []) {
      assert.ok(y.ikkuna[0] > y.ikkuna[1], `${y.nimi}: ikkuna avautuu ennen kuin sulkeutuu`);
      assert.ok(lahinMaa(MAA, y.a.lat, y.a.lon, 3) >= 0, `${y.nimi}: a ei ole maan lähellä`);
      assert.ok(lahinMaa(MAA, y.b.lat, y.b.lon, 3) >= 0, `${y.nimi}: b ei ole maan lähellä`);
    }
    for (const n of v.nauhat ?? []) {
      const ajat = n.pisteet.map((p) => p[2]);
      for (let k = 1; k < ajat.length; k += 1) assert.ok(ajat[k] <= ajat[k - 1], `${n.nimi}: nauhan ajat eivät laske`);
    }
    for (const p of v.portit ?? []) assert.ok(p.avautuu > 0 && p.alue?.length, `${v.tunnus}: portti ${p.nimi}`);
  }
  // Siperia haarautuu päävirrasta ja Amerikat lukee Siperian (päätös 11).
  const siperia = IHMISEN_MATKA_VIRRAT.find((v) => v.tunnus === 'siperia');
  assert.ok(siperia.lahteet[0].aika <= 50000 && siperia.lahteet[0].aika >= 45000);
  const amerikat = IHMISEN_MATKA_VIRRAT.find((v) => v.tunnus === 'amerikat');
  assert.equal(amerikat.lahteetToisesta[0].virta, 'siperia');
  const liuku = amerikat.vari.liuku;
  assert.ok(liuku.length >= 2 && liuku[0].aika > liuku[liuku.length - 1].aika, 'liuku alkaen > valmis');
  assert.equal(liuku[0].vanha, siperia.vari.vanha, 'liuku alkaa Siperian sävystä');
  // Retki sammuu 70 ka mennessä (päätös 12), vanha väestö 300–40 ka (päätös 7).
  assert.equal(IHMISEN_MATKA_RETKI.sammuu[1], 70000);
  assert.deepEqual(IHMISEN_MATKA_VANHA.nakyy, [300000, 40000]);
  // Peitot (päätös 2): vanha alue n. 75 %, rintama kirkkaampi.
  assert.ok(VIRRAN_PEITTO.vanha >= 0.7 && VIRRAN_PEITTO.vanha <= 0.8);
  assert.ok(VIRRAN_PEITTO.rintama > VIRRAN_PEITTO.vanha);
});

/* ---------------------------------------------------- 4. tila ja väri */

test('ruudun tila: rintamalla w = 1, vanhalla 0, ennen saapumista peitto 0', () => {
  assert.deepEqual(ruudunTila(0, 5000), { w: 0, peitto: 0 }, 'saavuttamaton');
  assert.equal(ruudunTila(30000, 30000).w, 1, 'juuri saapunut on rintamalla');
  assert.equal(ruudunTila(30000, 30000).peitto, 1);
  assert.equal(ruudunTila(33000, 30000).w, 0, '3 000 v vanha (leveys 3 000) on vanhaa aluetta');
  assert.ok(ruudunTila(31500, 30000).w > 0.4 && ruudunTila(31500, 30000).w < 0.6, 'puolivälissä');
  // Tulossa: peitto nousee 5 %:n matkalla (1 500 v @ 30 ka).
  assert.equal(ruudunTila(28000, 30000).peitto, 0, 'kaukana tulevaisuudessa');
  const nousussa = ruudunTila(29500, 30000);
  assert.ok(nousussa.peitto > 0 && nousussa.peitto < 1 && nousussa.w === 1, JSON.stringify(nousussa));
  // Askelittain (reduced motion): ei nousua.
  assert.equal(ruudunTila(29500, 30000, { askelittain: true }).peitto, 0);
});

test('virran väri: liuku antaa lähtövärin alussa ja oman värin lopussa', () => {
  const amerikat = IHMISEN_MATKA_VIRRAT.find((v) => v.tunnus === 'amerikat');
  const siperia = IHMISEN_MATKA_VIRRAT.find((v) => v.tunnus === 'siperia');
  const alku = virranVari(amerikat.vari, 17000);
  const loppu = virranVari(amerikat.vari, 11000);
  assert.deepEqual(alku.vanha, virranVari(siperia.vari).vanha);
  assert.deepEqual(loppu.vanha, virranVari({ vanha: amerikat.vari.vanha, rintama: amerikat.vari.rintama }).vanha);
  const keski = virranVari(amerikat.vari, 15500);
  assert.notDeepEqual(keski.vanha, alku.vanha);
  assert.notDeepEqual(keski.vanha, loppu.vanha);
  for (const k of [0, 1, 2]) assert.ok(keski.vanha[k] >= 0 && keski.vanha[k] <= 255);
  // Ilman liukua sama väri aina.
  assert.deepEqual(virranVari({ vanha: '#000000', rintama: '#ffffff' }, 123), { vanha: [0, 0, 0], rintama: [255, 255, 255] });
});

/* -------------------------------------------------------- 5. painopiste */

test('painopiste antimeridiaanin yli on 180°, ei 0°', () => {
  const leveys = 720;
  const korkeus = 360;
  const aika = new Float32Array(leveys * korkeus);
  const virta = new Int8Array(leveys * korkeus).fill(-1);
  for (const lon of [-178, 178]) {
    const i = ruutu(60, lon);
    aika[i] = 10000;
    virta[i] = 0;
  }
  const [p] = rintamienPainopisteet({ aika, virta }, 10000);
  assert.equal(p.virta, 0);
  assert.ok(Math.abs(Math.abs(p.lon) - 180) < 1, `lon ${p.lon}`);
  assert.ok(Math.abs(p.lat - 60) < 1, `lat ${p.lat}`);
  assert.ok(p.hajonta > 0 && p.hajonta < 10, `hajonta ${p.hajonta}`);
  // Kameran leveys hajonnasta: rajat 28…100.
  assert.equal(kameranLeveysAsteina(0), 28);
  assert.equal(kameranLeveysAsteina(100), 100);
  assert.equal(kameranLeveysAsteina(10), 38);
});

test('laatikkomaski kiertää antimeridiaanin ja rosoreuna pysyy laatikon lähellä', () => {
  const maski = laatikkoMaski([{ lat: [50, 90], lon: [150, -160] }], { reuna: 0 });
  assert.equal(maski[ruutu(60, 170)], 1);
  assert.equal(maski[ruutu(60, -170)], 1);
  assert.equal(maski[ruutu(60, 0)], 0);
  assert.equal(maski[ruutu(40, 170)], 0);
  const roso = laatikkoMaski([{ lat: [50, 90], lon: [150, -160] }], { reuna: 2 });
  assert.equal(roso[ruutu(60, 170)], 1, 'selvästi sisällä');
  assert.equal(roso[ruutu(40, 170)], 0, 'selvästi ulkona');
});

/* ------------------------------------------------------ 6. koko kaari */

const KENTAT = laskeKentat(
  { virrat: IHMISEN_MATKA_VIRRAT, retki: IHMISEN_MATKA_RETKI, vanha: IHMISEN_MATKA_VANHA },
  { maa: MAA },
);
const TUNNUS = IHMISEN_MATKA_VIRRAT.map((v) => v.tunnus);
const saapui = (lat, lon) => {
  const i = lahinMaa(MAA, lat, lon, 3);
  return { aika: i >= 0 ? KENTAT.aika[i] : 0, virta: i >= 0 && KENTAT.virta[i] >= 0 ? TUNNUS[KENTAT.virta[i]] : null };
};

test('koko kaari: Australia ennen Eurooppaa, Amerikat Siperian jälkeen, meri estää ilman porttia', () => {
  const australia = saapui(-12.5, 132.9);
  const eurooppa = saapui(48.9, 2.3);
  const siperia = saapui(66, -176);
  const alaska = saapui(65, -164.5);
  const chile = saapui(-41.5, -73.2);
  assert.equal(australia.virta, 'paavirta');
  assert.equal(eurooppa.virta, 'eurooppa');
  assert.equal(siperia.virta, 'siperia');
  assert.equal(alaska.virta, 'amerikat');
  assert.equal(chile.virta, 'amerikat');
  assert.ok(australia.aika > eurooppa.aika, `Australia ${australia.aika} ennen Eurooppaa ${eurooppa.aika}`);
  assert.ok(siperia.aika > alaska.aika, `Tšuktšit ${siperia.aika} ennen Alaskaa ${alaska.aika}`);
  assert.ok(alaska.aika > chile.aika, 'Alaska ennen Chileä');
  assert.ok(alaska.aika <= 17000 && alaska.aika >= 15000, `Alaska ${alaska.aika} Beringian ikkunassa`);
  // Meri estää: Madagaskar saa värin vain Tyynenmeren nauhasta (n. 1 500), ei päävirrasta.
  const madagaskar = saapui(-19, 47);
  assert.equal(madagaskar.virta, 'tyynimeri');
  assert.ok(madagaskar.aika < 2000, `Madagaskar ${madagaskar.aika}`);
  // Havaiji ja Uusi-Seelanti vain nauhoista; Grönlanti ylityksellä.
  assert.equal(saapui(19.6, -155.5).virta, 'tyynimeri');
  assert.equal(saapui(-41.5, 174.06).virta, 'tyynimeri');
  assert.equal(saapui(70, -40).virta, 'amerikat');
  assert.ok(saapui(70, -40).aika < 4600, 'Grönlanti vasta arktisen portin auettua');
  // Retki: Skhul on läikässä ennen päävirtaa; vanha väestö Euroopassa.
  const skhul = lahinMaa(MAA, 32.67, 34.97, 3);
  assert.ok(KENTAT.retki[skhul] > 100000, `retki Skhulissa ${KENTAT.retki[skhul]}`);
  assert.ok(KENTAT.aika[skhul] < 80000, 'päävirta Levanttiin vasta uudella lähdöllä');
  assert.equal(KENTAT.vanha[lahinMaa(MAA, 48.9, 2.3, 3)], 1, 'vanha väestö Ranskassa');
  assert.equal(KENTAT.vanha[lahinMaa(MAA, 4.8, 36, 3)], 0, 'ei Afrikassa');
});

test('koko kaari: jokainen pysäkki saa värin (paitsi Beringian meripysäkki) eikä kuva ole kaukana värin edellä', () => {
  for (const t of IHMISEN_MATKA) {
    if (t.tunnus === 'beringia') continue;
    let { aika } = saapui(t.lat, t.lon);
    // Varhaiset retket (Skhul, Al Wusta) ovat sammuvassa läikässä.
    aika = Math.max(aika, KENTAT.retki[lahinMaa(MAA, t.lat, t.lon, 3)] ?? 0);
    assert.ok(aika > 0, `${t.tunnus} jää värjäytymättä`);
    // White Sands on tietoinen poikkeus (päätös 8): kuva 22 ka, väri n. 15 ka.
    const sallittuEnnakko = t.tunnus === 'white-sands' ? 8000 : 6000;
    assert.ok(aika >= t.vuosiaSitten - sallittuEnnakko, `${t.tunnus}: väri ${Math.round(aika)} liian kauan kuvan ${t.vuosiaSitten} jälkeen`);
  }
  const whiteSands = saapui(32.78, -106.17);
  assert.ok(whiteSands.aika > 14000 && whiteSands.aika < 16500, `White Sands väri ${whiteSands.aika} ≈ 15 ka`);
});

test('tarkennus: kalvon pikseli on neljän ruudun bilineaarinen sekoitus, rannikko osittainen, raja sekoittuu', () => {
  // 12 × 6: vasen puoli virtaa 0, oikea virtaa 1; alin rivi merta.
  const leveys = 12;
  const korkeus = 6;
  const maa = new Uint8Array(leveys * korkeus).fill(1);
  for (let c = 0; c < leveys; c += 1) maa[5 * leveys + c] = 0;
  const aika = new Float32Array(leveys * korkeus);
  const virta = new Int8Array(leveys * korkeus).fill(-1);
  for (let r = 0; r < 5; r += 1) {
    for (let c = 0; c < leveys; c += 1) {
      aika[r * leveys + c] = c < 6 ? 1000 : 2000;
      virta[r * leveys + c] = c < 6 ? 0 : 1;
    }
  }
  const meri = new Float32Array(leveys * korkeus);
  const meriVirta = new Int8Array(leveys * korkeus).fill(-1);
  const t = tarkennaKentat({ aika, virta, meri, meriVirta, retki: null, vanha: null }, { maa, leveys, korkeus, kerroin: 2 });
  assert.equal(t.leveys, 24);
  assert.equal(t.korkeus, 12);
  const hae = (v, u) => {
    const k = t.indeksi.indexOf(v * 24 + u);
    return k >= 0 ? { aika: t.aika[k], paino: t.paino[k], virta: t.virta[k], virta2: t.virta2[k], sekoitus: t.sekoitus[k] } : null;
  };
  // Syvällä vasemmalla: täysi paino, oma virta, ei sekoitusta.
  assert.deepEqual(hae(4, 4), { aika: 1000, paino: 255, virta: 0, virta2: -1, sekoitus: 0 });
  // Rajalla (ruudut 5 ja 6): aika välissä, kaksi virtaa sekoittuu.
  const raja = hae(4, 11);
  assert.ok(raja.aika > 1000 && raja.aika < 2000, `rajan aika ${raja.aika}`);
  assert.ok(raja.sekoitus > 0 && raja.virta2 >= 0, 'rajalla toinen virta mukana');
  // Rannikko (rivi 4 → meri rivillä 5): alempi pikselirivi osittainen.
  assert.ok(hae(9, 4).paino > 0 && hae(9, 4).paino < 255, `rannikon paino ${hae(9, 4).paino}`);
  assert.equal(hae(11, 4), null, 'syvä meri ei ole aktiivinen');
  // Peitto pudottaa rannikkoruudun painoa.
  const peitto = new Uint8Array(leveys * korkeus).fill(9);
  peitto[4 * leveys + 2] = 3;
  const p = tarkennaKentat({ aika, virta, meri, meriVirta, retki: null, vanha: null }, { maa, peitto, leveys, korkeus, kerroin: 2 });
  const k = p.indeksi.indexOf(8 * 24 + 4);
  assert.ok(p.paino[k] < 200, `osittaisen ruudun paino ${p.paino[k]}`);
});

/* -------------------------------------------------- 7. kaari ja koukut */

test('kaari pyytää virrat, ei tummennusta eikä reittiviivaa; tekstit on kirjoitettu virroille', () => {
  const k = LINSSI.aikajana;
  assert.equal(k.tummennus, false);
  assert.equal(k.reitti, false);
  assert.equal(k.virrat.virrat, IHMISEN_MATKA_VIRRAT);
  assert.equal(k.virrat.maamaski, MAAMASKI);
  assert.ok(k.virrat.retki && k.virrat.vanha && k.virrat.peitto);
  // Päätös 14 (Fable 6.9.2026): avausteksti ja loppusanat puhuvat väristä, eivät valoista.
  const data = lue('../js/linssit/ihmisen-matka-data.js');
  assert.ok(!/TODO \(Fable/.test(data), 'tekstien TODO on tehty');
  assert.match(k.esittely.teksti, /Väri leviää kartalla samaa vauhtia kuin ihminen/);
  assert.match(k.esittely.teksti, /Harmaa on vanha väestö/);
  assert.match(k.loppusanat.teksti, /^Koko maailma on nyt värissä/);
  assert.ok(!/valo/i.test(k.esittely.teksti) && !/valo/i.test(k.loppusanat.teksti), 'tekstit eivät enää puhu valoista');
});

test('moottorin koukut: virrat pallohaarassa, kamera virtojen käsissä, kehys syttyessä, purku', () => {
  const MOOTTORI = lue('../js/aikajana.js');
  assert.match(MOOTTORI, /import \{ luoVirrat \} from '\.\/aikajana-virrat\.js';/);
  const pallohaara = MOOTTORI.match(/ {2}rakennaValotPallolle\(\) \{[\s\S]*?\n {2}\}\n/)[0];
  assert.match(pallohaara, /if \(this\.kaari\.tummennus !== false\) \{\n\s*this\.kalvo = linssit\.kalvoRuudulle\(PALLON_OSA, \{/);
  assert.match(pallohaara, /if \(this\.kaari\.virrat\) \{\n\s*this\.virrat = luoVirrat\(\{/);
  const ajo = MOOTTORI.match(/ {2}ajaPysakille\(i, kesto\) \{[\s\S]*?\n {2}\}/)[0];
  assert.match(ajo, /^ {2}ajaPysakille\(i, kesto\) \{\n(?: {4}\/\/.*\n)* {4}if \(this\.virrat\?\.ohjaaKameraa\(\)\) return Promise\.resolve\(false\);/);
  assert.match(MOOTTORI, /this\.virrat\?\.sytyta\(i, t, valo\?\.g \?\? null\);/);
  assert.match(MOOTTORI, /this\.virrat\?\.siirry\(i\);/);
  assert.match(MOOTTORI, /this\.virrat\?\.siirry\(-1\);/);
  assert.match(MOOTTORI, /this\.virrat\?\.pura\(\);\n\s*this\.virrat = null;/);
  // Kalvo hyväksyy kankaan ja antaa päivittimen.
  const LINSSIT = lue('../js/pallolauta/linssit.js');
  assert.match(LINSSIT, /const onKangas = Boolean\(kuva\) && typeof kuva === 'object' && typeof kuva\.getContext === 'function';/);
  assert.match(LINSSIT, /paivita: \(\) => \{\n\s*if \(!tila\.tekstuuri \|\| tila\.peruttu\) return;\n\s*tila\.tekstuuri\.needsUpdate = true;/);
  // Virtamoduuli ei koske Globe.gl:n kameraan suoraan: ajo laudan kameralla.
  const VIRRAT = lue('../js/aikajana-virrat.js');
  assert.match(VIRRAT, /k\.ajaKamera\(\{ lat: tila\.pov\.lat, lng: tila\.pov\.lng, leveys: tila\.pov\.leveys \}, \{ kesto: 0 \}\);/);
  assert.ok(!/pointOfView\(\{/.test(VIRRAT), 'virrat kirjoittaa Globe.gl:n kameraa suoraan');
  // Reduced motion: kamera ei seuraa.
  assert.match(VIRRAT, /const ohjaaKameraa = \(\) => !reduced && /);
  // Css: kehys ja nuoli.
  const CSS = lue('../css/aikajana.css');
  assert.match(CSS, /\.aikajana-virta-kuva\.esilla\.pieni \{ transform: [^}]*scale\(0\.5\)/);
  assert.match(CSS, /\.aikajana-virta-nuoli \{/);
  // sw.js SHELL kantaa uudet moduulit (offline) — myös työsäikeen.
  const SW = lue('../sw.js');
  for (const p of ['./js/aikajana-virrat.js', './js/aikajana-virrat-laskenta.js', './js/aikajana-virrat-tyo.js', './js/linssit/ihmisen-matka-virrat.js', './js/linssit/ihmisen-matka-maamaski.js']) {
    assert.ok(SW.includes(`'${p}'`), `${p} puuttuu sw.js SHELListä`);
  }
});

test('hionta 6.9.2026: laskenta työsäikeessä varapolulla, Käynnistä odottaa, merkit linssin alla', () => {
  const VIRRAT = lue('../js/aikajana-virrat.js');
  const TYO = lue('../js/aikajana-virrat-tyo.js');
  // Työsäie tuo saman puhtaan moduulin kuin testit; vastaus siirretään puskureina.
  assert.match(TYO, /from '\.\/aikajana-virrat-laskenta\.js'/);
  assert.match(TYO, /self\.postMessage\(\{ kentat: \{ aika: kentat\.aika, virta: kentat\.virta \}, tarkka \}, siirto\);/);
  assert.match(VIRRAT, /new Worker\(new URL\(TYOSAIKEEN_POLKU, document\.baseURI\), \{ type: 'module' \}\)/);
  assert.ok(!/import\.meta/.test(VIRRAT), 'import.meta ei kelpaa yhden tiedoston versioon');
  assert.match(VIRRAT, /tyosaie\.addEventListener\('error', \(e\) => varapolku\(/);
  assert.match(VIRRAT, /const laskePaasaikeessa = \(\) => \{/);
  // Kalvo kaksinkertaisella resoluutiolla ja tarkennetuilla kentillä.
  assert.match(VIRRAT, /export const PIIRTOKERROIN = 2;/);
  assert.match(VIRRAT, /kangas\.width = W \* kerroin;/);
  assert.match(VIRRAT, /tarkennaKentat\(value\.kentat, \{ maa, peitto: peittoMaski, leveys: W, korkeus: H, kerroin \}\)/);
  // Nuoli pallon koteloon, ei linssin juureen (pinonta).
  assert.match(VIRRAT, /\(kotelo \?\? ajo\.juuri\)\?\.appendChild\(nuoli\);/);
  // Moottori: Käynnistä odottaa laskennan; kuori on pinontayhteys linssin ajan.
  const MOOTTORI = lue('../js/aikajana.js');
  assert.match(MOOTTORI, /aloitaAjo\(\) \{\n\s*if \(!this\.avausKesken\) return;\n\s*if \(this\.odotaVirtoja\(\)\) return;/);
  assert.match(MOOTTORI, /odotaVirtoja\(\) \{[\s\S]*?virrat\.valmis\.then\(/);
  const CSS = lue('../css/aikajana.css');
  assert.match(CSS, /body\.aikajana-paalla \.pallo-kuori\.pallolauta \{ isolation: isolate; \}/);
});
