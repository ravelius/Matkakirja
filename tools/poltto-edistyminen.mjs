#!/usr/bin/env node
/*
 * POLTON EDISTYMISRAPORTTI JA EHEYSTARKISTUS.
 *
 * Omistaja 7.9.2026 aamu, sanatarkasti: *"Voiko Macin ajokoodia
 * jotenkin vielä parantaa, jotta se antaisi väliaikaraportteja, missä
 * mennään? Varsinkin pidempien ajojen aikana. […] Tullaan varmasti
 * ajamaan noita juttuja vielä paljon."*
 *
 * Pitkä poltto (mitattu 7,5 h) näkyi ennen tätä vain siitä, että
 * työnkulun loki oli hiljaa: shardit kirjoittavat omiin lokeihinsa,
 * eikä kukaan koonnut niistä kuvaa. Nyt jokainen shardi kirjoittaa
 * tilansa pieneen tiedostoon (`lokit/<shardi>.tila`), ja tämä työkalu
 * kokoaa niistä yhden JSONin, jonka polttoskripti vie ämpäriin ja
 * tulostaa yhtenä rivinä lokiin.
 *
 * KAKSI KOMENTOA:
 *
 *   node tools/poltto-edistyminen.mjs kokoa --lokit <dir> --ajo <id>
 *        --vaihe <nimi> --ulos <tiedosto> [--valmis] [--koodi N]
 *
 *     Lukee kaikki `<dir>/*.tila` (ja shardilistat shardit.txt /
 *     pallo-shardit.txt), kirjoittaa raportin `--ulos`-tiedostoon ja
 *     tulostaa yhden rivin vakiotulosteeseen (polttoskripti tekee siitä
 *     `::notice::`-rivin). Laattaa/min lasketaan `--ulos`-tiedoston
 *     EDELLISESTÄ sisällöstä, joten tahti on aina viimeisen raportointi-
 *     välin tahti eikä koko ajon keskiarvo.
 *
 *   node tools/poltto-edistyminen.mjs eheys --lokit <dir>
 *        --shardit <lista> (--luettelo pyramidi.json | --pallo laatat.json)
 *
 *     Vertaa poltettujen laattojen määrää LUETTELON odotukseen tasoittain
 *     ja poistuu virheellä, jos laattoja puuttuu. Jokainen shardi kirjaa
 *     oman laskentansa (`lokit/<shardi>.laskut`, rivit "<kerros> <z> <n>")
 *     ENNEN vientiä ja siivousta, joten tarkistus toimii myös
 *     `--siivoa`-ajossa, jossa laattoja ei enää ole levyllä.
 *
 * ODOTUS LUETTELOSTA, EI ARVAUKSESTA:
 *   pohja z    tasot[].laatasto (bittikartta) tai sarakkeita × riveja
 *   nostot z   nostotaso.laatastot[z]  (bittikartta)
 *   viivat z   viivataso.laatastot[z]  (bittikartta)
 *   ranta  z   rantataso.laatastot[z]  (bittikartta)
 *   pallo  Z   4^Z (Mercator-taso on täysi ruudukko)
 *
 * Tasoja, joita luettelo ei kuvaa, ei verrata (ne kirjataan raporttiin);
 * shardit, joilta puuttuu `.laskut` (esim. vanhasta ajosta jäänyt
 * `.valmis`-merkki), eivät kaada tarkistusta vaan luetellaan
 * tuntemattomina — tarkistus kaatuu vain, kun laattoja OIKEASTI puuttuu.
 */
import {
  existsSync, closeSync, openSync, readFileSync, readdirSync, readSync,
  statSync, writeFileSync,
} from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Shardin tilatiedoston (avain=arvo riveittäin) jäsennys. */
export function lueTila(teksti) {
  const ulos = {};
  for (const rivi of String(teksti).split('\n')) {
    const i = rivi.indexOf('=');
    if (i > 0) ulos[rivi.slice(0, i)] = rivi.slice(i + 1);
  }
  return ulos;
}

