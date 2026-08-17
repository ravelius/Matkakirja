/*
 * Kartan ruudutus (v339): näkyvät ruudut ensin, puskurirengas
 * joutohetkinä.
 *
 * Omistaja: *"se vielä vähän tökkii, lähinnä kun joutuu lataamaan
 * zoomauksen jälkeen uutta karttamateriaalia scrollattaessa."*
 * Puskuroitu alue on yhdeksän ruudullista, mutta pelaaja katsoo
 * niistä yhtä; jako kahtia siirtää kahdeksan yhdeksäsosaa työstä
 * pois kriittiseltä polulta.
 *
 * Testit lukevat lähdetekstin, koska ui.js ei aukea Nodessa (DOM).
 * Ne vahtivat neljää asiaa, jotka kaikki voivat rikkoutua hiljaa —
 * ilman virheilmoitusta, pelkkänä tökkimisenä tai tyhjänä
 * pergamenttina:
 *
 *   1. jako näkyviin ja renkaaseen on olemassa;
 *   2. rengas väistää sormea (samat kiellot kuin täydennyksellä);
 *   3. rengas peruuntuu, kun peli tai mittakaava vaihtuu;
 *   4. vanhat ruudut poistetaan vasta renkaan valmistuttua.
 *
 * Mitattu selaimessa (tools/mittaa-ruudutus.mjs, 390x844):
 * näkyvä alue terävänä 1768 -> 890 ms, pisin purske sormen noustua
 * 1149 -> 247 ms, puskuri katettu kummallakin.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { paperi, paperinPohja } from '../js/mapart.js';

const ui = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');

/** Metodin runko nimellä: seuraavaan sarakkeeseen 2 asti. */
function metodi(nimi) {
  const alku = ui.indexOf(`\n  ${nimi}(`);
  assert.ok(alku > 0, `${nimi}: metodia ei löydy ui.js:stä`);
  const loppu = ui.indexOf('\n  }\n', alku);
  return ui.slice(alku, loppu);
}

test('täydennys jakaa ruudut näkyviin ja renkaaseen', () => {
  const runko = metodi('taydennaTaide');
  assert.match(runko, /const nakyvat = puuttuvat\.filter/, 'näkyvien erottelu puuttuu');
  assert.match(runko, /const rengas = puuttuvat\.filter/, 'renkaan erottelu puuttuu');
  // Heti piirtyvä silmukka saa käydä VAIN näkyvät läpi. Jos se palaisi
  // koko listaan, rengas piirtyisi taas kriittisellä polulla.
  assert.match(runko, /for \(const \{ avain, rx, ry \} of nakyvat\)/,
    'heti piirtyvä silmukka ei rajoitu näkyviin ruutuihin');
  assert.match(runko, /this\.taydennaRengas\(rengas, skaala\)/, 'rengasta ei ajasteta');
});

test('näkyvyys lasketaan kiertämättömästä sarakkeesta', () => {
  /*
   * Kiertävällä laudalla sama sarake voi olla yhtä aikaa näkyvissä ja
   * renkaassa. Jos osuvuus laskettaisiin kierretystä sarakkeesta,
   * sauman takainen ruutu joutuisi väärään koriin — näkyvä ruutu
   * jäisi odottamaan joutohetkeä ja kartalle jäisi terävöitymätön
   * kaistale.
   */
  const runko = metodi('taydennaTaide');
  assert.match(runko, /if \(nakyvissa\(rx, ry\)\) ruutu\.nakyy = true/,
    'näkyvyys pitää laskea kiertämättömästä rx:stä');
});

