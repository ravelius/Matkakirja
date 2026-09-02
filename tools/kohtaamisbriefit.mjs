/*
 * KOHTAAMISBRIEFIT — kuvaputken lähtötiedot pelin aarrekohtaamisista.
 *
 * "Kohtaaminen" tarkoittaa tässä pelin tarinakaaren aarrekohtaamista:
 * kaupungin nimetty paikallinen hahmo esittää pelaajalle kysymyksen,
 * jonka oikea vastaus avaa kätkön. Kysymys, vaihtoehdot ja oikea
 * vastaus ovat YKSI PARI tekstin kanssa (js/tyohuone-kehitys-data.js,
 * KAARI_PAKETIT.kohteet — kommentti: "kolme osaa kohti kohdetta …
 * KOHTAAMINEN jossa henkilö esittää … kysymyksen"). Sama data ajaa
 * peliä js/packs/tarinakaari.js:n TARINAKAARI-taulun kautta
 * (js/visa.js renderQuiz, kaariTarina), joten tämä työkalu lukee
 * TARINAKAARIN — se ON pelissä käytössä oleva 41 Euroopan kohteen
 * joukko (js/tyohuone-kehitys-data.js: "Euroopan 41 kohdetta
 * luentoineen"). Lähi-idän 28 kohdetta samassa raakadatassa ovat
 * omistajan tilauksesta (9.8.2026) vielä ILMAN luentoja ja "työhuoneen
 * arviota varten" — TARINAKAARI-suodatin (luennat !== false) jättää
 * ne pois, ja niin tekee tämäkin työkalu: brief on kuvaputkelle
 * eikä hyväksymättömälle tekstille pidä tilata kuvaa.
 *
 * KENTÄT KOHTEEN OMASTA DATASTA:
 *   henkilo     — hahmon ammatti/kuvaus/suhde (vapaamuotoinen lause)
 *   nimi        — hahmon kutsumanimi (johdettu henkilo-tekstistä,
 *                 js/packs/tarinakaari.js kutsumanimi, tai kohteen
 *                 oma nimi-kenttä)
 *   kohtaaminen — hahmon repliikki: tilanne, paikka ja kysymyksen
 *                 pohjustus samassa tekstissä (esittely)
 *   kysymys.q / .vaihtoehdot / .oikea — visan sisältö sanatarkasti
 *
 * KOHTAAMISPAIKKA ei ole oma kenttä KAARI_PAKETIT-datassa — se asuu
 * fokusvirtakaupungeilla omassa paketissaan (js/packs/fokusvirta-
 * <kaupunki>.js, kenttä `kohtaamispiste.nimi`, rekisteri js/packs/
 * fokusvirrat.js FOKUSVIRRAT). Kaupungille ilman kohtaamispistettä
 * paikka jää kaupungin omaksi laatan sijainniksi kartalla — sitä ei
 * arvata, vaan se sanotaan ääneen puuttuvaksi.
 *
 * KUVA. "Onko jo tarkistettu kuva" tulee js/kohtaamiskuvat-data.js:n
 * katalogista (KOHTAAMISKUVAT_KOHTEELLE): vain tila 'tarkistettu'
 * lasketaan olemassa olevaksi kuvaksi (sama sääntö kuin pelissä,
 * js/kohtaamiskuvat-data.js kohtaamiskuvaKohteelle). Brief kertoo vain
 * tilan ja tiedostonimen — ei galleriakuvausta, alt-tekstiä, hetkeä
 * eikä vihjettä ("ei kuvadataa"), koska ne kuuluvat jo tehdyn kuvan
 * omaan tuotantoriviin eivätkä uuden kuvan tilaukseen.
 *
 * VASTAUKSEN SALASSAPITO. Oikea vastaus on JOKA lohkossa merkitty
 * "EI SAA NÄKYÄ KUVASSA" (docs/kuvatuotanto-kohtaamiset.md: "kysymys
 * näkyy esineenä, toimintana tai miljöövihjeenä, mutta oikeaa
 * vastausta ei paljasteta").
 *
 * KÄYTTÖ:
 *   node tools/kohtaamisbriefit.mjs --md --ulos polku.md
 *   node tools/kohtaamisbriefit.mjs --json --ulos polku.json
 *   node tools/kohtaamisbriefit.mjs --json --kaupunki rooma --ulos r.json
 *   node tools/kohtaamisbriefit.mjs --md --vain-kuvattomat --ulos puuttuvat.md
 *
 * Täsmälleen yksi muodoista (--md TAI --json) ja --ulos <tiedosto>
 * ovat pakollisia. --kaupunki <tunnus> rajaa yhteen kaupunkiin
 * (pelin kaupunkitunnus, esim. "rooma"). --vain-kuvattomat jättää pois
 * kaupungit, joilla on jo tarkistettu kohtaamiskuva. Työkalu EI
 * kirjoita repon sisälle mitään muuta kuin --ulos-polun osoittaman
 * tiedoston.
 */

