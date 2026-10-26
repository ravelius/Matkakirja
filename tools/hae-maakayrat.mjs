/*
 * Hakee maiden aikasarjat "Maa numeroina" -sivulle.
 *
 *   node tools/hae-maakayrat.mjs [--kuiva] [--peili] [--maat=ITA,EGY,…]
 *
 * Kirjoittaa assets/data/maakayrat.json (docs/valtion-analyysi.md):
 * väkiluku 1950 → nyt → 2050-ennuste, väestöpyramidi, BKT/asukas
 * (ostovoimakorjattu), elinajanodote, kaupungistumisaste ja
 * CO₂/asukas. Demokratiaindeksi on jo pelissä (maatiedot-paketit),
 * joten sitä ei haeta tässä.
 *
 * Tiedosto on ERI asia kuin js/packs/linssi-maaluvut.js: linssi saa
 * poikkileikkauksen (tuorein luku), tämä koko aikasarjat. Siksi myös
 * työkalu on eri tiedosto kuin tools/hae-maaluvut.mjs, vaikka
 * Maailmanpankin hakulogiikka on kopioitu sieltä.
 *
 * --- kaksi reittiä samaan dataan ---
 *
 * Maailmanpankin sarjat haetaan ensisijaisesti suoraan API:sta kuten
 * hae-maaluvut.mjs tekee. Jos API ei vastaa — esimerkiksi
 * kehityskontissa, jonka ulosliikenne sallii vain GitHubin — työkalu
 * siirtyy ääneen GitHub-peiliin: open-numbers/ddf--world_bank--
 * world_development_indicators on Maailmanpankin API:sta koneellisesti
 * päivitetty kopio samoista sarjoista. --peili pakottaa peilireitin.
 * Käytetty reitti kirjataan tiedoston metaan, jotta datan alkuperä on
 * aina luettavissa.
 *
 * Väestösarjat tulevat aina UN World Population Prospects 2024:stä
 * PPgp/wpp2024-jakelun kautta (GitHub). Se on UN:n väestöennuste-
 * ryhmän oma koneluettava julkaisu samasta aineistosta — suunnitelma
 * sallii peilatut WPP-sarjat, kunhan lähderivillä lukee UN WPP.
 * population.un.org:n CSV-osoitteet ja sarakkeet ovat vaihtuneet
 * julkaisusta toiseen, joten niiden varaan ei rakenneta.
 *
 * --- CO₂-sarjan tunnus on vaihtunut ennenkin ---
 *
 * Maailmanpankki poisti vanhan EN.ATM.CO2E.PC-sarjan ja korvasi sen
 * tunnuksella EN.GHG.CO2.PC.CE.AR5. Jos sama toistuu, hiljainen tyhjä
 * käyrä olisi pahin lopputulos — siksi jokainen mittari tarkistetaan
 * ja työkalu KAATUU, jos sarja ei palauta dataa (ks. vartija alla).
 *
 * Aukot jätetään aukoiksi (käyrä katkeaa) — ei interpolointia.
 */
import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Noden fetch ei lue HTTPS_PROXYa; ks. tools/hae-radiot.mjs.
if (!process.env.NODE_USE_ENV_PROXY && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const ajo = spawnSync(process.execPath, [fileURLToPath(import.meta.url), ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
  });
  process.exit(ajo.status ?? 1);
}

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const kuiva = process.argv.includes('--kuiva');
const pakotaPeili = process.argv.includes('--peili');
const maatArg = process.argv.find((a) => a.startsWith('--maat='))?.slice(7);
const nuku = (ms) => new Promise((r) => { setTimeout(r, ms); });
const OTSAKKEET = { 'user-agent': 'Matkakirja/1.0 (opetuspeli)' };

const WPP_JUURI = 'https://raw.githubusercontent.com/PPgp/wpp2024/main/data-raw';
const WDI_PEILI = 'https://raw.githubusercontent.com/open-numbers/'
  + 'ddf--world_bank--world_development_indicators/master';

