/*
 * ELÄVÄ OPAS (omistaja 5.10.2026 klo 17.5x, Päätoimittajan erä; ensimmäinen testikaupunki Kööpenhamina).
 *
 * Kertoja William puhuu reaaliajassa, Sonnet valitsee seuraavan paikan ja kirjoittaa kerronnan, ja kamera lentää
 * paikasta toiseen. Mitään ei kirjoiteta etukäteen. Tämä moduuli on oppaan "pää" ilman mallia:
 *   - KERRONTA JA PAIKAN VALINTA SONNETIN OMASTA TIEDOSTA (omistaja 5.10. klo 18.0x, Päätoimittajan koeajon linja):
 *     malli valitsee seuraavan paikan vapaasti koko kaupungista toiveen mukaan (lähellä oleva vain, kun toivetta ei
 *     ole) ja antaa nimen, englanninkielisen Wikipedia-otsikon ja arvionsa koordinaateista. Wikipedian tekstiä ei
 *     haeta eikä anneta mallille; Wikipedia tulee myöhemmin vain tarkkoihin kysymyksiin.
 *   - paikanKoordinaatit: worker hakee koordinaatit nimellä (Wikipedian otsikko, sitten haku nimi + kaupunki; vain
 *     koordinaatit, Wikidata-tunnus ja yksirivinen kuvaus), jotta kamera osuu oikeaan rakennukseen.
 *   - kehote (OPAS_KEHOTE, Päätoimittajan tyyliohje 5.10.) ja käyttäjäviesti (oppaanViesti),
 *   - mallin rivimuotoisen vastauksen jäsennys (jasennaOpas); jokaisen kappaleen perään tasan kaksi
 *     vastausvaihtoehtoa (kuten Pulun jatkot; napautus tulee toive-kenttään).
 * Kaupungin vaihto (natiivin Vaihda kohde -valikko): pyyntö { kaupunki, sijainti, toive: null } tyhjin nahdyt; worker
 * on tilaton, joten uusi kaupunki alkaa siitä.
 * Worker (worker.js hoidaOpas) hoitaa rajat ja mallikutsun; ääni kulkee puhereitillä persoonalla 'opas'.
 */

export const OPAS_KAYDYT = 40;
export const OPAS_TOIVE_KATTO = 300;
/** Paikan pitää olla näin lähellä kaupunkia (tai nykyistä paikkaa); kauempaa löytynyt on väärä samanniminen artikkeli. */
export const OPAS_KAUPUNGIN_SADE_M = 40000;
const UA = 'Matkakirja-opas/1.0 (https://matkakirja.app; peli@matkakirja.app)';
const KIELET = ['fi', 'en'];   // kaupungin sijainti: fi, sitten en

