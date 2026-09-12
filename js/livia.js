/*
 * LIVIAN OMAT KUPLAT: AVAUSESITTELY, TUURAUSPALJASTUS JA MANNERIVIHJE
 * (omistajan tilaus 29.8.2026; Raamattu, "LIVIAN AVAUSESITTELY").
 *
 * Kolme kohtaa, joissa Livia puhuu omasta aloitteestaan — kaksi
 * ensimmäistä ovat yhtä kaarta, kolmas on pelin kulun apu:
 *
 *  1. AVAUSESITTELY. Kun ensimmäinen karttaikkuna aukeaa — se näkymä,
 *     josta pelaaja valitsee ensimmäisen lentonsa kohteen — Livia
 *     lennähtää mukaan ja esittäytyy muutamalla kuplalla. Sarja kerrotaan
 *     KERRAN PER LAITE (localStorage). Repliikit ovat kaanonia
 *     (päätoimittaja 29.8.2026): niitä ei muokata täällä.
 *
 *     BETA-RAJOITUS KERROTAAN TARINAN SISÄLLÄ — KUN SITÄ ON. Kun
 *     valittavia reittejä oli yksi, sen kertoi Livian neljäs repliikki
 *     pöllön keskeneräisenä tarkistustyönä (sanaa "beta" ei käytetä).
 *     7.9.2026 alkaen kohteita on neljätoista, ja se kupla väistyy
 *     sarjasta (livianAvausSarja) — teksti jää kaanoniin.
 *
 *  2. TUURAUSPALJASTUS. Ensimmäisessä kohdemaassa selviää, ettei pöllö
 *     ehdikään paikalle: Livia joutuu tuuraamaan. Äänirekisterin
 *     kolmesta kaanonialkiosta kaksi ensimmäistä KORVAAVAT sen
 *     saapumisen maadoituskuplan, ja sarja tulee vain
 *     ensimmäisellä saapumisella koskaan. Kaksi näytettävää kuplaa
 *     tulevat ENNEN isoisän luentaa, jonka jälkeen sarja päättyy
 *     (omistaja 7.9.2026, PULUN UUSI RYTMI ATEENASSA). Avauksen viides
 *     repliikki lupaa pöllön oppaaksi, joten nämä kaksi ovat sama
 *     kaari — älä muuta toista muuttamatta toista.
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

import {
  livianKuplanAjastin, pysaytaLivianAani, soitaLivianAani,
} from './liviapuhe.js';
import { luennanLoppuun } from './luenta.js';
import { polloAvauskupla, polloKuplatPois, polloSaapumiskupla, polloLivianEnsiliito, peruPolloLivianEnsiliito } from './pollo.js';
import { sfx } from './sound.js';
import { ETUSIVUN_KOHTEET, linssiEstaa } from './ui-apurit.js';
import { kuunteleLivianTilanteita } from './livia-tilanteet.js';

/* ------------------------------------------------------------------ *
 * Livian ääniefektit
 * ------------------------------------------------------------------ */

/*
 * LIVIAN TEHOSTEET (omistajan tilaus 6.9.2026 aamupäivä, sanatarkasti:
 * *"Pululle ja muuallekin tarvitaan ääniefektejä: linnun siivet
 * lentäessä, tömähdyksiä (pulu laskeutuu), hassuja täyteääniä kun pulu
 * sekoilee (doing vieteriääni yms), oven lämähdys kiinni ja auki (pulu
 * tulee tai lähtee), viuhahdusefektejä yms. Näitä ei generoida."*).
 *
 * Kolme ohjelmaa, kukin pari tehostetta porrastettuna: saapuminen,
 * sekoilu ja lähtö. Ne ovat listoja eivätkä kutsuja, koska ajoitus on
 * niiden ainoa sisältö — viuhahdus ja siipien räpytys menevät hieman
 * päällekkäin, tömähdys tulee kun lennähdys on ohi ja kupla paikallaan.
 *
 * OVEA EI SOITETA. Omistajan tilauksessa ovi kuuluu sisätiloihin
 * ("pulu tulee tai lähtee"), ja avausesittely tapahtuu maailmankartan
 * yllä — ulkona. Ohje oli *"jätä pois jos epäselvää"*, ja se on
 * epäselvää, joten ovitunnukset (pulu.ovi-auki, pulu.ovi-kiinni) ovat
 * pelissä valmiina mutta ilman kutsupaikkaa; ensimmäinen sisäkohtaus
 * saa ne käyttöönsä.
 *
 * ÄÄNI EI SAA KAATAA KUPLAA. Kaikki soitto on try-catchissa ja
 * sfx.play() vaikenee itsestään, jos äänet ovat pois päältä, peli on
 * taustalla tai tehostetta ei ole ladattu (js/sound.js
 * lataaPulunTehosteet — manifesti tulee ämpäristä, ei repostä).
 */
const LIVIAN_TEHOSTEET = {
  saapuu: [['pulu.viuhahdus', 0], ['pulu.siivet', 0.1], ['pulu.tomahdys', 0.45]],
  sekoilee: [['pulu.doing', 0]],
  lahtee: [['pulu.siivet', 0], ['pulu.viuhahdus-lahto', 0.18]],
};