// Ennuste piirretään 2050 asti, vaikka WPP jatkuu 2100:aan — pidempi
// häntä veisi tilaa käyrältä jota sivu oikeasti kertoo (suunnitelma).
const ENNUSTE_LOPPU = 2050;
const HISTORIA_ALKU = 1950;

/*
 * "Silloin ja nyt": isoisän päiväkirja on vuodelta 1873 (docs/
 * tarina.md), mutta WPP alkaa 1950:stä. Merkintää varten haetaan
 * yksi luku maata kohti Gapminderin pitkästä väestösarjasta
 * (systema_globalis, GitHub) — lähin havainto päiväkirjan vuodelle.
 * Jos maalta ei ole 1800-luvun arviota, merkintä jää sivulta pois.
 */
const SILLOIN_VUOSI = 1873;
const SILLOIN_OSOITE = 'https://raw.githubusercontent.com/open-numbers/'
  + 'ddf--gapminder--systema_globalis/master/countries-etc-datapoints/'
  + 'ddf--datapoints--total_population_with_projections--by--geo--time.csv';

/*
 * Maailmanpankin mittarit. `tarkkuus` on desimaalien määrä
 * pyöristyksessä; väkiluku ja pyramidi tulevat WPP:stä eivätkä ole
 * tässä listassa.
 */
const MITTARIT = [
  {
    avain: 'bkt',
    nimi: 'BKT asukasta kohti',
    yksikko: 'dollaria (ostovoimakorjattu)',
    lahde: 'Maailmanpankki NY.GDP.PCAP.PP.KD',
    koodi: 'NY.GDP.PCAP.PP.KD',
    tarkkuus: 0,
  },
  {
    avain: 'elinika',
    nimi: 'Elinajanodote',
    yksikko: 'vuotta',
    lahde: 'Maailmanpankki SP.DYN.LE00.IN',
    koodi: 'SP.DYN.LE00.IN',
    tarkkuus: 1,
  },
  {
    avain: 'kaupungistuminen',
    nimi: 'Kaupungistumisaste',
    yksikko: '% väestöstä',
    lahde: 'Maailmanpankki SP.URB.TOTL.IN.ZS',
    koodi: 'SP.URB.TOTL.IN.ZS',
    tarkkuus: 1,
  },
  {
    avain: 'co2',
    nimi: 'Hiilidioksidipäästöt asukasta kohti',
    yksikko: 'tonnia vuodessa',
    lahde: 'Maailmanpankki EN.GHG.CO2.PC.CE.AR5',
    koodi: 'EN.GHG.CO2.PC.CE.AR5',
    tarkkuus: 2,
  },
];

/*
 * Tunnetut virhearvot, jotka pudotetaan aukoiksi.
 *
 * Maailmanpankin vuoden 2025 revisio toi elinajanodotteeseen
 * katastrofivuosien kuolleisuuden (Ruanda 1994 = 12,2; Kambodža
 * 1975–78 ≈ 11; Somalia 2011 = 32) — ne ovat TOSIA ja jäävät dataan.
 * Samassa revisiossa Keski-Afrikan tasavallan sarjaan ilmestyi
 * kuitenkin viisi hajavuotta (14,7–40,3), jotka eivät vastaa mitään
 * tunnettua tapahtumaa: vuosina 2009, 2019 ja 2022 maassa ei ollut
 * minkään mittaluokan katastrofia, ja naapurivuodet ovat 49–58.
 * Joulukuun 2024 julkaisussa samat vuodet olivat 48,6–55,0
 * (tarkistettu peilin git-historiasta, open-numbers 63e3e67).
 * Ilmeinen virhe ei kuulu lasten tietopeliin — vuodet jätetään
 * aukoiksi, ja käyrä katkeaa niiden kohdalla rehellisesti.
 */
const POISTOT = {
  elinika: { CAF: [2009, 2014, 2019, 2021, 2022] },
};

