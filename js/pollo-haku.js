/*
 * VIISAAN PÖLLÖN PAIKALLINEN TIETOHAKU.
 *
 * Ennen kuin kysymys lähtee välityspalvelimelle, pelin OMASTA
 * tarkistetusta aineistosta haetaan muutama osuvin katkelma ja ne
 * liitetään pyyntöön. Näin pöllö vastaa ensisijaisesti sillä tiedolla,
 * joka on jo kertaalleen tarkistettu ja lähteistetty — eikä sillä, mitä
 * malli sattuu muistavansa.
 *
 * MITÄ INDEKSOIDAAN (kaikki tarkistettua tietosisältöä, ei tarinaa)
 *   - kaupunkilehtien aihesivut (KULTTUURI_KATEGORIAT): johdannot ja nostot
 *   - maalehtien aihesivut (MAA_KATEGORIAT): johdannot ja nostot
 *   - kohdekarttojen nähtävyysjutut (NAHTAVYYSJUTUT) lainauksineen
 *   - aihesivun minitehtävän fakta VAIN jos pelaaja on jo vastannut
 *     siihen (ks. onVastattu alla)
 *
 * MITÄ EI INDEKSOIDA — EIKÄ SAA INDEKSOIDA
 *   - Tarinakaanon kokonaan: saapumismerkinnät, kohtaamiset,
 *     tarinakaaret ja aarretekstit. Niissä on juonisisältöä (seuraaja,
 *     revitty sivu, aarteiden sijainnit), eikä pöllö ole tarinan hahmo.
 *   - Visakysymykset, niiden vaihtoehdot ja oikeat vastaukset —
 *     minkään pakan kysymyspankkia ei lueta lainkaan. Kysymyspankkien
 *     fakta-kentät jäävät myös pois: fakta on kirjoitettu kysymyksen
 *     pariksi ja sanoo usein suoraan oikean vastauksen, eikä
 *     kysymyspankissa ole kenttää, josta erottaisi mikä kysymys on
 *     kenelläkin auki. Lehden minitehtävän fakta sen sijaan kelpaa
 *     vastaamisen JÄLKEEN: silloin peli on jo näyttänyt sen pelaajalle.
 *
 * Indeksi rakennetaan laiskasti — vasta kun pöllö avataan ensimmäisen
 * kerran, ei pelin käynnistyksessä.
 */

/** Katkelman katto merkkeinä. Pitkästä nostosta otetaan alkupää. */
const KATKELMAN_KATTO = 700;

/*
 * Otsikko-osuma painaa enemmän kuin leipätekstiosuma, ja TARKKA
 * sanaosuma enemmän kuin pelkkä alkuosuma.
 *
 * Painot on viritetty oikeilla kysymyksillä (12.8.2026). Ilman tarkan
 * osuman bonusta kysymys "Mitä Stonehengen kivistä tiedetään?" palautti
 * Borobudurin: aineiston otsikko "…omista kivistään" alkaa hakusanalla
 * "kivistä", ja pelkkä alkuosuma otsikossa voitti tarkan osuman
 * "Stonehengen" leipätekstissä.
 */
const OTSIKON_PAINO = 2;
const TEKSTIN_PAINO = 1;
const TARKAN_OSUMAN_KERROIN = 2.5;

/** Hakusanan vähimmäispituus. Lyhyemmät ovat sidesanoja. */
const SANAN_VAHIMMAISPITUUS = 3;

/**
 * Suomen yleisimmät sidesanat. Ne osuisivat kaikkeen eivätkä kertoisi
 * mitään siitä, mistä kysymys on.
 */
const OHITETTAVAT = new Set([
  'mikä', 'mika', 'mitä', 'mita', 'miksi', 'miten', 'kuka', 'ketkä', 'ketka',
  'missä', 'missa', 'mistä', 'mista', 'mihin', 'milloin', 'kuinka', 'onko',
  'oli', 'olivat', 'ovat', 'olla', 'sen', 'tämä', 'tama', 'tuo', 'siellä',
  'siella', 'täällä', 'taalla', 'että', 'etta', 'mutta', 'kun', 'niin',
  'myös', 'myos', 'vielä', 'viela', 'sekä', 'seka', 'joka', 'jossa', 'jonka',
  'voi', 'saa', 'ole', 'olen', 'kerro', 'kerrotko', 'kertoisitko',
]);

