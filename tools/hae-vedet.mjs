/*
 * Hakee maailman merkittävimmät joet ja suurimmat järvet Natural Earthistä
 * ja kirjoittaa ne tiedostoon js/packs/maasto-vedet.js.
 *
 *   NODE_USE_ENV_PROXY=1 node tools/hae-vedet.mjs
 *
 * Noden fetch ei lue HTTPS_PROXY-muuttujaa itsestään, siksi NODE_USE_ENV_PROXY.
 *
 * Lähteet (public domain, Natural Earth 10m):
 *   ne_10m_rivers_lake_centerlines   joet
 *   ne_10m_lakes                     järvet
 *   ne_10m_ocean                     Kaspianmeri (se ei ole järviaineistossa)
 *
 * Zip-purku, shapefile- ja dbf-luku sekä yksinkertaistus ovat tässä
 * tiedostossa. Repossa ei ole riippuvuuksia eikä niitä lisätä tämän takia.
 *
 * --- miksi karsintaa on näin paljon ---
 *
 * Jokiaineistossa on 1473 uomaa. Jos ne piirretään kaikki, maailmankartta
 * menee tukkoon eikä siitä erota enää mitään. Peliin kuuluvat vain ne joet,
 * jotka tunnistaa maailmankartalta, joten
 *
 *   1. mukaan pääsevät scalerank <= 4 -uomat (Natural Earthin oma arvio
 *      siitä, millä mittakaavalla joki kannattaa piirtää), ja
 *   2. sen lisäksi nimeltä kelpuutetut sr 5-6 -uomat: Don, Rhône, Po,
 *      Colorado, Elbe ja muut, jotka koulukartta näyttää mutta joiden
 *      scalerank on aineistossa matala.
 *   3. Suistohaarat, kanavat ja muut sivu-uomat pudotetaan nimen
 *      perusteella: yksi Niili riittää, ei kolmea suistohaaraa.
 *
 * Sama uoma on aineistossa pätkitty nimettyihin jaksoihin, ja jaksoilla on
 * eri kieliset nimet: Danube ja Donau, Rhein ja Rhin, Chang Jiang ja
 * Jinsha. NIMET-taulukko yhdistää ne yhdeksi joeksi, ja päätepisteistään
 * kiinni olevat jaksot ketjutetaan yhdeksi viivaksi.
 *
 * Järvistä otetaan vain suurimmat pinta-alan mukaan (pallopinta-ala, ei
 * astealaa - muuten pohjoiset järvet näyttäisivät moninkertaisilta).
 * Tekojärvet jätetään pois: kysymys oli suurimmista järvistä.
 *
 * Suomenkielinen nimi annetaan vain silloin, kun se on varma. Väärä
 * suomennos on huonompi kuin vieraskielinen nimi sellaisenaan.
 */
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inflateRawSync } from 'node:zlib';
import { tmpdir } from 'node:os';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
/* Zipit ovat yhteensä seitsemän megatavua. Ne eivät kuulu repoon. */
const VALIMUISTI = process.env.VESI_VALIMUISTI || join(tmpdir(), 'matkakirja-vedet');

/* ------------------------------------------------------------------ */
/* säädöt                                                              */
/* ------------------------------------------------------------------ */

const JOKI_SCALERANK = 4;      // tämän ja sitä pienemmät pääsevät suoraan
const JOKI_TOLERANSSI = 0.04;  // astetta, Ramer-Douglas-Peucker (ks. UOMAN SILOTUS)
const JARVI_TOLERANSSI = 0.05; // järvet ovat suljettuja, kulmat näkyvät herkemmin
const JARVIA = 34;             // suurinta järveä pinta-alan mukaan
const KETJU_EPS = 0.05;        // astetta: näin lähellä olevat päät liitetään
const LYHIN_JOKI = 0.2;        // astetta: tätä lyhyempi tynkä pois aina
const LYHIN_SIVU = 1.5;        // astetta: joen TOINEN viiva pitää olla näin pitkä