import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { EUROPE_CITY_COUNTRY } from '../js/packs/europe-countries.js';
import { EUROPE } from '../js/packs/europe.js';
import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';
import { TARINAKAARI } from '../js/packs/tarinakaari.js';
import { kohtaamiskuvaKohteelle } from '../js/kohtaamiskuvat-data.js';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/*
 * Maakoodi → suomenkielinen maanimi. Vain ne 29 ISO-koodia, jotka
 * esiintyvät TARINAKAAREN 41 kaupungilla (js/packs/europe-countries.js,
 * EUROPE_CITY_COUNTRY) — ei arvattua listaa muille maille. Nimet ovat
 * maiden yleiskielisiä suomennoksia, ei kanonista tarinatekstiä, joten
 * ne saa kirjoittaa suoraan tähän työkaluun ilman Raamattu-käsittelyä.
 */
const MAANIMET = {
  AUT: 'Itävalta',
  BGR: 'Bulgaria',
  BIH: 'Bosnia ja Hertsegovina',
  CHE: 'Sveitsi',
  CZE: 'Tšekki',
  DEU: 'Saksa',
  DNK: 'Tanska',
  ESP: 'Espanja',
  EST: 'Viro',
  FIN: 'Suomi',
  FRA: 'Ranska',
  GBR: 'Yhdistynyt kuningaskunta',
  GRC: 'Kreikka',
  HRV: 'Kroatia',
  HUN: 'Unkari',
  IRL: 'Irlanti',
  ISL: 'Islanti',
  ITA: 'Italia',
  LTU: 'Liettua',
  LVA: 'Latvia',
  NLD: 'Alankomaat',
  NOR: 'Norja',
  POL: 'Puola',
  PRT: 'Portugali',
  ROU: 'Romania',
  RUS: 'Venäjä',
  SWE: 'Ruotsi',
  TUR: 'Turkki',
  UKR: 'Ukraina',
};

/*
 * Kuvalinjan tiivistelmä otsikkoon: kymmenen sääntöä, yksi rivi
 * kukin. Lähde: docs/kuvatuotanto-kohtaamiset.md, "Omistajan
 * hyväksymä kuvalinja" ja "Pulu eli Columba Livia" -osiot. Sanamuoto
 * on tiivistetty tähän — täysi teksti asuu vain siellä.
 */
export const KUVALINJA_SAANNOT = [
  'Autenttinen, tunnelmallinen nykyajan toimituksellinen valokuva — ei piirros eikä historiallinen naamiointi.',
  'Kaksi aikakerrosta kuvassa: nykyinen toiminta/tekniikka/muoti JA vanha rakennus, elävä perinne tai kaupungin muistuma.',
  'Henkilö pysäytetään kesken aidon tekemisen — ei jäykkä seisoma- tai istumamuotokuva.',
  'Asento saa olla kekseliäs, kun toiminta tekee siitä uskottavan ja turvallisen; valo ja painovoima lukevat luonnollisesti.',
  'Kohtaus tarvitsee vinolinjan, kurotuksen, kierron, painonsiirron tai kesken jääneen työliikkeen.',
  'Rajaus on enintään puolivartalo.',
  'Kysymys näkyy esineenä, toimintana tai miljöövihjeenä — OIKEAA VASTAUSTA EI PALJASTETA.',
  'Varsinainen kysyjä katsoo aina suoraan kameran linssiin eli pelaajaan; sivuhahmot saavat katsoa muualle.',
  'Hahmojen kasvoikä, kasvonmuoto, ihonsävy, sukupuoli, ruumiinrakenne, hiukset ja vaatetus vaihtelevat suunnitelmallisesti — sama yhdistelmä ei toistu peräkkäin.',
  'Ei kuvansisäistä tekstiä, logoa eikä vesileimaa. Pulu (Columba livia, kalliokyyhky — EI pöllö) livahtaa vain harvoin, ei joka kuvan toistuva koriste.',
];

