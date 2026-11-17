/*
 * NOSTON JAKSOT (Tuileries-koe; omistaja 17.11.2026 klo 10.58 ja 10.51, KK 11.11 ja 11.16;
 * suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261117-nostot-tarinoiksi.md
 * kohta 4 "Tarkistus koneella" ja luku 8, sitova).
 *
 * Nosto kuunneltavana, kuvitettuna tarinana: `jaksot[]` on noston ainoa
 * luettava teksti, ja kuva, toinen kuva, vuosirivit, hologrammi ja
 * karttapiste luetaan samasta jaksosta. Testi kokoaa sisältöpaketin kuten
 * vienti (tools/vienti/vie-sisalto.mjs kokoaVienti) ja tarkistaa jaksot
 * SIITÄ, mitä natiivi lukee: kohdemoduulit (moduulit/js/packs/fokuskohteet-|
 * maastokohteet-|hahmotelma-*.json, raakana; natiivi UI/NostoJaksot.Lue).
 * Täkynostojen kokoelma (karttavalot.mjs poimii kentät yksitellen) saa jaksot
 * skeemaversion noston kanssa, kun jaksoja tulee muille nostoille.
 *
 * Jakso: { osa: koukku | tapahtuma | kaanne | tanaan, teksti,
 *   aani?: 'isoisa' (vain koukussa: isoisän oma äänite ennen kertojaa; muuten kertoja),
 *   kuva (avain noston jaksokuviin), lisakuva?: { kuva, kohta } (toinen kuva tekstikohdassa),
 *   vuodet?: [{ vuosi, selite, kohta? }],
 *   hologrammi?: 'sammuu' (vain kadonneella kohteella), hologrammiKohta?,
 *   kartta?: { nimi, lat, lon } | { kohde } (vain viimeisessä: "Näytä kartalla") }.
 *   aanite?: tunnus noston `aanikansio`ssa (<nimi>/v<n>, muuttumaton): ämpäri aanet/<aanikansio>/<aanite>.mp3 + .sanat.json.
 * `kohta` = sana tai lause jakson tekstistä, tasan kerran.
 * jaksokuvat (`kuvat` on kohteilla jo kuvalista): { avain: { osoite | tiedosto | url,
 *   laji, lyhyt, selite?, lahde, tulossa? } }; tulossa = tilattu tai haettavana (osoite null).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { kokoaVienti } from '../tools/vienti/vie-sisalto.mjs';

const JAKSOJA = { min: 3, max: 5 }; // esittelyssä 1–2
const JAKSO_MERKIT = { min: 100, max: 350 };
const MERKKIKATTO = 1200; // koko tarina (Tuileries noin 1 000 + isoisä 112, SK:n raportti 17.11.)
const KUVIA_MAX = 7;
const OSAT = new Set(['nimi', 'esittely', 'koukku', 'tapahtuma', 'kaanne', 'tanaan']);
const ALKUOSAT = new Set(['nimi', 'esittely']); // noston alku: kertojan lyhyet rivit ennen isoisän koukkua (omistaja 19.23 F)
const LAJIT = new Set(['valokuva', 'havainnekuva', 'kartta', 'piirros', 'maalaus']);

const { tiedostot } = await kokoaVienti();
const lue = (polku) => JSON.parse(tiedostot.get(polku));

/** Kaikki nostot, joilla on jaksot: { lahde, id, n }. */
function jaksolliset() {
  const tulos = [];
  for (const polku of tiedostot.keys()) {
    if (!/^moduulit\/js\/packs\/(fokuskohteet|maastokohteet|hahmotelma)-[a-z]{3}\.json$/.test(polku)) continue;
    for (const lista of Object.values(lue(polku).exportit ?? {})) {
      if (!Array.isArray(lista)) continue;
      for (const n of lista) if (n && Array.isArray(n.jaksot)) tulos.push({ lahde: polku, id: n.id, n });
    }
  }
  return tulos;
}

const NOSTOT = jaksolliset();
const kadonnut = (n) => Boolean(n.ihme?.kadonnut || n.kadonnut);
const kuvanOsoite = (k) => k?.osoite ?? k?.tiedosto ?? k?.url ?? k?.arvo ?? null;
const kerran = (teksti, kohta) => typeof kohta === 'string' && kohta && teksti.split(kohta).length - 1 === 1;
const jaksonKuvat = (x) => [x.kuva, x.lisakuva?.kuva].filter(Boolean);

