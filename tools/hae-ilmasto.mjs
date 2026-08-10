/*
 * Köppen–Geiger-ilmastovyöhykkeet -> js/packs/linssi-ilmasto.js
 *
 *   NODE_USE_ENV_PROXY=1 node tools/hae-ilmasto.mjs [--kuiva] [valitsimet]
 *
 * Tuottaa lon/lat-monikulmioita yhdeksälle ilmastoryhmälle. Projisoinnista
 * ei välitetä lainkaan — ulos tulee pelkkää maantiedettä asteina, ja
 * piirtäjä hoitaa loput. Sama työnjako kuin korkeusvyöhykkeillä.
 *
 * --- miksi 30 luokasta tulee 9 ---
 *
 * Köppen–Geiger erottelee 30 luokkaa (Af, Am, Aw, BWh, BWk, ... EF).
 * Ero Cfa:n ja Cfb:n välillä on lämpimimmän kuukauden keskilämpötila,
 * ja se on ilmastotieteen kysymys, ei tämän pelin. Yhdeksän ryhmää on
 * se määrä, jonka pelaaja voi lukea kartalta ja muistaa: sademetsä,
 * savanni, aavikko, aro, välimerenilmasto, lauhkea, mannerilmasto,
 * tundra ja jää. Jokainen alkuperäisluokka on merkitty RYHMAT-taulukkoon,
 * joten karkeistuksen näkee suoraan koodista eikä sitä tarvitse arvata.
 *
 * Yhtään luokkaa ei jätetä ryhmittelemättä: 30 luokkaa menee yhdeksään
 * ryhmään ilman jäännöstä. Jos alkuperäisaineistoon joskus tulee uusi
 * luokka, tarkistus main():issa kaatuu eikä hiljaa pudota sitä pois.
 *
 * --- miten rasterista tulee monikulmio ---
 *
 * Reititys on sama kuin tools/hae-korkeusvyohykkeet.mjs:ssä, eli
 * karkeuta -> sumenna -> marching squares -> RDP -> pudota pienet.
 * Geometriaosat on kopioitu tänne, ei tuotu: hakutyökalut ajavat main():n
 * heti tuonnissa, joten import lataisi ETOPO1:n turhaan. Sama ratkaisu
 * kuin tools/hae-topografia.mjs:ssä.
 *
 * Kopio ei ole tavulleen sama: marching squaresin satulatapauksesta 5 on
 * korjattu suuntavirhe (ks. aariviivat), ja liitaRenkaiksi kaataa ajon
 * avoimeen ketjuun sen sijaan että sulkisi sen väkisin. Molemmat ovat
 * korjauksia myös alkuperäisiin, mutta niiden aineistot on jo tehty
 * eikä tämän työn kuulu tehdä niitä uusiksi.
 *
 * Kaksi kohtaa on pakko tehdä toisin, koska ilmasto on LUOKKA eikä luku:
 *
 *   1. Karkeutus ei voi keskiarvoistaa. "Aavikon ja tundran keskiarvo"
 *      ei tarkoita mitään. Ruutu saa siksi eniten ääniä saaneen luokan,
 *      ja vasta siitä tehdään jokaiselle ryhmälle oma 0/1-kenttä.
 *
 *   2. Sumennus laskee osuuden vain MAARUUDUISTA. Jos meri laskettaisiin
 *      mukaan nollana, jokainen ranta vetäytyisi puoli ruutua sisämaahan
 *      ja kartalle jäisi valkoinen reunus rannikoiden ympäri. Kun meri
 *      jätetään nimittäjästä pois, rannikkoruudun arvo on 1 ja meren 0,
 *      joten ääriviiva osuu täsmälleen niiden väliin eli rannalle.
 *
 * Kynnys on kaikilla ryhmillä puolet (ks. TASO). Naapuriryhmien rajalla
 * molempien kentät ovat siinä kohdassa yhtä suuret, joten vyöhykkeet
 * asettuvat vieretysten — toisin kuin korkeusvyöhykkeet, jotka ovat
 * sisäkkäisiä.
 *
 * --- koko ---
 *
 * 300 kilotavun katto ei jousta. --toleranssi, --vahin-ala ja
 * --enin-renkaat joustavat, ja main() kiristää niitä kunnes katto alittuu.
 * Yhtäkään ryhmää ei saa pudottaa pois: kartta, jolta puuttuu aro, valehtelee.
 *
 * Aineisto: Beck ym. 2018, Köppen–Geiger nykyilmasto (1980–2016), CC BY 4.0.
 *
 * Verkko: Noden fetch ei lue HTTPS_PROXYa ilman NODE_USE_ENV_PROXYa,
 * ks. tools/hae-radiot.mjs. Alla oleva lohko käynnistää itsensä uudelleen,
 * jos muuttuja puuttuu.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inflateRawSync } from 'node:zlib';

if (!process.env.NODE_USE_ENV_PROXY && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const ajo = spawnSync(process.execPath, [fileURLToPath(import.meta.url), ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
  });
  process.exit(ajo.status ?? 1);
}

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
// Rasteri on satoja kilotavuja eikä kuulu repoon. ILMASTO_VALIMUISTI
// osoittaa muualle, jos haluaa säilyttää sen ajojen välillä.
const VALIMUISTI = process.env.ILMASTO_VALIMUISTI || join(tmpdir(), 'matkakirja-ilmasto');
const KOHDE = join(JUURI, 'js', 'packs', 'linssi-ilmasto.js');

const PAKETTI = 'https://ndownloader.figshare.com/files/12407516';
const TIETUE = 'https://doi.org/10.6084/m9.figshare.6396959';
const AINEISTO = 'Beck ym. 2018: Köppen–Geiger-ilmastoluokitus, nykyilmasto 1980–2016, '
  + '0,083° (~10 km) rasteri (Beck_KG_V1_present_0p083.tif)';
const LISENSSI = 'CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)';

// Zipin sisältä tarvitaan vain nämä kaksi. Loput 12 tiedostoa ovat
// tulevaisuusskenaarioita ja luottamuskarttoja, joita peli ei käytä.
const RASTERI = 'Beck_KG_V1_present_0p083.tif';
const SELITE = 'legend.txt';

/*
 * Köppen–Geigerin 30 luokkaa yhdeksänä ryhmänä.
 *
 * luokat-numerot ovat aineiston omat arvot (legend.txt, 1..30). Ne
 * tarkistetaan ajossa selitetiedostoa vasten, joten numeroiden ja
 * lyhenteiden vastaavuus ei jää muistin varaan.
 *
 * Värit ovat EHDOTUS. Ne on valittu pelin sepiapaperille (#f6e7c6…#d2b47e):
 * kylläisyys on otettu pois, jotta yhdeksän täyttöä erottuvat toisistaan
 * mutta eivät kirkastu paperin päältä muovimaisiksi. Köppenin omat värit
 * (sininen sademetsä, punainen aavikko, keltainen välimerenilmasto)
 * eivät sovi: keltainen katoaa paperiin kokonaan.
 */
