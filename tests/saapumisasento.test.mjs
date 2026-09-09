/*
 * SAAPUMISASENTO (js/saapumisasento.js).
 *
 * Omistaja 9.9.2026 klo 16.10 (Raamattu, SAAPUMISESSA KAMERA ASETTUU
 * NIIN, ETTA KAUPUNKI ON ALIMMASSA KOLMANNEKSESSA JA LUENTAKUVA SEN
 * YLAPUOLELLA HIEMAN OIKEALLA, sanatarkasti): *"kun tullaan uuteen
 * kaupunkiin, kamera saisi asettua niin että kaupunki jää alimpaan
 * kolmannekseen ja kuva tulee sen yläpuolelle ja vähän oikealle, niin
 * että se ei jää matkakirjan tekstin peittoon varsinkin pienillä
 * näytöillä"*.
 *
 * MITÄ TÄSSÄ MITATAAN — kolme asiaa, jotka eivät näy diffistä eivätkä
 * ruutukaappauksesta yhdellä laitteella:
 *
 *   1. KAUPUNKI ON ALIMMASSA KOLMANNEKSESSA JOKA RUUDULLA. Asento on
 *      osuus näkymästä, ei pikselimäärä, joten sama sääntö on voimassa
 *      430 × 930:llä ja 2000 × 1125:llä. Testi ajaa asennon takaisin
 *      ruutuosuuksiksi ja tarkistaa, että kaupunki on kolmanneksessa.
 *   2. LUENTAKUVA ON KAUPUNGIN YLÄPUOLELLA JA OIKEALLA EIKÄ LEIKKAA
 *      MATKAKIRJAKORTTIA. Tämä on tilauksen ydin ("varsinkin pienillä
 *      näytöillä"): jos kuva ei mahdu, sen on PIENENNYTTÄVÄ eikä
 *      peitettävä tekstiä.
 *   3. ANKKURI ON LAUDAN PISTE. Ruutu ↔ lauta -muunnos on
 *      edestakainen, raahaus siirtää ankkuria ja kartan liike EI
 *      muuta sitä (omistaja 9.9.2026 klo 16.15, Raamattu LUENTAKUVAA
 *      VOI ITSE LIIKUTTAA, JA SE ON ANKKUROITU KARTAN KOHTAAN).
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  SAAPUMISEN_KAUPUNKI, saapumisenPoikkeama, saapumisenKameranKohta,
  saapumisenPallonKohta, luentakuvanSijainti, luentakuvanLaatikko,
  laatikotOsuvat, luentakuvanPerusleveys, laudaltaRuudulle, ruudultaLaudalle,
  onRaahaus, LUENTAKUVAN_SIVUSIIRTO, LUENTAKUVAN_VAHIN_PX,
} from '../js/saapumisasento.js';

/** Ruudut, joilla jokainen sääntö on voimassa (tilaus: eri ruutukoot). */
const RUUDUT = [
  { nimi: 'puhelin 430×930', w: 430, h: 930 },
  { nimi: 'tabletti 820×1180', w: 820, h: 1180 },
  { nimi: 'työpöytä 1600×1000', w: 1600, h: 1000 },
  { nimi: 'iso ruutu 2000×1125', w: 2000, h: 1125 },
];

/* ---------------------------------------------------------------- */
/* 1. Kamera: kaupunki alimpaan kolmannekseen                        */
/* ---------------------------------------------------------------- */

test('kaupungin tavoitepaikka on alimmassa kolmanneksessa, hieman vasemmalla', () => {
  assert.ok(SAAPUMISEN_KAUPUNKI.y >= 0.75 && SAAPUMISEN_KAUPUNKI.y <= 0.8,
    `kaupungin y ${SAAPUMISEN_KAUPUNKI.y} ei ole haarukassa 0,75–0,80`);
  assert.ok(SAAPUMISEN_KAUPUNKI.y > 2 / 3, 'kaupunki ei ole alimmassa kolmanneksessa');
  assert.ok(SAAPUMISEN_KAUPUNKI.x >= 0.4 && SAAPUMISEN_KAUPUNKI.x <= 0.45,
    `kaupungin x ${SAAPUMISEN_KAUPUNKI.x} ei ole haarukassa 0,40–0,45`);
  const poikkeama = saapumisenPoikkeama();
  assert.ok(poikkeama.y > 0, 'kaupunki on keskipisteen ALAPUOLELLA');
  assert.ok(poikkeama.x < 0, 'kaupunki on keskipisteestä VASEMMALLE');
});

