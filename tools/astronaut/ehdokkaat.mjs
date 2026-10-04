/*
 * ASTRONAUTTIKUVIEN EHDOKKAAT EUROOPAN PELIKAUPUNGEILLE (Pelikoodari 4.10.2026; Päätoimittajan erä, omistaja 18.2x
 * "lisätään niitä vain": tavoite noin 100 eurooppalaista kohdetta). Haku oli käsityötä (8 kohdetta kahdessa tunnissa);
 * tämä työkalu tekee haun ja Sisältökirjuri valitsee vain katsomalla.
 *
 *   node tools/astronaut/ehdokkaat.mjs [--kaupungit lontoo,pariisi] [--kaikki] [--ulos <kansio>] [--sade 40] [--enint 12]
 *   node tools/astronaut/ehdokkaat.mjs --kohteet valinnat.json      → KOHTEET-lohko hae-satelliittihavainnot.mjs:ään
 *
 * 1. Kaupungit: Euroopan paketin (js/packs/europe.js) kaupungit, paikka maailmankartan pallopisteestä. Ohitetaan ne,
 *    joilla on jo satelliittikohde --sade km:n (oletus 40) päässä (hae-satelliittihavainnot.mjs KOHTEET ja
 *    js/linssit/satelliitti-data.js); --kaikki ottaa mukaan nekin.
 * 2. Haku: (a) NASAn Gateway to Astronaut Photography of Earth, tekstihaku luetteloiduista kuvista (maantieteellinen nimi
 *    ja tunnistetut kohteet) englanninkielisellä nimellä, pilvisyys 0–10 %, kuvan keskipiste ≤ 75 km kaupungista
 *    (keskipisteettömät ≤ 150 km, merkitty; alle 6 ehdokasta → ensin 300 km (seutukohteet), sitten myös pilvisyys
 *    11–25 %, merkitty; etäisyys näkyy arkissa); (b) NASAn kuvakirjasto images-api (q="<nimi>", "<nimi> ISS", "<nimi> night"),
 *    vain miehitettyjen lentojen kuvat (iss…, sts…), kuvauksessa kaupungin nimi. Englanninkielinen nimi suomenkielisen
 *    Wikipedian kielilinkistä (välimuisti ulos-kansiossa).
 *    Lähde näkyy arkissa: "images-api" (resolvoituu heti) tai "Gateway" (hae-satelliittihavainnot.mjs hakee Gatewaysta).
 *    Duplikaatit pois (Sisältökirjuri 4.10.): kuva, joka on jo jonkin kohteen kuvissa (vertailuTunnus: ISS026-E-26514 =
 *    iss026e026514), ei tule ehdokkaaksi; kuvan keskipiste ≤ 40 km olemassa olevasta kohteesta merkitään ("lähellä …").
 * 3. Järjestys: digitaalinen ennen filmiä, pitkä polttoväli (kaupunki erottuu) ennen lyhyttä, lähin ensin; peräkkäiset
 *    ruudut (sama sarja, ≤ 3 ruudun väli) yhdeksi. Enintään --enint (12) per kaupunki.
 * 4. Tulos <ulos>/<pvm>/: <kaupunki>.jpg (numeroitu pikkukuva-arkki: tunnus, päivä, polttoväli, lähde),
 *    <kaupunki>.json (samat tiedot + täysikokoinen kuva ja lähdesivu) ja yhteenveto.json. Oletus-ulos
 *    /Users/Shared/Claude/proto-3d/lokit/astro-ehdokkaat.
 *
 * Pulun kysymykset (tools/astronaut/qa-era*.json, 2 per tunnus) ovat edelleen oma käsinvaihe.
 *
 * VALINTA (sovittu Sisältökirjurin kanssa): valinnat.json = { "<kaupunki-id>": { nimi, seutu, selite, oletus, kuvat: [{ id, teksti }] } }.
 * --kohteet tulostaa lohkon, jossa tunnus = kaupungin id ja lat/lon pelin kaupungista. Gatewayn tunnukset
 * (ISS026-E-26514) käyvät sellaisinaan: hae-satelliittihavainnot.mjs hakee ne Gatewaysta (haeGatewayKuva).
 *
 * NASAn kuvat ovat public domainia (images.nasa.gov ja eol.jsc.nasa.gov). Kuvia ei tuoda repoon.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { GATEWAY, gatewayOsoitteet, gatewayTunnus } from './gateway.mjs';

export { GATEWAY, gatewayOsoitteet, gatewayTunnus };

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const RAJAPINTA = 'https://images-api.nasa.gov';
const KIELILINKIT = 'https://fi.wikipedia.org/w/api.php';
const UA = { 'User-Agent': 'MatkakirjaTyokalu/1.0 (https://matkakirja.app)' };
const OLETUS_ULOS = '/Users/Shared/Claude/proto-3d/lokit/astro-ehdokkaat';

// --- apufunktiot (testattavat) ------------------------------------------------------------------

/** Isoympyräetäisyys km. */
export function etaisyysKm(a, b) {
  const r = Math.PI / 180;
  const dLat = (b.lat - a.lat) * r, dLon = (b.lon - a.lon) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLon / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

/**
 * Vertailutunnus duplikaattien tunnistukseen (Sisältökirjuri 4.10.: sama kuva eri tunnuksilla): Gateway ISS026-E-26514 ja
 * images-api iss026e026514 / iss026e26514 → "iss026e26514"; muut pieniksi kirjaimiksi.
 */
export function vertailuTunnus(id) {
  const t = gatewayTunnus(id);
  if (t && t.roll === 'E') return `${t.mission.toLowerCase()}e${Number.parseInt(t.frame, 10)}`;
  const m = String(id ?? '').toLowerCase().match(/^([a-z]+\d+)e0*(\d+)$/);
  if (m) return `${m[1]}e${m[2]}`;
  // Filmikuvat: STS059-213-19 = sts059-213-019.
  const f = String(id ?? '').toLowerCase().match(/^([a-z]+\d+[a-z]?)-([a-z0-9]+)-0*(\d+[a-z]?)$/);
  return f ? `${f[1]}-${f[2]}-${f[3]}` : String(id ?? '').toLowerCase();
}

/** Gatewayn tulostaulukon (ShowQueryResults-TextTable.pl) rivit. */
export function jasennaGatewayTaulu(html) {
  const rivit = [];
  for (const tr of String(html).match(/<tr[\s\S]*?<\/tr>/gi) ?? []) {
    const solut = [...tr.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((m) => m[1].replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').trim());
    if (solut.length < 9 || !gatewayTunnus(solut[0])) continue;
    const [id, pvm, lat, lon, geon, feat, mlfeat, fclt, tyyppi] = solut;
    rivit.push({
      id, aika: /^\d{8}$/.test(pvm) ? `${pvm.slice(0, 4)}-${pvm.slice(4, 6)}-${pvm.slice(6, 8)}`
        : /^\d{6}/.test(pvm) ? `${pvm.slice(0, 4)}-${pvm.slice(4, 6)}` : pvm,
      lat: Number(lat), lon: Number(lon), geon, kohteet: [feat, mlfeat].filter(Boolean).join(' · '),
      polttovali: Number(fclt) || null, keskipiste: /With Center Point/i.test(tyyppi),
    });
  }
  return rivit;
}

/** Peräkkäiset ruudut (sama sarja, ≤ 3 ruudun väli) yhdeksi: ensimmäinen järjestyksessä jää. */
export function karsiSarjat(ehdokkaat) {
  const jaljella = [];
  for (const e of ehdokkaat) {
    const t = gatewayTunnus(e.id);
    const n = t ? Number.parseInt(t.frame, 10) : NaN;
    const sama = t && jaljella.some((x) => {
      const u = gatewayTunnus(x.id);
      return u && u.mission === t.mission && u.roll === t.roll && Math.abs(Number.parseInt(u.frame, 10) - n) <= 3;
    });
    if (!sama) jaljella.push(e);
  }
  return jaljella;
}

/** Järjestys: digitaalinen ennen filmiä, polttoväli ≥ 180 mm ensin, sitten lähin. */
export function jarjesta(ehdokkaat) {
  const digi = (e) => (gatewayTunnus(e.id)?.roll === 'E' || /^iss\d+e/i.test(e.id) ? 0 : 1);
  const pitka = (e) => ((e.polttovali ?? 0) >= 180 ? 0 : 1);
  return [...ehdokkaat].sort((a, b) => digi(a) - digi(b) || pitka(a) - pitka(b) || (a.km ?? 999) - (b.km ?? 999));
}

/** valinnat.json → KOHTEET-lohko (lähdekoodina), kaupungin paikka pelistä. */
export function kohteetLohko(valinnat, kaupungit) {
  const osat = [];
  for (const [kid, v] of Object.entries(valinnat)) {
    const k = kaupungit.find((x) => x.id === kid);
    if (!k) throw new Error(`${kid}: ei pelin Euroopan kaupunki`);
    if (!v.kuvat?.length) throw new Error(`${kid}: kuvat puuttuu`);
    const oletus = v.oletus ?? v.kuvat[0].id;
    if (!v.kuvat.some((x) => x.id === oletus)) throw new Error(`${kid}: oletus ${oletus} ei ole kuvissa`);
    for (const x of v.kuvat) if (!x.id || !x.teksti) throw new Error(`${kid}: kuvalta puuttuu id tai teksti`);
    const s = JSON.stringify;
    osat.push('  {\n'
      + `    tunnus: ${s(kid)}, nimi: ${s(v.nimi ?? k.nimi)}, seutu: ${s(v.seutu)}, lat: ${k.lat}, lon: ${k.lon},\n`
      + `    selite: ${s(v.selite)},\n`
      + `    oletus: ${s(oletus)},\n`
      + '    kuvat: [\n'
      + v.kuvat.map((x) => `      { id: ${s(x.id)}, teksti: ${s(x.teksti)} },\n`).join('')
      + '    ],\n  },\n');
  }
  return osat.join('');
}

// --- aineisto -------------------------------------------------------------------------------

/** Euroopan pelikaupungit paikkoineen: [{ id, nimi, wiki, lat, lon }]. */
export async function euroopanKaupungit() {
  const { EUROPE } = await import('../../js/packs/europe.js');
  const mk = (await import('../../js/packs/maailmankartta.js'));
  const paketti = Object.values(mk).find((v) => v && v.cities);
  const kaikki = Array.isArray(paketti.cities) ? paketti.cities : Object.values(paketti.cities);
  const eu = Array.isArray(EUROPE.cities) ? EUROPE.cities : Object.values(EUROPE.cities);
  return eu.map((c) => {
    const p = kaikki.find((x) => x.id === c.id)?.pallo;
    return p ? { id: c.id, nimi: c.name, wiki: c.wiki ?? c.name, lat: p.lat, lon: p.lon } : null;
  }).filter(Boolean);
}

/** Nykyiset satelliittikohteet (työkalun luettelo ja aineisto) ja niiden kuvat vertailutunnuksina. */
export async function nykyisetKohteet() {
  const { KOHTEET } = await import('../hae-satelliittihavainnot.mjs');
  const { SATELLIITTI_KOHTEET } = await import('../../js/linssit/satelliitti-data.js');
  const kuvat = new Map();
  for (const k of KOHTEET) for (const x of k.kuvat) kuvat.set(vertailuTunnus(x.id), k.tunnus);
  for (const k of SATELLIITTI_KOHTEET) for (const h of k.havainnot) kuvat.set(vertailuTunnus(h.id), k.tunnus);
  return { kohteet: [...KOHTEET, ...SATELLIITTI_KOHTEET].map((k) => ({ tunnus: k.tunnus, lat: k.lat, lon: k.lon })), kuvat };
}

// --- haut -----------------------------------------------------------------------------------

async function hae(osoite, asetukset = {}) {
  for (let yritys = 0; ; yritys += 1) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const v = await fetch(osoite, { ...asetukset, headers: { ...UA, ...(asetukset.headers ?? {}) }, signal: AbortSignal.timeout(60000) });
      if (!v.ok) throw new Error(`${v.status} ${osoite}`);
      return v;
    } catch (e) {
      if (yritys >= 2) throw e;
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => { setTimeout(r, 2000 * (yritys + 1)); });
    }
  }
}

