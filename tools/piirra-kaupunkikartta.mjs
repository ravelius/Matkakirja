/*
 * Kaupunkisivun kohdekartan piirtäjä (omistajan toive 7.8.2026):
 * "pelkkä ydinkeskusta ... niin että hahmottaa hieman katuja",
 * malliksi näytetty Mapiful-juliste — yksinkertaistettu, taiteellinen
 * katuverkko ilman nimiä.
 *
 * Mapiful piirtää julisteensa OpenStreetMap-aineistosta, ja sama
 * tehdään tässä itse: Overpass-rajapinnasta haetaan ydinkeskustan
 * kadut, vedet, puistot ja radat, ja niistä piirretään SVG pelin
 * paperi- ja mustesävyin. SVG rasteroidaan PNG:ksi pelin omalla
 * Chromiumilla (sama kuin Playwright-tarkistuksissa) ja tallennetaan
 * assets/kartat/-kansioon — kartta toimii siis myös ilman verkkoa
 * eikä riipu Commonsin tiedostoista.
 *
 * Käyttö:  node tools/piirra-kaupunkikartta.mjs berliini
 * Tuloste: assets/kartat/<kaupunki>-keskusta.png ja rajat-lohko,
 *          joka liitetään js/packs/maakartat.js:n KAUPUNKIKARTAT-
 *          tauluun (pisteet asemoidaan siitä prosentteina).
 *
 * Uusi kaupunki: lisää KAUPUNGIT-tauluun rajaus, joka kattaa vain
 * ydinkeskustan kuuluisimmat kohteet (n. 5–8 km leveä alue — laajempi
 * muuttuu puuroksi). Aja työkalu ja KATSO kuva silmin ennen käyttöä.
 *
 * Lisenssi: OpenStreetMapin aineisto on ODbL — lähderiviksi peliin
 * "© OpenStreetMap-tekijät (ODbL)". Tyyli on pelin oma.
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Ydinkeskustojen rajaukset. Rajat asteina (WGS84). */
const KAUPUNGIT = {
  berliini: {
    // Mitte Tiergartenista East Side Gallerylle; kaikki kuusi
    // kohdetta (valtiopäivätalo, portti, Museumsinsel, tv-torni,
    // Checkpoint Charlie, East Side Gallery) osuvat alueelle.
    rajat: { pohjoinen: 52.54, etela: 52.485, lansi: 13.34, ita: 13.46 },
  },
  kairo: {
    // Niilin molemmat rannat Tahrir-aukiolta Islamilaiseen Kairoon:
    // Geziran saari lännessä, Khan el-Khalilin kujat ja sitadelli
    // idässä. Ensimmäinen rajaus jätti Niilin kuvan vasempaan reunaan
    // ja kohteet alalaitaan — tämä keskittää joen ja kohteet.
    // Pyramidit jäävät ulkopuolelle: ne ovat 15 km lännessä eivätkä
    // mahdu ydinkeskustaan ilman että kartta muuttuu puuroksi.
    rajat: { pohjoinen: 30.068, etela: 30.018, lansi: 31.198, ita: 31.278 },
  },
  madrid: {
    // Kuninkaanlinnalta Retiron puistoon, Gran Vían pohjoispuolelta
    // Atochan asemalle. Kaikki kuusi kohdetta (linna, Plaza Mayor,
    // Puerta del Sol, Cibeles, Prado, Alcalán portti) osuvat alueelle,
    // ja Retiron puisto tuo itälaitaan ison vihreän vastapainon
    // ruutukaavalle.
    rajat: { pohjoinen: 40.43, etela: 40.406, lansi: -3.72, ita: -3.675 },
  },
  tukholma: {
    // Kaupungintalolta Skansenille: Gamla stanin saari keskellä,
    // Riddarfjärden lännessä ja Djurgården idässä. Kaikki kuusi
    // kohdetta osuvat alueelle, ja vesi jakaa kuvan niin kuin se
    // jakaa kaupungin — Tukholmassa ranta on kartan pääpiirre.
    rajat: { pohjoinen: 59.342, etela: 59.313, lansi: 18.03, ita: 18.11 },
  },
  venetsia: {
    // Koko historiallinen keskusta rautatieasemalta Arsenaalille:
    // Canal Grande kaartaa kuvan halki S-kirjaimena, ja kaikki kuusi
    // kohdetta (asema, Ca' d'Oro, Rialto, Accademia, San Marco,
    // Arsenaali) osuvat alueelle. Muut Venetsian kartat ovat tästä
    // poikkeus siinä, että kohteiden väliset "kadut" ovat kujia ja
    // kanavia — ks. KADUT-taulun kommentti jalankulkuluokista.
    rajat: { pohjoinen: 45.445, etela: 45.4265, lansi: 12.3155, ita: 12.352 },
  },
  praha: {
    // Vltavan mutka: Petřínin kukkula ja Hradčany lännessä,
    // Vanhankaupungin sokkelo idässä, Václavin aukio oikeassa
    // alanurkassa. Joki tulee kuvaan alhaalta, kaartaa Kaarlensillan
    // kohdalla ja poistuu oikeasta ylänurkasta — loiva S kuvan halki.
    // Vyšehrad jää ulkopuolelle: se on 1,2 km etelämpänä, ja mukaan
    // ottaminen leventäisi kuvan niin ettei joen mutka enää erotu.
    rajat: { pohjoinen: 50.095, etela: 50.074, lansi: 14.382, ita: 14.446 },
  },
  wien: {
    // Ring on kuvan pääpiirre: purettu kaupunginmuuri jätti soikean
    // kehäkadun, jonka sisäpuolella katuverkko on sokkelo ja
    // ulkopuolella suoraviivainen. Koillisessa kaartaa Donaukanal ja
    // sen takana on Praterin vihreä. Schönbrunn jätettiin
    // ulkopuolelle: se on 4,3 km lounaaseen, ja mukaan ottaminen
    // vaatisi 7,2 km leveän rajauksen — sama päätös kuin Kairon
    // pyramidien kanssa.
    rajat: { pohjoinen: 48.22, etela: 48.188, lansi: 16.34, ita: 16.404 },
  },
  budapest: {
    // Kaksi kaupunkia yhdessä kuvassa: Budan kukkula lännessä, Pestin
    // tasanko idässä, ja Tonava vinosti niiden välissä (joen keskilinja
    // x 37 % ylhäällä, x 64 % alhaalla). Margitin sillalta
    // Vapaudensillalle eli neljä siltaa. Sankarien aukio ja
    // Széchenyin kylpylä jäävät ulos: ne ovat 3 km koilliseen, ja
    // mukaan ottaminen olisi työntänyt joen kuvan laitaan.
    rajat: { pohjoinen: 47.5125, etela: 47.4825, lansi: 19.019, ita: 19.079 },
  },
  pariisi: {
    // Eiffel-tornilta Notre-Damelle ja Montmartren laelle. Molemmat
    // mahtuvat (4,8 km toisistaan), eikä 6,6 km ole puuroa: Pariisin
    // korttelit ovat isoja, joten katutiheys on pienempi kuin
    // Lontoossa, jonka kartta on jo julkaistu.
    //
    // Hinta on etelälaita: Panthéon ja Luxembourgin puutarha jäävät
    // ulos. Vaihtoehto oli tiukempi rajaus ilman Montmartrea, mutta
    // silloin lapsen kaksi tunnetuinta kohdetta eivät olisi samassa
    // kuvassa.
    rajat: { pohjoinen: 48.892, etela: 48.847, lansi: 2.277, ita: 2.3675 },
  },
  lontoo: {
    // Hyde Parkin itälaidalta Tower Bridgelle, Regent's Parkin
    // eteläpuolelta Thamesin etelärannalle. Kaikki kuusi kohdetta
    // (Buckinghamin palatsi, Trafalgar Square, Big Ben, Lontoon silmä,
    // Pyhän Paavalin katedraali, Tower Bridge) osuvat alueelle, ja
    // Thames kaartaa kuvan halki tunnistettavana.
    rajat: { pohjoinen: 51.525, etela: 51.4925, lansi: -0.16, ita: -0.06 },
  },
};

