/*
 * SÄHKEPINTA — retkikunta, sähkeet ja kaveriapu (RAAMATTU, osio
 * "SÄHKEJÄRJESTELMÄ — MONINPELI ILMAN VAPAATA TEKSTIÄ", omistaja
 * 25.8.2026).
 *
 * Raamattu sanoo suoraan, mikä tästä tulee: *"kaikki pelaajien välinen
 * viestintä on RAKENTEISTA — valmispohjaiset sähkeet 1873-lennätin-
 * teemalla ('AARRE LÖYTYNYT SOFIASTA STOP'), vinkkisähkeet valmiista
 * lauseista (vinkata saa vain itse löydetystä aarteesta), … RETKIKUNTA
 * liittymiskoodilla …, nimimerkit generaattorista ('Utelias Ilves') —
 * pelissä EI OLE yhtään pelaajan kirjoittamaa vapaata merkkiä, jolloin
 * UGC-moderointitaakkaa ei synny."* Ja: *"KAVERIAPU AARREKYSYMYKSESSÄ:
 * yksi apuvaihtoehto on KYSY KAVERILTA — hinta 25 puntaa, aika
 * pysähtyy, retkikunnan jäsen saa kysymyksen ja antaa oman
 * veikkauksensa vaihtoehdoista; veikkaus palaa kysyjälle näkyviin.
 * Pöllö on sähkeiden postinkantaja."*
 *
 * Tämä tiedosto on VAIHE 1 (retkikunta + sähkeet + kaveriapu omalla
 * workerilla). Vaihe 0 (sähkekortin jako ilman palvelinta) ja vaihe 2
 * (Game Center -tulostaulut) eivät kuulu tähän.
 *
 * ── EI YHTÄÄN VAPAATA TEKSTIKENTTÄÄ ────────────────────────────────
 *
 * Nimimerkki tulee generaattorista (SAHKE_ADJEKTIIVIT ×
 * SAHKE_SUBSTANTIIVIT), sähkeet valmispohjista ja veikkaus on
 * vaihtoehdon INDEKSI. Ainoa näppäimistöä koskettava kenttä on
 * liittymiskoodi, ja sekin suodatetaan merkki kerrallaan
 * SAHKE_KOODIN_MERKIT-aakkostoon (kuusi merkkiä, ei sekoitettavia
 * kirjaimia) — mitään pelaajan kirjoittamaa ei siis voi kulkeutua
 * toisen pelaajan ruudulle.
 *
 * ── PELI EI SAA HAJOTA ILMAN WORKERIA ──────────────────────────────
 *
 * Käynnistyksessä tehdään kevyt terveystarkistus. Jos linja ei vastaa,
 * koko sähkeosio on yksi rivi tekstiä ("Sähkelinja avataan pian") eikä
 * yhtään nappia synny: ei kuplia, ei apunappia, ei kyselyä. Sama malli
 * kuin ehdotuskanavalla (js/ehdotukset.js, EHDOTUS_OSOITE tyhjänä).
 * Jokainen verkkokutsu on lisäksi omassa try/catchissaan — pudonnut
 * yhteys on hiljainen ei-mitään, ei virheilmoitus kesken vuoron.
 *
 * ── MIKSI OMA MODUULI ──────────────────────────────────────────────
 *
 * js/ui.js on talon suurin tiedosto. Se kutsuu tästä kolmea asiaa:
 * retkikuntaosio valikon lomakkeeseen, piirtokutsu (paivitaSahke) ja
 * — main.js:n kautta — käynnistys. Kaikki muu asuu täällä.
 *
 * ── NIMET ON PREFIKSOITU ───────────────────────────────────────────
 *
 * Yhden tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen
 * (tools/tarkista-niputus.mjs), joten kaikki top-level-nimet alkavat
 * SAHKE_/sahke- tai retkikunta-etuliitteellä.
 *
 * EI SVG-SUODATTIMIA (js/fokuskartta.js sääntö 3, tests/rules.test.mjs):
 * liuska on HTML:ää, sen nousu on transform + opacity.
 */

import { KAVERIAPU_HINTA } from './game.js';
import { sfx } from './sound.js';
import { html } from './ui-apurit.js';
import { startQuizTimer, stopQuizTimer } from './visa.js';

/* ==================================================================== *
 * 1. WORKERIN OSOITE JA RAJAPINTA
 * ==================================================================== */

/*
 * Workerin osoite. Tyhjänä koko sähkepinta on kiinni.
 *
 * Sama malli ja sama syy kuin js/ehdotukset.js:n EHDOTUS_OSOITE-
 * vakiolla: puolivalmis kanava on kiinni, ei auki. OSOITE PÄIVITETÄÄN
 * JULKAISUSSA — worker (worker/sahke/) julkaistaan omalla
 * työnkulullaan, ja ajon yhteenvedosta poimittu workers.dev-osoite
 * liitetään tähän.
 *
 * RAJAPINTA (sitova; toinen agentti rakentaa workerin täsmälleen
 * tähän, kenttänimet mukaan lukien):
 *
 *   POST /retkikunta/luo   {nimimerkki}
 *                          → {koodi, jasenId, avain}
 *   POST /retkikunta/liity {koodi, nimimerkki}
 *                          → {jasenId, avain, jasenet}
 *   GET  /retkikunta/tila?koodi&jasenId&avain
 *                          → {jasenet,
 *                             sahkeet:      [{id, lahettaja, pohjaId, paikkaId, aika}],
 *                             apupyynnot:   [{apuId, kysyja, kysymys, vaihtoehdot, aika}],
 *                             apuvastaukset:[{apuId, vastaaja, veikkaus, aika}]}
 *   POST /sahke            {koodi, jasenId, avain, pohjaId, paikkaId}
 *   POST /apu/kysy         {koodi, jasenId, avain, apuId, kysymys, vaihtoehdot}
 *   POST /apu/vastaa       {koodi, jasenId, avain, apuId, veikkaus}   // indeksi
 */
export const SAHKE_OSOITE = 'https://matkakirja-sahke.samireivinen.workers.dev';

/** Verkkokutsun katto: jumiin jäänyt pyyntö ei saa jäädä roikkumaan. */
const SAHKE_AIKAKATKO_MS = 12000;

/* ==================================================================== *
 * 2. NIMIMERKKIGENERAATTORI
 * ==================================================================== *
 *
 * Raamattu: nimimerkit generaattorista ("Utelias Ilves"). Listat ovat
 * osa RAJAPINTAA — worker tarkistaa nimimerkin näistä samoista
 * sanoista, joten sanan lisääminen tai poistaminen on muutos molempiin
 * päihin. Adjektiivit ovat perusmuodossa maskuliiniton­ta suomea, ja
 * substantiivit ovat eläimiä tai 1873-matkan esineitä; pari on aina
 * "Adjektiivi Substantiivi".
 */

/** 24 adjektiivia (sitova lista; sama workerille). */
const SAHKE_ADJEKTIIVIT = [
  'Utelias', 'Höyryävä', 'Vaitelias', 'Ripeä', 'Uskalias', 'Verkkainen',
  'Tarkkanäköinen', 'Kärsivällinen', 'Salaperäinen', 'Kohtelias', 'Sitkeä', 'Valpas',
  'Rohkea', 'Huolellinen', 'Levoton', 'Sinnikäs', 'Oivaltava', 'Vakaa',
  'Nokkela', 'Hiljainen', 'Iloinen', 'Peloton', 'Tarmokas', 'Viisas',
];

/** 24 substantiivia: eläimiä ja 1873-matkan esineitä (sitova lista). */
const SAHKE_SUBSTANTIIVIT = [
  'Ilves', 'Majakka', 'Kompassi', 'Näätä', 'Höyrylaiva', 'Kurki',
  'Lennätin', 'Ahma', 'Kiikari', 'Peltosirkku', 'Postivaunu', 'Saukko',
  'Tiimalasi', 'Kärppä', 'Kartturi', 'Merikotka', 'Ankkuri', 'Mursu',
  'Karavaani', 'Naali', 'Sekstantti', 'Haikara', 'Matkalaukku', 'Sorsa',
];

