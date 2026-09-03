/*
 * HISTORIAN HETKEN LEHTISIVU — GENEROITU PAKASTA, EI KÄSIN.
 *
 *   node tools/paivita-hetkisivut.mjs            # kirjoittaa sivut
 *   node tools/paivita-hetkisivut.mjs --tarkista # ei kirjoita, exit 1 erosta
 *
 * === MIKSI TÄMÄ ON OLEMASSA ========================================
 *
 * Jokainen historian hetki on sisältöä kahdessa paikassa yhtä aikaa:
 * kartan kortissa (js/packs/historian-hetket.js) ja lehden omalla
 * sivullaan (js/packs/kulttuuri-kategoriat.js, js/packs/maa-kategoriat.js).
 * Sivu oli aiemmin käsin kopioitu, ja juuri sellainen kopio eriytyy
 * hiljaa: kuvan osoite jää vanhaksi, lähderivi menettää
 * havainnekuvamaininnan tai teksti korjataan vain toiseen paikkaan.
 * tests/historian-hetket.test.mjs kaatuu siitä, mutta vasta jälkikäteen
 * — ja korjaus on käsityötä sekin.
 *
 * Nyt sivu GENEROIDAAN. Pakka on ainoa lähde: otsikko, päiväys, kuvat,
 * kuvatekstit ja lähderivit tulevat sieltä sellaisinaan, ja sivun oma
 * sisältö (`lehtiJohdanto`, `lehtiTehtava`) asuu saman hetken vieressä
 * samassa tiedostossa. Kahta totuutta ei enää ole.
 *
 * === MITEN LOHKO LÖYDETÄÄN =========================================
 *
 * Sivut ovat käsin kirjoitettuja tiedostoja, joita ei voi generoida
 * kokonaan, joten työkalu tekee tekstikirurgiaa: se etsii rivin
 * `      id: 'hetki-<tunnus>',`, kelaa siitä taaksepäin lohkon
 * avaavaan `    {` -riviin (ja sitä edeltävään lohkokommenttiin) ja
 * eteenpäin sulkevaan `    },` -riviin. Talon sisennystyyli on tässä
 * sopimus, johon myös tools/tarkista-niputus.mjs nojaa: aihesivu on
 * neljän välilyönnin syvyydellä oleva olio.
 *
 * PUUTTUVA SIVU LISÄTÄÄN oman lehtensä listaan viimeiseksi — tai
 * `menovinkit`-sivun eteen, koska linkkilistan on tests/lehdet.test.mjs
 * mukaan oltava maalehden viimeinen sivu.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  HISTORIAN_HETKET, hetkenKuvat,
} from '../js/packs/historian-hetket.js';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');

const TIEDOSTOT = {
  kaupunki: 'js/packs/kulttuuri-kategoriat.js',
  maa: 'js/packs/maa-kategoriat.js',
};

/* ==================== LÄHDETEKSTIN LATOMINEN ==================== */

/** Rivin enimmäispituus, kun merkkijono katkaistaan jatkoriveille. */
const RIVIN_MITTA = 84;

