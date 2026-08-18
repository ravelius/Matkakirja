/*
 * Peilaa kaiken repon ulkopuolelta ladattavan aineiston yhteen paikkaan.
 *
 *   node tools/peilaa-media.mjs [--ulos <kansio>] [--vain kuvat|liput|aanet|tekstit]
 *
 * Omistajan päätös: peli ei saa mennä rikki, jos jokin palvelin kaatuu tai
 * tiedosto poistetaan. Siksi jokaisesta ulkopuolisesta kuvasta ja äänestä
 * otetaan oma kopio, ja peli hakee ensin kopion. Alkuperäinen osoite jää
 * varareitiksi.
 *
 * TEKSTEJÄ EI PEILATA. Omistajan linjaus: kaikki wiki-tekstit kirjoitetaan
 * itse lyhyemmiksi ja pelin tyylin mukaisiksi, ja englanninkielisestä
 * Wikipediasta haetaan lisäaineistoa tarvittaessa. Siksi --vain tekstit
 * lataa raaka-aineen kansioon lahteet/, josta tekstit kirjoitetaan
 * paketteihin (ARTIKKELIT ja OMAT_TIIVISTELMAT). Sitä kansiota ei viedä
 * ämpäriin eikä peli lue sitä.
 *
 * Työkalu on turvallinen ajaa uudestaan: valmiit tiedostot ohitetaan.
 * Lopuksi kirjoitetaan manifesti.json, jossa on jokaisen tiedoston
 * alkuperäinen osoite, lisenssi ja tekijä — lähdemaininnat eivät katoa
 * peilatessa.
 *
 * Tulos viedään ämpäriin (Cloudflare R2), josta peli hakee sen.
 * Osoite on js/media.js:n PEILI_JUURI-vakiossa, ja viennin tekee
 * .github/workflows/peilaa.yml. Aiemmin tulos asui omassa repossaan
 * (ravelius/Matkakirja-media) GitHub Pagesissa, mutta aineisto ylitti
 * Pagesin suositusrajan (1 Gt) ja repo jäi tarpeettomaksi.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, rmSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { leikkaaMp3 } from './leikkaa-mp3.mjs';
// Peilin nimeämissääntö on pelin puolella, ja tämä työkalu käyttää
// juuri sitä — ei omaa kopiotaan. Kaksi kopiota ehti kerran eriytyä:
// työkalu nimesi tunnistamattoman ääniosoitteen silmukan indeksillä ja
// peli tyhjällä merkkijonolla, joten peli ei löytänyt tiedostoa
// koskaan. js/media.js ei tuo mitään eikä koske selaimen rajapintoihin
// latautuessaan, joten se latautuu myös nodessa.
import { turvanimi, peiliKuvaPolku, peiliAaniPolku } from '../js/media.js';
// Flickr-kuvat eivät kulje peilin kautta lainkaan: niistä on repossa
// oma kopio (assets/valokuvat), joten peilin tehtävä — pitää aineisto
// saatavilla vaikka lähde kaatuisi — on jo hoidettu. Commonsista niitä
// ei löydy, joten ilman tätä suodatusta jokainen ajo hakisi niitä
// turhaan ja jättäisi manifestiin rivin tiedostosta, jota ei ole.
import { VALOKUVAT_FLICKR } from '../js/packs/valokuvat-flickr.js';

/*
 * Taustaäänen enimmäispituus (omistajan linjaus 1.8.2026). Kenttä-
 * äänitykset ovat usein 10–30 minuuttia, ja peli soittaa niitä
 * silmukassa muutaman minuutin kerrallaan: loppuosa on painolastia
 * peilissä. Leikkaus tehdään kehysrajalta koodaamatta uudelleen, joten
 * ääni on bitilleen sama kuin alkuperäinen.
 */