/** Merkkijono sanoiksi: pienet kirjaimet, vain kirjaimet ja numerot. */
export function sanoita(teksti) {
  return String(teksti ?? '')
    .toLowerCase()
    .split(/[^0-9a-zà-öø-ÿåäö]+/i)
    .filter((sana) => sana.length >= SANAN_VAHIMMAISPITUUS);
}

/** Kysymyksen hakusanat: sanoitus ilman sidesanoja, ilman toistoja. */
export function hakusanat(kysymys) {
  return [...new Set(sanoita(kysymys).filter((sana) => !OHITETTAVAT.has(sana)))];
}

/**
 * Yksi indeksimerkintä.
 *
 * `reitti` on YLEINEN avausreitti, ei lehtioletus: {tyyppi, tunniste,
 * sivu?, kohde?, otsikko}. Pöllö rakentaa siitä napautettavan linkin
 * vastauksensa alle (js/pollo.js avaaKohde). Uusi sisältötyyppi
 * (esim. tulevat pidemmät artikkelit) tarvitsee vain oman
 * reittityyppinsä ja sitä vastaavan avausrivin — ei muutoksia hakuun.
 */
function merkinta({
  tyyppi, omistaja, aihe, aiheNimi, otsikko, teksti,
  lahde = null, tehtavaAvain = null, reitti = null,
}) {
  const puhdas = String(teksti ?? '').replace(/\s+/g, ' ').trim();
  if (!puhdas) return null;
  return {
    tyyppi,
    omistaja,
    aihe,
    aiheNimi,
    otsikko: String(otsikko ?? '').trim(),
    teksti: puhdas,
    lahde,
    tehtavaAvain,
    reitti,
    otsikkoSanat: [...new Set(sanoita(otsikko))],
    tekstiSanat: [...new Set(sanoita(puhdas))],
  };
}

/** Lisää kategorian (kaupunki- tai maalehden aihesivu) merkinnät. */
function lisaaKategoriat(ulos, taulu, tyyppi) {
  for (const [omistaja, kategoriat] of Object.entries(taulu ?? {})) {
    for (const kategoria of kategoriat ?? []) {
      const reitti = {
        tyyppi: tyyppi === 'maa' ? 'maalehti' : 'kaupunkilehti',
        tunniste: omistaja,
        sivu: kategoria.id,
        otsikko: kategoria.nimi ?? kategoria.id,
      };
      const yhteinen = {
        tyyppi, omistaja, aihe: kategoria.id, aiheNimi: kategoria.nimi ?? kategoria.id, reitti,
      };
      const johdanto = merkinta({
        ...yhteinen,
        otsikko: kategoria.nimi ?? kategoria.id,
        teksti: kategoria.johdanto,
      });
      if (johdanto) ulos.push(johdanto);
      for (const nosto of kategoria.nostot ?? []) {
        const m = merkinta({
          ...yhteinen,
          otsikko: nosto.otsikko,
          teksti: [nosto.aika, nosto.teksti].filter(Boolean).join(' — '),
          lahde: nosto.lahde ?? null,
        });
        if (m) ulos.push(m);
      }
      /*
       * Minitehtävän fakta on tarkistettua tietoa, mutta se on myös
       * tehtävän vastauksen selitys. Se otetaan mukaan merkittynä
       * tehtäväavaimella, ja haku ottaa sen käyttöön vasta kun
       * pelaaja on ratkaissut kyseisen sivun tehtävän.
       */
      if (kategoria.tehtava?.fakta) {
        const m = merkinta({
          ...yhteinen,
          tyyppi: 'fakta',
          otsikko: kategoria.nimi ?? kategoria.id,
          teksti: kategoria.tehtava.fakta,
          tehtavaAvain: kategoria.id,
        });
        if (m) ulos.push(m);
      }
    }
  }
}