/*
 * Katuluokkien piirtojärjestys ja -tyyli (pienestä isoon).
 *
 * MIEDOMPI KONTRASTI (omistajan toive 7.8.2026: "kokeile tehdä
 * kaupungin kartta miedommalla kontrastilla"). Ensimmäinen versio veti
 * pääkadut lähes mustina (#322717) vaalealle paperille, ja kartta
 * hallitsi sivua enemmän kuin sen kohteet. Sävyt nostettiin
 * pergamentin puoleen niin, että ero pienimmän ja suurimman kadun
 * välillä säilyy — kartta on yhä luettava, mutta se on nyt tausta eikä
 * julistetta. Viivanleveyksiä hiukan ohennettiin samasta syystä.
 *
 * TOINEN KEVENNYS (omistajan palaute 8.8.2026: "viivat vaaleammiksi,
 * erityisesti tummimmat"). Kevennys ei ole tasainen, ja se on
 * tarkoituksellista: tummin pää nousi paljon (#7a6a4d → #a08e64,
 * kontrasti paperiin 4,0:1 → 2,7:1) ja ohuin pää vain vähän
 * (#bcae91 → #c8bb9e). Jos molempia olisi kevennetty yhtä paljon,
 * tiheimpien kaupunkien pikkukadut olisivat kadonneet kokonaan —
 * Madridin ydinkeskusta on pelkkää pikkukatua ilman jokea tai rantaa,
 * ja se on näistä kuudesta herkin. Nyt luokkien väliset erot ovat
 * kapeammat mutta kaikki viisi luokkaa erottuvat yhä toisistaan.
 */
