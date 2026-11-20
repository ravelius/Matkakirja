/*
 * NOSTOKUVAT (skeema 1.75; Pelikoodari 17.11.2026, omistaja 23.24 "kuvien näyttäminen kaikkiin nostoihin", KK 23.2x).
 * Jokaisella nostolla on vientipaketissa `nostokuvat` = [{ osoite, lyhyt, laji, lahde, lisenssi, mista }] datassa jo olevista
 * kuvista (tools/vienti/nostokuvat.mjs): ensin noston omat, sitten kohde, sitten nähtävyysjuttu; sama osoite kerran; osoite on
 * sama vientiosoite kuin muualla paketissa. Testi kokoaa paketin kuten vienti ja tarkistaa sen, mitä natiivi lukee.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { kokoaVienti } from '../tools/vienti/vie-sisalto.mjs';
import { MISTA, NOSTOKUVA_KOKOELMAT, NOSTOKUVA_SISAKKAISET, lisenssiLahteesta } from '../tools/vienti/nostokuvat.mjs';

const { tiedostot } = await kokoaVienti();
const lue = (polku) => JSON.parse(tiedostot.get(polku));
const kokoelma = (nimi) => lue(`kokoelmat/${nimi}.json`).alkiot;
const KENTAT = ['osoite', 'lyhyt', 'laji', 'lahde', 'lisenssi', 'mista'];
// Vienti (tools/vienti/nostokuvat.mjs, NOSTOKUVA_LISAKENTAT) voi tuoda vanhojen kenttien perään valinnaiset lisäkentät tässä järjestyksessä.
const LISAKENTAT = ['tekija', 'leveys', 'korkeus'];
const LAJIT = new Set(['valokuva', 'havainnekuva', 'kartta', 'piirros', 'maalaus']);

/** Kaikki nostot: { missa, alkio } (päätason kokoelmat ja fokusvirtojen sisäkkäiset listat). */
function nostot() {
  const tulos = [];
  for (const nimi of NOSTOKUVA_KOKOELMAT) for (const a of kokoelma(nimi)) tulos.push({ missa: `${nimi}/${a.id}`, alkio: a });
  for (const [nimi, listat] of Object.entries(NOSTOKUVA_SISAKKAISET)) {
    for (const a of kokoelma(nimi)) {
      for (const lista of listat) for (const x of a[lista] ?? []) tulos.push({ missa: `${nimi}/${a.id}.${lista}/${x.id}`, alkio: x });
    }
  }
  return tulos;
}
const NOSTOT = nostot();

// Vientiosoitteet: media.json sekä kokoelmien päätason valmiit kuvat (eläintäkyn vanha kuva-tunnus; täkynostot ovat
// js/fokusnosto.js:ssä, jota media.json ei kävele, joten niiden osoite on takynostot-kokoelman kuva-, valokuva- ja galleriaosoite).
const OSOITTEET = new Set();
for (const m of lue('media.json').viitteet) if (m.url) OSOITTEET.add(m.url);
for (const a of kokoelma('elaintayt')) if (a.kuva?.url) OSOITTEET.add(a.kuva.url);
for (const a of kokoelma('takynostot')) for (const r of [a.kuva, a.valokuva, ...a.galleria]) if (r?.url) OSOITTEET.add(r.url);

test('jokaisella nostolla on nostokuvat-taulukko (kaikki nostokokoelmat ja fokusvirtojen sisäkkäiset)', () => {
  assert.ok(NOSTOT.length > 5000, `nostoja vain ${NOSTOT.length}`);
  const puuttuu = NOSTOT.filter(({ alkio }) => !Array.isArray(alkio.nostokuvat)).map(({ missa }) => missa);
  assert.deepEqual(puuttuu, []);
  for (const nimi of NOSTOKUVA_KOKOELMAT) assert.ok(kokoelma(nimi).length > 0, `${nimi} tyhjä`);
});

