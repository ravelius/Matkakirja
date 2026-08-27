/*
 * Viisaan Pöllön välityspalvelimen puhtaat apufunktiot.
 *
 * Nämä on eroteltu worker.js:stä siksi, että ne voi testata ilman
 * verkkoa ja ilman Cloudflaren ajoympäristöä (tests/pollo.test.mjs).
 * Täällä ei ole yhtään fetchiä, yhtään globaalia tilaa eikä yhtään
 * salaisuutta — pelkkää laskentaa syötteestä tulokseen.
 */

/** Oletusrajat. Kumpikin ylikirjoitetaan workerin ympäristömuuttujalla. */
export const PAIVARAJA_OLETUS = 30;
export const KUUKAUSIRAJA_OLETUS = 1500;

/*
 * LUKIJAÄÄNEN (puhesynteesin) RAJAT — merkkejä, ei pyyntöjä.
 *
 * Puhe laskutetaan tekstin pituudesta, ja yksi sivun luenta on kymmeniä
 * pieniä pyyntöjä (lause tai kappale kerrallaan). Pyyntöjen laskeminen
 * rankaisisi lyhyitä lauseita ja päästäisi pitkät ilmaiseksi, joten
 * laskuri kasvaa luetun tekstin merkkimäärällä. Mittakaava: puhetta
 * syntyy noin tuhat merkkiä minuutissa, eli päiväraja 60 000 on noin
 * tunti puhetta per vierailija ja kuukausikatto 900 000 noin 15 tuntia
 * — kustannuksena (gpt-4o-mini-tts ~1,5 snt/min) noin 13,5 €/kk
 * enimmillään.
 */
export const PUHE_TEKSTIN_KATTO = 1000;
export const PUHE_PAIVARAJA_OLETUS = 60000;
export const PUHE_KUUKAUSIRAJA_OLETUS = 900000;

/*
 * KUVAGENEROINNIN RAJAT (kehittäjän eräajot, tehtava: 'kuva').
 * Promptin katto on väljä, koska julistepromptit ovat pitkiä
 * tyylikuvauksia; päiväraja on turvaraja karanneelle silmukalle,
 * ei kiintiö — haara on joka tapauksessa vain kehittäjäkoodilla.
 */
export const KUVA_PROMPTIN_KATTO = 4000;
export const KUVA_PAIVARAJA_OLETUS = 60;

/** Kontekstipaketin katto merkkeinä (sama luku kuin pelin puolella). */
export const KONTEKSTIN_KATTO = 5000;

/** Kysymyksen ja keskusteluhistorian katot. */
export const KYSYMYKSEN_KATTO = 500;
export const HISTORIAN_KATTO = 6;

/**
 * Pieni ei-kryptografinen tiiviste (FNV-1a, 32 bittiä).
 *
 * Käyttörajat lasketaan asiakkaan IP-osoitteesta, mutta raakaa
 * IP-osoitetta ei haluta säilöä eikä lokittaa. Tiiviste riittää
 * laskuriavaimeksi: se on vakaa saman vierailijan yli vuorokauden ajan
 * mutta ei palauta osoitetta takaisin.
 */
