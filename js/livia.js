/*
 * LIVIAN OMAT KUPLAT: AVAUSESITTELY, TUURAUSPALJASTUS JA MANNERIVIHJE
 * (omistajan tilaus 29.8.2026; Raamattu, "LIVIAN AVAUSESITTELY").
 *
 * Kolme kohtaa, joissa Livia puhuu omasta aloitteestaan — kaksi
 * ensimmäistä ovat yhtä kaarta, kolmas on pelin kulun apu:
 *
 *  1. AVAUSESITTELY. Kun ensimmäinen karttaikkuna aukeaa — se näkymä,
 *     josta pelaaja valitsee ensimmäisen lentonsa kohteen — Livia
 *     lennähtää mukaan ja esittäytyy neljällä kuplalla. Sarja kerrotaan
 *     KERRAN PER LAITE (localStorage). Repliikit ovat kaanonia
 *     (päätoimittaja 29.8.2026): niitä ei muokata täällä.
 *
 *     BETA-RAJOITUS KERROTAAN TARINAN SISÄLLÄ. Pelistä on toistaiseksi
 *     valittavana yksi reitti, ja se on Livian neljännessä repliikissä
 *     pöllön keskeneräinen tarkistustyö — sanaa "beta" ei käytetä.
 *
 *  2. TUURAUSPALJASTUS. Ensimmäisessä kohdemaassa selviää, ettei pöllö
 *     ehdikään paikalle: Livia joutuu tuuraamaan. Kahden kuplan sarja
 *     KORVAA sen saapumisen maadoituskuplan, ja se tulee vain
 *     ensimmäisellä saapumisella koskaan. Avauksen viides repliikki
 *     lupaa pöllön oppaaksi, joten nämä kaksi ovat sama kaari — älä
 *     muuta toista muuttamatta toista.
 *
 *  3. MANNERIVIHJE. Kun pelaaja on jäänyt samaan maahan pitkäksi aikaa
 *     mantereen aarteen löydyttyä ja rahaa on kertynyt, Livia muistuttaa
 *     kerran, että isosta kaupungista pääsee toiselle mantereelle.
 *     Laukaisin on TILANTEESTA eikä kalenterista, eikä vihje koskaan
 *     väheksy sitä sisältöä, jonka äärellä pelaaja viipyy.
 *
 * KUPLA ON SAMA KUIN LIVIAN SAAPUMISKUPLA (js/pollo.js): sama paperi,
 * sama kärki, sama napautussopimus. Tämä moduuli omistaa vain sanat,
 * ajoituksen ja portit.
 */

import { polloAvauskupla, polloSaapumiskupla, polloVihjePois } from './pollo.js';

/* ------------------------------------------------------------------ *
 * Avausesittely
 * ------------------------------------------------------------------ */

/**
 * LIVIAN AVAUSREPLIIKIT — KAANONIA (päätoimittaja 29.8.2026, omistajan
 * hyväksymä). Sanatarkkoja: sanajärjestystä, välimerkkejä eikä
 * ajatusviivoja muuteta ilman päätoimittajaa.
 */
export const LIVIAN_AVAUS = [
  'Hei, odotas kaveri. Sinähän olet ihan hiessä.',
  'Minä olen Livia. Ja tiedän sinusta enemmän kuin arvaat — pöllö luki '
    + 'isoisäsi kirjan, ja minä kannoin ne sähkeet.',
  'Valitse rauhassa mistä aloitat — vaikka se maanosa, joka kutkuttaa '
    + 'eniten. Pallon ympäri sinä kierrät joka tapauksessa.',
  'Ai niin, ja anteeksi valikoima: pöllö on ehtinyt tarkistaa vasta yhden '
    + 'reitin. Ateenasta se alkaa. Loput aukeavat kyllä.',
  /*
   * OPASLUPAUS (omistaja 29.8.2026): avaus lupaa pöllön oppaaksi ja
   * Livian pelkäksi viestinviejäksi. Lupaus on dramaturgian toinen
   * puoli — perillä selviää, että Livia joutuukin tuuraamaan
   * (LIVIAN_PALJASTUS). Älä muuta kumpaakaan erikseen.
   */
  'Perillä sinua odottaa Viisas Pöllö — se näistä hommista tietää. Minä '
    + 'olen vain viestinviejä.',
];

