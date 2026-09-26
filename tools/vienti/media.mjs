/*
 * MEDIAVIITTEIDEN TUNNISTUS JA ÄMPÄRIN OSOITTEET VIENTIIN.
 *
 * Repossa ei ole yhtä "kaikki mediaviitteet" -taulua eikä ämpärin
 * sisältöluetteloa (media/manifesti.json syntyy vain tools/peilaa-media.mjs
 * -ajossa eikä ole versionhallinnassa). Vienti siksi kerää jokaisen
 * merkkijonon, joka on kuva-, ääni- tai muu tiedostoviite tai URL, ja
 * laskee ämpärin osoitteen PELIN OMILLA säännöillä (js/media.js) — samoin
 * kuin peli ja peilaustyökalu. Sääntöjä ei kopioida tänne, joten ne eivät
 * pääse eriytymään.
 *
 * Luokittelu käyttää arvoa ja sen kentän nimeä (viimeinen ei-numeerinen
 * osa JSON pointerista): `tiedosto` on paketeissa Commonsin kuvatiedosto,
 * `lippu` Commonsin lippu (peilaa-media.mjs:n kohteet() käyttää samoja
 * kenttiä).
 *
 * Lajit:
 *   kuva-commons   Commons-tiedostonimi → ämpärin kuvat/<turvanimi>
 *   lippu-commons  Commons-lippu → ämpärin liput/<turvanimi>.png
 *   kuva-flickr    Flickr-kuva, repon kopio (js/packs/valokuvat-flickr.js)
 *   aani-peilattu  Freesound/archive.org → ämpärin aanet/
 *   aani-oma       repon oma ääni assets/audio/... → ämpärin audio/
 *   ampari-avain  valmis ämpärin avain (audio/, aanet/, kuvat/, ...)
 *   kohtaamiskuva kohtaamiskortin kasvokuva → KOHTAAMIS_R2_JUURI/[kansio/]
 *   juliste       `ampari`-kenttä tai julisteet.js:n tiedosto: oma paino ämpärissä → julisteUrl()
 *   hetkikuva     historian hetkien kuva → hetkenKuvaOsoite()
 *   asset-<laji>   ASSET_KANSIOT-laji (miniatyyrit, elaimet, aarteet,
 *                  nostot, ihmeet) → assetOsoite()
 *   repo           muu assets/-polku; tarjoillaan pelin juuresta
 *   kuva-url, aani-url, video-url  suora ulkoinen tiedosto-URL
 *   linkki         muu URL (lähteet, Wikipedia, radiovirrat, palvelut)
 *   tiedosto       tiedostonimi, jolle ei ole koneellista sääntöä
 *                  (ratkaistaan käsin — raportti listaa nämä)
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import {
  ASSET_KANSIOT, PEILI_JUURI, aaniUrl, assetOsoite, julisteUrl, peiliAaniPolku, peiliKuvaPolku,
} from '../../js/media.js';
import { VALOKUVAT_FLICKR, flickrOsoite } from '../../js/packs/valokuvat-flickr.js';
import { VALOKUVAT_PAIKALLISET } from '../../js/packs/valokuvat-paikalliset.js';
import { LIPUT_PAIKALLISET } from '../../js/packs/liput-paikalliset.js';
import { hetkenKuvaOsoite } from '../../js/packs/historian-hetket.js';
import { KOHTAAMIS_R2_JUURI, kohtaamiskuvat } from '../../js/kohtaamiskuvat-data.js';

// Kohtaamiskuvan osoitteeseen tarvitaan rivin `kansio`-kenttä, jota
// merkkijonon käynti ei näe — haetaan se datasta tiedostonimellä.
const KOHTAAMISKANSIO = new Map(kohtaamiskuvat.map((k) => [k.tiedosto, k.kansio ?? null]));
// Ämpärin avaimen tunnistaa juurikansiosta (js/media.js, peilaa-media.mjs).
const AMPARIN_KANSIOT = /^(audio|aanet|kuvat|liput|julisteet|kohtaamiset)\//;

export const PELIN_JUURI = 'https://matkakirja.app/';

/*
 * SIVUSTON ASSETIT ÄMPÄRISSÄ (skeema 1.12, Natiivi-UI 23.9.2026). Repon
 * assets/-tiedostot, jotka web tarjoilee Pagesista, viedään ämpäriin samalle
 * polulle (assets/…, .github/workflows/vie-sisalto.yml). Paketti osoittaa
 * ämpäriin ja kiinnittää version sisällön tiivisteellä (?v=<sha256 12>);
 * Pages-osoite jää varaksi. Tiedosto, jota repossa ei ole, jää Pagesiin.
 */
