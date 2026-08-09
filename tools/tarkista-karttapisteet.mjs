/*
 * Tarkistaa, osuuko kohdekartan piste maalle vai veteen — pelin omalla
 * karttapiste()-funktiolla, ei silmällä.
 *
 * MIKSI TÄMÄ ON OLEMASSA. Kohdekartan pisteet asemoidaan prosentteina
 * rajauksesta, ja aineiston koordinaatti voi silti osua veteen: ranta
 * kaartaa, laituri on rannan ulkopuolella, tai rajaus on niin tiukka
 * että viidenkymmenen metrin heitto näkyy. Dubain kartassa kaksi
 * pistettä kuudesta osui lahdelmaan (Sheikh Saeedin talo ja
 * laituripiste), eikä sitä huomannut kuvaa katsomalla — piste on
 * numeroympyrä, joka peittää alleen juuri sen kohdan, jota pitäisi
 * arvioida.
 *
 * Työkalu lukee kartan PNG:stä pikselin värin kustakin pisteestä ja
 * vertaa sitä piirtäjän vesisävyyn (#e8d5a9, ks. VESI-vakio
 * tools/piirra-kaupunkikartta.mjs:ssä). Vastaus on siis samasta
 * kuvasta, jonka pelaaja näkee.
 *
 * Käyttö:
 *   node tools/tarkista-karttapisteet.mjs dubai
 *   node tools/tarkista-karttapisteet.mjs dubai '[["Testi",25.26,55.29]]'
 *
 * Ilman toista argumenttia tarkistetaan kartan omat kohteet
 * maakartat.js:stä. Toisena argumenttina voi antaa JSON-listan
 * [[nimi, lat, lon], ...], kun pistettä vasta etsitään.
 *
 * TÄMÄ EI KORVAA SILMÄTARKISTUSTA. Työkalu kertoo vain, onko piste
 * vedessä. Se ei näe, meneekö numeroympyrä toisen päälle, jääkö
 * kohde kuvan reunaan tai onko rajaus mielekäs — ne katsotaan
 * kuvasta niin kuin ennenkin.
 *
 * "VESI" EI AINA OLE VIRHE, joten paluuarvo on lippu ihmiselle eikä
 * tuomio. Silta on vedellä määritelmän mukaan (Rialto, Ha'penny),
 * majakka seisoo aallonmurtajan nokassa (Odessa), ja satama-altaan
 * kohde osoittaa itse altaaseen (Marseillen Vanhasatama). Nämä ovat
 * oikein. Tarkistettava on se piste, jonka pitäisi olla kuivalla
 * maalla ja joka ei ole.
 *
 * Koko kartaston ajo 9.8.2026 löysi neljä tarkistettavaa, ja kaikki
 * neljä on korjattu. Kolme niistä osoittautui TYÖKALUN vioiksi eikä
 * huonoiksi koordinaateiksi, mikä on tämän tarkistimen paras
 * saavutus tähän mennessä:
 *
 *  - Tukholmassa neljä kuudesta kohteesta oli vedessä, koska
 *    vesirelaation sisärenkaat (Kungsholmen, Södermalm) jäivät
 *    piirtämättä reikinä ja täyttö valui saarten päälle;
 *  - Madridin Cibeleen aukio ja Tukholman Sergelin tori upposivat
 *    aukion omaan suihkulähteeseen, joka piirtyi vetenä;
 *  - Lontoon silmä ja Venetsian Arsenaali olivat oikeasti rannan
 *    väärällä puolella, ja niiden pisteet siirrettiin.
 *
 * Nykyisin jäljellä olevat osumat ovat kaikki oikeita: neljä siltaa,
 * majakka aallonmurtajalla, Marseillen satama-allas ja Dubain
 * abra-laiturit rantaviivalla.
 *
 * PNG puretaan tässä itse (zlib + suodatinrivit) eikä selaimella:
 * Chromiumin --dump-dom ei ehdi nähdä canvasista luettua tulosta, ja
 * pelkkää värin lukemista varten ei kannata käynnistää selainta.
 * Tuettuna 8-bittinen RGB ja RGBA, joita piirtäjä tuottaa.
 */
import { readFileSync } from 'node:fs';
import { inflateSync } from 'node:zlib';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/*
 * Piirtäjän vesisävy ja suurin hyväksytty poikkeama (RGB-summa).
 *
 * YKSI PIKSELI EI RIITÄ, ja se opittiin kantapään kautta. Ensimmäinen
 * versio luki tarkalleen yhden pikselin, ja se antoi vääriä osumia:
 * paperin (#f6eeda) ja kadun (#c8bb9e) välinen pehmennetty reuna
 * osuu puolivälissä arvoon (223, 212, 188), jonka etäisyys vedestä on
 * 29 eli juuri rajan alla. Kadunreunalle osunut piste ilmoitettiin
 * siis vetenä. Tukholmassa se näytti neljältä upotetulta kohteelta,
 * vaikka osa niistä seisoi kuivalla kadulla.
 *
 * Siksi jokaisesta pisteestä luetaan kiekko ja lasketaan, kuinka
 * moni pikseli on vettä. Pehmennetty viiva on pari pikseliä leveä
 * eikä koskaan täytä kiekkoa, mutta lahdelma täyttää.
 */
const VESI = [0xe8, 0xd5, 0xa9];
const RAJA = 30;
const SADE = 5;        // kiekon säde pikseleinä
const OSUUS = 0.6;     // näin suuren osan kiekosta oltava vettä

