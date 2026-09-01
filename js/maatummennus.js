/*
 * MAATUMMENNUS — nykyinen maa erottuu naapureistaan lähikuvassa.
 *
 * Omistajan tilaus 31.8.2026 ilta, sanatarkasti: *"lähemmillä
 * zoomtasoilla ympäröivät valtiot voisi tummentaa hieman reaaliajassa
 * ja maan ääriviivat piirtää hieman paksummalla. nämä voisivat hävitä
 * välittömästi siirron alkaessa ja tulla feidaten sisään."*
 *
 * Kaksi asiaa, yksi kerros:
 *
 *   TUMMENNUS on MUIDEN MAIDEN polygonit yhtenä täytettynä polkuna.
 *   Muste on kartan oma (rgba(58,40,25)) ja peittävyys
 *   `TUMMENNUS_VOIMA`: naapuri tummuu sen verran että silmä erottaa
 *   rajan, mutta laatan topografia näkyy läpi. TÄSSÄ EFEKTIN KOKO PAINO
 *   ON — säädin on yksi vakio, ja sitä säädetään kuvavedoksista.
 *
 *   ÄÄRIVIIVA on nykyisen maan renkaat viivana himmeällä kartan
 *   musteella, kahden ruutupikselin levyisenä (`TUMMENNUS_VIIVA`). Se
 *   on nykyisen maan raja — ei naapureiden, ei kaikkien maiden.
 *
 * === MERI EI OLE NAAPURI (omistajan kaappaus 31.8.2026 yöllä, v1406)
 *
 * Ensimmäinen toteutus maalasi tummennuksen KOKO ARKIN kokoisena
 * suorakaiteena, johon nykyisen maan renkaat leikattiin auki
 * `fill-rule: evenodd` -säännöllä. Se oli yksi maalattava muoto ja
 * halpa, mutta se tummensi kaiken muun paitsi oman maan — myös veden.
 * Omistaja katsoi Kreikan fokusnäkymän iPhonesta: koko Egeanmeri oli
 * harmaa ja vain oma maa paperinvärinen. Palaute sanatarkasti: *"Merta
 * ei tarvitse tummentaa."*
 *
 * Varjo rakennetaan siis MAISTA eikä arkista: aineiston jokaisen muun
 * maan renkaat samaan polkuun, nykyinen maa pois joukosta. Meri, järvet
 * ja aineiston ulkopuolinen maa jäävät koskematta. Suorakaidetta ja
 * evenodd-reikää ei ole enää olemassa — nykyistä maata ei tarvitse
 * leikata auki, koska sitä ei koskaan maalata.
 *
 * TÄYTTÖSÄÄNTÖ ON `nonzero` JA SE ON EHTO, EI MAKUASIA. Naapurien
 * renkaat on yksinkertaistettu kukin erikseen
 * (tools/generoi-maapolygonit.mjs Douglas–Peucker), joten rajaviivalla
 * ne menevät hitusen päällekkäin. `nonzero` maalaa päällekkäisen
 * kaistaleen kerran, kun renkaat kiertävät samaan suuntaan; `evenodd`
 * tekisi siitä vaalean raon jokaiselle maarajalle. Kiertosuunnan
 * yhtenäisyys on aineiston takuu (generaattori normalisoi sen, ja
 * tests/maapolygonit.test.mjs vartioi) — ilman sitä `nonzero`
 * puhkaisisi samat raot.
 *
 * AINEISTO KATTAA PELIN MAAT, EI MAAILMAN VALTIOITA. maapolygonit.json
 * tehdään pelin oman maalistan (`countryShapes`, 134 maata) mukaan,
 * joten roolittomat naapurit — Benin, Burkina Faso, Malta, Andorra ja
 * muut pelin ulkopuoliset — jäävät tummentamatta ja lukevat merenä.
 * Se on tietoinen raja: aineisto seuraa pelin maalistaa, ja jos joskus
 * halutaan koko maailma, kasvatetaan LÄHDETTÄ eikä piirtäjää.
 *
 * SUMENNUS JÄTETTIIN POIS. Omistaja epäili sitä jo tilatessaan, ja
 * laatan päälle ajettu `filter: blur()` on juuri se maalikierroksen
 * kalleus, jonka eleen aikainen piilotus muuten poistaa. CSS-luokka
 * `.maatummennus-sumea` on varattu myöhempää kokeilua varten, mutta
 * sillä ei ole tässä tiedostossa yhtään toteutusta.
 *
 * === NÄKYVYYS: PELAAJAN OMA ZOOMIALUE (omistajan tarkennus 31.8.2026)
 *
 * *"tummennukset riittää tehdä siihen tasoon mitä peli antaa
 * normaalistikin pelaajan zoomata ulos sekä kaikki sitä lähemmät.
 * kehittäjätilassa kun zoomataan enemmän ulos, niin silloin
 * tummennuksia ei tarvita."*
 *
 * Raja EI ole kovakoodattu mittakaava vaan pelin oma uloszoomauksen
 * pohja: js/kartta.js `pelaajanUloinSkaala()` laskee sen maan
 * ikkunasta samalla kaavalla kuin `fokusZoomMinimi` — sama laatikko,
 * sama ULOSZOOMAUS_KERROIN. Efekti on päällä siitä mittakaavasta
 * ylöspäin. Kehittäjän maailmanäkymä ohittaa rajan kamerassa mutta ei
 * täällä: kun kartta on loitonnettu pelaajan rajaa kauemmas, tummennus
 * jää pois.
 *
 * === ELEKÄYTÖS: KERROS EI VÄISTY LAINKAAN ==========================
 *
 * Omistaja 1.9.2026, kaksi tilausta samana päivänä. Aamulla:
 * *"Kartan tummennus voisi pysyä panoroitaessa päällä."* Illalla,
 * kuvakaappaus Bulgarian lehtinäkymästä: *"jos ympärivaltoiden
 * tummennus on mahdollista pitää zoomatessa päällä (paitsi jos menee
 * rajan yli missä poistuu), niin sen voisi kytkeä päälle."*
 *
 * Kerros oli 31.8.2026 illasta lähtien samassa display:none-joukossa
 * kuin merkkikerrokset (piilossa koko eleen ajan), sitten päivän
 * ajan piilossa vain nipistyksessä. Nyt ei kummassakaan: luokkaa
 * `.kartta-tummennus-piilossa` ei ole enää olemassa missään.
 *
 * PIILOTUKSEN PERUSTELU KAATUI MITTAUKSEEN. Piilotus tehtiin, koska
 * nipistyksen oletettiin skaalaavan varjopolun joka kehyksellä. Kartan
 * nipistys on kuitenkin kameran CSS-muunnos (js/kartta.js touchmove:
 * `translate3d(...) scale(...)`) eikä uusi viewBox, joten polku
 * skaalautuu kompositorissa eikä sitä ladota eleen aikana kertaakaan.
 * Mitattu 1.9.2026 (Chromium 390x844 dpr3, 4x kuristus, kehittäjän
 * maailmanäkymä Ateenan lähikuvassa; neljä nipistystä ja kuusi
 * pyyhkäisyä per ajo, neljä ajoa per variantti VUOROTELLEN,
 * lämmittelykierros pois; longtaskien summa per ajo):
 *
 *     kerros piilossa   nipistys med. 1101 ms   panorointi med. 779 ms
 *     kerros näkyvissä  nipistys med. 1125 ms   panorointi med. 686 ms
 *
 * Ero on ajojen omaa hajontaa kummassakin eleessä — ja mittaus on tehty
 * UUDELLA, kuusi kertaa tiheämmällä polulla (ks. seuraava luku).
 *
 * *"PAITSI JOS MENEE RAJAN YLI MISSÄ POISTUU"* on jo olemassa, ja se on
 * NÄKYVYYSEHTO EIKÄ ELE-EHTO: `tunniste` antaa kerroksen vain pelaajan
 * omasta uloimmasta zoomista sisäänpäin ja vain nykyiselle maalle.
 * Loitonnus rajan yli tyhjentää kerroksen ja maanvaihto latoo sen
 * uudelle maalle — kumpikin näkymän ASETUTTUA, ei eleen aikana.
 *
 * FEIDAUS SEURAA VARJON SYNTYÄ EIKÄ ELETTÄ. Kerroksella on `animation`
 * eikä `transition`, ja `piirra` käynnistää sen uudelleen aina kun
 * varjo rakennetaan — se on nyt ainoa hetki, jossa kerros ilmestyy
 * tyhjästä. Eleen jälkeistä paluuta ei ole, koska katoamistakaan ei ole.
 *
 * FEIDATTAVA OMINAISUUS ON PERITTY `fill-opacity` / `stroke-opacity`
 * EIKÄ RYHMÄN `opacity`, ja animaatio on PORTAIKKO. Kumpikin on
 * mittaustulos: ryhmän peittävyys teki kerroksesta oman
 * läpinäkyvyystasonsa (savuke-maailmanakyma nipistyksessä 382 →
 * 933–1202 ms), ja portaaton feidaus maalasi varjon parikymmentä kertaa
 * (435–786 ms). Nykyisillä valinnoilla luvut ovat lähtötasolla
 * (388–475 ms). Taulukko: css/styles.css samassa lohkossa. Luvut on
 * mitattu arkinlevyisellä suorakaiteella; maapolku on niitä RASKAAMPI
 * muoto mutta pienempi pinta, ja mitattu ero on ajojen hajonnan
 * kokoinen (ks. `muidenPolku`).
 *
 * KERROS ON STAATTINEN. Polut lasketaan vain kun maa vaihtuu tai
 * näkyvyys kytkeytyy — ei kehystä kohti, ei näkymää kohti, ei eleen
 * aikana.
 *
 * === AINEISTO ON POLTON OMA (1.9.2026) =============================
 *
 * Omistaja, sama kuvakaappaus: *"saako nuo rajat korjattua, että
 * tummennus ja maan rajan vahvistus menisi samaa reittiä kuin raja
 * kartassa? paksunna maan rajaa myös hieman"*.
 *
 * Kysymys ei ollut piirtäjän vaan LÄHTEEN: tämä kerros piirsi Natural
 * Earthin 50m-polygoneista, kun laattoihin poltettu rajaviiva ja
 * rantaviiva tulevat 10m-aineistosta. Aineisto tehdään nyt samasta
 * 10m-lähteestä ja samalla 0,006 asteen kynnyksellä kuin poltto, joten
 * varjon reuna ja vahvistusviiva kulkevat poltetun rajan päällä
 * (mittaukset: tools/generoi-maapolygonit.mjs). Hinta on kuusi kertaa
 * tiheämpi polku — 240 000 kärkipistettä ja 3,29 miljoonaa merkkiä
 * `d`-määreessä — eikä se näkynyt kehysmittauksissa (ks. ELEKÄYTÖS).
 *
 * === AINEISTO ON LAISKA (sama malli kuin js/maakayrat.js) ==========
 *
 * assets/data/maapolygonit.json (tools/generoi-maapolygonit.mjs)
 * haetaan vasta kun efektiä ensi kertaa tarvitaan. Yhden tiedoston
 * versioon sitä EI upoteta: siellä haku epäonnistuu, `null` jää
 * muistiin ja efekti jää yksinkertaisesti pois — ei virhettä, ei
 * ilmoitusta. Sama koskee maata, jolle aineistossa ei ole polygonia.
 */