test('kuvan muoto: osoite, lyhyt, laji, lahde, lisenssi, mista', () => {
  const virheet = [];
  for (const { missa, alkio } of NOSTOT) {
    alkio.nostokuvat.forEach((k, i) => {
      const kohta = `${missa}[${i}]`;
      const avaimet = Object.keys(k);
      const lisat = avaimet.slice(KENTAT.length);
      const lisatKunnossa = lisat.every((a) => LISAKENTAT.includes(a)) && JSON.stringify(lisat) === JSON.stringify(LISAKENTAT.filter((a) => lisat.includes(a)));
      if (JSON.stringify(avaimet.slice(0, KENTAT.length)) !== JSON.stringify(KENTAT) || !lisatKunnossa) virheet.push(`${kohta}: kentät ${avaimet}`);
      if (typeof k.osoite !== 'string' || !/^https:\/\/\S+$/.test(k.osoite)) virheet.push(`${kohta}: osoite ${k.osoite}`);
      for (const kentta of ['lyhyt', 'lahde', 'lisenssi']) {
        if (k[kentta] !== null && (typeof k[kentta] !== 'string' || !k[kentta])) virheet.push(`${kohta}: ${kentta} ${k[kentta]}`);
      }
      if (k.laji !== null && !LAJIT.has(k.laji)) virheet.push(`${kohta}: laji ${k.laji}`);
      if (!MISTA.includes(k.mista)) virheet.push(`${kohta}: mista ${k.mista}`);
    });
  }
  assert.deepEqual(virheet.slice(0, 20), []);
});

test('järjestys nosto → kohde → juttu, ei kaksoiskappaleita, osoite vientimuodossa', () => {
  const virheet = [];
  for (const { missa, alkio } of NOSTOT) {
    const jarjestys = alkio.nostokuvat.map((k) => MISTA.indexOf(k.mista));
    if (jarjestys.some((x, i) => i > 0 && x < jarjestys[i - 1])) virheet.push(`${missa}: järjestys ${alkio.nostokuvat.map((k) => k.mista)}`);
    const osoitteet = alkio.nostokuvat.map((k) => k.osoite);
    if (new Set(osoitteet).size !== osoitteet.length) virheet.push(`${missa}: sama osoite kahdesti`);
    for (const o of osoitteet) if (!OSOITTEET.has(o)) virheet.push(`${missa}: ${o} ei ole paketin vientiosoite`);
  }
  assert.deepEqual(virheet.slice(0, 20), []);
});

test('Tuileries: jaksokuvat ensin jaksojen järjestyksessä (karttavalo ja kohteen raakamoduuli)', () => {
  const valo = kokoelma('karttavalot').find((v) => v.tunnus === 'tuileries');
  assert.ok(valo, 'tuileries ei ole karttavalo');
  const raaka = Object.values(lue('moduulit/js/packs/fokuskohteet-fra.json').exportit).flat().find((k) => k?.id === 'tuileries');
  const avaimet = [...new Set(raaka.jaksot.flatMap((x) => [x.kuva, x.lisakuva?.kuva]).filter(Boolean))];
  assert.equal(avaimet.length, 4); // K-4 (20.11.2026): loisto, palo, purku, päätykolmio
  const alku = valo.nostokuvat.slice(0, avaimet.length);
  assert.deepEqual(alku.map((k) => k.lyhyt), avaimet.map((a) => raaka.jaksokuvat[a].lyhyt));
  assert.deepEqual(alku.map((k) => k.laji), avaimet.map((a) => raaka.jaksokuvat[a].laji));
  assert.ok(alku.every((k) => k.mista === 'nosto'));
  // K-4 (20.11.2026): kuvat rajattu 1200 × 800 -kopioiksi; ihmekuva on sama kuin jakson 1 kuva (ei viidettä kuvaa).
  assert.equal(alku[0].osoite, 'https://media.matkakirja.app/kohtaamiset/ihmeet/ihme-tuileries-loistoaika-v2-3x2.jpg');
  assert.equal(alku[1].osoite, 'https://media.matkakirja.app/kuvat/tuileries-palo.jpg');
  assert.equal(alku[2].osoite, 'https://media.matkakirja.app/kuvat/tuileries-purku.jpg');
  assert.equal(alku[3].laji, 'valokuva');
  assert.ok(alku[3].lisenssi?.startsWith('CC BY'), 'päätykolmion (valokuva) lisenssi luetaan datasta');
});