const RYHMAT = [
  {
    avain: 'sademetsa',
    nimi: 'Sademetsä',
    lyhenteet: ['Af', 'Am'],
    luokat: [1, 2],
    vari: '#3f6b45',
    selitys: 'Kuuma ympäri vuoden ja sadetta lähes joka kuukausi: kylmimmässäkin '
      + 'kuussa on yli 18 astetta. Täällä kasvavat maailman tiheimmät metsät.',
  },
  {
    avain: 'savanni',
    nimi: 'Savanni',
    lyhenteet: ['Aw'],
    luokat: [3],
    vari: '#b0913f',
    selitys: 'Yhtä kuuma kuin sademetsässä, mutta vuosi jakautuu sadekauteen ja '
      + 'pitkään kuivaan kauteen. Maisemassa on korkeaa ruohoa ja puita harvassa.',
  },
  {
    avain: 'aavikko',
    nimi: 'Aavikko',
    lyhenteet: ['BWh', 'BWk'],
    luokat: [4, 5],
    vari: '#c26b39',
    selitys: 'Haihdunta vie vuodessa moninkertaisesti enemmän vettä kuin sadetta tulee. '
      + 'Aavikko voi olla polttava tai kylmä — Sahara ja Gobi ovat samaa luokkaa.',
  },
  {
    avain: 'aro',
    nimi: 'Aro',
    lyhenteet: ['BSh', 'BSk'],
    luokat: [6, 7],
    vari: '#d9a95c',
    selitys: 'Puolikuiva vyöhyke aavikon reunalla. Sadetta riittää ruoholle mutta '
      + 'ei metsälle, joten maisema on avointa laidunmaata.',
  },
  {
    avain: 'valimerenilmasto',
    nimi: 'Välimerenilmasto',
    lyhenteet: ['Csa', 'Csb', 'Csc'],
    luokat: [8, 9, 10],
    vari: '#9d5f6b',
    selitys: 'Talvet leutoja ja sateisia, kesät kuumia ja kuivia. Sama sää toistuu '
      + 'Kaliforniassa, Keski-Chilessä, Etelä-Afrikan kärjessä ja Lounais-Australiassa.',
  },
  {
    avain: 'lauhkea',
    nimi: 'Lauhkea',
    lyhenteet: ['Cwa', 'Cwb', 'Cwc', 'Cfa', 'Cfb', 'Cfc'],
    luokat: [11, 12, 13, 14, 15, 16],
    vari: '#7fa055',
    selitys: 'Talvi jää leudoksi eikä pysyvää lunta tule, ja sadetta saadaan ympäri '
      + 'vuoden tai kesäisin. Suuri osa maailman viljelysmaasta on tässä vyöhykkeessä.',
  },
  {
    avain: 'mannerilmasto',
    nimi: 'Mannerilmasto',
    lyhenteet: ['Dsa', 'Dsb', 'Dsc', 'Dsd', 'Dwa', 'Dwb', 'Dwc', 'Dwd', 'Dfa', 'Dfb', 'Dfc', 'Dfd'],
    luokat: [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
    vari: '#4b7f8a',
    selitys: 'Talvi menee pakkaselle ja kesä voi silti olla lämmin: meri ei ole '
      + 'tasaamassa lämpötilaa. Suomi, suurin osa Venäjää ja Kanadaa kuuluvat tähän.',
  },
  {
    avain: 'tundra',
    nimi: 'Tundra',
    lyhenteet: ['ET'],
    luokat: [29],
    vari: '#8fa1b0',
    selitys: 'Lämpimin kuukausi jää nollan ja kymmenen asteen väliin, joten puu ei '
      + 'enää kasva. Napaseutujen lisäksi tundraa on korkealla vuoristossa.',
  },
  {
    avain: 'jaa',
    nimi: 'Jää',
    lyhenteet: ['EF'],
    luokat: [30],
    vari: '#dfe8ec',
    selitys: 'Yksikään kuukausi ei nouse nollan yläpuolelle, joten lumi ei sula '
      + 'koskaan kokonaan. Käytännössä tämä on Antarktis ja Grönlannin sisäosa.',
  },
];

// ---------------------------------------------------------------- valitsimet

function valitsin(nimi, oletus) {
  const i = process.argv.indexOf('--' + nimi);
  if (i < 0) return oletus;
  const arvo = process.argv[i + 1];
  return arvo === undefined || arvo.startsWith('--') ? true : Number(arvo);
}

const ASETUKSET = {
  kuiva: process.argv.includes('--kuiva'),
  // Lopullinen ruutukoko asteina. Alkuperäinen ruutu on 1/12° = 0,083°,
  // joten 0,2° kerää jokaiseen solmuun 2–3 alkuperäistä ruutua joka
  // suuntaan. Tätä pienemmällä osa solmuista jäisi ilman ääniä.
  ruutu: valitsin('ruutu', 0.2),
  // Montako 3x3-sumennusta. Yksi riittää. Nollalla ruudukko on rakeinen
  // (tundra hajoaa 1205 raakarenkaaseen, aro 831:een, eikä 300 kt riitä
  // alkuunkaan), kahdella pienet mutta todelliset laikut alkavat kadota
  // (tundra 472 -> 415, aro 281 -> 218 rengasta).
  sumennus: valitsin('sumennus', 1),
  // Ramer–Douglas–Peucker, asteina. 0,1° on luonnollinen pohja: sen alle
  // menevä tarkkuus katoaa joka tapauksessa koordinaattien pyöristyksessä.
  toleranssi: valitsin('toleranssi', 0.1),
  // Pienin säilytettävä rengas neliökilometreinä. 5000 km² on noin
  // 70 x 70 km — sitä pienempi laikku on kartalla täplä, ei muoto.
  vahinAla: valitsin('vahin-ala', 5000),
  // Enintään näin monta rengasta ryhmää kohti, suurimmat ensin.
  eninRenkaat: valitsin('enin-renkaat', 140),
  // Näin monta suurinta säilyy aina, vaikka ne alittaisivat alarajan —
  // muuten pieninä läiskinä esiintyvä ryhmä katoaisi kartalta kokonaan.
  vahinMaara: valitsin('vahin-maara', 6),
  katto: valitsin('katto', 300 * 1024),
  // koordinaattien desimaalit. 1 = ~11 km päiväntasaajalla
  tarkkuus: valitsin('tarkkuus', 1),
};

// -------------------------------------------------------------------- lataus

/*
 * Zip-paketti on 71 megatavua, mutta tarvittavat kaksi tiedostoa ovat
 * yhteensä 207 kilotavua. Siksi paketista luetaan Range-pyynnöillä vain
 * hakemisto ja ne kaksi jäsentä — koko paketin lataaminen olisi 340-
 * kertainen turha siirto joka ajolla.
 *
 * Jos palvelin ei jostain syystä osaa Rangea (vastaa 200 eikä 206),
 * pyydetty pala leikataan kokonaisesta vastauksesta. Silloin ajo on hidas
 * mutta tulos on sama.
 */
async function haePala(alku, loppu, kohde) {
  if (kohde && existsSync(kohde) && statSync(kohde).size > 0) return readFileSync(kohde);
  const otsake = loppu === null ? `bytes=-${alku}` : `bytes=${alku}-${loppu}`;
  for (let yritys = 1; yritys <= 4; yritys++) {
    try {
      const v = await fetch(PAKETTI, {
        headers: { Range: otsake },
        signal: AbortSignal.timeout(300000),
      });
      if (!v.ok) throw new Error('HTTP ' + v.status);
      let buf = Buffer.from(await v.arrayBuffer());
      if (v.status !== 206) {
        process.stderr.write('  palvelin ei tukenut Rangea — leikataan itse\n');
        buf = loppu === null ? buf.subarray(buf.length - alku) : buf.subarray(alku, loppu + 1);
      }
      if (kohde) writeFileSync(kohde, buf);
      return buf;
    } catch (e) {
      if (yritys === 4) throw e;
      process.stderr.write(`  uusiksi (${yritys}): ${e.message}\n`);
      await new Promise((r) => setTimeout(r, 3000 * yritys));
    }
  }
}

/*
 * Zipin keskushakemisto: nimi -> paikallisen otsakkeen sijainti ja koko.
 *
 * Hakemiston sijainti on paketin alusta laskettu, mutta meillä on vain
 * häntä. Onneksi loppuotsake seuraa AINA heti keskushakemistoa, joten
 * hännän alkukohta saadaan omista luvuista: sijainti + koko on
 * loppuotsakkeen absoluuttinen paikka, ja i on sen paikka hännässä.
 * Paketin kokoa ei siis tarvitse kysellä erikseen — kysely olisi vielä
 * yksi verkkopyyntö, joka voi epäonnistua, ja välimuistista ajettaessa
 * sitä ei olisi lainkaan.
 */
function lueHakemisto(hanta) {
  let i = hanta.length - 22;
  for (; i >= 0; i--) if (hanta.readUInt32LE(i) === 0x06054b50) break;
  if (i < 0) throw new Error('zipin loppuotsaketta ei löytynyt');
  const maara = hanta.readUInt16LE(i + 10);
  const hakemistoKoko = hanta.readUInt32LE(i + 12);
  const hannanAlku = hanta.readUInt32LE(i + 16) + hakemistoKoko - i;
  const alku = hanta.readUInt32LE(i + 16) - hannanAlku;
  if (alku < 0) throw new Error('hakemisto ei mahtunut haettuun häntään');
  const jasenet = new Map();
  let p = alku;
  for (let k = 0; k < maara; k++) {
    const nimiPit = hanta.readUInt16LE(p + 28);
    const lisaPit = hanta.readUInt16LE(p + 30);
    const kommPit = hanta.readUInt16LE(p + 32);
    jasenet.set(hanta.toString('utf8', p + 46, p + 46 + nimiPit), {
      pakattu: hanta.readUInt32LE(p + 20),
      paikallinen: hanta.readUInt32LE(p + 42),
    });
    p += 46 + nimiPit + lisaPit + kommPit;
  }
  return jasenet;
}

/* Yksi zip-jäsen puretuksi. Vain deflate ja pakkaamaton tunnetaan. */
function puraJasen(buf) {
  if (buf.readUInt32LE(0) !== 0x04034b50) throw new Error('ei zipin paikallista otsaketta');
  const menetelma = buf.readUInt16LE(8);
  const nimiPit = buf.readUInt16LE(26);
  const lisaPit = buf.readUInt16LE(28);
  const data = buf.subarray(30 + nimiPit + lisaPit);
  if (menetelma === 0) return data;
  if (menetelma === 8) return inflateRawSync(data);
  throw new Error('tuntematon zip-pakkaus ' + menetelma);
}

async function haeAineisto() {
  mkdirSync(VALIMUISTI, { recursive: true });
  // Paikallinen otsake on nimen mittainen; 512 tavun varmuusvara riittää
  // hyvin, koska nimet ovat kolmisenkymmentä merkkiä.
  const VARA = 512;
  process.stderr.write('luetaan zipin hakemisto\n');
  const HANTA = 70000;
  const hanta = await haePala(HANTA, null, join(VALIMUISTI, 'hanta.bin'));
  const jasenet = lueHakemisto(hanta);

  const lue = async (nimi) => {
    const j = jasenet.get(nimi);
    if (!j) throw new Error(`zipistä puuttuu ${nimi}`);
    process.stderr.write(`lataan ${nimi} (${Math.round(j.pakattu / 1024)} kt pakattuna)\n`);
    const raaka = await haePala(
      j.paikallinen,
      j.paikallinen + j.pakattu + VARA,
      join(VALIMUISTI, nimi.replace(/[^\w.-]/g, '_') + '.zpart'),
    );
    return puraJasen(raaka);
  };

  return { rasteri: await lue(RASTERI), selite: (await lue(SELITE)).toString('utf8') };
}

// ------------------------------------------------------------------- TIFF

/* PackBits-purku (TIFF-pakkaus 32773). Muoto on niin yksinkertainen,
 * ettei sitä kannata hakea riippuvuutena. */
function puraPackBits(sisaan, ulosPituus) {
  const ulos = Buffer.alloc(ulosPituus);
  let i = 0;
  let o = 0;
  while (i < sisaan.length && o < ulosPituus) {
    const n = sisaan.readInt8(i++);
    if (n >= 0) {
      const m = Math.min(n + 1, ulosPituus - o, sisaan.length - i);
      sisaan.copy(ulos, o, i, i + m);
      i += m;
      o += m;
    } else if (n !== -128) {
      const tavu = sisaan[i++];
      const m = Math.min(1 - n, ulosPituus - o);
      ulos.fill(tavu, o, o + m);
      o += m;
    }
  }
  return ulos;
}

/*
 * Ruutuihin jaettu 8-bittinen TIFF. Beckin rasteri on tehty Matlabin
 * Mapping Toolboxilla, joten kaikki pysyy näissä rajoissa: little-endian,
 * yksi näyte pikseliä kohti, paletti ja PackBits. Muut tapaukset
 * kaadetaan heti sen sijaan että arvattaisiin — väärä data on
 * opetuspelissä pahempi kuin puuttuva data.
 */
function lueTiff(b) {
  if (b.toString('latin1', 0, 2) !== 'II' || b.readUInt16LE(2) !== 42) {
    throw new Error('ei ole little-endian TIFF');
  }
  const tagit = new Map();
  const ifd = b.readUInt32LE(4);
  const n = b.readUInt16LE(ifd);
  const KOKO = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 12: 8 };
  for (let i = 0; i < n; i++) {
    const p = ifd + 2 + i * 12;
    const tag = b.readUInt16LE(p);
    const tyyppi = b.readUInt16LE(p + 2);
    const maara = b.readUInt32LE(p + 4);
    const tavut = (KOKO[tyyppi] || 1) * maara;
    const off = tavut <= 4 ? p + 8 : b.readUInt32LE(p + 8);
    const arvot = [];
    for (let k = 0; k < maara; k++) {
      const o = off + k * (KOKO[tyyppi] || 1);
      arvot.push(tyyppi === 3 ? b.readUInt16LE(o) : tyyppi === 12 ? b.readDoubleLE(o) : b.readUInt32LE(o));
    }
    tagit.set(tag, arvot);
  }
  const yksi = (tag) => (tagit.get(tag) || [])[0];
  const leveys = yksi(256);
  const korkeus = yksi(257);
  if (yksi(258) !== 8) throw new Error('odotettiin 8 bittiä näytettä kohti');
  if (yksi(259) !== 32773) throw new Error('odotettiin PackBits-pakkausta');
  if (yksi(277) !== 1) throw new Error('odotettiin yhtä näytettä pikseliä kohti');
  const ruutuL = yksi(322);
  const ruutuK = yksi(323);
  if (!ruutuL || !ruutuK) throw new Error('odotettiin ruutuihin jaettua TIFFiä');
  const sijainnit = tagit.get(324);
  const pituudet = tagit.get(325);

  const kuva = new Uint8Array(leveys * korkeus);
  const ruutujaX = Math.ceil(leveys / ruutuL);
  for (let t = 0; t < sijainnit.length; t++) {
    const pala = puraPackBits(b.subarray(sijainnit[t], sijainnit[t] + pituudet[t]), ruutuL * ruutuK);
    const rx = (t % ruutujaX) * ruutuL;
    const ry = Math.floor(t / ruutujaX) * ruutuK;
    for (let y = 0; y < ruutuK; y++) {
      const ky = ry + y;
      if (ky >= korkeus) break;
      for (let x = 0; x < ruutuL; x++) {
        const kx = rx + x;
        if (kx >= leveys) break;
        kuva[ky * leveys + kx] = pala[y * ruutuL + x];
      }
    }
  }

  // Sidonta maastoon: ModelPixelScale (33550) ja ModelTiepoint (33922).
  const skaala = tagit.get(33550);
  const sidonta = tagit.get(33922);
  if (!skaala || !sidonta) throw new Error('TIFFistä puuttuu sijaintitieto');
  return {
    kuva,
    leveys,
    korkeus,
    lonAskel: skaala[0],
    latAskel: skaala[1],
    lon0: sidonta[3],
    lat0: sidonta[4],
  };
}

