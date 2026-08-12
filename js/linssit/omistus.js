/*
 * Linssien omistus: kuka omistaa mitä, mistä linssi löytyy ja mihin
 * löytö jää talteen.
 *
 * Kaikki linssien palkitsemislogiikka on tässä yhdessä tiedostossa,
 * jotta js/game.js:ään tulee vain kutsuja. Peli tuntee linsseistä siis
 * täsmälleen kaksi asiaa: laattatyypin "linssi" ja kokemuspisterajan.
 *
 * OMISTUS ON KAHDEN VARASTON UNIONI, ja se on päätös eikä sivuseuraus:
 *
 *   1. passin leimat (matkakirja.passi.v1, avaimet "linssi:<tunnus>")
 *      — säilyvät pelikerrasta toiseen,
 *   2. pelaajan oma linssit-lista pelitallennuksessa
 *      — kertoo mitkä linssit löytyivät TÄMÄN matkan aikana.
 *
 * Omistajan sanoin: "Kertakäyttöinen linssi olisi julma — kerran
 * nähtyä maailmaa ei oteta pois" (docs/tyolista-opukselle.md 128–130).
 * Kerran löydetty linssi toimii siis myös uudessa pelissä, mutta lokia
 * ja laukkua varten peli tietää silti, mitkä niistä löytyivät nyt.
 */

import { readStamps, stampBoard } from '../passport.js';
import { LINSSIT } from './rekisteri.js';

/*
 * Passileimojen etuliite. Sama kuvio kuin kunniamerkinnällä
 * (js/ui.js: `kunnia:<packId>`): passi on yksi litteä avaintaulu, ja
 * etuliite pitää linssit erillään lautaleimoista ilman uutta varastoa.
 */
export const LEIMA_ETULIITE = 'linssi:';

/*
 * Kokemuspisteiden löytöreitti: neljä kynnystä, neljä linssiä, jotka
 * eivät ole minkään mantereen laatan alla (rekisterissä manner: null).
 *
 * Mittakaava tulee pelin omista XP-vakioista (js/game.js 88–94):
 * uusi kaupunki 10, uusi lauta 50, vaikea vastaus 25, pääaarre 100.
 * 400 kp on siis noin kaksikymmentä uutta kaupunkia vastauksineen —
 * ensimmäinen palkinto tulee selvästi pelin aikana ja viimeinen vaatii
 * pitkän matkan.
 */
export const LINSSIKYNNYKSET = [400, 800, 1400, 2200];

/** Passiin leimatut linssit tunnuksina. */
function passinLinssit() {
  const ulos = new Set();
  for (const avain of Object.keys(readStamps())) {
    if (avain.startsWith(LEIMA_ETULIITE)) ulos.add(avain.slice(LEIMA_ETULIITE.length));
  }
  return ulos;
}

/** Rekisterin rivi tunnuksella, tai null jos linssiä ei ole olemassa. */
function rivi(tunnus) {
  return LINSSIT.find((r) => r.tunnus === tunnus) ?? null;
}

/**
 * Ensimmäinen omistamaton linssi rekisterijärjestyksessä ehdon
 * täyttävistä riveistä. Järjestys on aakkosellinen ja siis vakaa:
 * sama peli antaa samat linssit samassa järjestyksessä.
 */
function ensimmainenOmistamaton(omat, ehto) {
  for (const r of LINSSIT) {
    if (ehto(r) && !omat.has(r.tunnus)) return r.tunnus;
  }
  return null;
}

/**
 * Kaikki pelaajan omistamat linssit tunnuksina.
 *
 * Peli annetaan ensimmäisenä kaikille tämän tiedoston funktioille,
 * vaikka kaikki eivät sitä tarvitse: kutsurivit js/game.js:ssä ovat
 * silloin samanmuotoisia eikä kutsujan tarvitse muistaa poikkeuksia.
 */
/*
 * Kehittäjätila: kaikki TOIMIVAT linssit heti käyttöön.
 *
 * Omistajan toive 4.8.2026: "lisää kehittäjätilaan automaattisesti
 * kaikki aarteet heti näkyville, niin pystyn kokeilemaan niitä" —
 * ja tarkennus perään: "Siis toiminnalliset aarteet."
 *
 * Toimiva tarkoittaa tässä täsmälleen sitä, mikä on rekisterissä auki.
 * Rekisterin rivit avataan sitä mukaa kuin linssit valmistuvat, joten
 * tämä lista kasvaa itsestään eikä jää jälkeen. Suunnitellut mutta
 * tekemättömät linssit ovat rivejä kommenttien takana, eivätkä ne siis
 * ilmesty tänne lupaamaan jotain mitä ei ole.
 *
 * Avain luetaan suoraan localStoragesta eikä js/ui.js:n kautta:
 * js/ui.js tuo tämän tiedoston, joten tuonti takaisin olisi kehä.
 */
const KEHITTAJA_TILA_AVAIN = 'matkakirja-kehittaja';

function kehittajaTila() {
  try {
    return globalThis.localStorage?.getItem(KEHITTAJA_TILA_AVAIN) === '1';
  } catch {
    return false; // yksityinen selaus
  }
}

export function omistetut(game, player = game?.player) {
  const ulos = passinLinssit();
  for (const tunnus of player?.linssit ?? []) ulos.add(tunnus);
  if (kehittajaTila()) for (const r of LINSSIT) ulos.add(r.tunnus);
  return ulos;
}

