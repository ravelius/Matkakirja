/*
 * KUVA EI LIIKU — MITTARI (js/nostokuva.js).
 *
 * Omistajan vaatimus 11.9.2026 on, että kaksivaiheisessa avauksessa
 * kuva pysyy TÄSMÄLLEEN paikallaan: *"tekstit ja muut elementit
 * ilmaantuvat sen ympärille ilman että kuva välähtää tai liikkuu
 * yhtään."* Sitä ei voi todistaa yksikkötestillä, koska Nodessa ei ole
 * asettelua — se on mitattava oikeassa selaimessa.
 *
 * Tämä mittari avaa jokaisen KARTALTA AVAUTUVAN korttityypin oikeassa
 * Chromiumissa, lukee kuvan `getBoundingClientRect()`-laatikon ENNEN
 * "Lisää"-painallusta ja JÄLKEEN sen, ja vertaa lukuja. Ainoa
 * hyväksytty ero on nolla. Mitta otetaan kolmella näyttömitalla
 * (iPad 834x1194 ja 1194x834, puhelin 390x844) ja kahdella
 * kuvasuhteella (vaaka 3:2, pysty 4:5).
 *
 * Ajo:  PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node tools/mittaa-nostokuva.mjs
 *       (lisää `--kuvat` jos haluat kaappaukset molemmista vaiheista)
 *
 * MITTAUSSIVU ON OMA, EI PELI. Kortit avataan suoraan moduulien
 * avausfunktioilla (avaaSkandaali, avaaHetki, avaaSyvennys,
 * avaaElaintaky) pienellä tynkä-ui:lla — silloin mittaukseen ei tule
 * mukaan pelitilaa, verkkokuvia eikä laattalatauksia, ja jokainen
 * korttityyppi mitataan samalla kuvalla samoissa oloissa. Kuvat
 * generoidaan tässä tiedostossa (yksivärinen PNG), joten mittaus ei
 * riipu verkosta.
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { deflateSync } from 'node:zlib';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = fileURLToPath(new URL('..', import.meta.url));
const SELAIN = process.env.CHROMIUM ?? '/opt/pw-browsers/chromium';

/** Näyttömitat, joilla kortit mitataan. */
const RUUDUT = [
  ['iPad pysty', 834, 1194],
  ['iPad vaaka', 1194, 834],
  ['puhelin', 390, 844],
];

/** Kuvasuhteet: vaakakuva täyttää leveyden, pystykuva korkeuden. */
const KUVAT = [
  ['vaaka 3:2', 1536, 1024],
  ['pysty 4:5', 1103, 1426],
];

/** Mitattavat korttityypit (tunnus → mittaussivun avaaja). */
const TYYPIT = ['skandaali', 'skandaali-galleria', 'hetki', 'syvennys', 'elain', 'elain-karuselli'];

/* ==================== YKSIVÄRINEN PNG ==================== */

function crc32(puskuri) {
  let c = ~0;
  for (const tavu of puskuri) {
    c ^= tavu;
    for (let i = 0; i < 8; i++) c = (c >>> 1) ^ (0xEDB88320 & -(c & 1));
  }
  return ~c >>> 0;
}

function lohko(tyyppi, data) {
  const pituus = Buffer.alloc(4);
  pituus.writeUInt32BE(data.length);
  const runko = Buffer.concat([Buffer.from(tyyppi, 'latin1'), data]);
  const summa = Buffer.alloc(4);
  summa.writeUInt32BE(crc32(runko));
  return Buffer.concat([pituus, runko, summa]);
}

