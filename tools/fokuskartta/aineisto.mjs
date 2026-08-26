/*
 * Fokuskartan raaka-aineisto: yhden maan rannikko, korkeusruudukko,
 * joet ja järvet yhdeksi olioksi, joka kelpaa piirtomoottorille.
 *
 * Tämä on tools/tee-fokuskartta.mjs:n moduuli, ei oma työkalunsa.
 *
 * --- mistä aineisto tulee ---
 *
 * KAIKKI on julkista aineistoa ja se asuu REPON ULKOPUOLELLA: raakojen
 * tiedostojen yhteiskoko on yli 60 Mt, eikä niitä committoida (sama
 * sääntö kuin korkeusruudukolla, ks. tools/hae-korkeusruudukko.mjs).
 * Kansio annetaan `--data`-valitsimella tai FOKUSKARTTA_DATA-
 * ympäristömuuttujalla, ja oletus on käyttöjärjestelmän tmpdir.
 *
 *   ne_10m_admin_0_countries.geojson        maiden rajat
 *   ne_10m_rivers_lake_centerlines.geojson  maailman pääjoet
 *   ne_10m_rivers_europe.geojson            Euroopan tiheämpi jokiverkko
 *   ne_10m_lakes.geojson                    järvet
 *   ne_10m_ocean.geojson                    meren ala (VALINNAINEN, ks. alla)
 *   etopo-band-*.csv                        ETOPO1 ERDDAPista, CSV-kaistoina
 *
 * --- miksi meren ala on oma aineistonsa ---
 *
 * Piirtomoottori päätteli ennen maan ja meren rajan pelkästä ETOPOsta:
 * `m < 0` oli merta. Kaava pettää kaikkialla, missä KUIVA MAA on
 * merenpinnan alapuolella — ja niitä paikkoja on: Kaspianmeren ranta ja
 * koko Kaspian alanko ovat −28…0 m, Kuollutmeren laakso −400 m, Qattaran
 * painanne −133 m. Kaspian lehdillä (TKM, KAZ) tämä näkyi pahiten: meri
 * ja sen ranta saivat saman sävyn, ja kohdemaan sisällä maastokerros
 * maalasi vielä merenkin maaksi (`Math.max(0, m)`).
 *
 * Natural Earthin `ne_10m_ocean` on oikea vastaus: se on meren ala
 * monikulmiona ja se SISÄLTÄÄ Kaspianmeren mutta EI Kuolluttamerta,
 * Qattaraa eikä Aralia (jotka ovat järviä tai kuivaa maata). Se
 * rasteroidaan tässä korkeusruudukon ruudukkoon bittimaskiksi, ja
 * piirtomoottori kysyy vettä muodossa "ETOPO alle nollan JA meren
 * alalla". Rannikon tarkka muoto tulee siis yhä ETOPOsta — maski vain
 * kertoo, KUULUUKO tämä painanne merelle.
 *
 * Tiedosto on VALINNAINEN: ilman sitä moottori palaa vanhaan `m < 0`
 * -sääntöön, ja ajo kertoo siitä lokissa. Lähde on sama Natural Earth
 * 10m -aineisto kuin muillakin (naturalearthdata.com, public domain;
 * GeoJSON esimerkiksi github.com/nvkelso/natural-earth-vector).
 *
 * Natural Earth (Kelso & Patterson) on public domain, ETOPO1 (NOAA,
 * Amante & Eakins 2009) niin ikään. Kaistat haetaan samalta
 * palvelimelta, jota pelin muut työkalut jo käyttävät
 * (coastwatch.pfeg.noaa.gov/erddap/griddap/etopo360).
 *
 * --- miksi joet kahdesta tiedostosta ---
 *
 * ne_10m_rivers_lake_centerlines tuntee Kreikasta vain kolme uomaa
 * (Aliákmonas, Strymónas, Évros); Piniós ja Achelóos puuttuvat siitä
 * kokonaan. Maanosakohtainen ne_10m_rivers_europe on samaa aineistoa
 * tiheämpänä. Molemmat luetaan, ja päällekkäiset uomat karsitaan
 * nimen perusteella — maailmanjoki voittaa, koska sillä on luokitus
 * (scalerank), jonka mukaan uoman leveys piirretään.
 *
 * --- korkeusruudukon on katettava KOKO KUVA ---
 *
 * Ruudukon ulkopuolella `korkeus` palauttaa NaN, ja piirtomoottori
 * lukee sen avomereksi. Jos ruudukko loppuu kesken kuvan, meren
 * syvyysporrastus vaihtuu tasaiseksi sävyksi keskellä ulappaa ja
 * kuvaan jää suora pystysauma. Kaistat on siis haettava kuvan
 * rajauksen mukaan — Kreikan v2-lehdelle lon 13,9–34,1 / lat
 * 32,4–43,8, kun aiempi tiukka rajaus tuli toimeen välillä 17–31 /
 * 33–43. Ajo kertoo ruudukon kulmat lokissa; vertaa niitä
 * työkalun tulostamaan `asteina`-riviin.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import { avaaLevy, leikkaa, LEVY_JSON } from './etopo.mjs';

/** Pyöristys neljään desimaaliin: noin 11 metriä, aivan riittävä. */
const pyorista = (n) => Math.round(n * 1e4) / 1e4;