/**
 * SEKOILUREPLIIKIT. Omistaja nimesi esimerkiksi *"Melkein joka
 * ikisen"* — Livian oman myöntämisen siitä, ettei hän sittenkään ole
 * lukenut aivan kaikkia sähkeitä. Tunnistus on tekstistä eikä
 * indeksistä: repliikit ovat kaanonia ja voivat siirtyä paikaltaan,
 * mutta sanat pysyvät.
 */
const SEKOILUN_MERKIT = [
  /Melkein joka ikisen/,
  /ihan hiessä/,
  /anteeksi valikoima/,
];

/** Onko repliikki niitä humoristisia kohtia, joihin doing kuuluu? */
export function onLivianSekoilua(teksti) {
  return SEKOILUN_MERKIT.some((merkki) => merkki.test(String(teksti ?? '')));
}

/**
 * Soittaa yhden tehosteohjelman (saapuu, sekoilee, lahtee).
 *
 * Tämä on Livian AINOA kosketuspinta ääneen: kutsupaikat alla ovat
 * yhden rivin mittaisia, jotta puheäänen ja tehosteiden työ mahtuvat
 * samaan tiedostoon törmäämättä.
 *
 * @returns {boolean} tunnettiinko ohjelma.
 */
export function soitaLivianTehoste(laji) {
  const ohjelma = LIVIAN_TEHOSTEET[laji];
  if (!ohjelma) return false;
  // Pikselihahmo ajoittaa omat lyhyet äänensä liikkeeseen: ei toista raitaa päälle.
  if (typeof document !== 'undefined' && document.querySelector?.('.livia-lentonayttamo')) return true;
  for (const [nimi, viive] of ohjelma) {
    try {
      sfx.play(nimi, { viive });
    } catch {
      /* ääni ei saa kaataa kuplaa */
    }
  }
  return true;
}

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
  // LYHENNETTY 6.9.2026 (omistaja: repliikit "mahdollisimman lyhyita",
  // puhe ~14 merkkiä/s, katto ~85 merkkiä): sama sisältö, vähemmän sanoja.
  'Minä olen Livia. Pöllö luki isoisäsi kirjan, ja minä kannoin ne sähkeet.',
  'Valitse rauhassa mistä aloitat — vaikka se maanosa, joka kutkuttaa eniten.',
  'Ai niin, ja anteeksi valikoima: pöllö on tarkistanut vasta yhden reitin. '
    + 'Ateenasta se alkaa.',
  /*
   * OPASLUPAUS (omistaja 29.8.2026): avaus lupaa pöllön oppaaksi ja
   * Livian pelkäksi viestinviejäksi. Lupaus on dramaturgian toinen
   * puoli — perillä selviää, että Livia joutuukin tuuraamaan
   * (livianPaljastus). Älä muuta kumpaakaan erikseen.
   */
  'Perillä sinua odottaa Viisas Pöllö. Minä olen vain viestinviejä.',
];

/*
 * ══════════════════════════════════════════════════════════════════
 * YHDEN REITIN KUPLA VÄISTYY, KUN REITTEJÄ ON USEITA (7.9.2026)
 * ══════════════════════════════════════════════════════════════════
 *
 * Neljäs repliikki — *"Ai niin, ja anteeksi valikoima: pöllö on
 * tarkistanut vasta yhden reitin. Ateenasta se alkaa."* — on
 * BETA-RAJOITUS TARINAN SISÄLLÄ (ks. tiedoston alku). Se oli totta
 * niin kauan kuin lähtövalinnassa oli tasan yksi kohde. Kun omistaja
 * nosti 7.9.2026 kohdekaupungit takaisin
 * (js/ui-apurit.js ETUSIVUN_KOHTEET), lause alkoi valehdella: pelaaja
 * näkee neljätoista kultaista rengasta ja kuulee, että tarkistettuja
 * reittejä on yksi.
 *
 * TEKSTI JÄÄ KAANONIIN. Sitä ei poisteta listalta — se on
 * päätoimittajan hyväksymää tekstiä, sillä on oma äänitteensä
 * (puhe-avaus-3), ja jos kohteet joskus palautetaan yhteen, kupla
 * palaa itsestään. Vain NÄYTTÖ on ehdollinen.
 *
 * ÄÄNI SEURAA NÄYTTÖÄ. Äänitteen tiedostonimi tulee repliikin
 * KAANONISESTA järjestysnumerosta (js/liviapuhe.js
 * livianAaniOsoite), joten sarja kuljettaa indeksin mukanaan eikä
 * lasketa sitä uudelleen suodatetusta listasta. Ilman tätä
 * ohitetun kuplan äänite soisi seuraavan kuplan kohdalla.
 */
/** Kaanonin järjestysnumero sille kuplalle, joka väistyy usealla reitillä. */
export const LIVIAN_YHDEN_REITIN_KUPLA = 3;

/**
 * Avaussarja sellaisena kuin se tälle pelille näytetään.
 *
 * @param {number} [kohteita] valittavien lähtökohteiden määrä
 * @returns {{teksti: string, indeksi: number}[]} kuplat kaanonin
 *   indeksin kanssa (indeksi = äänitteen numero)
 */
export function livianAvausSarja(kohteita = ETUSIVUN_KOHTEET.size) {
  return LIVIAN_AVAUS
    .map((teksti, indeksi) => ({ teksti, indeksi }))
    .filter(({ indeksi }) => kohteita <= 1 || indeksi !== LIVIAN_YHDEN_REITIN_KUPLA);
}

/**
 * Lippu laitteen muistissa: avausesittely on nähty.
 *
 * NOLLAUS KONSOLISTA testausta varten:
 *   localStorage.removeItem('matkakirja-livia-avaus')
 */
