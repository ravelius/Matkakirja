/*
 * KARTAN TIETOKORTIT (Raamattu 2.203, omistaja 26.10.2026 klo 22.13: "Faktat heti, pulun teksti striimataan. Kohteita liikaa.
 * Mietitään myöhemmin generoimista etukäteen."). Syvän kartan nimi (OpenMapTiles: nimi, luokka, piste) → Wikidata-kohde ja
 * kortin faktat kiinteällä suomenkielisellä kaavalla. Pulun teksti (lyhyt ja Lue lisää) syntyy workerissa vain lähteen
 * (Wikidata, Wikipedia) faktoista, ja kaikki tuotettu tallennetaan R2:een kaikille pelaajille (ei generoida kahdesti).
 *
 * Haut vain MediaWikin ja Wikidatan /w/api.php:llä kuvaavalla User-Agentilla (robots.txt: api.php sallittu, ei SPARQLia).
 * Linkitys: nimihaku (wbsearchentities en/fi/de/fr) → kohteet, joiden P625 on säteen sisällä → paras: Wikipedia-artikkelin
 * otsikko täsmää nimeen, sitten laji sopii OSM-luokkaan (asutus / luonto), sitten lähin.
 *
 * Suomenkielinen kaava on LUONNOS (Sisältökirjuri tekee lopullisen, PT 26.10. 22.13).
 */
import { haeJson } from './opas.js';
import { laji, LAJI_QIDS, faktarivit, alarivi, viitatut, valitseAsukkaat } from './tietokortti-kaava.js';

export const TIETOKORTTI_VERSIO = 'v4';
/** Tietokortit pysyvät; uusi versio = uusi avain. */
export const TIETOKORTTI_TTL_S = 365 * 24 * 3600;

/** OSM-luokan hakusäde metreinä (piste on paikan keskellä; vesistöjen ja vuorten piste voi olla kaukana nimen kohdasta). */
const SADE = {
  city: 15000, town: 8000, village: 4000, hamlet: 3000, suburb: 4000, quarter: 3000, neighbourhood: 2000, isolated_dwelling: 2000,
  peak: 4000, volcano: 6000, lake: 30000, water: 30000, river: 400000, sea: 800000, bay: 60000,
};
const ASUTUS = new Set(['Q515', 'Q3957', 'Q532', 'Q5084', 'Q123705', 'Q486972', 'Q1549591', 'Q1180262', 'Q1115575', 'Q2755753',
  'Q211690', 'Q1637706', 'Q15284', 'Q747074', 'Q3184121', 'Q1907114', 'Q1093829', 'Q7930989', 'Q2989398', 'Q15078955', 'Q188509',
  'Q1266818', 'Q667509', 'Q484170', 'Q262166', 'Q2039348', 'Q856076', 'Q5119']);
const LUONTO = new Set(['Q8502', 'Q54050', 'Q207326', 'Q23397', 'Q4022', 'Q165', 'Q39594', 'Q131681', 'Q12323', 'Q1437299', 'Q23442',
  'Q46831', 'Q34763', 'Q45776', 'Q133056', 'Q35666', 'Q47521', 'Q8072', 'Q6017969']);
const ASUTUSLUOKAT = new Set(['city', 'town', 'village', 'hamlet', 'suburb', 'quarter', 'neighbourhood', 'isolated_dwelling']);

/** Välimuistin avain: luokka, nimi ja piste 0,01°:n tarkkuudella (sama paikka eri palasta = sama kortti). */
export function korttiAvain({ nimi, lat, lon, luokka }) {
  const n = String(nimi ?? '').trim().toLowerCase().normalize('NFC');
  return `tietokortti:${TIETOKORTTI_VERSIO}:${luokka}:${n}:${Number(lat).toFixed(2)}:${Number(lon).toFixed(2)}`;
}
export const tekstiAvain = (qid, laji) => `tietokortti:${TIETOKORTTI_VERSIO}:teksti:${laji}:${qid}`;

function etaisyysM(e, lat, lon) {
  const v = e?.claims?.P625?.[0]?.mainsnak?.datavalue?.value;
  if (!Number.isFinite(v?.latitude)) return Infinity;
  const r = Math.PI / 180;
  const dl = (v.latitude - lat) * r, dp = (v.longitude - lon) * r * Math.cos(lat * r);
  return 6371000 * Math.hypot(dl, dp);
}
const p31 = (e) => new Set((e?.claims?.P31 ?? []).map((c) => c?.mainsnak?.datavalue?.value?.id).filter(Boolean));
/** 2 = Wikipedia-artikkelin otsikko on nimi, 1 = vain nimiö, 0 = ei kumpaakaan. */
function otsikkoTasmaa(e, nimi) {
  const n = nimi.toLowerCase();
  if (['fiwiki', 'enwiki'].some((k) => {
    const t = e?.sitelinks?.[k]?.title;
    return t && t.split(',')[0].split(' (')[0].trim().toLowerCase() === n;
  })) return 2;
  return Object.values(e?.labels ?? {}).some((l) => l?.value?.toLowerCase() === n) ? 1 : 0;
}

