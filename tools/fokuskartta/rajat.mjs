/*
 * MAIDEN RAJAT — viivatason rajasetit yhtenä datalähteenä.
 *
 * Tämä on tools/generoi-laattapyramidi.mjs:n moduuli, ei oma
 * työkalunsa. Hakija on tools/hae-maiden-rajat.mjs.
 *
 * === MIKSI OMA MODUULI JA OMA TIEDOSTOMUOTO ========================
 *
 * OMISTAJA 31.8.2026 ilta, kaksi lausetta samasta asiasta:
 *
 *   *"maiden rajat näyttävät puuttuvan"*  — rajat piirretään.
 *   *"äärimmäisen hyvä siinä vaiheessa kun mallinnetaan kartalla eri
 *   valtioiden kehityksiä vuosien saatossa esim. maailmansotien
 *   aikaan"*  — ja rajasetti on DATAA, ei koodia.
 *
 * Siksi rajaviivasto ei asu piirtomoottorissa eikä generaattorissa
 * vaan omassa tiedostossaan, jonka nimi on setin nimi. Toisen
 * aikakauden rajat ovat silloin uusi tiedosto tähän kansioon ja oma
 * viivatasoversio ämpärissä — ei yhtään riviä uutta piirtokoodia.
 * Piirtopassi (maailmapiirto.js `piirraRajatKankaalle`) saa pelkän
 * murtoviivaston eikä tunne yhtäkään valtiota.
 *
 * === MIKSI VALMIIKSI HARVENNETTU TIEDOSTO REPOSSA ==================
 *
 * Sama peruste kuin korkeusaineistolla (ks. .github/workflows/
 * generoi-pyramidi.yml: *"yksikään ajo ei saa riippua NOAA:n
 * tavoitettavuudesta"*), ja tässä on lisäksi oma syynsä:
 *
 * LUETTELOJOBI LASKEE PEITTEEN ILMAN SELAINTA JA ILMAN AINEISTOA
 * (`--vain-luettelo`). Peite kertoo, mitkä viivatason laatat ovat
 * olemassa, ja rajat ovat osa sitä peitettä. Jos rajat tulisivat
 * verkosta vain piirtoshardeille, luettelo ja levy olisivat eri
 * mieltä — juuri se vika, jonka varalta työlista ja bittikartta
 * lasketaan samasta funktiosta.
 *
 * Tiedosto on gzipattu JSON: Natural Earthin 2,3 Mt kutistuu 0,44
 * megatavuun, kun kärkipisteet harvennetaan samalla 0,006 asteen
 * kynnyksellä kuin rannikko (maailma.mjs meriRenkaat) ja pyöristetään
 * neljään desimaaliin. 0,006° on syvimmällä tasolla noin 1,4
 * kuvapikseliä, eli harvennus ei näy edes z7:llä.
 */
import { existsSync, readFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const TAALLA = dirname(fileURLToPath(import.meta.url));

/**
 * Tunnetut rajasetit: setin nimi -> tiedosto tässä kansiossa.
 *
 * NIMI ON VIIVATASON LUETTELOSSA (`viivataso.rajat`), jotta pelistä ja
 * ämpäristä näkee mitkä rajat kartalla on. Kun aikakausisettejä
 * joskus tulee, ne lisätään tähän tauluun ja valitaan
 * generaattorin `--rajasetti`-valitsimella.
 */
export const RAJASETIT = Object.freeze({
  nykyiset: 'rajat-nykyiset.json.gz',
});

/** Rajasetin tiedostopolku (myös silloin kun tiedostoa ei ole). */
export function rajasetinPolku(setti) {
  const nimi = RAJASETIT[setti];
  if (!nimi) throw new Error(`Tuntematon rajasetti: ${setti} `
    + `(tunnetut: ${Object.keys(RAJASETIT).join(', ')})`);
  return join(TAALLA, nimi);
}

/**
 * Rajaviivasto asteina: `{ setti, kuvaus, lahde, viivat }`, jossa
 * `viivat` on lista murtoviivoja `[[lon, lat], …]`.
 *
 * @param {string} setti RAJASETIT-taulun avain
 */
export function lueRajaviivasto(setti = 'nykyiset') {
  const polku = rajasetinPolku(setti);
  if (!existsSync(polku)) {
    throw new Error(`Rajasetti puuttuu: ${polku}\n`
      + 'Aja tools/hae-maiden-rajat.mjs (hakee Natural Earthin ja '
      + 'kirjoittaa harvennetun tiedoston).');
  }
  return JSON.parse(gunzipSync(readFileSync(polku)).toString('utf8'));
}

/**
 * Rajaviivasto LAUDAN yksiköihin.
 *
 * Sauman katkaisu jätetään piirtoon (maailmapiirto.js
 * `piirraRajatKankaalle`) eikä tehdä tässä, koska se on sama sääntö
 * kuin rannikolla ja joilla: projektio kiertää x:n välille
 * [0, leveys), ja piirto katkaisee viivan siellä missä x hyppää yli
 * puolen kuvan. Kaksi paikkaa samalle säännölle ehtisi eriytyä.
 *
 * @param {object} viivasto lueRajaviivasto()
 * @param {{lautaX:Function, lautaY:Function}} kaava laudanProjektio()
 * @param {{lat0:number, lat1:number}} [laatikko] arkin leveyspiirit
 */
export function rajatLaudalle(viivasto, kaava, laatikko = null) {
  const ulos = [];
  for (const viiva of viivasto.viivat) {
    /*
     * ARKIN ULKOPUOLINEN PÄTKÄ KATKAISEE VIIVAN, ei jätä sitä pois:
     * raja voi kulkea arkin alareunan ali ja palata (Etelä-Amerikan
     * eteläkärki on 66 °S:n alapuolella), ja poisjättö veisi silloin
     * mukanaan sen osuuden, joka on arkilla.
     */
    let osa = [];
    const paata = () => { if (osa.length > 1) ulos.push(osa); osa = []; };
    for (const [lon, lat] of viiva) {
      if (laatikko && (lat < laatikko.lat0 - 1 || lat > laatikko.lat1 + 1)) { paata(); continue; }
      osa.push([kaava.lautaX(lon), kaava.lautaY(lat)]);
    }
    paata();
  }
  return ulos;
}