export const LIVIA_AVAUS_TALLE = 'matkakirja-livia-avaus';

/** Hengähdys kartan avautumisen ja ensimmäisen kuplan välissä. */
const AVAUKSEN_VIIVE = 900;
/*
 * KUPLAT TULEVAT PUOLITOISTA SEKUNTIA MYÖHEMMIN (omistaja 5.9.2026 klo
 * 00.30 työpöytäselaimesta, sanatarkasti: *"pulun kommentit noin 1,5 sek
 * myöhemmin"*). Lisäviive tulee VAIN ENSIMMÄISEN kuplan eteen: kuplien
 * keskinäinen rytmi (KUPLIEN_VALI, lukuaika) on ennallaan, joten sarja
 * kuulostaa samalta — se vain alkaa, kun pallo on jo asettunut
 * valintanäkymään ja pelaaja ehtinyt katsoa karttaa.
 *
 * REDUCED MOTION: ei lisäviivettä. Odottaminen on osa liikkeen
 * koreografiaa (pallon asettuminen ja hidas pyörintä), ja liikkeetön
 * ruutu vain seisoisi tyhjänä pidempään.
 */
export const LIVIAN_AVAUKSEN_VIIVE_MS = 1500;
// Yhteensopivuusvienti vanhoille ajoitustesteille/työkaluille. Uusi
// ensiliitopolku ei lisää tätä 1500 ms: ensimmäinen repliikki alkaa
// AVAUKSEN_VIIVEEN (900 ms) kohdalla jo lennossa, ja toinen odottaa laskua.

/** Tauko kuplien välissä: uusi repliikki saa oman ilmestymisensä. */
const KUPLIEN_VALI = 280;

/** Lukuaika merkkiä kohden ja sen rajat. */
// 6.9.2026: kupla ei saa sulkeutua ennen kuin pulun puhe on ohi. Puhe
// kulkee noin 14 merkkiä sekunnissa (tools/generoi-pulu.mjs), joten
// kuplan aika on 78 ms/merkki (≈ 13 merkkiä/s) + hengähdys; ennen 58.
// 13.9.2026: hyväksytyn Venetsian pitkän Pulu-kuplan hiljainen varakesto
// on noin 16,8 s. Kupla vierii tarvittaessa, joten katto suojaa nyt myös
// pitkän hyväksytyn tekstin silloin, kun uutta äänitettä ei vielä ole.
const LUKUAIKA_PER_MERKKI = 78;
const LUKUAIKA_VAHINTAAN = 3200;
const LUKUAIKA_ENINTAAN = 18000;

/** Sarjan tila: yksi kerrallaan, ja ajastin peruttavissa. */
let avausKesken = false;
let avausAjastin = null;
/** Näkyikö sarjasta yhtään kuplaa — vain silloin Livialla on mistä lähteä. */
let avausNakyi = false;
/** Se käyttöliittymä, jossa sarja soi — äänen pysäytys tarvitsee sen. */
let avauksenUi = null;
let avausLiitoValmis = false;
let avausLiidonJalkeinen = null;
let avausPiilotus = null;

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
    Math.max(LUKUAIKA_VAHINTAAN, String(teksti ?? '').length * LUKUAIKA_PER_MERKKI),
  );
}

/**
 * SAMA LUKUAIKA MUUALLE PELIIN (js/fokusvirta.js).
 *
 * Vakiot (LUKUAIKA_PER_MERKKI) on mitoitettu niin, ettei kupla vaihdu
 * ennen kuin pulun puhe on ohi — ja tools/generoi-pulu.mjs lukee ne
 * TÄSTÄ tiedostosta. Kun äänitetty repliikki näytetään muualla
 * (Ateenan ja Sofian kuplat), rytmin on tultava samasta paikasta eikä
 * omasta kopiosta: kaksi lukuaikaa eriytyisi hiljaa, ja puhe jäisi
 * kuplien alle.
 *
 * @param {string} teksti kuplan teksti
 * @returns {number} millisekunteina
 */