/** Englanninkieliset nimet suomenkielisen Wikipedian kielilinkeistä (välimuisti). */
async function englanniksi(kaupungit, valimuisti) {
  const muisti = existsSync(valimuisti) ? JSON.parse(readFileSync(valimuisti, 'utf8')) : {};
  const puuttuu = kaupungit.filter((k) => !(k.id in muisti));
  for (let i = 0; i < puuttuu.length; i += 40) {
    const era = puuttuu.slice(i, i + 40);
    const q = new URLSearchParams({ action: 'query', titles: era.map((k) => k.wiki).join('|'), prop: 'langlinks', lllang: 'en', lllimit: 'max', redirects: '1', format: 'json' });
    // eslint-disable-next-line no-await-in-loop
    const d = await (await hae(`${KIELILINKIT}?${q}`)).json();
    const ohjaus = new Map([...(d.query?.redirects ?? []), ...(d.query?.normalized ?? [])].map((r) => [r.from, r.to]));
    const sivut = Object.values(d.query?.pages ?? {});
    for (const k of era) {
      let t = k.wiki;
      while (ohjaus.has(t)) t = ohjaus.get(t);
      const en = sivut.find((s) => s.title === t)?.langlinks?.[0]?.['*'];
      muisti[k.id] = (en ?? k.nimi).replace(/\s*\(.*\)$/, '').replace(/,.*$/, '');
    }
  }
  writeFileSync(valimuisti, JSON.stringify(muisti, null, 2));
  return muisti;
}