test('rengas väistää sormea, lentoa ja zoomiliukua', () => {
  const runko = metodi('taydennaRengas');
  // eleKesken kattaa raahauksen JA pelkän sormen kartalla: raahauslippu
  // syttyy vasta kuuden pikselin kynnyksen jälkeen, ja rengas ehti ennen
  // rasteroida juuri sillä hetkellä, kun ele oli alkamassa.
  for (const ehto of ['this.eleKesken()', 'this.taidePiirtyy',
    "flight-active", "zoom-kaynnissa"]) {
    assert.ok(runko.includes(ehto), `renkaalta puuttuu kielto: ${ehto}`);
  }
  // Yksi ruutu kerrallaan: pisin tukos on yhden ruudun mittainen.
  assert.match(runko, /jono\.shift\(\)/, 'rengas ei ota ruutuja yksitellen');
  assert.match(runko, /requestIdleCallback/, 'rengas ei odota joutohetkeä');
  // Aikakatkaisu: sivu, joka ei koskaan ole joutilas, saa silti
  // puskurinsa — muuten vieritys paljastaisi tyhjää pergamenttia.
  assert.match(runko, /timeout: \d+/, 'joutohetkeltä puuttuu aikakatkaisu');
  // Vanhempi Safari ei tunne requestIdleCallbackia.
  assert.match(runko, /setTimeout/, 'varareitti ilman requestIdleCallbackia puuttuu');
});

test('vanhentunut rengastyö ei piirrä', () => {
  const runko = metodi('taydennaRengas');
  /*
   * Kaksi tarkistusta, molemmat pakollisia: työn identiteetti
   * (this.taideRengas !== tyo) ja mittakaava. Jono elää joutohetkien
   * varassa, joten sen ja rasteroinnin välissä ehtii tapahtua mitä
   * tahansa — zoomaus, uusi peli, uusi täydennys.
   */
  const tarkistukset = runko.match(/this\.taideRengas !== tyo/g) ?? [];
  assert.ok(tarkistukset.length >= 2,
    'työn identiteetti on tarkistettava sekä ennen rasterointia että sen jälkeen');
  assert.match(runko, /skaala !== this\.taideSkaala/, 'mittakaavan tarkistus puuttuu');
});