export function tiiviste(teksti) {
  let h = 0x811c9dc5;
  for (let i = 0; i < teksti.length; i += 1) {
    h ^= teksti.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}

/** Päivälaskurin avain. Vuorokausi vaihtuu UTC-keskiyöllä. */
export function paivaAvain(ip, nyt = new Date()) {
  return `pollo:p:${nyt.toISOString().slice(0, 10)}:${tiiviste(String(ip ?? 'tuntematon'))}`;
}

/** Kuukausibudjetin avain. Kuukausi vaihtuu UTC-kuukauden vaihtuessa. */
export function kuukausiAvain(nyt = new Date()) {
  return `pollo:k:${nyt.toISOString().slice(0, 7)}`;
}

/** Lukijaäänen laskuriavaimet — oma etuliite, etteivät ne sekoitu pöllön
 * kysymyslaskureihin (eri yksikkö: merkkejä, ei pyyntöjä). */
export function puhePaivaAvain(ip, nyt = new Date()) {
  return `puhe:p:${nyt.toISOString().slice(0, 10)}:${tiiviste(String(ip ?? 'tuntematon'))}`;
}

export function puheKuukausiAvain(nyt = new Date()) {
  return `puhe:k:${nyt.toISOString().slice(0, 7)}`;
}

/**
 * Lukijaäänen käyttörajojen tarkistus. Sama muoto kuin tarkistaRajat,
 * mutta viestit puhuvat lukijaäänestä eivätkä pöllöstä — ne näkyvät
 * pelissä sellaisinaan, jos raja tulee vastaan.
 */
export function tarkistaPuheRajat({
  paiva = 0,
  kuukausi = 0,
  paivaraja = PUHE_PAIVARAJA_OLETUS,
  kuukausiraja = PUHE_KUUKAUSIRAJA_OLETUS,
} = {}) {
  if (kuukausiraja > 0 && kuukausi >= kuukausiraja) {
    return {
      ok: false,
      syy: 'kuukausiraja',
      viesti: 'Lukijaääni on käyttänyt tämän kuukauden puheajan. '
        + 'Se palaa ensi kuun alussa.',
    };
  }
  if (paivaraja > 0 && paiva >= paivaraja) {
    return {
      ok: false,
      syy: 'paivaraja',
      viesti: 'Lukijaääni on lukenut sinulle jo pitkään tänään. '
        + 'Jatketaan huomenna.',
    };
  }
  return { ok: true, syy: null, viesti: null };
}

/**
 * Käyttörajojen tarkistus.
 *
 * Palauttaa aina saman muotoisen olion, jotta workerin ei tarvitse
 * päätellä virheviestiä itse. Viestit ovat suomeksi ja pelaajalle
 * ymmärrettäviä — ne näkyvät sellaisinaan chat-paneelissa.
 */
export function tarkistaRajat({
  paiva = 0,
  kuukausi = 0,
  paivaraja = PAIVARAJA_OLETUS,
  kuukausiraja = KUUKAUSIRAJA_OLETUS,
} = {}) {
  if (kuukausiraja > 0 && kuukausi >= kuukausiraja) {
    return {
      ok: false,
      syy: 'kuukausiraja',
      viesti: 'Livia on lentänyt tämän kuukauden matkansa. '
        + 'Siivet eivät ole lennätin — ensi kuussa jatketaan.',
    };
  }
  if (paivaraja > 0 && paiva >= paivaraja) {
    return {
      ok: false,
      syy: 'paivaraja',
      viesti: 'Livia on kantanut sinulle jo monta viestiä tänään. '
        + 'Siivet eivät ole lennätin. Huomenna lennän taas.',
    };
  }
  return { ok: true, syy: null, viesti: null };
}

/**
 * Onko pyynnön origin sallittu?
 *
 * Lista tulee ympäristömuuttujasta. Tyhjä lista tarkoittaa, ettei
 * mitään origineja ole vielä asetettu — silloin ei päästetä ketään
 * läpi, jotta puolivalmis asetus ei jää auki koko internetille.
 * Tähti (*) sallii kaikki; se on tarkoitettu vain paikalliseen
 * testaukseen ja OHJE.md varoittaa siitä.
 */
export function sallittuOrigin(origin, lista = []) {
  if (!lista.length) return false;
  if (lista.includes('*')) return true;
  if (!origin) return false;
  return lista.includes(origin.replace(/\/+$/, ''));
}

/** Pilkulla erotetun ympäristömuuttujan luku listaksi. */
export function lueLista(arvo) {
  return String(arvo ?? '')
    .split(',')
    .map((osa) => osa.trim().replace(/\/+$/, ''))
    .filter(Boolean);
}

/** Kokonaisluku ympäristömuuttujasta, oletus jos arvo puuttuu tai on roskaa. */
export function lueLuku(arvo, oletus) {
  const n = Number.parseInt(String(arvo ?? ''), 10);
  return Number.isFinite(n) && n >= 0 ? n : oletus;
}

/**
 * Siivoaa asiakkaalta tulleen tekstin: leikkaa pituuden ja poistaa
 * ohjausmerkit. Palvelin ei luota asiakkaaseen, vaikka pelin oma koodi
 * leikkaakin paketin jo omalla puolellaan.
 */
export function siivoaTeksti(teksti, katto = KONTEKSTIN_KATTO) {
  const puhdas = String(teksti ?? '')
    // Ohjausmerkit pois; rivinvaihdot ja sarkaimet saavat jäädä.
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, ' ')
    .trim();
  return puhdas.length > katto ? `${puhdas.slice(0, katto - 1)}…` : puhdas;
}

