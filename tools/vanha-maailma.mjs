/*
 * Vanha maailma yhdeksi kartaksi: Eurooppa, Afrikka, Lähi-itä ja Aasia.
 *
 *   NE_LAND=ne_10m_land.geojson node tools/vanha-maailma.mjs [--esikatselu ulos.svg]
 *
 * Omistajan päätös 2.8.2026: mantereiden välillä pitää voida liikkua
 * saumattomasti selaamalla. Se ei onnistu nykyisillä laudoilla, koska
 * jokainen on litistetty pallolta omalla tavallaan:
 *
 *   Eurooppa, Afrikka, Lähi-itä  yksinkertainen lieriö, kullakin oma
 *                                mittakaava ja nollakohta
 *   Aasia                        Lambertin kartio, keskimeridiaani 105°E
 *
 * Kahta eri tavalla litistettyä karttaa ei voi asettaa vierekkäin: niiden
 * rannikot eivät kohtaa saumassa vaan menevät ristiin. Siksi kaikki
 * piirretään uudelleen YHDELLÄ litistystavalla.
 *
 * --- miksi Miller ---
 *
 * Alue ulottuu Kapkaupungista (-34°) Tromssaan (+70°) ja Lissabonista
 * (-9°) Beringinsalmelle (+190°). Kartioprojektio ei kata kumpaakin
 * pallonpuoliskoa, joten valinta on lieriöiden väliltä:
 *
 *   Lieriö (plate carrée)  helpoin, mutta venyttää pohjoisen leveäksi:
 *                          Skandinavia ja Siperia levähtävät
 *   Mercator               aikakauden oma projektio (1873!), mutta 78°:ssa
 *                          pystymittakaava on lähes viisinkertainen —
 *                          Lappi ja Tromssa paisuisivat mahdottomiksi
 *   Miller                 kesytetty Mercator: muodot pysyvät järkevinä
 *                          noin 70°:een asti eikä napa karkaa äärettömiin
 *
 * Miller on näistä ainoa, jolla sekä Kapkaupunki että Tromssa näyttävät
 * itseltään samalla kartalla.
 *
 * --- mistä koordinaatit tulevat ---
 *
 * Nykyisten laudoiden x/y EI ole hukattua tietoa: kaavat ovat kunkin
 * pakettitiedoston alussa ja ne ovat käännettävissä. Tarkistettu kymmenellä
 * kaupungilla — mediaanivirhe 2 km. Aasialla on lisäksi alkuperäinen
 * lon/lat-aineisto tools/mapdata/asia.json:ssa, joten sitä ei tarvitse
 * kääntää lainkaan.
 *
 * Rannikot piirretään Natural Earthin 10m-aineistosta (public domain)
 * eikä käännetä vanhoista: Afrikassa on nyt 93 pistettä koko mantereelle
 * ja Lähi-idässä 129, kun Euroopassa on 1340. Omistaja huomasi saman:
 * "Aasia ja lähi-itä pitää ehkä piirtää uudestaan jos sama epätarkkuus
 * kuin euroopassa".
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const RAD = Math.PI / 180;
const argv = process.argv.slice(2);
const arvo = (lippu, oletus) => {
  const i = argv.indexOf(lippu);
  return i >= 0 ? argv[i + 1] : oletus;
};

/*
 * Mistä kunkin laudan paketti ja sen alkuperäiset koordinaatit löytyvät.
 *
 * `tuonti` on tiedosto ja siitä poimittava vienti. `mapdata` kertoo,
 * onko laudalla alkuperäinen lon/lat-aineisto tallessa: jos on, sitä
 * käytetään sellaisenaan. Muuten koordinaatit käännetään takaisin
 * laudan omasta kaavasta (KAANTEISET).
 *
 * Käännös on aina häviöllinen — mediaanivirhe 2 km — joten alkuperäistä
 * käytetään aina kun se on olemassa.
 */
