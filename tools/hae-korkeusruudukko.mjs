/*
 * Tiheä korkeusruudukko varjostusta varten.
 *
 *   node tools/hae-korkeusruudukko.mjs [--ruutu 0.05] [--nayte 2] [--kuiva]
 *
 * Tämä ei kirjoita repoon mitään. Se on MODUULI, jonka muut työkalut
 * tuovat: `haeKorkeusruudukko()` palauttaa koko maailman korkeudet
 * yhtenä Float32-taulukkona, ja komentoriviltä ajettuna sama työkalu
 * vain lataa ruudukon välimuistiin ja kertoo mitä siihen tuli.
 *
 * --- miksi kolmas kerta samaa aineistoa ---
 *
 * ETOPO1 haetaan jo kahdesti: hae-korkeusvyohykkeet.mjs tekee kartan
 * pysyvän maaston (0,25°) ja hae-topografia.mjs linssin vyöhykkeet
 * (0,1°). Molemmat muuttavat ruudukon heti ÄÄRIVIIVOIKSI ja heittävät
 * ruudukon pois. Varjostus tarvitsee juuri sen, minkä ne heittävät:
 * jokaisen ruudun oman korkeuden, koska varjo lasketaan naapuriruutujen
 * EROSTA eikä siitä, minkä vyöhykkeen sisällä ruutu sattuu olemaan.
 *
 * Siksi tämä on oma tiedostonsa eikä lisäys kumpaankaan: ne tuottavat
 * monikulmioita, tämä tuottaa ruudukon. Yhteistä on vain netCDF-lukija
 * ja latauskaista, jotka on lainattu hae-topografia.mjs:stä sellaisenaan
 * (lainattu eikä jaettu samasta syystä kuin siellä: työkalut saavat
 * kehittyä eri suuntiin).
 *
 * --- ruudun koko ---
 *
 * 0,05° on kolme kaariminuuttia eli päiväntasaajalla noin 5,5 km.
 * Maailmankartan lauta on 12000 pikseliä leveä, joten yksi ruutu on
 * siinä 1,7 pikseliä: ruudukko on juuri sen verran laudan piirtoa
 * tarkempi, ettei varjostuksesta tule portaikkoa lähikuvassakaan.
 * Tätä tiheämpi ei kannata — 0,025° nelinkertaistaisi muistin ja
 * latauksen, mutta varjo on jo nyt tarkempi kuin mikään mitä sen
 * päälle piirretään.
 *
 * Ruudukko on kymmeniä megatavuja EIKÄ KUULU REPOON. Se jää tmpdiriin,
 * ja KORKEUSRUUDUKKO_VALIMUISTI osoittaa muualle, jos sen haluaa
 * säilyttää koneen uudelleenkäynnistysten yli.
 *
 * Verkko: Noden fetch ei lue HTTPS_PROXYa, ks. tools/hae-radiot.mjs.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { tmpdir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const TAMA = fileURLToPath(import.meta.url);

/*
 * Ajetaanko tätä suoraan vai onko tämä tuotu jostain?
 *
 * Sisartyökalut käynnistävät itsensä uudelleen NODE_USE_ENV_PROXY
 * päällä ehdoitta, koska niitä ei tuoda mistään. Tämä on moduuli:
 * ehdoton uudelleenkäynnistys käynnistäisi Noden uudestaan TESTIN
 * argumenteilla kesken `npm test`-ajon, eikä testi enää palaisi.
 */
const AJETAAN_SUORAAN = Boolean(process.argv[1]) && resolve(process.argv[1]) === TAMA;

if (AJETAAN_SUORAAN && !process.env.NODE_USE_ENV_PROXY
  && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const ajo = spawnSync(process.execPath, [TAMA, ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
  });
  process.exit(ajo.status ?? 1);
}

