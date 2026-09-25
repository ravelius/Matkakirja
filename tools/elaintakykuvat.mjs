/*
 * ELÄINTÄKYJEN KUVAT REPOON — pienennys ja pakkaus yhdellä ajolla.
 *
 * Lähde on omistajan itse generoimat eläinkuvat (1536 x 1024 JPEG),
 * ja kortissa kuva näkyy enintään noin 34 remin levyisenä
 * (css/fokusnosto.css .fokusnosto-kortti), eli retinallakin reilusti
 * alle tuhat pikseliä. Kuvat viedään siksi 960 pikselin levyisinä —
 * sama luokka kuin kohtaamiskuvilla (512) ja aarrekuvilla (640), mutta
 * leveämpi, koska eläinkuva on vaakakuva kortin koko leveydeltä.
 *
 * ── KAIKKI KUVAT OVAT 3:2 (960 x 640) ──────────────────────────────
 *
 * Kortti varaa kuvalle vaakasuorakaiteen, ja 27 ensimmäistä kuvaa
 * syntyivät valmiiksi 3:2-lähteistä. Myöhemmät erät ovat neliöitä
 * (1536 x 1536), joten työkalu rajaa: se ottaa suurimman 3:2-ikkunan,
 * joka lähteeseen mahtuu, ja keskittää sen pystysuunnassa. Valmiiseen
 * 3:2-lähteeseen rajaus ei kosketa (ikkuna on koko kuva), joten vanhat
 * kuvat syntyvät uudelleen entisellään.
 *
 * ── RAJAUSPOIKKEUKSET: KUN ELÄIN EI MAHDU IKKUNAAN ─────────────────
 *
 * Eläin on kuvassa kokonaan tai kuva on väärä: leikattu tassu tai
 * sarvenkärki näyttää huolimattomalta juuri siinä kortissa, jonka koko
 * sisältö on se eläin. Neliölähteessä pystysuora kohde voi olla
 * korkeampi kuin 2/3 leveydestä (TUR: angoravuohi täyttää 1536:sta
 * noin 1160 pikseliä, ikkunaan mahtuisi 1024), jolloin mikään rajaus
 * ei säilytä sitä kokonaan. Silloin kuvaan lisätään sivureunat
 * peilaamalla: taustaa jatketaan kuvan omalla, peilatulla reunalla,
 * jolloin 3:2-ikkuna leviää ja korkeutta tulee lisää. Sauma on
 * jatkuva, ja lähteen tausta on epätarkka ylänkö, joten peilaus ei
 * näy. Reunan voi jättää myös toiselle puolelle kokonaan pois, jos
 * siellä on ihminen tai muu hahmo, jonka kahdentuminen näkyisi (BIH).
 * Poikkeus on eläinkohtainen ja kirjataan alle, jotta ajo toistuu
 * samanlaisena.
 *
 * PAKKAUS TEHDÄÄN CHROMIUMIN CANVASILLA (sama kaava kuin
 * tools/leikkaa-miniatyyrit.mjs): repossa ei ole sharpia eikä
 * natiivikoodattua kuvakirjastoa, ja selain on joka tapauksessa
 * asennettuna savukkeita varten.
 *
 * Käyttö:
 *   node tools/elaintakykuvat.mjs <lähdekansio> [--laatu 0.82]
 *
 * Lähdekansiossa tiedostot ovat muotoa *elain-<maatunnus>-<elain>.jpg;
 * ulos kirjoitetaan assets/elaimet/elain-<maatunnus>.jpg.
 *
 * TEKIJÄNOIKEUS: kuvat ovat omistajan omia generoituja kuvia, joten
 * niillä ei ole Commons-lähderiviä eikä CC-attribuutiota (vrt.
 * js/packs/africa-valokuvat.js valokuvat, joilla on).
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const KOHDE = resolve(JUURI, 'assets/elaimet');

const argv = process.argv.slice(2);
const lahde = argv.find((a) => !a.startsWith('--'));
const laatuArg = argv.indexOf('--laatu');
const LAATU = laatuArg >= 0 ? Number(argv[laatuArg + 1]) : 0.82;
const LEVEYS = 960;
const SUHDE = 3 / 2;

/**
 * Maatunnus → rajauspoikkeus, kun keskitetty 3:2-ikkuna leikkaisi eläintä.
 *
 * `reunat` on pikseleinä kummallekin sivulle peilattavan taustan määrä
 * (leveämpi ikkuna = korkeampi ikkuna) ja `ylareuna` ikkunan yläreuna
 * lähdekuvan pikseleinä (ilman sitä ikkuna keskitetään pystysuunnassa).
 * Reunan voi antaa myös toispuolisena (`vasen`/`oikea`), kun toisella
 * laidalla on kuvassa jotain, mitä ei saa kahdentaa — peilaus toistaa
 * reunan sisällön, ja ihminen tai muu tunnistettava hahmo paljastaisi
 * tempun heti. `reunat` on näiden molempien oletus, joten vanhat
 * poikkeukset toimivat ennallaan.
 *
 * TUR: angoravuohen kili on 1536 pikselin neliössä sarvenkärjistä
 * (y ≈ 265) sorkkiin (y ≈ 1420), eli noin 1160 pikseliä korkea, kun
 * keskitettyyn ikkunaan mahtuisi 1024. Peilatut 170 pikselin reunat
 * nostavat ikkunan 1876 x 1251:een, ja yläreuna 217 asettaa kilin
 * keskelle: sarville ja sorkille jää noin 20 pikselin ilma.
 *
 * BIH: tornjakinpentu juoksee kohti kameraa korvankärjistä (y ≈ 285)
 * etutassuihin (y ≈ 1465), eli noin 1180 pikseliä — sekin yli
 * keskitetyn 1024:n. Peilaus tehdään vain vasemmalle (300 px), koska
 * oikeassa laidassa kyykkii paimen: symmetrinen peilaus monistaisi
 * hänet toiseksi ihmiseksi kuvan reunaan. Vasen laita on rinnettä,
 * laidunta ja lammaslauman reuna, joka kestää jatkamisen. Ikkunaksi
 * tulee 1836 x 1224 ja yläreunaksi 263: korville ja tassuille jää noin
 * 20 pikselin ilma, ja kinnas on kokonaan mukana.
 */