/** Yksi satunnainen nimimerkki generaattorista. */
function sahkeArvoNimi() {
  const a = SAHKE_ADJEKTIIVIT[Math.floor(Math.random() * SAHKE_ADJEKTIIVIT.length)];
  const s = SAHKE_SUBSTANTIIVIT[Math.floor(Math.random() * SAHKE_SUBSTANTIIVIT.length)];
  return `${a} ${s}`;
}

/**
 * Kolme ehdotusta valittavaksi.
 *
 * Valintanappeja eikä kenttää: pelaaja napauttaa nimensä ja voi
 * arpoa uudet. Näin nimimerkki on aina generaattorin tuotos.
 */
function sahkeArvoNimet(montako = 3) {
  const nimet = new Set();
  // Katto estää ikuisen silmukan, jos listat joskus kutistuvat.
  for (let i = 0; nimet.size < montako && i < 40; i += 1) nimet.add(sahkeArvoNimi());
  return [...nimet];
}

/* ==================================================================== *
 * 3. LIITTYMISKOODI
 * ==================================================================== */

/** Koodin pituus (sitova; worker arpoo saman mittaisen). */
const SAHKE_KOODIN_PITUUS = 6;

/*
 * Koodin aakkosto: ei O/0, I/1, S/5 — puhelimen ruudulta luettu ja
 * ääneen sanottu koodi menee muuten väärin. Sitova: worker arpoo
 * koodin täsmälleen näistä merkeistä.
 */
const SAHKE_KOODIN_MERKIT = 'ABCDEFGHJKLMNPQRTUVWXYZ23467889';

/** Suodattaa syötteen koodiaakkostoon — mitään muuta ei jää jäljelle. */
function sahkeSiistiKoodi(teksti) {
  return String(teksti ?? '')
    .toUpperCase()
    .split('')
    .filter((merkki) => SAHKE_KOODIN_MERKIT.includes(merkki))
    .join('')
    .slice(0, SAHKE_KOODIN_PITUUS);
}

/* ==================================================================== *
 * 4. SÄHKEPOHJAT
 * ==================================================================== *
 *
 * Sähke on POHJAN TUNNUS + PAIKAN TUNNUS. Verkossa ei kulje yhtään
 * valmista virkettä, vaan vastaanottava peli ladelmoi tekstin itse
 * omasta pohjastaan ja omasta kaupunkitaulustaan — sama sähke näkyy
 * siis oikein myös silloin, kun lähettäjällä on eri kieliversio tai
 * eri lauta. Tuntematon pohjaId jätetään näyttämättä.
 *
 * tyyppi: 'auto'   = peli lähettää virstanpylväästä itse
 *         'vinkki' = pelaaja lähettää käsin
 *         'apu'    = kaveriavun saatesähke (lähtee /apu/kysy-kutsun mukana)
 * paikat: mistä listasta paikka valitaan käsin lähetettäessä.
 */
const SAHKE_POHJAT = [
  {
    id: 'aarre-loytyi',
    tyyppi: 'auto',
    nimi: 'Aarre löytyi',
    teksti: (paikka) => `AARRE LÖYTYNYT ${paikka} STOP`,
  },
  {
    id: 'saavuin',
    tyyppi: 'auto',
    nimi: 'Saavuin perille',
    teksti: (paikka) => `SAAVUIN ${paikka} STOP MATKA JATKUU`,
  },
  {
    id: 'vinkki-ei-paakaupunki',
    tyyppi: 'vinkki',
    paikat: 'loydot',
    nimi: 'Vinkki: ei pääkaupungissa',
    teksti: (paikka) => `VINKKI ${paikka} STOP AARRE EI OLLUT PÄÄKAUPUNGISSA`,
  },
  {
    id: 'vinkki-vesi',
    tyyppi: 'vinkki',
    paikat: 'loydot',
    nimi: 'Vinkki: seuraa vettä',
    teksti: (paikka) => `VINKKI ${paikka} STOP SEURAA VETTÄ`,
  },
  {
    id: 'vinkki-vuori',
    tyyppi: 'vinkki',
    paikat: 'loydot',
    nimi: 'Vinkki: katso vuorille',
    teksti: (paikka) => `VINKKI ${paikka} STOP KATSO VUORILLE`,
  },
  {
    id: 'juliste-saatu',
    tyyppi: 'vinkki',
    paikat: 'kaydyt',
    nimi: 'Sain julisteen',
    teksti: (paikka) => `JULISTE ${paikka} STOP LISÄTTY KOKOELMAAN`,
  },
  {
    id: 'apua-arvoitus',
    tyyppi: 'apu',
    nimi: 'Pyydän apua arvoitukseen',
    teksti: (paikka) => `PYYDÄN APUA ARVOITUKSEEN ${paikka} STOP`,
  },
];

/** Pohja tunnuksella; tuntematon on null eikä keksitty teksti. */
function sahkePohja(pohjaId) {
  return SAHKE_POHJAT.find((p) => p.id === pohjaId) ?? null;
}

/* ==================================================================== *
 * 5. PÖLLÖN SAATTEET
 * ==================================================================== *
 *
 * Raamattu, PÖLLÖN KARAKTÄÄRI: ikivanha silminnäkijä-reportteri, kuiva
 * huumori, ENINTÄÄN KAKSI VIRKETTÄ, EI HUUTOMERKKEJÄ, ei pelaajan
 * puhuttelua ylhäältä. Pöllö on tässä postinkantaja: se ei tulkitse
 * sähkettä, se toimittaa sen.
 */
const SAHKE_SAATTEET = [
  'Sähke sinulle. Luin sen jo matkalla.',
  'Lennätin naksui. Tässä on tulos.',
  'Sähke retkikunnalta. En kommentoi sisältöä.',
  'Toin sähkeen. Postinkantaja tekee työnsä.',
  'Sähke. Luin sen jo. Hyviä uutisia.',
];

/** Apupyynnön saate — sama lause kummallakin puolella pöytää. */
const SAHKE_APUPYYNNON_SAATE = 'Retkikunnalta sähke: he pyytävät apua arvoitukseen.';

/** Saapuneen veikkauksen saate. Pöllö ei ota kantaa siihen, onko se oikein. */
const sahkeVeikkauksenSaate = (nimi) => `${nimi} vastasi sähkeeseen. Päätös on sinun.`;

/* ==================================================================== *
 * 6. LAITTEEN MUISTI
 * ==================================================================== */

/** Retkikunnan tunnus laitteella: {koodi, jasenId, avain, nimimerkki}. */
const SAHKE_TUNNUS_TALLE = 'matkakirja-retkikunta';

/** Jo näytetyt sähkeet ja apupyynnöt — sama sähke ei nouse kahdesti. */
const SAHKE_NAHDYT_TALLE = 'matkakirja-sahke-nahdyt';

/** Muistilistan katto: vanhimmat unohtuvat, eikä muisti kasva rajatta. */
const SAHKE_NAHTYJA_KATTO = 300;

/** Retkikunnan tunnus muistista, tai null. Rikki mennyt muisti on tyhjä. */
function sahkeTunnus() {
  try {
    const teksti = localStorage.getItem(SAHKE_TUNNUS_TALLE);
    if (!teksti) return null;
    const tunnus = JSON.parse(teksti);
    return (tunnus?.koodi && tunnus?.jasenId && tunnus?.avain) ? tunnus : null;
  } catch {
    return null; // yksityinen selaus tai rikkinäinen arvo
  }
}

/** Tunnus talteen tai pois (tyhjä arvo eroaa retkikunnasta). */
function sahkeAsetaTunnus(tunnus) {
  try {
    if (tunnus?.koodi && tunnus?.jasenId && tunnus?.avain) {
      localStorage.setItem(SAHKE_TUNNUS_TALLE, JSON.stringify({
        koodi: tunnus.koodi,
        jasenId: tunnus.jasenId,
        avain: tunnus.avain,
        nimimerkki: tunnus.nimimerkki ?? '',
      }));
    } else {
      localStorage.removeItem(SAHKE_TUNNUS_TALLE);
    }
  } catch {
    /* yksityinen selaus: retkikuntaan liitytään uudestaan seuraavalla kerralla */
  }
}

