// Pelin kytkennät iOS-kuoren natiivisiltaan (window.matkakirjaNatiivi).
//
// Kuori ruiskuttaa sivulle sillan ennen pelin skriptejä
// (ios/Matkakirja/Selain/natiivi-silta.js). SELAIMESSA SITÄ EI OLE, eikä
// yksikään tämän tiedoston funktio saa muuttaa selainpelin käytöstä:
// jokainen kytkentä kysyy ensin sillan olemassaoloa JA sen
// ominaisuuslippua, ja jokainen lupaus niellään hiljaa. Kuoren puuttuminen
// ei ole virhe eikä vika — se on tavallisin tapaus.
//
// Ominaisuuslippu luetaan sillasta, mutta myös suoraan
// __matkakirjaNatiiviTiedot-oliosta: vanha kuori voi tarjota rajapinnan
// ilman toimivaa toteutusta, ja peli voi kysyä ennen kuin silta on ehtinyt
// sulattaa tietonsa (sama tapa kuin js/lukija.js ja js/pollo.js).
//
// Tiedosto ladataan myös Nodessa (yksikkötestit), joten moduulitasolla ei
// kosketa window-olioon lainkaan.

/* ------------------------------------------------------------------ */
/* Sillan haku                                                         */
/* ------------------------------------------------------------------ */

/** Silta sellaisenaan, tai null selaimessa. */
function natiiviOlio() {
  if (typeof window === 'undefined') return null;
  const natiivi = window.matkakirjaNatiivi;
  return natiivi?.onkoNatiivi ? natiivi : null;
}

/**
 * Silta, jos siinä on pyydetty ominaisuus. Muuten null.
 *
 * @param {string} ominaisuus esim. 'haptiikka' — ks. sillan ominaisuuslista.
 */
function natiiviJossa(ominaisuus) {
  const natiivi = natiiviOlio();
  if (!natiivi) return null;
  const lippu = natiivi.ominaisuudet?.[ominaisuus]
    ?? window.__matkakirjaNatiiviTiedot?.ominaisuudet?.[ominaisuus];
  return lippu ? natiivi : null;
}

/** Onko peli iOS-kuoressa? Selaimessa aina false. */
export function natiiviKuori() {
  return Boolean(natiiviOlio());
}

/** Onko kuoressa tämä ominaisuus? Puuttuva ominaisuus on aina false. */
export function natiiviTukee(ominaisuus) {
  return Boolean(natiiviJossa(ominaisuus));
}

/**
 * Kutsu, joka ei koskaan kaadu eikä jätä käsittelemätöntä hylkäystä.
 *
 * Sillan lupaukset hylätään vain oikeista virheistä (väärä parametri,
 * liian suuri tallennus), eikä yksikään niistä ole sellainen, jonka
 * takia pelin pitäisi pysähtyä tai näyttää mitään pelaajalle.
 */
function nielaise(lupaus) {
  try {
    return Promise.resolve(lupaus).catch(() => null);
  } catch {
    return Promise.resolve(null);
  }
}

/* ------------------------------------------------------------------ */
/* Haptiikka                                                           */
/* ------------------------------------------------------------------ */

/*
 * MALTTI ON OSA SUUNNITTELUA. Haptiikka ei kuulu joka napautukseen:
 * jatkuva tärinä muuttuu taustakohinaksi ja syö akkua. Peli tärisyttää
 * vain neljässä kohdassa — noppa lähtee, noppa pysähtyy, tehtävään
 * vastataan, aarre löytyy — eikä yksikään niistä toistu peräkkäin.
 */

/** Tärähdys: 'kevyt' | 'keskitaso' | 'onnistui' | 'juhla'. */
export function natiiviTarise(laji) {
  const natiivi = natiiviJossa('haptiikka');
  if (!natiivi) return;
  nielaise(natiivi.haptiikka?.nayta?.(laji));
}

/* ------------------------------------------------------------------ */
/* Game Center                                                         */
/* ------------------------------------------------------------------ */

