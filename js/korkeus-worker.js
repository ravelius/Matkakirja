/*
 * TARKAN VARJON LASKIN — OMA SÄIE.
 *
 * Tämä worker omistaa ETOPO1:n yhden kaariminuutin palat ja laskee
 * niistä rinnevarjon yhteen kuvaan kerrallaan. Pääsäie hoitaa vain
 * verkon ja piirron (js/korkeuskerros.js).
 *
 * === MIKSI OMA SÄIE =================================================
 *
 * Yksi näkymä on tyypillisesti 900 × 700 varjopikseliä, ja jokainen
 * niistä ottaa NELJÄ bilineaarista korkeusnäytettä (keskeisdifferenssi
 * molempiin suuntiin) eli 16 ruudukkolukua. Se on noin kymmenen
 * miljoonaa muistihakua kuvaa kohti: pääsäikeessä se olisi satojen
 * millisekuntien tukos joka kerta kun sormi irtoaa — juuri se, mitä
 * kartan sujuvuudessa on eniten vartioitu.
 *
 * Palat jäävät myös TÄNNE eivätkä pääsäikeeseen: yksi pala on 600 ×
 * 600 × 2 tavua = 720 kt purettuna, ja niitä on näkymässä 1–4. Ne ovat
 * pelkkää laskennan raaka-ainetta, eikä pääsäikeen tarvitse nähdä
 * niistä tavuakaan.
 *
 * === VARJON KAAVA ON TUOTU, EI KOPIOITU =============================
 *
 * `varjostusPisteessa` tulee samasta moduulista, jota laattapyramidin
 * moottori käyttää polttaessaan 3′-varjon pohjalaattoihin
 * (js/maastovarjo.js). Ero on VAIN derivaatan askel:
 * moottorilla 0,05° eli kolme kaariminuuttia, täällä 1/60° eli yksi.
 * Juuri se ero ON koko kokeilu, eikä sitä saisi mitata jos kaavassa
 * olisi muitakin eroja.
 *
 * TÄMÄ ON MODUULIWORKER (`type: 'module'`), koska se tuo kaavan.
 * Yhden tiedoston versiossa (tools/build-standalone.mjs) workeria ei
 * ole eikä sitä voi olla — nippu on tavallinen <script> eikä
 * moduuli, eikä file://-sivulta saa käynnistää workeria lainkaan.
 * Kokeilu kytkeytyy siellä siis pois itsestään (js/korkeuskerros.js),
 * ja niin kuuluukin: palat tulevat verkosta, eikä yhden tiedoston
 * versio oleta verkkoa.
 */
import { varjostusPisteessa, varjonVoimakkuus } from './maastovarjo.js';

/** Palan sivu asteina ja soluina. Sama sopimus kuin tools/tee-korkeuspalat.mjs. */
const PALAN_ASTEITA = 10;
const PALAN_TUNNUS = 'MK1P';
const OTSIKKO = 4 + 8 + 8 + 8 + 4 + 4;

/** Derivaatan askel asteina: yksi kaariminuutti. */
const ASKEL = 1 / 60;

/**
 * Ladatut palat nimen mukaan. Worker elää niin kauan kuin kytkin on
 * päällä, joten sama pala puretaan kerran vaikka sen yli
 * panoroitaisiin sata kertaa.
 */
const palat = new Map();

/* ------------------------------------------------------------- purku */

/**
 * Gzipattu pala Int16-ruudukoksi.
 *
 * Peilikuva tools/tee-korkeuspalat.mjs:n pakkaajalle. Kopio eikä tuonti,
 * koska Node-työkalua ei voi ladata selaimeen — mutta muoto on yhdessä
 * paikassa dokumentoitu ja testi ajaa kumpaakin suuntaa
 * (tests/korkeuspalat.test.mjs).
 *
 * DecompressionStream on selaimen oma gunzip. Se on ollut Chromiumissa
 * ja Safarissa vuosia, ja jos sitä ei ole, koko kokeilu on pois päältä
 * (js/korkeuskerros.js tarkistaa sen ennen workerin käynnistystä).
 */
