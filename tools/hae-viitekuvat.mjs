/*
 * VIITEKUVIEN HAKU — aidot valokuvat generoinnin ankkuriksi.
 *
 * Miksi tämä on olemassa (omistajan tilaus 23.8.2026): kuva
 * hero-kashgar-keskipaiva.png esitti Samarkandin tyylistä
 * timuridimausoleumia, vaikka kuvateksti lupasi Yusuf Balasagunin
 * mausoleumia Kašgarissa. Malli ei tuntenut kohdetta ja täytti aukon
 * alueen arkkityypillä. Commonsissa kohteesta on kuitenkin kahdeksan
 * vapaata valokuvaa — aitoa dataa oli, generaattori ei vain nähnyt
 * sitä. Tämä työkalu hakee sen datan ja antaa sen ajurille, joka
 * lähettää kuvat pöllö-workerille viitteiksi.
 *
 * Lähteet järjestyksessä:
 *   1. Wikimedia Commons (commons.wikimedia.org/w/api.php)
 *   2. Openverse (api.openverse.org/v1/images/) — vain jos Commons
 *      ei tuottanut riittävästi.
 *
 * MIKSI USEITA VIITTEITÄ EIKÄ YHTÄ (päätoimittajan linjaus
 * 23.8.2026 — ÄLÄ "optimoi" tätä yhteen kuvaan):
 *   - LAATU: monesta eri kuvaajan ja eri kuvakulman valokuvasta malli
 *     oppii rakennuksen GEOMETRIAN. Yhdestä kuvasta se oppii vain sen
 *     yhden ruudun ja alkaa toistaa sitä.
 *   - OIKEUDET: rakennuksen muoto ei ole valokuvaajan omaisuutta,
 *     mutta yksittäinen valokuva on. Useasta eri kuvaajan kuvasta
 *     koottu geometria on kohteen kuvaus, ei yhden teoksen jäljennös.
 * Siksi valinta suosii nimenomaan eri kuvaajia ja eri kuvakulmia,
 * eikä yhtä viitettä pidetä koskaan riittävänä (ks. generointiportti).
 *
 * LISENSSISUODATIN (perustuslain pilari 2, omistajan linjaus
 * 23.8.2026): vain PD, CC0, CC BY ja CC BY-SA. EI NC, EI ND, EI
 * tuntematonta lisenssiä. Suodatin on sallittujen lista, ei
 * kiellettyjen: tunnistamaton lisenssiteksti hylätään. Omistaja kysyi
 * erikseen, voisiko viitteinä käyttää lisensoimattomia kuvia parhaan
 * laadun saamiseksi — vastaus oli ei, eikä sellaista polkua rakenneta.
 * Jokaisesta kuvasta kirjataan tekijä, lisenssi ja lähdesivu.
 *
 * NYKYKUVAT ENSIN (omistaja 23.8.2026: "tarvitaan lähinnä uusia
 * kuvia"): historiallinen kaiverrus tai 1800-luvun valokuva viitteenä
 * tuottaa kuvan, joka näyttää väärältä aikakaudelta. Valinta suosii
 * siis tuoreita valokuvia ja pudottaa vanhat viimeisiksi.
 *
 * KOKOSUODATIN: alkuperäisen kuvan pidemmän sivun on oltava
 * vähintään 1000 px. Itse viite ladataan pienennettynä (oletus
 * 1024 px leveä pikkukuva), koska viitteen tehtävä on näyttää
 * mallille kohteen muoto ja värit, ei siirtää 4048 px:n originaalia
 * verkon yli.
 *
 * Käyttö komentoriviltä:
 *   NODE_USE_ENV_PROXY=1 node tools/hae-viitekuvat.mjs \
 *     "Yusuf Balasaguni mausoleum" "Kashgar" [maara]
 *   ... [--json tiedosto.json]   tallentaa myös base64-kuvat
 *
 * Käyttö moduulina:
 *   import { haeViitekuvat } from './hae-viitekuvat.mjs';
 *   const { maara, kuvat } = await haeViitekuvat('...', 'Kashgar');
 *
 * Palautuksen `maara` on generointiportin mittari: ajuri kieltäytyy
 * generoimasta tarkkaa kohdetta, jos kelvollisia viitteitä on alle
 * kaksi (ks. tools/hero-ajuri.mjs ja docs/moduulit/viitekuvat.md).
 */

