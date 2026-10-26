/*
 * Dioraamamoottorin glTF 2.0 -binäärin (GLB) kirjoitin ja lukija (Linnanrakentaja,
 * ali-agentti B1, erä 1). Speksi: docs/raportit/dioraama-rajapinnat-20260929.md
 * kohdat 0 (yleiset: koordinaatisto, determinismi), 3 (rakennuskoneen GLB-muoto)
 * ja 3b (tämän moduulin tarkka rajapinta).
 *
 * kirjoitaGlb({ nimi, osat }) → Buffer
 *   osat = [{ pinta, vari: '#rrggbb' (sRGB), paikat: Float32Array (3/kärki),
 *             normaalit: Float32Array (3/kärki), uv: Float32Array (2/kärki),
 *             varit: Uint8Array (RGBA/kärki), kolmiot: Uint32Array }]
 *   → yksi solmu + yksi mesh (name = nimi), yksi primitiivi ja materiaali per osa
 *   (mode 4 = TRIANGLES). baseColorFactor = vari sRGB→lineaarina (IEC 61966-2-1).
 *
 * lueGlb(buffer) → { nimi, osat: [{ pinta, vari (lineaarinen), paikat, normaalit,
 *   uv, varit, kolmiot }] }
 *   Tukee ainakin kirjoitaGlb:n tuottaman muodon, sekä indeksit UNSIGNED_BYTE/
 *   UNSIGNED_SHORT/UNSIGNED_INT-muodossa ja bufferView'n byteStriden puuttumisen
 *   tai tiiviin/limittäisen arvon. Hylkää selkeällä virheellä: sparse-accessorit,
 *   skinit, morph targetit, ulkoiset URI:t.
 *
 * GLB-kehys (glTF 2.0 -spec): 12 tavun otsikko (magic 0x46546C67, versio 2, koko
 * pituus tavuina), sitten JSON-lohko (tasattu 4 tavuun välilyönnillä 0x20) ja
 * BIN-lohko (tasattu 4 tavuun nollalla). EI aikaleimoja eikä satunnaisuutta —
 * sama syöte tuottaa aina bittitäsmälleen samat tavut (JSON-avainjärjestys on
 * kiinteä koodin rakenteesta, ei riipu mistään ajonaikaisesta iteroinnista).
 *
 * EI UUSIA NPM-RIIPPUVUUKSIA: pelkkää Node-ydintä (Buffer, JSON), ei importteja.
 * Talon Node-ympäristö on aina pieniendiaaninen (x64/arm64), joten typed arrayn
 * taustapuskurin raakatavut vastaavat suoraan glTF:n vaatimaa pieniendiaanisuutta.
 */

const GLB_MAGIC = 0x46546c67; // 'glTF' pieniendiaanisena uint32:na
const GLB_VERSIO = 2;
const CHUNK_JSON = 0x4e4f534a; // 'JSON'
const CHUNK_BIN = 0x004e4942; // 'BIN\0'

const OTSIKON_TAVUT = 12;
const LOHKO_OTSIKON_TAVUT = 8;

// glTF-komponenttityypit (accessor.componentType).
const BYTE = 5120;
const UNSIGNED_BYTE = 5121;
const SHORT = 5122;
const UNSIGNED_SHORT = 5123;
const UNSIGNED_INT = 5125;
const FLOAT = 5126;

// bufferView.target.
const ARRAY_BUFFER = 34962;
const ELEMENT_ARRAY_BUFFER = 34963;

/** Tavukoko per komponenttityyppi. */
const KOMPONENTTIKOKO = {
  [BYTE]: 1, [UNSIGNED_BYTE]: 1,
  [SHORT]: 2, [UNSIGNED_SHORT]: 2,
  [UNSIGNED_INT]: 4, [FLOAT]: 4,
};

/** Komponenttien lukumäärä per accessor.type. */
const TYYPIN_KOMPONENTIT = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 };

/* ==================== Väri: sRGB → lineaarinen ==================== */

/**
 * sRGB [0,1] → lineaarinen [0,1], IEC 61966-2-1 -kaava (sama kuin glTF:n
 * pbrMetallicRoughness.baseColorFactor edellyttää). #ffffff → 1, #000000 → 0.
 */
function srgbLineaariksi(c) {
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

/** '#rrggbb' (sRGB, 0–255/kanava) → [r, g, b, 1] lineaarisena (alfa aina 1). */
function variLineaariseksi(hex) {
  const m = /^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/.exec(hex);
  if (!m) throw new Error(`kirjoitaGlb: väri ei ole muotoa #rrggbb: ${JSON.stringify(hex)}`);
  const [, rh, gh, bh] = m;
  return [
    srgbLineaariksi(parseInt(rh, 16) / 255),
    srgbLineaariksi(parseInt(gh, 16) / 255),
    srgbLineaariksi(parseInt(bh, 16) / 255),
    1,
  ];
}

/* ==================== Pieniä apuja ==================== */

/**
 * Näkymä (ei kopiota) typed arrayn taustalla olevaan ArrayBufferiin. Kunnioittaa
 * byteOffsetia, jos syöte on osanäkymä isommasta puskurista.
 */
function tavuina(ta) {
  return Buffer.from(ta.buffer, ta.byteOffset, ta.byteLength);
}

/** POSITION-accessorin pakollinen min/max, komponenteittain (x, y, z). */
function minMax3(paikat) {
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < paikat.length; i += 3) {
    for (let k = 0; k < 3; k++) {
      const v = paikat[i + k];
      if (v < min[k]) min[k] = v;
      if (v > max[k]) max[k] = v;
    }
  }
  return { min, max };
}