async function puraPala(pakattu) {
  const virta = new Response(pakattu).body
    .pipeThrough(new DecompressionStream('gzip'));
  const runko = new DataView(await new Response(virta).arrayBuffer());
  if (runko.byteLength < OTSIKKO) throw new Error('pala on liian lyhyt');
  const tunnus = String.fromCharCode(
    runko.getUint8(0), runko.getUint8(1), runko.getUint8(2), runko.getUint8(3),
  );
  if (tunnus !== PALAN_TUNNUS) throw new Error(`palan tunnus on ${tunnus}`);
  const lon0 = runko.getFloat64(4, true);
  const lat0 = runko.getFloat64(12, true);
  const ruutu = runko.getFloat64(20, true);
  const leveys = runko.getUint32(28, true);
  const korkeus = runko.getUint32(32, true);
  const n = leveys * korkeus;
  if (runko.byteLength !== OTSIKKO + n * 2) throw new Error('pala on vajaa');
  const solut = new Int16Array(n);
  let luettu = OTSIKKO;
  for (let y = 0; y < korkeus; y += 1) {
    let edellinen = 0;
    for (let x = 0; x < leveys; x += 1) {
      /*
       * Erotus lasketaan Int16-aritmetiikalla ja se saa kiertää yli;
       * `<< 16 >> 16` tekee saman kierron takaisin, joten purku on
       * häviötön myös siellä, missä 8000 metrin huippu on 9000 metrin
       * haudan vieressä.
       */
      edellinen = (edellinen + runko.getInt16(luettu, true)) << 16 >> 16;
      luettu += 2;
      solut[y * leveys + x] = edellinen;
    }
  }
  return {
    lon0, lat0, ruutu, leveys, korkeus, solut,
  };
}

/* ------------------------------------------------------- näytteenotto */

/** Soluja palan sivulla ja koko maailman ympäri. */
const SOLUJA = PALAN_ASTEITA * 60;
const SARAKKEITA = 360 * 60;
const RIVEJA = 180 * 60;

/**
 * Bilineaarinen korkeus KAIKISTA ladatuista paloista.
 *
 * Palat eivät mene päällekkäin (solu lon0 + 10° kuuluu jo seuraavaan
 * palaan), joten reunan yli menevä näyte tarvitsee naapuripalan.
 * Siksi näytteenottaja on GLOBAALI eikä palakohtainen: se etsii
 * jokaiselle nurkalle oman palansa. Ilman tätä joka kymmenennen asteen
 * kohdalle piirtyisi varjoton viiva — ja se näyttäisi ruudukolta,
 * jollaista kartalla ei ole.
 *
 * @returns {number} metriä, tai NaN jos yksikin nurkka puuttuu.
 */
function korkeusSolusta(sx, sy) {
  /*
   * Solun globaali indeksi: sx = (lon + 180) · 60, sy = (lat + 90) · 60.
   * Palan paikka on siitä suora jakolasku, joten palan etsiminen ei ole
   * hakua vaan laskutoimitus.
   *
   * PITUUSASTE KIERTÄÄ, LEVEYSASTE EI. Laudan sauman yli katsova näkymä
   * pyytää soluja rajan molemmin puolin, ja niiden on löydyttävä; navan
   * yli katsovaa näkymää ei ole olemassa.
   */
  if (sy < 0 || sy >= RIVEJA) return NaN;
  const kx = ((sx % SARAKKEITA) + SARAKKEITA) % SARAKKEITA;
  const px = Math.floor(kx / SOLUJA);
  const py = Math.floor(sy / SOLUJA);
  const pala = palat.get(px * 100 + py);
  if (!pala) return NaN;
  return pala.solut[(sy - py * SOLUJA) * pala.leveys + (kx - px * SOLUJA)];
}

function korkeus(lon, lat) {
  const fx = (lon + 180) * 60;
  const fy = (lat + 90) * 60;
  const x0 = Math.floor(fx); const y0 = Math.floor(fy);
  const tx = fx - x0; const ty = fy - y0;
  const a = korkeusSolusta(x0, y0);
  const b = korkeusSolusta(x0 + 1, y0);
  const c = korkeusSolusta(x0, y0 + 1);
  const d = korkeusSolusta(x0 + 1, y0 + 1);
  if (!(Number.isFinite(a) && Number.isFinite(b)
    && Number.isFinite(c) && Number.isFinite(d))) return NaN;
  return (a + (b - a) * tx) * (1 - ty) + (c + (d - c) * tx) * ty;
}

/* ---------------------------------------------------------- varjokuva */

