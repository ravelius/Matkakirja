/*
 * TOPOGRAFIALINSSIN TARKENNUSLAASTARI — 1′-reliefi näkyviin pallolle.
 *
 * OMISTAJAN HAVAINTO 16.9.2026 klo 07.05 UTC (Raamattu,
 * TOPOGRAFIALINSSI: TARKKUUS EI NAY, sanatarkasti): *"Pitäisikö se
 * tarkempi topografialinssi olla jo pelissä? Nyt vielä ei ainakaan
 * näyttänyt olevan."*
 *
 * --- JUURISYY, MITATTU (16.9.2026, Chromium 1400 × 900, dpr 1) ---
 *
 * Reliefi renderöitiin v1917:ssä uudelleen 1′-korkeusdatasta, mutta
 * UUSI KUVA MENI VAIN LAUDAN MILLERIIN (js/packs/linssi-topografia-kuva.js
 * TOPOGRAFIA_KUVA, 10800 × 4859). Pallolauta ei piirrä sitä lainkaan:
 * pallo lukee pinnan tekstuurin tasavälisenä, ja se kuva on oma
 * tiedostonsa (TOPOGRAFIA_PALLOKUVA), joka on yhä 4096 × 2048 ja tehty
 * VANHASTA 3600 pikselin Millerin kuvasta. Uusi tarkkuus ei siis
 * koskaan päässyt ruudulle — ei tekstuurirajan, ei välimuistin eikä
 * skaalauksen takia, vaan siksi että pallo katsoi toista tiedostoa.
 *
 * Mitatut luvut (Alpit, 5,5–9,5 °E / 44–48 °N, sama ikkuna 512 × 512
 * pikseliin piirrettynä, terävyys = reunagradienttien keskiarvo):
 *
 *   pallokuva 4096 × 2048   45,5 lähdepikseliä ikkunan yli   6,78
 *   Miller    10800 × 4859  120   lähdepikseliä ikkunan yli  16,61
 *
 * eli 2,64-kertainen tiheys ja 2,45-kertainen terävyys.
 *
 * Tehollinen tarkkuus (lähdepikseliä ruutupikseliä kohti) oli
 * pallokuvalla saapumiszoomilla 0,20 ja lähizoomilla (korkeus 0,06)
 * 0,064 — yksi lähdepikseli venytettynä lähes 16 ruutupikseliin.
 *
 * gl.MAX_TEXTURE_SIZE oli mitattuna 8192 eikä siis rajoittanut 4096
 * pikselin kuvaa lainkaan; service workerin välimuisti ei sitäkään
 * (js/packs/*.js ja R2:n kuvat eivät ole samassa esivarastossa, ks.
 * sw.js). Rajat tulevat vastaan VASTA jos koko pallon kuvaa
 * kasvatettaisiin: 8192 × 4096 RGBA on 134 Mt näytönohjaimella, ja
 * lähizoomin 178 ruutupikseliä asteella vaatisi 51 000 pikselin
 * levyisen tasavälisen kuvan. Koko pallon kuva ei siis voi olla
 * ratkaisu.
 *
 * --- RATKAISU: PIENI TEKSTUURI, KOKO TARKKUUS ---
 *
 * Laastari on pallokuoren pala VAIN NÄKYVÄLLE IKKUNALLE
 * (js/pallolauta/linssit.js kalvo, valinta `ikkuna`). Sen kangas
 * rajataan ja uudelleenprojisoidaan Millerin 10800 pikselin kuvasta
 * LÄHTEEN OMASSA TIHEYDESSÄ (30 pikseliä astetta kohti), joten kangas
 * pysyy pienenä — lähizoomilla muutama sata pikseliä sivultaan —
 * vaikka tarkkuus on kaikki mitä aineistossa on.
 *
 * MUISTI ON MITOITETTU PUHELIMELLE. Koko 10800 × 4859 -kuvaa EI
 * pidetä purettuna (RGBA:na se on 210 Mt): kuva haetaan kerran
 * blobina (11,6 Mt) ja `createImageBitmap(blob, sx, sy, sw, sh)`
 * purkaa siitä vain rajatun palan, joka suljetaan heti kun kangas on
 * piirretty. Pysyvästi muistiin jää blob ja yksi kangas.
 *
 * UUDELLEENPROJISOINTI ON RIVIKOHTAINEN. Millerissä pituusaste on
 * lineaarinen mutta leveysaste ei, joten kangas piirretään rivi
 * kerrallaan: jokaiselle kangasriville lasketaan sen ylä- ja
 * alareunan leveysasteet, niistä Millerin y-välit, ja rivi piirtyy
 * siitä kaistaleesta. Vaakasuunta on pelkkä skaalaus. Sama kaava kuin
 * laudalla (js/fokusmitat.js projisoiLaudalle) — ei toista totuutta
 * projektiosta.
 */