const KENTAT_TARKISTUS = [
  ['paikat', Float32Array], ['normaalit', Float32Array],
  ['uv', Float32Array], ['varit', Uint8Array], ['kolmiot', Uint32Array],
];

/**
 * Tarkistaa yhden osan kentät ja palauttaa kärkimäärän. Heittää selkeän virheen,
 * jos jokin kenttä puuttuu, on väärää tyyppiä tai pituudet eivät täsmää.
 *
 * PÄÄTÖS (dokumentoitu, ks. myös testit): tyhjä osa (kolmiot.length === 0)
 * HYLÄTÄÄN selkeällä virheellä sen sijaan että ohitettaisiin hiljaa. rakenna.mjs
 * suodattaa käyttämättömät pinnat pois ennen kirjoitaGlb-kutsua, joten tyhjä osa
 * tässä kohtaa on lähes aina yläsuunnan bugi (esim. ryhmittelyvirhe reseptit.mjs:ssä)
 * — hiljainen ohitus saisi pinnan vain katoamaan huomaamatta.
 */
function tarkistaOsa(osa, i) {
  const { pinta, vari } = osa ?? {};
  if (typeof pinta !== 'string' || pinta.length === 0) {
    throw new Error(`kirjoitaGlb: osat[${i}].pinta puuttuu tai ei ole merkkijono`);
  }
  if (typeof vari !== 'string' || !/^#[0-9a-fA-F]{6}$/.test(vari)) {
    throw new Error(`kirjoitaGlb: osat[${i}].vari (${pinta}) ei ole muotoa #rrggbb: ${JSON.stringify(vari)}`);
  }
  for (const [nimiKentta, Tyyppi] of KENTAT_TARKISTUS) {
    if (!(osa[nimiKentta] instanceof Tyyppi)) {
      throw new Error(`kirjoitaGlb: osat[${i}].${nimiKentta} (${pinta}) pitää olla ${Tyyppi.name}`);
    }
  }
  const { paikat, normaalit, uv, varit, kolmiot } = osa;

  if (kolmiot.length === 0) {
    throw new Error(`kirjoitaGlb: osat[${i}].kolmiot (${pinta}) on tyhjä — tyhjä osa hylätään (ks. kommentti yllä)`);
  }
  if (paikat.length === 0 || paikat.length % 3 !== 0) {
    throw new Error(`kirjoitaGlb: osat[${i}].paikat (${pinta}) pituus ${paikat.length} ei ole 3:lla jaollinen`);
  }
  const karjet = paikat.length / 3;
  if (normaalit.length !== karjet * 3) {
    throw new Error(`kirjoitaGlb: osat[${i}].normaalit (${pinta}) pituus ${normaalit.length}, odotettiin ${karjet * 3}`);
  }
  if (uv.length !== karjet * 2) {
    throw new Error(`kirjoitaGlb: osat[${i}].uv (${pinta}) pituus ${uv.length}, odotettiin ${karjet * 2}`);
  }
  if (varit.length !== karjet * 4) {
    throw new Error(`kirjoitaGlb: osat[${i}].varit (${pinta}) pituus ${varit.length}, odotettiin ${karjet * 4}`);
  }
  if (kolmiot.length % 3 !== 0) {
    throw new Error(`kirjoitaGlb: osat[${i}].kolmiot (${pinta}) pituus ${kolmiot.length} ei ole 3:lla jaollinen`);
  }
  for (let k = 0; k < kolmiot.length; k++) {
    if (kolmiot[k] >= karjet) {
      throw new Error(`kirjoitaGlb: osat[${i}].kolmiot (${pinta}) viittaa kärkeen ${kolmiot[k]}, kärkiä vain ${karjet}`);
    }
  }
  return karjet;
}

/* ==================== kirjoitaGlb ==================== */

/**
 * Kirjoittaa osajoukon (esim. yhden dioraaman tilan) glTF 2.0 -binäärinä (GLB).
 * Ks. tiedoston alun kommentti muodolle. Palauttaa Bufferin. Deterministinen:
 * sama syöte (samat luvut samassa järjestyksessä) → bittitäsmälleen samat tavut.
 */
