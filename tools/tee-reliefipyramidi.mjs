/*
 * 15 KAARISEKUNNIN RELIEFI PÄÄKARTAN LAATTAPYRAMIDIIN.
 *
 *   NODE_USE_ENV_PROXY=1 node tools/tee-reliefipyramidi.mjs \
 *       [--alue 5,40,15,48] [--tasot 0-7] [--ulos <kansio>] \
 *       [--rinnakkain 3] [--jatka] [--pakota-laatat z7/89/35,z7/89/39] \
 *       [--katto-kt 120] [--kuiva]
 *
 * --jatka        ohittaa laatat, jotka ovat jo levyllä tai kirjattu
 *                manifestiin avomereksi; manifesti päivittyy lisäten.
 * --rinnakkain   montako laattaa haetaan yhtä aikaa (oletus 3).
 * --pakota-laatat  nimetyt laatat ajetaan vaikka --jatka ohittaisi ne.
 * --tasot 0-7    z7 haetaan NOAA:lta, z6…z0 alinäytteistetään z7:stä.
 *
 * === MIKSI PYRAMIDI EIKÄ OMA LAATTAJAKO =============================
 *
 * Omistaja 18.9.2026 (Raamattu, ASTRONAUTIN KAMERA LISÄYS 16,
 * tarkennus 2): *"Eikö Topografia voisi olla yhtä terävä kuin pää
 * kartta?"* Pääkartta on terävä siksi, että se EI OLE YKSI KUVA vaan
 * laattapyramidi: tools/generoi-laattapyramidi.mjs polttaa arkin
 * zoomitasoittain 512 pikselin laatoiksi ja js/laattapyramidi.js
 * lataa niistä vain näkyvän ikkunan. Topografialinssi sen sijaan
 * venyttää yhtä 10800 pikselin kuvaa (ja paikkaa sitä laastarilla),
 * eli se on rakenteeltaan se kartta, jonka pääkartta jätti taakseen.
 *
 * Tämä työkalu tekee reliefistä TÄSMÄLLEEN SAMAN MUOTOISEN PYRAMIDIN:
 * sama arkki, samat zoomitasot, sama 512 px:n laatta, sama
 * sarake/rivi-numerointi ja sama polkukaava. Silloin linssi ei tarvitse
 * omaa piirtokonettaan lainkaan — se saa käyttää pääkartan
 * laattapiirtoa ja vaihtaa vain laattojen osoitteen.
 *
 * === LUKU, JOKA RATKAISI KAIKEN =====================================
 *
 * Pyramidin syvin taso z7 on 7,2 px lautayksikköä kohti eli
 * 240 PIKSELIÄ ASTETTA KOHTI. 15 kaarisekuntia on 1/240 astetta.
 * Syvin laattataso on siis PIKSELILLEEN 15″:n aineiston tarkkuus:
 * ETOPO 2022 15″ ei jätä z7:ää vajaaksi eikä mene siitä hukkaan.
 * (Nykyinen 1′ = 60 px/aste riittäisi vain z5:een asti — siitä
 * eteenpäin laastari suurentaa, ja juuri sen omistaja näki puurona.)
 *
 * Tasot:
 *
 *   z7  86400 px maailman leveys  240 px/aste   15″   lähdeaineistosta
 *   z6  43200                     120 px/aste   30″   alinäytteistetty
 *   z5  21600                      60 px/aste    1′   alinäytteistetty
 *   …
 *   z0    675                    1,875 px/aste        alinäytteistetty
 *
 * ALEMMAT TASOT ALINÄYTTEISTETÄÄN KUVASTA eikä lasketa uudestaan
 * korkeusaineistosta. Tämä on tietoinen ero pääkarttaan, joka piirtää
 * jokaisen tason uudestaan: pääkartalla rae ja nimien koko eivät saa
 * kutistua, koska ne ovat PIIRROSTA. Reliefi on KENTTÄ, ja kentän
 * oikea pienennös on sen keskiarvo — juuri sen 1′:n reliefikuvakin
 * tekee (tools/tee-reliefikartta.mjs suodattaa 0,05°:n ruudukon
 * 3600 pikseliin laatikkosuodattimella). Uudelleenvarjostus joka
 * tasolla antaisi karkeille tasoille eri kontrastin kuin nykyisellä
 * kuvalla, ja se näkyisi zoomatessa sävyn hyppynä.
 *
 * === LÄHDE JA LISENSSI ==============================================
 *
 * NOAA NCEI ETOPO 2022 15 Arc-Second Global Relief Model, "surface"
 * (jääpinta — sama pinta kuin nykyisessä ETOPO1 Ice Surface
 * -aineistossa, jottei Grönlanti muutu toiseksi maailmaksi tason
 * rajalla). NOAA National Centers for Environmental Information 2022,
 * doi:10.25921/fd45-gt74. Yhdysvaltain liittovaltion virastonsa
 * tuottamana PUBLIC DOMAIN.
 *
 * Aineisto luetaan THREDDS:n NetCDF Subset Servicestä, joka leikkaa
 * lat/lon-ikkunan palvelimen päässä ja palauttaa sen KLASSISENA
 * netCDF:nä (CDF-1). Se on ratkaiseva yksityiskohta: NOAA:n omat
 * 15°-laatat ovat netCDF-4:ää eli HDF5:tä, jota repon lukija
 * (`lueNetCDF`) ei osaa lukea eikä koneella ole GDALia. NCSS antaa
 * saman aineiston muodossa, jolle meillä on jo lukija — eikä koko
 * 15°-laattaa tarvitse ladata, kun tarvitaan kaksi astetta.
 *
 * NOAA-RIIPPUVUUS ON KERTALUONTOINEN NOUTO. Omistajan päätös
 * 30.8.2026 ("yksikään AJO ei saa riippua NOAA:n tavoitettavuudesta")
 * koskee polttoja; tämän tulos viedään R2:een kuten 1′:n korkeuspalat.
 * Ikkunat jäävät levyvälimuistiin, joten keskeytynyt ajo jatkaa siitä
 * mihin jäi eikä hae samaa kohtaa kahdesti.
 *
 * === MIKSI REUNUS ===================================================
 *
 * Varjostus lasketaan naapuriruutujen EROSTA. Ilman reunusta laatan
 * reunimmaisen rivin naapuri olisi rivi itse (varjostus peilaa reunan),
 * ja rinne olisi siinä puolet loivempi kuin naapurilaatalla: yhden
 * pikselin hiusviiva joka ikisen laatan ympärillä. Siksi korkeusikkuna
 * haetaan reunuksen verran laattaa suurempana ja reunus katoaa vasta
 * näytteenotossa.
 */
import { spawnSync } from 'node:child_process';
import {
  existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, statSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync, gunzipSync } from 'node:zlib';

import { lueNetCDF } from './hae-korkeusruudukko.mjs';
import { varjosta, tasainenVarjo, AURINKO } from './varjostus.mjs';
import { LUT, LUT_POHJA, LUT_YLA, KALVO, lutKohta } from './reliefivarit.mjs';
import { sovitaMaailma, miller } from './vanha-maailma.mjs';

