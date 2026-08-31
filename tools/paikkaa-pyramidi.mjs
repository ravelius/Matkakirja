/*
 * POHJAPYRAMIDIN PAIKKAUS — rajatun alueen korjaus ilman koko maailman
 * uudelleenpiirtoa.
 *
 *   node tools/paikkaa-pyramidi.mjs suunnittele --luettelo <polku|-> \
 *        --lahdeversio 2026-08-31c --versio 2026-08-31c-p1 \
 *        --alue 80,27,95,36 [--nostoversio X] [--ulos <tiedosto>]
 *   node tools/paikkaa-pyramidi.mjs vertaa --lahde <kansio> \
 *        --paikattu <kansio> --lista <laatat.json>
 *   node tools/paikkaa-pyramidi.mjs sauma --paikattu <kansio> \
 *        --lista <laatat.json> [--kuva <png>]
 *
 * === MIKSI TÄMÄ ON OLEMASSA =========================================
 *
 * Koko pyramidi on 23 340 laattaa ja täysajo tunteja (matriisissakin
 * lähes tunti). Virhe on melkein aina paikallinen: yhden järven väri,
 * yhden vuoren nimi, yhden saaren rannikko. Paikkausajo piirtää VAIN
 * korjattavaan laatikkoon osuvat laatat — Kreikan kokoinen laatikko on
 * 55 laattaa kaikilta kahdeksalta tasolta — ja kopioi loput 23 285
 * laattaa lähdeversiosta uuteen versiopolkuun ÄMPÄRIN SISÄLLÄ
 * palvelinkopiona. Mitään ei ladata ajokoneelle.
 *
 * === MIKSI SAUMAA EI SYNNY ==========================================
 *
 * Laatta ei riipu naapuristaan: jokainen lasketaan arkin
 * koordinaateista ja patina on sidottu arkin pikseliin
 * (generoi-laattapyramidi.mjs, REUNUS ja lohkopiirron `arkki`-asetus).
 * Sama laatta samasta aineistosta on siis tavulleen sama riippumatta
 * siitä, piirrettiinkö se maailma-ajossa vai alueajossa — ja
 * `vertaa`-tila todistaa sen jokaisella ajolla mittaamalla, että
 * alueen ULKOPUOLISET laatat ovat bitilleen lähdeversion laattoja.
 *
 * Se, mikä VOI erota, on ajon asetus: laatu, muoto, laattakoko tai
 * patinataso. Siksi `suunnittele` lukee ne lähdeversion luettelosta
 * eikä anna käyttäjän arvata niitä uudestaan.
 *
 * === TURVA ==========================================================
 *
 * Paikkaus EI KOSKAAN kirjoita lähdeversion polkuun: laatat ovat
 * ikuisessa välimuistissa (immutable), joten yksikin ylikirjoitus
 * jättäisi osalle selaimista vanhan ja osalle uuden. Uusi versio on
 * aina uusi polku, ja jos se on jo ämpärissä, ajo kieltäytyy.
 */
import {
  readFileSync, writeFileSync, appendFileSync, readdirSync, statSync, existsSync, mkdirSync,
} from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';

const argv = process.argv.slice(2);
const tila = argv[0];
const valitsin = (nimi, oletus = null) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : oletus;
};
const lippu = (nimi) => argv.includes(`--${nimi}`);

const KAYTTO = `Käyttö:
  node tools/paikkaa-pyramidi.mjs suunnittele --luettelo <polku|-> \\
       --lahdeversio <versio> --versio <uusi versio> --alue lon0,lat0,lon1,lat1 \\
       [--nostoversio <versio>] [--salli-eri-luettelo] [--ulos <tiedosto>]
  node tools/paikkaa-pyramidi.mjs vertaa --lahde <kansio> --paikattu <kansio> \\
       --lista <laatat.json>
  node tools/paikkaa-pyramidi.mjs sauma --paikattu <kansio> --lista <laatat.json> \\
       [--kuva <png>] [--raja 2.5]`;

/** Kuolettava virhe: yksi rivi, ei pinoa — tämä ajetaan työnkulussa. */
function kuole(viesti) {
  console.error(`VIRHE: ${viesti}`);
  process.exit(1);
}

/* ------------------------------------------------------- suunnittele */

/**
 * Lukee lähdeversion luettelon ja johtaa siitä paikkausajon asetukset.
 *
 * Luettelo on ainoa paikka, jossa lähdeajon asetukset ovat tallessa;
 * työnkulun syötteet kertovat vain MITÄ korjataan, eivät MILLÄ
 * asetuksilla lähde piirrettiin. Jos paikkaus arvaisi ne väärin, laatat
 * täsmäisivät geometrialtaan mutta erottuisivat silmällä.
 */