/**
 * LIVIAN KASVOKUVA AVAUSNÄKYMÄÄN (omistaja 29.8.2026: kuva generoidaan
 * myöhemmin erikseen; muualla Livia pysyy pienenä pöllökuvakkeena).
 *
 * Kuplassa on valmis kuvapaikka, joka näyttää nykyisen viivakuvakkeen
 * niin kauan kuin tämä on tyhjä. Kun kuva on olemassa, tähän
 * kirjoitetaan sen polku (esim. 'assets/tietaja/livia-avaus.jpg') —
 * muuta ei tarvita, koska paikka on saman kokoinen kummallakin
 * sisällöllä (js/pollo.js avauksenKuvapaikka).
 */
export const LIVIAN_KASVOKUVA = '';

/**
 * Lippu laitteen muistissa: avausesittely on nähty.
 *
 * NOLLAUS KONSOLISTA testausta varten:
 *   localStorage.removeItem('matkakirja-livia-avaus')
 */
export const LIVIA_AVAUS_TALLE = 'matkakirja-livia-avaus';

/** Hengähdys kartan avautumisen ja ensimmäisen kuplan välissä. */
const AVAUKSEN_VIIVE = 900;

/** Tauko kuplien välissä: uusi repliikki saa oman ilmestymisensä. */
const KUPLIEN_VALI = 280;

/** Lukuaika merkkiä kohden ja sen rajat. */
const LUKUAIKA_PER_MERKKI = 58;
const LUKUAIKA_VAHINTAAN = 2800;
const LUKUAIKA_ENINTAAN = 8200;

/** Sarjan tila: yksi kerrallaan, ja ajastin peruttavissa. */
let avausKesken = false;
let avausAjastin = null;

/** Onko avausesittely jo nähty tällä laitteella? */
export function livianAvausNahty() {
  try {
    return localStorage.getItem(LIVIA_AVAUS_TALLE) === '1';
  } catch {
    // Yksityinen selaus: parempi vaieta kuin toistaa esittely joka kerta.
    return true;
  }
}

/** Merkitsee esittelyn nähdyksi. Kirjoitetaan vasta kun kupla oikeasti näkyi. */
function merkitseNahdyksi() {
  try {
    localStorage.setItem(LIVIA_AVAUS_TALLE, '1');
  } catch {
    /* yksityinen selaus: lippu jää kirjaamatta, sarja tulee ensi kerralla */
  }
}

/** Repliikin lukuaika: pituudesta, mutta rajojen sisällä. */
function lukuaika(teksti) {
  return Math.min(
    LUKUAIKA_ENINTAAN,
    Math.max(LUKUAIKA_VAHINTAAN, teksti.length * LUKUAIKA_PER_MERKKI),
  );
}

/**
 * LIVIA LENNÄHTÄÄ MUKAAN, kun ensimmäinen karttaikkuna aukeaa
 * (js/kartta.js zoomaaAloituskartta).
 *
 * KUPLAT EIVÄT ESTÄ VALINTAA. Kupla asuu oikeassa alanurkassa siinä
 * kohdassa, johon pöllönappi myöhemmin ilmestyy, eikä se peitä
 * kohdekaupunkeja; napautus kaupunkiin valitsee kaupungin ja
 * peruLivianAvaus vie sarjan siististi pois (js/ui.js doPickStart).
 *
 * @param {object} ui pelin käyttöliittymä
 * @returns {boolean} alkoiko sarja
 */
export function naytaLivianAvaus(ui) {
  if (!ui || ui.dead || ui.katselu) return false;
  if (ui.game?.phase !== 'pickstart') return false;
  if (avausKesken || livianAvausNahty()) return false;
  avausKesken = true;
  clearTimeout(avausAjastin);
  avausAjastin = setTimeout(() => naytaRepliikki(ui, 0), AVAUKSEN_VIIVE);
  return true;
}

/** Yksi repliikki kuplaan; seuraava lähtee ajastimesta tai napautuksesta. */
function naytaRepliikki(ui, i) {
  avausAjastin = null;
  if (!avausKesken) return;
  if (ui.dead || ui.game?.phase !== 'pickstart') {
    lopetaAvaus();
    return;
  }
  const teksti = LIVIAN_AVAUS[i];
  if (!teksti) {
    lopetaAvaus();
    return;
  }
  const nakyi = polloAvauskupla(teksti, {
    kuva: LIVIAN_KASVOKUVA,
    // Lennähdys kuuluu sarjan avaukseen: Livia saapuu kerran.
    lennahda: i === 0,
    kuittaus: () => seuraavaRepliikki(ui, i + 1),
  });
  if (!nakyi) {
    lopetaAvaus();
    return;
  }
  // Lippu vasta kun sarja oikeasti näkyi (sama sopimus kuin pöllön
  // kutsukuplalla, js/ehdotukset.js ajastaEhdotusKupla).
  if (i === 0) merkitseNahdyksi();
  avausAjastin = setTimeout(() => seuraavaRepliikki(ui, i + 1), lukuaika(teksti));
}

