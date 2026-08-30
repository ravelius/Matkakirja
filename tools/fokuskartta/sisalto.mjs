/*
 * LAATTAPYRAMIDIN PYSYVÄ SISÄLTÖ — kaupungit, reitit, joet, järvet,
 * vuoret ja kohteet yhdeksi olioksi, joka kelpaa piirtomoottorille.
 *
 * Tämä on tools/generoi-laattapyramidi.mjs:n moduuli, ei oma työkalunsa.
 *
 * === MIKSI TÄMÄ ON OLEMASSA ========================================
 *
 * Raamattu (omistaja 29.8.2026, "LAATTAPYRAMIDI JA KARTAN PATINA",
 * täsmennys): *"kaikki reittipisteet ja kaupungit yms voidaan piirtaa
 * suoraan yhteen karttaan, eika tarvita muita kikkoja kuin rajoitettu
 * liikkuvuus"* — KAIKKI PYSYVÄ näkyy alusta asti kaikkialla, ja se
 * poltetaan laattoihin koko maailmasta.
 *
 * Tähän asti nämä piirtyivät pelin SVG-kerroksiin joka kehyksessä.
 * Laatoissa ne ovat valmiiksi maalattuja pikseleitä, ja pelille jää
 * vain ohut pelitilakerros (laattavärit, elävät merkit, nappula,
 * vinjetointi).
 *
 * === MIKÄ ON PYSYVÄÄ JA MIKÄ EI ====================================
 *
 * Tänne kuuluu vain se, mikä ei muutu pelin aikana. Kaupungin PAIKKA
 * ja NIMI ovat pysyviä; se, onko pelaaja käynyt siellä, ei ole.
 * Reitin viiva on pysyvä; sen varrella liikkuva nappula ei. Rajanveto
 * on tärkeä, koska laattaan poltettua ei saa pois ilman uutta ajoa.
 *
 * === LÄHTEET =======================================================
 *
 *   kaupungit  js/packs/maailmankartta.js  cities (261)
 *   reitit     samasta, edges (408) ja airRoutes (71)
 *   joet       js/packs/maailmankartta-nimet.js  joet (123, polyviivat)
 *   jarvet     samasta, jarvet (38)
 *   vuoret     samasta, vuoret (52)
 *   kohteet    js/packs/fokuskohteet-*.js (22 maata)
 *
 * Kaikki koordinaatit ovat LAUDAN yksiköitä, eli samassa avaruudessa
 * kuin laattojen bbox. Mitään ei projisoida uudelleen — juuri siksi
 * merkit osuvat laattoihin pikselilleen.
 */
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Kokoaa pysyvän sisällön laudalta.
 *
 * @param {object} pack js/packs/maailmankartta.js:n MAAILMANKARTTA
 * @param {string} packkikansio js/packs, josta fokuskohteet luetaan
 */