// ------------------------------------------------------- ruudukon karkeutus

/*
 * Alinäytteistää ÄÄNESTÄMÄLLÄ: karkea ruutu saa sen ryhmän, jonka
 * alkuperäisiä ruutuja siihen osuu eniten. Keskiarvo olisi tässä
 * merkityksetön, koska luokkien numerot eivät ole suureita.
 *
 * Reunat: ruudukko ulottuu -180:sta +180:aan, eli sama meridiaani on
 * mukana kahdesti. Päivämääränrajan yli menevä muoto katkeaa siististi
 * kahdeksi renkaaksi sen sijaan että vetäisi viivan halki kartan.
 */
function karkeuta(tiff) {
  const ruutu = ASETUKSET.ruutu;
  const leveys = Math.round(360 / ruutu) + 1;
  const korkeus = Math.round(180 / ruutu) + 1;

  // luokka -> ryhmän indeksi (1-pohjainen; 0 = ei mitään eli meri)
  const ryhmaLuokasta = new Uint8Array(256);
  RYHMAT.forEach((r, i) => { for (const l of r.luokat) ryhmaLuokasta[l] = i + 1; });

  const aanet = new Uint16Array(leveys * korkeus * RYHMAT.length);
  for (let r = 0; r < tiff.korkeus; r++) {
    const lat = tiff.lat0 - (r + 0.5) * tiff.latAskel;
    const y = Math.min(korkeus - 1, Math.max(0, Math.round((lat + 90) / ruutu)));
    for (let c = 0; c < tiff.leveys; c++) {
      const ryhma = ryhmaLuokasta[tiff.kuva[r * tiff.leveys + c]];
      if (!ryhma) continue;
      let lon = tiff.lon0 + (c + 0.5) * tiff.lonAskel;
      if (lon > 180) lon -= 360;
      const x = Math.min(leveys - 1, Math.max(0, Math.round((lon + 180) / ruutu)));
      aanet[(y * leveys + x) * RYHMAT.length + ryhma - 1] += 1;
      // 0 ja 360 osuvat samaan meridiaaniin: kirjataan molempiin reunoihin
      if (x === 0) aanet[(y * leveys + leveys - 1) * RYHMAT.length + ryhma - 1] += 1;
      if (x === leveys - 1) aanet[(y * leveys) * RYHMAT.length + ryhma - 1] += 1;
    }
  }

  const luokitus = new Uint8Array(leveys * korkeus);
  for (let i = 0; i < luokitus.length; i++) {
    let paras = 0;
    let parasN = 0;
    for (let g = 0; g < RYHMAT.length; g++) {
      const a = aanet[i * RYHMAT.length + g];
      if (a > parasN) { parasN = a; paras = g + 1; }
    }
    luokitus[i] = paras;
  }
  return { luokitus, leveys, korkeus, ruutu };
}

