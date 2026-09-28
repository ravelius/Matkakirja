/*
 * ISS:N KYYTI — YDIN (js/linssit/iss-kyyti.js). Samat luvut kuin natiivin
 * Linssit-testit/Testit/IssKyytiTestit.cs: ikkunan katsekohde 2,69°
 * edellä, etäisyys 521 km ja kallistus 37,7° 420 km:ssä, silmä ISS:ssä;
 * seuranta ISS:n takana ja yllä; tilakone napautuksin ja ✕:llä;
 * vähennetty liike; LIVE / rata-arvio -tietorivi; ilmakehän kaaren kaava.
 * Selaimen oma mittaus on tools/savukkeet/savuke-iss-kyyti.mjs.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  ikkunanKulma, seurannanKulma, kuvakulma, sekoita, kaari, suunta, kameranAsento, pisteelta,
  luoKyyti, tietorivi, kaarenKirkkaus, kaarenSavy, kaarenAurinko, TILA,
  SEURANNAN_ETAISYYS_M, IKKUNAN_KENTTA, KYYTIIN_S, IKKUNAAN_S, KAUKOON_S,
  KAAREN_VAALEA, KAAREN_SYVA, KAAREN_YO,
} from '../js/linssit/iss-kyyti.js';

const ISS = { lat: 50, lon: 10, korkeusM: 420000, suuntima: 60 };

test('ikkuna: kohde 2,69° edellä, 521 km, kallistus 37,7°, silmä ISS:ssä', () => {
  const k = ikkunanKulma(ISS);
  assert.ok(Math.abs(k.etaisyysM - 521000) < 3000, `etäisyys ${k.etaisyysM}`);
  assert.ok(Math.abs(k.kallistus - 37.7) < 0.2, `kallistus ${k.kallistus}`);
  assert.ok(Math.abs(kaari(ISS.lat, ISS.lon, k.lat, k.lon) - 2.69) < 0.05, 'kohde 2,69° edellä');
  const s = pisteelta(kameranAsento(k).silma);
  assert.ok(Math.abs(s.korkeusM - 420000) < 500, `silmän korkeus ${s.korkeusM}`);
  assert.ok(kaari(s.lat, s.lon, ISS.lat, ISS.lon) < 0.01, 'silmä ISS:n kohdalla');
  assert.ok(Math.abs(suunta(ISS.lat, ISS.lon, k.lat, k.lon) - ISS.suuntima) < 0.01, 'radan suuntaan');
});

test('seuranta: silmä ISS:n takana ja yllä', () => {
  const k = seurannanKulma(ISS);
  const s = pisteelta(kameranAsento(k).silma);
  assert.ok(s.korkeusM > 420000 + 600000, `silmä ${s.korkeusM / 1000} km`);
  const taakse = suunta(ISS.lat, ISS.lon, s.lat, s.lon);
  assert.ok(Math.abs(((((taakse - (ISS.suuntima + 180)) % 360) + 540) % 360) - 180) < 1, `takana ${taakse}`);
});

test('katse osuu maahan matalallakin kulmalla', () => {
  const k = ikkunanKulma(ISS, 5);
  assert.ok(Number.isFinite(k.etaisyysM) && k.etaisyysM > 0 && k.kallistus < 90);
});

test('kameran ylös on kohtisuorassa katsetta vastaan, kallistus 0 = pohjoinen ylhäällä', () => {
  const a = kameranAsento(ikkunanKulma(ISS));
  const katse = a.kohde.map((v, i) => v - a.silma[i]);
  const pis = katse.reduce((n, v, i) => n + v * a.ylos[i], 0);
  assert.ok(Math.abs(pis) < 1e-6 * Math.hypot(...katse));
  const kauko = kameranAsento(kuvakulma(0, 0, 1e7, 0, 0));
  assert.deepEqual(kauko.ylos.map((v) => Math.round(v * 1e9) / 1e9), [0, 1, 0]);
});

test('sekoitus lyhintä tietä ja etäisyys logaritmisesti', () => {
  const a = kuvakulma(0, 170, 10000000, 0, 350);
  const b = kuvakulma(0, -170, 1000000, 50, 10, 400000);
  const m = sekoita(a, b, 0.5);
  assert.ok(Math.abs(Math.abs(m.lon) - 180) < 0.01);
  assert.ok(m.suuntima < 0.01 || m.suuntima > 359.99);
  assert.ok(Math.abs(m.etaisyysM - Math.sqrt(1e7 * 1e6)) < 1);
  assert.equal(m.kallistus, 25);
  assert.equal(m.katseKorkeusM, 200000);
});

test('tilakone: kauko → seuranta → ikkuna → seuranta → ✕ → kauko', () => {
  const k = luoKyyti();
  const kauko = kuvakulma(50, 10, 18000000, 0, 0);
  assert.equal(k.paivita(0, ISS, 50), null, 'kaukonäkymässä kamera on pelaajan');
  k.napauta(kauko, ISS, 50, 0, false);
  assert.equal(k.tila, TILA.seuranta);
  let p = k.paivita(0, ISS, 50);
  assert.equal(p.asento.etaisyysM, kauko.etaisyysM, 'siirtymä alkaa kamerasta');
  p = k.paivita(KYYTIIN_S + 0.01, ISS, 50);
  assert.equal(p.asento.etaisyysM, SEURANNAN_ETAISYYS_M);
  assert.equal(p.kentta, 50);
  assert.equal(k.siirtyy, false);

  k.napauta(p.asento, ISS, p.kentta, 3, false);
  assert.equal(k.tila, TILA.ikkuna);
  p = k.paivita(3 + IKKUNAAN_S / 2, ISS, 50);
  assert.ok(p.kentta > 50 && p.kentta < 80, `kenttäkulma liukuu ${p.kentta}`);
  p = k.paivita(3 + IKKUNAAN_S + 0.01, ISS, 50);
  assert.equal(p.kentta, IKKUNAN_KENTTA);
  assert.ok(Math.abs(p.asento.kallistus - ikkunanKulma(ISS).kallistus) < 1e-9);

  k.napauta(p.asento, ISS, p.kentta, 5, false);
  assert.equal(k.tila, TILA.seuranta, 'ikkunasta takaisin seurantaan');

  k.poistu(18000000, 6, false);
  assert.equal(k.tila, TILA.kauko);
  assert.equal(k.kyydissa, true, 'paluu kesken on vielä kyytiä');
  assert.equal(k.paivita(6 + KAUKOON_S / 2, ISS, 50).paluuValmis, false);
  p = k.paivita(6 + KAUKOON_S + 0.01, ISS, 50);
  assert.equal(p.paluuValmis, true);
  assert.equal(p.asento.etaisyysM, 18000000);
  assert.equal(p.asento.kallistus, 0);
  assert.equal(p.kentta, 50, 'kenttäkulma palasi');
  assert.equal(k.kyydissa, false);
});

test('vähennetty liike: siirtymät heti', () => {
  const k = luoKyyti();
  k.napauta(kuvakulma(50, 10, 18000000, 0, 0), ISS, 50, 0, true);
  assert.equal(k.paivita(0, ISS, 50).asento.etaisyysM, SEURANNAN_ETAISYYS_M);
  k.napauta(k.paivita(0, ISS, 50).asento, ISS, 50, 0, true);
  assert.equal(k.paivita(0, ISS, 50).kentta, IKKUNAN_KENTTA);
  k.poistu(18000000, 0, true);
  assert.equal(k.paivita(0, ISS, 50).paluuValmis, true);
});

test('pallon toiselta puolelta pidempi lento; ✕ kaukonäkymässä ei tee mitään', () => {
  const k = luoKyyti();
  k.napauta(kuvakulma(-50, -170, 18000000, 0, 0), ISS, 50, 0, false);
  assert.ok(k.paivita(KYYTIIN_S + 0.01, ISS, 50).asento.etaisyysM > SEURANNAN_ETAISYYS_M);
  const j = luoKyyti();
  j.poistu(1e7, 0, false);
  assert.equal(j.kyydissa, false);
});

test('tietorivi: LIVE tuoreella TLE:llä, muuten rata-arvio', () => {
  const live = tietorivi(436.2, 27534, false);
  assert.equal(live.live, true);
  assert.equal(live.teksti, '· ISS · 436 km · 27 530 km/h');
  const arvio = tietorivi(420, 27600, true);
  assert.equal(arvio.live, false);
  assert.equal(arvio.teksti, 'ISS · 420 km · 27 600 km/h · rata-arvio');
});

test('ilmakehän kaari: exp(−h/22 km), sävy vaaleasta syvään, yöllä 0,06', () => {
  assert.equal(kaarenKirkkaus(0), 1);
  assert.ok(Math.abs(kaarenKirkkaus(22000) - Math.exp(-1)) < 1e-12);
  assert.ok(kaarenSavy(0).every((v, i) => Math.abs(v - KAAREN_VAALEA[i]) < 1e-12));
  assert.ok(kaarenSavy(100000).every((v, i) => Math.abs(v - KAAREN_SYVA[i]) < 1e-3));
  assert.equal(kaarenAurinko(-1), KAAREN_YO);
  assert.equal(kaarenAurinko(1), 1);
});

test('kytkentä: satelliitti-avaruus käyttää kyytiä ja todellista rataa, SHELL tuntee tiedostot', () => {
  const lahde = readFileSync(new URL('../js/linssit/satelliitti-avaruus.js', import.meta.url), 'utf8');
  assert.match(lahde, /from '\.\/iss-rata\.js'/);
  assert.match(lahde, /from '\.\/iss-kyyti-nakyma\.js'/);
  const sw = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
  for (const t of ['iss-rata.js', 'iss-kyyti.js', 'iss-kyyti-nakyma.js']) {
    assert.ok(sw.includes(`'./js/linssit/${t}'`), t);
  }
});

test('Cupola: kuvien vaihto on yksi vakio, koko ruudun muodon mukaan', async () => {
  const { cupolanOsoitteet, cupolanKoko, CUPOLA_KUVAT, CUPOLA_VERSIO } = await import('../js/linssit/iss-kyyti-nakyma.js');
  assert.ok(CUPOLA_KUVAT[CUPOLA_VERSIO], 'voimassa oleva versio on taulukossa');
  assert.equal(cupolanKoko(393, 852), 'iphone-1206x2622');
  assert.equal(cupolanKoko(834, 1194), 'ipad-1536x2732');
  const vanha = cupolanOsoitteet(393, 852, '20260926');
  assert.deepEqual(vanha.map((k) => k.laji), ['kehys', 'heijastus']);
  assert.match(vanha[0].osoite, /karttanostot\/20260926\/iss-cupola-kokonainen-iphone-1206x2622\.png$/);
  const uusi = cupolanOsoitteet(834, 1194, '20260928');
  assert.deepEqual(uusi.map((k) => k.laji), ['ulko', 'heijastus', 'kehys'], 'takaa eteen kuten natiivissa');
  assert.match(uusi[2].osoite, /karttanostot\/20260928\/iss-cupola2-kehys-ipad-1536x2732\.png$/);
  // Voimassa: pehmeä Cupola 2 (omistaja 28.9.2026 klo 14.1x), sama järjestys, poltettu syväterävyys.
  assert.equal(CUPOLA_VERSIO, '20260928-pehmea');
  const pehmea = cupolanOsoitteet(393, 852);
  assert.deepEqual(pehmea.map((k) => k.laji), ['ulko', 'heijastus', 'kehys']);
  assert.match(pehmea[0].osoite, /karttanostot\/20260928\/iss-cupola2-pehmea-ulkoosat-iphone-1206x2622\.png$/);
  assert.match(pehmea[2].osoite, /karttanostot\/20260928\/iss-cupola2-pehmea-kehys-iphone-1206x2622\.png$/);
});

test('ISS-malli natiivin mittasuhtein: 110 m leveä, neljä paria kullanruskeita siipiä', async () => {
  const { issMallinKolmiot, ISS_MALLIN_LEVEYS_M } = await import('../js/linssit/iss-kyyti-nakyma.js');
  const { paikat, varit } = issMallinKolmiot();
  const xs = paikat.filter((_, i) => i % 3 === 0);
  assert.equal(Math.max(...xs) - Math.min(...xs), 104, 'ristikko ja siivet ±52 m');
  assert.ok(ISS_MALLIN_LEVEYS_M >= 104);
  const kolmioita = paikat.length / 9;
  assert.ok(kolmioita <= 1500, `LOD0 ≤ 1 500 kolmiota: ${kolmioita}`);
  const kulta = [];
  for (let i = 0; i < varit.length; i += 3) if (Math.abs(varit[i] - 0xb4 / 255) < 1e-6) kulta.push(i);
  assert.equal(kulta.length / 6, 8, 'kahdeksan siipeä (neljä paria)');
});

test('kohteen yllä: silmä ISS:ssä, katse kohteeseen, kenttäkulma pitkä objektiivi', async () => {
  const { kohteenKulma, kohteenKentta } = await import('../js/linssit/iss-kyyti.js');
  const kohdeP = { lat: 48, lon: 13 }; // ~300 km sivussa
  const k = kohteenKulma(ISS, kohdeP);
  const s = pisteelta(kameranAsento(k).silma);
  assert.ok(Math.abs(s.korkeusM - ISS.korkeusM) < 500, `silmä ${s.korkeusM}`);
  assert.ok(kaari(s.lat, s.lon, ISS.lat, ISS.lon) < 0.01, 'silmä ISS:n kohdalla');
  assert.equal(k.lat, 48);
  assert.ok(k.kallistus > 20 && k.kallistus < 70, `vinokuva ${k.kallistus}°`);
  const f = kohteenKentta(k.etaisyysM);
  assert.ok(f >= 6 && f <= 14, `kenttäkulma ${f}`);
  const suoraan = kohteenKulma(ISS, { lat: ISS.lat, lon: ISS.lon });
  assert.ok(Math.abs(suoraan.kallistus) < 1e-6 && Math.abs(suoraan.etaisyysM - 420000) < 1);
});

test('tilakone: kohteen ylle ja napautuksella takaisin seurantaan', () => {
  const k = luoKyyti();
  k.napauta(kuvakulma(50, 10, 18000000, 0, 0), ISS, 50, 0, true);
  k.kohteeseen({ lat: 48, lon: 13 }, k.paivita(0, ISS, 50).asento, 50, 1, true);
  assert.equal(k.tila, TILA.kohde);
  const p = k.paivita(1, ISS, 50);
  assert.ok(p.kentta < 20);
  k.napauta(p.asento, ISS, p.kentta, 2, true);
  assert.equal(k.tila, TILA.seuranta);
});

test('tietorivi nopeutettuna: kerroin ilman LIVE-sanaa', async () => {
  const { nopeudenMerkki, ylilennonTeksti } = await import('../js/linssit/iss-kyyti.js');
  const r = tietorivi(421, 27560, false, 100);
  assert.equal(r.live, false);
  assert.equal(r.merkki, '100×');
  assert.equal(r.teksti, '· ISS · 421 km · 27 560 km/h');
  assert.equal(nopeudenMerkki(1), '1×');
  assert.equal(nopeudenMerkki(873), '870×');
  assert.equal(nopeudenMerkki(1000), '1 000×');
  const nyt = new Date(2026, 8, 28, 11, 20).getTime();
  assert.equal(ylilennonTeksti(nyt + (3 * 60 + 12) * 60e3, nyt), 'Ylilento klo 14.32, 3 h 12 min päästä');
});

test('ylilennon kohteet: Euroopan NASA-kohteet, ei revontulia', async () => {
  const { ylilennonKohteet } = await import('../js/linssit/iss-kyyti-nakyma.js');
  const l = ylilennonKohteet();
  assert.ok(l.length >= 20 && l.length <= 40, `${l.length} kohdetta`);
  assert.ok(l.every((k) => k.lat >= 34 && k.lat <= 56 && k.lon >= -25 && k.lon <= 45));
  assert.ok(l.some((k) => k.tunnus === 'venetsia') && !l.some((k) => k.tunnus === 'aurora-scandinavia'));
});

/*
 * ISS-SÄÄTÖPANEELI (Codex-elementtisarja, kytketty 29.9.2026): puhtaat apurit otsikkoriveille
 * (kuukauden nimi, pilvipeiton prosenttiteksti) ja "Oma sijainti" -haulle (cdn-cgi/trace, MAAKARTAT-
 * pääkaupunki, ISS:n radan 56° leveysraja).
 */