const TAMA = fileURLToPath(import.meta.url);
const AJETAAN_SUORAAN = Boolean(process.argv[1]) && resolve(process.argv[1]) === TAMA;

if (AJETAAN_SUORAAN && !process.env.NODE_USE_ENV_PROXY
  && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const ajo = spawnSync(process.execPath, [TAMA, ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
  });
  process.exit(ajo.status ?? 1);
}

/* ------------------------------------------- pyramidin geometria */

/*
 * NÄMÄ LUVUT OVAT PÄÄKARTAN LUKUJA. Ne on kopioitu tänne
 * tools/generoi-laattapyramidi.mjs:stä sanasta sanaan eikä tuotu,
 * koska generaattori on SKRIPTI: sen tuonti käynnistäisi koko
 * pyramidipoltton. Jos ne joskus muuttuvat, ne muuttuvat yhdessä —
 * ja tests/reliefipyramidi.test.mjs vartioi, että ne ovat yhä samat
 * kuin generaattorin lähdekoodissa.
 */
export const LAUTA = { leveys: 12000, lon0: -175, etela: -58, pohjoinen: 76 };
export const ARKIN_LEVEYSPIIRIT = { pohjoinen: 84, etela: -66 };
export const KEHYS = { yla: 232, ala: 240 };
/** Syvimmän tason tiheys, px / lautayksikkö. */
export const TIHEYS = 7.2;
/** Taso, jonka tiheys on TIHEYS. */
export const SYVIN_VIITE = 7;
export const LAATTA = 512;
/** Uloimman tason leveys pikseleinä. */
export const TASO0 = (LAUTA.leveys * TIHEYS) / 2 ** SYVIN_VIITE; // 675

const RAD = Math.PI / 180;
const sovitus = sovitaMaailma(LAUTA);
const yPohjoinen = miller.eteen(0, LAUTA.pohjoinen)[1];

/** Laudan y leveysasteesta. */
export const lautaY = (lat) => (miller.eteen(0, lat)[1] - yPohjoinen) * sovitus.skaala;
/** Leveysaste laudan y:stä. */
export const lautaLat = (y) => miller.taakse(0, yPohjoinen + y / sovitus.skaala)[1];
/** Pituusaste laudan x:stä (ei kierrä — arkki on 361° leveä). */
export const lautaLon = (x) => LAUTA.lon0 + (x / sovitus.skaala) / RAD;

const laudanBbox = {
  x: 0,
  y: lautaY(ARKIN_LEVEYSPIIRIT.pohjoinen),
  w: LAUTA.leveys,
  h: lautaY(ARKIN_LEVEYSPIIRIT.etela) - lautaY(ARKIN_LEVEYSPIIRIT.pohjoinen),
};
const YKSIKKOA_PER_PIKSELI = laudanBbox.w / 6400;
/** Painettu arkki: kartta-ala ja kehyksen paperimarginaalit. */
export const ARKKI = {
  x: 0,
  y: laudanBbox.y - KEHYS.yla * YKSIKKOA_PER_PIKSELI,
  w: laudanBbox.w,
  h: laudanBbox.h + (KEHYS.yla + KEHYS.ala) * YKSIKKOA_PER_PIKSELI,
};

/** Yhden tason mitat — sama kaava kuin generoi-laattapyramidi.mjs. */
export function tasonMitat(z) {
  const leveys = TASO0 * 2 ** z;
  const px = leveys / ARKKI.w;
  const korkeus = Math.round(ARKKI.h * px);
  return {
    z,
    leveys,
    korkeus,
    px,
    sarakkeita: Math.ceil(leveys / LAATTA),
    riveja: Math.ceil(korkeus / LAATTA),
  };
}

/** Laatan laatikko laudan koordinaateissa (ja sen pikselimitat). */
export function laatanBbox(mitat, sarake, rivi) {
  const w = Math.min(LAATTA, mitat.leveys - sarake * LAATTA);
  const h = Math.min(LAATTA, mitat.korkeus - rivi * LAATTA);
  return {
    x: ARKKI.x + (sarake * LAATTA) / mitat.px,
    y: ARKKI.y + (rivi * LAATTA) / mitat.px,
    w: w / mitat.px,
    h: h / mitat.px,
    pw: w,
    ph: h,
  };
}

/* ------------------------------------------------ lähde ja vakiot */

/** Lähdeaineiston ruudun koko asteina: 15 kaarisekuntia. */
export const RUUTU_15S = 1 / 240;
/** Reunus lähderuutuina. */
export const REUNUS = 2;
/** Liioittelu — sama kuin 1′:n linssikuvalla (tee-reliefikartta.mjs). */
export const LIIOITTELU = 12;

export const LAHDE = {
  nimi: 'NOAA NCEI ETOPO 2022 15 Arc-Second Global Relief Model (surface)',
  doi: '10.25921/fd45-gt74',
  lisenssi: 'public domain (U.S. Government work)',
  palvelu: 'THREDDS NetCDF Subset Service',
};

const NCSS = 'https://www.ngdc.noaa.gov/thredds/ncss/grid/global/ETOPO2022/15s'
  + '/15s_surface_elev_netcdf/ETOPO_2022_v1_15s_%TILE%_surface.nc';

const VALIMUISTI = join(tmpdir(), 'matkakirja-reliefi15');

/* ------------------------------------------------ lähdeikkunan haku */

/**
 * NOAA:n oma 15°-laatta, jonka sisällä piste on. Nimi on laatan
 * LUOTEISNURKKA: N45E000 kattaa lat 30…45, lon 0…15.
 */
export function lahdeLaatta(lon, lat) {
  const lon0 = Math.floor(lon / 15) * 15;
  const latYla = Math.min(90, Math.ceil(lat / 15) * 15);
  const ns = latYla < 0 ? 'S' : 'N';
  const ew = lon0 < 0 ? 'W' : 'E';
  return `${ns}${String(Math.abs(latYla)).padStart(2, '0')}`
    + `${ew}${String(Math.abs(lon0)).padStart(3, '0')}`;
}

/*
 * HAUN SITKEYS. Mitattu 18.9.2026: koko maailman z7-ajo kaatui 55
 * laatan jälkeen `TypeError: fetch failed / ETIMEDOUT`. Yksi NOAA:n
 * tavoittamaton hetki ei saa kaataa tuntien ajoa.
 *
 * Aikakatko on 60 s EIKÄ kymmentä minuuttia: mitattu vaste on
 * 1,3–2,6 s, joten 60 s on jo viisikymmenkertainen vara. Vanha 600 s
 * tarkoitti, että jumittunut yhteys söi kymmenen minuuttia ennen kuin
 * kukaan huomasi mitään — nyt sama tilanne maksaa minuutin ja johtaa
 * uusintaan.
 */
export const HAKU = {
  aikakatkoMs: 60_000,
  yrityksia: 5,
  odotusMinMs: 2_000,
  odotusMaxMs: 30_000,
};