function puraPng(polku) {
  const b = readFileSync(polku);
  let i = 8;
  let leveys = 0;
  let korkeus = 0;
  let syvyys = 0;
  let tyyppi = 0;
  const palat = [];
  while (i < b.length) {
    const pit = b.readUInt32BE(i);
    const nimi = b.toString('ascii', i + 4, i + 8);
    const data = b.subarray(i + 8, i + 8 + pit);
    if (nimi === 'IHDR') {
      leveys = data.readUInt32BE(0);
      korkeus = data.readUInt32BE(4);
      syvyys = data[8];
      tyyppi = data[9];
    } else if (nimi === 'IDAT') {
      palat.push(data);
    }
    i += 12 + pit;
  }
  if (syvyys !== 8 || (tyyppi !== 2 && tyyppi !== 6)) {
    throw new Error(`tukematon PNG: syvyys ${syvyys}, tyyppi ${tyyppi}`);
  }
  const kanavat = tyyppi === 6 ? 4 : 3;
  const raaka = inflateSync(Buffer.concat(palat));
  const rivi = leveys * kanavat;
  const ulos = Buffer.alloc(korkeus * rivi);
  let p = 0;
  // PNG:n rivisuodattimet (0-4) puretaan järjestyksessä: jokainen rivi
  // viittaa jo purettuun edelliseen riviin.
  for (let y = 0; y < korkeus; y += 1) {
    const suodatin = raaka[p];
    p += 1;
    for (let x = 0; x < rivi; x += 1) {
      const nyt = raaka[p + x];
      const a = x >= kanavat ? ulos[y * rivi + x - kanavat] : 0;
      const ylla = y > 0 ? ulos[(y - 1) * rivi + x] : 0;
      const vino = (x >= kanavat && y > 0) ? ulos[(y - 1) * rivi + x - kanavat] : 0;
      let arvo;
      if (suodatin === 0) arvo = nyt;
      else if (suodatin === 1) arvo = nyt + a;
      else if (suodatin === 2) arvo = nyt + ylla;
      else if (suodatin === 3) arvo = nyt + ((a + ylla) >> 1);
      else {
        const pp = a + ylla - vino;
        const pa = Math.abs(pp - a);
        const pb = Math.abs(pp - ylla);
        const pc = Math.abs(pp - vino);
        arvo = nyt + ((pa <= pb && pa <= pc) ? a : (pb <= pc ? ylla : vino));
      }
      ulos[y * rivi + x] = arvo & 0xff;
    }
    p += rivi;
  }
  return { leveys, korkeus, kanavat, data: ulos };
}

const ero = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);

const avain = process.argv[2];
if (!avain) {
  console.error('Käyttö: node tools/tarkista-karttapisteet.mjs <kaupunki> [pisteet-json]');
  process.exit(1);
}

const { KAUPUNKIKARTAT, karttapiste } = await import(`${JUURI}/js/packs/maakartat.js`);
const kartta = KAUPUNKIKARTAT[avain];
if (!kartta) {
  console.error(`tuntematon kartta: ${avain}`);
  console.error(`tunnetut: ${Object.keys(KAUPUNKIKARTAT).join(', ')}`);
  process.exit(1);
}

const pisteet = process.argv[3]
  ? JSON.parse(process.argv[3])
  : (kartta.kohteet ?? []).map((k) => [k.nimi, k.lat, k.lon]);

if (!pisteet.length) {
  console.error(`kartalla ${avain} ei ole kohteita eikä pisteitä annettu`);
  process.exit(1);
}

const kuva = puraPng(`${JUURI}/${kartta.polku}`);
const pikseli = (px, py) => {
  const k = (py * kuva.leveys + px) * kuva.kanavat;
  return [kuva.data[k], kuva.data[k + 1], kuva.data[k + 2]];
};

let vedessa = 0;
for (const [nimi, lat, lon] of pisteet) {
  const { x, y } = karttapiste(kartta, lat, lon);
  const px = Math.min(Math.max(Math.round((x / 100) * kuva.leveys), 0), kuva.leveys - 1);
  const py = Math.min(Math.max(Math.round((y / 100) * kuva.korkeus), 0), kuva.korkeus - 1);
  let vesipikseleita = 0;
  let kaikki = 0;
  for (let dy = -SADE; dy <= SADE; dy += 1) {
    for (let dx = -SADE; dx <= SADE; dx += 1) {
      if (dx * dx + dy * dy > SADE * SADE) continue;
      const ax = px + dx;
      const ay = py + dy;
      if (ax < 0 || ay < 0 || ax >= kuva.leveys || ay >= kuva.korkeus) continue;
      kaikki += 1;
      if (ero(pikseli(ax, ay), VESI) < RAJA) vesipikseleita += 1;
    }
  }
  const osuus = kaikki ? vesipikseleita / kaikki : 0;
  const hex = pikseli(px, py).map((n) => n.toString(16).padStart(2, '0')).join('');
  const vesi = osuus >= OSUUS;
  if (vesi) vedessa += 1;
  const sijainti = `${x.toFixed(1).padStart(5)}% ${y.toFixed(1).padStart(5)}%`;
  const prosentti = `${Math.round(osuus * 100)}`.padStart(3);
  console.log(`${String(nimi).padEnd(24)} ${sijainti}  #${hex}  vettä ${prosentti} %  ${vesi ? 'VESI' : 'maa'}`);
}

console.log(vedessa ? `\n${vedessa} pistettä vedessä — siirrä ne rannalle.` : '\nkaikki pisteet maalla');
process.exitCode = vedessa ? 1 : 0;