test('paneeli: kuukauden nimi ja vuodenaika-otsikko ("(nyt)" simuloidun kuukauden kohdalla)', async () => {
  const { kuukausiNyt, kuukaudenNimi, vuodenaikaTeksti } = await import('../js/linssit/iss-kyyti-nakyma.js');
  const ms = Date.UTC(2026, 8, 15); // syyskuu (UTC-kuukausi 8 = syyskuu, 1-indeksissä 9)
  assert.equal(kuukausiNyt(0, ms), 9, 'pakottamaton = simuloitu kuukausi');
  assert.equal(kuukausiNyt(3, ms), 3, 'pakotettu voittaa');
  assert.equal(kuukaudenNimi(1), 'tammikuu');
  assert.equal(kuukaudenNimi(9), 'syyskuu');
  assert.equal(kuukaudenNimi(12), 'joulukuu');
  assert.equal(vuodenaikaTeksti(0, ms), 'syyskuu (nyt)');
  assert.equal(vuodenaikaTeksti(9, ms), 'syyskuu (nyt)', 'pakotettu sama kuin nykyinen näyttää silti (nyt)');
  assert.equal(vuodenaikaTeksti(3, ms), 'maaliskuu');
});

test('paneeli: pilvipeiton otsikko ja liu\'un prosentti realismin pilvimääräksi', async () => {
  const { pilvipeittoTeksti, pilvipeittoMaaraksi } = await import('../js/linssit/iss-kyyti-nakyma.js');
  assert.equal(pilvipeittoTeksti(100), 'nyt', 'oletus 100 % = nyt');
  assert.equal(pilvipeittoTeksti(0), 'selkeä');
  assert.equal(pilvipeittoTeksti(40), '40 %');
  assert.equal(pilvipeittoTeksti(37.6), '38 %', 'pyöristyy');
  assert.equal(pilvipeittoMaaraksi(100), 1);
  assert.equal(pilvipeittoMaaraksi(0), 0);
  assert.ok(Math.abs(pilvipeittoMaaraksi(40) - 0.4) < 1e-9);
  assert.equal(pilvipeittoMaaraksi(150), 1, 'rajattu 0…1');
  assert.equal(pilvipeittoMaaraksi(-10), 0);
});