/** Nähtyjen tunnusten joukko. */
function sahkeNahdyt() {
  try {
    const lista = JSON.parse(localStorage.getItem(SAHKE_NAHDYT_TALLE) ?? '[]');
    return new Set(Array.isArray(lista) ? lista.filter((x) => typeof x === 'string') : []);
  } catch {
    return new Set();
  }
}

/** Merkitsee tunnukset nähdyiksi. Epäonnistunut kirjoitus ei kaada mitään. */
function sahkeMerkitseNahdyksi(...tunnukset) {
  try {
    const nahdyt = [...sahkeNahdyt(), ...tunnukset.filter(Boolean)];
    localStorage.setItem(SAHKE_NAHDYT_TALLE,
      JSON.stringify(nahdyt.slice(-SAHKE_NAHTYJA_KATTO)));
  } catch {
    /* yksityinen selaus: sähke voi nousta uudestaan seuraavalla latauksella */
  }
}

/* ==================================================================== *
 * 7. VERKKO — KAIKKI KUTSUT VIRHESIETOISIA
 * ==================================================================== */

/**
 * Yksi verkkokutsu workerille.
 *
 * Heittää virheen, jonka kutsuja nappaa: sähkepinta ei koskaan päästä
 * verkkovirhettä pelin läpi. Aikakatkaisu on oma, koska selaimen oma
 * odotus voi olla minuutteja — ja sähke on nopea tai sitä ei ole.
 */
async function sahkeKutsu(polku, { method = 'GET', body = null } = {}) {
  if (!SAHKE_OSOITE) throw new Error('Sähkelinjaa ei ole kytketty');
  const ohjain = new AbortController();
  const katko = setTimeout(() => ohjain.abort(), SAHKE_AIKAKATKO_MS);
  try {
    const vastaus = await fetch(`${SAHKE_OSOITE}${polku}`, {
      method,
      signal: ohjain.signal,
      ...(body ? { headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) } : {}),
    });
    let data = null;
    try { data = await vastaus.json(); } catch { /* tyhjä runko */ }
    if (!vastaus.ok) throw new Error(data?.virhe ?? `HTTP ${vastaus.status}`);
    return data ?? {};
  } finally {
    clearTimeout(katko);
  }
}

/** Uusi retkikunta. Palauttaa {koodi, jasenId, avain}. */
function sahkeLuoRetkikunta(nimimerkki) {
  return sahkeKutsu('/retkikunta/luo', { method: 'POST', body: { nimimerkki } });
}

/** Liittyminen koodilla. Palauttaa {jasenId, avain, jasenet}. */
function sahkeLiityRetkikuntaan(koodi, nimimerkki) {
  return sahkeKutsu('/retkikunta/liity', { method: 'POST', body: { koodi, nimimerkki } });
}

/** Retkikunnan tila: jäsenet, sähkeet, apupyynnöt ja apuvastaukset. */
function sahkeHaeTila(tunnus) {
  const kysely = new URLSearchParams({
    koodi: tunnus.koodi, jasenId: tunnus.jasenId, avain: tunnus.avain,
  });
  return sahkeKutsu(`/retkikunta/tila?${kysely}`);
}

/** Sähke retkikunnalle. */
function sahkeLahetaPohja(tunnus, pohjaId, paikkaId) {
  return sahkeKutsu('/sahke', {
    method: 'POST',
    body: {
      koodi: tunnus.koodi, jasenId: tunnus.jasenId, avain: tunnus.avain, pohjaId, paikkaId,
    },
  });
}

/** Apupyyntö: kysymysteksti ja vaihtoehdot pelin omasta datasta. */
function sahkeLahetaApupyynto(tunnus, apuId, kysymys, vaihtoehdot) {
  return sahkeKutsu('/apu/kysy', {
    method: 'POST',
    body: {
      koodi: tunnus.koodi,
      jasenId: tunnus.jasenId,
      avain: tunnus.avain,
      apuId,
      kysymys,
      vaihtoehdot,
    },
  });
}

/** Veikkaus apupyyntöön — pelkkä vaihtoehdon indeksi, ei tekstiä. */
function sahkeLahetaVeikkaus(tunnus, apuId, veikkaus) {
  return sahkeKutsu('/apu/vastaa', {
    method: 'POST',
    body: {
      koodi: tunnus.koodi, jasenId: tunnus.jasenId, avain: tunnus.avain, apuId, veikkaus,
    },
  });
}

/* ==================================================================== *
 * 8. TERVEYSTARKISTUS
 * ==================================================================== */

/**
 * Linjan tila: null = ei vielä tiedetä, true = auki, false = kiinni.
 *
 * Kiinni oleva linja piilottaa KAIKEN: retkikuntaosio on yksi rivi
 * tekstiä, apunappia ei ole, pollausta ei aloiteta. Peli toimii
 * täsmälleen kuten ennen tätä moduulia.
 */
let sahkeLinja = null;

/** Onko sähkelinja varmasti auki? */
function sahkeLinjaAuki() {
  return sahkeLinja === true;
}

/**
 * Kevyt terveystarkistus käynnistyksessä.
 *
 * HEAD juureen: workerin vastaus — mikä tahansa, myös 404 — riittää
 * todisteeksi siitä, että osoite on olemassa ja vastaa. Vain
 * verkkovirhe (nimipalvelu, katkos, julkaisematon worker) sulkee
 * linjan. Tunnuksellinen pelaaja saa tarkemman testin: tila-kutsu
 * kertoo myös, kelpaako laitteelle jäänyt avain vielä.
 */
async function sahkeTarkistaLinja() {
  if (!SAHKE_OSOITE) { sahkeLinja = false; return false; }
  const tunnus = sahkeTunnus();
  try {
    if (tunnus) {
      await sahkeHaeTila(tunnus);
      sahkeLinja = true;
      return true;
    }
    const ohjain = new AbortController();
    const katko = setTimeout(() => ohjain.abort(), SAHKE_AIKAKATKO_MS);
    try {
      await fetch(SAHKE_OSOITE, { method: 'HEAD', signal: ohjain.signal });
    } finally {
      clearTimeout(katko);
    }
    sahkeLinja = true;
    return true;
  } catch (syy) {
    /*
     * Vanhentunut avain EI sulje linjaa: worker vastasi, joten linja
     * on auki — vain tämä laite on pudonnut retkikunnasta. Tunnus
     * unohdetaan, jotta osio tarjoaa liittymistä uudelleen.
     */
    if (tunnus && /HTTP (401|403|404)/.test(String(syy?.message))) {
      sahkeAsetaTunnus(null);
      sahkeLinja = true;
      return true;
    }
    console.warn('Sähkelinja ei vastaa — sähkeosio pysyy kiinni.', syy);
    sahkeLinja = false;
    return false;
  }
}

/* ==================================================================== *
 * 9. TILA TÄSSÄ ISTUNNOSSA
 * ==================================================================== */

/*
 * Istunnon oma tila. Ei pelitallenteessa: retkikunta on laitteen ja
 * pelaajan asia, ei pelitilanne — samaan tapaan kuin luetut täkynostot
 * (js/fokusnosto.js) asuvat laitteen muistissa eivätkä tallenteessa.
 */
const sahkeTila = {
  /** Jono näytettäviä liuskoja: {laji, ...} */
  jono: [],
  /** Ruudulla oleva liuska. */
  liuska: null,
  /** Pollausajastin. */
  ajastin: null,
  /** Viimeksi nähdyt virstanpylväät (automaattisähkeet). */
  aarteita: null,
  maa: null,
  /** Omat löydöt vinkkisähkeitä varten: [{paikkaId, nimi}] */
  loydot: [],
  /** Kesken oleva kaveriapu: {apuId, quiz, alkoi, veikkaus, vastaaja} */
  apu: null,
  /** Tyyli ladattu? */
  tyyli: false,
};

/* ==================================================================== *
 * 10. TYYLI
 * ==================================================================== */

