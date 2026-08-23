/*
 * "LISÄÄ KUVIA TÄSTÄ KOHTEESTA" — avointen kokoelmien kuvagalleria
 * (omistajan tilaus 23.8.2026, laajennettu samana päivänä: "rakenna
 * vain lisälähde kuville peliin niin että lisää kuvia avautuu kattaen
 * kaiken mahdollisen").
 *
 * MIKSI. Lehden kuvat ovat kuratoituja: jokainen on katsottu, rajattu
 * ja kuvatekstitetty. Vähän valokuvatuissa kohteissa niitä on kaksi tai
 * kolme, eikä lisää synny käskemällä. Tämä galleria on eri asia — se on
 * ikkuna suoraan avoimiin kokoelmiin: kuvia on paljon, mutta niitä ei
 * ole valittu lehteen. Siksi galleria myös NÄYTTÄÄ erilaiselta (oma
 * tumma kontaktiarkki, ei paperinvalkoinen palsta) ja sanoo sen ääneen
 * omalla sivullaan.
 *
 * ── LÄHTEET JA SE, MIKÄ NIISTÄ TOIMII SELAIMESTA ────────────────────
 * Kaikki mitattu 23.8.2026 oikeilla kutsuilla. Ratkaiseva ehto on, että
 * kutsu onnistuu SELAIMESTA ilman avainta: CORS-otsake paikallaan eikä
 * välipalvelinta. Avainta vaativa rajapinta ei voi tulla mukaan, koska
 * API-avaimia ei viedä repoon (Raamattu: Kuvat ja lähteet).
 *
 * MUKANA (ei avainta, CORS kunnossa):
 *   Wikimedia Commons, kohteen oma kategoria  origin=* → ACAO *
 *   Wikimedia Commons, geohaku koordinaateilla origin=* → ACAO *
 *   Wikimedia Commons, vapaa tiedostohaku      origin=* → ACAO *  (vara)
 *   Openverse  api.openverse.org/v1/images/    ACAO * (Origin-otsakkeella)
 *   Library of Congress  loc.gov/photos/?fo=json  ACAO *
 *   Cleveland Museum of Art  openaccess-api.clevelandart.org  ACAO *
 *   Art Institute of Chicago  api.artic.edu     ACAO *
 *
 * POIS JÄTETYT (syy mitattu, ks. myös POIS_JATETYT alempana):
 *   Europeana        HTTP 401 "Invalid API key" — vaatii ilmaisen
 *                    avaimen, jota ei voi viedä repoon.
 *   Smithsonian OA   api.si.edu vaatii api.data.gov-avaimen; jaettu
 *                    DEMO_KEY vastasi 429 OVER_RATE_LIMIT.
 *   Rijksmuseum      HTTP 410 ilman avainta, ei CORS-otsaketta.
 *   DPLA             HTTP 403 "invalid_api_key".
 *   Flickr (Commons) api.flickr.com vaatii avaimen ("Invalid API Key").
 *                    Flickr Commons -laitosten kuvat tulevat silti
 *                    peliin Openversen kautta, joka indeksoi Flickrin.
 *   Met Museum       Toimii ilman avainta, mutta haku ei kohdistu:
 *                    q=Suomenlinna palautti 128 osumaa, joista ensimmäinen
 *                    oli egyptiläinen Kuolleiden kirja, ja &title=true
 *                    palautti nolla myös Venetsialle. Väärä kuva on
 *                    pahempi kuin ei kuvaa, joten Met jää pois.
 *
 * ── TUOREET KUVAT ENSIN ─────────────────────────────────────────────
 * Omistaja: "tarvitaan lähinnä uusia kuvia". Galleria on siksi jaettu
 * kahteen osastoon: TUOREET KUVAT (Commons ja Openverse — nykyvalokuvia)
 * ja ARKISTON KUVAT (Library of Congress, museot — historiallista
 * aineistoa). Arkisto-osasto tulee aina jälkimmäisenä, ja Commonsin kuva
 * siirtyy sinne itsekin, jos sen ottovuosi on ennen ARKISTON_RAJAa.
 *
 * ── LISENSSIT (sitova suodatus) ─────────────────────────────────────
 * Vain PD, CC0, CC BY ja CC BY-SA. EI NC- eikä ND-ehtoja. Suodatus
 * tehdään KAHDESTI: hakuparametrina siellä missä rajapinta sen tarjoaa
 * ja uudelleen jokaiselle tulokselle (lisenssiKelpaa) — rajapinnan
 * lupaukseen ei luoteta. Jokaisen kuvan alla näkyy tekijä ja lisenssi;
 * ilman niitä kuva ei pääse ruudulle lainkaan (kelpaakoKuva).
 *
 * ── IKÄTASO (13+, ei lastenpeli) ────────────────────────────────────
 * Galleria näyttää kuvia, joita kukaan pelin puolelta ei ole katsonut
 * ennalta. Ratkaisu on neliportainen ja kirjattu tähän, koska se on
 * harkittu eikä sattumaa:
 *   1. KATEGORIA ENNEN HAKUA. Ensisijainen lähde on kohteen OMA
 *      Commons-kategoria (list=categorymembers). Kategoria on ihmisen
 *      kuratoima kokoelma juuri tästä kohteesta, joten väärä aihe on
 *      paljon epätodennäköisempi kuin tekstihaussa, jossa osuma voi
 *      olla mitä tahansa samannimistä. Vapaa haku on VARAREITTI, joka
 *      otetaan käyttöön vain kun kategoriaa ei löydy tai se on tyhjä.
 *   2. OPENVERSEN OMA SUODATIN: haku aina mature=false, ja tulos
 *      hylätään vielä erikseen, jos siihen on merkitty herkkyyslippu.
 *   3. AIHEPORTTI museolähteille (ARKISTOSEULA): taidekokoelman
 *      tekstihaku osuu mihin tahansa, joten Cleveland ja Art Institute
 *      hyväksytään vain kun kohteen nimi on teoksen otsikossa.
 *   4. KARKEA SANASEULA kaikkien lähteiden otsikoille (EI_TOIVOTUT).
 *      Se ei ole sisällöntunnistin eikä yritä olla — se on halpa verkko
 *      niille tapauksille, joissa aihe on nimessä, ja se saa pudottaa
 *      myös kelvollisen kuvan.
 * Viides portti on se, ettei galleria aukea itsestään: se on aina oma
 * napinpainalluksensa, ja sivu kertoo ennen kuvia, mistä ne tulevat.
 *
 * ── ERISTYS JA NOPEUS ───────────────────────────────────────────────
 * Jokainen lähde on oma sovittimensa, joka nielee omat virheensä ja
 * palauttaa tyhjän listan. Yhden rajapinnan kaatuminen tai hitaus ei
 * siis kaada galleriaa eikä estä muiden kuvia näkymästä: lähteet
 * ajetaan rinnakkain ja jokaisen tulos ladotaan ruudulle heti kun se
 * saapuu. Jokaisella pyynnöllä on oma aikakatko (AIKAKATKO_MS), joten
 * hidas lähde ei jää roikkumaan. Kuvia voi kertyä kymmeniä, joten
 * ruudukko paljastaa ne ERÄ kerrallaan vieritettäessä — ensimmäinen
 * avaus ei odota koko satoa.
 *
 * ── PEILISÄÄNTÖ ─────────────────────────────────────────────────────
 * Raamatun "KAIKKI SISÄLTÖ ÄMPÄRISTÄ" koskee pelin omaa mediaa, joka
 * kulkee mukana ja jonka on toimittava offline. Tämä galleria on
 * määritelmällisesti elävä ikkuna verkkoon: sen kuvia ei voi peilata
 * ennalta, koska niitä ei tiedetä ennen hakua. Siksi galleria katoaa
 * kokonaan ilman verkkoa (galleriaNappi palauttaa null) sen sijaan että
 * se rikkoisi offline-lupauksen.
 *
 * Verkko-osa on puhtaita funktioita, jotka saavat fetchin parametrina —
 * siksi tests/kuvagalleria.test.mjs testaa koko ketjun ilman verkkoa.
 */