/** Paras Wikidata-kohde nimelle ja pisteelle, tai null. */
export async function linkitaWikidata(haku, { nimi, lat, lon, luokka }) {
  const sade = SADE[luokka] ?? 5000;
  const ids = [];
  for (const kieli of ['en', 'fi', 'de', 'fr']) {
    try {
      const d = await haeJson(haku, 'https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&type=item&limit=10'
        + `&language=${kieli}&uselang=${kieli}&search=${encodeURIComponent(nimi)}`);
      for (const h of d?.search ?? []) if (!ids.includes(h.id)) ids.push(h.id);
    } catch { /* seuraava kieli */ }
    if (ids.length >= 12) break;
  }
  if (!ids.length) return null;
  const d = await haeJson(haku, 'https://www.wikidata.org/w/api.php?action=wbgetentities&format=json'
    + '&props=labels%7Cclaims%7Csitelinks%7Cdescriptions&languages=fi%7Cen&sitefilter=fiwiki%7Cenwiki'
    + `&ids=${ids.slice(0, 50).join('%7C')}`);
  const toive = ASUTUSLUOKAT.has(luokka) ? ASUTUS : LUONTO;
  const ehdokkaat = Object.values(d?.entities ?? {})
    .map((e) => ({ e, m: etaisyysM(e, lat, lon) }))
    .filter((x) => x.m <= sade)
    .sort((a, b) => (otsikkoTasmaa(b.e, nimi) - otsikkoTasmaa(a.e, nimi))
      || ([...p31(b.e)].some((q) => toive.has(q)) - [...p31(a.e)].some((q) => toive.has(q)))
      || (a.m - b.m));
  // Epävarma osuma jää pois (PT 26.10. 23.4x): nimen pitää täsmätä nimiöön tai Wikipedia-artikkelin otsikkoon.
  return ehdokkaat[0] && otsikkoTasmaa(ehdokkaat[0].e, nimi) > 0 ? ehdokkaat[0].e : null;
}

async function nimiot(haku, qids) {
  if (!qids.length) return {};
  try {
    const d = await haeJson(haku, 'https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&props=labels'
      + `&languages=fi%7Cen&ids=${qids.join('%7C')}`);
    return Object.fromEntries(Object.entries(d?.entities ?? {})
      .map(([q, e]) => [q, { fi: e?.labels?.fi?.value ?? null, en: e?.labels?.en?.value ?? null }]));
  } catch {
    return {};
  }
}

const arvot = (e, p) => (e?.claims?.[p] ?? []).map((c) => c?.mainsnak?.datavalue?.value).filter((v) => v != null);

/** Väkiluku ja vuosi: preferred-rankin arvo, muuten uusin (P585). */
export function vakiluku(e) {
  let paras = null;
  for (const c of e?.claims?.P1082 ?? []) {
    const m = Number(c?.mainsnak?.datavalue?.value?.amount);
    if (!Number.isFinite(m)) continue;
    const aika = c?.qualifiers?.P585?.[0]?.datavalue?.value?.time ?? '';
    const v = { maara: Math.round(m), vuosi: /^\+(\d{4})/.exec(aika)?.[1] ?? null, ensisijainen: c.rank === 'preferred' };
    if (!paras || (v.ensisijainen && !paras.ensisijainen)
      || (v.ensisijainen === paras.ensisijainen && (v.vuosi ?? '') > (paras.vuosi ?? ''))) paras = v;
  }
  return paras;
}