export function kirjoitaGlb({ nimi, osat }) {
  if (typeof nimi !== 'string' || nimi.length === 0) {
    throw new Error('kirjoitaGlb: "nimi" puuttuu tai ei ole merkkijono');
  }
  if (!Array.isArray(osat) || osat.length === 0) {
    throw new Error('kirjoitaGlb: "osat" puuttuu tai on tyhjä taulukko');
  }

  const palat = []; // BIN-lohkon Buffer-palat järjestyksessä
  let offset = 0;
  const bufferViews = [];
  const accessors = [];
  const materials = [];
  const primitives = [];

  /** Lisää yhden tavupalan BIN-puskuriin, tasaa 4 tavuun nollilla, palauttaa bufferView-indeksin. */
  function lisaaBufferView(buf, target) {
    const byteOffset = offset;
    palat.push(buf);
    offset += buf.length;
    const yli = offset % 4;
    if (yli !== 0) {
      const tayte = Buffer.alloc(4 - yli); // nollatäyte bufferView'n tasaukseen
      palat.push(tayte);
      offset += tayte.length;
    }
    const view = { buffer: 0, byteOffset, byteLength: buf.length };
    if (target !== undefined) view.target = target;
    bufferViews.push(view);
    return bufferViews.length - 1;
  }

  for (let i = 0; i < osat.length; i++) {
    const osa = osat[i];
    const karjet = tarkistaOsa(osa, i);
    const {
      pinta, vari, paikat, normaalit, uv, varit, kolmiot,
    } = osa;

    const posView = lisaaBufferView(tavuina(paikat), ARRAY_BUFFER);
    const { min, max } = minMax3(paikat);
    accessors.push({
      bufferView: posView, componentType: FLOAT, count: karjet, type: 'VEC3', min, max,
    });
    const posAcc = accessors.length - 1;

    const normView = lisaaBufferView(tavuina(normaalit), ARRAY_BUFFER);
    accessors.push({ bufferView: normView, componentType: FLOAT, count: karjet, type: 'VEC3' });
    const normAcc = accessors.length - 1;

    const uvView = lisaaBufferView(tavuina(uv), ARRAY_BUFFER);
    accessors.push({ bufferView: uvView, componentType: FLOAT, count: karjet, type: 'VEC2' });
    const uvAcc = accessors.length - 1;

    const variView = lisaaBufferView(tavuina(varit), ARRAY_BUFFER);
    accessors.push({
      bufferView: variView, componentType: UNSIGNED_BYTE, count: karjet, type: 'VEC4', normalized: true,
    });
    const variAcc = accessors.length - 1;

    const idxView = lisaaBufferView(tavuina(kolmiot), ELEMENT_ARRAY_BUFFER);
    accessors.push({
      bufferView: idxView, componentType: UNSIGNED_INT, count: kolmiot.length, type: 'SCALAR',
    });
    const idxAcc = accessors.length - 1;

    materials.push({
      name: pinta,
      extras: { pinta },
      pbrMetallicRoughness: {
        baseColorFactor: variLineaariseksi(vari),
        metallicFactor: 0,
        roughnessFactor: 1,
      },
    });

    primitives.push({
      attributes: {
        POSITION: posAcc, NORMAL: normAcc, TEXCOORD_0: uvAcc, COLOR_0: variAcc,
      },
      indices: idxAcc,
      material: materials.length - 1,
      mode: 4, // TRIANGLES
    });
  }

  const json = {
    asset: { version: '2.0', generator: 'Matkakirja dioraama-rakennuskone' },
    scene: 0,
    scenes: [{ nodes: [0] }],
    nodes: [{ name: nimi, mesh: 0 }],
    meshes: [{ name: nimi, primitives }],
    materials,
    accessors,
    bufferViews,
    buffers: [{ byteLength: offset }],
  };

  let jsonBuf = Buffer.from(JSON.stringify(json), 'utf8');
  const jsonYli = jsonBuf.length % 4;
  if (jsonYli !== 0) {
    jsonBuf = Buffer.concat([jsonBuf, Buffer.alloc(4 - jsonYli, 0x20)]); // JSON-tasaus välilyönnillä
  }

  const binRaaka = Buffer.concat(palat);
  if (binRaaka.length !== offset) {
    // Sisäinen ristiriita ei voi periaatteessa tapahtua — varmistus siltä varalta, että joku
    // muuttaa lisaaBufferView'ta jatkossa niin, ettei offset-laskenta enää täsmää.
    throw new Error(`kirjoitaGlb: sisäinen virhe, puskurin pituus ${binRaaka.length} ≠ laskettu ${offset}`);
  }
  let binBuf = binRaaka;
  const binYli = binBuf.length % 4;
  if (binYli !== 0) {
    binBuf = Buffer.concat([binBuf, Buffer.alloc(4 - binYli, 0)]); // BIN-tasaus nollalla
  }

  const kokonaispituus = OTSIKON_TAVUT
    + LOHKO_OTSIKON_TAVUT + jsonBuf.length
    + LOHKO_OTSIKON_TAVUT + binBuf.length;

  const otsikko = Buffer.alloc(OTSIKON_TAVUT);
  otsikko.writeUInt32LE(GLB_MAGIC, 0);
  otsikko.writeUInt32LE(GLB_VERSIO, 4);
  otsikko.writeUInt32LE(kokonaispituus, 8);

  const jsonOtsikko = Buffer.alloc(LOHKO_OTSIKON_TAVUT);
  jsonOtsikko.writeUInt32LE(jsonBuf.length, 0);
  jsonOtsikko.writeUInt32LE(CHUNK_JSON, 4);

  const binOtsikko = Buffer.alloc(LOHKO_OTSIKON_TAVUT);
  binOtsikko.writeUInt32LE(binBuf.length, 0);
  binOtsikko.writeUInt32LE(CHUNK_BIN, 4);

  return Buffer.concat([otsikko, jsonOtsikko, jsonBuf, binOtsikko, binBuf]);
}