test('Oma sijainti: cdn-cgi/trace-rivin jäsennys ja ISS:n 56° leveysraja hakupisteessä', async () => {
  const { jasennaTraceLoc, omanSijainninHakupiste, omanMaanKeskipiste } = await import('../js/linssit/iss-kyyti-nakyma.js');
  assert.equal(jasennaTraceLoc('fl=1\nip=1.2.3.4\nloc=FI\ncolo=HEL\n'), 'FI');
  assert.equal(jasennaTraceLoc('loc=de\n'), 'DE', 'suuraakkosiksi');
  assert.equal(jasennaTraceLoc('ip=1.2.3.4\n'), null, 'ei loc-riviä');
  assert.equal(jasennaTraceLoc(''), null);
  // Rooma (41,9° N) on alle 56°: hakupiste sama kuin oikea sijainti.
  assert.deepEqual(omanSijainninHakupiste(41.9, 12.5), { lat: 41.9, lon: 12.5 });
  // Fiktiivinen 70° N -piste korvataan 51° N:llä (ISS:n radan yläraja), sama pituus.
  assert.deepEqual(omanSijainninHakupiste(70, 24.94), { lat: 51, lon: 24.94 });
  assert.deepEqual(omanSijainninHakupiste(-70, 24.94), { lat: -51, lon: 24.94 });
  const maakartat = { ITA: { kaupungit: [{ nimi: 'Milano', lat: 45.46, lon: 9.19 }, { nimi: 'Rooma', lat: 41.9, lon: 12.5, paa: true }] } };
  assert.deepEqual(omanMaanKeskipiste('ITA', maakartat), { lat: 41.9, lon: 12.5, nimi: 'Rooma' });
  assert.equal(omanMaanKeskipiste('XYZ', maakartat), null, 'tuntematon maa');
  assert.equal(omanMaanKeskipiste('ITA', null), null);
});