/** Omistaako pelaaja tämän linssin? */
export function omistaa(game, player, tunnus) {
  return omistetut(game, player).has(tunnus);
}

/**
 * Myöntää linssin pelaajalle. Palauttaa { uusi, tunnus }, jossa uusi
 * kertoo oliko linssi ennestään tuntematon — vain silloin siitä
 * kannattaa kertoa pelaajalle.
 */
export function myonna(game, player, tunnus) {
  const r = rivi(tunnus);
  if (!r) return { uusi: false, tunnus: null };

  const passissa = passinLinssit().has(tunnus);
  const lista = (player.linssit ??= []);
  const uusi = !passissa && !lista.includes(tunnus);
  if (!lista.includes(tunnus)) lista.push(tunnus);
  if (!passissa) void leimaaPassiin(r);
  return { uusi, tunnus };
}

/*
 * Passileima haetaan linssin omalla nimellä, ja se vaatii moduulin
 * tuonnin — nimi asuu linssimoduulissa, ei rekisterissä (suunnitelma
 * luku 3). Tuonti on hidas ja voi epäonnistua, joten leimaus tehdään
 * pelin ulkopuolella: pelitilan kannalta omistus on jo kunnossa
 * (player.linssit), ja passi on olemassa vasta seuraavaa peliä varten.
 * Odottamisesta ei siis olisi mitään hyötyä, ja odottaminen jäädyttäisi
 * laatan kääntämisen tiedostonoudon ajaksi.
 *
 * Yhden tiedoston versiossa (dist/matkakirja.html) linssimoduuleja ei
 * ole lainkaan, joten tuonti kaatuu. Leima tehdään silti — muuten
 * omistus katoaisi pelin päättyessä — mutta tunnuksella nimen sijaan.
 */
async function leimaaPassiin(r) {
  let nimi = r.tunnus;
  try {
    const moduuli = await r.tuo();
    nimi = moduuli?.LINSSI?.nimi ?? nimi;
  } catch {
    // Linssimoduulia ei ole saatavilla; leima menee tunnuksella.
  }
  stampBoard(`${LEIMA_ETULIITE}${r.tunnus}`, nimi);
}

/**
 * Mikä linssi löytyy tämän kaupungin laatan alta.
 *
 * Ensisijaisesti kaupungin oman mantereen linssi: laattoja on yksi per
 * manner, joten normaalipelissä tämä osuu aina ja jokainen manner
 * antaa oman linssinsä.
 *
 * Jos se on jo omistettu — mikä on toisella pelikerralla tavallista,
 * koska passin leimat säilyvät — annetaan ensimmäinen omistamaton
 * linssi rekisterijärjestyksessä. Laattalinssit tarjotaan ensin ja
 * kokemuspistelinssit vasta niiden loputtua: muuten palaava pelaaja
 * saisi koko kokemuspistereitin ilmaiseksi seitsemällä laatalla.
 *
 * null tarkoittaa, ettei annettavaa ole; kutsuja kohtelee laattaa
 * silloin tyhjänä.
 */
export function linssiKaupungista(game, cityId, player = game.player) {
  const pack = game.pack;
  // Muilla laudoilla kuin maailmankartalla kenttää ei ole: koko lauta
  // on yksi manner ja pakkatunnus kelpaa sellaisenaan.
  const manner = pack.map?.cityManner?.[cityId] ?? pack.id;
  const omat = omistetut(game, player);

  const oma = LINSSIT.find((r) => r.manner === manner);
  if (oma && !omat.has(oma.tunnus)) return oma.tunnus;

  return ensimmainenOmistamaton(omat, (r) => r.manner !== null)
    ?? ensimmainenOmistamaton(omat, (r) => r.manner === null);
}

/**
 * Kokemuspistekynnysten tarkistus. Palauttaa myönnetyt tunnukset, jotta
 * kutsuja voi kertoa niistä pelaajalle.
 *
 * Kynnys ylittyy vain kerran: vertailu tehdään pistemäärään ennen ja
 * jälkeen, ei nykyiseen summaan. Yksi kutsu voi ylittää kaksi kynnystä
 * (pääaarre + ennätys antaa 300 kp kerralla), joten lista käydään läpi
 * kokonaan.
 */
export function tarkistaKynnys(game, player, ennen, jalkeen) {
  const uudet = [];
  if (jalkeen <= ennen) return uudet;
  for (const raja of LINSSIKYNNYKSET) {
    if (ennen >= raja || jalkeen < raja) continue;
    // Omistus luetaan uudelleen joka kierroksella, koska edellinen
    // myönnetty linssi muutti sitä.
    const tunnus = ensimmainenOmistamaton(omistetut(game, player), (r) => r.manner === null);
    if (!tunnus) break; // kaikki kokemuspistelinssit on jo löydetty
    myonna(game, player, tunnus);
    uudet.push(tunnus);
  }
  return uudet;
}

/**
 * Mantereet, joille kuuluu linssilaatta — rekisterijärjestyksessä.
 * Laattojen jako (js/game.js enterWorld) kysyy tämän, jottei sen
 * tarvitse tuntea rekisterin muotoa.
 */
export function laattamantereet() {
  const ulos = [];
  for (const r of LINSSIT) {
    if (r.manner && !ulos.includes(r.manner)) ulos.push(r.manner);
  }
  return ulos;
}