/*
 * Pyramidin ikäluokat: 5 vuoden portaat ja satavuotiaat yhtenä
 * luokkana. WPP antaa yksittäisvuodet 0–100, joista summataan.
 */
const PYRAMIDI_RYHMAT = [...Array.from({ length: 20 }, (_, i) => `${i * 5}–${i * 5 + 4}`), '100+'];

async function hae(osoite, yrityksia = 6) {
  for (let i = 0; i < yrityksia; i++) {
    try {
      const vastaus = await fetch(osoite, { headers: OTSAKKEET });
      if (vastaus.ok) return vastaus;
      if (vastaus.status !== 429) { console.log(`  HTTP ${vastaus.status} ${osoite}`); return null; }
    } catch (virhe) {
      console.log(`  yhteys katkesi (${virhe?.cause?.code ?? virhe?.name ?? '?'})`);
    }
    await nuku(3000 * (i + 1));
  }
  return null;
}

/*
 * UN:n numerokoodit (M49) → ISO-3. Kytkentä luetaan repon omasta
 * ne50.geojson-kartasta, jossa molemmat koodit ovat valmiina — ei
 * uutta verkkoriippuvuutta. Natural Earth merkitsee kiistanalaiset
 * koodit arvolla -99 (esim. Ranska), jolloin _EH-kenttä kertoo
 * yleisesti käytetyn koodin.
 */
function m49Kytkenta() {
  const geo = JSON.parse(readFileSync(join(JUURI, 'ne50.geojson'), 'utf8'));
  const ulos = new Map();
  for (const { properties: p } of geo.features) {
    const a3 = p.ISO_A3 !== '-99' ? p.ISO_A3 : p.ISO_A3_EH;
    const n3 = p.ISO_N3 !== '-99' ? p.ISO_N3 : p.ISO_N3_EH;
    if (!a3 || !n3 || a3 === '-99' || n3 === '-99') continue;
    ulos.set(String(Number(n3)), a3);
  }
  return ulos;
}

/** TSV-tiedosto WPP-jakelusta: [otsikkorivi, rivit]. */
async function haeWppTaulu(nimi) {
  const vastaus = await hae(`${WPP_JUURI}/${nimi}`);
  if (!vastaus) throw new Error(`UN WPP: ${nimi} jäi hakematta — väestösarjoja ei voi kirjoittaa`);
  const rivit = (await vastaus.text()).trim().split('\n').map((r) => r.split('\t'));
  return [rivit[0], rivit.slice(1)];
}

/*
 * Väestösarjat: vakiluku (historia + mediaaniennuste, asukkaita) ja
 * pyramidi (miehet/naiset ikäluokittain tuoreimmalta havaintovuodelta).
 * WPP:n luvut ovat tuhansia — kerrotaan asukkaiksi.
 */
