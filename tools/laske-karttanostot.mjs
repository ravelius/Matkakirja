/*
 * KARTTANOSTOJEN KATTAVUUS MAITTAIN — inventaario yhdellä ajolla.
 *
 * Omistaja 2.9.2026: *"pitäisi jatkaa kaikki Euroopan maat loppuun
 * näiden karttanostojen osalta. ja muistathan että kohdekaupunkien
 * nostot eivät tule pääkartalle?"* Omistaja 6.9.2026: *"Jatka kartta
 * nostojen tekoa koko maailmaan."* Raamatun kirjaus (JOKAINEN NÄKYVÄ
 * KARTTAMERKKI ON NIMETTY JA NAPAUTETTAVA) antaa erälle tavoitteen per
 * maa: 8 kohdetta, 3 maastokohdetta, 1 eläintäky, 2 skandaalia.
 *
 * Tämä työkalu laskee, missä kukin maa on menossa. Se ei arvaa mitään:
 * luvut tulevat samoista taulukoista kuin pelin kartta, ja karttarivit
 * pelin omalta passilta (tools/tarkista-nostopaikat.mjs paakartanNostot).
 *
 * === MITKÄ MAAT LASKETAAN (6.9.2026: KOKO MAAILMA) =================
 *
 * Joukko on maailmankartan oma maalista: map.cityCountry -taulun
 * uniikit ISO-tunnukset (112 maata). Se on täsmälleen se joukko, jossa
 * pelaaja voi olla — maa ilman yhtäkään laudan kaupunkia ei ole pelissä
 * maana. Aiempi EUROOPAN_MAAT-lista on yhä alla, mutta enää yhtä
 * tehtävää varten: se kertoo, mitkä maat kuuluvat EUROOPAN LAUTAAN
 * (Turkki ja Venäjä mukaan lukien), kun rivit ryhmitellään maanosiin.
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
 * === MISTÄ KOHDELISTA TULEE (6.9.2026) =============================
 *
 * Suoraan pelin omasta taulusta: js/fokuskohteet.js KOHDE_MAAT, johon
 * samassa tiedostossa on liitetty maastokohteiden hakemisto. Ennen
 * tässä oli oma KURATOIDUT-taulu, jonka jokainen uusi fokuskohteet-
 * pakki olisi vaatinut lisäämään käsin — ja unohdettu rivi olisi
 * näkynyt vain siinä, että maa näyttää liian heikolta. Taulu vietiin
 * siksi vientilistalle (yksi sana js/fokuskohteet.js:ssä), ja työkalu
 * lukee sen. Tuonti ei ole uusi riippuvuus: sama moduuli tulee joka
 * tapauksessa tarkista-nostopaikat.mjs:n mukana. Jako maastoon ja
 * muihin tehdään tyypistä, joten yhdistetty taulu antaa saman
 * vastauksen kuin kaksi erillistä listaa.
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
import { KOHDE_MAAT } from '../js/fokuskohteet.js';
import { ELAINTAKYT } from '../js/packs/elaintakyt.js';
import { SKANDAALIT } from '../js/packs/skandaalit.js';
import { HISTORIAN_HETKET } from '../js/packs/historian-hetket.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { paakartanNostot, kohdekarttojenNostot } from './tarkista-nostopaikat.mjs';

/** Euroopan laudan maat — sama joukko kuin skandaaleilla ja eläintäyillä. */
export const EUROOPAN_MAAT = [
  'AUT', 'BGR', 'BIH', 'CHE', 'CZE', 'DEU', 'DNK', 'ESP', 'EST', 'FIN',
  'FRA', 'GBR', 'GRC', 'HRV', 'HUN', 'IRL', 'ISL', 'ITA', 'LTU', 'LVA',
  'NLD', 'NOR', 'POL', 'PRT', 'ROU', 'RUS', 'SWE', 'TUR', 'UKR',
];

/**
 * MAAN NIMI SUOMEKSI — pelin omasta nimitaulusta, ei työkalun omasta.
 *
 * map.countryShapes on sama taulu, josta peli lukee maan nimen
 * maapilleriin ja lehden otsikkoon (js/pollo.js, js/lehti.js), ja se
 * kattaa kaikki 112 maata. Oma MAANIMET-taulu poistettiin 6.9.2026:
 * kahta nimilistaa ei kannata pitää käsin synkassa.
 */
export function maanNimi(iso) {
  return MAAILMANKARTTA.map.countryShapes?.[iso]?.nimi ?? iso;
}

/** Laudan maat: kaupunkien maat ilman kaksoiskappaleita. */
export function maailmanMaat() {
  return [...new Set(Object.values(MAAILMANKARTTA.map.cityCountry))].sort();
}

/** Maanosat siinä järjestyksessä, jossa ne tulostetaan. */
export const MANTEREET = [
  ['europe', 'Eurooppa'],
  ['middleeast', 'Lähi-itä'],
  ['asia', 'Aasia'],
  ['africa', 'Afrikka'],
  ['northamerica', 'Pohjois-Amerikka'],
  ['southamerica', 'Etelä-Amerikka'],
  ['oceania', 'Oseania'],
];