/** "noin 180 000 asukasta (2021)": kaksi merkitsevää numeroa, välilyönti tuhaterottimena; alle 1 000 tarkkana. */
export function asukkaatTeksti(v) {
  if (!v?.maara) return null;
  let n = v.maara;
  if (n >= 1000) { const k = 10 ** (String(n).length - 2); n = Math.round(n / k) * k; }
  const luku = String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${v.maara >= 1000 ? 'noin ' : ''}${luku} asukas${v.maara === 1 ? '' : 'ta'}${v.vuosi ? ` (${v.vuosi})` : ''}`;
}

/** Commonsin kuva (P18) vapaalla lisenssillä: { url, tekija, lisenssi, lahde } tai null. */
async function commonsKuva(haku, tiedosto) {
  if (!tiedosto) return null;
  try {
    const c = await haeJson(haku, 'https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo'
      + `&iiprop=url%7Cextmetadata&iiurlwidth=800&titles=${encodeURIComponent(`File:${tiedosto}`)}`);
    const tieto = Object.values(c?.query?.pages ?? {})[0]?.imageinfo?.[0];
    const meta = tieto?.extmetadata ?? {};
    const pois = (t) => String(t ?? '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const lisenssi = pois(meta.LicenseShortName?.value);
    if (!tieto?.thumburl || /\b(nc|nd)\b/i.test(lisenssi) || !/^(pd\b|public domain|cc0|cc by(-sa)? \d)/i.test(lisenssi)) return null;
    return { url: tieto.thumburl, tekija: pois(meta.Artist?.value) || null, lisenssi: /^public domain$/i.test(lisenssi) ? 'PD' : lisenssi,
      lahde: tieto.descriptionurl ?? null };
  } catch {
    return null;
  }
}

/** P279-esivanhemmat (enintään 4 tasoa) P31-luokille; pysähtyy reseptin lajitaulukon luokkaan. Muistissa isolaatin ajan. */
const ylaMuisti = new Map();
async function ylaluokat(haku, qids) {
  const tulos = {};
  let taso = qids.filter((q) => !LAJI_QIDS.has(q));
  const vanhempi = new Map(qids.map((q) => [q, q]));   // esivanhempi → alkuperäinen P31
  for (let k = 0; k < 4 && taso.length; k += 1) {
    const hae = taso.filter((q) => !ylaMuisti.has(q)).slice(0, 50);
    if (hae.length) {
      try {
        const d = await haeJson(haku, `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&props=claims&ids=${hae.join('%7C')}`);
        for (const [q, e] of Object.entries(d?.entities ?? {})) ylaMuisti.set(q, (e?.claims?.P279 ?? []).map((c) => c?.mainsnak?.datavalue?.value?.id).filter(Boolean));
      } catch { break; }
    }
    const seuraava = [];
    for (const q of taso) {
      for (const y of ylaMuisti.get(q) ?? []) {
        const alku = vanhempi.get(q);
        (tulos[alku] ??= []).push(y);
        if (!vanhempi.has(y)) { vanhempi.set(y, alku); if (!LAJI_QIDS.has(y)) seuraava.push(y); }
      }
    }
    taso = seuraava;
  }
  return tulos;
}

/**
 * Kortin faktat Wikidata-kohteesta Sisältökirjurin kaavalla (resepti osa 1): nimi, alarivi "Laji · Maa", enintään viisi
 * faktariviä "Otsikko: arvo" ja Commonsin kuva. Puuttuva kenttä jää pois.
 */
export async function korttiFaktat(haku, e, osmNimi) {
  const p31 = arvot(e, 'P31').map((v) => v.id);
  const lj = laji(p31, await ylaluokat(haku, p31.slice(0, 6)));
  // Nykyinen maa: ei päättyneitä (P582) eikä hylättyjä; suositeltu ensin (Cambridge: P17:ssä myös Englannin kuningaskunta ym.).
  const p17 = (e?.claims?.P17 ?? []).filter((c) => c.rank !== 'deprecated' && !c?.qualifiers?.P582);
  const p17ens = p17.some((c) => c.rank === 'preferred') ? p17.filter((c) => c.rank === 'preferred') : p17;
  const maaQ = p17ens.map((c) => c?.mainsnak?.datavalue?.value?.id).filter(Boolean).slice(0, 4);
  const L = await nimiot(haku, [...new Set([...maaQ, ...viitatut(e, lj.ryhma)])].slice(0, 50));
  const nimi = (q) => L[q]?.fi ?? L[q]?.en ?? null;
  const maat = maaQ.map(nimi).filter(Boolean);
  const v = valitseAsukkaat(e);
  // Wikidatan "town" (Q3957) on suomeksi pikkukaupunki vain pienelle: 20 000 asukkaasta Kaupunki (KK 27.10.: Windsor).
  if (lj.nimi === 'Pikkukaupunki' && v?.maara >= 20000) lj.nimi = 'Kaupunki';
  const kohteenNimi = e?.labels?.fi?.value ?? e?.labels?.en?.value ?? osmNimi;
  return {
    qid: e.id,
    nimi: kohteenNimi,
    laji: lj.nimi,
    alarivi: alarivi(lj.nimi, maat),
    // Alue ei ole kaupunki itse (resepti 1.4: Cambridgen P131 on Cambridgen piirikunta, sama nimi).
    rivit: faktarivit(e, lj, nimi, maat.length === 1 ? maat[0] : null).filter((r) => r !== `Alue: ${kohteenNimi}`),
    sijainti: maat.join(', ') || null,
    asukkaat: v,
    kuva: await commonsKuva(haku, arvot(e, 'P18')[0]),
    wiki: { fi: e?.sitelinks?.fiwiki?.title ?? null, en: e?.sitelinks?.enwiki?.title ?? null },
  };
}

/**
 * Wikipedian teksti Pululle: { kieli, otsikko, teksti } tai null. pitka = koko artikkelin alku. Suomenkielinen ensin; jos se on
 * tynkä (alle 1 500 merkkiä, esim. Eton kolme virkettä, vedos 3 27.10.), perään englanninkielinen, jotta Lue lisää saa uusia faktoja.
 */
const TYNKA = 1500;
export async function wikiLahde(haku, wiki, pitka) {
  const hae = async (kieli, otsikko) => {
    if (!otsikko) return null;
    try {
      const d = await haeJson(haku, `https://${kieli}.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&explaintext=1`
        + `${pitka ? '' : '&exintro=1'}&redirects=1&titles=${encodeURIComponent(otsikko)}`);
      // Tyhjät osiootsikot (== Lähteet ==, == Aiheesta muualla ==) pois.
      const t = (Object.values(d?.query?.pages ?? {})[0]?.extract ?? '').replace(/\n*==+ [^=\n]+ ==+\n*(?=\n*(==|$))/g, '\n').trim();
      return t.length > 80 ? { kieli, otsikko, teksti: t } : null;
    } catch { return null; }
  };
  const fi = await hae('fi', wiki?.fi);
  // Pitkä teksti: englanninkielinen aina rinnalle (KK 27.10.: fi-Wikipedian Windsor-virhe; kaksi lähdettä → ristiriita jää pois, kehote).
  const en = !fi || pitka ? await hae('en', wiki?.en) : null;
  if (fi && en) {
    // Englanninkielinen vähintään kaksi kertaa laajempi: suomenkielisestä vain ensimmäinen kappale (nimimuodot), faktat laajemmasta
    // (KK 27.10.: fi-Windsorin leipätekstin "saksit perustivat linnoituksen"; linnan rakennutti Vilhelm Valloittaja n. 1070).
    const fiOsa = en.teksti.length >= 2 * fi.teksti.length ? fi.teksti.split(/\n/)[0].slice(0, 800) : fi.teksti.slice(0, 2400);
    return { ...fi, kielet: ['fi', 'en'], teksti: `${fiOsa}\n\nEnglanninkielinen artikkeli:\n${en.teksti}`.slice(0, 4000) };
  }
  const l = fi ?? en;
  return l ? { ...l, teksti: l.teksti.slice(0, 4000) } : null;
}