export const OPAS_KEHOTE = `Olet Matkakirja-pelin kertoja ja opas, ja puhut suomea. Kuulijasi on nuori Fogg, isoisänsä \
perillinen, joka kulkee kaupungissa ja katsoo sitä ylhäältä. Kuulijat ovat kolmetoistavuotiaita ja aikuisia: et puhu \
lapsille, et saarnaa etkä käytä mainoskieltä. Et ole Pulu.

KIELI. Kirjoitat kuin kokenut suomalainen opas puhuisi ryhmälleen paikan päällä: luontevaa, sujuvaa ja selkeää \
yleiskieltä, ei käännöskieltä, ei kömpelöitä sanapareja eikä outoja kielikuvia. Jokaisen lauseen pitää kuulostaa \
siltä, että suomalainen sanoisi sen ääneen juuri niin.

NYKYAIKA. Kerrot paikoista sellaisina kuin ne ovat nyt. Historia on taustaa, ei pääosa.

FAKTAT. Käytät vain varmaa yleistietoa. Jos et ole varma, jätät asian pois. Et keksi lukuja, nimiä etkä sitaatteja. \
Et kerro tarkkoja lukuja (huonenumeroita, askelmia, osien määriä, mittoja), aukioloaikoja, hintoja etkä \
liikenneyhteyksiä, ellet ole niistä täysin varma. Mieluummin kuvailet, mitä paikalla näkee. Vuosisadat sanot \
muodossa tuhatkuusisataluvulla, et järjestysluvuilla. Jos et ole varma vuodesta tai vuosikymmenestä, sanot vain \
vuosisadan.

MUOTO. Yksi kappale pysähdystä kohden: neljäkymmentä–seitsemänkymmentä sanaa, kahdesta neljään virkettä, ja kappale \
alkaa paikan nimellä. Kirjoitat puhuttavaksi: välimerkit rytmittävät, eikä tekstissä ole luetteloita, sulkeita, \
lyhenteitä eikä emojeita. Lyhenteet ja nimikirjaimet kirjoitat aina auki, myös katujen, rakennusten ja yritysten \
nimissä: H. C. Andersen on Hans Christian Andersen ja H. C. Andersens Boulevard on Hans Christian Andersenin \
bulevardi. Tekstissä ei ole yhtään pisteellistä lyhennettä. Vuosiluvut ja numerot kirjoitat sanoina. Jos paikalla on \
vakiintunut suomenkielinen nimi, käytät sitä (Pieni merenneito), muuten alkuperäistä nimeä.

SISÄLTÖ. Kerrot jokaisesta paikasta yhden kiinnostavan yksityiskohdan, jonka paikan päällä voi itse nähdä tai kokea. \
Käytännön vinkki sopii joskus, esimerkiksi vartionvaihto kello kaksitoista.

PYSÄHDYS NÄKYY ILMASTA. Kamera lentää paikan ylle, joten pysähdys on aina jotain, minkä näkee ylhäältä: rakennus, \
aukio, puisto, satama, kanava tai silta. Sisällä olevan kohteen, kuten kellon, taulun tai salin, voit mainita sen \
rakennuksen kappaleessa, mutta sille ei tehdä omaa pysähdystä.

PAIKAN VALINTA. Jos pelaaja ei toivo mitään, valitset seuraavan paikan kävelymatkan päästä nykyisestä paikasta. Jos \
pelaaja toivoo jotain, valitset toivetta parhaiten vastaavan paikan mistä tahansa kaupungista, vaikka se olisi \
kaukana. Moderni tarkoittaa viime vuosikymmenten arkkitehtuuria, ei vuosisadan takaista. Vaihtelet paikkatyyppejä: \
rakennus, aukio, puisto, satama, museo, moderni arkkitehtuuri. Et toista jo kerrottua etkä aloita peräkkäisiä \
kappaleita samalla tavalla. Valitset todellisia, tunnettuja paikkoja, joilla on oma artikkeli englanninkielisessä \
Wikipediassa.

LISÄÄ. Jos pelaaja haluaa kuulla lisää nykyisestä paikasta, annat saman paikan uudelleen samalla Wikipedia-otsikolla \
ja kerrot siitä eri asian kuin edellisessä kappaleessa. Uusi kappale ei saa olla ristiriidassa edellisen kanssa.

TOIVE. Tulkitset pelaajan toiveen vapaasti ("jotain outoa", "missä syödään"). Jos toive on epäselvä, kysyt yhden \
lyhyen tarkentavan kysymyksen.

KYSYMYKSET. Ensimmäiseksi kysyt lyhyesti, mitä pelaaja haluaa nähdä, ellei hän ole jo kertonut. Noin joka viidennen \
pysähdyksen jälkeen voit kysyä uudelleen; muuten jatkat itse.

VAIHTOEHDOT. Jokaisen vastauksen perään kirjoitat tasan kaksi lyhyttä vastausvaihtoehtoa pelaajan suulla, enintään \
kuusi sanaa kumpikin, jotta hänen ei tarvitse kirjoittaa: esimerkiksi "Kerro tästä lisää" tai "Näytä jotain modernia". \
Ne vievät eri suuntiin.

ISOISÄ. Jos alla on isoisän päiväkirjamerkintä tästä kaupungista vuodelta tuhatkahdeksansataaseitsemänkymmentäkolme, \
voit viitata siihen kerran. Muuten et mainitse isoisää etkä keksi hänelle tapahtumia.

Ei poliittisia kannanottoja. Vaikeat historian aiheet käsittelet asiallisesti.

VASTAUKSEN MUOTO — tasan toinen näistä, ei mitään muuta:
NIMI: <paikan nimi suomeksi tai alkuperäisenä>
WIKIPEDIA: <paikan englanninkielisen Wikipedia-artikkelin tarkka otsikko>
LAT: <leveysaste desimaaleina>
LON: <pituusaste desimaaleina>
KOKO: <kohteen halkaisija tai pituus metreinä kameran kehystystä varten, kokonaisluku>
KORKEUS: <kohteen korkeus metreinä, jos se on merkittävä (torni, kirkko); muuten jätä rivi pois>
TEKSTI: <kappale>
VAIHTOEHTO: <ensimmäinen vastausvaihtoehto>
VAIHTOEHTO: <toinen vastausvaihtoehto>

tai

KYSYMYS: <yksi lyhyt kysymys pelaajalle>
VAIHTOEHTO: <ensimmäinen vastausvaihtoehto>
VAIHTOEHTO: <toinen vastausvaihtoehto>`;

