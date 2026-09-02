/*
 * Savuke: MATKAKIRJAN IHME NÄHTÄVYYSIKKUNASSA.
 *
 * Omistajan tilaus 27.8.2026 ilta, kaappaus kohdenäkymästä
 * (KOHDE 1 · Antiikin agora): *"täällä pitäisi olla myöskin se ihme
 * nähtävillä"*. Ihme oli siihen asti vain fokusmoodin kartan
 * tietoruudussa (savuke-fokuskohteet), vaikka sama paikka on
 * kaupunkikartalla oma juttunsa.
 *
 * Säännöt ovat samat kuin kortissa, ja juuri se tässä mitataan:
 *
 *   1. YHÄ OLEMASSA oleva kohde (Ateenan Antiikin agora): kuvat
 *      pysyvät ennallaan ja "Koe ihme" -nappi tulee KUVAN ALLE,
 *      leipätekstin jatkon eteen. Jutussa itsessään ei ole nauhaa.
 *   2. Nappi avaa suurennoksen NÄHTÄVYYSIKKUNAN SISÄÄN (modaali
 *      <dialog> on selaimen ylimmässä kerroksessa: bodyyn liitetty
 *      suurennos jäisi sen taakse), ja suurennoksessa on 45 asteen
 *      kulmanauha sekä havainnekuvan lähderivi.
 *   3. KADONNUT kohde (Pekingin Vanha kesäpalatsi = Yuanmingyuan):
 *      havainnekuva on kuvasarjan ENSIMMÄINEN kuva nauhoineen, ilman
 *      välinappia — ja nauha seuraa kuvaa, ei kehystä, joten se katoaa
 *      kun sarjaa selaa eteenpäin.
 *   4. Kohde ilman ihmettä (Lykavittós) ei saa nappia eikä nauhaa.
 *   5. Nimivastaavuus: kaupunkikartan "Zeuksen temppeli" on
 *      fokuskartan Olympieion, ja ihme löytyy silti.
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
/*
 * Ihmekuvan osoite on repon polku TAI ämpärin peilipolku, siirtolipun
 * (js/media.js R2_ASSETIT.ihmeet) mukaan — kumpikin on laillinen, joten
 * väite hyväksyy kummatkin (assetit ämpäriin, 2.9.2026).
 */
const IHME_KUVA = /assets\/kartat\/ihmeet\/|\/kohtaamiset\/ihmeet\//;
const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg' };
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const sivu = await (await selain.newContext({ viewport: { width: 834, height: 1194 } })).newPage();
/*
 * Pöllöpalvelin katkaistaan: saapuminen esihakee lukijaäänen
 * ensimmäisen palan (js/ui.js esilataaLehdet), eikä savuke saa kuluttaa
 * generointikiintiötä. Katkaisu näyttää pelille tavalliselta
 * verkkovirheeltä, jonka puskuri nielee hiljaa.
 */
await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
await sivu.goto(`http://localhost:${palvelin.address().port}/`, { waitUntil: 'load' });
await sivu.waitForTimeout(1500);

/**
 * Kaupunkikartta auki: nähtävyydet ovat sen kylttejä.
 *
 * LAATTA KÄÄNNETÄÄN ENSIN (lisätty 31.8.2026). Savuke kirjoitettiin
 * 27.–28.8.2026, jolloin FOKUSVIRTA_KORTIT oli pois päältä ja
 * fokuskaupungin lehti aukesi saapumisessa suoraan. Omistajan päätös
 * 29.8.2026 (*"Päälle — koko kulku testiin"*, v1323) käänsi lipun
 * päälle, ja sen mukana palasi LEHTILUKKO: fokuskaupungin lehti aukeaa
 * vasta kun laatan aarre on löydetty (js/fokusvirta.js
 * fokusvirtaLukitseeLehden → js/ui.js openArrival palaa heti).
 * Ateena on fokuskaupunki, joten sen kaupunkikartta ei enää auennut
 * lainkaan ja savukkeen kymmenen väitettä kaatuivat ilmoittamatta
 * mitään ihmeestä.
 *
 * Lukko ei ole tämän savukkeen mitattava asia (sitä vartioi
 * savuke-fokusvirta), ja nähtävyysjuttu on pelaajalle nähtävissä
 * täsmälleen siinä tilassa, johon laatan kääntäminen vie: aarteen
 * jälkeisessä vapaassa tutkinnassa. Siksi laatta poistetaan
 * kääntämättömien joukosta ennen avausta — se on sama tila, jonka
 * peli itse antaa oikean vastauksen jälkeen. Kaupungeissa ilman
 * fokusvirtaa (Peking) rivi ei tee mitään.
 */