import { html } from './ui-apurit.js';

/** Enintään näin monta kuvaa yhdestä lähteestä. */
export const KUVIA_LAHTEESTA = 24;

/** Näin monta kuvaa paljastetaan kerrallaan vieritettäessä. */
export const ERA = 12;

/** Kuvan on oltava vähintään näin leveä TAI korkea. */
export const VAHIN_SIVU = 1000;

/** Yksittäisen verkkopyynnön aikakatko. Ei ikuista odotusta. */
export const AIKAKATKO_MS = 8000;

/** Tätä vanhempi kuva on arkistokuva, ei tuore valokuva. */
export const ARKISTON_RAJA = 1990;

/** Kategoriasta ja hausta pyydetään enemmän kuin näytetään: seula karsii. */
const HAKURAJA = 60;

/**
 * Karkea sanaseula otsikoille (ks. IKÄTASO-kohta 4). Lista on
 * tarkoituksella lyhyt ja yksiselitteinen: pitkä lista alkaisi pudottaa
 * tavallisia kohteita ilman että se estäisi mitään, mitä aiheportit
 * eivät jo estä.
 */
export const EI_TOIVOTUT = new RegExp([
  'nude', 'nudity', 'naturis', 'erotic', 'porn', 'sexual', 'genital',
  'breasts', 'topless', 'lingerie',
  'corpse', 'cadaver', 'autopsy', 'mutilat', 'massacre', 'atrocit',
  'execution', 'lynch', 'gore', 'dismember',
].join('|'), 'i');

/** Kelvolliset kuvatyypit. SVG, PDF ja TIFF eivät ole valokuvia. */
const KUVATYYPIT = /^image\/(jpeg|png|webp)$/i;

/**
 * Rajapinnat, jotka jäivät pois, ja miksi. Tämä ei ole dokumentaatiota
 * vaan tarkistettavaa tietoa: testi lukee listan ja vaatii jokaiselle
 * syyn, jottei lähde katoa hiljaa muistiinpanona kommenttiin.
 */
export const POIS_JATETYT = [
  { nimi: 'Europeana', syy: 'vaatii ilmaisen API-avaimen (HTTP 401 ilman) — avainta ei viedä repoon' },
  { nimi: 'Smithsonian Open Access', syy: 'vaatii api.data.gov-avaimen; jaettu DEMO_KEY vastasi 429' },
  { nimi: 'Rijksmuseum', syy: 'vaatii avaimen (HTTP 410 ilman) eikä lähetä CORS-otsaketta' },
  { nimi: 'DPLA', syy: 'vaatii API-avaimen (HTTP 403)' },
  { nimi: 'Flickr Commons', syy: 'Flickrin rajapinta vaatii avaimen; sisältö tulee Openversen kautta' },
  { nimi: 'Met Museum', syy: 'haku ei kohdistu paikkaan — mitattu roskatulos, laatu voittaa määrän' },
];

/* ── Lisenssit ja koko ──────────────────────────────────────────── */

/**
 * Kelpaako lisenssitunnus? Sallittu: PD, CC0, CC BY, CC BY-SA.
 * Kielletty kaikki muu — erityisesti NC (ei-kaupallinen) ja ND (ei
 * muokkauksia), jotka tarkistetaan ENSIN, koska ne esiintyvät juuri
 * sallitun etuliitteen "cc-by" perässä ("cc-by-nc-sa-3.0").
 *
 * Tunnus tulee Commonsilta muodossa "cc-by-sa-4.0", "cc0" tai "pd-old",
 * Openverselta muodossa "by", "by-sa", "cc0", "pdm" (normalisoidaan
 * openversenLisenssi-funktiossa) ja museoilta suoraan "cc0" / "pd".
 */
export function lisenssiKelpaa(tunnus) {
  const t = String(tunnus ?? '').toLowerCase().trim().replace(/\s+/g, '-');
  if (!t) return false;
  // NC ja ND ensin: ne mitätöivät minkä tahansa muun osuman.
  if (/(^|[-_,])(nc|nd)([-_,]|\d|$)/.test(t)) return false;
  if (/noncommercial|non-commercial|no-?deriv/.test(t)) return false;
  if (/^(cc0|cc-zero)/.test(t)) return true;
  if (/^(pd|pdm|public-?domain)/.test(t)) return true;
  return /^cc-by(-sa)?([-,]|$)/.test(t);
}

/** Openversen lyhenne pelin sisäiseen muotoon ("by-sa" → "cc-by-sa"). */
export function openversenLisenssi(tunnus) {
  const t = String(tunnus ?? '').toLowerCase().trim();
  if (!t) return '';
  return /^(by|nc|nd|sampling)/.test(t) ? `cc-${t}` : t;
}

/** Riittävän iso kuva: vähintään VAHIN_SIVU leveyttä TAI korkeutta. */
export function riittavanIso(leveys, korkeus) {
  const l = Number(leveys) || 0;
  const k = Number(korkeus) || 0;
  return Math.max(l, k) >= VAHIN_SIVU;
}