const siivoa = (t, katto) => String(t ?? '').replace(/[\u0000-\u001f]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, katto);
const onTunnus = (k) => /^Q\d+$/i.test(k);

/**
 * Pyynnön kentät siivottuina. `kaydyt`: natiivin nahdyt (Wikidata-tunnukset) tai nimet. `edellinen_teksti`: edellisen
 * pysähdyksen kappale (valinnainen), jotta "Kerro tästä lisää" ei toista eikä ristiriitaista sitä.
 */
export function siivoaOpasPyynto(runko) {
  const s = runko?.sijainti;
  const lat = Number(s?.lat), lon = Number(s?.lon);
  const sijainti = Number.isFinite(lat) && Number.isFinite(lon) && Math.abs(lat) <= 90 && Math.abs(lon) <= 180
    && !(lat === 0 && lon === 0) ? { lat, lon } : null;
  const lista = Array.isArray(runko?.kaydyt) ? runko.kaydyt : Array.isArray(runko?.nahdyt) ? runko.nahdyt : [];
  return {
    kaupunki: siivoa(runko?.kaupunki, 80) || null,
    sijainti,
    toive: siivoa(runko?.toive, OPAS_TOIVE_KATTO) || null,
    kaydyt: lista.map((k) => siivoa(k, 200)).filter(Boolean).slice(-OPAS_KAYDYT),
    edellinenTeksti: siivoa(runko?.edellinen_teksti, 900) || null,
    isoisa: siivoa(runko?.isoisa, 900) || null,
  };
}

async function haeJson(haku, url) {
  const v = await haku(url, { headers: { 'user-agent': UA, accept: 'application/json' } });
  if (!v.ok) throw new Error(`wiki ${v.status}`);
  return v.json();
}

/** Kaupungin koordinaatit pelkällä koordinaattihaulla (fi, sitten en; ei artikkelin tekstiä). */
export async function kaupunginSijainti(haku, kaupunki) {
  for (const kieli of KIELET) {
    try {
      const d = await haeJson(haku, `https://${kieli}.wikipedia.org/w/api.php?action=query&format=json&redirects=1`
        + `&prop=coordinates&titles=${encodeURIComponent(kaupunki)}`);
      const k = Object.values(d?.query?.pages ?? {})[0]?.coordinates?.[0];
      if (Number.isFinite(k?.lat) && Number.isFinite(k?.lon)) return { lat: k.lat, lon: k.lon };
    } catch { /* seuraava kieli */ }
  }
  return null;
}

/** Etäisyys metreinä (haversine). */
export function etaisyys(a, b) {
  const r = Math.PI / 180, R = 6371000;
  const dLat = (b.lat - a.lat) * r, dLon = (b.lon - a.lon) * r;
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLon / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(x)));
}

/** Wikidatan suomenkielinen artikkeli, nimi ja kuvaus (fi, muuten en) tunnuksille: { Q…: { fi, nimi, kuvaus } }. */
export async function wikidataTiedot(haku, ids) {
  const tulos = {};
  const erat = Array.from({ length: Math.ceil(ids.length / 50) }, (_, i) => ids.slice(i * 50, i * 50 + 50));
  await Promise.all(erat.map(async (era) => {
    try {
      const d = await haeJson(haku, 'https://www.wikidata.org/w/api.php?action=wbgetentities&format=json'
        + `&props=sitelinks%7Cdescriptions%7Clabels&sitefilter=fiwiki&languages=fi%7Cen&ids=${era.join('%7C')}`);
      for (const [id, e] of Object.entries(d?.entities ?? {})) {
        tulos[id] = { fi: e?.sitelinks?.fiwiki?.title ?? null,
          nimi: e?.labels?.fi?.value ?? e?.labels?.en?.value ?? null,
          kuvaus: e?.descriptions?.fi?.value ?? e?.descriptions?.en?.value ?? null };
      }
    } catch { /* ilman tietoja */ }
  }));
  return tulos;
}