const avaaKaupunki = async (kaupunki) => {
  await sivu.evaluate((k) => {
    const { ui } = window.matkakirja;
    ui.game.tokens?.delete(k);
    ui.openArrival(ui.game.board.cityById.get(k));
  }, kaupunki);
  await sivu.waitForTimeout(1200);
};

/** Nähtävyys auki pelaajan omaa reittiä: napautus kartan nimikylttiin. */
const avaaKohde = async (nimi) => {
  const loytyi = await sivu.evaluate((n) => {
    const kyltti = [...document.querySelectorAll('.kartta-selite')]
      .find((e) => e.textContent.trim() === n);
    if (!kyltti) return false;
    kyltti.click();
    return true;
  }, nimi);
  await sivu.waitForTimeout(1300);
  return loytyi;
};

const suljeKohde = async () => {
  await sivu.evaluate(() => {
    window.matkakirja.ui.suljeKulttuuriKuva();
    document.getElementById('nahtavyys-dialog')?.close();
  });
  await sivu.waitForTimeout(300);
};

/** Jutun rakenne ihmeen kannalta: nappi, nauha ja niiden järjestys. */
const juttu = () => sivu.evaluate(() => {
  const dialogi = document.getElementById('nahtavyys-dialog');
  const sisalto = document.getElementById('nahtavyys-sisalto');
  const kehys = sisalto?.querySelector('.nahtavyys-kuvakehys');
  const nauha = kehys?.querySelector('.fokuskohde-ihmenauha');
  const kaista = nauha?.querySelector('.fokuskohde-ihmekaista');
  const kuva = kehys?.querySelector('img');
  const jarjestys = [...(sisalto?.children ?? [])].map((e) => e.className);
  return {
    auki: Boolean(dialogi?.open),
    otsikko: document.getElementById('nahtavyys-otsikko')?.textContent ?? '',
    aika: document.getElementById('nahtavyys-aika')?.textContent ?? '',
    nappeja: dialogi?.querySelectorAll('.fokuskohde-ihmenappi').length ?? 0,
    nappiTeksti: dialogi?.querySelector('.fokuskohde-ihmenappi')?.textContent ?? '',
    nauhoja: sisalto?.querySelectorAll('.fokuskohde-ihmenauha').length ?? 0,
    nauhanKoti: nauha?.parentElement?.className ?? '',
    nauhanTeksti: kaista?.textContent ?? '',
    nauhanMuunnos: kaista ? getComputedStyle(kaista).transform : '',
    osoitin: nauha ? getComputedStyle(nauha).pointerEvents : '',
    kuvanOsoite: kuva?.getAttribute('src') ?? '',
    laskuri: kehys?.querySelector('.arrival-kuva-laskuri')?.textContent ?? '',
    lahde: kehys?.querySelector('.nahtavyys-lahde')?.textContent ?? '',
    jarjestys,
  };
});

/** Suurennos: onko se nähtävyysikkunan sisällä ja kantaako se nauhan. */
const suurennos = () => sivu.evaluate(() => {
  const dialogi = document.getElementById('nahtavyys-dialog');
  const kortti = dialogi?.querySelector('.kulttuuri-suurennos');
  const kotelo = kortti?.querySelector('.suurennos-kuvakotelo');
  const nauha = kotelo?.querySelector('.fokuskohde-ihmenauha');
  const kaista = nauha?.querySelector('.fokuskohde-ihmekaista');
  return {
    auki: Boolean(kortti),
    nauha: Boolean(nauha),
    teksti: kaista?.textContent ?? '',
    muunnos: kaista ? getComputedStyle(kaista).transform : '',
    taitteita: nauha ? nauha.querySelectorAll('.fokuskohde-ihmetaite').length : 0,
    osoite: kotelo?.querySelector('img')?.getAttribute('src') ?? '',
    lahde: kortti?.querySelector('.kuvalahde')?.textContent ?? '',
  };
});

