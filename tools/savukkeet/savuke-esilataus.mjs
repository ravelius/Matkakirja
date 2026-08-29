/*
 * Savuke: kuvakarusellin kuvat esiladataan taustalla heti (omistajan
 * tilaus 14.8.2026). Vartiot:
 *  1. Nähtävyysjutun karuselli: kaikki sarjan kuvat pyydetään
 *     verkosta heti, ilman että nuolia painetaan.
 *  2. Kulttuurikuvien katselin (teokset-sarja): kaikkien teosten
 *     suurennokset pyydetään heti.
 *  3. Sama sarja uudelleen ei aiheuta uusia esilatauspyyntöjä
 *     (kirjanpito muistaa jo pyydetyt).
 *
 * ETUKÄTEISPUSKURI (omistajan tilaus 15.8.2026, docs/periaatteet.md):
 *  5. Kaupunkilehden etusivun ISON KUVAPAIKAN kuva (avauskuvien
 *     karuselli, tai kansikuva jos avauskuvia ei ole) pyydetään jo
 *     saapumisesta, ja piirto käyttää samaa osoitetta (sama leveys →
 *     ei tuplalatausta).
 *  6. Maalehden etusivun kartta pyydetään jo saapumisesta — siis ennen
 *     kuin liitelinkkiä on painettu — ja sekin samalla leveydellä.
 *  7. Sivunvaihto ei odota verkkoa: seuraavan sivun nostokuva on
 *     pyydetty jo silloin, kun edellinen sivu on näkyvissä — ja
 *     sisällysvalikon hypyn jälkeen myös EDELLINEN naapuri.
 *  8. Lukijaäänen ensimmäinen pala esihaetaan molempiin lehtiin
 *     saapuessa (kaksi hakua, ei enempää).
 *  9. Esihaun avain OSUU: kaiuttimen painallus ei generoi samaa palaa
 *     uudelleen, vaan luenta jatkuu suoraan seuraavista paloista.
 *
 * TTS on tynkä: pöllöpalvelimen puhevastaukset korvataan hiljaisella
 * WAV:lla (page.route), joten savuke ei kuluta kiintiötä eikä tee
 * yhtään oikeaa generointikutsua.
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg' };
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => { kaikki += 1; if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`); };

/*
 * 1,5 sekunnin hiljainen WAV (8 kHz, mono, 16-bit) puhetyngäksi — sama
 * kuin savuke-lukijan-seurannassa. Riittävän pitkä, ettei luenta ehdi
 * loppua kesken tarkistusten.
 */
const hiljainenWav = () => {
  const naytteita = 12000;
  const data = naytteita * 2;
  const b = Buffer.alloc(44 + data);
  b.write('RIFF', 0); b.writeUInt32LE(36 + data, 4); b.write('WAVE', 8);
  b.write('fmt ', 12); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20);
  b.writeUInt16LE(1, 22); b.writeUInt32LE(8000, 24); b.writeUInt32LE(16000, 28);
  b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34);
  b.write('data', 36); b.writeUInt32LE(data, 40);
  return b;
};

const selain = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--autoplay-policy=no-user-gesture-required'],
});
/*
 * Service worker pois: sw.js nappaa peilin kuvapyynnöt omaan
 * korikäsittelyynsä, jolloin ne eivät näy sivun pyyntötapahtumissa
 * lainkaan (mitattu 15.8.2026). Savuke mittaa juuri sitä, mitä peli
 * pyytää ja milloin, joten välikäsi jätetään pois.
 */