/*
 * === REPOSSA OLEVA AINEISTO ON ENSISIJAINEN LÄHDE ===================
 *
 * Omistajan päätös 30.8.2026: YKSIKÄÄN AJO EI SAA RIIPPUA NOAA:N
 * TAVOITETTAVUUDESTA. Laattapyramidin ensimmäinen CI-koeajo kaatui
 * juuri siihen — ERDDAP ei vastannut ajokoneelta lainkaan ("fetch
 * failed", ei HTTP-statusta), vaikka kontista sama osoite vastaa
 * sekunnissa.
 *
 * Harvennettu ruudukko on siksi repossa (ks. tools/tee-korkeusaineisto.mjs
 * ja tools/korkeusaineisto/LUEMINUT.md). Verkkoon mennään enää siinä
 * tapauksessa, että aineistoa ei ole — eli kun joku haluaa
 * NIMENOMAAN tarkemman ruudun kuin repoon on talletettu.
 *
 * TÄTÄ EI HARVENNETA TOISEEN KERTAAN. Tiedostossa on jo valmis
 * keskiarvoistettu ruudukko; lukija vain purkaa sen. Kaksi kertaa
 * keskiarvoistettu maasto olisi liian sileä, ja se olisi hiljainen
 * laatuvirhe jota kukaan ei huomaisi katsomalla.
 */
export const AINEISTON_POLKU = 'tools/korkeusaineisto/etopo-3kaariminuuttia.bin.gz';
/** Repossa olevan aineiston tunnus (erotukseksi välimuistin MKR1:stä). */
export const TUNNUS3 = 'MKR3';
const AINEISTON_OTSIKKO = 4 + 4 + 4 + 8 + 4;

/**
 * Lukee repon aineiston, jos se on olemassa ja vastaa pyydettyä ruutua.
 * Palauttaa Int16Array-ruudukon tai null.
 */
function lueRepostaAineisto(ruutu, hiljaa) {
  const polku = new URL(`../${AINEISTON_POLKU}`, import.meta.url);
  if (!existsSync(polku)) return null;
  let runko;
  try {
    runko = gunzipSync(readFileSync(polku));
  } catch {
    return null;
  }
  if (runko.length < AINEISTON_OTSIKKO) return null;
  if (runko.toString('latin1', 0, 4) !== TUNNUS3) return null;
  const leveys = runko.readUInt32LE(4);
  const korkeus = runko.readUInt32LE(8);
  const oma = runko.readDoubleLE(12);
  if (oma !== ruutu) return null;
  const n = leveys * korkeus;
  if (runko.length !== AINEISTON_OTSIKKO + n * 2) return null;
  /*
   * Erotuskoodauksen purku: rivin yli kulkeva summa. Kopio eikä näkymä,
   * koska readFileSync ei takaa kahdella jaollista alkukohtaa.
   */
  const z = new Int16Array(n);
  let luettu = AINEISTON_OTSIKKO;
  for (let y = 0; y < korkeus; y += 1) {
    let edellinen = 0;
    for (let x = 0; x < leveys; x += 1) {
      edellinen += runko.readInt16LE(luettu);
      luettu += 2;
      z[y * leveys + x] = edellinen;
    }
  }
  if (!hiljaa) process.stderr.write(`ruudukko reposta: ${AINEISTON_POLKU}\n`);
  return { z, leveys, korkeus };
}

const VALIMUISTI = process.env.KORKEUSRUUDUKKO_VALIMUISTI
  || join(tmpdir(), 'matkakirja-korkeusruudukko');

const PALVELIN = 'https://coastwatch.pfeg.noaa.gov/erddap/griddap/etopo360';

/** Lähdetiedot yhtenä kappaleena, jotta jokainen käyttäjä voi kantaa ne mukanaan. */
export const LAHTEET = {
  aineisto: 'NOAA NGDC ETOPO1 Global Relief Model, Ice Surface, 1 kaariminuutti',
  lisenssi: 'Public domain (Yhdysvaltain liittovaltion viraston tuottama). '
    + 'ERDDAPin lisenssiteksti: "The data may be used and redistributed for free '
    + 'but is not intended for legal use, since it may contain inaccuracies."',
  osoite: PALVELIN,
  viite: 'Amante & Eakins 2009, NOAA NCEI, doi:10.7289/V5C8276M',
};

// ETOPO1:n ruudukko: 10801 x 21601, lat -90..90, lon 0..360.
const LAT_N = 10801;
const LON_N = 21601;

