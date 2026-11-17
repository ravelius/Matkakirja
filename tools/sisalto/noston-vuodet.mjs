/*
 * NOSTON VUODET (Pelikoodari 17.11.2026; suunnitelma 20261117-noston-vuosiluvut luvut 1 ja 6.3, omistaja P-261117-70–72).
 *
 * Yhteinen pohja testille (tests/noston-vuodet.test.mjs) ja SK:n ehdokastyökalulle (tools/sisalto/vuosiehdokkaat.mjs):
 *  - kaikkiNostot(): nostot, joilla voi olla kenttä `vuodet` (luettava teksti + nykyiset rivit + mistä ne kirjoitetaan):
 *    kaupunkikarttojen nähtävyysjutut ja kadonneet ihmeet, historian hetket, skandaalit ja täkynostot.
 *  - vuosiEhdokkaat(teksti): koneen ehdotukset (vuosi + virke + yksikäsitteinen kohta). SK kirjoittaa selitteen käsin (B 7).
 *  - vuosiVirheet(teksti, vuodet): säännöt (kohta tasan kerran, vuosi kohdassa, ≤ 5 riviä, selite 1–20 merkkiä, tekstin järjestys).
 */
import { KAUPUNKIKARTAT } from '../../js/packs/maakartat.js';
import { NAHTAVYYSJUTUT } from '../../js/packs/nahtavyysjutut.js';
import { EUROOPAN_KADONNEET } from '../../js/packs/monumentit-eurooppa.js';
import { HISTORIAN_HETKET } from '../../js/packs/historian-hetket.js';
import { SKANDAALIT } from '../../js/packs/skandaalit.js';
import { NOSTO_MAAT } from '../../js/fokusnosto.js';

/** Kaupungit, joiden nostot ovat ensimmäisessä erässä (suunnitelma luku 6.3: Pariisi, sitten Lontoo, Amsterdam, Wien, Rooma). */
export const VUOSIKAUPUNGIT = ['pariisi', 'lontoo', 'amsterdam', 'wien', 'rooma'];
export const RIVEJA_ENINTAAN = 12; // järkevyysraja, ei sisällöllinen katto (omistaja 17.11. 23.15, P-261117-116: ruudulla vierii, max 4 näkyvissä)
export const SELITE_ENINTAAN = 20;

const alkiot = (x) => (Array.isArray(x) ? x : Object.values(x ?? {}));