async function haeVaesto(pyydetyt) {
  const m49 = m49Kytkenta();
  const [otsikkoM, miehet] = await haeWppTaulu('popM.txt');
  const [, naiset] = await haeWppTaulu('popF.txt');
  const [otsikkoP, ennuste] = await haeWppTaulu('popprojMed.txt');

  const vuodet = otsikkoM.slice(3).map(Number).filter((v) => v >= HISTORIA_ALKU);
  const viimeinen = Math.max(...vuodet);
  const ennusteVuodet = otsikkoP.slice(2).map(Number)
    .filter((v) => v > viimeinen && v <= ENNUSTE_LOPPU);

  // maa → ikä → [vuosisarja] molemmille sukupuolille
  const ulos = new Map();
  const keraa = (rivit, kentta) => {
    for (const rivi of rivit) {
      const iso = m49.get(rivi[0]);
      if (!iso || !pyydetyt.has(iso)) continue;
      const maa = ulos.get(iso) ?? { miehet: [], naiset: [], summa: new Map() };
      const ika = Number(rivi[2]);
      // Tyhjä solu EI ole nolla: Number('') olisi 0, siksi oma vahti.
      const sarja = otsikkoM.slice(3).map((v, i) => [Number(v), rivi[3 + i]]);
      for (const [vuosi, raaka] of sarja) {
        if (vuosi < HISTORIA_ALKU || raaka === '' || raaka === undefined) continue;
        const arvo = Number(raaka) * 1000;
        if (!Number.isFinite(arvo)) continue;
        maa.summa.set(vuosi, (maa.summa.get(vuosi) ?? 0) + arvo);
        if (vuosi === viimeinen) {
          const lokero = Math.min(Math.floor(ika / 5), PYRAMIDI_RYHMAT.length - 1);
          maa[kentta][lokero] = (maa[kentta][lokero] ?? 0) + arvo;
        }
      }
      ulos.set(iso, maa);
    }
  };
  keraa(miehet, 'miehet');
  keraa(naiset, 'naiset');

  for (const rivi of ennuste) {
    const maa = ulos.get(m49.get(rivi[0]));
    if (!maa) continue;
    for (const vuosi of ennusteVuodet) {
      const raaka = rivi[2 + otsikkoP.slice(2).map(Number).indexOf(vuosi)];
      if (raaka === '' || raaka === undefined) continue;
      const arvo = Number(raaka) * 1000;
      if (Number.isFinite(arvo)) maa.summa.set(vuosi, arvo);
    }
  }

  const tulos = new Map();
  for (const [iso, maa] of ulos) {
    const arvot = [];
    for (let v = HISTORIA_ALKU; v <= ENNUSTE_LOPPU; v++) {
      arvot.push(maa.summa.has(v) ? Math.round(maa.summa.get(v)) : null);
    }
    tulos.set(iso, {
      vakiluku: { alku: HISTORIA_ALKU, ennusteAlku: viimeinen + 1, arvot },
      pyramidi: {
        vuosi: viimeinen,
        miehet: PYRAMIDI_RYHMAT.map((_, i) => Math.round(maa.miehet[i] ?? 0)),
        naiset: PYRAMIDI_RYHMAT.map((_, i) => Math.round(maa.naiset[i] ?? 0)),
      },
    });
  }
  return tulos;
}

/** Väkiluku lähimmältä vuodelta 1873:n ympäriltä (±10 v) maittain. */
async function haeSilloin(pyydetyt) {
  const vastaus = await hae(SILLOIN_OSOITE);
  if (!vastaus) {
    console.log('  Gapminderin pitkä väestösarja ei vastaa — silloin-merkinnät jäävät pois');
    return new Map();
  }
  const ulos = new Map();
  for (const rivi of (await vastaus.text()).trim().split('\n').slice(1)) {
    const [geo, vuosiTeksti, arvoTeksti] = rivi.split(',');
    const iso = geo.toUpperCase();
    const vuosi = Number(vuosiTeksti);
    const arvo = Number(arvoTeksti);
    if (!pyydetyt.has(iso) || Math.abs(vuosi - SILLOIN_VUOSI) > 10) continue;
    if (!Number.isFinite(arvo) || arvo <= 0) continue;
    const vanha = ulos.get(iso);
    if (!vanha || Math.abs(vuosi - SILLOIN_VUOSI) < Math.abs(vanha.vuosi - SILLOIN_VUOSI)) {
      ulos.set(iso, { vuosi, arvo: Math.round(arvo) });
    }
  }
  return ulos;
}

/**
 * Yhden mittarin KOKO sarja joka maalle Maailmanpankin API:sta.
 * Sivutus kuten hae-maaluvut.mjs:ssä, mutta kaikki vuodet talteen.
 * Palauttaa null jos rajapinta ei vastaa — kutsuja siirtyy peiliin.
 */
