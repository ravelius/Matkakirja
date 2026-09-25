/*
 * MAAPOLYGONIT PELILAUDAN KOORDINAATISTOON — assets/data/maapolygonit.json.
 *
 *   NODE_USE_ENV_PROXY=1 node tools/generoi-maapolygonit.mjs
 *   node tools/generoi-maapolygonit.mjs --tarkista   (pelkkä todennus)
 *
 * Aineisto on maatummennuksen (js/maatummennus.js) ainoa syöte: kun
 * pelaaja on maansa lähikuvassa, MUUT MAAT tummennetaan hienovaraisesti
 * ja NYKYISEN maan ääriviiva piirretään paksummalla. Kumpikin tarvitsee
 * maan todellisen muodon laudan koordinaateissa — pelin oma
 * `countryShapes` on karkea sävytysrengas eikä kelpaa ääriviivaksi, ja
 * laattoihin poltettu rannikko ei ole DOMissa.
 *
 * AINEISTO ON KOKO TUMMENNETTAVA JOUKKO, EI VAIN OMA MAA (omistajan
 * kaappaus 31.8.2026 yöllä: *"Merta ei tarvitse tummentaa"*). Varjo
 * maalataan naapureiden polygoneihin eikä arkinlevyisenä suorakaiteena,
 * joten maa, jota tässä tiedostossa ei ole, jää kartalla tummentamatta
 * ja lukee merenä. Lista on pelin oma `countryShapes` (134 maata), eli
 * pelin ulkopuoliset valtiot (Benin, Malta, Andorra…) ovat tietoisesti
 * ulkona: jos joskus halutaan koko maailma, kasvatetaan tätä listaa
 * eikä piirtäjää.
 *
 * === LÄHDE ON SAMA KUIN POLTETULLA RAJALLA (omistaja 1.9.2026) ======
 *
 * Sanatarkasti, kuvakaappaus Bulgarian lehtinäkymästä: *"saako nuo
 * rajat korjattua, että tummennus ja maan rajan vahvistus menisi samaa
 * reittiä kuin raja kartassa?"*
 *
 * Vika oli KAHDESSA LÄHTEESSÄ, ei piirtäjässä. Laattoihin poltettu
 * rajaviiva tulee Natural Earthin **10m** aineistosta
 * (tools/hae-maiden-rajat.mjs, `ne_10m_admin_0_boundary_lines_land`,
 * harvennus 0,006°), ja rantaviiva samoin 10m:stä (maailma.mjs
 * `meriRenkaat`, sama 0,006°). Tämä tiedosto tehtiin **50m**
 * aineistosta ja yksinkertaistettiin vielä yhden lautayksikön
 * Douglas–Peuckerilla — eli KAHDESTI karkeampi kuin se viiva, jonka
 * päälle se piirtyy.
 *
 * MITATTU 1.9.2026 (poltetun rajaviivan kärkipisteiden etäisyys tämän
 * tiedoston renkaan reunasta, vain ne pisteet jotka ovat aidosti maan
 * omalla rajalla; lautayksikkö on noin 3,3 km, ja syvimmällä
 * pyramiditasolla noin 7 kuvapikseliä):
 *
 *     aineisto        Bulgaria (730 pistettä)   Kreikka (586)
 *     50m + DP 1      med. 0,46  max 1,43       med. 0,42  max 1,67
 *     10m + DP 1      med. 0,16  max 1,00       med. 0,19  max 0,99
 *     10m + DP 0,5    med. 0,10  max 0,50       med. 0,09  max 0,50
 *     10m + DP 0,2    med. 0,02  max 0,20       med. 0,02  max 0,20
 *
 * Luvut kertovat kaksi asiaa. Ensinnäkin 10m-polygonin reuna ja
 * 10m-rajaviivasto ovat SAMA GEOMETRIA: virhe on täsmälleen
 * yksinkertaistuksen toleranssi eikä aineistojen ero, joten
 * toleranssin valinta on koko kysymys. Toiseksi vanha 50m-lähde oli
 * tyypillisesti puolen lautayksikön eli puolentoista kilometrin
 * sivussa — lähikuvassa kolme, neljä pikseliä, ja juuri se näkyi
 * omistajan kuvassa kahtena viivana.
 *
 * Lähde (public domain):
 *   https://raw.githubusercontent.com/nvkelso/natural-earth-vector/
 *     master/geojson/ne_10m_admin_0_countries.geojson
 *
 * TIEDOSTOA EI SÄILYTETÄ REPOSSA. Se on 13 Mt, ja sama linja kuin
 * rajasettien hakijalla (tools/hae-maiden-rajat.mjs): AJO on käsin
 * ajettava ja verkosta hakeva, TULOS on repossa. Nouto tallennetaan
 * välimuistiin `.nevalimuisti/` (.gitignore), jotta toleranssia voi
 * kokeilla ilman uutta latausta. Repon `ne50.geojson` jää muiden
 * maatyökalujen käyttöön — se on karkea maalista, ei rajageometria.
 *
 * === PROJEKTIO EI OLE OMA — SE TUODAAN ============================
 *
 * Maailmankartan lauta on Millerin lieriössä (LEVEYS 12000, LON0 -175,
 * POHJOINEN 76), ja kaava asuu YHDESSÄ paikassa:
 * tools/fokuskartta/piirto.js `laudanProjektio`. Sama funktio piirtää
 * laudan fokuslehdet ja sama kaava on käsin laskettu nostopaikkoihin
 * (js/fokusnosto.js). Sitä ei kirjoiteta tähän uudestaan: kopio
 * eriytyisi ensimmäisessä korjauksessa, ja ääriviiva, joka on
 * puolikkaan asteen sivussa rannikosta, on pahempi kuin ei ääriviivaa
 * lainkaan.
 *
 * TODENNUS ON OSA AJOA (todennaProjektio). Kaksi pelin omaa, käsin
 * laskettua pistettä — Ateenan Iliou Melathron ja Delfoi
 * (js/fokusnosto.js NOSTO_MAAT.GRC) — projisoidaan uudelleen ja
 * verrataan pelin lukuihin. Ero saa olla korkeintaan 0,05
 * lautayksikköä. Jos projektio joskus vaihtuu, ajo pysähtyy tähän eikä
 * kirjoita väärää aineistoa.
 *
 * === PÄIVÄMÄÄRÄNRAJA ===============================================
 *
 * Laudan sauma ei ole 180. asteella vaan LON0:ssa eli 175. läntisellä,
 * keskellä Beringinmerta. Natural Earthin renkaat on katkaistu ±180
 * asteeseen, joten sauman yli menevät renkaat (Tšukotka, Alaskan
 * Aleutit, Fidži, Uusi-Seelanti) hyppäisivät laudan laidasta toiseen.
 * `puraRengas` purkaa hypyt: peräkkäisten pisteiden ero pidetään alle
 * puolen laudan, ja valmis rengas siirretään kokonaisluvulla laudan
 * leveyksiä niin, että sen keskipiste osuu välille [0, leveys).
 * Renkaat, jotka silti ulottuvat välin ulkopuolelle, monistaa piirtäjä
 * (js/maatummennus.js) — se on sen tieto, ei aineiston.
 *
 * === YKSINKERTAISTUS JA KOKO ======================================
 *
 * Douglas–Peucker toleranssilla TOLERANSSI lautayksikköä (1 yksikkö on
 * noin 3,3 km päiväntasaajalla). Monipolygonit säilyvät — saaristomaa
 * ilman saariaan olisi väärä muoto — mutta alle MIN_KOKO yksikön
 * sirpaleet putoavat: ne ovat laudalla alle piirtoviivan paksuisia.
 *
 * Luvut talletetaan KOKONAISLUKUINA kymmenesosayksiköissä ja
 * DELTAKOODATTUINA (ensimmäinen piste absoluuttisena, loput erotuksina).
 * Erotukset ovat pieniä lukuja, joten JSON pysyy murto-osassa siitä,
 * mitä absoluuttiset desimaaliluvut veisivät — ja purku on yksi
 * silmukka (js/maatummennus.js `puraMaa`).
 */

