/*
 * KOKO PALLON RELIEFI — NAVAT MUKAAN, SUORAAN KORKEUSRUUDUKOSTA.
 *
 *   NODE_USE_ENV_PROXY=1 node tools/tee-pallotopografia-koko.mjs \
 *     [--leveys 8192] [--kaariminuutit 1] [--tunniste 20260916] \
 *     [--pieni 4096] [--laatu 76] [--liioittelu 12] [--lohko 512] \
 *     [--ulos pallo-topografia-ulos] [--korkeuspalat <kansio>] \
 *     [--koekuva docs/raportit/kuvat/…jpg] [--kuiva]
 *
 * Ulos tulee KAKSI tiedostoa samasta laskennasta:
 *
 *   topografia-pallo-koko-8k-<tunniste>.webp  8192 × 4096
 *   topografia-pallo-koko-4k-<tunniste>.webp  4096 × 2048
 *
 * Molemmat ovat TASAVÄLISIÄ (equirectangular) ±90° ja ±180°, eikä
 * kummassakaan ole yhtään läpinäkyvää pikseliä.
 *
 * === MIKSI TÄMÄ ON OLEMASSA ========================================
 *
 * OMISTAJA 16.9.2026 klo 11.05 UTC, sanatarkasti: *"onhan tarkemmassa
 * topografia ajossa myos pohjois ja etelanavat mukana, etta ei tule
 * tyhjia kohtia niihin?"* — ja päätös samalta istumalta: *"Kyllä, koko
 * pallo 1′-datasta."* (Raamattu, ASTRONAUTIN KAMERA, LISÄYS 5.)
 *
 * EI OLLUT. Tähänastinen pallon tekstuuri syntyy kahdessa vaiheessa:
 * tools/tee-reliefikartta.mjs projisoi ruudukon PELIN LAUDAN
 * Milleriin, joka ulottuu vain 76 °N…58 °S, ja
 * tools/tee-pallotopografia.mjs projisoi sen kuvan takaisin
 * tasaväliseksi. Kaikki laudan ulkopuolinen — koko Etelämanner ja
 * pohjoisin Jäämeri — jää siinä ketjussa alfaltaan nollaksi, ja
 * js/linssit/satelliitti-avaruus.js maalaa reikään generoidun
 * napajään: vyöhykeväri, joka ei tiedä pituuspiiristä mitään.
 * Etelämantereella se tarkoittaa valkoista soikiota ilman rantaviivaa.
 *
 * TÄMÄ TYÖKALU EI KÄY LAUDAN KAUTTA LAINKAAN. Se lukee saman
 * 1′-korkeusruudukon (tools/hae-korkeusruudukko.mjs → 10°-palat R2:sta)
 * ja maalaa siitä suoraan tasavälisen kuvan navasta napaan — samoilla
 * väriasteikoilla, samalla varjostuksella ja samoilla merisyvyyksillä
 * kuin juliste (tools/reliefivarit.mjs, tools/varjostus.mjs). Väli-
 * vaiheen pois jättäminen on samalla tarkkuusetu: kuvaa ei
 * uudelleenprojisoida kahdesti, joten se on niin terävä kuin ruudukko
 * antaa myöten.
 *
 * NAVAT SAAVAT JÄÄSÄVYN, MUTTA VARJOSTUS JÄÄ. Ks. tools/reliefivarit.mjs
 * (JAA, jaapaino): sekoitus tehdään VÄRIIN ennen varjon kertolaskua,
 * joten Etelämantereen jäätiköiden korkeuserot, Transantarktiset vuoret
 * ja rannikon jäätikköreuna säilyvät muotoina. Merijää jää
 * osittaiseksi, jotta rantaviiva erottuu jäästä.
 *
 * === MUISTI: MAAILMA KAISTALEINA ===================================
 *
 * 1′:n maailmanhila on 21601 × 10801 = 233 miljoonaa solua eli 467 Mt
 * Int16:na ja 933 Mt Float32:na. Varjostus tarvitsisi molemmat yhtä
 * aikaa, ja Mac kaatuisi tai alkaisi sivuttaa.
 *
 * Siksi työ tehdään KAISTALEINA (--lohko kohderiviä kerrallaan):
 * jokaiselle kaistaleelle haetaan vain sen tarvitsemat hilarivit
 * (haeKorkeusikkuna), varjostetaan ne omana pienenä ruudukkonaan
 * (varjosta(..., { lat0 })) ja kirjoitetaan valmiit kohderivit suoraan
 * raakatiedostoon. Muistissa on kerrallaan yksi kaistale, ei koskaan
 * kahta kopiota koko maailmasta.
 *
 * KAISTALEEN REUNARIVI ON LAINASSA. Varjo lasketaan 3 × 3 -naapurustosta
 * (Horn 1981), joten kaistaleen ylin ja alin rivi eivät tietäisi
 * naapuriaan kaistaleen ulkopuolella. Siksi jokaiseen kaistaleeseen
 * haetaan yksi ylimääräinen rivi molempiin päihin JA hylätään se
 * käytöstä — ilman sitä kuvaan tulisi vaakaviiva jokaisen kaistaleen
 * rajalle, ja se näkyisi pallolla renkaana.
 *
 * === PAKKAUS =======================================================
 *
 * Node ei osaa kirjoittaa WebPiä eikä peliin oteta riippuvuuksia, joten
 * pakkaus tehdään Pythonin Pillow'lla kuten tools/tee-reliefikartta.mjs.
 * NumPyä EI tarvita: Pillow lukee raakapikselit suoraan (frombytes) ja
 * pienentää laatikkosuodatuksella (Image.BOX). Raakapikselit kulkevat
 * tiedostona eivätkä stdinin kautta — 8192 × 4096 RGB on 100 Mt.
 *
 * === MIHIN TIEDOSTOT MENEVÄT =======================================
 *
 * Oletuskansio on pallo-topografia-ulos/, joka on .gitignoressa: nämä
 * ovat megatavujen kuvia, ja niiden varasto on R2-ämpäri eikä repo.
 * Vienti tehdään .github/workflows/renderoi-reliefi-macilla.yml:ssä.
 *
 * Lähde ja lisenssi: NOAA NGDC ETOPO1 Global Relief Model, Ice Surface,
 * 1 kaariminuutti (Amante & Eakins 2009, doi:10.7289/V5C8276M) —
 * public domain.
 */
