/*
 * HÄVIÖTÖN JSON-SARJALLISTUS SISÄLLÖN VIENTIIN (Siirtoseppä 23.9.2026).
 *
 * Pelin sisältö asuu ES-moduulien exporteissa: pääosin puhdasta
 * literaalidataa, mutta seassa on Map- ja Set-olioita, jaettuja ja
 * kehäisiä viittauksia (lauta viittaa itseensä linkeissä) sekä
 * funktioita (kuva-URL:n rakentajat, pulmageneraattorit). Tavallinen
 * JSON.stringify pudottaisi ne hiljaa — juuri sitä vienti ei saa tehdä.
 *
 * Koodaus: kaikki JSONiin sopiva menee sellaisenaan. Loput merkitään
 * olioksi, jonka ainoa tai ensimmäinen avain alkaa $-merkillä:
 *
 *   { "$undefined": true }            undefined (myös taulukon arvo)
 *   { "$aukko": true }                harvan taulukon aukko
 *   { "$luku": "NaN" | "Infinity" | "-Infinity" | "-0" }
 *   { "$bigint": "123" }
 *   { "$map": [[avain, arvo], ...] }
 *   { "$set": [arvo, ...] }
 *   { "$pvm": "ISO-aika" }
 *   { "$regexp": "lähde", "liput": "gi" }
 *   { "$typed": "Float32Array", "base64": "..." }
 *   { "$funktio": "nimi", "lahde": "funktion lähdeteksti" }
 *   { "$viittaus": "/json/pointer" }  kehä: osoittaa esi-isään saman
 *                                     exportin sisällä
 *   { "$luokka": "Nimi", "kentat": {...} }  muu kuin tavallinen olio
 *
 * Datan omat $-alkuiset avaimet pakotetaan lisäämällä eteen toinen $
 * ("$x" → "$$x"), joten merkinnät eivät voi sekoittua dataan.
 *
 * Jaetut (ei-kehäiset) viittaukset kopioidaan: vientimuoto on puu, ja
 * moottorin tuojalle puu on helpompi kuin viittausverkko.
 *
 * Järjestys on lähdekoodin järjestys (olioiden lisäysjärjestys), joten
 * sama lähde antaa aina tavulleen saman tuloksen.
 */

const TYPED = new Set([
  'Int8Array', 'Uint8Array', 'Uint8ClampedArray', 'Int16Array', 'Uint16Array',
  'Int32Array', 'Uint32Array', 'Float32Array', 'Float64Array',
  'BigInt64Array', 'BigUint64Array',
]);