/** Kupla pois, pieni tauko ja seuraava repliikki — tai sarjan loppu. */
function seuraavaRepliikki(ui, i) {
  clearTimeout(avausAjastin);
  avausAjastin = null;
  if (!avausKesken) return;
  if (i >= LIVIAN_AVAUS.length) {
    lopetaAvaus();
    return;
  }
  polloVihjePois();
  avausAjastin = setTimeout(() => naytaRepliikki(ui, i), KUPLIEN_VALI);
}

/** Sarja päättyy: ajastin pois ja kupla pois. */
function lopetaAvaus() {
  clearTimeout(avausAjastin);
  avausAjastin = null;
  avausKesken = false;
  polloVihjePois();
}

/**
 * Sarja pois kesken kaiken: pelaaja valitsi kaupungin (js/ui.js
 * doPickStart). Ei tee mitään, jos sarjaa ei ole käynnissä.
 */
export function peruLivianAvaus() {
  if (!avausKesken) return;
  lopetaAvaus();
}

/* ------------------------------------------------------------------ *
 * Ensisaapumisen tuurauspaljastus
 * ------------------------------------------------------------------ */

/**
 * LIVIAN PALJASTUS ENSIMMÄISESSÄ KOHDEMAASSA — KAANONIA
 * (päätoimittaja 29.8.2026, omistajan hyväksymä).
 *
 * DRAMATURGIA: avauksessa Livia lupaa pöllön oppaaksi ja itsensä
 * pelkäksi viestinviejäksi (LIVIAN_AVAUS, viides kupla). Perillä
 * selviää, ettei pöllö ehdikään — sijaisuustarina (Raamattu, "LIVIA
 * TUURAAJANA") muuttuu pelaajan kokemaksi hetkeksi sen sijaan että se
 * kerrottaisiin taustatietona.
 *
 * TÄMÄ SARJA ON SEN SAAPUMISEN KUPLAT. Yksi puheenvuoro per
 * saapuminen on kuplien sääntö, joten maadoituskupla väistyy tämän
 * tieltä (js/fokusvirta.js fokusvirtaSaapumiskupla kysyy
 * livianPaljastusOdottaa) ja saapumisen ohjekuplat tulevat vasta
 * sarjan jälkeen (js/ui.js saapumisenKuplat).
 *
 * VAIN ENSIMMÄISELLÄ SAAPUMISELLA KOSKAAN: laitelippu, ja sen lisäksi
 * istunnon oma lippu siltä varalta, ettei muistiin voi kirjoittaa.
 */
export const LIVIAN_PALJASTUS = [
  'Kaak. Sähke. ...Pöllö on juuttunut matkoilleen. Hetkenä minä hyvänsä '
    + 'se ehtii, mutta juuri nyt — no. Minä tuuraan.',
  'Ei hätää. Minä olen kantanut sen sähkeet vuosia ja lukenut joka '
    + 'ikisen. Melkein joka ikisen. Aloitetaan.',
];

/**
 * Lippu laitteen muistissa: tuurauspaljastus on nähty.
 *
 * NOLLAUS KONSOLISTA testausta varten:
 *   localStorage.removeItem('matkakirja-livia-paljastus')
 */
export const LIVIA_PALJASTUS_TALLE = 'matkakirja-livia-paljastus';

/** Sarjan tila: istunnon lippu, ajastin ja kaupunki, jossa sarja soi. */
let paljastusAnnettu = false;
let paljastusAjastin = null;
let paljastusKaupunki = null;

/** Onko tuurauspaljastus jo nähty tällä laitteella? */
function paljastusNahty() {
  try {
    return localStorage.getItem(LIVIA_PALJASTUS_TALLE) === '1';
  } catch {
    // Yksityinen selaus: mieluummin vaiti kuin sama paljastus joka
    // saapumisella (istunnon lippu ei yksin riitä sivun uudelleen-
    // latauksen yli).
    return true;
  }
}