import { kehittajaTilaPaalla, kehittajaTummennusPaalla } from './ui-apurit.js';

const TUMMENNUS_NS = 'http://www.w3.org/2000/svg';

/**
 * TUMMENNUKSEN VOIMAKKUUS — koko efektin ainoa säädin.
 *
 * Osuus kartan omasta musteesta naapurimaiden päällä — ja vain maalla,
 * sillä meri jää maalaamatta (ks. tiedoston alku). Yksi luku yhdessä
 * paikassa juuri siksi, että sävyä säädetään
 * kuvavedoksista eikä koodia lukemalla: vertailuvedokset 31.8.2026
 * ajettiin tätä vakiota vaihtamalla, muuta ei tarvinnut koskea.
 *
 * MITATTU VAIKUTUS (Kreikka + naapurit, punaisen kanavan keskimääräinen
 * lasku naapurimaan MAALLA verrattuna kuvaan ilman kerrosta; 3245
 * mittapistettä lähizoomissa, jana 250 km, ja 963 pelaajan uloimmassa
 * zoomissa, 31.8.2026):
 *
 *     voima   lähizoomi   uloin zoomi
 *     0,10       16          15          ← omistaja ei huomannut lainkaan
 *     0,18       29          27
 *     0,25       39          36
 *     0,32       50          47
 *
 * Kreikan oma pinta pysyy jokaisella tasolla paikallaan (delta 0,2 ja
 * 2,7 yksikköä) — mittaus tehtiin evenodd-reiällä, ja nykyinen malli
 * jättää oman maan maalaamatta jo siksi, ettei sen polygonia ole
 * varjopolussa lainkaan. NAAPURILUVUT PÄTEVÄT SELLAISENAAN: naapurin
 * maalla maalataan yhä sama muste samalla peittävyydellä. Meren luvut
 * ovat nyt nollia — sitä ei enää maalata.
 *
 * VOIMAKKUUS EI MAKSA MITÄÄN. Sama savuke kolmesti kummallakin ääripäällä
 * (tools/savukkeet/savuke-maailmanakyma.mjs, 31.8.2026):
 *
 *     voima 0,10   panorointi 0/0/0 ms   nipistys 529/522/449 ms
 *     voima 0,32   panorointi 0/0/0 ms   nipistys 556/537/477 ms
 *
 * Ero on ajojen omaa hajontaa: kerros on eleen ajan display:none
 * (css/styles.css), joten sen sävy ei ole eleen aikana maalikierroksessa
 * lainkaan. Sävyn saa siis valita silmällä eikä kellolla.
 */