/*
 * SAAVUTUSTUNNUKSET.
 *
 * Tunnukset ovat vapaita merkkijonoja, mutta ne on luotava käsin App
 * Store Connectissa täsmälleen samoilla kirjoitusasuilla (ios/OHJE.md).
 * Ennen sitä kutsu palautuu tilassa 'hylatty' — se on hiljainen eikä
 * riko mitään, ja juuri siksi laukaisimet saa kytkeä jo nyt.
 */
export const NATIIVI_SAAVUTUKSET = {
  ensimmainenAarre: 'fi.matkakirja.peli.saavutus.ensimmainen-aarre',
  kaikkiAarteet: 'fi.matkakirja.peli.saavutus.kaikki-aarteet',
  lapipeluu: 'fi.matkakirja.peli.saavutus.lapipeluu',
  putki10: 'fi.matkakirja.peli.saavutus.kymmenen-putkeen',
};

/** Montako oikeaa vastausta putkeen tuo saavutuksen. */
export const NATIIVI_PUTKI = 10;

/*
 * Kerran kirjattu saavutus ei lähde uudestaan saman käynnin aikana.
 * Game Center kestäisi toiston, mutta jokainen kutsu on silta-, säie- ja
 * verkkomatka: pelin piirtosilmukasta laukeava saavutus lähtisi muuten
 * joka kehyksellä.
 */
const kirjatut = new Set();

/** Kirjaa saavutuksen kerran. Tuntematon tunnus hylätään hiljaa kuoressa. */
export function natiiviSaavutus(tunnus) {
  if (!tunnus || kirjatut.has(tunnus)) return;
  kirjatut.add(tunnus);
  const natiivi = natiiviJossa('pelikeskus');
  if (!natiivi) return;
  nielaise(natiivi.pelikeskus?.saavutus?.(tunnus, 100));
}

let kirjautuminenAloitettu = false;

/**
 * Kirjautuminen Game Centeriin kerran pelin käynnistyessä.
 *
 * Epäonnistuminen on hiljainen: pelaaja voi pelata koko pelin
 * kirjautumatta, eikä siitä kerrota ruudulla mitään.
 */
export function natiiviKirjauduPelikeskukseen() {
  if (kirjautuminenAloitettu) return;
  const natiivi = natiiviJossa('pelikeskus');
  if (!natiivi) return;
  kirjautuminenAloitettu = true;
  nielaise(natiivi.pelikeskus?.kirjaudu?.());
}

/* ------------------------------------------------------------------ */
/* Tehtävien putki                                                     */
/* ------------------------------------------------------------------ */

/*
 * Putki elää vain tämän käynnin ajan eikä sitä talleteta: se on
 * saavutuksen laukaisin, ei pelitilaa. Tallennusmuotoon ei kosketa
 * kuoren takia — sama tallennus luetaan selaimessa, jossa Game Centeriä
 * ei ole.
 */
let putki = 0;

/**
 * Tehtävään vastattiin. Hoitaa sekä tärähdyksen että putkilaskurin.
 *
 * @param {boolean} oikein oliko vastaus oikea (aikakatkaisu = väärä)
 */
export function natiiviVastaus(oikein) {
  natiiviTarise(oikein ? 'onnistui' : 'kevyt');
  if (!oikein) {
    putki = 0;
    return;
  }
  putki += 1;
  if (putki >= NATIIVI_PUTKI) natiiviSaavutus(NATIIVI_SAAVUTUKSET.putki10);
}

/** Putki nollataan uuden pelin alkaessa. Näkyvissä testejä varten. */
export function natiiviNollaaPutki() {
  putki = 0;
}

/* ------------------------------------------------------------------ */
/* Widget                                                              */
/* ------------------------------------------------------------------ */

