/*
 * Kerää vuorikohteille kuvaehdokkaat Wikimedia Commonsista.
 *
 *   node tools/hae-vuorikuvat.mjs                    # kaikki 52 kohdetta
 *   node tools/hae-vuorikuvat.mjs --kohde kaukasus   # yksi kohde
 *   node tools/hae-vuorikuvat.mjs --kuiva            # ei kirjoiteta mitään
 *
 * Sisarteos tools/hae-kaupunkikuvat.mjs:lle. Sama putki, eri lähde ja
 * tiukempi seula — vuorikuvassa erottuu heti, jos se on väärältä
 * vuorelta, ja pelkkä hakutuloksen otsikko ei kerro sitä. Siksi kuvat
 * haetaan KATEGORIASTA, joka on sidottu Wikidatan kautta juuri siihen
 * vuoristoon (P373), ei nimihausta.
 *
 * TYÖKALU EI VALITSE KUVIA. Se kokoaa ehdokaslistan, jonka jokainen
 * kuva katsotaan silmällä (tools/tee-kuvataulu.py) ennen kuin se
 * päätyy peliin. Automaattinen seula karsii vain sen, minkä koneen
 * kuuluukin karsia: väärän lisenssin, liian pienen kuvan, pystykuvan,
 * kartat ja kaaviot.
 *
 * --- miksi kategoria eikä artikkelin kuvat ---
 *
 * Artikkelissa on 3-10 kuvaa ja niistä puolet on karttoja. Kategoriassa
 * on satoja valokuvia, ja Commonsin omat laatuluokat (Quality images,
 * Featured pictures, Valued images) kertovat, mitkä niistä yhteisö on
 * jo katsonut hyviksi. Laatuluokka ei ole hyväksyntä — se on
 * järjestysnumero silmätarkistuksen jonossa.
 */
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const arvo = (nimi, oletus) => {
  const i = process.argv.indexOf(nimi);
  return i >= 0 ? process.argv[i + 1] : oletus;
};
const kuiva = process.argv.includes('--kuiva');
const vainKohde = arvo('--kohde', null);
const MAARA = Number(arvo('--maara', 40));

const UA = 'Matkakirja/1.0 (https://github.com/ravelius/Matkakirja)';

/*
 * Kategoria käsin, kun Wikidatan P373 osoittaa väärään paikkaan.
 *
 * Yleisin syy: nimipaketin `wiki` on artikkeli, joka ei ole vuoristo.
 * Madagaskarin ylängön artikkeli on koko saaren artikkeli, ja sen
 * kategoriassa on lippuja, lemureita ja katukuvia — ei ylänköä.
 * Toinen syy: P373 osoittaa kategoriaan, joka on olemassa mutta
 * käytännössä tyhjä, ja kuvat ovat naapurikategoriassa.
 */
const KATEGORIA = {
  'madagaskarin-ylanko': 'Highlands of Madagascar',
  kamtshatka: 'Volcanoes of Kamchatka',
  'kaakkois-australian-ylangot': 'Australian Alps',
  'uuden-guinean-ylangot': 'Mountains of Papua New Guinea',
  'kapmaan-taittovuoret': 'Cape Fold Belt',
  sarawat: 'Sarawat Mountains',
  verhojansk: 'Verkhoyansk Range',
  'tiibetin-ylatasanko': 'Tibetan Plateau',
  'annamin-ylanko': 'Annamite Range',
  rannikkovuoret: 'Coast Mountains',
  'alaskan-vuoristo': 'Alaska Range',
};

/*
 * Alikategoriat, joista EI haeta. Vuoristokategorioiden alla on
 * karttoja, geologisia leikkauksia, kasvi- ja eläinlajeja ja
 * henkilökuvia — kaikki aiheeseen liittyviä, mutta ei sitä mitä
 * pelaaja haluaa nähdä kun hän avaa vuoren.
 */
const POIS_ALIKATEGORIA = [
  'map', 'maps', 'diagram', 'chart', 'graph', 'coat of arms', 'flag',
  'people', 'person', 'portrait', 'fauna', 'flora', 'plants', 'animals',
  'insects', 'birds', 'fungi', 'geolog', 'cross-section', 'stamp',
  'coin', 'logo', 'sign', 'symbol', 'book', 'document', 'letter',
];

/*
 * Pois karsittavat tiedostonimet. Sama linja kuin kaupunkikuvissa:
 * yksi turha kuva gallerian seassa on pahempi kuin yksi puuttuva.
 */
const POIS = [
  'map', 'karte', 'mapa', 'kartta', 'kaart', 'carte', 'mappa', 'plan',
  'locator', 'location', 'orthographic', 'topograph', 'relief map',
  'coat of arms', 'coa ', 'wappen', 'escudo', 'blason', 'stemma',
  'flag', 'flagge', 'bandera', 'drapeau', 'lippu',
  'seal of', 'logo', 'emblem', 'insignia', 'banner',
  'diagram', 'chart', 'graph', 'timeline', 'population', 'profile',
  'satellite', 'landsat', 'sentinel', 'nasa', 'iss0', 'astronaut',
  'poster', 'stamp', 'postmark', 'medal', 'coin',
];