export const LAUDAT = {
  europe: { tuonti: ['../js/packs/europe.js', 'EUROPE'] },
  africa: { tuonti: ['../js/packs/africa.js', 'AFRICA'] },
  middleeast: { tuonti: ['../js/packs/middleeast.js', 'MIDDLE_EAST'] },
  asia: { tuonti: ['../js/packs/asia.js', 'ASIA'], mapdata: 'asia' },
  northamerica: { tuonti: ['../js/packs/northamerica.js', 'NORTHAMERICA'], mapdata: 'northamerica' },
  southamerica: { tuonti: ['../js/packs/southamerica.js', 'SOUTHAMERICA'], mapdata: 'southamerica' },
  oceania: { tuonti: ['../js/packs/oceania.js', 'OCEANIA'], mapdata: 'oceania' },
};

/** Vanha maailma: neljä lautaa, jotka yhdistettiin ensimmäisenä. */
export const VANHA_MAAILMA = ['europe', 'africa', 'middleeast', 'asia'];

/** Koko maailma: kaikki laudat, joilla on oma maantieteensä. */
export const KOKO_MAAILMA = [...VANHA_MAAILMA, 'northamerica', 'southamerica', 'oceania'];

/** Laudan alkuperäinen lon/lat-aineisto, jos sellainen on. */
function mapdata(id) {
  const nimi = LAUDAT[id]?.mapdata;
  if (!nimi) return null;
  return JSON.parse(readFileSync(join(JUURI, `tools/mapdata/${nimi}.json`), 'utf8'));
}

/**
 * Lähdepaketit. Tuodaan tiedostoittain eikä js/pack.js:n kautta, koska
 * rekisteri lataa myös yhdistetyt paketit — ja ne ovat näiden
 * työkalujen tuotos. Riippuvuus omaan tuotokseen tekisi työkalusta
 * käyttökelvottoman juuri silloin kun sitä eniten tarvitaan.
 */
export async function lahdepaketit(laudat = VANHA_MAAILMA) {
  return Promise.all(laudat.map(async (id) => {
    const [polku, vienti] = LAUDAT[id].tuonti;
    return (await import(polku))[vienti];
  }));
}

// --- projektio ---------------------------------------------------------------

/** Millerin lieriöprojektio. Palauttaa yksiköttömät x/y. */
export const miller = {
  eteen: (lon, lat) => [
    lon * RAD,
    -1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * lat * RAD)),
  ],
  // y kasvaa alaspäin piirtokoordinaateissa, siksi miinus yllä ja tässä.
  taakse: (x, y) => [
    x / RAD,
    (Math.atan(Math.exp(-y / 1.25)) - Math.PI / 4) / 0.4 / RAD,
  ],
};

// --- vanhojen lautojen käänteiskaavat ----------------------------------------
//
// Nämä ovat kunkin pakettitiedoston alkukommentin kaavat toisin päin.
// Jos paketin kaavaa joskus muutetaan, tämä on muutettava mukana —
// tests/vanha-maailma.test.mjs vertaa niitä tunnettuihin kaupunkeihin.

export const KAANTEISET = {
  europe: (x, y) => [x / 19.2 - 11, 72 - y / 26.3],
  africa: (x, y) => [x / 13.333 - 20, 40 - y / 12.5],
  middleeast: (x, y) => [x / 25 + 24, 44 - y / 29.4],
};

// --- rannikot ----------------------------------------------------------------

/**
 * Ramer–Douglas–Peucker: karsii pisteitä, jotka eivät muuta viivan
 * muotoa enempää kuin toleranssin verran. Natural Earthissa on 443 000
 * pistettä; peliin niistä tarvitaan murto-osa, mutta karsinnan pitää
 * säilyttää niemet ja lahdet — tasavälein harventaminen katkaisisi ne.
 */