/**
 * ONKO PALJASTUS TÄMÄN SAAPUMISEN PUHEENVUORO?
 *
 * Kysytään kahdesta paikasta: maadoituskupla väistyy tosi-arvolla
 * (js/fokusvirta.js) ja saapumissekvenssi ajaa sarjan (js/ui.js).
 * Sarjan alettua vastaus pysyy TOTENA sen kaupungin ajan, jossa sarja
 * soi — muuten maadoitus ehtisi vielä sen päälle samalla
 * saapumisella. Seuraavissa kaupungeissa vastaus on epätosi ja
 * saapumiset kulkevat normaalisti.
 */
export function livianPaljastusOdottaa(ui) {
  if (!ui || ui.dead || ui.katselu) return false;
  if (paljastusAnnettu) return ui.game?.cityOf?.()?.id === paljastusKaupunki;
  return !paljastusNahty();
}

/**
 * Tuurauspaljastus kuplasarjana, jos se on tälle saapumiselle
 * ajankohtainen.
 *
 * @param {object} ui pelin käyttöliittymä
 * @param {object} [asetukset]
 * @param {(() => void)|null} [asetukset.jalkeen] mitä tehdään sarjan
 *   jälkeen — saapumisen omat ohjekuplat.
 * @returns {boolean} alkoiko sarja (epätosi = kutsuja jatkaa itse).
 */
export function naytaLivianPaljastus(ui, { jalkeen = null } = {}) {
  if (!livianPaljastusOdottaa(ui) || paljastusAnnettu) return false;
  const city = ui.game?.cityOf?.() ?? null;
  if (!city) return false;
  paljastusAnnettu = true;
  paljastusKaupunki = city.id;
  try {
    localStorage.setItem(LIVIA_PALJASTUS_TALLE, '1');
  } catch {
    /* yksityinen selaus: istunnon lippu kantaa loppumatkan */
  }
  paljastusRepliikki(ui, city.id, 0, jalkeen);
  return true;
}

/** Yksi paljastuksen repliikki; napautus tai ajastin vie seuraavaan. */
function paljastusRepliikki(ui, cityId, i, jalkeen) {
  clearTimeout(paljastusAjastin);
  paljastusAjastin = null;
  if (ui.dead) return;
  // Pelaaja on voinut lähteä kaupungista kesken sarjan: puheenvuoro
  // kuuluu vain siihen saapumiseen, jossa se alkoi.
  if (ui.game?.cityOf?.()?.id !== cityId) return;
  const teksti = LIVIAN_PALJASTUS[i];
  if (!teksti) {
    jalkeen?.();
    return;
  }
  const seuraava = () => paljastusRepliikki(ui, cityId, i + 1, jalkeen);
  if (!polloSaapumiskupla(teksti, { kuittaus: seuraava })) {
    // Kupla ei mahtunut ruudulle (paneeli auki): ohjekuplat hoitavat
    // saapumisen, eikä sarjaa jäädä odottamaan.
    jalkeen?.();
    return;
  }
  paljastusAjastin = setTimeout(seuraava, lukuaika(teksti));
}

/* ------------------------------------------------------------------ *
 * Mannerivihje
 * ------------------------------------------------------------------ */

/** Mannerivihjeen repliikki — KAANONIA (päätoimittaja 29.8.2026). */
export const MANNERIVIHJE = 'Kuule — jos tämä maa alkaa tuntua pitkältä, '
  + 'kerää rahaa lentoon. Isosta kaupungista pääsee vaikka toiselle '
  + 'mantereelle. Maailma ei lopu kesken.';

/**
 * Rahaportti (omistaja 29.8.2026: "rahaa vähintään mannerylityksen
 * hinta, 1000 p").
 *
 * Mannerlento itsessään maksaa FLIGHT_PRICE (300 p, js/rules.js), joten
 * tämä on TARKOITUKSELLA reilusti sen yli: vihje tulee vasta, kun lento
 * on aidosti varaa maksaa ilman että matkakassa tyhjenee. Portti on
 * mieluummin liian tiukka kuin ärsyttävä.
 */
const MANNERIVIHJEEN_RAHA = 1000;

/**
 * Vuoroja samassa maassa sen jälkeen, kun mantereen aarre on löytynyt
 * ja lento olisi ollut mahdollinen. Sama maa vuorosta toiseen on se
 * "pitkältä tuntuva maa", josta omistaja puhui; laskuri nollautuu heti,
 * kun pelaaja siirtyy toiseen maahan.
 */
const MANNERIVIHJEEN_VUOROT = 6;

/** Maat, joissa vihje on jo annettu, ja istunnon oma kertalippu. */
const mannerivihjeenMaat = new Set();
let mannerivihjeAnnettu = false;