/** Gatewayn tekstihaku (kohteet ja maantieteellinen nimi), pilvisyysluokat (oletus 0–10 %). */
async function gatewayHaku(nimi, pilvet = ['clouds0', 'clouds10']) {
  const runko = new URLSearchParams({ feat: nimi, SearchGeonCB: 'on', SearchFeatCB: 'on' });
  for (const p of pilvet) runko.set(p, 'on');
  const ohjaus = await (await hae(`${GATEWAY}/SearchPhotos/Technical.pl`, { method: 'POST', body: runko })).text();
  const tulos = ohjaus.match(/ShowQueryResults-TextTable\.pl\?results=(\d+)/);
  if (!tulos) return [];
  const html = await (await hae(`${GATEWAY}/SearchPhotos/ShowQueryResults-TextTable.pl?results=${tulos[1]}`)).text();
  return jasennaGatewayTaulu(html);
}

/** images-api: miehitettyjen lentojen kuvat, joiden kuvauksessa nimi esiintyy. */
async function kirjastoHaku(nimi) {
  const loydetyt = new Map();
  for (const q of [nimi, `${nimi} ISS`, `${nimi} night`]) {
    // eslint-disable-next-line no-await-in-loop
    const d = await (await hae(`${RAJAPINTA}/search?${new URLSearchParams({ q, media_type: 'image' })}`)).json();
    for (const it of d.collection?.items ?? []) {
      const t = it.data?.[0] ?? {};
      const id = t.nasa_id ?? '';
      if (!/^(iss\d+e\d+|sts\d+)/i.test(id) || loydetyt.has(id)) continue;
      const teksti = `${t.title ?? ''} ${t.description ?? ''}`;
      if (!teksti.toLowerCase().includes(nimi.toLowerCase())) continue;
      loydetyt.set(id, {
        id, lahde: 'images-api', aika: String(t.date_created ?? '').slice(0, 10), polttovali: null, km: null,
        kohteet: String(t.title ?? '').slice(0, 120), pikku: it.links?.find((l) => /thumb|small/i.test(l.href ?? ''))?.href ?? it.links?.[0]?.href,
        kuva: null, sivu: `https://images.nasa.gov/details/${id}`,
      });
    }
  }
  return [...loydetyt.values()];
}