/*
 * 45 asteen kierto matriisina: rotate(-45deg) on
 * matrix(0.7071, -0.7071, 0.7071, 0.7071, 0, 0). Vaakalaatikolla a
 * olisi 1 ja b 0, joten tämä erottaa kulmanauhan vanhasta lipukkeesta.
 * Sama tarkistus kuin savuke-fokuskohteessa.
 */
const vino = (muunnos) => {
  const osat = String(muunnos ?? '').match(/-?[\d.]+/g)?.map(Number) ?? [];
  if (osat.length < 4) return false;
  return Math.abs(osat[0] - 0.7071) < 0.02 && Math.abs(osat[1] + 0.7071) < 0.02;
};

/* --- 1: yhä olemassa oleva kohde — "Koe ihme" kuvan alla --- */

await avaaKaupunki('ateena');
vaadi('Ateenan kaupunkikartta aukesi nähtävyyskyltteineen',
  await avaaKohde('Antiikin agora'));
let tila = await juttu();
vaadi('kohdenäkymä aukesi (KOHDE 1 · Antiikin agora)',
  tila.auki && tila.otsikko === 'Antiikin agora' && /^Kohde 1 · /.test(tila.aika),
  JSON.stringify({ otsikko: tila.otsikko, aika: tila.aika }));
vaadi('olemassa olevalla kohteella on "Koe ihme" -nappi',
  tila.nappeja === 1 && /Koe ihme/i.test(tila.nappiTeksti),
  JSON.stringify({ nappeja: tila.nappeja, teksti: tila.nappiTeksti }));
vaadi('"Koe ihme" on KUVAN ALLA ja ennen jutun jatkoa',
  tila.jarjestys.indexOf('fokuskohde-ihmenappi')
    > tila.jarjestys.findIndex((l) => l.includes('nahtavyys-kuvakehys'))
  && tila.jarjestys.indexOf('fokuskohde-ihmenappi') < tila.jarjestys.length - 1,
  JSON.stringify(tila.jarjestys));
vaadi('olemassa olevan jutussa ei ole nauhaa: ihmekuva aukeaa vasta napista',
  tila.nauhoja === 0, `${tila.nauhoja} nauhaa`);

/* --- 2: nappi avaa suurennoksen ikkunan SISÄÄN, nauhoineen --- */

if (tila.nappeja) {
  await sivu.locator('#nahtavyys-dialog .fokuskohde-ihmenappi').click();
  await sivu.waitForTimeout(900);
}
let zoom = await suurennos();
vaadi('"Koe ihme" avaa suurennoksen nähtävyysikkunan sisään (ei sen taakse)',
  zoom.auki === true && IHME_KUVA.test(zoom.osoite),
  JSON.stringify({ auki: zoom.auki, osoite: zoom.osoite }));
/*
 * ODOTUKSET PÄIVITETTY 28.8.2026: nauhan teksti on ollut v1255:stä
 * asti "Unohdettu aarre" (pelin alaotsikko, js/fokuskohteet.js
 * KOHDE_IHMENAUHA), ja ihmenauhan lopullinen malli (Raamattu
 * 27.8.2026) on TASAINEN vino kaista ILMAN taitekappaleita —
 * savuke vaati tässä välissä vanhaa "Matkakirjan ihme" -tekstiä ja
 * kahta taitetta ja näytti punaista, vaikka peli oli oikeassa.
 */
vaadi('suurennoksessa on ihmenauha ja havainnekuvan lähderivi',
  zoom.nauha && /Unohdettu aarre/i.test(zoom.teksti)
  && /Matkakirjan havainnekuva/.test(zoom.lahde),
  JSON.stringify({ teksti: zoom.teksti, lahde: zoom.lahde }));
vaadi('suurennoksen nauha on 45 asteen tasainen kaista ilman taitteita',
  vino(zoom.muunnos) && zoom.taitteita === 0,
  `${zoom.muunnos} / ${zoom.taitteita} taitetta`);
await suljeKohde();