/** Merkkijono JS-lähteeksi hipsuineen ja pakomerkkeineen. */
function hipsuissa(teksti) {
  return `'${String(teksti).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

/**
 * MERKKIJONOKENTTÄ YHDELLE TAI USEALLE RIVILLE.
 *
 * Lyhyt teksti mahtuu riville sellaisenaan; pitkä katkaistaan sanan
 * rajalta ja jatketaan talon tyylillä (`+ '…'` kahden välilyönnin
 * lisäsisennyksellä). Katkaisukohdan välilyönti jää edellisen palan
 * loppuun, jotta yhdistetty teksti on merkilleen sama.
 */
function kentta(sisennys, avain, teksti) {
  const alku = `${' '.repeat(sisennys)}${avain}: `;
  const yhdella = `${alku}${hipsuissa(teksti)},`;
  if (yhdella.length <= RIVIN_MITTA + 8) return [yhdella];

  const jatkoSisennys = ' '.repeat(sisennys + 2);
  const palat = [];
  let pala = '';
  // Sanat ja niitä seuraavat välilyönnit yhtenä yksikkönä.
  for (const sana of String(teksti).match(/\S+\s*/g) ?? []) {
    const ehdokas = pala + sana;
    const tila = (palat.length ? jatkoSisennys.length + 2 : alku.length) + ehdokas.length + 3;
    if (pala && tila > RIVIN_MITTA) {
      palat.push(pala);
      pala = sana;
    } else {
      pala = ehdokas;
    }
  }
  if (pala) palat.push(pala);

  const rivit = [`${alku}${hipsuissa(palat[0])}`];
  for (const osa of palat.slice(1)) rivit.push(`${jatkoSisennys}+ ${hipsuissa(osa)}`);
  rivit[rivit.length - 1] += ',';
  return rivit;
}

/** Minitehtävän lohko (kysymys, neljä vaihtoehtoa, oikea, fakta). */
function tehtavaLohko(sisennys, tehtava) {
  const s = ' '.repeat(sisennys);
  const rivit = [`${s}tehtava: {`];
  rivit.push(...kentta(sisennys + 2, 'kysymys', tehtava.kysymys));
  rivit.push(`${s}  vaihtoehdot: [`);
  for (const v of tehtava.vaihtoehdot) rivit.push(`${s}    ${hipsuissa(v)},`);
  rivit.push(`${s}  ],`);
  rivit.push(`${s}  oikea: ${tehtava.oikea},`);
  rivit.push(...kentta(sisennys + 2, 'fakta', tehtava.fakta));
  rivit.push(`${s}},`);
  return rivit;
}

/** Yhden kuvan lohko lehtisivun nostossa tai sen galleriassa. */
function kuvaLohko(sisennys, hetki, kuva) {
  const rivit = [];
  rivit.push(...kentta(sisennys, 'otsikko', hetki.otsikko));
  rivit.push(`${' '.repeat(sisennys)}osoite: ${hipsuissa(kuva.osoite)},`);
  rivit.push(...kentta(sisennys, 'selite', kuva.kuvateksti));
  rivit.push(...kentta(sisennys, 'lahde', kuva.lahde));
  return rivit;
}

/**
 * KOKO LEHTISIVU LÄHDETEKSTINÄ.
 *
 * Pääkuva on kuvalistan ensimmäinen (lähikuva), loput menevät
 * galleriaan samassa järjestyksessä — täsmälleen se muoto, jota
 * tests/historian-hetket.test.mjs vertaa pakkaan.
 */
export function sivunLahde(hetki) {
  const kuvat = hetkenKuvat(hetki);
  const [paakuva, ...loput] = kuvat;
  const r = [];
  r.push('    /*');
  r.push('     * HISTORIAN HETKI — GENEROITU SIVU, ÄLÄ MUOKKAA KÄSIN.');
  r.push('     *');
  r.push(`     * Lähde: js/packs/historian-hetket.js \`${hetki.id}\`.`);
  r.push('     * Generaattori: tools/paivita-hetkisivut.mjs. Käsin tehty muutos');
  r.push('     * katoaa seuraavalla ajolla — korjaa pakkaan ja aja työkalu.');
  r.push('     *');
  r.push('     * Kuva on Matkakirjan oma havainnekuva R2-ämpärissä eikä');
  r.push('     * Commonsissa, joten se kulkee `osoite`-kenttänä (js/ui.js');
  r.push('     * varustaNostonKuva).');
  r.push('     */');
  r.push('    {');
  r.push(`      id: 'hetki-${hetki.id}',`);
  r.push("      nimi: 'Historian hetki',");
  r.push(`      otsikko: ${hipsuissa(`Historian hetki: ${hetki.nimio}`)},`);
  r.push(...kentta(6, 'johdanto', hetki.lehtiJohdanto));
  r.push(...tehtavaLohko(6, hetki.lehtiTehtava));
  r.push('      nostot: [');
  r.push('        {');
  r.push(...kentta(10, 'otsikko', hetki.otsikko));
  r.push(`          aika: ${hipsuissa(hetki.paivays)},`);
  r.push("          leveys: 'taysi',");
  r.push(`          osoite: ${hipsuissa(paakuva.osoite)},`);
  r.push(...kentta(10, 'teksti', hetki.teksti));
  r.push(...kentta(10, 'selite', paakuva.kuvateksti));
  r.push(...kentta(10, 'lahde', paakuva.lahde));
  if (loput.length) {
    r.push('          galleria: [');
    for (const kuva of loput) {
      r.push('            {');
      r.push(...kuvaLohko(14, hetki, kuva));
      r.push('            },');
    }
    r.push('          ],');
  }
  r.push('        },');
  r.push('      ],');
  r.push('    },');
  return r;
}

/* ==================== LOHKON PAIKANNUS TIEDOSTOSSA ==================== */

/** Aihesivun alku- ja loppurivi (kommentteineen), tai null. */
function lohkonRajat(rivit, sivuId) {
  const kohta = rivit.findIndex((r) => r === `      id: '${sivuId}',`);
  if (kohta < 0) return null;
  let alku = kohta;
  while (alku >= 0 && rivit[alku] !== '    {') alku -= 1;
  if (alku < 0) throw new Error(`${sivuId}: lohkon avaavaa riviä ei löydy`);
  // Lohkoa edeltävä kommentti kuuluu lohkoon ja korvautuu sekin.
  if (rivit[alku - 1] === '     */') {
    let k = alku - 1;
    while (k >= 0 && rivit[k] !== '    /*') k -= 1;
    if (k >= 0) alku = k;
  }
  let loppu = kohta;
  while (loppu < rivit.length && rivit[loppu] !== '    },') loppu += 1;
  if (loppu >= rivit.length) throw new Error(`${sivuId}: lohkon sulkevaa riviä ei löydy`);
  return { alku, loppu };
}