/* Tunnistettavat joet, joiden scalerank on aineistossa 5 tai 6. */
const LISAKSI = new Set([
  'Amu Darya', 'Syr Darya', 'Colorado', 'Elbe', 'Loire', 'Rhône', 'Po',
  'Vistula', 'Ebro', 'Tajo', 'Tejo', 'Don', 'Dniester', 'Neva', 'Daugava',
  'Kama', 'Fraser', 'Athabasca', 'Marañón', 'Xingu', 'Tapajós', 'Purús',
  'Uruguay', 'Indigirka', 'Khatanga', 'Olenëk', 'Vilyuy', 'Tobol',
  'Limpopo', 'Okavango', 'Chari', 'Godävari', 'Volta', 'Thames',
  'Songhua', 'Tarim', 'Sutlej', 'Yamuna', 'Narmada', 'Krishna', 'Ottawa',
]);

/*
 * Suistohaarat, kanavat ja sivu-uomat: näitä ei piirretä. Poikkeuksena
 * Niilin suisto: ilman Rosettan ja Damiettan haaraa Niili katkeaa Kairon
 * kohdalle 150 kilometriä ennen Välimerta, ja siitä tulee joki joka ei
 * laske mihinkään.
 */
const POIS = [
  /delta/i, /protoka/i, /^bratul/i, /^braco/i, /^borcea$/i,
  /canal/i, /^ijssel$/i, /^waal$/i, /^lek$/i, /^nederrijn$/i,
  /^st\. clair$/i, /^quan$/i, /^grande$/i,
  /^(?!rosetta|damietta).*branch/i,
];

/*
 * Näytettävä nimi. Vasemmalla aineiston nimi, oikealla se, mikä pelissä
 * näkyy. Tehtävä on kaksinainen: suomentaa varmat nimet ja yhdistää saman
 * joen eri kieliset jaksot yhteen.
 */
const NIMET = {
  Amazonas: 'Amazon',
  Nile: 'Niili',
  'El Bahr el Abyad': 'Valkoinen Niili',
  'El Bahr el Azraq': 'Sininen Niili',
  Abay: 'Sininen Niili',
  Congo: 'Kongo',
  Danube: 'Tonava',
  Donau: 'Tonava',
  Yangtze: 'Jangtse',
  'Chang Jiang': 'Jangtse',
  Jinsha: 'Jangtse',
  Tongtian: 'Jangtse',
  Tuotuo: 'Jangtse',
  Yenisey: 'Jenisei',
  'Verkhniy Yenisey': 'Jenisei',
  'Malyy Yenisey': 'Pieni Jenisei',
  Rhine: 'Rein',
  Rhein: 'Rein',
  Rhin: 'Rein',
  Huang: 'Huanghe',
  Mekong: 'Mekong',
  Lancang: 'Mekong',
  Irtysh: 'Irtysh',
  Ertis: 'Irtysh',
  Ertix: 'Irtysh',
  Euphrates: 'Eufrat',
  'Al Furat': 'Eufrat',
  Firat: 'Eufrat',
  Dicle: 'Tigris',
  Dnipro: 'Dnepr',
  Dnepre: 'Dnepr',
  Dniester: 'Dnestr',
  Vistula: 'Veiksel',
  Zambezi: 'Sambesi',
  Pechora: 'Petšora',
  'Severnaya Dvina': 'Vienanjoki',
  Ayeyarwady: 'Irrawaddy',
  Salween: 'Salween',
  Nu: 'Salween',
  'Heilong Jiang': 'Amur',
  Yarlung: 'Brahmaputra',
  Dihang: 'Brahmaputra',
  Sénégal: 'Senegal',
  Tejo: 'Tajo',
  Godävari: 'Godavari',
  'Argun’': 'Argun',
  'Olenëk': 'Olenjok',
  'Tom’': 'Tom',
  'Anadyr’': 'Anadyr',
  'Rosetta Branch': 'Niili',
  'Damietta Branch': 'Niili',
};