const TUMMENNUS_VOIMA = 0.10;
/** Kartan muste tummennuksen voimakkuudella. */
const TUMMENNUS_MUSTE = `rgba(58, 40, 25, ${TUMMENNUS_VOIMA})`;
/**
 * Ääriviivan leveys RUUTUPIKSELEINÄ (vector-effect: non-scaling-stroke,
 * css/styles.css).
 *
 * KARTTAVAKIO EIKÄ LAUTAYKSIKKÖ, ja se on mittaustulos eikä makuasia.
 * Pelilaudan rantaviiva ei ole DOMissa vaan POLTETTU laattoihin
 * (tools/fokuskartta/piirto.js osio 7: `lineWidth = 1.35 * S`, eli
 * runsas pikseli laatan omassa tarkkuudessa), joten sen paksuus on
 * ruudun ominaisuus eikä laudan. Lautayksikköinä annettu viiva
 * skaalautuisi zoomin mukana: sama 4,8 yksikköä oli lähikuvassa
 * kymmenkunta pikseliä paksu tolppa, joka peitti Egeanmeren pikkusaaret
 * kokonaan mustiksi läiskiksi (mitattu kuvakaappauksella 31.8.2026).
 *
 * VIIVA ON SAATTAJA, EI ITSE EFEKTI. Ensimmäinen versio oli 1,5 px
 * täydellä musteella, ja omistaja katsoi kuvat 31.8.2026: *"Kevyt
 * ääriviiva mutta muut valtiot saisi tummentaa enemmän."* Ero maahan
 * tehdään siis PINNALLA (`TUMMENNUS_VOIMA`) eikä reunuksella, ja reunus
 * kevennettiin yhteen ruutupikseliin — hitusen ohuemmaksi kuin
 * poltettu rantaviiva, jottei Egeanmeren pikkusaari lue lähizoomissa
 * tummana renkaana eikä pieni maa kaukonäkymässä raskaana könttänä.
 * Sävy himmennetään samassa hengessä css/styles.css:ssä.
 *
 * 1 -> 2 PIKSELIÄ (omistaja 1.9.2026, sama kuvakaappaus Bulgarian
 * lehdestä kuin rajojen osuvuudessa, sanatarkasti: *"paksunna maan
 * rajaa myös hieman"*). Kaksi ruutupikseliä on runsas puolitoista
 * kertaa poltettu rantaviiva (piirto.js osio 7: `1,35 * S`), eli maan
 * oma raja erottuu nyt naapurinsa rannikosta ilman että siitä tulee
 * tolppa — se on juuri se, mitä *"hieman"* tarkoittaa. Yhden pikselin
 * viiva näytti samalta kuin rantaviiva sen alla, ja pyynnön syy oli
 * siinä: viivaa ei erottanut korostukseksi.
 *
 * PAKSUNNUS ON MAHDOLLINEN VASTA NYT. Niin kauan kuin viiva kulki eri
 * geometriaa kuin poltettu raja (ks. tools/generoi-maapolygonit.mjs
 * "LÄHDE ON SAMA KUIN POLTETULLA RAJALLA"), paksumpi viiva olisi vain
 * tehnyt eron näkyvämmäksi. Samalla reunalla se peittää poltetun viivan
 * kuten korostuksen kuuluukin.
 */