const SAHKE_TYYLIN_TUNNUS = 'sahke-tyyli';

/**
 * Oma tyylitiedosto sivulle, jos sitä ei vielä ole. Sama kaava ja sama
 * syy kuin täkynostolla (js/fokusnosto.js): css/styles.css on toisen
 * työvaiheen hallussa. Yhden tiedoston versiossa linkkiä ei ole, koska
 * tyylit ovat jo sivun <style>-lohkossa.
 */
function sahkeLataaTyyli() {
  if (typeof document === 'undefined' || sahkeTila.tyyli) return;
  sahkeTila.tyyli = true;
  if (document.getElementById(SAHKE_TYYLIN_TUNNUS)) return;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  if (!peruslinkki) return;
  const linkki = document.createElement('link');
  linkki.id = SAHKE_TYYLIN_TUNNUS;
  linkki.rel = 'stylesheet';
  linkki.href = new URL('sahke.css', peruslinkki.href).href;
  document.head.appendChild(linkki);
}

/* ==================================================================== *
 * 11. PAIKANNIMET
 * ==================================================================== */

/**
 * Paikan nimi laudalta. Sähkeessä kulkee vain tunnus, joten nimi
 * haetaan aina omasta taulusta — tuntemattomasta tunnuksesta tulee
 * versaali tunnus, ei tyhjää.
 */
function sahkePaikanNimi(ui, paikkaId) {
  const nimi = ui?.game?.board?.cityById?.get?.(paikkaId)?.name;
  return String(nimi ?? paikkaId ?? '').toUpperCase();
}

/** Sähkeen teksti pohjasta ja paikasta. Tuntematon pohja = ei sähkettä. */
function sahkeTeksti(ui, pohjaId, paikkaId) {
  const pohja = sahkePohja(pohjaId);
  if (!pohja) return '';
  return pohja.teksti(sahkePaikanNimi(ui, paikkaId));
}

/** Ihmisluettava kellonaika liuskan alariville. */
function sahkeAika(iso) {
  try {
    return new Date(iso).toLocaleString('fi-FI', { dateStyle: 'short', timeStyle: 'short' });
  } catch {
    return '';
  }
}

/* ==================================================================== *
 * 12. LIUSKA — PÖLLÖ TUO SÄHKEEN
 * ==================================================================== *
 *
 * Saapuva sähke näytetään PAPERILIUSKANA pöllön kuplatyyliin: pöllön
 * saate ylärivillä ja sähke itse lennättimen kirjaimin sen alla.
 * Liuska on oma pintansa eikä js/pollo.js:n vihjekupla, koska
 * apupyyntö tarvitsee napit — vihjekupla on tekstiä, joka häviää
 * kosketuksesta.
 *
 * Yksi liuska kerrallaan. Loput odottavat jonossa ja nousevat kun
 * edellinen suljetaan: kaksi kelluvaa paperia päällekkäin on
 * omistajan pelitesteissä toistuva vika (js/fokusnosto.js).
 */

/** Onko ruutu vapaa liuskalle? Sähke väistää kaiken keskeneräisen. */
function sahkeRuutuVapaa() {
  if (typeof document === 'undefined') return false;
  if (document.querySelector('dialog[open]')) return false;
  if (document.querySelector('.fokusvirta-kupla, .fokusvirta-kortti')) return false;
  if (document.querySelector('.fokusnosto, .fokusnosto-kerros')) return false;
  return !(document.body.classList.contains('flight-active')
    || document.body.classList.contains('kartalento'));
}

/** Liuska pois ruudulta; jonon seuraava saa nousta seuraavassa piirrossa. */
function sahkeSuljeLiuska() {
  sahkeTila.liuska = null;
  if (typeof document === 'undefined') return;
  for (const vanha of document.querySelectorAll('.sahke-liuska')) vanha.remove();
}

/**
 * Jonon seuraava liuska ruudulle, jos ruutu on vapaa.
 *
 * Kutsutaan joka piirrossa (paivitaSahke), joten ruudun vapautuminen
 * huomataan itsestään eikä ajastinta tarvita.
 */
function sahkeNaytaJonosta(ui) {
  if (sahkeTila.liuska?.isConnected) return;
  if (!sahkeTila.jono.length) return;
  if (!sahkeRuutuVapaa()) return;
  const viesti = sahkeTila.jono.shift();
  sahkeLataaTyyli();
  sahkeTila.liuska = sahkePiirraLiuska(ui, viesti);
  sfx.play('paper');
}

/** Liuskan runko: saate, paperi ja sulkunappi. */
function sahkeLiuskanRunko(saate) {
  const liuska = html('div', 'sahke-liuska');
  liuska.setAttribute('role', 'status');
  liuska.setAttribute('aria-label', 'Sähke retkikunnalta');

  const sulje = html('button', 'sahke-sulje', '✕');
  sulje.type = 'button';
  sulje.title = 'Sulje';
  sulje.setAttribute('aria-label', 'Sulje sähke');
  sulje.addEventListener('click', () => {
    sfx.play('paper');
    sahkeSuljeLiuska();
  });
  liuska.appendChild(sulje);

  liuska.appendChild(html('p', 'sahke-saate', saate));
  return liuska;
}

/** Liuska ruudulle ja nousuanimaatio käyntiin. */
function sahkeKiinnitaLiuska(liuska) {
  document.body.appendChild(liuska);
  // Nousu alkaa vasta seuraavassa kehyksessä: ilman pakotettua
  // tyylinlaskentaa selain niputtaa lähtö- ja maalitilan samaan
  // kehykseen (sama oppi kuin täkynostolla).
  void liuska.offsetWidth;
  liuska.classList.add('sahke-nousee');
  return liuska;
}

/** Liuska viestin lajin mukaan. */
function sahkePiirraLiuska(ui, viesti) {
  if (viesti.laji === 'apupyynto') return sahkePiirraApupyynto(ui, viesti);
  return sahkePiirraSaapunut(ui, viesti);
}

/**
 * Saapunut sähke: pohjateksti STOP-tyyliin ja lähettäjä alarivillä.
 *
 * TEKSTI LADELMOIDAAN VASTA TÄSSÄ, omasta pohjasta ja omasta
 * kaupunkitaulusta: verkosta tuli vain pohjan ja paikan tunnus.
 */
function sahkePiirraSaapunut(ui, viesti) {
  const liuska = sahkeLiuskanRunko(viesti.saate);
  const paperi = html('div', 'sahke-paperi');
  paperi.appendChild(html('p', 'sahke-teksti',
    sahkeTeksti(ui, viesti.pohjaId, viesti.paikkaId)));
  const alarivi = [viesti.lahettaja, sahkeAika(viesti.aika)].filter(Boolean).join(' · ');
  if (alarivi) paperi.appendChild(html('p', 'sahke-alarivi', alarivi));
  liuska.appendChild(paperi);
  return sahkeKiinnitaLiuska(liuska);
}

/**
 * APUPYYNTÖ: vastaanottopää.
 *
 * Raamattu: *"retkikunnan jäsen saa kysymyksen ja antaa oman
 * veikkauksensa vaihtoehdoista"*. Vaihtoehdot ovat kysyjän pelin
 * datasta, ja vastaus on VAIHTOEHDON INDEKSI — mitään tekstiä ei
 * kirjoiteta kummassakaan päässä.
 */