/** Mihin kohtaan puuttuva sivu lisätään annetun lehden listassa. */
function lisayskohta(rivit, avain) {
  const alku = rivit.findIndex((r) => r === `  ${avain}: [`);
  if (alku < 0) throw new Error(`lehteä ${avain} ei löydy — onko avain oikein?`);
  let loppu = alku + 1;
  while (loppu < rivit.length && rivit[loppu] !== '  ],') loppu += 1;
  if (loppu >= rivit.length) throw new Error(`${avain}: listan sulkeva rivi puuttuu`);
  /*
   * MENOVINKIT ON AINA VIIMEINEN (tests/lehdet.test.mjs), joten uusi
   * sivu menee sen eteen — muuten listan loppuun.
   */
  const rajat = lohkonRajat(rivit.slice(alku, loppu), 'menovinkit');
  return rajat ? alku + rajat.alku : loppu;
}

/**
 * VANHENTUNEET HETKISIVUT POIS.
 *
 * Hetken tunnus voi vaihtua (Roskilde 1000 → 1040), ja silloin vanha
 * sivu jäisi lehteen orvoksi: se ei enää vastaa mitään hetkeä, mutta
 * näkyy pelaajalle vanhalla kuvalla ja vanhalla tekstillä. Poistetaan
 * tiedostosta jokainen `hetki-*`-sivu, jota tämän ajon hetkijoukko ei
 * tunne.
 */
function poistaOrvot(rivit, tunnetut, polku, muutokset) {
  let tulos = rivit;
  for (;;) {
    const rivi = tulos.find((r) => {
      const osuma = r.match(/^ {6}id: '(hetki-[^']+)',$/);
      return osuma && !tunnetut.has(osuma[1]);
    });
    if (!rivi) return tulos;
    const sivuId = rivi.match(/^ {6}id: '(hetki-[^']+)',$/)[1];
    const rajat = lohkonRajat(tulos, sivuId);
    tulos = [...tulos.slice(0, rajat.alku), ...tulos.slice(rajat.loppu + 1)];
    muutokset.push(`${polku}: POISTETTU vanhentunut ${sivuId}`);
  }
}

/* ==================== AJO ==================== */

export function paivitaHetkisivut({ kirjoita = true } = {}) {
  const muutokset = [];
  for (const [laji, polku] of Object.entries(TIEDOSTOT)) {
    const tiedosto = join(JUURI, polku);
    let rivit = readFileSync(tiedosto, 'utf8').split('\n');
    const alkuperainen = rivit.join('\n');
    const omat = HISTORIAN_HETKET.filter((h) => h.lehti.laji === laji);
    rivit = poistaOrvot(rivit, new Set(omat.map((h) => `hetki-${h.id}`)), polku, muutokset);
    for (const hetki of omat) {
      const lahde = sivunLahde(hetki);
      const rajat = lohkonRajat(rivit, `hetki-${hetki.id}`);
      if (rajat) {
        const vanha = rivit.slice(rajat.alku, rajat.loppu + 1).join('\n');
        if (vanha === lahde.join('\n')) continue;
        rivit = [...rivit.slice(0, rajat.alku), ...lahde, ...rivit.slice(rajat.loppu + 1)];
        muutokset.push(`${polku}: päivitetty hetki-${hetki.id}`);
      } else {
        const kohta = lisayskohta(rivit, hetki.lehti.avain);
        rivit = [...rivit.slice(0, kohta), ...lahde, ...rivit.slice(kohta)];
        muutokset.push(`${polku}: LISÄTTY hetki-${hetki.id} (${hetki.lehti.avain})`);
      }
    }
    const uusi = rivit.join('\n');
    if (uusi !== alkuperainen && kirjoita) writeFileSync(tiedosto, uusi);
  }
  return muutokset;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const tarkista = process.argv.includes('--tarkista');
  const muutokset = paivitaHetkisivut({ kirjoita: !tarkista });
  if (!muutokset.length) {
    console.log('lehtisivut ovat ajan tasalla (15 hetkeä)');
    process.exitCode = 0;
  } else {
    for (const rivi of muutokset) console.log(rivi);
    console.log(`\n${muutokset.length} sivua ${tarkista ? 'eriytynyt pakasta' : 'kirjoitettu'}`);
    process.exitCode = tarkista ? 1 : 0;
  }
}