const AGENTTI = 'Matkakirja/1.0 (https://github.com/ravelius/Matkakirja)';
const COMMONS = 'https://commons.wikimedia.org/w/api.php';
const OPENVERSE = 'https://api.openverse.org/v1/images/';

/** Alkuperäisen kuvan pidemmän sivun vähimmäismitta. */
export const VAHIMMAISLEVEYS = 1000;
/** Pikkukuvan leveys, jona viite ladataan ja lähetetään eteenpäin. */
export const VIITTEEN_LEVEYS = 1024;
/*
 * Enintään neljä viitettä yhtä generointia kohti. OpenAI:n
 * /v1/images/edits hyväksyy GPT-kuvamalleilla jopa 16 kuvaa, mutta
 * neljä riittää kohteen muodon lukitsemiseen ja pitää pyynnön
 * kevyenä (ks. tools/pollo/worker.js, hoidaKuva).
 */
export const VIITTEITA_ENINTAAN = 4;
/*
 * Yhden viitteen kokokatto tavuina. OpenAI:n raja on 50 MB per kuva,
 * mutta 1024 px:n pikkukuva on satoja kilotavuja; kaikki tätä
 * suurempi on merkki siitä, että jotain meni pieleen.
 */
export const VIITTEEN_KOKOKATTO = 8 * 1024 * 1024;

/* ------------------------------------------------------------------ */
/* Lisenssisuodatin                                                     */
/* ------------------------------------------------------------------ */

/*
 * Kelpaako lisenssi? Syötteeksi kelpaa sekä Commonsin koneellinen
 * tunnus ("cc-by-sa-4.0", "pd", "cc0") että ihmisluettava nimi
 * ("CC BY-SA 4.0", "Public domain"). NC ja ND hylätään aina —
 * peli on avoin ja sen kuvia muokataan, joten kumpikaan ehto ei käy.
 */
export function lisenssiKelpaa(...ehdokkaat) {
  const t = ehdokkaat
    .map((e) => String(e ?? '').toLowerCase().trim().replace(/\s+/g, '-'))
    .find(Boolean);
  if (!t) return false;
  // Kaupallinen käyttö tai muokkaus kielletty → ei käy.
  if (/(^|[-_])(nc|nd)([-_]|$)|noncommercial|no-?deriv/.test(t)) return false;
  if (/fair-?use|non-?free|gfdl-?only|copyright/.test(t)) return false;
  return /^cc0/.test(t)
    || /^cc-by(-sa)?([-_]\d|$)/.test(t)
    || /^pd([-_]|$)/.test(t)
    || /public-domain|pdm|^cc-pd/.test(t);
}

/* ------------------------------------------------------------------ */
/* Apurit                                                               */
/* ------------------------------------------------------------------ */