test('rengas peruuntuu uudessa täydennyksessä ja pelin päättyessä', () => {
  assert.match(metodi('taydennaTaide'), /this\.peruutaRengas\(\)/,
    'uusi täydennys ei peru vanhaa rengasta');
  assert.match(metodi('destroy'), /this\.peruutaRengas\(\)/,
    'kuollut peli jättäisi renkaan piirtämään uuden kartan päälle');
  // Irrotettu window-metodi kaatuu "Illegal invocation" -virheeseen.
  assert.match(metodi('peruutaRengas'), /window\.cancelIdleCallback\(/,
    'peruutus on kutsuttava windowin kautta');
});

test('vanhat ruudut poistetaan vasta renkaan valmistuttua', () => {
  /*
   * Vanhan mittakaavan ruudut jäävät uusien alle ja peittävät juuri
   * sen alueen, jonne rengas on tulossa. Jos ne poistettaisiin heti
   * näkyvän osan valmistuttua, reunan yli vieritettäessä paljastuisi
   * tyhjä pergamentti — ennen siellä oli edes sumea kartta.
   */
  const rengas = metodi('taydennaRengas');
  assert.match(rengas, /this\.poistaVanhatRuudut\(\)/,
    'rengas ei siivoa vanhoja ruutuja lopuksi');
  // Tyhjä jono siivoaa heti: muuten vanhat jäisivät DOM:iin ikuisiksi.
  assert.match(rengas, /if \(!jono\?\.length\) \{ this\.poistaVanhatRuudut\(\); return; \}/,
    'tyhjä rengasjono ei siivoa vanhoja ruutuja');
});

/*
 * --- vaihe 2: tiilipyramidi ja kerran jäsennetty taidelähde ---------------
 *
 * Mitattu tausta (13.8.2026, maailmankartta lähikuvassa, 1027 px ruutu):
 * ruutukohtainen SVG-blobi maksoi WebKitissä jäsennyksenä 169 ms,
 * peittävyyden pikselilukuna 230 ms ja pakkauksena 196 ms PER RUUTU;
 * kuristetussa Chromiumissa pelkkä jäsennys oli 1886 ms. Kerran
 * jäsennetystä lähteestä leikattu ruutu maksaa murto-osan, ja koko
 * laudan pohjataso takaa, ettei ele koskaan piirrä tyhjää pergamenttia.
 * Nämä testit vahtivat, ettei mikään noista rakenteista katoa hiljaa.
 */

const art = readFileSync(new URL('../js/mapart.js', import.meta.url), 'utf8');

test('ruudut leikataan kerran jäsennetystä lähteestä, ei blobista', () => {
  // mapart: nopea reitti on olemassa ja saa lähteen parametrina.
  assert.match(art, /export async function avaaTaidelahde/,
    'kerran jäsennetty taidelähde puuttuu');
  assert.match(art, /rasteroiRuutu\(taide, ikkuna, skaala, tarkkuus = 1, keskeyta = null, lahde = null\)/,
    'rasteroiRuutu ei ota lähdettä vastaan');
  assert.match(art, /lahde\.kuva,\n\s*\(ikkuna\.x - lahde\.alue\.x\) \/ lahde\.jako/,
    'ruutua ei leikata lähteestä drawImagen lähderajauksella');
  // ui: MOLEMMAT kutsupaikat (näkyvä sarja ja rengas) antavat lähteen.
  // Luovutusehto on nuolifunktio sulkuineen, joten haku ulottuu rivien
  // yli lyhimpään taideLahteen asti.
  const kutsut = ui.match(/rasteroiRuutu\(this\.taide,[\s\S]{0,200}?this\.taideLahde\)/g) ?? [];
  assert.ok(kutsut.length >= 2,
    `lähde puuttuu rasteroiRuutu-kutsusta (${kutsut.length}/2)`);
  // Sarja odottaa lähdettä eikä tee työtä, joka heitettäisiin pois.
  assert.match(metodi('taydennaTaide'), /this\.taideLahdeTulossa/,
    'sarja ei odota kerran jäsennettyä lähdettä');
});

test('nopea reitti päättelee peittävyyden paperista eikä lue pikseleitä', () => {
  /*
   * taysinPeittava lukee koko kankaan takaisin näytönohjaimelta —
   * mitattuna 230 ms (WebKit) / 631 ms (Chromium 4x) per ruutu. Nopealla
   * reitillä sama tieto on pelkkää geometriaa: pergamentti on yksi
   * suorakaide, ja sen sisällä ruutu on aina peittävä.
   */
  assert.match(art, /function ikkunaPaperilla/, 'paperipäättely puuttuu');
  assert.match(art, /peittava = ikkunaPaperilla\(ikkuna, lahde\.alue\)/,
    'nopea reitti ei käytä paperipäättelyä');
  // Varareitti saa yhä lukea pikseleistä: sillä ei ole lähteen aluetta.
  assert.match(art, /peittava \?\? taysinPeittava\(/,
    'varareitin pikselitarkistus on kadonnut');
});

test('pyramidin pohjataso rakennetaan ja pidetään ruutujen alla', () => {
  assert.match(art, /export async function rasteroiPohja/, 'pohjataso puuttuu');
  assert.match(art, /export function pohjanMitat/,
    'pohjan mitat on voitava laskea ennen rakentamista');
  // Pohja on taideRyhmän EDELTÄVÄ sisarus: ruudut lisätään taideRyhmän
  // alkuun, joten ryhmän sisällä pohja nousisi ruutujen päälle.
  assert.match(ui, /insertBefore\(ryhmaPohjalle, this\.taideRyhma\)/,
    'pohja ei asetu ruutujen alle');
  // Yleiskuvassa pohja korvaa ruudut kokonaan.
  assert.match(metodi('taydennaTaide'),
    /this\.taidePohja && nakyva\.skaala \* this\.nykyinenTarkkuus\(\) <= this\.pohjaTeho/,
    'yleiskuva ei nojaa pohjatasoon');
  // Pohjan valmistuminen vapauttaa raskaan vektorikerroksen heti —
  // hitaalla koneella sarjan loppua ei ehkä koskaan tule (ks.
  // poistaVektorit-metodin selostus).
  assert.match(metodi('poistaVektorit'), /this\.taidePohja/,
    'pohja ei kelpaa vektorien poiston perusteeksi');
  const rasterointi = ui.slice(ui.indexOf('rasteroiPohja(lahde'), ui.indexOf('rasteroiPohja(lahde') + 2400);
  assert.match(rasterointi, /this\.poistaVektorit\(\)/,
    'pohjan valmistuminen ei poista vektoreita');
});

test('sarja hengähtää kehyksen verran ruutujen välissä', () => {
  /*
   * Nopealla reitillä ruudun maalaus on synkronista (drawImage
   * lähteestä), ja ilman hengähdystä monta ruutua niputtui samaan
   * kehykseen: eleiden väliin osuva kehys venyi yli sekuntiin.
   * Ajastin on rinnalla, koska rAF ei tikitä taustavälilehdessä.
   */
  const runko = metodi('taydennaTaide');
  assert.match(runko, /requestAnimationFrame\(\(\) => \{ clearTimeout\(vara\); jatka\(\); \}\)/,
    'ruutujen välistä puuttuu kehyksen hengähdys');
  assert.match(runko, /setTimeout\(\(\) => \{ cancelAnimationFrame\(kehys\); jatka\(\); \}, \d+\)/,
    'hengähdykseltä puuttuu taustavälilehden varareitti');
});

/*
 * PERGAMENTTI TÄYTTÄÄ RUUDUN, OLI RUUTU MINKÄ MUOTOINEN TAHANSA.
 *
 * Omistajan vaatimus 17.8.2026: sivun oma taustapaperi ei saa koskaan
 * pilkottaa laudan pergamentin takaa. Vika näkyi venytetyssä ikkunassa:
 * 400 x 2400 pikselin ruudussa Maailma-laudan (1150 x 800) näkyvä alue
 * on 6900 yksikköä korkea, ja arkki oli vain 3790.
 *
 * Korjaus on OMA kerros arkin alla (js/mapart.js paperinPohja) — ei
 * suurempi arkki. Nämä testit vahtivat molempia puolia: pohja riittää
 * venytettyynkin ruutuun, JA arkki pysyy ennallaan, koska siitä
 * riippuvat sekä rasterointi-ikkunat (ikkunaPaperilla, pohjanMitat)
 * että paperin liukuvärin mittakaava.
 */

/** Kokonäkymän näkyvä alue, kun lauta sovitetaan annetun muotoiseen ruutuun. */
function kokonakyma(map, kuvasuhde) {
  const laudanSuhde = map.width / map.height;
  const w = kuvasuhde >= laudanSuhde ? map.height * kuvasuhde : map.width;
  const h = kuvasuhde >= laudanSuhde ? map.height : map.width / kuvasuhde;
  return { x: map.width / 2 - w / 2, y: map.height / 2 - h / 2, w, h };
}

const LAUDAT = [
  { nimi: 'Maailma-aloituslauta', width: 1150, height: 800 },
  { nimi: 'europe', width: 1000, height: 1000 },
  { nimi: 'maailmankartta', width: 12000, height: 5399, kiertava: true },
];

test('arkin mitat eivät muutu: rasterointi ja liukuväri nojaavat niihin', () => {
  assert.deepEqual(paperi({ width: 1000, height: 1000 }),
    { x: -1300, y: -1300, w: 3600, h: 3600 }, 'arkin kaava on muuttunut');
  assert.deepEqual(paperi({ width: 12000, height: 5399, kiertava: true }),
    { x: 0, y: -15600, w: 12000, h: 36599 },
    'kiertävän laudan arkki jatkuu sivuille — kopio ja alkuperäinen tummuvat päällekkäin');
  // Piirto käyttää arkkia paperiin ja asteverkkoon, pohjaa vain ruudun
  // täyttöön ja rakeeseen.
  assert.match(art, /export function drawParchment\(svg, map = null\) \{\n\s*const PAPER = paperi\(map\);/,
    'arkin paperisuorakaide ei enää käytä paperi():a');
  assert.match(art, /export function pohjanMitat[\s\S]{0,400}const alue = paperi\(map\);/,
    'pyramidin pohjataso ei enää rajaudu arkkiin');
});

test('pergamentin pohja peittää venytetynkin ruudun', () => {
  for (const map of LAUDAT) {
    const arkki = paperi(map);
    const pohja = paperinPohja(map);

    // Pohja sisältää arkin, joten arkin reuna ei voi jäädä pohjan yli.
    assert.ok(pohja.y <= arkki.y && pohja.y + pohja.h >= arkki.y + arkki.h,
      `${map.nimi}: pohja ei kata arkkia pystysuunnassa`);
    assert.ok(pohja.x <= arkki.x && pohja.x + pohja.w >= arkki.x + arkki.w,
      `${map.nimi}: pohja ei kata arkkia vaakasuunnassa`);

    // Kiertävällä laudalla pohja EI jatku sivuille: <use>-kopio tuo
    // paperin, ja päällekkäinen rae tummuisi (ks. paperi()).
    if (map.kiertava) {
      assert.equal(pohja.x, 0, `${map.nimi}: kiertävä pohja alkaa laudan ulkopuolelta`);
      assert.equal(pohja.w, map.width, `${map.nimi}: kiertävä pohja jatkuu sivuille`);
    }

    // Kokonäkymä muun muassa 6:1 ja 1:6 -ruudussa — juuri ne muodot,
    // joissa vika näkyi.
    for (const suhde of [6, 1 / 6, 4, 1 / 4, 16 / 9, 9 / 16]) {
      const nakyva = kokonakyma(map, suhde);
      assert.ok(pohja.y <= nakyva.y && pohja.y + pohja.h >= nakyva.y + nakyva.h,
        `${map.nimi}: paperi loppuu pystysuunnassa kuvasuhteella ${suhde.toFixed(2)}`);
      if (map.kiertava) continue; // vaakasuunnan hoitaa kierron kopio
      assert.ok(pohja.x <= nakyva.x && pohja.x + pohja.w >= nakyva.x + nakyva.w,
        `${map.nimi}: paperi loppuu vaakasuunnassa kuvasuhteella ${suhde.toFixed(2)}`);
    }
  }
});

test('pohja on rasteroitavan taideryhmän ulkopuolella ja rae seuraa pohjaa', () => {
  /*
   * Pohja EI voi olla taideryhmässä: yleiskuvassa taide on
   * bittikarttapyramidin pohjataso, joka kattaa vain laudan ja 12 % sen
   * ympäriltä, ja vektorit poistetaan heti sen valmistuttua.
   */
  const pohjaKutsu = ui.indexOf('drawPaperPohja(svg, pack.map');
  const staattinen = ui.indexOf("el('g', { class: 'staattinen' }, root)");
  assert.ok(pohjaKutsu > 0, 'pergamentin pohjaa ei piirretä lainkaan');
  assert.ok(pohjaKutsu < staattinen,
    'pohja piirretään vasta taideryhmän jälkeen — se jäisi kartan päälle');
  // Rae kattaa pohjan eikä pelkkää arkkia: muuten jatke olisi sileää
  // väriä rakeisen pinnan vieressä.
  assert.match(art, /export function drawPaperOverlay[\s\S]{0,900}const PAPER = paperinPohja\(map\);/,
    'rakeisuus ei kata pergamentin pohjaa');
});