/** Kaikki `<lokit>/*.tila` nimen mukaan järjestettynä. */
export function lueTilat(lokit) {
  if (!existsSync(lokit)) return [];
  const ulos = [];
  for (const nimi of readdirSync(lokit).filter((n) => n.endsWith('.tila')).sort()) {
    const tila = lueTila(readFileSync(join(lokit, nimi), 'utf8'));
    if (tila.shardi) ulos.push(tila);
  }
  return ulos;
}

/**
 * Lokin viimeiset rivit ilman rivinvaihtorumbaa: piirtoloki kirjoittaa
 * edistymisensä `\r`:llä, joten tiedosto on yksi pitkä rivi. Luetaan
 * vain loppu (64 kt), koska tuntien ajossa loki on megatavuja.
 */
export function viimeisetRivit(polku, rivit = 12, tavuja = 65536) {
  if (!polku || !existsSync(polku)) return [];
  const koko = statSync(polku).size;
  const alku = Math.max(0, koko - tavuja);
  const puskuri = Buffer.alloc(Math.min(tavuja, koko));
  const kahva = openSync(polku, 'r');
  try {
    readSync(kahva, puskuri, 0, puskuri.length, alku);
  } finally {
    closeSync(kahva);
  }
  return puskuri.toString('utf8')
    .replace(/\r/g, '\n')
    .split('\n')
    .map((r) => r.trimEnd())
    .filter((r) => r.length)
    .slice(-rivit);
}

/** Shardilista tiedostosta (yksi nimi rivillä); puuttuva = tyhjä. */
function lueLista(polku) {
  if (!polku || !existsSync(polku)) return [];
  return readFileSync(polku, 'utf8').split('\n').map((r) => r.trim()).filter(Boolean);
}

const numero = (arvo) => {
  const n = Number(arvo);
  return Number.isFinite(n) ? n : 0;
};

/**
 * Edistymisraportti tilatiedostoista.
 *
 * `edellinen` on saman raportin edellinen sisältö (tai null): siitä
 * lasketaan laattaa/min viimeisen välin ajalta. `nyt` on millisekunteina,
 * jotta testi voi kelata kelloa.
 */
