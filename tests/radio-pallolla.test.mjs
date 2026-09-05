import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

/*
 * MAAILMANRADIO PALLOLLA (aalto 2B, docs/moduulit/karttapallo.md luku
 * 10.1: "Jokainen linssi saa `pallolle(lauta, tila)`").
 *
 * Radiotila on ääntä ja DOM:ia, eikä sitä Nodessa aja mikään — mutta
 * neljä asiaa rikkoutuisi hiljaa, ja ne tarkistetaan tässä:
 *
 *   1. SOPIMUS ON OLEMASSA: `pallolle` on funktio sekä moduulin
 *      vientilistalla että LINSSI-oliossa (js/ui.js pallolinssiKelpaa
 *      lukee juuri jälkimmäisen — ilman sitä pallolauta avaisi radiolle
 *      yhä tasokartan linssikartaksi).
 *   2. PIIRTO KULKEE LAUDAN LINSSIAPURIN KAUTTA (`lauta.linssit.merkit`)
 *      eikä Globe.gl-instanssiin, ja purku ottaa saman osan.
 *   3. KIERTOKOHDAT EIVÄT TULE PALLOLLE: kiertävän tasokartan sauman
 *      kaksoiskopio on kartan asia, ja pallolla se piirtäisi jokaisen
 *      napin kahdesti.
 *   4. RADIOTILA OMISTAA PALLON: pallon oma napautus ei avaa lehteä eikä
 *      siirrä nappulaa, ja nopanheiton kohteet ovat piilossa — sama kuin
 *      tasokartalla, jossa drawTargets piirtää vain radion napit.
 */

const lue = (polku) => readFileSync(new URL(polku, import.meta.url), 'utf8');
const lahde = lue('../js/linssit/radio.js');
const { LINSSI, pallolle } = await import('../js/linssit/radio.js');

/** Radion pallo-osuus: kaikki tämän aallon koodi asuu tässä lohkossa. */
const palloLohko = lahde.slice(lahde.indexOf('maailmanradio pallolla'));

test('sopimus: radiolla on pallolle sekä vientinä että LINSSI-oliossa', () => {
  assert.equal(typeof pallolle, 'function');
  assert.equal(typeof LINSSI.pallolle, 'function', 'ui.pallolinssiKelpaa lukee LINSSI.pallolle');
  // Kerroksettomuus säilyy: radio on kartan TILA eikä karttakerros.
  assert.equal(LINSSI.kerros, false);
});

test('pallolle antaa kahvan, joka purkaa oman osansa laudan linssiapurista', () => {
  const kutsut = [];
  const lauta = {
    asteet: (kohta) => ({ lat: kohta.y, lon: kohta.x }),
    linssit: {
      merkit: (osa, lista) => kutsut.push(['merkit', osa, lista.length]),
      pura: (osa) => kutsut.push(['pura', osa]),
    },
  };
  const kahva = pallolle(lauta);
  assert.equal(typeof kahva.pura, 'function');
  // Radiotila ei ole päällä (js/ui.js kytkee sen vasta tämän jälkeen),
  // joten nappeja ei piirretä yhtään — eikä mitään kaadu.
  assert.deepEqual(kutsut.filter((k) => k[0] === 'merkit'), []);
  kahva.pura();
  assert.deepEqual(kutsut.at(-1), ['pura', 'radio'], 'purku ottaa osan "radio"');

  // Lauta ilman linssiapuria (tasokartta, vanha tallenne) ei kaada mitään.
  const tyhja = pallolle({});
  assert.equal(typeof tyhja.pura, 'function');
  tyhja.pura();
});