test('tasolaudan kohdistuspiste vie kaupungin alimpaan kolmannekseen joka ruudulla', () => {
  const kaupunki = { x: 5000, y: 3000 };
  const leveys = 240;
  for (const ruutu of RUUDUT) {
    const keskus = saapumisenKameranKohta({
      ...kaupunki, leveys, paneW: ruutu.w, paneH: ruutu.h,
    });
    // Sama zoomi kuin ennen: vain kohdistuspiste siirtyi.
    const korkeus = leveys * (ruutu.h / ruutu.w);
    const osuusX = 0.5 + (kaupunki.x - keskus.x) / leveys;
    const osuusY = 0.5 + (kaupunki.y - keskus.y) / korkeus;
    assert.ok(Math.abs(osuusX - SAAPUMISEN_KAUPUNKI.x) < 1e-9,
      `${ruutu.nimi}: kaupungin x-osuus ${osuusX.toFixed(3)}`);
    assert.ok(osuusY > 2 / 3 && osuusY <= 0.8,
      `${ruutu.nimi}: kaupungin y-osuus ${osuusY.toFixed(3)} ei ole alimmassa kolmanneksessa`);
    // Piste laudalla EI liiku — vain kamera.
    assert.equal(kaupunki.x, 5000);
    assert.equal(kaupunki.y, 3000);
  }
});

test('pallon kohdistuspiste katsoo kaupungin pohjoispuolelle ja hieman itään', () => {
  // Lontoo, saapumisnäkymä 240 lautayksikköä = 7,2° kaarta.
  const lat = 51.5;
  const lng = -0.13;
  for (const ruutu of RUUDUT) {
    const kohta = saapumisenPallonKohta({
      lat, lng, leveysAst: 7.2, paneW: ruutu.w, paneH: ruutu.h,
    });
    assert.ok(kohta.lat > lat, `${ruutu.nimi}: kamera ei nouse kaupungin pohjoispuolelle`);
    assert.ok(kohta.lng > lng, `${ruutu.nimi}: kamera ei siirry kaupungin itäpuolelle`);
    // Osuus takaisin: kaupunki asettuu pyydettyyn kohtaan ruudulla.
    const korkeusAst = 7.2 * (ruutu.h / ruutu.w);
    const osuusY = 0.5 + (kohta.lat - lat) / korkeusAst;
    assert.ok(osuusY > 2 / 3 && osuusY <= 0.8,
      `${ruutu.nimi}: kaupungin y-osuus ${osuusY.toFixed(3)}`);
  }
});

test('pallon siirto on nollaa ilman mittoja eikä kaadu puuttuviin arvoihin', () => {
  assert.deepEqual(saapumisenPallonKohta({ lat: 10, lng: 20, leveysAst: 0, paneW: 0, paneH: 0 }),
    { lat: 10, lng: 20 });
  assert.equal(saapumisenPallonKohta({}), null);
  assert.equal(saapumisenKameranKohta({}), null);
});

/* ---------------------------------------------------------------- */
/* 2. Luentakuva: kaupungin yläpuolelle, oikealle, ei kortin päälle  */
/* ---------------------------------------------------------------- */

/** Kaupungin piste saapumisasennossa tälle ruudulle. */
function kaupunkiRuudulla(ruutu) {
  return { x: ruutu.w * SAAPUMISEN_KAUPUNKI.x, y: ruutu.h * SAAPUMISEN_KAUPUNKI.y };
}

/**
 * Matkakirjakortti: työpöydällä vasemmassa ylänurkassa (css
 * body[data-mode] .fact-card, width min(340px, 46 %)), puhelimella
 * ylhäällä lähes ruudun levyisenä.
 */
function kortti(ruutu) {
  const w = Math.min(340, ruutu.w * 0.46);
  return { x: 8, y: 8, w, h: Math.min(ruutu.h * 0.4, 420) };
}

