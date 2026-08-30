// Maailmanradion säännöt, jotka voi tarkistaa ilman selainta.
//
// Radiotila itsessään on ääntä ja DOM:ia, eikä sitä Nodessa aja mikään.
// Nämä asiat ovat silti puhdasta laskentaa, ja jokainen niistä rikkoutuisi
// hiljaa: kaupunkivalinta muuttuisi aineiston mukana kenenkään
// huomaamatta, ajoituksen vakiot voisi säätää yksi kerrallaan niin että
// yksi vaihe katoaa, ristihäivytyksen kaaren voisi vaihtaa lineaariseksi
// ilman että sen näkee koodista, ja nauhan nykäisyt voisi tasoittaa
// takaisin liu'uksi yhtä lukua muuttamalla.

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  radionKaupungit, kanavakaupungit, VIRITYKSEN_AJAT, VIRITYKSEN_VAIHEET, RISTIHAIVYTYS,
} from '../js/linssit/radio.js';
import {
  arvoNykaisyt, nykaisyKaari, lukonYlitys, NYKAISYN_RAJAT,
} from '../js/linssit/radiosoitin.js';
import { mulberry32 } from '../js/game.js';
import { PACKS } from '../js/pack.js';

/** Laudat, joilla radiolinssi on käytössä (radio.js LINSSI.laudat). */
const RADIOLAUDAT = ['maailmankartta', 'africa'];

function lauta(tunnus) {
  const pakkaus = PACKS.find((p) => p.id === tunnus);
  assert.ok(pakkaus, `lautaa ${tunnus} ei löytynyt`);
  return pakkaus;
}

test('radiotilassa näkyy tasan yksi kaupunki jokaisesta maasta', () => {
  for (const tunnus of RADIOLAUDAT) {
    const pakkaus = lauta(tunnus);
    const nakyvat = radionKaupungit(pakkaus.map, pakkaus.cities);

    const maat = new Map();
    for (const id of nakyvat) {
      const iso = pakkaus.map.cityCountry?.[id];
      // Maaton kaupunki edustaa itseään, ks. radionKaupungit.
      if (!iso) continue;
      maat.set(iso, (maat.get(iso) ?? 0) + 1);
    }
    for (const [iso, monta] of maat) {
      assert.equal(monta, 1, `${tunnus}: maalla ${iso} on ${monta} kaupunkia radiotilassa`);
    }

    // Yhtään maata ei saa myöskään kadota: jokainen laudalla oleva maa
    // on yhä napautettavissa, vaikka sen kaupungeista näkyy vain yksi.
    const kaikkiMaat = new Set(
      pakkaus.cities.map((k) => pakkaus.map.cityCountry?.[k.id]).filter(Boolean),
    );
    assert.equal(maat.size, kaikkiMaat.size, `${tunnus}: maita katosi kartalta`);
  }
});

test('jokainen kanava on yhä valittavissa — karsinta ei vie yhtään asemaa', () => {
  for (const tunnus of RADIOLAUDAT) {
    const pakkaus = lauta(tunnus);
    const nakyvat = radionKaupungit(pakkaus.map, pakkaus.cities);
    const kanavalliset = kanavakaupungit(pakkaus.map, pakkaus.cities);

    // Kanavan tunnistaa maasta, joten "kaikki kanavat" on niiden maiden
    // joukko, joilla kanava on. Yhdenkään ei saa jäädä ilman nappia.
    const ennen = new Set([...kanavalliset].map((id) => pakkaus.map.cityCountry[id]));
    const jalkeen = new Set(
      [...nakyvat].filter((id) => kanavalliset.has(id)).map((id) => pakkaus.map.cityCountry[id]),
    );
    assert.equal(jalkeen.size, ennen.size, `${tunnus}: kanavia katosi`);
  }
});

