/*
 * NOSTOJEN KYSYMYKSET (Raamattu 2.218; omistaja 9.11.2026 klo 13.18:
 * "jokaisesta uudesta nostosta kun se kirjoitetaan täytyy tarkistaa että
 * sille on kirjoitettu kysymyksiä").
 *
 * Laskee jokaiselle nostolle (sisältöpaketin karttavalo) kortin Kysy-napin
 * kirjoitetut kysymykset SAMASTA PAKETISTA, jonka natiivi lukee, samalla
 * säännöllä kuin natiivin NostoSisalto.Hae ja natiivin oma testi
 * (proto Peli-testit/nosto-kysymykset.py, NostoKysymyksetTestit):
 *
 *   kohde:<id>  moduulin fokuskohteet-/maastokohteet-/hahmotelma-<maa>
 *               alkion `kysymykset` (tunnuksen ~2-pääte pois)
 *   nosto:<id>  kokoelman takynostot alkion `kysymykset`
 *   hetki:<id>  kokoelman historianHetket alkion data.kysymykset (natiivi
 *               NostoSisalto.Hetki, NUI 2b7f2e7b7; KS 10.11.2026)
 *   skandaali:<id>  kokoelman skandaalit alkion kysymykset (NUI a970b0d1c)
 *   syvennys:<kaupunki>-<täky>  kokoelman fokusvirrat kaupungin takyt[] (NUI a970b0d1c)
 *   muut        eläintäyt ja
 *               napakohteet ilman maata: ei kysymyskenttää → 0
 *
 * Tests/nosto-kysymykset.test.mjs vertaa tulosta poikkeuslistaan
 * tests/fixtures/nosto-kysymykset-poikkeukset.tsv. Pulun valmiit
 * kysymykset ovat ämpärissä (pulu/vastaukset), eivät tässä repossa: niitä
 * vartioi natiivin testi.
 */
import { readFileSync } from 'node:fs';

export const VAHIMMAT = 2; // Pulu hakee aina vähintään kaksi kysymystä (omistaja 9.11. 12.58)
const MODUULIT = ['fokuskohteet', 'maastokohteet', 'hahmotelma'];

const tekstit = (lista) => (Array.isArray(lista) ? lista.filter((q) => typeof q === 'string' && q.trim()).length : 0);

/*
 * `tiedostot` = kokoaVienti().tiedostot (polku → JSON-teksti). Palauttaa
 * rivit { id, laji, maa, kirjoitetut, nimi } karttavalojen järjestyksessä.
 */
export function nostojenKysymykset(tiedostot) {
  const lue = (polku) => (tiedostot.has(polku) ? JSON.parse(tiedostot.get(polku)) : null);
  const valot = lue('kokoelmat/karttavalot.json').alkiot;
  const taky = new Map(lue('kokoelmat/takynostot.json').alkiot.map((x) => [x.id, x]));
  const hetket = new Map((lue('kokoelmat/historianHetket.json')?.alkiot ?? []).map((x) => [x.id, x.data]));
  const skandaalit = new Map((lue('kokoelmat/skandaalit.json')?.alkiot ?? []).map((x) => [x.id, x]));
  const virrat = new Map((lue('kokoelmat/fokusvirrat.json')?.alkiot ?? []).map((x) => [x.id, x]));
  // Syvennys: tunnus <kaupunki>-<täky>, kaupunkitunnuksissa ei viivaa (= natiivin NostoSisalto).
  const syvennys = (tunnus) => {
    const e = tunnus.indexOf('-');
    const v = e > 0 ? virrat.get(tunnus.slice(0, e)) : null;
    return (v?.takyt ?? v?.virta?.takyt ?? []).find((t) => t?.id === tunnus.slice(e + 1));
  };
  const moduulit = new Map();
  const moduuli = (laji, iso) => {
    const avain = `${laji}-${iso.toLowerCase()}`;
    if (!moduulit.has(avain)) {
      const alkiot = new Map();
      for (const lista of Object.values(lue(`moduulit/js/packs/${avain}.json`)?.exportit ?? {})) {
        for (const x of Array.isArray(lista) ? lista : []) {
          if (x && typeof x === 'object' && x.id && !alkiot.has(x.id)) alkiot.set(x.id, x);
        }
      }
      moduulit.set(avain, alkiot);
    }
    return moduulit.get(avain);
  };
  return valot.map((v) => {
    const [laji, ...loput] = v.id.split(':');
    const tunnus = loput.join(':');
    // Arktiksen napakohteella ei ole maata: maa tunnuksen etuliitteestä (= NostoSisalto.Hae).
    const maa = v.maa || (v.lahde === 'napakohde' && tunnus.length > 4 && tunnus[3] === '-' ? tunnus.slice(0, 3).toUpperCase() : '');
    let kirjoitetut = 0;
    if (laji === 'kohde' && maa) {
      const t = tunnus.split('~')[0];
      const kohde = MODUULIT.map((l) => moduuli(l, maa).get(t)).find(Boolean);
      kirjoitetut = tekstit(kohde?.kysymykset);
    } else if (laji === 'nosto') {
      kirjoitetut = tekstit(taky.get(tunnus)?.kysymykset);
    } else if (laji === 'hetki') {
      kirjoitetut = tekstit(hetket.get(tunnus)?.kysymykset);
    } else if (laji === 'skandaali') {
      kirjoitetut = tekstit(skandaalit.get(tunnus)?.kysymykset);
    } else if (laji === 'syvennys') {
      kirjoitetut = tekstit(syvennys(tunnus)?.kysymykset);
    }
    return { id: v.id, laji, maa, kirjoitetut, nimi: v.nimi ?? '' };
  });
}

/* Poikkeuslista: id → nimi. Risuaitarivit ovat kommentteja. */
export function luePoikkeukset(polku) {
  const p = new Map();
  for (const rivi of readFileSync(polku, 'utf8').split('\n')) {
    if (!rivi || rivi.startsWith('#')) continue;
    const [id, nimi = ''] = rivi.split('\t');
    p.set(id.trim(), nimi.trim());
  }
  return p;
}