/** Osuuko laatikko [a0,a1] toiseen [b0,b1]? */
const osuu = (a0, a1, b0, b1) => a1 >= b0 && a0 <= b1;

/**
 * Monikulmion renkaat listaksi; renkaat, jotka eivät osu laatikkoon,
 * jäävät pois. Laatikko on asteina ja hivenen todellista suurempi,
 * jotta rannikko jatkuu kuvan reunan yli eikä katkea siihen.
 */
function renkaat(geom, laatikko) {
  const ulos = [];
  const lisaa = (poly) => {
    for (const rengas of poly) {
      let lon0 = Infinity; let lon1 = -Infinity;
      let lat0 = Infinity; let lat1 = -Infinity;
      for (const [lon, lat] of rengas) {
        if (lon < lon0) lon0 = lon;
        if (lon > lon1) lon1 = lon;
        if (lat < lat0) lat0 = lat;
        if (lat > lat1) lat1 = lat;
      }
      if (!osuu(lon0, lon1, laatikko.lon0, laatikko.lon1)) continue;
      if (!osuu(lat0, lat1, laatikko.lat0, laatikko.lat1)) continue;
      ulos.push(rengas.map(([lon, lat]) => [pyorista(lon), pyorista(lat)]));
    }
  };
  if (geom.type === 'Polygon') lisaa(geom.coordinates);
  else if (geom.type === 'MultiPolygon') for (const p of geom.coordinates) lisaa(p);
  return ulos;
}

/** Viivageometria osiksi; laatikon ulkopuoliset osat jäävät pois. */
function viivat(geom, laatikko) {
  const ulos = [];
  const lisaa = (rivi) => {
    const mukana = rivi.some(([lon, lat]) => lon >= laatikko.lon0 && lon <= laatikko.lon1
      && lat >= laatikko.lat0 && lat <= laatikko.lat1);
    if (mukana) ulos.push(rivi.map(([lon, lat]) => [pyorista(lon), pyorista(lat)]));
  };
  if (geom.type === 'LineString') lisaa(geom.coordinates);
  else if (geom.type === 'MultiLineString') for (const r of geom.coordinates) lisaa(r);
  return ulos;
}

function lue(kansio, nimi) {
  const polku = join(kansio, nimi);
  if (!existsSync(polku)) {
    throw new Error(`Aineisto puuttuu: ${polku}\n`
      + 'Lataa Natural Earth 10m -tiedostot ja ETOPO-kaistat tähän kansioon '
      + '(ks. tools/fokuskartta/aineisto.mjs tiedoston alku).');
  }
  return JSON.parse(readFileSync(polku, 'utf8'));
}

/**
 * ETOPO1-kaistat (ERDDAPin CSV) yhdeksi Int16-ruudukoksi.
 *
 * Rivi on `lat,lon,korkeus`, ja kaistat ovat peräkkäisiä lat-lohkoja.
 * Ruudukko käännetään kuvakoordinaatteihin: y = 0 on POHJOISIN rivi.
 * Palautuksessa mukana kulmat, jotta hakija osaa laskea indeksinsä.
 */