function sahkePiirraApupyynto(ui, viesti) {
  const liuska = sahkeLiuskanRunko(SAHKE_APUPYYNNON_SAATE);
  liuska.classList.add('sahke-apupyynto');

  const paperi = html('div', 'sahke-paperi');
  paperi.appendChild(html('p', 'sahke-alarivi', `${viesti.kysyja} kysyy:`));
  paperi.appendChild(html('p', 'sahke-kysymys', viesti.kysymys));

  const napit = html('div', 'sahke-vaihtoehdot');
  viesti.vaihtoehdot.forEach((teksti, i) => {
    const nappi = html('button', 'sahke-vaihtoehto');
    nappi.type = 'button';
    nappi.appendChild(html('span', 'sahke-kirjain', String.fromCharCode(65 + i)));
    nappi.appendChild(html('span', 'sahke-vaihtoehto-teksti', teksti));
    nappi.addEventListener('click', async () => {
      for (const muu of napit.querySelectorAll('button')) muu.disabled = true;
      nappi.classList.add('sahke-valittu');
      sfx.play('coin');
      const tunnus = sahkeTunnus();
      // Verkkovirhe ei saa jättää liuskaa jumiin: veikkaus katoaa,
      // liuska sulkeutuu ja peli jatkuu.
      if (tunnus) {
        try {
          await sahkeLahetaVeikkaus(tunnus, viesti.apuId, i);
        } catch (syy) {
          console.warn('Veikkaus ei mennyt perille:', syy);
        }
      }
      sahkeSuljeLiuska();
    });
    napit.appendChild(nappi);
  });
  paperi.appendChild(napit);

  const ohita = html('button', 'sahke-ohita', 'En osaa auttaa');
  ohita.type = 'button';
  ohita.addEventListener('click', () => {
    sfx.play('paper');
    sahkeSuljeLiuska();
  });
  paperi.appendChild(ohita);

  liuska.appendChild(paperi);
  return sahkeKiinnitaLiuska(liuska);
}

/* ==================================================================== *
 * 13. POLLAUS
 * ==================================================================== *
 *
 * Tila haetaan 60 s välein ja HETI kun sovellus palaa etualalle:
 * puhelimessa peli on taustalla suurimman osan ajasta, ja tauolta
 * palaava pelaaja odottaa näkevänsä sähkeensä heti eikä minuutin
 * päästä. Kaveriavun odotus nostaa tahdin väliaikaisesti.
 */
const SAHKE_POLLAUS_MS = 60 * 1000;
const SAHKE_APUPOLLAUS_MS = 5 * 1000;

/** Ajastin uusiksi nykyisellä tahdilla. */
function sahkeViritaPollaus() {
  clearTimeout(sahkeTila.ajastin);
  if (!sahkeLinjaAuki() || !sahkeTunnus()) return;
  const vali = sahkeTila.apu ? SAHKE_APUPOLLAUS_MS : SAHKE_POLLAUS_MS;
  sahkeTila.ajastin = setTimeout(() => { void sahkePollaa(); }, vali);
}

/**
 * Yksi tilakysely: uudet sähkeet ja apupyynnöt jonoon, saapunut
 * veikkaus kysymysdialogiin.
 *
 * Virhe on hiljainen: pudonnut yhteys ei ole pelaajan asia, ja seuraava
 * kierros yrittää uudestaan.
 */
async function sahkePollaa() {
  const tunnus = sahkeTunnus();
  if (!sahkeLinjaAuki() || !tunnus) return;
  try {
    const tila = await sahkeHaeTila(tunnus);
    sahkeKasitteleTila(tila);
  } catch (syy) {
    console.warn('Sähkeiden haku ei onnistunut:', syy);
  } finally {
    sahkeViritaPollaus();
  }
}

/** Tilavastaus jonoon ja kaveriavun odotukseen. */
function sahkeKasitteleTila(tila) {
  const nahdyt = sahkeNahdyt();
  const uudet = [];

  for (const sahke of tila?.sahkeet ?? []) {
    if (!sahke?.id || nahdyt.has(sahke.id)) continue;
    const pohja = sahkePohja(sahke.pohjaId);
    // Tuntematon pohja merkitään nähdyksi mutta ei näytetä: uudempi
    // versio toisessa päässä ei saa jäädä ikuiseksi jonoksi.
    uudet.push(sahke.id);
    if (!pohja) continue;
    sahkeTila.jono.push({
      laji: 'sahke',
      saate: SAHKE_SAATTEET[Math.floor(Math.random() * SAHKE_SAATTEET.length)],
      pohjaId: sahke.pohjaId,
      paikkaId: sahke.paikkaId,
      lahettaja: sahke.lahettaja ?? '',
      aika: sahke.aika ?? '',
    });
  }

  for (const pyynto of tila?.apupyynnot ?? []) {
    if (!pyynto?.apuId || nahdyt.has(`apu:${pyynto.apuId}`)) continue;
    uudet.push(`apu:${pyynto.apuId}`);
    const vaihtoehdot = Array.isArray(pyynto.vaihtoehdot)
      ? pyynto.vaihtoehdot.filter((v) => typeof v === 'string') : [];
    if (!pyynto.kysymys || vaihtoehdot.length < 2) continue;
    sahkeTila.jono.push({
      laji: 'apupyynto',
      apuId: pyynto.apuId,
      kysyja: pyynto.kysyja ?? 'Retkikunta',
      kysymys: pyynto.kysymys,
      vaihtoehdot,
    });
  }

  if (uudet.length) sahkeMerkitseNahdyksi(...uudet);

  // Oma kysymys odottaa vastausta: poimitaan sen veikkaus.
  const apu = sahkeTila.apu;
  if (apu && !apu.veikkaus) {
    const vastaus = (tila?.apuvastaukset ?? []).find((v) => v?.apuId === apu.apuId);
    if (vastaus && Number.isInteger(vastaus.veikkaus)) {
      apu.veikkaus = { indeksi: vastaus.veikkaus, vastaaja: vastaus.vastaaja ?? 'Retkikunta' };
    }
  }
}

/* ==================================================================== *
 * 14. VIRSTANPYLVÄÄT — AUTOMAATTISÄHKEET
 * ==================================================================== *
 *
 * Automaattisähke ei tarvitse omaa kytkentää peliin: virstanpylväät
 * luetaan PELITILASTA joka piirrossa, samalla opilla kuin Game
 * Centerin saavutukset (js/ui.js paivitaSaavutukset). Löytö voi tulla
 * monta reittiä (visa, kohtaaminen, tapahtumakortti), eikä tilasta
 * lukeva tarkistus voi jäädä yhdestäkään niistä paitsi.
 *
 * Ensimmäinen piirto vain kirjaa lähtötilanteen: kesken jäänyt peli ei
 * saa sähköttää uudestaan kaikkia jo löydettyjä aarteita.
 */
function sahkeVirstanpylvaat(ui) {
  const tunnus = sahkeTunnus();
  if (!sahkeLinjaAuki() || !tunnus || !ui?.game || ui.katselu) return;

  /*
   * game.world.starsFound on taulu manner → kaupunki (js/game.js rivi
   * 149), eli juuri se pari, jonka vinkkisähke tarvitsee: MISTÄ aarre
   * löytyi. Omat löydöt luetaan siis suoraan pelitilasta eikä pidetä
   * omaa kirjanpitoa, joka voisi erota siitä.
   */
  const loydot = sahkeOmatLoydot(ui);
  const city = ui.game.cityOf?.() ?? null;
  const maa = city ? (ui.game.pack?.map?.cityCountry?.[city.id] ?? null) : null;
  sahkeTila.loydot = loydot;

  // Ensimmäinen piirto kirjaa vain lähtötilanteen: kesken jäänyt peli
  // ei saa sähköttää uudestaan kaikkia jo löydettyjä aarteita.
  if (sahkeTila.aarteita === null) {
    sahkeTila.aarteita = loydot.length;
    sahkeTila.maa = maa;
    return;
  }

  if (loydot.length > sahkeTila.aarteita) {
    // Uusin löytö on taulun viimeinen: Map säilyttää lisäysjärjestyksen.
    const uusin = loydot[loydot.length - 1];
    sahkeTila.aarteita = loydot.length;
    if (uusin) void sahkeLahetaAuto(tunnus, 'aarre-loytyi', uusin.paikkaId);
  }

  if (maa && maa !== sahkeTila.maa) {
    sahkeTila.maa = maa;
    if (city) void sahkeLahetaAuto(tunnus, 'saavuin', city.id);
  }
}

