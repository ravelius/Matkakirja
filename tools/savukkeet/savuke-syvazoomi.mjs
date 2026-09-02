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
 *   3. KOKO ON VAKIO SYVYYDESTÄ RIIPPUMATTA — PAPERIN MITASSA. Sama
 *      merkki kahdella eri zoomilla on saman kokoinen ±10 % sen
 *      jälkeen, kun laatan venytys on jaettu pois. Ilman tätä
 *      kasvukatto voisi kadota huomaamatta ja vika palaisi.
 *   4. SIIRTOVIIVA EI PAKSUUNNU KARTAN MUKANA (mitattu ennen 8,87 px
 *      kun tilattu on 1,6; raja 3 paperipikseliä).
 *   5. NIMI ON MERKKINSÄ VIERESSÄ. Rako symbolin reunasta nimiön
 *      reunaan on pieni (mitattu ennen 16,3 px, raja 6 paperipikseliä).
 *   6. EI NIMETTÖMIÄ SYMBOLEJA. Yksikään maastokolmio ei ole kartalla
 *      ilman nimeä (Raamattu: *"kartalla ei ole merkkiä ilman nimeä"*),
 *      eikä yksikään nimellinen nosto jää ilman nimiötään ruudulla.
 *   7. KAIKKI MERKKIPERHEET SAMASSA MITASSA (lisätty 2.9.2026 illalla,
 *      omistaja: *"Osa nostoista vielä polttamatta ja väärän kokoisia"*).
 *      Neljä perhettä — karttanosto, eläintäky, maastokolmio, kaupunki —
 *      luetaan samasta kuvasta kahtena lukuna (symbolin halkaisija ja
 *      nimen kirjasinkoko), ja hajonta on rajattu. Perustelu ja mitatut
 *      luvut ovat vartion omassa lohkossa alempana.
 *   8. POLTETTU JA ELÄVÄ NOSTO OVAT SAMAN KOKOISIA (lisätty 2.9.2026,
 *      omistajan päätös: *"kun zoomataan z7:n yli, piirretyt merkit
 *      kasvavat samassa suhteessa kuin suurennettu karttakuva — koko
 *      kartta kuin yksi paperi suurennuslasin alla"*). Poltettu nosto
 *      venyy z7-laatan mukana; ennen tätä erää elävä jäi ruutukattoon
 *      ja ero oli mitattuna 1,74 (iPhone 25 km) ja 2,57 (iPad 25 km).
 *
 * ── PAPERIN MITTA ON KOLMEN VARTION YKSIKKÖ ───────────────────────
 *
 * Vartiot 3-5 lukivat CSS-pikseleitä. Omistajan päätöksen jälkeen se
 * olisi väärä yksikkö juuri syvässä zoomissa: koko kartta on siellä
 * suurennuslasin alla, joten merkin, viivan ja raon KUULUU kasvaa
 * laatan mukana. Ne luetaan siksi PAPERIPIKSELEINÄ eli jaettuna
 * venytyksellä (js/nostoladonta.js nostoladontaVenytys, mitassa
 * `poltettuNosto.venytys`) — se on täsmälleen sama luku kuin ennen
 * z7:ään asti, ja sen yli se on se luku, jonka omistaja tilasi.
 *
 * KOLME NÄKYMÄÄ: Sofian z6-porras (mittajana ~100 km) ja z8-porras
 * (~50 km) iPadilla — juuri niiden VÄLILLÄ vika kasvoi, joten yksi
 * näkymä ei riittäisi — sekä omistajan oma puhelinnäkymä (iPhone
 * 402 x 874 dpr 3, Kreikka, mittajana 25 km), josta jälkimmäinen
 * bugiraportti on kirjoitettu.
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
/* Vartio 8: poltettu ja elävä nosto saman kokoisia (kumpaan suuntaan tahansa). */
const POLTETUN_SUURIN_ERO = 1.1;

/**
 * Näkymän oma venytys: paljonko z7-laatta on suurennettu (>= 1).
 * Vartiot 3-5 lukevat mittansa tässä yksikössä — ks. johdanto.
 */
const venytys = (t) => (t?.poltettuNosto?.venytys > 0 ? t.poltettuNosto.venytys : 1);
const paperilla = (px, t) => (px === null || px === undefined
  ? null : +(px / venytys(t)).toFixed(2));

/*
 * ── VARTIO 7: KAIKKI MERKKIPERHEET SAMASSA MITASSA ────────────────
 *
 * OMISTAJAN TOINEN BUGIRAPORTTI 2.9.2026 (iPhone, Kreikka, mittajana
 * 25 km), sanatarkasti: *"Siirto viivat aivan liian paksuja. Osa
 * nostoista vielä polttamatta ja väärän kokoisia"*.
 *
 * Vartiot 1–2 vertasivat KAHTA perhettä (maastokolmio ja nosto). Kartan
 * päällä niitä on neljä, ja kolmas — eläintäky — oli koko ajan ulkona
 * mittauksesta ja siksi ulkona myös katosta: mitattuna 2,7-kertainen
 * viereiseen karttanostoon nähden. Vartio lukee nyt jokaisen perheen
 * kaksi lukua samasta kuvasta (symbolin halkaisija, nimen kirjasinkoko)
 * ja vaatii hajonnalta saman rajan kuin vartio 2.
 *
 * SUHDE ON OMA VARTIONSA. Kaksi perhettä voi olla samankokoinen ja
 * silti eri mitassa, jos toisen nimi on iso ja symboli pieni. Normi on
 * se suhde, jolla nosto POLTETAAN laattaan (js/nostoladonta.js
 * NOSTOLADONTA_MERKKISUHDE = 13/11 = 1,18) — poltettua kuvaa ei voi
 * enää muuttaa, joten se on kartan mitta eivätkä elävät kerrokset.
 *
 * KOLMAS NÄKYMÄ ON OMISTAJAN OMA (iPhone 402 x 874 dpr 3, Kreikka,
 * mittajana 25 km). Kaksi ensimmäistä ovat iPadin näkymiä Sofiasta;
 * juuri puhelimen syvä zoomi on se, jossa kaikki neljä perhettä
 * eroavat eniten, ja se on myös se kuva, jonka omistaja lähetti.
 */
const PERHEIDEN_SUURIN_HAJONTA = 1.5;
const SUHTEEN_SUURIN_POIKKEAMA = 1.5;

/** Perhetaulukko yhdestä näkymästä — sama muotoilu joka näkymälle. */
const tarkastaPerheet = (nimi, t) => {
  const h = t.perheHajonta;
  const rivit = Object.entries(t.perheet)
    .map(([k, r]) => `${k} ${r.symboliPx}/${r.nimiPx} (${r.suhde})`).join('  ');
  console.log(`   perheet (symboli/nimi px, suhde): ${rivit}`);
  console.log(`   poltettu nosto (laskettu): ${JSON.stringify(t.poltettuNosto)}`);
  vaadi(`${nimi}: perheiden symbolit samassa mitassa`,
    h.perheita < 2 || h.symboli <= PERHEIDEN_SUURIN_HAJONTA,
    `hajonta ${h.symboli} (raja ${PERHEIDEN_SUURIN_HAJONTA}) — ${rivit}`);
  vaadi(`${nimi}: perheiden nimet samassa mitassa`,
    h.perheita < 2 || h.nimi <= PERHEIDEN_SUURIN_HAJONTA,
    `hajonta ${h.nimi} (raja ${PERHEIDEN_SUURIN_HAJONTA}) — ${rivit}`);
  vaadi(`${nimi}: symboli ja nimi kirjaston suhteessa (1,18)`,
    h.perheita === 0 || h.suhteenPoikkeama <= SUHTEEN_SUURIN_POIKKEAMA,
    `poikkeama ${h.suhteenPoikkeama} (raja ${SUHTEEN_SUURIN_POIKKEAMA}) — ${rivit}`);
  /*
   * VARTIO 8 (ks. johdanto). Poltettu nosto on laatan pikseleitä ja
   * venyy z7:n yli laatan mukana; elävän on venyttävä sen kanssa, tai
   * samassa kuvassa on kaksi eri kokoista Marathonia ja Delfoita.
   */
  vaadi(`${nimi}: poltettu ja elävä nosto saman kokoisia`,
    t.poltettuVsElava === null || t.poltettuVsElava <= POLTETUN_SUURIN_ERO,
    `poltettu ${t.poltettuNosto?.nimiPx} px vs elävä ${t.perheet?.nosto?.nimiPx} px`
      + ` = ${t.poltettuVsElava} (raja ${POLTETUN_SUURIN_ERO}, venytys ${venytys(t)})`);
};

const mitat = [];
for (const askelia of [6, 8]) {
  // eslint-disable-next-line no-await-in-loop
  const m = await mittaaSyvaZoomi({ kaupunki: 'sofia', askelia });
  const t = tiivista(m);
  mitat.push(t);
  const nimi = `zoomiporras +${askelia} (skaala ${t.skaala})`;
  console.log(`\n=== ${nimi} ===`);
  console.log(JSON.stringify(t, null, 1));

  tarkastaPerheet(nimi, t);
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
    t.viivanLeveysPx === null || paperilla(t.viivanLeveysPx, t) <= VIIVAN_SUURIN_LEVEYS,
    `${paperilla(t.viivanLeveysPx, t)} paperipx (ruudulla ${t.viivanLeveysPx},`
      + ` venytys ${venytys(t)}; raja ${VIIVAN_SUURIN_LEVEYS})`);
  vaadi(`${nimi}: nimiö on symbolinsa vieressä`,
    t.nimionRakoMax === null || paperilla(t.nimionRakoMax, t) <= NIMION_SUURIN_RAKO,
    `rako ${paperilla(t.nimionRakoMax, t)} paperipx (ruudulla ${t.nimionRakoMax},`
      + ` venytys ${venytys(t)}; raja ${NIMION_SUURIN_RAKO})`);
  vaadi(`${nimi}: ei nimetöntä maastokolmiota`,
    t.nimettomiaVuoria === 0,
    `${t.nimettomiaVuoria} kolmiota ilman nimeä`);
  vaadi(`${nimi}: jokainen nimellinen nosto sai nimiönsä`,
    t.nimettomiaNostoja === 0,
    `ilman nimiötä: ${t.nimettomatNostot.join(', ')}`);
}

