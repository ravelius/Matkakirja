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
  assert.match(kuva, /type="fractalNoise" baseFrequency="0\.022" numOctaves="2"/);
  assert.match(kuva, /type="fractalNoise" baseFrequency="0\.075" numOctaves="3"/);
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
  // Kaksi sumennusta yhdistettynä: lähikajo ja laaja kajo.
  assert.match(kuva, /stdDeviation="9"/);
  assert.match(kuva, /stdDeviation="18"/);
  assert.match(kuva, /<feMerge>/);
  assert.match(kuva, /fill="#ff9c3c"/);
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