export function kokoaEdistyminen({
  lokit, ajo, vaihe = 'poltto', valmis = false, koodi = 0,
  nyt = Date.now(), edellinen = null,
}) {
  // SHARDILISTA RAJAA JOUKON. Työkansio elää ajojen yli (valmiit
  // shardit ohitetaan), joten lokikansiossa on tilatiedostoja myös
  // shardeista, jotka eivät kuulu tähän ajoon lainkaan — eri jako, eri
  // sarja. Kun listat ovat olemassa, ne ovat totuus; ilman niitä
  // (yksittäisen shardin ajo) tilatiedostot ovat ainoa tieto.
  const kaikkiTilat = lueTilat(lokit);
  const listat = [
    ...lueLista(join(lokit, 'shardit.txt')),
    ...lueLista(join(lokit, 'pallo-shardit.txt')),
  ];
  const nimet = new Set(listat.length ? listat : kaikkiTilat.map((t) => t.shardi));
  const tilat = kaikkiTilat.filter((t) => nimet.has(t.shardi));
  const tunnetut = new Set(tilat.map((t) => t.shardi));
  const onTila = (t) => tilat.filter((x) => x.tila === t);
  const valmiit = onTila('valmis');
  const ajossa = onTila('ajossa');
  const kaatuneet = onTila('kaatui');
  const jonossa = [...nimet].filter((n) => !tunnetut.has(n));

  const tehty = tilat.reduce((s, t) => s + numero(t.tehty), 0);
  const tunnetutKaikki = tilat.filter((t) => numero(t.kaikki) > 0);
  const summaKaikki = tunnetutKaikki.reduce((s, t) => s + numero(t.kaikki), 0);
  // Kokoa vailla olevien shardien koko arvioidaan jo tunnettujen
  // keskiarvolla. Niitä on kahdenlaisia: aloittamattomat (ei
  // tilatiedostoa) ja juuri alkaneet, joiden loki ei ole vielä
  // kertonut työlistansa kokoa. Ilman arviota osuus näyttäisi sata
  // prosenttia heti ensimmäisen shardin valmistuttua.
  const keskiKoko = tunnetutKaikki.length ? summaKaikki / tunnetutKaikki.length : 0;
  const tuntematonKoko = nimet.size - tunnetutKaikki.length;
  const odotettu = Math.round(summaKaikki + tuntematonKoko * keskiKoko);

  const alkoiSek = tilat.length
    ? Math.min(...tilat.map((t) => numero(t.alkoi)).filter((n) => n > 0), Math.floor(nyt / 1000))
    : Math.floor(nyt / 1000);
  const hetki = new Date(nyt).toISOString();

  // TAHTI VAIN SAMAN AJON EDELLISESTÄ RAPORTISTA. Työkansiossa on
  // edellisen ajon edistyminen.json, ja sitä vasten laskettu tahti
  // olisi negatiivinen (uusi ajo alkaa nollasta) — juuri se luku, joka
  // näyttää oikealta ja on väärä.
  let laattaaMin = null;
  const samaAjo = edellinen && String(edellinen.ajo ?? '') === String(ajo ?? '');
  if (samaAjo && edellinen.hetki && Number.isFinite(edellinen?.laattoja?.tehty)) {
    const min = (nyt - Date.parse(edellinen.hetki)) / 60000;
    const kasvu = tehty - edellinen.laattoja.tehty;
    if (min > 0.1 && kasvu >= 0) laattaaMin = Math.round((kasvu / min) * 10) / 10;
  }
  let jaljellaMin = null;
  let arvioValmis = null;
  const jaljella = Math.max(0, odotettu - tehty);
  if (!valmis && laattaaMin && laattaaMin > 0 && jaljella > 0) {
    jaljellaMin = Math.round(jaljella / laattaaMin);
    arvioValmis = new Date(nyt + jaljellaMin * 60000).toISOString();
  }

  return {
    ajo: String(ajo ?? ''),
    vaihe,
    valmis,
    koodi: numero(koodi),
    alkoi: new Date(alkoiSek * 1000).toISOString(),
    hetki,
    kesto_min: Math.round((nyt / 1000 - alkoiSek) / 60),
    shardit: {
      kaikki: nimet.size,
      valmis: valmiit.length,
      ajossa: ajossa.length,
      kaatunut: kaatuneet.length,
      jonossa: jonossa.length,
    },
    laattoja: {
      tehty,
      odotettu,
      osuus: odotettu > 0 ? Math.round((tehty / odotettu) * 1000) / 1000 : null,
    },
    laattaa_min: laattaaMin,
    jaljella_min: jaljellaMin,
    arvio_valmis: arvioValmis,
    ajossa_nyt: ajossa.map((t) => ({
      shardi: t.shardi, tehty: numero(t.tehty), kaikki: numero(t.kaikki),
    })),
    kaatuneet: kaatuneet.map((t) => ({
      shardi: t.shardi,
      yritys: numero(t.yritys),
      loki: t.loki ?? '',
      rivit: viimeisetRivit(t.loki),
    })),
    kesken: valmis
      ? [...ajossa, ...kaatuneet].map((t) => t.shardi).concat(jonossa).sort()
      : undefined,
  };
}

/** Yhden rivin tiivistelmä (polttoskripti tekee tästä ::notice::-rivin). */
export function yhteenvetoRivi(r) {
  const osat = [];
  osat.push(`poltto ${r.ajo} ${r.valmis ? `VALMIS (koodi ${r.koodi})` : r.vaihe}`);
  osat.push(`shardit ${r.shardit.valmis}/${r.shardit.kaikki} valmis, `
    + `${r.shardit.ajossa} ajossa, ${r.shardit.jonossa} jonossa, `
    + `${r.shardit.kaatunut} kaatunut`);
  const osuus = r.laattoja.osuus === null ? '' : ` (${Math.round(r.laattoja.osuus * 100)} %)`;
  osat.push(`laattoja ${r.laattoja.tehty}/${r.laattoja.odotettu}${osuus}`);
  if (r.laattaa_min !== null) osat.push(`${r.laattaa_min} laattaa/min`);
  osat.push(`kesto ${r.kesto_min} min`);
  if (r.arvio_valmis) {
    osat.push(`arvio valmis ${r.arvio_valmis.slice(11, 16)} UTC (${r.jaljella_min} min)`);
  }
  if (r.kaatuneet.length) osat.push(`kaatuneet: ${r.kaatuneet.map((k) => k.shardi).join(' ')}`);
  return osat.join(' · ');
}