/* --- 3: nimivastaavuus (kaupunkikartta ≠ fokuskartan nimi) --- */

vaadi('Zeuksen temppeli aukesi', await avaaKohde('Zeuksen temppeli'));
tila = await juttu();
vaadi('nimivastaavuus toimii: Zeuksen temppeli löytää Olympieionin ihmeen',
  tila.nappeja === 1, JSON.stringify({ otsikko: tila.otsikko, nappeja: tila.nappeja }));
await suljeKohde();

/* --- 4: kohde ilman ihmettä ei saa nappia eikä nauhaa --- */

vaadi('Lykavittós aukesi', await avaaKohde('Lykavittós'));
tila = await juttu();
vaadi('ihmeettömässä jutussa ei ole nappia eikä nauhaa',
  tila.nappeja === 0 && tila.nauhoja === 0,
  JSON.stringify({ nappeja: tila.nappeja, nauhoja: tila.nauhoja }));
await suljeKohde();

/* --- 4a: IHMEEN TÄHTI KOHDEKARTALLA (omistajan tilaus 2.9.2026) ---
 *
 * *"karttaan voisi tehdä pienen tähden jokaisen kohteen yläreunaan,
 * jos sinne on generoitu myös tällainen historiallinen kuva
 * nykyaikaisen kuvan lisäksi. eli merkki matkakirjan ihmeestä. kartan
 * yläreunassa voisi olla selite"*.
 *
 * Väite mittaa neljä asiaa: tähtiä on täsmälleen niillä kohteilla,
 * joilla on ihme (Ateenassa kolme: agora, Akropolis ja Zeuksen
 * temppeli = Olympieion); tähti on merkin YLÄREUNASSA eikä sen
 * keskellä; tähti on sama kompassiruusu kuin pääkartalla
 * (.nostosym-tahti, ei uutta muotoa); ja selite on kartalla nimeltä.
 * Ihmeetön kaupunki (Sofia) tarkistetaan lohkossa 4b.
 */
const tahdet = () => sivu.evaluate(() => {
  const kehys = document.querySelector('.kartta-kehys');
  const pisteet = [...(kehys?.querySelectorAll('.maakartta-piste.kohde-numero') ?? [])];
  return {
    tahdelliset: pisteet
      .filter((p) => p.querySelector('.kohde-ihmetahti'))
      .map((p) => p.querySelector('.kohde-nimi')?.textContent ?? '?'),
    pisteita: pisteet.length,
    // Tähden keskikohta suhteessa merkin keskikohtaan: negatiivinen
    // = merkin yläpuolella.
    ylareunassa: pisteet.filter((p) => {
      const t = p.querySelector('.kohde-ihmetahti');
      if (!t) return false;
      const a = p.getBoundingClientRect();
      const b = t.getBoundingClientRect();
      return (b.y + b.height / 2) < (a.y + a.height / 2);
    }).length,
    // Vain merkkien tähdet: selitteellä on sama luokka, ja se
    // lasketaan erikseen (seliteTahtia).
    kompassiruusuja: kehys
      ? kehys.querySelectorAll('.maakartta-piste .kohde-ihmetahti .nostosym-tahti').length : 0,
    selite: kehys?.querySelector('.kartta-ihmeselite')?.textContent?.trim() ?? null,
    seliteTahtia: kehys
      ? kehys.querySelectorAll('.kartta-ihmeselite .nostosym-tahti').length : 0,
  };
});

let merkit = await tahdet();
vaadi('Ateenan kohdekartalla tähti on tasan ihmekohteilla',
  merkit.tahdelliset.length === 3
  && ['Antiikin agora', 'Akropolis', 'Zeuksen temppeli']
    .every((n) => merkit.tahdelliset.includes(n)),
  JSON.stringify(merkit.tahdelliset));
vaadi('tähti istuu merkin yläreunassa',
  merkit.ylareunassa === merkit.tahdelliset.length,
  `${merkit.ylareunassa}/${merkit.tahdelliset.length}`);
vaadi('tähti on sama kompassiruusu kuin pääkartalla (.nostosym-tahti)',
  merkit.kompassiruusuja === merkit.tahdelliset.length,
  `${merkit.kompassiruusuja} ruusua`);