/**
 * Keskusteluhistorian siivous: vain tunnetut roolit, rajattu määrä ja
 * rajattu pituus. Viimeiset viestit ovat tärkeimmät, joten ylimäärä
 * leikataan alusta.
 */
export function siivoaHistoria(historia, maara = HISTORIAN_KATTO) {
  if (!Array.isArray(historia)) return [];
  return historia
    .filter((v) => v && (v.rooli === 'kayttaja' || v.rooli === 'pollo'))
    .slice(-maara)
    .map((v) => ({ rooli: v.rooli, teksti: siivoaTeksti(v.teksti, KYSYMYKSEN_KATTO * 4) }))
    .filter((v) => v.teksti);
}

/**
 * Vakioaikainen merkkijonovertailu.
 *
 * Kehittäjäkoodi on lyhyt salaisuus, ja tavallinen === kertoo
 * vastausajallaan, kuinka monta merkkiä osui. Ero on mikroskooppinen
 * ja verkon yli käytännössä mittaamaton, mutta oikea vertailu maksaa
 * kaksi riviä eikä sitä siksi jätetä tekemättä.
 *
 * Pituusero paljastuu (sitä ei voi piilottaa vertailemalla), mutta
 * silloinkin käydään koko silmukka läpi.
 */
export function vertaaSalaisuus(annettu, oikea) {
  const a = String(annettu ?? '');
  const b = String(oikea ?? '');
  if (!a || !b) return false;
  let ero = a.length ^ b.length;
  const pituus = Math.max(a.length, b.length);
  for (let i = 0; i < pituus; i += 1) {
    ero |= (a.charCodeAt(i % a.length) ?? 0) ^ (b.charCodeAt(i % b.length) ?? 0);
  }
  return ero === 0;
}

/**
 * Jatkokysymysten erotin mallin vastauksessa.
 *
 * Malli ohjeistetaan (worker.js JATKOKEHOTE) päättämään vastauksensa
 * riviin "JATKOT:" ja sen alle 2–3 kysymystä. Merkintä jäsennetään
 * TÄÄLLÄ PALVELIMELLA, jotta raaka merkintä ei voi missään tilanteessa
 * päätyä pelaajan ruudulle: peli saa erikseen vastauksen ja listan.
 */
const JATKOT_MERKKI = /^\s*jatkot\s*:?\s*$/i;

/**
 * Erottaa vastauksesta jatkokysymykset.
 *
 * @returns {{vastaus: string, jatkot: string[]}}
 */
export function poimiJatkot(teksti, maara = 3) {
  const rivit = String(teksti ?? '').split('\n');
  let raja = -1;
  for (let i = rivit.length - 1; i >= 0; i -= 1) {
    if (JATKOT_MERKKI.test(rivit[i])) { raja = i; break; }
  }
  if (raja < 0) return { vastaus: String(teksti ?? '').trim(), jatkot: [] };
  return {
    vastaus: rivit.slice(0, raja).join('\n').trim(),
    // Sama siivous kuin avausruudun ehdotuksilla: numerointi ja
    // ranskalaiset viivat pois, ei-kysymykset hylätään.
    jatkot: poimiEhdotukset(rivit.slice(raja + 1).join('\n'), maara),
  };
}