/** [{ avain, laji, kaupunki, nimi, teksti, vuodet, tiedosto }] — avain on pysyvä tunnus luettelolle (fixture). */
export function kaikkiNostot() {
  const ulos = [];
  const kadonneet = new Map();
  for (const lista of alkiot(EUROOPAN_KADONNEET)) for (const e of alkiot(lista)) if (e?.id) kadonneet.set(e.id, e);
  const nahty = new Set();
  for (const k of VUOSIKAUPUNGIT) {
    const kartta = KAUPUNKIKARTAT[k];
    const jutut = NAHTAVYYSJUTUT[k] ?? {};
    for (const p of kartta?.kohteet ?? []) {
      const nostoId = Array.isArray(p.nosto) ? p.nosto[0] : p.nosto ?? null;
      if (nostoId?.startsWith('hahmotelma-')) {
        const h = kadonneet.get(nostoId);
        if (h && !nahty.has(nostoId)) {
          nahty.add(nostoId);
          ulos.push({ avain: `kadonnut:${nostoId}`, laji: 'kadonnut', kaupunki: k, nimi: p.nimi, teksti: h.teksti ?? '', vuodet: h.vuodet,
            tiedosto: 'js/packs/monumentit-eurooppa.js' });
        }
        continue;
      }
      const ju = jutut[p.nimi];
      if (ju?.teksti) ulos.push({ avain: `nahtavyys:${k}:${p.nimi}`, laji: 'nahtavyys', kaupunki: k, nimi: p.nimi, teksti: ju.teksti, vuodet: ju.vuodet,
        tiedosto: 'js/packs/nahtavyysjutut.js' });
    }
    // Jutut ilman omaa pistettä (lisäkortit).
    const pisteet = new Set((kartta?.kohteet ?? []).map((p) => p.nimi));
    for (const [nimi, ju] of Object.entries(jutut)) {
      if (pisteet.has(nimi) || !ju?.teksti) continue;
      ulos.push({ avain: `nahtavyys:${k}:${nimi}`, laji: 'nahtavyys', kaupunki: k, nimi, teksti: ju.teksti, vuodet: ju.vuodet,
        tiedosto: 'js/packs/nahtavyysjutut.js' });
    }
  }
  for (const h of alkiot(HISTORIAN_HETKET)) if (h?.id && h.teksti) {
    ulos.push({ avain: `hetki:${h.id}`, laji: 'hetki', kaupunki: null, nimi: h.otsikko ?? h.id, teksti: h.teksti, vuodet: h.vuodet,
      tiedosto: 'js/packs/historian-hetket.js' });
  }
  for (const lista of alkiot(SKANDAALIT)) for (const s of alkiot(lista)) if (s?.id && s.teksti) {
    ulos.push({ avain: `skandaali:${s.id}`, laji: 'skandaali', kaupunki: null, nimi: s.otsikko ?? s.id, teksti: s.teksti, vuodet: s.vuodet,
      tiedosto: 'js/packs/skandaalit.js' });
  }
  for (const lista of alkiot(NOSTO_MAAT)) for (const n of alkiot(lista)) if (n?.id && n.teksti) {
    ulos.push({ avain: `takynosto:${n.id}`, laji: 'takynosto', kaupunki: null, nimi: n.otsikko ?? n.id, teksti: n.teksti, vuodet: n.vuodet,
      tiedosto: 'js/fokusnosto.js' });
  }
  // Sama täkynosto voi olla usean maan listalla: yksi rivi per avain.
  const nahdyt = new Set();
  return ulos.filter((n) => (nahdyt.has(n.avain) ? false : nahdyt.add(n.avain)));
}

// Vuosi: 3–4 numeroa (ei osa isompaa lukua), valinnainen väli (–1878 tai –78) ja eaa./jaa. Ei vuosisatoja eikä vuosikymmeniä (-luku).
// Tuhaterotin ("1 200", "12 000") ja desimaalit eivät ole vuosia.
const VUOSI = /(?<![\d.,])(?<!\d[  ])(\d{3,4})(?:\s?[–-]\s?(\d{2,4}))?(?![\d]|[.,]\d|[  ]\d{3}(?!\d))(\s?(?:eaa\.?|jaa\.?|eKr\.?|jKr\.?))?/g;
const LUKU = /^-?\s?luvu|^-?\s?luku|^\s?[–-]luv/i;
const YKSIKKO = /^\s*(?:metri|m\b|m²|km|tonni|kg|kilo|henke|henkil|ihmis|asukas|frangi|punta|guldeni|floriin|liira|kruunu|prosent|%|askel|porras|portaa|sivu|huonet|ikkuna|paikka|istuin|katsoja|sotila|miest|naist|last|kappale|teosta|maalaus|kirja|jalka|°|astet|kertaa|vuotta|vuotias|päivä|tunti)/i;