const RAJAUSPOIKKEUKSET = {
  tur: { reunat: 170, ylareuna: 217 },
  bih: { vasen: 300, oikea: 0, ylareuna: 263 },
};

if (!lahde || !existsSync(lahde)) {
  console.error('Käyttö: node tools/elaintakykuvat.mjs <lähdekansio> [--laatu 0.82]');
  process.exit(1);
}

const tiedostot = readdirSync(lahde).filter((n) => /\.jpe?g$/i.test(n)).sort();
if (!tiedostot.length) {
  console.error(`Ei .jpg-kuvia kansiossa ${lahde}`);
  process.exit(1);
}

mkdirSync(KOHDE, { recursive: true });

// Playwright repon node_modulesista, muuten kontin globaalista
// (tools/savukkeet/README.md).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
});
const sivu = await selain.newPage();

let yhteensa = 0;
for (const nimi of tiedostot) {
  const tunnus = basename(nimi).match(/elain-([a-z]{3})-/i)?.[1]?.toLowerCase();
  if (!tunnus) {
    console.warn(`ohitetaan (ei maatunnusta nimessä): ${nimi}`);
    continue;
  }
  const b64 = readFileSync(resolve(lahde, nimi)).toString('base64');
  const poikkeus = RAJAUSPOIKKEUKSET[tunnus] ?? {};
  const ulos = await sivu.evaluate(async ({ data, leveys, laatu, suhde, vasen, oikea, ylareuna }) => {
    const kuva = new Image();
    kuva.src = `data:image/jpeg;base64,${data}`;
    await kuva.decode();

    // Peilatut sivureunat (vain poikkeuksille; muuten lahde = kuva).
    const lahdeLeveys = kuva.width + vasen + oikea;
    let lahdeKuva = kuva;
    if (vasen > 0 || oikea > 0) {
      const tyo = document.createElement('canvas');
      tyo.width = lahdeLeveys;
      tyo.height = kuva.height;
      const t = tyo.getContext('2d');
      t.imageSmoothingEnabled = true;
      t.imageSmoothingQuality = 'high';
      for (const siirto of [vasen, vasen + 2 * kuva.width]) {
        t.save();
        t.translate(siirto, 0);
        t.scale(-1, 1);
        t.drawImage(kuva, 0, 0);
        t.restore();
      }
      t.drawImage(kuva, vasen, 0);
      lahdeKuva = tyo;
    }

    // Suurin 3:2-ikkuna, joka lähteeseen mahtuu.
    let iw = lahdeLeveys;
    let ih = Math.round(iw / suhde);
    if (ih > kuva.height) {
      ih = kuva.height;
      iw = Math.round(ih * suhde);
    }
    const ix = Math.round((lahdeLeveys - iw) / 2);
    const iy = Number.isFinite(ylareuna)
      ? Math.max(0, Math.min(kuva.height - ih, ylareuna))
      : Math.round((kuva.height - ih) / 2);

    const w = Math.min(leveys, iw);
    const h = Math.round(w / suhde);
    const kanvaasi = document.createElement('canvas');
    kanvaasi.width = w;
    kanvaasi.height = h;
    const piirto = kanvaasi.getContext('2d');
    piirto.imageSmoothingEnabled = true;
    piirto.imageSmoothingQuality = 'high';
    piirto.drawImage(lahdeKuva, ix, iy, iw, ih, 0, 0, w, h);
    return { b64: kanvaasi.toDataURL('image/jpeg', laatu).split(',')[1], w, h, iw, ih };
  }, {
    data: b64,
    leveys: LEVEYS,
    laatu: LAATU,
    suhde: SUHDE,
    vasen: poikkeus.vasen ?? poikkeus.reunat ?? 0,
    oikea: poikkeus.oikea ?? poikkeus.reunat ?? 0,
    ylareuna: poikkeus.ylareuna ?? null,
  });
  const puskuri = Buffer.from(ulos.b64, 'base64');
  writeFileSync(resolve(KOHDE, `elain-${tunnus}.jpg`), puskuri);
  yhteensa += puskuri.length;
  console.log(`elain-${tunnus}.jpg  ${ulos.w}x${ulos.h}  (ikkuna ${ulos.iw}x${ulos.ih})  `
    + `${(puskuri.length / 1024).toFixed(0)} kt`);
}
console.log(`\nYhteensä ${(yhteensa / 1024 / 1024).toFixed(2)} Mt kansioon assets/elaimet/`);

await selain.close();