function karsi(pisteet, toleranssi) {
  if (pisteet.length < 3) return pisteet;
  const etaisyys = ([px, py], [ax, ay], [bx, by]) => {
    const dx = bx - ax;
    const dy = by - ay;
    const pit2 = dx * dx + dy * dy;
    if (!pit2) return Math.hypot(px - ax, py - ay);
    const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / pit2));
    return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
  };
  const pidä = new Array(pisteet.length).fill(false);
  pidä[0] = true;
  pidä[pisteet.length - 1] = true;
  const pino = [[0, pisteet.length - 1]];
  while (pino.length) {
    const [a, b] = pino.pop();
    let paras = -1;
    let parasEtaisyys = toleranssi;
    for (let i = a + 1; i < b; i++) {
      const d = etaisyys(pisteet[i], pisteet[a], pisteet[b]);
      if (d > parasEtaisyys) { parasEtaisyys = d; paras = i; }
    }
    if (paras > 0) {
      pidä[paras] = true;
      pino.push([a, paras], [paras, b]);
    }
  }
  return pisteet.filter((_, i) => pidä[i]);
}

/** Onko rengas kokonaan alueen ulkopuolella? */
function alueenUlkona(rengas, alue) {
  let minLon = Infinity; let maxLon = -Infinity;
  let minLat = Infinity; let maxLat = -Infinity;
  for (const [lon, lat] of rengas) {
    if (lon < minLon) minLon = lon;
    if (lon > maxLon) maxLon = lon;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }
  return maxLon < alue.lon0 || minLon > alue.lon1
    || maxLat < alue.lat0 || minLat > alue.lat1;
}

/**
 * Natural Earthin maapolygonit alueelta, projisoituina ja karsittuina.
 * Pienimmät saaret jätetään pois: ne olisivat kartalla yhden pisteen
 * täpliä eikä niihin pääse pelissä mihinkään.
 */
export function rannikot(geojson, alue, {
  toleranssi = 0.004, minPisteet = 12, pakolliset = [],
} = {}) {
  const ulos = [];
  for (const f of geojson.features) {
    const muodot = f.geometry.type === 'Polygon'
      ? [f.geometry.coordinates]
      : f.geometry.coordinates;
    for (const muoto of muodot) {
      const rengas = muoto[0]; // ulkokehä; reiät (järvet) eivät kiinnosta
      if (!rengas || rengas.length < 4) continue;
      if (alueenUlkona(rengas, alue)) continue;
      // Saari, jolla on kaupunki, säilyy vaikka olisi kuinka pieni:
      // muuten kaupunki jäisi seisomaan tyhjän meren päälle. Näin kävi
      // ensimmäisellä ajolla St. Helenalle, Sansibarille ja Sisilialle.
      const onPakollinen = pakolliset.some(([lon, lat]) => pisteRenkaassa([lon, lat], rengas));
      if (!onPakollinen && rengas.length < minPisteet) continue;
      const projisoitu = rengas.map(([lon, lat]) => miller.eteen(lon, lat));
      const karsittu = karsi(projisoitu, onPakollinen ? toleranssi / 4 : toleranssi);
      if (onPakollinen || karsittu.length >= minPisteet) ulos.push(karsittu);
    }
  }
  return ulos;
}

/** Onko piste renkaan sisällä? Säteenheitto lon/lat-tasossa. */
function pisteRenkaassa([px, py], rengas) {
  let sisalla = false;
  for (let i = 0, j = rengas.length - 1; i < rengas.length; j = i++) {
    const [xi, yi] = rengas[i];
    const [xj, yj] = rengas[j];
    if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) {
      sisalla = !sisalla;
    }
  }
  return sisalla;
}

// --- sovitus laudalle --------------------------------------------------------

/** Sovittaa projisoidut pisteet laudalle; sama mittakaava molempiin suuntiin. */
export function sovita(ryhmat, { leveys = 4000, marginaali = 40 } = {}) {
  const kaikki = ryhmat.flat();
  const xs = kaikki.map((p) => p[0]);
  const ys = kaikki.map((p) => p[1]);
  const minX = Math.min(...xs); const maxX = Math.max(...xs);
  const minY = Math.min(...ys); const maxY = Math.max(...ys);
  const kaytossa = leveys - 2 * marginaali;
  const skaala = kaytossa / (maxX - minX);
  return {
    muunna: ([x, y]) => [
      Number(((x - minX) * skaala + marginaali).toFixed(1)),
      Number(((y - minY) * skaala + marginaali).toFixed(1)),
    ],
    korkeus: Math.round((maxY - minY) * skaala + 2 * marginaali),
    skaala,
  };
}

