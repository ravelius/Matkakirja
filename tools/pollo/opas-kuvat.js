/*
 * ELÄVÄN OPPAAN KUVALISTA (omistaja 6.10.2026 20.0x, Päätoimittaja): opas näyttää VAIN valmiiksi speksattuja kuvia
 * listasta media.matkakirja.app/opas/kuvat-vN/kuvat.json (KUVALISTA_URL; erä kerrallaan uusi polku) (tools/pollo/tee-opas-kuvat.mjs + Sisältökirjurin kohdelistat).
 * Avain on Wikidatan Q (aliakset erikseen). Kuvia ei haeta lennossa Wikidatasta eikä Commonsista; jos kohdetta ei ole
 * listalla, kuvat on tyhjä.
 *
 * Muoto: { skeema: 1, versio, kohteet: { Q: { nimi, kaupunki, kaupunkiQ, lat, lon, koko_m?, kuvat: [1–5] } },
 *          kaupungit: { <id>: { nimi, Q, lat, lon, kohteet: [Q… merkittävyysjärjestyksessä, 6–20], kuvat: [...] } },
 *          aliakset: { Q: Q } }
 * Kuva: { url (vain peili), tyyppi, tekija, lisenssi, lisenssiUrl, lahdeUrl, selite, leveys, korkeus, jarjestys, tarkistettu }.
 */

// Ämpärin objektit ovat muuttumattomia (vie-paketti.sh ei ylikirjoita, Cache-Control immutable 1 v): jokainen kuvaerä
// saa oman polun (kuvat-v2, kuvat-v3 …). Polku vaihdetaan wranglerin muuttujalla OPAS_KUVALISTA_URL ilman koodimuutosta.
export const KUVALISTA_URL = 'https://media.matkakirja.app/opas/kuvat-v2/kuvat.json';
const KUVALISTA_TUORE_MS = 10 * 60 * 1000;
const UUSINTA_VIRHEESTA_MS = 60 * 1000;
export const KUVIA_ENINTAAN = 5;
const TYHJA = Object.freeze({ kohteet: {}, kaupungit: {}, aliakset: {} });

let muisti = { lista: null, haettu: 0, kaynnissa: null };
export const tyhjennaKuvalista = () => { muisti = { lista: null, haettu: 0, kaynnissa: null }; };

/**
 * Kuvalista isolaatin muistista (tuore 10 min). Virheessä edellinen lista tai tyhjä; uusi yritys aikaisintaan minuutin
 * päästä. env.OPAS_KUVALISTA_TESTI ohittaa (testit).
 */
export async function kuvalista(env, haku = fetch, nyt = Date.now()) {
  if (env?.OPAS_KUVALISTA_TESTI) return env.OPAS_KUVALISTA_TESTI;
  if (muisti.lista && nyt - muisti.haettu < KUVALISTA_TUORE_MS) return muisti.lista;
  if (muisti.kaynnissa) return muisti.kaynnissa;
  muisti.kaynnissa = (async () => {
    try {
      const v = await haku(env?.OPAS_KUVALISTA_URL || KUVALISTA_URL, { headers: { accept: 'application/json' } });
      if (!v.ok) throw new Error(`kuvalista ${v.status}`);
      const d = await v.json();
      muisti.lista = { kohteet: d?.kohteet ?? {}, kaupungit: d?.kaupungit ?? {}, aliakset: d?.aliakset ?? {}, versio: d?.versio ?? null };
      muisti.haettu = nyt;
    } catch (virhe) {
      console.log(`opas: kuvalista ei latautunut (${virhe?.message ?? 'verkko'})`);
      muisti.haettu = nyt - KUVALISTA_TUORE_MS + UUSINTA_VIRHEESTA_MS;
      muisti.lista ??= TYHJA;
    }
    return muisti.lista;
  })();
  try { return await muisti.kaynnissa; } finally { muisti.kaynnissa = null; }
}