test('Oma sijainti: haeOmaSijainti hakee, kääntää alpha2→alpha3 ja hakee pääkaupungin; epäonnistuu siististi', async () => {
  const { haeOmaSijainti } = await import('../js/linssit/iss-kyyti-nakyma.js');
  // Rooma (41,9° N) on ISS:n 56°-rajan sisällä: hakupiste = oikea pääkaupunki, ei korvausta.
  const maakartat = { ITA: { kaupungit: [{ nimi: 'Rooma', lat: 41.9, lon: 12.5, paa: true }] } };
  const tuoMaakartat = async () => ({ MAAKARTAT: maakartat });
  const ikkunaOk = { fetch: async () => ({ ok: true, text: async () => 'ip=1.2.3.4\nloc=IT\n' }) };
  const oma = await haeOmaSijainti({ ikkuna: ikkunaOk, tuoMaakartat });
  assert.deepEqual(oma, {
    tunnus: 'oma', nimi: 'Oma sijainti', lat: 41.9, lon: 12.5, oikeaLat: 41.9, oikeaLon: 12.5, maa: 'Rooma',
  });
  // Ei fetch-funktiota (esim. hyvin vanha ympäristö tai testi-ikkuna).
  assert.equal(await haeOmaSijainti({ ikkuna: {}, tuoMaakartat }), null);
  // Verkkovirhe.
  const virheIkkuna = { fetch: async () => { throw new Error('verkko poikki'); } };
  assert.equal(await haeOmaSijainti({ ikkuna: virheIkkuna, tuoMaakartat }), null);
  // Ei-ok vastaus.
  const ei404 = { fetch: async () => ({ ok: false }) };
  assert.equal(await haeOmaSijainti({ ikkuna: ei404, tuoMaakartat }), null);
  // Tuntematon maakoodi (ei MAAKARTAT-taulussa).
  const muuMaa = { fetch: async () => ({ ok: true, text: async () => 'loc=JP\n' }) };
  assert.equal(await haeOmaSijainti({ ikkuna: muuMaa, tuoMaakartat }), null);
  // Leveys yli 56°: hakupiste korvattu, mutta oikeaLat/oikeaLon ennallaan (matka omaan maahan näytölle).
  const pohjoinenMaakartat = { NOR: { kaupungit: [{ nimi: 'Tromssa', lat: 69.65, lon: 18.96, paa: true }] } };
  const pohjoinen = await haeOmaSijainti({
    ikkuna: { fetch: async () => ({ ok: true, text: async () => 'loc=NO\n' }) },
    tuoMaakartat: async () => ({ MAAKARTAT: pohjoinenMaakartat }),
  });
  assert.deepEqual(pohjoinen, {
    tunnus: 'oma', nimi: 'Oma sijainti', lat: 51, lon: 18.96, oikeaLat: 69.65, oikeaLon: 18.96, maa: 'Tromssa',
  });
});

