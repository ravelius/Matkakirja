/*
 * NOSTOKUVAT (skeema 1.75; Pelikoodari 17.11.2026, omistaja 23.24, KK 23.2x): jokaiselle nostolle valmis kuvalista
 * `nostokuvat`, jotta natiivi (NUI) voi näyttää kuvat kaikissa nostoissa ilman, että nostoja tehdään uudestaan.
 * Lista kootaan VAIN datassa jo olevista kuvista; kuvia voi lisätä myöhemmin, ja ne tulevat listaan itsestään.
 *
 *   nostokuvat = [{ osoite, lyhyt, laji, lahde, lisenssi, mista }]
 *     osoite    sama vientiosoite kuin muualla paketissa (lehdet.mjs R.kuva → media.json: kuva-commons ämpäriin,
 *               repon assets/ ämpäriin ?v=tiivisteellä, hetkikuva hetkenKuvaOsoite, valmis https-osoite sellaisenaan)
 *     lyhyt     kortin lyhyt kuvateksti (js/kuvatekstit.js kuvatekstiLyhyt) | null
 *     laji      datan laji (jaksokuvat: valokuva | havainnekuva | kartta | piirros | maalaus); muuten havainnekuva,
 *               kun kuva on Matkakirjan ihme tai lähderivi sanoo havainnekuva/tekoäly; muuten null (ei arvata)
 *     lahde     datan lahde (vanhan muodon kuvaLahde; varalla tekija) | null
 *     lisenssi  datan lisenssi; muuten lähderivin CC-/CC0-/public domain -merkintä; muuten null
 *     mista     nosto (noston omat kuvat) | kohde (paikka, johon nosto kuuluu) | juttu (nähtävyysjuttu)
 *   Järjestys nosto → kohde → juttu; sama osoite vain kerran (ensimmäinen jää). Ei kuvia = [].
 *
 * Noston omat kuvat samassa järjestyksessä kuin web ne näyttää (pelin omat funktiot):
 *   kohde (fokuskohde, hahmotelma, maastokohde, monumentti, napakohde, fokusvirran kohde):
 *     jaksokuvat jaksojen järjestyksessä (kuva, lisakuva; sitten käyttämättömät), js/fokuskohteet.js
 *     kohteenKuvalista (ihmekuva, kuva, kuvat) ja kohteenNykykuva (olemassa olevan ihmeen nykykuva)
 *   skandaali        js/skandaalit.js skandaalinKuvat (kuvat, vanha kuva)
 *   historian hetki  jaksokuvat ja kuvat (js/packs/historian-hetket.js, hetkikuva)
 *   syvennys         fokusvirrat[].takyt[]: kuva, kuvat, valokuva
 *   täky-/maalehtinosto  NOSTO_MAAT ja fokusvirrat[].takynostot: kuva, kuvat, galleria, valokuva
 *   eläintäky        elaintayt-kokoelman kuvat (js/packs/elaintakyt.js elaintakynKuvat; vanha kuva + kuvaLahde)
 *   nähtävyysjuttu   Matkakirjan ihme nimellä (js/fokuskohteet.js matkakirjanIhme, kuten js/nahtavyydet.js) ja kuvat
 * Kohde: täkynoston `kohde` (kohteen kortin kuvat) ja kohdekartan kohteet, joiden nosto on tämä tunnus
 * (kohdekartat.kohteet[].kuvat); nähtävyysjutulla myös sen nosto-linkin nostojen omat kuvat.
 * Juttu: nähtävyysjutut, joiden nosto on tämä tunnus, ja linkittävien kohdekartan kohteiden jutut (kaupunki + nimi). Jälkimmäiset
 * (toinen tarina samasta paikasta) vain, kun nostolla ei ole yhtään kuvaa muista lähteistä (KK:N PÄÄTÖS 20.11.2026 klo 15.08).
 * Pois: kartan merkit, kuvakkeet, miniatyyrit (kohdekartan piirrosmerkit), pikkukuvat, äänet ja linkit.
 */