export async function keraaSisalto(pack, packkikansio) {
  const nimet = await import(`${packkikansio}/maailmankartta-nimet.js`)
    .then((m) => m.MAAILMANKARTAN_NIMET)
    .catch(() => ({ joet: [], jarvet: [], vuoret: [] }));

  /* ------------------------------------------------------ kaupungit */

  /*
   * Kaupungin nimiön ankkuri ja siirtymä tulevat laudalta (`la`, `lx`,
   * `ly`). Ne on aseteltu käsin niin, ettei nimi peitä rannikkoa tai
   * naapurikaupunkia, ja juuri siksi ne luetaan sellaisenaan eikä
   * keksitä uutta asettelua: laudan oma ladonta on hiottua työtä.
   */
  /*
   * TÄRKEYS RATKAISEE TÖRMÄYKSEN.
   *
   * Nimiöitä ei mahdu tiheimpään kohtaan kaikkia, ja silloin on
   * päätettävä kumpi jää. Päätös ei saa olla mielivaltainen eikä
   * aakkosjärjestys: PELIN KANNALTA MERKITYKSELLINEN KAUPUNKI VOITTAA
   * KORISTEELLISEN. Lähtökaupunki on pelin aloituspiste, lentokenttä
   * on solmu johon pelaaja voi lentää, ja reittisolmun aste kertoo
   * kuinka moni matka kulkee sen kautta. Koristeellinen kaupunki on
   * se, jolla ei ole näistä mitään.
   */
  const aste = new Map();
  for (const e of pack.edges ?? []) {
    aste.set(e.a, (aste.get(e.a) ?? 0) + 1);
    aste.set(e.b, (aste.get(e.b) ?? 0) + 1);
  }
  for (const e of pack.airRoutes ?? []) {
    aste.set(e.a, (aste.get(e.a) ?? 0) + 1);
    aste.set(e.b, (aste.get(e.b) ?? 0) + 1);
  }
  const kaupungit = (pack.cities ?? []).map((c) => ({
    id: c.id,
    nimi: c.name,
    x: c.x,
    y: c.y,
    la: c.la ?? 'start',
    lx: c.lx ?? 0,
    ly: c.ly ?? 0,
    // Lähtökaupungit ja lentokentät ovat kartalla isompia pisteitä.
    iso: Boolean(c.start || c.airport),
    tarkeys: (c.start ? 8 : 0) + (c.airport ? 4 : 0)
      + Math.min(3, aste.get(c.id) ?? 0),
  }));
  const paikka = new Map(kaupungit.map((c) => [c.id, c]));

  /* --------------------------------------------------------- reitit */

  /*
   * REITTI ON JANA KAHDEN KAUPUNGIN VÄLILLÄ, ei sen kummempaa: laudan
   * oma piirto vetää ne suorina. Päivämääränrajan yli menevä jana
   * katkaistaan vasta piirrossa (viivaPolku), joten tänne se tulee
   * sellaisenaan.
   */
  const jana = (e) => {
    const a = paikka.get(e.a);
    const b = paikka.get(e.b);
    return a && b ? { ax: a.x, ay: a.y, bx: b.x, by: b.y } : null;
  };
  const reitit = (pack.edges ?? []).map(jana).filter(Boolean);
  const lentoreitit = (pack.airRoutes ?? []).map(jana).filter(Boolean);

  /* ----------------------------------------------------------- joet */

  /*
   * Joen geometria on valmiina polyviivana (`pisteet`) laudan
   * koordinaateissa. `tarkeys` 1 on pääjoki; sitä käytetään
   * yleistykseen — kaukaa piirretään vain pääjoet.
   */
  const joet = (nimet.joet ?? [])
    .filter((j) => Array.isArray(j.pisteet) && j.pisteet.length > 1)
    .map((j) => ({
      nimi: j.nimi,
      tarkeys: j.tarkeys ?? 2,
      pisteet: j.pisteet,
      // Nimiön paikka: laudalta jos annettu, muuten uoman puolivälistä.
      laatta: j.laatta ?? null,
    }));

  const jarvet = (nimet.jarvet ?? [])
    .filter((v) => Number.isFinite(v.x) && Number.isFinite(v.y))
    .map((v) => ({
      nimi: v.nimi, x: v.x, y: v.y, tarkeys: v.tarkeys ?? 2,
    }));

  const vuoret = (nimet.vuoret ?? [])
    .filter((v) => Number.isFinite(v.x) && Number.isFinite(v.y))
    .map((v) => ({
      nimi: v.nimi,
      x: v.x,
      y: v.y,
      korkeus: v.korkeus ?? null,
      tarkeys: v.tarkeys ?? 2,
    }));

  /* -------------------------------------------------------- kohteet */

  /*
   * Kohteet ovat maakohtaisissa tiedostoissa (fokuskohteet-XXX.js), ja
   * jokainen kantaa paikkansa `laudat.maailmankartta`-taulussa. Ne
   * luetaan kansiosta eikä nimilistasta: uusi maa ilmestyy pyramidiin
   * pelkällä tiedostolla, kuten se ilmestyy peliinkin.
   */
  const kohteet = [];
  let tiedostot = [];
  try {
    tiedostot = readdirSync(packkikansio)
      .filter((n) => /^fokuskohteet-[a-z]{3}\.js$/.test(n)).sort();
  } catch { tiedostot = []; }
  for (const tiedosto of tiedostot) {
    const moduuli = await import(join(packkikansio, tiedosto)).catch(() => null);
    if (!moduuli) continue;
    for (const vienti of Object.values(moduuli)) {
      if (!Array.isArray(vienti)) continue;
      for (const k of vienti) {
        const p = k?.laudat?.maailmankartta;
        if (!p || !Number.isFinite(p.x) || !Number.isFinite(p.y)) continue;
        kohteet.push({
          nimi: k.nimi, tyyppi: k.tyyppi ?? 'kohde', x: p.x, y: p.y,
        });
      }
    }
  }

  /* ---------------------------------------------- kaksoisnimien pari */

  parita(kaupungit, vuoret, jarvet);

  return {
    kaupungit, reitit, lentoreitit, joet, jarvet, vuoret, kohteet,
  };
}