/* ==================== lueGlb: apufunktiot ==================== */

/** Lukee yhden komponentin (skalaariarvon) puskurista annetulla componentTypellä tavuosoitteesta. */
function lueKomponentti(buf, tavu, componentType) {
  switch (componentType) {
    case BYTE: return buf.readInt8(tavu);
    case UNSIGNED_BYTE: return buf.readUInt8(tavu);
    case SHORT: return buf.readInt16LE(tavu);
    case UNSIGNED_SHORT: return buf.readUInt16LE(tavu);
    case UNSIGNED_INT: return buf.readUInt32LE(tavu);
    case FLOAT: return buf.readFloatLE(tavu);
    default: throw new Error(`lueGlb: tuntematon componentType ${componentType}`);
  }
}

/**
 * Lukee accessorin kaikki arvot tavallisena JS-taulukkona (pituus count × komponentit).
 * Tukee bufferView'n byteStriden puuttumisen (tiivis oletus) sekä eksplisiittisen tiiviin
 * tai limittäisen arvon. Hylkää sparse-accessorit ja accessorit ilman bufferView'ta.
 */
function lueAccessorinArvot(json, bin, accessorIndex, kuvaus) {
  const acc = json.accessors?.[accessorIndex];
  if (!acc) throw new Error(`lueGlb: accessor ${accessorIndex} (${kuvaus}) puuttuu`);
  if (acc.sparse) throw new Error(`lueGlb: sparse-accessorit ei tuettu (${kuvaus})`);
  if (acc.bufferView === undefined) {
    throw new Error(`lueGlb: accessor ilman bufferView'ta ei tuettu (${kuvaus})`);
  }
  const view = json.bufferViews?.[acc.bufferView];
  if (!view) throw new Error(`lueGlb: bufferView ${acc.bufferView} (${kuvaus}) puuttuu`);
  if ((view.buffer ?? 0) !== 0) throw new Error(`lueGlb: vain yksi buffer (indeksi 0) tuettu (${kuvaus})`);
  if (!bin) throw new Error(`lueGlb: BIN-lohko puuttuu mutta dataa tarvitaan (${kuvaus})`);

  const komponentteja = TYYPIN_KOMPONENTIT[acc.type];
  if (!komponentteja) throw new Error(`lueGlb: tuntematon accessor.type ${acc.type} (${kuvaus})`);
  const koko = KOMPONENTTIKOKO[acc.componentType];
  if (!koko) throw new Error(`lueGlb: tuntematon componentType ${acc.componentType} (${kuvaus})`);

  const tiivisAskel = koko * komponentteja;
  const askel = view.byteStride ?? tiivisAskel; // "puuttuva/tiivis" + yleinen limitys tuettuna
  const alku = (view.byteOffset ?? 0) + (acc.byteOffset ?? 0);
  const bufferPituus = bin.length;
  const vikaTavu = alku + (acc.count > 0 ? (acc.count - 1) * askel + tiivisAskel : 0);
  if (acc.count > 0 && vikaTavu > bufferPituus) {
    throw new Error(`lueGlb: accessor (${kuvaus}) ulottuu BIN-lohkon ulkopuolelle`);
  }

  const tulos = new Array(acc.count * komponentteja);
  for (let i = 0; i < acc.count; i++) {
    const rivi = alku + i * askel;
    for (let k = 0; k < komponentteja; k++) {
      tulos[i * komponentteja + k] = lueKomponentti(bin, rivi + k * koko, acc.componentType);
    }
  }
  return tulos;
}

/** FLOAT-tyyppinen attribuutti (POSITION/NORMAL/TEXCOORD_0) → Float32Array. */
function lueFloatit(json, bin, accessorIndex, kuvaus) {
  const acc = json.accessors[accessorIndex];
  if (acc.componentType !== FLOAT) {
    throw new Error(`lueGlb: ${kuvaus} pitää olla FLOAT (componentType ${acc.componentType})`);
  }
  return Float32Array.from(lueAccessorinArvot(json, bin, accessorIndex, kuvaus));
}

/** COLOR_0 (UNSIGNED_BYTE VEC4) → Uint8Array raakoina 0–255-arvoina (ei normalisoituna 0–1:ksi). */
function lueVarit(json, bin, accessorIndex) {
  const acc = json.accessors[accessorIndex];
  if (acc.componentType !== UNSIGNED_BYTE) {
    throw new Error(`lueGlb: COLOR_0 tuetaan vain UNSIGNED_BYTE-muodossa (oli ${acc.componentType})`);
  }
  return Uint8Array.from(lueAccessorinArvot(json, bin, accessorIndex, 'COLOR_0'));
}