const puhdista = (html) => String(html ?? '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&[a-z]+;/gi, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const odota = (ms) => new Promise((s) => { setTimeout(s, ms); });

/*
 * Rajapintakutsu, joka kunnioittaa palvelimen omaa Retry-Afteria.
 * Commons rajoittaa jaettua ulosmenevää osoitetta herkästi, ja
 * eräajossa se osuu — luovuttaminen ensimmäiseen 429:ään näyttäisi
 * siltä kuin kohteesta ei olisi kuvia, mikä on juuri se virhe, jota
 * tämä työkalu on tekemässä mahdottomaksi.
 */
async function haeJson(url) {
  let v;
  for (let y = 0; y < 5; y += 1) {
    v = await fetch(url, { headers: { 'user-agent': AGENTTI, accept: 'application/json' } });
    if (v.ok) break;
    if (v.status !== 429 && v.status < 500) break;
    const pyydetty = Number(v.headers.get('retry-after')) || 0;
    await odota(Math.min(Math.max(pyydetty * 1000, 2000 * (y + 1)), 20000));
  }
  if (!v.ok) throw new Error(`HTTP ${v.status}`);
  return v.json();
}

/*
 * Pikkukuvan lataus. Commons vastaa 429:llä (Retry-After: 10), jos
 * samasta kohteesta pyytää monta vielä renderöimätöntä pikkukuvaa
 * peräkkäin. Odotetaan siis se aika, jonka palvelin itse pyytää —
 * viisi yritystä riittää neljän viitteen noutamiseen.
 */
async function haeTavut(url) {
  let v;
  for (let y = 0; y < 5; y += 1) {
    v = await fetch(url, { headers: { 'user-agent': AGENTTI } });
    if (v.ok) break;
    if (v.status !== 429 && v.status < 500) break;
    const pyydetty = Number(v.headers.get('retry-after')) || 0;
    await odota(Math.min(Math.max(pyydetty * 1000, 2000 * (y + 1)), 20000));
  }
  if (!v.ok) throw new Error(`HTTP ${v.status}`);
  const puskuri = Buffer.from(await v.arrayBuffer());
  if (puskuri.length > VIITTEEN_KOKOKATTO) {
    throw new Error(`liian iso (${puskuri.length} tavua)`);
  }
  const tyyppi = (v.headers.get('content-type') || '').split(';')[0].trim();
  return { puskuri, tyyppi: /^image\//.test(tyyppi) ? tyyppi : 'image/jpeg' };
}

/*
 * Karsii lähes samat kuvat: "Foo grapevines.jpg" ja
 * "Foo grapevines 2.jpg" ovat sama näkymä, eikä kaksi identtistä
 * viitettä opeta mallille mitään lisää.
 */
function perusnimi(nimi) {
  return String(nimi)
    .replace(/^File:/i, '')
    .replace(/\.(jpe?g|png|webp|tiff?)$/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+\d+\s*$/, '')
    .trim();
}

/*
 * Kuvausvuosi metatiedoista. Commons antaa DateTimeOriginalin
 * vaihtelevassa muodossa ("2019-05-04", "4 May 2019", "circa 1890"),
 * joten poimitaan pelkkä neljän numeron vuosiluku.
 */
function vuosi(teksti) {
  const osuma = String(teksti ?? '').match(/\b(1[5-9]\d\d|20\d\d|21\d\d)\b/);
  return osuma ? Number(osuma[1]) : null;
}

/*
 * Vanha kuvasto ja piirrokset pois: kaiverrus, litografia,
 * postikortti tai 1800-luvun valokuva ei kelpaa viitteeksi, koska
 * generoitu kuva alkaisi näyttää väärältä aikakaudelta. Nimi ja
 * kuvaus kertovat tämän luotettavammin kuin mikään metatietokenttä.
 */
const VANHA_KUVASTO = /engraving|lithograph|etching|woodcut|drawing|painting|postcard|illustration|piirros|kaiverrus|historical photo|antique/i;

/*
 * Sisätilat ja yksityiskohdat jäävät jälkeen: hero on ulkokuva, ja
 * museon porraskäytävä ei kerro rakennuksen hahmosta mitään. Nämä
 * kelpaavat yhä viimeisenä täytteenä, jos ulkokuvia ei ole tarpeeksi.
 */
const SISATILA = /interior|sisäkuv|sisätil|sisänäkym|portaik|staircase|stairway|ceiling|kerros|aula|lobby|hylly|shelf|lukupaikk|näyttely|exhibition|kattomaalaus|salonki|lukusali|reading room|yksityiskoht|detail|plaque|kyltti|opaste/i;

/*
 * Paremmuusjärjestys järjestysavaimena: taulukko vertaillaan alkio
 * kerrallaan, joten ensimmäinen ehto ratkaisee aina ennen seuraavaa.
 * Järjestys tärkeimmästä alkaen:
 *
 *   1. SUOSITTU KUVAKULMA — työlistan `viitesuosi`. Käytetään, kun
 *      kuvakulma on osa tilausta: Näsinneulan YLÄOSAN muoto välittyy
 *      vain lähikuvasta, ei kaukaisesta siluetista.
 *   2. NYKYKUVA — vuodesta 2000 eteenpäin (2), tuntematon vuosi (1;
 *      Commonsin tuoreista kännykkäkuvista metatieto usein puuttuu),
 *      selvästi vanha viimeisenä (0).
 *   3. EI VANHAA KUVASTOA — kaiverrus tai litografia ei ankkuroi
 *      nykyistä rakennusta.
 *   4. EI SISÄTILAA — hero on ulkokuva; museon porraskäytävä ei
 *      kerro rakennuksen hahmosta mitään.
 *   5. KOHDEOSUMA — tiedostonimessä tai kuvauksessa on kohteen omat
 *      tunnussanat. Kategoriassa on myös aukion yleiskuvia ja
 *      kuvia, jotka on otettu kohteesta POISPÄIN; niiden nimessä
 *      kohde ei esiinny.
 *   6. EI PANORAAMA — leveä kuvakudos näyttää koko torin, ei
 *      rakennusta.
 *   7. VAAKAKUVA — herot ovat vaakakuvia; pystykuva kelpaa yhä
 *      viitteeksi, se vain kertoo vähemmän kokonaishahmosta.
 *   8. TARKKUUS.
 */
function jarjestysavain(k, suosi = [], tunnussanat = []) {
  const heina = `${k.nimi} ${k.kuvaus ?? ''}`.toLowerCase();
  // `viitesuosi` verrataan VAIN tiedostonimeen. Kuvaustekstissä
  // mainitaan lähes joka kuvassa, että kohde on "observation tower"
  // ja että siinä on ravintola, joten kuvausta vasten sovitettuna
  // suositus osuisi kaikkeen eikä erottelisi mitään.
  const nimiPelkka = String(k.nimi).toLowerCase();
  const v = k.vuosi;
  const suhde = k.korkeus ? k.leveys / k.korkeus : 1;
  const osumia = tunnussanat.filter((s) => heina.includes(s)).length;
  return [
    suosi.length && suosi.some((s) => nimiPelkka.includes(s)) ? 1 : 0,
    v === null ? 1 : (v >= 2000 ? 2 : 0),
    VANHA_KUVASTO.test(heina) ? 0 : 1,
    SISATILA.test(heina) ? 0 : 1,
    tunnussanat.length === 0 ? 1 : (osumia === tunnussanat.length ? 2 : (osumia ? 1 : 0)),
    suhde > 2.0 ? 0 : 1,
    k.leveys >= k.korkeus ? 1 : 0,
    k.leveys * k.korkeus,
  ];
}

/** Järjestysavaimien vertailu: suurempi avain ensin. */
function vertaa(a, b) {
  for (let i = 0; i < a.length; i += 1) if (a[i] !== b[i]) return b[i] - a[i];
  return 0;
}

/** Tekijän normalisointi, jotta saman kuvaajan sarja tunnistetaan. */
const tekijaAvain = (t) => String(t ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 24) || 'tuntematon';

/* ------------------------------------------------------------------ */
/* Lähde 1: Wikimedia Commons                                           */
/* ------------------------------------------------------------------ */

const IIPROP = '&prop=imageinfo&iiprop=url|size|extmetadata'
  + `&iiurlwidth=${VIITTEEN_LEVEYS}`;

/** Yksi imageinfo-sivu → viitetietue, tai null jos se ei kelpaa. */
function tietue(s) {
  const ii = s.imageinfo?.[0];
  if (!ii) return null;
  const em = ii.extmetadata ?? {};
  const tunnus = em.License?.value ?? '';
  const nimi = puhdista(em.LicenseShortName?.value);
  if (!lisenssiKelpaa(tunnus, nimi)) return null;
  if (Math.max(ii.width ?? 0, ii.height ?? 0) < VAHIMMAISLEVEYS) return null;
  // Vain valokuvamuodot: SVG-vaakunat ja piirrokset eivät ankkuroi mitään.
  if (!/\.(jpe?g|png|webp)$/i.test(s.title)) return null;
  return {
    lahde: 'commons',
    nimi: s.title,
    tekija: puhdista(em.Artist?.value) || 'tuntematon',
    lisenssi: nimi || tunnus || 'tuntematon',
    kuvaus: puhdista(em.ImageDescription?.value).slice(0, 200),
    vuosi: vuosi(em.DateTimeOriginal?.value) ?? vuosi(em.DateTime?.value),
    leveys: ii.width ?? 0,
    korkeus: ii.height ?? 0,
    sivu: ii.descriptionurl ?? `https://commons.wikimedia.org/wiki/${encodeURIComponent(s.title)}`,
    lataus: ii.thumburl ?? ii.url,
  };
}

/*
 * KOHTEEN OMA COMMONS-KATEGORIA — ENSISIJAINEN REITTI
 * (päätoimittajan linjaus 23.8.2026, Tampereen testiajon löydös).
 *
 * Vapaa tekstihaku tuottaa itsevarmasti vääriä viitteitä: hakusana
 * "Old Church of Tampere" palautti pääosin MESSUKYLÄN vanhan kirkon,
 * keskiaikaisen kivikirkon kaupungin laidalta — ei Carlo Bassin
 * puista Vanhaa kirkkoa keskustassa. Väärä viite on PAHEMPI kuin ei
 * viitettä lainkaan: se ankkuroi generoinnin väärään rakennukseen ja
 * tekee virheestä vakuuttavamman.
 *
 * Kategoria on ihmisen kuratoima, joten se osoittaa kohteeseen eikä
 * samannimiseen naapuriin. Reitti: en-Wikipedian otsikko →
 * Wikidata-entiteetti (sites=enwiki) → Commons-kategoria joko
 * sitelinkistä commonswiki tai ominaisuudesta P373.
 */
async function haeKategoria(wikiOtsikko) {
  const url = 'https://www.wikidata.org/w/api.php?action=wbgetentities&format=json'
    + `&sites=enwiki&titles=${encodeURIComponent(wikiOtsikko)}`
    + '&props=claims|sitelinks&languages=en';
  const d = await haeJson(url);
  const e = Object.values(d?.entities ?? {})[0];
  if (!e || e.missing !== undefined) return null;
  const sitelink = e.sitelinks?.commonswiki?.title;
  if (sitelink && /^Category:/i.test(sitelink)) return sitelink;
  const p373 = e.claims?.P373?.[0]?.mainsnak?.datavalue?.value;
  if (p373) return `Category:${p373}`;
  return null;
}

/** Kategorian tiedostot (yksi taso). */
async function etsiKategoriasta(kategoria, raja = 60) {
  const url = `${COMMONS}?action=query&format=json&origin=*`
    + `&generator=categorymembers&gcmtitle=${encodeURIComponent(kategoria)}`
    + `&gcmtype=file&gcmlimit=${raja}${IIPROP}`;
  const d = await haeJson(url);
  if (d?.error) return [];
  return Object.values(d?.query?.pages ?? {}).map(tietue).filter(Boolean);
}

/** Kategorian alakategoriat, jotta yhden tason syvennys onnistuu. */
async function alakategoriat(kategoria, raja = 10) {
  const url = `${COMMONS}?action=query&format=json&origin=*&list=categorymembers`
    + `&cmtitle=${encodeURIComponent(kategoria)}&cmtype=subcat&cmlimit=${raja}`;
  const d = await haeJson(url);
  return (d?.query?.categorymembers ?? []).map((c) => c.title);
}

/*
 * TEKSTIHAKU — VARAREITTI, JOKA TARKISTAA TULOKSENSA.
 *
 * Käytetään vain jos kategoriaa ei ole. Jokainen osuma varmennetaan:
 * tiedostonimen, kuvauksen tai kuvatekstin on sisällettävä kohteen
 * KAIKKI erottelevat sanat. Hylätyt kirjataan, jotta ajaja näkee
 * mitä haku yritti tarjota.
 */
const TAYTESANAT = new Set(['the', 'of', 'in', 'at', 'and', 'a', 'an', 'de', 'la', 'el']);

function erottelevatSanat(...osat) {
  const sanat = osat.join(' ').toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .split(' ')
    .filter((s) => s.length >= 3 && !TAYTESANAT.has(s));
  return [...new Set(sanat)];
}

function vastaakoKohdetta(k, sanat) {
  const heina = `${k.nimi} ${k.kuvaus ?? ''}`.toLowerCase();
  return sanat.every((s) => heina.includes(s));
}

async function etsiCommons(kysely, raja = 20) {
  const url = `${COMMONS}?action=query&format=json&origin=*`
    + `&generator=search&gsrsearch=${encodeURIComponent(kysely)}`
    + `&gsrnamespace=6&gsrlimit=${raja}${IIPROP}`;
  const d = await haeJson(url);
  return Object.values(d?.query?.pages ?? {}).map(tietue).filter(Boolean);
}

/* ------------------------------------------------------------------ */
/* Lähde 2: Openverse                                                   */
/* ------------------------------------------------------------------ */

async function etsiOpenverse(kysely, raja = 20) {
  // license_type=commercial,modification sulkee NC:n ja ND:n jo
  // rajapinnan päässä; lisenssi tarkistetaan silti vielä itse.
  const url = `${OPENVERSE}?q=${encodeURIComponent(kysely)}`
    + `&license_type=commercial,modification&size=large&page_size=${raja}`;
  const d = await haeJson(url);
  const ulos = [];
  for (const r of d?.results ?? []) {
    if (!lisenssiKelpaa(r.license, r.license_version ? `${r.license}-${r.license_version}` : '')) continue;
    if (Math.max(r.width ?? 0, r.height ?? 0) < VAHIMMAISLEVEYS) continue;
    ulos.push({
      lahde: 'openverse',
      nimi: r.title ?? r.id,
      tekija: r.creator || 'tuntematon',
      lisenssi: `${String(r.license).toUpperCase()}${r.license_version ? ` ${r.license_version}` : ''}`,
      kuvaus: String(r.description ?? '').slice(0, 200),
      vuosi: vuosi(r.date_taken) ?? vuosi(r.created_on),
      leveys: r.width ?? 0,
      korkeus: r.height ?? 0,
      sivu: r.foreign_landing_url ?? r.url,
      lataus: r.thumbnail ?? r.url,
    });
  }
  return ulos;
}

/* ------------------------------------------------------------------ */
/* Julkinen rajapinta                                                   */
/* ------------------------------------------------------------------ */

/**
 * Hakee kohteesta 2–4 parasta aitoa valokuvaa base64-muodossa.
 *
 * @param {string} kohde   kohteen nimi, esim. 'Yusuf Balasaguni mausoleum'
 * @param {string} [kaupunki] kaupunki tarkennukseksi, esim. 'Kashgar'
 * @param {object} [asetukset]
 *   wiki       — en-Wikipedian otsikko, esim. 'Tampere Old Church'.
 *                ENSISIJAINEN: siitä saadaan kohteen oma
 *                Commons-kategoria, eikä haku voi ajautua
 *                samannimiseen naapuriin.
 *   kategoria  — Commons-kategoria suoraan ('Category:...'), jos
 *                työlista tietää sen. Ohittaa wiki-haun.
 *   suosi      — sanoja, joita sisältävät kuvat nostetaan kärkeen
 *                (esim. ['observation', 'deck'] Näsinneulan yläosalle).
 *   maara      — enintään näin monta viitettä (katto VIITTEITA_ENINTAAN)
 *   lataa      — false palauttaa pelkät tiedot ilman base64-latausta
 * @returns {Promise<{maara: number, kuvat: object[], kyselyt: string[],
 *   varmuus: 'kategoria'|'tekstihaku'|'epavarma', kategoria: ?string,
 *   hylatyt: object[]}>}
 *   `maara` on kelvollisten (lisenssi + koko) kuvien lukumäärä ENNEN
 *   parhaiden valintaa — se on generointiportin mittari.
 *   `varmuus` kertoo, mistä kuvat tulivat: 'kategoria' on kohteen oma
 *   kuratoitu kategoria, 'tekstihaku' varmennettu vapaa haku ja
 *   'epavarma' se, ettei kohdetta saatu tunnistettua lainkaan.
 */
export async function haeViitekuvat(kohde, kaupunki = '', asetukset = {}) {
  const maara = Math.min(asetukset.maara ?? VIITTEITA_ENINTAAN, VIITTEITA_ENINTAAN);
  const lataa = asetukset.lataa !== false;
  const suosi = (asetukset.suosi ?? []).map((s) => String(s).toLowerCase());
  const kyselyt = [];
  const hylatyt = [];
  const loydot = new Map();
  let varmuus = 'epavarma';
  let kategoria = null;

  const lisaa = (lista) => {
    for (const k of lista) if (!loydot.has(k.sivu)) loydot.set(k.sivu, k);
  };

  /* --- 1. Kohteen oma Commons-kategoria (ensisijainen) ------------- */
  if (asetukset.kategoria) {
    kategoria = String(asetukset.kategoria).replace(/^(Category:)?/i, 'Category:');
  } else if (asetukset.wiki) {
    kyselyt.push(`wikidata: ${asetukset.wiki}`);
    try { kategoria = await haeKategoria(asetukset.wiki); } catch (e) {
      console.error(`kategorian haku "${asetukset.wiki}" epäonnistui:`, e.message);
    }
  }
  if (kategoria) {
    kyselyt.push(`commons-kategoria: ${kategoria}`);
    try { lisaa(await etsiKategoriasta(kategoria)); } catch (e) {
      console.error(`kategoriahaku "${kategoria}" epäonnistui:`, e.message);
    }
    // Yksi taso alaspäin, jos kategoria itse on lähes tyhjä
    // (isot kohteet on usein jaettu "... interior", "... at night").
    if (loydot.size < maara) {
      try {
        for (const alakat of (await alakategoriat(kategoria)).slice(0, 4)) {
          if (loydot.size >= maara * 2) break;
          kyselyt.push(`commons-alakategoria: ${alakat}`);
          lisaa(await etsiKategoriasta(alakat, 40));
        }
      } catch (e) {
        console.error('alakategorioiden haku epäonnistui:', e.message);
      }
    }
    if (loydot.size) varmuus = 'kategoria';
  }

  /* --- 2. Varareitti: varmennettu tekstihaku ----------------------- */
  if (!loydot.size) {
    // Erottelevat sanat kohteen nimestä JA kaupungista: osuman on
    // sisällettävä ne kaikki, muuten se ei ole tämä kohde.
    const sanat = erottelevatSanat(kohde, kaupunki);
    const commonsKyselyt = kaupunki ? [`${kohde} ${kaupunki}`, kohde] : [kohde];
    for (const q of commonsKyselyt) {
      if (loydot.size >= maara * 2) break;
      kyselyt.push(`commons-tekstihaku: ${q}`);
      try {
        for (const k of await etsiCommons(q)) {
          if (vastaakoKohdetta(k, sanat)) lisaa([k]);
          else hylatyt.push({ nimi: k.nimi, syy: 'ei vastaa kohteen nimeä' });
        }
      } catch (e) {
        console.error(`commons-haku "${q}" epäonnistui:`, e.message);
      }
    }
    // Openverse vain täydentäjänä, sama varmennus.
    if (loydot.size < maara) {
      const q = kaupunki ? `${kohde} ${kaupunki}` : kohde;
      kyselyt.push(`openverse: ${q}`);
      try {
        for (const k of await etsiOpenverse(q)) {
          if (vastaakoKohdetta(k, sanat)) lisaa([k]);
          else hylatyt.push({ nimi: k.nimi, syy: 'ei vastaa kohteen nimeä' });
        }
      } catch (e) {
        console.error(`openverse-haku "${q}" epäonnistui:`, e.message);
      }
    }
    if (loydot.size) varmuus = 'tekstihaku';
  }

  /*
   * Kohteen tunnussanat: kohteen nimestä, wiki-otsikosta ja
   * kategoriasta, mutta ILMAN kaupungin nimeä — pelkkä "Tampere"
   * tiedostonimessä ei kerro, että kuvassa on juuri tämä rakennus.
   */
  const kaupunkiSanat = new Set(erottelevatSanat(kaupunki));
  const tunnussanat = erottelevatSanat(
    kohde,
    asetukset.wiki ?? '',
    String(kategoria ?? '').replace(/^Category:/i, ''),
  ).filter((s) => !kaupunkiSanat.has(s));

  const kelvolliset = [...loydot.values()]
    .map((k) => ({ k, avain: jarjestysavain(k, suosi, tunnussanat) }))
    .sort((a, b) => vertaa(a.avain, b.avain))
    .map((x) => x.k);

  /*
   * Parhaat viitteet: ERI KUVAAJIA ja ERI KUVAKULMIA, ei yhden
   * kuvaajan sarjaa. Ensimmäisellä kierroksella otetaan kultakin
   * tekijältä vain yksi kuva; jos katto ei täyty, toisella
   * kierroksella täydennetään saman tekijän muilla kuvilla —
   * kaksi kuvakulmaa samalta kuvaajalta on yhä parempi viite kuin
   * yksi ainoa kuva.
   */
  const nahdyt = new Set();
  const tekijat = new Set();
  const valitut = [];
  const poimi = (vainUusiTekija) => {
    for (const k of kelvolliset) {
      if (valitut.length >= maara) return;
      const avain = perusnimi(k.nimi);
      if (nahdyt.has(avain)) continue;
      const tek = tekijaAvain(k.tekija);
      if (vainUusiTekija && tekijat.has(tek)) continue;
      nahdyt.add(avain);
      tekijat.add(tek);
      valitut.push(k);
    }
  };
  poimi(true);
  poimi(false);

  const kuvat = [];
  for (const k of valitut) {
    if (!lataa) { kuvat.push({ ...k }); continue; }
    try {
      const { puskuri, tyyppi } = await haeTavut(k.lataus);
      kuvat.push({ ...k, mime: tyyppi, tavut: puskuri.length, b64: puskuri.toString('base64') });
    } catch (e) {
      console.error(`lataus epäonnistui (${k.nimi}):`, e.message);
    }
    // Pieni tauko: peräkkäiset pikkukuvapyynnöt samasta kohteesta
    // laukaisevat Commonsin renderöintirajoituksen.
    await odota(1200);
  }

  return { maara: kelvolliset.length, kuvat, kyselyt, varmuus, kategoria, hylatyt };
}

/* ------------------------------------------------------------------ */
/* Komentorivi                                                          */
/* ------------------------------------------------------------------ */

// Ajetaanko tämä tiedosto suoraan vai onko se tuotu moduulina
// (hero-ajuri.mjs)? Vain suora ajo tulostaa mitään.
const { pathToFileURL } = await import('node:url');
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const argv = process.argv.slice(2);
  const lippu = (nimi) => {
    const i = argv.indexOf(nimi);
    return i >= 0 ? argv[i + 1] : null;
  };
  const jsonPolku = lippu('--json');
  const wiki = lippu('--wiki');
  const kat = lippu('--kategoria');
  const suosi = (lippu('--suosi') ?? '').split(',').map((s) => s.trim()).filter(Boolean);
  const vapaat = [];
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i].startsWith('--')) { i += 1; continue; }
    vapaat.push(argv[i]);
  }
  const [kohde, kaupunki, n] = vapaat;
  if (!kohde && !wiki && !kat) {
    console.log('käyttö: node hae-viitekuvat.mjs "<kohde>" [kaupunki] [maara]'
      + '\n        [--wiki "<en-Wikipedian otsikko>"] [--kategoria "Category:..."]'
      + '\n        [--suosi sana,sana] [--json tiedosto]');
    process.exit(1);
  }
  const tulos = await haeViitekuvat(kohde ?? wiki ?? '', kaupunki ?? '', {
    wiki: wiki ?? undefined,
    kategoria: kat ?? undefined,
    suosi,
    maara: n ? Number(n) : VIITTEITA_ENINTAAN,
    lataa: true,
  });
  console.log(`# kohde: ${kohde ?? wiki}${kaupunki ? ` (${kaupunki})` : ''}`);
  console.log(`# kyselyt: ${tulos.kyselyt.join(' | ')}`);
  console.log(`# TUNNISTUS: ${tulos.varmuus}${tulos.kategoria ? ` (${tulos.kategoria})` : ''}`);
  console.log(`# KELVOLLISIA VIITEKUVIA: ${tulos.maara}`);
  console.log(`# ladattu viitteeksi: ${tulos.kuvat.length}`);
  console.log(`# eri kuvaajia viitteissä: ${new Set(tulos.kuvat.map((k) => k.tekija)).size}`);
  for (const k of tulos.kuvat) {
    console.log(`- ${k.nimi} | ${k.leveys}x${k.korkeus} | ${k.vuosi ?? 'vuosi ?'} | ${k.lisenssi} | ${k.tekija}`);
    console.log(`  ${k.sivu}`);
    if (k.b64) console.log(`  viite ${k.tavut} tavua (${k.mime})`);
  }
  if (tulos.hylatyt.length) {
    console.log(`# hylätty tunnistuksessa: ${tulos.hylatyt.length}`);
    for (const h of tulos.hylatyt.slice(0, 10)) console.log(`  x ${h.nimi} — ${h.syy}`);
  }
  if (jsonPolku) {
    const { writeFileSync } = await import('node:fs');
    writeFileSync(jsonPolku, JSON.stringify(tulos, null, 1));
    console.log(`# kirjoitettu ${jsonPolku}`);
  }
}