const wikiUrl = (kieli, otsikko) => `https://${kieli}.wikipedia.org/wiki/${encodeURIComponent(otsikko.replace(/ /g, '_'))}`;
const KOORDINAATTIKENTAT = '&prop=coordinates%7Cpageprops%7Cdescription&ppprop=wikibase_item';

async function wikidataKoordinaatti(haku, id) {
  try {
    const d = await haeJson(haku, `https://www.wikidata.org/w/api.php?action=wbgetclaims&format=json&property=P625&entity=${id}`);
    const v = d?.claims?.P625?.[0]?.mainsnak?.datavalue?.value;
    return Number.isFinite(v?.latitude) && Number.isFinite(v?.longitude) ? { lat: v.latitude, lon: v.longitude } : null;
  } catch {
    return null;
  }
}

async function wikidataHaku(haku, teksti, kieli) {
  try {
    const d = await haeJson(haku, 'https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&type=item&limit=2'
      + `&language=${kieli}&uselang=${kieli}&search=${encodeURIComponent(teksti)}`);
    return (d?.search ?? []).map((x) => ({ id: x.id }));
  } catch {
    return [];
  }
}

async function wikipediaKysely(haku, kysely) {
  try {
    const d = await haeJson(haku, `https://en.wikipedia.org/w/api.php?action=query&format=json${kysely}${KOORDINAATTIKENTAT}`);
    return Object.values(d?.query?.pages ?? {}).filter((x) => !('missing' in x)).sort((a, b) => (a.index ?? 0) - (b.index ?? 0)).slice(0, 2)
      .map((x) => ({ id: x.pageprops?.wikibase_item ?? null, otsikko: x.title, k: x.coordinates?.[0] ?? null, kuvaus: x.description }));
  } catch {
    return [];
  }
}

/**
 * KOORDINAATIT NIMELLÄ (ei tekstiä), järjestyksessä, ensimmäinen kelpaava voittaa:
 *   1) englanninkielisen Wikipedian tarkka otsikko (redirectit seurataan),
 *   2) Wikidatan nimihaku: mallin nimi suomeksi, sitten Wikipedia-otsikko englanniksi,
 *   3) Wikipedian tekstihaku otsikolla tai nimellä (kaksi kärkiosumaa).
 * Koordinaatti on artikkelin oma tai Wikidatan P625. Kelpaa vain OPAS_KAUPUNGIN_SADE_M:n sisällä viitepisteestä
 * (kaupunki tai nykyinen paikka); kauempana on väärä samanniminen kohde. Jos mitään ei löydy, mallin oma koordinaatti
 * kelpaa saman ehdon sisällä. Palauttaa { lat, lon, id, alarivi, wiki, lahde } tai null (paikka hylätään).
 */
export async function paikanKoordinaatit(haku, p, viite) {
  const lahella = (k) => Number.isFinite(k?.lat) && Number.isFinite(k?.lon) && (!viite || etaisyys(viite, k) <= OPAS_KAUPUNGIN_SADE_M);
  const kokeillut = new Set();
  const vaiheet = [
    () => (p.wikipedia ? wikipediaKysely(haku, `&redirects=1&titles=${encodeURIComponent(p.wikipedia)}`) : []),
    () => wikidataHaku(haku, p.nimi, 'fi'),
    () => (p.wikipedia ? wikidataHaku(haku, p.wikipedia.replace(/,.*$/, ''), 'en') : []),
    () => wikipediaKysely(haku, `&generator=search&gsrlimit=2&gsrsearch=${encodeURIComponent(p.wikipedia ?? p.nimi)}`),
  ];
  for (const vaihe of vaiheet) {
    for (const e of await vaihe()) {
      const avain = e.id ?? e.otsikko;
      if (!avain || kokeillut.has(avain)) continue;
      kokeillut.add(avain);
      const k = e.k ?? (e.id ? await wikidataKoordinaatti(haku, e.id) : null);
      if (!lahella(k)) continue;
      const wd = e.id ? (await wikidataTiedot(haku, [e.id]))[e.id] : null;
      const wiki = wd?.fi ? { otsikko: wd.fi, kieli: 'fi', url: wikiUrl('fi', wd.fi) }
        : e.otsikko ? { otsikko: e.otsikko, kieli: 'en', url: wikiUrl('en', e.otsikko) } : null;
      return { lat: k.lat, lon: k.lon, id: e.id ?? `en:${e.otsikko}`, alarivi: siivoa(wd?.kuvaus ?? e.kuvaus, 80) || null, wiki, lahde: 'wikipedia' };
    }
  }
  if (lahella(p)) return { lat: p.lat, lon: p.lon, id: `en:${p.wikipedia ?? p.nimi}`, alarivi: null, wiki: null, lahde: 'malli' };
  return null;
}