import { kohteenKuvalista, kohteenNykykuva, matkakirjanIhme } from '../../js/fokuskohteet.js';
import { skandaalinKuvat } from '../../js/skandaalit.js';
import { NOSTO_MAAT } from '../../js/fokusnosto.js';
import { MAASTOKOHTEET_ATA } from '../../js/packs/maastokohteet-ata.js';
import { MAASTOKOHTEET_ARK } from '../../js/packs/maastokohteet-ark.js';
import { KOHDE_MAAT } from '../../js/fokuskohteet.js';

export const MISTA = ['nosto', 'kohde', 'juttu'];

/** Kokoelmat, joiden jokaisella alkiolla on päätason nostokuvat (skeema 1.75). */
export const NOSTOKUVA_KOKOELMAT = ['karttavalot', 'takynostot', 'skandaalit', 'historianHetket', 'monumentit',
  'nahtavyydet', 'elaintayt'];
/** Sisäkkäiset nostolistat (jokaisella listan alkiolla nostokuvat). */
export const NOSTOKUVA_SISAKKAISET = { fokusvirrat: ['takyt', 'takynostot', 'kohteet'] };

export const NOSTOKUVA_KUVAUS = 'Skeema 1.75: nostokuvat = [{ osoite (sama vientiosoite kuin muualla paketissa), lyhyt, '
  + 'laji (valokuva | havainnekuva | kartta | piirros | maalaus | null), lahde, lisenssi | null, mista: nosto | kohde | juttu }]: '
  + 'noston omat kuvat, sitten paikan (kohde: täkynoston kohde, kohdekartan kohde), sitten nähtävyysjutun kuvat; sama osoite '
  + 'kerran; [] = ei kuvia (tools/vienti/nostokuvat.mjs).';

/*
 * Lisenssi lähderiviltä vain kuvan oman lisenssin muodossa: sulkeissa, kuten "Tekijä, Wikimedia Commons (CC BY-SA 3.0)".
 * Sulkeeton maininta ("rakennusreferenssit … CC0") koskee usein havainnekuvan lähdeaineistoa, ei kuvaa: silloin null.
 */
const LISENSSI = /\((CC0(?: 1\.0)?|CC[ -]BY(?:-NC)?(?:-SA|-ND)?(?: \d\.\d)?(?: (?:IGO|[A-Z]{2}))?|[Pp]ublic [Dd]omain)\)/;
/** Lisenssi lähderiviltä, kun datassa ei ole omaa kenttää (null = tuntematon). */
export function lisenssiLahteesta(lahde) {
  const m = typeof lahde === 'string' ? lahde.match(LISENSSI) : null;
  if (!m) return null;
  return /^public domain$/i.test(m[1]) ? 'Public domain' : m[1].replace(/^CC[ -]BY/i, 'CC BY');
}

const HAVAINNE = /havainnekuva|tekoäly/i;
const tunnukset = (v) => (v == null ? [] : (Array.isArray(v) ? v : [v])).filter((t) => typeof t === 'string' && t);

/** Vanhan muodon kuva (pelkkä merkkijono) kuvaolioksi; url-kenttä osoitteeksi vain, jos muuta lähdettä ei ole. */
function kuvaOlioksi(o) {
  if (typeof o === 'string' && o) return /^(https?:|assets\/)/.test(o) ? { osoite: o } : { tiedosto: o };
  if (!o || typeof o !== 'object') return null;
  if (!o.osoite && !o.ampari && !o.tiedosto && typeof o.url === 'string' && o.url) return { ...o, osoite: o.url };
  return o;
}