/** Lisää kohdekarttojen nähtävyysjutut. */
function lisaaNahtavyydet(ulos, taulu) {
  for (const [kaupunki, kohteet] of Object.entries(taulu ?? {})) {
    for (const [nimi, juttu] of Object.entries(kohteet ?? {})) {
      const osat = [juttu.aika, juttu.teksti];
      if (juttu.lainaus?.teksti) {
        osat.push(`"${juttu.lainaus.teksti}" — ${juttu.lainaus.lahde ?? ''}`);
      }
      const m = merkinta({
        tyyppi: 'nahtavyys',
        omistaja: kaupunki,
        aihe: 'nahtavyys',
        aiheNimi: 'Kohdekartta',
        otsikko: nimi,
        teksti: osat.filter(Boolean).join(' '),
        reitti: {
          tyyppi: 'nahtavyys', tunniste: kaupunki, kohde: nimi, otsikko: nimi,
        },
      });
      if (m) ulos.push(m);
    }
  }
}

/**
 * Rakentaa hakuindeksin. Kutsutaan kerran, laiskasti.
 *
 * @returns {{merkinnat: Array, kesto: number, sanoja: number}}
 */
export function rakennaIndeksi({ kulttuuri = {}, maat = {}, nahtavyydet = {} } = {}) {
  const alku = (globalThis.performance ?? Date).now();
  const merkinnat = [];
  lisaaKategoriat(merkinnat, kulttuuri, 'kaupunki');
  lisaaKategoriat(merkinnat, maat, 'maa');
  lisaaNahtavyydet(merkinnat, nahtavyydet);
  const kesto = (globalThis.performance ?? Date).now() - alku;
  const sanoja = merkinnat.reduce((s, m) => s + m.tekstiSanat.length, 0);
  return { merkinnat, kesto, sanoja };
}

/**
 * Osuuko hakusana johonkin sanaan alkuosumana?
 *
 * Palauttaa 0 (ei osumaa), 1 (alkuosuma) tai 2 (tarkka sanaosuma).
 *
 * Vertailu tehdään MOLEMPIIN suuntiin, koska suomi taivuttaa kysyjän
 * sanan yhtä hyvin kuin aineiston sanan: "Stonehengen kivistä" ei
 * osuisi aineiston sanaan "Stonehenge", jos katsottaisiin vain että
 * aineiston sana alkaa hakusanalla. Toiseen suuntaan vaaditaan
 * vähintään viisi merkkiä, jottei lyhyt aineistosana ala osua kaikkeen.
 */
const TAKAPERIN_VAHIMMAISPITUUS = 5;

function osuu(sanat, hakusana) {
  let paras = 0;
  for (const sana of sanat) {
    if (sana === hakusana) return 2;
    if (sana.startsWith(hakusana)) paras = 1;
    else if (sana.length >= TAKAPERIN_VAHIMMAISPITUUS && hakusana.startsWith(sana)) paras = 1;
  }
  return paras;
}

/**
 * Lähdeleima, jonka pöllö näkee ja voi mainita vastauksessaan.
 *
 * Esim. "Kiinan maalehti / Kuvataide: Sinipunainen posliini".
 */
export function lahdeLeima(m, nimet = {}) {
  const nimi = m.tyyppi === 'maa'
    ? (nimet.maa?.(m.omistaja) ?? m.omistaja)
    : (nimet.kaupunki?.(m.omistaja) ?? m.omistaja);
  const lehti = m.tyyppi === 'maa' ? `${nimi} — maalehti`
    : m.tyyppi === 'nahtavyys' ? `${nimi} — kohdekartta`
      : `${nimi} — kaupunkilehti`;
  const otsikko = m.otsikko && m.otsikko !== m.aiheNimi ? `: ${m.otsikko}` : '';
  return `${lehti} / ${m.aiheNimi}${otsikko}`;
}