import {
  readFileSync, writeFileSync, existsSync, mkdirSync,
} from 'node:fs';
import { laudanProjektio } from './fokuskartta/piirto.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';

const LAHDE = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector'
  + '/master/geojson/ne_10m_admin_0_countries.geojson';
/*
 * Noudon välimuisti, EI repon aineistoa (.gitignore `.nevalimuisti/`).
 * Ks. tiedoston alku: 13 megatavun lähdettä ei säilytetä repossa, mutta
 * toleranssikokeiluja ei myöskään ajeta kymmentä latausta.
 */
const PAIKALLINEN = new URL('../.nevalimuisti/ne_10m_admin_0_countries.geojson',
  import.meta.url);
/*
 * ═══ RANNIKON NAULAUS JO LÄHTEESSÄ (Fablen päätös 20.9.2026) ═══════
 *
 * Maan kehä ja rantaviiva tulevat ERI Natural Earth -aineistoista:
 * kehä `ne_10m_admin_0_countries`ista, rantaviiva `ne_10m_ocean`ista
 * (laattoihin poltettu ranta, tools/fokuskartta/piirto.js osio 7, sekä
 * pallon vektorikerros). Ne ovat eri mieltä rannan kulusta — mitattuna
 * mediaani 107 m, p95 445 m ja SUURIN 3 939 m — ja koska kehä on
 * paksumpi ja piirtyy päällä, ohut rantaviiva pistää esiin sen vierestä.
 * Pallolla ero naulataan ajossa (js/pallovektorit.js naulaaKorostus),
 * mutta linssin tasokartalla kehä on SVG eikä sinne ole rannikkoa
 * vektoreina — siellä ero jäi näkyviin.
 *
 * Siksi naulaus tehdään jo TÄSSÄ: kehän kärki, joka on rantaviivan
 * tuntumassa, siirretään rantaviivan omalle kärjelle ennen harvennusta.
 * Silloin molemmat näkymät piirtävät saman rannan samasta geometriasta,
 * eikä kumpikaan tarvitse ajonaikaista korjausta. Sisämaan rajat eivät
 * ole rantaviivan tuntumassa eivätkä siis liiku.
 */