const JARVINIMET = {
  'Lake Superior': 'Yläjärvi',
  'Lake Huron': 'Huronjärvi',
  'Lake Michigan': 'Michiganjärvi',
  'Lake Erie': 'Eriejärvi',
  'Lake Ontario': 'Ontariojärvi',
  'Lake Victoria': 'Victoriajärvi',
  'Lake Baikal': 'Baikal',
  'Lake Tanganyika': 'Tanganjika',
  'Lake Malawi': 'Malawijärvi',
  'Lake Ladoga': 'Laatokka',
  'Lake Onega': 'Ääninen',
  'Lake Saimaa': 'Saimaa',
  'Lake Chad': 'Tšadjärvi',
  'Lago Titicaca': 'Titicaca',
  'Lake Turkana': 'Turkanajärvi',
  'Lago de Nicaragua': 'Nicaraguajärvi',
  'Lake Peipus': 'Peipsijärvi',
  'Lake Winnipeg': 'Winnipegjärvi',
  'Lake Albert': 'Albertjärvi',
  'North Aral Sea': 'Pohjois-Araljärvi',
  'South Aral Sea': 'Etelä-Araljärvi',
  'Lake Urmia': 'Urmiajärvi',
  'Lake Vygozero': 'Vigjärvi',
};

/* Nämä kuuluvat mukaan pinta-alasijoituksesta riippumatta. */
const JARVI_PAKOLLISET = ['North Aral Sea', 'South Aral Sea', 'Lake Turkana', 'Lake Chad'];

/* ------------------------------------------------------------------ */
/* zip                                                                 */
/* ------------------------------------------------------------------ */

function lueZip(buf) {
  let eocd = -1;
  for (let i = buf.length - 22; i >= 0 && i > buf.length - 70000; i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error('zip: keskushakemiston loppua ei löytynyt');
  const maara = buf.readUInt16LE(eocd + 10);
  let off = buf.readUInt32LE(eocd + 16);
  const tiedostot = new Map();
  for (let k = 0; k < maara; k++) {
    if (buf.readUInt32LE(off) !== 0x02014b50) throw new Error('zip: keskushakemisto rikki');
    const menetelma = buf.readUInt16LE(off + 10);
    const pakattu = buf.readUInt32LE(off + 20);
    const nimiPit = buf.readUInt16LE(off + 28);
    const lisaPit = buf.readUInt16LE(off + 30);
    const kommPit = buf.readUInt16LE(off + 32);
    const paikOff = buf.readUInt32LE(off + 42);
    const nimi = buf.toString('utf8', off + 46, off + 46 + nimiPit);
    const pNimiPit = buf.readUInt16LE(paikOff + 26);
    const pLisaPit = buf.readUInt16LE(paikOff + 28);
    const alku = paikOff + 30 + pNimiPit + pLisaPit;
    const raaka = buf.subarray(alku, alku + pakattu);
    tiedostot.set(nimi, menetelma === 0 ? Buffer.from(raaka) : inflateRawSync(raaka));
    off += 46 + nimiPit + lisaPit + kommPit;
  }
  return tiedostot;
}

/* ------------------------------------------------------------------ */
/* shapefile ja dbf                                                    */
/* ------------------------------------------------------------------ */

const VIIVA_TAI_ALUE = new Set([3, 5, 13, 15, 23, 25]);

function lueShp(buf) {
  const muodot = [];
  let p = 100;
  while (p + 8 <= buf.length) {
    const pituus = buf.readInt32BE(p + 4) * 2;
    const c = p + 8;
    const tyyppi = buf.readInt32LE(c);
    const osat = [];
    if (VIIVA_TAI_ALUE.has(tyyppi)) {
      const osia = buf.readInt32LE(c + 36);
      const pisteita = buf.readInt32LE(c + 40);
      const osaOff = c + 44;
      const pisteOff = osaOff + osia * 4;
      for (let i = 0; i < osia; i++) {
        const a = buf.readInt32LE(osaOff + i * 4);
        const b = i + 1 < osia ? buf.readInt32LE(osaOff + (i + 1) * 4) : pisteita;
        const rivi = [];
        for (let j = a; j < b; j++) {
          rivi.push([buf.readDoubleLE(pisteOff + j * 16), buf.readDoubleLE(pisteOff + j * 16 + 8)]);
        }
        osat.push(rivi);
      }
    }
    muodot.push({ tyyppi, osat });
    p = c + pituus;
  }
  return muodot;
}

function lueDbf(buf) {
  const maara = buf.readInt32LE(4);
  const otsake = buf.readInt16LE(8);
  const tietue = buf.readInt16LE(10);
  const kentat = [];
  let p = 32;
  while (buf[p] !== 0x0d && p < otsake) {
    kentat.push({
      nimi: buf.toString('latin1', p, p + 11).replace(/\0.*$/, ''),
      tyyppi: String.fromCharCode(buf[p + 11]),
      pituus: buf[p + 16],
    });
    p += 32;
  }
  const rivit = [];
  for (let i = 0; i < maara; i++) {
    let o = otsake + i * tietue + 1;
    const r = {};
    for (const k of kentat) {
      const teksti = buf.toString('utf8', o, o + k.pituus).replace(/\0/g, '').trim();
      r[k.nimi] = (k.tyyppi === 'N' || k.tyyppi === 'F')
        ? (teksti === '' ? null : Number(teksti))
        : teksti;
      o += k.pituus;
    }
    rivit.push(r);
  }
  return rivit;
}

/* ------------------------------------------------------------------ */
/* geometria                                                           */
/* ------------------------------------------------------------------ */

function etaisyys2(p, a, b) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  if (dx === 0 && dy === 0) return (p[0] - a[0]) ** 2 + (p[1] - a[1]) ** 2;
  let t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy);
  t = Math.max(0, Math.min(1, t));
  return (p[0] - (a[0] + t * dx)) ** 2 + (p[1] - (a[1] + t * dy)) ** 2;
}