/**
 * Hakee osuvimmat katkelmat.
 *
 * @param {object} indeksi rakennaIndeksin tulos
 * @param {string} kysymys pelaajan kysymys
 * @param {object} asetukset
 *   maara      montako katkelmaa enintään
 *   onVastattu (merkinta) => boolean — palauttaa tosi, jos merkinnän
 *              tehtävä on jo ratkaistu. Ilman tätä fakta-merkinnät
 *              jätetään aina pois (varovainen oletus).
 *   nimet      { kaupunki(id), maa(iso) } lähdeleimoja varten
 */
export function haeKatkelmat(indeksi, kysymys, { maara = 4, onVastattu = null, nimet = {} } = {}) {
  const alku = (globalThis.performance ?? Date).now();
  const sanat = hakusanat(kysymys);
  if (!indeksi?.merkinnat?.length || !sanat.length) {
    return { katkelmat: [], kesto: 0 };
  }
  /*
   * Kaksi kierrosta, koska yleinen sana ei saa voittaa harvinaista.
   *
   * Ilman painotusta kysymys "Mitä Stonehengen kivistä tiedetään?"
   * palautti Borobudurin ja Sakkaran: sanat "kivistä" ja "tiedetään"
   * osuvat satoihin merkintöihin, kun taas "Stonehengen" osuu yhteen.
   * Siksi ensimmäinen kierros laskee, moneenko merkintään kukin
   * hakusana osuu, ja toinen painottaa harvinaiset sanat raskaiksi
   * (käänteinen esiintymistiheys).
   */
  const osumat = [];
  const tiheys = new Array(sanat.length).fill(0);
  for (const m of indeksi.merkinnat) {
    // Vastaamaton minitehtävän fakta ei tule hakuun: se selittäisi
    // vastauksen tehtävään, joka pelaajalla on vielä auki.
    if (m.tyyppi === 'fakta' && !(onVastattu?.(m) ?? false)) continue;
    let rivi = null;
    for (let i = 0; i < sanat.length; i += 1) {
      const otsikossa = osuu(m.otsikkoSanat, sanat[i]);
      const tekstissa = osuu(m.tekstiSanat, sanat[i]);
      if (!otsikossa && !tekstissa) continue;
      tiheys[i] += 1;
      (rivi ??= []).push([i, otsikossa, tekstissa]);
    }
    if (rivi) osumat.push({ m, rivi });
  }

  const yhteensa = Math.max(indeksi.merkinnat.length, 1);
  const painot = tiheys.map((df) => Math.log(yhteensa / (1 + df)));
  const pisteet = [];
  for (const { m, rivi } of osumat) {
    let piste = 0;
    for (const [i, otsikossa, tekstissa] of rivi) {
      const paino = Math.max(painot[i], 0.05);
      if (otsikossa) piste += OTSIKON_PAINO * paino * (otsikossa === 2 ? TARKAN_OSUMAN_KERROIN : 1);
      if (tekstissa) piste += TEKSTIN_PAINO * paino * (tekstissa === 2 ? TARKAN_OSUMAN_KERROIN : 1);
    }
    pisteet.push({ m, piste });
  }
  pisteet.sort((a, b) => b.piste - a.piste || b.m.teksti.length - a.m.teksti.length);
  const katkelmat = pisteet.slice(0, maara).map(({ m, piste }) => ({
    piste,
    leima: lahdeLeima(m, nimet),
    teksti: m.teksti.length > KATKELMAN_KATTO
      ? `${m.teksti.slice(0, KATKELMAN_KATTO - 1)}…`
      : m.teksti,
    lahde: m.lahde,
    // Avausreitti pelin sisään. Linkit rakennetaan TÄSTÄ eikä mallin
    // tekstistä, joten pöllö ei voi keksiä rikkinäistä linkkiä.
    reitti: m.reitti ? { ...m.reitti, leima: lahdeLeima(m, nimet) } : null,
  }));
  return { katkelmat, kesto: (globalThis.performance ?? Date).now() - alku };
}