test('vienti tuo Tuileries\'n jaksot natiivin raakamoduuliin (luku 8)', () => {
  const t = NOSTOT.find((x) => x.id === 'tuileries');
  assert.ok(t, 'tuileries ei ole jaksollisten joukossa');
  assert.equal(t.lahde, 'moduulit/js/packs/fokuskohteet-fra.json');
  assert.deepEqual(t.n.jaksot.map((x) => `${x.osa}${x.aani ? `/${x.aani}` : ''}`),
    ['nimi', 'esittely', 'koukku/isoisa', 'tapahtuma', 'tapahtuma', 'kaanne', 'tanaan']);
  assert.equal(new Set(t.n.jaksot.flatMap(jaksonKuvat)).size, 7);
  assert.equal(t.n.jaksot[5].hologrammi, 'sammuu');
  assert.equal(t.n.visa.kysymys, 'Mitä Tuileries\'n palatsista jäi pystyyn palon jälkeen?');
  assert.equal(t.n.kysymykset.length, 3);
  assert.ok(t.n.teksti.startsWith('Isoisäsi kulki tästä matkallaan.\n\nPariisi, 1873.'), 'teksti: esittely ja jaksot');
  // Noston alku (omistaja 19.23 F, KK 19.26, PT F4): kertojan nimi ja esittely ennen isoisän lausetta; esittely ei toista päivämäärää.
  assert.equal(t.n.jaksot[0].teksti, `${t.n.nimi}.`);
  assert.equal(t.n.jaksot[1].teksti, 'Isoisäsi kulki tästä matkallaan.');
  assert.ok(!/\d{4}/.test(t.n.jaksot[1].teksti), 'esittely ei toista vuotta');
  assert.ok(t.n.jaksot[0].teksti.length + t.n.jaksot[1].teksti.length <= 80, 'alku enintään noin 80 merkkiä');
  // Yksi nosto pisteessä: syvennystarina ja sen kopio poissa (8.5 r5).
  assert.ok(![...tiedostot.values()].some((x) => x.includes('syvennys-pariisi-tuileriat') || x.includes('"tuileriat"')),
    'paketissa yhä viittaus täkyyn tuileriat');
});

test('äänitteet: kansio ja jokaisella jaksolla oma äänite (Tuileries 17.11.2026)', () => {
  const virheet = [];
  for (const { id, n } of NOSTOT) {
    if (n.aanikansio == null) continue;
    if (!/^[a-z0-9-]+\/v\d+$/.test(n.aanikansio)) virheet.push(`${id}: aanikansio ${n.aanikansio}`);
    const nimet = n.jaksot.map((x) => x.aanite);
    if (nimet.some((a) => typeof a !== 'string' || !/^[a-z0-9-]+$/.test(a))) virheet.push(`${id}: jaksolta puuttuu aanite`);
    if (new Set(nimet).size !== nimet.length) virheet.push(`${id}: sama äänite kahdesti`);
  }
  assert.deepEqual(virheet, []);
  const t = NOSTOT.find((x) => x.id === 'tuileries').n;
  assert.equal(t.aanikansio, 'tuileries-koe/v1');
  assert.deepEqual(t.jaksot.map((x) => x.aanite), ['nimi', 'esittely', 'isoisa', 'kertoja-1-otsikko-jakso2',
    'kertoja-2-jakso3', 'kertoja-3-jakso4', 'kertoja-4-jakso5']);
});

test('jaksojen määrä, osat, ääni ja pituudet', () => {
  const virheet = [];
  for (const { id, n } of NOSTOT) {
    const alku = n.jaksot.filter((x) => ALKUOSAT.has(x.osa));
    const j = n.jaksot.filter((x) => !ALKUOSAT.has(x.osa));
    // Noston alku (nimi, esittely) vain jaksojen kärjessä, tässä järjestyksessä; yhteensä enintään noin 80 merkkiä.
    if (alku.length && !alku.every((x, i) => n.jaksot[i] === x && x.osa === ['nimi', 'esittely'][i])) virheet.push(`${id}: alkuosat väärin`);
    if (alku.reduce((s, x) => s + (x.teksti?.length ?? 0), 0) > 80) virheet.push(`${id}: alku yli 80 merkkiä`);
    if (j.length < (n.esittely ? 1 : JAKSOJA.min) || j.length > (n.esittely ? 2 : JAKSOJA.max)) virheet.push(`${id}: ${j.length} jaksoa`);
    if (!n.esittely && j[0]?.osa !== 'koukku') virheet.push(`${id}: ensimmäinen ei ole koukku`);
    if (!n.esittely && j.at(-1)?.osa !== 'tanaan') virheet.push(`${id}: viimeinen ei ole tänään`);
    let yht = 0;
    n.jaksot.forEach((x, i) => {
      if (!OSAT.has(x.osa)) virheet.push(`${id}[${i}]: osa ${x.osa}`);
      const len = typeof x.teksti === 'string' ? x.teksti.length : 0;
      yht += len;
      if (!ALKUOSAT.has(x.osa) && (len < JAKSO_MERKIT.min || len > JAKSO_MERKIT.max)) virheet.push(`${id}[${i}]: ${len} merkkiä`);
      if (x.aani != null && (x.aani !== 'isoisa' || i !== alku.length)) virheet.push(`${id}[${i}]: aani ${x.aani} (isoisa vain koukussa)`);
    });
    if (yht > MERKKIKATTO) virheet.push(`${id}: ${yht} merkkiä > ${MERKKIKATTO}`);
  }
  assert.deepEqual(virheet, []);
});

