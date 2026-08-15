// "Lue lisää": Wikipedian tiivistelmä nykyisestä sijainnista.
//
// Rajapinta on Wikipedian REST-summary, jota selain voi kutsua suoraan ilman
// avainta. Suomenkielinen artikkeli on ensisijainen; jos sitä ei ole, se on
// täsmennyssivu tai tiivistelmä jää lyhyeksi, kokeillaan englantia.
//
// Lisenssi: Wikipedian teksti on CC BY-SA, joten maininta ja linkki
// artikkeliin ovat pakollisia myös kaupallisessa käytössä. Ne kuuluvat
// dialogin alareunaan aina, myös silloin kun kuvaa ei ole.

export const WIKI_LANGS = ['fi', 'en'];
// Tätä lyhyempi tiivistelmä on käytännössä tynkä: kokeillaan toista kieltä.
export const MIN_EXTRACT = 200;

/** REST-summaryn osoite. Otsikko koodataan, koska siinä voi olla välilyöntejä. */
export function summaryUrl(lang, title) {
  return `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
}

/**
 * Poimii pelin tarvitsemat kentät REST-vastauksesta. Palauttaa null, jos
 * vastaus ei kelpaa: puuttuva sivu, täsmennyssivu tai tyhjä tiivistelmä.
 * Erotettu omaksi funktiokseen, jotta virhepolut voi testata ilman verkkoa.
 */
export function parseSummary(data, lang) {
  if (!data || typeof data !== 'object') return null;
  if (data.type === 'disambiguation') return null;
  const extract = typeof data.extract === 'string' ? data.extract.trim() : '';
  if (!extract) return null;
  return {
    lang,
    title: data.title ?? '',
    extract,
    image: data.thumbnail?.source ?? null,
    // Sivun ihmisluettava osoite lähdemainintaa varten.
    url: data.content_urls?.desktop?.page
      ?? `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(data.title ?? '')}`,
  };
}

/**
 * Hakee tiivistelmän: suomi ensin, sitten englanti. Lyhyt suomenkielinen
 * tiivistelmä hyväksytään vasta, jos englanniksikaan ei löydy parempaa —
 * lyhyt on silti parempi kuin ei mitään.
 *
 * Ei koskaan heitä: peli ei saa jäädä jumiin siihen, ettei verkkoa ole.
 * Palauttaa null, kun mitään käyttökelpoista ei löytynyt.
 */
export async function fetchSummary(title, { fetchImpl = globalThis.fetch, langs = WIKI_LANGS } = {}) {
  if (!title || typeof fetchImpl !== 'function') return null;
  let vara = null;
  for (const lang of langs) {
    let osuma = null;
    try {
      const res = await fetchImpl(summaryUrl(lang, title));
      if (res && res.ok) osuma = parseSummary(await res.json(), lang);
    } catch {
      /* ei yhteyttä tai kelvoton vastaus — kokeillaan seuraavaa kieltä */
    }
    if (!osuma) continue;
    if (osuma.extract.length >= MIN_EXTRACT) return osuma;
    // Tynkä talteen siltä varalta, ettei parempaa löydy.
    vara = vara ?? osuma;
  }
  return vara;
}

/**
 * Koko artikkelin osoite: MediaWiki extracts pelkkänä tekstinä. Pelkkä
 * teksti on tarkoituksella — HTML:ää ei upoteta peliin, ja kapea teksti ei
 * voi aiheuttaa sivuttaisvieritystä. Väliotsikot tulevat muodossa
 * "== Otsikko ==", ja käyttöliittymä muotoilee ne itse.
 */
export function articleUrl(lang, title) {
  const params = new URLSearchParams({
    action: 'query',
    prop: 'extracts',
    explaintext: '1',
    redirects: '1',
    format: 'json',
    origin: '*',
    titles: title,
  });
  return `https://${lang}.wikipedia.org/w/api.php?${params}`;
}

/** Poimii artikkelitekstin extracts-vastauksesta. Null, jos sivua ei ole. */
export function parseArticle(data) {
  const pages = data?.query?.pages;
  if (!pages || typeof pages !== 'object') return null;
  const page = Object.values(pages)[0];
  const text = typeof page?.extract === 'string' ? page.extract.trim() : '';
  return text || null;
}

/**
 * Hakee koko artikkelin siltä kieleltä, jolta tiivistelmä löytyi.
 * Ei koskaan heitä — null tarkoittaa, että tiivistelmä saa jäädä.
 */
export async function fetchArticle(title, lang, { fetchImpl = globalThis.fetch } = {}) {
  if (!title || !lang || typeof fetchImpl !== 'function') return null;
  try {
    const res = await fetchImpl(articleUrl(lang, title));
    if (res && res.ok) return parseArticle(await res.json());
  } catch {
    /* ei yhteyttä — tiivistelmä riittää */
  }
  return null;
}

/** Artikkelin kuvalistan osoite (REST media-list). */
export function mediaListUrl(lang, title) {
  return `https://${lang}.wikipedia.org/api/rest_v1/page/media-list/${encodeURIComponent(title)}`;
}