/*
 * SAMA NIMI VAIN KERRAN KARTALLE.
 *
 * Laudan paikat ja maastonimet tulevat eri lähteistä (cities ja
 * maailmankartta-nimet), eikä kumpikaan tiedä toisesta. Osa laudan
 * paikoista on oikeasti vuoristoja tai järviä, jolloin sama nimi oli
 * kartalla kahdesti: kerran kaupunkipisteen ja kerran maastomerkin
 * kanssa (havaittu z3-laatalta, Ahaggar Saharassa, 30.8.2026).
 *
 * SÄÄNTÖ ON YLEINEN, EI NIMILISTA. Kolmen nimen kovakoodaus olisi
 * korjannut vain ne kolme, jotka sattuivat näkymään — ja mittaus
 * osoitti listan olevan väärä: pareja on KUUSI, koska myös järvet
 * (Titicaca, Tanganjika, Tšad-järvi) kaksintuvat, eivät vain vuoret
 * (Alpit, Ahaggar, Appalakit). Yleinen sääntö löysi ne itse.
 *
 * PARI = SAMA NORMALISOITU NIMI JA LÄHEKKÄIN. Pelkkä nimi ei riitä:
 * eri maanosassa oleva samanniminen paikka on eri kohde ja ansaitsee
 * oman nimiönsä. Etäisyysraja on vakuutus tulevaa vastaan, ei
 * viritysruuvi — mitattuna kauimmainen aito pari on Alpit 114,7
 * lautayksikköä, ja välillä 115…6000 tulos on täsmälleen sama kuusi
 * paria. 400 antaa yli kolminkertaisen pelivaran aitoon pariin ja jää
 * silti kauas mantereiden välisistä etäisyyksistä.
 *
 * MOLEMMAT MERKIT JÄÄVÄT. Kaupunkipiste on se, johon pelaaja
 * matkustaa, joten se ei saa kadota; vuorisymboli kertoo mistä on
 * kyse. Vain NIMIÖ yhdistetään. Kumpi nimiö jää, ratkaistaan vasta
 * ladonnassa tasokohtaisesti (ks. tools/generoi-laattapyramidi.mjs).
 */

/** Nimen vertailumuoto: ilman tarkkeita, välimerkkejä ja kirjainkokoa. */
export const normalisoiNimi = (s) => String(s ?? '')
  .normalize('NFD')
  .replace(/\p{Diacritic}/gu, '')
  .toLowerCase()
  .replace(/[^\p{L}\p{N}]+/gu, '');

/** Sama nimi lähekkäin = sama kohde. Ks. perustelu yllä. */
export const PARIN_ETAISYYS = 400;

/**
 * Merkitsee laudan paikan ja maastonimen pariksi, kun ne tarkoittavat
 * samaa kohdetta. Ei poista kumpaakaan — päätös nimiöstä on ladonnan.
 */
export function parita(kaupungit, vuoret, jarvet) {
  const maasto = [
    ...vuoret.map((v) => ({ kohde: v, laji: 'vuori' })),
    ...jarvet.map((j) => ({ kohde: j, laji: 'jarvi' })),
  ];
  let pareja = 0;
  for (const c of kaupungit) {
    const nimi = normalisoiNimi(c.nimi);
    let lahin = null;
    let lahinEtaisyys = Infinity;
    for (const m of maasto) {
      if (normalisoiNimi(m.kohde.nimi) !== nimi) continue;
      // Lauta kiertyy: 12000 yksikköä on koko maapallon ympärys.
      let dx = Math.abs(c.x - m.kohde.x);
      if (dx > 6000) dx = 12000 - dx;
      const d = Math.hypot(dx, c.y - m.kohde.y);
      if (d < lahinEtaisyys) { lahinEtaisyys = d; lahin = m; }
    }
    if (!lahin || lahinEtaisyys > PARIN_ETAISYYS) continue;
    // Kaupunki tietää maastonimen sijainnin; maastonimi tietää olevansa
    // parillinen, jottei ladonta lataa sitä kahdesti.
    c.maastopari = {
      nimi: lahin.kohde.nimi,
      laji: lahin.laji,
      x: lahin.kohde.x,
      y: lahin.kohde.y,
      tarkeys: lahin.kohde.tarkeys ?? 2,
    };
    lahin.kohde.parillinen = true;
    pareja += 1;
  }
  return pareja;
}

/** Lyhyt yhteenveto lokiin. */
export function sisallonYhteenveto(s) {
  return `kaupungit ${s.kaupungit.length} · reitit ${s.reitit.length}`
    + `(+${s.lentoreitit.length} lento) · joet ${s.joet.length} · `
    + `järvet ${s.jarvet.length} · vuoret ${s.vuoret.length} · `
    + `kohteet ${s.kohteet.length}`;
}