const konteksti = await selain.newContext({
  viewport: { width: 834, height: 1194 },
  serviceWorkers: 'block',
});
// Puhepyyntöjen rungot talteen: esihaun ja luennan välimuistiosuma
// mitataan siitä, montako kertaa SAMA teksti pyydetään.
const puhePyynnot = [];
await konteksti.route('**samireivinen.workers.dev/**', (route) => {
  try {
    puhePyynnot.push(JSON.parse(route.request().postData() ?? '{}'));
  } catch { /* muu kuin puhepyyntö */ }
  route.fulfill({ status: 200, contentType: 'audio/wav', body: hiljainenWav() });
});
/*
 * Kuvalähteet tyngäksi (1x1 PNG): kontissa ei ole ulkoyhteyttä, ja
 * epäonnistuneet kuvahaut katkaisisivat peilin kolmen virheen jälkeen
 * (media.js peiliPetti). Silloin osoitteet vaihtuisivat kesken kokeen
 * peilistä Commonsiin eikä mitattavaa vertailua olisi. Pyynnöt
 * kirjataan silti — juuri ne ovat kokeen kohde.
 */
const PIKSELI = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);
await konteksti.route(/r2\.dev\/|wikimedia\.org\//, (route) => route.fulfill({
  status: 200,
  contentType: 'image/png',
  body: PIKSELI,
}));
const sivu = await konteksti.newPage();
const pyynnot = [];
sivu.on('request', (r) => pyynnot.push(r.url()));
await sivu.goto(`http://localhost:${palvelin.address().port}/`, { waitUntil: 'load' });
await sivu.waitForTimeout(1500);

// 1. Nähtävyyskaruselli synteettisillä kuvilla: rakennetaan kehys ja
// tarkistetaan, että jokainen sarjan kuva pyydettiin ilman selausta.
const merkki = 'ESILATAUSKOE';
await sivu.evaluate((m) => {
  const { ui } = window.matkakirja;
  const kuvat = [1, 2, 3].map((i) => ({ tiedosto: `${m}-nahtavyys-${i}.jpg`, selite: `koe ${i}` }));
  document.body.appendChild(ui.nahtavyydenKaruselli(kuvat));
}, merkki);
await sivu.waitForTimeout(800);
// Peiliputki (R2) kirjoittaa tiedostonimen pienellä — vertailu
// kirjainkoosta riippumatta.
const pyydettiin = (pala) => pyynnot.some((u) => u.toLowerCase().includes(pala.toLowerCase()));
const nahtavyysPyynnot = [1, 2, 3].map((i) => pyydettiin(`${merkki}-nahtavyys-${i}`));
vaadi('nähtävyyskarusellin kaikki kuvat pyydetään heti ilman selausta',
  nahtavyysPyynnot.every(Boolean), JSON.stringify(nahtavyysPyynnot));

// 1b. LEHDEN SIVULLA pyörivä nostogalleria (omistajan tarkennus:
// "jos kuvakalleria pyörii suoraan lehden sivulla") — koko sarja
// pyydetään heti ilman nuolia.
await sivu.evaluate((m) => {
  const { ui } = window.matkakirja;
  const kuva = document.createElement('img');
  document.body.appendChild(kuva);
  ui.kaariNostoGalleria(kuva, {
    otsikko: 'Koe',
    tiedosto: `${m}-nosto-1.jpg`,
    galleria: [2, 3].map((i) => ({ otsikko: `Koe ${i}`, tiedosto: `${m}-nosto-${i}.jpg` })),
  });
}, merkki);
await sivu.waitForTimeout(800);
const nostoPyynnot = [1, 2, 3].map((i) => pyydettiin(`${merkki}-nosto-${i}`));
vaadi('lehtisivun nostogallerian kaikki kuvat pyydetään heti',
  nostoPyynnot.every(Boolean), JSON.stringify(nostoPyynnot));

// 2. Kulttuurikatselimen sarja: kaikkien teosten suurennokset heti.
await sivu.evaluate((m) => {
  const { ui } = window.matkakirja;
  const teokset = [1, 2, 3].map((i) => ({ tiedosto: `${m}-teos-${i}.jpg`, otsikko: `Teos ${i}` }));
  ui.naytaKulttuuriKuva(teokset[0], { teokset, kohdalla: 0 });
}, merkki);
await sivu.waitForTimeout(800);
const teosPyynnot = [1, 2, 3].map((i) => pyydettiin(`${merkki}-teos-${i}`));
vaadi('katselimen kaikkien teosten suurennokset pyydetään heti',
  teosPyynnot.every(Boolean), JSON.stringify(teosPyynnot));

