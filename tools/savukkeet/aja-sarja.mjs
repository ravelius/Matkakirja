// AJA SARJA — ajaa savukesarjan RINNAKKAIN YHDESSÄ prosessipuussa.
//
//   node tools/savukkeet/aja-sarja.mjs [julkaisu|kaikki|lista] [tuloskansio]
//
// Tehty Mac Studion self-hosted-runneria varten (omistaja 17.9.2026,
// Raamattu: AGENTIT ... TARKENNUS 6): yksi self-hosted-runner ajaa yhden
// jobin kerrallaan, joten GitHubin matriisi (12 rinnakkaista ubuntu-jobia)
// ei sovi — koko sarja ajetaan yhtenä jobina, rinnakkaisuus hoidetaan
// täällä lapsiprosesseilla.
//
// Sarjan sisältö luetaan tools/savukkeet/rakenna-matriisi.mjs:n
// rakennaMatriisi()-funktiolla, eli tools/savukkeet/sarjat.json on
// edelleen AINOA TOTUUS (env, kuvakansio, tunnetut punaiset).
//
// Ympäristömuuttujat:
//   SAVUKE_RINNAKKAIN  montako savuketta yhtä aikaa (oletus 6)
//   SAVUKE_AIKAKATTO_MS  per savuke, oletus 600000 (10 min)
//   CHROMIUM, PLAYWRIGHT_JS  periytyvät lapsille sellaisenaan
//   SAVUKE_CHROMIUM_LIPUT  (rivikohtainen, sarjat.jsonin env-lohko)
//                       lisäargumentit Chromiumille, esim.
//                       "--use-gl=angle --use-angle=swiftshader" —
//                       ks. tools/savukkeet/chromium-liput.mjs
//
// Tuloskansioon syntyy per savuke:
//   savuke-<nimiTunniste>.log   ajoloki (stdout+stderr)
//   tulos-<nimiTunniste>.json   { tiedosto, kesto, tulosJson }
//                               (sama muoto kuin työnkulun "Tallenna
//                               tulos" -askel → kirjoita-yhteenveto.mjs)
//   kaappaukset/<nimiTunniste>/ KAAPPAUKSET-kansio (ja kuvakansio-arg)
//
// Lopuksi tulostetaan kirjoita-yhteenveto.mjs:n Markdown-taulukko ja
// lista uusista punaisista. Poistumiskoodi 1 VAIN jos uusia punaisia on
// (tunnetut punaiset sallitaan — sama sääntö kuin Actions-matriisissa).
//
// PORTIT: useimmat savukkeet kuuntelevat listen(0):lla (vapaa portti),
// osalla on kiinteä portti. Julkaisusarjassa savuke-astro-valokuva (8757)
// ja savuke-topografialinssi (oletus 8757, lukee PORTTI-muuttujan)
// törmäisivät rinnakkain, joten jokaiselle savukkeelle annetaan oma
// PORTTI-arvo (8800 + indeksi), ellei sarjat.json ole sitä asettanut.
// Savukkeet jotka eivät lue PORTTIa jättävät sen huomiotta. Jäljelle
// jäävät kiinteät päällekkäisyydet raportoidaan varoituksena ennen ajoa.

import { spawn } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { rakennaMatriisi } from './rakenna-matriisi.mjs';

const TASSA = dirname(fileURLToPath(import.meta.url));
const JUURI = join(TASSA, '..', '..');

const sarja = process.argv[2] || 'julkaisu';
const tuloskansio = process.argv[3] || join('/tmp', 'matkakirja-savukkeet', 'paikallinen');
const rinnakkain = Math.max(1, Number(process.env.SAVUKE_RINNAKKAIN ?? 6));
const aikakattoMs = Number(process.env.SAVUKE_AIKAKATTO_MS ?? 10 * 60 * 1000);

let matriisi;
try {
  matriisi = rakennaMatriisi(sarja);
} catch (e) {
  console.error(e.message);
  process.exit(1);
}

mkdirSync(tuloskansio, { recursive: true });
const kaappausJuuri = join(tuloskansio, 'kaappaukset');
mkdirSync(kaappausJuuri, { recursive: true });

