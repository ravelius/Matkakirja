/*
 * PERGAMENTIN REPALEINEN REUNA (js/pergamentti.js) — yhteinen osa.
 *
 * Omistaja 7.9.2026 ilta (iPad, Ihmisen matkan avauslaatikko):
 * *"Paperin rosoiset reunat ovat aivan liian geometrisiä ja niiden
 * takaa näkyy täysin mustaa, vaikka paperin ympärillä on sitten kevyt
 * hehku. Saisiko sen paperin ääriviivan tehtyä luonnollisemmin? Tämä
 * on kuitenkin monessa paikkaa toistuva osa, niin voi tehdä huolella."*
 *
 * Nämä testit vartioivat SÄÄNNÖT, jotka eivät näy silmällä: siemenen
 * vakaus (sama laatikko saa aina saman reunan), muodon mahtuminen
 * kuvaan (repeämä ei leikkaudu), maskin ja kajon YHTEINEN ääriviiva ja
 * se, ettei sumennus karkaa CSS-suodattimeksi (iOS-kuori). Pikselit
 * mitataan selaimessa: tools/savukkeet/savuke-pergamentti.mjs.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  HEHKU_KASVU, hehkuKuva, maskiKuva, repaleinenPaperi, reunapolku, siemenNimesta,
} from '../js/pergamentti.js';

/** Purkaa data-URI:n takaisin SVG-tekstiksi. */
const svg = (uri) => decodeURIComponent(uri.replace(/^data:image\/svg\+xml;charset=utf-8,/, ''));

/** Polun pisteet lukupareina. */
const pisteet = (d) => d.slice(1, -1).split('L').map((p) => p.split(' ').map(Number));

test('siemen on vakaa nimestä ja erottaa laatikot toisistaan', () => {
  assert.equal(siemenNimesta('Ihmisen matka'), siemenNimesta('Ihmisen matka'));
  assert.notEqual(siemenNimesta('Ihmisen matka'), siemenNimesta('Keksinnöt'));
  // Rajatapaukset eivät kaada: tyhjä ja puuttuva nimi ovat luku.
  for (const nimi of ['', null, undefined, 'ä']) {
    const s = siemenNimesta(nimi);
    assert.ok(Number.isInteger(s) && s >= 0 && s < 10000, `kelvoton siemen nimelle ${nimi}`);
  }
});

test('reunapolku on suljettu, kulmista viistetty ja mahtuu marginaaliin', () => {
  const d = reunapolku(siemenNimesta('Ihmisen matka'), 300);
  assert.ok(d.startsWith('M') && d.endsWith('Z'), 'polku ei ole suljettu');
  const p = pisteet(d);
  // Neljä sivua × (kaksi kulmapistettä + kaksi aaltoa) = 16 pistettä.
  assert.equal(p.length, 16);
  for (const [x, y] of p) {
    assert.ok(Number.isFinite(x) && Number.isFinite(y), `kelvoton piste ${x},${y}`);
    /*
     * Pisteet pysyvät marginaalin tuntumassa (12 ± aallon 3,5), jotta
     * turbulenssin siirtymä (enintään 8,25) mahtuu kuvaan.
     */
    assert.ok(x >= 8 && x <= 392, `x karkasi: ${x}`);
    assert.ok(y >= 8 && y <= 292, `y karkasi: ${y}`);
  }
  // KULMAT ON VIISTETTY: yksikään piste ei ole tarkassa kulmassa (12,12).
  assert.ok(!p.some(([x, y]) => x === 12 && y === 12), 'kulma jäi teräväksi suorakulmaksi');
  /*
   * YLÄ- JA ALAREUNA LIIKKUVAT VÄHEMMÄN KUIN SIVUT (omistaja 7.9.2026
   * ilta: *"Sivut ovat ihan ok, mutta ylä- ja alareuna on, kuin paperi
   * olisi tulessa"*). Vaakareunan pisteiden y-poikkeama marginaalista
   * on korkeintaan ±1,2; pystyreunan x-poikkeama saa olla ±3,5.
   */
  /*
   * Pisteet kulkevat myötäpäivään yläreunan viisteestä (ks.
   * reunapolku): 0 ja 3 ovat yläreunan viistepäät, 1–2 sen aallot,
   * 4 ja 7 oikean sivun viistepäät, 5–6 sen aallot, 9–10 alareunan
   * aallot ja 13–14 vasemman sivun aallot.
   */
  const vaaka = [1, 2, 9, 10].map((i) => Math.min(Math.abs(p[i][1] - 12), Math.abs(p[i][1] - 288)));
  const sivu = [5, 6, 13, 14].map((i) => Math.min(Math.abs(p[i][0] - 12), Math.abs(p[i][0] - 388)));
  assert.ok(Math.max(...vaaka) <= 1.2 + 1e-6,
    `vaakareunan aalto ${Math.max(...vaaka).toFixed(2)} on liian suuri`);
  assert.ok(Math.max(...sivu) <= 3.5 + 1e-6, `sivun aalto ${Math.max(...sivu).toFixed(2)} karkasi`);
  assert.ok(Math.max(...sivu) > Math.max(...vaaka), 'sivun pitää liikkua vaakareunaa enemmän');
  // Sama siemen antaa saman polun, eri siemen eri polun.
  assert.equal(reunapolku(7, 300), reunapolku(7, 300));
  assert.notEqual(reunapolku(7, 300), reunapolku(8, 300));
});