/** Listan kuva workerin vastausmuotoon (lahde = lahdeUrl vanhoille natiiveille). */
const vastauksenKuva = (k) => ({
  url: k.url, tyyppi: k.tyyppi ?? 'valokuva', tekija: k.tekija ?? null, lisenssi: k.lisenssi ?? null, lisenssiUrl: k.lisenssiUrl ?? null,
  lahde: k.lahdeUrl ?? null, selite: k.selite ?? null, leveys: k.leveys ?? null, korkeus: k.korkeus ?? null,
});
const jarjestyksessa = (kuvat) => [...(kuvat ?? [])].filter((k) => k?.url)
  .sort((a, b) => (a.jarjestys ?? 99) - (b.jarjestys ?? 99)).slice(0, KUVIA_ENINTAAN).map(vastauksenKuva);

export function listanKohde(lista, q) {
  if (!lista || !/^Q\d+$/.test(q ?? '')) return null;
  return lista.kohteet?.[q] ?? lista.kohteet?.[lista.aliakset?.[q]] ?? null;
}

/** Kohteen kuvat (1–5) Q:lla; ei osumaa → []. */
export const kohteenKuvat = (lista, q) => jarjestyksessa(listanKohde(lista, q)?.kuvat);

const normaali = (t) => String(t ?? '').normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

/** Kaupunki tunnuksella, nimellä tai Q:lla. */
export function listanKaupunki(lista, kaupunki) {
  if (!lista || !kaupunki) return null;
  const n = normaali(kaupunki);
  if (lista.kaupungit?.[n]) return { id: n, ...lista.kaupungit[n] };
  for (const [id, k] of Object.entries(lista.kaupungit ?? {})) {
    if (normaali(k.nimi) === n || k.Q === kaupunki) return { id, ...k };
  }
  return null;
}

export const kaupunginKuvat = (lista, kaupunki) => jarjestyksessa(listanKaupunki(lista, kaupunki)?.kuvat);

/** Kaupungin lukittu kohdelista merkittävyysjärjestyksessä: [{ id, nimi, lat, lon, koko_m, kuvat }]. */
export function kaupunginKohteet(lista, kaupunki) {
  const k = listanKaupunki(lista, kaupunki);
  return (k?.kohteet ?? []).map((q) => {
    const kohde = listanKohde(lista, q);
    return kohde && Number.isFinite(kohde.lat) && Number.isFinite(kohde.lon)
      ? { id: q, nimi: kohde.nimi, lat: kohde.lat, lon: kohde.lon, koko_m: kohde.koko_m ?? 150, kuvat: jarjestyksessa(kohde.kuvat) } : null;
  }).filter(Boolean);
}

/**
 * KÄYTTÖÖNOTTO KAUPUNKI KERRALLAAN (Päätoimittaja 6.10. 20.3x): kaupunki on "lukittu", kun sen kohdelistassa on vähintään
 * LUKITTU_VAHINTAAN kohdetta. Lukittu kaupunki käyttää vain listan kohteita ja kuvia; muut toimivat entiseen tapaan
 * (lennossa haetut kuvat), kunnes niiden lista yhdistetään. Yksikään kaupunki ei huonone.
 */
export const LUKITTU_VAHINTAAN = 6;
export const onLukittu = (lista, kaupunki) => (listanKaupunki(lista, kaupunki)?.kohteet?.length ?? 0) >= LUKITTU_VAHINTAAN;

/**
 * Kohteen kuva kaupunkitilan mukaan: lukitun kaupungin kohde (pyynnön kaupunki, listan kohteen kaupunki tai kohteen oma)
 * → listan 1. kuva tai null; muuten entinen kuva sellaisenaan (lukitsemattomat kaupungit eivät muutu).
 */
export function kuvaKaupunkitilassa(lista, id, vanha, kaupunki = null) {
  const lukittu = [kaupunki, listanKohde(lista, id)?.kaupunki].some((x) => x && onLukittu(lista, x));
  return lukittu ? kohteenKuvat(lista, id)[0] ?? null : vanha ?? null;
}

/** Vastauksen kohteiden kuva (myös R2:ssa olevat vanhat listat) kaupunkitilan mukaan. */
export const listanKuvin = (tulos, lista, kaupunki = null) => (Array.isArray(tulos?.kohteet)
  ? { ...tulos, kohteet: tulos.kohteet.map((k) => (k ? { ...k, kuva: kuvaKaupunkitilassa(lista, k.id, k.kuva, kaupunki ?? k.kaupunki) } : k)) }
  : tulos);