import { projisoiLaudalle } from '../fokusmitat.js';

/** Laudan tunnus, jonka Milleriin reliefikuva on projisoitu. */
const LAUTA = 'maailmankartta';

/**
 * Pallokuvan tiheys pikseleinä astetta kohti (4096 / 360).
 *
 * Tämä on se luku, jonka laastari voittaa: kun ruudulla on tätä
 * enemmän pikseleitä astetta kohti, koko pallon kalvo on jo venytetty
 * ja laastari kannattaa.
 */
export const PERUSKUVAN_TIHEYS = 4096 / 360;

/**
 * Kynnys: laastari syttyy, kun ruudun tiheys ylittää pallokuvan
 * tiheyden tällä kertoimella. 1,4 jättää yleiskuvan (koko pallo
 * ruudulla, alle 3 px/aste) rauhaan eikä välkytä laastaria
 * rajatapauksissa.
 */
export const TARKENNUKSEN_KYNNYS = 1.4;

/**
 * Kuinka paljon ikkunaa laajennetaan ruudun ulkopuolelle. Laastari
 * korvaa koko pallon kalvon sen ollessa päällä, joten sen reunan on
 * oltava ruudun ulkopuolella myös panoroinnin aikana — 2,4-kertainen
 * ikkuna kestää noin ruudullisen vetoa ennen uutta rakennusta.
 */
export const IKKUNAN_MARGINAALI = 2.4;

/**
 * Turvavyöhyke: uusi kangas rakennetaan vasta kun näkyvä ala menee
 * tämän osuuden yli laastarin ikkunasta. Ilman vyöhykettä kangas
 * rakentuisi joka sormenliikkeellä.
 */
export const TURVAOSUUS = 0.55;

/** Kankaan sivun katto pikseleinä (16 Mt RGBA pahimmillaan). */
export const KANKAAN_KATTO = 2048;

/** Lyhin väli kahden kankaan rakennuksen välillä (ms). */
export const RAKENNUSJARRU_MS = 1200;

/**
 * Kuinka kauan kesken olevaa rakennusta odotetaan ennen uutta yritystä.
 *
 * 30 sekuntia on tarkoituksella pitkä: mitattuna (Chromium,
 * ohjelmistorenderöinti, kuormitettu kontti) 11,6 Mt:n haku vei 2,7 s ja
 * kaistaleen purku 3,2 s, mutta kuorman alla sama työ venyi yli 15
 * sekunnin. Liian lyhyt raja aloittaisi TOISEN purun ennen kuin
 * ensimmäinen on valmis, ja silloin muistissa olisi hetken kaksi 52
 * megapikselin purkua — juuri se, mitä puhelimella vältetään.
 */
export const JUMIN_RAJA_MS = 30000;

/**
 * Laastarin säde pinnan säteinä. Koko pallon kalvo on 1,0015
 * (js/pallolauta/linssit.js KALVON_SADE); laastari on hiuksenverran sen
 * päällä, jottei kahden kuoren välille jää välkkyvää syvyyskiistaa
 * niinä hetkinä, jolloin molemmat ovat näkyvissä (häivytys).
 */
export const LAASTARIN_SADE = 1.0019;