/** Merkkirivi lyhyen ja Lue lisää -tekstin välissä ja tyhjän lähteen vastaus (resepti kartan-tietokortti.md 2.1). */
export const LUE_LISAA = '###LUE-LISÄÄ###';
export const EI_LAHDETTA = '###EI-LÄHDETTÄ###';

/**
 * Pulun kehote (Sisältökirjuri, docs/tuotanto/reseptit/kartan-tietokortti.md 2.2, main c431c17ae) sanatarkasti. Yksi kutsu
 * tuottaa lyhyen tekstin, merkkirivin ja Lue lisää -tekstin; asiakas näyttää ensimmäisen heti ja toisen napista.
 */
export const KARTAN_TIETOKORTTI_KEHOTE = `VASTAUKSEN LAJI: KARTAN TIETOKORTTI
Pelaaja napautti kartalla paikkaa, ja sen faktakortti on jo ruudulla. Kirjoitat kortin alle kaksi tekstiä: lyhyen
tekstin ja Lue lisää -tekstin. Puhut Pulun, eli kirjekyyhky Livian, äänellä, mutta tämä ei ole keskustelu eikä sinulta
kysytä mitään. Kuulijat ovat kolmetoistavuotiaita ja aikuisia.

LÄHDE. Käytät VAIN alla annettua lähdettä (Wikidatan tiedot ja Wikipedian teksti). Et käytä omaa muistiasi, et lisää
mitään, mitä lähteessä ei lue, et arvaa etkä täydennä. Jos lähde ei kerro jotakin, jätät sen kertomatta. Jos lähteen
tiedot ovat keskenään ristiriidassa, jätät ristiriitaisen asian pois. Jos lähteessä ei ole kahden virkkeen verran
kerrottavaa tai se ei kerro paikasta mitään olennaista, vastaat pelkällä rivillä ###EI-LÄHDETTÄ### ja et mitään muuta.
Jos lähteessä on suomenkielisen tekstin perässä englanninkielinen artikkeli, kirjoitat sen nimet suomeksi vain, kun
suomenkielinen teksti tai faktat käyttävät vakiintunutta suomenkielistä muotoa (esimerkiksi Thamesjoki); muuten nimi jää alkuperäiseksi.

LUVUT JA VUODET. Käytät lukuja ja vuosilukuja vain, jos ne ovat lähteessä. Et toista faktakortin lukuja sellaisinaan
(ne näkyvät jo kortilla); kerrot mieluummin, mitä ne tarkoittavat tai mitä paikalla näkee ja kokee. Kaikki luvut ja vuodet kirjoitat
NUMEROINA: vuonna 1889, 1600-luvulla, 330 metriä, noin 5 100; ei koskaan sanoina ("viisi tuhatta sataa" on virhe).
Vain luvut yhdestä kymmeneen saavat olla sanoina, jos se on luontevampaa. Asukaslukua et kirjoita ollenkaan, koska se
on jo kortilla. Et laske, vertaile etkä muunna yksiköitä.

MUOTO. Vastaus on pelkkää tekstiä: ei otsikoita, ei luetteloita, ei sulkeita, ei lainausmerkkejä, ei emojeita, ei
lihavointeja eikä lyhenteitä (kirjoitat esimerkiksi "noin" etkä "n."). Kun tekstiä luetaan ääneen, jokaisen virkkeen
pitää kuulostaa siltä, että suomalainen sanoisi sen. Ensimmäinen osa on tasan 3–4 virkettä (suomen sanat ovat pitkiä, joten tämä on noin 28–65 sanaa) ja alkaa
paikan nimellä. Sitten tulee tasan yksi rivi: ###LUE-LISÄÄ###. Toinen osa on 2–3 lyhyttä kappaletta ja noin 80–170 sanaa;
se syventää ensimmäistä lähteen muilla faktoilla ja toistamatta ensimmäisen osan virkkeitä. Jos lähde on niukka,
tekstit ovat lyhyempiä (ensimmäinen vähintään 2 virkettä, toinen saa jäädä pois, jolloin vastaus loppuu ensimmäiseen
osaan eikä merkkiriviä kirjoiteta).

EI PUHUTTELUA, EI KEHOTUKSIA. Et puhuttele pelaajaa etkä kehota häntä mihinkään: ei "kun katselet", "huomaat",
"kannattaa", "täällä kävellään" eikä mitään, mikä on sinun omaa havaintoasi tai elämyskuvausta. Et kuvaile karttanäkymää
etkä sitä, miltä paikka "näyttää" tai "tuntuu", ellei lähde sano sitä. Jokainen virke kertoo jotakin, mikä lähteessä
lukee; täytelause ("historia on ulottunut tähän maisemaan") on virhe. Et tee johtopäätöksiä (esimerkiksi "lähes
sulautunut linnan kylkeen"), ellei lähde sano samaa.

VIRKKEET LOPPUUN. Jokainen virke ja koko vastaus päättyy valmiiseen virkkeeseen ja pisteeseen; kesken jäävää tekstiä ei
tuoteta. Jos tila loppuu, jätät viimeisen lauseen kirjoittamatta kokonaan.

LUE LISÄÄ EI TOISTA. Toinen osa ei saa sisältää mitään asiaa, joka on jo ensimmäisessä osassa tai faktakortilla: sama
vuosi, sama nimi tai sama hallinnollinen tieto kerrotaan vain kerran koko vastauksessa, eikä sama asia saa palata
toisin sanoin ("pieni kaupunki" ei toista laji-riviä). Toisen osan pitää tuoda vähintään kolme uutta lähteen faktaa. Jos
niitä ei ole, jätät toisen osan kokonaan pois (vastaus loppuu ensimmäiseen osaan, merkkiriviä ei kirjoiteta).

SAMA FAKTA KERRAN. Jokainen fakta kerrotaan koko vastauksessa vain kerran, myös saman osan sisällä: kun olet kertonut
hallinnollisen alueen, sijainnin (esimerkiksi vastakkainen ranta) tai vuoden, et kerro sitä uudelleen toisin sanoin.

VIERAAT NIMET JA VIITTAUKSET. Vieraskielisiä erisnimiä ei taivuteta: kirjoitat "Royal Windsor Way -ohitietä" etkä "Royal
Windsor Waynin kautta", "Windsor Bridge -siltaa" etkä "Windsor Bridgen". Kun nimi on englantia eikä lukija ymmärrä sitä,
kerrot ensin suomeksi, mikä paikka on ("hyväntekeväisyyskoulu"), ja nimi kirjoitetaan kerran alkuperäisenä; jos asia ei ole
tärkeä, jätät nimen pois. Sanoja college, school ja bridge ei jätetä pelkiksi taivutetuiksi englannin sanoiksi
("collegelle"): käytät suomea (oppilaitos, koulu, silta) tai koko nimeä. Sanot paikasta koko ajan samaa sanaa (kaupunki tai
kylä, sen mukaan mikä alarivillä on), ja jokaisen viittauksen kohde on nimetty ensin: "uusi kappeli" ei kelpaa ilman
että on sanottu, minkä kappeli. Niukkaa pikkutietoa (ohitien avaus, yksittäinen koulu) et ota mukaan, ellei se kerro
paikasta jotakin olennaista.

SISÄLTÖ. Kerrot, mikä paikka on ja mikä siinä on huomionarvoista: yksi konkreettinen asia, jonka pelaaja voi itse
nähdä tai kokea, ja yksi taustatieto, joka on lähteessä. Nykyaika ensin; historia on taustaa. Et arvostele paikkoja,
kansoja, uskontoja etkä ihmisiä, et kehu etkä käytä mainoskieltä ("kaikkien aikojen", "ainutlaatuinen", "ihana",
"pakko nähdä"). Herkät aiheet (sodat, joukkotuhot, siirtomaavalta, uskonnot, katastrofit) kerrot asiallisesti ja
kunnioittavasti, ilman graafisia yksityiskohtia ja ilman sensaatiota. Elävistä ihmisistä kerrot vain sen, mikä
lähteessä lukee. Henkilöstä, jonka sukupuolta lähde ei kerro, käytät nimeä tai sanaa "hän". Mainitse lähde vain, jos
lause sitä vaatii; lähderivin näyttää peli.

ÄÄNI. Puhut Pulun äänellä: lämmin, utelias ja vähän kokenut. Korttitekstissä ei käytetä äännähdyksiä eikä alustuksia
("Kato,", "No niin," ja muut jäävät chatille: kirjoitettuna ne näyttävät virheeltä, tuore lukija 26.10.). Pulun ääni
kuuluu sanavalinnoissa ja elävissä, selkeissä yleiskielen lauseissa (mutta, siitä, ei mut, siit); teksti alkaa suoraan
paikan nimellä. "Kääk" kuuluu vain aitoon säikähdykseen eikä sitä tässä käytetä. Pulu sanoo
minä ja sinä, ei mä eikä sä. Pulu ei vitsaile surullisella eikä vakavalla aiheella; silloin äännähdys jää pois ja
ääni on rauhallinen ja kunnioittava. Pulu ei kerro aarteista, isoisästä eikä juonesta eikä viittaa peliin.

TARKISTA ENNEN VASTAUSTA (ajattele hiljaa, älä kirjoita): jokainen luku ja nimi on lähteessä; ensimmäisessä osassa on
3–4 virkettä; ###LUE-LISÄÄ### on omalla rivillään ja vain kerran; ei sulkeita eikä lyhenteitä; ei mainoskieltä.`;

