/*
 * Hakee kuvia Flickristä: flickr.photos.search + flickr.photos.getInfo
 * per kuva, lataa isot kuvatiedostot ja kirjoittaa JSON-manifestin
 * samassa muodossa kuin muut hakutyökalut (vrt. tools/hae-commons.mjs).
 *
 *   FLICKR_API_KEY=… node tools/hae-flickr.mjs --haku "street food market" --maara 20
 *   FLICKR_API_KEY=… node tools/hae-flickr.mjs --haku "Marrakesh medina" --lat 31.63 --lon -7.99 --sade 5
 *   FLICKR_API_KEY=… node tools/hae-flickr.mjs --haku "ramen shop" --kuiva   # ei lataa kuvia
 *
 * MIKSI TÄMÄ ON OLEMASSA (omistajan tarve): nykyiset kaupunkikuvat
 * (Commons + LoC + Europeana, ks. tools/hae-kaupunkikuvat.mjs) ovat
 * enimmäkseen vanhaa arkistomateriaalia ja institutionaalisia kuvia.
 * Flickr täydentää sitä siellä missä Commonsista puuttuu nykyaikainen
 * katukuva — ja ERITYISESTI RUOKAKUVAT, joissa nykyiset otokset ovat
 * esteettisesti heikkoja (studiovalokuvausta puuttuu, arkistokuvissa
 * ei juuri ruokaa). Ks. laatukriteerit docs/moduulit/kaupunkilehti.md.
 *
 * KÄYTTÖ (valitsimet)
 *
 *   --haku "sanat"      hakusanat/tagit (pakollinen)
 *   --lat NN --lon NN   paikkarajaus, keskipiste (valinnainen)
 *   --sade KM           hakusäde kilometreinä lat/lon:in kanssa (oletus 10)
 *   --woe ID            Flickrin "Where On Earth" -tunnus lat/lon:in sijaan
 *   --maara N           montako kuvaa haetaan (oletus 20)
 *   --ulos POLKU         manifestin kohdetiedosto (oletus tools/flickr-aineisto/<hakusana>.json)
 *   --kansio POLKU       minne kuvat ladataan (oletus tools/flickr-aineisto/kuvat/)
 *   --kuiva              ei lataa kuvatiedostoja, kirjoittaa vain manifestin
 *
 * AVAIN: process.env.FLICKR_API_KEY. Jos puuttuu, työkalu selittää
 * mistä sen saa ja lopettaa heti — AVAINTA EI KOSKAAN TULOSTETA
 * eikä kirjoiteta manifestiin tai lokiin missään muodossa.
 *
 * --- LISENSSIT (flickr.photos.licenses.getInfo, id kiinteä) ---
 *
 *   id  nimi                          kelpaako peliin
 *   0   All Rights Reserved           EI
 *   1   CC BY-NC 2.0                  EI (NC)
 *   2   CC BY-NC-SA 2.0               EI (NC)
 *   3   CC BY-NC-ND 2.0               EI (NC+ND)
 *   4   CC BY 2.0                     KYLLÄ
 *   5   CC BY-SA 2.0                  KYLLÄ
 *   6   CC BY-ND 2.0                  EI (ND — ei saa muokata/skaalata)
 *   7   No known copyright restrictions (PDM/Commons-tyyppinen)  KYLLÄ
 *   8   United States Government Work EI (ei CC-merkintä, ei tarkisteta tässä)
 *   9   CC0 1.0                       KYLLÄ
 *   10  PDM (Public Domain Mark)      KYLLÄ
 *
 * Haku rajataan palvelimen puolella license=4,5,9,10 (sama syy kuin
 * hae-freesound.mjs:ssä: jälkikäteen suodattava haku näyttäisi
 * aineistolta olevan vähemmän kuin oikeasti on). Lisenssi VARMISTETAAN
 * KUITENKIN VIELÄ per kuva getInfo-kutsulla ennen latausta — hakutulos
 * ei ole se mihin luotetaan, koska käyttäjä on voinut vaihtaa kuvan
 * lisenssiä haun jälkeen tai search-vastaus voi olla välimuistissa.
 *
 * HUOM (silmätarkistus): Flickrissä lisenssin merkitsee kuvan
 * LATAAJA itse, ei mikään keskitetty tarkistus — toisin kuin Commons,
 * jossa yhteisö valvoo merkintöjä. Käyttäjän ilmoittamaan lisenssiin
 * luotetaan tässä työkalussa vain silloin kun tili on vakiintunut
 * (esim. kaupungin matkailuvirasto, tunnettu valokuvaaja, Flickr
 * Commons -osallistuja) — JOKAINEN kuva katsotaan silmin kuten
 * Commons-kuvatkin ennen kuin se päätyy peliin. Tämä työkalu ei tee
 * sitä puolesta: se vain kokoaa ehdokkaat ja niiden lisenssitiedot.
 *
 * TESTATTAVUUS: verkosta riippumaton logiikka (lisenssiseula, koon
 * valinta, ehdokkaan arviointi) on omissa vientifunktioissaan, jotka
 * eivät kutsu fetchiä. tests/hae-flickr.test.mjs syöttää niille
 * tallennettuja esimerkkivastauksia Flickrin dokumentoidusta
 * JSON-muodosta. Verkkokutsuva osa (flickrKutsu, main-ajo) käynnistyy
 * vain kun tiedosto ajetaan suoraan, ei kun se importataan testiin.
 */