const TUMMENNUS_VIIVA = 2;

let polygoniLupaus = null;

/**
 * Aineisto kerran per istunto; epäonnistunut haku palauttaa null ja
 * seuraava tarve yrittää uudestaan (siksi lupaus nollataan virheessä).
 * Sanasta sanaan sama malli kuin js/maakayrat.js lataaMaakayrat.
 */
export function lataaMaapolygonit() {
  polygoniLupaus ??= fetch('assets/data/maapolygonit.json')
    .then((v) => (v.ok ? v.json() : null))
    .catch(() => null)
    .then((data) => {
      if (!data?.maat) polygoniLupaus = null;
      return data?.maat ? data : null;
    });
  return polygoniLupaus;
}

/**
 * Yhden maan renkaat SVG-polun d-merkkijonoksi.
 *
 * Aineisto on deltakoodattua kymmenesosayksikköä
 * (tools/generoi-maapolygonit.mjs `koodaa`), joten purku on yksi
 * silmukka eikä yhtään välitaulukkoa: luvut kirjoitetaan suoraan
 * polkuun.
 *
 * KIERTÄVÄN LAUDAN SAUMA. Muutama rengas ylittää laudan sauman (175 W:
 * Tšukotka, Aleutit, Fidži, Uusi-Seelanti), ja aineistossa ne ovat
 * ehjinä laudan välin [0, leveys) ulkopuolella. Rengas monistetaan
 * silloin laudan leveyden verran sivuun, ja kerroksen rajaus leikkaa
 * ylimenevän pois — sama ratkaisu ja sama syy kuin linssikerroksella
 * (js/ui.js drawBoard "Rajaus sauman yli").
 */