test('napit piirretään linssiapurilla, ei Globe.gl:ään', () => {
  assert.match(palloLohko, /linssit\.merkit\(PALLON_OSA, pallonNapit\(\)\)/);
  assert.match(palloLohko, /const PALLON_OSA = 'radio';/);
  assert.match(palloLohko, /linssit\.pura\(PALLON_OSA\)/);
  // Datumissa on sopimuksen kentät (karttapallo.md 10.1 merkit-rivi).
  assert.match(palloLohko, /avain: id,/);
  assert.match(palloLohko, /lat: asteina\.lat,/);
  assert.match(palloLohko, /lng: asteina\.lon,/);
  assert.match(palloLohko, /elementti: pallonNappiElementti,/);
  assert.match(palloLohko, /asettele: paivitaPallonNappi,/);
  // Nappi on nappi: rooli ja ruudunlukijan teksti kuten kartalla.
  assert.match(palloLohko, /setAttribute\('role', 'button'\)/);
  assert.match(palloLohko, /setAttribute\('aria-label'/);
  // Napautus tekee saman kuin kartalla: virittää kaupunkiin.
  assert.match(palloLohko, /soitaKaupunki\(d\.avain\)/);
  // Karsinta on sama kuin kartalla (yksi kaupunki per maa,
  // radionKaupungit → tila.naytettavat; ks. tests/radio.test.mjs).
  assert.match(palloLohko, /if \(!tila\.naytettavat\.has\(id\)\) continue;/);
  assert.match(palloLohko, /tila\.kanavalliset\.has\(id\)/);
  // Kamera ajetaan laudan omalla ajolla, ei omalla koneistolla.
  assert.match(palloLohko, /kamera\.ajaKamera\(/);
  // Pallolla ei kosketa Globe.gl:ään suoraan.
  assert.doesNotMatch(palloLohko, /pallo\.(htmlElementsData|pointsData|scene)\(/);
});

test('kiertokohdat jäävät tasokartalle', () => {
  // Kartan nappipiirto käyttää niitä yhä (kiertävä lauta, sauman kopio).
  assert.match(lahde, /export function piirraKaupunkinapit\(ryhma, kaupungit = \[\], \{ kiertoKohdat = null \} = \{\}\)/);
  assert.doesNotMatch(palloLohko, /kiertoKohdat/, 'pallolla ei ole saumaa eikä kaksoiskopioita');
});

test('soivan aseman vaihtuminen päivittää napit, radiotilan sulku purkaa ne', () => {
  // kerroMuutos on radiotilan ainoa "jokin muuttui" -piste, ja sen kautta
  // myös pallon napit päivittyvät samoilla avaimilla (ei purkua).
  assert.match(lahde, /function kerroMuutos\(\) \{\n(?:.*\n)*?\s*tahdistaPallonNapit\(\);/);
  // pois() purkaa merkit heti kun tila on nollattu.
  assert.match(lahde, /tila = null;\n(?:.*\n)*?\s*tahdistaPallonNapit\(\);/);
  // Sama datum säilyy: lista asetetaan uudelleen, avaimena kaupungin id.
  assert.match(palloLohko, /pallonAsu = \{ tila, cityId \};/);
});

test('ui: radion karttakutsut on portitettu nukkuvalle tasokartalle', () => {
  const ui = lue('../js/ui.js');
  // drawTargets on ainoa paikka, joka piirtää napit kartalle — ja se
  // palaa heti, kun kerrosta ei ole (pallolauta).
  assert.match(ui, /if \(!this\.targetLayer\) return;/);
  const kohta = ui.indexOf('if (!this.targetLayer) return;');
  const napit = ui.indexOf('this.radioModuuli.piirraKaupunkinapit(');
  assert.ok(kohta > 0 && napit > kohta, 'portin on oltava ennen radion nappeja');
  // Radiotila kytketään yhä tahdistaRadiossa, kummallakin laudalla.
  assert.match(ui, /document\.body\.classList\.add\('radio-tila'\);/);
});

test('radiotila omistaa pallon: kohteet piiloon ja pinnan napautus vaiti', () => {
  const lauta = lue('../js/pallolauta/lauta.js');
  // Molemmat pelin napautuspolut (pinta ja kaupunkipiste) kulkevat näiden
  // kahden funktion kautta, ja radiotilassa ne eivät tee mitään.
  const kaupunki = lauta.indexOf('const napautaKaupunki = (k) => {');
  const kohde = lauta.indexOf('const napautaKohde = (kohde) => {');
  assert.ok(kaupunki > 0 && kohde > 0);
  assert.match(lauta.slice(kaupunki, kaupunki + 900), /if \(ui\.radioPaalla\?\.\(\)\) return false;/);
  assert.match(lauta.slice(kohde, kohde + 500), /if \(ui\.radioPaalla\?\.\(\)\) return false;/);

  const css = lue('../css/radio.css');
  // Nappi ottaa napautuksen, vaikka muut pallon merkit eivät ota.
  assert.match(css, /\.pallolauta-merkki\.pallolauta-radionappi \{[^}]*pointer-events: auto;/);
  // Pallon takana oleva (näkymätön) nappi ei ota napautusta.
  assert.match(css, /\.pallolauta-radionappi\.pallolauta-takana \{ pointer-events: none; \}/);
  // Nopanheiton kohteet väistyvät kuten tasokartalla.
  assert.match(css, /body\.radio-tila \.pallolauta-kohde \{ display: none; \}/);
});