export function livianKuplanLukuaika(teksti) {
  return lukuaika(teksti);
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
  avausLiitoValmis = false;
  avausLiidonJalkeinen = null;
  avauksenUi = ui;
  if (typeof document !== 'undefined') {
    avausPiilotus=()=>{if(document.hidden)lopetaAvaus();};
    document.addEventListener('visibilitychange',avausPiilotus);
    globalThis.addEventListener?.('pagehide',lopetaAvaus);
  }
  clearTimeout(avausAjastin);
  const laskeutui=()=>{
    if (!avausKesken || ui.dead || ui.game?.phase !== 'pickstart') return;
    avausLiitoValmis = true;
    if (avausLiidonJalkeinen !== null) {
      const i=avausLiidonJalkeinen;avausLiidonJalkeinen=null;
      avausAjastin=setTimeout(()=>naytaRepliikki(ui,i),KUPLIEN_VALI);
    }
  };
  if (!polloLivianEnsiliito(laskeutui, { reducedMotion: ui.reducedMotion })) laskeutui();
  // Ensimmäinen tuttu repliikki alkaa, kun kaukainen Pulu on jo
  // tunnistettavissa. Reduced motionissa ei tule liikettä eikä viivettä.
  avausAjastin = setTimeout(() => naytaRepliikki(ui, 0), ui.reducedMotion ? 0 : AVAUKSEN_VIIVE);
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
  const rivi = livianAvausSarja()[i];
  if (!rivi) {
    lopetaAvaus();
    return;
  }
  const { teksti } = rivi;
  const nakyi = polloAvauskupla(teksti, {
    // Ensiliito omistaa saapumisliikkeen; kupla ei aloita sitä uudestaan.
    lennahda: false,
    // Canonical avauksen viides repliikki lupaa Viisaan Pöllön oppaaksi.
    muotokuva: rivi.indeksi === 4,
    kuittaus: () => seuraavaRepliikki(ui, i + 1),
  });
  if (!nakyi) {
    lopetaAvaus();
    return;
  }
  /*
   * ÄÄNI SEURAA KUPLAA (omistaja 6.9.2026): repliikki soitetaan Livian
   * omalla äänellä silloin kun kupla oikeasti näkyi. Myös ensimmäinen
   * on kuiva — kaiku otettiin pois pulun alusta omistajan päätöksellä
   * 6.9.2026 ilta (js/liviapuhe.js LIVIAN_KAIKU). Puuttuva äänite on
   * hiljainen, kupla ennallaan.
   */
  // Äänite kaanonin numerolla, ei sarjan paikalla (ks. livianAvausSarja).
  // Teksti mukaan, jotta vanhentunut äänite jää hiljaiseksi
  // (js/liviapuhe.js livianAaniAjanTasalla); soitin talteen, jotta kupla
  // odottaa puheen loppuun (livianKuplanAjastin).
  const aani = soitaLivianAani(ui, 'avaus', rivi.indeksi, { teksti });
  // Lippu vasta kun sarja oikeasti näkyi (sama sopimus kuin pöllön
  // kutsukuplalla, js/ehdotukset.js ajastaEhdotusKupla).
  if (i === 0) merkitseNahdyksi();
  // Livia lennähtää paikalle kerran; sen jälkeen doing kuuluu niihin
  // repliikkeihin, joissa hän sekoilee (SEKOILUN_MERKIT).
  avausNakyi = true;
  if (i === 0) soitaLivianTehoste('saapuu');
  else if (onLivianSekoilua(teksti)) soitaLivianTehoste('sekoilee');
  /*
   * KUPLA ODOTTAA PUHEEN LOPPUUN (7.9.2026): lukuaika on vähimmäis-
   * aika, ja sitä pidempi äänite venyttää kuplan omaan mittaansa
   * (js/liviapuhe.js livianKuplanAjastin). Ilman äänitettä aika on
   * tasan lukuaika kuten ennen.
   */
  avausAjastin = livianKuplanAjastin(
    lukuaika(teksti), aani,
    () => seuraavaRepliikki(ui, i + 1),
    (id) => { avausAjastin = id; },
  );
}

/*
 * Pieni tauko ja seuraava repliikki — tai sarjan loppu.
 *
 * REPLIIKIT PINOUTUVAT (omistaja 3.9.2026 aloitusvalinnan kaappauksesta:
 * "puhekuplat näkyvät vain yksi kerrallaan. Eli puhekuplien korkeutta
 * pitää kasvattaa, jotta useampi kupla mahtuu kerralla näkyviin"):
 * edellistä kuplaa EI pyyhitä ennen seuraavaa, vaan uusi tulee pinon
 * alle ja työntää aiemmat ylös kuten Sofian kommentissa (js/pollo.js
 * lisaaPinoon). Aiempi "yksi kerrallaan" -linjaus kumottiin samalla.
 * Sarjan loppu (lopetaAvaus) ja pelaajan valinta (peruLivianAvaus)
 * tyhjentävät pinon edelleen.
 */
function seuraavaRepliikki(ui, i) {
  clearTimeout(avausAjastin);
  avausAjastin = null;
  if (!avausKesken) return;
  if (!avausLiitoValmis) { avausLiidonJalkeinen = i; return; }
  if (i >= livianAvausSarja().length) {
    // Sarja päättyi itsestään: viimeinen repliikki saa puhua loppuun.
    lopetaAvaus({ vaienna: false });
    return;
  }
  avausAjastin = setTimeout(() => naytaRepliikki(ui, i), KUPLIEN_VALI);
}

/**
 * Sarja päättyy: ajastin pois ja kuplat pois (ks. seuraavaRepliikki).
 *
 * VIIMEINEN REPLIIKKI SAA PUHUA LOPPUUN. Kun sarja päättyy itsestään,
 * ääntä ei vaienneta: kuplat väistyvät, mutta Livian viimeinen lause
 * kuullaan kokonaan (`vaienna: false`). Keskeytys — pelaajan valinta,
 * kuolleeksi mennyt näkymä tai kupla joka ei mahtunut ruudulle —
 * vaientaa äänen kuplien mukana.
 */