/** Indeksit (UNSIGNED_BYTE/SHORT/INT, SCALAR) → yhtenäistetty Uint32Array. */
function lueIndeksit(json, bin, accessorIndex) {
  const acc = json.accessors[accessorIndex];
  if (![UNSIGNED_BYTE, UNSIGNED_SHORT, UNSIGNED_INT].includes(acc.componentType)) {
    throw new Error(`lueGlb: indeksien componentType ${acc.componentType} ei tuettu`);
  }
  if (acc.type !== 'SCALAR') throw new Error(`lueGlb: indeksien type pitää olla SCALAR (oli ${acc.type})`);
  return Uint32Array.from(lueAccessorinArvot(json, bin, accessorIndex, 'indeksit'));
}

/** Purkaa GLB-otsikon ja lohkot. Palauttaa { json, bin (Buffer|null) }. */
function puraLohkot(puskuri) {
  if (puskuri.length < OTSIKON_TAVUT) throw new Error('lueGlb: puskuri on liian lyhyt GLB-otsikolle');
  const magic = puskuri.readUInt32LE(0);
  const versio = puskuri.readUInt32LE(4);
  const pituus = puskuri.readUInt32LE(8);
  if (magic !== GLB_MAGIC) throw new Error('lueGlb: väärä magic-tunniste — ei glTF-binääri (GLB)');
  if (versio !== GLB_VERSIO) throw new Error(`lueGlb: tuntematon glTF-versio ${versio} (tuetaan vain 2)`);
  if (pituus !== puskuri.length) {
    throw new Error(`lueGlb: otsikon pituus ${pituus} ei täsmää puskurin pituuteen ${puskuri.length}`);
  }

  let json = null;
  let bin = null;
  let o = OTSIKON_TAVUT;
  while (o < puskuri.length) {
    if (o + LOHKO_OTSIKON_TAVUT > puskuri.length) throw new Error('lueGlb: katkennut lohko-otsikko');
    const lohkonPituus = puskuri.readUInt32LE(o);
    const lohkonTyyppi = puskuri.readUInt32LE(o + 4);
    const dataAlku = o + LOHKO_OTSIKON_TAVUT;
    const dataLoppu = dataAlku + lohkonPituus;
    if (dataLoppu > puskuri.length) throw new Error('lueGlb: lohko ylittää puskurin pituuden');
    const data = puskuri.subarray(dataAlku, dataLoppu);
    if (lohkonTyyppi === CHUNK_JSON) {
      if (json !== null) throw new Error('lueGlb: useampi JSON-lohko');
      json = JSON.parse(data.toString('utf8'));
    } else if (lohkonTyyppi === CHUNK_BIN) {
      if (bin !== null) throw new Error('lueGlb: useampi BIN-lohko');
      bin = data;
    } // Muut lohkotyypit: glTF-spec sallii tuntemattomat laajennuslohkot — ohitetaan hiljaa.
    o = dataLoppu;
  }
  if (json === null) throw new Error('lueGlb: JSON-lohko puuttuu');
  return { json, bin };
}

/** Heittää selkeän virheen, jos glTF käyttää rakenteita, joita tämä lukija ei tue. */
function hylkaaTuntemattomat(json) {
  for (const acc of json.accessors ?? []) {
    if (acc?.sparse) throw new Error('lueGlb: sparse-accessorit ei tuettu');
  }
  if ((json.skins ?? []).length > 0) throw new Error('lueGlb: skinit (luuranko) ei tuettu');
  for (const mesh of json.meshes ?? []) {
    for (const prim of mesh.primitives ?? []) {
      if ((prim.targets ?? []).length > 0) throw new Error('lueGlb: morph targetit ei tuettu');
    }
  }
  for (const buf of json.buffers ?? []) {
    if (buf?.uri) throw new Error(`lueGlb: ulkoiset URI:t ei tuettu (buffer.uri = ${JSON.stringify(buf.uri)})`);
  }
  for (const img of json.images ?? []) {
    if (img?.uri) throw new Error(`lueGlb: ulkoiset URI:t ei tuettu (image.uri = ${JSON.stringify(img.uri)})`);
  }
}

/* ==================== lueGlb ==================== */

/**
 * Lukee glTF 2.0 -binäärin (GLB) takaisin { nimi, osat } -muotoon. Tukee ainakin sen,
 * minkä kirjoitaGlb tuottaa, sekä indeksit UNSIGNED_BYTE/UNSIGNED_SHORT/UNSIGNED_INT
 * -muodossa ja bufferView'n byteStriden puuttumisen tai tiiviin/limittäisen arvon.
 * Hylkää selkeällä virheellä sparse-accessorit, skinit, morph targetit ja ulkoiset
 * (tiedosto- tai data-)URI:t.
 */
