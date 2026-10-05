/*
 * ELÄVÄ OPAS (omistaja 5.10.2026 klo 17.5x, Päätoimittajan erä; ensimmäinen testikaupunki Kööpenhamina).
 *
 * Kertoja William puhuu reaaliajassa, Sonnet valitsee seuraavan paikan ja kirjoittaa kerronnan, ja kamera lentää
 * paikasta toiseen. Mitään ei kirjoiteta etukäteen. Tämä moduuli on oppaan "pää" ilman verkkoa ja mallia:
 *   - paikkaehdokkaat (haeEhdokkaat, kaupunginSijainti): nimi, koordinaatit ja Wikidatan yksirivinen kuvaus, jotta
 *     kamera osuu oikeaan rakennukseen. KERRONTA TULEE SONNETIN OMASTA TIEDOSTA (omistaja 5.10. klo 18.0x): Wikipedian
 *     tiivistelmiä (extract) ei haeta eikä anneta mallille; Wikipedia tulee myöhemmin vain tarkkoihin kysymyksiin.
 *   - kehote (OPAS_KEHOTE, Päätoimittajan tyyliohje 5.10.) ja käyttäjäviesti (oppaanViesti),
 *   - mallin rivimuotoisen vastauksen jäsennys (jasennaOpas): valittu numero tarkistetaan ehdokkaista, ja jokaisen
 *     kappaleen perään tulee tasan kaksi vastausvaihtoehtoa (kuten Pulun jatkot; napautus tulee toive-kenttään).
 * Kaupungin vaihto (natiivin Vaihda kohde -valikko): pyyntö { kaupunki, sijainti, toive: null } tyhjin nahdyt; worker
 * on tilaton, joten uusi kaupunki alkaa siitä.
 * Worker (worker.js hoidaOpas) hoitaa rajat ja mallikutsun; ääni kulkee puhereitillä persoonalla 'opas'.
 */

export const OPAS_SADE_M = 10000;          // Wikipedian geohaun suurin säde
export const OPAS_EHDOKKAITA = 20;         // nimi, kuvaus ja etäisyys mallille
export const OPAS_KAYDYT = 40;
export const OPAS_TOIVE_KATTO = 300;
const UA = 'Matkakirja-opas/1.0 (https://matkakirja.app; peli@matkakirja.app)';
const KIELET = ['fi', 'en'];   // kaupungin sijainti: fi, sitten en