const nuku = (ms) => new Promise((valmis) => { setTimeout(valmis, ms); });

async function noudaNcss(url) {
  let viimeinen;
  for (let yritys = 1; yritys <= HAKU.yrityksia; yritys++) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const v = await fetch(url, { signal: AbortSignal.timeout(HAKU.aikakatkoMs) });
      if (!v.ok) throw new Error(`${v.status} ${v.statusText} — ${url}`);
      // eslint-disable-next-line no-await-in-loop
      const buf = Buffer.from(await v.arrayBuffer());
      if (buf.length < 8 || buf.toString('latin1', 0, 3) !== 'CDF') {
        throw new Error('NCSS ei palauttanut klassista netCDF:ää — muuttuiko palvelu?');
      }
      return buf;
    } catch (e) {
      viimeinen = e;
      if (yritys === HAKU.yrityksia) break;
      /* Eksponentiaalinen odotus: 2, 4, 8, 16 s (katto 30 s). */
      const odotus = Math.min(
        HAKU.odotusMaxMs,
        HAKU.odotusMinMs * 2 ** (yritys - 1),
      );
      console.log(`    NCSS-haku ${yritys}/${HAKU.yrityksia} kaatui `
        + `(${e?.message ?? e?.name ?? e}) — uusinta ${odotus / 1000} s kuluttua`);
      // eslint-disable-next-line no-await-in-loop
      await nuku(odotus);
    }
  }
  throw viimeinen;
}

/** Yhden lähdelaatan sisällä oleva ikkuna. */
async function haePala({ lon0, lat0, lon1, lat1 }) {
  const laatta = lahdeLaatta((lon0 + lon1) / 2, (lat0 + lat1) / 2);
  const url = `${NCSS.replace('%TILE%', laatta)}?var=z`
    + `&south=${lat0}&north=${lat1}&west=${lon0}&east=${lon1}&accept=netcdf`;
  const nimi = `p-${laatta}-${lon0.toFixed(5)}_${lat0.toFixed(5)}`
    + `_${lon1.toFixed(5)}_${lat1.toFixed(5)}.nc.gz`;
  const polku = join(VALIMUISTI, nimi);

  let buf;
  if (existsSync(polku) && statSync(polku).size > 0) {
    buf = gunzipSync(readFileSync(polku));
  } else {
    buf = await noudaNcss(url);
    mkdirSync(VALIMUISTI, { recursive: true });
    writeFileSync(polku, gzipSync(buf));
  }

  const nc = lueNetCDF(buf);
  const lat = nc.lat?.data; const lon = nc.lon?.data; const z = nc.z?.data;
  if (!lat || !lon || !z) throw new Error('netCDF:stä puuttuu lat/lon/z');
  /*
   * lat on NCSS:ssä NOUSEVA eli sama suunta kuin ruudukkosopimuksessa
   * (y kasvaa pohjoiseen). Tarkistetaan: käännetty ruudukko tuottaisi
   * peilivarjon, joka näyttää vuorilta mutta valaisee ne väärältä
   * puolelta — virhe, jota ei huomaa katsomalla.
   */
  if (lat.length > 1 && lat[lat.length - 1] < lat[0]) {
    throw new Error('lat on laskeva — NCSS:n ruudukon suunta muuttui');
  }
  /*
   * PITUUSASTE NORMALISOIDAAN −180…180:een.
   *
   * Mitattu 18.9.2026: NCSS palautti laatasta N45E015 pyydetylle
   * ikkunalle 15…17 °E pituusasteet 375…377. Se on sama meridiaani
   * (375 − 360 = 15), mutta hilaindeksinä se on maailman toisella
   * puolella — ja ainoa oire oli 86 918 sarakkeen levyinen liimattu
   * ruudukko ja 154 Mt muistia yhdestä 512 px:n laatasta. Yksi
   * vähennyslasku tässä, eikä kutsujan tarvitse tietää asiasta.
   */
  const lonN = new Float64Array(lon.length);
  for (let i = 0; i < lon.length; i++) {
    let v = lon[i];
    while (v > 180) v -= 360;
    while (v < -180) v += 360;
    lonN[i] = v;
  }
  return {
    z, lat, lon: lonN, leveys: lon.length, korkeus: lat.length,
  };
}

/** Globaalin 15″-hilan sarake-/rivi-indeksi (solukeskipisteet). */
const hilaX = (lon) => Math.round((lon + 180) * 240 - 0.5);
const hilaY = (lat) => Math.round((lat + 90) * 240 - 0.5);

/**
 * Korkeusikkuna asteina, tarvittaessa useasta lähdelaatasta koottuna.
 *
 * Palauttaa `{ z, leveys, korkeus, ruutu, lat0, lon0 }` samalla
 * suuntasopimuksella kuin hae-korkeusruudukko: y kasvaa pohjoiseen,
 * x itään. NCSS palvelee yhtä tiedostoa kerrallaan, joten 15°:n rajan
 * yli menevä ikkuna haetaan paloina ja liimataan tässä — muuten
 * pyyntö palauttaisi hiljaa vajaan ikkunan.
 */