/** Kelpaako tiedosto galleriaan? */
export function kelpaaKuva(nimi) {
  const matala = nimi.toLowerCase();
  // SVG on käytännössä aina kartta, lippu, vaakuna tai kaavio.
  if (/\.svg$/.test(matala)) return false;
  if (!/\.(jpe?g|png|tiff?)$/.test(matala)) return false;
  return !POIS.some((sana) => matala.includes(sana));
}

/*
 * Vapaa lisenssi. Peliin kelpaa vain public domain ja CC-lisenssit
 * ilman ND-ehtoa (ND kieltää muokkaukset, ja peili skaalaa kuvat).
 * "nd" haetaan sanarajoilla: pelkkä includes('nd') osui myös
 * merkkijonoon "Attribution" ja pudotti kelvollisia kuvia.
 */
export function vapaaLisenssi(teksti) {
  const t = (teksti ?? '').toLowerCase();
  if (!t) return false;
  if (/\bnd\b|no ?derivat/.test(t)) return false;
  if (/\bnc\b|noncommercial|non-commercial/.test(t)) return false;
  return /public domain|cc0|cc by|cc-by|attribution|gfdl/.test(t);
}

const nuku = (ms) => new Promise((r) => { setTimeout(r, ms); });

/*
 * Kysely POSTilla, kun parametreja on paljon.
 *
 * 50 tiedostonimeä yhdessä `titles`-parametrissa ylitti palvelimen
 * osoitepituuden (HTTP 414) heti ensimmäisellä vuoristolla: Commonsin
 * tiedostonimet ovat pitkiä lauseita. MediaWiki hyväksyy saman kyselyn
 * POSTina, joten erää ei tarvitse pienentää.
 */
async function hae(osoite, yrityksia = 6, runko = null) {
  for (let i = 0; i < yrityksia; i++) {
    try {
      const vastaus = await fetch(osoite, runko
        ? {
          method: 'POST',
          headers: {
            'user-agent': UA,
            'content-type': 'application/x-www-form-urlencoded',
          },
          body: runko,
        }
        : { headers: { 'user-agent': UA } });
      if (vastaus.ok) return await vastaus.json();
      if (vastaus.status !== 429) {
        console.log(`  HTTP ${vastaus.status}`);
        return null;
      }
    } catch (virhe) {
      console.log(`  verkko: ${virhe.message}`);
    }
    await nuku(3000 * (i + 1));
  }
  return null;
}

/**
 * Commons-kategoria Wikidatan kautta: fi-artikkeli → Q-tunnus → P373.
 *
 * Nimestä arvaaminen ei kelpaa. "Kaukasus" ei ole kategoria Commonsissa
 * (oikea nimi on "Caucasus mountains"), ja arvattu kategoria on joko
 * tyhjä tai — pahempaa — jonkin toisen paikan kategoria.
 */
async function commonsKategoria(wikiOtsikko) {
  for (const kieli of ['fi', 'en']) {
    const sivu = await hae(`https://${kieli}.wikipedia.org/w/api.php?action=query`
      + '&prop=pageprops&ppprop=wikibase_item&redirects=1&format=json'
      + `&titles=${encodeURIComponent(wikiOtsikko)}`);
    const q = Object.values(sivu?.query?.pages ?? {})[0]?.pageprops?.wikibase_item;
    if (!q) continue;
    const data = await hae('https://www.wikidata.org/w/api.php?action=wbgetentities'
      + `&props=claims|sitelinks&format=json&ids=${q}`);
    const entiteetti = data?.entities?.[q];
    const p373 = entiteetti?.claims?.P373?.[0]?.mainsnak?.datavalue?.value;
    const sitelink = entiteetti?.sitelinks?.commonswiki?.title?.replace(/^Category:/, '');
    if (p373 || sitelink) return p373 ?? sitelink;
  }
  return null;
}

/** Kategorian tiedostot ja alikategoriat yhdellä kyselyllä. */
async function kategorianSisalto(kategoria, tyyppi) {
  const data = await hae('https://commons.wikimedia.org/w/api.php?action=query'
    + `&list=categorymembers&cmtitle=${encodeURIComponent(`Category:${kategoria}`)}`
    + `&cmtype=${tyyppi}&cmlimit=500&format=json`);
  return (data?.query?.categorymembers ?? []).map((x) => x.title);
}

/**
 * Tiedostot kategoriasta ja sen alikategorioista (syvyys 1).
 *
 * Syvyys 1 eikä deepcat: Commonsin kategoriapuu vuotaa nopeasti
 * naapurimaihin ja kokonaan toisiin aiheisiin, ja väärä vuori on juuri
 * se virhe, jota tässä työssä eniten varotaan.
 */