/**
 * Reliefikuvan kattama leveysasteiden väli. Lauta ulottuu -58…76, eikä
 * kuvassa ole riviäkään sen ulkopuolelta.
 */
export const KUVAN_ETELA = -58;
export const KUVAN_POHJOINEN = 76;

/**
 * Onko tarkennuslaastari päällä? `?tarkennus=0` ottaa sen pois — sama
 * kehittäjän vipu kuin vektorikerroksella (`?vektorit=0`,
 * js/pallovektorit.js pallovektoritPaalla).
 *
 * KAKSI KÄYTTÖÄ. Vartijan VASTAKOE mittaa samasta ruudusta saman
 * näkymän ilman laastaria, jolloin ero on laastarin ansiota eikä
 * mittausvirhettä; ja jos jokin laite ei jaksa purkaa 10800 pikselin
 * kuvaa, linssi toimii silti — koko pallon kalvo jää voimaan.
 */
export function tarkennusPaalla(ikkuna = globalThis) {
  try {
    const param = new URLSearchParams(ikkuna.location?.search ?? '').get('tarkennus');
    if (param === '0') return false;
    if (param === '1') return true;
  } catch {
    /* ei osoitetta (testiajo) */
  }
  return true;
}

/**
 * Tarvitaanko laastari tällä ruudun tiheydellä?
 *
 * Puhdas funktio (tests/pallolinssit.test.mjs).
 *
 * VERTAILU ON POHJAKUVAN OMA TIHEYS, EI VAKIO (16.9.2026). Pohjakuvia
 * on kaksi: 4096 px (11,4 px/aste) puhelimella ja 8192 px (22,8
 * px/aste) leveällä ruudulla (js/linssit/reliefikuva.js valitseReliefi).
 * Laastari kannattaa vasta kun ruutu on POHJAA tiheämpi — 8k-ruudulla
 * kynnys on siis kaksinkertainen, eikä laastaria rakenneta siellä,
 * missä se ei toisi lisää.
 *
 * @param {number} pxPerAste ruutupikseliä pituusastetta kohti
 * @param {number} perusTiheys pohjakuvan pikseliä astetta kohti
 */
export function tarkennusTarpeen(pxPerAste, perusTiheys = PERUSKUVAN_TIHEYS) {
  const pohja = Number(perusTiheys) > 0 ? Number(perusTiheys) : PERUSKUVAN_TIHEYS;
  return Number(pxPerAste) > pohja * TARKENNUKSEN_KYNNYS;
}

/**
 * Näkyvän alan ympärille laajennettu ikkuna asteina.
 *
 * Puhdas funktio (tests/pallolinssit.test.mjs). Leveysaste rajataan
 * kuvan omaan kaistaan; pituusaste saa ylittää ±180, koska soittaja
 * tarkistaa kierron erikseen (ks. millerRajaus).
 *
 * @param {{lat: number, lng: number, leveysAst: number, korkeusAst: number,
 *   marginaali?: number}} nakyma
 * @returns {{lat0: number, lat1: number, lng0: number, lng1: number}|null}
 */
export function tarkennusIkkuna({
  lat, lng, leveysAst, korkeusAst, marginaali = IKKUNAN_MARGINAALI,
}) {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  if (!(leveysAst > 0) || !(korkeusAst > 0)) return null;
  const puoliLng = Math.min(170, leveysAst * marginaali) / 2;
  const puoliLat = Math.min(120, korkeusAst * marginaali) / 2;
  const lat1 = Math.min(KUVAN_POHJOINEN, lat + puoliLat);
  const lat0 = Math.max(KUVAN_ETELA, lat - puoliLat);
  if (!(lat1 - lat0 > 0.05)) return null;
  return {
    lat0, lat1, lng0: lng - puoliLng, lng1: lng + puoliLng,
  };
}

/**
 * Mahtuuko näkyvä ala laastarin ikkunan turvavyöhykkeen sisään?
 *
 * Puhdas funktio (tests/pallolinssit.test.mjs).
 */
