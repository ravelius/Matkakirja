#!/usr/bin/env node
/*
 * PÄÄKAUPUNKIEN PILVITYÖKALU — paakaupungit-pilvi/tyokalu.mjs
 *
 *   node paakaupungit-pilvi/tyokalu.mjs konteksti <erä> <id> [<id> ...]
 *   node paakaupungit-pilvi/tyokalu.mjs malli <laudan-kaupunki-id>
 *   node paakaupungit-pilvi/tyokalu.mjs saa <erä>
 *   node paakaupungit-pilvi/tyokalu.mjs tarkista <erä> [<id> ...] [--verkko] [--malli] [--lyhyt]
 *   node paakaupungit-pilvi/tyokalu.mjs lahde <en|fi> "<Wikipedia-otsikko>"
 *   node paakaupungit-pilvi/tyokalu.mjs haku "<Commons-haku>" [määrä]
 *   node paakaupungit-pilvi/tyokalu.mjs esikatselu "<Commons-tiedosto>"
 *
 * Ajetaan repon juuresta, Node 20+, ei riippuvuuksia. Lukee pelin paketit
 * (js/packs/*.js) VAIN lukemiseen ja kirjoittaa vain kansioon
 * paakaupungit-pilvi/<erä>/ (lahde ja esikatselu: tmp-kansioon matkakirja-lahteet, matkakirja-kuvat).
 * Ohje: paakaupungit-pilvi/PILVIOHJE-paakaupungit.md.
 *
 *   lahde      Wikipedian tekstiote tiedostoon (ei kontekstiin): tulostaa polun,
 *              pituuden, Wikidata-tunnuksen, koordinaatit ja väliotsikot. Lue
 *              tiedostosta vain tarvitsemasi kohdat (grep -n, sed -n).
 *   haku       Commons-haku (myös incategory:"…"): vain kelvolliset ehdokkaat
 *              (leveys >= 1200, PD/CC0/CC BY/CC BY-SA, kuva) riveinä
 *              leveys×korkeus | lisenssi | tekijä | päiväys | tiedosto.
 *   esikatselu lataa 900 px esikatselun ja tulostaa polun (avaa Read-työkalulla).
 *
 *   konteksti  kirjoittaa <erä>/<id>/konteksti.json (pelin nykyinen aineisto,
 *              jota EI saa toistaa) ja <erä>/saa-syote.json
 *              (tools/hae-saaperusdata.mjs --tiedosto).
 *   malli      tulostaa olemassa olevan laudan kaupungin samassa muodossa kuin
 *              sisalto.json (esim. dakar, fes) — muotomalli kirjoittajalle.
 *   saa        jäsentää <erä>/saa.txt:n (hae-saaperusdata.mjs:n tuloste)
 *              tiedostoiksi <erä>/<id>/saa.json.
 *   tarkista   <erä>/<id>/sisalto.json: VIRHE = korjattava (exit 1),
 *              VAROITUS = luetaan ja perustellaan RAPORTTI.md:ssä.
 *              --verkko: Commons (olemassa, leveys >= 1200, lisenssi, tekijä)
 *              ja wiki-otsikot (fi tai en). --malli: ohittaa pääkaupunkiehdot.
 *              --lyhyt: vain virheet ja määrät (pääsessiolle).
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const [komento, ...argit] = process.argv.slice(2);
const VERKKO = argit.includes('--verkko') || ['konteksti', 'lahde', 'haku', 'esikatselu'].includes(komento);
// Konttiympäristössä Noden fetch tarvitsee NODE_USE_ENV_PROXY=1 (sama kuin tools/hae-saaperusdata.mjs).
if (VERKKO && !process.env.NODE_USE_ENV_PROXY && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const ajo = spawnSync(process.execPath, process.argv.slice(1), {
    stdio: 'inherit', env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
  });
  process.exit(ajo.status ?? 1);
}

const TYOKANSIO = dirname(fileURLToPath(import.meta.url));
const JUURI = join(TYOKANSIO, '..');
const tuo = (polku) => import(pathToFileURL(join(JUURI, polku)).href);
const UA = { 'User-Agent': 'Matkakirja-pilviajo/1.0 (https://github.com/ravelius/Matkakirja)' };
const PAKAT = ['europe', 'africa', 'asia', 'middleeast', 'northamerica', 'southamerica', 'oceania'];
const VAKIOAIHEET = ['historia', 'kuvataide', 'kirjallisuus', 'musiikki', 'ruoka', 'luonto', 'tiede', 'nykytaide', 'huumori'];
const KARTTATYYPIT = ['rakennus', 'aukio', 'luonto'];
const OSIOT = ['kaupunki', 'artikkeli', 'kysymykset', 'tiedot', 'valokuva', 'kaupunkilehti', 'kohdekartta', 'nahtavyydet'];
const LAHDE_RE = /^(.+), (?:Wikimedia )?Commons \((PD|CC0|CC BY(?:-SA)? \d\.\d(?: [Ii][Gg][Oo])?)\)$/;

async function taulut(nimi, vienti) {
  const ulos = {};
  for (const p of PAKAT) {
    const polku = `js/packs/${p}-${nimi}.js`;
    if (!existsSync(join(JUURI, polku))) continue;
    const m = await tuo(polku);
    for (const [avain, arvo] of Object.entries(m)) if (vienti(avain)) ulos[p] = arvo;
  }
  return ulos;
}
const artikkelit = () => taulut('artikkelit', (a) => a.endsWith('ARTIKKELIT'));
const kysymystaulut = () => taulut('questions', (a) => a.endsWith('_QUESTIONS'));
const tietotaulut = () => taulut('questions', (a) => a.endsWith('_FACTS'));
const valokuvataulut = () => taulut('valokuvat', (a) => a.endsWith('_VALOKUVAT'));

async function lauta() {
  const { MAAILMANKARTTA } = await tuo('js/packs/maailmankartta.js');
  const { PALLON_KAUPUNKIPISTEET } = await tuo('js/packs/maailmankartta-pallopisteet.js');
  const { laudaltaAsteiksi } = await tuo('js/fokusmitat.js');
  const kaupungit = MAAILMANKARTTA.cities.map((c) => {
    const p = c.pallo ?? PALLON_KAUPUNKIPISTEET[c.id] ?? laudaltaAsteiksi('maailmankartta', c.x, c.y);
    return { ...c, lat: p?.lat ?? null, lon: p?.lon ?? null, maa: MAAILMANKARTTA.map.cityCountry?.[c.id] ?? null };
  });
  return { P: MAAILMANKARTTA, kaupungit };
}
const km = (a, b) => {
  const r = Math.PI / 180;
  const h = Math.sin(((b.lat - a.lat) * r) / 2) ** 2
    + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(((b.lon - a.lon) * r) / 2) ** 2;
  return Math.round(12742 * Math.asin(Math.sqrt(h)));
};
const otsikot = (aiheet) => (aiheet ?? []).map((a) => ({ id: a.id, nimi: a.nimi, nostot: (a.nostot ?? []).map((n) => n.otsikko) }));

async function haeJson(url) {
  for (let yritys = 1; ; yritys += 1) {
    try {
      const v = await fetch(url, { headers: UA, signal: AbortSignal.timeout(60000) });
      if (v.status === 429 || v.status >= 500) throw new Error(`HTTP ${v.status}`);
      if (!v.ok) throw new Error(`HTTP ${v.status} (ei uusita)`);
      return await v.json();
    } catch (e) {
      if (yritys >= 6 || /ei uusita/.test(e.message)) throw e;
      await new Promise((r) => setTimeout(r, 2000 * 2 ** yritys));
    }
  }
}

/* ------------------------------------------------------------ konteksti */