test('luentakuva nousee kaupungin yläpuolelle ja keskilinja siirtyy oikealle', () => {
  for (const ruutu of RUUDUT) {
    const kaupunki = kaupunkiRuudulla(ruutu);
    const sijainti = luentakuvanSijainti({
      paneW: ruutu.w, paneH: ruutu.h, kaupunki, kortti: kortti(ruutu),
      perusleveys: luentakuvanPerusleveys(ruutu.w, ruutu.w),
      lisakorkeus: 44,
    });
    assert.ok(sijainti.y < kaupunki.y,
      `${ruutu.nimi}: kuvan alareuna ei ole kaupungin pisteen yläpuolella`);
    assert.ok(sijainti.x > kaupunki.x,
      `${ruutu.nimi}: kuvan keskilinja ei ole kaupungista oikealle`);
    // Siirto 10–20 % näkymän leveydestä — tai reunan pakottama vähemmän.
    const siirto = (sijainti.x - kaupunki.x) / ruutu.w;
    assert.ok(siirto > 0.02, `${ruutu.nimi}: sivusiirto ${siirto.toFixed(3)} on olematon`);
    assert.ok(siirto <= LUENTAKUVAN_SIVUSIIRTO + 1e-6,
      `${ruutu.nimi}: sivusiirto ${siirto.toFixed(3)} ylittää tilauksen`);
    // Kuva pysyy karttapinnalla.
    const laatikko = luentakuvanLaatikko(sijainti);
    assert.ok(laatikko.x >= 0 && laatikko.x + laatikko.w <= ruutu.w + 0.5,
      `${ruutu.nimi}: kuva vuotaa sivusuunnassa yli pinnan`);
    assert.ok(laatikko.y >= 0, `${ruutu.nimi}: kuva vuotaa yläreunan yli`);
  }
});

test('luentakuva ei leikkaa matkakirjakorttia millään ruutukoolla', () => {
  for (const ruutu of RUUDUT) {
    const k = kortti(ruutu);
    const sijainti = luentakuvanSijainti({
      paneW: ruutu.w, paneH: ruutu.h, kaupunki: kaupunkiRuudulla(ruutu), kortti: k,
      perusleveys: luentakuvanPerusleveys(ruutu.w, ruutu.w),
      lisakorkeus: 44,
    });
    assert.ok(!laatikotOsuvat(luentakuvanLaatikko(sijainti), k),
      `${ruutu.nimi}: kuva osuu matkakirjakorttiin`);
  }
});

test('ahdas ruutu pienentää kuvaa — kortin tekstiä ei peitetä', () => {
  // Puhelin, jonka matkakirjakortti täyttää ruudun ylälaidan lähes
  // kokonaan: kuvalle jää vain kapea kaista kortin ja kaupungin väliin.
  const ruutu = { w: 430, h: 930 };
  const iso = { x: 8, y: 8, w: 414, h: 560 };
  const vapaa = luentakuvanSijainti({
    paneW: ruutu.w, paneH: ruutu.h, kaupunki: kaupunkiRuudulla(ruutu), kortti: null,
    perusleveys: luentakuvanPerusleveys(ruutu.w, ruutu.w), lisakorkeus: 44,
  });
  const ahdas = luentakuvanSijainti({
    paneW: ruutu.w, paneH: ruutu.h, kaupunki: kaupunkiRuudulla(ruutu), kortti: iso,
    perusleveys: luentakuvanPerusleveys(ruutu.w, ruutu.w), lisakorkeus: 44,
  });
  assert.ok(ahdas.leveys < vapaa.leveys, 'kuva ei pienentynyt kortin alta');
  assert.ok(ahdas.leveys >= Math.min(LUENTAKUVAN_VAHIN_PX, vapaa.leveys) - 0.5,
    'kuva kutistui mitättömäksi');
  assert.ok(!laatikotOsuvat(luentakuvanLaatikko(ahdas), iso), 'pienennettykin kuva peittää kortin');
});