test('jokaisen jakson kuva löytyy, enintään 7 kuvaa, viimeinen on valokuva', () => {
  const virheet = [];
  for (const { id, n } of NOSTOT) {
    const kuvat = n.jaksokuvat ?? {};
    const kaytetyt = new Set(n.jaksot.flatMap(jaksonKuvat));
    if (kaytetyt.size > KUVIA_MAX) virheet.push(`${id}: ${kaytetyt.size} kuvaa`);
    n.jaksot.forEach((x, i) => {
      if (x.lisakuva && !kerran(x.teksti, x.lisakuva.kohta)) virheet.push(`${id}[${i}]: lisakuvan kohta "${x.lisakuva.kohta}"`);
      for (const avain of jaksonKuvat(x)) {
        const k = kuvat[avain];
        if (!k) { virheet.push(`${id}[${i}]: kuva ${avain} puuttuu jaksokuvista`); continue; }
        if (!LAJIT.has(k.laji)) virheet.push(`${id}.jaksokuvat.${avain}: laji ${k.laji}`);
        if (!kuvanOsoite(k) && !k.tulossa) virheet.push(`${id}.jaksokuvat.${avain}: ei osoitetta eikä tulossa-merkintää`);
        if (!k.lyhyt || !k.lahde) virheet.push(`${id}.jaksokuvat.${avain}: lyhyt tai lahde puuttuu`);
      }
    });
    const viim = kuvat[n.jaksot.at(-1)?.kuva];
    if (!n.esittely && viim && viim.laji !== 'valokuva') virheet.push(`${id}: viimeisen kuvan laji ${viim.laji}`);
  }
  assert.deepEqual(virheet, []);
});

test('vuosirivit: enintään 5, selite ≤ 20 merkkiä, kohta tekstissä tasan kerran', () => {
  const virheet = [];
  for (const { id, n } of NOSTOT) {
    const kaikki = n.jaksot.flatMap((x) => x.vuodet ?? []);
    if (kaikki.length > 5) virheet.push(`${id}: ${kaikki.length} vuosiriviä`);
    n.jaksot.forEach((x, i) => {
      for (const v of x.vuodet ?? []) {
        if (!/^\d{1,4}$/.test(String(v.vuosi ?? ''))) virheet.push(`${id}[${i}]: vuosi ${v.vuosi}`);
        if (!v.selite || v.selite.length > 20) virheet.push(`${id}[${i}]: selite "${v.selite}"`);
        if (v.kohta != null && !kerran(x.teksti, v.kohta)) virheet.push(`${id}[${i}]: kohta "${v.kohta}"`);
      }
    });
  }
  assert.deepEqual(virheet, []);
});

test('hologrammi vain kadonneella (kohta tekstissä), kartta vain viimeisessä jaksossa', () => {
  const virheet = [];
  for (const { id, n } of NOSTOT) {
    n.jaksot.forEach((x, i) => {
      if (x.hologrammi != null && (x.hologrammi !== 'sammuu' || !kadonnut(n))) virheet.push(`${id}[${i}]: hologrammi`);
      if (x.hologrammiKohta != null && (x.hologrammi == null || !kerran(x.teksti, x.hologrammiKohta))) {
        virheet.push(`${id}[${i}]: hologrammiKohta "${x.hologrammiKohta}"`);
      }
      if (x.kartta != null) {
        if (i !== n.jaksot.length - 1) virheet.push(`${id}[${i}]: kartta ei viimeisessä`);
        const ok = typeof x.kartta.kohde === 'string'
          || (x.kartta.nimi && Number.isFinite(x.kartta.lat) && Number.isFinite(x.kartta.lon));
        if (!ok) virheet.push(`${id}[${i}]: kartta ${JSON.stringify(x.kartta)}`);
      }
    });
  }
  assert.deepEqual(virheet, []);
});

test('yksi tehtävä, vastaus ei vuosiriveissä eikä kuvateksteissä; Pulun kysymyksiä kolme', () => {
  const virheet = [];
  for (const { id, n } of NOSTOT) {
    const t = n.visa;
    if (Array.isArray(t)) virheet.push(`${id}: tehtäviä ${t.length}`);
    else if (t != null) {
      const oikea = t.vaihtoehdot?.[typeof t.oikea === 'number' ? t.oikea : t.vaihtoehdot.indexOf(t.oikea)];
      if (!t.kysymys || !oikea) virheet.push(`${id}: tehtävän muoto`);
      else {
        const nakyvat = [
          ...n.jaksot.flatMap((x) => (x.vuodet ?? []).map((v) => v.selite)),
          ...Object.values(n.jaksokuvat ?? {}).flatMap((k) => [k.lyhyt, k.selite]),
        ].filter(Boolean).map((s) => s.toLowerCase());
        if (nakyvat.some((s) => s.includes(oikea.toLowerCase()))) virheet.push(`${id}: vastaus näkyy ruudulla`);
      }
    }
    if ((n.kysymykset ?? []).length !== 3) virheet.push(`${id}: Pulun kysymyksiä ${(n.kysymykset ?? []).length}`);
  }
  assert.deepEqual(virheet, []);
});