function korkeusruudukko(kansio, laatikko) {
  /*
   * YHTEINEN LEVY VOITTAA. Jos kansiossa on Euroopan kokoinen
   * ETOPO-levy (tools/fokuskartta/etopo.mjs), ruudukko leikataan siitä
   * — yksi haku palvelee kaikkia maita, eikä samaa merta ladata
   * kymmentä kertaa. CSV-kaistat jäävät Kreikan pilotin reitiksi.
   */
  if (existsSync(join(kansio, LEVY_JSON))) {
    const levy = avaaLevy(kansio);
    const pala = leikkaa(levy, laatikko);
    if (pala.aukkoja) {
      console.warn(`  VAROITUS: korkeuslevyssä on ${pala.aukkoja} hakematta jäänyttä `
        + 'pistettä tämän kuvan alueella — paikattu lähimmällä arvolla. '
        + 'Aja tools/hae-etopo-eurooppa.mjs loppuun.');
    }
    return pala;
  }
  const tiedostot = readdirSync(kansio)
    .filter((n) => /^etopo-band-\d+\.csv$/.test(n))
    .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));
  if (!tiedostot.length) {
    throw new Error(`Korkeuskaistoja ei löytynyt kansiosta ${kansio} (etopo-band-*.csv).`);
  }
  const rivit = new Map();     // lat -> Map(lon -> metriä)
  const lonit = new Set();
  for (const t of tiedostot) {
    const teksti = readFileSync(join(kansio, t), 'utf8');
    let alku = 0;
    let rivi = 0;
    while (alku < teksti.length) {
      let loppu = teksti.indexOf('\n', alku);
      if (loppu < 0) loppu = teksti.length;
      const r = teksti.slice(alku, loppu);
      alku = loppu + 1;
      rivi += 1;
      // Kaksi otsikkoriviä: sarakenimet ja yksiköt.
      if (rivi <= 2 || !r) continue;
      const a = r.indexOf(',');
      const b = r.indexOf(',', a + 1);
      const lat = Number(r.slice(0, a));
      const lon = Number(r.slice(a + 1, b));
      const arvo = Number(r.slice(b + 1));
      if (!Number.isFinite(arvo)) continue;
      lonit.add(lon);
      let m = rivit.get(lat);
      if (!m) { m = new Map(); rivit.set(lat, m); }
      m.set(lon, arvo);
    }
  }
  const latit = [...rivit.keys()].sort((x, y) => x - y);
  const lonLista = [...lonit].sort((x, y) => x - y);
  const w = lonLista.length;
  const h = latit.length;
  const grid = new Int16Array(w * h);
  for (let y = 0; y < h; y++) {
    const m = rivit.get(latit[h - 1 - y]);
    for (let x = 0; x < w; x++) {
      const v = m.get(lonLista[x]);
      grid[y * w + x] = Math.max(-32000, Math.min(32000, Math.round(v ?? 0)));
    }
  }
  return {
    w,
    h,
    lon0: lonLista[0],
    lon1: lonLista[w - 1],
    lat0: latit[0],
    lat1: latit[h - 1],
    // Selaimeen siirto menee JSONina, joten ruudukko kulkee base64:nä.
    b64: Buffer.from(grid.buffer).toString('base64'),
  };
}

/*
 * MEREN ALA BITTIMASKIKSI korkeusruudukon omaan ruudukkoon.
 *
 * Rasterointi on juovapyyhkäisy (scanline): jokaiselle ruudukon riville
 * lasketaan kaikkien monikulmion reunojen leikkauskohdat sen
 * leveysasteen kanssa, ne järjestetään ja parillisuussääntö täyttää
 * ruudut. Reunat käydään läpi aktiivireunataulun kautta, joten koko
 * maailman rantaviivasta katsotaan vain se, mikä osuu tähän ikkunaan.
 *
 * LAAJENNUS (dilaatio) kahdella ruudulla on tahallinen. Maski on
 * kaariminuutin ruudukossa, kuva jopa neljä kertaa tiheämpi: ilman
 * laajennusta maskin porrastus näkyisi rannikolla sahalaitana siellä,
 * missä ETOPO sanoo vettä mutta maski juuri ja juuri maata. Laajennus
 * työntää maskin rajan rantaviivan yli maan puolelle, jolloin rajan
 * piirtää yhä ETOPOn pehmeä nollakäyrä. Kuivalle painanteelle
 * laajennus antaa korkeintaan parin kaariminuutin kaistan rannassa.
 */