test('ilman korttia kuva saa perusleveytensä ja on kaupungin yllä', () => {
  const ruutu = { w: 1600, h: 1000 };
  const perusleveys = luentakuvanPerusleveys(ruutu.w, ruutu.w);
  const sijainti = luentakuvanSijainti({
    paneW: ruutu.w, paneH: ruutu.h, kaupunki: kaupunkiRuudulla(ruutu), kortti: null, perusleveys,
  });
  assert.equal(Math.round(sijainti.leveys), Math.round(perusleveys));
  assert.ok(sijainti.mahtuu, 'väljällä ruudulla kuvan pitäisi mahtua');
});

test('kallistettu kuva jättää alakulmalleen tilan kaupungin yläpuolelle', () => {
  /*
   * Kuva on kartalla vinossa (Raamattu, LUENTAKUVA ISOMPANA, VINOSSA JA
   * ILMAN LAATIKKOA). Kierretty laatikko ulottuu alakulmastaan
   * `leveys · sin(kulma) / 2` alemmas kuin suora, ja ilman varaa kulma
   * laskeutuu kaupungin nimen päälle. Vara mitataan tässä: ankkurin on
   * noustava, ja kuvan on kavennuttava saman verran.
   */
  const ruutu = { w: 1600, h: 1000 };
  const yhteiset = {
    paneW: ruutu.w,
    paneH: ruutu.h,
    kaupunki: kaupunkiRuudulla(ruutu),
    kortti: kortti(ruutu),
    perusleveys: luentakuvanPerusleveys(ruutu.w, ruutu.w),
    lisakorkeus: 44,
  };
  const suora = luentakuvanSijainti(yhteiset);
  const vino = luentakuvanSijainti({ ...yhteiset, kallistus: -3.2 });
  const kulmavara = (vino.leveys * Math.abs(Math.sin((-3.2 * Math.PI) / 180))) / 2;
  assert.ok(vino.y < suora.y, 'vino kuva ei noussut kaupungin pisteestä ylemmäs');
  assert.ok(Math.abs((suora.y - vino.y) - kulmavara) < 1.5,
    `nousu ${(suora.y - vino.y).toFixed(1)} px ei vastaa kulmavaraa ${kulmavara.toFixed(1)} px`);
  // Alakulma jää yhä kaupungin pisteen yläpuolelle.
  assert.ok(vino.y + kulmavara <= kaupunkiRuudulla(ruutu).y,
    'kallistettu alakulma laskeutuu kaupungin pisteen päälle');
});

test('perusleveys noudattaa css:n porrasta (900 px)', () => {
  assert.equal(luentakuvanPerusleveys(1600, 1600), 608);
  assert.equal(luentakuvanPerusleveys(430, 430), 344);
  assert.equal(luentakuvanPerusleveys(0, 0), 0);
});

/* ---------------------------------------------------------------- */
/* 3. Ankkuri kartan kohdassa                                        */
/* ---------------------------------------------------------------- */

/** Näkyvä alue laudan yksiköissä (ui.nakyvaAlue-muoto). */
const ALUE = {
  x: 4880, y: 2940, w: 240, h: 150, skaala: 1600 / 240,
};

test('ruutu ja lauta muuntuvat edestakaisin', () => {
  const paneW = 1600;
  const paneH = 1000;
  for (const piste of [{ x: 100, y: 200 }, { x: 800, y: 500 }, { x: 1580, y: 40 }]) {
    const lauta = ruudultaLaudalle(piste, ALUE, paneW, paneH);
    const takaisin = laudaltaRuudulle(lauta, ALUE, paneW, paneH, 0);
    assert.ok(Math.abs(takaisin.x - piste.x) < 1e-6, `x ${takaisin.x} ≠ ${piste.x}`);
    assert.ok(Math.abs(takaisin.y - piste.y) < 1e-6, `y ${takaisin.y} ≠ ${piste.y}`);
  }
});