/** Yksivärinen RGB-PNG annetuissa mitoissa. */
function teePng(leveys, korkeus, [r, g, b]) {
  const rivi = Buffer.alloc(1 + leveys * 3);
  for (let x = 0; x < leveys; x++) {
    rivi[1 + x * 3] = r;
    rivi[2 + x * 3] = g;
    rivi[3 + x * 3] = b;
  }
  const raaka = Buffer.concat(Array.from({ length: korkeus }, () => rivi));
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(leveys, 0);
  ihdr.writeUInt32BE(korkeus, 4);
  ihdr[8] = 8; ihdr[9] = 2;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]),
    lohko('IHDR', ihdr),
    lohko('IDAT', deflateSync(raaka)),
    lohko('IEND', Buffer.alloc(0)),
  ]);
}

/* ==================== MITTAUSSIVU ==================== */

const SIVU = `<!doctype html>
<html lang="fi"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="/css/styles.css">
<style>html,body{margin:0;height:100%;background:#cdbb97}</style>
</head><body>
<script type="module">
import { avaaSkandaali } from '/js/skandaalit.js';
import { avaaHetki } from '/js/historian-hetket.js';
import { avaaSyvennys } from '/js/syvennys.js';
import { avaaElaintaky } from '/js/elaintaky.js';
import { ELAINTAKYT } from '/js/packs/elaintakyt.js';

const kuva = (n) => ({
  osoite: \`/__mittari/kuva\${n}.png\`,
  selite: 'Mittarin havainnekuva ' + n + ' — lyhyt kuvateksti riittää',
  lahde: 'Matkakirjan havainnekuva',
});
const teksti = ['Ensimmäinen kappale mittausta varten. '.repeat(6),
  'Toinen kappale mittausta varten. '.repeat(6)].join('\\n\\n');
const visa = { kysymys: 'Mittarin kysymys?', vaihtoehdot: ['a', 'b', 'c'], oikea: 0 };

const ui = {
  game: {
    pack: { id: 'mittari', map: { countryShapes: { FIN: { nimi: 'Suomi' } } } },
    minitehtavatVastatut: new Set(),
    actionMinitehtava: () => ({ ok: true }),
    actionElaintaky: () => ({ ok: true, uusi: false }),
  },
  buildToast: () => null,
  removeToast: () => {},
  onChange: () => {},
  renderTurnPill: () => {},
};

ELAINTAKYT.__MITTARI1 = {
  elain: 'mittarielain', otsikko: 'Mittarin eläin', teksti,
  lahde: 'https://example.invalid', kuvat: [{ url: '/__mittari/kuva1.png', kuvateksti: 'Mittarin eläin lähikuvassa', lahde: 'Matkakirjan havainnekuva' }],
};
ELAINTAKYT.__MITTARI2 = {
  elain: 'mittarielain', otsikko: 'Mittarin eläin', teksti,
  lahde: 'https://example.invalid',
  kuvat: [
    { url: '/__mittari/kuva1.png', kuvateksti: 'Mittarin eläin lähikuvassa', lahde: 'Matkakirjan havainnekuva' },
    { url: '/__mittari/kuva2.png', kuvateksti: 'Mittarin eläin kaukaa', lahde: 'Matkakirjan havainnekuva' },
  ],
};

window.__avaa = (tyyppi) => {
  if (tyyppi === 'skandaali' || tyyppi === 'skandaali-galleria') {
    avaaSkandaali(ui, 'FIN', {
      id: 'mittari', otsikko: 'Mittarin skandaali', nimio: 'Mittari',
      paikka: 'Mittarila', vuosi: 1873, kortti: 'Ingressi mittausta varten. '.repeat(4),
      teksti, visa,
      kuvat: tyyppi === 'skandaali' ? [kuva(1)] : [kuva(1), kuva(2)],
    });
    return;
  }
  if (tyyppi === 'hetki') {
    avaaHetki(ui, 'FIN', {
      id: 'mittari', otsikko: 'Mittarin hetki', paikka: 'Mittarila',
      paivays: '1. tammikuuta 1873', teksti, visa,
      // Hetken kuvat tulevat ämpäristä (js/packs/historian-hetket.js
      // hetkenKuvaOsoite); mittauksessa ne ohjataan paikallisiksi.
      kuvat: [
        { tiedosto: 'mittari1.jpg', kuvateksti: 'Mittarin hetki lähikuvassa' },
        { tiedosto: 'mittari2.jpg', kuvateksti: 'Mittarin hetki kaukaa' },
      ],
    });
    return;
  }
  if (tyyppi === 'syvennys') {
    avaaSyvennys(ui, 'mittarila', {
      id: 'mittari', otsikko: 'Mittarin syvennys', teksti, visa, kuva: kuva(1),
    }, { symboli: 'huuto' });
    return;
  }
  avaaElaintaky(ui, tyyppi === 'elain' ? '__MITTARI1' : '__MITTARI2');
};
window.__valmis = true;
</script></body></html>`;