export async function haeIkkuna({
  lon0, lat0, lon1, lat1,
}) {
  /*
   * Väli paloiksi 15°:n rajoilla — mutta EI HIUSOHUIKSI PALOIKSI.
   *
   * Kun laatta sattuu ylittämään lähdelaatan rajan aivan reunastaan,
   * naiivi jako tekee palan, joka on kapeampi kuin yksi solu. NCSS
   * vastaa sellaiseen pyyntöön palauttamalla KOKO tiedoston leveyden:
   * mitattu 86 918 solua pyydetyn 518:n sijaan, eli 154 Mt muistia
   * yhdestä 512 px:n laatasta. Siksi liian ohut pala levennetään
   * neljään soluun POISPÄIN rajasta — omalle lähdelaatalleen, jossa
   * se on jo — ja päällekkäisyys naapuripalan kanssa on harmitonta,
   * koska liimaus kirjoittaa samat arvot samoihin hilaruutuihin.
   */
  const VAHIN = 4 / 240;
  const rajat = (a, b) => {
    const reunat = [a];
    for (let v = Math.floor(a / 15) * 15 + 15; v < b; v += 15) reunat.push(v);
    reunat.push(b);
    const ulos = [];
    for (let i = 0; i < reunat.length - 1; i++) {
      let p0 = reunat[i]; let p1 = reunat[i + 1];
      if (p1 - p0 < VAHIN) {
        // Ohut pala rajautuu aina 15°:n rajaan; levennetään siitä poispäin.
        if (Math.abs(p1 / 15 - Math.round(p1 / 15)) < 1e-9) p0 = p1 - VAHIN;
        else p1 = p0 + VAHIN;
      }
      ulos.push([p0, p1]);
    }
    return ulos;
  };
  const lonR = rajat(lon0, lon1);
  const latR = rajat(lat0, lat1);

  const palat = [];
  for (const [la0, la1] of latR) {
    for (const [lo0, lo1] of lonR) {
      // eslint-disable-next-line no-await-in-loop
      const pala = await haePala({
        lon0: lo0, lat0: la0, lon1: lo1, lat1: la1,
      });
      /*
       * Varmistus: NCSS on palauttanut joskus koko tiedoston leveyden
       * pyydetyn ikkunan sijaan. Se ei saa jäädä huomaamatta — muuten
       * virhe näkyy vain muistinkulutuksena eikä koskaan kuvassa.
       */
      const odotettu = Math.ceil((lo1 - lo0) * 240) + 4;
      if (pala.leveys > odotettu) {
        throw new Error(`NCSS palautti ${pala.leveys} saraketta, odotettiin `
          + `korkeintaan ${odotettu} (ikkuna ${lo0}…${lo1})`);
      }
      /*
       * … eikä pelkkä leveys riitä. Mitattu 18.9.2026: kun ikkuna osuu
       * lähdelaatan reunaan, NCSS voi palauttaa OIKEAN LEVYISEN mutta
       * VÄÄRÄSSÄ PAIKASSA olevan palan (lon alkaa −180:stä). Ilman
       * tätä tarkistusta pala liimautuu hilassa maailman toiselle
       * puolelle, ja ainoa oire on 86 918 sarakkeen levyinen ruudukko.
       */
      if (pala.lon[0] < lo0 - 1 || pala.lon[pala.leveys - 1] > lo1 + 1
        || pala.lat[0] < la0 - 1 || pala.lat[pala.korkeus - 1] > la1 + 1) {
        throw new Error(`NCSS palautti palan väärästä paikasta: `
          + `lon ${pala.lon[0].toFixed(3)}…${pala.lon[pala.leveys - 1].toFixed(3)}, `
          + `pyydettiin ${lo0.toFixed(3)}…${lo1.toFixed(3)}`);
      }
      palat.push(pala);
    }
  }

  let x0 = Infinity; let y0 = Infinity; let x1 = -Infinity; let y1 = -Infinity;
  for (const p of palat) {
    const px = hilaX(p.lon[0]); const py = hilaY(p.lat[0]);
    x0 = Math.min(x0, px); y0 = Math.min(y0, py);
    x1 = Math.max(x1, px + p.leveys - 1); y1 = Math.max(y1, py + p.korkeus - 1);
  }
  const leveys = x1 - x0 + 1;
  const korkeus = y1 - y0 + 1;
  const z = new Float32Array(leveys * korkeus);
  for (const p of palat) {
    const dx = hilaX(p.lon[0]) - x0;
    const dy = hilaY(p.lat[0]) - y0;
    for (let y = 0; y < p.korkeus; y++) {
      const lahde = y * p.leveys;
      const kohde = (dy + y) * leveys + dx;
      for (let x = 0; x < p.leveys; x++) z[kohde + x] = p.z[lahde + x];
    }
  }

  /*
   * SAUMASARAKE PAIKATAAN.
   *
   * Mitattu 18.9.2026 laatasta z7/89/35 (Itävalta, 15 °E): liimatussa
   * ruudukossa yksi ainoa sarake — 15 °E:n itäpuolinen ensimmäinen
   * solu — luki 145 m, kun sen naapurit lukivat 859 ja 869. Kuvassa se
   * oli tummanvihreä pystyviiva laatan halki, ja se olisi ollut siellä
   * JOKAISEN 15°:n meridiaanin kohdalla koko maailmassa.
   *
   * Syy on lähteessä: NOAA:n 15°-laatan oma pituusakseli on tallennettu
   * 360° siirrettynä (E015 on 375…390), ja tiedoston ensimmäinen sarake
   * palautuu tässä kääntymisessä vääränä. Sitä saraketta ei voi hakea
   * naapurilaatasta — naapurin aineisto loppuu meridiaaniin.
   *
   * Siksi rajasolu EI OLE LÄHDE vaan naapuriensa keskiarvo. Hinta on
   * yksi 15″:n sarake (n. 460 m) joka 15. asteella; virhe on korkeintaan
   * rinteen kaarevuus 460 metrin matkalla, eli näkymätön. Sama tehdään
   * leveyspiirin rajalla, jottei sama rakenne yllätä toisessa suunnassa.
   */
  const paikkaaSarake = (x) => {
    if (x < 1 || x > leveys - 2) return;
    for (let y = 0; y < korkeus; y++) {
      const o = y * leveys + x;
      z[o] = (z[o - 1] + z[o + 1]) / 2;
    }
  };
  const paikkaaRivi = (y) => {
    if (y < 1 || y > korkeus - 2) return;
    for (let x = 0; x < leveys; x++) {
      const o = y * leveys + x;
      z[o] = (z[o - leveys] + z[o + leveys]) / 2;
    }
  };
  for (let v = Math.ceil(lon0 / 15) * 15; v < lon1; v += 15) {
    paikkaaSarake(hilaX(v + 0.5 / 240) - x0);
  }
  for (let v = Math.ceil(lat0 / 15) * 15; v < lat1; v += 15) {
    paikkaaRivi(hilaY(v + 0.5 / 240) - y0);
  }

  return {
    z,
    leveys,
    korkeus,
    ruutu: RUUTU_15S,
    lat0: (y0 + 0.5) / 240 - 90,
    lon0: (x0 + 0.5) / 240 - 180,
  };
}

/* ------------------------------------------------------- väritys */

/**
 * Varjostaa ruudukon ja palauttaa RGB-hakufunktion.
 *
 * Väriasteikko, varjon kalvo, liioittelu ja aurinko ovat TÄSMÄLLEEN
 * samat kuin 1′:n reliefikuvalla. Tämä on koko yhteensopivuuden ehto:
 * 15″-laatta liukuu vanhan kuvan päälle, ja hitusenkin eri asteikko
 * näkyisi rajalla värihyppynä keskellä merta.
 */
export function varjostaJaVarita(ruudukko) {
  const { z, leveys, korkeus } = ruudukko;
  const { varjo } = varjosta(ruudukko, { liioittelu: LIIOITTELU, lat0: ruudukko.lat0 });
  const tasainen = tasainenVarjo();
  const rgb = new Uint8ClampedArray(leveys * korkeus * 3);
  for (let i = 0; i < z.length; i++) {
    const m = z[i];
    const l = ((m < -LUT_POHJA ? -LUT_POHJA : m > LUT_YLA ? LUT_YLA : Math.round(m))
      + LUT_POHJA) * 3;
    const k = varjo[i] / tasainen;
    let kerroin; let valo;
    if (k <= 1) { kerroin = 1 - (1 - k) * KALVO.tummennus; valo = 0; } else { kerroin = 1; valo = (k - 1) * KALVO.vaalennus; }
    const r = LUT[l] * kerroin;
    const v = LUT[l + 1] * kerroin;
    const s = LUT[l + 2] * kerroin;
    const o = i * 3;
    rgb[o] = Math.round(r + (255 - r) * valo);
    rgb[o + 1] = Math.round(v + (255 - v) * valo);
    rgb[o + 2] = Math.round(s + (255 - s) * valo);
  }
  return rgb;
}