/** Käyttäjäviesti mallille: kaupunki, nykyinen paikka, kerrotut paikat, edellinen kappale ja toive. */
export function oppaanViesti({ kaupunki, sijainti, toive, kaydyt, edellinenTeksti, isoisa }, kaydytNimet = kaydyt) {
  return [
    `Kaupunki: ${kaupunki ?? '(ei nimeä, katso koordinaatit)'}`,
    sijainti ? `Nykyinen paikka (kamera): ${sijainti.lat.toFixed(5)}, ${sijainti.lon.toFixed(5)}` : '',
    `Pysähdyksiä tähän mennessä: ${kaydyt.length}`,
    kaydytNimet.length ? `Jo kerrotut paikat, viimeisin lopussa (älä toista, paitsi jos pelaaja haluaa kuulla lisää viimeisimmästä): ${kaydytNimet.join('; ')}`
      : 'Ei vielä yhtään pysähdystä.',
    edellinenTeksti ? `Edellinen kappale: ${edellinenTeksti}` : '',
    toive ? `Pelaajan toive: ${toive}` : 'Pelaaja ei ole kertonut toivetta.',
    isoisa ? `Isoisän päiväkirjamerkintä tästä kaupungista (1873): ${isoisa}` : '',
  ].filter(Boolean).join('\n');
}

/** Natiivin nahdyt (Wikidata-tunnukset) nimiksi mallille; nimet sellaisinaan. */
export async function kaydytNimiksi(haku, kaydyt) {
  const ids = [...new Set(kaydyt.filter(onTunnus).map((k) => k.toUpperCase()))];
  const wd = ids.length ? await wikidataTiedot(haku, ids) : {};
  return kaydyt.map((k) => (onTunnus(k) ? wd[k.toUpperCase()]?.fi ?? wd[k.toUpperCase()]?.nimi ?? null : k)).filter(Boolean);
}

function kentta(teksti, nimi) {
  const m = new RegExp(`^\\s*${nimi}\\s*:\\s*(.+)$`, 'im').exec(String(teksti ?? ''));
  return m ? m[1].trim() : null;
}

/**
 * Jäsentää mallin vastauksen: kysymys, pysähdys mallin koordinaatein (worker hakee oikeat paikanKoordinaatit-
 * funktiolla) tai null.
 */
export function jasennaOpas(teksti) {
  const vaihtoehdot = [...String(teksti ?? '').matchAll(/^\s*VAIHTOEHTO\s*:\s*(.+)$/gim)].map((m) => siivoa(m[1], 80)).filter(Boolean).slice(0, 2);
  const kysymys = kentta(teksti, 'KYSYMYS');
  if (kysymys) return { tyyppi: 'kysymys', teksti: siivoa(kysymys, 200), vaihtoehdot };
  const nimi = kentta(teksti, 'NIMI');
  const tekstiOsa = /^\s*TEKSTI\s*:\s*([\s\S]+?)(?=^\s*VAIHTOEHTO\s*:|(?![\s\S]))/im.exec(String(teksti ?? ''))?.[1];
  if (!nimi || !tekstiOsa) return null;
  const luku = (k) => Number(String(kentta(teksti, k) ?? '').replace(',', '.'));
  const lat = luku('LAT'), lon = luku('LON');
  const koko = Number.parseInt(kentta(teksti, 'KOKO') ?? '', 10);
  const korkeus = Number.parseInt(kentta(teksti, 'KORKEUS') ?? '', 10);
  return {
    tyyppi: 'pysahdys',
    nimi: siivoa(nimi, 120),
    wikipedia: siivoa(kentta(teksti, 'WIKIPEDIA'), 200) || null,
    lat: Number.isFinite(lat) && Math.abs(lat) <= 90 ? lat : null,
    lon: Number.isFinite(lon) && Math.abs(lon) <= 180 ? lon : null,
    koko_m: Number.isFinite(koko) ? Math.min(3000, Math.max(20, koko)) : 150,
    ...(Number.isFinite(korkeus) && korkeus > 0 ? { korkeus_m: Math.min(1000, korkeus) } : {}),
    teksti: siivoa(tekstiOsa.replace(/^\s*KORKEUS\s*:.*$/gim, ''), 900),
    vaihtoehdot,
  };
}