const REPON_JUURI = new URL('../../', import.meta.url);
const SIVUSTON_TIIVISTEET = new Map();
export const SIVUSTON_ASSET_ETULIITE = `${PEILI_JUURI}assets/`;

export function sivustonTiiviste(polku) {
  if (!SIVUSTON_TIIVISTEET.has(polku)) {
    const tiedosto = new URL(polku, REPON_JUURI);
    SIVUSTON_TIIVISTEET.set(polku, existsSync(tiedosto)
      ? createHash('sha256').update(readFileSync(tiedosto)).digest('hex') : null);
  }
  return SIVUSTON_TIIVISTEET.get(polku);
}

/** [ämpäri?v=, Pages] tai pelkkä [Pages], jos tiedostoa ei ole repossa. */
export function sivustoReitit(polku) {
  const sha = polku.startsWith('assets/') ? sivustonTiiviste(polku) : null;
  return sha ? [`${PEILI_JUURI}${polku}?v=${sha.slice(0, 12)}`, PELIN_JUURI + polku] : [PELIN_JUURI + polku];
}

const KUVA = /\.(jpe?g|png|webp|gif|svg|avif|tiff?)$/i;
const AANI = /\.(mp3|ogg|oga|opus|m4a|aac|wav|flac)$/i;
const VIDEO = /\.(mp4|webm|mov|m4v)$/i;
const MALLI = /\.(glb|gltf|obj|usdz)$/i;
const URL_ALKU = /^https?:\/\/\S+$/;

function kentta(polku) {
  const osat = String(polku || '').split('/');
  for (let i = osat.length - 1; i >= 0; i--) {
    if (osat[i] && !/^\d+$/.test(osat[i]) && !osat[i].startsWith('$')) return osat[i].replace(/^\$\$/, '$');
  }
  return '';
}

function assetLaji(polku) {
  for (const [laji, kansio] of Object.entries(ASSET_KANSIOT)) {
    if (polku.startsWith(`${kansio}/`)) return laji;
  }
  return null;
}

/**
 * Palauttaa mediaviitteen lajin tai null, jos merkkijono ei ole viite.
 * Sama arvo voi esiintyä monessa kohdassa; vienti pitää tarkimman lajin
 * (ks. TARKKUUS), joten Map-avaimena ensin nähty lippu saa silti
 * lippu-lajin, kun se myöhemmin näkyy `lippu`-kentässä.
 */