/**
 * Näytteistää väritetyn ruudukon yhdeksi laataksi Millerin
 * projektiossa.
 *
 * X on Millerissä lineaarinen pituusasteessa ja Y ei ole — siksi rivin
 * leveysaste haetaan projektion käänteisfunktiolla ja sarakkeen
 * pituusaste kertolaskulla. Sama jako kuin laastarilla
 * (js/linssit/topografia-tarkennus.js piirraTasavaliseksi), vain
 * toisin päin.
 *
 * Näyte on BILINEAARINEN. z7:llä laatan pikseli on itä-länsi-suunnassa
 * täsmälleen yksi lähderuutu, joten suodatusta ei tarvita; pohjois-
 * etelä-suunnassa Miller venyttää ylöspäin, ja bilineaari pitää
 * rinteen sileänä sielläkin. Karkeat tasot tehdään alinäytteistämällä
 * tämän tason kuvasta, ei tästä uudestaan.
 */
export function laatanPikselit(rgb, ruudukko, bbox) {
  const { leveys, korkeus, ruutu, lat0, lon0 } = ruudukko;
  const kuva = new Uint8ClampedArray(bbox.pw * bbox.ph * 3);
  const gx = (lon) => (lon - lon0) / ruutu;
  const gy = (lat) => (lat - lat0) / ruutu;

  for (let py = 0; py < bbox.ph; py++) {
    const lat = lautaLat(bbox.y + ((py + 0.5) / bbox.ph) * bbox.h);
    let fy = gy(lat);
    if (fy < 0) fy = 0; else if (fy > korkeus - 1) fy = korkeus - 1;
    const y0 = Math.floor(fy); const y1 = Math.min(korkeus - 1, y0 + 1);
    const ty = fy - y0;
    for (let px = 0; px < bbox.pw; px++) {
      const lon = lautaLon(bbox.x + ((px + 0.5) / bbox.pw) * bbox.w);
      let fx = gx(lon);
      if (fx < 0) fx = 0; else if (fx > leveys - 1) fx = leveys - 1;
      const x0 = Math.floor(fx); const x1 = Math.min(leveys - 1, x0 + 1);
      const tx = fx - x0;
      const a = (y0 * leveys + x0) * 3; const b = (y0 * leveys + x1) * 3;
      const c = (y1 * leveys + x0) * 3; const d = (y1 * leveys + x1) * 3;
      const o = (py * bbox.pw + px) * 3;
      for (let k = 0; k < 3; k++) {
        const ylaR = rgb[a + k] * (1 - tx) + rgb[b + k] * tx;
        const alaR = rgb[c + k] * (1 - tx) + rgb[d + k] * tx;
        kuva[o + k] = Math.round(ylaR * (1 - ty) + alaR * ty);
      }
    }
  }
  return kuva;
}

/** Onko laatta pelkkää avomerta? Sellaista ei kannata polttaa. */
export function pelkkaaMerta(ruudukko, raja = -200) {
  const { z } = ruudukko;
  for (let i = 0; i < z.length; i++) if (z[i] > raja) return false;
  return true;
}

/*
 * Puuttuvan (avomeri-)lapsen väri alinäytteistyksessä.
 *
 * Avomerilaattaa ei polteta lainkaan, joten alemman tason laatta, jonka
 * naapurissa on merta, tarvitsee jotain sen tilalle. Väri on LUT:n arvo
 * −4000 metrissä eli valtamerten pohjan yleiskorkeus, varjostamattomana
 * — täsmälleen se sävy, jonka poltettu avomerilaatta olisi saanut.
 * Mannerjalustan vaaleampi kaistale ei katoa, koska rannikkolaatat
 * eivät ole avomerta: niissä on maata ja ne poltetaan.
 */
export const MERIVARI = [LUT[lutKohta(-4000)], LUT[lutKohta(-4000) + 1], LUT[lutKohta(-4000) + 2]];

/* ------------------------------------------------ alinäytteistys */

/**
 * Neljä pikseliä yhdeksi — täsmällinen laatikkosuodatin.
 *
 * Reliefi on KENTTÄ, ja kentän oikea pienennös on sen keskiarvo (sama
 * minkä 1′:n reliefikuvakin tekee). Keskiarvo lasketaan tässä itse
 * eikä jätetä sharpin resize-ytimen varaan: kahden suhteen pienennös
 * on niin yksinkertainen, ettei siinä ole mitään valittavaa, ja
 * lanczos teroittaisi rannikot tasolla eri tavalla kuin edellisellä.
 */
export function puolita(iso, leveys, korkeus, uLeveys, uKorkeus) {
  const ulos = new Uint8ClampedArray(uLeveys * uKorkeus * 3);
  for (let y = 0; y < uKorkeus; y++) {
    const y0 = y * 2; const y1 = Math.min(korkeus - 1, y0 + 1);
    for (let x = 0; x < uLeveys; x++) {
      const x0 = x * 2; const x1 = Math.min(leveys - 1, x0 + 1);
      const a = (y0 * leveys + x0) * 3; const b = (y0 * leveys + x1) * 3;
      const c = (y1 * leveys + x0) * 3; const d = (y1 * leveys + x1) * 3;
      const o = (y * uLeveys + x) * 3;
      for (let k = 0; k < 3; k++) {
        ulos[o + k] = Math.round((iso[a + k] + iso[b + k] + iso[c + k] + iso[d + k]) / 4);
      }
    }
  }
  return ulos;
}

/** Laattapolku pyramidissa. */
export const laatanPolku = (ulos, z, sarake, rivi) => join(ulos, `z${z}`, String(sarake), `${rivi}.webp`);
/** Laatan avain lokissa, manifestissa ja --pakota-laatat-lipussa. */
export const laatanAvain = (z, sarake, rivi) => `z${z}/${sarake}/${rivi}`;

/** Levyllä olevat laatat yhdellä tasolla joukkona "sarake/rivi". */
export function levynLaatat(ulos, z) {
  const joukko = new Set();
  const juuri = join(ulos, `z${z}`);
  if (!existsSync(juuri)) return joukko;
  for (const sarake of readdirSync(juuri)) {
    if (!/^\d+$/.test(sarake)) continue;
    for (const tiedosto of readdirSync(join(juuri, sarake))) {
      const m = /^(\d+)\.webp$/.exec(tiedosto);
      if (m) joukko.add(`${sarake}/${m[1]}`);
    }
  }
  return joukko;
}

/**
 * Yksi taso alinäytteistettynä seuraavaa syvemmästä. EI HAE MITÄÄN.
 *
 * Vanhemmaksi tulevat ne laatat, joilla on levyllä edes yksi lapsi;
 * puuttuvat lapset ovat avomerta ja saavat merivärin. Jos kaikki neljä
 * lasta ovat avomerta, vanhempikin on avomerta eikä sitä polteta —
 * se kirjataan manifestiin, jottei sitä yritetä uudestaan.
 *
 * Vajaa syvempi taso ei estä alinäytteistystä: mitä levyllä on, siitä
 * tehdään vanhemmat, ja puuttuvat lapset kirjataan yhteenvetoon.
 */