function suunnittele() {
  const luettelopolku = valitsin('luettelo');
  const lahdeversio = valitsin('lahdeversio');
  const versio = valitsin('versio');
  const alue = valitsin('alue');
  if (!luettelopolku || !lahdeversio || !versio || !alue) kuole(KAYTTO);

  if (lahdeversio === versio) {
    kuole(`lähdeversio ja uusi versio ovat sama (${versio}). `
      + 'Paikkaus ei saa koskaan kirjoittaa lähteen polkuun.');
  }
  const osat = alue.split(',').map(Number);
  if (osat.length !== 4 || osat.some((v) => !Number.isFinite(v))) {
    kuole(`alue ei ole lon0,lat0,lon1,lat1: ${alue}`);
  }
  const [lon0, lat0, lon1, lat1] = osat;
  for (const v of [lat0, lat1]) if (v < -90 || v > 90) kuole(`leveysaste ${v} ei ole −90..90`);
  for (const v of [lon0, lon1]) if (v < -360 || v > 360) kuole(`pituusaste ${v} ei ole −360..360`);
  if (lat0 === lat1 || lon0 === lon1) kuole('alue on nollan levyinen laatikko');

  const teksti = luettelopolku === '-'
    ? readFileSync(0, 'utf8')
    : readFileSync(luettelopolku, 'utf8');
  let luettelo;
  try {
    luettelo = JSON.parse(teksti);
  } catch (e) {
    kuole(`lähdeluettelo ei ole JSONia: ${e.message}`);
  }

  /*
   * LUETTELON ON KUVATTAVA JUURI SITÄ VERSIOTA, JOSTA KOPIOIDAAN.
   * Ämpärin `pyramidi.json` osoittaa uusimpaan julkaistuun versioon;
   * jos se ei ole paikattava lähde, joko lähdeversio on kirjoitettu
   * väärin tai joku on julkaissut välissä. Kummassakin tapauksessa
   * asetukset (laatu, patina, nostoversio) tulisivat väärästä ajosta.
   */
  if (luettelo.versio !== lahdeversio && !lippu('salli-eri-luettelo')) {
    kuole(`lähdeluettelo kuvaa version ${luettelo.versio}, ei versiota ${lahdeversio}. `
      + 'Tarkista lähdeversio tai anna --salli-eri-luettelo, jos asetukset tulevat tarkoituksella muualta.');
  }

  const zt = (luettelo.tasot ?? []).map((t) => t.z).filter((z) => Number.isFinite(z));
  if (!zt.length) kuole('lähdeluettelossa ei ole yhtään tasoa');
  const tasot = `${Math.min(...zt)}-${Math.max(...zt)}`;

  /*
   * NOSTOTASO EI OSALLISTU PAIKKAUKSEEN. Nostolaatat asuvat OMAN
   * versionsa polussa (<nostoversio>/nostot/z…), ja se polku on
   * ikuisessa välimuistissaan olemassa myös paikkauksen jälkeen —
   * niitä ei siis kopioida eikä piirretä, vaan luettelo osoittaa
   * edelleen samaan nostoversioon. Tämä pätee myös silloin, kun
   * nostoversio sattuu olemaan sama merkkijono kuin pohjan lähdeversio
   * (yhteisajo): silloinkin `nostot/`-alipuu jää lähdeversion polkuun,
   * eikä uuden version alle tarvita siitä kopiota.
   */
  const nostoversio = valitsin('nostoversio') || luettelo.nostotaso?.versio || '';

  const patina = luettelo.patina ?? 'taysi';
  const varoitukset = [];
  if (!luettelo.patina) {
    varoitukset.push('lähdeluettelossa ei ole patina-kenttää (ajettu ennen paikkaustukea); '
      + 'oletetaan "taysi" — tarkista ajon loki jos lähde on ajettu muulla tasolla');
  }
  if (!nostoversio) {
    varoitukset.push('lähdeluettelossa ei ole nostotasoa; paikattu versio jää ilman nostokerrosta');
  }

  const arvot = {
    LAHDEVERSIO: lahdeversio,
    VERSIO: versio,
    ALUE: alue,
    TASOT: tasot,
    LAATU: String(luettelo.laatu ?? 0.9),
    MUOTO: luettelo.muoto ?? 'webp',
    LAATTA: String(luettelo.laatta ?? 512),
    PATINA: patina,
    NOSTOVERSIO: nostoversio,
  };

  console.log('PAIKKAUSSUUNNITELMA');
  console.log(`  lähdeversio     ${lahdeversio}  (kopioidaan ämpärin sisällä)`);
  console.log(`  uusi versio     ${versio}`);
  console.log(`  alue            lon ${lon0}..${lon1} lat ${lat0}..${lat1}`);
  console.log(`  tasot           z${tasot}`);
  console.log(`  asetukset       ${arvot.MUOTO} q${arvot.LAATU}, laatta ${arvot.LAATTA}, patina ${patina}`);
  console.log(`  nostotaso       ${nostoversio || '(ei nostotasoa)'} — ei kopioida eikä piirretä`);
  for (const v of varoitukset) console.log(`  VAROITUS        ${v}`);

  const ulos = valitsin('ulos') ?? process.env.GITHUB_OUTPUT ?? null;
  const rivit = `${Object.entries(arvot).map(([k, v]) => `${k}=${v}`).join('\n')}\n`;
  if (ulos) appendFileSync(ulos, rivit);
  else console.log(`\n${rivit.trim()}`);
}

