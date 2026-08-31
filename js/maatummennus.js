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
 *   TUMMENNUS on koko arkin kokoinen tumma suorakaide, johon nykyisen
 *   maan renkaat on LEIKATTU AUKI samassa polussa `fill-rule: evenodd`
 *   -säännöllä. Yksi polku, yksi maalattava muoto — ei maskia, ei
 *   suodinta, ei toista kerrosta. Muste on kartan oma (rgba(58,40,25))
 *   ja peittävyys 0,10: naapuri tummuu sen verran että silmä erottaa
 *   rajan, mutta laatan topografia näkyy läpi.
 *
 *   ÄÄRIVIIVA on samat renkaat viivana kartan musteella, leveydeltään
 *   noin puolitoista kertaa rantaviiva (css .coast, 3,2 lautayksikköä).
 *   Se on nykyisen maan raja — ei naapureiden, ei kaikkien maiden.
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
 * === ELEKÄYTÖS (v1395:n kaksivaiheinen koneisto) ===================
 *
 * Kerros on `.kartta-merkit-haipyy`-luokan display:none-joukossa
 * (css/styles.css), joten se katoaa eleen ENSIMMÄISESSÄ kehyksessä
 * eikä ole maalikierroksessa lainkaan sormen alla. Paluu feidaa:
 * kerroksella on `animation`, ei `transition`, koska display:none →
 * näkyvä ei laukaise siirtymää mutta KÄYNNISTÄÄ animaation alusta.
 * Sama kaksivaiheisuus tuo kerroksen takaisin vasta levon jälkeen
 * (js/kartta.js paljastaMerkit), jolloin feidaus alkaa siitä hetkestä.
 * Nauhoitettu 31.8.2026: kerros katosi 13 ms:ssä eleen alusta ja palasi
 * 0 → 1 noin 320 ms:ssä levon jälkeen.
 *
 * FEIDATTAVA OMINAISUUS ON PERITTY `fill-opacity` / `stroke-opacity`
 * EIKÄ RYHMÄN `opacity`, ja animaatio on PORTAIKKO. Kumpikin on
 * mittaustulos: ryhmän peittävyys teki kerroksesta oman
 * läpinäkyvyystasonsa (savuke-maailmanakyma nipistyksessä 382 →
 * 933–1202 ms), ja portaaton feidaus maalasi arkinlevyisen varjon
 * parikymmentä kertaa (435–786 ms). Nykyisillä valinnoilla luvut ovat
 * lähtötasolla (388–475 ms). Taulukko: css/styles.css samassa lohkossa.
 *
 * ELEIDEN VÄLISSÄ KERROS ON STAATTINEN. Polut lasketaan vain kun maa
 * vaihtuu tai näkyvyys kytkeytyy — ei kehystä kohti, ei näkymää kohti.
 *
 * === AINEISTO ON LAISKA (sama malli kuin js/maakayrat.js) ==========
 *
 * assets/data/maapolygonit.json (tools/generoi-maapolygonit.mjs)
 * haetaan vasta kun efektiä ensi kertaa tarvitaan. Yhden tiedoston
 * versioon sitä EI upoteta: siellä haku epäonnistuu, `null` jää
 * muistiin ja efekti jää yksinkertaisesti pois — ei virhettä, ei
 * ilmoitusta. Sama koskee maata, jolle aineistossa ei ole polygonia.
 */

const TUMMENNUS_NS = 'http://www.w3.org/2000/svg';

/** Tummennuksen peittävyys — kartan muste, hyvin hienovarainen. */
const TUMMENNUS_MUSTE = 'rgba(58, 40, 25, 0.10)';
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
 * 1,5 px on noin puolitoista kertaa poltettu rantaviiva juuri niin kuin
 * tilauksessa — *"maan ääriviivat piirtää hieman paksummalla"* — ja
 * pysyy samana kaikilla zoomitasoilla, kuten kaikki muukin ruutuun
 * mitoitettu kartan sisältö (js/karttanimet.js, js/fokusmitat.js).
 */
const TUMMENNUS_VIIVA = 1.5;

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
 * Avain on maa: sama maa samalla näkyvyydellä ei kirjoita DOMiin
 * mitään, ja koska varjo on ARKIN kokoinen (ks. `arkinAla`), panorointi
 * ja zoomaus eivät muuta sitä lainkaan. Vain maanvaihto ja
 * näkyvyysrajan ylitys tekevät työtä.
 */