/** Lisenssi ihmisen luettavaksi, kun rajapinta ei anna valmista nimeä. */
export function lisenssinNimi(tunnus, versio = '') {
  const t = String(tunnus ?? '').toLowerCase().replace(/^cc-/, '');
  if (/^(cc0|zero)/.test(t)) return 'CC0';
  if (/^(pd|pdm|public)/.test(t)) return 'Public domain';
  if (!t) return '';
  const nimi = `CC ${t.toUpperCase()}`;
  return versio ? `${nimi} ${versio}` : nimi;
}

/** Onko lisenssi sellainen, jossa tuntematon tekijä on tavallista? */
function vapaaTekijasta(tunnus) {
  return /^(pd|pdm|public|cc0|cc-zero)/i.test(String(tunnus ?? '').replace(/^cc-(?=0)/i, 'cc'));
}

/* ── Tekstin siivous ────────────────────────────────────────────── */

/*
 * Merkkauksen riisuminen tekstiksi ILMAN innerHTML:ää. Commonsin
 * Artist-kenttä on HTML:ää (linkki käyttäjäsivulle), ja se on vieraan
 * palvelimen sisältöä — sitä ei ladota dokumenttiin, vaan siitä
 * poimitaan pelkkä teksti, joka menee ruudulle textContentina.
 */
const ENTITEETIT = {
  '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'",
  '&apos;': "'", '&nbsp;': ' ',
};

