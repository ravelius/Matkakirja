/*
 * Vartioi visakysymysten vaihtoehtojen pituusvinoumaa.
 *
 * TAUSTA. Sonnet 1 havaitsi ja Fable max vahvisti mittaamalla
 * (10.8.2026): kaarikysymyksissä oikea vastaus oli yksiselitteisesti
 * pisin vaihtoehto 45/69 kysymyksessä (odotusarvo ~25 %), koska
 * oikealle kirjoitetaan luontevasti selittävä sivulause ja väärät
 * jäävät tynkiksi. Tarkkaavainen pelaaja oppii silloin
 * metastrategian "valitse pisin" tuntematta aihetta. Max korjasi
 * pahimmat 23 (suhde ≥ 1,4) — tämä työkalu estää vinouman
 * palaamisen uusiin eriin (Maxin ja Sonnetin yhteinen ehdotus,
 * omistajan tiimin hyväksymä).
 *
 * Kaksi vartioitavaa (virhe → exit 1):
 *   a) oikea on yksiselitteisesti pisin yli 40 %:ssa kysymyksistä
 *      (koko aineisto JA kumpikin lauta erikseen — uusi lauta ei
 *      saa piiloutua vanhojen keskiarvoon);
 *   b) yksittäinen kysymys, jossa oikea on ≥ 1,4 × pisintä väärää
 *      pidempi — paitsi tunnetut poikkeukset, joissa oikeaa ei voi
 *      lyhentää eikä vääriä venyttää luontevasti.
 *
 * Käyttö: node tools/tarkista-vaihtoehdot.mjs [--selosta]
 */
import { KAARI_PAKETIT } from '../js/tyohuone-kehitys-data.js';

/*
 * Siinain oikea vastaus on 99 merkkiä (luostarin muuri ja historia
 * eivät tiivisty), eikä vääriä voi venyttää sataan merkkiin ilman
 * keinotekoisuutta. Max kavensi suhteen 2,25×:stä 1,16×:een — jos
 * tämä joskus ylittää rajan uudelleen, kysymys on kirjoitettu
 * uusiksi ja poikkeus pitää arvioida uudelleen.
 */
const SALLITUT = new Set([]);

const RAJA_OSUUS = 0.4;
const RAJA_SUHDE = 1.4;

/*
 * Lautajako luetaan kohteiden järjestyksestä: Euroopan kohteet ovat
 * ennen Lähi-idän ensimmäistä (aden). Erillistä lauta-kenttää ei
 * datassa ole, eikä sitä lisätä vain työkalua varten.
 */
const ME_ALKU = 'aden';

const selosta = process.argv.includes('--selosta');
const laudat = { eurooppa: [], lahiita: [] };
let lauta = 'eurooppa';
for (const kohde of KAARI_PAKETIT.kohteet) {
  if (kohde.id === ME_ALKU) lauta = 'lahiita';
  if (kohde.kysymys) laudat[lauta].push(kohde);
}

let virheita = 0;

for (const [nimi, kohteet] of Object.entries(laudat)) {
  let pisimpia = 0;
  for (const kohde of kohteet) {
    const { vaihtoehdot, oikea } = kohde.kysymys;
    const oikeanPituus = vaihtoehdot[oikea].length;
    const pisinVaara = Math.max(
      ...vaihtoehdot.filter((_, i) => i !== oikea).map((v) => v.length),
    );
    const pisin = oikeanPituus > pisinVaara;
    if (pisin) pisimpia += 1;
    const suhde = oikeanPituus / pisinVaara;
    if (selosta) {
      console.log(`${pisin ? 'PISIN' : '     '} ${suhde.toFixed(2)}  ${kohde.id}`);
    }
    if (suhde >= RAJA_SUHDE && !SALLITUT.has(kohde.id)) {
      console.log(`${kohde.id}: oikea on ${suhde.toFixed(2)} × pisintä väärää`
        + ` pidempi (raja ${RAJA_SUHDE}) — pidennä vääriä tai lyhennä oikeaa.`);
      virheita += 1;
    }
  }
  const osuus = kohteet.length ? pisimpia / kohteet.length : 0;
  const rivi = `${nimi}: oikea pisin ${pisimpia}/${kohteet.length}`
    + ` (${Math.round(osuus * 100)} %)`;
  if (osuus > RAJA_OSUUS) {
    console.log(`${rivi} — YLI ${Math.round(RAJA_OSUUS * 100)} %:n rajan.`
      + ' Pelaaja oppii valitsemaan pisimmän: sekoita pituuksia.');
    virheita += 1;
  } else {
    console.log(`${rivi} — kunnossa.`);
  }
}

process.exitCode = virheita ? 1 : 0;