/** Omat aarrelöydöt paikkalistaksi: [{paikkaId, nimi}] löytöjärjestyksessä. */
function sahkeOmatLoydot(ui) {
  const taulu = ui?.game?.world?.starsFound;
  const kaupungit = ui?.game?.board?.cityById;
  if (!taulu || !kaupungit) return [];
  const loydot = [];
  for (const cityId of taulu.values()) {
    const city = kaupungit.get(cityId);
    if (cityId) loydot.push({ paikkaId: cityId, nimi: city?.name ?? cityId });
  }
  return loydot;
}

/** Automaattisähke matkaan. Epäonnistuminen on hiljainen. */
async function sahkeLahetaAuto(tunnus, pohjaId, paikkaId) {
  try {
    await sahkeLahetaPohja(tunnus, pohjaId, paikkaId);
  } catch (syy) {
    console.warn('Automaattisähke ei lähtenyt:', syy);
  }
}

/* ==================================================================== *
 * 15. KAVERIAPU AARREKYSYMYKSESSÄ
 * ==================================================================== *
 *
 * Raamattu (sitova): *"yksi apuvaihtoehto on KYSY KAVERILTA — hinta 25
 * puntaa, aika pysähtyy, retkikunnan jäsen saa kysymyksen ja antaa oman
 * veikkauksensa vaihtoehdoista; veikkaus palaa kysyjälle näkyviin."*
 *
 * PELAAJA PÄÄTTÄÄ ITSE. Veikkaus vain korostaa yhden vaihtoehdon ja
 * kertoo kuka sitä veikkaa; vastausnapit pysyvät auki kaikille
 * vaihtoehdoille, eikä peli valitse mitään puolesta.
 *
 * RAHA KULKEE PELIN OMAA REITTIÄ (js/game.js actionKaveriapu), samaa
 * kuin 50:50 ja vihje: ui.doAction → game → kirjanpito. Tämä moduuli ei
 * koske pelaajan kukkaroon.
 */

/** Odotuksen katto: tämän jälkeen odotuksen saa perua ilman hyvitystä. */
const SAHKE_ODOTUKSEN_KATTO_MS = 10 * 60 * 1000;

/** Kaveriavun nappi kysymysdialogin apurivillä (luodaan kerran). */
function sahkeApunappi() {
  const rivi = document.querySelector('#quiz-dialog menu');
  if (!rivi) return null;
  let nappi = document.getElementById('quiz-kaveriapu');
  if (nappi) return nappi;
  nappi = html('button', 'lifeline sahke-apunappi');
  nappi.id = 'quiz-kaveriapu';
  nappi.type = 'button';
  nappi.hidden = true;
  // Vihjeen ja 50:50:n jälkeen, ennen Jatka-nappia — apukeinot yhdessä.
  rivi.insertBefore(nappi, document.getElementById('quiz-continue'));
  return nappi;
}

/** Odotus- ja veikkauskortti kysymyksen ja vaihtoehtojen väliin. */
function sahkeApukortti() {
  const options = document.getElementById('quiz-options');
  if (!options) return null;
  let kortti = document.getElementById('sahke-apukortti');
  if (kortti) return kortti;
  kortti = html('div', 'sahke-apukortti');
  kortti.id = 'sahke-apukortti';
  kortti.setAttribute('role', 'status');
  kortti.hidden = true;
  options.before(kortti);
  return kortti;
}

/**
 * AIKA PYSÄHTYY.
 *
 * Tiimalasi pysäytetään mutta ui.timedQuiz jätetään osoittamaan tähän
 * kysymykseen: js/visa.js renderTimer käynnistää kellon uudelleen vain
 * kun `ui.timedQuiz !== quiz`, joten kello pysyy pysähtyneenä joka
 * piirron läpi ilman että visan koodiin tarvitsee koskea.
 */
function sahkePysaytaKello(ui) {
  stopQuizTimer(ui);
  ui.timedQuiz = ui.game?.quiz ?? null;
}

/** Kello käyntiin siitä, mihin se pysähtyi (quiz.seconds on tallessa). */
function sahkeJatkaKelloa(ui) {
  const quiz = ui.game?.quiz;
  if (!quiz || quiz.chosen !== null || ui.game.player?.isBot) return;
  startQuizTimer(ui, quiz);
}

/** Kaveriavun lopetus: kortti pois, kello käyntiin, pollaus normaaliin. */
function sahkeLopetaApu(ui, { jatkaKello = true } = {}) {
  sahkeTila.apu = null;
  const kortti = document.getElementById('sahke-apukortti');
  if (kortti) { kortti.hidden = true; kortti.replaceChildren(); }
  if (jatkaKello) sahkeJatkaKelloa(ui);
  sahkeViritaPollaus();
}

/**
 * "Kysy kaverilta (25 £)" -painallus.
 *
 * Järjestys on tarkka: ensin veloitus pelin omalla reitillä, ja vasta
 * onnistuneen veloituksen jälkeen sähke matkaan. Jos verkko pettää,
 * odotus perutaan heti eikä pelaaja jää tuijottamaan tyhjää — raha on
 * silti mennyt, kuten 50:50:ssäkin, koska apu oli ostettu.
 */