/* ------------------------------------------------------ eheystarkistus */

/** Bittikartan (base64) ykkösbittien määrä = olemassa olevat laatat. */
export function bittienMaara(base64) {
  const tavut = Buffer.from(String(base64), 'base64');
  let n = 0;
  for (const tavu of tavut) {
    let t = tavu;
    while (t) { n += t & 1; t >>= 1; }
  }
  return n;
}

/** Shardien `.laskut`-rivit yhteen: "<kerros> z<taso>" -> laattoja. */
export function summaaLaskut(lokit, nimet) {
  const summat = new Map();
  const tuntemattomat = [];
  for (const nimi of nimet) {
    const polku = join(lokit, `${nimi}.laskut`);
    if (!existsSync(polku)) { tuntemattomat.push(nimi); continue; }
    for (const rivi of readFileSync(polku, 'utf8').split('\n')) {
      const osat = rivi.trim().split(/\s+/);
      if (osat.length !== 3) continue;
      const avain = `${osat[0]} z${osat[1]}`;
      summat.set(avain, (summat.get(avain) ?? 0) + numero(osat[2]));
    }
  }
  return { summat, tuntemattomat };
}

/** Pyramidin luettelon lupaus tasoittain. */
export function odotetutPyramidista(luettelo) {
  const ulos = new Map();
  for (const t of luettelo.tasot ?? []) {
    // Laatasto on olemassa vain harvassa pyramidissa; ilman sitä
    // jokainen ruudukon laatta on olemassa (js/laattapyramidi.js
    // laattaOlemassa tulkitsee puuttuvan laataston samoin).
    ulos.set(`pohja z${t.z}`, t.laatasto
      ? bittienMaara(t.laatasto)
      : numero(t.sarakkeita) * numero(t.riveja));
  }
  for (const [kentta, kerros] of [
    ['nostotaso', 'nostot'], ['viivataso', 'viivat'], ['rantataso', 'ranta'],
  ]) {
    const taso = luettelo[kentta];
    if (!taso?.laatastot) continue;
    for (const [z, kartta] of Object.entries(taso.laatastot)) {
      ulos.set(`${kerros} z${z}`, bittienMaara(kartta));
    }
  }
  return ulos;
}

/** Pallon Mercator-sarjan lupaus: taso Z on täysi 2^Z × 2^Z -ruudukko. */
export function odotetutPallosta(laatat) {
  const ulos = new Map();
  const min = numero(laatat?.tasot?.min);
  const max = numero(laatat?.tasot?.max);
  for (let z = min; z <= max; z += 1) ulos.set(`pallo z${z}`, 4 ** z);
  return ulos;
}

/**
 * Vertaa poltettua odotukseen. Puuttuva laatta on virhe; luettelon
 * tuntematon taso ja tuntematon shardi ovat vain huomioita.
 */
export function eheys({ summat, odotetut, tuntemattomat = [] }) {
  const puuttuvat = [];
  const ylimaaraiset = [];
  const tuntematonTaso = [];
  for (const [avain, poltettu] of [...summat.entries()].sort()) {
    const odotus = odotetut.get(avain);
    if (odotus === undefined) { tuntematonTaso.push(avain); continue; }
    if (poltettu < odotus) puuttuvat.push({ avain, poltettu, odotus, ero: odotus - poltettu });
    else if (poltettu > odotus) ylimaaraiset.push({ avain, poltettu, odotus });
  }
  return {
    ok: puuttuvat.length === 0 && ylimaaraiset.length === 0,
    puuttuvat,
    ylimaaraiset,
    tuntematonTaso,
    tuntemattomat,
  };
}

