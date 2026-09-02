/*
 * KARTTANOSTOJEN KATTAVUUS MAITTAIN — inventaario yhdellä ajolla.
 *
 * Omistaja 2.9.2026: *"pitäisi jatkaa kaikki Euroopan maat loppuun
 * näiden karttanostojen osalta. ja muistathan että kohdekaupunkien
 * nostot eivät tule pääkartalle?"* Raamatun kirjaus (JOKAINEN NÄKYVÄ
 * KARTTAMERKKI ON NIMETTY JA NAPAUTETTAVA) antaa erälle tavoitteen per
 * maa: 8 kohdetta, 3 maastokohdetta, 1 eläintäky, 2 skandaalia.
 *
 * Tämä työkalu laskee, missä kukin maa on menossa. Se ei arvaa mitään:
 * luvut tulevat samoista taulukoista kuin pelin kartta, ja karttarivit
 * pelin omalta passilta (tools/tarkista-nostopaikat.mjs paakartanNostot).
 *
 * === MITÄ LASKETAAN ================================================
 *
 *   kohteet         maan kohdemerkit, joiden tyyppi EI ole maastoa:
 *                   kaupunki, historia, kulttuuri, tekniikka, muu...
 *                   Tavoite 8 koskee juuri näitä.
 *   maastokohteet   saman listan maastotyypit (vuori, joki, meri, järvi,
 *                   saari) riippumatta siitä, kummassa tiedostossa ne
 *                   asuvat. Jako on TYYPIN eikä tiedoston mukainen,
 *                   koska pelaaja näkee tyypin eikä tiedostoa: Kreikan
 *                   Ólympos on maastokohde, vaikka se on kuratoidussa
 *                   fokuskohteet-grc.js:ssä, ja Islannin Þjórsá on
 *                   maastokohde maastokohteet-isl.js:ssä.
 *   eläintäky       0 tai 1 (js/packs/elaintakyt.js).
 *   skandaalit      js/packs/skandaalit.js.
 *   hetket          js/packs/historian-hetket.js, maan iso-kentällä.
 *   kulttuurinostot maan kaupunkien syvennykset + täkynostot, eli ne
 *                   kulttuurinostot, joilla on OMA karttapaikka
 *                   (js/syvennys.js, js/fokusnosto.js). Lehtisivuiksi
 *                   siirtyneitä ei lasketa — ne eivät ole karttamerkkejä.
 *
 * === PÄÄKARTTA VS. KOHDEKARTTA =====================================
 *
 * Sarake `pääkartalla` on se määrä, joka maan merkeistä oikeasti näkyy
 * maailmankartalla kaupunkikaton jälkeen, ja `kohdekartalla` ne, jotka
 * asuvat kaupunkilehden kohdekartalla (omistajan sääntö: kohdekaupungin
 * kohdalla oleva nosto ei ole pääkartalla). Kumpikin luku tulee
 * tarkista-nostopaikat.mjs:n funktioista, jotta kaksi työkalua ei anna
 * samasta asiasta eri vastausta.
 *
 * === KÄYTTÖ ========================================================
 *
 *   node tools/laske-karttanostot.mjs            # taulukko
 *   node tools/laske-karttanostot.mjs --md       # markdown docs/:iin
 */
import { FOKUSKOHTEET_BGR } from '../js/packs/fokuskohteet-bgr.js';
import { FOKUSKOHTEET_BIH } from '../js/packs/fokuskohteet-bih.js';
import { FOKUSKOHTEET_DEU } from '../js/packs/fokuskohteet-deu.js';
import { FOKUSKOHTEET_FRA } from '../js/packs/fokuskohteet-fra.js';
import { FOKUSKOHTEET_GBR } from '../js/packs/fokuskohteet-gbr.js';
import { FOKUSKOHTEET_GRC } from '../js/packs/fokuskohteet-grc.js';
import { FOKUSKOHTEET_HRV } from '../js/packs/fokuskohteet-hrv.js';
import { FOKUSKOHTEET_HUN } from '../js/packs/fokuskohteet-hun.js';
import { FOKUSKOHTEET_ITA } from '../js/packs/fokuskohteet-ita.js';
import { FOKUSKOHTEET_ROU } from '../js/packs/fokuskohteet-rou.js';
import { FOKUSKOHTEET_TUR } from '../js/packs/fokuskohteet-tur.js';
import { MAASTOKOHTEET } from '../js/packs/maastokohteet.js';
import { ELAINTAKYT } from '../js/packs/elaintakyt.js';
import { SKANDAALIT } from '../js/packs/skandaalit.js';
import { HISTORIAN_HETKET } from '../js/packs/historian-hetket.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { paakartanNostot, kohdekarttojenNostot } from './tarkista-nostopaikat.mjs';