export function ikkunaRiittaa(ikkuna, nakyma, osuus = TURVAOSUUS) {
  if (!ikkuna || !nakyma) return false;
  const keskiLat = (ikkuna.lat0 + ikkuna.lat1) / 2;
  const keskiLng = (ikkuna.lng0 + ikkuna.lng1) / 2;
  const turvaLat = (ikkuna.lat1 - ikkuna.lat0) * osuus / 2;
  const turvaLng = (ikkuna.lng1 - ikkuna.lng0) * osuus / 2;
  const eroLng = Math.abs(((nakyma.lng - keskiLng + 540) % 360) - 180);
  return Math.abs(nakyma.lat - keskiLat) + nakyma.korkeusAst / 2 <= turvaLat
    && eroLng + nakyma.leveysAst / 2 <= turvaLng;
}

/**
 * Ikkunan rajaus lähdekuvassa pikseleinä, tai null jos ikkuna ylittää
 * kartan sauman (lon0 = -175) — silloin laastaria ei tehdä lainkaan ja
 * koko pallon kalvo jää voimaan. Sauma on keskellä Tyyntämerta, eikä
 * siellä ole yhtään pelin kaupunkia.
 *
 * Puhdas funktio (tests/pallolinssit.test.mjs).
 */
export function millerRajaus(ikkuna, kuva) {
  if (!ikkuna || !kuva?.raja || !(kuva.leveysPx > 0) || !(kuva.korkeusPx > 0)) return null;
  const { raja } = kuva;
  const vasen = projisoiLaudalle(LAUTA, ikkuna.lng0, ikkuna.lat1);
  const oikea = projisoiLaudalle(LAUTA, ikkuna.lng1, ikkuna.lat0);
  if (!vasen || !oikea) return null;
  // Kierto: x kääntyy laudan reunan yli itseensä, jolloin oikea reuna
  // on vasemman vasemmalla puolella. Kaistale olisi kahdessa osassa.
  if (!(oikea.x > vasen.x) || !(oikea.y > vasen.y)) return null;
  const px = kuva.leveysPx / raja.leveys;
  const py = kuva.korkeusPx / raja.korkeus;
  const sx = vasen.x * px;
  const sy = vasen.y * py;
  const sw = (oikea.x - vasen.x) * px;
  const sh = (oikea.y - vasen.y) * py;
  if (!(sw > 1) || !(sh > 1)) return null;
  if (sx < -0.5 || sy < -0.5 || sx + sw > kuva.leveysPx + 0.5 || sy + sh > kuva.korkeusPx + 0.5) {
    return null;
  }
  return {
    sx: Math.max(0, Math.floor(sx)),
    sy: Math.max(0, Math.floor(sy)),
    sw: Math.min(kuva.leveysPx, Math.ceil(sw)),
    sh: Math.min(kuva.korkeusPx, Math.ceil(sh)),
  };
}

/**
 * Kankaan koko: lähteen oma tiheys, katolla rajattuna.
 *
 * Puhdas funktio (tests/pallolinssit.test.mjs). Isompi kangas ei lisää
 * tietoa (lähde on 30 px/aste) mutta veisi muistia; pienempi hukkaisi
 * juuri sen tarkkuuden, jonka takia laastari on olemassa.
 */
export function kankaanKoko(rajaus, katto = KANKAAN_KATTO) {
  if (!rajaus) return null;
  const leveys = Math.max(16, Math.min(katto, Math.round(rajaus.sw)));
  const korkeus = Math.max(16, Math.min(katto, Math.round(rajaus.sh)));
  return { leveys, korkeus };
}

/**
 * Millerin kaistale tasaväliseksi kankaaksi, rivi kerrallaan.
 *
 * Kangas on selaimen asia (OffscreenCanvas tai <canvas>), joten tämä
 * ottaa valmiin kankaan ja lähteen eikä luo kumpaakaan itse — Node
 * testaa yllä olevat puhtaat funktiot, selain piirtää.
 */