test('NASA-koe: kierretty rajauslaatikko ja ikkuna', async () => {
  const { nasaKoeIkkuna, NASA_KOE } = await import('../js/linssit/iss-kyyti-nakyma.js');
  assert.equal(Object.keys(NASA_KOE).length, 3);
  const a = nasaKoeIkkuna({ lat: 45, lon: 12, leveysKm: 15, kierto: 0 }, 1.5);
  assert.ok(Math.abs(a.leveysKm - 15) < 1e-9 && Math.abs(a.korkeusKm - 10) < 1e-9);
  assert.ok(Math.abs((a.ikkuna.lat1 - a.ikkuna.lat0) * 111.195 - 10) < 1e-6);
  const b = nasaKoeIkkuna({ lat: 45, lon: 12, leveysKm: 15, kierto: 90 }, 1.5);
  assert.ok(Math.abs(b.leveysKm - 10) < 1e-9, 'neljännes kierrettynä leveys ja korkeus vaihtavat paikkaa');
});

/* ---- koukut: kevyt vale-näyttämö ilman selainta ---- */
function valeElementti() {
  const e = {
    children: [], dataset: {}, style: {}, hidden: false, textContent: '', className: '',
    classList: { toggle() {}, add() {}, remove() {}, contains: () => false },
    append(...c) { e.children.push(...c); }, appendChild(c) { e.children.push(c); },
    setAttribute() {}, addEventListener() {}, remove() {},
  };
  return e;
}
function valePallo() {
  const v = (x = 0, y = 0, z = 0) => ({ x, y, z, set(a, b, c) { this.x = a; this.y = b; this.z = c; } });
  const cam = { position: v(0, 0, 400), up: v(0, 1, 0), fov: 50, lookAt() {}, updateProjectionMatrix() {}, updateMatrixWorld() {} };
  const ohjaimet = { enabled: true, update() {} };
  return {
    camera: () => cam, controls: () => ohjaimet, getGlobeRadius: () => 100,
    scene: () => ({ traverse() {}, add() {} }),
    getCoords: (lat, lng, alt = 0) => {
      const r = 100 * (1 + alt); const p = (lat * Math.PI) / 180; const l = (lng * Math.PI) / 180;
      return { x: r * Math.cos(p) * Math.sin(l), y: r * Math.sin(p), z: r * Math.cos(p) * Math.cos(l) };
    },
    pointOfView: () => ({ lat: 50, lng: 10, altitude: 3 }),
  };
}