/*
 * Sovitus koko maapallolle, kun kartan on kierrettävä ympäri.
 *
 * Ero `sovita`an on ratkaiseva. `sovita` venyttää kartan sisällön
 * mukaan: leveys on se, mihin läntisin ja itäisin piste sattuvat
 * osumaan. Kiertävällä kartalla se ei käy — jos laudan leveys ei ole
 * TARKALLEEN 360 astetta, sauma ei kohtaa itseään, ja kartan reunassa
 * olisi joko rako tai päällekkäisyys.
 *
 * Siksi leveys annetaan ja se tarkoittaa aina täyttä kierrosta.
 *
 * Pituusasteet mitataan lon0:sta itään päin ja kierretään välille
 * [0, leveys). Yksikään piste ei siis putoa laudan ulkopuolelle
 * vaakasuunnassa. Rannikot, jotka kulkevat sauman yli, jäävät
 * roikkumaan reunan yli — se on tarkoitus: piirtäjä toistaa kartan
 * molemmin puolin, jolloin ylivuoto osuu naapurikopioon.
 *
 * Korkeus rajataan annettuihin leveysasteisiin eikä aineiston mukaan:
 * Miller venyttää navat äärettömiin, eikä 85. leveysasteella ole
 * yhtään kaupunkia.
 */
export function sovitaMaailma({ leveys = 12000, lon0 = -30, etela = -58, pohjoinen = 74 } = {}) {
  const KIERROS = 2 * Math.PI;
  const skaala = leveys / KIERROS;
  const yPohjoinen = miller.eteen(0, pohjoinen)[1];
  const yEtela = miller.eteen(0, etela)[1];
  // Pituusasteen matka lon0:sta itään, kierrettynä yhteen kierrokseen.
  const kaari = (lon) => {
    const d = (lon - lon0) * RAD;
    return ((d % KIERROS) + KIERROS) % KIERROS;
  };
  const muunna = ([lon, lat]) => [
    Number((kaari(lon) * skaala).toFixed(1)),
    Number(((miller.eteen(0, lat)[1] - yPohjoinen) * skaala).toFixed(1)),
  ];
  return {
    muunna,
    /*
     * Sama, mutta viivalle: peräkkäiset pisteet pidetään yhtenäisinä.
     * Ilman tätä rannikko, joka ylittää sauman, piirtyisi vaakaviivana
     * halki koko kartan — piste hyppäisi laidasta laitaan.
     */
    muunnaViiva: (pisteet) => {
      const ulos = [];
      let siirto = 0;
      let edellinen = null;
      for (const [lon, lat] of pisteet) {
        let x = kaari(lon) * skaala;
        if (edellinen != null) {
          // Yli puolen maailman hyppy on sauman ylitys, ei liikettä.
          while (x + siirto - edellinen > leveys / 2) siirto -= leveys;
          while (x + siirto - edellinen < -leveys / 2) siirto += leveys;
        }
        x += siirto;
        edellinen = x;
        ulos.push([
          Number(x.toFixed(1)),
          Number(((miller.eteen(0, lat)[1] - yPohjoinen) * skaala).toFixed(1)),
        ]);
      }
      return ulos;
    },
    korkeus: Math.round((yEtela - yPohjoinen) * skaala),
    leveys,
    skaala,
    lon0,
  };
}

// --- kaupunkien kokoaminen ---------------------------------------------------

