/*
 * Hakee kaikki pelin kiinteät Commons-kuvat repoon.
 *
 * Aja:  node tools/fetch-photos.mjs
 *
 * Miksi: Commonsin tiedostonimet vanhenevat ilman varoitusta (kuva
 * nimetään uudelleen tai poistetaan), jolloin peliin jää rikkinäinen
 * kuva. Lisäksi Commons rajoittaa peräkkäisiä pyyntöjä, joten kuvat
 * latautuvat hitaasti ja epäluotettavasti. Paikallisina ne ovat aina
 * paikallaan, latautuvat heti ja toimivat ilman verkkoa.
 *
 * Skripti lukee `tiedosto: '...'` -viittaukset js/packs-kansiosta ja
 * js/ui.js:stä, joten uudet kuvat tulevat mukaan ilman käsityötä.
 * Valmiiksi haetut ohitetaan, joten ajon voi toistaa.
 *
 * HUOM: tämä kattaa vain kiinteät viittaukset. Tutki-ikkunan "Lue lisää"
 * -galleria hakee kuvalistan Wikipedian rajapinnasta ajossa, eikä sitä
 * voi ladata etukäteen — service worker tallettaa ne ensimmäisen
 * katselun jälkeen.
 *
 * Lisenssit on varmistettu tiedostokohtaisesti sisältötiedostoissa, ja
 * lähde näkyy pelissä kuvatekstissä. Paikallinen kopio ei muuta sitä.
 */
import fs from 'node:fs';
import path from 'node:path';

const LEVEYS = 1000;             // sama kuin aiemmin haetuilla valokuvilla
const KANSIO = 'assets/valokuvat';
const KARTTA = 'js/packs/valokuvat-paikalliset.js';
const UA = 'AfrikanTahti-kuvahaku/1.0 (opetuspeli; https://github.com/ravelius/afrikan-tahti)';

/*
 * Kaikki `tiedosto: '...'` -viittaukset. Molemmat lainausmerkit käyvät:
 * heittomerkin sisältävä nimi (Château d'If) on lähteessä helpompi
 * kirjoittaa kaksinkertaisilla lainausmerkeillä. Kenoviivalla suojatut
 * merkit puretaan.
 */
function kaikkiViittaukset() {
  const nimet = new Set();
  const poimi = (sisalto) => {
    for (const osuma of sisalto.matchAll(/tiedosto: (?:'((?:[^'\\]|\\.)+)'|"((?:[^"\\]|\\.)+)")/g)) {
      const raaka = osuma[1] ?? osuma[2];
      nimet.add(raaka.replace(/\\(['"\\])/g, '$1'));
    }
  };
  for (const tiedosto of fs.readdirSync('js/packs')) {
    poimi(fs.readFileSync(path.join('js/packs', tiedosto), 'utf8'));
  }
  poimi(fs.readFileSync('js/ui.js', 'utf8'));
  poimi(fs.readFileSync('js/sisaltotaulut.js', 'utf8'));
  return [...nimet].sort();
}

/** Nykyinen kartta luetaan sellaisenaan, jotta jo haetut nimet säilyvät. */
function vanhaKartta() {
  const parit = new Map();
  if (!fs.existsSync(KARTTA)) return parit;
  const sisalto = fs.readFileSync(KARTTA, 'utf8');
  for (const osuma of sisalto.matchAll(/\[("(?:[^"\\]|\\.)*"), '([^']+)'\]/g)) {
    parit.set(JSON.parse(osuma[1]), osuma[2]);
  }
  return parit;
}

/** Commonsin nimestä siisti paikallinen nimi; törmäykset erotellaan numerolla. */
function paikallinenNimi(tiedosto, varatut) {
  const paate = (tiedosto.match(/\.(jpe?g|png|gif|webp)$/i)?.[1] ?? 'jpg').toLowerCase();
  const runko = tiedosto
    .replace(/\.[^.]+$/, '')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
  let nimi = `${runko}.${paate === 'jpeg' ? 'jpg' : paate}`;
  let n = 2;
  while (varatut.has(nimi)) { nimi = `${runko}-${n}.${paate === 'jpeg' ? 'jpg' : paate}`; n += 1; }
  return nimi;
}

const kartta = vanhaKartta();
const varatut = new Set(kartta.values());
const lista = kaikkiViittaukset();
const puuttuvat = lista.filter((t) => !kartta.has(t));
console.log(`${lista.length} kuvaviittausta, ${kartta.size} jo repossa, ${puuttuvat.length} haettavaa`);

fs.mkdirSync(KANSIO, { recursive: true });
let haettu = 0;
let virheita = 0;
for (const tiedosto of puuttuvat) {
  const nimi = paikallinenNimi(tiedosto, varatut);
  // Keskeytynyt ajo voi jatkua: valmiiksi haettu tiedosto vain kirjataan.
  if (fs.existsSync(path.join(KANSIO, nimi))) {
    varatut.add(nimi);
    kartta.set(tiedosto, nimi);
    console.log('on jo', nimi);
    continue;
  }
  const osoite = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(tiedosto)}?width=${LEVEYS}`;
  const vastaus = await fetch(osoite, { redirect: 'follow', headers: { 'User-Agent': UA } })
    .catch((virhe) => ({ ok: false, status: virhe.message }));
  if (!vastaus.ok) {
    // 404 = tiedosto on kadonnut Commonsista; se pitää korjata sisältöön.
    console.error('VIRHE', vastaus.status, tiedosto);
    virheita += 1;
    continue;
  }
  const data = Buffer.from(await vastaus.arrayBuffer());
  fs.writeFileSync(path.join(KANSIO, nimi), data);
  varatut.add(nimi);
  kartta.set(tiedosto, nimi);
  haettu += 1;
  console.log('haettu', nimi, `${Math.round(data.length / 1024)} kt`);
  // Commons rajoittaa nopeaa pyyntösarjaa; pieni tauko riittää.
  await new Promise((r) => { setTimeout(r, 900); });
}

const rivit = [...kartta.entries()]
  .sort((a, b) => (a[0] < b[0] ? -1 : 1))
  .map(([a, b]) => `  [${JSON.stringify(a)}, '${b}'],`)
  .join('\n');
fs.writeFileSync(KARTTA, `// Matkakirjan valokuvien paikalliset kopiot (generoitu: node tools/fetch-photos.mjs,
// leveys ${LEVEYS} px). Peli käyttää näitä Commonsin sijaan: lataus on nopea, kuvat
// toimivat offline eivätkä hajoa jos Commonsista poistetaan tiedosto. Lähde ja
// lisenssi näkyvät selitteissä, ja alkuperäinen tiedostonimi toimii yhä avaimena
// ja Commons-linkkinä. Älä muokkaa käsin.
export const VALOKUVAT_PAIKALLISET = new Map([
${rivit}
]);
`);
console.log(`kirjoitettu ${KARTTA}: ${kartta.size} kuvaa, haettiin ${haettu}, virheitä ${virheita}`);