/**
 * MAAN MANNER. Kaksi sääntöä, tässä järjestyksessä:
 *
 *  1. EUROOPAN LAUDAN MAA ON EUROOPASSA. Turkin neljä kaupunkia ja
 *     Venäjän kymmenestä kahdeksan ovat lähdepaketeissa middleeast ja
 *     asia, joten pelkkä enemmistölaskenta siirtäisi ne pois siitä
 *     taulukosta, jossa niiden erät on tähän asti suunniteltu.
 *  2. MUUTEN ENEMMISTÖ map.cityManner -taulusta, tasapelin ratkaisee
 *     MANTEREET-listan järjestys. Näin Egypti on Lähi-idässä (Kairo,
 *     Luxor ja Siinai ovat middleeast-paketissa) ja Indonesia Aasiassa —
 *     kummassakin sama jako kuin pelin omissa lähdepaketeissa.
 */
export function maanManner(iso) {
  if (EUROOPAN_MAAT.includes(iso)) return 'europe';
  const { cityCountry, cityManner } = MAAILMANKARTTA.map;
  const laskuri = new Map();
  for (const [kaupunki, maa] of Object.entries(cityCountry)) {
    if (maa !== iso) continue;
    const manner = cityManner[kaupunki];
    if (manner) laskuri.set(manner, (laskuri.get(manner) ?? 0) + 1);
  }
  let paras = null;
  for (const [manner] of MANTEREET) {
    if ((laskuri.get(manner) ?? 0) > (paras ? laskuri.get(paras) : 0)) paras = manner;
  }
  return paras ?? 'asia';
}

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
  for (const iso of maailmanMaat()) {
    const maanRivit = kaikki.filter((r) => r.iso === iso);
    const kulttuuri = maanRivit.filter(
      (r) => r.id.startsWith('syvennys-') || r.id.startsWith('nosto-'),
    ).length;
    const lista = KOHDE_MAAT[iso] ?? [];
    rivit.push({
      iso,
      nimi: maanNimi(iso),
      manner: maanManner(iso),
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

/** Karttamerkkien yhteismäärä — erien järjestysperuste. */
export function merkkeja(r) {
  return r.paakartalla + r.kohdekartalla;
}

/**
 * RIVIT MAANOSITTAIN, heikoimmasta vahvimpaan.
 *
 * Järjestys maanosan sisällä on karttamerkkien summa (pääkartta +
 * kohdekartta) nousevasti — sama peruste, jolla erät on Euroopassa
 * valittu. Tasapelin ratkaisee ISO, jotta ajo on toistettava.
 *
 * @returns {Array<{manner: string, nimi: string, rivit: Array<object>}>}
 */
export function maanosittain(rivit = kattavuus()) {
  return MANTEREET.map(([manner, nimi]) => ({
    manner,
    nimi,
    rivit: rivit
      .filter((r) => r.manner === manner)
      .sort((a, b) => merkkeja(a) - merkkeja(b) || a.iso.localeCompare(b.iso)),
  })).filter((ryhma) => ryhma.rivit.length);
}

const MD_OTSIKKO = '| maa | kohteet | maastokohteet | eläintäky | skandaalit '
  + '| hetket | kulttuurinostot | pääkartalla | kohdekartalla | tila |';

function mdRivi(r) {
  const v = vajeet(r);
  return `| ${r.nimi} (${r.iso}) | ${r.kohteet} | ${r.maastokohteet} `
    + `| ${r.elaintaky} | ${r.skandaalit} | ${r.hetket} | ${r.kulttuurinostot} `
    + `| ${r.paakartalla} | ${r.kohdekartalla} | ${v.length ? v.join(', ') : 'täysi'} |`;
}

function tekstirivi(r) {
  const v = vajeet(r);
  return `${r.iso} ${String(r.nimi).padEnd(24)} koh ${String(r.kohteet).padStart(2)} `
    + `maa ${String(r.maastokohteet).padStart(2)} elä ${r.elaintaky} `
    + `ska ${String(r.skandaalit).padStart(2)} het ${r.hetket} `
    + `kul ${String(r.kulttuurinostot).padStart(2)} `
    + `| pää ${String(r.paakartalla).padStart(2)} koh ${String(r.kohdekartalla).padStart(2)} `
    + `| ${v.length ? v.join(', ') : 'täysi'}`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const rivit = kattavuus();
  const ryhmat = maanosittain(rivit);
  const vajaat = rivit.filter((r) => vajeet(r).length);
  if (process.argv.includes('--md')) {
    for (const ryhma of ryhmat) {
      console.log(`### ${ryhma.nimi} (${ryhma.rivit.length} maata)\n`);
      console.log(MD_OTSIKKO);
      console.log('|---|---:|---:|---:|---:|---:|---:|---:|---:|---|');
      for (const r of ryhma.rivit) console.log(mdRivi(r));
      console.log('');
    }
    console.log(`Maita ${rivit.length}, tavoitteessa ${rivit.length - vajaat.length}, `
      + `vajaita ${vajaat.length}.`);
  } else {
    for (const ryhma of ryhmat) {
      console.log(`\n== ${ryhma.nimi} (${ryhma.rivit.length} maata) ==`);
      for (const r of ryhma.rivit) console.log(tekstirivi(r));
    }
    console.log(`\nmaita ${rivit.length}, tavoitteessa ${rivit.length - vajaat.length}, `
      + `vajaita ${vajaat.length}`);
  }
}