export function lueGlb(buffer) {
  if (!(buffer instanceof Uint8Array)) {
    throw new Error('lueGlb: syöte pitää olla Buffer tai Uint8Array');
  }
  const puskuri = Buffer.isBuffer(buffer)
    ? buffer
    : Buffer.from(buffer.buffer, buffer.byteOffset, buffer.byteLength);

  const { json, bin } = puraLohkot(puskuri);
  hylkaaTuntemattomat(json);

  const solmu = json.nodes?.[0];
  const meshIndeksi = solmu?.mesh ?? 0;
  const mesh = json.meshes?.[meshIndeksi];
  if (!mesh) throw new Error('lueGlb: mesh puuttuu');
  const nimi = solmu?.name ?? mesh.name ?? null;

  const osat = (mesh.primitives ?? []).map((prim, i) => {
    if ((prim.targets ?? []).length > 0) throw new Error(`lueGlb: primitiivi ${i}: morph targetit ei tuettu`);
    if (prim.mode !== undefined && prim.mode !== 4) {
      throw new Error(`lueGlb: primitiivi ${i}: vain mode 4 (TRIANGLES) tuettu (oli ${prim.mode})`);
    }
    const attrs = prim.attributes ?? {};
    if (attrs.POSITION === undefined) throw new Error(`lueGlb: primitiivi ${i}: POSITION puuttuu`);

    const paikat = lueFloatit(json, bin, attrs.POSITION, `primitiivi ${i} POSITION`);
    const normaalit = attrs.NORMAL !== undefined
      ? lueFloatit(json, bin, attrs.NORMAL, `primitiivi ${i} NORMAL`)
      : new Float32Array(0);
    const uv = attrs.TEXCOORD_0 !== undefined
      ? lueFloatit(json, bin, attrs.TEXCOORD_0, `primitiivi ${i} TEXCOORD_0`)
      : new Float32Array(0);
    const varit = attrs.COLOR_0 !== undefined ? lueVarit(json, bin, attrs.COLOR_0) : new Uint8Array(0);
    const kolmiot = prim.indices !== undefined
      ? lueIndeksit(json, bin, prim.indices)
      // Ei-indeksoitu primitiivi (glTF sallii): peräkkäiset kärjet muodostavat kolmiot sellaisenaan.
      : Uint32Array.from({ length: paikat.length / 3 }, (_, idx) => idx);

    const materiaali = prim.material !== undefined ? json.materials?.[prim.material] : undefined;
    const pinta = materiaali?.extras?.pinta ?? materiaali?.name ?? null;
    const baseColorFactor = materiaali?.pbrMetallicRoughness?.baseColorFactor;
    const vari = Array.isArray(baseColorFactor) ? baseColorFactor.slice() : [1, 1, 1, 1];

    return {
      pinta, vari, paikat, normaalit, uv, varit, kolmiot,
    };
  });

  return { nimi, osat };
}

/* ==================== kirjoitaMonisolmuGlb (erä 2b: 3D-hahmot) ==================== */
/*
 * Monisolmuinen GLB (Linnanrakentaja, erä 2b, ali-agentti P4a, 29.9.2026). Speksi:
 * docs/raportit/dioraama-rajapinnat-era2b-20260929.md kohta 4 "3D-HAHMOT". VANHA
 * kirjoitaGlb YLLÄ ON ENNALLAAN (yhden solmun tilat/rakennusosat) - tämä on ERI,
 * itsenäinen funktio pienoisfiguurien nivelhierarkialle. Osittainen koodin
 * kertyminen kirjoitaGlb:n kanssa on tarkoituksellista (ei jaettua tilaa/apuria
 * kahden funktion välillä), jottei vanhan funktion tavuja voi vahingossa muuttaa.
 *
 * kirjoitaMonisolmuGlb({ nimi, solmut }) -> Buffer
 *   solmut = [{ nimi, vanhempi (toisen solmun nimi tai null=juuri), paikka:
 *     [x,y,z] (translation SUHTEESSA VANHEMPAAN), osat: [{ pinta, vari, paikat,
 *     normaalit, kolmiot }] }]
 *   -> yksi glTF-solmu + (jos osat.length>0) yksi mesh per solmu, yksi primitiivi
 *   per osa. TEXCOORD_0 synteesoidaan AINA (0,0):ksi (pienoisfiguuri on yksivärinen
 *   maalattu osa, ei tekstuuria). COLOR_0 synteesoidaan: R=255 (AO=1, täysi valo),
 *   G=0 (lämpö=0), B=osan deterministinen satunnaisluku (siemen = "solmu:pinta",
 *   FNV-1a-tyyppinen hajautus - EI Math.random:ia, sama syöte = samat tavut aina),
 *   A=255. Sama väri->lineaarinen-muunnos ja GLB-kehys kuin kirjoitaGlb:ssä.
 */

/** Deterministinen [0,1)-luku merkkijonosta (FNV-1a-tyyppinen hajautus, ei satunnaisuutta). */
function osanSatunnaisluku(avain) {
  let h = 0x811c9dc5;
  for (let i = 0; i < avain.length; i++) {
    h ^= avain.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0) / 4294967296;
}