export async function alinaytteistaTaso(z, ulos, meriJoukko, kattoTavua) {
  const mitat = tasonMitat(z);
  const lapsiMitat = tasonMitat(z + 1);
  const lapsetLevylla = levynLaatat(ulos, z + 1);
  const lapsetMerta = meriJoukko.get(z + 1) ?? new Set();

  const vanhemmat = new Map();
  const merkitse = (avain, oliLevylla) => {
    const [s, r] = avain.split('/').map(Number);
    const k = `${Math.floor(s / 2)}/${Math.floor(r / 2)}`;
    const tieto = vanhemmat.get(k) ?? { lapsia: 0, levylla: 0 };
    tieto.lapsia++;
    if (oliLevylla) tieto.levylla++;
    vanhemmat.set(k, tieto);
  };
  for (const avain of lapsetLevylla) merkitse(avain, true);
  for (const avain of lapsetMerta) if (!lapsetLevylla.has(avain)) merkitse(avain, false);

  const { default: sharp } = await import('sharp');
  const tiedot = {
    z,
    leveys: mitat.leveys,
    korkeus: mitat.korkeus,
    sarakkeita: mitat.sarakkeita,
    riveja: mitat.riveja,
    poltettu: 0,
    meri: 0,
    tavua: 0,
    puuttuviaLapsia: 0,
    alinaytteistetty: true,
  };
  const meri = [];
  const virheet = [];
  const avaimet = [...vanhemmat.keys()].sort();

  for (const avain of avaimet) {
    const [sarake, rivi] = avain.split('/').map(Number);
    if (vanhemmat.get(avain).levylla === 0) {
      tiedot.meri++;
      meri.push(avain);
      continue;
    }
    const bbox = laatanBbox(mitat, sarake, rivi);
    const isoL = bbox.pw * 2; const isoK = bbox.ph * 2;
    const iso = new Uint8ClampedArray(isoL * isoK * 3);
    for (let i = 0; i < iso.length; i += 3) {
      iso[i] = MERIVARI[0]; iso[i + 1] = MERIVARI[1]; iso[i + 2] = MERIVARI[2];
    }
    let puuttui = 0;
    for (let dy = 0; dy < 2; dy++) {
      for (let dx = 0; dx < 2; dx++) {
        const ls = sarake * 2 + dx; const lr = rivi * 2 + dy;
        if (ls >= lapsiMitat.sarakkeita || lr >= lapsiMitat.riveja) continue;
        const polku = laatanPolku(ulos, z + 1, ls, lr);
        if (!existsSync(polku)) {
          if (!lapsetMerta.has(`${ls}/${lr}`)) puuttui++;
          continue;
        }
        try {
          /* eslint-disable no-await-in-loop */
          const { data, info } = await sharp(readFileSync(polku))
            .removeAlpha().raw().toBuffer({ resolveWithObject: true });
          /* eslint-enable no-await-in-loop */
          for (let y = 0; y < info.height; y++) {
            const ky = dy * LAATTA + y;
            if (ky >= isoK) break;
            const lahde = y * info.width * 3;
            const kohde = (ky * isoL + dx * LAATTA) * 3;
            const n = Math.min(info.width, isoL - dx * LAATTA) * 3;
            for (let i = 0; i < n; i++) iso[kohde + i] = data[lahde + i];
          }
        } catch (e) {
          virheet.push({ laatta: laatanAvain(z + 1, ls, lr), viesti: `lapsen luku: ${e?.message ?? e}` });
        }
      }
    }
    tiedot.puuttuviaLapsia += puuttui;

    const kuva = puolita(iso, isoL, isoK, bbox.pw, bbox.ph);
    const kohde = laatanPolku(ulos, z, sarake, rivi);
    // eslint-disable-next-line no-await-in-loop
    const { laatu, tavua } = await pakkaaWebp(kuva, bbox.pw, bbox.ph, kohde, kattoTavua);
    tiedot.poltettu++;
    tiedot.tavua += tavua;
    console.log(`  ${laatanAvain(z, sarake, rivi)}  ${bbox.pw} x ${bbox.ph} px, laatu ${laatu}, `
      + `${(tavua / 1024).toFixed(0)} kt  (alinäytteistetty${puuttui ? `, ${puuttui} lasta puuttui` : ''})`);
  }

  return { tiedot, meri, virheet };
}

/* ----------------------------------------------------------- pakkaus */

async function pakkaaWebp(kuva, leveys, korkeus, kohde, kattoTavua) {
  const { default: sharp } = await import('sharp');
  const laadut = [88, 82, 76, 70, 64, 58, 50, 42];
  let viimeinen = null;
  for (const laatu of laadut) {
    // eslint-disable-next-line no-await-in-loop
    const ulos = await sharp(Buffer.from(kuva.buffer, kuva.byteOffset, kuva.length), {
      raw: { width: leveys, height: korkeus, channels: 3 },
    }).webp({ quality: laatu, effort: 4 }).toBuffer();
    viimeinen = { laatu, buf: ulos };
    if (ulos.length <= kattoTavua) break;
  }
  mkdirSync(dirname(kohde), { recursive: true });
  writeFileSync(kohde, viimeinen.buf);
  return { laatu: viimeinen.laatu, tavua: viimeinen.buf.length };
}

/* -------------------------------------------------------- pääohjelma */

const argv = process.argv.slice(2);
const lippu = (nimi, oletus) => {
  const i = argv.indexOf(nimi);
  return i >= 0 ? argv[i + 1] : oletus;
};

/** Tason laattaruudukon se osa, joka osuu annettuun lon/lat-alueeseen. */
export function laatatAlueelle(mitat, alue) {
  const [lon0, lat0, lon1, lat1] = alue;
  const ulos = [];
  for (let rivi = 0; rivi < mitat.riveja; rivi++) {
    for (let sarake = 0; sarake < mitat.sarakkeita; sarake++) {
      const b = laatanBbox(mitat, sarake, rivi);
      const yla = lautaLat(b.y);
      const ala = lautaLat(b.y + b.h);
      const lansi = lautaLon(b.x);
      const ita = lautaLon(b.x + b.w);
      if (ita <= lon0 || lansi >= lon1 || yla <= lat0 || ala >= lat1) continue;
      ulos.push({ sarake, rivi, bbox: b });
    }
  }
  return ulos;
}

/**
 * Työjono: sama lista, N tekijää, ei odottavia aukkoja.
 *
 * Rinnakkaisuus on tässä PIENI (oletus 3) tarkoituksella. Aika on
 * lähes kokonaan NOAA:n vasteaikaa, joten kolme tekijää kolminkertaistaa
 * läpimenon — mutta kymmenen ei kymmenkertaista sitä, vaan alkaa
 * näyttää palvelimen päässä ryöstöltä ja tuottaa juuri niitä
 * aikakatkoja, joilta tässä yritetään välttyä.
 */