function sahkeKysyKaverilta(ui) {
  const quiz = ui.game?.quiz;
  const tunnus = sahkeTunnus();
  if (!quiz || !tunnus || sahkeTila.apu) return;

  ui.doAction(() => ui.game.actionKaveriapu());
  // doAction ei kerro tulosta, mutta pelin oma lippu kertoo: ilman
  // veloitusta (rahat eivät riittäneet, väärä vaihe) ei lähetetä mitään.
  if (!quiz.kaveriapu) return;

  const apuId = `apu-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  sahkeTila.apu = {
    apuId, quiz, alkoi: Date.now(), veikkaus: null,
  };
  sahkePysaytaKello(ui);
  sahkeViritaPollaus();
  sfx.play('hint');

  (async () => {
    try {
      await sahkeLahetaApupyynto(tunnus, apuId, quiz.question, quiz.options);
    } catch (syy) {
      console.warn('Apupyyntö ei lähtenyt:', syy);
      if (sahkeTila.apu?.apuId === apuId) {
        sahkeTila.apu.virhe = 'Sähke ei mennyt perille. Voit perua odotuksen.';
      }
    }
    ui.render?.();
  })();
}

/**
 * Apunappi ja odotuskortti joka piirrossa.
 *
 * Nappi näkyy vain kun kaikki neljä ehtoa täyttyvät: linja auki,
 * retkikunta olemassa, rahaa vähintään 25 ja kysymys yhä avoinna.
 */
function sahkePaivitaApu(ui) {
  const nappi = sahkeApunappi();
  if (!nappi) return;
  const quiz = ui.game?.quiz;
  const auki = ui.game?.phase === 'quiz' && quiz && quiz.chosen === null
    && !ui.game.player?.isBot;

  if (!auki) {
    nappi.hidden = true;
    if (sahkeTila.apu) sahkeLopetaApu(ui, { jatkaKello: false });
    return;
  }

  // Vaihtoehdot ovat esillä vasta kun kysymys on kirjoitettu loppuun;
  // apunappi seuraa samaa porttia kuin 50:50 ja vihje (js/visa.js).
  const esilla = !document.getElementById('quiz-options')?.hidden;
  const kaytossa = sahkeLinjaAuki() && Boolean(sahkeTunnus());
  const rahaa = (ui.game.player?.money ?? 0) >= KAVERIAPU_HINTA;

  nappi.hidden = !esilla || !kaytossa || !rahaa;
  nappi.disabled = Boolean(quiz.kaveriapu);
  nappi.textContent = quiz.kaveriapu
    ? 'Kaverilta kysytty'
    : `Kysy kaverilta (${KAVERIAPU_HINTA} £)`;
  /*
   * onclick eikä addEventListener: nappi asuu index.html:n pysyvässä
   * kysymysdialogissa ja elää yli pelikertojen, mutta UI-olio vaihtuu
   * uuden pelin myötä (js/main.js attach). Sijoitus korvaa vanhan
   * käsittelijän, joten kiinni jäänyt viite vanhaan UI:hin on mahdoton.
   */
  nappi.onclick = () => sahkeKysyKaverilta(ui);

  sahkePaivitaApukortti(ui, quiz);
}

/** Odotustila, saapunut veikkaus ja vaihtoehdon korostus. */
function sahkePaivitaApukortti(ui, quiz) {
  const kortti = sahkeApukortti();
  if (!kortti) return;
  const apu = sahkeTila.apu;
  if (!apu || apu.quiz !== quiz) {
    kortti.hidden = true;
    return;
  }
  sahkeLataaTyyli();
  kortti.hidden = false;
  kortti.replaceChildren();

  if (apu.veikkaus) {
    /*
     * VEIKKAUS SAAPUI. Korostus on vain korostus: kaikki vastausnapit
     * pysyvät auki, ja lopullisen vastauksen valitsee pelaaja
     * (Raamattu: "veikkaus palaa kysyjälle näkyviin").
     */
    const { indeksi, vastaaja } = apu.veikkaus;
    const teksti = quiz.options?.[indeksi] ?? '';
    kortti.appendChild(html('p', 'sahke-apu-saate', sahkeVeikkauksenSaate(vastaaja)));
    kortti.appendChild(html('p', 'sahke-apu-veikkaus', `${vastaaja} veikkaa: ${teksti}`));
    for (const [i, nappi] of (ui.optionButtons ?? []).entries()) {
      nappi.classList.toggle('sahke-veikattu', i === indeksi);
    }
    const jatka = html('button', 'sahke-ohita', 'Selvä');
    jatka.type = 'button';
    jatka.addEventListener('click', () => {
      sfx.play('paper');
      sahkeLopetaApu(ui);
      ui.render?.();
    });
    kortti.appendChild(jatka);
    return;
  }

  kortti.appendChild(html('p', 'sahke-apu-saate',
    'Sähke lähti retkikunnalle. Aika on pysähtynyt odotuksen ajaksi.'));
  if (apu.virhe) kortti.appendChild(html('p', 'sahke-apu-virhe', apu.virhe));

  /*
   * PERUMINEN VASTA MYÖHEMMIN. Odotuksen saa perua ilman hyvitystä
   * vasta kun veikkaus on saapunut tai kymmenen minuuttia on kulunut
   * (tilaus 25.8.2026) — muuten apu olisi 25 punnan aikalisä, jonka voi
   * ottaa ja perua saman tien.
   */
  const kulunut = Date.now() - apu.alkoi;
  if (kulunut >= SAHKE_ODOTUKSEN_KATTO_MS || apu.virhe) {
    const peru = html('button', 'sahke-ohita', 'Peru odotus');
    peru.type = 'button';
    peru.addEventListener('click', () => {
      sfx.play('paper');
      sahkeLopetaApu(ui);
      ui.render?.();
    });
    kortti.appendChild(peru);
  } else {
    const jaljella = Math.ceil((SAHKE_ODOTUKSEN_KATTO_MS - kulunut) / 60000);
    kortti.appendChild(html('p', 'sahke-apu-alarivi',
      `Odotuksen voi perua ${jaljella} min kuluttua, tai heti kun veikkaus saapuu.`));
  }
}

/* ==================================================================== *
 * 16. RETKIKUNTAOSIO (js/ui.js lisaaEhdotusOsio)
 * ==================================================================== */

/**
 * "Retkikunta" -osio valikon lomakkeeseen.
 *
 * Kolme tilaa:
 *   1. linja kiinni      → yksi rivi tekstiä, ei nappeja;
 *   2. ei retkikuntaa    → nimimerkin valinta + luo / liity koodilla;
 *   3. retkikunnassa     → koodi näkyvissä, sähkeen lähetys, ero.
 *
 * @param {object} ui pelin UI-olio (paikkalistat laudalta).
 * @returns {HTMLElement} osio — aina jotain, koska kiinni oleva linja
 *   kerrotaan pelaajalle eikä vaieta.
 */
export function retkikuntaOsio(ui) {
  sahkeLataaTyyli();
  const lohko = html('div', 'periaate-ehdotus sahke-osio');
  lohko.appendChild(html('h3', 'periaate-valiotsikko', 'Retkikunta'));

  if (!sahkeLinjaAuki()) {
    lohko.appendChild(html('p', 'periaate-huomio', 'Sähkelinja avataan pian.'));
    return lohko;
  }

  const sisus = html('div', 'sahke-sisus');
  lohko.appendChild(sisus);
  sahkePiirraOsio(ui, sisus);
  return lohko;
}

/** Osion sisältö tilan mukaan; sama kutsu piirtää sen uudelleen. */
function sahkePiirraOsio(ui, sisus) {
  sisus.replaceChildren();
  const tunnus = sahkeTunnus();
  if (tunnus) sahkePiirraJasen(ui, sisus, tunnus);
  else sahkePiirraLiittyminen(ui, sisus);
}

/** Liittymisnäkymä: nimimerkki generaattorista, sitten luo tai liity. */
function sahkePiirraLiittyminen(ui, sisus) {
  sisus.appendChild(html('p', 'periaate-teksti',
    'Retkikunta on pieni porukka, joka sähköttää toisilleen matkan '
    + 'käänteistä. Kaikki viestit ovat valmiita sähkepohjia — omaa '
    + 'tekstiä ei kirjoiteta eikä lähetetä.'));

  const huomio = html('p', 'periaate-huomio');
  huomio.setAttribute('role', 'status');

  /* --- nimimerkki generaattorista --- */
  sisus.appendChild(html('p', 'periaate-huomio', 'Valitse nimimerkkisi:'));
  const nimirivi = html('div', 'sahke-nimet');
  sisus.appendChild(nimirivi);
  let valittu = '';

  const arvoNimet = () => {
    nimirivi.replaceChildren();
    valittu = '';
    for (const nimi of sahkeArvoNimet()) {
      const nappi = html('button', 'sahke-nimi', nimi);
      nappi.type = 'button';
      nappi.addEventListener('click', () => {
        valittu = nimi;
        for (const muu of nimirivi.querySelectorAll('.sahke-nimi')) {
          muu.classList.toggle('sahke-valittu', muu === nappi);
        }
        huomio.textContent = `Nimimerkkisi on ${nimi}.`;
      });
      nimirivi.appendChild(nappi);
    }
  };
  arvoNimet();

  const uudet = html('button', 'ghost sahke-arvo', 'Arvo uudet nimet');
  uudet.type = 'button';
  uudet.addEventListener('click', arvoNimet);
  sisus.appendChild(uudet);

  /* --- luo uusi retkikunta --- */
  const luo = html('button', 'primary periaate-laheta', 'Perusta retkikunta');
  luo.type = 'button';
  luo.addEventListener('click', async () => {
    if (!valittu) { huomio.textContent = 'Valitse ensin nimimerkki.'; return; }
    luo.disabled = true;
    huomio.textContent = 'Perustetaan…';
    try {
      const vastaus = await sahkeLuoRetkikunta(valittu);
      sahkeAsetaTunnus({ ...vastaus, nimimerkki: valittu });
      sahkeViritaPollaus();
      sahkePiirraOsio(ui, sisus);
    } catch (syy) {
      console.warn('Retkikunnan perustus ei onnistunut:', syy);
      luo.disabled = false;
      huomio.textContent = `Ei onnistunut: ${syy.message}`;
    }
  });
  sisus.appendChild(luo);

  /* --- liity koodilla --- */
  sisus.appendChild(html('p', 'periaate-huomio', 'Tai liity kaverin koodilla:'));
  const koodi = html('input', 'periaate-kentta sahke-koodi');
  koodi.type = 'text';
  koodi.inputMode = 'latin';
  koodi.autocapitalize = 'characters';
  koodi.autocomplete = 'off';
  koodi.spellcheck = false;
  koodi.maxLength = SAHKE_KOODIN_PITUUS;
  koodi.placeholder = `Koodi (${SAHKE_KOODIN_PITUUS} merkkiä)`;
  koodi.setAttribute('aria-label', 'Retkikunnan liittymiskoodi');
  /*
   * Kenttä ei ole vapaa tekstikenttä: jokainen näppäilty merkki
   * suodatetaan koodiaakkostoon, joten kenttään ei voi jäädä yhtään
   * pelaajan kirjoittamaa merkkiä (Raamattu: ei vapaata tekstiä).
   */
  koodi.addEventListener('input', () => { koodi.value = sahkeSiistiKoodi(koodi.value); });
  sisus.appendChild(koodi);

  const liity = html('button', 'ghost periaate-laheta', 'Liity retkikuntaan');
  liity.type = 'button';
  liity.addEventListener('click', async () => {
    if (!valittu) { huomio.textContent = 'Valitse ensin nimimerkki.'; return; }
    const arvo = sahkeSiistiKoodi(koodi.value);
    if (arvo.length !== SAHKE_KOODIN_PITUUS) {
      huomio.textContent = `Koodissa on ${SAHKE_KOODIN_PITUUS} merkkiä.`;
      return;
    }
    liity.disabled = true;
    huomio.textContent = 'Liitytään…';
    try {
      const vastaus = await sahkeLiityRetkikuntaan(arvo, valittu);
      sahkeAsetaTunnus({ koodi: arvo, ...vastaus, nimimerkki: valittu });
      sahkeViritaPollaus();
      sahkePiirraOsio(ui, sisus);
    } catch (syy) {
      console.warn('Retkikuntaan liittyminen ei onnistunut:', syy);
      liity.disabled = false;
      huomio.textContent = `Ei onnistunut: ${syy.message}`;
    }
  });
  sisus.appendChild(liity);
  sisus.appendChild(huomio);
}

/** Jäsennäkymä: koodi, sähkeen lähetys ja ero retkikunnasta. */
function sahkePiirraJasen(ui, sisus, tunnus) {
  sisus.appendChild(html('p', 'periaate-teksti',
    `Olet retkikunnassa nimellä ${tunnus.nimimerkki || 'matkalainen'}.`));

  const koodirivi = html('p', 'sahke-koodirivi');
  koodirivi.appendChild(html('span', 'periaate-huomio', 'Liittymiskoodi:'));
  koodirivi.appendChild(html('strong', 'sahke-koodiarvo', tunnus.koodi));
  sisus.appendChild(koodirivi);

  const huomio = html('p', 'periaate-huomio');
  huomio.setAttribute('role', 'status');

  /* --- vinkkisähkeet --- */
  sisus.appendChild(html('p', 'periaate-huomio', 'Lähetä sähke retkikunnalle:'));
  const pohjarivi = html('div', 'sahke-pohjat');
  sisus.appendChild(pohjarivi);
  const paikkarivi = html('div', 'sahke-paikat');
  sisus.appendChild(paikkarivi);

  let pohja = null;
  const naytaPaikat = () => {
    paikkarivi.replaceChildren();
    if (!pohja) return;
    /*
     * Paikat luetaan pelitilasta VASTA TÄSSÄ eikä istunnon välimuistista:
     * osio voidaan avata ennen ensimmäistä piirtoa retkikunnan jäsenenä,
     * ja silloin välimuisti olisi vielä tyhjä.
     */
    const paikat = pohja.paikat === 'kaydyt' ? sahkeKaydytPaikat(ui) : sahkeOmatLoydot(ui);
    if (!paikat.length) {
      paikkarivi.appendChild(html('p', 'periaate-huomio', pohja.paikat === 'kaydyt'
        ? 'Et ole vielä käynyt yhdessäkään kaupungissa.'
        : 'Vinkata saa vain aarteesta, jonka on itse löytänyt — etsi ensin yksi.'));
      return;
    }
    for (const paikka of paikat) {
      const nappi = html('button', 'sahke-paikka', paikka.nimi || paikka.paikkaId);
      nappi.type = 'button';
      nappi.addEventListener('click', async () => {
        for (const muu of paikkarivi.querySelectorAll('button')) muu.disabled = true;
        huomio.textContent = 'Lähetetään…';
        try {
          await sahkeLahetaPohja(tunnus, pohja.id, paikka.paikkaId);
          huomio.textContent = `Sähke lähti: ${sahkeTeksti(ui, pohja.id, paikka.paikkaId)}`;
          sfx.play('paper');
        } catch (syy) {
          console.warn('Sähke ei lähtenyt:', syy);
          huomio.textContent = `Ei onnistunut: ${syy.message}`;
        }
        paikkarivi.replaceChildren();
        pohja = null;
        for (const muu of pohjarivi.querySelectorAll('button')) {
          muu.classList.remove('sahke-valittu');
        }
      });
      paikkarivi.appendChild(nappi);
    }
  };

  for (const p of SAHKE_POHJAT.filter((x) => x.tyyppi === 'vinkki')) {
    const nappi = html('button', 'sahke-pohja', p.nimi);
    nappi.type = 'button';
    nappi.addEventListener('click', () => {
      pohja = p;
      for (const muu of pohjarivi.querySelectorAll('button')) {
        muu.classList.toggle('sahke-valittu', muu === nappi);
      }
      naytaPaikat();
    });
    pohjarivi.appendChild(nappi);
  }

  sisus.appendChild(huomio);

  const ero = html('button', 'ghost sahke-ero', 'Eroa retkikunnasta');
  ero.type = 'button';
  ero.addEventListener('click', () => {
    sahkeAsetaTunnus(null);
    clearTimeout(sahkeTila.ajastin);
    sahkeTila.jono.length = 0;
    sahkeSuljeLiuska();
    sahkePiirraOsio(ui, sisus);
  });
  sisus.appendChild(ero);
}

/** Käydyt kaupungit paikkalistaksi (julistesähke). */
function sahkeKaydytPaikat(ui) {
  const kayty = ui?.game?.world?.visited ?? new Set();
  const taulu = ui?.game?.board?.cityById;
  if (!taulu) return [];
  const paikat = [];
  for (const id of kayty) {
    const city = taulu.get(id);
    if (city) paikat.push({ paikkaId: id, nimi: city.name });
  }
  return paikat;
}

/* ==================================================================== *
 * 17. KYTKENNÄT
 * ==================================================================== */

/**
 * PIIRTOKUTSU (js/ui.js render, heti renderQuizin jälkeen).
 *
 * Kolme työtä joka piirrossa: virstanpylväiden tarkistus, kaveriavun
 * nappi ja kortti, sekä jonossa odottavan liuskan nostaminen heti kun
 * ruutu vapautuu. Ilman linjaa tai retkikuntaa tämä on lähes
 * välittömästi palaava ei-mitään.
 */
export function paivitaSahke(ui) {
  if (typeof document === 'undefined' || !ui || ui.dead) return;
  if (!sahkeLinjaAuki()) return;
  try {
    sahkeVirstanpylvaat(ui);
    sahkePaivitaApu(ui);
    sahkeNaytaJonosta(ui);
  } catch (syy) {
    // Sähke on lisäys peliin, ei sen ehto: yksikään vika täällä ei saa
    // pysäyttää piirtoa.
    console.warn('Sähkepinnan päivitys kaatui:', syy);
  }
}

/**
 * KÄYNNISTYS (js/main.js).
 *
 * Terveystarkistus ensin; vasta sen jälkeen pollaus ja etualalle
 * palaamisen kuuntelija. Kiinni oleva linja ei jätä yhtään ajastinta
 * eikä kuuntelijaa pyörimään.
 */
export function kytkeSahke() {
  if (typeof document === 'undefined') return;
  void (async () => {
    const auki = await sahkeTarkistaLinja();
    if (!auki) return;
    sahkeLataaTyyli();
    // Heti yksi kysely: tauolla saapuneet sähkeet odottavat pelaajaa.
    void sahkePollaa();
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') void sahkePollaa();
    });
  })();
}

/**
 * Uusi peli tai laudan vaihto: liuskat ja virstanpylväät nollille.
 *
 * Retkikuntaa EI pureta — se on laitteen ja pelaajan asia eikä yhden
 * pelikerran tila.
 */
export function nollaaSahke() {
  sahkeTila.jono.length = 0;
  sahkeTila.apu = null;
  sahkeTila.aarteita = null;
  sahkeTila.maa = null;
  sahkeTila.loydot = [];
  sahkeSuljeLiuska();
}