/*
 * Käsin annetut lon/lat-paikat: laudan oma piste EI ole käännettävissä.
 *
 * KAANTEISET olettaa, että kaupungin x/y on laskettu laudan kaavasta.
 * Useimmiten se pitää, mutta ei aina: Eurooppa-laudan kaava kattaa
 * pituusasteet -11°...41°, eikä Islanti (-21.9°) mahdu sinne lainkaan
 * — kaava antaisi negatiivisen x:n. Siksi Islannin lautapiste on
 * aikanaan pantu laudan yläkulmaan summittain (x 62, y 60), ja käännös
 * luki siitä 69.7°N 7.8°W eli avomeren Islannin koillispuolelta.
 * Maailmankartta peri virheen: piste seisoi meressä saaren vieressä
 * (omistajan kuvakaappaus 17.8.2026).
 *
 * Näissä tapauksissa ainoa oikea korjaus on antaa todellinen paikka
 * käsin. Lautapistettä ei voi korjata, koska laudalla ei ole sille
 * paikkaa.
 */
export const TARKAT_PAIKAT = {
  // Reykjavíkin seutu; Islanti on Eurooppa-laudan kaavan ulkopuolella.
  islanti: [-21.94, 64.15],
};

/**
 * Kaikkien neljän laudan kaupungit lon/lat-koordinaatteina.
 * Sama kaupunki voi olla usealla laudalla (Istanbul, Kairo, Teheran);
 * ensimmäinen esiintymä voittaa ja loput kirjataan päällekkäisiksi.
 */
export async function kaupungit(laudat = VANHA_MAAILMA) {
  const PACKS = await lahdepaketit(laudat);
  const ulos = new Map();
  const paallekkaiset = [];
  for (const id of laudat) {
    const pack = PACKS.find((p) => p.id === id);
    const alkuperainen = mapdata(id);
    for (const c of pack.cities) {
      let lonlat;
      if (TARKAT_PAIKAT[c.id]) {
        lonlat = TARKAT_PAIKAT[c.id];
      } else if (alkuperainen) {
        lonlat = alkuperainen.cities[c.id];
        if (!lonlat) continue;
      } else {
        lonlat = KAANTEISET[id](c.x, c.y);
      }
      if (ulos.has(c.id)) { paallekkaiset.push([c.id, id]); continue; }
      ulos.set(c.id, { id: c.id, nimi: c.name, lauta: id, lon: lonlat[0], lat: lonlat[1] });
    }
  }
  return { kaupungit: [...ulos.values()], paallekkaiset };
}

/*
 * Reitit neljältä laudalta yhtenä verkkona.
 *
 * Reittejä EI tarvitse keksiä uusiksi: samat kaupunkiparit ovat yhä
 * naapureita yhdistetyllä kartalla. Ja koska porttikaupungit (Istanbul,
 * Kairo, Teheran) sulautuvat yhdeksi, neljä erillistä verkkoa liittyy
 * niiden kohdalla itsestään toisiinsa — tarkistettu: 143 kaupunkia ja
 * 222 reittiä muodostavat YHDEN yhtenäisen verkon, josta pääsee
 * jokaisesta kaupungista jokaiseen.
 *
 * Merireittien välipisteet (via) sen sijaan on projisoitava uudelleen:
 * ne kaartavat rannikon ympäri vanhan laudan koordinaateissa, ja uudella
 * kartalla ne osuisivat muuten maalle.
 */
export async function reitit(laudat = VANHA_MAAILMA) {
  const PACKS = await lahdepaketit(laudat);
  const ulos = [];
  const nahdyt = new Set();
  for (const id of laudat) {
    const pack = PACKS.find((p) => p.id === id);
    const alkuperainen = mapdata(id);
    for (const e of pack.edges) {
      // Sama kaupunkipari voi olla kahdella laudalla (porttikaupunkien
      // ympärillä); reitti tarvitaan kerran.
      const avain = [e.a, e.b].sort().join('~');
      if (nahdyt.has(avain)) continue;
      nahdyt.add(avain);
      let via = null;
      if (e.via?.length) {
        if (alkuperainen) {
          // Alkuperäisessä aineistossa välipisteet ovat lon/lat-pareina.
          via = (alkuperainen.routes?.[avain] ?? alkuperainen.routes?.[`${e.a}_${e.b}`] ?? null);
        } else {
          via = e.via.map(([x, y]) => KAANTEISET[id](x, y));
        }
      }
      ulos.push({ a: e.a, b: e.b, tyyppi: e.type ?? 'land', askeleet: e.steps, via });
    }
  }
  return ulos;
}