export function puhdistaTeksti(merkkaus, katko = 140) {
  const raaka = String(merkkaus ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&[a-z#0-9]+;/gi, (osuma) => ENTITEETIT[osuma.toLowerCase()] ?? ' ')
    .replace(/\s+/g, ' ')
    .trim();
  // Ylipitkä tekijärivi (kokonainen lisenssiselostus kuvatekstissä)
  // katkaistaan: gallerian rivin on pysyttävä rivinä.
  return raaka.length > katko ? `${raaka.slice(0, katko - 3)}…` : raaka;
}

/** Ensimmäinen nelinumeroinen vuosiluku tekstistä, tai null. */
export function poimiVuosi(teksti) {
  const osuma = /(1[5-9]\d\d|20\d\d)/.exec(String(teksti ?? ''));
  return osuma ? Number(osuma[1]) : null;
}

/**
 * Kohteen hakusanat: pisin nimen sana kelpaa aiheportiksi. Yhden sanan
 * nimi ("Suomenlinna") on itse portti; monisanaisesta otetaan pisin
 * merkitsevä sana, koska museoiden otsikot latinisoivat ja lyhentävät
 * ("Piazza San Marco, Venice").
 */
export function aiheSana(nimi) {
  const sanat = String(nimi ?? '')
    .split(/[^\p{L}\p{N}]+/u)
    .filter((s) => s.length >= 4);
  if (!sanat.length) return '';
  return sanat.reduce((a, b) => (b.length > a.length ? b : a));
}

/** Osuuko kohteen aihe teoksen otsikkoon? Portti museolähteille. */
export function aiheOsuu(nimi, otsikko) {
  const sana = aiheSana(nimi);
  if (!sana) return false;
  return String(otsikko ?? '').toLowerCase().includes(sana.toLowerCase());
}

/* ── Osoitteet ──────────────────────────────────────────────────── */

/** Wikipedian sivun Wikidata-tunnus (Q-numero). */
export function wikipedianTunnusUrl(kieli, otsikko) {
  const p = new URLSearchParams({
    action: 'query',
    prop: 'pageprops',
    ppprop: 'wikibase_item',
    redirects: '1',
    format: 'json',
    origin: '*',
    titles: otsikko,
  });
  return `https://${kieli}.wikipedia.org/w/api.php?${p}`;
}

/** Wikidata-olion väitteet ja sivulinkit (P373 = Commons-kategoria). */
export function wikidataUrl(tunnus) {
  const p = new URLSearchParams({
    action: 'wbgetentities',
    ids: tunnus,
    props: 'claims|sitelinks',
    format: 'json',
    origin: '*',
  });
  return `https://www.wikidata.org/w/api.php?${p}`;
}

/** Commons-kyselyn yhteinen häntä: kuvatiedot lisensseineen. */
function commonsKuvatiedot(lisa) {
  return new URLSearchParams({
    action: 'query',
    prop: 'imageinfo',
    iiprop: 'url|size|mime|extmetadata',
    iiurlwidth: '480',
    format: 'json',
    origin: '*',
    ...lisa,
  });
}

/** Kategorian tiedostot lisenssitietoineen yhdellä kutsulla. */
export function commonsKategoriaUrl(kategoria, raja = HAKURAJA) {
  const p = commonsKuvatiedot({
    generator: 'categorymembers',
    gcmtitle: kategoria.startsWith('Category:') ? kategoria : `Category:${kategoria}`,
    gcmtype: 'file',
    gcmlimit: String(raja),
  });
  return `https://commons.wikimedia.org/w/api.php?${p}`;
}

/** Vapaa tiedostohaku Commonsista — varareitti ilman kategoriaa. */
export function commonsHakuUrl(teksti, raja = HAKURAJA) {
  const p = commonsKuvatiedot({
    generator: 'search',
    gsrsearch: teksti,
    gsrnamespace: '6',
    gsrlimit: String(raja),
  });
  return `https://commons.wikimedia.org/w/api.php?${p}`;
}

/** Kuvat kohteen koordinaattien ympäriltä: nykyvalokuvia paikan päältä. */
export function commonsGeoUrl(lat, lon, sade = 1000, raja = HAKURAJA) {
  const p = commonsKuvatiedot({
    generator: 'geosearch',
    ggsnamespace: '6',
    ggscoord: `${lat}|${lon}`,
    ggsradius: String(sade),
    ggslimit: String(Math.min(raja, 50)),
  });
  return `https://commons.wikimedia.org/w/api.php?${p}`;
}

/**
 * Openverse sallii nimettömälle kutsujalle enintään 20 tulosta sivua
 * kohti — isompi luku ei palauta vähemmän vaan kaataa koko pyynnön
 * (mitattu 23.8.2026: HTTP 401 "page_size may not exceed 20 for
 * anonymous requests"). Katto on siksi kovakoodattu tähän eikä
 * jätetä lähdekiintiön varaan.
 */
export const OPENVERSE_KATTO = 20;

/**
 * Openverse-haku. Lisenssit rajataan jo pyynnössä sallittuihin, ja
 * mature=false jättää aikuissisällön pois (ks. IKÄTASO).
 */
export function openverseUrl(teksti, raja = OPENVERSE_KATTO) {
  const p = new URLSearchParams({
    q: teksti,
    license: 'cc0,pdm,by,by-sa',
    page_size: String(Math.min(raja, OPENVERSE_KATTO)),
    mature: 'false',
  });
  return `https://api.openverse.org/v1/images/?${p}`;
}

/** Library of Congressin valokuvahaku JSON-muodossa. */
export function locUrl(teksti, raja = KUVIA_LAHTEESTA) {
  const p = new URLSearchParams({
    q: teksti,
    fo: 'json',
    c: String(raja),
    st: 'list',
  });
  return `https://www.loc.gov/photos/?${p}`;
}

/** Cleveland Museum of Art — avoin rajapinta ilman avainta. */
export function clevelandUrl(teksti, raja = KUVIA_LAHTEESTA) {
  const p = new URLSearchParams({
    q: teksti,
    limit: String(raja),
    has_image: '1',
    cc0: '1',
  });
  return `https://openaccess-api.clevelandart.org/api/artworks/?${p}`;
}

/** Art Institute of Chicago — avoin rajapinta ilman avainta. */
export function articUrl(teksti, raja = KUVIA_LAHTEESTA) {
  const p = new URLSearchParams({
    q: teksti,
    limit: String(raja),
    fields: 'id,title,image_id,is_public_domain,artist_title,date_display,thumbnail',
  });
  return `https://api.artic.edu/api/v1/artworks/search?${p}`;
}

/** Art Instituten IIIF-kuvaosoite halutulla leveydellä. */
export function articKuva(imageId, leveys = 1200) {
  return `https://www.artic.edu/iiif/2/${imageId}/full/${leveys},/0/default.jpg`;
}

/* ── Verkkoapuri ────────────────────────────────────────────────── */

/**
 * Yksi verkkopyyntö aikakatkolla. Ei koskaan heitä: null tarkoittaa
 * "ei saatu", ja jokainen kutsuja osaa jatkaa ilman.
 */
export async function hae(url, { fetchImpl = globalThis.fetch, aikakatko = AIKAKATKO_MS } = {}) {
  if (typeof fetchImpl !== 'function') return null;
  const vahti = typeof AbortController === 'function' ? new AbortController() : null;
  const ajastin = vahti ? setTimeout(() => vahti.abort(), aikakatko) : null;
  try {
    const vastaus = await fetchImpl(url, vahti ? { signal: vahti.signal } : undefined);
    if (!vastaus?.ok) return null;
    return await vastaus.json();
  } catch {
    // Ei yhteyttä, aikakatko tai kelvoton vastaus — galleria jatkaa.
    return null;
  } finally {
    if (ajastin) clearTimeout(ajastin);
  }
}

/* ── Yhteinen portti ────────────────────────────────────────────── */

/**
 * Kelpaako yksi normalisoitu kuva galleriaan? Tähän on koottu KAIKKI
 * sitovat portit, jotta ne ovat yhdessä paikassa eivätkä hajallaan
 * lähdesovittimissa: lisenssi, koko, tekijä ja sanaseula.
 */
export function kelpaakoKuva(kuva) {
  if (!kuva?.osoite || !kuva.pikku) return false;
  if (!lisenssiKelpaa(kuva.lisenssitunnus)) return false;
  if (!riittavanIso(kuva.leveys, kuva.korkeus)) return false;
  // Tekijä ja lisenssi NÄKYVÄT aina — kuva ilman tekijätietoa ei siis
  // voi päästä ruudulle. Public domain ja CC0 ovat poikkeus: niissä
  // tuntematon tekijä on tavallista eikä puute.
  if (!kuva.tekija && !vapaaTekijasta(kuva.lisenssitunnus)) return false;
  if (EI_TOIVOTUT.test(kuva.otsikko ?? '')) return false;
  return true;
}

/** Suodattaa, merkitsee tuoreuden ja katkaisee lähteen kiintiöön. */
function seulo(kuvat, { tuore = true, raja = KUVIA_LAHTEESTA } = {}) {
  const ulos = [];
  for (const kuva of kuvat) {
    if (!kelpaakoKuva(kuva)) continue;
    // Vanha kuva ei ole tuore, vaikka lähde olisi nykyaikainen.
    kuva.tuore = tuore && !(kuva.vuosi && kuva.vuosi < ARKISTON_RAJA);
    ulos.push(kuva);
    if (ulos.length >= raja) break;
  }
  return ulos;
}

/* ── Lähdesovittimet ────────────────────────────────────────────── */

/** Poimii Commons-kategorian nimen Wikidata-vastauksesta. */
export function poimiKategoria(data, tunnus) {
  const olio = data?.entities?.[tunnus];
  if (!olio) return null;
  const p373 = olio.claims?.P373?.[0]?.mainsnak?.datavalue?.value;
  if (typeof p373 === 'string' && p373.trim()) return p373.trim();
  const linkki = olio.sitelinks?.commonswiki?.title;
  if (typeof linkki === 'string' && linkki.startsWith('Category:')) {
    return linkki.slice('Category:'.length);
  }
  return null;
}

/**
 * Kohteen OMA Commons-kategoria: Wikipedian artikkeli → Wikidata →
 * P373. Kaksi pyyntöä, mutta ne ostavat sen, mikä tässä on tärkeintä:
 * ihmisen kokoaman kuvakokoelman juuri tästä kohteesta.
 *
 * Ei koskaan heitä; null tarkoittaa, että vapaa haku saa yrittää.
 */
export async function haeKategoria(otsikot, valinnat = {}) {
  for (const otsikko of otsikot) {
    if (!otsikko) continue;
    for (const kieli of ['fi', 'en']) {
      const data = await hae(wikipedianTunnusUrl(kieli, otsikko), valinnat);
      const sivut = data?.query?.pages;
      if (!sivut) continue;
      const tunnus = Object.values(sivut)[0]?.pageprops?.wikibase_item;
      if (!tunnus) continue;
      const wd = await hae(wikidataUrl(tunnus), valinnat);
      const kategoria = poimiKategoria(wd, tunnus);
      if (kategoria) return kategoria;
    }
  }
  return null;
}

/** MediaWiki-vastaus (kategoria, geohaku tai haku) → pelin kuvaoliot. */
export function poimiCommonsKuvat(data, lahdenimi = 'Wikimedia Commons') {
  const sivut = data?.query?.pages;
  if (!sivut || typeof sivut !== 'object') return [];
  const kuvat = [];
  for (const sivu of Object.values(sivut)) {
    const tieto = sivu?.imageinfo?.[0];
    if (!tieto) continue;
    if (!KUVATYYPIT.test(tieto.mime ?? '')) continue;
    const meta = tieto.extmetadata ?? {};
    const tunnus = meta.License?.value ?? meta.LicenseShortName?.value ?? '';
    kuvat.push({
      lahde: lahdenimi,
      otsikko: String(sivu.title ?? '').replace(/^File:/, '').replace(/\.[a-z0-9]+$/i, ''),
      osoite: tieto.url,
      pikku: tieto.thumburl ?? tieto.url,
      leveys: tieto.width,
      korkeus: tieto.height,
      tekija: puhdistaTeksti(meta.Artist?.value ?? ''),
      lisenssitunnus: tunnus,
      lisenssi: meta.LicenseShortName?.value
        ? puhdistaTeksti(meta.LicenseShortName.value, 40)
        : lisenssinNimi(tunnus),
      sivu: tieto.descriptionurl ?? null,
      vuosi: poimiVuosi(meta.DateTimeOriginal?.value ?? meta.DateTime?.value ?? ''),
    });
  }
  return kuvat;
}

/** Openverse-vastaus → pelin kuvaoliot. */
export function poimiOpenverseKuvat(data) {
  const kuvat = [];
  for (const tulos of data?.results ?? []) {
    // Herkkyyslippu: rajapinta on merkinnyt kuvaan varauksen. Jätetään.
    if (tulos?.mature) continue;
    if (tulos?.unstable__sensitivity?.length) continue;
    const tunnus = openversenLisenssi(tulos?.license);
    kuvat.push({
      lahde: `Openverse · ${tulos?.provider ?? 'verkko'}`,
      otsikko: String(tulos?.title ?? '').trim(),
      osoite: tulos?.url,
      pikku: tulos?.thumbnail ?? tulos?.url,
      leveys: tulos?.width,
      korkeus: tulos?.height,
      tekija: puhdistaTeksti(tulos?.creator ?? ''),
      lisenssitunnus: tunnus,
      lisenssi: lisenssinNimi(tunnus, tulos?.license_version ?? ''),
      sivu: tulos?.foreign_landing_url ?? null,
      vuosi: null,
    });
  }
  return kuvat;
}

/**
 * LoC:n kuvaosoitteet tulevat listana, jossa koko on osoitteen
 * risuaitaosassa ("...v.jpg#h=1024&w=801"). Palauttaa suurimman ja
 * pienimmän erikseen: suurin katselimeen, pienin ruudukkoon.
 */
export function locKuvakoot(osoitteet) {
  const kaikki = [];
  for (const rivi of osoitteet ?? []) {
    if (typeof rivi !== 'string') continue;
    const [osoite, hanta = ''] = rivi.split('#');
    if (!/^https?:/.test(osoite)) continue;
    const p = new URLSearchParams(hanta);
    kaikki.push({
      osoite,
      leveys: Number(p.get('w')) || 0,
      korkeus: Number(p.get('h')) || 0,
    });
  }
  if (!kaikki.length) return null;
  kaikki.sort((a, b) => (a.leveys * a.korkeus) - (b.leveys * b.korkeus));
  return { pienin: kaikki[0], suurin: kaikki[kaikki.length - 1] };
}

/**
 * LoC-vastaus → pelin kuvaoliot.
 *
 * LISENSSIPORTTI: LoC ei anna lisenssitunnusta vaan vapaan
 * oikeusselvityksen. Ainoa, jonka varaan voi laskea, on kokoelman oma
 * vakiolause "No known restrictions on publication" — kaikki muu
 * (esimerkiksi "Rights status not evaluated") hylätään, vaikka kuva
 * käytännössä olisikin vanha. Epävarmaa ei väitetä (pilari 2).
 */
export function poimiLocKuvat(data) {
  const kuvat = [];
  for (const tulos of data?.results ?? []) {
    if (tulos?.access_restricted) continue;
    const oikeudet = [tulos?.item?.rights_advisory, tulos?.item?.rights_information, tulos?.rights]
      .flat().filter(Boolean).join(' ');
    if (!/no known restrictions/i.test(oikeudet)) continue;
    const koot = locKuvakoot(tulos?.image_url);
    if (!koot) continue;
    const tekijat = [tulos?.item?.contributors, tulos?.item?.creators].flat().filter(Boolean)
      .map((t) => (typeof t === 'string' ? t : (t?.title ?? '')));
    kuvat.push({
      lahde: 'Library of Congress',
      otsikko: puhdistaTeksti(tulos?.title ?? '', 90),
      osoite: koot.suurin.osoite,
      pikku: koot.pienin.osoite,
      leveys: koot.suurin.leveys,
      korkeus: koot.suurin.korkeus,
      tekija: puhdistaTeksti(tekijat[0] ?? '', 70),
      lisenssitunnus: 'pd',
      lisenssi: 'Public domain — ei tunnettuja käyttörajoituksia',
      sivu: tulos?.url ?? tulos?.id ?? null,
      vuosi: poimiVuosi(tulos?.date ?? tulos?.item?.created_published ?? ''),
    });
  }
  return kuvat;
}

/** Cleveland Museum of Art -vastaus → pelin kuvaoliot. */
export function poimiClevelandKuvat(data, nimi) {
  const kuvat = [];
  for (const teos of data?.data ?? []) {
    if (!/^cc0$|^copyright free$/i.test(String(teos?.share_license_status ?? ''))) continue;
    if (!aiheOsuu(nimi, teos?.title)) continue;
    const iso = teos?.images?.print ?? teos?.images?.web;
    const pikku = teos?.images?.web ?? iso;
    if (!iso?.url || !pikku?.url) continue;
    kuvat.push({
      lahde: 'Cleveland Museum of Art',
      otsikko: puhdistaTeksti(teos?.title ?? '', 90),
      osoite: iso.url,
      pikku: pikku.url,
      leveys: Number(iso.width) || 0,
      korkeus: Number(iso.height) || 0,
      tekija: puhdistaTeksti(teos?.creators?.[0]?.description ?? '', 70),
      lisenssitunnus: 'cc0',
      lisenssi: 'CC0',
      sivu: teos?.url ?? null,
      vuosi: poimiVuosi(teos?.creation_date ?? ''),
    });
  }
  return kuvat;
}

/** Art Institute of Chicago -vastaus → pelin kuvaoliot. */
export function poimiArticKuvat(data, nimi) {
  const kuvat = [];
  for (const teos of data?.data ?? []) {
    if (!teos?.is_public_domain || !teos?.image_id) continue;
    if (!aiheOsuu(nimi, teos?.title)) continue;
    kuvat.push({
      lahde: 'Art Institute of Chicago',
      otsikko: puhdistaTeksti(teos?.title ?? '', 90),
      osoite: articKuva(teos.image_id, 1686),
      pikku: articKuva(teos.image_id, 400),
      leveys: Number(teos?.thumbnail?.width) || 0,
      korkeus: Number(teos?.thumbnail?.height) || 0,
      tekija: puhdistaTeksti(teos?.artist_title ?? '', 70),
      lisenssitunnus: 'pd',
      lisenssi: 'Public domain',
      sivu: `https://www.artic.edu/artworks/${teos.id}`,
      vuosi: poimiVuosi(teos?.date_display ?? ''),
    });
  }
  return kuvat;
}

/**
 * Lähderekisteri. Jokainen sovitin nielee omat virheensä hae():n
 * kautta ja palauttaa aina taulukon — yhden lähteen kaatuminen ei
 * näy muissa. `tuore` kertoo, kuuluvatko lähteen kuvat ruudun
 * ylä- (nykyvalokuvat) vai alaosaan (arkisto).
 */
export const KUVALAHTEET = [
  {
    tunnus: 'commons-kategoria',
    nimi: 'Wikimedia Commons — kohteen oma kategoria',
    tuore: true,
    async hae(kohde, valinnat) {
      const kategoria = await haeKategoria([kohde.wiki, kohde.nimi], valinnat);
      if (kategoria) {
        const data = await hae(commonsKategoriaUrl(kategoria), valinnat);
        const kuvat = seulo(poimiCommonsKuvat(data), { tuore: true });
        if (kuvat.length) return kuvat;
      }
      // Varareitti: vapaa tiedostohaku vain kun kategoriaa ei ollut tai
      // se ei tuottanut yhtään kelvollista kuvaa (ks. IKÄTASO-kohta 1).
      const haku = await hae(commonsHakuUrl(kohde.hakusana), valinnat);
      return seulo(poimiCommonsKuvat(haku), { tuore: true });
    },
  },
  {
    tunnus: 'commons-geo',
    nimi: 'Wikimedia Commons — kuvat kohteen ympäriltä',
    tuore: true,
    async hae(kohde, valinnat) {
      if (!Number.isFinite(kohde.lat) || !Number.isFinite(kohde.lon)) return [];
      const data = await hae(commonsGeoUrl(kohde.lat, kohde.lon, kohde.sade ?? 1000), valinnat);
      return seulo(poimiCommonsKuvat(data, 'Wikimedia Commons · lähistöltä'), { tuore: true });
    },
  },
  {
    tunnus: 'openverse',
    nimi: 'Openverse',
    tuore: true,
    async hae(kohde, valinnat) {
      const data = await hae(openverseUrl(kohde.hakusana), valinnat);
      return seulo(poimiOpenverseKuvat(data), { tuore: true });
    },
  },
  {
    tunnus: 'loc',
    nimi: 'Library of Congress',
    tuore: false,
    async hae(kohde, valinnat) {
      const data = await hae(locUrl(kohde.hakusana), valinnat);
      return seulo(poimiLocKuvat(data), { tuore: false });
    },
  },
  {
    tunnus: 'cleveland',
    nimi: 'Cleveland Museum of Art',
    tuore: false,
    async hae(kohde, valinnat) {
      const data = await hae(clevelandUrl(kohde.hakusana), valinnat);
      return seulo(poimiClevelandKuvat(data, kohde.nimi), { tuore: false });
    },
  },
  {
    tunnus: 'artic',
    nimi: 'Art Institute of Chicago',
    tuore: false,
    async hae(kohde, valinnat) {
      const data = await hae(articUrl(kohde.hakusana), valinnat);
      return seulo(poimiArticKuvat(data, kohde.nimi), { tuore: false });
    },
  },
];

/* ── Haun ohjaus ────────────────────────────────────────────────── */

/** Normalisoi kutsujan antaman kohteen hakua varten. */
export function hakukohde(kohde) {
  const nimi = String(kohde?.nimi ?? '').trim();
  const wiki = String(kohde?.wiki ?? '').trim();
  const kaupunki = String(kohde?.kaupunki ?? '').trim();
  return {
    nimi,
    wiki,
    kaupunki,
    // Kaupungin nimi hakusanaan mukaan: "Duomo" yksin osuu koko
    // maailmaan, "Duomo Firenze" osuu tähän kohteeseen.
    hakusana: [wiki || nimi, kaupunki && kaupunki !== nimi ? kaupunki : ''].filter(Boolean).join(' '),
    lat: Number(kohde?.lat),
    lon: Number(kohde?.lon),
    sade: Number(kohde?.sade) || undefined,
  };
}

/**
 * Ajaa kaikki lähteet RINNAKKAIN ja ilmoittaa jokaisen sadon heti kun
 * se saapuu. Palauttaa lupauksen, joka täyttyy kun kaikki lähteet ovat
 * valmiita — myös silloin kun osa niistä kaatui.
 */
export function haeLahteista(kohde, {
  fetchImpl = globalThis.fetch, onKuvat = null, lahteet = KUVALAHTEET, aikakatko,
} = {}) {
  const tiedot = hakukohde(kohde);
  if (!tiedot.nimi && !tiedot.wiki) return Promise.resolve([]);
  const nahdyt = new Set();
  const kaikki = [];
  const valinnat = { fetchImpl, aikakatko };
  const tyot = lahteet.map(async (lahde) => {
    let kuvat = [];
    try {
      kuvat = await lahde.hae(tiedot, valinnat);
    } catch {
      // Yksi lähde ei kaada galleriaa (ks. ERISTYS JA NOPEUS).
      kuvat = [];
    }
    const uudet = [];
    for (const kuva of kuvat ?? []) {
      if (!kuva?.osoite || nahdyt.has(kuva.osoite)) continue;
      nahdyt.add(kuva.osoite);
      uudet.push(kuva);
      kaikki.push(kuva);
    }
    if (uudet.length && onKuvat) {
      try { onKuvat(uudet, lahde); } catch { /* piirto ei kaada hakua */ }
    }
  });
  return Promise.all(tyot).then(() => kaikki);
}

/**
 * Koko sato kerralla, tuoreet ensin. Käytössä testeissä ja silloin kun
 * kutsuja ei halua virtaa vaan valmiin listan.
 */
export async function haeKuvat(kohde, valinnat = {}) {
  const kuvat = await haeLahteista(kohde, valinnat);
  return [...kuvat.filter((k) => k.tuore), ...kuvat.filter((k) => !k.tuore)];
}

/* ── Käyttöliittymä ─────────────────────────────────────────────── */

/** Onko verkko käytettävissä? Tuntematon tulkitaan myönteisesti. */
export function verkossa() {
  return globalThis.navigator?.onLine !== false;
}

/**
 * Gallerian avausnappi. Palauttaa null ilman verkkoa: silloin galleria
 * jää yksinkertaisesti pois näkyvistä, eikä pelaajalle tarjota nappia,
 * joka ei voi toimia (offline-lupaus, ks. PEILISÄÄNTÖ).
 */
export function galleriaNappi(ui, kohde, teksti = 'Lisää kuvia tästä kohteesta') {
  if (!verkossa()) return null;
  const nappi = html('button', 'kuvagalleria-nappi', teksti);
  nappi.type = 'button';
  nappi.addEventListener('click', (e) => {
    e.stopPropagation();
    avaaKuvagalleria(ui, kohde);
  });
  return nappi;
}

/**
 * Tekijä- ja lisenssirivi. Ei valinnainen: pilari 2 vaatii sen
 * jokaiseen kuvaan, ja kelpaakoKuva on jo varmistanut, että tiedot
 * ovat olemassa. Nimi on linkki alkuperäiselle sivulle, jotta
 * lisenssin ja tekijän voi tarkistaa lähteestä.
 */
export function luottamusrivi(kuva, luokka = 'kuvagalleria-lahde') {
  const rivi = html('figcaption', luokka);
  const nimi = kuva.tekija || 'Tekijä tuntematon';
  const loput = [kuva.lisenssi, kuva.lahde].filter(Boolean).join(' · ');
  if (kuva.sivu) {
    const linkki = document.createElement('a');
    linkki.className = 'kuvagalleria-linkki';
    linkki.href = kuva.sivu;
    linkki.target = '_blank';
    linkki.rel = 'noopener noreferrer';
    linkki.textContent = nimi;
    rivi.appendChild(linkki);
  } else {
    rivi.appendChild(html('span', 'kuvagalleria-tekija', nimi));
  }
  if (loput) rivi.appendChild(document.createTextNode(` · ${loput}`));
  return rivi;
}

/**
 * Gallerianäkymä: oma kokoruudun kerros, joka EI muistuta lehden
 * kuvitusta. Tumma kontaktiarkki, konekirjoitusteksti, jokaisen kuvan
 * alla tekijä ja lisenssi. Rakenne on sama kuin kohdekartan
 * kokoruutunäkymässä (js/nahtavyydet.js avaaKarttaSuurennos): kerros
 * liitetään päällimmäiseen avoimeen dialogiin ja Escape purkaa
 * kerrokset järjestyksessä.
 */
export function avaaKuvagalleria(ui, kohde, valinnat = {}) {
  const isanta = ui?.suurennosIsanta?.() ?? document.body;
  // Kaksi galleriaa päällekkäin ei ole koskaan oikein.
  isanta.querySelector(':scope > .kuvagalleria')?.remove();

  const kerros = html('div', 'kuvagalleria');
  kerros.setAttribute('role', 'dialog');
  kerros.setAttribute('aria-label', `Verkon kuvia: ${kohde?.nimi ?? ''}`);
  const arkki = html('div', 'kuvagalleria-arkki');
  kerros.appendChild(arkki);

  const sulje = html('button', 'kuvagalleria-sulku', '×');
  sulje.type = 'button';
  sulje.setAttribute('aria-label', 'Sulje kuvagalleria');
  arkki.appendChild(sulje);

  arkki.appendChild(html('h3', 'kuvagalleria-otsikko', kohde?.nimi ?? 'Kuvia kohteesta'));
  /*
   * Sanamuoto pelin äänellä, ei teknisenä huomautuksena (omistajan
   * vaatimus): pelaajan on ymmärrettävä yhdellä lukemalla, että nämä
   * kuvat eivät ole toimituksen valintoja.
   */
  arkki.appendChild(html('p', 'kuvagalleria-selitys',
    'Nämä eivät ole lehden omia kuvia. Ne haetaan juuri nyt suoraan '
    + 'avoimista kokoelmista — Wikimedia Commonsista, Openversesta, '
    + 'Kongressin kirjastosta ja museoiden arkistoista — eikä kukaan '
    + 'toimituksesta ole niitä katsonut. Tekijä ja lisenssi lukevat '
    + 'jokaisen kuvan alla.'));

  const tila = html('p', 'kuvagalleria-tila', 'Haetaan kuvia avoimista kokoelmista…');
  arkki.appendChild(tila);

  /*
   * KAKSI OSASTOA: tuoreet kuvat ensin, arkisto perässä (omistaja:
   * "tarvitaan lähinnä uusia kuvia"). Lähteet saapuvat eri aikaan,
   * joten järjestystä ei voi jättää saapumisjärjestyksen varaan —
   * osasto on paikka, johon kuva ladotaan riippumatta siitä, milloin
   * se ehti.
   */
  const osastot = new Map();
  const teeOsasto = (avain, otsikko, selite) => {
    const osasto = html('section', 'kuvagalleria-osasto');
    osasto.hidden = true;
    osasto.appendChild(html('h4', 'kuvagalleria-osastonimi', otsikko));
    osasto.appendChild(html('p', 'kuvagalleria-osasteselite', selite));
    const ruudukko = html('div', 'kuvagalleria-ruudukko');
    osasto.appendChild(ruudukko);
    const lisaa = html('button', 'kuvagalleria-lisaa', 'Näytä lisää kuvia');
    lisaa.type = 'button';
    lisaa.hidden = true;
    osasto.appendChild(lisaa);
    arkki.appendChild(osasto);
    osastot.set(avain, {
      osasto, ruudukko, lisaa, jono: [], nakyvissa: 0,
    });
    return osastot.get(avain);
  };
  const tuoreet = teeOsasto('tuore', 'Tuoreet kuvat',
    'Nykyvalokuvia avoimista kokoelmista.');
  const arkisto = teeOsasto('arkisto', 'Arkiston kuvat',
    'Vanhoja valokuvia ja teoksia museoiden ja kirjastojen kokoelmista.');

  let katselin = null;
  const suljeKatselin = () => {
    katselin?.remove();
    katselin = null;
  };

  /*
   * Yhden kuvan katselin gallerian omana kerroksena. Se EI käytä pelin
   * kuvasuurennosta (ui.avaaKulttuuriKuva), koska se on lehden
   * kuvakalusteita — galleria pysyy tarkoituksella omannäköisenään, ja
   * suljeKulttuuriKuva purkaisi kerroksia väärässä järjestyksessä.
   */
  const avaaIso = (kuva) => {
    suljeKatselin();
    katselin = html('div', 'kuvagalleria-katselin');
    const iso = document.createElement('img');
    iso.className = 'kuvagalleria-isokuva';
    iso.src = kuva.osoite;
    iso.alt = kuva.otsikko ?? '';
    iso.decoding = 'async';
    // Alkuperäinen voi olla valtava tai kadonnut: pikkukuva on
    // kelvollinen vara, eikä katselin saa jäädä tyhjäksi.
    iso.addEventListener('error', () => { iso.src = kuva.pikku; }, { once: true });
    katselin.appendChild(iso);
    if (kuva.otsikko) katselin.appendChild(html('p', 'kuvagalleria-isonimi', kuva.otsikko));
    katselin.appendChild(luottamusrivi(kuva, 'kuvagalleria-isolahde'));
    kerros.appendChild(katselin);
  };

  const teeKortti = (kuva) => {
    const kehys = html('figure', 'kuvagalleria-kortti');
    const nappi = html('button', 'kuvagalleria-kuvanappi');
    nappi.type = 'button';
    nappi.setAttribute('aria-label', `Suurenna: ${kuva.otsikko || 'kuva'}`);
    const pikku = document.createElement('img');
    pikku.className = 'kuvagalleria-pikkukuva';
    pikku.src = kuva.pikku;
    pikku.alt = kuva.otsikko ?? '';
    pikku.loading = 'lazy';
    pikku.decoding = 'async';
    pikku.draggable = false;
    // Kuva, joka ei lataudu, poistaa oman korttinsa — tyhjä kehys
    // lähderiveineen näyttäisi virheeltä.
    pikku.addEventListener('error', () => kehys.remove(), { once: true });
    nappi.appendChild(pikku);
    nappi.addEventListener('click', (e) => { e.stopPropagation(); avaaIso(kuva); });
    kehys.appendChild(nappi);
    kehys.appendChild(luottamusrivi(kuva));
    return kehys;
  };

  /*
   * ERÄ KERRALLAAN. Kaikkia kuvia ei ladota ruudulle heti: ensimmäinen
   * erä riittää avaukseen, ja loput paljastuvat kun pelaaja vierittää
   * osaston loppuun (IntersectionObserver) tai painaa nappia. Näin
   * lähteitä voi olla monta ilman että avaus hidastuu.
   */
  const paljasta = (o) => {
    const era = o.jono.slice(o.nakyvissa, o.nakyvissa + ERA);
    for (const kuva of era) o.ruudukko.appendChild(teeKortti(kuva));
    o.nakyvissa += era.length;
    o.lisaa.hidden = o.nakyvissa >= o.jono.length;
    if (o.nakyvissa >= o.jono.length) o.vahti?.disconnect();
  };
  for (const o of osastot.values()) {
    o.lisaa.addEventListener('click', (e) => { e.stopPropagation(); paljasta(o); });
    if (typeof IntersectionObserver === 'function') {
      o.vahti = new IntersectionObserver((merkit) => {
        if (merkit.some((m) => m.isIntersecting) && o.nakyvissa < o.jono.length) paljasta(o);
      }, { root: arkki, rootMargin: '400px' });
      o.vahti.observe(o.lisaa);
    }
  }

  const lisaaKuvat = (kuvat) => {
    tila.remove();
    for (const kuva of kuvat) {
      const o = kuva.tuore ? tuoreet : arkisto;
      o.jono.push(kuva);
      o.osasto.hidden = false;
      if (o.nakyvissa < ERA) {
        o.ruudukko.appendChild(teeKortti(kuva));
        o.nakyvissa += 1;
      } else {
        o.lisaa.hidden = false;
        // Vahti on piilotettuna irti näkymästä; kytketään uudelleen.
        o.vahti?.observe(o.lisaa);
      }
    }
  };

  const purku = () => {
    window.removeEventListener('keydown', nappaimet, { capture: true });
    for (const o of osastot.values()) o.vahti?.disconnect();
    kerros.remove();
  };
  /*
   * ESCAPE PURKAA KERROKSET JÄRJESTYKSESSÄ: katselin → galleria →
   * lehti. Kuuntelija on windowissa kaappausvaiheessa samasta syystä
   * kuin kohdekartan piirrosvalinnalla (js/nahtavyydet.js): dialogin
   * oma Escape-sulku on rekisteröity ensin, ja kaappausreitti alkaa
   * windowista, joten tämä ehtii sen edelle.
   */
  const nappaimet = (e) => {
    if (!kerros.isConnected) { purku(); return; }
    if (e.key !== 'Escape') return;
    e.preventDefault();
    e.stopPropagation();
    if (katselin) suljeKatselin();
    else purku();
  };
  window.addEventListener('keydown', nappaimet, { capture: true });
  sulje.addEventListener('click', (e) => { e.stopPropagation(); purku(); });
  // Napautus katselimeen sulkee sen; napautus arkin ulkopuolelle
  // sulkee koko gallerian. Arkin sisällä ei tapahdu mitään.
  kerros.addEventListener('click', (e) => {
    if (katselin) { suljeKatselin(); return; }
    if (e.target === kerros) purku();
  });

  haeLahteista(kohde, {
    ...valinnat,
    onKuvat: (kuvat) => { if (kerros.isConnected) lisaaKuvat(kuvat); },
  }).then((kaikki) => {
    if (!kerros.isConnected) return;
    if (!kaikki.length) {
      tila.textContent = 'Tästä kohteesta ei löytynyt avoimista kokoelmista '
        + 'yhtään vapaasti käytettävää kuvaa. Lehden omat kuvat ovat siis '
        + 'toistaiseksi kaikki, mitä täältä on.';
      arkki.appendChild(tila);
    }
  }).catch(() => {
    if (!kerros.isConnected) return;
    tila.textContent = 'Kuvia ei nyt saatu haettua. Yhteys voi olla poikki '
      + 'tai arkisto ruuhkainen — koeta hetken päästä uudelleen.';
    arkki.appendChild(tila);
  });

  isanta.appendChild(kerros);
  sulje.focus({ preventScroll: true });
  return kerros;
}