/*
 * SAMA MERKKI KAHDELLA SYVYYDELLÄ — tämä on se vartio, joka olisi
 * huomannut alkuperäisen vian. Kasvukaton purressa merkin koko ei riipu
 * zoomista lainkaan PAPERIN MITASSA: ruudulla se kasvaa täsmälleen
 * laatan venytyksen verran ja ei tavuakaan enempää (omistaja 2.9.2026,
 * ks. johdanto). Jakolasku on siis vartion terävin osa — jos merkki
 * kasvaisi omia aikojaan, ero näkyisi tässä heti.
 */
const [matala, syva] = mitat;
const vertaa = (nimi, a, b) => {
  const ap = paperilla(a, matala);
  const bp = paperilla(b, syva);
  if (!(ap > 0) || !(bp > 0)) { vaadi(nimi, true, 'ei mitattavaa'); return; }
  const ero = Math.abs(ap - bp) / Math.max(ap, bp);
  vaadi(nimi, ero <= SYVYYKSIEN_SUURIN_ERO,
    `${ap} vs ${bp} paperipx (ruudulla ${a} / ${b}; ero ${(ero * 100).toFixed(0)} %)`);
};
vertaa('maastokolmio on saman kokoinen molemmilla syvyyksillä',
  matala.vuorenKokoMax, syva.vuorenKokoMax);