/** Syöte mallille (resepti 2.1): kohde, nimi, laji, maa, faktat ja Wikipedian teksti kielineen. */
export function pulunViesti(faktat, lahde) {
  return JSON.stringify({
    kohde: faktat.qid, nimi: faktat.nimi, laji: faktat.laji, maa: faktat.sijainti ?? null, faktat: faktat.rivit,
    ...(lahde ? { wikipedia: { kieli: lahde.kieli, otsikko: lahde.otsikko, teksti: lahde.teksti,
      linkki: `https://${lahde.kieli}.wikipedia.org/wiki/${encodeURIComponent(lahde.otsikko.replace(/ /g, '_'))}` } } : {}),
  });
}

const EN_YKSIKOT = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen',
  'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const EN_KYMMENET = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
/** Luku 1–100 englanniksi sanoin (twenty-one, ninety, a hundred) lähteen sanalukujen tunnistamiseen. */
function enSanaluku(v) {
  if (v === 100) return 'hundred';
  if (v < 20) return EN_YKSIKOT[v];
  return EN_KYMMENET[Math.floor(v / 10)] + (v % 10 ? `-${EN_YKSIKOT[v % 10]}` : '');
}

const NIMIMUODOT = { Kaar: ['Charles', 'Carl'], 'Yrjö': ['George'], Juha: ['John'], Jaak: ['James', 'Jacob'], Kust: ['Gustav'],
  Mari: ['Mary', 'Marie'], Kata: ['Catherine', 'Katharina'], Lauk: ['Lawrence', 'Laurence'], Tapa: ['Stephen'], Pieta: ['Peter'] };