import { spawnSync } from 'node:child_process';
import {
  mkdirSync, writeFileSync, openSync, writeSync, closeSync, unlinkSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { haeKorkeusikkuna, hilanMitat } from './hae-korkeusruudukko.mjs';
import { varjosta, tasainenVarjo, AURINKO } from './varjostus.mjs';
import {
  LUT, lutKohta, KALVO, JAAN_VARI, jaapaino,
} from './reliefivarit.mjs';

/*
 * Verkko: Noden fetch ei lue HTTPS_PROXYa ilman NODE_USE_ENV_PROXY=1
 * (ks. tools/hae-radiot.mjs). Palat haetaan R2:sta, ellei niitä ole jo
 * välimuistissa tai --korkeuspalat-kansiossa, joten skripti käynnistää
 * itsensä uudelleen muuttuja päällä.
 */
if (!process.env.NODE_USE_ENV_PROXY && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const ajo = spawnSync(process.execPath, [fileURLToPath(import.meta.url), ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
  });
  process.exit(ajo.status ?? 1);
}

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const VALIMUISTI = join(tmpdir(), 'matkakirja-pallotopografia-koko');

// ---------------------------------------------------------------- valitsimet

const argv = process.argv.slice(2);
const kuiva = argv.includes('--kuiva');
const luku = (lippu, oletus) => {
  const i = argv.indexOf(lippu);
  if (i < 0) return oletus;
  const arvo = Number(argv[i + 1]);
  return Number.isFinite(arvo) ? arvo : oletus;
};
const teksti = (lippu, oletus) => {
  const i = argv.indexOf(lippu);
  if (i < 0) return oletus;
  const arvo = argv[i + 1];
  return arvo === undefined || arvo.startsWith('--') ? oletus : arvo;
};

/*
 * 8192 × 4096 on pallon tekstuurin yläraja, ei toive.
 *
 * Lähimmässä sallitussa zoomissa pallon kehä ruudulla on noin 4 770 px
 * (js/linssit/satelliitti-avaruus.js, RELIEFIN_LEVEYS:n perustelu), eli
 * 4096 px riittää jo pikselintarkkuuteen. 8192 on varalla työpöydälle
 * ja tulevalle tarkemmalle zoomille; peli lataa oletuksena 4k-version.
 * 1′-ruudukko on 21601 saraketta, joten 8192 on yhä keskiarvo
 * (2,6 ruutua per pikseli) eikä poiminta.
 */
const LEVEYS = Math.round(luku('--leveys', 8192));
const KORKEUS = Math.round(luku('--korkeus', LEVEYS / 2));
/*
 * Pienemmän version leveys. Oletus on 4096 (pelin lataama koko), mutta
 * pienessä koeajossa se putoaa puoleen — työkalu KIRJOITTAA AINA
 * MOLEMMAT tiedostot, koska työnkulun vienti odottaa paria. --pieni 0
 * jättää pienen pois, jos joku tarvitsee vain ison.
 */
const PIENI = Math.round(luku('--pieni', LEVEYS > 4096 ? 4096 : LEVEYS / 2));
const LAATU = Math.round(luku('--laatu', 76));
const LIIOITTELU = luku('--liioittelu', 12);
const LOHKO = Math.max(16, Math.round(luku('--lohko', 512)));
const KAARIMINUUTIT = luku('--kaariminuutit', 1);
const RUUTU = KAARIMINUUTIT / 60;
const PALAT = teksti('--korkeuspalat', null);
const KOEKUVA = teksti('--koekuva', null);
const ULOS = join(JUURI, teksti('--ulos', 'pallo-topografia-ulos'));
const TUNNISTE = teksti('--tunniste', new Date().toISOString().slice(0, 10).replace(/-/g, ''));

/*
 * NIMISSÄ ON "8k" JA "4k" EIKÄ PIKSELIMÄÄRÄ. Sama sopimus kuin pelin
 * vanhalla kuvaparilla (topografia-pallo-20260915 ja
 * topografia-pallo-8k-20260916): "koko" kertoo, että navat ovat mukana,
 * ja 8k/4k sen, kummalle ruudulle kuva on. Nimet ovat osoitteita, jotka
 * kirjoitetaan js/linssit/reliefikuva.js:ään; jos --leveys tai --pieni
 * joskus muuttuu, nimet pysyvät ja tarkat mitat kerrotaan ajon kuitissa.
 */
const NIMI_ISO = `topografia-pallo-koko-8k-${TUNNISTE}.webp`;
const NIMI_PIENI = `topografia-pallo-koko-4k-${TUNNISTE}.webp`;

// ------------------------------------------------------------ maantiede

const HILA = hilanMitat(RUUTU);
/*
 * Ruudukon rivi y on PISTE leveysasteella −90 + y·ruutu, ei ruutu.
 * Piste edustaa aluetta, joka ulottuu puoli ruutua kumpaankin suuntaan,
 * joten laatikkosuodatuksessa sen peittämä väli on [y − 0,5, y + 0,5].
 * Puolikkaan siirto tehdään kertaalleen tässä. Sama sopimus kuin
 * tools/tee-reliefikartta.mjs:n projisoi()-funktiossa, jotta kaksi
 * kuvaa samasta maailmasta osuu samoihin kohtiin.
 */
const riviReuna = (lat) => (lat + 90) / RUUTU + 0.5;
const sarakeReuna = (lon) => (lon + 180) / RUUTU + 0.5;
/** Kohderivin j pohjois- ja eteläreuna asteina (j = 0 on pohjoisin). */
const latYla = (j) => 90 - (j * 180) / KORKEUS;
/*
 * Sauman jakso. Hilan sarakkeet 0 ja leveys−1 ovat SAMA meridiaani
 * kahdesti, joten kierron jakso on leveys−1: viimeinen sarake on
 * kaksoiskappale eikä oma paikkansa.
 */
const JAKSO = HILA.leveys - 1;

// Sarakereunat kerran: ne eivät riipu rivistä.
const vaakaReunat = new Float64Array(LEVEYS + 1);
for (let i = 0; i <= LEVEYS; i += 1) vaakaReunat[i] = sarakeReuna(-180 + (i * 360) / LEVEYS);

// ------------------------------------------------------------ koettimet

/*
 * Näytepisteet, joilla valmiin kuvan sijoittelu tarkistetaan.
 *
 * Projektiovirhe on juuri se vika, jota ei huomaa katsomalla: siirtynyt
 * reliefikartta näyttää yhä reliefikartalta. Neljä ensimmäistä ovat
 * samat kuin tools/tee-reliefikartta.mjs:n koettimessa; kolme viimeistä
 * ovat tämän työkalun oma syy olla olemassa — navat.
 */
const KOETIN = [
  { nimi: 'Amazonin alanko', lon: -60, lat: -3, odotus: 'maa' },
  { nimi: 'Kongon allas', lon: 20, lat: -1, odotus: 'maa' },
  { nimi: 'Tiibetin ylänkö', lon: 88, lat: 33, odotus: 'maa' },
  { nimi: 'Tyynenmeren keskiosa', lon: -140, lat: 0, odotus: 'meri' },
  { nimi: 'Intian valtameri', lon: 80, lat: -20, odotus: 'meri' },
  { nimi: 'Etelämantereen sisäosa', lon: 0, lat: -80, odotus: 'jaa' },
  { nimi: 'Grönlannin jäätikkö', lon: -42, lat: 72, odotus: 'jaa' },
  // Jäämeri on 19.9.2026 alkaen merijäätä 40 %:n peitolla (tools/
  // reliefivarit.mjs JAA.meriPohjoinen): sininen johtaa, mutta sävy on
  // vaalennettu — ei puhdasta jäätä eikä puhdasta syvää merta.
  { nimi: 'Pohjoisnapa (Jäämeri)', lon: 0, lat: 89.5, odotus: 'merijaa' },
];

const koetinPaikat = KOETIN.map((k) => {
  const px = Math.min(LEVEYS - 1, Math.max(0, Math.floor(((k.lon + 180) / 360) * LEVEYS)));
  const py = Math.min(KORKEUS - 1, Math.max(0, Math.floor(((90 - k.lat) / 180) * KORKEUS)));
  return { ...k, px, py, vari: null };
});

// ----------------------------------------------------------------- ajo

console.log(`kohde: ${LEVEYS} × ${KORKEUS} px tasavälisenä (±90°, ±180°)`);
console.log(`ruudukko: ${KAARIMINUUTIT}′ (${RUUTU}°) = ${HILA.leveys} × ${HILA.korkeus} solua, `
  + `${((HILA.leveys / LEVEYS) * (HILA.korkeus / KORKEUS)).toFixed(1)} solua per kuvapikseli`);
console.log(`varjostus: atsimuutti ${AURINKO.atsimuutti}°, korkeuskulma ${AURINKO.korkeuskulma}°, `
  + `liioittelu ${LIIOITTELU}`);

mkdirSync(VALIMUISTI, { recursive: true });
const raakaPolku = join(VALIMUISTI, `pallo-koko-${LEVEYS}x${KORKEUS}.raw`);
const raaka = openSync(raakaPolku, 'w');

const tasainen = tasainenVarjo();
const rivi = new Float64Array(HILA.leveys * 3);
const zRivi = new Float64Array(HILA.leveys);
const ulosRivi = Buffer.allocUnsafe(LEVEYS * 3);

/*
 * Mittarit. Nämä eivät ole koristeita: omistaja mittaa juuri näitä
 * (Raamattu, LISÄYS 5) — kuvassa ei saa olla tyhjiä kohtia, ja
 * Etelämantereen on erotuttava.
 */
const mitat = {
  tyhjiaRiveja: 0,
  tyhjiaPikseleita: 0,
  etela: { maa: 0, meri: 0, maaKirkkaus: 0, meriKirkkaus: 0 },
  pohjoinen: { maa: 0, meri: 0, maaKirkkaus: 0, meriKirkkaus: 0 },
};

let lohkoja = 0;
for (let j0 = 0; j0 < KORKEUS; j0 += LOHKO) {
  const j1 = Math.min(KORKEUS, j0 + LOHKO);
  /*
   * Kaistaleen tarvitsemat hilarivit: kohderivin j eteläreuna on
   * riviReuna(latYla(j + 1)) ja pohjoisreuna riviReuna(latYla(j)).
   * Reunimmaiset hilarivit tulevat mukaan kokonaisina (floor/ceil), ja
   * varjostusta varten molempiin päihin lainataan yksi rivi lisää.
   */
  const alaraja = Math.max(0, Math.floor(riviReuna(latYla(j1))) - 1);
  const ylaraja = Math.min(HILA.korkeus, Math.ceil(riviReuna(latYla(j0))) + 1);
  const rivejä = ylaraja - alaraja;

  const kaistale = await haeKorkeusikkuna({
    ruutu: RUUTU,
    x0: 0,
    leveys: HILA.leveys,
    y0: alaraja,
    korkeus: rivejä,
    palat: PALAT,
    hiljaa: true,
  });
  const { varjo } = varjosta(
    {
      z: kaistale.z, leveys: HILA.leveys, korkeus: rivejä, ruutu: RUUTU,
    },
    { liioittelu: LIIOITTELU, lat0: -90 + alaraja * RUUTU },
  );
  lohkoja += 1;
  process.stderr.write(`  kaistale ${lohkoja}: kohderivit ${j0}…${j1 - 1}, `
    + `hilarivit ${alaraja}…${ylaraja - 1}\n`);

  for (let j = j0; j < j1; j += 1) {
    const a = riviReuna(latYla(j + 1));
    const b = riviReuna(latYla(j));
    const latKeski = (latYla(j) + latYla(j + 1)) / 2;
    const napaMittaus = Math.abs(latKeski) > 70;

    rivi.fill(0);
    if (napaMittaus) zRivi.fill(0);
    let paino = 0;
    const eka = Math.max(alaraja, Math.floor(a));
    const vika = Math.min(ylaraja, Math.ceil(b));
    for (let gy = eka; gy < vika; gy += 1) {
      const p = Math.min(b, gy + 1) - Math.max(a, gy);
      if (p <= 0) continue;
      paino += p;
      const lat = -90 + gy * RUUTU;
      // Jään osuus riippuu vain leveysasteesta ja siitä, onko solu
      // maata vai merta — kaksi lukua per rivi, ei per solu.
      const jaaMaa = jaapaino(lat, 0);
      const jaaMeri = jaapaino(lat, -1);
      const alku = (gy - alaraja) * HILA.leveys;
      for (let x = 0; x < HILA.leveys; x += 1) {
        const i = alku + x;
        const m = kaistale.z[i];
        const l = lutKohta(m);
        let r = LUT[l];
        let v = LUT[l + 1];
        let s = LUT[l + 2];
        const jaa = m >= 0 ? jaaMaa : jaaMeri;
        if (jaa > 0) {
          r += (JAAN_VARI[0] - r) * jaa;
          v += (JAAN_VARI[1] - v) * jaa;
          s += (JAAN_VARI[2] - s) * jaa;
        }
        /*
         * Varjo kertolaskuna värin päällä — myös jään päällä. k on 1
         * tasaisella maalla, 0 täydessä varjossa ja enintään
         * 1/sin(45°) = 1,41 suoraan aurinkoa vasten olevalla rinteellä.
         */
        const k = varjo[i] / tasainen;
        let kerroin; let valo;
        if (k <= 1) { kerroin = 1 - (1 - k) * KALVO.tummennus; valo = 0; } else { kerroin = 1; valo = (k - 1) * KALVO.vaalennus; }
        r *= kerroin; v *= kerroin; s *= kerroin;
        const o = x * 3;
        rivi[o] += p * (r + (255 - r) * valo);
        rivi[o + 1] += p * (v + (255 - v) * valo);
        rivi[o + 2] += p * (s + (255 - s) * valo);
        if (napaMittaus) zRivi[x] += p * m;
      }
    }
    if (paino > 0) {
      for (let i = 0; i < rivi.length; i += 1) rivi[i] /= paino;
      if (napaMittaus) for (let x = 0; x < HILA.leveys; x += 1) zRivi[x] /= paino;
    } else {
      mitat.tyhjiaRiveja += 1;
    }

    // Vaakavaihe: sama laatikkosuodatus, mutta sauman yli kiertäen.
    for (let i = 0; i < LEVEYS; i += 1) {
      const va = vaakaReunat[i];
      const vb = vaakaReunat[i + 1];
      let sr = 0; let sg = 0; let sb = 0; let sz = 0; let sp = 0;
      for (let gx = Math.floor(va); gx < Math.ceil(vb); gx += 1) {
        const p = Math.min(vb, gx + 1) - Math.max(va, gx);
        if (p <= 0) continue;
        const kierto = (((gx % JAKSO) + JAKSO) % JAKSO);
        const c = kierto * 3;
        sr += p * rivi[c]; sg += p * rivi[c + 1]; sb += p * rivi[c + 2];
        if (napaMittaus) sz += p * zRivi[kierto];
        sp += p;
      }
      if (sp <= 0) { mitat.tyhjiaPikseleita += 1; sp = 1; }
      const r = Math.round(sr / sp);
      const v = Math.round(sg / sp);
      const s = Math.round(sb / sp);
      const o = i * 3;
      ulosRivi[o] = r; ulosRivi[o + 1] = v; ulosRivi[o + 2] = s;
      if (napaMittaus) {
        const puoli = latKeski < 0 ? mitat.etela : mitat.pohjoinen;
        const kirkkaus = (r + v + s) / 3;
        if (sz / sp >= 0) { puoli.maa += 1; puoli.maaKirkkaus += kirkkaus; } else { puoli.meri += 1; puoli.meriKirkkaus += kirkkaus; }
      }
    }
    for (const k of koetinPaikat) {
      if (k.py === j) {
        const o = k.px * 3;
        k.vari = [ulosRivi[o], ulosRivi[o + 1], ulosRivi[o + 2]];
      }
    }
    writeSync(raaka, ulosRivi);
  }
}
closeSync(raaka);

// ------------------------------------------------------------ tarkistukset

console.log('sijoittelun tarkistus:');
let virheita = 0;
for (const k of koetinPaikat) {
  const [r, v, s] = k.vari ?? [0, 0, 0];
  // Meren sini johtaa selvästi; maalla se ei johda millään korkeudella.
  const meri = s > r + 30 && s > v + 20;
  // Jää on vaalea JA väritön: kaikki kolme kanavaa korkealla ja lähellä
  // toisiaan. Näin jäätä ei sekoita lumirajan valkoiseen huippuun (se
  // on samaa väriä, mutta koettimet ovat tasaisilla jäätiköillä) eikä
  // vaaleaan rannikkoveteen (jonka sini johtaa yhä).
  const jaa = Math.min(r, v, s) > 150 && (Math.max(r, v, s) - Math.min(r, v, s)) < 45;
  // Merijää: sininen johtaa punaista, ja jää on vaalentanut syvän meren.
  const merijaa = s > r + 15 && r > 60;
  const osui = k.odotus === 'meri' ? meri
    : (k.odotus === 'jaa' ? jaa : (k.odotus === 'merijaa' ? merijaa : !meri && !jaa));
  if (!osui) virheita += 1;
  console.log(`  ${osui ? 'ok  ' : 'VIKA'} ${k.nimi.padEnd(24)} `
    + `rgb(${String(r).padStart(3)},${String(v).padStart(3)},${String(s).padStart(3)}) `
    + `(odotus: ${k.odotus})`);
}

for (const [nimi, puoli] of [['etelä (lat < −70°)', mitat.etela], ['pohjoinen (lat > 70°)', mitat.pohjoinen]]) {
  const yht = puoli.maa + puoli.meri;
  if (!yht) continue;
  const osuus = (puoli.maa / yht) * 100;
  const mk = puoli.maa ? puoli.maaKirkkaus / puoli.maa : 0;
  const vk = puoli.meri ? puoli.meriKirkkaus / puoli.meri : 0;
  console.log(`${nimi}: maata ${osuus.toFixed(1)} % pikseleistä, `
    + `keskikirkkaus maalla ${mk.toFixed(0)}, merellä ${vk.toFixed(0)} (ero ${(mk - vk).toFixed(0)})`);
}
if (mitat.tyhjiaRiveja || mitat.tyhjiaPikseleita) {
  virheita += 1;
  console.log(`VIKA: ${mitat.tyhjiaRiveja} riviä ja ${mitat.tyhjiaPikseleita} pikseliä `
    + 'jäi ilman näytettä — kuvaan tulisi tyhjä kohta');
}
if (virheita) {
  unlinkSync(raakaPolku);
  throw new Error(`${virheita} tarkistusta epäonnistui — kuvaa EI kirjoitettu.`);
}

// ----------------------------------------------------------------- pakkaus

/*
 * Pillow ilman NumPyä: frombytes lukee raakapikselit sellaisenaan ja
 * resize(Image.BOX) pienentää laatikkosuodatuksella eli samalla
 * keskiarvolla, jolla iso kuva itse syntyi. Kaksi eri suodatinta
 * antaisi kaksi eri maailmaa samasta ajosta.
 *
 * Skripti kirjoitetaan tiedostoon eikä anneta python3 -c:lle: -c:n
 * argumentti puretaan käyttöjärjestelmän merkistöllä, joten ä ja ö
 * hajoaisivat koneella, jolla LANG on C.
 */
const PYTHON = `
import io, json, sys
from PIL import Image

ohje = json.load(sys.stdin)
L, K = ohje['leveys'], ohje['korkeus']
with open(ohje['raaka'], 'rb') as t:
    raaka = t.read()
if len(raaka) != L * K * 3:
    sys.exit('raakakuva on vaaran kokoinen: %d != %d' % (len(raaka), L * K * 3))
kuva = Image.frombytes('RGB', (L, K), raaka)

def talleta(im, polku, laatu):
    puskuri = io.BytesIO()
    im.save(puskuri, format='WEBP', quality=laatu, method=6)
    tavut = puskuri.getvalue()
    # Alfan tarkistus ladatusta tiedostosta: RGB-WebPissa ei ole
    # alfakanavaa lainkaan, joten RGBA:ksi muunnettuna sen on oltava
    # 255 joka pikselissa. Jos tassa nakyisi muuta, kuvassa olisi
    # lapinakyvia kohtia - juuri se vika, jota tama tyokalu korjaa.
    ladattu = Image.open(io.BytesIO(tavut))
    alfa = ladattu.convert('RGBA').getchannel('A').getextrema()
    if not ohje['kuiva']:
        with open(polku, 'wb') as t:
            t.write(tavut)
    return {'polku': polku, 'tavua': len(tavut), 'leveys': im.width,
            'korkeus': im.height, 'alfa': list(alfa), 'muoto': ladattu.mode}

ulos = {'iso': talleta(kuva, ohje['iso'], ohje['laatu'])}
if ohje['pieni']:
    pieni = kuva.resize((ohje['pieni'], ohje['pieni'] // 2), Image.BOX)
    ulos['pieni'] = talleta(pieni, ohje['pieniPolku'], ohje['laatu'])

if ohje['koekuva']:
    koe = kuva.resize((min(L, 1024), max(1, min(L, 1024) // 2)), Image.BOX)
    for laatu in [88, 82, 76, 70, 64, 58, 50, 42]:
        puskuri = io.BytesIO()
        koe.save(puskuri, format='JPEG', quality=laatu, optimize=True)
        if len(puskuri.getvalue()) <= ohje['koekuvaKatto']:
            with open(ohje['koekuva'], 'wb') as t:
                t.write(puskuri.getvalue())
            ulos['koekuva'] = {'polku': ohje['koekuva'], 'tavua': len(puskuri.getvalue()),
                               'leveys': koe.width, 'korkeus': koe.height, 'laatu': laatu}
            break

print(json.dumps(ulos))
`;

if (!kuiva) mkdirSync(ULOS, { recursive: true });
if (KOEKUVA) mkdirSync(dirname(join(JUURI, KOEKUVA)), { recursive: true });
const skriptiPolku = join(VALIMUISTI, 'pakkaa-pallo-koko.py');
writeFileSync(skriptiPolku, PYTHON, 'utf8');

const ajo = spawnSync('python3', [skriptiPolku], {
  input: JSON.stringify({
    raaka: raakaPolku,
    iso: join(ULOS, NIMI_ISO),
    pieni: PIENI && PIENI < LEVEYS ? PIENI : 0,
    pieniPolku: join(ULOS, NIMI_PIENI),
    koekuva: KOEKUVA ? join(JUURI, KOEKUVA) : null,
    koekuvaKatto: 200 * 1024,
    kuiva,
    leveys: LEVEYS,
    korkeus: KORKEUS,
    laatu: LAATU,
  }),
  encoding: 'utf8',
  maxBuffer: 16 * 1024 * 1024,
});

/*
 * SHARP-VARAPOLKU (Opus 19.9.2026): Mac Studiolla ei ole Pillow'ta
 * missään Pythonissa, mutta repon kehitysriippuvuus sharp on. Jos
 * Python-pakkaus kaatuu, sama pari pakataan sharpilla: WebP samalla
 * laadulla ja effort 6 (Pillow'n method=6), pieni versio
 * laatikkosuodatuksella kuten Pillow'n Image.BOX (tasan puolitus, joten
 * keskiarvo 2 × 2 on täsmälleen BOX). Koekuvaa varapolku ei tee.
 */
async function pakkaaSharpilla() {
  const { createRequire } = await import('node:module');
  const vaadi = createRequire(import.meta.url);
  // Worktreessä ei ole omaa node_modulesia: SHARP_JS kuten PLAYWRIGHT_JS.
  const sharp = vaadi(process.env.SHARP_JS ?? 'sharp');
  const { readFileSync } = await import('node:fs');
  const raakaData = readFileSync(raakaPolku);
  const talleta = async (data, leveys, korkeus, polku) => {
    const tavut = await sharp(data, { raw: { width: leveys, height: korkeus, channels: 3 } })
      .webp({ quality: LAATU, effort: 6 }).toBuffer();
    const meta = await sharp(tavut).metadata();
    if (!kuiva) writeFileSync(polku, tavut);
    return {
      polku, tavua: tavut.length, leveys: meta.width, korkeus: meta.height,
      alfa: meta.hasAlpha ? [0, 255] : [255, 255], muoto: meta.hasAlpha ? 'RGBA' : 'RGB',
    };
  };
  const ulos = { iso: await talleta(raakaData, LEVEYS, KORKEUS, join(ULOS, NIMI_ISO)) };
  if (PIENI && PIENI * 2 === LEVEYS) {
    const pl = PIENI; const pk = KORKEUS / 2;
    const pieni = Buffer.allocUnsafe(pl * pk * 3);
    for (let y = 0; y < pk; y += 1) {
      for (let x = 0; x < pl; x += 1) {
        for (let c = 0; c < 3; c += 1) {
          const a = ((2 * y) * LEVEYS + 2 * x) * 3 + c;
          const b = a + LEVEYS * 3;
          pieni[(y * pl + x) * 3 + c] = Math.round(
            (raakaData[a] + raakaData[a + 3] + raakaData[b] + raakaData[b + 3]) / 4,
          );
        }
      }
    }
    ulos.pieni = await talleta(pieni, pl, pk, join(ULOS, NIMI_PIENI));
  } else if (PIENI) {
    throw new Error('sharp-varapolku osaa vain tasan puolitetun pienen version (--pieni = --leveys / 2)');
  }
  return ulos;
}

let tulos;
if (ajo.status !== 0) {
  console.error(ajo.stderr || ajo.stdout);
  console.log('Python-pakkaus ei onnistunut — pakataan sharpilla');
  tulos = await pakkaaSharpilla().catch((e) => {
    unlinkSync(raakaPolku);
    throw new Error(`pakkaus epäonnistui (Pillow ja sharp): ${e.message}`);
  });
} else {
  tulos = JSON.parse(ajo.stdout.trim().split('\n').pop());
}
unlinkSync(raakaPolku);

for (const [avain, t] of Object.entries(tulos)) {
  console.log(`${avain.padEnd(8)} ${t.leveys} × ${t.korkeus}, ${(t.tavua / 1024).toFixed(0)} kt`
    + (t.alfa ? `, alfa ${t.alfa[0]}…${t.alfa[1]} (${t.muoto})` : '')
    + `  ${t.polku.replace(`${JUURI}/`, '')}`);
  if (t.alfa && t.alfa[0] !== 255) {
    throw new Error(`${t.polku}: alfan minimi on ${t.alfa[0]} — kuvassa on läpinäkyviä pikseleitä`);
  }
}
if (kuiva) console.log('--kuiva: tiedostoja ei kirjoitettu');
else console.log(`valmis: ${ULOS.replace(`${JUURI}/`, '')}/ — vienti R2:een tehdään työnkulussa`);