function piirraTasavaliseksi(ctx, lahde, { ikkuna, rajaus, kuva, leveys, korkeus }) {
  const py = kuva.korkeusPx / kuva.raja.korkeus;
  const yKuvassa = (lat) => {
    const p = projisoiLaudalle(LAUTA, ikkuna.lng0, lat);
    return p ? p.y * py - rajaus.sy : null;
  };
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  const vali = (ikkuna.lat1 - ikkuna.lat0) / korkeus;
  for (let y = 0; y < korkeus; y += 1) {
    const ylaLat = ikkuna.lat1 - y * vali;
    const alaLat = ylaLat - vali;
    const ySrc = yKuvassa(ylaLat);
    const ySrc1 = yKuvassa(alaLat);
    if (ySrc == null || ySrc1 == null) continue;
    const kork = Math.max(1, ySrc1 - ySrc);
    ctx.drawImage(lahde, 0, ySrc, rajaus.sw, kork, 0, y, leveys, 1);
  }
}

/**
 * Reunan pehmennys: laastarin ulkoreuna häivytetään läpinäkyväksi.
 *
 * Reuna on tavallisesti ruudun ulkopuolella (IKKUNAN_MARGINAALI), mutta
 * nopeassa vedossa se ehtii näkyä — pehmeä reuna häivyttää reliefin
 * pois sen sijaan että piirtäisi kartalle suoran viivan.
 */
function pehmennaReuna(ctx, leveys, korkeus) {
  const osuus = 0.08;
  const vaaka = Math.max(1, Math.round(leveys * osuus));
  const pysty = Math.max(1, Math.round(korkeus * osuus));
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  const liuku = (x0, y0, x1, y1, x, y, w, h) => {
    const g = ctx.createLinearGradient(x0, y0, x1, y1);
    g.addColorStop(0, 'rgba(0, 0, 0, 1)');
    g.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(x, y, w, h);
  };
  liuku(0, 0, vaaka, 0, 0, 0, vaaka, korkeus);
  liuku(leveys, 0, leveys - vaaka, 0, leveys - vaaka, 0, vaaka, korkeus);
  liuku(0, 0, 0, pysty, 0, 0, leveys, pysty);
  liuku(0, korkeus, 0, korkeus - pysty, 0, korkeus - pysty, leveys, pysty);
  ctx.restore();
}

/**
 * Laastarin kangas yhdelle ikkunalle, tai null jos kuvaa ei saatu.
 *
 * @param blob    lähdekuva blobina (Millerin 10800 × 4859)
 * @param kuva    TOPOGRAFIA_KUVA (mitat ja raja)
 * @param ikkuna  { lat0, lat1, lng0, lng1 }
 */
export async function teeKangas(blob, kuva, ikkuna) {
  const rajaus = millerRajaus(ikkuna, kuva);
  const koko = kankaanKoko(rajaus);
  if (!rajaus || !koko) return null;
  let bittikartta = null;
  try {
    /*
     * RAJAUS PURKUUN, EI PURKU RAJAUKSEEN. Neliparametrinen
     * createImageBitmap purkaa kuvasta vain pyydetyn palan, joten
     * muistiin JÄÄ vain kaistale — koko kuvan RGBA olisi 210 Mt.
     */
    bittikartta = await createImageBitmap(blob, rajaus.sx, rajaus.sy, rajaus.sw, rajaus.sh);
  } catch {
    return null;
  }
  try {
    const kangas = document.createElement('canvas');
    kangas.width = koko.leveys;
    kangas.height = koko.korkeus;
    const ctx = kangas.getContext('2d', { willReadFrequently: false });
    if (!ctx) return null;
    piirraTasavaliseksi(ctx, bittikartta, {
      ikkuna, rajaus, kuva, leveys: koko.leveys, korkeus: koko.korkeus,
    });
    pehmennaReuna(ctx, koko.leveys, koko.korkeus);
    return { kangas, ikkuna, rajaus, koko };
  } finally {
    bittikartta.close?.();
  }
}