test('maski rikkoo reunan kahdella turbulenssilla ja pehmentää sen kuiduksi', () => {
  const kuva = svg(maskiKuva(siemenNimesta('Ihmisen matka')));
  assert.match(kuva, /^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"/);
  // Venytys elementin kokoon: ilman tätä muoto letterboxataan.
  assert.match(kuva, /preserveAspectRatio="none"/);
  // Kaksi eri karkeutta: pitkä mutka ja hieno kuitu.
  assert.equal((kuva.match(/feTurbulence/g) ?? []).length, 2);
  assert.equal((kuva.match(/feDisplacementMap/g) ?? []).length, 2);
  /*
   * TAAJUUS ON AKSELEITTAIN: x-taajuus (ensimmäinen luku) määrää ylä-
   * ja alareunan aaltoilun tiheyden, y-taajuus sivujen. Vaakareuna saa
   * matalamman taajuuden eli pidemmän ja rauhallisemman aallon.
   */
  assert.match(kuva, /type="fractalNoise" baseFrequency="0\.012 0\.022" numOctaves="2"/);
  assert.match(kuva, /type="fractalNoise" baseFrequency="0\.04 0\.075" numOctaves="3"/);
  /*
   * AMPLITUDI ON AKSELEITTAIN: G-kanava (y-siirtymä = ylä- ja
   * alareunan liike) vaimennetaan feColorMatrixilla, R-kanava
   * (sivut) jää ykköseksi. Keskikohta pysyy 0,5:ssä, muuten koko
   * reuna siirtyisi.
   */
  const matriisit = [...kuva.matchAll(/values="1 0 0 0 0 0 ([\d.]+) 0 0 ([\d.]+) 0 0 1 0 0 0 0 0 0 1"/g)];
  assert.equal(matriisit.length, 2, 'kummankin kohinan G-kanava vaimennetaan');
  for (const [, k, siirto] of matriisit) {
    assert.ok(Number(k) > 0.2 && Number(k) < 0.6, `pystyvaimennus ${k} ei ole noin kolmasosa`);
    assert.ok(Math.abs(0.5 * Number(k) + Number(siirto) - 0.5) < 1e-6, 'keskikohta ei pysy 0,5:ssä');
  }
  /*
   * Matriisin viimeinen rivi on "0 0 0 0 1": alfa pakotetaan ykköseksi,
   * jotta esikerrottu ja esikertomaton arvo ovat sama luku eikä
   * vaimennus laimene suodatinketjussa (js/pergamentti.js).
   */
  assert.equal((kuva.match(/0 0 0 0 1"/g) ?? []).length, 2, 'alfa on pakotettava ykköseksi');
  assert.match(kuva, /<feGaussianBlur in="reuna" stdDeviation="0\.8"\/>/);
  // Maski luetaan ALFANA: muoto on valkoinen, ulkopuolelle ei maalata mitään.
  assert.match(kuva, /fill="#ffffff"/);
  assert.ok(!kuva.includes('fill="#000'), 'musta täyttö lukisi maskissa peittävänä');
  // Suodatinalue on koko piirtoalue, ei polun laatikko: sumennus mahtuu.
  assert.match(kuva, /filterUnits="userSpaceOnUse"/);
  // Siemen näkyy kuvassa: kaksi laatikkoa ei saa samaa reunaa.
  assert.notEqual(maskiKuva(1), maskiKuva(2));
  assert.equal(maskiKuva(1), maskiKuva(1));
});

test('maskin korkeus seuraa laatikon sivusuhdetta (venytys on isotrooppinen)', () => {
  const korkeus = (uri) => Number(svg(uri).match(/height="(\d+)"/)[1]);
  // Leveä laatikko: 400 / 2 = 200 yksikköä korkea.
  assert.equal(korkeus(maskiKuva(5, 2)), 200);
  // Kapea puhelinlaatikko: 400 / 0,25 = 1600.
  assert.equal(korkeus(maskiKuva(5, 0.25)), 1600);
  // Kelvoton suhde putoaa oletukseen (4/3 → 300) eikä kaada.
  assert.equal(korkeus(maskiKuva(5, 0)), 300);
  assert.equal(korkeus(maskiKuva(5, NaN)), 300);
  // Rajat pitävät: äärimmäinen suhde ei karkaa.
  assert.equal(korkeus(maskiKuva(5, 100)), 120);
  assert.equal(korkeus(maskiKuva(5, 0.001)), 2400);
});

test('kajo on SAMA ääriviiva sumennettuna eikä yhtään CSS-suodatinta', () => {
  const siemen = siemenNimesta('Ihmisen matka');
  const kuva = svg(hehkuKuva(siemen, 4 / 3));
  // Kasvatettu piirtoalue: sama kerroin kuin CSS:n inset: -15%.
  const kerroin = 1 + 2 * HEHKU_KASVU;
  assert.equal(HEHKU_KASVU, 0.15);
  assert.match(kuva, new RegExp(`width="${Math.round(400 * kerroin)}"`));
  assert.match(kuva, new RegExp(`height="${Math.round(300 * kerroin)}"`));
  // Polku on keskellä ja SAMA muoto kuin maskissa, vain siirrettynä.
  const siirto = (Math.round(400 * kerroin) - 400) / 2;
  const maskinPisteet = pisteet(reunapolku(siemen, 300));
  const hehkunPisteet = pisteet(kuva.match(/ d="([^"]+)"/)[1]);
  assert.equal(hehkunPisteet.length, maskinPisteet.length);
  for (let i = 0; i < maskinPisteet.length; i += 1) {
    assert.ok(Math.abs(hehkunPisteet[i][0] - (maskinPisteet[i][0] + siirto)) < 0.02,
      `kajon piste ${i} ei osu paperin reunaan`);
  }
  /*
   * Kaksi sumennusta yhdistettynä: lähikajo ja laaja kajo. Säteet ja
   * väri vaimennettiin omistajan palautteen jälkeen (7.9.2026 ilta,
   * *"kuin paperi olisi tulessa"*): σ 9/18 → 6/12 ja kylläinen oranssi
   * → himmeä okra. Kajo on lyhdyn valo paperilla, ei liekki.
   */
  assert.match(kuva, /stdDeviation="6"/);
  assert.match(kuva, /stdDeviation="12"/);
  assert.match(kuva, /<feMerge>/);
  assert.match(kuva, /fill="#d9ae74"/);
  assert.ok(!kuva.includes('#ff9c3c'), 'liekinoranssi ei saa palata');
});

test('repaleinenPaperi antaa luokan ja muuttujat, myös kajokerrokselle', () => {
  const teeSolmu = (leveys, korkeus) => ({
    luokat: new Set(),
    vars: {},
    classList: { add(n) { this.luokat.add(n); } },
    style: { setProperty(n, v) { this.vars[n] = v; } },
    getBoundingClientRect: () => ({ width: leveys, height: korkeus }),
  });
  // classList ja style tarvitsevat oman `this`:n olion sisällä.
  const solmu = (leveys, korkeus) => {
    const s = teeSolmu(leveys, korkeus);
    s.classList.add = (n) => s.luokat.add(n);
    s.style.setProperty = (n, v) => { s.vars[n] = v; };
    return s;
  };

  const paperi = solmu(500, 375);
  const hehku = solmu(0, 0);
  const palaute = repaleinenPaperi(paperi, { siemen: siemenNimesta('Ihmisen matka'), hehku });
  assert.equal(palaute, paperi, 'kutsun pitää palauttaa elementti ketjutusta varten');
  assert.ok(paperi.luokat.has('pergamentti-repale'));
  assert.ok(hehku.luokat.has('pergamentti-hehku'));
  assert.match(paperi.vars['--pergamentti-maski'], /^url\("data:image\/svg\+xml;charset=utf-8,/);
  assert.match(hehku.vars['--pergamentti-hehkukuva'], /^url\("data:image\/svg\+xml;charset=utf-8,/);
  // Sivusuhde MITATTIIN elementistä: 500/375 = 4/3 → 300 yksikköä korkea.
  assert.match(decodeURIComponent(paperi.vars['--pergamentti-maski']), /height="300"/);

  // Ilman kajokerrosta kutsu toimii yhtä lailla.
  const yksin = solmu(400, 400);
  repaleinenPaperi(yksin, { siemen: 3 });
  assert.match(decodeURIComponent(yksin.vars['--pergamentti-maski']), /height="400"/);

  // Kelvoton elementti ei kaada kutsua (testien kevyt DOM-jäljitelmä).
  assert.doesNotThrow(() => repaleinenPaperi(null, { siemen: 1 }));
  assert.doesNotThrow(() => repaleinenPaperi({}, { siemen: 1 }));
});