function maanPolku(renkaat, tarkkuus, leveys) {
  const osat = [];
  for (const r of renkaat) {
    let x = 0;
    let y = 0;
    let minX = Infinity;
    let maxX = -Infinity;
    let d = '';
    for (let i = 0; i < r.length; i += 2) {
      x = i ? x + r[i] : r[i];
      y = i ? y + r[i + 1] : r[i + 1];
      const lx = x / tarkkuus;
      if (lx < minX) minX = lx;
      if (lx > maxX) maxX = lx;
      d += `${i ? 'L' : 'M'}${lx.toFixed(1)} ${(y / tarkkuus).toFixed(1)}`;
    }
    d += 'Z';
    osat.push(d);
    // Sauman yli ulottuva rengas myös laudan toiselle laidalle.
    if (leveys > 0 && minX < 0) osat.push(siirra(d, leveys));
    else if (leveys > 0 && maxX > leveys) osat.push(siirra(d, -leveys));
  }
  return osat.join('');
}

/** Sama polku vaakasuunnassa siirrettynä (vain M/L-komennot). */
function siirra(d, dx) {
  return d.replace(/([ML])(-?[\d.]+)/g, (_, kirjain, luku) => `${kirjain}${(Number(luku) + dx).toFixed(1)}`);
}

/*
 * Maakohtaiset polkumerkkijonot kerran istuntoa kohti.
 *
 * Varjo on JOKAINEN MUU MAA, joten maanvaihto latoisi ilman muistia 133
 * maan renkaat uudestaan — samat luvut, sama tulos. Muisti on
 * moduulitasolla eikä ui-oliossa, koska sen syöte (aineisto + laudan
 * leveys) on sama kaikille laudoille, jotka samaa aineistoa käyttävät;
 * laudan vaihtuessa syöte vaihtuu ja muisti rakennetaan uudelleen.
 */
