// Kokoaa pelin yhdeksi tiedostoksi, jonka voi avata ilman web-palvelinta.
//
//   node tools/build-standalone.mjs
//
// Tuottaa:
//   dist/matkakirja.html          täysi HTML-sivu (avaa selaimessa suoraan)
//   dist/matkakirja.partial.html  sama ilman <html>/<head>/<body>-kuorta

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');

// Moduulit riippuvuusjärjestyksessä; import/export-rivit poistetaan.
const MODULES = [
  'js/tokens.js',
  'js/wiki.js',
  'js/media.js',
  'js/saa.js',
  'js/uutiset.js',
  'js/packs/maailma-questions.js',
  'js/packs/maailma.js',
  'js/packs/africa-questions.js',
  'js/packs/africa-puzzles.js',
  'js/packs/africa-borders.js',
  'js/packs/africa-countries.js',
  'js/packs/omat-tiivistelmat.js',
  'js/packs/europe-countries.js',
  'js/packs/europe-saapumiset.js',
  'js/packs/asia-saapumiset.js',
  'js/packs/northamerica-saapumiset.js',
  'js/packs/southamerica-saapumiset.js',
  'js/packs/oceania-saapumiset.js',
  'js/packs/asia-artikkelit.js',
  'js/packs/asia-valokuvat.js',
  'js/packs/asia-lisat-valokuvat.js',
  'js/packs/northamerica-valokuvat.js',
  'js/packs/southamerica-valokuvat.js',
  'js/packs/oceania-valokuvat.js',
  'js/packs/asia-maatiedot.js',
  'js/packs/radiot.js',
  'js/packs/viritysaanet.js',
  'js/packs/europe-kulttuuri.js',
  'js/packs/kulttuuri-kategoriat.js',
  'js/packs/maa-kategoriat.js',
  'js/packs/maakartat.js',
  'js/packs/nahtavyysjutut.js',
  'js/packs/miniatyyrit.js',
  'js/packs/henkilot.js',
  'js/packs/saatiedot.js',
  'js/packs/kohtaamiset.js',
  'js/packs/paivan-kuvat.js',
  'js/packs/uutislahteet.js',
  // Viisaan Pöllön rajapinta-asetus. Pelkkä vakio, jonka js/pollo.js lukee.
  'js/packs/pollo-asetukset.js',
  'js/packs/europe-valokuvat.js',
  'js/packs/europe-kielet.js',
  'js/packs/europe-maatiedot.js',
  'js/packs/europe-artikkelit.js',
  /*
   * Linsseistä niputetaan VAIN omistus ja rekisteri, eikä sekään ole
   * valinta: js/game.js tuo omistus.js:n staattisesti (laattajako ja
   * kokemuspistekynnykset), ja omistus.js tuo rekisteri.js:n. Ilman
   * niitä checkModuleList kaataisi kokoajan.
   *
   * Kaikki muu linssikoneisto jää pois, koska yhden tiedoston versio ei
   * saa linssejä lainkaan (docs/linssit-suunnitelma.md luku 2.1, sama
   * tarkoituksellinen raja kuin valokuvilla ja äänillä): js/ui.js tuo
   * kerros.js:n ja radio.js:n dynaamisesti, ja niiden tuonti kaatuu
   * täällä hallitusti.
   *
   * TÄSTÄ SEURASI NIMITÖRMÄYS. kerros.js ja pistenaytto.js olivat
   * listalla, vaikka mikään listan moduuli ei tuo niitä, ja molemmat
   * julistavat `const NS` — jonka js/mapart.js julistaa myös. Niputus on
   * merkkijonojen ketjutusta ilman moduulirajoja, joten selain kaatui
   * heti: "Identifier 'NS' has already been declared". Sääntö tästä
   * eteenpäin: älä lisää tänne moduulia, jota mikään listalla oleva ei
   * staattisesti tuo.
   *
   * Loput kuusitoista törmäystä on nyt purettu nimeämällä (12.8.2026):
   * europe-puzzles.js sai omat euro-alkuiset apurit ja EUROPE_-vakiot,
   * pulmien piirtäjät ovat piirraAfrikanPulma / piirraEuroopanPulma,
   * omistus.js KEHITTAJA_TILA_AVAIN, sound.js ZOOM_PEHMENNYS_PISTEET,
   * rules.js hashLuku01, maailmankartta.js LAHDEPAKAT, linssi-kielet.js
   * KIELIKUNNAT, maailmankartta-maasto.js LAUDAN_JARVET/LAUDAN_JOET ja
   * maasto-nimet-vedet.js JARVINIMET/JOKINIMET. js/ui.js:n nimet jäivät
   * ennalleen. Tuonneissa EI SAA käyttää aliasta (`import { A as B }`)
   * silloin kun nimi tarvitaan täällä: alias katoaa import-rivin mukana,
   * ja niputettu koodi jää viittaamaan olemattomaan B:hen.
   *
   * Sama koskee järjestystä: niputus on yhtä näkyvyysaluetta, joten
   * moduulin, jonka moduulitason koodi lukee toisen vientiä, on oltava
   * listalla sen JÄLKEEN (ks. middleeast-countries.js ja
   * maailmankartta-maasto.js alempana). Muuten selain kaatuu
   * "Cannot access ... before initialization". Yksikään testi ei näe
   * kumpaakaan vikaa, koska KOKOAMINEN onnistuu virheittä ja vika on
   * vasta ajossa; tarkista aina dist/matkakirja.html selaimessa.
   * Kunnollinen korjaus on kääriä jokainen moduuli omaan sulkeumaansa;
   * se on yhä oma työnsä.
   */
  'js/linssit/rekisteri.js',
  'js/linssit/omistus.js',
  'js/packs/valokuvat-paikalliset.js',
  'js/packs/liput-paikalliset.js',
  'js/packs/lippu-tekijat.js',
  'js/packs/africa-valokuvat.js',
  'js/packs/africa-saapumiset.js',
  'js/packs/africa-kulttuuri.js',
  'js/packs/africa-artikkelit.js',
  'js/packs/africa-maatiedot.js',
  'js/packs/africa.js',
  'js/packs/middleeast-questions.js',
  'js/packs/europe-questions.js',
  'js/packs/europe-puzzles.js',
  'js/tyohuone-kehitys-data.js',
  // Kehittäjän liitteet (v697): ui.js lukee Raamatun ja tilannetaulut
  // pelin sisäisiin lehtiin, joten ne kuuluvat myös yhden tiedoston
  // versioon.
  'js/tyohuone-raamattu.js',
  'js/tyohuone-tilanne.js',
  // Lukijaäänen oletusten näyttökopio (main.js tuo sen dialogiin).
  'js/puhe-oletukset.js',
  'js/packs/tarinakaari.js',
  'js/packs/europe.js',
  // middleeast-countries.js ENNEN middleeast.js:ää: niputettu koodi on yhtä
  // näkyvyysaluetta, ja middleeast.js lukee MIDDLE_EAST_COUNTRY_SHAPESin heti
  // moduulitasolla. Väärä järjestys kaatuu ajossa ("Cannot access ... before
  // initialization"), ei kokoamisessa.
  'js/packs/middleeast-countries.js',
  'js/packs/middleeast.js',
  'js/packs/asia-questions.js',
  'js/packs/asia.js',
  'js/packs/oceania-questions.js',
  'js/packs/oceania.js',
  'js/packs/northamerica-questions.js',
  'js/packs/northamerica.js',
  'js/packs/southamerica-questions.js',
  'js/packs/southamerica.js',
  'js/packs/suomi-questions.js',
  'js/packs/suomi.js',
  'js/packs/istanbul-questions.js',
  'js/packs/istanbul.js',
  // Sama syy kuin edellä: maailmankartta.js lukee MAAILMANKARTAN_MAASTOn
  // moduulitasolla, joten maasto on niputettava ensin.
  'js/packs/maailmankartta-maasto.js',
  'js/packs/maailmankartta.js',
  'js/packs/maailmankartta-nimet.js',
  'js/packs/maasto-vedet.js',
  'js/packs/maasto-korkeus.js',
  'js/packs/maasto-nimet-vuoret.js',
  'js/packs/vuori-valokuvat.js',
  'js/packs/maasto-nimet-vedet.js',
  'js/packs/maailmankartta-syvyys.js',
  'js/packs/maasto-tekstit-malli.js',
  'js/packs/maasto-tekstit.js',
  'js/packs/maailmankartta-varjostus.js',
  'js/packs/linssi-topografia.js',
  'js/packs/linssi-maaluvut.js',
  'js/packs/linssi-muuttoliike.js',
  'js/packs/linssi-historia.js',
  'js/packs/linssi-leviaminen.js',
  'js/packs/linssi-ilmasto.js',
  'js/packs/linssi-kielet.js',
  'js/packs/linssi-tahdet.js',
  'js/packs/linssi-tuulet.js',
  'js/packs/linssi-yokartta.js',
  'js/packs/linssi-topografia-kuva.js',
  'js/pack.js',
  'js/passport.js',
  /*
   * iOS-kuoren kytkennät. Yhden tiedoston versiossa siltaa ei ole
   * koskaan olemassa, mutta moduuli tulee mukaan, koska sekä ui.js että
   * main.js tuovat sen staattisesti — ja koska se on pelkkiä vartioituja
   * funktioita, se ei tee levyversiossa mitään.
   */
  'js/natiivi.js',
  // Matkalaukun "Unohdettu aarre": tekijänoikeus ja lähdeluettelo.
  // Pelkkää dataa, jonka js/ui.js tuo staattisesti.
  'js/lahteet.js',
  'js/aani-ehdokkaat.js',
  'js/sound.js',
  'js/ambience-stream.js',
  'js/die.js',
  'js/rules.js',
  'js/mapart.js',
  'js/game.js',
  'js/ai.js',
  /*
   * Sivujen luenta ENNEN pöllöä: ui.js tuo lukijan staattisesti, ja
   * js/pollo.js tuo siitä kaiutinvivun luentafunktiot (lueAaneen,
   * lukijaTuettu, pysaytaLukija). Niputus on yhtä näkyvyysaluetta,
   * joten lukija on turvallisinta ladata ennen sen käyttäjiä.
   * Lukijaääni (js/puhe.js) ennen lukijaa samasta syystä.
   */
  'js/puhe.js',
  'js/lukija.js',
  /*
   * Viisas Pöllö ENNEN ui.js:ää: ui.js tuo polloAnkkurin ja polloSuljen
   * staattisesti, ja main.js kutsuu asennaPolloa moduulitasolla.
   */
  'js/pollo-haku.js',
  'js/pollo.js',
  'js/ui.js',

  'js/muutokset.js',
  'js/main.js',
];

