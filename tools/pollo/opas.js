/*
 * ELÄVÄ OPAS (omistaja 5.10.2026 klo 17.5x, Päätoimittajan erä; ensimmäinen testikaupunki Kööpenhamina).
 *
 * Kertoja William puhuu reaaliajassa, Sonnet valitsee seuraavan paikan ja kirjoittaa kerronnan, ja kamera lentää
 * paikasta toiseen. Mitään ei kirjoiteta etukäteen. Tämä moduuli on oppaan "pää" ilman verkkoa ja mallia:
 *   - Wikipedian geohaku ja tiivistelmät (haeEhdokkaat, kaupunginSijainti): faktat ja kameran paikka tulevat
 *     Wikipediasta, eivät mallin arvauksesta.
 *   - kehote (OPAS_KEHOTE, Päätoimittajan tyyliohje 5.10.) ja käyttäjäviesti (oppaanViesti),
 *   - mallin rivimuotoisen vastauksen jäsennys (jasennaOpas): valittu numero tarkistetaan ehdokkaista.
 * Worker (worker.js hoidaOpas) hoitaa rajat ja mallikutsun; ääni kulkee puhereitillä persoonalla 'opas'.
 */

export const OPAS_SADE_M = 10000;          // Wikipedian geohaun suurin säde
export const OPAS_EHDOKKAITA = 20;         // tiivistelmineen mallille
export const OPAS_TIIVISTELMA = 700;       // merkkiä per ehdokas
export const OPAS_KAYDYT = 40;
export const OPAS_TOIVE_KATTO = 300;
const UA = 'Matkakirja-opas/1.0 (https://matkakirja.app; peli@matkakirja.app)';
const KIELET = ['fi', 'en'];   // kaupungin sijainti: fi, sitten en

export const OPAS_KEHOTE = `Olet Matkakirja-pelin kertoja ja opas, ja puhut suomea. Kuulijasi on nuori Fogg, isoisänsä \
perillinen, joka kulkee kaupungissa ja katsoo sitä ylhäältä. Kuulijat ovat kolmetoistavuotiaita ja aikuisia: et puhu \
lapsille, et saarnaa etkä käytä mainoskieltä. Et ole Pulu.

NYKYAIKA. Kerrot paikoista sellaisina kuin ne ovat nyt. Historia on taustaa, ei pääosa.

FAKTAT. Käytät vain alla annettua Wikipedia-tiivistelmää ja varmaa yleistietoa. Jos et ole varma, jätät asian pois. \
Et keksi lukuja, nimiä etkä sitaatteja.

MUOTO. Yksi kappale pysähdystä kohden: neljäkymmentä–seitsemänkymmentä sanaa, kahdesta neljään virkettä, ja kappale \
alkaa paikan nimellä. Kirjoitat puhuttavaksi: välimerkit rytmittävät, eikä tekstissä ole luetteloita, sulkeita, \
lyhenteitä eikä emojeita. Vuosiluvut ja numerot kirjoitat sanoina. Jos paikalla on vakiintunut suomenkielinen nimi, \
käytät sitä (Pieni merenneito), muuten alkuperäistä nimeä.

SISÄLTÖ. Kerrot jokaisesta paikasta yhden kiinnostavan yksityiskohdan, jonka paikan päällä voi itse nähdä tai kokea. \
Käytännön vinkki sopii joskus, esimerkiksi vartionvaihto kello kaksitoista.

JÄRJESTYS. Valitset seuraavan paikan läheltä edellistä, ellei pelaaja toivo muuta, ja vaihtelet paikkatyyppejä: \
rakennus, aukio, puisto, satama, museo, moderni arkkitehtuuri. Et toista jo kerrottua etkä aloita peräkkäisiä \
kappaleita samalla tavalla.

TOIVE. Tulkitset pelaajan toiveen vapaasti ("jotain outoa", "missä syödään"). Jos toive on epäselvä, kysyt yhden \
lyhyen tarkentavan kysymyksen.

KYSYMYKSET. Ensimmäiseksi kysyt lyhyesti, mitä pelaaja haluaa nähdä, ellei hän ole jo kertonut. Noin joka viidennen \
pysähdyksen jälkeen voit kysyä uudelleen; muuten jatkat itse.

ISOISÄ. Jos alla on isoisän päiväkirjamerkintä tästä kaupungista vuodelta tuhatkahdeksansataaseitsemänkymmentäkolme, \
voit viitata siihen kerran. Muuten et mainitse isoisää etkä keksi hänelle tapahtumia.

Ei poliittisia kannanottoja. Vaikeat historian aiheet käsittelet asiallisesti.

VASTAUKSEN MUOTO — tasan toinen näistä, ei mitään muuta:
PYSÄHDYS: <ehdokkaan numero listasta>
NIMI: <paikan nimi suomeksi tai alkuperäisenä>
KOKO: <kohteen halkaisija tai pituus metreinä kameran kehystystä varten, kokonaisluku>
KORKEUS: <kohteen korkeus metreinä, jos se on merkittävä (torni, kirkko); muuten jätä rivi pois>
TEKSTI: <kappale>

tai

KYSYMYS: <yksi lyhyt kysymys pelaajalle>
VAIHTOEHTO: <lyhyt vastausvaihtoehto>
VAIHTOEHTO: <toinen lyhyt vastausvaihtoehto>`;

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
export async function haeTiivistelma(haku, kieli, otsikko) {
  try {
    const d = await haeJson(haku, `https://${kieli}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(otsikko.replace(/ /g, '_'))}`);
    if (d?.type === 'disambiguation') return null;
    const lat = Number(d?.coordinates?.lat), lon = Number(d?.coordinates?.lon);
    return {
      otsikko: d.title ?? otsikko, kieli, url: d?.content_urls?.desktop?.page ?? null,
      id: d?.wikibase_item ?? `${kieli}:${d.title ?? otsikko}`, alarivi: siivoa(d?.description, 80) || null,
      tiivistelma: siivoa(d?.extract, OPAS_TIIVISTELMA),
      lat: Number.isFinite(lat) ? lat : null, lon: Number.isFinite(lon) ? lon : null,
      kuva: d?.thumbnail?.source ?? null,
    };
  } catch {
    return null;
  }
}