/*
 * Yhden ryhmän 0/1-kenttä sumennettuna. Nimittäjässä ovat vain MAARUUDUT,
 * jolloin ääriviiva pysyy rannalla eikä vetäydy sisämaahan; meriruutu on
 * aina 0, joten kynnys 0,5 osuu juuri maan ja meren väliin.
 *
 * Pituusaste kiertää ympäri, joten sumennus ottaa naapurin kartan
 * toiselta laidalta. Jakso on leveys-1, koska ±180 on mukana kahdesti.
 */
function kentta(g, ryhma) {
  const { luokitus, leveys, korkeus } = g;
  const jakso = leveys - 1;
  let z = new Float32Array(leveys * korkeus);
  for (let i = 0; i < z.length; i++) z[i] = luokitus[i] === ryhma ? 1 : 0;

  for (let k = 0; k < ASETUKSET.sumennus; k++) {
    const uusi = new Float32Array(z.length);
    for (let y = 0; y < korkeus; y++) {
      for (let x = 0; x < leveys; x++) {
        if (!luokitus[y * leveys + x]) continue; // meri jää nollaksi
        let s = 0;
        let maita = 0;
        for (let dy = -1; dy <= 1; dy++) {
          const yy = y + dy;
          if (yy < 0 || yy >= korkeus) continue;
          for (let dx = -1; dx <= 1; dx++) {
            const xx = ((x + dx) % jakso + jakso) % jakso;
            if (!luokitus[yy * leveys + xx]) continue;
            s += z[yy * leveys + xx];
            maita += 1;
          }
        }
        uusi[y * leveys + x] = maita ? s / maita : 0;
      }
    }
    z = uusi;
  }
  return { z, leveys, korkeus, ruutu: g.ruutu };
}

// ------------------------------------------------------- marching squares

/*
 * Kynnys: puolet, hiuksenverran alle.
 *
 * Tasan 0,5 EI KELPAA, ja se maksoi yhden väärän kartan. Sumennettu arvo
 * on aina murtoluku p/q, jossa q on naapurimaaruutujen määrä 1..9, joten
 * tasan puolet osuu kohdalle jatkuvasti (4/8, 3/6, 2/4). Silloin
 * ääriviivan leikkauspiste laskeutuu tasan ruudukon solmuun, kaksi
 * naapuriruutua tuottaa saman pisteparin vastakkaisiin suuntiin, ja
 * liitaRenkaiksi sulkee niistä kahden janan valerenkaan. Oikea ääriviiva
 * katkeaa siihen. Pisimmät reunat kärsivät eniten: ensimmäisellä ajolla
 * Amazonas katosi kartalta kokonaan, koska sen ääriviiva osui 114
 * tällaiseen solmuun.
 *
 * 1e-6 on turvallinen väli: lähin muu mahdollinen arvo on yli 0,006
 * päässä puolikkaasta, ja float32:n tarkkuus siinä kohtaa on 6e-8.
 * Tasan puolikas jää nyt ryhmän SISÄÄN, jolloin kahden ryhmän raja menee
 * mieluummin hiuksenverran päällekkäin kuin jättää raon.
 */