/*
 * KURATOIDUT KOHDELISTAT. Vain Euroopan laudan maat; muut mantereet
 * eivät kuulu tähän erään. Maa ilman riviä tässä on maa ilman
 * fokuskohteet-pakkia, ja sen kohdeluku on nolla.
 */
const KURATOIDUT = {
  BGR: FOKUSKOHTEET_BGR,
  BIH: FOKUSKOHTEET_BIH,
  DEU: FOKUSKOHTEET_DEU,
  FRA: FOKUSKOHTEET_FRA,
  GBR: FOKUSKOHTEET_GBR,
  GRC: FOKUSKOHTEET_GRC,
  HRV: FOKUSKOHTEET_HRV,
  HUN: FOKUSKOHTEET_HUN,
  ITA: FOKUSKOHTEET_ITA,
  ROU: FOKUSKOHTEET_ROU,
  TUR: FOKUSKOHTEET_TUR,
};

/** Euroopan laudan maat — sama joukko kuin skandaaleilla ja eläintäyillä. */
export const EUROOPAN_MAAT = [
  'AUT', 'BGR', 'BIH', 'CHE', 'CZE', 'DEU', 'DNK', 'ESP', 'EST', 'FIN',
  'FRA', 'GBR', 'GRC', 'HRV', 'HUN', 'IRL', 'ISL', 'ITA', 'LTU', 'LVA',
  'NLD', 'NOR', 'POL', 'PRT', 'ROU', 'RUS', 'SWE', 'TUR', 'UKR',
];

/** Maan nimi suomeksi taulukon ensimmäiseen sarakkeeseen. */
export const MAANIMET = {
  AUT: 'Itävalta', BGR: 'Bulgaria', BIH: 'Bosnia ja Hertsegovina',
  CHE: 'Sveitsi', CZE: 'Tšekki', DEU: 'Saksa', DNK: 'Tanska',
  ESP: 'Espanja', EST: 'Viro', FIN: 'Suomi', FRA: 'Ranska',
  GBR: 'Britannia', GRC: 'Kreikka', HRV: 'Kroatia', HUN: 'Unkari',
  IRL: 'Irlanti', ISL: 'Islanti', ITA: 'Italia', LTU: 'Liettua',
  LVA: 'Latvia', NLD: 'Alankomaat', NOR: 'Norja', POL: 'Puola',
  PRT: 'Portugali', ROU: 'Romania', RUS: 'Venäjä', SWE: 'Ruotsi',
  TUR: 'Turkki', UKR: 'Ukraina',
};

/**
 * MAASTON TYYPIT. Nämä viisi ovat maastokohteita; kaikki muu on
 * kohteita. Sama lista kuin js/fokuskohteet.js KOHDE_TYYPIT nimeää
 * maastoksi (vuori, meri, saari, joki) sekä järvi, jota kartalla ei
 * vielä ole mutta joka kuuluu samaan perheeseen.
 */
const MAASTON_TYYPIT = new Set(['vuori', 'joki', 'meri', 'jarvi', 'saari']);

/** Tavoite per maa (Raamattu, karttanostojen kattavuus). */
export const TAVOITE = { kohteet: 8, maastokohteet: 3, elaintaky: 1, skandaalit: 2 };