async function konteksti(era, idt) {
  if (!era || !idt.length) throw new Error('käyttö: konteksti <erä> <id> [<id> ...]');
  const { PAAKAUPUNKIPISTEET, MAIDEN_PERUSTIEDOT } = await tuo('js/packs/paakaupungit.js');
  const { MAA_KATEGORIAT } = await tuo('js/packs/maa-kategoriat.js');
  const { KULTTUURI_KATEGORIAT } = await tuo('js/packs/kulttuuri-kategoriat.js');
  const { KAUPUNKIKARTAT } = await tuo('js/packs/maakartat.js');
  const { P, kaupungit } = await lauta();
  const art = await artikkelit();
  const avaimet = new Set(Object.values(art).flatMap((t) => Object.keys(t)));
  let valot = [];
  try {
    const o = await haeJson('https://media.matkakirja.app/sisalto/1/uusin.json');
    valot = (await haeJson(`https://media.matkakirja.app/${o.polku}kokoelmat/karttavalot.json`)).alkiot;
  } catch (e) {
    console.warn(`karttavalot ei saatavilla (${e.message}) — lahiNostot jää tyhjäksi`);
  }
  // Lähinostojen tekstin alku, jotta samaa tarinaa ei kirjoiteta toiseen kertaan.
  const { KOHDE_MAAT } = await tuo('js/fokuskohteet.js');
  const { SKANDAALIT } = await tuo('js/packs/skandaalit.js');
  const { HISTORIAN_HETKET } = await tuo('js/packs/historian-hetket.js');
  const tekstit = new Map([
    ...Object.values(KOHDE_MAAT).flat().map((x) => [`kohde:${x.id}`, x.teksti]),
    ...Object.values(SKANDAALIT).flat().map((x) => [`skandaali:${x.id}`, x.teksti]),
    ...HISTORIAN_HETKET.map((x) => [`hetki:${x.id}`, x.teksti]),
  ]);
  const alku = (t) => (typeof t === 'string' ? (t.length > 240 ? `${t.slice(0, 239)}…` : t) : null);
  const saa = [];
  for (const id of idt) {
    const p = PAAKAUPUNKIPISTEET.find((x) => x.id === id);
    if (!p) throw new Error(`${id}: ei ole js/packs/paakaupungit.js:n PAAKAUPUNKIPISTEET-taulussa`);
    const muoto = P.map.countryShapes?.[p.maa] ?? {};
    const maanAvain = muoto.wiki ?? muoto.nimi ?? null;
    const varattu = (k) => avaimet.has(k) || k === maanAvain;
    const wikiEhdotus = varattu(p.nimi) ? `${p.nimi} (kaupunki)` : p.nimi;
    const lahella = kaupungit.filter((c) => c.lat != null).map((c) => ({ c, d: km(p, c) }))
      .filter(({ d }) => d <= 150).sort((a, b) => a.d - b.d)
      .map(({ c, d }) => ({ id: c.id, nimi: c.name, km: d, lehti: otsikot(KULTTUURI_KATEGORIAT[c.id]),
        kohdekartta: (KAUPUNKIKARTAT[c.id]?.kohteet ?? []).map((k) => k.nimi) }));
    const lahiNostot = valot.filter((v) => Number.isFinite(v.lat)).map((v) => ({ v, d: km(p, v) }))
      .filter(({ d }) => d <= 30).sort((a, b) => a.d - b.d)
      .map(({ v, d }) => ({ id: v.id, nimi: v.nimi, lahde: v.lahde, laji: v.laji, km: d,
        teksti: alku(tekstit.get(v.id.replace(/~\d+$/, ''))) }));
    const perus = MAIDEN_PERUSTIEDOT[p.maa] ?? null;
    const k = {
      id, era, nimi: p.nimi, nimiAlkukieli: p.nimiAlkukieli, maa: p.maa, maanNimi: muoto.nimi ?? null,
      asema: p.asema, lat: p.lat, lon: p.lon, wikidata: p.wikidata,
      kevytSisalto: { kuvaus: p.kuvaus, tunnusrakennukset: p.tunnusrakennukset, asukkaat: p.asukkaat },
      maanPerustiedot: perus && { esittely: perus.esittely, genetiivi: perus.genetiivi, kielet: perus.kielet, valuutta: perus.valuutta },
      maalehti: MAA_KATEGORIAT[p.maa] ? otsikot(MAA_KATEGORIAT[p.maa]) : null,
      lahiKaupungit: lahella,
      lahiNostot,
      wiki: { ehdotus: wikiEhdotus, maanAvain, varattuNimi: varattu(p.nimi) },
      huom: 'Tämä on pelin NYKYINEN aineisto: älä toista samoja tarinoita, kuvia tai nostoja. '
        + 'Kevyen pisteen kuvaus ja tunnusrakennukset ovat Sisältökirjurin tarkistamia; '
        + 'ristiriita lähteen kanssa kirjataan faktapohjaan ja RAPORTTI.md:hen.',
    };
    mkdirSync(join(TYOKANSIO, era, id), { recursive: true });
    writeFileSync(join(TYOKANSIO, era, id, 'konteksti.json'), `${JSON.stringify(k, null, 1)}\n`);
    saa.push({ id, lat: Math.round(p.lat * 100) / 100, lon: Math.round(p.lon * 100) / 100 });
    console.log(`${id}: konteksti.json (lähikaupunkeja ${lahella.length}, lähinostoja ${lahiNostot.length}, wiki "${wikiEhdotus}")`);
  }
  writeFileSync(join(TYOKANSIO, era, 'saa-syote.json'), `${JSON.stringify(saa, null, 1)}\n`);
  console.log(`${era}/saa-syote.json: ${saa.length} paikkaa`);
}