const MERI_LAHDE = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector'
  + '/master/geojson/ne_10m_ocean.geojson';
const MERI_PAIKALLINEN = new URL('../.nevalimuisti/ne_10m_ocean.geojson',
  import.meta.url);
/** Hilan solu ja tuntuma asteina — samat luvut kuin pallon naulauksessa. */
const NAULAUS_RUUTU = 0.05;
const NAULAUS_TOLERANSSI = 0.015;
/*
 * ═══ TARKKA RANTAVIIVA (`--meri=<geojson>`, omistaja 21.9.2026) ═══════
 *
 * Kun laatat ja pallon vektorit poltetaan GSHHG-rantaviivasta
 * (tools/gshhs-meri.mjs), kehän rannan on tultava SAMASTA tiedostosta,
 * tai kehä kulkee Natural Earthin 4–6 km:n janoina tarkan rannan
 * vieressä — mitattu Girondella 21.9.2026 (docs/raportit/poltto-koe-
 * 20260920.md, gironde-rantaviiva-ennen/jalkeen): 35 kehän omaa janaa,
 * 227 km kaksoisviivaa. Naulaus tehdään silloin KAHDESSA VAIHEESSA:
 * kärki luokitellaan rannalla olevaksi Natural Earthin merellä (sama
 * 0,015°:n tuntuma kuin ennen — admin_0 ja ne_10m_ocean eroavat enintään
 * 1,1 km, joten sisämaan rajat eivät liiku), ja rannalla oleva kärki
 * SIIRRETÄÄN tarkan rantaviivan lähimmälle janalle, jota haetaan
 * leveämmällä säteellä (TARKAN_TOLERANSSI: GSHHG ja admin_0 eroavat
 * suistoissa ja laguuneissa kilometrejä). Ompelu kulkee sen jälkeen
 * tarkan rannan renkailla, joten kehä SEURAA rantaa kärkien välissäkin.
 */
const TARKAN_TOLERANSSI = 0.06;
const tarkkaMeriPolku = process.argv.find((a) => a.startsWith('--meri='))?.slice('--meri='.length) ?? null;
const KOHDE = new URL('../assets/data/maapolygonit.json', import.meta.url);

const LEVEYS = MAAILMANKARTTA.map.width;
const KORKEUS = MAAILMANKARTTA.map.height;
const PROJEKTIO = { tyyppi: 'miller', leveys: LEVEYS, lon0: -175, pohjoinen: 76 };

/**
 * Douglas–Peuckerin toleranssi lautayksikköinä (~3,3 km/yksikkö).
 *
 * 0,2 EI OLE MAKUASIA VAAN POLTON OMA KYNNYS. Rannikko ja rajaviivat
 * harvennetaan laattoihin 0,006 asteen askeleella (maailma.mjs
 * `meriRenkaat`, tools/hae-maiden-rajat.mjs), ja päiväntasaajalla
 * 0,006° on laudalla 0,006 / 360 × 12000 = 0,2 lautayksikköä. Sama luku
 * siis, eri menetelmällä: poltto pudottaa liian lähelle osuvat pisteet,
 * tämä pudottaa pisteet, jotka ovat liian lähellä NAAPUREIDENSA
 * VÄLISTÄ JANAA — jälkimmäinen säilyttää muodon paremmin samalla
 * pistemäärällä. Kummankin virhe on korkeintaan 0,2 yksikköä eli
 * syvimmällä pyramiditasolla runsas kuvapikseli, joten viivat osuvat
 * päällekkäin joka zoomilla.
 *
 * TÄTÄ TIUKEMPI EI OSTAISI MITÄÄN: poltettu viiva on itsekin 0,2:n
 * tarkkuudella, joten 0,1:n toleranssi tavoittelisi tarkkuutta, jota
 * vertailukohdassa ei ole — ja maksaisi kolmanneksen lisää pisteitä.
 */
const TOLERANSSI = 0.2;
/** Tätä pienemmät saaret pudotetaan (rajauslaatikon suurempi sivu). */
const MIN_KOKO = 3;
/** Talletustarkkuus: kymmenesosa lautayksikköä eli noin 330 metriä. */
const TARKKUUS = 10;

/*
 * Pelin maatunnus, jota Natural Earth ei tunne samalla nimellä.
 * Etelä-Sudan on pelissä SDS (sama tunnus kuin lehdissä ja lipuissa),
 * Natural Earthissa ISO-standardin SSD.
 */
const NIMIVASTAAVUUS = { SDS: 'SSD' };

/* ------------------------------------------------------- projektion todennus */

/*
 * Pelin omat, käsin lasketut lautakoordinaatit (js/fokusnosto.js
 * NOSTO_MAAT.GRC): asteet ovat en-Wikipediasta, lautaluvut pelistä.
 */
const TODENNUS = [
  { nimi: 'Ateena (Iliou Melathron)', lon: 23.7342, lat: 37.9814, x: 6624.5, y: 1881.6 },
  { nimi: 'Delfoi', lon: 22.5009, lat: 38.4824, x: 6583.4, y: 1862.2 },
];