/* ==================== PALVELIN ==================== */

const TYYPIT_MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};

function kaynnistaPalvelin(kuvat) {
  const palvelin = createServer(async (pyynto, vastaus) => {
    const polku = decodeURIComponent(new URL(pyynto.url, 'http://x').pathname);
    if (polku === '/' || polku === '/__mittari.html') {
      vastaus.writeHead(200, { 'content-type': TYYPIT_MIME['.html'] });
      vastaus.end(SIVU);
      return;
    }
    const kuva = kuvat.get(polku);
    if (kuva) {
      vastaus.writeHead(200, { 'content-type': 'image/png' });
      vastaus.end(kuva);
      return;
    }
    const tiedosto = join(JUURI, normalize(polku).replace(/^(\.\.[/\\])+/, ''));
    try {
      const tavut = await readFile(tiedosto);
      vastaus.writeHead(200, {
        'content-type': TYYPIT_MIME[extname(tiedosto)] ?? 'application/octet-stream',
      });
      vastaus.end(tavut);
    } catch {
      vastaus.writeHead(404).end('');
    }
  });
  return new Promise((valmis) => {
    palvelin.listen(0, '127.0.0.1', () => valmis({
      osoite: `http://127.0.0.1:${palvelin.address().port}`,
      sulje: () => new Promise((r) => palvelin.close(r)),
    }));
  });
}

/* ==================== MITTAUS ==================== */

/** Kuvan laatikko ennen ja jälkeen vaiheenvaihdon, samassa avauksessa. */
const MITTAA = async () => {
  const img = document.querySelector('.nostokuva-img');
  const lisaa = document.querySelector('.nostokuva-lisaa');
  if (!img || !lisaa) return { virhe: 'kuvaesittely ei auennut' };
  const laatikko = (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  };
  const ennen = laatikko(img);
  const kortti1 = document.querySelector('.nostokuva-kortti');
  const kortinYlaV1 = kortti1.getBoundingClientRect().top;
  lisaa.click();
  const jalkeen = laatikko(img);
  const kortti = document.querySelector('.nostokuva-kortti');
  return {
    ennen,
    jalkeen,
    kortinYlaV1,
    kortinYlaV2: kortti.getBoundingClientRect().top,
    sama: document.querySelector('.nostokuva-img') === img,
    nuolia: kortti.querySelectorAll('.skandaali-kuvanuoli, .hetki-kuvanuoli').length,
    pisteita: kortti.querySelectorAll('.elaintaky-karuselli-piste').length,
    vaihe2: kortti.classList.contains('nostokuva-vaihe2'),
  };
};