const pointerOsa = (s) => String(s).replace(/~/g, '~0').replace(/\//g, '~1');
const pakota = (k) => (k.startsWith('$') ? '$' + k : k);
const pura = (k) => (k.startsWith('$$') ? k.slice(1) : k);

function base64(view) {
  return Buffer.from(view.buffer, view.byteOffset, view.byteLength).toString('base64');
}

/**
 * Muuntaa arvon JSON-kelpoiseksi puuksi. `kaynti(arvo, polku)` kutsutaan
 * jokaiselle merkkijonolle (mediaviittausten keruu).
 */
export function sarjallista(arvo, { kaynti } = {}) {
  const pino = new Map(); // esi-isä -> JSON pointer

  function s(v, polku) {
    if (v === null) return null;
    switch (typeof v) {
      case 'string':
        if (kaynti) kaynti(v, polku);
        return v;
      case 'boolean':
        return v;
      case 'number':
        if (Number.isNaN(v)) return { $luku: 'NaN' };
        if (v === Infinity) return { $luku: 'Infinity' };
        if (v === -Infinity) return { $luku: '-Infinity' };
        if (Object.is(v, -0)) return { $luku: '-0' };
        return v;
      case 'undefined':
        return { $undefined: true };
      case 'bigint':
        return { $bigint: v.toString() };
      case 'symbol':
        return { $symboli: v.description ?? '' };
      case 'function':
        return { $funktio: v.name, lahde: String(v) };
      default:
    }
    if (pino.has(v)) return { $viittaus: pino.get(v) };
    pino.set(v, polku);
    try {
      return olio(v, polku);
    } finally {
      pino.delete(v);
    }
  }

  function olio(v, polku) {
    if (Array.isArray(v)) {
      const ulos = new Array(v.length);
      for (let i = 0; i < v.length; i++) {
        ulos[i] = i in v ? s(v[i], `${polku}/${i}`) : { $aukko: true };
      }
      return ulos;
    }
    if (v instanceof Map) {
      let i = 0;
      const parit = [];
      for (const [k, a] of v) {
        parit.push([s(k, `${polku}/$map/${i}/0`), s(a, `${polku}/$map/${i}/1`)]);
        i++;
      }
      return { $map: parit };
    }
    if (v instanceof Set) {
      let i = 0;
      const arvot = [];
      for (const a of v) arvot.push(s(a, `${polku}/$set/${i++}`));
      return { $set: arvot };
    }
    if (v instanceof Date) return { $pvm: v.toISOString() };
    if (v instanceof RegExp) return { $regexp: v.source, liput: v.flags };
    if (ArrayBuffer.isView(v) && TYPED.has(v.constructor.name)) {
      return { $typed: v.constructor.name, base64: base64(v) };
    }
    if (v instanceof ArrayBuffer) {
      return { $typed: 'ArrayBuffer', base64: Buffer.from(v).toString('base64') };
    }
    const proto = Object.getPrototypeOf(v);
    const kentat = {};
    for (const k of Object.keys(v)) {
      kentat[pakota(k)] = s(v[k], `${polku}/${pointerOsa(pakota(k))}`);
    }
    if (proto === Object.prototype || proto === null) return kentat;
    return { $luokka: proto?.constructor?.name ?? '?', kentat };
  }

  return s(arvo, '');
}

/**
 * Käänteinen muunnos: palauttaa JSON-puusta alkuperäisen rakenteen.
 * Funktiot palautuvat merkkiolioiksi { $funktio, lahde } — lähde kulkee
 * mukana, mutta sitä ei ajeta. `$luokka` palautuu tavalliseksi olioksi.
 */
export function palauta(json) {
  const juuri = { arvo: undefined };
  const viittaukset = [];

  function p(v, polku) {
    if (v === null || typeof v !== 'object') return v;
    if (Array.isArray(v)) {
      const ulos = new Array(v.length);
      v.forEach((a, i) => {
        if (a && typeof a === 'object' && a.$aukko === true && Object.keys(a).length === 1) return;
        ulos[i] = p(a, `${polku}/${i}`);
      });
      return ulos;
    }
    if ('$undefined' in v) return undefined;
    if ('$luku' in v) return v.$luku === '-0' ? -0 : Number(v.$luku);
    if ('$bigint' in v) return BigInt(v.$bigint);
    if ('$symboli' in v) return Symbol(v.$symboli);
    if ('$funktio' in v) return { $funktio: v.$funktio, lahde: v.lahde };
    if ('$pvm' in v) return new Date(v.$pvm);
    if ('$regexp' in v) return new RegExp(v.$regexp, v.liput);
    if ('$typed' in v) {
      const b = Buffer.from(v.base64, 'base64');
      const ab = b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
      return v.$typed === 'ArrayBuffer' ? ab : new globalThis[v.$typed](ab);
    }
    if ('$viittaus' in v) {
      const paikka = {};
      viittaukset.push([paikka, v.$viittaus]);
      return paikka;
    }
    if ('$map' in v) {
      return new Map(v.$map.map(([k, a], i) => [p(k, `${polku}/$map/${i}/0`), p(a, `${polku}/$map/${i}/1`)]));
    }
    if ('$set' in v) return new Set(v.$set.map((a, i) => p(a, `${polku}/$set/${i}`)));
    if ('$luokka' in v) return p(v.kentat, `${polku}/kentat`);
    const ulos = {};
    for (const [k, a] of Object.entries(v)) ulos[pura(k)] = p(a, `${polku}/${pointerOsa(k)}`);
    return ulos;
  }

  juuri.arvo = p(json, '');
  if (viittaukset.length) korjaaViittaukset(juuri.arvo, json, viittaukset);
  return juuri.arvo;
}

// Kehäviittaukset palautetaan toisella kierroksella: paikkamerkki
// korvataan oliolla, johon JSON pointer osoittaa palautetussa puussa.
function korjaaViittaukset(palautettu, json, viittaukset) {
  const kohde = (pointer) => {
    let v = palautettu;
    const osat = pointer.split('/').slice(1).map((o) => o.replace(/~1/g, '/').replace(/~0/g, '~'));
    for (let i = 0; i < osat.length; i++) {
      if (v instanceof Map) { v = [...v][Number(osat[i + 1])][Number(osat[i + 2])]; i += 2; continue; }
      if (v instanceof Set) { v = [...v][Number(osat[i + 1])]; i += 1; continue; }
      v = v[pura(osat[i])];
    }
    return v;
  };
  const paikat = new Map(viittaukset.map(([paikka, pointer]) => [paikka, kohde(pointer)]));
  const nahty = new Set();
  (function korvaa(v) {
    if (v === null || typeof v !== 'object' || nahty.has(v)) return;
    nahty.add(v);
    const vaihda = (a) => (paikat.has(a) ? paikat.get(a) : (korvaa(a), a));
    if (Array.isArray(v)) v.forEach((a, i) => { v[i] = vaihda(a); });
    else if (v instanceof Map) for (const [k, a] of v) v.set(k, vaihda(a));
    else if (!(v instanceof Set)) for (const k of Object.keys(v)) v[k] = vaihda(v[k]);
  })(palautettu);
  void json;
}