function tunniste(ui) {
  const iso = ui.fokuskarttaAvain;
  if (!iso) return null;
  const raja = ui.kartta?.pelaajanUloinSkaala?.();
  if (!(raja > 0)) return null;
  const skaala = ui.nakyvaAlue?.()?.skaala;
  if (!(skaala > 0)) return null;
  // Pieni sietovara: pelaajan uloin taso itse kuuluu mukaan.
  if (!(skaala >= raja * 0.999)) return null;
  const ala = arkinAla(ui);
  return ala ? { iso, ala, avain: iso } : null;
}

/**
 * Varjon suorakaide: KOKO ARKKI.
 *
 * Näkymä muuttuu joka eleessä, arkki ei muutu koskaan — ja juuri siksi
 * kerros voi olla eleiden välissä staattinen. Näkymän kokoista
 * laatikkoa kokeiltiin (31.8.2026), ja se oli huonompi: se on
 * piirrettävä uudelleen joka asettumisessa, ja savukkeessa panoroinnin
 * longtaskit nousivat 0 ms:stä 327–352 ms:iin, kun taas paluufeidauksen
 * hinta ei juuri muuttunut. Feidauksen hinta hoidetaan portaikolla
 * (css/styles.css), ei laatikon koolla.
 *
 * Arkki luetaan `ui.contentBox`ista eikä laudan mitoista, koska
 * pyramidilaudalla ne EIVÄT ole sama asia: laatta-arkki ulottuu laudan
 * ylä- ja alapuolelle (js/kartta.js boardBounds, arkki y −1046…6261,
 * kun lauta on 0…5399). Laudan mitoilla piirretty suorakaide jättäisi
 * Grönlannin kärjen ja Jäämeren tummentamatta — ja juuri se kaistale on
 * se, jonka takia arkkia laajennettiin.
 */
function arkinAla(ui) {
  const map = ui.game?.pack?.map;
  const arkki = ui.contentBox
    ?? { x: 0, y: 0, w: map?.width ?? 0, h: map?.height ?? 0 };
  if (!(arkki.w > 0) || !(arkki.h > 0)) return null;
  const p = (n) => Number(n.toFixed(1));
  return { x: p(arkki.x), y: p(arkki.y), w: p(arkki.w), h: p(arkki.h) };
}

/** Suorakaide + renkaat evenoddina, ja renkaat vielä viivana. */
function piirra(ui, data, tila) {
  const kerros = ui.maatummennusKerros;
  const renkaat = data.maat[tila.iso];
  if (!renkaat?.length) {
    // Maalle ei ole polygonia: efekti jää hiljaa pois, mutta avain
    // merkitään, ettei jokainen asettuminen etsi sitä uudelleen.
    ui.maatummennusAvain = tila.avain;
    if (kerros.firstChild) kerros.textContent = '';
    return;
  }
  const map = ui.game?.pack?.map;
  const leveys = map?.kiertava ? (data.lauta?.leveys ?? map.width) : 0;
  const d = maanPolku(renkaat, data.tarkkuus || 10, leveys);
  kerros.textContent = '';
  /*
   * EVENODD TEKEE REIÄN: suorakaide ja maan renkaat samassa polussa,
   * jolloin renkaiden sisäpuoli jää maalaamatta. Kokonaan laatikon
   * ulkopuolelle jäävä rengas (kaukainen saari) ei vaikuta mihinkään,
   * ja laatikon kokonaan sisäänsä sulkeva rengas (iso maa lähikuvassa)
   * jättää koko laatikon maalaamatta — kumpikin oikein ilman
   * erikoistapauksia.
   */
  const { x, y, w, h } = tila.ala;
  const varjo = document.createElementNS(TUMMENNUS_NS, 'path');
  varjo.setAttribute('class', 'maatummennus-varjo');
  varjo.setAttribute('fill-rule', 'evenodd');
  varjo.setAttribute('fill', TUMMENNUS_MUSTE);
  varjo.setAttribute('d', `M${x} ${y}H${x + w}V${y + h}H${x}Z${d}`);
  kerros.appendChild(varjo);
  const viiva = document.createElementNS(TUMMENNUS_NS, 'path');
  viiva.setAttribute('class', 'maatummennus-viiva');
  viiva.setAttribute('d', d);
  viiva.setAttribute('stroke-width', String(TUMMENNUS_VIIVA));
  kerros.appendChild(viiva);
  ui.maatummennusAvain = tila.avain;
}

/** Lauta vaihtui tai peli purettiin: kerros ja avain nollille. */
export function nollaaMaatummennus(ui) {
  ui.maatummennusAvain = null;
  if (ui.maatummennusKerros?.firstChild) ui.maatummennusKerros.textContent = '';
}