/** Vertailuasu: pienet kirjaimet, w → v, c → k, ph → f (Vilhelm ~ William, Rikhard ~ Richard). */
const kirjoitusasu = (t) => String(t).toLowerCase().replace(/ph/g, 'f').replace(/w/g, 'v').replace(/c/g, 'k');

const KIELLETYT = ['kaikkien aikojen', 'ainutlaatuinen', 'ihana', 'pakko nähdä', 'upea', 'mahtava', 'uskomaton', 'wikipedia', 'wikidata', 'lähde'];
const sanat = (t) => t.split(/\s+/).filter(Boolean).length;

/**
 * Uusinnan korjauspalaute mallille (resepti 2.4/3: hylätty → uusinta): tarkistuksen syy suomeksi ohjeena. Sokea uusinta toisti
 * saman virheen (vedos 5b: kolme paikkaa, kuusi uusintaa, yksikään ei läpäissyt).
 */
export function korjausPalaute(syy) {
  const s = String(syy ?? '');
  const [lj, ...loput] = s.split(' ');
  const mika = loput.join(' ');
  const ohje = {
    lyhyt: 'Ensimmäinen osa on liian lyhyt: kirjoita 3–4 kokonaista virkettä (vähintään 28 sanaa).',
    'pitkä': 'Lue lisää -osa ei ole 80–170 sanaa: kirjoita se 2–3 kappaleeseen, tai jätä se kokonaan pois, jos uusia faktoja ei ole.',
    toisto: `"${mika}" toistuu: sama erisnimi enintään kahdesti, sama vuosiluku ja sama pitkä sana vain kerran koko vastauksessa. Käytä viittausta (se, kaupunki) tai jätä toisto pois.`,
    nimi: `Nimeä "${mika}" ei ole lähteessä: käytä vain lähteen nimiä.`,
    luku: `Lukua ${mika} ei ole lähteessä: käytä vain lähteen lukuja.`,
    vieras: 'Älä taivuta englannin sanoja (collegelle, Windsor Bridgen): käytä suomea (oppilaitos, silta) tai nimeä taivuttamattomana (Windsor Bridge -silta).',
    merkit: 'Poista sulkeet, tähdet, ajatusviivat ja lyhenteet (n., ns., esim.).',
    sana: `Poista sana "${mika}".`,
    aloitus: 'Älä aloita äännähdyksellä; aloita paikan nimellä.',
    'lähes': 'Kaksi virkettä sanoo lähes saman: poista toinen.',
    puhuttelu: 'Älä puhuttele lukijaa äläkä kehota häntä mihinkään.',
    kesken: 'Lopeta jokainen osa valmiiseen virkkeeseen ja pisteeseen.',
    merkkirivi: 'Kirjoita ###LUE-LISÄÄ### vain kerran omalle rivilleen.',
  }[lj] ?? `Tarkistus hylkäsi vastauksen (${s}).`;
  return `Tarkistus hylkäsi vastauksen: ${ohje} Kirjoita koko vastaus uudelleen samassa muodossa; muut ohjeet ennallaan.`;
}