/* ------------------------------------------------------------ vertaa */

/** Kaikki laatat kansiossa: "z:sarake:rivi" -> polku. */
function keraaLaatat(juuri) {
  const ulos = new Map();
  if (!existsSync(juuri)) kuole(`kansiota ei ole: ${juuri}`);
  for (const taso of readdirSync(juuri)) {
    const m = /^z(\d+)$/.exec(taso);
    if (!m) continue;
    const tasopolku = join(juuri, taso);
    if (!statSync(tasopolku).isDirectory()) continue;
    for (const sarake of readdirSync(tasopolku)) {
      const sarakepolku = join(tasopolku, sarake);
      if (!statSync(sarakepolku).isDirectory()) continue;
      for (const tiedosto of readdirSync(sarakepolku)) {
        const r = /^(\d+)\.[a-z0-9]+$/.exec(tiedosto);
        if (!r) continue;
        ulos.set(`${m[1]}:${sarake}:${r[1]}`, join(sarakepolku, tiedosto));
      }
    }
  }
  return ulos;
}

const tiiviste = (polku) => createHash('sha256').update(readFileSync(polku)).digest('hex');

/**
 * TODISTUS SIITÄ, ETTÄ PAIKKAUS PYSYI LAATIKOSSAAN.
 *
 * Kolme väitettä, jotka kaikki mitataan eikä uskota:
 *   1. jokainen listan laatta on paikatussa setissä,
 *   2. jokainen listan ULKOPUOLINEN laatta on bitilleen lähteen laatta
 *      (tämä on se, joka kaatuu jos kopio jäi kesken tai piirto vuoti
 *      alueen yli),
 *   3. paikatussa setissä ei ole laattoja, joita ei ole lähteessä eikä
 *      listassa.
 *
 * Lisäksi raportoidaan alueen REUNA erikseen: listan laattojen
 * naapurit, jotka eivät ole listassa. Ne ovat ne laatat, joihin sauma
 * syntyisi — jos jokin niistä on muuttunut, patina ei ollutkaan
 * sidottu arkin pikseliin.
 */