let polkuMuisti = null;

/** Yhden maan polku muistista tai laskettuna. */
function maanPolkuMuistista(data, iso, tarkkuus, leveys) {
  if (polkuMuisti?.data !== data || polkuMuisti.tarkkuus !== tarkkuus
    || polkuMuisti.leveys !== leveys) {
    polkuMuisti = { data, tarkkuus, leveys, polut: new Map() };
  }
  let d = polkuMuisti.polut.get(iso);
  if (d === undefined) {
    d = maanPolku(data.maat[iso], tarkkuus, leveys);
    polkuMuisti.polut.set(iso, d);
  }
  return d;
}

/**
 * KAIKKIEN MUIDEN MAIDEN renkaat yhtenä polkuna — tummennuksen muoto.
 *
 * KOKO MAAILMA EIKÄ NÄKYMÄN YMPÄRISTÖ, ja se on mittaustulos. Polku on
 * iso — Kreikassa 133 maata, noin 2 550 rengasta, 239 000 pistettä ja
 * 3 286 148 merkkiä `d`-määreessä (10m-aineisto 1.9.2026; sitä ennen
 * 1 193 rengasta ja 536 662 merkkiä, ja alkuperäinen suorakaide 6 856)
 * — mutta se ladotaan VAIN maan vaihtuessa ja on muuten staattinen.
 * Alla olevat luvut on mitattu 50m-aineistolla; kehysmittaus uudella
 * polulla on tiedoston alussa (ELEKÄYTÖS), eikä se erottunut
 * kohinasta. Mitattu Kreikan lähikuvassa
 * (Chromium 390x844 dpr3, scratch-mitta 31.8.2026; ladonta = avain
 * nollille ja uusi piirto, feidaus = kerros piiloon ja takaisin,
 * kolmesti):
 *
 *     malli                    ladonta   pahin kehys   kehyksiä >32 ms
 *     arkin suorakaide (vanha)  0,7–4,1 ms   16,8 ms          0
 *     muiden maiden polku       3–11 ms      16,8 ms          0
 *
 * Ensimmäinen ladonta (kaikki 134 maata puretaan) oli 10,1 ms.
 * Feidauksen maalikustannus ei muuttunut mitattavasti: varjon PINTA-ALA
 * pieneni (meri jää maalaamatta), vaikka reunojen määrä kasvoi. Sama
 * savuke, jolla feidauksen valinnat aikanaan mitattiin
 * (tools/savukkeet/savuke-maailmanakyma.mjs; taulukko css/styles.css),
 * antoi kolmella ajolla kumpaakin mallia nipistyksen longtaskeiksi
 *
 *     arkin suorakaide (vanha)   583 / 508 / 502 ms
 *     muiden maiden polku        455 / 475 / 546 ms
 *
 * eli saman hajonnan. Panoroinnissa kumpikin on 0 ms (vanhalla mallilla
 * yhdessä ajossa 55 ms — sekin ajon omaa kohinaa).
 *
 * NÄKYMÄN YMPÄRISTÖÖN RAJAAMINEN OLISI OLLUT HUONO KAUPPA. Se toisi
 * takaisin juuri sen, mistä arkinlaajuisella suorakaiteella päästiin:
 * polku olisi ladottava uudelleen aina kun näkymä siirtyy rajauksen
 * laidalle (mitattu 31.8.2026: näkymän kokoinen laatikko nosti
 * panoroinnin longtaskit 0 ms:stä 327–352 ms:iin). Maan omaan
 * ympäristöön rajaaminen taas ei ole tiivis: kehittäjän maailmanäkymässä
 * kamera saa liikkua vapaasti (js/kartta.js fokusRajaukset palauttaa
 * silloin nullin), ja juuri siinä tilassa omistaja pelitestaa —
 * tummentamaton naapurimanner olisi näkynyt hänelle ensimmäisenä.
 */