/** Hakuosoite: paras artikkeliosuma vapaalle tekstille. */
export function searchUrl(lang, teksti) {
  const params = new URLSearchParams({
    action: 'query',
    list: 'search',
    srsearch: teksti,
    srlimit: '1',
    srnamespace: '0',
    format: 'json',
    origin: '*',
  });
  return `https://${lang}.wikipedia.org/w/api.php?${params}`;
}

/**
 * KUVALLINEN ARTIKKELI VAPAALLE AIHEELLE (pöllön vastauskuva,
 * omistajan tilaus 15.8.2026: "hakea aina yksi kuva per vastaus").
 *
 * Suora nimihaku ensin: pöllön käsite on usein täsmälleen artikkelin
 * nimi, ja REST-summary seuraa uudelleenohjaukset. Jos suora nimi ei
 * tuota kelvollista kuvaa — aihe on kysymyslause tai taivutusmuoto —
 * kysytään hakua parhaasta osumasta ja luetaan sen tiivistelmä.
 * Montaasit, kartat ja logot karsii sama BAD_IMAGE kuin muuallakin.
 *
 * Ei koskaan heitä; null tarkoittaa, ettei kuvallista artikkelia
 * löytynyt, ja se on kelvollinen vastaus.
 */
export async function haeKuvallinenArtikkeli(aihe, {
  fetchImpl = globalThis.fetch, langs = WIKI_LANGS,
} = {}) {
  const kelpaa = (s) => Boolean(s?.image && !BAD_IMAGE.test(s.image));
  const suora = await fetchSummary(aihe, { fetchImpl, langs });
  if (kelpaa(suora)) return suora;
  for (const lang of langs) {
    try {
      const res = await fetchImpl(searchUrl(lang, aihe));
      if (!res?.ok) continue;
      const osuma = (await res.json())?.query?.search?.[0]?.title;
      if (!osuma) continue;
      const s = await fetchSummary(osuma, { fetchImpl, langs: [lang] });
      if (kelpaa(s)) return s;
    } catch {
      /* ei yhteyttä — kokeillaan seuraavaa kieltä */
    }
  }
  return null;
}

/**
 * Kelvottomat kuvat: kaupunkiartikkelin pääkuva on usein monen kuvan
 * montaasi, joka pienessä kortissa näyttää köntältä. Myös liput, vaakunat,
 * kartat, logot ja svg-symbolit ohitetaan — yksi valokuva kertoo paikasta
 * enemmän kuin kuusi pientä.
 */
export const BAD_IMAGE = /montage|collage|kollaasi|mosaic|banner|coat|vaakuna|flag|lippu|locator|\bmap\b|kartta|logo|seal|icon|graph|diagram|chart|topography|density|evolution|\.svg$/i;

/** Poimii kuvalistasta ensimmäisen kelvollisen valokuvan osoitteen. */
export function pickImage(items) {
  for (const item of items ?? []) {
    if (item?.type !== 'image') continue;
    if (BAD_IMAGE.test(item.title ?? '')) continue;
    const srcset = item.srcset;
    const src = srcset?.[srcset.length - 1]?.src ?? srcset?.[0]?.src;
    if (src) return src.startsWith('//') ? `https:${src}` : src;
  }
  return null;
}

/**
 * Kaikki kelvolliset valokuvat kuvalistasta, enintään max kappaletta.
 * Palauttaa olioita { src, caption } — kuvateksti tulee artikkelista,
 * jos kuvalle on kirjoitettu sellainen.
 */
export function pickImages(items, max = 12) {
  const kuvat = [];
  for (const item of items ?? []) {
    if (item?.type !== 'image') continue;
    if (BAD_IMAGE.test(item.title ?? '')) continue;
    const srcset = item.srcset;
    const src = srcset?.[srcset.length - 1]?.src ?? srcset?.[0]?.src;
    if (!src) continue;
    kuvat.push({
      src: src.startsWith('//') ? `https:${src}` : src,
      caption: item.caption?.text?.trim() || null,
    });
    if (kuvat.length >= max) break;
  }
  return kuvat;
}

/**
 * Isompi versio Wikipedian pikkukuvasta: thumb-osoitteen leveys vaihdetaan
 * (/320px- → /1200px-). Jos osoite ei ole thumb-muotoa, se palautuu
 * sellaisenaan — ja jos alkuperäiskuva on pyydettyä pienempi, selain saa
 * virheen, jonka varalta katselin palaa pienempään osoitteeseen.
 */