import { spawnSync } from 'node:child_process';
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Noden fetch ei lue HTTPS_PROXYa konttiympäristössä; ks. tools/hae-radiot.mjs.
// Tämä respawn saa tapahtua vain suorassa ajossa, ei testin importissa,
// joten se on vartion sisällä alempana (ks. "ajo"-lohko).

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');

// --- lisenssit ---------------------------------------------------------------

// Vain nämä id:t kelpaavat peliin: CC BY 2.0, CC BY-SA 2.0, CC0 1.0, PDM.
export const KELPAAVAT_LISENSSIT = new Set(['4', '5', '9', '10']);
export const LISENSSI_NIMET = {
  0: 'All Rights Reserved',
  1: 'CC BY-NC 2.0',
  2: 'CC BY-NC-SA 2.0',
  3: 'CC BY-NC-ND 2.0',
  4: 'CC BY 2.0',
  5: 'CC BY-SA 2.0',
  6: 'CC BY-ND 2.0',
  7: 'No known copyright restrictions',
  8: 'United States Government Work',
  9: 'CC0 1.0',
  10: 'Public Domain Mark',
};

export const VAADITTU_MINIMI = 1200;

/** Suurin saatavilla oleva kuva-url ja mitat search-extroista. */
export function parhainKoko(kuva) {
  // Tärkeysjärjestys: alkuperäinen, sitten k (2048), sitten h (1600).
  if (kuva.url_o) return { url: kuva.url_o, leveys: Number(kuva.width_o), korkeus: Number(kuva.height_o) };
  if (kuva.url_k) return { url: kuva.url_k, leveys: 2048, korkeus: null };
  if (kuva.url_h) return { url: kuva.url_h, leveys: 1600, korkeus: null };
  return null;
}

/**
 * Arvioi yhden kuvaehdokkaan puhtaasti dataa vasten (ei fetchiä):
 * `kuva` on flickr.photos.search-vastauksen photo-alkio (extras mukana),
 * `infoPhoto` on flickr.photos.getInfo-vastauksen `photo`-kenttä.
 * Palauttaa { hyvaksytty } tai { hylatty: syy }.
 */
export function arvioiEhdokas(kuva, infoPhoto) {
  if (!infoPhoto) return { hylatty: 'getInfo epäonnistui' };
  const lisenssiId = String(infoPhoto.license ?? kuva.license ?? '');
  if (!KELPAAVAT_LISENSSIT.has(lisenssiId)) {
    return { hylatty: `lisenssi ${LISENSSI_NIMET[lisenssiId] ?? lisenssiId} ei kelpaa (vain CC BY/CC BY-SA/CC0/PDM)` };
  }
  const koko = parhainKoko(kuva);
  if (!koko) return { hylatty: 'ei riittävän suurta kuvakokoa saatavilla' };
  if (koko.leveys && koko.leveys < VAADITTU_MINIMI) {
    return { hylatty: `liian pieni (${koko.leveys}px < ${VAADITTU_MINIMI}px)` };
  }

  const tekija = (infoPhoto.owner?.realname || infoPhoto.owner?.username || 'tuntematon').trim();
  const kuvaus = (infoPhoto.description?._content || '').replace(/\s+/g, ' ').trim().slice(0, 600);
  const tagit = (infoPhoto.tags?.tag ?? []).map((t) => t.raw ?? t._content).join(', ');
  const sivuUrl = `https://www.flickr.com/photos/${infoPhoto.owner?.path_alias || infoPhoto.owner?.nsid}/${infoPhoto.id}`;

  return {
    hyvaksytty: {
      id: infoPhoto.id,
      sivu: sivuUrl,
      tekija,
      kayttajatunnus: infoPhoto.owner?.username ?? null,
      lisenssi: LISENSSI_NIMET[lisenssiId] ?? lisenssiId,
      lisenssiId: Number(lisenssiId),
      leveys: koko.leveys ?? null,
      korkeus: koko.korkeus ?? null,
      kuvaus,
      tagit,
      otettu: infoPhoto.dates?.taken ?? null,
      kuvaUrl: koko.url,
    },
  };
}

const nuku = (ms) => new Promise((r) => { setTimeout(r, ms); });