vertaa('nostosymboli on saman kokoinen molemmilla syvyyksillä',
  matala.nostonKokoMax, syva.nostonKokoMax);
vertaa('siirtoviiva on saman levyinen molemmilla syvyyksillä',
  matala.viivanLeveysPx, syva.viivanLeveysPx);

/*
 * OMISTAJAN OMA NÄKYMÄ (ks. vartio 7): iPhone, Kreikka, mittajana
 * 25 km. Eläintäky on Kreikassa Peloponnesoksella eli usein juuri
 * ruudun laidan takana — mitta ei siksi rajaa sitä perhettä näkymään
 * (tools/savukkeet/mittaa-syvazoomi.mjs), koska perheen KOKO ei riipu
 * paikasta ja ilman sitä vartio olisi sokea juuri sille kerrokselle,
 * josta bugiraportti puhuu.
 */
const puhelin = tiivista(await mittaaSyvaZoomi({
  kaupunki: 'ateena', askelia: 9, ruutu: { width: 402, height: 874 }, dpr: 3,
}));
const puhelimenNimi = `omistajan näkymä (iPhone, Kreikka, ${puhelin.mittajana})`;
console.log(`\n=== ${puhelimenNimi} — skaala ${puhelin.skaala} ===`);
console.log(JSON.stringify(puhelin, null, 1));
vaadi(`${puhelimenNimi}: mittajana on 25 km kuten kaappauksessa`,
  puhelin.mittajana === '25 km', `jana ${puhelin.mittajana}`);
tarkastaPerheet(puhelimenNimi, puhelin);

console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