/*
 * LISÄKENTÄT (K-3, KK:N PÄÄTÖS 20.11.2026 09.18, aiempi: P-261120-5): tekijä omana kenttänään ja viedyn kuvan mitat
 * (tools/sisalto/nostokuva.mjs kirjoittaa leveys ja korkeus, peliin 1200 × 800). Vain, kun data kantaa ne: vanha peli
 * ohittaa tuntemattomat kentät, ja kuvat ilman niitä pysyvät ennallaan (tests/noston-kuvat.test.mjs KENTAT).
 */
export const NOSTOKUVA_LISAKENTAT = ['tekija', 'leveys', 'korkeus'];
/*
 * Päällä vasta, kun tests/noston-kuvat.test.mjs (SK, KENTAT tarkka) sallii lisäkentät; siihen asti vain tarkistus
 * (tests/nostokuvien-tasalaatu.test.mjs) kytkee ne päälle omassa ajossaan (node --test ajaa tiedostot erillään).
 */
let lisakentatPaalla = false;
export function lisakentatViennissa(paalla = true) { lisakentatPaalla = Boolean(paalla); }
function lisakentat(raaka, raakaData = true) {
  const tulos = {};
  if (!lisakentatPaalla) return tulos;
  if (typeof raaka.tekija === 'string' && raaka.tekija.trim()) tulos.tekija = raaka.tekija.trim();
  // Ratkaistun kuvan (kokoelmien päätaso) leveys ja korkeus ovat media.jsonin lähdemittoja, eivät viedyn kuvan: vain raakadata.
  if (raakaData && Number.isInteger(raaka.leveys) && Number.isInteger(raaka.korkeus) && raaka.leveys > 0 && raaka.korkeus > 0) {
    tulos.leveys = raaka.leveys;
    tulos.korkeus = raaka.korkeus;
  }
  return tulos;
}