// 3. Sama sarja uudelleen: esilatauskirjanpito ei pyydä samoja osoitteita
// toista kertaa. (Näytettävän kuvan oma pyyntö sallitaan — vain
// esilatausten tuplat lasketaan: pyyntöjä per osoite enintään 2.)
const ennen = pyynnot.length;
await sivu.evaluate((m) => {
  const { ui } = window.matkakirja;
  ui.suljeKulttuuriKuva();
  const kuvat = [1, 2, 3].map((i) => ({ tiedosto: `${m}-nahtavyys-${i}.jpg`, selite: `koe ${i}` }));
  document.body.appendChild(ui.nahtavyydenKaruselli(kuvat));
}, merkki);
await sivu.waitForTimeout(600);
const uudet = pyynnot.slice(ennen)
  .filter((u) => u.toLowerCase().includes(`${merkki.toLowerCase()}-nahtavyys`));
// Uusi karuselli näyttää ensimmäisen kuvan (oma pyyntö sallittu), mutta
// esilatauksia ei toisteta — uusia pyyntöjä siis alle kolme.
vaadi('esilatauksia ei toisteta samalle sarjalle', uudet.length < 3,
  JSON.stringify(uudet));

// 4. Lightbox mitoittuu MITATUSTA näkymästä pikseleinä, ei vw:stä
// (iPadin jumiutunut viewportti rajasi wikin kuvat iPhonen kokoon).
const lightbox = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  await ui.openLightbox(null, '', 'assets/logo.png');
  const img = document.querySelector('.lightbox-img');
  const tulos = {
    maxWidth: img?.style.maxWidth ?? '',
    odotus: Math.round((ui.nakymanLeveys || ui.mittaaNakyma()) * 0.94),
  };
  document.querySelector('.lightbox')?.remove();
  return tulos;
});
vaadi('lightbox mitoittuu mitatusta näkymästä pikseleinä',
  lightbox.maxWidth === `${lightbox.odotus}px`, JSON.stringify(lightbox));

/* ------------------------------------------------------------------ */
/* Etukäteispuskuri: lehtien etusivut, seuraava sivu ja lukijan pala   */
/* ------------------------------------------------------------------ */