const AANI_MAX_S = 180;

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const arvo = (lippu, oletus) => {
  const i = argv.indexOf(lippu);
  return i >= 0 ? argv[i + 1] : oletus;
};
// Peilikansio on repon sisällä (media/, .gitignoressa). Se ei ole
// varasto vaan välivaihe: ajo noutaa ämpärin sisällön tänne, täydentää
// puuttuvat ja vie tuloksen takaisin. Ennen kansio oli repon vieressä
// (../Matkakirja-media), ja koska Linux erottaa kirjainkoon, väärä
// alkukirjain loi vieressä toisen tyhjän hakemiston ja peilaus alkoi
// alusta joka kerta.
const ULOS = arvo('--ulos', join(JUURI, 'media'));
const VAIN = arvo('--vain', null);
const AGENTTI = 'Matkakirja/1.0 (https://github.com/ravelius/Matkakirja)';

// Freesoundin esikuuntelut latautuvat hitaasti — mitattu noin 75 kt/s —
// ja suurimmat ovat yli 25 megatavua. Aiempi viiden minuutin raja katkaisi
// juuri ne kesken: yksi äänite jäi peiliin 4,3 megatavun mittaisena, kun
// sen oikea koko on 25,2. Kaksikymmentä minuuttia riittää kaksinkertaisella
// varmuudella.
const AIKARAJA_S = 1200;

/**
 * Yksi HTTP-haku curlilla. node:n fetch ei pääse hiekkalaatikon läpi.
 *
 * Yksittäinen epäonnistuminen ei saa kaataa koko ajoa, joten virhe
 * palautetaan koodina. Tiedostoa haettaessa palautetaan myös ladattu
 * koko ja palvelimen ilmoittama koko, jotta katkennut lataus voidaan
 * tunnistaa — pelkkä HTTP 200 ei kerro, tuliko tiedosto kokonaan.
 */
function hae(url, tiedosto = null) {
  const args = ['-sSL', '--max-time', String(AIKARAJA_S), '--retry', '2', '--retry-delay', '3',
    '-A', AGENTTI, url];
  if (tiedosto) args.push('-o', tiedosto, '-w', '%{http_code} %{size_download} %{size_header}');
  try {
    const ulos = execFileSync('curl', args, { maxBuffer: 3e8, timeout: (AIKARAJA_S + 30) * 1000 });
    if (!tiedosto) return ulos;
    const [koodi, ladattu] = ulos.toString().trim().split(/\s+/);
    return { koodi, ladattu: Number(ladattu) || 0 };
  } catch (e) {
    if (tiedosto) {
      // Keskeneräinen tiedosto pois, jottei sitä pidetä valmiina.
      try { rmSync(tiedosto, { force: true }); } catch { /* ei ollut */ }
      return { koodi: 'virhe', ladattu: 0 };
    }
    throw e;
  }
}

/** Palvelimen ilmoittama koko tavuina, tai null jos sitä ei saada. */
function etakoko(url) {
  try {
    const ulos = execFileSync('curl', ['-sSIL', '--max-time', '45', '-A', AGENTTI, url],
      { maxBuffer: 1e7 }).toString();
    // Uudelleenohjausketjussa on monta vastausta, ja niiden joukkoon
    // eksyy myös välipalvelimen virhesivuja. Aiemmin otettiin ketjun
    // viimeinen content-length sellaisenaan, jolloin hetkellinen
    // virhevastaus antoi odotetuksi kooksi 170 tavua ja täysin ehjä
    // lataus tuomittiin katkenneeksi. Kelpuutetaan vain onnistuneen
    // vastauksen ilmoittama koko.
    let onnistui = false;
    let koko = null;
    for (const rivi of ulos.split(/\r?\n/)) {
      const tila = rivi.match(/^HTTP\/[\d.]+\s+(\d{3})/i);
      if (tila) onnistui = tila[1] === '200';
      const pituus = rivi.match(/^content-length:\s*(\d+)/i);
      if (pituus && onnistui) koko = Number(pituus[1]);
    }
    return koko;
  } catch {
    return null;
  }
}