export function nostokuvaRakentaja({ R, hae, haeKohde, kokoelmat }) {
  const { SKANDAALIT } = hae('js/packs/skandaalit.js');
  const { HISTORIAN_HETKET } = hae('js/packs/historian-hetket.js');
  const { FOKUSVIRRAT } = hae('js/packs/fokusvirrat.js');

  /** Raaka kuvaolio → nostokuva (null = ei osoitetta: tulossa, rikki tai ei kuva). */
  const raakana = (o, mista, { ihme = false } = {}) => {
    const raaka = kuvaOlioksi(o);
    if (!raaka) return null;
    const r = R.kuva(raaka);
    return r?.url ? nostokuva(r, raaka, mista, ihme) : null;
  };
  /** Valmiiksi ratkaistu kuva ({ url, lyhyt, lahde… }, kokoelmien päätaso) → nostokuva. */
  const ratkaistuna = (r, mista) => (r?.url ? nostokuva(r, r, mista, false) : null);
  function nostokuva(r, raaka, mista, ihme) {
    const lahde = r.lahde ?? raaka.kuvaLahde ?? r.tekija ?? null;
    return {
      osoite: r.url,
      lyhyt: r.lyhyt ?? null,
      laji: raaka.laji ?? (ihme || raaka.havainnekuva === true || HAVAINNE.test(String(lahde ?? '')) ? 'havainnekuva' : null),
      lahde,
      lisenssi: r.lisenssi ?? raaka.lisenssi ?? lisenssiLahteesta(lahde),
      mista,
      ...lisakentat(raaka, raaka !== r),
    };
  }

  // Jaksokuvat jaksojen järjestyksessä (kuva, lisakuva), sitten jaksoihin sitomattomat.
  const jaksokuvat = (n, mista) => {
    const kuvat = n?.jaksokuvat && typeof n.jaksokuvat === 'object' ? n.jaksokuvat : {};
    const avaimet = [...(n?.jaksot ?? []).flatMap((x) => [x?.kuva, x?.lisakuva?.kuva]), ...Object.keys(kuvat)];
    return [...new Set(avaimet.filter((a) => typeof a === 'string' && kuvat[a]))].map((a) => raakana(kuvat[a], mista));
  };
  const kohteenKuvat = (k, mista) => {
    if (!k) return [];
    const ihme = k.ihme?.osoite ?? null;
    const lista = kohteenKuvalista(k).map((o) => raakana(o, mista, { ihme: ihme !== null && o?.osoite === ihme && !o.tiedosto }));
    return [...jaksokuvat(k, mista), ...lista, raakana(kohteenNykykuva(k), mista)];
  };
  const takyKuvat = (n, mista) => (n ? [n.kuva, ...(Array.isArray(n.kuvat) ? n.kuvat : []), ...(n.galleria ?? []), n.valokuva]
    .map((o) => raakana(o, mista)) : []);

  // Hakemistot tunnuksittain.
  const kohteet = new Map();
  for (const lista of Object.values(KOHDE_MAAT)) for (const k of lista ?? []) if (k?.id && !kohteet.has(k.id)) kohteet.set(k.id, k);
  for (const k of [...MAASTOKOHTEET_ATA, ...MAASTOKOHTEET_ARK]) if (k?.id && !kohteet.has(k.id)) kohteet.set(k.id, k);
  const skandaalit = new Map(Object.values(SKANDAALIT).flat().map((s) => [`skandaali-${s.id}`, s]));
  const hetket = new Map(HISTORIAN_HETKET.map((h) => [`hetki-${h.id}`, h]));
  const syvennykset = new Map();
  const takyt = new Map();
  for (const n of Object.values(NOSTO_MAAT).flat()) if (n?.id && !takyt.has(`nosto-${n.id}`)) takyt.set(`nosto-${n.id}`, n);
  for (const [kaupunki, v] of Object.entries(FOKUSVIRRAT)) {
    for (const t of v?.takyt ?? []) syvennykset.set(`syvennys-${kaupunki}-${t.id}`, t);
    for (const n of v?.takynostot ?? []) if (n?.id && !takyt.has(`nosto-${n.id}`)) takyt.set(`nosto-${n.id}`, n);
  }
  const elaimet = new Map((kokoelmat.elaintayt?.alkiot ?? []).map((a) => [`elaintaky-${a.id}`, a]));
  const elainKuvat = (a, mista) => (a ? (a.kuvat?.length ? a.kuvat
    : [a.kuva && { ...a.kuva, lahde: a.data?.kuvaLahde ?? null, lyhyt: a.data?.kuvateksti || null }])
    .map((r) => ratkaistuna(r, mista)) : []);

  // Kohdekartan kohteet ja nähtävyysjutut, jotka linkittävät tunnuksen.
  const jutut = new Map((kokoelmat.nahtavyydet?.alkiot ?? []).map((a) => [`${a.kaupunki}:${a.nimi}`, a]));
  const karttaKohteet = new Map();
  for (const kartta of kokoelmat.kohdekartat?.alkiot ?? []) {
    for (const k of kartta.kohteet ?? []) {
      for (const t of tunnukset(k.nosto)) {
        if (!karttaKohteet.has(t)) karttaKohteet.set(t, []);
        karttaKohteet.get(t).push({ kaupunki: kartta.kaupunki ?? kartta.id, kohde: k });
      }
    }
  }
  const juttuLinkit = new Map();
  for (const a of kokoelmat.nahtavyydet?.alkiot ?? []) {
    for (const t of tunnukset(a.nosto)) {
      if (!juttuLinkit.has(t)) juttuLinkit.set(t, []);
      juttuLinkit.get(t).push(a);
    }
  }
  const juttuKuvat = (a, mista) => {
    const ihme = matkakirjanIhme(a.nimi);
    return [ihme ? raakana(ihme, mista, { ihme: true }) : null, ...(a.data?.kuvat ?? []).map((o) => raakana(o, mista))];
  };

  /** Noston omat kuvat tunnuksella (kaupunki = syvennyksen ja kaupungin täkypoolin haku). */
  function omat(tunnus, kaupunki = null, mista = 'nosto') {
    if (skandaalit.has(tunnus)) return skandaalinKuvat(skandaalit.get(tunnus)).map((o) => raakana(o, mista));
    if (hetket.has(tunnus)) {
      const h = hetket.get(tunnus);
      return [...jaksokuvat(h, mista), ...(h.kuvat ?? []).map((o) => raakana(o, mista))];
    }
    if (syvennykset.has(tunnus)) {
      const t = syvennykset.get(tunnus);
      return [t.kuva, ...(Array.isArray(t.kuvat) ? t.kuvat : []), t.valokuva].map((o) => raakana(o, mista));
    }
    if (takyt.has(tunnus)) return takyKuvat(takyt.get(tunnus), mista);
    if (elaimet.has(tunnus)) return elainKuvat(elaimet.get(tunnus), mista);
    const k = kohteet.get(tunnus) ?? haeKohde?.(tunnus, kaupunki) ?? null;
    return kohteenKuvat(k, mista);
  }
  /** Paikan kuvat: täkynoston kohde ja kohdekartan kohteet, jotka linkittävät tunnuksen. */
  function kohde(tunnus) {
    const n = takyt.get(tunnus);
    return [
      ...(n?.kohde ? kohteenKuvat(kohteet.get(n.kohde), 'kohde') : []),
      ...(karttaKohteet.get(tunnus) ?? []).flatMap(({ kohde: k }) => (k.kuvat ?? []).map((r) => ratkaistuna(r, 'kohde'))),
    ];
  }
  /** Nähtävyysjutut, reitti (a): jutut, joiden nosto-kenttä on tämä tunnus. */
  function juttu(tunnus) {
    return [...new Set(juttuLinkit.get(tunnus) ?? [])].flatMap((a) => juttuKuvat(a, 'juttu'));
  }
  /**
   * Reitti (b): linkittävien kohdekartan kohteiden samannimiset jutut (kaupunki + nimi). TOINEN TARINA (KK:N PÄÄTÖS 20.11.2026 klo 15.08,
   * aiempi: P-261120-5, P-261120-10, P-261117-119; kortti noston-kuvat 7 ja 9): sen kuvat vain nostolle, jolla ei ole yhtään omaa kuvaa
   * lähteistä nosto, kohde ja reitti (a); muuten Notre-Damen palotarina sai myös saman paikan yleisen jutun kuvat.
   */
  function juttuKohteesta(tunnus) {
    const omatJutut = new Set(juttuLinkit.get(tunnus) ?? []);
    const lista = (karttaKohteet.get(tunnus) ?? []).map(({ kaupunki, kohde: k }) => jutut.get(`${kaupunki}:${k.nimi}`))
      .filter((a) => a && !omatJutut.has(a));
    return [...new Set(lista)].flatMap((a) => juttuKuvat(a, 'juttu'));
  }
  /** Nosto → kohde → juttu (a); reitti (b) vain, kun edellisistä ei tullut yhtään kuvaa. */
  const koottu = (tunnus, ...listat) => {
    const omin = valmis(...listat);
    return omin.length ? omin : valmis(...listat, juttuKohteesta(tunnus));
  };

  const valmis = (...listat) => {
    const nahty = new Set();
    return listat.flat().filter((k) => {
      if (!k?.osoite || nahty.has(k.osoite)) return false;
      nahty.add(k.osoite);
      return true;
    });
  };
  const muisti = new Map();
  const karttaNimella = new Map();
  for (const kartta of kokoelmat.kohdekartat?.alkiot ?? []) {
    for (const k of kartta.kohteet ?? []) {
      const avain = `${kartta.kaupunki ?? kartta.id}:${k.nimi}`;
      if (!karttaNimella.has(avain)) karttaNimella.set(avain, []);
      karttaNimella.get(avain).push(k);
    }
  }
  return {
    /** Kartta- tai kortinoston kuvat tunnuksella. */
    tunnukselle(tunnus, kaupunki = null) {
      const avain = `${tunnus}|${kaupunki ?? ''}`;
      if (!muisti.has(avain)) muisti.set(avain, koottu(tunnus, omat(tunnus, kaupunki), kohde(tunnus), juttu(tunnus)));
      return muisti.get(avain);
    },
    /** Sisäkkäinen kohde tai nosto, jota ei ehkä ole hakemistossa (fokusvirran kohteet ja takynostot): oma olio. */
    oliolle(olio, tunnus, kuvat) {
      return koottu(tunnus, kuvat(olio), kohde(tunnus), juttu(tunnus));
    },
    kohteenKuvat, takyKuvat,
    /** Nähtävyysjutun kuvat: oma ihme ja kuvat, sitten kohdekartan sama kohde ja jutun nosto-linkkien nostot. */
    jutulle(a) {
      const sama = karttaNimella.get(`${a.kaupunki}:${a.nimi}`) ?? [];
      return valmis(juttuKuvat(a, 'nosto'),
        sama.flatMap((k) => (k.kuvat ?? []).map((r) => ratkaistuna(r, 'kohde'))),
        tunnukset(a.nosto).flatMap((t) => [...omat(t, a.kaupunki, 'kohde'), ...kohde(t)]));
    },
  };
}