/**
 * Laastarin ohjain: seuraa kameraa ja pitää tarkennuksen ajan tasalla.
 *
 * @param lauta       pallolauta (pallo, kotelo, linssit, heraa)
 * @param kuva        TOPOGRAFIA_KUVA
 * @param peittavyys  sama 0,72 kuin koko pallon kalvolla
 * @param osa         laastarin osan nimi linssimoottorissa
 * @param perus       { paalle(), pois() } — koko pallon kalvon näkyvyys
 *                    (häivytys, ei purku; ks. js/linssit/topografia.js)
 */
export function luoTarkennus({
  lauta, kuva, peittavyys = 0.72, osa = 'topografia-tarkennus', perus = null,
  perusTiheys = PERUSKUVAN_TIHEYS,
  ikkunaOlio = (typeof window === 'undefined' ? null : window),
}) {
  const pallo = lauta?.pallo;
  const linssit = lauta?.linssit;
  if (!pallo || !linssit) return { pura: () => {}, tila: () => null };
  if (!tarkennusPaalla(ikkunaOlio ?? globalThis)) {
    return { pura: () => {}, tila: () => ({ paalla: false, pois: true }), tahdista: () => {} };
  }

  let purettu = false;
  let blob = null;
  let haku = null;
  let nykyinen = null; // { ikkuna, koko }
  let kesken = 0; // rakennuksen aloitushetki, 0 = ei kesken
  let viimeksi = 0;
  let laastariPaalla = false;
  let haluttu = true; // saako kesken oleva rakennus asentaa laastarin?
  let perusNakyy = true; // onko koko pallon kalvo näkyvissä juuri nyt?
  const mittari = {
    rakennuksia: 0, ohituksia: 0, saumoja: 0, virheita: 0, jumeja: 0,
  };

  /** Näkyvä ala asteina kameran keskipisteen ympärillä. */
  const nakyma = () => {
    const pov = pallo.pointOfView?.();
    const kotelo = lauta.kotelo;
    if (!pov || !kotelo?.clientWidth || !kotelo?.clientHeight) return null;
    const delta = 0.25;
    let a;
    let b;
    let c;
    try {
      a = pallo.getScreenCoords(pov.lat, pov.lng);
      b = pallo.getScreenCoords(pov.lat, pov.lng + delta);
      c = pallo.getScreenCoords(pov.lat + delta, pov.lng);
    } catch {
      return null;
    }
    if (!a || !b || !c) return null;
    const pxLng = Math.hypot(b.x - a.x, b.y - a.y) / delta;
    const pxLat = Math.hypot(c.x - a.x, c.y - a.y) / delta;
    if (!(pxLng > 0) || !(pxLat > 0)) return null;
    return {
      lat: pov.lat,
      lng: pov.lng,
      pxLng,
      leveysAst: kotelo.clientWidth / pxLng,
      korkeusAst: kotelo.clientHeight / pxLat,
    };
  };

  const lataaBlob = async () => {
    if (blob) return blob;
    if (!haku) {
      haku = fetch(kuva.kuva, { mode: 'cors' })
        .then((v) => (v.ok ? v.blob() : null))
        .catch(() => null);
    }
    blob = await haku;
    return blob;
  };

  /*
   * LAASTARIN POISTO ON EHDOTON JA IDEMPOTENTTI.
   *
   * Aiemmin poisto palasi heti, jos laastari ei ollut vielä "päällä" —
   * ja juuri silloin kesken oleva rakennus ehti asentaa laastarin
   * POISTON JÄLKEEN, jolloin kartalle jäi tarkennettu suorakaide
   * yleiskuvaan (mitattu 16.9.2026, 1400 × 900). `haluttu` on siksi
   * oma lippunsa: rakennus tarkistaa sen vielä juuri ennen asennusta.
   */
  const naytaPerus = (nayta) => {
    if (perusNakyy === nayta) return;
    perusNakyy = nayta;
    if (nayta) perus?.paalle?.();
    else perus?.pois?.();
  };

  const poistaLaastari = () => {
    haluttu = false;
    if (laastariPaalla) {
      laastariPaalla = false;
      nykyinen = null;
      linssit.pura(osa);
    }
    naytaPerus(true);
  };

  const tahdista = async () => {
    if (purettu) return;
    const n = nakyma();
    if (!n) return;
    if (!tarkennusTarpeen(n.pxLng, perusTiheys)) { poistaLaastari(); return; }
    if (nykyinen && ikkunaRiittaa(nykyinen.ikkuna, n)) return;
    const nyt = Date.now();
    /*
     * JUMI EI SAA JÄÄDÄ PYSYVÄKSI. Rakennus on kahden lupauksen takana
     * (ämpärin haku ja `createImageBitmap`), ja jos jompikumpi jää
     * roikkumaan — mitattuna 16.9.2026 hitaalla välityspalvelimella —
     * `kesken` jäisi päälle ikuisiksi ajoiksi eikä laastaria tulisi
     * koskaan, ilman yhtään virhettä lokissa. Kesken oleva rakennus on
     * siksi HETKI eikä lippu: sitä odotetaan enintään JUMIN_RAJA_MS,
     * minkä jälkeen yritetään uudestaan.
     */
    if (kesken && nyt - kesken < JUMIN_RAJA_MS) return;
    if (kesken) mittari.jumeja += 1;
    if (nyt - viimeksi < RAKENNUSJARRU_MS) return;
    const ikkuna = tarkennusIkkuna(n);
    if (!ikkuna) return;
    if (!millerRajaus(ikkuna, kuva)) { mittari.saumoja += 1; poistaLaastari(); return; }
    kesken = nyt;
    haluttu = true;
    try {
      const b = await lataaBlob();
      if (!b || purettu || !haluttu) { mittari.ohituksia += 1; return; }
      const tulos = await teeKangas(b, kuva, ikkuna);
      if (!tulos || purettu || !haluttu) { mittari.ohituksia += 1; return; }
      viimeksi = Date.now();
      mittari.rakennuksia += 1;
      linssit.kalvo(osa, {
        kuva: tulos.kangas,
        peittavyys,
        ikkuna,
        // Hiuksenverran koko pallon kalvon päällä, oma piirtojärjestys.
        sade: LAASTARIN_SADE,
        jarjestys: 2,
      });
      nykyinen = { ikkuna, koko: tulos.koko };
      laastariPaalla = true;
      naytaPerus(false);
      lauta.heraa?.();
    } catch (virhe) {
      mittari.virheita += 1;
      console.warn('Topografian tarkennuslaastari ei rakentunut:', virhe);
    } finally {
      kesken = 0;
    }
  };

  /*
   * Kameraa seurataan ajastimella eikä tapahtumalla: Globe.gl ei kerro
   * kameran liikkeestä, ja rAF-silmukka tekisi työtä joka kehyksellä
   * pelkän vertailun vuoksi. 300 ms riittää, kun rakennusta jarruttaa
   * lisäksi RAKENNUSJARRU_MS.
   */
  const ajastin = ikkunaOlio?.setInterval?.(() => { void tahdista(); }, 300) ?? 0;
  void tahdista();

  return {
    pura() {
      purettu = true;
      haluttu = false;
      if (ajastin) ikkunaOlio?.clearInterval?.(ajastin);
      // Purku on ehdoton: kesken oleva rakennus ei saa jättää kuorta
      // näyttämölle senkään jälkeen, kun linssi on jo suljettu.
      linssit.pura(osa);
      laastariPaalla = false;
      perusNakyy = true;
      nykyinen = null;
      blob = null;
    },
    /** Mitatut luvut savukkeelle ja vartijoille. */
    tila: () => ({
      paalla: laastariPaalla,
      /** Kynnys, jonka yli ruudun on mentävä (pohjakuvan tiheys × 1,4). */
      kynnys: +(perusTiheys * TARKENNUKSEN_KYNNYS).toFixed(2),
      ikkuna: nykyinen?.ikkuna ?? null,
      kangas: nykyinen?.koko ?? null,
      ...mittari,
    }),
    /** Vartijoiden ja savukkeen käsikäyttö. */
    tahdista,
  };
}