export const OPAS_KEHOTE = `Olet Matkakirja-pelin kertoja ja opas, ja puhut suomea. Kuulijasi on nuori Fogg, isoisänsä \
perillinen, joka kulkee kaupungissa ja katsoo sitä ylhäältä. Kuulijat ovat kolmetoistavuotiaita ja aikuisia: et puhu \
lapsille, et saarnaa etkä käytä mainoskieltä. Et ole Pulu.

NYKYAIKA. Kerrot paikoista sellaisina kuin ne ovat nyt. Historia on taustaa, ei pääosa.

FAKTAT. Käytät vain varmaa yleistietoa. Jos et ole varma, jätät asian pois. Et keksi lukuja, nimiä etkä sitaatteja.

MUOTO. Yksi kappale pysähdystä kohden: neljäkymmentä–seitsemänkymmentä sanaa, kahdesta neljään virkettä, ja kappale \
alkaa paikan nimellä. Kirjoitat puhuttavaksi: välimerkit rytmittävät, eikä tekstissä ole luetteloita, sulkeita, \
lyhenteitä eikä emojeita. Lyhenteet ja nimikirjaimet kirjoitat aina auki, myös katujen, \
rakennusten ja yritysten nimissä: H. C. Andersen on Hans Christian Andersen ja H. C. Andersens Boulevard on Hans \
Christian Andersenin bulevardi. Tekstissä ei ole yhtään pisteellistä lyhennettä. Vuosiluvut ja numerot kirjoitat sanoina. Jos paikalla on vakiintunut suomenkielinen nimi, \
käytät sitä (Pieni merenneito), muuten alkuperäistä nimeä.

SISÄLTÖ. Kerrot jokaisesta paikasta yhden kiinnostavan yksityiskohdan, jonka paikan päällä voi itse nähdä tai kokea. \
Käytännön vinkki sopii joskus, esimerkiksi vartionvaihto kello kaksitoista.

LISÄÄ. Jos pelaaja haluaa kuulla lisää nykyisestä paikasta, valitset ehdokkaan numero nolla ja kerrot siitä \
uuden yksityiskohdan.

JÄRJESTYS. Valitset seuraavan paikan läheltä edellistä, ellei pelaaja toivo muuta, ja vaihtelet paikkatyyppejä: \
rakennus, aukio, puisto, satama, museo, moderni arkkitehtuuri. Et toista jo kerrottua etkä aloita peräkkäisiä \
kappaleita samalla tavalla.

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
PYSÄHDYS: <ehdokkaan numero listasta>
NIMI: <paikan nimi suomeksi tai alkuperäisenä>
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

/** Pyynnön kentät siivottuina. */
export function siivoaOpasPyynto(runko) {
  const s = runko?.sijainti;
  const lat = Number(s?.lat), lon = Number(s?.lon);
  const sijainti = Number.isFinite(lat) && Number.isFinite(lon) && Math.abs(lat) <= 90 && Math.abs(lon) <= 180
    && !(lat === 0 && lon === 0) ? { lat, lon } : null;
  return {
    kaupunki: siivoa(runko?.kaupunki, 80) || null,
    sijainti,
    toive: siivoa(runko?.toive, OPAS_TOIVE_KATTO) || null,
    kaydyt: (Array.isArray(runko?.kaydyt) ? runko.kaydyt : []).map((k) => siivoa(k, 200)).filter(Boolean).slice(-OPAS_KAYDYT),
    isoisa: siivoa(runko?.isoisa, 900) || null,
  };
}

async function haeJson(haku, url) {
  const v = await haku(url, { headers: { 'user-agent': UA, accept: 'application/json' } });
  if (!v.ok) throw new Error(`wikipedia ${v.status}`);
  return v.json();
}

/** Wikipedian tiivistelmä (REST): { otsikko, kieli, url, tiivistelma, lat, lon, kuva } tai null. */
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

/*
 * EHDOKKAAT. Lähimmät ensin tuottivat arkisia kohteita (baari, bussiterminaali), joten järjestys on merkittävyys ×
 * läheisyys: Wikipedian geohaku (en, 300 lähintä artikkelia 10 km:n säteellä) → Wikidatan kieliversioiden määrä
 * (vakaa merkittävyyden mittari), suomenkielisen artikkelin nimi ja yksirivinen kuvaus (fi, muuten en) → pisteet =
 * kieliversiot / (1 + etäisyys / 1,5 km). Tapahtumat, organisaatiot ja hallintoalueet (kuvauksen perusteella) eivät
 * ole pysähdyksiä. Artikkelien tekstiä ei haeta (omistaja 18.0x).
 */
const EI_PAIKKA = /(historic fire|diocese|battle|war\b|siege|assault|contest|competition|festival|riots?|fire of|agency|regulatory|institute|union\b|treaty|municipality|capital and|most populous|election|season|football|team|club\b|company|organi[sz]ation|ministry|party|newspaper|band\b|album|film\b|television|runestone in)/i;

async function geohaku(haku, sijainti) {
  const d = await haeJson(haku, 'https://en.wikipedia.org/w/api.php?action=query&format=json&generator=geosearch'
    + `&ggscoord=${sijainti.lat}%7C${sijainti.lon}&ggsradius=${OPAS_SADE_M}&ggslimit=300`
    + '&prop=pageprops%7Cdescription%7Ccoordinates&ppprop=wikibase_item&colimit=max');
  return Object.values(d?.query?.pages ?? {})
    .filter((p) => p.pageprops?.wikibase_item && p.coordinates?.[0])
    .map((p) => ({ otsikko: p.title, id: p.pageprops.wikibase_item, kuvaus: p.description ?? '',
      lat: p.coordinates[0].lat, lon: p.coordinates[0].lon }));
}

async function wikidata(haku, ids) {
  const tulos = {};
  const erat = Array.from({ length: Math.ceil(ids.length / 50) }, (_, i) => ids.slice(i * 50, i * 50 + 50));
  await Promise.all(erat.map(async (era) => {
    try {
      const d = await haeJson(haku, 'https://www.wikidata.org/w/api.php?action=wbgetentities&format=json'
        + `&props=sitelinks%7Cdescriptions&languages=fi%7Cen&ids=${era.join('%7C')}`);
      for (const [id, e] of Object.entries(d?.entities ?? {})) {
        const linkit = Object.keys(e?.sitelinks ?? {}).filter((k) => /wiki$/.test(k) && !/^(commons|species|wikidata|meta)wiki$/.test(k));
        tulos[id] = { maara: linkit.length, fi: e?.sitelinks?.fiwiki?.title ?? null,
          kuvaus: e?.descriptions?.fi?.value ?? e?.descriptions?.en?.value ?? null };
      }
    } catch { /* erä ilman pisteitä */ }
  }));
  return tulos;
}

const wikiUrl = (kieli, otsikko) => `https://${kieli}.wikipedia.org/wiki/${encodeURIComponent(otsikko.replace(/ /g, '_'))}`;