function lopetaAvaus({ vaienna = true } = {}) {
  clearTimeout(avausAjastin);
  avausAjastin = null;
  avausKesken = false;
  // Lähtöääni vain jos Livia oikeasti näkyi: keskeytynyt sarja, jota ei
  // koskaan aloitettu, ei saa lennättää tyhjää ruutua.
  if (avausNakyi) soitaLivianTehoste('lahtee');
  avausNakyi = false;
  if (vaienna) pysaytaLivianAani(avauksenUi);
  if(avausPiilotus){document.removeEventListener('visibilitychange',avausPiilotus);globalThis.removeEventListener?.('pagehide',lopetaAvaus);avausPiilotus=null;}
  peruPolloLivianEnsiliito();
  avausLiitoValmis = false;
  avausLiidonJalkeinen = null;
  avauksenUi = null;
  polloKuplatPois();
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
/*
 * PULUN UUSI RYTMI ATEENASSA (omistaja 7.9.2026, hyväksytty Raamatussa;
 * repliikit ovat omistajan sanatarkkoja, niitä ei muotoilla uusiksi).
 *
 * Ensimmäisellä saapumisella koskaan sarja kulkee näin:
 *
 *   1. KAKSI KUPLAA ENNEN ISOISÄN LUENTAA. Pulu kertoo tuuraavansa ja
 *      toivottaa tervetulleeksi kaupunkiin — ja pyytää kuuntelemaan,
 *      mitä isoisä on paikasta kirjoittanut.
 *   2. ISOISÄN LUENTA. Se alkaa VASTA kuplien jälkeen (js/ui.js
 *      asetaMerkinnanLuenta lykkää sen, aloitaLykattyLuenta päästää sen
 *      liikkeelle) ja pulu on koko luennan ajan hiljaa.
 *   3. Sarja odottaa luennan päättymistä (js/luenta.js luennanLoppuun)
 *      ja päättyy ilman uutta kuplaa. Ilman luentaa odotus on yhden
 *      kuplan vähimmäislukuajan mittainen.
 *
 * Aiempi 5.9.2026 tilaus (pöllön kaksi ohjekuplaa pulun suuhun, "Siinä
 * lukee: Tervetuloa Kreikkaan") KUMOUTUU tällä: uudet kuplat korvaavat
 * ne edelleen, mutta sanoin, jotka omistaja kirjoitti 7.9.2026.
 *
 * PAIKAN NIMI TULEE APUREISTA (js/ui-apurit.js maahanMuoto ja
 * paikkaaMuoto): "Ateenaan" näytettävään kuplaan ja "Ateenaa" vain
 * vanhan ääniavaimen rekisteriin. Ilman nimeä toivotus on pelkkä
 * "Tervetuloa." — kaanoni ei saa rikkoutua puuttuvaan taivutukseen.
 */
export function livianPaljastus({ paikkaan = '', paikkaa = '' } = {}) {
  const tervetuloa = paikkaan ? `Tervetuloa ${paikkaan}.` : 'Tervetuloa.';
  const kohde = paikkaa || 'kaupunkia';
  return [
    'Kääk, apua! Pöllö on matkoilla, mutta ei hätää, tuuraan häntä sen aikaa.',
    `${tervetuloa} Kuunnellaan, mitä isoisä on kirjoittanut tästä paikasta.`,
    // Säilyy kaanonisessa äänirekisterissä vanhalla indeksillään, mutta
    // ei kuulu pelissä näytettävään sarjaan (naytaLivianPaljastus).
    `Kantsuu klikata ${kohde} kartalta, jos meinaat löytää aarteen.`,
  ];
}

/** Paljastus ilman paikkaa (varamuoto; testit ja tuntematon kaupunki). */
export const LIVIAN_PALJASTUS = livianPaljastus();

/**
 * ISOISÄN LUENTA TULEE TÄHÄN: indeksi on ennen luentaa näytettävien
 * kuplien määrä. Sarja päättyy luennan jälkeen ilman uutta kuplaa.
 */
export const LIVIAN_LUENNAN_PAIKKA = 2;

/**
 * Kuinka kauan sarjan päättyminen odottaa, jos luentaa ei ole (kertoja
 * pois, mykistys, puuttuva äänite). Yhden kuplan vähimmäislukuaika on
 * lyhin tauko, joka ruudulla vielä tuntuu tauolta.
 */
const LUENNAN_VARAVIIVE = LUKUAIKA_VAHINTAAN;

/**
 * Lippu laitteen muistissa: tuurauspaljastus on nähty.
 *
 * NOLLAUS KONSOLISTA testausta varten:
 *   localStorage.removeItem('matkakirja-livia-paljastus')
 */
export const LIVIA_PALJASTUS_TALLE = 'matkakirja-livia-paljastus';

/** Purkaa mahdollisen trailerinalaisen saapumiskuplaodotuksen. */
export function peruLivianTraileriodotus(ui) {
  const odotus = ui?.livianTraileriodotus;
  if (!odotus) return false;
  ui.livianTraileriodotus = null;
  odotus.irrota?.();
  return true;
}

/**
 * Siirtää saapumiskuplat aktiivisen trailerin oikean lopun taakse.
 * Token estää vanhan trailerin tapahtumaa vapauttamasta uuden kaupungin
 * kuplia. Peru ja kaupunginvaihto purkavat odotuksen ilman jatkoa.
 */
export function odotaLivianTraileria(ui, cityId, jatka) {
  peruLivianTraileriodotus(ui);
  const traileri = ui?.saapumistraileri;
  if (!traileri?.tunnus) return false;
  const odotus = { tunnus: traileri.tunnus, kaupunki: cityId, irrota: null };
  odotus.irrota = kuunteleLivianTilanteita((laji, tiedot = {}) => {
    if (laji !== 'trailer' || tiedot.tunnus !== odotus.tunnus) return;
    if (tiedot.vaihe !== 'loppu' && tiedot.vaihe !== 'peru') return;
    if (ui.livianTraileriodotus !== odotus) return;
    peruLivianTraileriodotus(ui);
    if (tiedot.vaihe === 'peru' || ui.dead) return;
    if (ui.game?.cityOf?.()?.id !== odotus.kaupunki) return;
    jatka();
  });
  ui.livianTraileriodotus = odotus;
  return true;
}

/** Kuinka usein paljastus kysyy, onko linssi jo suljettu (ks. paljastusRepliikki). */
const PALJASTUKSEN_LINSSIVALI = 700;

/** Sarjan tila: istunnon lippu, ajastin ja kaupunki, jossa sarja soi. */
let paljastusAnnettu = false;
let paljastusAjastin = null;
let paljastusKaupunki = null;
/** Kuplasarja käynnissä (alkanut, ei vielä päättynyt eikä keskeytynyt). */
let paljastusKesken = false;

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
 * Onko paljastus vielä TULOSSA tai KESKEN tässä saapumisessa — eli
 * pitääkö muiden puheenvuorojen odottaa (js/fokusvirta.js
 * fokusvirtaSaapumiskupla). Ero livianPaljastusOdottaa-funktioon:
 * tuo pysyy totena koko ensimmäisen kaupungin ajan (sarjan jälkeenkin),
 * tämä palaa epätodeksi heti kun sarja on päättynyt tai keskeytynyt.
 * Omistaja 3.9.2026: *"pulu ei vieläkään kommentoi isoisän matkakirjan
 * tekstiä kun saavutaan uuteen kaupunkiin"* — ensimmäisessä
 * kaupungissa paljastus söi kommentin kokonaan; nyt kommentti tulee
 * paljastuksen JÄLKEEN samaan kuplapinoon.
 */
export function livianPaljastusKesken(ui) {
  if (!ui || ui.dead || ui.katselu) return false;
  if (paljastusKesken) return true;
  return !paljastusAnnettu && !paljastusNahty();
}

/**
 * Tuurauspaljastus kuplasarjana, jos se on tälle saapumiselle
 * ajankohtainen.
 *
 * @param {object} ui pelin käyttöliittymä
 * @param {object} [asetukset]
 * @param {(() => void)|null} [asetukset.jalkeen] mitä tehdään sarjan
 *   jälkeen — saapumisen omat ohjekuplat.
 * @param {string} [asetukset.paikkaan] kaupunki illatiivissa
 *   ("Ateenaan", js/ui-apurit.js maahanMuoto)
 * @param {string} [asetukset.paikkaa] kaupunki partitiivissa
 *   ("Ateenaa", js/ui-apurit.js paikkaaMuoto)
 * @returns {boolean} alkoiko sarja (epätosi = kutsuja jatkaa itse).
 */
export function naytaLivianPaljastus(ui, { jalkeen = null, paikkaan = '', paikkaa = '' } = {}) {
  if (!livianPaljastusOdottaa(ui) || paljastusAnnettu) return false;
  const city = ui.game?.cityOf?.() ?? null;
  if (!city) return false;
  paljastusAnnettu = true;
  paljastusKaupunki = city.id;
  paljastusKesken = true;
  try {
    localStorage.setItem(LIVIA_PALJASTUS_TALLE, '1');
  } catch {
    /* yksityinen selaus: istunnon lippu kantaa loppumatkan */
  }
  // Näytetään vain kaksi ennen luentaa kuuluvaa kuplaa. Kaanonilistan
  // kolmas alkio säilyy äänityökalun vanhana paljastus-3-avaimena,
  // jotta olemassa olevien äänien indeksit eivät siirry.
  const repliikit = livianPaljastus({ paikkaan, paikkaa })
    .slice(0, LIVIAN_LUENNAN_PAIKKA);
  paljastusRepliikki(ui, city.id, 0, jalkeen, repliikit,
    { paikkaan, paikkaa });
  return true;
}

/**
 * Yksi paljastuksen repliikki; napautus tai ajastin vie seuraavaan.
 *
 * `variantti` on se kaupungin taivutus, josta teksti ladottiin: äänite
 * on olemassa vain äänitetylle variantille (js/liviapuhe.js
 * LIVIAN_AANITETTY_PALJASTUS), muualla kupla puhuu ilman ääntä.
 *
 * LUENTA TULEE KUPLAN 2 JÄLKEEN (LIVIAN_LUENNAN_PAIKKA): toisen kuplan
 * lukuajan jälkeen isoisän luenta päästetään liikkeelle ja sarja jää
 * odottamaan sen loppua (odotaLuenta). Pulu on siis hiljaa koko luennan
 * ajan, kuten omistaja tilasi.
 */
function paljastusRepliikki(ui, cityId, i, jalkeen, repliikit = LIVIAN_PALJASTUS, variantti = {}) {
  clearTimeout(paljastusAjastin);
  paljastusAjastin = null;
  if (ui.dead) { paljastusKesken = false; return; }
  // Pelaaja on voinut lähteä kaupungista kesken sarjan: puheenvuoro
  // kuuluu vain siihen saapumiseen, jossa se alkoi.
  if (ui.game?.cityOf?.()?.id !== cityId) {
    paljastusKesken = false;
    pysaytaLivianAani(ui);
    return;
  }
  /*
   * LINSSI ON PÄÄLLÄ: SARJA ODOTTAA, EI PÄÄTY (omistajan tilaus
   * 4.9.2026). Kupla ei tule linssin päälle (js/pollo.js
   * naytaSaapumiskupla lykkäisi sen jonoon), mutta paljastus ei myöskään
   * saa katketa kesken — se on kertaluontoinen ja kaanonia. Sarja
   * jää siis kysymään vuoroaan, ja `paljastusKesken` pysyy totena,
   * joten maadoituskommenttikin odottaa (js/fokusvirta.js
   * odotaPaljastus, jonka katto pysähtyy linssin ajaksi).
   */
  if (linssiEstaa()) {
    paljastusAjastin = setTimeout(
      () => paljastusRepliikki(ui, cityId, i, jalkeen, repliikit, variantti),
      PALJASTUKSEN_LINSSIVALI,
    );
    return;
  }
  const teksti = repliikit[i];
  if (!teksti) {
    // Sarja päättyi itsestään: viimeinen repliikki saa puhua loppuun
    // (sama sopimus kuin avauksessa, ks. lopetaAvaus).
    paljastusKesken = false;
    jalkeen?.();
    return;
  }
  const seuraava = () => paljastusRepliikki(ui, cityId, i + 1, jalkeen, repliikit, variantti);
  /*
   * SAMA JATKO NAPAUTUKSELLE JA AJASTIMELLE. Luennan edellä oleva
   * kupla ei saa ohittaa luentaa silloinkaan kun pelaaja napauttaa sen
   * pois: napautus vain päästää luennan liikkeelle aiemmin, ja sarjan
   * päättyminen odottaa yhä sen loppua (odotaLuenta). Ilman tätä napautus
   * jättäisi luennan lykkäykseensä eikä isoisää luettaisi lainkaan.
   */
  const jatka = i === LIVIAN_LUENNAN_PAIKKA - 1
    ? () => odotaLuenta(ui, cityId, seuraava)
    : seuraava;
  if (!polloSaapumiskupla(teksti, { kuittaus: jatka })) {
    // Kupla ei mahtunut ruudulle (paneeli auki): ohjekuplat hoitavat
    // saapumisen, eikä sarjaa jäädä odottamaan. Lykätty luenta
    // päästetään silloin heti liikkeelle — muuten se jäisi odottamaan
    // kuplaa, jota ei tule.
    paljastusKesken = false;
    pysaytaLivianAani(ui);
    vapautaLuenta(ui);
    jalkeen?.();
    return;
  }
  // *"Melkein joka ikisen"* on omistajan nimeämä sekoilukohta: Livia
  // myöntää, ettei ole sittenkään lukenut aivan kaikkia sähkeitä.
  if (onLivianSekoilua(teksti)) soitaLivianTehoste('sekoilee');
  /*
   * ÄÄNI SEURAA KUPLAA (omistaja 6.9.2026): ensimmäinen repliikki on
   * saapuminen, mutta sekin soi kuivana — kaiku otettiin pois pulun
   * alusta omistajan päätöksellä 6.9.2026 ilta (js/liviapuhe.js
   * LIVIAN_KAIKU).
   */
  const aani = soitaLivianAani(ui, 'paljastus', i, { ...variantti, teksti });
  /*
   * ISOISÄN LUENTA KUPLIEN VÄLISSÄ (omistaja 7.9.2026). Viimeinen
   * ennen luentaa tuleva kupla saa lukuaikansa, ja vasta sen jälkeen
   * luenta päästetään liikkeelle — kupla ehtii siis luettavaksi ennen
   * kuin kertoja aloittaa.
   *
   * KUPLA ODOTTAA PUHEEN LOPPUUN (7.9.2026): lukuaikaansa pidempi
   * äänite venyttää ajastinta (js/liviapuhe.js livianKuplanAjastin),
   * joten myöskään isoisä ei aloita pulun lauseen päälle.
   */
  paljastusAjastin = livianKuplanAjastin(
    lukuaika(teksti), aani, jatka, (id) => { paljastusAjastin = id; },
  );
}

/**
 * ISOISÄN LUENTA LIIKKEELLE (js/ui.js aloitaLykattyLuenta).
 *
 * Luenta jäi odottamaan kuplia jo saapumisen piirrossa; tämä on se
 * yksi paikka, joka päästää sen käyntiin. Turvallista kutsua monta
 * kertaa ja ilman lykkäystä: metodi nollaa lipun ja aloittaa vain, jos
 * luettavaa on ja kertoja on päällä.
 */
function vapautaLuenta(ui) {
  try {
    ui?.aloitaLykattyLuenta?.();
  } catch {
    /* luenta ei saa kaataa kuplasarjaa */
  }
}

/**
 * PULU ON HILJAA LUENNAN AJAN: sarjan päättyminen odottaa, että isoisän
 * luenta on päättynyt (js/luenta.js luennanLoppuun kuuntelee sekä
 * ended/error-tapahtuman että pysähtyneen soittimen).
 *
 * Ilman luentaa — kertoja pois, mykistys tai puuttuva äänite — odotus
 * on yhden kuplan vähimmäislukuajan mittainen, jotta jälkikuplat eivät
 * ala heti toisen kuplan perään.
 */
function odotaLuenta(ui, cityId, jatka) {
  // Napautus voi tuoda tänne, vaikka ajastin on yhä pystyssä: sarja ei
  // saa haarautua kahdeksi (kaksi sarjan päättävää jatkoa).
  clearTimeout(paljastusAjastin);
  paljastusAjastin = null;
  if (ui.dead || ui.game?.cityOf?.()?.id !== cityId) {
    paljastusKesken = false;
    return;
  }
  vapautaLuenta(ui);
  const luenta = luennanLoppuun(ui);
  if (!luenta) {
    paljastusAjastin = setTimeout(jatka, LUENNAN_VARAVIIVE);
    return;
  }
  void luenta.then(() => {
    if (ui.dead || ui.game?.cityOf?.()?.id !== cityId) {
      paljastusKesken = false;
      return;
    }
    jatka();
  });
}

/* ------------------------------------------------------------------ *
 * Lehtivinkki
 * ------------------------------------------------------------------ */

/**
 * PULUN LEHTIVINKKI — KAANONIA (omistaja 7.9.2026, sanatarkasti).
 *
 * Kaupunkilehden avautuessa pulu sanoo tämän yhden lauseen. Teksti
 * asuu täällä eikä js/fokusvirta.js:ssä kahdesta syystä: se on Livian
 * repliikki (kaanonia, jota vain päätoimittaja muuttaa), ja
 * tools/generoi-pulu.mjs lukee kaikki pulun repliikit tästä
 * moduulista — lehden pinta vain näyttää sen.
 *
 * VAIN ENSIMMÄISELLÄ KERRALLA KOSKAAN (omistaja 7.9.2026): vinkki on
 * opastus, ei kommentti, joten se sanotaan kerran eikä enää missään
 * kaupungissa sen jälkeen. Vanha "Älä näytä jatkossa" -ruksi poistui
 * samalla päätöksellä (js/ui-apurit.js).
 */
export const LIVIAN_LEHTIVINKKI = 'Etsi lehdestä aarrekysymys.';

/** Vinkin avainsana, jonka kynä ympyröi (js/ilme.js korostaSana). */
export const LIVIAN_LEHTIVINKIN_SANA = 'aarrekysymys';

/**
 * Lippu laitteen muistissa: lehtivinkki on nähty.
 *
 * NOLLAUS KONSOLISTA testausta varten:
 *   localStorage.removeItem('matkakirja-livia-lehtivinkki')
 */
export const LIVIA_LEHTIVINKKI_TALLE = 'matkakirja-livia-lehtivinkki';

/** Istunnon oma lippu siltä varalta, ettei muistiin voi kirjoittaa. */
let lehtivinkkiAnnettu = false;

/** Onko lehtivinkki jo nähty tällä laitteella? */
function lehtivinkkiNahty() {
  try {
    return localStorage.getItem(LIVIA_LEHTIVINKKI_TALLE) === '1';
  } catch {
    // Yksityinen selaus: mieluummin vaiti kuin sama opastus joka
    // lehden avauksella (istunnon lippu ei kanna sivunlatauksen yli).
    return true;
  }
}

/**
 * Onko lehtivinkki vielä sanomatta? Sama kaava kuin paljastuksella:
 * laitelippu ja istunnon lippu, kummankin on oltava tyhjä.
 */
export function livianLehtivinkkiOdottaa() {
  return !lehtivinkkiAnnettu && !lehtivinkkiNahty();
}

/**
 * Merkitsee vinkin sanotuksi. Kutsutaan VASTA kun kupla oikeasti
 * näkyi (sama sopimus kuin avauksella ja paljastuksella): kupla, joka
 * ei mahtunut ruudulle, ei kuluta kertalippua.
 */
export function merkitseLehtivinkkiNahdyksi() {
  lehtivinkkiAnnettu = true;
  try {
    localStorage.setItem(LIVIA_LEHTIVINKKI_TALLE, '1');
  } catch {
    /* yksityinen selaus: istunnon lippu kantaa loppumatkan */
  }
}

/* ------------------------------------------------------------------ *
 * Mannerivihje
 * ------------------------------------------------------------------ */

/** Mannerivihjeen repliikki — KAANONIA (päätoimittaja 29.8.2026). */
export const MANNERIVIHJE = 'Kuule — jos tämä maa alkaa tuntua pitkältä, '
  + 'kerää rahaa lentoon. Isosta kaupungista pääsee toiselle mantereelle.';

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
  // Linssi omistaa ruudun kokonaan (omistaja 4.9.2026): mannerivihje
  // ei mene jonoon eikä kuluta kertalippujaan, vaan tilanne kokeillaan
  // uudelleen seuraavassa piirrossa linssin sulkeuduttua.
  if (linssiEstaa(doc)) return true;
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
  // Vihje on Livian puhetta kuten muutkin kuplat (js/liviapuhe.js).
  soitaLivianAani(ui, 'mannerivihje', 0, { teksti: MANNERIVIHJE });
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
export function nollaaLivianVihjeet(ui = null) {
  peruLivianAvaus();
  clearTimeout(paljastusAjastin);
  paljastusAjastin = null;
  paljastusKesken = false;
  // Lykätty luenta ei jää roikkumaan uuteen peliin: lippu pois, ja
  // jos luettavaa yhä on, se saa alkaa normaalisti.
  if (ui) ui.luennanLykkays = false;
  // Edellisen pelin repliikki ei jää soimaan uuden kartan päälle.
  pysaytaLivianAani(ui, { haivyta: false });
  // Uusi peli aloittaa myös kuplapinon tyhjänä: edellisen pelin
  // puheenvuorot eivät jää uuden kartan päälle (js/pollo.js).
  polloKuplatPois();
  mannerivihjeenMaat.clear();
  mannerivihjeAnnettu = false;
  mannerivihjeenOdotus = null;
}