/*
 * VIETY, KOSKA KAUKOZOOMIN YLEISLEHTI TARVITSEE SAMAN MASKIN.
 *
 * Koko laudan kattava yleislehti (tools/tee-yleislehti.mjs) ei kokoa
 * aineistoaan maan ympäriltä vaan koko maailmasta, mutta maan ja meren
 * ero on siellä täsmälleen sama kysymys — ja väärä vastaus näkyisi
 * kaukozoomissa Kaspianmerenä maan värisenä. Yhteinen rasterointi on
 * ainoa tapa pitää yleislehti ja maalehdet samassa maailmassa.
 *
 * `laajennus` on ruutuina mitattu dilaatio (ks. alla). Maalehdillä
 * ruudukko on kuvaa harvempi ja laajennus 2 tasoittaa portaikon;
 * yleislehdellä ruutu ja kuvapikseli ovat samaa kokoluokkaa, jolloin
 * pienempi laajennus riittää eikä painanne saa turhaa merikaistaa.
 */
export function meriMaski(kansio, ruudukko, { laajennus = 2 } = {}) {
  const tiedosto = 'ne_10m_ocean.geojson';
  if (!existsSync(join(kansio, tiedosto))) return null;
  const {
    w, h, lon0, lon1, lat0, lat1,
  } = ruudukko;
  const dlon = (lon1 - lon0) / (w - 1);
  const dlat = (lat1 - lat0) / (h - 1);
  // Rivi 0 on POHJOISIN, kuten korkeusruudukossa.
  const rivi = (lat) => (lat1 - lat) / dlat;

  // Aktiivireunataulu: reuna herää sillä rivillä, jolla se alkaa.
  const herat = Array.from({ length: h }, () => []);
  const lisaaRengas = (rengas) => {
    for (let i = 0, j = rengas.length - 1; i < rengas.length; j = i++) {
      const [xa, ya] = rengas[j]; const [xb, yb] = rengas[i];
      if (ya === yb) continue;
      const ylin = Math.max(ya, yb); const alin = Math.min(ya, yb);
      const r0 = Math.max(0, Math.ceil(rivi(ylin)));
      const r1 = Math.min(h - 1, Math.floor(rivi(alin)));
      if (r1 < r0) continue;
      herat[r0].push([xa, ya, xb, yb, r1]);
    }
  };
  /*
   * Päivämääränraja: NE:n koordinaatit ovat -180..180, mutta lehden
   * ikkuna voi jatkua rajan yli (AUS, NZL, FJI). Rajan ylittävälle
   * ikkunalle renkaat lisätään myös 360 astetta siirrettyinä, jotta
   * rajan takainen meri osuu maskiin; ikkunan ulkopuoliset
   * leikkausparit putoavat pois täyttövaiheen puskuroinnissa.
   */
  const siirretty = (rengas, d) => rengas.map(([x, y]) => [x + d, y]);
  const lisaaKierrolla = (rengas) => {
    lisaaRengas(rengas);
    if (lon1 > 180) lisaaRengas(siirretty(rengas, 360));
    if (lon0 < -180) lisaaRengas(siirretty(rengas, -360));
  };
  const lisaa = (geom) => {
    if (geom.type === 'Polygon') for (const r of geom.coordinates) lisaaKierrolla(r);
    else if (geom.type === 'MultiPolygon') {
      for (const p of geom.coordinates) for (const r of p) lisaaKierrolla(r);
    }
  };
  for (const f of lue(kansio, tiedosto).features) lisaa(f.geometry);

  const bittej = Math.ceil((w * h) / 8);
  const maski = new Uint8Array(bittej);
  const aseta = (x, y) => { maski[(y * w + x) >> 3] |= 1 << ((y * w + x) & 7); };
  let aktiiviset = [];
  const leikkaukset = [];
  for (let y = 0; y < h; y++) {
    if (herat[y].length) aktiiviset = aktiiviset.concat(herat[y]);
    if (!aktiiviset.length) continue;
    const lat = lat1 - y * dlat;
    leikkaukset.length = 0;
    let elossa = 0;
    for (let i = 0; i < aktiiviset.length; i++) {
      const e = aktiiviset[i];
      if (e[4] < y) continue;
      aktiiviset[elossa++] = e;
      const [xa, ya, xb, yb] = e;
      if ((ya > lat) === (yb > lat)) continue;
      leikkaukset.push(xa + ((lat - ya) / (yb - ya)) * (xb - xa));
    }
    aktiiviset.length = elossa;
    if (leikkaukset.length < 2) continue;
    leikkaukset.sort((a, b) => a - b);
    for (let i = 0; i + 1 < leikkaukset.length; i += 2) {
      const a = Math.max(0, Math.ceil((leikkaukset[i] - lon0) / dlon));
      const b = Math.min(w - 1, Math.floor((leikkaukset[i + 1] - lon0) / dlon));
      for (let x = a; x <= b; x++) aseta(x, y);
    }
  }

  // Laajennus (oletuksena kaksi ruutua): ensin vaakaan, sitten pystyyn.
  const R = laajennus;
  if (R <= 0) return maski;
  const bitti = (x, y) => (maski[(y * w + x) >> 3] >> ((y * w + x) & 7)) & 1;
  const vaaka = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let v = 0;
      for (let d = -R; d <= R && !v; d++) {
        const xx = x + d;
        if (xx >= 0 && xx < w && bitti(xx, y)) v = 1;
      }
      vaaka[y * w + x] = v;
    }
  }
  maski.fill(0);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let v = 0;
      for (let d = -R; d <= R && !v; d++) {
        const yy = y + d;
        if (yy >= 0 && yy < h && vaaka[yy * w + x]) v = 1;
      }
      if (v) aseta(x, y);
    }
  }
  return maski;
}