async function haeMittariSuoraan(koodi) {
  const ulos = new Map();
  let sivu = 1;
  let sivuja = 1;
  do {
    const osoite = `https://api.worldbank.org/v2/country/all/indicator/${koodi}`
      + `?format=json&per_page=5000&page=${sivu}`;
    const vastaus = await hae(osoite, 2);
    if (!vastaus) return null;
    const [meta, rivit] = await vastaus.json();
    sivuja = meta?.pages ?? 1;
    for (const rivi of rivit ?? []) {
      if (rivi.value === null || rivi.value === undefined) continue;
      const maa = rivi.countryiso3code;
      const vuosi = Number(rivi.date);
      if (!maa || !Number.isFinite(vuosi)) continue;
      (ulos.get(maa) ?? ulos.set(maa, new Map()).get(maa)).set(vuosi, Number(rivi.value));
    }
    sivu += 1;
    await nuku(300);
  } while (sivu <= sivuja);
  return ulos;
}

/** Sama sarja GitHub-peilistä (economy on ISO-3 pienin kirjaimin). */
async function haeMittariPeilista(koodi) {
  const nimi = koodi.toLowerCase().replaceAll('.', '_');
  const vastaus = await hae(`${WDI_PEILI}/datapoints/ddf--datapoints--${nimi}--by--economy--year.csv`);
  if (!vastaus) return null;
  const ulos = new Map();
  for (const rivi of (await vastaus.text()).trim().split('\n').slice(1)) {
    const [economy, vuosiTeksti, arvoTeksti] = rivi.split(',');
    const maa = economy.toUpperCase();
    const vuosi = Number(vuosiTeksti);
    const arvo = Number(arvoTeksti);
    if (!Number.isFinite(vuosi) || !Number.isFinite(arvo)) continue;
    (ulos.get(maa) ?? ulos.set(maa, new Map()).get(maa)).set(vuosi, arvo);
  }
  return ulos;
}

/** Vuosikartta → { alku, arvot } ilman reunojen tyhjiä; aukot null. */
function sarjaksi(kartta, tarkkuus) {
  const vuodet = [...kartta.keys()].filter((v) => v >= HISTORIA_ALKU);
  if (!vuodet.length) return null;
  const alku = Math.min(...vuodet);
  const loppu = Math.max(...vuodet);
  const arvot = [];
  for (let v = alku; v <= loppu; v++) {
    arvot.push(kartta.has(v) ? Number(kartta.get(v).toFixed(tarkkuus)) : null);
  }
  return { alku, arvot };
}

// ---------------------------------------------------------------- ajo

const pyydetyt = new Set(maatArg ? maatArg.split(',').map((m) => m.trim().toUpperCase()) : []);
// Suomi on jokaisen käyrän vertailuviiva, joten se kulkee aina mukana.
if (pyydetyt.size) pyydetyt.add('FIN');

if (!pyydetyt.size) {
  // Ilman --maat-lippua haetaan kaikki maat, joille ISO-3 löytyy.
  for (const iso of m49Kytkenta().values()) pyydetyt.add(iso);
}
console.log(`haetaan ${pyydetyt.size} maata\n`);

console.log('UN WPP 2024: väkiluku ja pyramidit…');
const vaesto = await haeVaesto(pyydetyt);
console.log(`  ${vaesto.size}/${pyydetyt.size} maalle väestösarjat\n`);

/*
 * VARTIJA: jokaiselta pyydetyltä maalta on löydyttävä väestösarja —
 * paitsi ilman --maat-lippua, jolloin lista tulee kartasta ja siinä
 * on alueita joita WPP ei tunne (esim. Länsi-Sahara ennusteineen
 * puuttuu). Silloin riittää että valtaosa löytyy.
 */
const vaestotta = [...pyydetyt].filter((m) => !vaesto.has(m));
if (maatArg && vaestotta.length) {
  throw new Error(`UN WPP ei tunne maita: ${vaestotta.join(' ')} — kirjoitusvirhe --maat-lipussa?`);
}
if (vaestotta.length > pyydetyt.size * 0.15) {
  throw new Error(`väestösarja puuttuu ${vaestotta.length} maalta (${vaestotta.slice(0, 10).join(' ')}…) `
    + '— onko WPP-jakelun muoto vaihtunut?');
}