export const OLETUKSET = {
  /*
   * Lopullinen ruutukoko asteina. Ks. tiedoston alun perustelu.
   */
  ruutu: 0.05,
  /*
   * Näytteenottoväli latauksessa, kaariminuutteina.
   *
   * Kaksi eikä kolme, vaikka 0,05° ON kolme kaariminuuttia. Kolmella
   * näytteet osuisivat täsmälleen ruutujen keskipisteisiin, jolloin
   * jokainen ruutu saisi tasan yhden näytteen — se ei ole keskiarvo
   * vaan poiminta, ja poiminta valitsee sattumanvaraisesti joko
   * huipun tai rinteen. Varjo lasketaan naapurien erosta, joten
   * sattuma näkyisi siinä kohinana. Kahdella jokaiseen ruutuun osuu
   * 1-2 näytettä joka suunnasta ja tulos on aito keskiarvo.
   */
  nayte: 2,
  // riviä yhdessä latauspyynnössä
  kaista: 200,
};

// ---------------------------------------------------------------- valitsimet

function valitsin(nimi, oletus) {
  const i = process.argv.indexOf('--' + nimi);
  if (i < 0) return oletus;
  const arvo = process.argv[i + 1];
  return arvo === undefined || arvo.startsWith('--') ? true : Number(arvo);
}

// -------------------------------------------------------------- netCDF-luku

/*
 * NetCDF-3 classic on niin suoraviivainen muoto, että sen lukeminen on
 * halvempaa kuin riippuvuuden ottaminen. Peli ei ota riippuvuuksia,
 * eikä sen työkalupakkikaan ota niitä ilman syytä.
 *
 * Lainattu hae-topografia.mjs:stä sellaisenaan.
 *
 * VIETY ULOS 1.9.2026: tools/tee-korkeuspalat.mjs lukee ERDDAPin
 * vastaukset samalla lukijalla. Kolmas kopio samasta muodosta olisi
 * ollut kolmas paikka, josta netCDF-3:n tavujärjestys voi mennä
 * väärin — ja se virhe ei näy muuna kuin outona maastona.
 */
export function lueNetCDF(buf) {
  if (buf.toString('latin1', 0, 3) !== 'CDF') throw new Error('ei ole netCDF-3-tiedosto');
  const versio = buf[3];
  let p = 4;
  const u32 = () => { const v = buf.readUInt32BE(p); p += 4; return v; };
  const i32 = () => { const v = buf.readInt32BE(p); p += 4; return v; };
  const i64 = () => { const v = Number(buf.readBigInt64BE(p)); p += 8; return v; };
  const nimi = () => {
    const n = u32();
    const s = buf.toString('utf8', p, p + n);
    p += n + ((4 - n % 4) % 4);
    return s;
  };
  const KOKO = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 4, 6: 8 };
  const arvot = (tyyppi, n) => {
    const alku = p;
    const tavut = KOKO[tyyppi] * n;
    p += tavut + ((4 - tavut % 4) % 4);
    if (tyyppi === 2) return buf.toString('utf8', alku, alku + n);
    const ulos = tyyppi === 3 ? new Int16Array(n) : new Float64Array(n);
    for (let i = 0; i < n; i++) {
      const o = alku + i * KOKO[tyyppi];
      ulos[i] = tyyppi === 1 ? buf.readInt8(o)
        : tyyppi === 3 ? buf.readInt16BE(o)
          : tyyppi === 4 ? buf.readInt32BE(o)
            : tyyppi === 5 ? buf.readFloatBE(o) : buf.readDoubleBE(o);
    }
    return ulos;
  };
  u32(); // numrecs
  const lista = (tunnus, lue) => {
    const tag = u32();
    const n = u32();
    if (tag === 0) return [];
    if (tag !== tunnus) throw new Error('odottamaton netCDF-lista ' + tag);
    const ulos = [];
    for (let i = 0; i < n; i++) ulos.push(lue());
    return ulos;
  };
  const dimit = lista(10, () => ({ nimi: nimi(), pituus: u32() }));
  const attrit = () => lista(12, () => { const k = nimi(); const t = i32(); const n = u32(); return { k, v: arvot(t, n) }; });
  attrit();
  const muuttujat = lista(11, () => {
    const nm = nimi();
    const nd = u32();
    const dimid = [];
    for (let i = 0; i < nd; i++) dimid.push(u32());
    attrit();
    const tyyppi = i32();
    u32(); // vsize
    const alku = versio === 2 ? i64() : u32();
    return { nimi: nm, dimid, tyyppi, alku };
  });
  const ulos = {};
  for (const m of muuttujat) {
    const muoto = m.dimid.map(d => dimit[d].pituus);
    const n = muoto.reduce((a, b) => a * b, 1);
    p = m.alku;
    ulos[m.nimi] = { muoto, data: arvot(m.tyyppi, n) };
  }
  return ulos;
}