/* ------------------------------------------------------------ malli */

async function malli(id) {
  const { P, kaupungit } = await lauta();
  const c = kaupungit.find((x) => x.id === id);
  if (!c) throw new Error(`${id}: ei laudan kaupunki`);
  const loyda = (t, avain) => Object.values(t).find((x) => x?.[avain] !== undefined)?.[avain] ?? null;
  const { KULTTUURI_KATEGORIAT } = await tuo('js/packs/kulttuuri-kategoriat.js');
  const { KAUPUNKIKARTAT } = await tuo('js/packs/maakartat.js');
  const { NAHTAVYYSJUTUT } = await tuo('js/packs/nahtavyysjutut.js');
  const { SAATIEDOT } = await tuo('js/packs/saatiedot.js');
  const kartta = KAUPUNKIKARTAT[id];
  const { polku, varikartta, piirtoRajat, lahde, ...karttaTeksti } = kartta ?? {};
  const ulos = {
    $skeema: 'matkakirja-paakaupunki/1', id, maa: c.maa, era: 'malli',
    kaupunki: { id, name: c.name, wiki: c.wiki ?? c.name, ambience: c.ambience, pallo: { lat: c.lat, lon: c.lon } },
    artikkeli: loyda(await artikkelit(), c.wiki ?? c.name),
    kysymykset: loyda(await kysymystaulut(), id),
    tiedot: loyda(await tietotaulut(), id),
    valokuva: loyda(await valokuvataulut(), id),
    kaupunkilehti: KULTTUURI_KATEGORIAT[id] ?? null,
    kohdekartta: kartta ? karttaTeksti : null,
    nahtavyydet: NAHTAVYYSJUTUT[id] ?? null,
    saatiedot: SAATIEDOT[id] ?? null,
    ehdotukset: { lentoasema: null, huomiot: [`malli: laudan kaupunki ${id} (${P.id})`] },
  };
  process.stdout.write(`${JSON.stringify(ulos, null, 1)}\n`);
}

/* ------------------------------------------------------------ saa */

function saaKomento(era) {
  const polku = join(TYOKANSIO, era, 'saa.txt');
  if (!existsSync(polku)) throw new Error(`${era}/saa.txt puuttuu (aja tools/hae-saaperusdata.mjs ensin)`);
  let n = 0;
  for (const rivi of readFileSync(polku, 'utf8').split('\n')) {
    const m = rivi.match(/^\s*([a-z0-9]+): \{ lat: (-?[\d.]+), lon: (-?[\d.]+), keskilampo: \[([^\]]*)\], sade: \[([^\]]*)\] \},?\s*$/);
    if (!m) continue;
    const luvut = (s) => s.split(',').map((x) => Number(x.trim()));
    const kansio = join(TYOKANSIO, era, m[1]);
    mkdirSync(kansio, { recursive: true });
    writeFileSync(join(kansio, 'saa.json'), `${JSON.stringify({
      lat: Number(m[2]), lon: Number(m[3]), keskilampo: luvut(m[4]), sade: luvut(m[5]),
    })}\n`);
    n += 1;
  }
  console.log(`${n} säärivia → ${era}/<id>/saa.json`);
}

/* ------------------------------------------------------------ tarkista */

// Virkkeiden likimääräinen määrä (varoituksiin): lyhenteiden pisteet pois, sitten välimerkki +
// iso alkukirjain tai numero. Unicode-rajat, koska \b ei tunne ä- ja ö-kirjaimia ("tänään." ≠ "n.").
const virkkeita = (s) => (String(s)
  .replace(/(?<![\p{L}\p{N}])(n|esim|mm|ns|jne|ym|tms|eaa|jaa|eKr|jKr|klo|s|ks|vrt|pl|engl|ransk|lat|kreik|arab)\./gu, '$1')
  .match(/[.?!…]["”»)]?(?=\s+["„«(]?[\p{Lu}\p{N}]|\s*$)/gu) ?? []).length;
const kappaleita = (s) => String(s).split('\n\n').filter((x) => x.trim()).length;