/**
 * Automaattiset tarkistukset ennen tallennusta (resepti 2.4): muoto, sanamäärät, numerot ja nimet syötteessä, kielletyt merkit ja
 * sanat. { ok, syy } – hylätty ei mene ämpäriin. Isolla alkavat nimet tarkistetaan vain virkkeen keskeltä (virkkeen alku on aina iso).
 */
export function tarkistaTeksti(teksti, syote, kohteenNimi = null) {
  const t = String(teksti ?? '').trim();
  if (t === EI_LAHDETTA) return { ok: true, syy: 'ei-lahdetta' };
  const osat = t.split(LUE_LISAA);
  if (osat.length > 2) return { ok: false, syy: 'merkkirivi' };
  const [eka, toka = ''] = osat.map((x) => x.trim());
  const niukka = !toka;
  if (sanat(eka) < (niukka ? 20 : 28) || sanat(eka) > 65) return { ok: false, syy: `lyhyt ${sanat(eka)} sanaa` };
  if (toka && (sanat(toka) < 80 || sanat(toka) > 170)) return { ok: false, syy: `pitkä ${sanat(toka)} sanaa` };
  const ilman = osat.join(' ');
  // Lyhenteen alku kirjaimella eikä \b:llä: \b pitää ä:tä sanarajana ("residenssinään." → "n.", Windsor vedos 4).
  if (/[()*—]|#/.test(ilman) || /(?<!\p{L})(n|ns|esim)\./iu.test(ilman)) return { ok: false, syy: 'merkit' };
  const pienet = ilman.toLowerCase();
  const kielletty = KIELLETYT.find((s) => pienet.includes(s));
  if (kielletty) return { ok: false, syy: `sana ${kielletty}` };
  // 2.4/6: ei alustusäännähdyksiä tekstin alussa.
  if (/^(kato|no niin|hetkinen|kääk)\b/i.test(eka)) return { ok: false, syy: 'aloitus' };
  // 2.4/8: ei toistoa – nelinumeroinen vuosi tai erisnimi (≥ 5 kirjainta, ei kohteen omaa nimeä) kerran koko vastauksessa,
  // ja kaksi lähes samaa virkettä (yhteisiä sanoja yli 60 %) = hylkäys.
  // Vain tarkat vuodet: vuosisata (1700-luvun alku ja loppu) saa toistua.
  const vuodet = ilman.match(/\b\d{4}\b(?!-lu)/g) ?? [];
  const vuosiToisto = vuodet.find((v, i) => vuodet.indexOf(v) !== i);
  if (vuosiToisto) return { ok: false, syy: `toisto ${vuosiToisto}` };
  const oma = (kohteenNimi ?? '').toLowerCase();
  const nimet = (ilman.match(/(?<=[\p{Ll},] )[\p{Lu}][\p{L}-]{4,}/gu) ?? []).filter((n) => !oma.includes(n.toLowerCase().slice(0, 5)));
  // Erisnimi enintään viidesti (vedos 5c: naapurikaupunki, joki ja hallintoalueen nimi toistuvat luontevasti 150 sanassa: Eton–Windsor viidesti).
  const nimiToisto = nimet.find((n) => nimet.filter((m) => m.slice(0, 5) === n.slice(0, 5)).length > 5);
  if (nimiToisto) return { ok: false, syy: `toisto ${nimiToisto}` };
  // Sama fakta kahdesti (KK 27.10.): sama pitkä sana (≥ 13 kirjainta, 11 ensimmäistä samat, ei kohteen nimeä) kahdesti.
  // Isolla alkavat (nimet) jäävät pois: erisnimien toiston hoitaa yllä oleva sääntö.
  const pitkat = (ilman.match(/(?<![\p{L}])\p{Ll}\p{L}{12,}/gu) ?? []).map((s) => s.slice(0, 11)).filter((s) => !oma.includes(s));
  const sanaToisto = pitkat.find((s, i) => pitkat.indexOf(s) !== i);
  if (sanaToisto) return { ok: false, syy: `toisto ${sanaToisto}` };
  const virkkeet = ilman.split(/(?<=[.!?])\s+/).map((v) => new Set(v.toLowerCase().match(/\p{L}{3,}/gu) ?? [])).filter((v) => v.size >= 4);
  for (let a = 0; a < virkkeet.length; a += 1) {
    for (let b = a + 1; b < virkkeet.length; b += 1) {
      const yhteiset = [...virkkeet[a]].filter((x) => virkkeet[b].has(x)).length;
      if (yhteiset / Math.min(virkkeet[a].size, virkkeet[b].size) > 0.6) return { ok: false, syy: 'lähes sama virke' };
    }
  }
  // 2.4 (SK 27.10.): englannin sana suomen päätteellä ("collegelle") tai vieras nimi genetiivissä ("Windsor Bridgen") = hylkäys.
  if (/(?<!\p{L})(college|school|bridge)(n|lle|lla|lta|sta|ssa|ksi|a|t|ja)(?!\p{L})/u.test(ilman)
    || /(?<!\p{L})[A-Z]\p{L}* (Bridge|College|School|Way|Street|Road)n(?!\p{L})/u.test(ilman)) return { ok: false, syy: 'vieras sana' };
  // 2.4/7: ei puhuttelua eikä kehotuksia.
  if (/katsel|huomaat|kannattaa|kävele|(?<!\p{L})näet(?!\p{L})|tuntuu|(?<!\p{L})kun \p{L}+t(?!\p{L})/iu.test(ilman)) return { ok: false, syy: 'puhuttelu' };
  // 2.4/8: viimeinen merkki on piste (myös lyhyen osan loppu).
  if (!/[.!?]$/.test(eka) || (toka && !/[.!?]$/.test(toka))) return { ok: false, syy: 'kesken' };
  // 2.4/3: ei sanoin kirjoitettuja suuria lukuja.
  // Ei "sataa": se on myös verbi ("joulukuussa sataa eniten", Windsor vedos 4).
  if (/(?<!\p{L})(tuhatta|tuhat|miljoonaa|miljoona)(?!\p{L})/iu.test(ilman)) return { ok: false, syy: 'luku sanoin' };
  const lahdeTeksti = String(syote ?? '');
  const tiivis = lahdeTeksti.replace(/\s/g, '');
  for (const luku of ilman.match(/\d[\d\s]*\d|\d/g) ?? []) {
    const n = luku.replace(/\s/g, '');
    if (tiivis.includes(n)) continue;
    // Vuosisata suomeksi (1100-luvulla) englanninkielisestä lähteestä ("12th century", "1100s").
    const v = Number(n);
    if (v >= 100 && v % 100 === 0 && new RegExp(`\\b${v / 100 + 1}(st|nd|rd|th)[ -]century|\\b${v}s\\b|\\b${v / 100 + 1}\\. vuosisa`, 'i').test(lahdeTeksti)) continue;
    // Englanninkielisen lähteen sanaluku numeroiksi ("over ninety coaches" → yli 90 vaunua, Maidenhead).
    if (v > 0 && v <= 100 && enSanaluku(v) && new RegExp(`\\b${enSanaluku(v)}\\b`, 'i').test(lahdeTeksti)) continue;
    return { ok: false, syy: `luku ${luku}` };
  }
  const enLahde = lahdeTeksti.includes('Englanninkielinen artikkeli:') || /"kieli":"en"/.test(lahdeTeksti);
  const lahdeNimet = lahdeTeksti.match(/(?<!\p{L})[A-ZÄÖÅ]\p{L}+/gu) ?? [];
  for (const osuma of ilman.matchAll(/(?<=[a-zäöå,] )[A-ZÄÖÅ][\p{L}-]{2,}/gu)) {
    const nimi = osuma[0];
    // Monisanaisen nimen jatko (Vilhelm Valloittaja, Royal Windsor Way): alku on jo tarkistettu.
    if (/[A-ZÄÖÅ][\p{L}-]* $/u.test(ilman.slice(Math.max(0, osuma.index - 30), osuma.index))) continue;
    if (lahdeTeksti.includes(nimi.slice(0, Math.max(4, nimi.length - 3)))) continue;
    // Englanninkielinen lähde: suomenkielinen vakiintunut muoto (Lontoo ← London) kelpaa kolmen alkukirjaimen sanana lähteessä.
    // Vain lähteen isolla alkava sana kelpaa vastineeksi (SK 27.10.: keksitty nimi ei pääse läpi pelkän säännön vuoksi).
    if (enLahde && lahdeNimet.some((x) => x.startsWith(nimi.slice(0, 3)))) continue;
    // Kirjoitusasun erot (Vilhelm ← William, Rikhard ← Richard) ja vakiintuneet suomenkieliset hallitsijanimet (Kaarle ← Charles).
    if (enLahde && (NIMIMUODOT[nimi.slice(0, 4)] ?? []).some((x) => lahdeTeksti.includes(x))) continue;
    if (enLahde && lahdeNimet.some((x) => kirjoitusasu(x).startsWith(kirjoitusasu(nimi.slice(0, 3))))) continue;
    return { ok: false, syy: `nimi ${nimi}` };
  }
  return { ok: true, syy: null };
}