// Kiinteiden porttien päällekkäisyystarkistus (vain varoitus).
const kiinteat = new Map();
for (const rivi of matriisi) {
  const lahde = readFileSync(join(TASSA, rivi.tiedosto), 'utf8');
  for (const osuma of lahde.matchAll(/\.listen\(\s*(\d+)/g)) {
    const portti = osuma[1];
    if (portti === '0') continue;
    if (!kiinteat.has(portti)) kiinteat.set(portti, []);
    // Tiedostonimi (ei nimiTunniste): jaetulla rivillä ne eroavat.
    if (!kiinteat.get(portti).includes(rivi.tiedosto)) kiinteat.get(portti).push(rivi.tiedosto);
  }
}
for (const [portti, nimet] of kiinteat) {
  const ilmanPorttiMuuttujaa = nimet.filter((t) => {
    const lahde = readFileSync(join(TASSA, t), 'utf8');
    return !/process\.env\.PORTTI/.test(lahde);
  });
  if (ilmanPorttiMuuttujaa.length > 1) {
    console.log(`VAROITUS: kiinteä portti ${portti} on usealla savukkeella ilman PORTTI-muuttujaa: ${ilmanPorttiMuuttujaa.join(', ')} — rinnakkaisajo voi kaatua EADDRINUSE-virheeseen.`);
  }
}

console.log(`Savukesarja "${sarja}": ${matriisi.length} savuketta, rinnakkaisuus ${rinnakkain}, aikakatto ${Math.round(aikakattoMs / 1000)} s/savuke.`);
console.log(`Tuloskansio: ${tuloskansio}\n`);

const alkuKaikki = Date.now();

function ajaYksi(rivi, indeksi) {
  return new Promise((valmis) => {
    const kaappaus = join(kaappausJuuri, rivi.nimiTunniste);
    mkdirSync(kaappaus, { recursive: true });
    const lokiPolku = join(tuloskansio, `savuke-${rivi.nimiTunniste}.log`);

    const ymparisto = {
      ...process.env,
      PORTTI: String(8800 + indeksi),
      ...rivi.env,
      KAAPPAUKSET: kaappaus,
    };

    /*
     * RIVIKOHTAISET CHROMIUM-LIPUT (omistaja 18.9.2026, Raamattu
     * TARKENNUS 11 kohta 24 d). Jos rivillä on SAVUKE_CHROMIUM_LIPUT,
     * lapsi käynnistetään `--import`illa, joka kääriä Playwrightin
     * `chromium.launch`in ja lisää liput args-listaan — savukkeiden
     * omaa koodia ei tarvitse muuttaa (ks. chromium-liput.mjs).
     * NODE_OPTIONS säilytetään, jos se on jo asetettu.
     */
    if (ymparisto.SAVUKE_CHROMIUM_LIPUT) {
      const shim = pathToFileURL(join(TASSA, 'chromium-liput.mjs')).href;
      ymparisto.NODE_OPTIONS = `${process.env.NODE_OPTIONS ?? ''} --import ${shim}`.trim();
    }

    const argumentit = [join(TASSA, rivi.tiedosto)];
    if (rivi.kuvakansio) argumentit.push(kaappaus);

    const alku = Date.now();
    const osat = [];
    const lapsi = spawn(process.execPath, argumentit, {
      cwd: JUURI,
      env: ymparisto,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    lapsi.stdout.on('data', (d) => osat.push(d));
    lapsi.stderr.on('data', (d) => osat.push(d));

    let katkaistu = false;
    const kello = setTimeout(() => {
      katkaistu = true;
      lapsi.kill('SIGKILL');
    }, aikakattoMs);

    lapsi.on('close', (koodi) => {
      clearTimeout(kello);
      const kesto = Math.round((Date.now() - alku) / 1000);
      let loki = Buffer.concat(osat).toString('utf8');
      if (katkaistu) loki += `\nFAIL aikakatto: savuke katkaistiin ${Math.round(aikakattoMs / 1000)} sekunnin jälkeen\n`;
      writeFileSync(lokiPolku, loki);
      valmis({ rivi, kesto, koodi: katkaistu ? 124 : (koodi ?? 1), lokiPolku, katkaistu });
    });
  });
}

function vertaa(tulos) {
  const { rivi, lokiPolku, koodi } = tulos;
  const argumentit = [
    join(TASSA, 'vertaa-tulos.mjs'),
    lokiPolku,
    rivi.tiedosto,
    JSON.stringify(rivi.tunnetutPunaiset),
    rivi.tunnetutPunaisetMaara === null ? 'null' : String(rivi.tunnetutPunaisetMaara),
    String(koodi),
  ];
  return new Promise((valmis) => {
    const osat = [];
    const lapsi = spawn(process.execPath, argumentit, { cwd: JUURI, stdio: ['ignore', 'pipe', 'pipe'] });
    lapsi.stdout.on('data', (d) => osat.push(d));
    lapsi.stderr.on('data', (d) => osat.push(d));
    lapsi.on('close', () => {
      const tuloste = Buffer.concat(osat).toString('utf8').trim();
      const rivitTuloste = tuloste.split('\n');
      let tulosJson = null;
      try {
        tulosJson = JSON.parse(rivitTuloste[rivitTuloste.length - 1]);
      } catch {
        tulosJson = { lapi: 0, yhteensa: 0, uusiaPunaisia: 1 };
      }
      valmis({ tuloste, tulosJson });
    });
  });
}

const valmiit = [];
let seuraava = 0;

async function tyontekija() {
  for (;;) {
    const indeksi = seuraava++;
    if (indeksi >= matriisi.length) return;
    const rivi = matriisi[indeksi];
    const ajo = await ajaYksi(rivi, indeksi);
    const { tuloste, tulosJson } = await vertaa(ajo);
    writeFileSync(
      join(tuloskansio, `tulos-${rivi.nimiTunniste}.json`),
      // `nimi` on jaetulla rivillä "savuke-x.mjs#osa" — yhteenvedon
      // taulukossa puolikkaat on erotettava toisistaan.
      JSON.stringify({ tiedosto: rivi.nimi ?? rivi.tiedosto, kesto: ajo.kesto, tulosJson }),
    );
    const merkki = tulosJson.uusiaPunaisia > 0 ? 'UUSI PUNAINEN' : (tulosJson.lapi === tulosJson.yhteensa ? 'OK' : 'tunnettu punainen');
    console.log(`[${String(valmiit.length + 1).padStart(2, ' ')}/${matriisi.length}] ${rivi.nimiTunniste}: ${tulosJson.lapi}/${tulosJson.yhteensa} ${merkki}, ${ajo.kesto} s${ajo.katkaistu ? ' (AIKAKATTO)' : ''}`);
    valmiit.push({ rivi, ajo, tuloste, tulosJson });
  }
}

await Promise.all(Array.from({ length: Math.min(rinnakkain, matriisi.length) }, () => tyontekija()));

const kokonaisKesto = Math.round((Date.now() - alkuKaikki) / 1000);

const uudet = valmiit.filter((v) => v.tulosJson.uusiaPunaisia > 0);

console.log('\n================ YHTEENVETO ================\n');
await new Promise((valmis) => {
  const lapsi = spawn(process.execPath, [join(TASSA, 'kirjoita-yhteenveto.mjs'), tuloskansio], {
    cwd: JUURI,
    stdio: ['ignore', 'inherit', 'inherit'],
  });
  lapsi.on('close', valmis);
});

console.log(`\n**Seinäkelloaika:** ${kokonaisKesto} s (rinnakkaisuus ${rinnakkain}).`);

if (uudet.length) {
  console.log('\n### Uudet punaiset\n');
  for (const v of uudet) {
    console.log(`- **${v.rivi.nimiTunniste}** — ${v.tulosJson.uusiaPunaisia} uutta punaista (loki: ${v.ajo.lokiPolku})`);
    for (const rivi of v.tuloste.split('\n')) {
      if (/^::(warning|error)::/.test(rivi) || /^\s*\[(UUSI|KAATUMINEN)/.test(rivi)) console.log(`    ${rivi}`);
    }
  }
}

process.exit(uudet.length ? 1 : 0);