function todennaProjektio(p) {
  let pahin = 0;
  for (const t of TODENNUS) {
    const dx = Math.abs(p.lautaX(t.lon) - t.x);
    const dy = Math.abs(p.lautaY(t.lat) - t.y);
    pahin = Math.max(pahin, dx, dy);
    console.log(`  ${t.nimi.padEnd(26)} ${p.lautaX(t.lon).toFixed(2)} / `
      + `${p.lautaY(t.lat).toFixed(2)}  (peli ${t.x} / ${t.y})  ero ${Math.max(dx, dy).toFixed(3)}`);
  }
  if (pahin > 0.05) {
    console.error(`\nPROJEKTIO EI TÄSMÄÄ: suurin ero ${pahin.toFixed(3)} lautayksikköä.`);
    process.exit(1);
  }
  console.log(`  suurin ero ${pahin.toFixed(3)} lautayksikköä — projektio täsmää.\n`);
}

/* ---------------------------------------------------------------- aineisto */

async function lueLahde() {
  if (existsSync(PAIKALLINEN)) {
    console.log(`Lähde: ${PAIKALLINEN.pathname} (välimuisti)`);
    return JSON.parse(readFileSync(PAIKALLINEN, 'utf8'));
  }
  console.log(`Lähde: ${LAHDE}`);
  const vastaus = await fetch(LAHDE);
  if (!vastaus.ok) throw new Error(`Natural Earth ${vastaus.status}`);
  const data = await vastaus.json();
  // Välimuisti on .gitignoressa; kansio voi puuttua tyhjästä työkopiosta.
  mkdirSync(new URL('.', PAIKALLINEN), { recursive: true });
  writeFileSync(PAIKALLINEN, JSON.stringify(data));
  return data;
}

/** Meriaineisto välimuistista tai verkosta (ks. RANNIKON NAULAUS). */
async function lueMeri() {
  if (existsSync(MERI_PAIKALLINEN)) {
    console.log(`Meri: ${MERI_PAIKALLINEN.pathname} (välimuisti)`);
    return JSON.parse(readFileSync(MERI_PAIKALLINEN, 'utf8'));
  }
  console.log(`Meri: ${MERI_LAHDE}`);
  const vastaus = await fetch(MERI_LAHDE);
  if (!vastaus.ok) throw new Error(`Natural Earth ocean ${vastaus.status}`);
  const data = await vastaus.json();
  mkdirSync(new URL('.', MERI_PAIKALLINEN), { recursive: true });
  writeFileSync(MERI_PAIKALLINEN, JSON.stringify(data));
  return data;
}

/**
 * Rantaviivan kärjet hilaan. Arvo on `[lon, lat, rengas, i]`: kahden
 * viimeisen avulla naulattu kärki osaa kertoa, MISTÄ KOHTAA rantaa se
 * on — ja juuri sitä ompelu tarvitsee (ks. ompeleRengas).
 */
function rannikkoHila(meri) {
  const hila = new Map();
  const renkaat = [];
  const lisaa = (p, rengasId, i) => {
    if (!Number.isFinite(p?.[0]) || !Number.isFinite(p[1])) return;
    const avain = `${Math.round(p[0] / NAULAUS_RUUTU)}|${Math.round(p[1] / NAULAUS_RUUTU)}`;
    const arvo = [p[0], p[1], rengasId, i];
    const lista = hila.get(avain);
    if (lista) lista.push(arvo); else hila.set(avain, [arvo]);
  };
  const osat = (geometry) => {
    if (geometry.type === 'Polygon') return geometry.coordinates;
    if (geometry.type === 'MultiPolygon') return geometry.coordinates.flat();
    return [];
  };
  for (const f of meri.features ?? []) {
    for (const rengas of osat(f.geometry ?? {})) {
      const id = renkaat.length;
      renkaat.push(rengas);
      for (let i = 0; i < rengas.length; i += 1) lisaa(rengas[i], id, i);
    }
  }
  return { hila, renkaat };
}

/**
 * Kehän kärjet rantaviivalle siellä, missä ranta on tuntumassa.
 * Palauttaa uuden renkaan ja siirrettyjen kärkien määrän.
 */
/** Lähin rantakärki hilasta säteellä `toleranssi` (asteina) tai null. */
function lahinKarki(p, hila, toleranssi) {
  const gx = Math.round(p[0] / NAULAUS_RUUTU);
  const gy = Math.round(p[1] / NAULAUS_RUUTU);
  // Pituusasteen kutistuma leveyspiirillä (napojen lähellä aste on lyhyt).
  const kerroin = Math.max(0.05, Math.cos(p[1] * Math.PI / 180));
  const sade = Math.ceil(toleranssi / NAULAUS_RUUTU);
  let paras = null;
  let parasEtaisyys = toleranssi;
  for (let dx = -sade; dx <= sade; dx += 1) {
    for (let dy = -sade; dy <= sade; dy += 1) {
      for (const q of hila.get(`${gx + dx}|${gy + dy}`) ?? []) {
        let dLon = p[0] - q[0];
        if (dLon > 180) dLon -= 360; else if (dLon < -180) dLon += 360;
        const d = Math.hypot(dLon * kerroin, p[1] - q[1]);
        if (d < parasEtaisyys) { parasEtaisyys = d; paras = q; }
      }
    }
  }
  return paras;
}