test('pelaajan oma sijainti näkyy aina, vaikka maa valitsisi toisen kaupungin', () => {
  const pakkaus = lauta('maailmankartta');
  const oletus = radionKaupungit(pakkaus.map, pakkaus.cities);

  // Etsitään kaupunki, joka EI ole maansa oletusvalinta — juuri se on
  // se tapaus, jossa pelaaja katoaisi kartalta.
  const piilossa = pakkaus.cities.find((k) => !oletus.has(k.id) && pakkaus.map.cityCountry?.[k.id]);
  assert.ok(piilossa, 'karsinta ei piilottanut yhtään kaupunkia — testi ei mittaa mitään');

  const sijainnilla = radionKaupungit(pakkaus.map, pakkaus.cities, { sijainti: piilossa.id });
  assert.ok(sijainnilla.has(piilossa.id), `pelaajan sijainti ${piilossa.id} katosi kartalta`);
  // Sijainti korvaa maansa edustajan eikä tule sen rinnalle: joukon koko
  // ei muutu.
  assert.equal(sijainnilla.size, oletus.size, 'sijainti lisäsi kaupungin sen sijaan että korvasi');
});

test('valinta on vakaa: sama lauta antaa aina saman kaupungin', () => {
  const pakkaus = lauta('maailmankartta');
  const eka = [...radionKaupungit(pakkaus.map, pakkaus.cities)].sort();
  const toka = [...radionKaupungit(pakkaus.map, [...pakkaus.cities])].sort();
  assert.deepEqual(toka, eka);
});

test('virityksessä on tilaa kaikille kolmelle vaiheelle', () => {
  const { vahimmaisaika, siirtyma, lukittuminen } = VIRITYKSEN_AJAT;

  // Omistajan antama haarukka 4.8.2026: "ehdotus 2,5–3 s".
  assert.ok(vahimmaisaika >= 2500 && vahimmaisaika <= 3000, `vähimmäisaika ${vahimmaisaika} ms`);

  /*
   * Haku on se vaihe, joka jää väliin, jos siirtymä ja lukittuminen
   * täyttävät vähimmäisajan. Silloin nopea asema näyttäisi liu'un ja
   * napsahduksen, eikä kolmesta vaiheesta olisi jäljellä kuin kaksi.
   * Sekunti on se raja, jonka alle pientä liikettä ei ehdi huomata.
   */
  const haku = vahimmaisaika - siirtyma - lukittuminen;
  assert.ok(haku >= 1000, `haulle jää vain ${haku} ms`);
  assert.deepEqual(VIRITYKSEN_VAIHEET, ['siirtyma', 'haku', 'lukittuu']);
});

// --- ristihäivytys ----------------------------------------------------------
//
// Omistajan toive: "Virityssuhina saisi feidautua kanavanvaihdon alussa ja
// lopussa. Tarkoitan, että siinä pitäisi olla ristifeidaus." Vaihdon
// kumpikin puoli on eri tekniikkaa — viritys on Web Audiota, lähetys
// <audio>-elementti — joten ainoa asia, joka pitää ne yhdessä, on tämä
// kaari. Jos se luiskahtaa lineaariseksi, vaihdon keskelle tulee kuoppa,
// jonka huomaa vain kuuntelemalla.

test('ristihäivytyksen kaari on tasatehoinen', () => {
  const { nouseva, vaistyva } = RISTIHAIVYTYS;

  assert.ok(nouseva(0) < 1e-9, 'nouseva puoli ei ala hiljaisuudesta');
  assert.ok(Math.abs(nouseva(1) - 1) < 1e-9, 'nouseva puoli ei päädy täyteen');
  assert.ok(Math.abs(vaistyva(0) - 1) < 1e-9, 'väistyvä puoli ei ala täydestä');
  assert.ok(vaistyva(1) < 1e-9, 'väistyvä puoli ei päädy hiljaisuuteen');

  let edellinenNousu = -1;
  let edellinenVaisto = 2;
  for (let i = 0; i <= 200; i++) {
    const x = i / 200;
    // sin² + cos² = 1: kaksi riippumatonta ääntä summautuu teholtaan,
    // joten juuri tämä pitää yhteistehon vakiona koko vaihdon ajan.
    const teho = nouseva(x) ** 2 + vaistyva(x) ** 2;
    assert.ok(Math.abs(teho - 1) < 1e-9, `yhteisteho ${teho} kohdassa ${x}`);
    assert.ok(nouseva(x) > edellinenNousu, 'nouseva puoli ei kasva tasaisesti');
    assert.ok(vaistyva(x) < edellinenVaisto, 'väistyvä puoli ei laske tasaisesti');
    edellinenNousu = nouseva(x);
    edellinenVaisto = vaistyva(x);
  }

  // Rajojen ulkopuoli rajautuu: ajastin voi herätä myöhässä, eikä
  // yli menevä osuus saa kääntää kaarta takaisin alaspäin.
  assert.equal(nouseva(-1), 0);
  assert.equal(nouseva(5), 1);
  assert.equal(vaistyva(-1), 1);
  assert.ok(vaistyva(5) < 1e-9, 'väistyvä puoli ei sammu rajan yli mentäessä');
  assert.equal(nouseva('ei luku'), 0);
});