const TASO = 0.5 - 1e-6;

/*
 * Perinteinen marching squares, sama kuin korkeusvyöhykkeillä. Ruudukko
 * kehystetään ensin selvästi kynnyksen alittavalla reunalla, jolloin
 * kaikki ääriviivat ovat suljettuja silmukoita eikä avoimia päitä
 * tarvitse käsitellä erikseen.
 *
 * Satulatapaukset (5 ja 10) ratkaistaan neljän kulman keskiarvolla, mikä
 * on tavanomainen ja tässä käytännössä yhdentekevä valinta: kapeat
 * solmut katoavat joka tapauksessa sumennuksessa.
 */
function aariviivat(g, taso) {
  const { leveys, korkeus, ruutu, z } = g;
  const L = leveys + 2;
  const K = korkeus + 2;
  const POHJA = -1;
  const kehys = new Float32Array(L * K).fill(POHJA);
  for (let y = 0; y < korkeus; y++) {
    for (let x = 0; x < leveys; x++) kehys[(y + 1) * L + (x + 1)] = z[y * leveys + x];
  }
  const lonOf = (gx) => -180 + (gx - 1) * ruutu;
  const latOf = (gy) => -90 + (gy - 1) * ruutu;

  const paloja = [];
  const lisaa = (a, b) => paloja.push([a, b]);

  for (let y = 0; y < K - 1; y++) {
    for (let x = 0; x < L - 1; x++) {
      const v0 = kehys[y * L + x];           // vasen ala
      const v1 = kehys[y * L + x + 1];       // oikea ala
      const v2 = kehys[(y + 1) * L + x + 1]; // oikea ylä
      const v3 = kehys[(y + 1) * L + x];     // vasen ylä
      let tapaus = 0;
      if (v0 >= taso) tapaus |= 1;
      if (v1 >= taso) tapaus |= 2;
      if (v2 >= taso) tapaus |= 4;
      if (v3 >= taso) tapaus |= 8;
      if (tapaus === 0 || tapaus === 15) continue;

      const sek = (a, b) => (taso - a) / (b - a);
      const ala = () => [lonOf(x + sek(v0, v1)), latOf(y)];
      const oikea = () => [lonOf(x + 1), latOf(y + sek(v1, v2))];
      const yla = () => [lonOf(x + sek(v3, v2)), latOf(y + 1)];
      const vasen = () => [lonOf(x), latOf(y + sek(v0, v3))];

      switch (tapaus) {
        case 1: lisaa(vasen(), ala()); break;
        case 2: lisaa(ala(), oikea()); break;
        case 3: lisaa(vasen(), oikea()); break;
        case 4: lisaa(oikea(), yla()); break;
        case 6: lisaa(ala(), yla()); break;
        case 7: lisaa(vasen(), yla()); break;
        case 8: lisaa(yla(), vasen()); break;
        case 9: lisaa(yla(), ala()); break;
        case 11: lisaa(yla(), oikea()); break;
        case 12: lisaa(oikea(), vasen()); break;
        case 13: lisaa(oikea(), ala()); break;
        case 14: lisaa(ala(), vasen()); break;
        /*
         * Satula: v0 ja v2 sisällä, v1 ja v3 ulkona. Keskiarvo ratkaisee,
         * kumpi pari on yhteydessä toisiinsa.
         *
         * HUOM. Tässä on korjaus tools/hae-korkeusvyohykkeet.mjs:n ja
         * tools/hae-topografia.mjs:n versioon nähden: siellä haarat ovat
         * ristissä ja toisen janan suunta on väärin päin. Suunta ei ole
         * makuasia, vaikka satulan ratkaisu onkin — kaikki muut tapaukset
         * kulkevat niin, että sisäpuoli jää oikealle, ja jos yksi jana
         * kulkee vastavirtaan, ketju katkeaa siihen. Silloin
         * liitaRenkaiksi sulkee avoimen ketjun väkisin ja renkaaseen
         * jää satojen kilometrien mittainen oikoviiva.
         *
         * Tämä ei ole teoriaa: koko Amazonas puuttui kartalta, koska sen
         * ääriviiva kulki Panaman kannaksella yhden tällaisen satulan läpi.
         */
        case 5: {
          const keski = (v0 + v1 + v2 + v3) / 4;
          // keskus sisällä: erotetaan ulkopuoliset kulmat v3 ja v1 omikseen
          if (keski >= taso) { lisaa(vasen(), yla()); lisaa(oikea(), ala()); }
          // keskus ulkona: v0 ja v2 jäävät erillisiksi saarekkeiksi
          else { lisaa(vasen(), ala()); lisaa(oikea(), yla()); }
          break;
        }
        // Sama satula peilikuvana: v1 ja v3 sisällä. Tämä haara on
        // alkuperäisessäkin oikein päin.
        case 10: {
          const keski = (v0 + v1 + v2 + v3) / 4;
          if (keski >= taso) { lisaa(ala(), vasen()); lisaa(yla(), oikea()); }
          else { lisaa(ala(), oikea()); lisaa(yla(), vasen()); }
          break;
        }
        default: break;
      }
    }
  }
  return liitaRenkaiksi(paloja);
}

/*
 * Liittää irralliset janat renkaiksi päätepisteiden perusteella. Naapuriruudut
 * laskevat saman reunan leikkauskohdan samasta kaavasta samoista luvuista,
 * joten päätepisteet ovat bitilleen samat eikä sietoa tarvita.
 *
 * Avointa ketjua EI suljeta väkisin vaan ajo kaatuu. Alkuperäinen versio
 * sulki sen hiljaa, ja tulos näytti renkaalta vaikka oli katkennut viiva
 * oikoviivalla paikattuna. Opetuspelissä puuttuva muoto on parempi kuin
 * keksitty muoto — ja kaatuminen kertoo, että ääriviivoissa on vika,
 * jonka voi korjata.
 */
function liitaRenkaiksi(paloja) {
  const avain = (p) => p[0].toFixed(9) + ',' + p[1].toFixed(9);
  const alkavat = new Map();
  for (let i = 0; i < paloja.length; i++) {
    const k = avain(paloja[i][0]);
    if (!alkavat.has(k)) alkavat.set(k, []);
    alkavat.get(k).push(i);
  }
  const kaytetty = new Uint8Array(paloja.length);
  const renkaat = [];
  for (let i = 0; i < paloja.length; i++) {
    if (kaytetty[i]) continue;
    kaytetty[i] = 1;
    const rengas = [paloja[i][0], paloja[i][1]];
    for (;;) {
      const k = avain(rengas[rengas.length - 1]);
      const ehdot = alkavat.get(k);
      if (!ehdot) break;
      const j = ehdot.find((n) => !kaytetty[n]);
      if (j === undefined) break;
      kaytetty[j] = 1;
      rengas.push(paloja[j][1]);
      if (avain(rengas[rengas.length - 1]) === avain(rengas[0])) break;
    }
    if (avain(rengas[rengas.length - 1]) !== avain(rengas[0])) {
      throw new Error(`ääriviiva jäi auki kohdassa ${rengas[rengas.length - 1]} `
        + `(alkoi kohdasta ${rengas[0]}, ${rengas.length} pistettä)`);
    }
    if (rengas.length >= 4) renkaat.push(rengas);
  }
  return renkaat;
}