/*
 * Kohtaamispaikan nimi, kun sellainen on erikseen merkitty. Vain
 * fokusvirtakaupungeilla on kenttä `kohtaamispiste.nimi`
 * (js/packs/fokusvirta-<kaupunki>.js) — muilla kohtaaminen tapahtuu
 * kaupungin omalla laatalla eikä yhtä nimettyä pistettä ole.
 */
function kohtaamispaikka(cityId, kaupunkiNimi) {
  const piste = FOKUSVIRRAT[cityId]?.kohtaamispiste?.nimi;
  if (piste) return piste;
  return `${kaupunkiNimi} (ei erillistä kohtaamispistettä merkitty datassa — kohtaaminen sijoittuu kaupungin laatalle)`;
}

function kaupunkiNimi(cityId) {
  return EUROPE.cities.find((c) => c.id === cityId)?.name ?? cityId;
}

function maaNimi(cityId) {
  const iso = EUROPE_CITY_COUNTRY[cityId];
  return iso ? (MAANIMET[iso] ?? iso) : null;
}

function kuvaTila(cityId) {
  const kuva = kohtaamiskuvaKohteelle(cityId);
  return kuva
    ? { tarkistettu: true, tiedosto: kuva.tiedosto }
    : { tarkistettu: false, tiedosto: null };
}

/** Yksi brief-olio yhdestä kohtaamisesta. */
export function rakennaBrief(cityId) {
  const kohde = TARINAKAARI[cityId];
  if (!kohde) return null;
  const nimi = kaupunkiNimi(cityId);
  const { q, vaihtoehdot, oikea } = kohde.kysymys;
  const vaarat = vaihtoehdot.filter((_, i) => i !== oikea);
  return {
    kaupunki: { tunnus: cityId, nimi },
    maa: maaNimi(cityId),
    hahmo: { nimi: kohde.nimi ?? null, kuvaus: kohde.henkilo },
    kohtaamispaikka: kohtaamispaikka(cityId, nimi),
    tilanne: kohde.kohtaaminen,
    kysymys: q,
    oikeaVastaus: { teksti: vaihtoehdot[oikea], huomio: 'EI SAA NÄKYÄ KUVASSA' },
    vaaratVaihtoehdot: vaarat,
    kuva: kuvaTila(cityId),
  };
}

/** Kaikki briefit, kaupungin nimen mukaan aakkosjärjestyksessä. */
export function kaikkiBriefit({ kaupunki, vainKuvattomat } = {}) {
  let ids = Object.keys(TARINAKAARI);
  if (kaupunki) {
    ids = ids.filter((id) => id === kaupunki);
  }
  let briefit = ids.map(rakennaBrief).filter(Boolean);
  if (vainKuvattomat) briefit = briefit.filter((b) => !b.kuva.tarkistettu);
  briefit.sort((a, b) => a.kaupunki.nimi.localeCompare(b.kaupunki.nimi, 'fi'));
  return briefit;
}

function otsikkoMd({ kaupunki, vainKuvattomat }) {
  const rajaus = kaupunki ? ` — rajattu kaupunkiin "${kaupunki}"` : '';
  const kuvatonRajaus = vainKuvattomat ? ' — vain kuvattomat kohtaamiset' : '';
  const rivit = KUVALINJA_SAANNOT.map((s, i) => `${i + 1}. ${s}`).join('\n');
  return `# Kohtaamisbriefit kuvaputkelle${rajaus}${kuvatonRajaus}\n\n`
    + 'Lähde: js/packs/tarinakaari.js (TARINAKAARI), '
    + 'js/packs/fokusvirrat.js (kohtaamispisteet), '
    + 'js/kohtaamiskuvat-data.js (kuvatila). '
    + 'Täysi kuvalinja: docs/kuvatuotanto-kohtaamiset.md.\n\n'
    + '## Kuvalinjan tiivistelmä (10 sääntöä)\n\n'
    + `${rivit}\n\n---\n`;
}