/** Sama maski siinä muodossa, jossa se kulkee selaimeen (base64). */
function meriruudukko(kansio, ruudukko) {
  const maski = meriMaski(kansio, ruudukko);
  return maski ? { b64: Buffer.from(maski.buffer).toString('base64') } : null;
}

/**
 * Yhden maan asteikkolaatikko Natural Earthin geometriasta.
 *
 * Yleinen reitti (tools/fokuskartta/maat.mjs `yleinenIkkuna`) tarvitsee
 * maan todelliset rajat, mutta EI merentakaisia alueita: Ranskan
 * ADM0_A3-piirre sisältää Guayanan ja Réunionin, Espanjan Kanarian ja
 * Portugalin Azorit, ja niiden mukaan mitoitettu ikkuna esittäisi
 * puolta Atlanttia.
 *
 * Karsinta on maantieteellinen eikä nimilista: aloitetaan suurimmasta
 * renkaasta ja liitetään mukaan jokainen rengas, joka on enintään
 * `etaisyys` astetta siihen mennessä kertyneestä laatikosta — ja
 * toistetaan, kunnes mikään ei enää liity. Saariketju kulkee näin
 * mukaan (Kreikan saaret, Tanskan Bornholm, Ranskan Korsika), mutta
 * valtameren takainen alue ei.
 */