/**
 * KATTAVUUS MAITTAIN.
 *
 * @returns {Array<object>} rivi per maa, järjestys aakkosellinen ISO.
 */
export function kattavuus() {
  const { kaikki, kartalla } = paakartanNostot(MAAILMANKARTTA);
  const linkit = kohdekarttojenNostot();
  const rivit = [];
  for (const iso of EUROOPAN_MAAT) {
    const maanRivit = kaikki.filter((r) => r.iso === iso);
    const kulttuuri = maanRivit.filter(
      (r) => r.id.startsWith('syvennys-') || r.id.startsWith('nosto-'),
    ).length;
    const lista = [...(KURATOIDUT[iso] ?? []), ...(MAASTOKOHTEET[iso] ?? [])];
    rivit.push({
      iso,
      nimi: MAANIMET[iso] ?? iso,
      kohteet: lista.filter((k) => !MAASTON_TYYPIT.has(k.tyyppi)).length,
      maastokohteet: lista.filter((k) => MAASTON_TYYPIT.has(k.tyyppi)).length,
      elaintaky: ELAINTAKYT[iso] ? 1 : 0,
      skandaalit: (SKANDAALIT[iso] ?? []).length,
      hetket: HISTORIAN_HETKET.filter((h) => h.iso === iso).length,
      kulttuurinostot: kulttuuri,
      paakartalla: maanRivit.filter((r) => kartalla.has(r.id)).length,
      kohdekartalla: maanRivit.filter((r) => !kartalla.has(r.id) && linkit.has(r.id)).length,
    });
  }
  return rivit;
}

/** Vajeet yhdelle riville — tyhjä lista tarkoittaa täyttä tavoitetta. */
export function vajeet(r) {
  const puuttuu = [];
  if (r.kohteet < TAVOITE.kohteet) puuttuu.push(`kohteita −${TAVOITE.kohteet - r.kohteet}`);
  if (r.maastokohteet < TAVOITE.maastokohteet) {
    puuttuu.push(`maastoa −${TAVOITE.maastokohteet - r.maastokohteet}`);
  }
  if (r.elaintaky < TAVOITE.elaintaky) puuttuu.push('eläintäky puuttuu');
  if (r.skandaalit < TAVOITE.skandaalit) {
    puuttuu.push(`skandaaleja −${TAVOITE.skandaalit - r.skandaalit}`);
  }
  return puuttuu;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const rivit = kattavuus();
  if (process.argv.includes('--md')) {
    console.log('| maa | kohteet | maastokohteet | eläintäky | skandaalit '
      + '| hetket | kulttuurinostot | pääkartalla | kohdekartalla | tila |');
    console.log('|---|---:|---:|---:|---:|---:|---:|---:|---:|---|');
    for (const r of rivit) {
      const v = vajeet(r);
      console.log(`| ${r.nimi} (${r.iso}) | ${r.kohteet} | ${r.maastokohteet} `
        + `| ${r.elaintaky} | ${r.skandaalit} | ${r.hetket} | ${r.kulttuurinostot} `
        + `| ${r.paakartalla} | ${r.kohdekartalla} | ${v.length ? v.join(', ') : 'täysi'} |`);
    }
  } else {
    for (const r of rivit) {
      const v = vajeet(r);
      console.log(`${r.iso} ${String(r.nimi).padEnd(24)} koh ${String(r.kohteet).padStart(2)} `
        + `maa ${String(r.maastokohteet).padStart(2)} elä ${r.elaintaky} `
        + `ska ${String(r.skandaalit).padStart(2)} het ${r.hetket} `
        + `kul ${String(r.kulttuurinostot).padStart(2)} `
        + `| pää ${String(r.paakartalla).padStart(2)} koh ${String(r.kohdekartalla).padStart(2)} `
        + `| ${v.length ? v.join(', ') : 'täysi'}`);
    }
    const vajaat = rivit.filter((r) => vajeet(r).length);
    console.log(`\nmaita ${rivit.length}, tavoitteessa ${rivit.length - vajaat.length}, `
      + `vajaita ${vajaat.length}`);
  }
}