export function mediaLaji(arvo, polku = '', moduuli = '') {
  if (arvo.length > 2048 || /[\n\r\t]/.test(arvo)) return null;
  const k = kentta(polku);
  if (URL_ALKU.test(arvo)) {
    const puhdas = arvo.split(/[?#]/)[0];
    if (peiliAaniPolku(arvo)) return 'aani-peilattu';
    if (KUVA.test(puhdas)) return 'kuva-url';
    if (AANI.test(puhdas)) return 'aani-url';
    if (VIDEO.test(puhdas)) return 'video-url';
    return 'linkki';
  }
  const tiedostomainen = KUVA.test(arvo) || AANI.test(arvo) || VIDEO.test(arvo) || MALLI.test(arvo);
  if (!tiedostomainen) return null;
  if (arvo.startsWith('assets/')) {
    if (AANI.test(arvo)) return 'aani-oma';
    const al = assetLaji(arvo);
    return al ? `asset-${al}` : 'repo';
  }
  if (AMPARIN_KANSIOT.test(arvo)) return 'ampari-avain';
  if (k === 'ampari' || (moduuli === 'js/packs/julisteet.js' && k === 'tiedosto')) return 'juliste';
  if (moduuli === 'js/kohtaamiskuvat-data.js' && k === 'tiedosto') return 'kohtaamiskuva';
  if (moduuli === 'js/packs/historian-hetket.js' && KUVA.test(arvo)) return 'hetkikuva';
  if (k === 'lippu' && KUVA.test(arvo)) return 'lippu-commons';
  if (VALOKUVAT_FLICKR.has?.(arvo)) return 'kuva-flickr';
  if (k === 'tiedosto' || k === 'lisat') {
    if (AANI.test(arvo)) return 'tiedosto';
    if (KUVA.test(arvo)) return 'kuva-commons';
  }
  return 'tiedosto';
}

/** Pienempi on tarkempi: epämääräinen laji väistyy, kun tarkempi löytyy. */
export const TARKKUUS = (laji) => (laji === 'tiedosto' ? 2 : laji === 'repo' ? 1 : 0);

/** Ämpärin avain ja osoite pelin omilla säännöillä, kun ne voi laskea. */
export function ratkaiseMedia(arvo, laji) {
  switch (laji) {
    // Kuvat ja liput samassa järjestyksessä kuin pelin valokuvaUrl() ja
    // lippuUrl() (js/packs/africa-valokuvat.js): repon oma kopio → Flickr →
    // ämpäri → Commons. url on ensimmäinen, varat loput. Pistokoe 23.9.:
    // osa lipuista on vain repon kopiona, ei ämpärissä (404).
    case 'kuva-commons':
    case 'lippu-commons': {
      const lippu = laji === 'lippu-commons';
      const avain = peiliKuvaPolku(arvo, lippu ? 'liput' : 'kuvat');
      const oma = (lippu ? LIPUT_PAIKALLISET : VALOKUVAT_PAIKALLISET).get(arvo);
      const alkuperainen = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(arvo.replace(/ /g, '_'))}`;
      const reitit = [
        ...(oma ? sivustoReitit(`assets/${lippu ? 'liput' : 'valokuvat'}/${oma}`) : []),
        !lippu && VALOKUVAT_FLICKR.has(arvo) && flickrOsoite(arvo, 'b'),
        PEILI_JUURI + avain,
        alkuperainen,
      ].filter(Boolean);
      // Skeema 1.5: suurennos (1600 px) kuten pelin valokuvaSuurennos():
      // rajatun Flickr-kuvan suurennos on repon oma rajaus, muuten Flickrin
      // h-koko tai Commons 1600 px.
      const suurennos = lippu ? null : (VALOKUVAT_FLICKR.get(arvo)?.rajattu && oma
        ? sivustoReitit(`assets/valokuvat/${oma}`)[0]
        : flickrOsoite(arvo, 'h') ?? `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(arvo)}?width=1600`);
      return { avain, url: reitit[0], varat: reitit.slice(1), alkuperainen, ...(suurennos ? { suurennos } : {}) };
    }
    case 'kuva-flickr': {
      const url = flickrOsoite(arvo);
      return url ? { url } : {};
    }
    case 'aani-peilattu': {
      const avain = peiliAaniPolku(arvo);
      return { avain, url: PEILI_JUURI + avain, alkuperainen: arvo };
    }
    case 'aani-oma': {
      const url = aaniUrl(arvo);
      return url ? { avain: url.startsWith(PEILI_JUURI) ? url.slice(PEILI_JUURI.length) : undefined, url } : {};
    }
    case 'juliste': {
      const url = julisteUrl(arvo);
      return { avain: url.slice(PEILI_JUURI.length), url };
    }
    case 'ampari-avain':
      return { avain: arvo, url: PEILI_JUURI + arvo };
    case 'kohtaamiskuva': {
      const kansio = KOHTAAMISKANSIO.get(arvo);
      const url = `${KOHTAAMIS_R2_JUURI}/${kansio ? `${kansio}/` : ''}${arvo}`;
      return { avain: url.slice(PEILI_JUURI.length), url };
    }
    case 'hetkikuva': {
      const url = hetkenKuvaOsoite(arvo);
      return { avain: url.slice(PEILI_JUURI.length), url };
    }
    case 'repo': {
      const [url, ...varat] = sivustoReitit(arvo);
      return varat.length ? { avain: arvo, url, varat } : { url, varat };
    }
    case 'kuva-url': case 'aani-url': case 'video-url': case 'linkki':
      return { url: arvo };
    default:
      if (laji.startsWith('asset-')) {
        const url = assetOsoite(laji.slice(6), arvo);
        const [ensin, ...varat] = /^https?:/.test(url) ? [url] : sivustoReitit(url);
        const tulos = varat.length ? { url: ensin, varat } : { url: ensin };
        if (varat.length) tulos.avain = url;
        else if (tulos.url.startsWith(PEILI_JUURI)) tulos.avain = tulos.url.slice(PEILI_JUURI.length);
        return tulos;
      }
      return {};
  }
}