function briefLohkoMd(b) {
  const vaaratMd = b.vaaratVaihtoehdot.map((v) => `  - ${v}`).join('\n');
  const kuvaRivi = b.kuva.tarkistettu
    ? `Tarkistettu (${b.kuva.tiedosto})`
    : 'Ei vielä tarkistettua kuvaa';
  return `## ${b.kaupunki.nimi} (${b.kaupunki.tunnus})\n\n`
    + `- **Maa:** ${b.maa ?? '(tuntematon)'}\n`
    + `- **Hahmo:** ${b.hahmo.nimi ?? '(nimeä ei tunnistettu)'} — ${b.hahmo.kuvaus}\n`
    + `- **Kohtaamispaikka:** ${b.kohtaamispaikka}\n`
    + `- **Tilanne (esittely):** ${b.tilanne}\n`
    + `- **Kysymys:** ${b.kysymys}\n`
    + `- **Oikea vastaus (${b.oikeaVastaus.huomio}):** ${b.oikeaVastaus.teksti}\n`
    + `- **Väärät vaihtoehdot:**\n${vaaratMd}\n`
    + `- **Kuva:** ${kuvaRivi}\n`;
}

function muodostaMd(briefit, valinnat) {
  return otsikkoMd(valinnat) + briefit.map(briefLohkoMd).join('\n');
}

function muodostaJson(briefit) {
  return JSON.stringify({
    kuvalinjaSaannot: KUVALINJA_SAANNOT,
    kuvalinjaLahde: 'docs/kuvatuotanto-kohtaamiset.md',
    lukumaara: briefit.length,
    kohtaamiset: briefit,
  }, null, 2);
}

/* ---------- CLI ---------- */

function jasennaArgumentit(argv) {
  const opt = {
    md: false, json: false, kaupunki: null, vainKuvattomat: false, ulos: null,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--md') opt.md = true;
    else if (a === '--json') opt.json = true;
    else if (a === '--vain-kuvattomat') opt.vainKuvattomat = true;
    else if (a === '--kaupunki') { opt.kaupunki = argv[i + 1]; i += 1; }
    else if (a === '--ulos') { opt.ulos = argv[i + 1]; i += 1; }
    else throw new Error(`Tuntematon argumentti: ${a}`);
  }
  if (opt.md === opt.json) {
    throw new Error('Anna täsmälleen yksi muoto: --md TAI --json.');
  }
  if (!opt.ulos) throw new Error('--ulos <tiedosto> puuttuu.');
  return opt;
}

function main() {
  const opt = jasennaArgumentit(process.argv.slice(2));
  if (opt.kaupunki && !TARINAKAARI[opt.kaupunki]) {
    const tunnetut = Object.keys(TARINAKAARI).sort().join(', ');
    throw new Error(`Tuntematon kaupunkitunnus "${opt.kaupunki}". Tunnetut: ${tunnetut}`);
  }
  const briefit = kaikkiBriefit({ kaupunki: opt.kaupunki, vainKuvattomat: opt.vainKuvattomat });
  const sisalto = opt.md ? muodostaMd(briefit, opt) : muodostaJson(briefit);
  const polku = resolve(process.cwd(), opt.ulos);
  writeFileSync(polku, sisalto, 'utf8');
  const kuvattomia = briefit.filter((b) => !b.kuva.tarkistettu).length;
  console.log(`Kirjoitettu ${briefit.length} kohtaamista (${opt.md ? 'md' : 'json'}) → ${polku}`);
  console.log(`Näistä ilman tarkistettua kuvaa: ${kuvattomia}`);
}

// Ajetaan vain suorana skriptinä, ei kun tiedostoa tuodaan testistä.
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    main();
  } catch (err) {
    console.error(err.message);
    process.exitCode = 1;
  }
}

void JUURI; // varattu mahdollista myöhempää polkujen tarkistusta varten