/* Ramer-Douglas-Peucker. Pinona, ettei syvyys pääse loppumaan. */
function rdp(pisteet, tol) {
  if (pisteet.length < 3) return pisteet.slice();
  const raja = tol * tol;
  const pida = new Uint8Array(pisteet.length);
  pida[0] = 1;
  pida[pisteet.length - 1] = 1;
  const pino = [[0, pisteet.length - 1]];
  while (pino.length) {
    const [a, b] = pino.pop();
    let paras = -1;
    let suurin = 0;
    for (let i = a + 1; i < b; i++) {
      const d = etaisyys2(pisteet[i], pisteet[a], pisteet[b]);
      if (d > suurin) { suurin = d; paras = i; }
    }
    if (suurin > raja && paras > 0) {
      pida[paras] = 1;
      pino.push([a, paras], [paras, b]);
    }
  }
  return pisteet.filter((_, i) => pida[i]);
}

const pituus = (v) => {
  let s = 0;
  for (let i = 1; i < v.length; i++) s += Math.hypot(v[i][0] - v[i - 1][0], v[i][1] - v[i - 1][1]);
  return s;
};

/* Pallopinta-ala neliökilometreinä. Astealalla Siperia näyttäisi jättimäiseltä. */
function palloAla(rengas) {
  const R = 6371;
  let s = 0;
  for (let i = 0, j = rengas.length - 1; i < rengas.length; j = i++) {
    const [x1, y1] = rengas[j];
    const [x2, y2] = rengas[i];
    s += ((x2 - x1) * Math.PI / 180)
      * (Math.sin(y1 * Math.PI / 180) + Math.sin(y2 * Math.PI / 180));
  }
  return Math.abs(s * R * R / 2);
}

/* Liittää päätepisteistään yhteen osuvat jaksot yhdeksi viivaksi. */
function ketjuta(osat, eps) {
  const jaljella = osat.filter((o) => o.length > 1).map((o) => o.slice());
  const ketjut = [];
  while (jaljella.length) {
    let ketju = jaljella.pop();
    let jatkui = true;
    while (jatkui) {
      jatkui = false;
      for (let i = 0; i < jaljella.length; i++) {
        const o = jaljella[i];
        const a = ketju[0];
        const b = ketju[ketju.length - 1];
        const lahella = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]) <= eps;
        if (lahella(b, o[0])) ketju = ketju.concat(o.slice(1));
        else if (lahella(b, o[o.length - 1])) ketju = ketju.concat(o.slice(0, -1).reverse());
        else if (lahella(a, o[o.length - 1])) ketju = o.slice(0, -1).concat(ketju);
        else if (lahella(a, o[0])) ketju = o.slice(1).reverse().concat(ketju);
        else continue;
        jaljella.splice(i, 1);
        jatkui = true;
        break;
      }
    }
    ketjut.push(ketju);
  }
  return ketjut;
}