// ------------------------------------------------------------------ lataus

async function hae(url, kohde) {
  if (existsSync(kohde) && statSync(kohde).size > 0) return readFileSync(kohde);
  /*
   * Verkkoon mennään vasta tässä. Jos työkalu on tuotu toisesta
   * työkalusta, uudelleenkäynnistystä ei ole tehty eikä Node osaa
   * käyttää välityspalvelinta — sanotaan se ääneen sen sijaan että
   * annettaisiin neljä yritystä epäonnistua salaperäisesti.
   */
  if (!process.env.NODE_USE_ENV_PROXY && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
    throw new Error('välityspalvelin on asetettu mutta NODE_USE_ENV_PROXY ei — '
      + 'aja kutsuva työkalu komennolla NODE_USE_ENV_PROXY=1 node ...');
  }
  for (let yritys = 1; yritys <= 4; yritys++) {
    try {
      const v = await fetch(url, { signal: AbortSignal.timeout(300000) });
      if (!v.ok) throw new Error('HTTP ' + v.status + ' ' + (await v.text()).slice(0, 200));
      const buf = Buffer.from(await v.arrayBuffer());
      writeFileSync(kohde, buf);
      return buf;
    } catch (e) {
      if (yritys === 4) throw e;
      process.stderr.write(`  uusiksi (${yritys}): ${e.message}\n`);
      await new Promise(r => setTimeout(r, 3000 * yritys));
    }
  }
  return null;
}

// ------------------------------------------------------------- välimuisti

/*
 * Koottu ruudukko talteen omana tiedostonaan.
 *
 * Raa'at netCDF-kaistat ovat jo levyllä, mutta niiden purkaminen ja
 * keskiarvoistaminen kestää minuutteja: kaksi kaariminuuttia on 58
 * miljoonaa lukua. Koottu ruudukko on kymmenesosa siitä ja latautuu
 * sekunnissa, joten varjostusta voi säätää ilman että jokainen kokeilu
 * maksaa uuden purun.
 *
 * Tiedoston alussa on otsikko eikä pelkkää dataa, koska keskeytynyt
 * kirjoitus jättäisi muuten vajaan tiedoston, joka näyttää kelvolliselta
 * ja antaa hiljaa väärän maailman. Otsikko kertoo mitat, ja niistä
 * lasketun pituuden on täsmättävä tavulleen.
 */
const TUNNUS = 'MKR1';
const OTSIKKO = 4 + 4 + 4 + 8; // tunnus, leveys, korkeus, ruutu

function lueVarasto(polku, ruutu, leveys, korkeus) {
  if (!existsSync(polku)) return null;
  const buf = readFileSync(polku);
  if (buf.length < OTSIKKO) return null;
  if (buf.toString('latin1', 0, 4) !== TUNNUS) return null;
  if (buf.readUInt32LE(4) !== leveys || buf.readUInt32LE(8) !== korkeus) return null;
  if (buf.readDoubleLE(12) !== ruutu) return null;
  if (buf.length !== OTSIKKO + leveys * korkeus * 4) return null;
  // Kopio eikä näkymä: readFileSync ei takaa 4:llä jaollista alkukohtaa.
  const z = new Float32Array(leveys * korkeus);
  for (let i = 0; i < z.length; i++) z[i] = buf.readFloatLE(OTSIKKO + i * 4);
  return z;
}

function kirjoitaVarasto(polku, z, ruutu, leveys, korkeus) {
  const buf = Buffer.allocUnsafe(OTSIKKO + z.length * 4);
  buf.write(TUNNUS, 0, 'latin1');
  buf.writeUInt32LE(leveys, 4);
  buf.writeUInt32LE(korkeus, 8);
  buf.writeDoubleLE(ruutu, 12);
  for (let i = 0; i < z.length; i++) buf.writeFloatLE(z[i], OTSIKKO + i * 4);
  writeFileSync(polku, buf);
}

// ------------------------------------------------------------------ haku

