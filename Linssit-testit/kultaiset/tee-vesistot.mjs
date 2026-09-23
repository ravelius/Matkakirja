// Vesistölinssin kultaiset arvot (js/linssit/vesistot.js vesistotPallolle,
// katkaiseSauma, tihennaKaarella, LINSSI.selite).
//
// 1. Kopioi sisältöpaketista testien pakettitiedostot paketti/-kansioon
//    KARSITTUINA (vain kentät, joita vesistotPallolle lukee: maastosta jarvet ja
//    joet, nimistä jokien avain, nimi, tarkeys, pituus ja pisteet), jotta
//    testiaineisto pysyy kohtuullisena (~220 kt, alkuperäiset ~300 kt).
// 2. Ajaa webin vesistotPallolle SAMOILLA karsituilla tiedostoilla ja laudan
//    asteistuksella js/fokusmitat.js laudaltaAsteiksi('maailmankartta', x, y).
// 3. Kirjoittaa vesistot.json: määrät, värit, paksuudet, korkeudet ja
//    otospisteet (C# vertaa toleranssilla 1e-9).
//
// Käyttö: node tee-vesistot.mjs [pelin checkout] [sisältöpaketti]
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const tama = dirname(fileURLToPath(import.meta.url));
const juuri = process.argv[2] ?? '/Users/Shared/Claude/Matkakirja-linssiseppa';
const paketti = process.argv[3] ?? '/Users/Shared/Claude/sisalto-koe/v2';
const V = await import(join(juuri, 'js/linssit/vesistot.js'));
const { laudaltaAsteiksi } = await import(join(juuri, 'js/fokusmitat.js'));

const lue = (p) => JSON.parse(readFileSync(join(paketti, p), 'utf8'));
const kirjoita = (nimi, olio) => writeFileSync(join(tama, 'paketti', nimi), JSON.stringify(olio));

// ── 1. Karsitut pakettitiedostot ─────────────────────────────────────────
const maastoModuuli = lue('moduulit/js/packs/maailmankartta-maasto.json');
const m = maastoModuuli.exportit.MAAILMANKARTAN_MAASTO;
kirjoita('maailmankartta-maasto.json', {
  ...maastoModuuli,
  exportit: { MAAILMANKARTAN_MAASTO: { jarvet: m.jarvet, joet: m.joet } },
});
const nimiModuuli = lue('moduulit/js/packs/maailmankartta-nimet.json');
const n = nimiModuuli.exportit.MAAILMANKARTAN_NIMET;
const kentat = ['avain', 'nimi', 'tarkeys', 'pituus', 'pisteet'];
kirjoita('maailmankartta-nimet.json', {
  ...nimiModuuli,
  exportit: {
    MAAILMANKARTAN_NIMET: {
      joet: n.joet.map((j) => Object.fromEntries(kentat.filter((k) => k in j).map((k) => [k, j[k]]))),
    },
  },
});
const linssiModuuli = lue('moduulit/js/linssit/vesistot.json');
kirjoita('vesistot.json', linssiModuuli);

// ── 2. Web-muunnos karsitulla aineistolla ────────────────────────────────
const maasto = JSON.parse(readFileSync(join(tama, 'paketti/maailmankartta-maasto.json'), 'utf8'))
  .exportit.MAAILMANKARTAN_MAASTO;
const nimet = JSON.parse(readFileSync(join(tama, 'paketti/maailmankartta-nimet.json'), 'utf8'))
  .exportit.MAAILMANKARTAN_NIMET;
const asteet = (k) => laudaltaAsteiksi('maailmankartta', k.x, k.y);
const tulos = V.vesistotPallolle({ maasto, nimet }, asteet);

// Otospisteet: päät, kolmannes, puoliväli ja joka 11. piste.
const otos = (lista) => {
  const ind = new Set([0, Math.floor(lista.length / 3), Math.floor(lista.length / 2), lista.length - 1]);
  for (let i = 0; i < lista.length; i += 11) ind.add(i);
  return [...ind].sort((a, b) => a - b).map((i) => [i, lista[i][0], lista[i][1]]);
};

const polut = tulos.polut.map((d) => ({
  avain: d.avain, nimi: d.nimi, tarkeys: d.tarkeys ?? null, vari: d.vari, paksuus: d.paksuus,
  korkeus: d.korkeus, n: d.pisteet.length, otos: otos(d.pisteet),
}));
// Polygonin rengas on GeoJSON [lng, lat]; otos käännetään [lat, lng]-muotoon.
const polygonit = tulos.polygonit.map((d) => {
  const rengas = d.geometry.coordinates[0].map(([lng, lat]) => [lat, lng]);
  return {
    avain: d.avain, nimi: d.nimi, vari: d.vari, reuna: d.reuna, korkeus: d.korkeus,
    n: rengas.length, otos: otos(rengas),
  };
});

// Sauma ja tihennys keinotekoisilla poluilla (aineistossa ei ole saumaa).
const sauma = [
  [[0, 170], [1, 179], [2, -179], [3, -170]],
  [[0, 10], [1, 20]],
  [[0, 170], [1, -170], [2, 170], [3, 175]],
  [[5, 5]],
].map((p) => ({ sisaan: p, ulos: V.katkaiseSauma(p) }));
const tihennys = [
  [[0, 0], [0, 2]],
  [[0, 0], [0, 2.0000001]],
  [[60, 10], [50, 30], [51, 31]],
  [[-10, 170], [10, -175]],
].map((p) => ({ sisaan: p, ulos: V.tihennaKaarella(p) }));

writeFileSync(join(tama, 'vesistot.json'), JSON.stringify({
  vakiot: {
    uomaPx: V.PALLON_UOMA_PX, pengerPx: V.PALLON_PENGER_PX, jarvenKorkeus: V.JARVEN_KORKEUS,
    uomanKorkeus: V.UOMAN_KORKEUS, tihennys: V.TIHENNYS_AST, nimienKatto: V.VESINIMIEN_KATTO,
  },
  maarat: {
    jarvet: tulos.polygonit.length,
    penkat: tulos.polut.filter((d) => d.avain.startsWith('penger:')).length,
    uomat: tulos.polut.filter((d) => d.avain.startsWith('uoma:')).length,
    nimet: tulos.nimet.length,
    pisteet: tulos.polut.reduce((s, d) => s + d.pisteet.length, 0),
  },
  polut,
  polygonit,
  nimet: tulos.nimet.map((d) => ({ avain: d.avain, teksti: d.teksti, tarkeys: d.tarkeys, lat: d.lat, lng: d.lng })),
  sauma,
  tihennys,
  selite: V.LINSSI.selite(),
}));
console.log(`vesistot.json: ${polygonit.length} järveä, ${polut.length} polkua, ${tulos.nimet.length} nimeä`);