test('kartan siirto liikuttaa kuvaa mutta EI muuta ankkuria', () => {
  const paneW = 1600;
  const paneH = 1000;
  const ankkuri = ruudultaLaudalle({ x: 900, y: 400 }, ALUE, paneW, paneH);
  // Kartta panoroi 60 lautayksikköä itään ja 20 etelään.
  const siirretty = { ...ALUE, x: ALUE.x + 60, y: ALUE.y + 20 };
  const ennen = laudaltaRuudulle(ankkuri, ALUE, paneW, paneH, 0);
  const jalkeen = laudaltaRuudulle(ankkuri, siirretty, paneW, paneH, 0);
  assert.ok(Math.abs(jalkeen.x - (ennen.x - 60 * ALUE.skaala)) < 1e-6,
    'kuva ei seurannut karttaa vaakasuunnassa');
  assert.ok(Math.abs(jalkeen.y - (ennen.y - 20 * ALUE.skaala)) < 1e-6,
    'kuva ei seurannut karttaa pystysuunnassa');
  // Ankkuri itse on yhä sama kartan kohta.
  const uusi = ruudultaLaudalle(jalkeen, siirretty, paneW, paneH);
  assert.ok(Math.abs(uusi.x - ankkuri.x) < 1e-6 && Math.abs(uusi.y - ankkuri.y) < 1e-6,
    'ankkuri vaihtui kartan liikkeestä');
});

test('zoomi pitää kuvan saman kartan kohdan päällä', () => {
  const paneW = 1600;
  const paneH = 1000;
  const ankkuri = ruudultaLaudalle({ x: 900, y: 400 }, ALUE, paneW, paneH);
  // Kaksinkertainen lähennys samasta keskipisteestä.
  const lahella = {
    x: ALUE.x + ALUE.w / 4, y: ALUE.y + ALUE.h / 4, w: ALUE.w / 2, h: ALUE.h / 2,
    skaala: ALUE.skaala * 2,
  };
  const paikka = laudaltaRuudulle(ankkuri, lahella, paneW, paneH, 0);
  const takaisin = ruudultaLaudalle(paikka, lahella, paneW, paneH);
  assert.ok(Math.abs(takaisin.x - ankkuri.x) < 1e-6 && Math.abs(takaisin.y - ankkuri.y) < 1e-6,
    'zoomi siirsi kuvan pois kartan kohdastaan');
});

test('raahaus siirtää ankkuria, napautus ei', () => {
  const skaala = ALUE.skaala;
  const ankkuri = { x: 5000, y: 3000 };
  // Napautus: sormi liikahti kaksi pikseliä.
  assert.equal(onRaahaus(2, 1), false, 'napautus tulkittiin raahaukseksi');
  // Raahaus: 40 px oikealle ja 25 px ylös.
  assert.equal(onRaahaus(40, -25), true, 'raahausta ei tunnistettu');
  const uusi = { x: ankkuri.x + 40 / skaala, y: ankkuri.y + -25 / skaala };
  assert.ok(uusi.x > ankkuri.x && uusi.y < ankkuri.y, 'ankkuri ei seurannut sormea');
  // Sama siirto ruudulla: kuva on siellä, mihin se raahattiin.
  const paikkaEnnen = laudaltaRuudulle(ankkuri, ALUE, 1600, 1000, 0);
  const paikkaJalkeen = laudaltaRuudulle(uusi, ALUE, 1600, 1000, 0);
  assert.ok(Math.abs((paikkaJalkeen.x - paikkaEnnen.x) - 40) < 1e-6);
  assert.ok(Math.abs((paikkaJalkeen.y - paikkaEnnen.y) + 25) < 1e-6);
});

test('kiertävä lauta: ankkuri kuuluu lähimpään kopioon', () => {
  const jakso = 12000;
  const paneW = 1600;
  const paneH = 1000;
  // Ankkuri laudan itälaidassa, näkymä länsilaidassa: oikea vastaus on
  // vasemmalle eikä koko laudan mitan verran oikealle.
  const alue = {
    x: 60, y: 2940, w: 240, h: 150, skaala: paneW / 240,
  };
  const paikka = laudaltaRuudulle({ x: 11980, y: 3000 }, alue, paneW, paneH, jakso);
  assert.ok(paikka.x < 0, `saumaa ei kierretty (x = ${paikka.x.toFixed(0)})`);
  assert.ok(paikka.x > -paneW, 'kiertokorjaus vei pisteen liian kauas');
});