/** Odotuksen alku: missä maassa ja mistä vuorosta lähtien. */
let mannerivihjeenOdotus = null;

/**
 * Onko ruudulla jo jotain, jonka päälle vihje ei saa tulla?
 *
 * Fokusvirran kortti ja kupla omistavat ruudun silloin kun ne ovat
 * auki (js/fokusnosto.js noudattaa samaa sääntöä), ja avoin ikkuna on
 * pelaajan oma valinta. Vihje odottaa niiden yli — se ei ole kiireinen.
 */
function ruutuVarattu(doc = document) {
  if (doc.querySelector('.fokusvirta-kupla, .fokusvirta-kortti')) return true;
  return Boolean(doc.querySelector('dialog[open]'));
}

/**
 * MANNERIVIHJE TILANTEESTA (omistaja 29.8.2026).
 *
 * Kutsutaan joka piirrossa (js/ui.js render); portit ovat tässä, ei
 * kutsupaikassa. Kaikkien on täytyttävä yhtä aikaa:
 *
 *   1. pelaajan oma vuoro toimintavaiheessa, ei bottia eikä katselua
 *   2. Livia on pelissä (pöllö löytynyt)
 *   3. vaellustila ja tämän mantereen aarre löytynyt — eli mannerlento
 *      on oikeasti olemassa (js/game.js mannerLennot)
 *   4. sama maa MANNERIVIHJEEN_VUOROT vuoron ajan siitä hetkestä, kun
 *      kohdat 1–3 alkoivat täyttyä
 *   5. rahaa vähintään MANNERIVIHJEEN_RAHA
 *   6. kerran per maa ja kerran per istunto
 *
 * @param {object} ui pelin käyttöliittymä
 * @returns {boolean} näytettiinkö vihje juuri nyt
 */
export function paivitaMannerivihje(ui) {
  const game = ui?.game;
  if (!game || ui.dead || ui.katselu || ui.busy) return false;
  if (mannerivihjeAnnettu) return false;
  if (game.phase !== 'action') return false;
  const pelaaja = game.player;
  if (!pelaaja || pelaaja.isBot) return false;
  // Pöllö on aarre: ennen ensimmäistä laattaa Livia ei puhu mitään.
  if (game.polloLoydetty === false) return false;

  const city = game.cityOf?.();
  const maa = city ? game.pack?.map?.cityCountry?.[city.id] ?? null : null;
  if (!maa) {
    mannerivihjeenOdotus = null;
    return false;
  }
  const manner = city ? game.mannerOf?.(city.id) ?? null : null;
  const lentoMahdollinen = Boolean(manner) && game.roaming === true
    && game.mantereenTahtiLoytynyt?.(manner) === true;
  if (!lentoMahdollinen) {
    // Aarre on vielä löytymättä: odotus ei ole edes alkanut.
    mannerivihjeenOdotus = null;
    return false;
  }

  const vuoro = game.turnCount ?? 1;
  if (mannerivihjeenOdotus?.maa !== maa) mannerivihjeenOdotus = { maa, vuoro };
  if (mannerivihjeenMaat.has(maa)) return false;
  if (vuoro - mannerivihjeenOdotus.vuoro < MANNERIVIHJEEN_VUOROT) return false;
  if ((pelaaja.money ?? 0) < MANNERIVIHJEEN_RAHA) return false;
  if (ruutuVarattu(ui.doc ?? document)) return false;

  // Kupla voi jäädä tulematta (paneeli auki, nappi piilossa): silloin
  // lippuja ei kuluteta, vaan tilanne kokeillaan uudelleen.
  if (!polloSaapumiskupla(MANNERIVIHJE)) return false;
  mannerivihjeenMaat.add(maa);
  mannerivihjeAnnettu = true;
  return true;
}

/**
 * Uusi peli aloittaa istunnon puhtaalta pöydältä (js/ui.js mount):
 * kesken jäänyt kuplasarja katkaistaan ja mannerivihjeen odotus
 * nollataan.
 *
 * KERTALIPUT EIVÄT NOLLAUDU TÄSSÄ. Avausesittely on kerran per laite
 * ja tuurauspaljastus kerran koskaan — uusi peli ei ole uusi laite
 * eikä uusi tarina.
 */
export function nollaaLivianVihjeet() {
  peruLivianAvaus();
  clearTimeout(paljastusAjastin);
  paljastusAjastin = null;
  mannerivihjeenMaat.clear();
  mannerivihjeAnnettu = false;
  mannerivihjeenOdotus = null;
}
