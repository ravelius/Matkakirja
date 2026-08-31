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
/** Ääriviivan leveys lautayksikköinä: 1,5 x css .coast (3,2). */
const TUMMENNUS_VIIVA = 4.8;

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
  const iso = nakyvaMaa(ui);
  if (ui.maatummennusAvain === iso) return;
  if (!iso) {
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
    if (nakyvaMaa(ui) !== iso) return;
    if (ui.maatummennusAvain === iso) return;
    piirra(ui, data, iso);
  });
}

/** Maa, jonka tummennus kuuluu näyttää — tai null. */
function nakyvaMaa(ui) {
  const iso = ui.fokuskarttaAvain;
  if (!iso) return null;
  const raja = ui.kartta?.pelaajanUloinSkaala?.();
  if (!(raja > 0)) return null;
  const skaala = ui.nakyvaAlue?.()?.skaala;
  if (!(skaala > 0)) return null;
  // Pieni sietovara: pelaajan uloin taso itse kuuluu mukaan.
  return skaala >= raja * 0.999 ? iso : null;
}

/** Suorakaide + renkaat evenoddina, ja renkaat vielä viivana. */
function piirra(ui, data, iso) {
  const kerros = ui.maatummennusKerros;
  const renkaat = data.maat[iso];
  if (!renkaat?.length) {
    // Maalle ei ole polygonia: efekti jää hiljaa pois, mutta avain
    // merkitään, ettei jokainen asettuminen etsi sitä uudelleen.
    ui.maatummennusAvain = iso;
    if (kerros.firstChild) kerros.textContent = '';
    return;
  }
  const map = ui.game?.pack?.map;
  const leveys = map?.kiertava ? (data.lauta?.leveys ?? map.width) : 0;
  const d = maanPolku(renkaat, data.tarkkuus || 10, leveys);
  kerros.textContent = '';
  /*
   * Suorakaide on ARKIN kokoinen eikä näkymän: näkymä muuttuu joka
   * eleessä, arkki ei muutu koskaan. Yläreuna on nollan yläpuolella,
   * koska Millerin lieriössä pohjoisimmat saaret (Frans Joosefin maa)
   * ovat laudan yläreunan ulkopuolella — evenodd tarvitsee niiden
   * reiät samasta polusta.
   */
  const arkkiW = map?.width ?? 0;
  const arkkiH = map?.height ?? 0;
  const varjo = document.createElementNS(TUMMENNUS_NS, 'path');
  varjo.setAttribute('class', 'maatummennus-varjo');
  varjo.setAttribute('fill-rule', 'evenodd');
  varjo.setAttribute('fill', TUMMENNUS_MUSTE);
  varjo.setAttribute('d', `M0 0H${arkkiW}V${arkkiH}H0Z${d}`);
  kerros.appendChild(varjo);
  const viiva = document.createElementNS(TUMMENNUS_NS, 'path');
  viiva.setAttribute('class', 'maatummennus-viiva');
  viiva.setAttribute('d', d);
  viiva.setAttribute('stroke-width', String(TUMMENNUS_VIIVA));
  kerros.appendChild(viiva);
  ui.maatummennusAvain = iso;
}

/** Lauta vaihtui tai peli purettiin: kerros ja avain nollille. */
export function nollaaMaatummennus(ui) {
  ui.maatummennusAvain = null;
  if (ui.maatummennusKerros?.firstChild) ui.maatummennusKerros.textContent = '';
}