/*
 * Widget näyttää tasan sen mitä tänne kirjoitetaan (ios/Yhteinen/
 * JaettuPelitila.swift): kaupunki, maa, päivä ja kassa valmiiksi
 * näytettävässä muodossa. Kuori ei muotoile mitään.
 *
 * Kirjoitus tehdään vain KAUPUNGIN JA MATKAPÄIVÄN vaihtuessa.
 * WidgetKitin reloadAllTimelines on pyyntö eikä käsky, ja iOS jakaa
 * widgetille päivityskiintiön — kutsu joka piirrossa kuluttaisi sen
 * ilman että kotinäytöllä näkyisi mitään uutta. Kassa kulkee mukana
 * sillä arvolla, joka sillä on saapumishetkellä: se on widgetissä
 * matkan tilannekuva, ei tilinäyttö.
 */
let widgetViimeksi = '';

/**
 * Päivittää widgetin, jos kaupunki tai matkapäivä vaihtui.
 *
 * @param {{kaupunki: string, maa?: string, paiva: number, raha?: string}} tila
 */
export function natiiviWidget(tila) {
  const natiivi = natiiviJossa('widget');
  if (!natiivi || !tila?.kaupunki) return;
  const tunniste = `${tila.kaupunki}|${tila.paiva}`;
  if (tunniste === widgetViimeksi) return;
  widgetViimeksi = tunniste;
  nielaise(natiivi.widget?.paivita?.({
    kaupunki: String(tila.kaupunki),
    maa: String(tila.maa ?? ''),
    paiva: Number(tila.paiva) || 0,
    raha: String(tila.raha ?? ''),
  }));
}

/* ------------------------------------------------------------------ */
/* Jako                                                                */
/* ------------------------------------------------------------------ */

/** Avaa iOS:n jakoikkunan. Selaimessa ei tee mitään. */
export function natiiviJaaTeksti(teksti) {
  const natiivi = natiiviJossa('jako');
  if (!natiivi || !teksti) return;
  nielaise(natiivi.jaa?.teksti?.(String(teksti)));
}

/**
 * Matkan yhteenveto jakoikkunaan. Lyhyt on tarkoitus: teksti päätyy
 * viestiin tai muistiinpanoon, eikä sinne kuulu pelin sisäisiä lukuja.
 */
export function natiiviMatkaTeksti({ paivat, kaupungit, aarteet }) {
  const osat = [`Matkakirja: ${monikko(paivat, 'päivä', 'päivää')}`];
  osat.push(monikko(kaupungit, 'kaupunki', 'kaupunkia'));
  osat.push(aarteet > 0
    ? `${monikko(aarteet, 'unohdettu aarre', 'unohdettua aarretta')} löytyi`
    : 'yksikään unohdettu aarre ei vielä löytynyt');
  return `${osat.join(', ')}.`;
}

/** "1 päivä" / "12 päivää" — suomen lukusanan taivutus yksikössä. */
function monikko(luku, yksikko, monikkoMuoto) {
  const n = Number(luku) || 0;
  return `${n} ${n === 1 ? yksikko : monikkoMuoto}`;
}

/* ------------------------------------------------------------------ */
/* Tallennussynkka (iCloud)                                            */
/* ------------------------------------------------------------------ */

/*
 * SÄÄNTÖ ON UUSIN VOITTAA, JA SE ASUU TÄÄLLÄ.
 *
 * Silta välittää vain (ios/Matkakirja/Selain/TalleSilta.swift): jokaisen
 * arvon mukana kulkee aikaleima, eikä kuori yhdistä tai valitse mitään.
 * Peli päättää, ja siksi sääntöä voi korjata verkkopäivityksellä eikä
 * App Storen kautta.
 *
 * Aikaleima on sen hetken, JONA TILA MUUTTUI — ei sen hetken, jona se
 * ehti pilveen. Muuten harvennus (alla) tekisi vanhasta tallennuksesta
 * tuoreemman kuin toisen laitteen uudemmasta.
 *
 * Peli EI KOSKAAN korvaa kesken olevaa peliä hiljaa. Uudempi pilvitila
 * tarjotaan pelaajalle, ja hän valitsee. Ainoa poikkeus on passin
 * leimakokoelma, joka yhdistetään: se vain kasvaa, eikä yhdistäminen voi
 * hukata mitään (ks. natiiviYhdistaLeimat).
 */

