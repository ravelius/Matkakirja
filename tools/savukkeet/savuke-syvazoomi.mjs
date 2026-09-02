/*
 * Savuke: SYVÄN ZOOMIN MERKIT PYSYVÄT KASASSA JA RUUTUKOOSSA.
 *
 * OMISTAJAN BUGIRAPORTTI 2.9.2026, sanatarkasti: *"symbolit heittelee
 * muodoiltaa ja tekstejä puuttuu"* (Bulgaria, mittajana 50 km) — ja
 * saman päivän toinen kaappaus Sofiasta: siirtoviivat valtavina,
 * nostosymbolit pikkuruisina ja nimet kymmenien pikselien päässä
 * symboleistaan.
 *
 * ── MIKSI SAVUKE EIKÄ YKSIKKÖTESTI ────────────────────────────────
 *
 * Vika oli kolmen kerroksen VÄLISSÄ eikä yhdessäkään niistä. Jokainen
 * kerros oli itsessään oikein — maastomerkki oli karttavakio, nosto oli
 * ruutukatossa, siirtoviiva oli ladontamitassa — ja vasta yhdessä
 * kuvassa mitattuna ero näkyi. Sitä ei voi lukea koodista eikä ilman
 * oikeaa asettelua: mitta on RUUTUPIKSELI, ja se syntyy vasta kun
 * lauta, zoomi ja laitteen pikselitiheys ovat kaikki paikallaan.
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *
 *   1. SAMA LAJI, SAMA KOKO. Yhdessä näkymässä kaikki nostosymbolit
 *      ovat samankokoisia (max/min = 1) ja kaikki maastokolmiot
 *      samankokoisia.
 *   2. KERROSTEN KOOT SAMASSA SUURUUSLUOKASSA. Maastokolmio ja
 *      nostosymboli eivät saa erota moninkertaisesti — juuri se oli
 *      *"symbolit heittelee muodoiltaa"* (mitattu ennen 3,92, raja 1,5).
 *   3. KOKO ON RUUTUVAKIO SYVYYDESTÄ RIIPPUMATTA. Sama merkki kahdella
 *      eri zoomilla on ruudulla saman kokoinen ±10 %. Ilman tätä
 *      kasvukatto voisi kadota huomaamatta ja vika palaisi.
 *   4. SIIRTOVIIVA EI PAKSUUNNU KARTAN MUKANA (mitattu ennen 8,87 px
 *      kun tilattu on 1,6; raja 3).
 *   5. NIMI ON MERKKINSÄ VIERESSÄ. Rako symbolin reunasta nimiön
 *      reunaan on pieni (mitattu ennen 16,3 px, raja 6).
 *   6. EI NIMETTÖMIÄ SYMBOLEJA. Yksikään maastokolmio ei ole kartalla
 *      ilman nimeä (Raamattu: *"kartalla ei ole merkkiä ilman nimeä"*),
 *      eikä yksikään nimellinen nosto jää ilman nimiötään ruudulla.
 *
 * KAKSI SYVYYTTÄ: z6-porras (mittajana ~100 km) ja z8-porras (~50 km,
 * omistajan oma näkymä eli laattapyramidin pohjan yli). Juuri niiden
 * VÄLILLÄ vika kasvoi, joten yksi näkymä ei riittäisi.
 */
import { mittaaSyvaZoomi, tiivista } from './mittaa-syvazoomi.mjs';

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

/* Ylärajat ovat mitattuja, ei arvattuja — ks. tiedoston johdanto. */
const LAJIEN_SUURIN_SUHDE = 1.5;
const VIIVAN_SUURIN_LEVEYS = 3;
const NIMION_SUURIN_RAKO = 6;
const SYVYYKSIEN_SUURIN_ERO = 0.1;

const mitat = [];
for (const askelia of [6, 8]) {
  // eslint-disable-next-line no-await-in-loop
  const m = await mittaaSyvaZoomi({ kaupunki: 'sofia', askelia });
  const t = tiivista(m);
  mitat.push(t);
  const nimi = `zoomiporras +${askelia} (skaala ${t.skaala})`;
  console.log(`\n=== ${nimi} ===`);
  console.log(JSON.stringify(t, null, 1));

  vaadi(`${nimi}: nostosymbolit samankokoisia`,
    t.nostosymboleja === 0 || t.nostonSisainenHajonta <= 1.01,
    `hajonta ${t.nostonSisainenHajonta} (${t.nostonKokoMin}…${t.nostonKokoMax} px)`);
  vaadi(`${nimi}: maastokolmiot samankokoisia`,
    t.vuorisymboleja === 0 || t.vuorenKokoMax / Math.max(0.01, t.vuorenKokoMin) <= 1.01,
    `${t.vuorenKokoMin}…${t.vuorenKokoMax} px`);
  /*
   * KUMPI TAHANSA SUUNTA ON VIKA: maastokolmio ei saa olla moninkertainen
   * nostoon nähden eikä toisin päin. Suhde luetaan siksi molemmin päin.
   */
  const suhde = t.vuoriVsNosto;
  vaadi(`${nimi}: kerrosten symbolit samassa suuruusluokassa`,
    suhde === null || (suhde <= LAJIEN_SUURIN_SUHDE && suhde >= 1 / LAJIEN_SUURIN_SUHDE),
    `kolmio/nosto = ${suhde} (kolmio ${t.vuorenKokoMax} px, nosto ${t.nostonKokoMax} px)`);
  vaadi(`${nimi}: siirtoviiva ei paksuunnu kartan mukana`,
    t.viivanLeveysPx === null || t.viivanLeveysPx <= VIIVAN_SUURIN_LEVEYS,
    `${t.viivanLeveysPx} px (raja ${VIIVAN_SUURIN_LEVEYS})`);
  vaadi(`${nimi}: nimiö on symbolinsa vieressä`,
    t.nimionRakoMax === null || t.nimionRakoMax <= NIMION_SUURIN_RAKO,
    `rako ${t.nimionRakoMax} px (raja ${NIMION_SUURIN_RAKO})`);
  vaadi(`${nimi}: ei nimetöntä maastokolmiota`,
    t.nimettomiaVuoria === 0,
    `${t.nimettomiaVuoria} kolmiota ilman nimeä`);
  vaadi(`${nimi}: jokainen nimellinen nosto sai nimiönsä`,
    t.nimettomiaNostoja === 0,
    `ilman nimiötä: ${t.nimettomatNostot.join(', ')}`);
}

/*
 * SAMA MERKKI KAHDELLA SYVYYDELLÄ — tämä on se vartio, joka olisi
 * huomannut alkuperäisen vian. Kasvukaton purressa merkin RUUTUKOKO ei
 * riipu zoomista lainkaan.
 */
const [matala, syva] = mitat;
const vertaa = (nimi, a, b) => {
  if (!(a > 0) || !(b > 0)) { vaadi(nimi, true, 'ei mitattavaa'); return; }
  const ero = Math.abs(a - b) / Math.max(a, b);
  vaadi(nimi, ero <= SYVYYKSIEN_SUURIN_ERO, `${a} px vs ${b} px (ero ${(ero * 100).toFixed(0)} %)`);
};
vertaa('maastokolmio on saman kokoinen molemmilla syvyyksillä',
  matala.vuorenKokoMax, syva.vuorenKokoMax);
vertaa('nostosymboli on saman kokoinen molemmilla syvyyksillä',
  matala.nostonKokoMax, syva.nostonKokoMax);
vertaa('siirtoviiva on saman levyinen molemmilla syvyyksillä',
  matala.viivanLeveysPx, syva.viivanLeveysPx);

console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