/**
 * Koko maailman korkeudet yhtenä ruudukkona.
 *
 * Palauttaa `{ z, leveys, korkeus, ruutu, lahteet }`, jossa z on
 * TypedArray pituudeltaan leveys*korkeus ja rivi y alkaa kohdasta
 * y*leveys. Metrejä merenpinnasta; meri on negatiivinen.
 *
 * TYYPPI VAIHTELEE LÄHTEEN MUKAAN eikä sillä ole väliä: repon
 * aineistosta se on Int16Array (metrin tarkkuus, puolet muistista) ja
 * verkosta kootusta välimuistista Float32Array. Kumpaakin luetaan
 * pelkkinä numeroina, ja ainoa kuluttaja (tools/fokuskartta/maailma.mjs)
 * pyöristää arvot joka tapauksessa Int16:een.
 *
 * SUUNNAT: y kasvaa POHJOISEEN (y = 0 on lat -90) ja x kasvaa ITÄÄN
 * (x = 0 on lon -180). Tämä on ruudukon tärkein sopimus — varjostus
 * lasketaan suunnista, ja väärin päin luettu ruudukko kääntää vuoret
 * laaksoiksi. Sama järjestys kuin sisartyökaluilla.
 *
 * SAUMA: sarakkeet 0 ja leveys-1 ovat SAMA meridiaani kahdesti, koska
 * sekä -180 että +180 on otettu mukaan. Kartta kiertää ympäri, joten
 * naapuria haettaessa sarakkeen 0 länsinaapuri on leveys-2 eikä
 * leveys-1 — muuten naapuri on ruutu itse.
 */
export async function haeKorkeusruudukko(asetukset = {}) {
  const { ruutu, nayte, kaista } = { ...OLETUKSET, ...asetukset };
  const askel = nayte;
  const leveys = Math.round(360 / ruutu) + 1; // -180 .. +180, molemmat mukana
  const korkeus = Math.round(180 / ruutu) + 1; // -90 .. +90
  const hiljaa = asetukset.hiljaa ?? false;
  const kerro = (t) => { if (!hiljaa) process.stderr.write(t); };

  /*
   * REPON AINEISTO ENSIN. Se on sama ruudukko, joka ennen koottiin
   * verkosta — ei harvennettu uudelleen vaan luettu sellaisenaan.
   */
  const reposta = lueRepostaAineisto(ruutu, hiljaa);
  if (reposta && reposta.leveys === leveys && reposta.korkeus === korkeus) {
    return {
      z: reposta.z, leveys, korkeus, ruutu, lahteet: LAHTEET,
    };
  }

  mkdirSync(VALIMUISTI, { recursive: true });
  const varasto = join(VALIMUISTI, `ruudukko-${ruutu}-${askel}.bin`);
  const valmis = lueVarasto(varasto, ruutu, leveys, korkeus);
  if (valmis) {
    kerro(`ruudukko välimuistista: ${varasto}\n`);
    return { z: valmis, leveys, korkeus, ruutu, lahteet: LAHTEET };
  }

  const latIndeksit = [];
  for (let i = 0; i < LAT_N; i += askel) latIndeksit.push(i);
  const lonIndeksit = [];
  for (let i = 0; i < LON_N; i += askel) lonIndeksit.push(i);

  // Sarakkeen paikka ruudukossa ei muutu kaistojen välillä, joten se
  // lasketaan kerran eikä tuhansia kertoja.
  const xOf = new Int32Array(lonIndeksit.length);
  for (let c = 0; c < lonIndeksit.length; c++) {
    const raaka = lonIndeksit[c] / 60;
    const lon = raaka > 180 ? raaka - 360 : raaka;
    xOf[c] = Math.min(leveys - 1, Math.max(0, Math.round((lon + 180) / ruutu)));
  }

  /*
   * Kaista puretaan ruudukkoon heti eikä kerätä muistiin: kahden
   * kaariminuutin välein poimittu maailma on 5401 x 10801 lukua, ja
   * kokonaisena se olisi moninkertainen valmiiseen ruudukkoon nähden.
   * Iso taulukko ei ole missään vaiheessa kokonaan muistissa.
   */
  const summa = new Float64Array(leveys * korkeus);
  const maara = new Int32Array(leveys * korkeus);

  for (let a = 0; a < latIndeksit.length; a += kaista) {
    const b = Math.min(a + kaista - 1, latIndeksit.length - 1);
    const kysely = `altitude[${latIndeksit[a]}:${askel}:${latIndeksit[b]}][0:${askel}:${lonIndeksit[lonIndeksit.length - 1]}]`;
    const url = `${PALVELIN}.nc?${encodeURIComponent(kysely)}`;
    const tiedosto = join(VALIMUISTI, `etopo1-${askel}-${a}.nc`);
    kerro(`lataan rivit ${a}..${b} / ${latIndeksit.length}\n`);
    const nc = lueNetCDF(await hae(url, tiedosto));
    const { muoto, data } = nc.altitude;
    if (muoto[1] !== lonIndeksit.length) throw new Error('odottamaton leveys ' + muoto[1]);
    for (let r = 0; r < muoto[0]; r++) {
      const lat = latIndeksit[a + r] / 60 - 90;
      const y = Math.min(korkeus - 1, Math.max(0, Math.round((lat + 90) / ruutu)));
      const rivi = y * leveys;
      const alku = r * muoto[1];
      for (let c = 0; c < muoto[1]; c++) {
        const arvo = data[alku + c];
        const i = rivi + xOf[c];
        summa[i] += arvo;
        maara[i] += 1;
        // 0 ja 360 osuvat samaan meridiaaniin: kirjataan molempiin reunoihin
        if (xOf[c] === 0) { summa[rivi + leveys - 1] += arvo; maara[rivi + leveys - 1] += 1; }
        else if (xOf[c] === leveys - 1) { summa[rivi] += arvo; maara[rivi] += 1; }
      }
    }
  }

  const z = new Float32Array(leveys * korkeus);
  let tyhjia = 0;
  for (let i = 0; i < z.length; i++) {
    if (maara[i]) z[i] = summa[i] / maara[i];
    else { z[i] = 0; tyhjia++; }
  }
  /*
   * Tyhjä ruutu tarkoittaisi, että näytteenottoväli on harvempi kuin
   * ruudukko ja osa maailmasta on keksittyä. Se pysäytetään tähän:
   * väärä maasto on pahempi kuin puuttuva työkalu.
   */
  if (tyhjia) throw new Error(`${tyhjia} ruutua jäi ilman näytettä — nayte ${askel} on liian harva ruudulle ${ruutu}°`);

  kirjoitaVarasto(varasto, z, ruutu, leveys, korkeus);
  kerro(`ruudukko koottu ja talletettu: ${varasto}\n`);
  return { z, leveys, korkeus, ruutu, lahteet: LAHTEET };
}