export function maanLaatikko(kansio, iso, { etaisyys = 2.5 } = {}) {
  const maat = lue(kansio, 'ne_10m_admin_0_countries.geojson');
  const tunnus = (f) => f.properties.ADM0_A3 ?? f.properties.ISO_A3;
  const kohde = maat.features.find((f) => tunnus(f) === iso);
  if (!kohde) throw new Error(`Maata ${iso} ei löydy Natural Earthin aineistosta.`);
  const laatikot = [];
  const lisaa = (poly) => {
    for (const r of poly) {
      let lon0 = Infinity; let lon1 = -Infinity;
      let lat0 = Infinity; let lat1 = -Infinity;
      for (const [lon, lat] of r) {
        if (lon < lon0) lon0 = lon;
        if (lon > lon1) lon1 = lon;
        if (lat < lat0) lat0 = lat;
        if (lat > lat1) lat1 = lat;
      }
      laatikot.push({
        lon0, lon1, lat0, lat1, koko: (lon1 - lon0) * (lat1 - lat0),
      });
    }
  };
  if (kohde.geometry.type === 'Polygon') lisaa(kohde.geometry.coordinates);
  else for (const p of kohde.geometry.coordinates) lisaa(p);
  laatikot.sort((a, b) => b.koko - a.koko);
  const u = { ...laatikot[0] };
  const mukana = new Set([0]);
  let muuttui = true;
  while (muuttui) {
    muuttui = false;
    for (let i = 1; i < laatikot.length; i++) {
      if (mukana.has(i)) continue;
      const r = laatikot[i];
      const dx = Math.max(0, u.lon0 - r.lon1, r.lon0 - u.lon1);
      const dy = Math.max(0, u.lat0 - r.lat1, r.lat0 - u.lat1);
      if (Math.hypot(dx, dy) > etaisyys) continue;
      u.lon0 = Math.min(u.lon0, r.lon0); u.lon1 = Math.max(u.lon1, r.lon1);
      u.lat0 = Math.min(u.lat0, r.lat0); u.lat1 = Math.max(u.lat1, r.lat1);
      mukana.add(i); muuttui = true;
    }
  }
  return {
    lon0: u.lon0, lon1: u.lon1, lat0: u.lat0, lat1: u.lat1, renkaita: mukana.size,
  };
}

/*
 * LAUDAN MAATUNNUS -> NATURAL EARTHIN TUNNUS PAIKKA-AINEISTOSSA.
 *
 * Natural Earth ei ole yhtenäinen omien tiedostojensa kesken:
 * `ne_10m_admin_0_countries` antaa Etelä-Sudanille ADM0_A3-arvon SDS
 * (sama kuin laudalla), mutta `ne_10m_populated_places` käyttää samasta
 * maasta ISO-koodia SSD. Ilman käännöstä maan kaikki kaupungit
 * putosivat pois, ja SDS:n lehti tuli ulos ilman yhtään nimeä.
 *
 * Taulu on tarkoituksella pieni ja perusteltu: laudan 134 maatunnusta
 * verrattiin koneellisesti molempien NE-tiedostojen tunnuksiin, ja
 * ainoa ero on tämä. (SHN eli Saint Helena puuttuu NE:n
 * paikka-aineistosta kokonaan — sille ei ole tunnusta, jolla se
 * löytyisi, eikä siis aliasta.)
 */
export const NE_PAIKKATUNNUS = { SDS: 'SSD' };