async function tarkista(era, rajaus, { verkko, malliTila, lyhyt }) {
  if (!era) throw new Error('käyttö: tarkista <erä> [<id> ...] [--verkko] [--malli]');
  const eraKansio = join(TYOKANSIO, era);
  const idt = rajaus.length ? rajaus : readdirSync(eraKansio, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(eraKansio, d.name, 'sisalto.json'))).map((d) => d.name);
  const { PAAKAUPUNKIPISTEET } = await tuo('js/packs/paakaupungit.js');
  const { P, kaupungit } = await lauta();
  const ambienssit = new Set(kaupungit.map((c) => c.ambience).filter(Boolean));
  const avaimet = new Set(Object.values(await artikkelit()).flatMap((t) => Object.keys(t)));
  const pakkateksti = readdirSync(join(JUURI, 'js/packs')).filter((f) => f.endsWith('.js'))
    .map((f) => readFileSync(join(JUURI, 'js/packs', f), 'utf8')).join('\n');
  let virheita = 0;
  let varoituksia = 0;

  for (const id of idt) {
    const V = [];
    const W = [];
    const virhe = (s) => V.push(s);
    const varoitus = (s) => W.push(s);
    let s;
    try {
      s = JSON.parse(readFileSync(join(eraKansio, id, 'sisalto.json'), 'utf8'));
    } catch (e) {
      console.log(`VIRHE ${id}: sisalto.json ei lue (${e.message})`);
      virheita += 1;
      continue;
    }
    const p = PAAKAUPUNKIPISTEET.find((x) => x.id === id);
    if (!malliTila && !p) virhe('id ei ole PAAKAUPUNKIPISTEET-taulussa');
    if (s.id !== id) virhe(`id "${s.id}" ei vastaa kansiota`);
    for (const o of OSIOT) if (s[o] == null) virhe(`osio ${o} puuttuu`);
    for (const k of Object.keys(s)) if (![...OSIOT, '$skeema', 'id', 'maa', 'era', 'saatiedot', 'ehdotukset'].includes(k)) varoitus(`tuntematon kenttä ${k}`);

    // kaupunki-rivi
    const k = s.kaupunki ?? {};
    if (k.id !== id) virhe('kaupunki.id ei ole kansion id');
    if (!k.name) virhe('kaupunki.name puuttuu');
    if (!k.wiki) virhe('kaupunki.wiki puuttuu');
    if (!ambienssit.has(k.ambience)) virhe(`kaupunki.ambience "${k.ambience}" ei ole laudan arvoja (${[...ambienssit].join(', ')})`);
    if (!Number.isFinite(k.pallo?.lat) || !Number.isFinite(k.pallo?.lon)) virhe('kaupunki.pallo {lat, lon} puuttuu');
    if (!malliTila) {
      if (kaupungit.some((c) => c.id === id)) virhe('id on jo laudan kaupunki');
      const muoto = P.map.countryShapes?.[s.maa] ?? {};
      if (k.wiki && (avaimet.has(k.wiki) || k.wiki === (muoto.wiki ?? muoto.nimi))) virhe(`kaupunki.wiki "${k.wiki}" on jo artikkeliavain — käytä muotoa "${k.name} (kaupunki)"`);
      if (p && s.maa !== p.maa) virhe(`maa ${s.maa} ≠ ${p.maa}`);
      if (p && k.pallo && (Math.abs(k.pallo.lat - p.lat) > 0.1 || Math.abs(k.pallo.lon - p.lon) > 0.1)) varoitus('kaupunki.pallo poikkeaa yli 0,1° kevyen pisteen sijainnista');
    }

    // artikkeli
    const a = s.artikkeli ?? {};
    const teksti = a.teksti ?? a.artikkeli;
    if (!a.intro || a.intro.length < 600 || a.intro.length > 1200) virhe(`artikkeli.intro ${a.intro?.length ?? 0} mrk (600–1200, tavoite 700–1100)`);
    else if (a.intro.length < 700 || a.intro.length > 1100) varoitus(`artikkeli.intro ${a.intro.length} mrk (tavoite 700–1100)`);
    if (a.intro && ![2, 3].includes(kappaleita(a.intro))) varoitus(`artikkeli.intro ${kappaleita(a.intro)} kappaletta (2–3)`);
    if (a.intro && (virkkeita(a.intro) < 7 || virkkeita(a.intro) > 10)) varoitus(`artikkeli.intro noin ${virkkeita(a.intro)} virkettä (7–10)`);
    const lihat = ((a.intro ?? '').match(/\*\*[^*]+\*\*/g) ?? []).length;
    if (a.intro && (lihat < 1 || lihat > 3)) varoitus(`artikkeli.intro: ${lihat} lihavointia (1–3)`);
    if (!teksti || kappaleita(teksti) !== 3 || teksti.length < 600 || teksti.length > 1100) virhe(`artikkeli.teksti: ${teksti ? `${kappaleita(teksti)} kappaletta, ${teksti.length} mrk` : 'puuttuu'} (3 kappaletta, 600–1100)`);
    if (/!/.test(`${a.intro ?? ''}${teksti ?? ''}`)) virhe('artikkelissa on huutomerkki');

    // kysymykset ja tiedot
    const q = Array.isArray(s.kysymykset) ? s.kysymykset : [];
    if (q.length < 2) virhe(`kysymyksiä ${q.length} (vähintään 2, tavoite 5)`);
    else if (q.length < 5) varoitus(`kysymyksiä ${q.length} (tavoite 5)`);
    if (q.length && (!q.some((x) => x.level === 1) || !q.some((x) => x.level === 3))) varoitus('kysymyksistä puuttuu taso 1 tai taso 3');
    if (new Set(q.map((x) => x.q)).size !== q.length) virhe('sama kysymys kahdesti');
    q.forEach((x, i) => {
      const missa = `kysymys ${i + 1}`;
      if (!x.q?.trim()) virhe(`${missa}: q puuttuu`);
      if (!Array.isArray(x.options) || x.options.length !== 4 || new Set(x.options).size !== 4) virhe(`${missa}: neljä eri vaihtoehtoa`);
      if (!Number.isInteger(x.correct) || x.correct < 0 || x.correct > 3) virhe(`${missa}: correct 0–3`);
      if (![1, 2, 3].includes(x.level)) virhe(`${missa}: level 1–3`);
      if (!x.fact?.trim() || !x.hint?.trim()) virhe(`${missa}: fact ja hint pakollisia`);
      const oikea = x.options?.[x.correct];
      if (oikea && x.hint?.toLowerCase().includes(oikea.toLowerCase())) virhe(`${missa}: vihje paljastaa vastauksen`);
      const lahteet = [x.source].flat().filter(Boolean);
      if (!lahteet.length || lahteet.some((u) => !/^https:\/\/\S+$/.test(u))) virhe(`${missa}: source = https-osoite (tai lista)`);
      else if (!lahteet.some((u) => /\.wikipedia\.org\/wiki\//.test(u))) varoitus(`${missa}: source ei ole Wikipedia-artikkeli`);
      const vaarat = (x.options ?? []).filter((_, j) => j !== x.correct).map((o) => o.length);
      if (oikea && oikea.length > 1.4 * Math.max(...vaarat)) varoitus(`${missa}: oikea vastaus selvästi pisin (tools/tarkista-vaihtoehdot.mjs)`);
    });
    const t = Array.isArray(s.tiedot) ? s.tiedot : [];
    if (t.length < 2) virhe(`tiedot: ${t.length} (vähintään 2, tavoite 3)`);
    else if (t.length < 3) varoitus(`tiedot: ${t.length} (tavoite 3)`);
    if (t.some((x) => typeof x !== 'string')) virhe('tiedot ovat merkkijonoja (isoisän ääni kuuluu Päätoimittajalle)');
    if (t.some((x) => typeof x === 'string' && x.trim().length <= 20)) virhe('tieto alle 21 merkkiä');
    if (new Set(t).size !== t.length) virhe('sama tieto kahdesti');

    // kuvat: kerätään kaikki kuvaoliot
    const kuvat = [];
    const kuva = (o, missa) => {
      if (!o) return;
      if (o.osoite) virhe(`${missa}: osoite-kuva (havainnekuva) ei kuulu pilvityöhön`);
      if (!o.tiedosto) { virhe(`${missa}: tiedosto puuttuu`); return; }
      kuvat.push({ ...o, missa });
      const m = String(o.lahde ?? '').match(LAHDE_RE);
      if (!m) virhe(`${missa}: lahde "${o.lahde}" ei ole muotoa "Tekijä, Wikimedia Commons (LISENSSI)"`);
      else if (m[1].trim().length <= 2 || /^(unknown|wikimedia|commons|tuntematon)$/i.test(m[1].trim())) virhe(`${missa}: tekijä puuttuu tai katkennut ("${m[1]}")`);
      const pitka = o.selite ?? o.kuvateksti;
      if (!pitka) virhe(`${missa}: selite puuttuu`);
      else if (virkkeita(pitka) > 2) varoitus(`${missa}: selite yli kahden virkkeen`);
      if (pitka && pitka.length > 100 && !o.lyhyt) virhe(`${missa}: selite yli 100 mrk ilman lyhyt-kenttää`);
      if (o.lyhyt && (o.lyhyt.length > 100 || !/\.$/.test(o.lyhyt))) virhe(`${missa}: lyhyt enintään 100 mrk ja päättyy pisteeseen`);
      if (/(wikipedia|commons|kuvauksen mukaan|tekoäly)/i.test(`${pitka ?? ''} ${o.lyhyt ?? ''}`)) varoitus(`${missa}: kuvatekstissä lähdeviittaus lukijalle`);
    };
    const nostoTarkistus = (n, missa) => {
      if (!n.otsikko || !n.teksti) { virhe(`${missa}: otsikko ja teksti pakollisia`); return; }
      if (n.teksti.length < 350 || n.teksti.length > 800) virhe(`${missa}: teksti ${n.teksti.length} mrk (440–660)`);
      else if (n.teksti.length < 440 || n.teksti.length > 660) varoitus(`${missa}: teksti ${n.teksti.length} mrk (440–660)`);
      if (!n.wiki) varoitus(`${missa}: wiki-otsikko puuttuu`);
      kuva(n, missa);
    };

    // valokuva
    const vk = s.valokuva ?? {};
    kuva(vk, 'valokuva');
    for (const [i, l] of (vk.lisat ?? []).entries()) kuva(l, `valokuva.lisat ${i + 1}`);
    if (vk.uusi) kuva(vk.uusi, 'valokuva.uusi');

    // kaupunkilehti
    const lehti = Array.isArray(s.kaupunkilehti) ? s.kaupunkilehti : [];
    const kansi = lehti[0];
    if (kansi?.id !== 'kaupunki') virhe('kaupunkilehden ensimmäinen aihe on id "kaupunki"');
    if (lehti.length > 9) virhe(`aiheita ${lehti.length} (enintään 9)`);
    if (lehti.length < 2) virhe('kaupunkilehdestä puuttuu teemasivu');
    if (kansi) {
      if (!kansi.nimi || !kansi.johdanto) virhe('kansi: nimi ja johdanto pakollisia');
      if (kansi.johdanto && (virkkeita(kansi.johdanto) > 2 || kansi.johdanto.length > 320)) varoitus('kansi.johdanto: 1–2 virkettä');
      if (kansi.tehtava) virhe('kannella ei ole minitehtävää');
      if ((kansi.kansikuvat ?? []).length !== 3) virhe(`kansikuvia ${(kansi.kansikuvat ?? []).length} (3 laajaa yleiskuvaa)`);
      (kansi.kansikuvat ?? []).forEach((x, i) => kuva(x, `kansikuva ${i + 1}`));
      (kansi.avauskuvat ?? []).forEach((x, i) => kuva(x, `avauskuva ${i + 1}`));
      if (kansi.ennenNyt) {
        if (kansi.ennenNyt.length !== 2 || !kansi.ennenNyt[0].vuosi) virhe('ennenNyt: [vanha (vuosi), uusi]');
        kansi.ennenNyt.forEach((x, i) => kuva(x, `ennenNyt ${i + 1}`));
      }
      const kn = kansi.nostot ?? [];
      if (kn.length !== 4) virhe(`kannen nostoja ${kn.length} (4)`);
      kn.forEach((n, i) => nostoTarkistus(n, `kansi nosto ${i + 1}`));
      const m = kansi.matkailijalle;
      if (!m?.kuva || !m?.kappale || !m?.artikkeli) virhe('matkailijalle { kuva, kappale, artikkeli } puuttuu');
      else {
        kuva(m.kuva, 'matkailijalle.kuva');
        const ar = m.artikkeli;
        if (!/^Matkailijan /.test(ar.nimi ?? '') || ar.taitto !== 'opas' || !ar.teksti || !ar.nosto) virhe('opas: nimi "Matkailijan X", taitto "opas", teksti ja nosto');
        const j = ar.jaksot ?? [];
        if (j.length !== 5) virhe(`oppaan jaksoja ${j.length} (5)`);
        if (j.filter((x) => !x.kuva).length > 2) virhe('oppaassa yli kaksi kuvatonta jaksoa');
        j.forEach((x, i) => {
          if (!x.otsikko || !x.teksti) virhe(`opas jakso ${i + 1}: otsikko ja teksti`);
          kuva(x.kuva, `opas jakso ${i + 1}`);
        });
        if (!ar.matkailu?.parasta?.length || !ar.matkailu?.hyvaTietaa?.length) varoitus('oppaasta puuttuu matkailu { parasta, hyvaTietaa }');
      }
    }
    lehti.slice(1).forEach((sivu, i) => {
      const missa = `teemasivu ${sivu.id ?? i + 2}`;
      if (!VAKIOAIHEET.includes(sivu.id)) virhe(`${missa}: id ei ole vakioaihe (${VAKIOAIHEET.join(', ')})`);
      if (!sivu.nimi || !sivu.johdanto) virhe(`${missa}: nimi ja johdanto`);
      const te = sivu.tehtava;
      if (!te || te.vaihtoehdot?.length !== 4 || new Set(te.vaihtoehdot).size !== 4 || !Number.isInteger(te.oikea)
        || te.oikea < 0 || te.oikea > 3 || !te.kysymys || !te.fakta) virhe(`${missa}: minitehtävä { kysymys, vaihtoehdot[4], oikea, fakta }`);
      else if (/\b(punta|puntaa|pistettä|palkkio)/i.test([te.kysymys, te.fakta, ...te.vaihtoehdot].join(' '))) virhe(`${missa}: minitehtävä ei mainitse palkkiota`);
      const sn = sivu.nostot ?? [];
      if (sn.length < 4 || sn.length > 7) virhe(`${missa}: nostoja ${sn.length} (4)`);
      sn.forEach((n, j) => nostoTarkistus(n, `${missa} nosto ${j + 1}`));
    });

    // kohdekartta ja nähtävyysjutut
    const kk = s.kohdekartta ?? {};
    const r = kk.rajat ?? {};
    const kohteet = kk.kohteet ?? [];
    if (!kk.esittely) virhe('kohdekartta.esittely puuttuu');
    else if (kk.esittely.length > 450) varoitus(`kohdekartta.esittely ${kk.esittely.length} mrk (lyhyt, ei kartan kuvailua)`);
    if (!(r.pohjoinen > r.etela && r.ita > r.lansi)) virhe('kohdekartta.rajat { pohjoinen > etela, ita > lansi }');
    if (kohteet.length < 1 || kohteet.length > 15) virhe(`kohteita ${kohteet.length} (1–15)`);
    else if (kohteet.length < 6) varoitus(`kohteita ${kohteet.length} (pohjataso 6; perustele RAPORTTI.md:ssä)`);
    if (new Set(kohteet.map((x) => x.nimi)).size !== kohteet.length) virhe('kaksi samannimistä kohdetta');
    for (const x of kohteet) {
      if (!x.nimi || !Number.isFinite(x.lat) || !Number.isFinite(x.lon)) { virhe(`kohde ${x.nimi ?? '?'}: nimi, lat, lon`); continue; }
      if (!KARTTATYYPIT.includes(x.tyyppi ?? 'rakennus')) virhe(`kohde ${x.nimi}: tyyppi rakennus | aukio | luonto`);
      if (x.lat > r.pohjoinen || x.lat < r.etela || x.lon > r.ita || x.lon < r.lansi) virhe(`kohde ${x.nimi}: rajauksen ulkopuolella`);
      if (k.pallo && km(k.pallo, x) > 12) varoitus(`kohde ${x.nimi}: ${km(k.pallo, x)} km kaupunkipisteestä`);
    }
    if (kk.polku || kk.varikartta || kk.piirtoRajat) varoitus('kohdekartan polku/varikartta/piirtoRajat tehdään Macilla');
    const jutut = s.nahtavyydet ?? {};
    for (const x of kohteet) if (!jutut[x.nimi]) virhe(`nähtävyysjuttu puuttuu kohteelta "${x.nimi}"`);
    for (const [nimi, ju] of Object.entries(jutut)) {
      if (!kohteet.some((x) => x.nimi === nimi)) virhe(`juttu "${nimi}" ilman kohdetta (nimen oltava sama)`);
      if (!ju.teksti || ju.teksti.length < 400) virhe(`juttu ${nimi}: teksti ${ju.teksti?.length ?? 0} mrk`);
      else if (![2, 3].includes(kappaleita(ju.teksti)) || ju.teksti.length > 1800) varoitus(`juttu ${nimi}: ${kappaleita(ju.teksti)} kappaletta, ${ju.teksti.length} mrk (2–3, enintään ~1500)`);
      if (!(ju.kuvat ?? []).length || ju.kuvat.length > 3) virhe(`juttu ${nimi}: kuvia 1–3`);
      (ju.kuvat ?? []).forEach((x, i) => kuva(x, `juttu ${nimi} kuva ${i + 1}`));
      if (ju.lahde !== 'Wikipedia') varoitus(`juttu ${nimi}: lahde "Wikipedia"`);
      if (!ju.aika) varoitus(`juttu ${nimi}: aika puuttuu`);
    }

    // säätiedot
    const sa = s.saatiedot;
    if (!sa) varoitus('saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)');
    else if (!Number.isFinite(sa.lat) || !Number.isFinite(sa.lon) || sa.keskilampo?.length !== 12 || sa.sade?.length !== 12
      || [...sa.keskilampo, ...sa.sade].some((x) => !Number.isFinite(x))) virhe('saatiedot { lat, lon, keskilampo[12], sade[12] }');
    else if (!sa.luonnehdinta) varoitus('saatiedot.luonnehdinta puuttuu');

    // kuvien yksikäsitteisyys ja aiempi käyttö. Matkakirjan valokuva saa olla
    // sama tiedosto kuin ennenNyt-pari (kaupunkilehti.md: parit kopioitiin
    // valokuvatauluista); lehdessä ja jutuissa sama tiedosto vain kerran.
    const nahty = new Map();
    const lehdessa = new Map();
    for (const x of kuvat) {
      const ryhma = x.missa.startsWith('valokuva') ? nahty : lehdessa;
      if (ryhma.has(x.tiedosto)) virhe(`sama kuva kahdesti: ${x.tiedosto} (${ryhma.get(x.tiedosto)} ja ${x.missa})`);
      else ryhma.set(x.tiedosto, x.missa);
    }
    for (const [nimi, missa] of lehdessa) if (!nahty.has(nimi)) nahty.set(nimi, missa);
    for (const nimi of nahty.keys()) {
      if (pakkateksti.includes(nimi) || pakkateksti.includes(nimi.replace(/'/g, "\\'"))) varoitus(`kuva on jo pelissä: ${nimi}`);
    }

    // tekstit: paikkamerkit, ascii-suomi, pyöreät luvut, huutomerkit
    const ohita = new Set(['tiedosto', 'lahde', 'wiki', 'source', 'id', 'taitto', 'ambience', '$skeema', 'era', 'maa', 'name', 'nimi', 'otsikko']);
    const kay = (o, polku) => {
      if (typeof o === 'string') {
        const avain = polku.split('.').pop();
        if (ohita.has(avain)) return;
        if (/(TÄYTÄ|TODO|XXX|lorem ipsum)/i.test(o)) virhe(`${polku}: paikkamerkki jäi`);
        if (o.length > 200 && !/[äö]/i.test(o)) virhe(`${polku}: ei ä- eikä ö-kirjaimia (ascii-suomi?)`);
        for (const m of o.matchAll(/\b(\d{1,3})((?:\s000)+)\b/g)) {
          if ((m[1].match(/0+$/)?.[0].length ?? 0) + 3 * (m[2].length / 4) >= 4) varoitus(`${polku}: pyöreä luku "${m[0]}" — onko lähteessä tarkka?`);
        }
        if (/\b(noin|yli|lähes|arviolta|jopa|peräti)\s+(\S+\s+)?(miljoona|miljoonaa|miljardi|satojatuhansia|kymmeniätuhansia)\b/i.test(o)) varoitus(`${polku}: pyöreä suuruusluokka — onko lähteessä tarkka?`);
        if (!polku.startsWith('artikkeli') && /!/.test(o)) varoitus(`${polku}: huutomerkki`);
      } else if (Array.isArray(o)) o.forEach((x, i) => kay(x, `${polku}[${i}]`));
      else if (o && typeof o === 'object') for (const [kk2, v] of Object.entries(o)) kay(v, polku ? `${polku}.${kk2}` : kk2);
    };
    kay(s, '');

    if (verkko && nahty.size) await verkkotarkistus([...nahty.keys()], kuvat, s, virhe, varoitus);

    for (const x of V) console.log(`VIRHE ${id}: ${x}`);
    if (!lyhyt) for (const x of W) console.log(`VAROITUS ${id}: ${x}`);
    console.log(`== ${id}: ${V.length} virhettä, ${W.length} varoitusta, ${nahty.size} kuvaa`);
    virheita += V.length;
    varoituksia += W.length;
  }
  console.log(`YHTEENSÄ ${idt.length} kaupunkia: ${virheita} virhettä, ${varoituksia} varoitusta`);
  if (virheita) process.exitCode = 1;
}

const normLisenssi = (s) => String(s ?? '').replace(/^Public domain$/i, 'PD').replace(/^PD.*/i, 'PD')
  .replace(/^CC[- ]?Zero$/i, 'CC0').replace(/-/g, ' ').replace(/\s+/g, ' ').trim().toUpperCase();
const normNimi = (s) => String(s ?? '').replace(/<[^>]*>/g, ' ').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

async function verkkotarkistus(nimet, kuvat, s, virhe, varoitus) {
  const tieto = new Map();
  for (let i = 0; i < nimet.length; i += 40) {
    const osa = nimet.slice(i, i + 40);
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&formatversion=2&prop=imageinfo'
      + '&iiprop=size|extmetadata&iiextmetadatafilter=LicenseShortName|Artist&titles='
      + encodeURIComponent(osa.map((n) => `File:${n}`).join('|'));
    const d = await haeJson(url);
    const takaisin = new Map((d.query?.normalized ?? []).map((n) => [n.to, n.from]));
    for (const sivu of d.query?.pages ?? []) {
      const nimi = (takaisin.get(sivu.title) ?? sivu.title).replace(/^File:/, '');
      tieto.set(nimi, sivu);
    }
  }
  for (const x of kuvat) {
    const sivu = tieto.get(x.tiedosto) ?? tieto.get(`File:${x.tiedosto}`);
    const ii = sivu?.imageinfo?.[0];
    if (!ii) { virhe(`${x.missa}: Commons-tiedostoa ei löydy (${x.tiedosto})`); continue; }
    if (ii.width < 1200) virhe(`${x.missa}: leveys ${ii.width} px (vähintään 1200)`);
    const lis = ii.extmetadata?.LicenseShortName?.value ?? '';
    if (/\b(NC|ND)\b|fair use/i.test(lis) || !/^(CC0|CC[- ]BY|Public domain|PD)/i.test(lis)) virhe(`${x.missa}: lisenssi "${lis}" ei kelpaa`);
    const m = String(x.lahde ?? '').match(LAHDE_RE);
    if (m && normLisenssi(m[2]) !== normLisenssi(lis)) varoitus(`${x.missa}: lähderivin lisenssi ${m[2]} ≠ Commons "${lis}"`);
    const tekija = normNimi(ii.extmetadata?.Artist?.value);
    const oma = normNimi(m?.[1]);
    if (m && tekija && !tekija.includes(oma) && !oma.includes(tekija)) varoitus(`${x.missa}: tekijä "${m[1]}" ≠ Commons Artist "${tekija.slice(0, 80)}"`);
  }
  const otsikot2 = [...new Set([s.kaupunki?.wiki, ...(s.kaupunkilehti ?? []).flatMap((a) => (a.nostot ?? []).map((n) => n.wiki))]
    .filter(Boolean))];
  const puuttuu = async (kieli, lista) => {
    const ulos = new Set();
    for (let i = 0; i < lista.length; i += 40) {
      const d = await haeJson(`https://${kieli}.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&redirects=1&titles=`
        + encodeURIComponent(lista.slice(i, i + 40).join('|')));
      const takaisin = new Map([...(d.query?.normalized ?? []), ...(d.query?.redirects ?? [])].map((n) => [n.to, n.from]));
      for (const sivu of d.query?.pages ?? []) if (sivu.missing) ulos.add(takaisin.get(sivu.title) ?? sivu.title);
    }
    return ulos;
  };
  const eiFi = await puuttuu('fi', otsikot2);
  const eiEn = eiFi.size ? await puuttuu('en', [...eiFi]) : new Set();
  for (const o of eiEn) virhe(`wiki "${o}" ei löydy fi- eikä en-Wikipediasta`);
}

/* ------------------------------------------------------------ tutkimusapurit */

const KELPO = (lis) => /^(CC0|CC[- ]BY|Public domain|PD)/i.test(lis) && !/\b(NC|ND)\b|fair use/i.test(lis);
// Artist ilman HTML:ää alkuperäisessä kirjoitusasussa: lähderivin tekijä kirjoitetaan juuri näin.
const siisti = (s) => String(s ?? '').replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

async function lahdeKomento(kieli, otsikko) {
  if (!['en', 'fi'].includes(kieli) || !otsikko) throw new Error('käyttö: lahde <en|fi> "<otsikko>"');
  const d = await haeJson(`https://${kieli}.wikipedia.org/w/api.php?action=query&format=json&formatversion=2`
    + '&prop=extracts|coordinates|pageprops&explaintext=1&exsectionformat=wiki&redirects=1&titles='
    + encodeURIComponent(otsikko));
  const sivu = d.query?.pages?.[0];
  if (!sivu || sivu.missing) { console.log(`EI LÖYDY: ${kieli}:${otsikko}`); process.exitCode = 1; return; }
  const kansio = join(tmpdir(), 'matkakirja-lahteet');
  mkdirSync(kansio, { recursive: true });
  const polku = join(kansio, `${kieli}-${sivu.title.replace(/[^\p{L}\p{N}]+/gu, '_')}.txt`);
  writeFileSync(polku, `${kieli}.wikipedia.org/wiki/${sivu.title.replace(/ /g, '_')} (haettu ${new Date().toISOString().slice(0, 10)})\n\n${sivu.extract}`);
  const k = sivu.coordinates?.[0];
  console.log(`${polku}\n${sivu.title}${sivu.title !== otsikko ? ` (ohjaus: ${otsikko})` : ''} · ${sivu.extract.length} mrk · `
    + `${sivu.pageprops?.wikibase_item ?? 'ei Q'} · ${k ? `${k.lat.toFixed(5)}, ${k.lon.toFixed(5)}` : 'ei koordinaatteja'}`);
  if (/may refer to|voi tarkoittaa/i.test(sivu.extract.slice(0, 400))) console.log('HUOM: täsmennyssivu — valitse tarkempi otsikko');
  for (const r of sivu.extract.split('\n').filter((x) => /^==/.test(x))) console.log(r);
}

async function hakuKomento(haku, maara = 15) {
  if (!haku) throw new Error('käyttö: haku "<hakusanat tai incategory:\\"…\\">" [määrä]');
  const d = await haeJson('https://commons.wikimedia.org/w/api.php?action=query&format=json&formatversion=2'
    + `&generator=search&gsrnamespace=6&gsrlimit=50&gsrsearch=${encodeURIComponent(haku)}`
    + '&prop=imageinfo&iiprop=size|mime|extmetadata&iiextmetadatafilter=LicenseShortName|Artist|DateTimeOriginal');
  const rivit = (d.query?.pages ?? []).sort((a, b) => (a.index ?? 0) - (b.index ?? 0)).map((p) => ({ p, ii: p.imageinfo?.[0] }))
    .filter(({ ii }) => ii && /^image\/(jpeg|png|tiff)/.test(ii.mime) && ii.width >= 1200 && KELPO(ii.extmetadata?.LicenseShortName?.value ?? ''));
  for (const { p, ii } of rivit.slice(0, Number(maara) || 15)) {
    const e = ii.extmetadata ?? {};
    console.log(`${ii.width}×${ii.height} | ${e.LicenseShortName?.value} | ${siisti(e.Artist?.value)} | `
      + `${String(e.DateTimeOriginal?.value ?? '').replace(/<[^>]*>/g, '').slice(0, 10)} | ${p.title.replace(/^File:/, '')}`);
  }
  console.log(`(${rivit.length} kelvollista / ${(d.query?.pages ?? []).length} osumaa; tekijä lähderiville tarkista-komennon --verkko-vertailulla)`);
}

async function esikatseluKomento(tiedosto) {
  if (!tiedosto) throw new Error('käyttö: esikatselu "<Commons-tiedosto>"');
  const v = await fetch(`https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(tiedosto)}?width=900`,
    { headers: UA, signal: AbortSignal.timeout(60000) });
  if (!v.ok) throw new Error(`HTTP ${v.status}: ${tiedosto}`);
  const kansio = join(tmpdir(), 'matkakirja-kuvat');
  mkdirSync(kansio, { recursive: true });
  const polku = join(kansio, `${tiedosto.replace(/\.\w+$/, '').replace(/[^\p{L}\p{N}]+/gu, '_').slice(0, 120)}.jpg`);
  writeFileSync(polku, Buffer.from(await v.arrayBuffer()));
  console.log(polku);
}

/* ------------------------------------------------------------ pääohjelma */

try {
  const vapaat = argit.filter((x) => !x.startsWith('--'));
  if (komento === 'konteksti') await konteksti(vapaat[0], vapaat.slice(1));
  else if (komento === 'malli') await malli(vapaat[0]);
  else if (komento === 'saa') saaKomento(vapaat[0]);
  else if (komento === 'lahde') await lahdeKomento(vapaat[0], vapaat[1]);
  else if (komento === 'haku') await hakuKomento(vapaat[0], vapaat[1]);
  else if (komento === 'esikatselu') await esikatseluKomento(vapaat[0]);
  else if (komento === 'tarkista') {
    await tarkista(vapaat[0], vapaat.slice(1), {
      verkko: argit.includes('--verkko'), malliTila: argit.includes('--malli'), lyhyt: argit.includes('--lyhyt'),
    });
  } else {
    console.error('käyttö: konteksti <erä> <id...> | malli <id> | saa <erä> | tarkista <erä> [<id...>] [--verkko] [--malli] [--lyhyt]'
      + ' | lahde <en|fi> "<otsikko>" | haku "<haku>" [määrä] | esikatselu "<tiedosto>"');
    process.exitCode = 2;
  }
} catch (e) {
  console.error(`VIRHE: ${e.message}`);
  process.exitCode = 2;
}