function naulaaRengas(kehä, hila, meriRenkaat, tarkka = null) {
  let siirretty = 0;
  let pudotetut = 0;
  const viitteet = [];
  const ulos = kehä.map((p) => {
    const kerroin = Math.max(0.05, Math.cos(p[1] * Math.PI / 180));
    let paras = lahinKarki(p, hila, NAULAUS_TOLERANSSI);
    if (!paras) { viitteet.push(null); return p; }
    let renkaat = meriRenkaat;
    if (tarkka) {
      // Rannalla Natural Earthin mukaan → tarkan rannan lähimmälle janalle.
      const tarkkaParas = lahinKarki(p, tarkka.hila, TARKAN_TOLERANSSI);
      /*
       * Natural Earthin mukaan vedessä, GSHHG:n mukaan maalla (esim.
       * Gironden suiston pää: admin_0 ja ne_10m_ocean vievät veden
       * Garonnea ja Dordognea ylös, GSHHG päättää suiston aiemmin).
       * Kärki PUDOTETAAN: kehä kulkee viereisten rantakärkien välistä
       * suoraan, ja joki on pohjalaatassa joka tapauksessa viivana.
       * Mitattu Girondella 21.9.2026: ilman pudotusta 7 kehän omaa
       * janaa (42 km) ohuena kiilana suiston pään yli.
       */
      if (!tarkkaParas) { pudotetut += 1; return null; }
      paras = tarkkaParas;
      renkaat = tarkka.renkaat;
    }
    /*
     * SIIRTO JANALLE, EI KÄRKEEN (korjaus mittauksen jälkeen 20.9.2026).
     * Lähin rantaKÄRKI voi olla kauempana kuin rantaVIIVA: pitkän janan
     * keskellä kärki on satoja metrejä sivussa, ja kärkeen naulaaminen
     * SIIRSI kehän pois viivalta (Ranska: suurin ero 192 → 1 610 m).
     * Projektio lähimmälle janalle ei voi koskaan kasvattaa etäisyyttä.
     */
    const rengas = renkaat[paras[2]];
    const i = paras[3];
    const n = rengas.length - 1;
    let osuma = [paras[0], paras[1]];
    let osumanEtaisyys = Infinity;
    for (const j of [((i - 1) % n + n) % n, i]) {
      const a = rengas[j];
      const b = rengas[(j + 1) % n];
      if (!a || !b) continue;
      const kx = kerroin;
      const ax = a[0] * kx; const bx = b[0] * kx; const px = p[0] * kx;
      const dx = bx - ax; const dy = b[1] - a[1];
      const pituus2 = dx * dx + dy * dy;
      let t = pituus2 ? ((px - ax) * dx + (p[1] - a[1]) * dy) / pituus2 : 0;
      t = Math.max(0, Math.min(1, t));
      const piste = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
      const d = Math.hypot((p[0] - piste[0]) * kx, p[1] - piste[1]);
      if (d < osumanEtaisyys) { osumanEtaisyys = d; osuma = piste; }
    }
    siirretty += 1;
    viitteet.push([paras[2], paras[3]]);
    return osuma;
  });
  if (!pudotetut) return { rengas: ulos, siirretty, viitteet, pudotetut };
  // Pudotetut kärjet pois renkaasta JA viitteistä samassa tahdissa.
  const rengas = [];
  const viitteetJaljelle = [];
  let v = 0;
  for (let k = 0; k < ulos.length; k += 1) {
    if (ulos[k] === null) continue;
    rengas.push(ulos[k]);
    viitteetJaljelle.push(viitteet[v]);
    v += 1;
  }
  return { rengas: rengas.length >= 4 ? rengas : kehä, siirretty, viitteet: rengas.length >= 4 ? viitteetJaljelle : kehä.map(() => null), pudotetut };
}

/*
 * ═══ RANNIKON OMPELU (Fablen päätös 20.9.2026, vaihtoehto 1) ══════
 *
 * Naulaus siirtää kärkiä mutta ei voi LUODA niitä: `ne_10m_admin_0`
 * sulkee suistot ja lahdet jänteellä, eikä siinä ole yhtään kärkeä,
 * jonka voisi siirtää suiston pohjukkaan. Ranskassa pisin sellainen
 * jänne on 11,8 km vettä, ja juuri se viiva kulkee veden yli.
 *
 * Ompelu korjaa sen: kun kehän kaksi peräkkäistä kärkeä on naulattu
 * SAMALLE rantarenkaalle, väliin kirjoitetaan rantaviivan oma polku
 * niiden välistä. Rengas pysyy suljettuna, koska vain sisäosa
 * korvataan. Suunta valitaan lyhyemmän kaaren mukaan, ja liian pitkä
 * kierros hylätään (OMPELEEN_KATTO) — muuten kahden lahden välinen
 * hyppy ompelisi mukaan puolet mantereen rannikosta.
 */
/** Pisin rantapolku, joka saa korvata yhden jänteen (asteina). */
const OMPELEEN_KATTO = 3;