test('ristihäivytys on lyhyt mutta kuuluva ja portaaton', () => {
  const { kesto, askel } = RISTIHAIVYTYS;
  /*
   * Alaraja: 0,3 s kuuluu leikkauksena. Yläraja: sekunnin vaihto jättää
   * lähetyksen ensimmäisen lauseen kohinan alle, ja alkupäässä se venyisi
   * yli siirtymävaiheen (VIRITYKSEN_AJAT.siirtyma).
   */
  assert.ok(kesto >= 0.4 && kesto <= 1, `ristihäivytys kestää ${kesto} s`);
  assert.ok(
    kesto * 1000 <= VIRITYKSEN_AJAT.siirtyma,
    'vaihto kestää pidempään kuin nauhan siirtymä',
  );
  // Elementin puoli askelletaan ajastimella; harvempi askel kuuluu portaina.
  assert.ok((kesto * 1000) / askel >= 20, `vaihdossa vain ${(kesto * 1000) / askel} askelta`);
});

// --- nauhan nykäisevä liike -------------------------------------------------
//
// Omistajan toive: "Kanavalista liikkuu liian pehmeästi. Jos sitä oikeasti
// kädellä vääntää, niin se menee välillä töksähtäen, tai ei ainakaan noin
// pehmeästi." Animaation ajaa CSS, joten testattavissa on arvonta — ja
// juuri se on se osa, joka voisi hiljaa tasoittua takaisin liu'uksi.

/** Tarkistaa yhden arvotun liu'un kaikkia rajoja vasten. */
function tarkistaNykaisyt({ pisteet, ylitys }, nimi) {
  const R = NYKAISYN_RAJAT;
  assert.ok(ylitys >= R.ylitys[0] - 1e-9 && ylitys <= R.ylitys[1] + 1e-9,
    `${nimi}: ylitys ${ylitys}`);

  assert.deepEqual(pisteet[0], { aika: 0, etenema: 0 }, `${nimi}: liuku ei ala lähtöruudusta`);
  const viimeinen = pisteet.at(-1);
  assert.equal(viimeinen.aika, 1, `${nimi}: liuku ei pääty kestonsa loppuun`);
  assert.equal(viimeinen.etenema, 1, `${nimi}: nauha ei päädy kohdalleen`);

  let seisonnat = 0;
  let suurinNykaisy = 0;
  for (let i = 1; i < pisteet.length; i++) {
    const edellinen = pisteet[i - 1];
    const piste = pisteet[i];
    assert.ok(piste.aika > edellinen.aika - 1e-9, `${nimi}: ajat eivät ole järjestyksessä`);
    assert.ok(piste.aika <= 1 + 1e-9, `${nimi}: piste ${piste.aika} kestonsa ulkopuolella`);
    assert.ok(piste.etenema <= 1 + ylitys + 1e-9, `${nimi}: etenemä ${piste.etenema} ylityksen yli`);
    // Nauha ei peruuta kesken liu'un: ainoa taaksepäin menevä liike on
    // ylityksen korjaus aivan lopussa.
    if (piste.etenema < edellinen.etenema - 1e-9) {
      assert.ok(i === pisteet.length - 1, `${nimi}: nauha peruutti kesken liu'un`);
    }
    if (Math.abs(piste.etenema - edellinen.etenema) < 1e-9 && piste.aika > edellinen.aika) {
      seisonnat += 1;
    }
    suurinNykaisy = Math.max(suurinNykaisy, piste.etenema - edellinen.etenema);
  }

  // TÄMÄ TESTI ON KOKO MUUTOKSEN SYY: tasainen liuku ei seiso välillä.
  assert.ok(seisonnat >= R.nykaisyja[0], `${nimi}: vain ${seisonnat} pysähdystä`);
  assert.ok(suurinNykaisy >= 0.15, `${nimi}: suurin nykäisy vain ${suurinNykaisy}`);
}