function vertaa() {
  const lahde = valitsin('lahde');
  const paikattu = valitsin('paikattu');
  const listapolku = valitsin('lista');
  if (!lahde || !paikattu || !listapolku) kuole(KAYTTO);

  const lista = JSON.parse(readFileSync(listapolku, 'utf8'));
  const listatut = new Set(lista.laatat.map(([z, s, r]) => `${z}:${s}:${r}`));
  const a = keraaLaatat(lahde);
  const b = keraaLaatat(paikattu);

  const puuttuu = [];
  const muuttuneet = [];
  const samat = [];
  const vuotaneet = [];
  const ylimaaraiset = [];

  for (const avain of listatut) {
    if (!b.has(avain)) puuttuu.push(avain);
  }
  for (const [avain, polkuB] of b) {
    if (!a.has(avain)) {
      if (!listatut.has(avain)) ylimaaraiset.push(avain);
      continue;
    }
    const sama = tiiviste(a.get(avain)) === tiiviste(polkuB);
    if (listatut.has(avain)) (sama ? samat : muuttuneet).push(avain);
    else if (!sama) vuotaneet.push(avain);
  }
  const kadonneet = [...a.keys()].filter((k) => !b.has(k));

  /* Alueen reuna: listan laattojen naapurit, jotka eivät ole listassa. */
  const reuna = new Set();
  for (const avain of listatut) {
    const [z, s, r] = avain.split(':').map(Number);
    for (const [ds, dr] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const n = `${z}:${s + ds}:${r + dr}`;
      if (!listatut.has(n) && b.has(n)) reuna.add(n);
    }
  }
  const reunaMuuttui = [...reuna].filter((k) => a.has(k)
    && tiiviste(a.get(k)) !== tiiviste(b.get(k)));

  console.log('PAIKKAUKSEN VERTAILU');
  console.log(`  lähde           ${a.size} laattaa`);
  console.log(`  paikattu        ${b.size} laattaa`);
  console.log(`  alueen laatat   ${listatut.size} (lista)`);
  console.log(`    muuttui       ${muuttuneet.length}`);
  console.log(`    ennallaan     ${samat.length}`);
  console.log(`  alueen ulkop.   ${b.size - listatut.size} laattaa, `
    + `joista muuttui ${vuotaneet.length}`);
  console.log(`  reunalaatat     ${reuna.size} (alueen ulkopuolinen naapurirengas), `
    + `joista muuttui ${reunaMuuttui.length}`);

  const virheet = [];
  if (puuttuu.length) virheet.push(`${puuttuu.length} alueen laattaa puuttuu paikatusta setistä (${puuttuu.slice(0, 5).join(' ')})`);
  if (vuotaneet.length) virheet.push(`${vuotaneet.length} alueen ULKOPUOLISTA laattaa muuttui (${vuotaneet.slice(0, 5).join(' ')})`);
  if (kadonneet.length) virheet.push(`${kadonneet.length} lähteen laattaa puuttuu paikatusta setistä (${kadonneet.slice(0, 5).join(' ')})`);
  if (ylimaaraiset.length) virheet.push(`${ylimaaraiset.length} laattaa on paikatussa setissä ilman vastinetta lähteessä eikä listassa (${ylimaaraiset.slice(0, 5).join(' ')})`);
  if (reunaMuuttui.length) virheet.push(`${reunaMuuttui.length} reunalaattaa muuttui — patina ei ole sidottu arkin pikseliin`);

  if (virheet.length) {
    for (const v of virheet) console.log(`  FAIL            ${v}`);
    process.exit(1);
  }
  console.log('  OK              vain alueen laatat muuttuivat, reunat bitilleen ennallaan');
}

/* ------------------------------------------------------------- sauma */

/**
 * SAUMAN MITTAUS JA KUVA.
 *
 * Vertailu (`vertaa`) todistaa, että kopioidut laatat ovat ennallaan.
 * Se ei vielä todista, että paikattu ja kopioitu laatta SOPIVAT
 * yhteen — periaatteessa piirto voisi olla toistettava mutta silti eri
 * kuin lähdeajossa. Mittari on yksinkertainen: kahden vierekkäisen
 * laatan rajapinnalla pikselien ero saa olla samaa suuruusluokkaa kuin
 * saman laatan sisällä vierekkäisten pikselisarakkeiden ero. Jos raja
 * loistaa, suhdeluku hyppää.
 *
 * Kuva kirjoitetaan silmällä katsomista varten: paikattu laatta ja sen
 * kopioitu naapuri vierekkäin, sauma keskellä.
 */