/** Lisää nostokuvat kaikkiin nostokokoelmiin (kutsutaan, kun takynostot ja kohdekartat ovat valmiit). */
export function rikastaNostokuvat(kokoelmat, { R, hae, haeKohde }) {
  const N = nostokuvaRakentaja({ R, hae, haeKohde, kokoelmat });
  for (const v of kokoelmat.karttavalot.alkiot) v.nostokuvat = N.tunnukselle(v.tunnus, v.kaupunkiAvain ?? v.kohdekartta ?? v.kaupunki);
  for (const a of kokoelmat.takynostot.alkiot) a.nostokuvat = N.tunnukselle(`nosto-${a.id}`, a.kaupungit?.[0] ?? null);
  for (const a of kokoelmat.skandaalit.alkiot) a.nostokuvat = N.tunnukselle(`skandaali-${a.id}`);
  for (const a of kokoelmat.historianHetket.alkiot) a.nostokuvat = N.tunnukselle(`hetki-${a.id}`);
  for (const a of kokoelmat.monumentit.alkiot) a.nostokuvat = N.tunnukselle(a.id);
  for (const a of kokoelmat.elaintayt.alkiot) a.nostokuvat = N.tunnukselle(`elaintaky-${a.id}`);
  for (const a of kokoelmat.nahtavyydet.alkiot) a.nostokuvat = N.jutulle(a);
  // Fokusvirtojen sisäkkäiset nostot: kopio, jotta raaka data (alkio.data) pysyy koskemattomana.
  for (const a of kokoelmat.fokusvirrat.alkiot) {
    const k = a.kaupunki;
    if (Array.isArray(a.takyt)) a.takyt = a.takyt.map((t) => ({ ...t, nostokuvat: N.tunnukselle(`syvennys-${k}-${t.id}`, k) }));
    if (Array.isArray(a.takynostot)) {
      a.takynostot = a.takynostot.map((n) => ({ ...n, nostokuvat: N.oliolle(n, `nosto-${n.id}`, (o) => N.takyKuvat(o, 'nosto')) }));
    }
    if (Array.isArray(a.kohteet)) a.kohteet = a.kohteet.map((o) => ({ ...o, nostokuvat: N.oliolle(o, o.id, (x) => N.kohteenKuvat(x, 'nosto')) }));
  }
  for (const nimi of NOSTOKUVA_KOKOELMAT) kokoelmat[nimi].kuvaus += ` ${NOSTOKUVA_KUVAUS}`;
  kokoelmat.fokusvirrat.kuvaus += ' Skeema 1.75: takyt[], takynostot[] ja kohteet[] kantavat nostokuvat (kuten karttavalot.nostokuvat; '
    + 'tools/vienti/nostokuvat.mjs).';
}