export async function tyojono(lista, rinnakkain, tyo) {
  let seuraava = 0;
  const tekijat = [];
  for (let i = 0; i < Math.max(1, rinnakkain); i++) {
    tekijat.push((async () => {
      for (;;) {
        const k = seuraava;
        seuraava += 1;
        if (k >= lista.length) return;
        // eslint-disable-next-line no-await-in-loop
        await tyo(lista[k], k);
      }
    })());
  }
  await Promise.all(tekijat);
}

/** Aiempi manifesti, jos sellainen on. */
function lueLuettelo(ulos) {
  const polku = join(ulos, 'reliefipyramidi.json');
  if (!existsSync(polku)) return null;
  try {
    return JSON.parse(readFileSync(polku, 'utf8'));
  } catch (e) {
    console.log(`  (vanhaa luetteloa ei voitu lukea: ${e.message} — aloitetaan tyhjästä)`);
    return null;
  }
}

/**
 * Manifestiin kirjatut avomerilaatat tasoittain.
 *
 * TÄMÄ ON JATKON TOINEN PUOLIKAS. Levyllä oleva webp kertoo, mikä on
 * jo poltettu — mutta avomerilaatasta ei synny tiedostoa, ja ilman
 * muistiinpanoa jatkoajo hakisi jokaisen valtameren laatan uudestaan
 * NOAA:lta vain todetakseen sen taas mereksi. Koko maailmassa niitä
 * on yksitoista tuhatta, eli useampi tunti pelkkää turhaa hakua.
 */
function meriJoukot(luettelo) {
  const kartta = new Map();
  for (const taso of luettelo?.tasot ?? []) {
    kartta.set(taso.z, new Set(taso.meriLaatat ?? []));
  }
  return kartta;
}

/** Levyn totuus: paljonko yhdellä tasolla on laattoja ja tavuja. */
function tasonTotuus(ulos, z) {
  let laattoja = 0; let tavua = 0;
  const juuri = join(ulos, `z${z}`);
  if (!existsSync(juuri)) return { laattoja, tavua };
  for (const sarake of readdirSync(juuri)) {
    if (!/^\d+$/.test(sarake)) continue;
    for (const tiedosto of readdirSync(join(juuri, sarake))) {
      if (!/^\d+\.webp$/.test(tiedosto)) continue;
      laattoja += 1;
      tavua += statSync(join(juuri, sarake, tiedosto)).size;
    }
  }
  return { laattoja, tavua };
}