function ompeleRengas(kehä, viitteet, meriRenkaat) {
  if (kehä.length < 3) return { rengas: kehä, ommeltuja: 0, lisatyt: 0 };
  const ulos = [kehä[0]];
  let ommeltuja = 0;
  let lisatyt = 0;
  for (let k = 1; k < kehä.length; k += 1) {
    const a = viitteet[k - 1];
    const b = viitteet[k];
    if (a && b && a[0] === b[0]) {
      const rengas = meriRenkaat[a[0]];
      const n = rengas.length - 1; // suljettu rengas: viimeinen = ensimmäinen
      const eteen = ((b[1] - a[1]) % n + n) % n;
      const taakse = n - eteen;
      const askel = eteen <= taakse ? 1 : -1;
      const matka = Math.min(eteen, taakse);
      // Polun pituus asteina: liian pitkä kierros ei ole tämän jänteen ranta.
      let pituus = 0;
      let i = a[1];
      const polku = [];
      for (let m = 0; m < matka; m += 1) {
        const seuraava = ((i + askel) % n + n) % n;
        const p = rengas[i];
        const q = rengas[seuraava];
        const kerroin = Math.max(0.05, Math.cos((p[1] + q[1]) / 2 * Math.PI / 180));
        let dLon = p[0] - q[0];
        if (dLon > 180) dLon -= 360; else if (dLon < -180) dLon += 360;
        pituus += Math.hypot(dLon * kerroin, p[1] - q[1]);
        if (pituus > OMPELEEN_KATTO) break;
        polku.push([q[0], q[1]]);
        i = seuraava;
      }
      if (pituus <= OMPELEEN_KATTO && polku.length) {
        // Viimeinen polun piste on kehän oma kärki — se tulee silmukan lopussa.
        for (let m = 0; m < polku.length - 1; m += 1) { ulos.push(polku[m]); lisatyt += 1; }
        ommeltuja += 1;
      }
    }
    ulos.push(kehä[k]);
  }
  return { rengas: ulos, ommeltuja, lisatyt };
}

/** ISO3 → GeoJSON-piirre. Ensisijaisesti ISO_A3, sitten hallinnolliset. */
function hakemisto(geojson) {
  const kartta = new Map();
  const avaimet = ['ISO_A3', 'ISO_A3_EH', 'ADM0_A3', 'SOV_A3', 'GU_A3', 'SU_A3'];
  for (const avain of avaimet) {
    for (const f of geojson.features) {
      const v = f.properties[avain];
      if (v && v !== '-99' && !kartta.has(v)) kartta.set(v, f);
    }
  }
  return kartta;
}

/* -------------------------------------------------------------- geometria */

/** GeoJSONin ulkokehät (reiät jätetään: tummennus ei tarvitse järviä). */
function ulkokehat(geometry) {
  if (geometry.type === 'Polygon') return [geometry.coordinates[0]];
  if (geometry.type === 'MultiPolygon') return geometry.coordinates.map((p) => p[0]);
  return [];
}

/**
 * Asteet laudalle ja päivämääränrajan hyppy pois.
 *
 * Sauma on LON0:ssa (175 W), ei 180. asteella, joten Natural Earthin
 * ±180-katkaisu ei riitä. Hyppy tunnistetaan puolen laudan erosta ja
 * korjataan lisäämällä tai vähentämällä laudan leveys; lopuksi koko
 * rengas siirretään niin, että sen keskipiste on laudalla.
 */
function puraRengas(rengas, p) {
  const ulos = [];
  let edellinenX = null;
  for (const [lon, lat] of rengas) {
    let x = p.lautaX(lon);
    if (edellinenX !== null) {
      while (x - edellinenX > LEVEYS / 2) x -= LEVEYS;
      while (edellinenX - x > LEVEYS / 2) x += LEVEYS;
    }
    edellinenX = x;
    ulos.push([x, p.lautaY(lat)]);
  }
  const keski = ulos.reduce((a, q) => a + q[0], 0) / ulos.length;
  const siirto = -Math.floor(keski / LEVEYS) * LEVEYS;
  if (siirto) for (const q of ulos) q[0] += siirto;
  return ulos;
}

/** Pisteen etäisyys janasta a–b. */
function etaisyys(pi, a, b) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const pituus2 = dx * dx + dy * dy;
  if (!pituus2) return Math.hypot(pi[0] - a[0], pi[1] - a[1]);
  let t = ((pi[0] - a[0]) * dx + (pi[1] - a[1]) * dy) / pituus2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(pi[0] - (a[0] + t * dx), pi[1] - (a[1] + t * dy));
}

/** Douglas–Peucker, silmukkana ettei syvä rannikko kaada pinoa. */
function yksinkertaista(pisteet, toleranssi) {
  if (pisteet.length < 3) return pisteet.slice();
  const pidetaan = new Uint8Array(pisteet.length);
  pidetaan[0] = 1;
  pidetaan[pisteet.length - 1] = 1;
  const pino = [[0, pisteet.length - 1]];
  while (pino.length) {
    const [alku, loppu] = pino.pop();
    let pahin = 0;
    let indeksi = -1;
    for (let i = alku + 1; i < loppu; i++) {
      const d = etaisyys(pisteet[i], pisteet[alku], pisteet[loppu]);
      if (d > pahin) { pahin = d; indeksi = i; }
    }
    if (indeksi > 0 && pahin > toleranssi) {
      pidetaan[indeksi] = 1;
      pino.push([alku, indeksi], [indeksi, loppu]);
    }
  }
  return pisteet.filter((_, i) => pidetaan[i]);
}

