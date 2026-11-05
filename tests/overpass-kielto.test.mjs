// Overpass on kielletty (Raamattu 2.183): tools/-kansion skriptissä ei saa olla Overpass-osoitetta, -kyselyä eikä -kutsua.
// Pelkkä sana historiakommentissa on sallittu. OSM-aineistoa tarvitseva työkalu kaatuu osmHakuPuuttuu-funktioon, kunnes
// sille tehdään korvaava haku Geofabrikin aineistosta.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { osmHakuPuuttuu } from '../tools/osm-haku-kielletty.mjs';

const JUURI = fileURLToPath(new URL('..', import.meta.url));
const SKRIPTIT = new Set(['.mjs', '.js', '.cjs', '.ts', '.py', '.sh', '.zsh', '.bash']);
const KIELLETYT = [
  ['Overpass-palvelimen osoite', /(?:^|[^/\w-]|\/\/)overpass[-.\w]*\.[a-z]{2,}/i],
  ['Overpass-rajapinnan polku', /\/api\/interpreter\b|\/overpass\/api\b/i],
  ['Overpass-kysely', /\[out:(json|xml|csv)\b/i],
  ['Overpass-kutsu', /\b\w*overpass\w*\(/i],
  ['Overpass-palvelinlista', /\bOVERPASS(_\w+|\s*=)/],
];
const osumat = (teksti) => KIELLETYT.filter(([, malli]) => malli.test(teksti)).map(([nimi]) => nimi);

function* skriptit(kansio) {
  for (const e of readdirSync(kansio, { withFileTypes: true })) {
    if (e.name === 'node_modules') continue;
    const polku = join(kansio, e.name);
    if (e.isDirectory()) yield* skriptit(polku);
    else if (SKRIPTIT.has(extname(e.name))) yield polku;
  }
}

test('tools/-kansion skripteissä ei ole Overpass-osoitetta, -kyselyä eikä -kutsua', () => {
  const loydot = [];
  for (const polku of skriptit(join(JUURI, 'tools'))) {
    readFileSync(polku, 'utf8').split('\n').forEach((rivi, i) => {
      for (const nimi of osumat(rivi)) loydot.push(`${relative(JUURI, polku)}:${i + 1} ${nimi}: ${rivi.trim().slice(0, 100)}`);
    });
  }
  assert.deepEqual(loydot, [], `Overpass on kielletty (Raamattu 2.183); käytä Geofabrikin aineistoa:\n${loydot.join('\n')}`);
});

test('tunnistin löytää Overpassin muodot ja sallii historiakommentin', () => {
  for (const rivi of [
    "const OVERPASS = ['https://overpass-api.de/api/interpreter'];",
    'https://overpass.kumi.systems/x',
    'overpass.private.coffee',
    'https://overpass-api.openhistoricalmap.org/x',
    'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
    'const kysely = `[out:json][timeout:60];`',
    'const d = await overpass(kysely, avain);',
    'await haeOverpassSitkeasti(rajat);',
    'OVERPASS_PALVELIMET=https://peili.example/x node tools/kartta.mjs',
  ]) assert.notDeepEqual(osumat(rivi), [], rivi);
  for (const rivi of [
    '// Koordinaatti on Overpassista (way 387447673).',
    'OpenStreetMapista (Overpass) esilaskettu ruudukko',
    'Overpass palautti 337 elementtiä.',
    'ei ajonaikaisia Overpass-kyselyjä.',
    'tests/overpass-kielto.test.mjs estää osoitteet',
  ]) assert.deepEqual(osumat(rivi), [], rivi);
});

test('OSM-haku kaatuu selkeään viestiin', () => {
  assert.throws(() => osmHakuPuuttuu('tee-tiet'), /tee-tiet: .*Overpass on kielletty \(Raamattu 2\.183\).*Geofabrikin aineistosta/);
});