function muidenPolku(data, iso, tarkkuus, leveys) {
  const osat = [];
  for (const koodi of Object.keys(data.maat)) {
    if (koodi === iso) continue;
    osat.push(maanPolkuMuistista(data, koodi, tarkkuus, leveys));
  }
  return osat.join('');
}

/**
 * Kerros paikalleen tai pois — kutsutaan näkymän ASETUTTUA
 * (js/ui.js paivitaMaastonimet) ja maan vaihtuessa
 * (js/ui.js paivitaFokusPohja), ei koskaan eleen aikana.
 *
 * Työ tehdään vain kun tunniste muuttuu: sama maa samalla
 * näkyvyydellä ei kirjoita DOMiin mitään.
 */
export function paivitaMaatummennus(ui) {
  const kerros = ui.maatummennusKerros;
  if (!kerros) return;
  const tila = tunniste(ui);
  if (ui.maatummennusAvain === (tila?.avain ?? null)) return;
  if (!tila) {
    ui.maatummennusAvain = null;
    if (kerros.firstChild) kerros.textContent = '';
    return;
  }
  /*
   * Aineisto voi olla vielä matkalla. Avainta EI merkitä ennen kuin
   * polku on piirretty, jotta seuraava asettuminen yrittää uudelleen —
   * ja lupaus on jaettu, joten odottaminen ei tee uutta hakua.
   */
  lataaMaapolygonit().then((data) => {
    if (ui.dead || !data) return;
    // Näkymä on voinut vaihtua haun aikana.
    if (tunniste(ui)?.avain !== tila.avain) return;
    if (ui.maatummennusAvain === tila.avain) return;
    piirra(ui, data, tila);
  });
}

/**
 * Mitä kerroksessa pitäisi nyt olla — tai null, jos ei mitään.
 *
 * AVAIN ON PELKKÄ MAA. Varjo on maiden muotoinen eikä laatikko, joten
 * se ei riipu arkista, näkymästä eikä mittakaavasta: panorointi ja
 * zoomaus eivät tee työtä, ja vain maanvaihto tai näkyvyysrajan ylitys
 * latoo polun uudelleen.
 *
 * Arkki oli mukana avaimessa niin kauan kuin varjo oli arkin kokoinen
 * suorakaide (arkki tarkentuu kerran laudan elinaikana, kun pyramidin
 * luettelo saapuu verkosta — js/ui.js paivitaLaudanRajat). Maapolku ei
 * tunne arkkia lainkaan, joten se tarkennus ei enää koske tätä
 * kerrosta.
 */
function tunniste(ui) {
  /*
   * KEHITTÄJÄN KYTKIN (omistaja 1.9.2026 ilta, sanatarkasti: *"kartan
   * tummennuksen voisi ottaa pois päältä kehittäjä tilassa."*).
   *
   * Ehto on TÄSSÄ eikä piirtäjässä, koska tämä on kerroksen ainoa
   * näkyvyysehto: null tyhjentää kerroksen samalla polulla kuin
   * zoomirajan ylitys tai maaton näkymä, eikä kytkimelle tarvita omaa
   * purkukoodia. Kytkimen vaihto ajaa kuitenkin nollauksen käsin
   * (js/ui.js paivitaKehittajaTummennus), koska avain ei muutu maan
   * pysyessä samana.
   *
   * PELAAJAAN KYTKIN EI VAIKUTA: ilman kehittäjätilaa avainta ei edes
   * lueta, joten laitteelle jäänyt vanha '0' ei voi sammuttaa
   * tummennusta pelin normaalissa käytössä.
   */
  if (kehittajaTilaPaalla() && !kehittajaTummennusPaalla()) return null;
  const iso = ui.fokuskarttaAvain;
  if (!iso) return null;
  const raja = ui.kartta?.pelaajanUloinSkaala?.();
  if (!(raja > 0)) return null;
  const skaala = ui.nakyvaAlue?.()?.skaala;
  if (!(skaala > 0)) return null;
  // Pieni sietovara: pelaajan uloin taso itse kuuluu mukaan.
  if (!(skaala >= raja * 0.999)) return null;
  return { iso, avain: iso };
}