/*
 * ══ UOMAN SILOTUS: SIKSAKIT POIS JOKIVIIVASTA ════════════════════════
 *
 * Omistaja 19.9.2026 klo 23.34 Suomen aikaa (iPad, Ranskan maalehti,
 * Seine Rouenin ja Pariisin välillä): jokiviivassa on teräviä piikkejä
 * ja siksakkeja, kapeita kolmioita, joissa viiva palaa samaa reittiä.
 *
 * JUURISYY ON HARVENNUS, EI AINEISTO (mittaus 20.9.2026, Opus 2:n erä
 * maalehti-viivat, raportti docs/raportit/viesti-fable-maalehti-viivat-
 * 20260920.md). Ramer–Douglas–Peucker on JÄNNEVIRHEEN yksinkertaistin:
 * voimakkaasti meanderoivalla joella se säilyttää vain mutkien kärjet
 * ja pudottaa kaiken niiden väliltä, jolloin kaksi peräkkäistä
 * jäljelle jäävää pistettä ovat meanderirivin vastakkaisilla reunoilla
 * — viiva kääntyy lähes 180°. Seinen mutka-amplitudi on juuri yli
 * vanhan toleranssin (0,07°), Loiren selvästi alle; siksi vika näkyi
 * Seinellä eikä Loirella. Mitattuna Seine: raaka ketju 353 pistettä ja
 * 1 piikki → RDP 0,07° 21 pistettä ja 8 piikkiä.
 *
 * PYÖRISTYS OLI TOINEN PUOLI. `toFixed(1)` on 0,1° eli noin 11 km —
 * KARKEAMPI kuin RDP:n oma toleranssi, joten se heitti säilytettyjä
 * kärkiä jänteen toiselle puolelle ja teki lisää piikkejä (mitattuna
 * 201 piikkiä pelkästä pyöristyksestä siistiin geometriaan).
 *
 * KOLME MUUTOSTA YHDESSÄ (mitatut vaihtoehdot raportissa):
 *   1. `silota` ennen harvennusta poistaa meanderin korkeataajuuden,
 *      jolloin RDP valitsee kärkensä sileästä uomasta;
 *   2. toleranssi 0,04°, koska silotus on jo pienentänyt pistemäärää;
 *   3. `poistaPiikit` pudottaa vielä yli PIIKIN_KULMA:n käännökset, ja
 *      pyöristys on 0,001° (noin 100 m) eli tarkempi kuin toleranssi.
 * Tulos: 0 kulmapiikkiä koko aineistossa (oli 372).
 */
/** Liukuva keskiarvo; päätepisteet pysyvät paikallaan. */
const SILOTUS_IKKUNA = 5;
function silota(v, ikkuna = SILOTUS_IKKUNA) {
  if (v.length < 3) return v;
  const puoli = Math.floor(ikkuna / 2);
  return v.map(([x, y], i) => {
    if (i === 0 || i === v.length - 1) return [x, y];
    let sx = 0; let sy = 0; let n = 0;
    for (let j = Math.max(0, i - puoli); j <= Math.min(v.length - 1, i + puoli); j += 1) {
      sx += v[j][0]; sy += v[j][1]; n += 1;
    }
    return [sx / n, sy / n];
  });
}