/** Tarkistaa yhden hahmo-osan kentät (kevyempi kuin tarkistaOsa: ei uv/varit). */
function tarkistaHahmoOsa(osa, solmunNimi, i) {
  const { pinta, vari } = osa ?? {};
  const ctx = `solmu '${solmunNimi}' osat[${i}]`;
  if (typeof pinta !== 'string' || pinta.length === 0) {
    throw new Error(`kirjoitaMonisolmuGlb: ${ctx}.pinta puuttuu tai ei ole merkkijono`);
  }
  if (typeof vari !== 'string' || !/^#[0-9a-fA-F]{6}$/.test(vari)) {
    throw new Error(`kirjoitaMonisolmuGlb: ${ctx} (${pinta}).vari ei ole muotoa #rrggbb: ${JSON.stringify(vari)}`);
  }
  const { paikat, normaalit, kolmiot } = osa;
  if (!(paikat instanceof Float32Array) || !(normaalit instanceof Float32Array) || !(kolmiot instanceof Uint32Array)) {
    throw new Error(`kirjoitaMonisolmuGlb: ${ctx} (${pinta}): paikat/normaalit pitää olla Float32Array, kolmiot Uint32Array`);
  }
  if (kolmiot.length === 0) throw new Error(`kirjoitaMonisolmuGlb: ${ctx} (${pinta}).kolmiot on tyhjä`);
  if (paikat.length === 0 || paikat.length % 3 !== 0) {
    throw new Error(`kirjoitaMonisolmuGlb: ${ctx} (${pinta}).paikat pituus ${paikat.length} ei ole 3:lla jaollinen`);
  }
  const karjet = paikat.length / 3;
  if (normaalit.length !== karjet * 3) {
    throw new Error(`kirjoitaMonisolmuGlb: ${ctx} (${pinta}).normaalit pituus ${normaalit.length}, odotettiin ${karjet * 3}`);
  }
  if (kolmiot.length % 3 !== 0) {
    throw new Error(`kirjoitaMonisolmuGlb: ${ctx} (${pinta}).kolmiot pituus ${kolmiot.length} ei ole 3:lla jaollinen`);
  }
  for (let k = 0; k < kolmiot.length; k++) {
    if (kolmiot[k] >= karjet) {
      throw new Error(`kirjoitaMonisolmuGlb: ${ctx} (${pinta}).kolmiot viittaa kärkeen ${kolmiot[k]}, kärkiä vain ${karjet}`);
    }
  }
  return karjet;
}

/**
 * Kirjoittaa nivelhierarkisen pienoisfiguurin glTF 2.0 -binäärinä (GLB). Ks.
 * tiedoston kohdan alun kommentti muodolle. Deterministinen (ks. osanSatunnaisluku).
 */