async function sauma() {
  const paikattu = valitsin('paikattu');
  const listapolku = valitsin('lista');
  if (!paikattu || !listapolku) kuole(KAYTTO);
  const raja = Number(valitsin('raja', '2.5'));
  const kuva = valitsin('kuva');

  const lista = JSON.parse(readFileSync(listapolku, 'utf8'));
  const listatut = new Set(lista.laatat.map(([z, s, r]) => `${z}:${s}:${r}`));
  const b = keraaLaatat(paikattu);

  /*
   * Valitaan syvin taso, jolta löytyy paikattu laatta ja sen oikea
   * naapuri kopioitujen puolelta: syvimmällä tasolla laatta on
   * pienimmällä maa-alalla eli sauma kulkee maastossa eikä ulapalla.
   */
  let pari = null;
  for (const avain of [...listatut].sort((x, y) => Number(y.split(':')[0]) - Number(x.split(':')[0]))) {
    const [z, s, r] = avain.split(':').map(Number);
    const oikea = `${z}:${s + 1}:${r}`;
    if (!listatut.has(oikea) && b.has(oikea) && b.has(avain)) {
      pari = { z, vasen: avain, oikea };
      break;
    }
  }
  if (!pari) kuole('paikatun alueen oikealta reunalta ei löytynyt kopioitua naapuria');

  const paketti = await import('playwright')
    .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
  const chromium = paketti.chromium ?? paketti.default?.chromium;
  const selain = await chromium.launch({
    executablePath: process.env.PW_CHROMIUM ?? '/opt/pw-browsers/chromium',
    args: ['--no-sandbox'],
  });
  const sivu = await selain.newPage();
  const tyyppi = `image/${lista.muoto ?? 'webp'}`;
  const data = (avain) => `data:${tyyppi};base64,${readFileSync(b.get(avain)).toString('base64')}`;

  const tulos = await sivu.evaluate(async ([vasenUrl, oikeaUrl]) => {
    const lataa = async (url) => {
      const bittikartta = await createImageBitmap(await (await fetch(url)).blob());
      const c = new OffscreenCanvas(bittikartta.width, bittikartta.height);
      const g = c.getContext('2d');
      g.drawImage(bittikartta, 0, 0);
      return { data: g.getImageData(0, 0, c.width, c.height), w: c.width, h: c.height };
    };
    const A = await lataa(vasenUrl);
    const B = await lataa(oikeaUrl);
    const korkeus = Math.min(A.h, B.h);
    /* Kahden pikselisarakkeen keskimääräinen kanavaero. */
    const ero = (kuvaA, xa, kuvaB, xb) => {
      let summa = 0;
      for (let y = 0; y < korkeus; y += 1) {
        const ia = (y * kuvaA.w + xa) * 4;
        const ib = (y * kuvaB.w + xb) * 4;
        for (let k = 0; k < 3; k += 1) summa += Math.abs(kuvaA.data.data[ia + k] - kuvaB.data.data[ib + k]);
      }
      return summa / (korkeus * 3);
    };
    /* Sauma: A:n viimeinen sarake vs. B:n ensimmäinen. */
    const saumaEro = ero(A, A.w - 1, B, 0);
    /* Perustaso: sisäiset naapurisarakkeet kummastakin laatasta. */
    let sisa = 0;
    let n = 0;
    for (const kuva2 of [A, B]) {
      for (let x = 1; x < kuva2.w; x += 1) {
        sisa += ero(kuva2, x - 1, kuva2, x);
        n += 1;
      }
    }
    /* Kuva: laatat vierekkäin, sauma keskellä. */
    const c = new OffscreenCanvas(A.w + B.w, korkeus);
    const g = c.getContext('2d');
    g.putImageData(A.data, 0, 0);
    g.putImageData(B.data, A.w, 0);
    const blob = await c.convertToBlob({ type: 'image/png' });
    const puskuri = new Uint8Array(await blob.arrayBuffer());
    let merkkijono = '';
    for (const tavu of puskuri) merkkijono += String.fromCharCode(tavu);
    return {
      saumaEro, sisaEro: sisa / n, leveys: c.width, korkeus, png: btoa(merkkijono),
    };
  }, [data(pari.vasen), data(pari.oikea)]);

  await selain.close();

  const suhde = tulos.saumaEro / tulos.sisaEro;
  console.log('SAUMAN MITTAUS');
  console.log(`  pari            z${pari.z}  paikattu ${pari.vasen} | kopioitu ${pari.oikea}`);
  console.log(`  sauman ero      ${tulos.saumaEro.toFixed(3)} kanavayksikköä / pikseli`);
  console.log(`  sisäinen ero    ${tulos.sisaEro.toFixed(3)} (saman laatan naapurisarakkeet)`);
  console.log(`  suhde           ${suhde.toFixed(2)} × (raja ${raja})`);
  if (kuva) {
    mkdirSync(dirname(kuva), { recursive: true });
    writeFileSync(kuva, Buffer.from(tulos.png, 'base64'));
    console.log(`  kuva            ${kuva} (${tulos.leveys} x ${tulos.korkeus})`);
  }
  if (!(suhde <= raja)) {
    console.log('  FAIL            sauma erottuu: rajapinnan ero on moninkertainen sisäiseen nähden');
    process.exit(1);
  }
  console.log('  OK              sauma on kohinan tasolla');
}

/* --------------------------------------------------------------- ajo */

if (tila === 'suunnittele') suunnittele();
else if (tila === 'vertaa') vertaa();
else if (tila === 'sauma') await sauma();
else {
  console.error(KAYTTO);
  process.exit(1);
}