/** Rajauslaatikon suurempi sivu lautayksikköinä. */
function koko(rengas) {
  let x0 = Infinity; let y0 = Infinity; let x1 = -Infinity; let y1 = -Infinity;
  for (const [x, y] of rengas) {
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  }
  return Math.max(x1 - x0, y1 - y0);
}

/**
 * Renkaan pinta-ala etumerkillä (kenkänauhakaava).
 * Positiivinen = laudan koordinaateissa myötäpäivään.
 */
function pinta(rengas) {
  let a = 0;
  for (let i = 0; i < rengas.length; i++) {
    const p = rengas[i];
    const q = rengas[(i + 1) % rengas.length];
    a += p[0] * q[1] - q[0] * p[1];
  }
  return a / 2;
}

/**
 * KAIKKI RENKAAT SAMAAN KIERTOSUUNTAAN — aineiston takuu, ei kosmetiikkaa.
 *
 * Tummennus täyttää kaikkien MUIDEN maiden renkaat yhtenä polkuna
 * `fill-rule: nonzero` -säännöllä (js/maatummennus.js `muidenPolku`),
 * ja se on oikein vain jos renkaat kiertävät samaan suuntaan.
 * Vastakkain kiertävä naapuri KUMOAISI toisen juuri siinä kaistaleessa,
 * jossa erikseen yksinkertaistetut rajat menevät päällekkäin: jokainen
 * maaraja saisi vaalean raon. Natural Earthin ulkokehät ovat jo
 * yhtenäisiä (kaikki 1233 rengasta samansuuntaisia), mutta ehtoa ei
 * jätetä lähteen varaan — se maksaa yhden silmukan ja sitä vartioi
 * tests/maapolygonit.test.mjs.
 */
function suunnista(rengas) {
  return pinta(rengas) < 0 ? rengas.slice().reverse() : rengas;
}

/**
 * Rengas talletusmuotoon: kymmenesosayksiköitä, deltakoodattuna.
 * [x0, y0, dx1, dy1, dx2, dy2, …] — purku js/maatummennus.js puraMaa.
 */
function koodaa(rengas) {
  const ulos = [];
  let ex = 0;
  let ey = 0;
  for (const [x, y] of rengas) {
    const kx = Math.round(x * TARKKUUS);
    const ky = Math.round(y * TARKKUUS);
    ulos.push(ulos.length ? kx - ex : kx, ulos.length ? ky - ey : ky);
    ex = kx;
    ey = ky;
  }
  return ulos;
}

/* -------------------------------------------------------------------- ajo */

const vainTarkistus = process.argv.includes('--tarkista');

const projektio = laudanProjektio(PROJEKTIO);
console.log('PROJEKTION TODENNUS (js/fokusnosto.js NOSTO_MAAT.GRC):');
todennaProjektio(projektio);
if (vainTarkistus) process.exit(0);

const geojson = await lueLahde();
const meri = await lueMeri();
const { hila: rantaHila, renkaat: meriRenkaat } = rannikkoHila(meri);
console.log(`Rantaviivan kärkiä hilassa: ${[...rantaHila.values()].reduce((a, v) => a + v.length, 0)}`
  + ` (${meriRenkaat.length} rantarengasta)`);
let tarkka = null;
let tarkanLahde = null;
if (tarkkaMeriPolku) {
  const tarkkaMeri = JSON.parse(readFileSync(tarkkaMeriPolku, 'utf8'));
  tarkka = rannikkoHila(tarkkaMeri);
  const lahdePolku = new URL('lahde.json', `file://${tarkkaMeriPolku}`);
  tarkanLahde = existsSync(lahdePolku) ? JSON.parse(readFileSync(lahdePolku, 'utf8')) : { lahde: tarkkaMeriPolku };
  console.log(`Tarkka rantaviiva: ${tarkkaMeriPolku} — ${tarkka.renkaat.length} rengasta, `
    + `${[...tarkka.hila.values()].reduce((a, v) => a + v.length, 0)} kärkeä (${tarkanLahde.lahde ?? ''})`);
}
let naulattuja = 0;
let pudotettujaKarkia = 0;
let ommeltuja = 0;
let ompeleenKarkia = 0;
let hylattyjaOmpeleita = 0;
const haku = hakemisto(geojson);
const pelimaat = Object.keys(MAAILMANKARTTA.map.countryShapes);

const maat = {};
let renkaita = 0;
let pisteita = 0;
let pudonneet = 0;
const puuttuvat = [];