/** Kuinka usein pilveen kirjoitetaan enintään. */
export const NATIIVI_SYNKKAVALI_MS = 10000;

/**
 * Kellojen eron sietoraja. Kaksi laitetta ei ole samassa
 * millisekunnissa, ja oma kirjoitus kaikuu takaisin omalla
 * aikaleimallaan. Ilman marginaalia laitteet tarjoaisivat toisilleen
 * tallennusta vuorotellen ikuisesti.
 */
export const NATIIVI_MARGINAALI_MS = 2000;

/** Aikaleimat laitteessa: { avain: millisekunnit }. */
const AJAT_AVAIN = 'matkakirja-synkka-ajat-v1';

/**
 * Voittaako pilvestä tullut tila paikallisen?
 *
 * Tasapelissä voittaa PAIKALLINEN: pelaaja on sen äärellä juuri nyt,
 * eikä yhtä vanhaa tilaa kannata tarjota vaihtoon.
 */
export function natiiviPilviVoittaa(paikallinenAika, pilviAika, marginaali = NATIIVI_MARGINAALI_MS) {
  const oma = Number(paikallinenAika) || 0;
  const pilvi = Number(pilviAika) || 0;
  if (!pilvi) return false;
  return pilvi - oma > marginaali;
}

/**
 * Passin leimat yhteen: kaikki leimat molemmista, ja jos sama lauta on
 * leimattu molemmissa, vanhempi päivä voittaa — se on se päivä, jolloin
 * laudalla oikeasti käytiin ensimmäisen kerran.
 *
 * Yhdistäminen ei voi hukata leimaa, joten sitä ei tarvitse kysyä
 * pelaajalta. Sama tekee tarpeettomaksi sen, että toisella laitteella
 * offline ansaittu leima katoaisi "uusin voittaa" -säännön alle.
 */
export function natiiviYhdistaLeimat(paikalliset, pilvesta) {
  const tulos = { ...(paikalliset ?? {}) };
  for (const [lauta, leima] of Object.entries(pilvesta ?? {})) {
    const oma = tulos[lauta];
    if (!oma) {
      tulos[lauta] = leima;
      continue;
    }
    // Vanhempi päivä voittaa: ensimmäinen käynti on se, joka leimattiin.
    if (String(leima?.date ?? '') && String(leima.date) < String(oma.date ?? '')) {
      tulos[lauta] = leima;
    }
  }
  return tulos;
}

/**
 * Harvennin: kirjoita heti, jos edellisestä on kulunut tarpeeksi —
 * muuten pane odottamaan ja lähetä VIIMEISIN arvo kun väli täyttyy.
 *
 * Jälkilähetys on koko pointti. Pelkkä "hylkää liian tiheät" jättäisi
 * viimeisen siirron kokonaan lähettämättä juuri silloin, kun pelaaja
 * sulkee pelin — eli täsmälleen silloin kun synkkaa tarvitaan.
 *
 * Kello ja ajastin ovat parametreja, jotta logiikan voi testata ilman
 * oikeaa aikaa (tests/natiivi.test.mjs).
 */
export function natiiviHarvennin(laheta, {
  vali = NATIIVI_SYNKKAVALI_MS,
  nyt = () => Date.now(),
  ajasta = (tehtava, ms) => setTimeout(tehtava, ms),
} = {}) {
  let viimeksi = -Infinity;
  let odottava = null;
  let ajastettu = false;

  function laukaise(arvo) {
    viimeksi = nyt();
    laheta(arvo);
  }

  return function pyyda(arvo) {
    if (nyt() - viimeksi >= vali) {
      laukaise(arvo);
      return true;
    }
    // Vain viimeisin jää jonoon: väliin jääneet tilat ovat jo vanhentuneet.
    odottava = arvo;
    if (!ajastettu) {
      ajastettu = true;
      ajasta(() => {
        ajastettu = false;
        if (odottava === null) return;
        const jonossa = odottava;
        odottava = null;
        laukaise(jonossa);
      }, Math.max(0, vali - (nyt() - viimeksi)));
    }
    return false;
  };
}