export function kirjoitaMonisolmuGlb({ nimi, solmut }) {
  if (typeof nimi !== 'string' || nimi.length === 0) {
    throw new Error('kirjoitaMonisolmuGlb: "nimi" puuttuu tai ei ole merkkijono');
  }
  if (!Array.isArray(solmut) || solmut.length === 0) {
    throw new Error('kirjoitaMonisolmuGlb: "solmut" puuttuu tai on tyhjä taulukko');
  }

  // Ensimmäinen kierros: nimi -> indeksi, tarkista kaksoisnimet.
  const nimiIndeksi = new Map();
  solmut.forEach((s, i) => {
    if (typeof s?.nimi !== 'string' || s.nimi.length === 0) {
      throw new Error(`kirjoitaMonisolmuGlb: solmut[${i}].nimi puuttuu tai ei ole merkkijono`);
    }
    if (nimiIndeksi.has(s.nimi)) throw new Error(`kirjoitaMonisolmuGlb: solmun nimi '${s.nimi}' esiintyy kahdesti`);
    nimiIndeksi.set(s.nimi, i);
  });

  // Toinen kierros: vanhempi-lapsi-suhteet (ei riipu taulukon järjestyksestä).
  const lapset = solmut.map(() => []);
  const juuret = [];
  solmut.forEach((s, i) => {
    if (s.vanhempi == null) { juuret.push(i); return; }
    const pi = nimiIndeksi.get(s.vanhempi);
    if (pi === undefined) {
      throw new Error(`kirjoitaMonisolmuGlb: solmun '${s.nimi}' vanhempi '${s.vanhempi}' ei löydy solmut-taulukosta`);
    }
    lapset[pi].push(i);
  });
  if (juuret.length === 0) throw new Error('kirjoitaMonisolmuGlb: yhtään juurisolmua (vanhempi=null) ei löytynyt');

  const palat = []; let offset = 0;
  const bufferViews = []; const accessors = []; const materials = [];
  const meshes = []; const nodes = [];

  function lisaaBufferView(buf, target) {
    const byteOffset = offset;
    palat.push(buf); offset += buf.length;
    const yli = offset % 4;
    if (yli !== 0) { const tayte = Buffer.alloc(4 - yli); palat.push(tayte); offset += tayte.length; }
    const view = { buffer: 0, byteOffset, byteLength: buf.length };
    if (target !== undefined) view.target = target;
    bufferViews.push(view);
    return bufferViews.length - 1;
  }

  solmut.forEach((s, si) => {
    const primitives = [];
    (s.osat ?? []).forEach((osa, oi) => {
      const karjet = tarkistaHahmoOsa(osa, s.nimi, oi);
      const { pinta, vari, paikat, normaalit, kolmiot } = osa;

      const posView = lisaaBufferView(tavuina(paikat), ARRAY_BUFFER);
      const { min, max } = minMax3(paikat);
      accessors.push({ bufferView: posView, componentType: FLOAT, count: karjet, type: 'VEC3', min, max });
      const posAcc = accessors.length - 1;

      const normView = lisaaBufferView(tavuina(normaalit), ARRAY_BUFFER);
      accessors.push({ bufferView: normView, componentType: FLOAT, count: karjet, type: 'VEC3' });
      const normAcc = accessors.length - 1;

      // TEXCOORD_0: aina (0,0) - ei tekstuuria (yksivärinen maalattu pienoisfiguuri).
      const uv = new Float32Array(karjet * 2);
      const uvView = lisaaBufferView(tavuina(uv), ARRAY_BUFFER);
      accessors.push({ bufferView: uvView, componentType: FLOAT, count: karjet, type: 'VEC2' });
      const uvAcc = accessors.length - 1;

      // COLOR_0: R=AO=255, G=lämpö=0, B=osan satunnaisluku (siemen "solmu:pinta"), A=255.
      const bTavu = Math.round(osanSatunnaisluku(`${s.nimi}:${pinta}`) * 255);
      const varit = new Uint8Array(karjet * 4);
      for (let i = 0; i < karjet; i++) {
        varit[i * 4] = 255; varit[i * 4 + 1] = 0; varit[i * 4 + 2] = bTavu; varit[i * 4 + 3] = 255;
      }
      const variView = lisaaBufferView(tavuina(varit), ARRAY_BUFFER);
      accessors.push({
        bufferView: variView, componentType: UNSIGNED_BYTE, count: karjet, type: 'VEC4', normalized: true,
      });
      const variAcc = accessors.length - 1;

      const idxView = lisaaBufferView(tavuina(kolmiot), ELEMENT_ARRAY_BUFFER);
      accessors.push({ bufferView: idxView, componentType: UNSIGNED_INT, count: kolmiot.length, type: 'SCALAR' });
      const idxAcc = accessors.length - 1;

      materials.push({
        name: pinta,
        extras: { pinta },
        pbrMetallicRoughness: { baseColorFactor: variLineaariseksi(vari), metallicFactor: 0, roughnessFactor: 1 },
      });
      primitives.push({
        attributes: { POSITION: posAcc, NORMAL: normAcc, TEXCOORD_0: uvAcc, COLOR_0: variAcc },
        indices: idxAcc,
        material: materials.length - 1,
        mode: 4,
      });
    });

    const node = { name: s.nimi, translation: [...(s.paikka ?? [0, 0, 0])] };
    if (primitives.length > 0) {
      meshes.push({ name: s.nimi, primitives });
      node.mesh = meshes.length - 1;
    }
    if (lapset[si].length > 0) node.children = lapset[si];
    nodes.push(node);
  });

  const json = {
    asset: { version: '2.0', generator: 'Matkakirja dioraama-rakennuskone (hahmo)' },
    scene: 0,
    scenes: [{ nodes: juuret }],
    nodes,
    meshes,
    materials,
    accessors,
    bufferViews,
    buffers: [{ byteLength: offset }],
  };

  let jsonBuf = Buffer.from(JSON.stringify(json), 'utf8');
  const jsonYli = jsonBuf.length % 4;
  if (jsonYli !== 0) jsonBuf = Buffer.concat([jsonBuf, Buffer.alloc(4 - jsonYli, 0x20)]);

  const binRaaka = Buffer.concat(palat);
  if (binRaaka.length !== offset) {
    throw new Error(`kirjoitaMonisolmuGlb: sisäinen virhe, puskurin pituus ${binRaaka.length} ≠ laskettu ${offset}`);
  }
  let binBuf = binRaaka;
  const binYli = binBuf.length % 4;
  if (binYli !== 0) binBuf = Buffer.concat([binBuf, Buffer.alloc(4 - binYli, 0)]);

  const kokonaispituus = OTSIKON_TAVUT + LOHKO_OTSIKON_TAVUT + jsonBuf.length + LOHKO_OTSIKON_TAVUT + binBuf.length;
  const otsikko = Buffer.alloc(OTSIKON_TAVUT);
  otsikko.writeUInt32LE(GLB_MAGIC, 0);
  otsikko.writeUInt32LE(GLB_VERSIO, 4);
  otsikko.writeUInt32LE(kokonaispituus, 8);

  const jsonOtsikko = Buffer.alloc(LOHKO_OTSIKON_TAVUT);
  jsonOtsikko.writeUInt32LE(jsonBuf.length, 0);
  jsonOtsikko.writeUInt32LE(CHUNK_JSON, 4);

  const binOtsikko = Buffer.alloc(LOHKO_OTSIKON_TAVUT);
  binOtsikko.writeUInt32LE(binBuf.length, 0);
  binOtsikko.writeUInt32LE(CHUNK_BIN, 4);

  return Buffer.concat([otsikko, jsonOtsikko, jsonBuf, binOtsikko, binBuf]);
}