for (const iso of pelimaat) {
  const piirre = haku.get(NIMIVASTAAVUUS[iso] ?? iso) ?? haku.get(iso);
  if (!piirre) { puuttuvat.push(iso); continue; }
  const renkaat = [];
  for (const alkuperainen of ulkokehat(piirre.geometry)) {
    // Rannikko naulataan ASTEISSA ennen lautakäännöstä (ks. yllä).
    const { rengas: naulattu, siirretty, viitteet, pudotetut } = naulaaRengas(alkuperainen, rantaHila, meriRenkaat, tarkka);
    naulattuja += siirretty;
    pudotettujaKarkia += pudotetut ?? 0;
    /*
     * OMMEL EI SAA MUUTTAA RENKAAN LUONNETTA (mitattu 20.9.2026:
     * ilman tätä Liettuan ja Fidžin renkaat rappeutuivat nollapinta-
     * alaisiksi, ja tests/maapolygonit.test.mjs "kaikki renkaat
     * kiertävät samaan suuntaan" putosi punaiseksi). Jos ommeltu
     * rengas kiertää toisin päin tai sen pinta-ala muuttuu yli
     * neljänneksen, ommel hylätään ja rengas jää naulatuksi.
     */
    const ommelEhdokas = ompeleRengas(naulattu, viitteet, tarkka ? tarkka.renkaat : meriRenkaat);
    const alaEnnen = pinta(naulattu);
    const alaJalkeen = pinta(ommelEhdokas.rengas);
    const kelpaa = Math.sign(alaJalkeen) === Math.sign(alaEnnen)
      && Math.abs(alaJalkeen) > Math.abs(alaEnnen) * 0.75
      && Math.abs(alaJalkeen) < Math.abs(alaEnnen) * 1.25;
    const ommel = kelpaa ? ommelEhdokas
      : { rengas: naulattu, ommeltuja: 0, lisatyt: 0 };
    if (!kelpaa) {
      hylattyjaOmpeleita += 1;
      if (process.env.OMPELULOKI) console.log(`  hylätty ommel ${iso}: kärkiä ${alkuperainen.length}, ala ${alaEnnen.toExponential(2)} → ${alaJalkeen.toExponential(2)}`);
    }
    ommeltuja += ommel.ommeltuja;
    ompeleenKarkia += ommel.lisatyt;
    const kehä = ommel.rengas;
    const laudalla = puraRengas(kehä, projektio);
    if (koko(laudalla) < MIN_KOKO) { pudonneet++; continue; }
    const kevyt = yksinkertaista(laudalla, TOLERANSSI)
      // Talletustarkkuuteen JO TÄSSÄ: kiertosuunta ja pinta-ala
      // katsotaan samoista luvuista, jotka tiedostoon menevät.
      .map(([x, y]) => [Math.round(x * TARKKUUS) / TARKKUUS, Math.round(y * TARKKUUS) / TARKKUUS]);
    // Kolmiota pienempi jäännös ei ole muoto vaan viiva.
    if (kevyt.length < 4) { pudonneet++; continue; }
    /*
     * SÄLE EI OLE MUOTO: tarkalla rantaviivalla ommeltu pikkusaari voi
     * jäädä talletustarkkuudessa alle neliöyksikön säleeksi, jonka
     * kiertosuunta on pyöristyksen arpaa (mitattu 21.9.2026: USA, 6
     * kärkeä, ala −0,09 yksikköä²). Se putoaa kuten sirpaleet.
     */
    if (Math.abs(pinta(kevyt)) < 1) { pudonneet++; continue; }
    renkaat.push(koodaa(suunnista(kevyt)));
    renkaita++;
    pisteita += kevyt.length;
  }
  if (renkaat.length) maat[iso] = renkaat;
}

const ulos = {
  /*
   * Nämä kentät ovat lukijalle JA piirtäjälle: js/maatummennus.js
   * tarkistaa tarkkuuden ja laudan mitat aineistosta eikä oleta niitä.
   */
  lahde: 'Natural Earth 10m admin-0 countries (public domain) — sama '
    + 'aineisto kuin laattoihin poltetulla rajaviivalla',
  komento: `node tools/generoi-maapolygonit.mjs${tarkkaMeriPolku ? ' --meri=<gshhs-data>/ne_10m_ocean.geojson' : ''}`,
  ...(tarkanLahde ? { rantaviiva: { lahde: tarkanLahde.lahde, sha256: tarkanLahde.sha256 ?? null, toleranssi: TARKAN_TOLERANSSI } } : {}),
  projektio: PROJEKTIO,
  tarkkuus: TARKKUUS,
  lauta: { leveys: LEVEYS, korkeus: KORKEUS },
  maat,
};

writeFileSync(KOHDE, JSON.stringify(ulos));
const kt = Math.round(readFileSync(KOHDE).length / 1024);
console.log(`Maita ${Object.keys(maat).length} / ${pelimaat.length}`
  + `, renkaita ${renkaita}, pisteitä ${pisteita}, pudotettuja sirpaleita ${pudonneet}`);
console.log(`Rannikolle naulattuja kärkiä: ${naulattuja}${tarkka ? `, pudotettuja (NE vedessä, tarkka maalla): ${pudotettujaKarkia}` : ''}`);
console.log(`Ommeltuja jänteitä: ${ommeltuja}, rantaviivalta lisättyjä kärkiä: ${ompeleenKarkia}`
  + `, hylättyjä ompeleita: ${hylattyjaOmpeleita}`);
if (puuttuvat.length) console.log(`EI LÖYTYNYT: ${puuttuvat.join(' ')}`);
console.log(`Kirjoitettu ${KOHDE.pathname} — ${kt} kt`);