test('kaikki jaksolliset nostot: jaksokuvat ensimmäisinä', () => {
  const valot = new Map(kokoelma('karttavalot').map((v) => [v.tunnus, v]));
  let tarkistettu = 0;
  for (const polku of tiedostot.keys()) {
    if (!/^moduulit\/js\/packs\/(fokuskohteet|maastokohteet|hahmotelma)-[a-z]{3}\.json$/.test(polku)) continue;
    for (const lista of Object.values(lue(polku).exportit ?? {})) {
      for (const n of Array.isArray(lista) ? lista : []) {
        if (!n?.jaksokuvat || !valot.has(n.id)) continue;
        const odotetut = [...new Set(n.jaksot.flatMap((x) => [x.kuva, x.lisakuva?.kuva]).filter(Boolean))]
          .map((a) => n.jaksokuvat[a]).filter((k) => k.osoite || k.tiedosto || k.url);
        assert.deepEqual(valot.get(n.id).nostokuvat.slice(0, odotetut.length).map((k) => k.lyhyt), odotetut.map((k) => k.lyhyt), n.id);
        tarkistettu++;
      }
    }
  }
  assert.ok(tarkistettu >= 2, `jaksollisia vain ${tarkistettu}`);
});

test('historian hetki ja skandaali: omat kuvat ensin; täkynoston kohde kohde-kuvina', () => {
  const h = kokoelma('historianHetket').find((a) => a.id === 'kolumbus-portugali-1484');
  assert.deepEqual(h.nostokuvat.filter((k) => k.mista === 'nosto').map((k) => k.osoite.split('/').pop()),
    h.data.kuvat.map((k) => k.tiedosto));
  const valo = kokoelma('karttavalot').find((v) => v.tunnus === 'hetki-kolumbus-portugali-1484');
  if (valo) assert.deepEqual(valo.nostokuvat, h.nostokuvat);
  const sk = kokoelma('skandaalit').find((a) => Array.isArray(a.data.kuvat) && a.data.kuvat.length > 1);
  // js/skandaalit.js skandaalinKuvat: kuvat-lista voittaa vanhan kuva-kentän, ja ne ovat listan kärjessä.
  assert.equal(sk.nostokuvat.filter((k) => k.mista === 'nosto').length, sk.data.kuvat.length, sk.id);
  assert.ok(sk.nostokuvat.slice(0, sk.data.kuvat.length).every((k) => k.mista === 'nosto'));
  const kohteelliset = kokoelma('takynostot').filter((a) => a.kohde);
  assert.ok(kohteelliset.some((a) => a.nostokuvat.some((k) => k.mista === 'kohde')), 'täkynoston kohteen kuvat puuttuvat');
});

test('nähtävyysjuttu: omat kuvat nosto-kuvina; juttu näkyy linkittävän noston juttu-kuvina', () => {
  const jutut = kokoelma('nahtavyydet');
  const omin = jutut.find((a) => a.kuvat.length > 1);
  assert.deepEqual(omin.nostokuvat.filter((k) => k.mista === 'nosto').map((k) => k.osoite).filter((o) => omin.kuvat.some((r) => r.url === o)),
    omin.kuvat.map((r) => r.url));
  const linkki = jutut.find((a) => typeof a.nosto === 'string' && a.nosto.startsWith('hetki-') && a.kuvat.length);
  const hetki = kokoelma('historianHetket').find((h) => `hetki-${h.id}` === linkki.nosto);
  const juttuKuvat = hetki.nostokuvat.filter((k) => k.mista === 'juttu').map((k) => k.osoite);
  assert.ok(linkki.kuvat.every((r) => juttuKuvat.includes(r.url) || hetki.nostokuvat.some((k) => k.osoite === r.url)), linkki.id);
});

test('raaka data pysyy koskemattomana (fokusvirrat.data) ja lisenssi luetaan vain sulkeista', () => {
  for (const a of kokoelma('fokusvirrat')) {
    for (const lista of NOSTOKUVA_SISAKKAISET.fokusvirrat) {
      assert.ok(!(a.data?.[lista] ?? []).some((x) => 'nostokuvat' in x), `${a.id}.data.${lista}`);
    }
  }
  assert.equal(lisenssiLahteesta('Patricia Ripnel, Wikimedia Commons (CC BY-SA 3.0)'), 'CC BY-SA 3.0');
  assert.equal(lisenssiLahteesta('Godefroy, Wikimedia Commons (CC0)'), 'CC0');
  assert.equal(lisenssiLahteesta('rakennusreferenssit Paris Musées / Carnavalet, CC0'), null);
  assert.equal(lisenssiLahteesta(null), null);
});