console.log('Gapminder: väkiluku isoisän aikaan…');
const silloin = await haeSilloin(pyydetyt);
console.log(`  ${silloin.size}/${pyydetyt.size} maalle 1800-luvun arvio\n`);

let reitti = pakotaPeili ? 'peili' : 'suora';
const maat = {};
for (const [iso, tiedot] of vaesto) {
  maat[iso] = { ...tiedot };
  if (silloin.has(iso)) maat[iso].silloin = silloin.get(iso);
}

for (const mittari of MITTARIT) {
  process.stdout.write(`${mittari.avain.padEnd(17)}`);
  let tiedot = reitti === 'suora' ? await haeMittariSuoraan(mittari.koodi) : null;
  if (!tiedot) {
    if (reitti === 'suora') console.log('\n  Maailmanpankin API ei vastaa — siirrytään GitHub-peiliin');
    reitti = 'peili';
    tiedot = await haeMittariPeilista(mittari.koodi);
  }
  /*
   * VARTIJA: sarjan on palautettava dataa. CO₂:n tunnus on vaihtunut
   * Maailmanpankissa ennenkin (EN.ATM.CO2E.PC → EN.GHG.CO2.PC.CE.AR5),
   * ja hiljaa tyhjäksi jäävä käyrä olisi pahempi kuin kaatuminen.
   */
  if (!tiedot || !tiedot.size) {
    throw new Error(`${mittari.koodi} ei palauta dataa kummastakaan lähteestä — onko sarjan `
      + 'tunnus vaihtunut Maailmanpankissa? Niin kävi CO₂:lle ennenkin '
      + '(EN.ATM.CO2E.PC → EN.GHG.CO2.PC.CE.AR5). Etsi seuraaja ja päivitä MITTARIT.');
  }
  let osumia = 0;
  for (const [iso, kartta] of tiedot) {
    if (!maat[iso]) continue;
    for (const vuosi of POISTOT[mittari.avain]?.[iso] ?? []) {
      if (kartta.delete(vuosi)) console.log(`  pudotettu tunnettu virhearvo: ${iso} ${vuosi}`);
    }
    const sarja = sarjaksi(kartta, mittari.tarkkuus);
    if (!sarja) continue;
    maat[iso][mittari.avain] = sarja;
    osumia += 1;
  }
  console.log(`${String(tiedot.size).padStart(4)} maata lähteessä — pyydetyistä ${osumia}/${Object.keys(maat).length}`);
  // Vartija on koko maailman ajoa varten: --maat-osajoukossa (esim. minivaltiot
  // 10.10.2026, joilta Maailmanpankin CO₂ puuttuu) vajaa sarja on odotettu, ja
  // sarjaksi() jättää puuttuvan mittarin pois maalta.
  if (!maatArg && osumia < Object.keys(maat).length / 2) {
    throw new Error(`${mittari.koodi} osui alle puoleen maista (${osumia}) — sarja on `
      + 'todennäköisesti tyhjentynyt tai tunnus vaihtunut. Ei kirjoiteta vajaata tiedostoa.');
  }
}

/*
 * Pistokokeet suuruusluokista (tarkistuslähteenä Our World in Data,
 * ks. docs/valtion-analyysi.md): jos jokin näistä pettää, luvuissa on
 * yksikkövirhe — tuhannet asukkaiksi tai prosentit osuuksiksi.
 */
const fin = maat.FIN;
const finNyt = fin.vakiluku.arvot[fin.vakiluku.ennusteAlku - 1 - fin.vakiluku.alku];
if (!(finNyt > 5_000_000 && finNyt < 6_500_000)) {
  throw new Error(`pistokoe: Suomen väkiluku ${finNyt} ei ole 5–6,5 miljoonaa — yksikkövirhe?`);
}
const finElinika = fin.elinika?.arvot.findLast((a) => a !== null);
if (!(finElinika > 75 && finElinika < 95)) {
  throw new Error(`pistokoe: Suomen elinajanodote ${finElinika} ei ole 75–95 vuotta`);
}
const finCo2 = fin.co2?.arvot.findLast((a) => a !== null);
if (!(finCo2 > 1 && finCo2 < 20)) {
  throw new Error(`pistokoe: Suomen CO₂/asukas ${finCo2} ei ole 1–20 tonnia`);
}

