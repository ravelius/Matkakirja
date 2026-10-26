/*
 * Julkisen projektisivun tekstisuodatin.
 *
 * Projektisivu (projekti.html) on julkinen linkillä, ja sitä lukevat
 * apurahan arvioijat ja yhteistyökumppanit. Linssi- ja pelikatalogin
 * data on kuitenkin kehitystyön työlista, jonka kentissä on paikoin
 * sisäisiä merkintöjä (työroolien nimiä, haaroja, päivättyjä päätöksiä).
 *
 * Siksi sivu EI piirrä dataa suoraan, vaan kulkee tämän moduulin kautta:
 *   1. vain sallitut kentät otetaan mukaan (esim. linssin huom-kenttä
 *      ja moottorin toteutusmuistiinpanot jäävät pois kokonaan),
 *   2. sisäiset sulkuhuomautukset poistetaan tekstistä,
 *   3. jos teksti sisältää yhä kielletyn sanan, kenttä tyhjennetään —
 *      piirto jättää tyhjän kentän näyttämättä.
 *
 * tests/projekti.test.mjs ajaa saman suodattimen Nodessa ja varmistaa,
 * ettei julkiseen dataan, sivuun eikä sen moduuleihin jää yhtään
 * KIELLETYT-listan osumaa. Moduulissa ei ole DOM-riippuvuuksia.
 */

// Sisäiset sanat ja tunnisteet, joita julkisella sivulla ei saa näkyä.
export const KIELLETYT = [
  /\bFable\w*/i,
  /Pelikoodari\w*/i,
  /Julkaisija\w*/i,
  /Natiivisep\w*/i,
  /Karttasep\w*/i,
  /Linssisep\w*/i,
  /Siirtosep\w*/i,
  /Mallinsep\w*/i,
  /Sisältökirjuri\w*/i,
  /Laitetestaaja\w*/i,
  /Postivahti\w*/i,
  /Natiivi-UI/i,
  /päätoimittaj\w*/i,
  /\bOpus\b/i,
  /\bSonnet\b/i,
  /\bClaude\b/i,
  /\bAnthropic\b/i,
  /\bChatGPT\b/i,
  /\bGPT\b/i,
  /\bCodex\b/i,
  /\bOpenAI\b/i,
  /\bxAI\b/,
  /\bGrok\b/i,
  /workers\.dev/i,
  /\blocal_[0-9a-f]{6,}/i,
  /\bPR\s*#?\d+/,
  /(?<![\w&])#\d{4,5}\b/, // PR- ja tikettinumerot (#3399); ei CSS-värejä (#111)
  /\bsk-[A-Za-z0-9_-]{10,}/,
  /\bapi[_ -]?key\b/i,
  /\bworktree\w*/i,
  /\bsessio\w*/i,
  /\bhaara(ssa|an|sta|n)\b/i,
];

// Julkisia nimiä, jotka osuvat sanalistaan sattumalta (taiteilija ja
// käsikirjoitus linssien Commons-kuvateksteissä). Poistetaan ennen tarkistusta.
export const SALLITUT = ['Claude Lorrain', 'Codex Mendoza'];

/** Palauttaa ensimmäisen kielletyn osuman tai null. */
export function sisainenOsuma(teksti) {
  let t = String(teksti ?? '');
  for (const s of SALLITUT) t = t.split(s).join('');
  for (const re of KIELLETYT) {
    const m = t.match(re);
    if (m) return m[0];
  }
  return null;
}

// Sulkuhuomautus, joka kertoo päätöksen tekijän, haaran tai työvaiheen:
// "(omistajan päätös, ennallaan 24.9.2026)", "(Fable 24.9.2026)" …
const SISAINEN_SULKU = /\s*\([^()]*(omistaj|Fable|haara|\bPR\b|#\d|ämpär|vahvistettav|\.md\b)[^()]*\)/gi;

/** Siivoaa tekstin julkiseksi; palauttaa '' jos sisäistä jää jäljelle. */
export function puhdista(teksti) {
  if (teksti == null) return teksti;
  const t = String(teksti)
    .replace(/\[([^\]]+)\]\([^)\s]+\)/g, '$1') // md-linkit tekstiksi (osoitteet ovat repon sisäisiä)
    .replace(/ks\. Uudet omistajan kortit alla/g, 'ks. Pelisuunnitelmat')
    .replace(SISAINEN_SULKU, '').replace(/\s+([.,;:])/g, '$1').trim();
  return sisainenOsuma(t) ? '' : t;
}

// Syvä kopio, jossa jokainen merkkijono on puhdistettu.
function puhdistaSyvasti(arvo) {
  if (typeof arvo === 'string') return puhdista(arvo);
  if (Array.isArray(arvo)) return arvo.map(puhdistaSyvasti).filter((x) => x !== '');
  if (arvo && typeof arvo === 'object') {
    const ulos = {};
    for (const [k, v] of Object.entries(arvo)) ulos[k] = puhdistaSyvasti(v);
    return ulos;
  }
  return arvo;
}

const LINSSIN_KENTAT = ['id', 'nimi', 'moottori', 'manner', 'alue', 'kaari', 'alkuvuosi',
  'loppuvuosi', 'pysakit', 'sidos1873', 'mitaOpitaan', 'pelikytkos', 'aineisto', 'tila',
  'jarjestys', 'pelissa', 'kuvat'];

/**
 * Linssikatalogi julkiseksi: moottoreista nimi, kuvaus, pilotti ja
 * rakennettu-tieto totuusarvona; linsseistä vain LINSSIN_KENTAT.
 */
export function julkisetLinssit(data) {
  const moottorit = data.moottorit.map((m) => ({
    avain: m.avain,
    nimi: puhdista(m.nimi),
    kuvaus: puhdista(m.kuvaus),
    pilotti: puhdista(m.pilotti),
    rakennettu: !/^ei\b/i.test(String(m.rakennettu || '').trim()),
  }));
  const linssit = data.linssit.map((l) => {
    const ulos = {};
    for (const k of LINSSIN_KENTAT) if (k in l) ulos[k] = l[k];
    return puhdistaSyvasti(ulos);
  });
  return { paivitetty: data.paivitetty, moottorit, linssit };
}

/** Linssien kuvatekstit (Commons-lähteet) samalla suodattimella. */
export function julkisetKuvatekstit(kuvatekstit) {
  return puhdistaSyvasti(kuvatekstit);
}

// Pelisuunnitelmakorttien kenttien julkiset otsikot.
const KENTTANIMET = { 'Avoimet kysymykset omistajalle': 'Avoimet kysymykset' };

/** Pelikatalogi julkiseksi: kaikki merkkijonot puhdistettuina. */
export function julkisetPelit(data) {
  const ulos = puhdistaSyvasti(data);
  for (const k of ulos.kortit || []) {
    k.kentat = k.kentat
      .map((x) => ({ ...x, nimi: KENTTANIMET[x.nimi] || x.nimi }))
      .filter((x) => x.teksti);
  }
  return ulos;
}