/**
 * Kelpaako ladattu tiedosto? Pelkkä HTTP 200 ei riitä: virhesivu on
 * myös 200-vastaus jollakin välipalvelimella, ja katkennut lataus
 * näyttää levyllä tavalliselta tiedostolta.
 */
function kelpaa(polku, odotettu) {
  if (!existsSync(polku)) return 'tiedostoa ei syntynyt';
  const koko = statSync(polku).size;
  // Kokoraja ei kelpaa mittapuuksi: yksivärinen lippu pakkautuu 320
  // pikselin levyisenä muutamaan sataan tavuun, ja se on ihan kelvollinen
  // kuva. Ratkaisee tiedoston oma alkutunniste.
  if (koko < 64) return `tyhjä (${koko} tavua)`;
  if (odotettu && koko !== odotettu) return `katkennut (${koko}/${odotettu} tavua)`;

  const alku = readFileSync(polku).subarray(0, 16);
  const teksti = alku.toString('latin1').trimStart().toLowerCase();
  if (teksti.startsWith('<!doctype') || teksti.startsWith('<html') || teksti.startsWith('<?xml')) {
    return 'vastaus oli HTML-sivu';
  }
  const tunnisteet = [
    [[0x89, 0x50, 0x4e, 0x47], 'png'],
    [[0xff, 0xd8, 0xff], 'jpeg'],
    [[0x47, 0x49, 0x46, 0x38], 'gif'],
    [[0x49, 0x49, 0x2a, 0x00], 'tiff'],
    [[0x4d, 0x4d, 0x00, 0x2a], 'tiff'],
    [[0x49, 0x44, 0x33], 'mp3'],
    [[0xff, 0xfb], 'mp3'],
    [[0xff, 0xf3], 'mp3'],
    [[0xff, 0xf2], 'mp3'],
    [[0x4f, 0x67, 0x67, 0x53], 'ogg'],
    [[0x52, 0x49, 0x46, 0x46], 'riff'],
  ];
  const tunnistettu = tunnisteet.some(([tavut]) => tavut.every((t, k) => alku[k] === t));
  // WebP ja jotkin mp3:t alkavat muuten; riittää ettei alku ole tekstiä.
  if (!tunnistettu && /^[\x09\x0a\x0d\x20-\x7e]{16}$/.test(alku.toString('latin1'))) {
    return 'vastaus näyttää tekstiltä, ei medialta';
  }
  return null;
}

const nuku = (ms) => execFileSync('sleep', [String(ms / 1000)]);

// --- kerätään kohteet paketeista -------------------------------------------