test('nauhan liuku tarttuu ja irtoaa tuhannella kierroksella', () => {
  for (let i = 0; i < 1000; i++) {
    tarkistaNykaisyt(arvoNykaisyt(), `kierros ${i}`);
  }
});

test('nykäisyt pysyvät rajoissa myös ääriarvoilla', () => {
  // Satunnaislähde reunoillaan on se tapaus, jota tuhannellakaan
  // kierroksella ei osu kohdalle — ja juuri siellä rajat pettävät.
  tarkistaNykaisyt(arvoNykaisyt(() => 0), 'nolla');
  tarkistaNykaisyt(arvoNykaisyt(() => 0.9999999), 'ykkönen');
  tarkistaNykaisyt(arvoNykaisyt(() => 0.5), 'puolikas');
  let vuoro = 0;
  tarkistaNykaisyt(arvoNykaisyt(() => ((vuoro++ % 2) ? 0.999999 : 0)), 'vuorottelu');
});

test('liike on siemennettävissä eikä toista itseään', () => {
  // Siemennetty lähde antaa saman liikkeen: testi ja demo saavat
  // toistettavan tuloksen, vaikka pelissä jokainen liuku on oma.
  assert.equal(nykaisyKaari(mulberry32(4242)), nykaisyKaari(mulberry32(4242)));

  // Peräkkäiset liu'ut ovat eri: sama ote kahdesti ei ole käden liikettä.
  const arvonta = mulberry32(11);
  const nahdyt = new Set();
  for (let i = 0; i < 200; i++) nahdyt.add(nykaisyKaari(arvonta));
  assert.ok(nahdyt.size >= 190, `200 liu'usta vain ${nahdyt.size} erilaista`);
});

test('kaari kelpaa CSS:n linear()-pehmentimeksi', () => {
  const kaari = nykaisyKaari(mulberry32(7));
  assert.ok(kaari.startsWith('linear(') && kaari.endsWith(')'), `muoto ${kaari}`);
  const osat = kaari.slice('linear('.length, -1).split(', ');
  assert.ok(osat.length >= 6, `pehmentimessä vain ${osat.length} pistettä`);
  assert.equal(osat[0], '0', 'pehmennin ei ala nollasta');
  assert.equal(osat.at(-1), '1', 'pehmennin ei pääty ykköseen');

  let edellinen = 0;
  for (const osa of osat.slice(1, -1)) {
    const [arvo, kohta] = osa.split(' ');
    assert.ok(Number.isFinite(Number(arvo)), `kelvoton arvo ${arvo}`);
    assert.ok(kohta?.endsWith('%'), `kelvoton ajankohta ${kohta}`);
    const prosentti = Number(kohta.slice(0, -1));
    assert.ok(prosentti > 0 && prosentti < 100, `ajankohta ${prosentti} % rajojen ulkopuolella`);
    assert.ok(prosentti >= edellinen, 'ajankohdat eivät ole järjestyksessä');
    edellinen = prosentti;
  }
});

test('lukittuminen käy kohteen yli ja palaa', () => {
  const { lukonYlitys: rajat } = NYKAISYN_RAJAT;
  for (let i = 0; i < 200; i++) {
    // Ylitys on lähtökohdan vastakkaisella puolella: vasemmalta tuleva
    // nauha käy oikealla ja palaa.
    const vasemmalta = lukonYlitys(-2.4);
    const oikealta = lukonYlitys(2.4);
    assert.ok(vasemmalta > 0, `vasemmalta tullut ylitti väärään suuntaan (${vasemmalta})`);
    assert.ok(oikealta < 0, `oikealta tullut ylitti väärään suuntaan (${oikealta})`);
    for (const arvo of [vasemmalta, oikealta]) {
      const koko = Math.abs(arvo);
      assert.ok(koko >= rajat[0] - 0.05 && koko <= rajat[1] + 0.05, `ylitys ${koko} px`);
    }
  }
  // Nollasta lähtevä nauha ei jää ilman ylitystä.
  assert.notEqual(lukonYlitys(0), 0);
});