// ------------------------------------------------------- yksinkertaistus

function rdp(pisteet, toleranssi) {
  if (pisteet.length < 3) return pisteet;
  const pidä = new Uint8Array(pisteet.length);
  pidä[0] = 1;
  pidä[pisteet.length - 1] = 1;
  const pino = [[0, pisteet.length - 1]];
  while (pino.length) {
    const [a, b] = pino.pop();
    if (b - a < 2) continue;
    const [x1, y1] = pisteet[a];
    const [x2, y2] = pisteet[b];
    const dx = x2 - x1;
    const dy = y2 - y1;
    const pituus = Math.hypot(dx, dy);
    let paras = -1;
    let parasI = -1;
    for (let i = a + 1; i < b; i++) {
      const [x, y] = pisteet[i];
      const d = pituus === 0
        ? Math.hypot(x - x1, y - y1)
        : Math.abs(dy * x - dx * y + x2 * y1 - y2 * x1) / pituus;
      if (d > paras) { paras = d; parasI = i; }
    }
    if (paras > toleranssi) {
      pidä[parasI] = 1;
      pino.push([a, parasI], [parasI, b]);
    }
  }
  return pisteet.filter((_, i) => pidä[i]);
}

/*
 * Suljettu rengas pitää yksinkertaistaa kahtena kaarena, muuten alku- ja
 * loppupisteen väli jää oikaisematta ja renkaisiin tulee tekopiikkejä.
 */
function yksinkertaistaRengas(rengas, toleranssi) {
  const p = rengas.slice(0, -1);
  if (p.length < 4) return null;
  // aloitetaan kaukaisimmasta pisteparista, jotta jako ei satu mutkaan
  let kaukaisin = 0;
  let paras = -1;
  for (let i = 1; i < p.length; i++) {
    const d = Math.hypot(p[i][0] - p[0][0], p[i][1] - p[0][1]);
    if (d > paras) { paras = d; kaukaisin = i; }
  }
  const a = rdp(p.slice(0, kaukaisin + 1), toleranssi);
  const b = rdp(p.slice(kaukaisin).concat([p[0]]), toleranssi);
  const ulos = a.concat(b.slice(1, -1));
  if (ulos.length < 3) return null;
  ulos.push(ulos[0]);
  return ulos;
}

// ------------------------------------------------------------------ ala

/* Renkaan ala neliökilometreinä. Pituusaste kutistuu navoille päin. */
function alaKm2(rengas) {
  let a = 0;
  let latSumma = 0;
  for (let i = 0; i < rengas.length - 1; i++) {
    const [x1, y1] = rengas[i];
    const [x2, y2] = rengas[i + 1];
    a += x1 * y2 - x2 * y1;
    latSumma += y1;
  }
  const keskiLat = latSumma / (rengas.length - 1);
  const KM = 111.32;
  return Math.abs(a / 2) * KM * KM * Math.cos(keskiLat * Math.PI / 180);
}

// --------------------------------------------------------------- pyöristys

function pyorista(rengas, desimaalit) {
  const kerroin = 10 ** desimaalit;
  const ulos = [];
  for (const [x, y] of rengas) {
    const p = [Math.round(x * kerroin) / kerroin, Math.round(y * kerroin) / kerroin];
    const edellinen = ulos[ulos.length - 1];
    if (edellinen && edellinen[0] === p[0] && edellinen[1] === p[1]) continue;
    ulos.push(p);
  }
  if (ulos.length < 4) return null;
  const eka = ulos[0];
  const vika = ulos[ulos.length - 1];
  if (eka[0] !== vika[0] || eka[1] !== vika[1]) ulos.push([eka[0], eka[1]]);
  return ulos.length >= 4 ? ulos : null;
}

// ------------------------------------------------------------------- ajo

/*
 * Marching squares ja renkaiksi liittäminen ovat ajon kalleimmat kohdat,
 * eivätkä ne riipu koon säätimistä. Ne ajetaan siis kerran, ja kokoa
 * haarukoiva silmukka työstää valmiita raakarenkaita. Esikarsinta on
 * aina lopullista karkeampi, joten se ei rajoita mitään kierrosta.
 */
const ESIKARSINTA = { esiToleranssi: 0.04, esiAla: 600, esiMaara: 40 };
function raakarenkaat(g) {
  const { esiToleranssi, esiAla, esiMaara } = ESIKARSINTA;
  const ulos = [];
  for (let i = 0; i < RYHMAT.length; i++) {
    const renkaat = aariviivat(kentta(g, i + 1), TASO);
    const ehdokkaat = [];
    for (const rengas of renkaat) {
      const yks = yksinkertaistaRengas(rengas, esiToleranssi);
      if (yks) ehdokkaat.push({ rengas: yks, ala: alaKm2(yks) });
    }
    ehdokkaat.sort((a, b) => b.ala - a.ala);
    const pidetyt = ehdokkaat.filter((e, k) => e.ala >= esiAla || k < esiMaara).map((e) => e.rengas);
    process.stderr.write(`  ${RYHMAT[i].avain.padEnd(17)} ${String(renkaat.length).padStart(5)} raakarengasta -> ${pidetyt.length} esikarsinnan jälkeen\n`);
    ulos.push({ renkaat: pidetyt, raakoja: renkaat.length });
  }
  return ulos;
}

/*
 * Yksi kierros koon haarukointia: yksinkertaista, karsi alaltaan pienet,
 * jätä jäljelle enintään eninRenkaat suurinta.
 *
 * Kattona on renkaiden MÄÄRÄ eikä pelkkä toleranssi, koska ryhmät ovat
 * rajusti erikokoisia. Jäätä on kaksi jättiläistä ja aroa sata riekaletta;
 * yhteinen toleranssi kiristyisi aron takia niin, että jään reunakin
 * menisi kulmikkaaksi. Rengaskatto puree vain siellä, missä on rakeisuutta —
 * ja pienen läiskän jättäminen pois on juuri se, mitä kartografiassa
 * yleistetään ensimmäisenä.
 */
function tuota(raaka, toleranssi, vahinAla, eninRenkaat) {
  return RYHMAT.map((ryhma, i) => {
    const kaikki = [];
    let pudotettu = 0;
    for (const rengas of raaka[i].renkaat) {
      const yks = yksinkertaistaRengas(rengas, toleranssi);
      if (!yks) { pudotettu++; continue; }
      const p = pyorista(yks, ASETUKSET.tarkkuus);
      if (!p) { pudotettu++; continue; }
      kaikki.push({ rengas: p, ala: alaKm2(p) });
    }
    // Suurimmat ensin: sekä alaraja että katto koskevat pienimpiä.
    kaikki.sort((a, b) => b.ala - a.ala);
    const kelpaavat = kaikki
      .filter((e, k) => e.ala >= vahinAla || k < ASETUKSET.vahinMaara)
      .slice(0, Math.max(eninRenkaat, ASETUKSET.vahinMaara));
    return {
      ...ryhma,
      renkaat: kelpaavat.map((e) => e.rengas),
      raakoja: raaka[i].raakoja,
      pudotettu: pudotettu + (kaikki.length - kelpaavat.length),
      pisteitä: kelpaavat.reduce((s, e) => s + e.rengas.length, 0),
      pieninAla: kelpaavat.length ? Math.round(kelpaavat[kelpaavat.length - 1].ala) : 0,
    };
  });
}

