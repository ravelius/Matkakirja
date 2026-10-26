/*
 * ASTRONAUTIN KAMERAN KUVIEN VALKOINEN TUNNUSPALKKI — tunnistus ja rajaus.
 *
 * Omistaja 20.9. ja 30.9.2026 (Etna ISS013E62714, Everglades ISS015E08920):
 * NASAn vanhojen arkistokuvien alareunassa on valkoinen palkki, jossa on
 * kuvatunniste mustalla. Palkki EI saa näkyä pelissä. Sääntö koskee myös
 * tulevia kuvia jo lisäysvaiheessa: jokainen astro-kuva kulkee tämän
 * tarkistuksen läpi ennen kuin sen osoite lisätään aineistoon
 * (tests/astro-palkki.test.mjs valvoo tätä tools/astro-palkit-
 * tarkistetut.json -kirjanpidolla).
 *
 * TUNNISTUS (tunnistaPalkki): alimmista ~9 % riveistä etsitään alhaalta
 * ylöspäin yhtenäinen kaista rivejä, joista vähintään 78 % pikseleistä on
 * lähes valkoisia (kaikki kanavat >= 222). Kaista on palkki, jos
 *   • sen korkeus on 1,5–4,5 % kuvan korkeudesta (NASAn leima on aina
 *     ~2,7 %: 35–36 px isossa ja 11–12 px pikkukuvassa), ja
 *   • siinä on leimatekstin tummia pikseleitä (vähintään 0,1 rivin verran,
 *     eli musta teksti valkoisella). Ilman tätä koko kuvan valkoinen
 *     pinta (suolatasanko, pilvet, lumi) tulkittaisiin palkiksi.
 * Kaistaan sallitaan yksi yksittäinen epäsopiva rivi (tekstin reunat).
 *
 * KÄYTTÖ
 *   node tools/astro-palkki.mjs tarkista <tiedosto.jpg ...>
 *       tulostaa tuloksen per kuva (vaatii `sharp`-paketin: `npm i sharp`
 *       väliaikaiseen kansioon ja NODE_PATH, repossa sitä ei ole)
 *   node tools/astro-palkki.mjs rajaa <tiedosto.jpg> <ulos.jpg>
 *       rajaa palkin pois (palkin korkeus + 1 rivi varmuutta)
 * Rajatut kuvat viedään ämpäriin UUTEEN versiokansioon
 * linssit/astronautin-kamera/<pvm>/<id>~large|small.jpg
 * (cache-control immutable), ja osoite lisätään
 * hae-satelliittihavainnot.mjs:n KUVAPOIKKEUKSET-kartalle sekä
 * kirjataan tools/astro-palkit-tarkistetut.json:iin.
 */
import { pathToFileURL } from 'node:url';

export const KAISTA_ALARAJA = 0.015;
export const KAISTA_YLARAJA = 0.045;
export const VALKOINEN_RAJA = 222;
export const VALKOINEN_OSUUS = 0.78;
export const LEIMA_MIN_RIVEJA = 0.1;

/**
 * @param {Uint8Array|Buffer} data  pikselit rivi kerrallaan
 * @param {number} leveys
 * @param {number} korkeus
 * @param {number} kanavia          3 (RGB) tai 4 (RGBA) tai 1 (harmaa)
 * @returns {{palkki:boolean, korkeus:number, osuus:number, leimaa:number}}
 */
export function tunnistaPalkki(data, leveys, korkeus, kanavia = 3) {
  const kaistaKorkeus = Math.max(40, Math.floor(korkeus * 0.09));
  const alku = Math.max(0, korkeus - kaistaKorkeus);
  const rivit = [];
  for (let y = alku; y < korkeus; y += 1) {
    let kirkas = 0;
    let tumma = 0;
    const rivi = y * leveys * kanavia;
    for (let x = 0; x < leveys; x += 1) {
      const i = rivi + x * kanavia;
      const r = data[i];
      const g = kanavia >= 3 ? data[i + 1] : r;
      const b = kanavia >= 3 ? data[i + 2] : r;
      if (Math.min(r, g, b) >= VALKOINEN_RAJA) kirkas += 1;
      else if (Math.max(r, g, b) < 110) tumma += 1;
    }
    rivit.push({ kirkas: kirkas / leveys, tumma: tumma / leveys });
  }
  let ylin = rivit.length;
  let aukkoja = 0;
  for (let y = rivit.length - 1; y >= 0; y -= 1) {
    if (rivit[y].kirkas >= VALKOINEN_OSUUS) { ylin = y; aukkoja = 0; } else {
      aukkoja += 1;
      if (aukkoja > 1) break;
    }
  }
  const palkinKorkeus = rivit.length - ylin;
  let leimaa = 0;
  for (let y = ylin; y < rivit.length; y += 1) leimaa += rivit[y].tumma;
  const osuus = palkinKorkeus / korkeus;
  const palkki = osuus >= KAISTA_ALARAJA && osuus <= KAISTA_YLARAJA && leimaa >= LEIMA_MIN_RIVEJA;
  return { palkki, korkeus: palkki ? palkinKorkeus : 0, osuus, leimaa };
}

/** Rajauskorkeus pikseleinä: palkki + yksi rivi varmuutta (JPEG-reuna). */
export function rajauskorkeus(tulos) {
  return tulos.palkki ? tulos.korkeus + 1 : 0;
}

async function lataaSharp() {
  try {
    return (await import('sharp')).default;
  } catch {
    throw new Error('sharp puuttuu: asenna väliaikaiseen kansioon (npm i sharp) ja aja NODE_PATH-asetuksella; repossa sitä ei ole.');
  }
}

async function pikselit(sharp, tiedosto) {
  const { data, info } = await sharp(tiedosto).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  return { data, leveys: info.width, korkeus: info.height, kanavia: info.channels };
}

async function main() {
  const [komento, ...args] = process.argv.slice(2);
  const sharp = await lataaSharp();
  if (komento === 'tarkista') {
    for (const f of args) {
      const p = await pikselit(sharp, f);
      const t = tunnistaPalkki(p.data, p.leveys, p.korkeus, p.kanavia);
      process.stdout.write(`${t.palkki ? 'PALKKI' : 'puhdas'}\t${f}\t${p.leveys}x${p.korkeus}\tpalkki ${t.korkeus} px\n`);
    }
  } else if (komento === 'rajaa') {
    const [sisaan, ulos] = args;
    const p = await pikselit(sharp, sisaan);
    const t = tunnistaPalkki(p.data, p.leveys, p.korkeus, p.kanavia);
    if (!t.palkki) { process.stdout.write(`ei palkkia: ${sisaan}\n`); return; }
    await sharp(sisaan).extract({ left: 0, top: 0, width: p.leveys, height: p.korkeus - rajauskorkeus(t) })
      .jpeg({ quality: 92, chromaSubsampling: '4:4:4' }).toFile(ulos);
    process.stdout.write(`rajattu ${rajauskorkeus(t)} px: ${ulos}\n`);
  } else {
    process.stderr.write('käyttö: node tools/astro-palkki.mjs tarkista|rajaa ...\n');
    process.exitCode = 2;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => { process.stderr.write(`${e.message}\n`); process.exitCode = 1; });
}