/* --- laitteen aikaleimat --------------------------------------------- */

function lueAjat() {
  try {
    const raaka = globalThis.localStorage?.getItem(AJAT_AVAIN);
    const luettu = raaka ? JSON.parse(raaka) : null;
    return luettu && typeof luettu === 'object' ? luettu : {};
  } catch {
    return {};
  }
}

function kirjoitaAika(avain, aika) {
  try {
    const ajat = lueAjat();
    ajat[avain] = aika;
    globalThis.localStorage?.setItem(AJAT_AVAIN, JSON.stringify(ajat));
  } catch {
    /* yksityistila: synkka jää pois, peli jatkuu */
  }
}

/** Milloin tämä laite viimeksi muutti avaimen arvoa. */
export function natiiviPaikallinenAika(avain) {
  return Number(lueAjat()[avain]) || 0;
}

/**
 * Merkitsee avaimen muuttuneen NYT. Kutsutaan myös silloin, kun arvo
 * tulee pilvestä ja pelaaja ottaa sen käyttöön — muuten laite tarjoaisi
 * samaa tallennusta itselleen uudestaan.
 */
export function natiiviMerkitseAika(avain, aika = Date.now()) {
  kirjoitaAika(avain, aika);
}

/*
 * KÄYNNISTYSHETKEN AIKALEIMA.
 *
 * Käynnistyksen tarkistus (natiiviKuunteleSynkka) on hidas: se odottaa
 * sillan vastausta. Sinä aikana peli on jo ehtinyt piirtää itsensä ja
 * kutsua tallennusta, joka nostaisi paikallisen aikaleiman nykyhetkeen
 * — ja silloin toisen laitteen aidosti uudempi tallennus näyttäisi
 * vanhemmalta kuin oma juuri avattu peli. Vertailukohta otetaan siis
 * talteen ENNEN ensimmäistä kirjoitusta.
 */
const alkuAjat = new Map();

function alkuAika(avain) {
  if (!alkuAjat.has(avain)) alkuAjat.set(avain, natiiviPaikallinenAika(avain));
  return alkuAjat.get(avain);
}

/* --- vienti pilveen --------------------------------------------------- */

/** Avainkohtaiset harventimet ja viimeksi viety arvo. */
const harventimet = new Map();
const viedyt = new Map();

/**
 * Ottaa avaimen lähtötilanteen talteen: mitä levyllä on ja milloin se
 * sinne kirjoitettiin.
 *
 * TÄMÄ ON KUTSUTTAVA ENNEN ENSIMMÄISTÄ TALLENNUSTA, ja siksi se on oma
 * funktionsa eikä osa synkkausta. Peli kirjoittaa tallennuksen levylle
 * ennen kuin se työntää sen pilveen, joten synkkauksen sisältä luettu
 * "levyn arvo" olisi jo se uusi arvo — eikä se, jonka pilvi sai
 * viimeksi. Silloin pelkkä pelin avaaminen näyttäisi muutokselta.
 *
 * Turvallinen kutsua selaimessa: pelkkää kirjanpitoa, ei siltaa.
 */
export function natiiviSeuraa(avain) {
  if (!avain) return;
  alkuAika(avain);
  if (viedyt.has(avain)) return;
  try {
    viedyt.set(avain, globalThis.localStorage?.getItem(avain) ?? null);
  } catch {
    viedyt.set(avain, null);
  }
}

/**
 * Vie arvon iCloudiin, harvennettuna.
 *
 * Muuttumaton arvo ei mene pilveen eikä nosta aikaleimaa. Se on tärkeää
 * kahdesta syystä: peli piirtää itsensä kymmeniä kertoja siirtoa kohti
 * ja jokainen piirto kulkee tallennuspolun läpi — ja PELKKÄ AVAAMINEN
 * ei ole muutos. Ilman jälkimmäistä pelkkä sovelluksen avaaminen
 * leimaisi vanhan tallennuksen tuoreeksi ja työntäisi sen toisen
 * laitteen uudemman päälle.
 *
 * @returns {boolean} muuttuiko arvo (eli lähtikö se jonoon)
 */