vaadi('kartalla on selite "Matkakirjan ihme" samalla tähdellä',
  merkit.selite === 'Matkakirjan ihme' && merkit.seliteTahtia === 1,
  JSON.stringify({ selite: merkit.selite, tahtia: merkit.seliteTahtia }));

await sivu.evaluate(() => window.matkakirja.ui.closeArrival());
await sivu.waitForTimeout(600);

/* --- 4b: ihmeetön kaupunki ei saa tähteä eikä selitettä ---
 *
 * Tokio on tämän laudan (`maailma`, 14 kaupunkia) kohdekartallinen
 * kaupunki, jonka yhdelläkään kohteella ei ole ihmettä. Sofia olisi
 * yhtä hyvä koe, mutta se ei ole tällä laudalla lainkaan.
 */
await avaaKaupunki('tokio');
merkit = await tahdet();
vaadi('Tokion kohdekartta piirtyi kohteineen',
  merkit.pisteita > 0, `${merkit.pisteita} pistettä`);
vaadi('ihmeettömässä kaupungissa ei ole tähtiä eikä selitettä',
  merkit.tahdelliset.length === 0 && merkit.selite === null,
  JSON.stringify({ tahtia: merkit.tahdelliset, selite: merkit.selite }));
await sivu.evaluate(() => window.matkakirja.ui.closeArrival());
await sivu.waitForTimeout(600);

/* --- 5: kadonnut kohde — havainnekuva sarjan ensimmäisenä --- */

await avaaKaupunki('peking');
vaadi('Vanha kesäpalatsi aukesi', await avaaKohde('Vanha kesäpalatsi'));
tila = await juttu();
vaadi('kadonneen kohteen ENSIMMÄINEN kuva on havainnekuva nauhoineen',
  IHME_KUVA.test(tila.kuvanOsoite) && tila.nauhoja === 1
  && /^1\//.test(tila.laskuri),
  JSON.stringify({ osoite: tila.kuvanOsoite, nauhoja: tila.nauhoja, laskuri: tila.laskuri }));
vaadi('kadonneen kohteen nauha on kuvan päällä eikä nappaa napautuksia',
  /karuselli-ikkuna|nahtavyys-kuvakehys/.test(tila.nauhanKoti)
  && vino(tila.nauhanMuunnos) && tila.osoitin === 'none',
  JSON.stringify({ koti: tila.nauhanKoti, osoitin: tila.osoitin }));
vaadi('havainnekuvan kuvateksti kantaa oman lähderivinsä',
  /Matkakirjan havainnekuva/.test(tila.lahde), tila.lahde);
vaadi('kadonneella kohteella ei ole "Koe ihme" -nappia: kuva on jo esillä',
  tila.nappeja === 0, `${tila.nappeja} nappia`);

// Nauha seuraa KUVAA eikä kehystä: sarjan toisessa kuvassa sitä ei ole.
await sivu.evaluate(() => document
  .querySelector('#nahtavyys-sisalto .karuselli-ikkuna .arrival-kuva-nuoli.seuraava')?.click());
await sivu.waitForTimeout(700);
tila = await juttu();
vaadi('nauha katoaa, kun sarjaa selaa havainnekuvasta eteenpäin',
  tila.nauhoja === 0 && /^2\//.test(tila.laskuri),
  JSON.stringify({ nauhoja: tila.nauhoja, laskuri: tila.laskuri }));

// Takaisin havainnekuvaan ja siitä suurennokseen: nauha on siinäkin.
await sivu.evaluate(() => document
  .querySelector('#nahtavyys-sisalto .karuselli-ikkuna .arrival-kuva-nuoli.edellinen')?.click());
await sivu.waitForTimeout(700);
await sivu.evaluate(() => document
  .querySelector('#nahtavyys-sisalto .karuselli-ikkuna img')?.click());
await sivu.waitForTimeout(900);
zoom = await suurennos();
vaadi('havainnekuvan suurennos kantaa nauhan myös kuvasarjasta avattuna',
  zoom.auki && zoom.nauha && vino(zoom.muunnos),
  JSON.stringify({ auki: zoom.auki, nauha: zoom.nauha }));

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