const KADUT = [
  { luokat: ['residential', 'unclassified', 'living_street', 'pedestrian'], vari: '#c8bb9e', leveys: 1.4 },
  { luokat: ['tertiary', 'tertiary_link'], vari: '#c1b394', leveys: 2.2 },
  { luokat: ['secondary', 'secondary_link'], vari: '#b5a583', leveys: 2.9 },
  { luokat: ['primary', 'primary_link'], vari: '#ab9a73', leveys: 3.7 },
  { luokat: ['trunk', 'trunk_link', 'motorway', 'motorway_link'], vari: '#a08e64', leveys: 4.6 },
];

/*
 * Sävyt pääkartan pergamenttipaletista (omistajan tarkennus 7.8.2026:
 * "pääkartan sävyinen, eli siniset ja vihreät pois"): vesi on järvien
 * #ecd9ae-perhettä hieman tummempana, jotta se erottuu paperista, ja
 * vesireuna sama #b99a68 kuin pääkartan meriviivoissa (.sea-echo).
 * Puistot ovat pelkkä kuiskaus paperia tummempaa — ei vihreää.
 */
const VESI = '#e8d5a9';
const VESIREUNA = '#b99a68';
const PUISTO = '#efe6ca';
const RATA = '#d5c9b0';
const PAPERI = '#f6eeda';

async function haeOverpass(rajat) {
  const alue = `(${rajat.etela},${rajat.lansi},${rajat.pohjoinen},${rajat.ita})`;
  const luokat = KADUT.flatMap((k) => k.luokat).join('|');
  const kysely = `[out:json][timeout:120];(
    way["highway"~"^(${luokat})$"]${alue};
    way["waterway"~"^(river|canal)$"]${alue};
    way["natural"~"^(water|coastline)$"]${alue};
    way["leisure"~"^(park|garden)$"]${alue};
    way["landuse"~"^(forest|grass|recreation_ground|cemetery)$"]${alue};
    way["railway"="rail"]${alue};
    /*
     * Isot järvet ja lahdet ovat OSM:ssä monikulmiorelaatioita, ja
     * niiden jäsenpoluilla ei ole omia merkintöjä — pelkkä
     * way["natural"="water"] ei siis löydä niitä lainkaan. Tukholmassa
     * se tarkoitti, että Riddarfjärden puuttui kartalta kokonaan.
     */
    relation["natural"="water"]${alue};
  );out geom;`;
  const vastaus = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: { 'User-Agent': 'matkakirja/1.0 (opetuspeli)' },
    // Rivinvaihdot pois: Overpass vastaa monirivisille 406.
    body: new URLSearchParams({ data: kysely.replace(/\s+/g, ' ') }),
    signal: AbortSignal.timeout(180000),
  });
  if (!vastaus.ok) throw new Error(`Overpass ${vastaus.status}`);
  return (await vastaus.json()).elements ?? [];
}