/** Yhden kaupungin ehdokkaat (molemmat lähteet, järjestettynä ja karsittuna; jo käytetyt kuvat pois). */
async function kaupunginEhdokkaat(k, en, enint, nykyiset) {
  const lahella = (rivit, pilvisyys, maxKm = 75) => rivit
    .map((r) => ({ ...r, km: Number.isFinite(r.lat) ? etaisyysKm(k, r) : null }))
    .filter((r) => r.km != null && r.km <= (r.keskipiste ? maxKm : 2 * maxKm))
    .map((r) => ({ ...r, pilvisyys, lahde: r.keskipiste ? 'Gateway' : 'Gateway, ei keskipistettä', ...gatewayOsoitteet(r.id) }));
  const selkeat = await gatewayHaku(en).catch(() => []);
  let gw = lahella(selkeat, '≤ 10 %');
  // Seutukohde (Islanti, Alpit, Lappi, Kreeta, Sisilia): pelin piste on seudun keskellä → alle 6 ehdokasta → 300 km.
  if (karsiSarjat(gw).length < 6) gw = lahella(selkeat, '≤ 10 %', 300);
  // Pilvinen seutu (esim. Helsinki: 3 kuvaa ≤ 10 %): yhä alle 6 → myös 11–25 %, merkittynä arkkiin.
  if (karsiSarjat(gw).length < 6) gw = [...gw, ...lahella(await gatewayHaku(en, ['clouds25']).catch(() => []), '11–25 %', 300)];
  const kirjasto = (await kirjastoHaku(en).catch(() => [])).map((e) => ({ ...e, lahde: 'images-api' }));
  // Sama kuva molemmista lähteistä: images-api:n rivi jää (sen tiedot tulevat suoraan kirjastosta).
  const kirjastossa = new Set(kirjasto.map((e) => vertailuTunnus(e.id)));
  const kaikki = [...gw.filter((e) => !kirjastossa.has(vertailuTunnus(e.id))), ...kirjasto]
    .filter((e) => !nykyiset.kuvat.has(vertailuTunnus(e.id)));
  for (const e of kaikki) {
    const lahella = Number.isFinite(e.lat) ? nykyiset.kohteet.find((n) => etaisyysKm(e, n) <= 40) : null;
    if (lahella) e.huom = `lähellä kohdetta ${lahella.tunnus}`;
  }
  return karsiSarjat(jarjesta(kaikki)).slice(0, enint);
}