export function natiiviSynkkaa(avain, arvo) {
  const natiivi = natiiviJossa('talle');
  if (!natiivi || !avain) return false;
  const teksti = arvo === null || arvo === undefined ? '' : String(arvo);
  // Lähtötilanne talteen, jos peli ei ehtinyt sitä itse pyytää.
  natiiviSeuraa(avain);
  if (viedyt.get(avain) === teksti) return false;
  viedyt.set(avain, teksti);

  // Aikaleima muutoshetkestä, ei lähetyshetkestä (ks. yllä).
  const aika = Date.now();
  natiiviMerkitseAika(avain, aika);

  if (!harventimet.has(avain)) {
    harventimet.set(avain, natiiviHarvennin((jono) => {
      const silta = natiiviJossa('talle');
      if (!silta) return;
      nielaise(silta.talle?.vie?.(avain, jono.arvo, jono.aika));
    }));
  }
  harventimet.get(avain)({ arvo: teksti, aika });
  return true;
}

/* --- tuonti pilvestä -------------------------------------------------- */

/**
 * Kuuntelee yhden avaimen muutoksia iCloudissa.
 *
 * Kuulija saa arvon vain, kun pilvestä tullut on AIDOSTI uudempi kuin
 * tämän laitteen oma. Kuulija päättää lopun: peli kysyy pelaajalta,
 * passi yhdistää.
 *
 * Tarkistus tehdään kahdesti: heti käynnistyksessä (toinen laite on
 * voinut pelata sillä välin kun tämä oli kiinni) ja aina kun kuori
 * lähettää 'talle-muuttui'-tapahtuman.
 *
 * TÄMÄ EI KIRJOITA MITÄÄN. Se hakee, vertaa ja kertoo — mitä arvolle
 * tehdään, on kuulijan päätös. Juuri siksi kesken oleva peli ei voi
 * korvautua hiljaa: korvaus vaatii koodia kuulijan puolella, ja siellä
 * se kysyy pelaajalta.
 *
 * @param {string} avain
 * @param {(arvo: string, aika: number) => void} kuulija
 */
export function natiiviKuunteleSynkka(avain, kuulija) {
  const natiivi = natiiviJossa('talle');
  if (!natiivi || typeof kuulija !== 'function') return () => {};

  /**
   * @param {number|undefined} vihjeAika tapahtuman aikaleima, tai
   *   undefined käynnistystarkistuksessa.
   */
  const tarkista = (vihjeAika) => {
    /*
     * Vertailukohta: käynnistyksessä se aika, joka laitteella oli ENNEN
     * tämän käynnin tallennuksia (peli on jo ehtinyt piirtää itsensä
     * kertaalleen), muutostapahtumassa laitteen tuorein aika.
     */
    const oma = vihjeAika === undefined ? alkuAika(avain) : natiiviPaikallinenAika(avain);
    // Tapahtuman aikaleima karsii turhat haut: oma kaiku ei ole uudempi.
    if (vihjeAika !== undefined && !natiiviPilviVoittaa(oma, vihjeAika)) return;
    nielaise(natiivi.talle?.tuo?.(avain)).then((vastaus) => {
      if (!vastaus?.loytyi || !vastaus.arvo) return;
      if (!natiiviPilviVoittaa(oma, vastaus.aika)) return;
      try {
        kuulija(String(vastaus.arvo), Number(vastaus.aika) || 0);
      } catch {
        /* kuulijan virhe ei saa kaataa synkkaa */
      }
    });
  };

  const irrota = natiivi.kuuntele?.('talle-muuttui', (tieto) => {
    const muutos = (tieto?.muutokset ?? []).find((m) => m?.avain === avain);
    if (!muutos || muutos.poistettu) return;
    tarkista(Number(muutos.aika) || 0);
  }) ?? (() => {});

  // Käynnistystarkistus ilman aikaleimavihjettä: haetaan ja verrataan.
  tarkista();

  return typeof irrota === 'function' ? irrota : () => {};
}