/** Muiden maiden polku täyttönä, ja nykyisen maan renkaat viivana. */
function piirra(ui, data, tila) {
  const kerros = ui.maatummennusKerros;
  const renkaat = data.maat[tila.iso];
  if (!renkaat?.length) {
    /*
     * Maalle ei ole polygonia: efekti jää hiljaa pois. Naapureita EI
     * tummenneta tässäkään tapauksessa — ilman oman maan muotoa
     * kerroksesta puuttuisi juuri se, mitä se korostaa. Avain merkitään,
     * ettei jokainen asettuminen etsi polygonia uudelleen.
     */
    ui.maatummennusAvain = tila.avain;
    if (kerros.firstChild) kerros.textContent = '';
    return;
  }
  const map = ui.game?.pack?.map;
  const leveys = map?.kiertava ? (data.lauta?.leveys ?? map.width) : 0;
  const tarkkuus = data.tarkkuus || 10;
  const oma = maanPolkuMuistista(data, tila.iso, tarkkuus, leveys);
  const muut = muidenPolku(data, tila.iso, tarkkuus, leveys);
  kerros.textContent = '';
  /*
   * VARJO ON MUIDEN MAIDEN POLYGONIT — ei laatikkoa, ei reikää. Meri
   * jää maalaamatta (omistaja 31.8.2026 yöllä: *"Merta ei tarvitse
   * tummentaa"*), samoin nykyinen maa: sen polygoni ei ole polussa.
   *
   * `nonzero` (SVG:n oletus, kirjoitettu näkyviin koska se on ehto eikä
   * makuasia): naapurirenkaat menevät rajaviivalla päällekkäin, ja vain
   * nonzero maalaa päällekkäisen kaistaleen kerran. Ks. tiedoston alku.
   */
  const varjo = document.createElementNS(TUMMENNUS_NS, 'path');
  varjo.setAttribute('class', 'maatummennus-varjo');
  varjo.setAttribute('fill-rule', 'nonzero');
  varjo.setAttribute('fill', TUMMENNUS_MUSTE);
  varjo.setAttribute('d', muut);
  kerros.appendChild(varjo);
  const viiva = document.createElementNS(TUMMENNUS_NS, 'path');
  viiva.setAttribute('class', 'maatummennus-viiva');
  viiva.setAttribute('d', oma);
  viiva.setAttribute('stroke-width', String(TUMMENNUS_VIIVA));
  kerros.appendChild(viiva);
  ui.maatummennusAvain = tila.avain;
  /*
   * FEIDAUS ALKAA TÄSTÄ HETKESTÄ (1.9.2026). Kerros ei enää katoa eleen
   * ajaksi, joten `display: none` → näkyvä ei enää käynnistä
   * css/styles.css:n `maatummennus-esiin`-animaatiota. Varjo ilmestyy
   * nyt vain silloin kun se rakennetaan — maanvaihdossa tai
   * näkyvyysehdon auetessa — ja animaatio käynnistetään siinä käsin.
   *
   * `animation: none` + pakotettu tyylin luku + takaisin on selaimen
   * oma tapa nollata käynnissä oleva animaatio. Luku maksaa yhden
   * tyylilaskennan, ja se tehdään korkeintaan kerran maanvaihtoa
   * kohti — ei näkymää eikä kehystä kohti.
   */
  kerros.style.animation = 'none';
  void getComputedStyle(kerros).animationName;
  kerros.style.animation = '';
}

/** Lauta vaihtui tai peli purettiin: kerros ja avain nollille. */
export function nollaaMaatummennus(ui) {
  ui.maatummennusAvain = null;
  if (ui.maatummennusKerros?.firstChild) ui.maatummennusKerros.textContent = '';
}