/** Ruudun keskipisteen leveysaste. y = 0 on etelänapa. */
export const latRivista = (y, ruutu) => -90 + y * ruutu;

/** Ruudun keskipisteen pituusaste. x = 0 on -180. */
export const lonSarakkeesta = (x, ruutu) => -180 + x * ruutu;

// ------------------------------------------------------------------- ajo

async function main() {
  const asetukset = {
    ruutu: valitsin('ruutu', OLETUKSET.ruutu),
    nayte: valitsin('nayte', OLETUKSET.nayte),
    kaista: valitsin('kaista', OLETUKSET.kaista),
  };
  process.stderr.write(`aineisto: ${LAHTEET.aineisto}\nlisenssi: ${LAHTEET.lisenssi}\n\n`);
  const t0 = Date.now();
  const g = await haeKorkeusruudukko(asetukset);
  const sekuntia = (Date.now() - t0) / 1000;

  let matalin = Infinity;
  let korkein = -Infinity;
  let merta = 0;
  for (let i = 0; i < g.z.length; i++) {
    if (g.z[i] < matalin) matalin = g.z[i];
    if (g.z[i] > korkein) korkein = g.z[i];
    if (g.z[i] < 0) merta++;
  }
  const megatavua = (g.z.length * 4) / 1024 / 1024;
  process.stderr.write(`\nruudukko  ${g.leveys} x ${g.korkeus} (${g.ruutu}°)\n`);
  process.stderr.write(`pisteitä  ${g.z.length.toLocaleString('fi-FI')}\n`);
  process.stderr.write(`muisti    ${megatavua.toFixed(1)} Mt (Float32)\n`);
  process.stderr.write(`korkeus   ${Math.round(matalin)} .. ${Math.round(korkein)} m\n`);
  process.stderr.write(`merta     ${(merta / g.z.length * 100).toFixed(1)} %\n`);
  process.stderr.write(`aikaa     ${sekuntia.toFixed(1)} s\n`);
  process.stderr.write(`välimuisti ${VALIMUISTI} — ei kuulu repoon\n`);
}

if (AJETAAN_SUORAAN) {
  main().catch(e => { process.stderr.write('VIRHE: ' + (e.stack || e.message) + '\n'); process.exit(1); });
}