/** Varmistaa, ettei yksikään moduuli jää pois niputuksesta. */
function checkModuleList() {
  const included = new Set(MODULES);
  for (const file of MODULES) {
    const dir = dirname(file);
    for (const match of read(file).matchAll(/from '(\.\.?\/[\w\/-]+\.js)'/g)) {
      const dep = join(dir, match[1]).replaceAll('\\', '/');
      if (!included.has(dep)) {
        throw new Error(`${file} tarvitsee moduulin ${dep}, joka puuttuu MODULES-listalta`);
      }
    }
  }
}

function stripModuleSyntax(source) {
  return source
    .replace(/^import\s[^;]*;\s*$/gm, '')
    .replace(/^export\s*\{[^}]*\}\s*;\s*$/gm, '')
    .replace(/^export\s+(?=(const|let|function|class|async))/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

checkModuleList();

const bundle = MODULES.map((file) => `// ===== ${file} =====\n${stripModuleSyntax(read(file))}`)
  .join('\n\n');

const css = read('css/styles.css');
const indexHtml = read('index.html');

const body = indexHtml
  .slice(indexHtml.indexOf('<body>') + '<body>'.length, indexHtml.indexOf('</body>'))
  .replace(/\s*<script type="module"[^>]*><\/script>/, '')
  .trim();

const script = `<script>\n${bundle}\n</script>`;

// Artefaktialustat käärivät sisällön itse, joten niille riittää runko ilman
// <html>/<head>/<body>-tageja.
const partial = `<title>Unohdettu aarre</title>

<style>
${css}
</style>

${body}

${script}
`;

const full = `<!DOCTYPE html>
<html lang="fi">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Unohdettu aarre</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><text y='26' font-size='26'>◈</text></svg>" />
<style>
${css}
</style>
</head>
<body>
${body}

${script}
</body>
</html>
`;

mkdirSync(join(root, 'dist'), { recursive: true });
writeFileSync(join(root, 'dist/matkakirja.partial.html'), partial);
writeFileSync(join(root, 'dist/matkakirja.html'), full);

console.log(
  `dist/matkakirja.html (${Math.round(full.length / 1024)} kt)`,
  `\ndist/matkakirja.partial.html (${Math.round(partial.length / 1024)} kt)`,
);