async function main() {
  const kuiva = argv.includes('--kuiva');
  const jatka = argv.includes('--jatka');
  const kattoKt = Number(lippu('--katto-kt', 120));
  const rinnakkain = Math.max(1, Number(lippu('--rinnakkain', 3)));
  const ulos = lippu('--ulos', join(VALIMUISTI, 'pyramidi'));
  const alue = String(lippu('--alue', '5,40,15,48')).split(',').map(Number);
  if (alue.length !== 4 || alue.some(Number.isNaN)) throw new Error('--alue lon0,lat0,lon1,lat1');
  const tasoVali = String(lippu('--tasot', '7')).split('-').map(Number);
  const tasot = [];
  for (let z = tasoVali[0]; z <= (tasoVali[1] ?? tasoVali[0]); z++) tasot.push(z);
  const pakotetut = new Set(
    String(lippu('--pakota-laatat', '')).split(',').map((s) => s.trim()).filter(Boolean),
  );

  mkdirSync(VALIMUISTI, { recursive: true });

  console.log(`lähde: ${LAHDE.nimi}`);
  console.log(`       ${LAHDE.lisenssi}, doi:${LAHDE.doi}, ${LAHDE.palvelu}`);
  console.log(`arkki: x ${ARKKI.x} y ${ARKKI.y.toFixed(2)} `
    + `w ${ARKKI.w} h ${ARKKI.h.toFixed(2)} (sama kuin pääkartan pyramidilla)`);
  console.log(`ajo:   tasot ${tasot.join(',')}, rinnakkain ${rinnakkain}`
    + `${jatka ? ', JATKO (valmiit ohitetaan)' : ''}`
    + `${pakotetut.size ? `, pakotettuja laattoja ${pakotetut.size}` : ''}`);

  const vanha = lueLuettelo(ulos);
  const meri = meriJoukot(vanha);
  for (const avain of pakotetut) {
    const [zs, sarake, rivi] = avain.split('/');
    const z = Number(String(zs).replace('z', ''));
    meri.get(z)?.delete(`${sarake}/${rivi}`);
  }

  const luettelo = {
    tunnus: 'reliefipyramidi',
    lahde: LAHDE,
    arkki: { x: ARKKI.x, y: ARKKI.y, w: ARKKI.w, h: ARKKI.h },
    laatta: LAATTA,
    ruutu: RUUTU_15S,
    liioittelu: LIIOITTELU,
    aurinko: AURINKO,
    tasot: [],
  };
  /* Tasot, joihin tämä ajo ei koskenut, säilyvät manifestissa. */
  const tasotKartta = new Map();
  for (const taso of vanha?.tasot ?? []) tasotKartta.set(taso.z, taso);

  const virheet = [];

  /*
   * JÄRJESTYS ON PAKOTETTU. Syvin taso (z7) tulee lähdeaineistosta ja
   * kaikki sitä karkeammat SIITÄ — joten z7 on ajettava ensin ja loput
   * ylhäältä alas (z6, z5, …), muuten alinäytteistys etsisi lapsia,
   * joita ei vielä ole. Käyttäjän antama --tasot 0-7 tarkoittaa siis
   * ajojärjestystä 7, 6, 5, …, 0 riippumatta siitä, missä järjestyksessä
   * numerot kirjoitettiin.
   */
  const haettavat = tasot.filter((z) => z >= SYVIN_VIITE).sort((a, b) => a - b);
  const johdetut = tasot.filter((z) => z < SYVIN_VIITE).sort((a, b) => b - a);

  for (const z of haettavat) {
    const mitat = tasonMitat(z);
    const kaikki = laatatAlueelle(mitat, alue);
    const levylla = jatka ? levynLaatat(ulos, z) : new Set();
    const tasonMeri = meri.get(z) ?? new Set();
    const lista = kaikki.filter(({ sarake, rivi }) => {
      const avain = `${sarake}/${rivi}`;
      if (pakotetut.has(laatanAvain(z, sarake, rivi))) return true;
      if (!jatka) return true;
      return !levylla.has(avain) && !tasonMeri.has(avain);
    });
    const ohitettu = kaikki.length - lista.length;
    console.log(`\nz${z}  ${mitat.leveys} x ${mitat.korkeus} px  `
      + `${(mitat.leveys / 360).toFixed(1)} px/aste  `
      + `${mitat.sarakkeita} x ${mitat.riveja} = ${mitat.sarakkeita * mitat.riveja} laattaa `
      + `koko maailmassa, ${kaikki.length} alueella`
      + `${ohitettu ? `, ${ohitettu} valmiina — ${lista.length} ajetaan` : ''}`);

    const tasonTiedot = {
      z,
      leveys: mitat.leveys,
      korkeus: mitat.korkeus,
      sarakkeita: mitat.sarakkeita,
      riveja: mitat.riveja,
      poltettu: 0,
      meri: 0,
      tavua: 0,
      ohitettu,
      virheita: 0,
    };
    const alkoi = Date.now();
    let valmiita = 0;

    await tyojono(lista, rinnakkain, async ({ sarake, rivi, bbox }) => {
      const avain = laatanAvain(z, sarake, rivi);
      valmiita += 1;
      const numero = `[${valmiita}/${lista.length}]`;
      try {
        const t0 = Date.now();
        const r = REUNUS * RUUTU_15S;
        const ruudukko = await haeIkkuna({
          lon0: lautaLon(bbox.x) - r,
          lat0: lautaLat(bbox.y + bbox.h) - r,
          lon1: lautaLon(bbox.x + bbox.w) + r,
          lat1: lautaLat(bbox.y) + r,
        });
        const tHaku = Date.now() - t0;

        if (pelkkaaMerta(ruudukko)) {
          tasonTiedot.meri += 1;
          tasonMeri.add(`${sarake}/${rivi}`);
          console.log(`  ${numero} ${avain}  avomeri — ohitettu (haku ${tHaku} ms)`);
          return;
        }

        const t1 = Date.now();
        const rgb = varjostaJaVarita(ruudukko);
        const kuva = laatanPikselit(rgb, ruudukko, bbox);
        const tVari = Date.now() - t1;

        if (kuiva) {
          console.log(`  ${numero} ${avain}  ${bbox.pw} x ${bbox.ph} px (kuiva)`);
          return;
        }
        const t2 = Date.now();
        const kohde = laatanPolku(ulos, z, sarake, rivi);
        const { laatu, tavua } = await pakkaaWebp(kuva, bbox.pw, bbox.ph, kohde, kattoKt * 1024);
        tasonTiedot.poltettu += 1;
        tasonTiedot.tavua += tavua;
        tasonMeri.delete(`${sarake}/${rivi}`);
        console.log(`  ${numero} ${avain}  ${bbox.pw} x ${bbox.ph} px, laatu ${laatu}, `
          + `${(tavua / 1024).toFixed(0)} kt  (ruudukko ${ruudukko.leveys}x${ruudukko.korkeus}, `
          + `haku ${tHaku} ms, väri ${tVari} ms, pakkaus ${Date.now() - t2} ms)`);
      } catch (e) {
        /*
         * YKSI LAATTA EI KAADA AJOA. Koko maailman ajo on tuhansia
         * hakuja; jos yksikin niistä saa kaataa kaiken, ajo ei
         * koskaan pääse loppuun. Virhe kirjataan, ajo jatkuu, ja
         * lopun yhteenveto kertoo mitä jäi — sama --jatka hakee ne
         * seuraavalla kierroksella.
         */
        tasonTiedot.virheita += 1;
        virheet.push({ laatta: avain, viesti: e?.message ?? String(e) });
        console.log(`  ${numero} ${avain}  VIRHE: ${e?.message ?? e} — jatketaan`);
      }
    });

    tasonTiedot.sekuntia = (Date.now() - alkoi) / 1000;
    tasonTiedot.meriLaatat = [...tasonMeri].sort();
    tasonTiedot.meri = tasonTiedot.meriLaatat.length;
    if (!kuiva) {
      const totuus = tasonTotuus(ulos, z);
      tasonTiedot.laattojaLevylla = totuus.laattoja;
      tasonTiedot.tavuaLevylla = totuus.tavua;
    }
    tasotKartta.set(z, tasonTiedot);
    if (tasonTiedot.poltettu) {
      console.log(`  z${z} tässä ajossa: ${tasonTiedot.poltettu} laattaa, `
        + `${(tasonTiedot.tavua / 1024 / 1024).toFixed(2)} Mt, `
        + `${(tasonTiedot.tavua / tasonTiedot.poltettu / 1024).toFixed(0)} kt/laatta, `
        + `${(tasonTiedot.sekuntia / tasonTiedot.poltettu).toFixed(2)} s/laatta `
        + `(${rinnakkain} rinnakkain)`);
    }
  }

  for (const z of johdetut) {
    if (kuiva) {
      console.log(`\nz${z}  alinäytteistys ohitettu (--kuiva)`);
      continue;
    }
    console.log(`\nz${z}  alinäytteistys z${z + 1}:stä (ei hakuja)`);
    const alkoi = Date.now();
    const tulos = await alinaytteistaTaso(z, ulos, meri, kattoKt * 1024);
    tulos.tiedot.sekuntia = (Date.now() - alkoi) / 1000;
    tulos.tiedot.meriLaatat = tulos.meri.sort();
    meri.set(z, new Set(tulos.meri));
    const totuus = tasonTotuus(ulos, z);
    tulos.tiedot.laattojaLevylla = totuus.laattoja;
    tulos.tiedot.tavuaLevylla = totuus.tavua;
    tasotKartta.set(z, tulos.tiedot);
    virheet.push(...tulos.virheet);
    console.log(`  z${z} yhteensä: ${tulos.tiedot.poltettu} laattaa, `
      + `${(tulos.tiedot.tavua / 1024 / 1024).toFixed(2)} Mt, `
      + `${tulos.tiedot.meri} avomerta`
      + `${tulos.tiedot.puuttuviaLapsia
        ? `, ${tulos.tiedot.puuttuviaLapsia} lasta puuttui (vajaa z${z + 1})` : ''}`
      + `, ${tulos.tiedot.sekuntia.toFixed(1)} s`);
  }

  if (!kuiva) {
    luettelo.tasot = [...tasotKartta.values()].sort((a, b) => a.z - b.z);
    mkdirSync(ulos, { recursive: true });
    const polku = join(ulos, 'reliefipyramidi.json');
    writeFileSync(polku, `${JSON.stringify(luettelo, null, 2)}\n`, 'utf8');
    console.log(`\nluettelo: ${polku}`);
    for (const taso of luettelo.tasot) {
      console.log(`  z${taso.z}: ${taso.laattojaLevylla ?? 0} laattaa levyllä, `
        + `${((taso.tavuaLevylla ?? 0) / 1024 / 1024).toFixed(1)} Mt, `
        + `${taso.meri ?? 0} avomerta kirjattu`);
    }
  }

  if (virheet.length) {
    console.log(`\nVIRHEITÄ ${virheet.length} — nämä laatat jäivät tekemättä:`);
    for (const v of virheet.slice(0, 40)) console.log(`  ${v.laatta}: ${v.viesti}`);
    if (virheet.length > 40) console.log(`  … ja ${virheet.length - 40} muuta`);
    console.log('Aja sama komento uudestaan --jatka: valmiit ohitetaan, '
      + 'vain nämä haetaan.');
    process.exitCode = 2;
  } else {
    console.log('\nEi virheitä.');
  }
}

if (AJETAAN_SUORAAN) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