test('realismikoukut: korvaa.kaari/yokuori/pilvet ohittavat omat kuoret, ilman korvausta kaikki kolme', async () => {
  const { luoIssKyytiNakyma, KAAREN_JARJESTYS, YOKUOREN_JARJESTYS } = await import('../js/linssit/iss-kyyti-nakyma.js');
  const { luoIssNyt, luoSimukello } = await import('../js/linssit/iss-rata.js');
  // Valenäyttämö, josta etsiLuokat löytää three-luokat (pallon SphereGeometry + ShaderMaterial).
  class V3 { constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; } set(a, b, c) { this.x = a; this.y = b; this.z = c; return this; } }
  class Pallo { constructor(r) { this.type = 'SphereGeometry'; this.parameters = { radius: r }; } dispose() {} }
  class Varjostin { constructor(o) { Object.assign(this, o); this.type = 'ShaderMaterial'; } dispose() {} }
  class Mesh { constructor(g, m) { this.geometry = g; this.material = m; this.isMesh = true; this.userData = {}; this.scale = { x: 1 }; } }
  const ajo = (korvaa) => {
    const pallo = valePallo();
    const cam = pallo.camera();
    cam.position = new V3(0, 0, 400);
    const lisatyt = [];
    const pinta = new Mesh(new Pallo(100), new Varjostin({}));
    pallo.scene = () => ({ traverse: (f) => f(pinta), add: (o) => { lisatyt.push(o); o.parent = { remove() {} }; } });
    const piilotukset = [];
    const sumu = { kyyti() {}, piilotaPilvet: (k) => { piilotukset.push(k); return true; } };
    const doc = { createElement: () => valeElementti(), body: valeElementti() };
    let r = Date.UTC(2026, 8, 28, 9);
    const n = luoIssKyytiNakyma({
      pallo, sumu, issNyt: luoIssNyt(), kello: luoSimukello({ reaali: () => r }), reduced: true,
      ikkuna: { document: doc, performance: { now: () => r }, innerWidth: 393, innerHeight: 852, location: { search: '' }, Image: class { set src(v) { this.s = v; } } },
      realismi: { korvaa, rakenna() {}, paivita() {}, pura() {} },
    });
    assert.ok(n.napauta());
    for (let i = 1; i <= 5; i += 1) { r += 500; n.paivita(i * 500); }
    const jarjestykset = lisatyt.map((o) => o.renderOrder);
    n.pura();
    return {
      kaaria: jarjestykset.filter((j) => j === KAAREN_JARJESTYS).length,
      yota: jarjestykset.filter((j) => j === YOKUOREN_JARJESTYS).length,
      piilotukset,
    };
  };
  assert.deepEqual(ajo(undefined), { kaaria: 2, yota: 1, piilotukset: [] }, 'realismi ilman korvausta: kaari, usva, yökuori');
  assert.deepEqual(ajo({ kaari: true }), { kaaria: 0, yota: 1, piilotukset: [] });
  assert.deepEqual(ajo({ yokuori: true }), { kaaria: 2, yota: 0, piilotukset: [] });
  assert.deepEqual(ajo({ kaari: true, yokuori: true, pilvet: true }), { kaaria: 0, yota: 0, piilotukset: [true, false] },
    'pilvikuori piiloon kyydin ajaksi ja takaisin sulkiessa');
});