/** Käännös tätä jyrkemmin on piikki eikä mutka. */
const PIIKIN_KULMA = 120;
/** Pudottaa kärjet, joissa viiva kääntyy yli PIIKIN_KULMA:n. */
function poistaPiikit(v) {
  let ulos = v;
  for (let kierros = 0; kierros < 5; kierros += 1) {
    const jaljella = [ulos[0]];
    let pudotettu = 0;
    for (let i = 1; i < ulos.length - 1; i += 1) {
      const a = jaljella[jaljella.length - 1];
      const b = ulos[i];
      const c = ulos[i + 1];
      const k1 = Math.atan2(b[1] - a[1], b[0] - a[0]);
      const k2 = Math.atan2(c[1] - b[1], c[0] - b[0]);
      let ero = Math.abs((k2 - k1) * 180) / Math.PI;
      if (ero > 180) ero = 360 - ero;
      if (ero > PIIKIN_KULMA) { pudotettu += 1; continue; }
      jaljella.push(b);
    }
    jaljella.push(ulos[ulos.length - 1]);
    ulos = jaljella;
    if (!pudotettu) break;
  }
  return ulos;
}

const pyorista = (v) => v.map(([x, y]) => [Number(x.toFixed(3)), Number(y.toFixed(3))]);

function poistaToistot(v) {
  const ulos = [v[0]];
  for (let i = 1; i < v.length; i++) {
    const e = ulos[ulos.length - 1];
    if (v[i][0] !== e[0] || v[i][1] !== e[1]) ulos.push(v[i]);
  }
  return ulos;
}

/* ------------------------------------------------------------------ */
/* nouto                                                               */
/* ------------------------------------------------------------------ */

async function nouda(nimi) {
  if (!existsSync(VALIMUISTI)) mkdirSync(VALIMUISTI, { recursive: true });
  const polku = join(VALIMUISTI, `${nimi}.zip`);
  if (existsSync(polku)) return readFileSync(polku);
  const url = `https://naciscdn.org/naturalearth/10m/physical/${nimi}.zip`;
  process.stderr.write(`nouto ${url}\n`);
  const v = await fetch(url);
  if (!v.ok) throw new Error(`${url} -> ${v.status}`);
  const buf = Buffer.from(await v.arrayBuffer());
  writeFileSync(polku, buf);
  return buf;
}

async function taso(nimi) {
  const z = lueZip(await nouda(nimi));
  return { tiedot: lueDbf(z.get(`${nimi}.dbf`)), muodot: lueShp(z.get(`${nimi}.shp`)) };
}

/* ------------------------------------------------------------------ */
/* joet                                                                */
/* ------------------------------------------------------------------ */

function haeJoet({ tiedot, muodot }) {
  /*
   * Joen alajuoksu on aineistossa toisinaan eri jaksona ja korkeammalla
   * scalerankillä kuin yläjuoksu: Mississippin ylin jakso on 5, Mackenzien
   * ja Angaran samoin. Jos katsottaisiin vain jakson omaa arvoa, joet
   * katkeaisivat kesken. Siksi nimen paras arvo ratkaisee, ja saman nimen
   * muut jaksot pääsevät mukaan arvoon 6 asti.
   */
  const paras = new Map();
  for (const r of tiedot) {
    if (!r.name) continue;
    paras.set(r.name, Math.min(paras.get(r.name) ?? 99, r.scalerank));
  }
  const kelpaa = (r) => r.name
    && !POIS.some((p) => p.test(r.name))
    && (r.scalerank <= JOKI_SCALERANK
      || LISAKSI.has(r.name)
      || (paras.get(r.name) <= JOKI_SCALERANK && r.scalerank <= JOKI_SCALERANK + 2));

  const ryhmat = new Map();
  tiedot.forEach((r, i) => {
    if (!kelpaa(r)) return;
    const nimi = NIMET[r.name] || r.name;
    if (!ryhmat.has(nimi)) ryhmat.set(nimi, []);
    ryhmat.get(nimi).push(...muodot[i].osat);
  });

  const joet = [];
  for (const [nimi, osat] of ryhmat) {
    /*
     * Pisin ketju on itse joki ja se piirretään aina. Loput ovat
     * sivuhaaroja ja suiston uomia: ne piirretään vain jos ne ovat sen
     * mittaisia, että ne erottuvat. Muuten suistot jättävät kartalle
     * kourallisen kolmen pisteen tikkuja.
     */
    const ketjut = ketjuta(osat, KETJU_EPS)
      .map((k) => ({ k, p: pituus(k) }))
      .sort((a, b) => b.p - a.p);
    ketjut.forEach(({ k, p }, i) => {
      if (p < (i === 0 ? LYHIN_JOKI : LYHIN_SIVU)) return;
      // Piikkisuodatin AJETAAN PYÖRISTYKSEN JÄLKEEN: pyöristys siirtää
      // kärkiä ja voi tehdä uuden piikin (mitattu 2 kpl, Arkansas ja Kama).
      const pisteet = poistaPiikit(poistaToistot(pyorista(rdp(silota(k), JOKI_TOLERANSSI))));
      if (pisteet.length >= 2) joet.push({ nimi, pisteet });
    });
  }
  joet.sort((a, b) => a.nimi.localeCompare(b.nimi, 'fi') || b.pisteet.length - a.pisteet.length);
  return joet;
}