// -------------------------------------------------------------- kirjoitus

function kirjoita(ryhmat, toleranssi, vahinAla, budjetti) {
  const paiva = new Date().toISOString().slice(0, 10);
  const r = [];
  r.push('// Ilmastolinssi: Köppen–Geiger-ilmastovyöhykkeet asteina.');
  r.push('//');
  r.push('// TÄMÄ TIEDOSTO ON KONEEN KIRJOITTAMA. Älä muokkaa käsin:');
  r.push('//   NODE_USE_ENV_PROXY=1 node tools/hae-ilmasto.mjs');
  r.push('//');
  r.push('// Aineisto: Beck ym. 2018: Köppen–Geiger-ilmastoluokitus, nykyilmasto');
  r.push(`//           1980–2016, 0,083° (~10 km) rasteri (${RASTERI})`);
  r.push('// Viite:    Beck, H.E., N.E. Zimmermann, T.R. McVicar, N. Vergopolan, A. Berg,');
  r.push('//           E.F. Wood: Present and future Köppen-Geiger climate classification');
  r.push('//           maps at 1-km resolution, Scientific Data 5:180214,');
  r.push('//           doi:10.1038/sdata.2018.214 (2018).');
  r.push(`// Haettu:   ${paiva} osoitteesta`);
  r.push(`//           ${PAKETTI}`);
  r.push(`//           (figshare-tietue ${TIETUE},`);
  r.push('//           paketti Beck_KG_V1.zip)');
  r.push(`// Lisenssi: ${LISENSSI} — aineistoa saa`);
  r.push('//           käyttää, muokata ja levittää myös kaupallisesti, ehtona lähteen');
  r.push('//           ja tekijöiden mainitseminen. Yllä oleva viite on se maininta;');
  r.push('//           älä poista sitä.');
  r.push('//');
  r.push('// --- mitä tässä on ---');
  r.push('//');
  r.push('// Beckin rasterissa on 30 Köppen-luokkaa. Tässä ne on yhdistetty');
  r.push(`// ${ryhmat.length}:ään ryhmään, koska peli ei ole ilmastotieteen kurssi. Jokaisen`);
  r.push('// ryhmän kohdalla lukee, mitkä alkuperäisluokat siihen menivät, joten');
  r.push('// karkeistuksen näkee suoraan eikä sitä tarvitse arvata:');
  r.push('//');
  for (const g of ryhmat) {
    r.push(`//   ${g.avain.padEnd(17)} ${g.lyhenteet.join(' ')}`);
  }
  r.push('//');
  r.push('// Ryhmät ovat VIERETYSTEN, eivät sisäkkäisiä: jokainen kohta maailmaa');
  r.push('// kuuluu tasan yhteen ryhmään. Piirtojärjestyksellä ei siis ole väliä,');
  r.push('// toisin kuin korkeusvyöhykkeillä. Renkaat ovat suljettuja [lon, lat]');
  r.push('// -pareja: viimeinen piste on sama kuin ensimmäinen. Sisäkkäinen rengas');
  r.push('// on kolo (esim. vuoriston tundralaikku metsän keskellä), joten');
  r.push('// täyttösäännöksi sopii evenodd.');
  r.push('//');
  r.push('// Värit ovat EHDOTUS: pelin sepiapaperille vaimennettuja sävyjä, ei');
  r.push('// Köppenin omia. Köppenin keltainen välimerenilmasto katoaisi paperiin');
  r.push('// kokonaan ja punainen aavikko kirkastuisi muovimaiseksi.');
  r.push('//');
  r.push('// --- mitä tämä EI ole ---');
  r.push('//');
  r.push('// Tämä ei ole ilmastokartta vaan sen karkea varjo. Rajat ovat');
  r.push('// todellisuudessa liukuvia vaihettumisvyöhykkeitä, ja monikulmiot on');
  r.push('// tarkoituksella karkeutettu niin, että Sahara, Amazonas, Siperia ja');
  r.push('// Australian sisäosa näkyvät suurina muotoina eikä kartta mene tukkoon.');
  r.push('// Pienet laikut on pudotettu: vuoristossa ilmasto vaihtuu muutamassa');
  r.push('// kilometrissä, eikä sitä voi näyttää tällä tarkkuudella.');
  r.push('//');
  r.push('// Aineisto kuvaa jaksoa 1980–2016. Se on nykyilmasto, ei tulevaisuus:');
  r.push('// samassa paketissa on myös skenaario vuosille 2071–2100, jota tässä');
  r.push('// EI ole käytetty.');
  r.push('//');
  r.push('// Kynnykset joilla tämä ajo tehtiin:');
  r.push(`//   ruudukko          ${ASETUKSET.ruutu}° (~${Math.round(ASETUKSET.ruutu * 111)} km), enemmistöäänestyksellä`);
  r.push(`//   sumennus          ${ASETUKSET.sumennus} x 3x3, vain maaruuduista`);
  r.push(`//   RDP-toleranssi    ${Number(toleranssi.toFixed(3))}°`);
  r.push(`//   pienin rengas     ${Math.round(vahinAla)} km²`);
  r.push(`//   enintään          ${budjetti} rengasta ryhmää kohti, suurimmat ensin`);
  r.push(`//   poikkeus          jokaisen ryhmän ${ASETUKSET.vahinMaara} suurinta säilytetään aina, vaikka ne`);
  r.push('//                     alittaisivat rajan — muuten pieninä laikkuina esiintyvä');
  r.push('//                     ryhmä katoaisi kartalta kokonaan');
  r.push(`//   koordinaatit      ${ASETUKSET.tarkkuus} desimaalia (~11 km päiväntasaajalla)`);
  r.push('//');
  for (const g of ryhmat) {
    r.push(`//   ${g.avain.padEnd(17)} ${String(g.renkaat.length).padStart(3)} rengasta, ${String(g.pisteitä).padStart(5)} pistettä (raakoja ${g.raakoja}, pudotettu ${g.pudotettu}, pienin ${g.pieninAla} km²)`);
  }
  r.push('');
  r.push('export const ILMASTO = {');
  r.push('  ryhmat: [');
  for (const g of ryhmat) {
    r.push(`    // ${g.lyhenteet.join(' ')}`);
    r.push('    {');
    r.push(`      avain: '${g.avain}',`);
    r.push(`      nimi: ${JSON.stringify(g.nimi)},`);
    r.push(`      selitys: ${JSON.stringify(g.selitys)},`);
    r.push(`      vari: '${g.vari}',`);
    r.push('      renkaat: [');
    for (const rengas of g.renkaat) {
      r.push('        [' + rengas.map(([x, y]) => `[${x},${y}]`).join(',') + '],');
    }
    r.push('      ],');
    r.push('    },');
  }
  r.push('  ],');
  r.push('};');
  r.push('');
  return r.join('\n');
}

// ------------------------------------------------------------- tarkistukset

