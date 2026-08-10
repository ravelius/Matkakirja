/*
 * Etsii maakylttien törmäykset kaupunkien nimiin ja merkkeihin.
 *
 * MIKSI TÄMÄ ON OLEMASSA. Maakyltti ("KREIKKA ⓘ") on nappi, jota
 * pelaajan on määrä painaa päästäkseen maan lehteen, ja se piirretään
 * maan ankkuriin (countryShapes[iso].keskus). Ankkuri on maan
 * maantieteellinen keskipiste, eikä se tiedä mitään kaupunkien
 * nimistä — Kreikassa se osui suoraan ATEENA-nimen päälle, ja
 * omistaja löysi testipelistä kyltin, josta näkyi vain kirjainten
 * häntä (9.8.2026).
 *
 * Yksi ruutu ei kerro, kuinka laaja vika on. Tämä työkalu piirtää
 * jokaisen maan kyltin pelin omalla piirtokoodilla ja mittaa, kuinka
 * suuri osa kyltistä jää kaupungin nimen tai merkin alle. Ensimmäinen
 * ajo kertoi, että Euroopan 29 maasta 15:llä nimi peitti kylttiä ja
 * kuudella peitto ulottui i-nappiin asti.
 *
 * Käyttö:
 *   node tools/tarkista-maakyltit.mjs            # europe + middleeast
 *   node tools/tarkista-maakyltit.mjs africa     # yksi lauta
 *   node tools/tarkista-maakyltit.mjs europe --ehdota
 *
 * `--ehdota` etsii jokaiselle törmäävälle maalle vapaan ankkurin maan
 * oman monikulmion sisältä (ruudukkohaku, lähin voittaa) ja tulostaa
 * ehdotetut koordinaatit. Ehdotus on lähtökohta, ei päätös: KATSO
 * kuva ennen kuin siirrät ankkurin, koska mittaus ei tiedä, näyttääkö
 * kyltti nurkkaan työnnetyltä.
 *
 * Pieni peitto ei ole hätä. Kyltti piirtyy kaupunkien PÄÄLLE
 * (ui.js:n root.appendChild), joten se pysyy luettavana silloinkin
 * kun se osuu johonkin — mittaus kertoo, milloin kyltti peittää
 * kaupungin nimen, ja se on eri asia kuin kyltin katoaminen.
 * Nappulat ja laatat jäävät kyltin päälle tarkoituksella.
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve, dirname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg', '.webmanifest': 'application/manifest+json',
};

const argumentit = process.argv.slice(2);
const ehdota = argumentit.includes('--ehdota');
const laudat = argumentit.filter((a) => !a.startsWith('--'));
const LAUDAT = laudat.length ? laudat : ['europe', 'middleeast'];

const palvelin = createServer(async (pyynto, vastaus) => {
  try {
    const polku = decodeURIComponent((pyynto.url ?? '/').split('?')[0]);
    const tiedosto = resolve(JUURI, `.${normalize(polku === '/' ? '/index.html' : polku)}`);
    if (!tiedosto.startsWith(JUURI)) { vastaus.writeHead(403).end(); return; }
    const data = await readFile(tiedosto);
    vastaus.writeHead(200, { 'content-type': TYYPIT[extname(tiedosto)] ?? 'application/octet-stream' });
    vastaus.end(data);
  } catch {
    vastaus.writeHead(404).end();
  }
});
await new Promise((valmis) => palvelin.listen(0, '127.0.0.1', valmis));
const portti = palvelin.address().port;

const paketti = await import('/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

let loytoja = 0;
for (const lauta of LAUDAT) {
  const konteksti = await selain.newContext({ viewport: { width: 1280, height: 900 } });
  const sivu = await konteksti.newPage();
  await sivu.goto(`http://127.0.0.1:${portti}/?lauta=${lauta}`, { waitUntil: 'load' });
  await sivu.waitForFunction(() => window.matkakirja?.ui);
  await sivu.waitForTimeout(1500);

  const tulos = await sivu.evaluate((etsiEhdotus) => {
    const { ui, game } = window.matkakirja;
    const map = game.pack.map;
    /*
     * Maat luetaan countryShapesista, EI cityCountrysta.
     *
     * Aiemmin lista tuli kaupunki→maa-taulusta, jolloin kyltiltä jäi
     * tarkistamatta jokainen maa, jolla ei ole laudalla kaupunkia.
     * Bahrain on juuri sellainen: sen kyltti piirtyy ja avaa maalehden
     * Maiden tiedot -varusteessa, mutta tarkistin ohitti sen sanomatta
     * mitään — eli vastasi "ei törmäyksiä" maasta, jota se ei katsonut.
     */
    const isot = Object.keys(map.countryShapes ?? {});
    const laatikko = (e) => { const b = e.getBBox(); return { x: b.x, y: b.y, w: b.width, h: b.height }; };
    const yhteinen = (a, b) => {
      const w = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
      const h = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
      return (w > 0 && h > 0) ? w * h : 0;
    };
    // Säteenheitto: onko piste maan monikulmion sisällä.
    const sisalla = (renkaat, x, y) => {
      let n = 0;
      for (const rengas of renkaat) {
        for (let i = 0, j = rengas.length - 1; i < rengas.length; j = i, i += 1) {
          const [xi, yi] = rengas[i];
          const [xj, yj] = rengas[j];
          if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) n += 1;
        }
      }
      return n % 2 === 1;
    };
    const nimet = [...document.querySelectorAll('.city-label')]
      .map((e) => ({ teksti: e.textContent.trim(), laatikko: laatikko(e) }));
    const merkit = [...document.querySelectorAll('.city, .city-start, .city-gate')].map(laatikko);

    const ulos = [];
    for (const iso of isot) {
      const maa = map.countryShapes?.[iso];
      if (!maa) continue;
      ui.countryNameLayer.textContent = '';
      ui.piirraMaaKilpi(maa, iso);
      const kilpi = laatikko(ui.countryNameLayer.querySelector('.maa-kilpi-tausta'));
      const iNappi = laatikko(ui.countryNameLayer.querySelector('.maa-i-kehä'));
      const ala = kilpi.w * kilpi.h;
      let peitto = 0;
      let iPeitto = 0;
      const syyt = [];
      for (const n of nimet) {
        const o = yhteinen(kilpi, n.laatikko);
        if (o > 0) { peitto += o; syyt.push(n.teksti); }
        iPeitto += yhteinen(iNappi, n.laatikko);
      }
      const merkkiOsuu = merkit.some((m) => yhteinen(kilpi, m) > 0);
      if (!peitto && !merkkiOsuu) continue;

      let ehdotus = null;
      if (etsiEhdotus) {
        const [cx0, cy0] = maa.keskus;
        const esteet = [...nimet.map((n) => n.laatikko), ...merkit];
        const arvioi = (x, y) => {
          const l = { x: kilpi.x + (x - cx0), y: kilpi.y + (y - cy0), w: kilpi.w, h: kilpi.h };
          let p = 0;
          for (const e of esteet) p += yhteinen(l, e);
          return p;
        };
        let paras = { x: cx0, y: cy0, p: arvioi(cx0, cy0) };
        for (let dx = -80; dx <= 80; dx += 4) {
          for (let dy = -80; dy <= 80; dy += 4) {
            const x = cx0 + dx;
            const y = cy0 + dy;
            if (!sisalla(maa.renkaat, x, y)) continue;
            const p = arvioi(x, y);
            if (p < paras.p - 1) paras = { x, y, p };
          }
        }
        if (paras.x !== cx0 || paras.y !== cy0) {
          ehdotus = {
            piste: [Math.round(paras.x * 10) / 10, Math.round(paras.y * 10) / 10],
            jaljelle: Math.round((paras.p / ala) * 100),
            siirto: Math.round(Math.hypot(paras.x - cx0, paras.y - cy0)),
          };
        }
      }

      ulos.push({
        iso,
        nimi: maa.nimi,
        keskus: maa.keskus,
        peitto: Math.round((peitto / ala) * 100),
        iPeitto: Math.round((iPeitto / (iNappi.w * iNappi.h)) * 100),
        merkki: merkkiOsuu,
        syyt: [...new Set(syyt)],
        ehdotus,
      });
    }
    ui.countryNameLayer.textContent = '';
    ulos.sort((a, b) => (b.iPeitto - a.iPeitto) || (b.peitto - a.peitto));
    return { tarkistettu: isot.filter((i) => map.countryShapes?.[i]), ulos };
  }, ehdota);

  /*
   * Tulostetaan MITÄ tarkistettiin, ei vain löydöt. "Ei törmäyksiä"
   * näytti ennen samalta kuin "maata ei katsottu lainkaan" — ja juuri
   * niin kävi maille, joilla ei ole laudalla kaupunkia.
   */
  console.log(`\n=== ${lauta} ===`);
  console.log(`tarkistettu ${tulos.tarkistettu.length} maata: ${tulos.tarkistettu.join(' ')}`);
  if (!tulos.ulos.length) {
    console.log('ei törmäyksiä');
  } else {
    console.log('maa                       nimi   i-nappi  merkki  peittäjät');
    for (const t of tulos.ulos) {
      const rivi = `${(`${t.iso} ${t.nimi}`).padEnd(24)} ${`${t.peitto}%`.padStart(6)} ${`${t.iPeitto}%`.padStart(8)}  ${t.merkki ? 'kyllä ' : 'ei    '}  ${t.syyt.join(', ')}`;
      console.log(rivi);
      if (t.ehdotus) {
        console.log(`${' '.repeat(26)}↳ ehdotus [${t.ehdotus.piste}] jäljelle ${t.ehdotus.jaljelle}% (siirto ${t.ehdotus.siirto})`);
      }
      if (t.iPeitto > 0) loytoja += 1;
    }
  }
  await konteksti.close();
}

await selain.close();
palvelin.close();
if (loytoja) console.log(`\n${loytoja} maalla i-nappi jää nimen alle — siirrä ankkuri.`);
process.exitCode = loytoja ? 1 : 0;