// --- arkki ----------------------------------------------------------------------------------

async function dataUri(osoite) {
  try {
    const v = await hae(osoite);
    return `data:image/jpeg;base64,${Buffer.from(await v.arrayBuffer()).toString('base64')}`;
  } catch { return null; }
}

function arkkiHtml(k, en, ehdokkaat) {
  const solu = (e, i) => `<figure>${e.uri ? `<img src="${e.uri}">` : '<div class="puuttuu">ei pikkukuvaa</div>'}`
    + `<figcaption><b>${i + 1}</b> ${e.id}<br>${e.aika}${e.polttovali ? ` · ${e.polttovali} mm` : ''}${e.km != null ? ` · ${Math.round(e.km)} km` : ''}`
    + `<br><span>${e.lahde}${e.pilvisyys ? ` · pilviä ${e.pilvisyys}` : ''}${e.huom ? ` · <u>${e.huom}</u>` : ''}</span><br><i>${(e.kohteet ?? '').slice(0, 90)}</i></figcaption></figure>`;
  return `<!doctype html><meta charset="utf-8"><style>
    body{margin:0;padding:16px;background:#f3ecdc;font:13px/1.3 -apple-system,Helvetica,sans-serif;color:#2b2116;width:1568px}
    h1{font-size:22px;margin:0 0 12px}.ruudukko{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
    figure{margin:0;background:#fffaf0;border:1px solid #c9b48c;padding:6px}img,.puuttuu{width:100%;height:360px;object-fit:contain;background:#111;display:block}
    .puuttuu{color:#aaa;display:flex;align-items:center;justify-content:center}figcaption{margin-top:4px}b{font-size:16px;color:#9a5a00}span{color:#7a6a50}
  </style><h1>${k.nimi} (${en}) · ${k.id} · ${k.lat.toFixed(2)}, ${k.lon.toFixed(2)} · ${ehdokkaat.length} ehdokasta</h1>
  <div class="ruudukko">${ehdokkaat.map(solu).join('')}</div>`;
}