/*
 * Etelä-Sudan kahdella koodilla, sama silta kuin hae-maaluvut.mjs:ssä:
 * ISO antaa SSD:n, mutta pelin kartta on piirretty Natural Earthin
 * aineistosta, jossa koodi on SDS. Ilman kopiota Etelä-Sudan jäisi
 * pelissä ainoana maana ilman tilastosivua.
 */
for (const [iso, kaksois] of Object.entries({ SSD: 'SDS' })) {
  if (maat[iso] && !maat[kaksois]) maat[kaksois] = maat[iso];
}

const paiva = new Date().toISOString().slice(0, 10);
const kuukausi = `${Number(paiva.slice(5, 7))}/${paiva.slice(0, 4)}`;
const meta = {
  haettu: paiva,
  reitti,
  lahderivi: `Maailmanpankki ja UN WPP, haettu ${kuukausi}`,
  lahteet: {
    vakiluku: 'UN World Population Prospects 2024 (mediaaniennuste 2050 asti)',
    pyramidi: 'UN World Population Prospects 2024',
    silloin: `Gapminder (väkiluvun arvio isoisän aikaan, ~${SILLOIN_VUOSI})`,
    ...Object.fromEntries(MITTARIT.map((m) => [m.avain, m.lahde])),
  },
  pyramidiRyhmat: PYRAMIDI_RYHMAT,
};
const mittarit = {
  vakiluku: { nimi: 'Väkiluku', yksikko: 'asukasta' },
  ...Object.fromEntries(MITTARIT.map(({ avain, nimi, yksikko }) => [avain, { nimi, yksikko }])),
};

/*
 * --maat LISÄÄ, EI KORVAA (10.10.2026: minivaltioiden ajo kirjoitti koko
 * tiedoston uudelleen viidellä maalla). Osajoukossa vanhat maat, meta ja
 * mittarit säilyvät tavulleen; vain pyydettyjen maiden rivit vaihtuvat.
 */
if (maatArg) {
  const vanha = JSON.parse(readFileSync(join(JUURI, 'assets/data/maakayrat.json'), 'utf8'));
  for (const [iso, rivi] of Object.entries(vanha.maat)) if (!maat[iso]) maat[iso] = rivi;
  Object.keys(meta).forEach((k) => delete meta[k]); Object.assign(meta, vanha.meta);
  Object.keys(mittarit).forEach((k) => delete mittarit[k]); Object.assign(mittarit, vanha.mittarit);
}
// Yksi maa per rivi, jotta git-erot pysyvät luettavina.
const maarivit = Object.keys(maat).sort()
  .map((iso) => `    ${JSON.stringify(iso)}: ${JSON.stringify(maat[iso])}`)
  .join(',\n');
const teksti = `{
  "meta": ${JSON.stringify(meta, null, 4).replaceAll('\n', '\n  ')},
  "mittarit": ${JSON.stringify(mittarit, null, 4).replaceAll('\n', '\n  ')},
  "maat": {
${maarivit}
  }
}
`;

console.log(`\n${Object.keys(maat).length} maata, reitti: ${reitti}`);
if (kuiva) { console.log('kuiva ajo — ei kirjoiteta'); process.exit(0); }

mkdirSync(join(JUURI, 'assets/data'), { recursive: true });
const ulos = join(JUURI, 'assets/data/maakayrat.json');
writeFileSync(ulos, teksti);
console.log(`kirjoitettu ${ulos} (${Math.round(teksti.length / 1024)} kt)`);
