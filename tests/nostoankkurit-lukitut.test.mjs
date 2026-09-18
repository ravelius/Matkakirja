/*
 * LUKITUT KARTTA-ANKKURIT: TAULU ON DATAA, JOTA PELI USKOO SUORAAN.
 *
 * Raamattu KARTTAUUDISTUKSEN PAATOKSET 33 TARKENNUS 2 kohta 5: Ranskan
 * nostot poltetaan nostotasolle, ja poltetun pisteen on oltava TASAN
 * siinä, missä elävä nimiö ja osumapinta ovat. Koska levitys
 * (js/pallolauta/nostoankkurit.js) tehdään saapumiskehyksessä, jonka
 * mitat ovat RUUTUKOON funktio, ankkuri ei voi olla laskettu — se on
 * viety kerran puhelimen kehyksestä ja luetaan datasta
 * (js/packs/nostoankkurit-fra.js, tools/vie-nostoankkurit.mjs).
 *
 * Peli ei tarkista taulua mitenkään: lukittu ankkuri ohittaa
 * levityksen sellaisenaan. Siksi taulun kelpoisuus on vartioitava
 * tässä. Neljä väitettä:
 *
 *   1. AVAIN ON NOSTOKERROKSEN AVAIN. Vain `nosto:` ja `naapuri:`
 *      kelpaavat. `aihemerkki:` ei: aihenosto syntyy ryhmityksessä
 *      jäsentensä keskiarvona, joten sen lukitseminen jäädyttäisi
 *      ryhmän, joka voi laillisesti vaihtua. `piste:` ja `laudan:`
 *      ovat kaupunkirivejä, joita ei levitetä lainkaan.
 *   2. KOORDINAATTI ON KELVOLLINEN JA RANSKASSA. Taulusta luettu
 *      piste menee suoraan kartalle; yksi näppäilyvirhe siirtäisi
 *      noston toiselle mantereelle ilman että mikään huomauttaisi.
 *   3. PELI LUKEE TAULUN SELLAISENAAN. `lukittuAnkkuri` palauttaa
 *      jokaiselle avaimelle saman luvun kuin taulussa on.
 *   4. TUNTEMATON AVAIN EI SAA ANKKURIA. Muuten kirjoitusvirhe
 *      avaimessa jäisi hiljaiseksi: nosto latoutuisi levityksellä ja
 *      karkaisi poltetusta musteesta.
 *
 * Testi ei käytä selainta eikä verkkoa.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { NOSTOANKKURIT_FRA, NOSTOANKKURIT_FRA_KEHYS } from '../js/packs/nostoankkurit-fra.js';
import { lukittuAnkkuri, lukittujaAnkkureita } from '../js/pallolauta/nostoankkurit.js';

/** Ranskan laatikko, sama kuin polton `--alue` (lon0,lat0,lon1,lat1). */
const RANSKA = {
  lng0: -5, lat0: 41, lng1: 10, lat1: 52,
};

const avaimet = Object.keys(NOSTOANKKURIT_FRA);

test('taulussa on ankkureita ja kehys on kirjattu', () => {
  assert.ok(avaimet.length > 0, 'nostoankkurit-fra.js on tyhjä');
  assert.equal(lukittujaAnkkureita(), avaimet.length);
  assert.match(NOSTOANKKURIT_FRA_KEHYS.ruutu, /^\d+x\d+$/);
  assert.ok(NOSTOANKKURIT_FRA_KEHYS.vietty, 'kehyksestä puuttuu vientipäivä');
});

test('avain on nostokerroksen oma avain, ei aihemerkki eikä kaupunkirivi', () => {
  for (const avain of avaimet) {
    assert.ok(
      avain.startsWith('nosto:') || avain.startsWith('naapuri:'),
      `kelpaamaton avain ${avain} — vain nosto: ja naapuri: voidaan lukita`,
    );
  }
});

test('jokainen ankkuri on kelvollinen piste Ranskan laatikossa', () => {
  for (const [avain, a] of Object.entries(NOSTOANKKURIT_FRA)) {
    assert.ok(Number.isFinite(a?.lat) && Number.isFinite(a?.lng), `${avain}: ei lukua`);
    assert.ok(a.lat >= RANSKA.lat0 && a.lat <= RANSKA.lat1, `${avain}: lat ${a.lat} laatikon ulkona`);
    assert.ok(a.lng >= RANSKA.lng0 && a.lng <= RANSKA.lng1, `${avain}: lng ${a.lng} laatikon ulkona`);
  }
});

test('peli lukee taulun sellaisenaan eikä keksi tuntemattomia', () => {
  for (const [avain, a] of Object.entries(NOSTOANKKURIT_FRA)) {
    assert.deepEqual(lukittuAnkkuri(avain), { lat: a.lat, lng: a.lng });
  }
  assert.equal(lukittuAnkkuri('nosto:ei-ole-olemassa'), null);
  assert.equal(lukittuAnkkuri(''), null);
  assert.equal(lukittuAnkkuri(undefined), null);
});