test('realismikoukut: rakenna kerran, paivita joka kehys simuloidulla ajalla, pura', async () => {
  const { luoIssKyytiNakyma, YOKUOREN_JARJESTYS } = await import('../js/linssit/iss-kyyti-nakyma.js');
  const { luoIssNyt, luoSimukello } = await import('../js/linssit/iss-rata.js');
  assert.ok(Number.isFinite(YOKUOREN_JARJESTYS));
  const doc = { createElement: () => valeElementti(), body: valeElementti() };
  let r = Date.UTC(2026, 8, 28, 9);
  const kello = luoSimukello({ reaali: () => r });
  const kutsut = { rakenna: 0, paivita: [], pura: 0 };
  const realismi = {
    rakenna: (a) => { kutsut.rakenna += 1; assert.ok(a.pallo && a.luokat && a.metri > 0 && a.R === 100); },
    paivita: (a) => kutsut.paivita.push(a),
    pura: () => { kutsut.pura += 1; },
  };
  const n = luoIssKyytiNakyma({
    pallo: valePallo(), issNyt: luoIssNyt(), ikkuna: { document: doc, performance: { now: () => r }, innerWidth: 393, innerHeight: 852, location: { search: '' }, Image: class { set src(v) { this.s = v; } } },
    realismi, kello, reduced: true,
  });
  n.paivita(16);
  assert.equal(kutsut.rakenna, 0, 'ei rakenneta ennen kyytiä');
  assert.ok(n.napauta());
  n.paivita(32);
  assert.equal(kutsut.rakenna, 1);
  const eka = kutsut.paivita.at(-1);
  assert.equal(eka.tila, 'seuranta');
  assert.ok(Array.isArray(eka.silma) && eka.kamera && eka.iss && Number.isFinite(eka.osuus));
  assert.equal(eka.ms, kello.nyt());
  n.asetaNopeus(1000);
  r += 1000;
  n.paivita(48);
  assert.ok(kutsut.paivita.at(-1).ms - r > 900_000, 'ms on simuloitu aika');
  n.pura();
  assert.equal(kutsut.pura, 1);
  assert.equal(kello.live, true, 'linssin sulku palauttaa LIVE:n');
});