/*
 * SUURENNUSPORTAAT — MITTATILAUSLEVEYS EI TOIMI.
 *
 * upload.wikimedia.org tarjoilee vain niitä pikkukuvakokoja, jotka
 * tiedostolle on jo kertaalleen tehty. Mitattu 6.8.2026 samasta
 * kuvasta (Segovia_-_01.jpg, alkuperäinen 3888 × 1944):
 *
 *     330 px  200      1280 px  200
 *     640 px  400      1600 px  400
 *     800 px  400      1920 px  200
 *    1024 px  400      2560 px  400
 *
 * Vanha oletus 1200 oli siis sellainen luku, joka EI ole olemassa:
 * suurennos epäonnistui ja katselin palasi 330 pikselin pikkukuvaan.
 * Juuri siksi kuvat näyttivät pieniltä.
 *
 * 1920 ja 1280 ovat vakiokokoja — nekin kaksi, jotka Wikipedian oma
 * rajapinta jakaa. Kokeiltu seitsemällä artikkelilla: molemmat
 * löytyivät joka kerta, ja 1920 on 10–25-kertainen tietomäärä
 * pikkukuvaan verrattuna. Portaat kuljetaan järjestyksessä ja
 * viimeisenä palataan alkuperäiseen osoitteeseen.
 */
export const SUURENNUSPORTAAT = [1920, 1280];

/**
 * Kuvaosoite portaittain suurimmasta pienimpään, viimeisenä annettu
 * osoite sellaisenaan. Kaksoiskappaleet karsitaan: jos osoitteessa ei
 * ole leveysmerkintää, kaikki portaat olisivat sama osoite.
 */
export function suurennusportaat(url, portaat = SUURENNUSPORTAAT) {
  if (typeof url !== 'string' || !url) return [];
  const kaikki = [...portaat.map((w) => upsizeImage(url, w)), url];
  return kaikki.filter((u, i) => kaikki.indexOf(u) === i);
}

export function upsizeImage(url, width = 1920) {
  if (typeof url !== 'string') return url;
  /*
   * LEVEYSMERKINNÄN EDESSÄ VOI OLLA ETULIITE.
   *
   * Vanha kuvio etsi `/330px-` eli vaati, että numero alkaa heti
   * kauttaviivan jälkeen. Wikipedia liittää kuitenkin osaan
   * pikkukuvista etuliitteen: kielikohtainen SVG-käännös on
   * `langfi-330px-…`, monisivuinen PDF `lossy-page1-1024px-…` ja
   * pakattu ääni `qlow-…`. Niissä vaihto ei osunut, ja kuva jäi
   * pikkukuvaksi ilman että mikään kertoi siitä — osoite palautui
   * sellaisenaan, joten haku onnistui ja ruudulla oli 330 pikseliä
   * (mitattu Madridin artikkelista 6.8.2026).
   *
   * Vaihto tehdään VAIN osoitteen viimeisessä osassa, koska
   * tiedostonimen keskellä voi olla samannäköinen jono ilman että se
   * on pikkukuvan leveys.
   */
  const raja = url.lastIndexOf('/');
  if (raja < 0) return url;
  const kansio = url.slice(0, raja + 1);
  const nimi = url.slice(raja + 1);
  /*
   * Etuliitteen on ALETTAVA KIRJAIMELLA. Ilman tätä `[a-z0-9-]+-`
   * söisi myös leveyden itsensä: osoitteesta `330px-500px-nimi.jpg`
   * vaihtui väärä luku (mitattu testissä `330px-1920px-nimi.jpg`).
   * Kirjainehto pakottaa vaihdon aina ENSIMMÄISEEN leveysmerkintään.
   */
  return kansio + nimi.replace(/^((?:[a-z][a-z0-9-]*-)?)\d+px-/i, `$1${width}px-`);
}

/**
 * Artikkelin kuvagalleria: kuvalistan kelvolliset valokuvat järjestyksessä.
 * Ei koskaan heitä; ilman yhteyttä palautuu tiivistelmän kuva tai tyhjä.
 */
export async function fetchImages(summary, { fetchImpl = globalThis.fetch, max = 12 } = {}) {
  if (!summary) return [];
  try {
    const res = await fetchImpl(mediaListUrl(summary.lang, summary.title));
    if (res && res.ok) {
      const kuvat = pickImages((await res.json()).items, max);
      if (kuvat.length) return kuvat;
    }
  } catch {
    /* ei yhteyttä — yksi kuva on parempi kuin ei yhtään */
  }
  return summary.image && !BAD_IMAGE.test(summary.image)
    ? [{ src: summary.image, caption: null }]
    : [];
}

/**
 * Paras kuva paikalle: tiivistelmän kuva sellaisenaan, jos se ei ole
 * montaasi; muuten artikkelin kuvalistasta ensimmäinen oikea valokuva.
 * Montaasi jää varakuvaksi, jos kuvalistaa ei saada haettua.
 */
export async function fetchImage(summary, { fetchImpl = globalThis.fetch } = {}) {
  if (!summary) return null;
  if (summary.image && !BAD_IMAGE.test(summary.image)) return summary.image;
  try {
    const res = await fetchImpl(mediaListUrl(summary.lang, summary.title));
    if (res && res.ok) {
      const img = pickImage((await res.json()).items);
      if (img) return img;
    }
  } catch {
    /* ei yhteyttä — montaasi on parempi kuin ei kuvaa */
  }
  return summary.image ?? null;
}