// Peli käyntiin, jotta saapuminen (openArrival) toimii oikeasti.
await sivu.evaluate(() => {
  [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
});
await sivu.waitForTimeout(1200);
await sivu.evaluate(() => {
  const g = window.matkakirja.game;
  if (g.phase === 'pickstart') {
    g.actionPickStart(g.pack.cities.find((c) => c.links?.length).id, 0);
    window.matkakirja.ui.render();
  }
});
await sivu.waitForTimeout(1200);

/*
 * Odotetut osoitteet lasketaan pelin OMILLA osoitefunktioilla (peili,
 * paikalliskopio ja leveysportaat tulevat siis samasta lähteestä kuin
 * piirrossa), mutta leveydet on kirjoitettu tänne käsin: juuri niiden
 * on pysyttävä piirron kanssa samoina, ja lopuksi verrataan piirretyn
 * kuvan omaan osoitteeseen.
 */
const odotetut = await sivu.evaluate(async () => {
  const kuvat = await import('/js/packs/africa-valokuvat.js');
  const kartat = await import('/js/packs/maakartat.js');
  const { game } = window.matkakirja;
  const city = game.board.cityById.get('lontoo');
  const iso = game.pack.map.cityCountry[city.id];
  return {
    iso,
    // Maalehden etusivun korkokartta: 1000 (piirraMaaEtusivu).
    maakartta: kuvat.valokuvaUrl(kartat.MAAKARTAT[iso].tiedosto, 1000),
    // Kohdekartan oma julistekartta on paikallinen tiedosto.
    kohdekartta: kartat.KAUPUNKIKARTAT[city.id]?.polku ?? null,
  };
});

// Saapuminen: kaupunkilehti aukeaa ja puskurit lähtevät. Matkakirjan
// omat merkintäluennat ehtivät alkaa jo ennen tätä, joten puhepyynnöt
// rajataan saapumisen jälkeisiin.
const ennenSaapumista = puhePyynnot.length;
await sivu.evaluate(async () => {
  const { ui, game } = window.matkakirja;
  /*
   * LEHTILUKKO AUKI ENNEN AVAUSTA (v1323-linjaus, 29.8.2026 —
   * "Fokusvirran kortit pelaajan polkuun", FOKUSVIRTA_KORTIT = true).
   * Lontoo on aallon 2 fokusvirtakaupunki: korttiannostelun päällä
   * lehtilukko (js/fokusvirta.js fokusvirtaOhittaaLehden) ottaa lehden
   * paikan niin kauan kuin laatta on kääntämättä, jolloin openArrival
   * palaa heti eikä #arrival-dialogia avata lainkaan — eikä yhtään
   * etukäteispuskuria käynnistetä. Laatta poistetaan siis ennen
   * avausta: se on täsmälleen se tila, jossa pelaaja lehden oikeasti
   * avaa (aarre löydetty, kaupunki vapaana tutkittavaksi). Mitattava
   * asia on puskurointi, ei se kumpi pinta saapumisen omistaa.
   */
  game.tokens?.delete('lontoo');
  ui.openArrival(game.board.cityById.get('lontoo'));
  await new Promise((r) => setTimeout(r, 3500));
});
// Vartio vartioille: jos lehti ei aukea, kaikki puskuriväitteet
// mittaisivat tyhjää (juuri niin kävi v1323:n jälkeen).
vaadi('kaupunkilehti on auki puskurimittausten ajan (lehtilukko ei ohita)',
  await sivu.evaluate(() => Boolean(document.getElementById('arrival-dialog')?.open)));

/*
 * 5. Kaupunkilehden etusivun ISO KUVAPAIKKA: pyydetty saapumisesta, ja
 *    piirretty kuva käyttää TÄSMÄLLEEN samaa osoitetta.
 *
 *    Iso paikka ei ole enää aina kansikuva: avauskuvakaupungissa
 *    (kulttuuri-kategoriat.js `avauskuvat`) siellä pyörii
 *    panoraamakaruselli 900:lla, ja Lontoon avauskuvat ovat
 *    ämpärissä asuvia heroja (`ampari` → julisteUrl) ilman
 *    Commons-tiedostoa. Odotus johdetaan siis samalla säännöllä kuin
 *    piirto (nahtavyydenKaruselli) ja vasta ilman avauskuvia
 *    kansikuvasta 1200:lla.
 *
 *    Lisäksi vaaditaan, että osoite on etukäteispuskurin OMALLA
 *    listalla (kaupunkilehdenEtusivunKuvat): pelkkä pyyntö tulisi
 *    karusellin omasta esilatauksesta, eikä puskurin aukko näkyisi.
 */
const kansi = await sivu.evaluate(async () => {
  const kuvat = await import('/js/packs/africa-valokuvat.js');
  const media = await import('/js/media.js');
  const { ui } = window.matkakirja;
  const kansiTiedot = ui.lehtitila.tutkiKansi;
  const avaus = kansiTiedot?.avauskuvat?.[0];
  const teos = kansiTiedot?.kansikuvat?.[0];
  const osoite = avaus
    ? (avaus.osoite ?? (avaus.ampari
      ? media.julisteUrl(avaus.ampari)
      : kuvat.valokuvaUrl(avaus.tiedosto, 900)))
    : (teos ? kuvat.valokuvaUrl(teos.tiedosto, 1200) : null);
  return {
    odotettu: osoite,
    puskurissa: ui.kaupunkilehdenEtusivunKuvat().includes(osoite),
    piirretty: document.querySelector('#arrival-lehti-paakuva img')?.getAttribute('src') ?? null,
  };
});
vaadi('kaupunkilehden ison kuvapaikan kuva pyydetään saapumisesta oikealla leveydellä',
  Boolean(kansi.odotettu) && pyynnot.includes(kansi.odotettu) && kansi.puskurissa
  && kansi.piirretty === kansi.odotettu, JSON.stringify(kansi));

// 6. Maalehden etusivun kartta on pyydetty jo saapumisessa — lehteä ei
//    ole avattu eikä sen DOMia ole olemassa.
const maalehtiAuki = await sivu.evaluate(() => Boolean(document.querySelector('.maalehti')));
vaadi('maalehden etusivun kartta pyydetään saapumisesta (lehteä avaamatta)',
  pyynnot.includes(odotetut.maakartta) && !maalehtiAuki,
  `${odotetut.maakartta} — maalehti auki: ${maalehtiAuki}`);

// 6b. Kohdekartan kuva (kaupunkilehden etusivun pohjalla) samoin.
vaadi('kohdekartan kuva pyydetään saapumisesta',
  pyynnot.some((u) => u.endsWith(odotetut.kohdekartta)), odotetut.kohdekartta);

// 7. Seuraava sivu valmiina: sivun 1 nostokuva on pyydetty jo silloin,
//    kun etusivu on näkyvissä — ja piirto käyttää samaa osoitetta.
const seuraavaSivu = await sivu.evaluate(async () => {
  const kuvat = await import('/js/packs/africa-valokuvat.js');
  const { ui } = window.matkakirja;
  const nosto = (ui.lehtitila.tutkiSivut?.[0]?.nostot ?? []).find((n) => n.tiedosto);
  return {
    sivu: ui.lehtitila.tutkiSivu,
    odotettu: nosto ? kuvat.valokuvaUrl(nosto.tiedosto, 900) : null,
  };
});
vaadi('seuraavan sivun nostokuva on pyydetty jo etusivulla',
  seuraavaSivu.sivu === 0 && Boolean(seuraavaSivu.odotettu)
  && pyynnot.includes(seuraavaSivu.odotettu), JSON.stringify(seuraavaSivu));

const kaannetty = await sivu.evaluate(() => {
  const { ui } = window.matkakirja;
  ui.vaihdaTutkiSivu(1);
  // Osoite luetaan heti piirron jälkeen: varareitti vaihtaisi src:n
  // vasta 700 ms:n päästä, jos peili ei vastaa.
  return [...document.querySelectorAll('#arrival-kategoria img')]
    .map((i) => i.getAttribute('src'));
});
vaadi('käännetty sivu käyttää samaa osoitetta kuin puskuri',
  kaannetty.includes(seuraavaSivu.odotettu), JSON.stringify(kaannetty.slice(0, 3)));

// 8. Lukijaäänen esihaku: tasan kaksi palaa (kaupunkilehti + maalehti).
// Matkakirjan merkintäluenta (persoona 'merkinnat') soi omaa
// polkuaan; lehtien puskuri on kertojan ääntä.
const saapumisenPuheet = puhePyynnot.slice(ennenSaapumista)
  .filter((p) => p.tehtava === 'puhe' && p.persoona === 'kertoja');
const esihaut = saapumisenPuheet.map((p) => p.teksti);
vaadi('lukijan ensimmäinen pala esihaetaan molempiin lehtiin (2 hakua)',
  saapumisenPuheet.length === 2 && saapumisenPuheet.every((p) => p.persoona === 'kertoja')
  && esihaut.every((t) => t && t.length > 1) && esihaut[0] !== esihaut[1],
  JSON.stringify(saapumisenPuheet.map((p) => `${p.persoona}: ${String(p.teksti).slice(0, 40)}`)));

/*
 * 9. AVAINOSUMA. Kaupunkilehden etusivun luenta alkaa ensimmäisestä
 *    leipätekstistä eli esittelykappaleesta (#arrival-intro).
 *
 *    PALA ON KOKO KAPPALE (omistaja 18.8.2026, js/puhe.js
 *    kappaleenPalat: palaraja kesken kappaleen kuului
 *    intonaatiohyppynä), joten esihaettu pala ei ole enää yksi virke.
 *    Vartio siirtyy vartioimaan tätä todellisuutta löysäämättä:
 *    esihaetun palan on oltava kappaleen ALKUOSA merkilleen ja
 *    alettava kappaleen ensimmäisestä virkkeestä — eli täsmälleen se
 *    teksti, jonka luenta ensimmäisenä pyytää.
 *
 *    Kappale ja sen ensimmäinen virke luetaan suoraan ruudulta pelin
 *    omalla virkesäännöllä — niin koe ei nojaa samaan koodiin, jota
 *    se mittaa.
 */
await sivu.evaluate(() => window.matkakirja.ui.naytaTutkiSivu(0, { heti: true }));
await sivu.waitForTimeout(400);
const alku = await sivu.evaluate(() => {
  const kappale = (document.querySelector('#arrival-intro')?.textContent ?? '')
    .replace(/\s+/g, ' ').trim();
  const virke = kappale.split(/(?<=[.!?\u2026])\s+/)[0] ?? '';
  return {
    kappale,
    // Sama pääte kuin lukijalla: pisteetön kohta saa pisteen.
    virke: virke && !/[.!?:;\u2026]$/.test(virke) ? `${virke}.` : virke,
  };
});
const ekaVirke = alku.virke;
// Esihaettu pala on kappaleen ALKUOSA merkilleen (lyhyellä kappaleella
// koko kappale), ja sen on alettava kappaleen ensimmäisestä virkkeestä.
const ekaPala = esihaut.find((t) => t && alku.kappale.startsWith(t));
vaadi('esihaku osui juuri siihen kappaleen alkuun, josta luenta alkaa',
  Boolean(ekaVirke) && Boolean(ekaPala) && ekaPala.startsWith(ekaVirke),
  JSON.stringify({ ...alku, ekaPala, esihaut }));
const ennenLuentaa = puhePyynnot.length;
await sivu.evaluate(() => {
  document.querySelector('#arrival-dialog .lukija-nappi')?.click();
});
await sivu.waitForTimeout(2500);
const luenta = await sivu.evaluate(() => ({
  lukee: Boolean(document.querySelector('#arrival-dialog .lukija-nappi.lukee')),
}));
// Uudelleengenerointi = luennan ensimmäinen virke pyydetään verkosta,
// vaikka se on jo välimuistissa.
const tuplat = puhePyynnot.slice(ennenLuentaa)
  .filter((p) => p.teksti === ekaVirke || esihaut.includes(p.teksti));
vaadi('luenta lähti käyntiin ja haki jatkopaloja',
  luenta.lukee && puhePyynnot.length > ennenLuentaa,
  JSON.stringify({ ...luenta, uusia: puhePyynnot.length - ennenLuentaa }));
vaadi('esihaettua palaa ei generoida uudelleen (välimuistiavain osuu)',
  tuplat.length === 0, JSON.stringify(tuplat.map((p) => String(p.teksti).slice(0, 60))));

/*
 * 10. MAALEHDEN PUSKURI OSUU OIKEAAN SIVUUN. Etusivun luettava sisältö
 *     rakennetaan saapuessa irralliseen elementtiin (ui.js
 *     maalehdenEtusivuRunko), koska lehteä ei ole vielä avattu.
 *     Verrataan sitä nyt OIKEAAN maalehden ensimmäiseen sivuun: sen
 *     ensimmäisen palan on oltava sama teksti, joka esihaettiin.
 *
 *     Pala on kappaleenPalat-mittainen (18.8.2026: koko kappale,
 *     ellei se ylitä palakattoa), joten vertailukin lasketaan siitä —
 *     vartio pysyy tiukkana, koska ratkaisevaa on OIKEA SIVU: teksti
 *     luetaan avatun maalehden omasta DOMista, ei siitä irrallisesta
 *     rungosta, johon puskuri sen johti.
 */
const maalehti = await sivu.evaluate(async (iso) => {
  const lukija = await import('/js/lukija.js');
  const puhe = await import('/js/puhe.js');
  const { ui } = window.matkakirja;
  ui.avaaMaalehti(iso);
  const kohdat = lukija.kokoaLuettavatKohdat(document.querySelector('#arrival-dialog .dialog-card'));
  // Sama johto kuin soittimella: ensimmäinen ei-tyhjä rivi, ja siitä
  // ensimmäinen pala.
  const ekaRivi = kohdat.length
    ? String(kohdat[0].teksti).split('\n').find((r) => r.trim())
    : null;
  return {
    sivuja: kohdat.length,
    eka: ekaRivi ? puhe.kappaleenPalat(ekaRivi)[0]?.teksti ?? null : null,
  };
}, odotetut.iso);
vaadi('maalehden esihaku osui lehden oikean ensimmäisen sivun alkuun',
  Boolean(maalehti.eka) && esihaut.includes(maalehti.eka), JSON.stringify({ maalehti, esihaut }));

/*
 * 10b. EDELLINEN sivu puskuroidaan myös (omistajan tarkennus
 *      15.8.2026): sisällysvalikosta hypätään keskelle lehteä, eikä
 *      kumpikaan naapuri ole silloin käynyt näytöllä. Maalehti on
 *      juuri avattu sivulle 1, joten sivun 3 kuvia ei ole pyydetty.
 */
const naapuri = await sivu.evaluate(async () => {
  const kuvat = await import('/js/packs/africa-valokuvat.js');
  const { ui } = window.matkakirja;
  // Sivun 4 edellinen on sivu 3, jonka sisältö on tutkiSivut[2].
  const nosto = (ui.lehtitila.tutkiSivut?.[2]?.nostot ?? []).find((n) => n.tiedosto);
  return { osoite: nosto ? kuvat.valokuvaUrl(nosto.tiedosto, 900) : null, sivuja: ui.tutkiSivuja() };
});
const ennenHyppya = pyynnot.includes(naapuri.osoite);
await sivu.evaluate(() => window.matkakirja.ui.naytaTutkiSivu(4, { heti: true }));
await sivu.waitForTimeout(1500);
vaadi('sisällysvalikon hypyn jälkeen myös EDELLINEN sivu on puskuroitu',
  Boolean(naapuri.osoite) && naapuri.sivuja > 5 && !ennenHyppya
  && pyynnot.includes(naapuri.osoite), JSON.stringify({ ...naapuri, ennenHyppya }));

// 11. Maa ILMAN korkokarttaa: etusivu on aihesivu, ja se rakentuu
//     samalla piirrolla irralliseen elementtiin ilman että lehteä
//     avataan (Euroopan laudalla kaikilla mailla on kartta, joten
//     tämä polku koestetaan suoraan).
const ilmanKarttaa = await sivu.evaluate(async () => {
  const lukija = await import('/js/lukija.js');
  const kartat = await import('/js/packs/maakartat.js');
  const kategoriat = await import('/js/packs/maa-kategoriat.js');
  const { ui } = window.matkakirja;
  const iso = Object.keys(kategoriat.MAA_KATEGORIAT).find((k) => !kartat.MAAKARTAT[k]);
  const runko = ui.maalehdenEtusivuRunko(iso);
  const kohdat = runko ? lukija.kokoaLuettavatKohdat(runko) : [];
  return { iso, kohtia: kohdat.length, eka: kohdat[0]?.teksti?.slice(0, 60) ?? null };
});
vaadi('kartattoman maan maalehden etusivu rakentuu irralliseen elementtiin',
  ilmanKarttaa.kohtia > 0 && Boolean(ilmanKarttaa.eka), JSON.stringify(ilmanKarttaa));

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi.`);
process.exit(lapi === kaikki ? 0 : 1);