/**
 * STRIIMIN JATKOSUODATIN — JATKOT-lohko ei saa vilahtaa ruudulla.
 *
 * Suoratoistossa teksti välitetään pelaajalle sitä mukaa kuin se
 * syntyy, joten vastauksen perässä oleva "JATKOT:"-merkintä
 * kysymyksineen kirjoittuisi hetkeksi näkyviin ennen kuin se
 * poistetaan. Omistajan reunaehto 13.8.2026: sitä ei saa nähdä
 * kertaakaan.
 *
 * Suodatin pidättää siksi rivin verran tekstiä. Se päästää läpi vain
 * sen, mikä VARMASTI ei ole jatkorivin alku:
 *
 *   - Valmis rivi (rivinvaihtoon asti) tarkistetaan merkintää vastaan.
 *     Jos se on "JATKOT:", loppu striimistä menee jatkopuskuriin eikä
 *     asiakkaalle mene siitä enää mitään.
 *   - Keskeneräinen rivi päästetään heti, jos se ei voi enää kasvaa
 *     merkinnäksi ("Lontoon" ei ole "jatkot:"-alkuinen). Sen jälkeen
 *     rivi on "vapaa" ja loppuosa virtaa suoraan läpi.
 *   - Alku, joka voisi vielä kasvaa merkinnäksi ("J", "jat"), jää
 *     odottamaan seuraavaa palaa.
 *
 * Kokonainen vastaus jäsennetään lopuksi silti poimiJatkoilla
 * (worker.js), joten merkintä ei voi vuotaa vaikka suodatin
 * erehtyisikin.
 */
function voisiAlkaaJatkot(rivi) {
  const t = rivi.replace(/^\s+/, '').toLowerCase();
  return 'jatkot:'.startsWith(t) || /^jatkot\s*:?\s*$/.test(t);
}

export function luoJatkoSuodatin() {
  let jono = '';
  let vapaa = false;
  let jatkoissa = false;
  let jatkot = '';
  return {
    /** Uusi pala mallilta. Palauttaa sen tekstin, jonka saa näyttää. */
    lisaa(pala) {
      const teksti = String(pala ?? '');
      if (!teksti) return '';
      if (jatkoissa) { jatkot += teksti; return ''; }
      jono += teksti;
      let ulos = '';
      for (;;) {
        const i = jono.indexOf('\n');
        if (i >= 0) {
          if (!vapaa && JATKOT_MERKKI.test(jono.slice(0, i))) {
            jatkoissa = true;
            jatkot = jono.slice(i + 1);
            jono = '';
            return ulos;
          }
          ulos += jono.slice(0, i + 1);
          jono = jono.slice(i + 1);
          vapaa = false;
          continue;
        }
        if (vapaa || !voisiAlkaaJatkot(jono)) {
          vapaa = true;
          ulos += jono;
          jono = '';
        }
        return ulos;
      }
    },
    /** Striimin loppu: viimeinen pidätetty pala ja jatkojen raakateksti. */
    loppu() {
      if (jatkoissa) return { hanta: '', jatkot };
      if (!vapaa && JATKOT_MERKKI.test(jono)) return { hanta: '', jatkot: '' };
      const hanta = jono;
      jono = '';
      return { hanta, jatkot: '' };
    },
  };
}

/**
 * Mallin vastauksesta kysymysehdotuksiksi.
 *
 * Malli ohjeistetaan kirjoittamaan yksi kysymys riville, mutta pieni
 * malli lisää silti toisinaan numeroinnin, ranskalaiset viivat tai
 * johdantorivin. Tämä siivoaa ne pois ja hylkää rivit, jotka eivät ole
 * kysymyksiä.
 */
export function poimiEhdotukset(teksti, maara = 3) {
  return String(teksti ?? '')
    .split('\n')
    .map((rivi) => rivi.trim().replace(/^[-*•\d.)\s]+/, '').trim())
    .filter((rivi) => rivi.length > 6 && rivi.length <= 120 && rivi.includes('?'))
    .slice(0, maara);
}