// --- ajo ---------------------------------------------------------------------

if (import.meta.url === `file://${process.argv[1]}`) {
  const lahde = process.env.NE_LAND ?? 'ne_10m_land.geojson';
  const geo = JSON.parse(readFileSync(lahde, 'utf8'));
  const { kaupungit: kaup, paallekkaiset } = await kaupungit();

  // Rajaus kaupunkien mukaan, väljästi: rannikkoa saa jatkua reunojen yli,
  // kuten Euroopan laudalla nytkin.
  const lonit = kaup.map((c) => c.lon);
  const latit = kaup.map((c) => c.lat);
  const alue = {
    lon0: Math.min(...lonit) - 12, lon1: Math.max(...lonit) + 12,
    lat0: Math.min(...latit) - 10, lat1: Math.max(...latit) + 10,
  };

  const tiet = await reitit();
  const viivat = rannikot(geo, alue);
  const kaupPisteet = kaup.map((c) => miller.eteen(c.lon, c.lat));
  const { muunna, korkeus } = sovita([...viivat, kaupPisteet]);
  const paikka = new Map(kaup.map((c) => [c.id, muunna(miller.eteen(c.lon, c.lat))]));

  console.log(`alue: ${alue.lon0.toFixed(0)}…${alue.lon1.toFixed(0)}° pituutta, `
    + `${alue.lat0.toFixed(0)}…${alue.lat1.toFixed(0)}° leveyttä`);
  console.log(`rannikkoja: ${viivat.length}, pisteitä ${viivat.reduce((s, v) => s + v.length, 0)}`);
  console.log(`kaupunkeja: ${kaup.length} (päällekkäisiä ${paallekkaiset.length}: `
    + `${paallekkaiset.map(([id, l]) => `${id}/${l}`).join(', ')})`);
  console.log(`reittejä: ${tiet.length}, joista ${tiet.filter((t) => t.via?.length).length} kaartaa`);
  console.log(`lauta: 4000 x ${korkeus}`);

  const esikatselu = arvo('--esikatselu', null);
  if (esikatselu) {
    const polku = (v) => `M${v.map(muunna).map(([x, y]) => `${x},${y}`).join(' L')} Z`;
    const varit = {
      europe: '#2f6f4f', africa: '#a8622a', middleeast: '#8a5b9c', asia: '#2a5d8a',
    };
    const svg = [
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4000 ${korkeus}" width="2000">`,
      `<rect width="4000" height="${korkeus}" fill="#ecd8ae"/>`,
      ...viivat.map((v) => `<path d="${polku(v)}" fill="#ddc394" stroke="#46331f" stroke-width="2"/>`),
      // Reitit kaupunkien alle: merireitit katkoviivalla kuten pelissä.
      ...tiet.map((t) => {
        const a = paikka.get(t.a);
        const b = paikka.get(t.b);
        if (!a || !b) return '';
        const kohdat = [a, ...(t.via ?? []).map((p) => muunna(miller.eteen(p[0], p[1]))), b];
        const d = `M${kohdat.map(([x, y]) => `${x},${y}`).join(' L')}`;
        const meri = t.tyyppi === 'sea';
        return `<path d="${d}" fill="none" stroke="${meri ? '#3f6d94' : '#8a6c46'}"`
          + ` stroke-width="${meri ? 3 : 4}"${meri ? ' stroke-dasharray="14 12"' : ''} opacity="0.75"/>`;
      }),
      ...kaup.map((c) => {
        const [x, y] = muunna(miller.eteen(c.lon, c.lat));
        return `<circle cx="${x}" cy="${y}" r="11" fill="${varit[c.lauta]}" stroke="#2b1d0e" stroke-width="2"/>`
          + `<text x="${x + 16}" y="${y + 6}" font-size="20" font-family="serif" fill="#2b1d0e">${c.nimi}</text>`;
      }),
      '</svg>',
    ].join('\n');
    writeFileSync(esikatselu, svg);
    console.log(`esikatselu: ${esikatselu}`);
  }
}