/**
 * Yksi varjokuva: RGBA, jossa väri on musta tai valkoinen ja
 * peittävyys on varjon voimakkuus.
 *
 * OMISTAJAN PÄÄTÖS 1.9.2026: *"1′-varjo piirretään SUORAAN laattojen
 * päälle läpikuultavana (sama läpinäkyvyys kuin moottorin
 * varjostuksella), EI sekoitustilaa."* Tavallinen alfasekoitus mustalla
 * on TÄSMÄLLEEN sama kertolasku, jonka moottori tekee varjopuolella
 * (`k · (1 − varjo)`), joten tummennus on identtinen. Valopuoli on
 * likiarvo: moottori vaalentaa kertomalla ja vetää sitten pienen
 * vakion pois, ja valkoinen alfa vaalentaa kohti 255:tä. Ero on
 * muutama sävyaskel, ja se on tässä kokeilussa hyväksytty hinta siitä,
 * ettei sekoitustilaa käytetä.
 *
 * MERI EI SAA VARJOA. Negatiivinen korkeus on merta, ja merenpohjan
 * rinteet piirtyisivät ulapalle vuoristona. Sama sääntö kuin
 * moottorilla: varjo kuuluu maastopassiin eikä meripassiin.
 */
function piirraVarjo({
  leveys, korkeus: kuvaKorkeus, lonit, latit,
}) {
  const kuva = new Uint8ClampedArray(leveys * kuvaKorkeus * 4);
  for (let y = 0; y < kuvaKorkeus; y += 1) {
    const lat = latit[y];
    const rivi = y * leveys * 4;
    for (let x = 0; x < leveys; x += 1) {
      const lon = lonit[x];
      const m = korkeus(lon, lat);
      // Ei aineistoa tai merta: läpinäkyvä pikseli, laatta jää näkyviin.
      if (!Number.isFinite(m) || m < 0) continue;
      const voima = varjonVoimakkuus(varjostusPisteessa(korkeus, lon, lat, ASKEL));
      const i = rivi + x * 4;
      if (voima > 0) {
        kuva[i + 3] = Math.round(voima * 255);
      } else {
        kuva[i] = 255; kuva[i + 1] = 255; kuva[i + 2] = 255;
        kuva[i + 3] = Math.round(-voima * 255);
      }
    }
  }
  return kuva;
}

/* ------------------------------------------------------------ viestit */

/**
 * VIESTIT KÄSITELLÄÄN JONOSSA, YKSI KERRALLAAN.
 *
 * Palan purku on asynkroninen (DecompressionStream), ja `onmessage`
 * palaa ensimmäisessä awaitissa — jolloin workerin viestisilmukka
 * ottaa heti seuraavan viestin käsittelyyn. Ensimmäisessä versiossa se
 * tarkoitti, että VARJO laskettiin ennen kuin yksikään pala oli
 * purettu: kuva oli oikean kokoinen, oikeassa paikassa ja täysin
 * läpinäkyvä, eikä yksikään muu väite huomannut mitään. Jono pitää
 * järjestyksen, ja järjestys on tässä koko sopimus.
 */
let jono = Promise.resolve();
self.onmessage = (viesti) => {
  jono = jono.then(() => kasittele(viesti.data)).catch(() => {});
};

async function kasittele(t) {
  try {
    if (t.tyyppi === 'pala') {
      const pala = await puraPala(t.data);
      // Avain on palan RUUDUKKOPAIKKA eikä nimi: näytteenottaja laskee
      // sen suoraan solun indeksistä eikä muodosta merkkijonoa
      // kymmenen miljoonaa kertaa kuvaa kohti.
      const px = Math.round((pala.lon0 + 180) / PALAN_ASTEITA);
      const py = Math.round((pala.lat0 + 90) / PALAN_ASTEITA);
      palat.set(px * 100 + py, pala);
      self.postMessage({ tyyppi: 'pala', nimi: t.nimi, ok: true });
      return;
    }
    if (t.tyyppi === 'varjo') {
      const kuva = piirraVarjo(t);
      self.postMessage(
        {
          tyyppi: 'varjo', id: t.id, leveys: t.leveys, korkeus: t.korkeus, kuva,
        },
        [kuva.buffer],
      );
      return;
    }
    if (t.tyyppi === 'tyhjenna') {
      palat.clear();
      self.postMessage({ tyyppi: 'tyhjenna', ok: true });
    }
  } catch (e) {
    self.postMessage({
      tyyppi: 'virhe', id: t.id, nimi: t.nimi, viesti: String(e?.message ?? e),
    });
  }
}