/** Virkkeet: piste, huutomerkki tai kysymysmerkki + väli + iso kirjain (riittää ehdotuksiin; SK tarkistaa). */
function virkkeet(teksti) {
  const ulos = []; let alku = 0;
  const re = /[.!?](?=\s+[A-ZÅÄÖ«"“])/g; let m;
  while ((m = re.exec(teksti))) { ulos.push([alku, m.index + 1]); alku = m.index + 1; }
  ulos.push([alku, teksti.length]);
  return ulos.map(([a, b]) => ({ a, b, t: teksti.slice(a, b).trim() }));
}

/** Lyhin pätkä (vuosi ja sanoja vasemmalle, sitten oikealle), joka esiintyy tekstissä tasan kerran. */
function yksiKohta(teksti, alku, loppu) {
  const vasen = teksti.slice(0, alku), oikea = teksti.slice(loppu);
  const vSanat = vasen.split(/(?<=\s)/), oSanat = oikea.split(/(?=\s)/);
  for (let i = 1; i <= 6; i++) {
    for (let j = 0; j <= 3; j++) {
      const kohta = (vSanat.slice(-i).join('') + teksti.slice(alku, loppu) + oSanat.slice(0, j).join('')).trim();
      if (kohta && teksti.split(kohta).length - 1 === 1) return kohta;
    }
  }
  return null;
}

/** Koneen ehdotukset: [{ vuosi, kohta, virke }] tekstin järjestyksessä (ei selitettä: SK kirjoittaa). */
export function vuosiEhdokkaat(teksti) {
  const t = String(teksti ?? '');
  const ulos = [];
  const vv = virkkeet(t);
  for (const m of t.matchAll(VUOSI)) {
    const [koko, a, b, era] = m;
    const n = Number(a);
    const jalkeen = t.slice(m.index + koko.length);
    if (LUKU.test(jalkeen)) continue;
    if (!era && (n < 1000 || n > 2099)) continue;
    if (!era && !b && YKSIKKO.test(jalkeen)) continue;
    const vuosi = (b ? `${a}–${b}` : a) + (era ? ` ${era.trim()}` : '');
    const virke = vv.find((v) => m.index >= v.a && m.index < v.b)?.t ?? '';
    ulos.push({ vuosi, kohta: yksiKohta(t, m.index, m.index + koko.length), virke });
  }
  return ulos;
}

/** Säännöt (suunnitelma luku 1). Palauttaa virheet merkkijonoina; [] = kunnossa. Ei kenttää = ei virheitä. */
export function vuosiVirheet(teksti, vuodet) {
  if (vuodet === undefined || vuodet === null) return [];
  const t = String(teksti ?? '');
  const v = [];
  if (!Array.isArray(vuodet) || vuodet.length === 0) return ['vuodet ei ole lista tai on tyhjä (ei vuosia = ei kenttää)'];
  if (vuodet.length > RIVEJA_ENINTAAN) v.push(`rivejä ${vuodet.length} > ${RIVEJA_ENINTAAN}`);
  let ed = -1;
  vuodet.forEach((r, i) => {
    const kohta = String(r?.kohta ?? ''), vuosi = String(r?.vuosi ?? ''), selite = String(r?.selite ?? '');
    const n = kohta ? t.split(kohta).length - 1 : 0;
    if (n !== 1) v.push(`rivi ${i + 1}: kohta "${kohta}" esiintyy tekstissä ${n} kertaa (pitää olla tasan kerran)`);
    const numerot = vuosi.match(/\d+/g) ?? [];
    if (numerot.length === 0) v.push(`rivi ${i + 1}: vuodessa "${vuosi}" ei ole numeroa`);
    for (const d of numerot) if (!kohta.includes(d)) v.push(`rivi ${i + 1}: vuosi ${d} ei ole kohdassa "${kohta}"`);
    if (!selite.trim()) v.push(`rivi ${i + 1}: selite puuttuu`);
    if (selite.length > SELITE_ENINTAAN) v.push(`rivi ${i + 1}: selite "${selite}" ${selite.length} merkkiä > ${SELITE_ENINTAAN}`);
    if (selite.trim().split(/\s+/).length > 3) v.push(`rivi ${i + 1}: selite "${selite}" yli 3 sanaa`);
    if (n === 1) {
      const kohtaAlku = t.indexOf(kohta);
      if (kohtaAlku < ed) v.push(`rivi ${i + 1}: ei tekstin järjestyksessä`);
      ed = kohtaAlku;
    }
  });
  return v;
}