/* ------------------------------------------------------------ komennot */

const valitsin = (argv, nimi, oletus = null) => {
  const i = argv.indexOf(nimi);
  return i >= 0 && i + 1 < argv.length ? argv[i + 1] : oletus;
};

function komentoKokoa(argv) {
  const lokit = valitsin(argv, '--lokit');
  const ulos = valitsin(argv, '--ulos');
  if (!lokit || !ulos) { console.error('kokoa: --lokit ja --ulos ovat pakollisia'); return 2; }
  let edellinen = null;
  if (existsSync(ulos)) {
    try { edellinen = JSON.parse(readFileSync(ulos, 'utf8')); } catch { edellinen = null; }
  }
  // Valmis-raportti ei saa lukea tahtia omasta itsestään: sen edellinen
  // on aina se raportti, joka ämpärissä juuri nyt on.
  const raportti = kokoaEdistyminen({
    lokit,
    ajo: valitsin(argv, '--ajo', ''),
    vaihe: valitsin(argv, '--vaihe', 'poltto'),
    valmis: argv.includes('--valmis'),
    koodi: valitsin(argv, '--koodi', 0),
    edellinen,
  });
  writeFileSync(ulos, `${JSON.stringify(raportti, null, 1)}\n`);
  console.log(yhteenvetoRivi(raportti));
  return 0;
}

function komentoEheys(argv) {
  const lokit = valitsin(argv, '--lokit');
  const lista = valitsin(argv, '--shardit');
  const luettelo = valitsin(argv, '--luettelo');
  const pallo = valitsin(argv, '--pallo');
  if (!lokit || !lista || (!luettelo && !pallo)) {
    console.error('eheys: --lokit, --shardit ja (--luettelo tai --pallo) ovat pakollisia');
    return 2;
  }
  const nimet = lueLista(lista);
  if (!nimet.length) { console.log('· eheystarkistus: ei shardeja, ei tarkistettavaa'); return 0; }
  const { summat, tuntemattomat } = summaaLaskut(lokit, nimet);
  const odotetut = luettelo
    ? odotetutPyramidista(JSON.parse(readFileSync(luettelo, 'utf8')))
    : odotetutPallosta(JSON.parse(readFileSync(pallo, 'utf8')));
  const tulos = eheys({ summat, odotetut, tuntemattomat });
  for (const [avain, poltettu] of [...summat.entries()].sort()) {
    const odotus = odotetut.get(avain);
    console.log(`    ${avain.padEnd(12)} ${String(poltettu).padStart(7)}`
      + (odotus === undefined ? '  (luettelo ei kuvaa tasoa)' : ` / ${odotus}`));
  }
  if (tulos.tuntemattomat.length) {
    console.log(`    HUOM: ${tulos.tuntemattomat.length} shardilta puuttuu laskenta `
      + `(vanha ajo?): ${tulos.tuntemattomat.slice(0, 8).join(' ')}`
      + (tulos.tuntemattomat.length > 8 ? ' …' : ''));
  }
  if (tulos.ok) { console.log('· eheystarkistus: laattojen määrä täsmää luetteloon'); return 0; }
  for (const p of tulos.puuttuvat) {
    console.error(`VIRHE: ${p.avain} — poltettu ${p.poltettu}, luettelo lupaa ${p.odotus} `
      + `(puuttuu ${p.ero})`);
  }
  for (const y of tulos.ylimaaraiset) {
    console.error(`VIRHE: ${y.avain} — poltettu ${y.poltettu}, luettelo lupaa vain ${y.odotus}`);
  }
  return 1;
}

const TAMA = fileURLToPath(import.meta.url);
if (process.argv[1] === TAMA) {
  const argv = process.argv.slice(2);
  const komento = argv[0];
  let koodi = 2;
  if (komento === 'kokoa') koodi = komentoKokoa(argv);
  else if (komento === 'eheys') koodi = komentoEheys(argv);
  else console.error('Käyttö: poltto-edistyminen.mjs kokoa|eheys …');
  process.exit(koodi);
}