/* ------------------------------------------------------------------ */
/* järvet                                                              */
/* ------------------------------------------------------------------ */

function haeJarvet({ tiedot, muodot }) {
  const ehdokkaat = [];
  tiedot.forEach((r, i) => {
    if (r.featurecla !== 'Lake' && r.featurecla !== 'Alkaline Lake') return;
    if (!r.name) return;
    // Suurin rengas on järven ulkoreuna; loput ovat saaria ja lampareita.
    let suurin = null;
    let ala = 0;
    for (const rengas of muodot[i].osat) {
      const a = palloAla(rengas);
      if (a > ala) { ala = a; suurin = rengas; }
    }
    if (suurin) ehdokkaat.push({ nimi: r.name, rengas: suurin, ala });
  });
  ehdokkaat.sort((a, b) => b.ala - a.ala);

  const valitut = ehdokkaat.slice(0, JARVIA);
  for (const p of JARVI_PAKOLLISET) {
    if (valitut.some((v) => v.nimi === p)) continue;
    const loyty = ehdokkaat.find((v) => v.nimi === p);
    if (loyty) valitut.push(loyty);
  }
  return valitut;
}

/* Kaspianmeri on Natural Earthissä osa merta, ei järviaineistoa. */
function haeKaspia({ muodot }) {
  let paras = null;
  let ala = 0;
  for (const rengas of muodot[0].osat) {
    let x0 = 1e9; let x1 = -1e9; let y0 = 1e9; let y1 = -1e9;
    for (const [x, y] of rengas) {
      x0 = Math.min(x0, x); x1 = Math.max(x1, x);
      y0 = Math.min(y0, y); y1 = Math.max(y1, y);
    }
    if (x0 < 45 || x1 > 58 || y0 < 35 || y1 > 48) continue;
    const a = palloAla(rengas);
    if (a > ala) { ala = a; paras = rengas; }
  }
  if (!paras) throw new Error('Kaspianmerta ei löytynyt merialueesta');
  return { nimi: 'Kaspianmeri', rengas: paras, ala };
}

/* ------------------------------------------------------------------ */
/* kirjoitus                                                           */
/* ------------------------------------------------------------------ */

function muotoile(v) {
  return `[${v.map(([x, y]) => `[${x},${y}]`).join(',')}]`;
}

/* Repon tyyli on heittomerkki. N'Mai ja muut vaativat kenoviivan. */
const lainaa = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

