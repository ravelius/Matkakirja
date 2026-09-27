/*
 * GSHHG (full) → järvet ne_10m_lakes.geojson-muodossa.
 *
 *   node tools/gshhs-jarvet.mjs --gshhs=<gshhs_f.b> --ulos=<kansio> [--pienin=0.004] [--askel=0.0005]
 *
 * EUROOPAN LAATUKIERROS 27.9.2026 (docs/raportit/karttaseppa-eurooppa-laatu-20260927.md,
 * N3): meri tulee GSHHG full -aineistosta (tools/gshhs-meri.mjs), mutta järvet
 * yhä Natural Earthin 1:10m-aineistosta. Siitä puuttuu kokonaan mm. Étang de
 * Berre, Müggelsee, Albano, Markermeer ja Trasimeno, ja loput ovat 4–6 km:n
 * janoja (Tampereen järvet). Sama periaate kuin merellä: tarkempi lähde
 * vaihdetaan KIRJOITTAMALLA SAMANNIMINEN TIEDOSTO omaan aineistokansioonsa,
 * joten yksikään lukija (maailma.mjs `jarvet`) ei muutu.
 *
 * MITÄ MUKAAN: taso 2 (järvi) paitsi Kaspianmeri (se on merirenkaissa,
 * gshhs-meri.mjs), ja kunkin järven sisällä olevat tason 3 saaret
 * (container = järven id) saman monikulmion sisärenkaina — piirto
 * täyttää parillisuussäännöllä (maailmapiirto.js `fill('evenodd')`),
 * joten saari jää maaksi. Tason 4 lammet saarilla jäävät pois.
 *
 * KARSINTA: alle `pienin` asteen laajuiset järvet ja saaret pois
 * (oletus 0,004° ≈ 400 m ≈ 12 px z10:llä). Pikselikoon mukainen karsinta
 * tasoittain on piirron asia (generoi-laattapyramidi --jarvi-pienin-px),
 * koska sama tiedosto palvelee kaikkia tasoja.
 */
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  lueGshhs, normalisoi, harvenna, pyorista,
} from './gshhs-lue.mjs';

const arg = (n, d) => (process.argv.find((a) => a.startsWith(`--${n}=`))?.split('=')[1] ?? d);
const LAHDE = arg('gshhs', null);
const ULOS = arg('ulos', null);
const PIENIN = Number(arg('pienin', '0.004'));
const ASKEL = Number(arg('askel', '0.0005'));
const laajuus = (m) => Math.max(m.laajuus.e - m.laajuus.w, m.laajuus.n - m.laajuus.s);
const renkaaksi = (m) => {
  const r = [];
  for (let i = 0; i < m.n; i += 1) r.push([m.pisteet[i * 2], m.pisteet[i * 2 + 1]]);
  return r;
};

/**
 * Järvet GeoJSON-piirteiksi. Puhdas funktio (testattava ilman binääriä).
 * @param {Array<{id:number,taso:number,n:number,laajuus:object,container:number,pisteet:Float64Array}>} monikulmiot
 */
export function jarviPiirteet(monikulmiot, { pienin = PIENIN, askel = ASKEL } = {}) {
  const tilasto = { jarvia: 0, saaria: 0, pienetPois: 0, kaspia: 0 };
  // Kaspianmeri: sama tunnistus kuin gshhs-meri.mjs (laatikko sisältää 51°E 42°N, suurin).
  let kaspia = null;
  for (const m of monikulmiot) {
    const { w, e, s, n } = m.laajuus;
    if (m.taso === 2 && w <= 51 && e >= 51 && s <= 42 && n >= 42 && (!kaspia || m.n > kaspia.n)) kaspia = m;
  }
  const saaret = new Map();
  for (const m of monikulmiot) {
    if (m.taso !== 3) continue;
    if (laajuus(m) < pienin) { tilasto.pienetPois += 1; continue; }
    if (!saaret.has(m.container)) saaret.set(m.container, []);
    saaret.get(m.container).push(m);
  }
  const piirteet = [];
  for (const m of monikulmiot) {
    if (m.taso !== 2 || m === kaspia) { if (m === kaspia) tilasto.kaspia = 1; continue; }
    if (laajuus(m) < pienin) { tilasto.pienetPois += 1; continue; }
    // Päivämääränrajan ylittävä järvi halkeaa osiin; saaret liitetään
    // siihen osaan, jonka pituusasteväliin ne osuvat.
    const osat = normalisoi(renkaaksi(m)).map((o) => harvenna(o, askel)).filter((o) => o.length > 2);
    const saarirenkaat = (saaret.get(m.id) ?? []).flatMap((sm) => normalisoi(renkaaksi(sm))
      .map((o) => harvenna(o, askel)).filter((o) => o.length > 2));
    for (const osa of osat) {
      let l0 = Infinity; let l1 = -Infinity;
      for (const [lon] of osa) { if (lon < l0) l0 = lon; if (lon > l1) l1 = lon; }
      const sisa = saarirenkaat.filter((r) => r[0][0] >= l0 && r[0][0] <= l1);
      tilasto.saaria += sisa.length;
      const suljettu = (r) => [...r.map(([lon, lat]) => [pyorista(lon), pyorista(lat)]), [pyorista(r[0][0]), pyorista(r[0][1])]];
      piirteet.push({
        type: 'Feature',
        properties: { name: '', gshhs: m.id },
        geometry: { type: 'Polygon', coordinates: [suljettu(osa), ...sisa.map(suljettu)] },
      });
    }
    tilasto.jarvia += 1;
  }
  return { piirteet, tilasto };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  if (!LAHDE || !ULOS) {
    console.error('anna --gshhs=<gshhs_f.b> --ulos=<kansio>');
    process.exit(2);
  }
  const buf = readFileSync(LAHDE);
  const sha = createHash('sha256').update(buf).digest('hex');
  const { piirteet, tilasto } = jarviPiirteet(lueGshhs(buf));
  mkdirSync(ULOS, { recursive: true });
  writeFileSync(join(ULOS, 'ne_10m_lakes.geojson'), JSON.stringify({ type: 'FeatureCollection', features: piirteet }));
  const lahde = {
    lahde: 'GSHHG 2.3.7 full (gshhs_f.b) taso 2 + 3, Wessel & Smith, LGPL 3+',
    sha256: sha, pienin: PIENIN, askel: ASKEL, tilasto,
    huomautus: 'ne_10m_lakes.geojson = GSHHG-järvet Natural Earthin järvimuodossa (tools/gshhs-jarvet.mjs).',
  };
  writeFileSync(join(ULOS, 'lahde-jarvet.json'), `${JSON.stringify(lahde, null, 2)}\n`);
  console.log(JSON.stringify(lahde, null, 2));
}