function kohteet() {
  const paketit = readdirSync(join(JUURI, 'js/packs'))
    .map((f) => readFileSync(join(JUURI, 'js/packs', f), 'utf8')).join('\n');
  const muut = ['js/aani-ehdokkaat.js', 'js/ui.js', 'js/sisaltotaulut.js']
    .map((f) => readFileSync(join(JUURI, f), 'utf8')).join('\n');
  const kaikki = `${paketit}\n${muut}`;
  /*
   * Kommenttirivit pois ennen poimintaa. Ohjeissa näytetään kentän
   * muoto esimerkkinä (maasto-tekstit-malli.js: "poimii nimet juuri
   * kuviolla `tiedosto: '...'`"), ja kuvio poimi siitä nimen "...",
   * jota haettiin joka ajolla ja joka epäonnistui joka ajolla.
   *
   * Vain rivin alusta alkavat kommentit poistetaan: keskeltä riviä
   * `//` on useimmiten osoitteessa (https://), ja sellaisen katkaisu
   * söisi oikeita lähdeviitteitä.
   */
  const ilmanKommentteja = (teksti) => teksti.split('\n')
    .filter((r) => !/^\s*(\/\/|\*|\/\*)/.test(r))
    .join('\n');
  const koodi = ilmanKommentteja(paketit);

  // Heittomerkilliset nimet ("Château d\'If") katkesivat yksinkertaisella
  // hakukuviolla ensimmäiseen hipsuun ja päätyivät 404:ään. Siksi
  // kelpuutetaan myös suojatut merkit ja puretaan suojaus.
  const pura = (t) => t.replace(/\\(['"\\])/g, '$1');
  /*
   * Kentännimen edellä on oltava jotain muuta kuin kirjain, numero tai
   * alaviiva — muuten kuvio osuu keskelle sanaa.
   *
   * Löytyi QA:ssa 8.8.2026 kahdella tavalla:
   *   `lippu:` osui selitteen sisään merkkijonossa "…punavalkoinen
   *   sukeltajalippu: pohjahiekka…" (northamerica-valokuvat.js), ja
   *   `tiedosto:` osui malliohjeen kommenttiin, jossa kentän muoto
   *   näytetään esimerkkinä (maasto-tekstit-malli.js).
   *
   * Kumpikaan ei kaatanut peilausta, koska olematon nimi vain
   * epäonnistuu latauksessa — mutta molemmat tuottivat joka ajolla
   * saman virherivin, ja virhelista, jossa on pysyviä valheita, lakkaa
   * kertomasta oikeista virheistä.
   *
   * JS ei tue takautuvaa katsetta kaikkialla, joten raja luetaan
   * ryhmänä ja hylätään vasta osuman jälkeen.
   */
  const poimi = (kentta) => new Set([
    ...[...koodi.matchAll(new RegExp(`(^|[^\\w])${kentta}: '((?:[^'\\\\]|\\\\.)*)'`, 'gm'))].map((m) => pura(m[2])),
    ...[...koodi.matchAll(new RegExp(`(^|[^\\w])${kentta}: "((?:[^"\\\\]|\\\\.)*)"`, 'gm'))].map((m) => pura(m[2])),
  ]);
  // `tiedosto:` tarkoittaa paketeissa Commonsin kuvatiedostoa, mutta
  // sama kentännimi on myös repon omilla äänitiedostoilla
  // (js/packs/viritysaanet.js). Niitä ei ole Commonsissa: haku palautti
  // joka ajolla saman viiden 404:n rivistön ja manifestiin jäi rivi
  // kuvasta, jota ei ole olemassa. Äänipääte kertoo eron varmasti.
  const kuvat = [...poimi('tiedosto')]
    .filter((n) => !/\.(mp3|ogg|wav|m4a|opus|flac)$/i.test(n))
    .filter((n) => !VALOKUVAT_FLICKR.has(n));
  const liput = poimi('lippu');
  // Hakukuvio löytää kaikki arkisto-osoitteet, myös ne jotka eivät ole
  // äänitiedostoja: kirjaskannien ja viritysäänten lähdeviitteet ovat
  // muotoa archive.org/details/<tunnus> ja osoittavat HTML-sivulle.
  // Niiden lataaminen tuotti joka ajolla saman kourallisen virheitä
  // ("vastaus oli HTML-sivu") ja jätti manifestiin rivin tiedostosta,
  // jota ei voi olla olemassa. Peilattavuuden ratkaisee sama funktio
  // jolla peli laskee polun: jos se ei anna nimeä, osoite ei ole
  // peilissä eikä sitä haeta.
  const arkistot = [...new Set(
    [...kaikki.matchAll(/https?:\/\/(?:cdn\.freesound\.org|archive\.org)\/[^'"\s)#]+/g)]
      .map((m) => m[0]),
  )];
  const aanet = arkistot.filter((u) => peiliAaniPolku(u));
  const eiAania = arkistot.filter((u) => !peiliAaniPolku(u));
  // Heittomerkki katkaisi myös artikkelin otsikon ("Youssou N'Dour"),
  // joten sama poimija kuin kuvilla.
  const wikit = poimi('wiki');
  for (const nimi of ['africa-artikkelit', 'europe-artikkelit']) {
    const s = readFileSync(join(JUURI, `js/packs/${nimi}.js`), 'utf8');
    for (const m of s.matchAll(/^ {2}('?)([A-ZÅÄÖ][^:']*)\1: \{/gm)) wikit.add(m[2]);
  }
  return {
    kuvat, liput: [...liput], aanet, eiAania, wikit: [...wikit],
  };
}

// --- lataus ------------------------------------------------------------------

/**
 * Manifesti täydentyy, se ei korvaudu. Kun ajetaan vain yksi laji
 * (`--vain kuvat`), muiden lajien merkinnät on säilytettävä: muuten
 * ääni- ja lippurivit katoaisivat, vaikka tiedostot ovat levyllä.
 */
function lueManifesti() {
  const pohja = { luotu: null, kuvat: {}, liput: {}, aanet: {}, tekstit: {} };
  const polku = join(ULOS, 'manifesti.json');
  if (!existsSync(polku)) return pohja;
  try {
    const vanha = JSON.parse(readFileSync(polku, 'utf8'));
    for (const laji of ['kuvat', 'liput', 'aanet', 'tekstit']) {
      Object.assign(pohja[laji], vanha[laji] ?? {});
    }
  } catch { /* rikkinäinen manifesti kirjoitetaan yli */ }
  return pohja;
}

const manifesti = lueManifesti();
const virheet = [];

/**
 * Pois manifestista ne merkinnät, joita paketit eivät enää mainitse.
 *
 * Manifesti täydentyy ajosta toiseen (ks. lueManifesti), joten ilman
 * tätä poistetun kortin kuva tai vaihtunut äänilähde jäisi riviksi
 * ikuisesti. Pahempaa: kun nimeämissääntöä korjataan, vanhan säännön
 * mukainen rivi jää manifestiin eikä yksikään ajo enää kirjoita sen
 * päälle — silloin tests/media.test.mjs kaatuu joka kerta virheeseen,
 * jota ei voi korjata muuttamatta manifestia käsin. Karsinta tehdään
 * vain sille lajille, joka oikeasti ajetaan: `--vain aanet` ei saa
 * tyhjentää kuvarivejä.
 *
 * Ämpäriin karsinta ei koske: vienti ei käytä --deleteä, joten vanha
 * tiedosto jää sinne. Se ei riko mitään, mutta manifesti kertoo tästä
 * eteenpäin vain siitä aineistosta, jota peli oikeasti käyttää.
 */
function karsi(laji, avaimet) {
  const pida = new Set(avaimet);
  let poistettu = 0;
  for (const avain of Object.keys(manifesti[laji])) {
    if (pida.has(avain)) continue;
    delete manifesti[laji][avain];
    poistettu += 1;
  }
  if (poistettu) console.log(`  ${laji}: ${poistettu} vanhentunutta riviä pois manifestista`);
}

function commonsMeta(nimet) {
  const url = 'https://commons.wikimedia.org/w/api.php?format=json&action=query'
    + '&prop=imageinfo&iiprop=url|extmetadata&titles='
    + encodeURIComponent(nimet.map((t) => `File:${t}`).join('|'));
  try {
    const d = JSON.parse(hae(url).toString());
    const ulos = {};
    for (const sivu of Object.values(d.query?.pages ?? {})) {
      const nimi = sivu.title.replace(/^File:/, '');
      if (sivu.missing !== undefined || !sivu.imageinfo) { ulos[nimi] = null; continue; }
      const m = sivu.imageinfo[0].extmetadata ?? {};
      const puhdista = (v) => (v ?? '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
      ulos[nimi] = {
        lisenssi: puhdista(m.LicenseShortName?.value),
        tekija: puhdista(m.Artist?.value).slice(0, 120),
      };
    }
    return ulos;
  } catch {
    return {};
  }
}

async function lataaKuvat(nimet, alikansio, leveys) {
  const kansio = join(ULOS, alikansio);
  mkdirSync(kansio, { recursive: true });
  for (let i = 0; i < nimet.length; i += 20) {
    const era = nimet.slice(i, i + 20);
    const meta = commonsMeta(era);
    for (const nimi of era) {
      const kohde = peiliKuvaPolku(nimi, alikansio).slice(alikansio.length + 1);
      const polku = join(kansio, kohde);
      manifesti[alikansio][nimi] = {
        tiedosto: `${alikansio}/${kohde}`,
        alkuperainen: `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(nimi)}`,
        ...(meta[nimi] ?? {}),
      };
      const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(nimi)}?width=${leveys}`;
      if (existsSync(polku) && !kelpaa(polku, null)) {
        manifesti[alikansio][nimi].koko = statSync(polku).size;
        continue;
      }
      const { koodi } = hae(url, polku);
      if (koodi !== '200') {
        // curl kirjoittaa myös virhesivun kohteeseen. Se näyttäisi
        // seuraavalla ajolla valmiilta tiedostolta, joten se poistetaan.
        rmSync(polku, { force: true });
        virheet.push(`${alikansio}: ${nimi} → HTTP ${koodi}`);
      } else {
        const vika = kelpaa(polku, null);
        if (vika) {
          rmSync(polku, { force: true });
          virheet.push(`${alikansio}: ${nimi} → ${vika}`);
        } else {
          manifesti[alikansio][nimi].koko = statSync(polku).size;
          kokoYhteensa += statSync(polku).size;
        }
      }
      nuku(350);
    }
    console.log(`  ${alikansio}: ${Math.min(i + 20, nimet.length)}/${nimet.length}`);
  }
}

let kokoYhteensa = 0;

function lataaAanet(urlit) {
  const kansio = join(ULOS, 'aanet');
  mkdirSync(kansio, { recursive: true });
  for (const [i, url] of urlit.entries()) {
    const tiedosto = peiliAaniPolku(url);
    // kohteet() päästää tänne vain osoitteet, joille sääntö antaa
    // nimen. Jos tänne silti päätyy nimetön, se on ohjelmointivirhe
    // eikä arvattava tilanne — ennen tässä oli varasuunnitelmana
    // silmukan indeksi, ja juuri se rikkoi peilin hiljaa.
    if (!tiedosto) throw new Error(`ei nimeä ääniosoitteelle: ${url}`);
    const pate = tiedosto.split('.').pop();
    const kohde = tiedosto.slice('aanet/'.length);
    const polku = join(kansio, kohde);
    const vanha = manifesti.aanet[url] ?? {};
    manifesti.aanet[url] = { tiedosto, alkuperainen: url };

    // Äänitteet ovat kymmeniä megatavuja ja latautuvat hitaasti, joten
    // juuri ne katkeavat. Palvelimen ilmoittamaa kokoa vasten näkee sekä
    // sen, onko levyllä oleva tiedosto kokonainen, että sen, tuliko uusi
    // lataus loppuun asti. Ilman tätä katkennut tiedosto jäi peiliin
    // pysyvästi: seuraava ajo näki sen olemassa olevana ja ohitti.
    const odotettu = etakoko(url);
    if (existsSync(polku)) {
      // Leikattu tiedosto on tarkoituksella palvelimen ilmoittamaa
      // pienempi, joten sitä verrataan manifestiin kirjattuun kokoon.
      // Ilman tätä jokainen ajo hakisi leikatut uudestaan.
      const mitta = vanha.leikattu ? vanha.koko ?? null : odotettu;
      const vika = kelpaa(polku, mitta);
      if (!vika) {
        // Vanhasta merkinnästä otetaan talteen vain leikkaustiedot.
        // Polku lasketaan aina uudestaan säännöstä: jos vanha `tiedosto`
        // pääsisi tästä läpi, kertaalleen kirjattu väärä nimi eläisi
        // manifestissa ikuisesti eikä sääntöä voisi enää korjata.
        Object.assign(manifesti.aanet[url], vanha,
          { tiedosto, alkuperainen: url, koko: statSync(polku).size });
        nuku(200);
        continue;
      }
      console.log(`  aanet: haetaan uudestaan — ${kohde}: ${vika}`);
      rmSync(polku, { force: true });
    }

    const { koodi } = hae(url, polku);
    if (koodi !== '200') {
      rmSync(polku, { force: true });
      virheet.push(`aanet: ${url} → ${koodi}`);
    } else {
      const vika = kelpaa(polku, odotettu);
      if (vika) {
        rmSync(polku, { force: true });
        virheet.push(`aanet: ${url} → ${vika}`);
      } else {
        // Eheys on tarkistettu koko tiedostoa vasten — vasta sen jälkeen
        // ylipitkä äänite lyhennetään.
        if (pate === 'mp3') {
          const leikattu = leikkaaMp3(readFileSync(polku), AANI_MAX_S);
          if (leikattu) {
            writeFileSync(polku, leikattu.puskuri);
            manifesti.aanet[url].leikattu = leikattu.kesto;
            manifesti.aanet[url].alkuperainenKoko = odotettu ?? null;
          }
        }
        manifesti.aanet[url].koko = statSync(polku).size;
        kokoYhteensa += statSync(polku).size;
      }
    }
    nuku(400);
    if ((i + 1) % 10 === 0) console.log(`  aanet: ${i + 1}/${urlit.length}`);
  }
}

/**
 * Raaka-aine omien artikkelien kirjoittamiseen: sekä suomen- että
 * englanninkielinen Wikipedia-teksti jokaisesta otsikosta samaan
 * tiedostoon. Englanninkielinen on usein paljon laajempi, ja juuri siitä
 * poimitaan lisää kun suomenkielinen on tynkä.
 *
 * Tulos EI ole pelin sisältöä vaan kirjoituspöydän aineistoa.
 */
function lataaTekstit(otsikot) {
  const kansio = join(ULOS, 'lahteet');
  mkdirSync(kansio, { recursive: true });
  for (const [i, otsikko] of otsikot.entries()) {
    const kohde = `${turvanimi(otsikko)}.json`;
    manifesti.tekstit[otsikko] = { tiedosto: `lahteet/${kohde}`, alkuperainen: null };
    const polku = join(kansio, kohde);
    if (existsSync(polku)) continue;
    // Molemmat kielet talteen: englanninkielinen on lähes aina laajempi,
    // ja siitä poimitaan lisäaineistoa kun suomenkielinen on tynkä.
    const tulos = { otsikko, fi: null, en: null };
    for (const kieli of ['fi', 'en']) {
      try {
        const d = JSON.parse(hae(
          `https://${kieli}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(otsikko)}`,
        ).toString());
        if (d.type === 'disambiguation' || !d.extract) { nuku(250); continue; }
        tulos[kieli] = { title: d.title, tiivistelma: d.extract, artikkeli: null };
        if (kieli === 'fi') {
          manifesti.tekstit[otsikko].alkuperainen = `https://fi.wikipedia.org/wiki/${encodeURIComponent(otsikko)}`;
        }
      } catch { /* kokeillaan seuraavaa kieltä */ }
      nuku(250);
      if (!tulos[kieli]) continue;
      try {
        const d = JSON.parse(hae(
          `https://${kieli}.wikipedia.org/w/api.php?format=json&action=query&prop=extracts`
          + `&explaintext=1&exsectionformat=plain&redirects=1&titles=${encodeURIComponent(otsikko)}`,
        ).toString());
        const sivu = Object.values(d.query?.pages ?? {})[0];
        if (sivu?.extract) tulos[kieli].artikkeli = sivu.extract.slice(0, 30000);
      } catch { /* pelkkä tiivistelmä riittää */ }
      nuku(250);
    }
    if (!tulos.fi && !tulos.en) virheet.push(`lahteet: ${otsikko} → ei artikkelia kummallakaan kielellä`);
    writeFileSync(polku, JSON.stringify(tulos, null, 1));
    if ((i + 1) % 10 === 0) console.log(`  tekstit: ${i + 1}/${otsikot.length}`);
  }
}

// --- ajo ---------------------------------------------------------------------

const k = kohteet();
console.log(`Peilataan: ${k.kuvat.length} kuvaa, ${k.liput.length} lippua, `
  + `${k.aanet.length} ääntä, ${k.wikit.length} tekstiä → ${ULOS}`);
// Ohitetut näkyviin: näin listalta puuttuva äänimuoto huomataan täältä
// eikä vasta pelistä puuttuvana äänenä.
if (k.eiAania.length) {
  console.log(`  ohitettu ${k.eiAania.length} arkisto-osoitetta, jotka eivät ole `
    + 'äänitiedostoja (lähdeviitteitä, ei peilata):');
  for (const u of k.eiAania.slice(0, 5)) console.log(`    ${u}`);
  if (k.eiAania.length > 5) console.log(`    … ja ${k.eiAania.length - 5} muuta`);
}
mkdirSync(ULOS, { recursive: true });

if (!VAIN || VAIN === 'kuvat') { karsi('kuvat', k.kuvat); await lataaKuvat(k.kuvat, 'kuvat', 1200); }
if (!VAIN || VAIN === 'liput') { karsi('liput', k.liput); await lataaKuvat(k.liput, 'liput', 320); }
if (!VAIN || VAIN === 'aanet') { karsi('aanet', k.aanet); lataaAanet(k.aanet); }
if (!VAIN || VAIN === 'tekstit') { karsi('tekstit', k.wikit); lataaTekstit(k.wikit); }

manifesti.luotu = new Date().toISOString().slice(0, 10);
writeFileSync(join(ULOS, 'manifesti.json'), JSON.stringify(manifesti, null, 1));

// GitHubin luoma repo saa valmiiksi yhden rivin README:n. Pelkkä
// "onko tiedostoa" jätti sen paikalleen, eikä kukaan saanut tietää
// mitä repo sisältää. Ohitetaan vain oikea, jo kirjoitettu README.
const readmePolku = join(ULOS, 'README.md');
const omaReadme = existsSync(readmePolku)
  && readFileSync(readmePolku, 'utf8').includes('peilaa-media.mjs');
if (!omaReadme) {
  writeFileSync(readmePolku, `# Matkakirja — media

Tämä repo on [Matkakirja](https://github.com/ravelius/Matkakirja)-pelin
kuvien, äänien ja tekstien kopio yhdessä paikassa. Peli hakee aineiston
täältä, jottei se mene rikki jos alkuperäinen palvelin kaatuu tai
tiedosto poistetaan. Alkuperäinen osoite jää varareitiksi.

Kaikki aineisto on avoimella lisenssillä. Jokaisen tiedoston
alkuperäinen osoite, lisenssi ja tekijä ovat tiedostossa
\`manifesti.json\`.

Kansiot:

- \`kuvat/\` — Wikimedia Commonsin valokuvat ja kulttuurikuvat
- \`liput/\` — lippukuvat
- \`aanet/\` — äänimaisemat (Freesound) ja kenttä-äänitykset (radio aporee).
  Taustaäänet on leikattu kolmeen minuuttiin kehysrajalta koodaamatta
  uudelleen, joten ne ovat alkuperäistä lyhyempiä mutta äänenlaadultaan
  samoja. Manifestin \`leikattu\`-kenttä kertoo keston sekunteina.
Pelin tekstit eivät ole täällä: ne kirjoitetaan itse pelin tyyliin ja
asuvat pelirepossa.

Aineisto päivitetään komennolla \`node tools/peilaa-media.mjs\`
pelin repossa.
`);
}

console.log(`\nValmis. Ladattu ${(kokoYhteensa / 1e6).toFixed(1)} Mt. Virheitä: ${virheet.length}`);
for (const v of virheet.slice(0, 30)) console.log('  ', v);