function piirra(kaupunki, elementit) {
  const { rajat } = KAUPUNGIT[kaupunki];
  const leveysAste = rajat.ita - rajat.lansi;
  const korkeusAste = rajat.pohjoinen - rajat.etela;
  const W = 1600;
  // Leveyspiirin venytys keskileveydellä — sama tasavälinen projektio
  // kuin sijaintikartoissa, joten prosenttiasemointi pysyy suorana.
  const venytys = 1 / Math.cos(((rajat.pohjoinen + rajat.etela) / 2) * (Math.PI / 180));
  const H = Math.round((W * (korkeusAste * venytys)) / leveysAste);
  const x = (lon) => (((lon - rajat.lansi) / leveysAste) * W).toFixed(1);
  const y = (lat) => (((rajat.pohjoinen - lat) / korkeusAste) * H).toFixed(1);
  const pisteet = (geom) => geom.map((p) => `${x(p.lon)},${y(p.lat)}`).join(' ');

  const kerrokset = { puistot: [], vedet: [], joet: [], radat: [], kadut: KADUT.map(() => []) };
  for (const e of elementit) {
    /*
     * Vesirelaation jäsenpolut piirretään samana rantanauhana kuin
     * rantaviiva: monikulmion kokoaminen ulko- ja sisärenkaineen olisi
     * paljon työtä siitä, mikä tässä tyylissä näkyy vain reunana.
     * Sisärenkaat (saaret järvessä) ovat sama nauha, ja se on oikein —
     * saaren ranta on ranta.
     */
    if (e.type === 'relation') {
      for (const jasen of e.members ?? []) {
        if (jasen.type === 'way' && jasen.geometry?.length) {
          kerrokset.joet.push(`<polyline points="${pisteet(jasen.geometry)}"/>`);
        }
      }
      continue;
    }
    if (e.type !== 'way' || !e.geometry?.length) continue;
    const t = e.tags ?? {};
    if (t.highway) {
      const i = KADUT.findIndex((k) => k.luokat.includes(t.highway));
      if (i >= 0) kerrokset.kadut[i].push(`<polyline points="${pisteet(e.geometry)}"/>`);
    } else if (t.waterway) {
      kerrokset.joet.push(`<polyline points="${pisteet(e.geometry)}"/>`);
    } else if (t.natural === 'coastline') {
      /*
       * Meri on OSM:ssä rantaviiva, ei vesialue: avomerta ei ole
       * piirretty minkään monikulmion sisään, vaan maa on rantaviivan
       * vasemmalla puolella. Sen täyttäminen vaatisi renkaiden
       * kokoamisen rajauslaatikkoa vasten, ja saaristossa siitä tulee
       * herkkä. Siksi rantaviiva piirretään SAMOIN KUIN JOKI: leveänä
       * vesivetona rannan myötäisesti.
       *
       * Se ei ole hätäratkaisu vaan pelin oma kartankieli — pääkartalla
       * meri on juuri tällainen rantaa myötäilevä viiva (.sea-echo,
       * sama sävy #b99a68). Ilman tätä Tukholma piirtyi kaupungiksi,
       * jonka keskellä on tyhjiä peltoja: Riddarfjärden ja Saltsjön
       * ovat rantaviivaa, joten ne jäivät paperin värisiksi.
       *
       * Mitta: veto on 14 px, ja 1600 px:n kuvassa se on Tukholman
       * rajauksella noin 40 metriä. Kapeimmatkin salmet (Strömmen,
       * noin 200 m) pysyvät siis auki.
       */
      kerrokset.joet.push(`<polyline points="${pisteet(e.geometry)}"/>`);
    } else if (t.natural === 'water') {
      kerrokset.vedet.push(`<polygon points="${pisteet(e.geometry)}"/>`);
    } else if (t.railway) {
      kerrokset.radat.push(`<polyline points="${pisteet(e.geometry)}"/>`);
    } else {
      kerrokset.puistot.push(`<polygon points="${pisteet(e.geometry)}"/>`);
    }
  }

  const katuryhmat = KADUT.map((k, i) => `<g fill="none" stroke="${k.vari}" stroke-width="${k.leveys}"
    stroke-linecap="round" stroke-linejoin="round">${kerrokset.kadut[i].join('')}</g>`).join('\n');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${PAPERI}"/>
  <g fill="${PUISTO}" stroke="none">${kerrokset.puistot.join('')}</g>
  <!-- Joen reunaviiva: leveämpi tumma veto alle, vesi päälle — jokeen
       tulee sama ohut ranta kuin vesialtaiden stroke-reunaan. -->
  <g fill="none" stroke="${VESIREUNA}" stroke-width="16.4" stroke-linecap="round"
     stroke-linejoin="round" opacity="0.55">${kerrokset.joet.join('')}</g>
  <g fill="none" stroke="${VESI}" stroke-width="14" stroke-linecap="round"
     stroke-linejoin="round">${kerrokset.joet.join('')}</g>
  <g fill="${VESI}" stroke="${VESIREUNA}" stroke-width="1.4">${kerrokset.vedet.join('')}</g>
  <g fill="none" stroke="${RATA}" stroke-width="1.4" stroke-dasharray="7 5">${kerrokset.radat.join('')}</g>
  ${katuryhmat}
</svg>`;
}

const kaupunki = process.argv[2];
if (!KAUPUNGIT[kaupunki]) {
  console.error(`Anna kaupunki: ${Object.keys(KAUPUNGIT).join(', ')}`);
  process.exit(1);
}
console.log('Haetaan OpenStreetMap-aineisto (Overpass)…');
const elementit = await haeOverpass(KAUPUNGIT[kaupunki].rajat);
console.log(`${elementit.length} elementtiä.`);
const svg = piirra(kaupunki, elementit);
mkdirSync(resolve(JUURI, 'assets/kartat'), { recursive: true });
const svgPolku = resolve(JUURI, `assets/kartat/${kaupunki}-keskusta.svg`);
writeFileSync(svgPolku, svg);
// Rasterointi PNG:ksi pelin Chromiumilla: SVG:n koko katuverkko on
// selaimelle raskas joka avauksella — PNG piirtyy heti.
const pngPolku = resolve(JUURI, `assets/kartat/${kaupunki}-keskusta.png`);
const skripti = `
const { chromium } = require('playwright');
(async () => {
  const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });
  const sivu = await (await selain.newContext({ viewport: { width: 10, height: 10 } })).newPage();
  await sivu.goto('file://${svgPolku}');
  const koko = await sivu.evaluate(() => {
    const s = document.querySelector('svg');
    return { w: Number(s.getAttribute('width')), h: Number(s.getAttribute('height')) };
  });
  await sivu.setViewportSize({ width: koko.w, height: koko.h });
  await sivu.screenshot({ path: '${pngPolku}' });
  await selain.close();
})();`;
/*
 * NODE_PATH mukaan, koska playwright ei ole pelin riippuvuus vaan
 * ympäristön: kontissa se on /opt/node22/lib/node_modules. Ilman tätä
 * rasterointi kaatui "Cannot find module 'playwright-core'" -virheeseen
 * vasta SVG:n valmistuttua, eli työ oli jo tehty kun se kaatui.
 */
execFileSync('node', ['-e', skripti], {
  cwd: JUURI,
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_PATH: [process.env.NODE_PATH, '/opt/node22/lib/node_modules']
      .filter(Boolean).join(':'),
  },
});
const rajat = KAUPUNGIT[kaupunki].rajat;
console.log(`Valmis: assets/kartat/${kaupunki}-keskusta.png`);
console.log('KAUPUNKIKARTAT-rivit:');
console.log(`    polku: 'assets/kartat/${kaupunki}-keskusta.png',`);
console.log(`    lahde: '© OpenStreetMap-tekijät (ODbL)',`);
console.log(`    rajat: { pohjoinen: ${rajat.pohjoinen}, etela: ${rajat.etela}, lansi: ${rajat.lansi}, ita: ${rajat.ita} },`);