/**
 * Kutsuu Flickrin REST-rajapintaa. Peräytyy 429/503-vastauksilla.
 * Avainta ei koskaan tulosteta virheissä.
 */
export async function flickrKutsu(avain, metodi, parametrit, { yrityksia = 5 } = {}) {
  const url = new URL('https://www.flickr.com/services/rest/');
  url.searchParams.set('method', metodi);
  url.searchParams.set('api_key', avain);
  url.searchParams.set('format', 'json');
  url.searchParams.set('nojsoncallback', '1');
  for (const [k, v] of Object.entries(parametrit)) {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, String(v));
  }
  for (let yritys = 0; yritys < yrityksia; yritys++) {
    let vastaus;
    try {
      vastaus = await fetch(url, { signal: AbortSignal.timeout(20000) });
    } catch (virhe) {
      console.error(`  ${metodi}: verkkovirhe (${virhe.message}), yritys ${yritys + 1}/${yrityksia}`);
      await nuku(2000 * (yritys + 1));
      continue;
    }
    if (vastaus.status === 429 || vastaus.status === 503) {
      console.error(`  ${metodi}: HTTP ${vastaus.status}, peräydytään (yritys ${yritys + 1}/${yrityksia})`);
      await nuku(3000 * (yritys + 1));
      continue;
    }
    if (!vastaus.ok) {
      console.error(`  ${metodi}: HTTP ${vastaus.status}`);
      return null;
    }
    const data = await vastaus.json();
    if (data.stat !== 'ok') {
      // Flickr palauttaa virheet stat:"fail" + code/message -kentillä.
      // 100 = avain ei kelpaa; ei koskaan tulosteta itse avainta.
      console.error(`  ${metodi}: Flickr-virhe ${data.code}: ${data.message}`);
      if (data.code === 100) {
        console.error('  Tarkista FLICKR_API_KEY-salaisuuden arvo.');
        return null;
      }
      await nuku(2000 * (yritys + 1));
      continue;
    }
    return data;
  }
  return null;
}

/** Lataa kuvatiedoston levylle. */
export async function lataaKuva(hyvaksytty, kuvaKansio) {
  const vastaus = await fetch(hyvaksytty.kuvaUrl, { signal: AbortSignal.timeout(60000) });
  if (!vastaus.ok) {
    console.error(`  lataus epäonnistui (HTTP ${vastaus.status}): ${hyvaksytty.id}`);
    return null;
  }
  const data = Buffer.from(await vastaus.arrayBuffer());
  const tiedostonimi = `flickr-${hyvaksytty.id}.jpg`;
  const polku = join(kuvaKansio, tiedostonimi);
  writeFileSync(polku, data);
  return tiedostonimi;
}

/**
 * Koko haku- ja todennusputki yhtenä funktiona: hakee, todentaa ja
 * kokoaa manifestin. `kutsu`, `lataa` ja `tauko` ovat injektoitavia,
 * jotta tests/hae-flickr.test.mjs voi ajaa koko putken tallennetuilla
 * esimerkkivastauksilla ilman verkkoa ja ilman odottelua.
 */
export async function suoritaHaku({
  avain, haku, lat, lon, sade = '10', woe, maara = 20, kuiva = false, kuvaKansio,
  kutsu = flickrKutsu, lataa = lataaKuva, tauko = nuku,
}) {
  const hakuParametrit = {
    text: haku,
    license: [...KELPAAVAT_LISENSSIT].join(','),
    extras: 'license,owner_name,path_alias,url_o,url_k,url_h,o_dims,date_taken',
    sort: 'interestingness-desc',
    content_type: 1,
    per_page: maara,
    media: 'photos',
  };
  if (woe) {
    hakuParametrit.woe_id = woe;
  } else if (lat && lon) {
    hakuParametrit.lat = lat;
    hakuParametrit.lon = lon;
    hakuParametrit.radius = sade;
    hakuParametrit.radius_units = 'km';
  }

  const hakuData = await kutsu(avain, 'flickr.photos.search', hakuParametrit);
  const osumat = hakuData?.photos?.photo ?? [];

  if (!kuiva && kuvaKansio && !existsSync(kuvaKansio)) mkdirSync(kuvaKansio, { recursive: true });

  const hyvaksytyt = [];
  const hylatyt = [];
  for (let i = 0; i < osumat.length; i++) {
    const kuva = osumat[i];
    const infoData = await kutsu(avain, 'flickr.photos.getInfo', { photo_id: kuva.id, secret: kuva.secret });
    const tulos = arvioiEhdokas(kuva, infoData?.photo ?? null);
    if (tulos.hylatty) {
      hylatyt.push({ id: kuva.id, syy: tulos.hylatty });
    } else {
      const h = tulos.hyvaksytty;
      const tiedosto = kuiva ? null : await lataa(h, kuvaKansio);
      hyvaksytyt.push({ ...h, tiedosto });
    }
    if (i < osumat.length - 1) await tauko(2000);
  }

  return {
    haku,
    paikka: woe ? { woe } : (lat && lon ? { lat: Number(lat), lon: Number(lon), sadeKm: Number(sade) } : null),
    hyvaksytyt,
    hylatyt,
  };
}