async function main() {
  const joetTaso = await taso('ne_10m_rivers_lake_centerlines');
  const jarvetTaso = await taso('ne_10m_lakes');
  const meri = await taso('ne_10m_ocean');

  const joet = haeJoet(joetTaso);

  const jarviRaaka = haeJarvet(jarvetTaso);
  jarviRaaka.push(haeKaspia(meri));
  jarviRaaka.sort((a, b) => b.ala - a.ala);

  const jarvet = jarviRaaka.map((j) => {
    let rengas = poistaToistot(pyorista(rdp(j.rengas, JARVI_TOLERANSSI)));
    // Suljettu monikulmio: ensimmäinen ja viimeinen piste eivät saa jäädä kahdesti.
    if (rengas.length > 1
        && rengas[0][0] === rengas[rengas.length - 1][0]
        && rengas[0][1] === rengas[rengas.length - 1][1]) rengas = rengas.slice(0, -1);
    return { nimi: JARVINIMET[j.nimi] || j.nimi, rengas };
  }).filter((j) => j.rengas.length >= 3);

  const rivit = [];
  rivit.push('// Maailman merkittävimmät joet ja suurimmat järvet asteina [lon, lat].');
  rivit.push('//');
  rivit.push('// TÄMÄ TIEDOSTO ON KONEEN KIRJOITTAMA. Älä muokkaa käsin, vaan aja');
  rivit.push('//   NODE_USE_ENV_PROXY=1 node tools/hae-vedet.mjs');
  rivit.push('//');
  rivit.push('// LÄHDE   Natural Earth 10m, ne_10m_rivers_lake_centerlines ja');
  rivit.push('//         ne_10m_lakes. Kaspianmeri ei ole järviaineistossa lainkaan,');
  rivit.push('//         vaan se on poimittu ne_10m_ocean-tason osasta.');
  rivit.push('// LISENSSI Public domain. Natural Earth ei vaadi mainintaa, mutta se');
  rivit.push('//         kuuluu asiaan: naturalearthdata.com.');
  rivit.push('//');
  rivit.push(`// KARSINTA Joista mukaan pääsevät scalerank <= ${JOKI_SCALERANK} sekä ${LISAKSI.size} nimeltä`);
  rivit.push('//         kelpuutettua tunnettua jokea, joiden scalerank on aineistossa');
  rivit.push('//         5-6 (Don, Rhône, Po, Colorado, Elbe ja muut vastaavat).');
  rivit.push('//         Suistohaarat ja kanavat on pudotettu, ja saman joen eri');
  rivit.push('//         kieliset jaksot (Danube/Donau, Chang Jiang/Jinsha) on');
  rivit.push('//         yhdistetty yhdeksi viivaksi. 1473 uomasta jää näin murto-osa:');
  rivit.push('//         maailmankartta menee tukkoon, jos joet piirretään kaikki.');
  rivit.push(`//         Järvistä otetaan ${JARVIA} suurinta pallopinta-alan mukaan (ei`);
  rivit.push('//         astealan - muuten pohjoiset järvet näyttäisivät jättimäisiltä),');
  rivit.push('//         tekojärviä ei lainkaan, ja lisäksi Aral, Turkana ja Tšad.');
  rivit.push(`// TOLERANSSI Ramer-Douglas-Peucker ${JOKI_TOLERANSSI} astetta joille ja`);
  rivit.push(`//         ${JARVI_TOLERANSSI} astetta järville. Koordinaatit yhden desimaalin`);
  rivit.push('//         tarkkuudella, mikä riittää maailmankartan mittakaavassa.');
  rivit.push('//');
  rivit.push('// Joki on avoin viiva, järvi suljettu monikulmio: rengas EI toista');
  rivit.push('// ensimmäistä pistettä lopussa. Projisoinnin tekee kutsuja.');
  rivit.push('');
  rivit.push('export const JOET = [');
  for (const j of joet) rivit.push(`  { nimi: ${lainaa(j.nimi)}, pisteet: ${muotoile(j.pisteet)} },`);
  rivit.push('];');
  rivit.push('');
  rivit.push('export const JARVET = [');
  for (const j of jarvet) rivit.push(`  { nimi: ${lainaa(j.nimi)}, rengas: ${muotoile(j.rengas)} },`);
  rivit.push('];');
  rivit.push('');

  const ulos = join(JUURI, 'js', 'packs', 'maasto-vedet.js');
  const teksti = rivit.join('\n');
  writeFileSync(ulos, teksti);

  const jokiPisteet = joet.reduce((a, j) => a + j.pisteet.length, 0);
  const jarviPisteet = jarvet.reduce((a, j) => a + j.rengas.length, 0);
  process.stderr.write(`${ulos}\n`);
  process.stderr.write(`joet ${joet.length} (${jokiPisteet} pistettä), `
    + `järvet ${jarvet.length} (${jarviPisteet} pistettä), `
    + `${(Buffer.byteLength(teksti) / 1024).toFixed(1)} kt\n`);
}

main().catch((e) => { process.stderr.write(`${e.stack}\n`); process.exit(1); });