/**
 * Palauttaa { ehdokkaat, kaydytNimet }: ehdokas = { numero, otsikko, kieli, id, url, lat, lon, alarivi, etaisyys_m,
 * kieliversiot }. kaydytNimet: natiivin nahdyt (Wikidata-tunnukset) nimiksi mallille, kun ne osuvat geohakuun.
 * `edellinen` (viimeksi nähty tunnus tai nimi): jos se löytyy, se on ehdokas numero 0 ("kerro tästä lisää").
 */
export async function haeEhdokkaat(haku, sijainti, kaydyt = [], edellinen = null) {
  const kayty = new Set(kaydyt.map((k) => k.toLowerCase()));
  let sivut = [];
  try { sivut = await geohaku(haku, sijainti); } catch { return { ehdokkaat: [], kaydytNimet: [] }; }
  const kayto = (p) => kayty.has(p.id.toLowerCase()) || kayty.has(p.otsikko.toLowerCase());
  const kaydytSivut = sivut.filter(kayto);
  sivut = sivut.filter((p) => !kayto(p) && !EI_PAIKKA.test(p.kuvaus));
  const wd = await wikidata(haku, [...sivut, ...kaydytSivut].map((p) => p.id));
  const ehdokkaat0 = sivut.map((p) => {
    const d = etaisyys(sijainti, p);
    const w = wd[p.id] ?? { maara: 0, fi: null, kuvaus: null };
    return { ...p, etaisyys_m: d, maara: w.maara, fi: w.fi, wdKuvaus: w.kuvaus, pisteet: w.maara / (1 + d / 1500) };
  }).filter((p) => p.maara >= 2 && !(p.fi && kayty.has(p.fi.toLowerCase())))
    .sort((a, b) => b.pisteet - a.pisteet)
    .slice(0, OPAS_EHDOKKAITA);
  const ehdokas = (p, numero) => {
    const fi = wd[p.id]?.fi ?? null;
    return {
      numero, otsikko: fi ?? p.otsikko, kieli: fi ? 'fi' : 'en', id: p.id,
      url: fi ? wikiUrl('fi', fi) : wikiUrl('en', p.otsikko), lat: p.lat, lon: p.lon,
      alarivi: siivoa(wd[p.id]?.kuvaus || p.kuvaus, 80) || null, etaisyys_m: etaisyys(sijainti, p), kieliversiot: wd[p.id]?.maara ?? 0,
    };
  };
  const e = edellinen && kaydytSivut.find((p) => [p.id, p.otsikko, wd[p.id]?.fi].some((x) => x && x.toLowerCase() === edellinen.toLowerCase()));
  const ehdokkaat = [...(e ? [ehdokas(e, 0)] : []), ...ehdokkaat0.map((p, i) => ehdokas(p, i + 1))];
  return { ehdokkaat, kaydytNimet: kaydytSivut.map((p) => wd[p.id]?.fi ?? p.otsikko) };
}