// --- ajo ----------------------------------------------------------------------
//
// Vain suoraan ajettaessa — pelkkä `import` (esim. testistä) ei saa
// käynnistää verkkohakua eikä vaatia FLICKR_API_KEYtä. Sama vartio
// kuin tools/hae-vuorikuvat.mjs:ssä.

const ajossa = process.argv[1] ? pathToFileURL(process.argv[1]).href : null;
if (import.meta.url === ajossa) {
  if (!process.env.NODE_USE_ENV_PROXY && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
    const ajo = spawnSync(process.execPath, [fileURLToPath(import.meta.url), ...process.argv.slice(2)], {
      stdio: 'inherit',
      env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
    });
    process.exit(ajo.status ?? 1);
  }

  const AVAIN = (process.env.FLICKR_API_KEY ?? '').trim();
  if (!AVAIN) {
    console.error('Flickrin API-avainta ei löytynyt ympäristöstä (FLICKR_API_KEY).');
    console.error('');
    console.error('Hae avain osoitteesta https://www.flickr.com/services/apps/create/');
    console.error('ja tallenna se repon salaisuuksiin (Settings > Secrets and variables >');
    console.error('Actions) nimellä FLICKR_API_KEY. Työnkulku .github/workflows/hae-flickr.yml');
    console.error('välittää sen ympäristömuuttujana vain hakuaskeleelle.');
    console.error('Älä koskaan aja tätä niin, että avain näkyy komentorivillä.');
    process.exit(1);
  }

  const argv = process.argv.slice(2);
  const valitsin = (nimi, oletus = null) => {
    const i = argv.indexOf(`--${nimi}`);
    return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : oletus;
  };
  const kuiva = argv.includes('--kuiva');

  const haku = valitsin('haku');
  if (!haku) {
    console.error('käyttö: node tools/hae-flickr.mjs --haku "hakusanat" [--lat NN --lon NN [--sade KM]] [--woe ID] [--maara N]');
    process.exit(1);
  }

  const lat = valitsin('lat');
  const lon = valitsin('lon');
  const sade = valitsin('sade', '10');
  const woe = valitsin('woe');
  const maara = Math.max(1, Math.min(200, Number(valitsin('maara', '20'))));
  const tunnisteOsa = haku.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50) || 'haku';
  const ulosPolku = valitsin('ulos', join(JUURI, 'tools', 'flickr-aineisto', `${tunnisteOsa}.json`));
  const kuvaKansio = valitsin('kansio', join(JUURI, 'tools', 'flickr-aineisto', 'kuvat'));

  console.log(`Haku: "${haku}"${lat && lon ? ` (${lat},${lon} ±${sade}km)` : ''}${woe ? ` (woe=${woe})` : ''}`);
  console.log('Avain löytyi ympäristöstä (arvoa ei tulosteta). Lisenssirajaus: CC BY/CC BY-SA/CC0/PDM.\n');

  const tulos = await suoritaHaku({ avain: AVAIN, haku, lat, lon, sade, woe, maara, kuiva, kuvaKansio });
  const { hyvaksytyt, hylatyt } = tulos;
  console.log(`${hyvaksytyt.length + hylatyt.length} osumaa hausta, todennettu (2 s väli latausten välissä).\n`);
  for (const h of hylatyt) console.log(`  HYLÄTTY  ${h.id}: ${h.syy}`);
  for (const h of hyvaksytyt) console.log(`  OK       ${h.id}: ${h.leveys}px, ${h.lisenssi}, ${h.tekija}`);

  const manifesti = { ...tulos, haettu: new Date().toISOString() };

  if (!kuiva) {
    mkdirSync(dirname(ulosPolku), { recursive: true });
    writeFileSync(ulosPolku, `${JSON.stringify(manifesti, null, 2)}\n`);
    console.log(`\nManifesti kirjoitettu: ${ulosPolku}`);
    console.log(`Kuvat kansiossa: ${kuvaKansio}`);
  } else {
    console.log('\n--kuiva: manifestia tai kuvia ei kirjoitettu levylle.');
  }

  console.log(`\nYhteensä ${hyvaksytyt.length} hyväksyttyä, ${hylatyt.length} hylättyä.`);
  console.log('MUISTA: jokainen hyväksytty kuva silmätarkistetaan ennen peliin liittämistä');
  console.log('(ks. docs/moduulit/kaupunkilehti.md, Flickr-osio).');
}