// --- pääohjelma -----------------------------------------------------------------------------

function lipu(nimi, oletus) {
  const i = process.argv.indexOf(`--${nimi}`);
  if (i < 0) return oletus;
  const v = process.argv[i + 1];
  return v && !v.startsWith('--') ? v : true;
}

async function main() {
  const kaupungit = await euroopanKaupungit();
  const kohteetPolku = lipu('kohteet');
  if (kohteetPolku) {
    process.stdout.write(kohteetLohko(JSON.parse(readFileSync(kohteetPolku, 'utf8')), kaupungit));
    return;
  }
  const sade = Number(lipu('sade', 40));
  const enint = Number(lipu('enint', 12));
  const paiva = new Date().toISOString().slice(0, 10);
  const ulos = join(String(lipu('ulos', OLETUS_ULOS)), paiva);
  mkdirSync(ulos, { recursive: true });
  const nykyiset = await nykyisetKohteet();
  const kohteeton = (k) => !nykyiset.kohteet.some((n) => etaisyysKm(k, n) <= sade);
  const valitut = lipu('kaupungit') ? String(lipu('kaupungit')).split(',') : null;
  const kohde = kaupungit.filter((k) => (valitut ? valitut.includes(k.id)
    : lipu('kaikki') || kohteeton(k)));
  process.stdout.write(`Euroopan kaupunkeja ${kaupungit.length}, satelliittikohteettomia ${kaupungit.filter(kohteeton).length}, haetaan ${kohde.length}\n`);
  const en = await englanniksi(kohde, join(dirname(ulos), 'englanniksi.json'));

  const { avaaChromium } = await import('../selain.mjs');
  const selain = await avaaChromium();
  const sivu = await selain.newPage({ viewport: { width: 1600, height: 800 } });
  const yhteenveto = [];
  try {
    for (const k of kohde) {
      // eslint-disable-next-line no-await-in-loop
      const ehdokkaat = await kaupunginEhdokkaat(k, en[k.id], enint, nykyiset);
      // eslint-disable-next-line no-await-in-loop
      for (const e of ehdokkaat) e.uri = e.pikku ? await dataUri(e.pikku) : null;
      const kelpaa = ehdokkaat.filter((e) => e.uri);
      writeFileSync(join(ulos, `${k.id}.json`), JSON.stringify({ kaupunki: k, nimiEn: en[k.id], ehdokkaat: kelpaa.map(({ uri, ...e }, i) => ({ nro: i + 1, ...e })) }, null, 2));
      if (kelpaa.length) {
        // eslint-disable-next-line no-await-in-loop
        await sivu.setContent(arkkiHtml(k, en[k.id], kelpaa), { waitUntil: 'load' });
        // eslint-disable-next-line no-await-in-loop
        await sivu.screenshot({ path: join(ulos, `${k.id}.jpg`), type: 'jpeg', quality: 82, fullPage: true });
      }
      yhteenveto.push({ id: k.id, nimi: k.nimi, en: en[k.id], ehdokkaita: kelpaa.length, gateway: kelpaa.filter((e) => e.lahde.startsWith('Gateway')).length });
      process.stdout.write(`  ${k.id} (${en[k.id]}): ${kelpaa.length} ehdokasta\n`);
    }
  } finally {
    await selain.close();
  }
  writeFileSync(join(ulos, 'yhteenveto.json'), JSON.stringify(yhteenveto, null, 2));
  process.stdout.write(`Valmis: ${ulos} (${yhteenveto.filter((y) => y.ehdokkaita).length}/${yhteenveto.length} kaupungilla ehdokkaita)\n`);
}

if (process.argv[1] && process.argv[1].endsWith('ehdokkaat.mjs')) await main();