/** Käyttäjäviesti mallille: tilanne, toive, kerrotut paikat ja numeroidut ehdokkaat (nimi, kuvaus, etäisyys). */
export function oppaanViesti({ kaupunki, toive, kaydyt, isoisa }, ehdokkaat, kaydytNimet = kaydyt) {
  const rivit = [
    `Kaupunki tai alue: ${kaupunki ?? '(kameran sijainti)'}`,
    `Pysähdyksiä tähän mennessä: ${kaydyt.length}`,
    kaydytNimet.length ? `Jo kerrotut paikat (älä toista): ${kaydytNimet.join('; ')}` : 'Ei vielä yhtään pysähdystä.',
    toive ? `Pelaajan toive: ${toive}` : 'Pelaaja ei ole kertonut toivetta.',
    isoisa ? `Isoisän päiväkirjamerkintä tästä kaupungista (1873): ${isoisa}` : '',
    '',
    'EHDOKKAAT (etäisyys nykyisestä paikasta; valitse yksi numerolla tai kysy; kerro omasta tiedostasi):',
    ...ehdokkaat.map((e) => `${e.numero}. ${e.otsikko}${e.alarivi ? ` (${e.alarivi})` : ''} — `
      + (e.numero === 0 ? 'nykyinen paikka, vain jos pelaaja haluaa kuulla siitä lisää' : `${e.etaisyys_m} m`)),
  ];
  return rivit.filter((r, i) => r !== '' || i === 5).join('\n');
}

/** Jäsentää mallin vastauksen. Palauttaa pysähdyksen (ehdokkaan koordinaatein), kysymyksen tai null. */
export function jasennaOpas(teksti, ehdokkaat) {
  const kentta = (nimi) => {
    const m = new RegExp(`^\\s*${nimi}\\s*:\\s*(.+)$`, 'im').exec(String(teksti ?? ''));
    return m ? m[1].trim() : null;
  };
  const vaihtoehdot = [...String(teksti ?? '').matchAll(/^\s*VAIHTOEHTO\s*:\s*(.+)$/gim)].map((m) => siivoa(m[1], 80)).filter(Boolean).slice(0, 2);
  const kysymys = kentta('KYSYMYS');
  if (kysymys) return { tyyppi: 'kysymys', teksti: siivoa(kysymys, 200), vaihtoehdot };
  const numero = Number.parseInt(kentta('PYSÄHDYS') ?? kentta('PYSAHDYS') ?? '', 10);
  const e = ehdokkaat.find((x) => x.numero === numero);
  const tekstiOsa = /^\s*TEKSTI\s*:\s*([\s\S]+?)(?=^\s*VAIHTOEHTO\s*:|(?![\s\S]))/im.exec(String(teksti ?? ''))?.[1];
  if (!e || !tekstiOsa) return null;
  const koko = Number.parseInt(kentta('KOKO') ?? '', 10);
  const korkeus = Number.parseInt(kentta('KORKEUS') ?? '', 10);
  return {
    tyyppi: 'pysahdys',
    id: e.id,
    nimi: siivoa(kentta('NIMI') ?? e.otsikko, 120),
    alarivi: e.alarivi,
    lat: e.lat, lon: e.lon,
    koko_m: Number.isFinite(koko) ? Math.min(3000, Math.max(20, koko)) : 150,
    ...(Number.isFinite(korkeus) && korkeus > 0 ? { korkeus_m: Math.min(1000, korkeus) } : {}),
    teksti: siivoa(tekstiOsa.replace(/^\s*KORKEUS\s*:.*$/gim, ''), 900),
    wiki: { otsikko: e.otsikko, kieli: e.kieli, url: e.url },
    kuva: null,
    vaihtoehdot,
  };
}