/* Selitetiedosto vasten: numeroiden ja lyhenteiden pitää täsmätä. */
function tarkistaSelite(teksti) {
  const luokat = new Map();
  for (const rivi of teksti.split('\n')) {
    const osuma = rivi.match(/^\s*(\d+):\s+(\S+)\s/);
    if (osuma) luokat.set(Number(osuma[1]), osuma[2]);
  }
  const kaytetyt = new Set();
  for (const g of RYHMAT) {
    if (g.luokat.length !== g.lyhenteet.length) {
      throw new Error(`ryhmässä ${g.avain} on eri määrä luokkia ja lyhenteitä`);
    }
    g.luokat.forEach((numero, i) => {
      if (luokat.get(numero) !== g.lyhenteet[i]) {
        throw new Error(`luokka ${numero} on aineistossa ${luokat.get(numero)}, ei ${g.lyhenteet[i]}`);
      }
      if (kaytetyt.has(numero)) throw new Error(`luokka ${numero} on kahdessa ryhmässä`);
      kaytetyt.add(numero);
    });
  }
  for (const numero of luokat.keys()) {
    if (!kaytetyt.has(numero)) throw new Error(`luokka ${numero} (${luokat.get(numero)}) ei kuulu mihinkään ryhmään`);
  }
  process.stderr.write(`selite tarkistettu: ${luokat.size} luokkaa ${RYHMAT.length}:ssä ryhmässä\n`);
}

/*
 * Kymmenen tunnettua paikkaa. Jos rasterin luku menisi vinoon — väärä
 * rivijärjestys, väärä ruutujako, väärä nollameridiaani — tämä huomaa sen
 * heti, eikä väärä kartta pääse repoon.
 */
const KOEPAIKAT = [
  { nimi: 'Helsinki', lon: 24.94, lat: 60.17, ryhma: 'mannerilmasto' },
  { nimi: 'Kairo', lon: 31.24, lat: 30.04, ryhma: 'aavikko' },
  { nimi: 'Singapore', lon: 103.82, lat: 1.35, ryhma: 'sademetsa' },
  // Denver on aroa eikä aavikkoa: Kalliovuoret ottavat sateen ennen sitä.
  { nimi: 'Denver', lon: -104.99, lat: 39.74, ryhma: 'aro' },
  { nimi: 'Rooma', lon: 12.5, lat: 41.9, ryhma: 'valimerenilmasto' },
  { nimi: 'Lontoo', lon: -0.13, lat: 51.51, ryhma: 'lauhkea' },
  { nimi: 'Etelänapa', lon: 0, lat: -89, ryhma: 'jaa' },
  { nimi: 'Huippuvuoret', lon: 15.65, lat: 78.22, ryhma: 'tundra' },
  { nimi: 'Manaus', lon: -60.02, lat: -3.12, ryhma: 'sademetsa' },
  { nimi: 'Alice Springs', lon: 133.88, lat: -23.7, ryhma: 'aavikko' },
];

function tarkistaPaikat(tiff) {
  const ryhmaLuokasta = new Uint8Array(256);
  RYHMAT.forEach((r, i) => { for (const l of r.luokat) ryhmaLuokasta[l] = i + 1; });
  let virheita = 0;
  for (const p of KOEPAIKAT) {
    const c = Math.round((p.lon - tiff.lon0) / tiff.lonAskel - 0.5);
    const rr = Math.round((tiff.lat0 - p.lat) / tiff.latAskel - 0.5);
    const arvo = tiff.kuva[rr * tiff.leveys + c];
    const ryhma = ryhmaLuokasta[arvo] ? RYHMAT[ryhmaLuokasta[arvo] - 1].avain : '(meri)';
    const ok = ryhma === p.ryhma;
    if (!ok) virheita++;
    process.stderr.write(`  ${ok ? 'ok  ' : 'EI! '} ${p.nimi.padEnd(14)} luokka ${String(arvo).padStart(2)} -> ${ryhma} (odotettu ${p.ryhma})\n`);
  }
  if (virheita > 2) throw new Error(`${virheita} koepaikkaa meni väärin — rasterin luku on rikki`);
}

// ------------------------------------------------------------------- main

async function main() {
  process.stderr.write(`aineisto: ${AINEISTO}\nlisenssi: ${LISENSSI}\n\n`);
  const { rasteri, selite } = await haeAineisto();
  tarkistaSelite(selite);

  const tiff = lueTiff(rasteri);
  process.stderr.write(`rasteri: ${tiff.leveys} x ${tiff.korkeus}, ruutu ${tiff.lonAskel}°, `
    + `vasen ylä (${tiff.lon0}, ${tiff.lat0})\n`);
  process.stderr.write('koepaikat:\n');
  tarkistaPaikat(tiff);

  const g = karkeuta(tiff);
  const maita = g.luokitus.reduce((s, v) => s + (v ? 1 : 0), 0);
  process.stderr.write(`\nkarkeutettu: ${g.leveys} x ${g.korkeus} (${g.ruutu}°), ${maita} maaruutua\n`);
  process.stderr.write('ääriviivat:\n');
  const raaka = raakarenkaat(g);

  // Jos katto ylittyy, kiristetään yksinkertaistusta, alarajaa ja
  // rengaskattoa. Yhtäkään ryhmää ei pudoteta.
  let toleranssi = ASETUKSET.toleranssi;
  let vahinAla = ASETUKSET.vahinAla;
  let budjetti = ASETUKSET.eninRenkaat;
  let teksti = null;
  let ryhmat = null;
  process.stderr.write('\n');
  for (let kierros = 0; kierros < 14; kierros++) {
    ryhmat = tuota(raaka, toleranssi, vahinAla, budjetti);
    teksti = kirjoita(ryhmat, toleranssi, vahinAla, budjetti);
    const koko = Buffer.byteLength(teksti);
    process.stderr.write(`kierros ${kierros}: toleranssi ${toleranssi.toFixed(3)}°, vähin ala ${Math.round(vahinAla)} km², enintään ${budjetti} rengasta -> ${(koko / 1024).toFixed(1)} kt\n`);
    if (koko <= ASETUKSET.katto) break;
    toleranssi *= 1.18;
    vahinAla *= 1.5;
    budjetti = Math.max(ASETUKSET.vahinMaara, Math.round(budjetti * 0.85));
  }
  if (Buffer.byteLength(teksti) > ASETUKSET.katto) {
    throw new Error('300 kt ei alittunut — nosta --toleranssi ja --vahin-ala käsin');
  }
  for (const r of ryhmat) {
    process.stderr.write(`   ${r.avain.padEnd(17)} ${String(r.renkaat.length).padStart(3)} rengasta ${String(r.pisteitä).padStart(5)} pistettä (raakoja ${r.raakoja}, pudotettu ${r.pudotettu})\n`);
    if (!r.renkaat.length) throw new Error(`ryhmä ${r.avain} jäi tyhjäksi`);
  }

  if (ASETUKSET.kuiva) {
    process.stderr.write('\n--kuiva: mitään ei kirjoitettu\n');
    return;
  }
  writeFileSync(KOHDE, teksti);
  process.stderr.write(`\nkirjoitettu ${KOHDE} (${(Buffer.byteLength(teksti) / 1024).toFixed(1)} kt)\n`);
}

main().catch((e) => { process.stderr.write('VIRHE: ' + (e.stack || e.message) + '\n'); process.exit(1); });