/** Nimi vertailumuotoon: aksentit pois, pienaakkoset, vain kirjaimet. */
function normalisoi(nimi) {
  return (nimi ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/** Levenshtein enintään yhteen muokkaukseen asti (true = riittävän lähellä). */
function yhdenPaassa(a, b) {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  let j = 0;
  while (j < a.length - i && j < b.length - i
    && a[a.length - 1 - j] === b[b.length - 1 - j]) j++;
  return (a.length - i - j) <= 1 && (b.length - i - j) <= 1;
}

/**
 * Onko tämä sama kaupunki kuin laudan laatta?
 *
 * Kirjoitusasut eivät ole samat: lauta sanoo Havanna, Natural Earth
 * Havana; lauta Mérida, aineisto Mérida ilman aksenttia toisessa
 * kohdassa. Vertailu tehdään siksi normalisoiduille nimille kolmella
 * säännöllä: sama nimi, alkuosa (Mexico City ~ Mexico) tai yhden
 * merkin ero (Havanna ~ Havana).
 *
 * LYHYILLÄ NIMILLÄ VAIN TARKKA OSUMA. Kolmen kirjaimen "Ely" ja "Eli"
 * eivät ole sama kaupunki, eivätkä viiden kirjaimen Salta ja Malta —
 * siksi alkuosa vaatii viisi merkkiä ja yhden merkin ero kuusi. Väärä
 * osuma pudottaisi lehdeltä nimen, jota kukaan ei piirrä tilalle.
 */
function samaNimi(a, b) {
  if (!a || !b) return false;
  if (a === b) return true;
  const lyhyt = a.length < b.length ? a : b;
  const pitka = a.length < b.length ? b : a;
  if (lyhyt.length >= 5 && pitka.startsWith(lyhyt)) return true;
  // Loppuosa kattaa etuliitteelliset kaksoset: New Delhi ~ Delhi,
  // New Taipei ~ Taipei. Sama viiden merkin raja kuin alkuosalla.
  if (lyhyt.length >= 5 && pitka.endsWith(lyhyt)) return true;
  return lyhyt.length >= 6 && yhdenPaassa(a, b);
}

/**
 * Kaupunkipisteet Natural Earthin populated_places -aineistosta.
 *
 * === KARSINTA ON KOKO JUTTU ===
 *
 * Aineistossa on Albaniastakin 26 kaupunkia, joista puolet on
 * kolmentuhannen asukkaan kirkonkyliä. Isoisän atlaksella on hyvin
 * harvat merkinnät, ja fokusmoodi on annostelua (Raamattu: *"maan
 * muita kaupunkeja (ei pelattavia)"*). Poiminta on siksi kolmiportainen:
 *
 *   1. vain KOHDEMAAN kaupunkeja — naapurin puolella laudalla on jo
 *      omat laattansa, ja kuvaan poltettu toisinto olisi tupla;
 *   2. järjestys Natural Earthin oman SCALERANKin mukaan (0 = suurin,
 *      sama luku, jolla NE piirtää omat karttansa) ja tasapelissä
 *      väkiluvun mukaan;
 *   3. `enintaan` kappaletta, ja jokaisen on oltava vähintään
 *      `vahinVali` astetta edellisestä — muuten Ruhrin alue olisi
 *      pelkkä nimipuuro.
 *
 * `poisLahelta` on lista { lon, lat } -pisteitä, joiden lähelle ei
 * oteta mitään: sinne peli piirtää oman laattansa.
 *
 * VÄKILUKU ON NYKYINEN eikä vuoden 1873 — aineistossa ei ole muuta.
 * Se vaikuttaa vain siihen, mitkä nimet kartalle valitaan, ei siihen
 * mitä pelaajalle kerrotaan.
 */
export function paikat(kansio, {
  iso, laatikko, enintaan = 9, vahinVali = 0.55, poisLahelta = [], scalerank = 10,
  nimiSade = 5,
}) {
  const tiedosto = 'ne_10m_populated_places.geojson';
  if (!existsSync(join(kansio, tiedosto))) return [];
  const neIso = NE_PAIKKATUNNUS[iso] ?? iso;
  const laatat = poisLahelta
    .filter((o) => o.nimi)
    .map((o) => ({ ...o, avain: normalisoi(o.nimi) }));
  const kaikki = [];
  for (const f of lue(kansio, tiedosto).features) {
    const p = f.properties;
    if ((p.ADM0_A3 ?? p.SOV_A3) !== neIso) continue;
    if ((p.SCALERANK ?? 99) > scalerank) continue;
    const [lon, lat] = f.geometry.coordinates;
    if (lon < laatikko.lon0 || lon > laatikko.lon1) continue;
    if (lat < laatikko.lat0 || lat > laatikko.lat1) continue;
    kaikki.push({
      nimi: p.NAME ?? p.NAMEASCII ?? '',
      lon: pyorista(lon),
      lat: pyorista(lat),
      luokka: p.SCALERANK ?? 99,
      vaki: p.POP_MAX ?? 0,
    });
  }
  kaikki.sort((a, b) => (a.luokka - b.luokka) || (b.vaki - a.vaki));
  const ulos = [];
  for (const k of kaikki) {
    if (ulos.length >= enintaan) break;
    if (!k.nimi) continue;
    const liianLahella = (lista, raja) => lista.some(
      (o) => Math.hypot(o.lon - k.lon, o.lat - k.lat) < raja,
    );
    if (liianLahella(poisLahelta, vahinVali)) continue;
    if (liianLahella(ulos, vahinVali)) continue;
    /*
     * SAMA KAUPUNKI TOISELLA NIMELLÄ. Pelkkä säde ei riitä: laudan
     * laattoja on siirretty käsin, jotta nimet mahtuvat, ja
     * Amerikoissa siirto on isompi kuin Euroopassa (Havanna on 2,64
     * astetta todellisesta paikastaan). Silloin sama kaupunki tulisi
     * lehdelle kahdesti — kerran laattana, kerran kuvaan poltettuna.
     * Nimivertailu on siis säteen rinnalla, ei sen tilalla: säde
     * karsii eri nimiset naapurit, nimi kaukanakin olevan kaksoisolennon.
     */
    const avain = normalisoi(k.nimi);
    const kaksoisolento = laatat.some((o) => samaNimi(o.avain, avain)
      && Math.hypot(o.lon - k.lon, o.lat - k.lat) < nimiSade);
    if (kaksoisolento) continue;
    ulos.push(k);
  }
  return ulos;
}

/**
 * Kokoaa yhden maan aineiston annetulle asteikkolaatikolle.
 *
 * `laatikko` on { lon0, lon1, lat0, lat1 } ja saa olla lopullista
 * kuvarajausta väljempi: piirtomoottori leikkaa ylimääräisen pois.
 *
 * `naapurit` on lista ISO-tunnuksia, joiden ääriviivat kerätään mukaan.
 * Ne piirretään haaleina ja sumenevina (piirto.js), eikä niistä
 * tarvita kuin renkaat — ei korkeutta, ei vesiä. Tyhjä lista on
 * kelvollinen: silloin lehdessä on vain kohdemaa ja merta.
 */
export function keraaAineisto({
  kansio, iso, laatikko, naapurit = [], paikkoja = null,
}) {
  const maat = lue(kansio, 'ne_10m_admin_0_countries.geojson');
  const tunnus = (f) => f.properties.ADM0_A3 ?? f.properties.ISO_A3;
  const kohde = maat.features.find((f) => tunnus(f) === iso);
  if (!kohde) throw new Error(`Maata ${iso} ei löydy Natural Earthin aineistosta.`);

  const naapuriMuodot = {};
  for (const a3 of naapurit) {
    const f = maat.features.find((g) => tunnus(g) === a3);
    if (!f) throw new Error(`Naapurimaata ${a3} ei löydy Natural Earthin aineistosta.`);
    const r = renkaat(f.geometry, laatikko);
    if (r.length) naapuriMuodot[a3] = { renkaat: r };
  }

  const joet = [];
  const nimetyt = new Set();
  const lisaaJoet = (tiedosto, maailmanjoki) => {
    if (!existsSync(join(kansio, tiedosto))) return;
    for (const f of lue(kansio, tiedosto).features) {
      const nimi = f.properties.name ?? f.properties.NAME ?? '';
      // Sama uoma molemmissa aineistoissa: maailmanjoki voittaa, koska
      // sillä on luokitus, jonka mukaan uoman leveys piirretään.
      if (nimi && nimetyt.has(nimi)) continue;
      const osat = viivat(f.geometry, laatikko);
      if (!osat.length) continue;
      if (nimi) nimetyt.add(nimi);
      joet.push({
        nimi,
        luokka: f.properties.scalerank ?? (maailmanjoki ? 9 : 10),
        osat,
      });
    }
  };
  lisaaJoet('ne_10m_rivers_lake_centerlines.geojson', true);
  lisaaJoet('ne_10m_rivers_europe.geojson', false);

  const jarvet = [];
  for (const f of lue(kansio, 'ne_10m_lakes.geojson').features) {
    const r = renkaat(f.geometry, laatikko);
    if (r.length) jarvet.push({ nimi: f.properties.name ?? '', renkaat: r });
  }

  const korkeus = korkeusruudukko(kansio, laatikko);

  return {
    iso,
    laatikko,
    maa: { renkaat: renkaat(kohde.geometry, laatikko) },
    naapurit: naapuriMuodot,
    joet,
    jarvet,
    paikat: paikkoja ? paikat(kansio, { ...paikkoja, iso, laatikko }) : [],
    korkeus,
    /*
     * Meren ala samassa ruudukossa kuin korkeus (bittimaski) tai null,
     * jos ne_10m_ocean.geojson puuttuu kansiosta. Piirtomoottori
     * käyttää sitä maan ja meren erottamiseen; ks. meriruudukko().
     */
    meri: meriruudukko(kansio, korkeus),
  };
}