async function main() {
  const otaKuvat = process.argv.includes('--kuvat');
  const kuvat = new Map([
    ['/__mittari/kuva1.png', teePng(KUVAT[0][1], KUVAT[0][2], [120, 92, 48])],
    ['/__mittari/kuva2.png', teePng(KUVAT[0][1], KUVAT[0][2], [48, 92, 120])],
  ]);
  const palvelin = await kaynnistaPalvelin(kuvat);
  const paketti = await import('playwright');
  const chromium = paketti.chromium ?? paketti.default?.chromium;
  const selain = await chromium.launch({ executablePath: SELAIN });

  let virheita = 0;
  for (const [kuvanimi, kuvaLeveys, kuvaKorkeus] of KUVAT) {
    kuvat.set('/__mittari/kuva1.png', teePng(kuvaLeveys, kuvaKorkeus, [120, 92, 48]));
    kuvat.set('/__mittari/kuva2.png', teePng(kuvaLeveys, kuvaKorkeus, [48, 92, 120]));
    for (const [ruutunimi, leveys, korkeus] of RUUDUT) {
      const konteksti = await selain.newContext({
        viewport: { width: leveys, height: korkeus }, deviceScaleFactor: 2,
      });
      /*
       * ÄMPÄRIN KUVAT PAIKALLISIKSI: hetken kuvaosoite on kiinteä
       * ämpärijuuri, eikä mittaus saa riippua verkosta.
       */
      await konteksti.route('**/mittari*.jpg', (reitti) => reitti.fulfill({
        contentType: 'image/png',
        body: kuvat.get(reitti.request().url().includes('mittari2')
          ? '/__mittari/kuva2.png' : '/__mittari/kuva1.png'),
      }));
      const sivu = await konteksti.newPage();
      for (const tyyppi of TYYPIT) {
        await sivu.goto(`${palvelin.osoite}/__mittari.html`);
        await sivu.waitForFunction('window.__valmis === true');
        await sivu.evaluate((t) => window.__avaa(t), tyyppi);
        // Kuva on ladattava ennen mittaa: js/nostokuva.js tarkentaa
        // laatikon vasta `load`-tapahtumassa.
        await sivu.waitForFunction(() => {
          const img = document.querySelector('.nostokuva-img');
          return Boolean(img?.complete && img.naturalWidth);
        }, null, { timeout: 10000 });
        await sivu.evaluate(() => new Promise((r) => requestAnimationFrame(() => r())));
        if (otaKuvat) {
          await sivu.screenshot({ path: `/tmp/nostokuva-${tyyppi}-${leveys}x${korkeus}-vaihe1.png` });
        }
        const tulos = await sivu.evaluate(MITTAA);
        if (otaKuvat) {
          await sivu.screenshot({ path: `/tmp/nostokuva-${tyyppi}-${leveys}x${korkeus}-vaihe2.png` });
        }
        const otsake = `${tyyppi.padEnd(19)} ${ruutunimi.padEnd(11)} ${String(leveys).padStart(4)}x${korkeus}  ${kuvanimi}`;
        if (tulos.virhe) {
          console.log(`VIRHE  ${otsake}: ${tulos.virhe}`);
          virheita += 1;
          continue;
        }
        const ero = ['x', 'y', 'width', 'height']
          .map((k) => tulos.jalkeen[k] - tulos.ennen[k]);
        const nolla = ero.every((d) => d === 0) && tulos.sama && tulos.vaihe2;
        if (!nolla) virheita += 1;
        const luku = (r) => `${r.x.toFixed(2)},${r.y.toFixed(2)} ${r.width.toFixed(2)}x${r.height.toFixed(2)}`;
        console.log(`${nolla ? 'OK   ' : 'EI   '} ${otsake}  ennen ${luku(tulos.ennen)}  jälkeen ${luku(tulos.jalkeen)}  ero ${ero.join(',')}  nuolia ${tulos.nuolia} pisteitä ${tulos.pisteita}  kortinYla v1 ${tulos.kortinYlaV1.toFixed(1)} v2 ${tulos.kortinYlaV2.toFixed(1)} delta ${(tulos.kortinYlaV1 - tulos.kortinYlaV2).toFixed(1)}`);
      }
      await konteksti.close();
    }
  }
  await selain.close();
  await palvelin.sulje();
  console.log(virheita ? `\n${virheita} mittausta ei kelvannut` : '\nkaikki mitat nollassa');
  process.exitCode = virheita ? 1 : 0;
}

main();