async function keraaTiedostot(kategoria) {
  const tiedostot = new Set(await kategorianSisalto(kategoria, 'file'));
  const alat = (await kategorianSisalto(kategoria, 'subcat'))
    .map((t) => t.replace(/^Category:/, ''))
    .filter((n) => !POIS_ALIKATEGORIA.some((s) => n.toLowerCase().includes(s)))
    .slice(0, 12);
  for (const ala of alat) {
    for (const t of await kategorianSisalto(ala, 'file')) tiedostot.add(t);
    await nuku(200);
    if (tiedostot.size > 900) break;
  }
  return [...tiedostot].filter((t) => kelpaaKuva(t));
}

const LAATU = [
  'Category:Quality images',
  'Category:Featured pictures on Wikimedia Commons',
  'Category:Valued images',
];

/** Tiedostojen tiedot: kuvaus, tekijä, lisenssi, koko, laatuluokka. */
async function tiedostotiedot(tiedostot) {
  const ulos = [];
  for (let i = 0; i < tiedostot.length; i += 50) {
    const pala = tiedostot.slice(i, i + 50);
    const runko = new URLSearchParams({
      action: 'query',
      prop: 'imageinfo|categories',
      iiprop: 'url|size|extmetadata|mime',
      clcategories: LAATU.join('|'),
      cllimit: 'max',
      iiurlwidth: '800',
      titles: pala.join('|'),
      format: 'json',
    }).toString();
    const data = await hae('https://commons.wikimedia.org/w/api.php', 6, runko);
    for (const sivu of Object.values(data?.query?.pages ?? {})) {
      const tieto = sivu.imageinfo?.[0];
      if (!tieto) continue;
      const meta = tieto.extmetadata ?? {};
      const puhdista = (teksti) => (teksti ?? '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/&[a-z]+;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      ulos.push({
        tiedosto: sivu.title.replace(/^File:/, ''),
        leveys: tieto.width,
        korkeus: tieto.height,
        thumb: tieto.thumburl ?? null,
        kuvaus: puhdista(meta.ImageDescription?.value).slice(0, 400),
        tekija: puhdista(meta.Artist?.value).slice(0, 120),
        lisenssi: puhdista(meta.LicenseShortName?.value),
        vuosi: puhdista(meta.DateTimeOriginal?.value).slice(0, 40),
        laatu: (sivu.categories ?? []).map((c) => c.title.replace(/^Category:/, '')),
      });
    }
    await nuku(400);
  }
  return ulos;
}

// --- ajo ----------------------------------------------------------------------

const { VUORISTONIMET } = await import('../js/packs/maasto-nimet-vuoret.js');
const kohteet = VUORISTONIMET.filter((v) => !vainKohde || v.avain === vainKohde);
if (!kohteet.length) throw new Error(`tuntematon kohde: ${vainKohde}`);
console.log(`${kohteet.length} vuorikohdetta, enintään ${MAARA} ehdokasta kussakin\n`);

const kansio = join(JUURI, 'tools', 'vuorikuva-aineisto');
if (!kuiva && !existsSync(kansio)) mkdirSync(kansio, { recursive: true });

const yhteenveto = [];
for (const v of kohteet) {
  const kategoria = KATEGORIA[v.avain] ?? await commonsKategoria(v.wiki);
  if (!kategoria) {
    console.log(`${v.avain.padEnd(28)} EI KATEGORIAA (wiki: ${v.wiki})`);
    yhteenveto.push({ avain: v.avain, kategoria: null, kuvia: 0 });
    continue;
  }
  const nimet = await keraaTiedostot(kategoria);
  const tiedot = (await tiedostotiedot(nimet.slice(0, 300)))
    .filter((t) => vapaaLisenssi(t.lisenssi))
    // Galleria on vaakasuuntainen, ja iso kuva näytetään 1920 pikselin
    // levyisenä: sitä pienempi venyy epäteräväksi.
    .filter((t) => t.leveys >= 1600 && t.leveys >= t.korkeus * 1.1);
  // Commonsin laatuluokitellut ensin — ne katsotaan silmällä ensin.
  tiedot.sort((a, b) => (b.laatu.length - a.laatu.length)
    || (b.leveys * b.korkeus - a.leveys * a.korkeus));
  const kaikki = tiedot.slice(0, MAARA);
  const laadukkaita = kaikki.filter((t) => t.laatu.length).length;
  yhteenveto.push({ avain: v.avain, kategoria, kuvia: kaikki.length, laadukkaita });
  console.log(`${v.avain.padEnd(28)} ${String(kaikki.length).padStart(3)} ehdokasta `
    + `(${laadukkaita} laatuluokiteltua)  ← ${kategoria}`);
  if (!kuiva) {
    writeFileSync(join(kansio, `${v.avain}.json`), `${JSON.stringify(kaikki, null, 1)}\n`);
  }
  await nuku(300);
}

const vajaat = yhteenveto.filter((x) => x.kuvia < 8);
console.log(`\n${yhteenveto.length} kohdetta, keskimäärin `
  + `${(yhteenveto.reduce((a, b) => a + b.kuvia, 0) / Math.max(1, yhteenveto.length)).toFixed(1)} ehdokasta`);
console.log(`alle kahdeksan ehdokkaan kohteita: ${vajaat.length}`);
if (vajaat.length) console.log(vajaat.map((x) => `${x.avain}(${x.kuvia})`).join(' '));