/** Kaupungin koordinaatit Wikipediasta (fi, sitten en). */
export async function kaupunginSijainti(haku, kaupunki) {
  for (const kieli of KIELET) {
    const t = await haeTiivistelma(haku, kieli, kaupunki);
    if (t?.lat != null) return { lat: t.lat, lon: t.lon };
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
 * (vakaa merkittävyyden mittari) ja suomenkielisen artikkelin nimi → pisteet = kieliversiot / (1 + etäisyys / 1,5 km).
 * Tapahtumat, organisaatiot ja hallintoalueet (kuvauksen perusteella) eivät ole pysähdyksiä. Kärjestä tiivistelmät
 * (suomeksi, jos artikkeli on) ja koordinaatit Wikipediasta.
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

async function kieliversiot(haku, ids) {
  const tulos = {};
  const erat = Array.from({ length: Math.ceil(ids.length / 50) }, (_, i) => ids.slice(i * 50, i * 50 + 50));
  await Promise.all(erat.map(async (era) => {
    try {
      const d = await haeJson(haku, `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&props=sitelinks&ids=${era.join('%7C')}`);
      for (const [id, e] of Object.entries(d?.entities ?? {})) {
        const linkit = Object.keys(e?.sitelinks ?? {}).filter((k) => /wiki$/.test(k) && !/^(commons|species|wikidata|meta)wiki$/.test(k));
        tulos[id] = { maara: linkit.length, fi: e?.sitelinks?.fiwiki?.title ?? null };
      }
    } catch { /* erä ilman pisteitä */ }
  }));
  return tulos;
}

export async function haeEhdokkaat(haku, sijainti, kaydyt = []) {
  // Käydyt: Wikidata-tunnukset (natiivin nahdyt) tai otsikot.
  const kayty = new Set(kaydyt.map((k) => k.toLowerCase()));
  let sivut = [];
  try { sivut = await geohaku(haku, sijainti); } catch { return []; }
  sivut = sivut.filter((p) => !kayty.has(p.id.toLowerCase()) && !kayty.has(p.otsikko.toLowerCase()) && !EI_PAIKKA.test(p.kuvaus));
  const kv = await kieliversiot(haku, sivut.map((p) => p.id));
  const pisteytetty = sivut.map((p) => {
    const d = etaisyys(sijainti, p);
    const k = kv[p.id] ?? { maara: 0, fi: null };
    return { ...p, etaisyys_m: d, maara: k.maara, fi: k.fi, pisteet: k.maara / (1 + d / 1500) };
  }).filter((p) => p.maara >= 2 && !(p.fi && kayty.has(p.fi.toLowerCase())))
    .sort((a, b) => b.pisteet - a.pisteet)
    .slice(0, OPAS_EHDOKKAITA);
  const tiivistelmat = await Promise.all(pisteytetty.map(async (p) => {
    const t = (p.fi && await haeTiivistelma(haku, 'fi', p.fi)) || await haeTiivistelma(haku, 'en', p.otsikko);
    if (!t || !t.tiivistelma) return null;
    // Koordinaatit geohausta (sama artikkeli), id Wikidatasta; alarivi englanniksi, jos suomeksi puuttuu.
    return { ...t, id: p.id, lat: t.lat ?? p.lat, lon: t.lon ?? p.lon, alarivi: t.alarivi || p.kuvaus || null,
      etaisyys_m: p.etaisyys_m, kieliversiot: p.maara };
  }));
  return tiivistelmat.filter(Boolean).map((t, i) => ({ ...t, numero: i + 1 }));
}

/** Käyttäjäviesti mallille: tilanne, toive, käydyt ja numeroidut ehdokkaat tiivistelmineen. */
export function oppaanViesti({ kaupunki, toive, kaydyt, isoisa }, ehdokkaat) {
  const rivit = [
    `Kaupunki tai alue: ${kaupunki ?? '(kameran sijainti)'}`,
    `Pysähdyksiä tähän mennessä: ${kaydyt.length}`,
    kaydyt.length ? `Jo kerrotut paikat (älä toista): ${kaydyt.join('; ')}` : 'Ei vielä yhtään pysähdystä.',
    toive ? `Pelaajan toive: ${toive}` : 'Pelaaja ei ole kertonut toivetta.',
    isoisa ? `Isoisän päiväkirjamerkintä tästä kaupungista (1873): ${isoisa}` : '',
    '',
    'EHDOKKAAT (etäisyys nykyisestä paikasta; valitse yksi numerolla tai kysy):',
    ...ehdokkaat.map((e) => `${e.numero}. ${e.otsikko} — ${e.etaisyys_m} m\n${e.tiivistelma}`),
  ];
  return rivit.filter((r, i) => r !== '' || i === 5).join('\n');
}

/** Jäsentää mallin vastauksen. Palauttaa pysähdyksen (ehdokkaan koordinaatein), kysymyksen tai null. */
export function jasennaOpas(teksti, ehdokkaat) {
  const kentta = (nimi) => {
    const m = new RegExp(`^\\s*${nimi}\\s*:\\s*(.+)$`, 'im').exec(String(teksti ?? ''));
    return m ? m[1].trim() : null;
  };
  const kysymys = kentta('KYSYMYS');
  if (kysymys) {
    const vaihtoehdot = [...String(teksti).matchAll(/^\s*VAIHTOEHTO\s*:\s*(.+)$/gim)].map((m) => siivoa(m[1], 80)).filter(Boolean).slice(0, 2);
    return { tyyppi: 'kysymys', teksti: siivoa(kysymys, 200), vaihtoehdot };
  }
  const numero = Number.parseInt(kentta('PYSÄHDYS') ?? kentta('PYSAHDYS') ?? '', 10);
  const e = ehdokkaat.find((x) => x.numero === numero);
  const tekstiOsa = /^\s*TEKSTI\s*:\s*([\s\S]+)$/im.exec(String(teksti ?? ''))?.[1];
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
    kuva: e.kuva ?? null,
  };
}
