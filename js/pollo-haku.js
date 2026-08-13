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
 *   - kohdekarttojen pisteiden NIMET (KAUPUNKIKARTAT): ne liitetään
 *     niihin merkintöihin, jotka puhuvat kyseisestä kohteesta
 *     (ks. liitaKohdenimet)
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

/*
 * OSUVUUSKYNNYS (omistajan huomio 12.8.2026: Ateenan torikysymys sai
 * linkin Syyrian historiaan).
 *
 * Haku palautti ennen aina neljä parasta, olivatpa ne kuinka heikkoja
 * tahansa. Yksi yleinen sana riitti: "Mitä Ateenan torilla tapahtui?"
 * osui kaikkeen, missä mainittiin tori. Nyt osumalta vaaditaan kolme
 * asiaa, ja mieluummin ei yhtään katkelmaa kuin epäolennainen:
 *
 *   1. AVAINSANA. Kysymyksen harvinaisimmat sanat ovat sen aihe.
 *      Osuman on osuttava vähintään yhteen niistä — pelkkä "torilla"
 *      ei kelpaa, kun kysymyksen aihe on "Ateenan".
 *   2. POHJAPISTE. Alle pohjan jäävä osuma on käytännössä aina
 *      sattuma (yksi yleinen sana leipätekstissä).
 *   3. SUHTEELLINEN KYNNYS. Jos joukossa on selvästi paras osuma,
 *      selvästi heikommat eivät kulje sen mukana.
 *
 * Luvut on viritetty ajamalla oikeita kysymyksiä koko aineistoa
 * vasten; ks. tests/pollo.test.mjs, jossa samat tapaukset ovat
 * vartiotesteinä.
 */
export const HAUN_POHJAPISTE = 15;
export const HAUN_SUHDEKYNNYS = 0.8;
export const HAUN_AVAINSANARAJA = 0.9;

/**
 * Pelaajan sijainnin kerroin.
 *
 * Kysymys kysytään lähes aina siitä paikasta, jossa pelaaja seisoo.
 * Nykyisen kaupungin ja maan omat jutut nostetaan siksi selvästi muiden
 * edelle — kaksinkertainen piste riittää kääntämään kilpailun oman
 * maan hyväksi silloinkin, kun vieraassa jutussa sattuu olemaan sama
 * sana otsikossa.
 */
export const HAUN_SIJAINTIKERROIN = 2;

/** Montako pelinsisäistä linkkiä vastauksen yhteydessä enintään näytetään. */
export const POLLON_LINKKIKATTO = 2;

/** Ankkurisanan vähimmäispituus vastaustekstissä (ks. ankkuriSanat). */
const ANKKURIN_VAHIMMAISPITUUS = 5;

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
  /*
   * Kysymyksen kehys, ei sen aihe. Nämä lisättiin osuvuuskorjauksen
   * yhteydessä (12.8.2026): ilman niitä "Millainen sää täällä on
   * talvella?" nosti kärkeen jutun, jonka leipätekstissä sattui
   * lukemaan "millainen", ja "Mitä Tokiossa kannattaa nähdä?" haki
   * osumia sanoilla "kannattaa" ja "nähdä".
   */
  'millainen', 'millaista', 'millaisia', 'minkälainen', 'minkalainen',
  'paljonko', 'montako', 'monta', 'kannattaa', 'nähdä', 'nahda',
  'tapahtui', 'tapahtuu', 'tiedätkö', 'tiedatko', 'osaatko', 'tarkoittaa',
  'olisi', 'pitäisi', 'pitaisi', 'sitten', 'muuta', 'tässä', 'tassa',
  'tuolla', 'ihan',
]);

/**
 * Nähtävyysnimien yleissanat.
 *
 * Kohdekartan pisteiden nimet liitetään merkintöihin nimiankkureiksi
 * (liitaKohdenimet), mutta pelkkä "torni" tai "museo" ei nimeä mitään:
 * se tarttuisi vastaustekstissä ensimmäiseen torniin maailmassa.
 * Moniosaisissa nimissä yleissana saa jäädä pois, koska nimestä
 * vaaditaan kaikkien JÄLJELLE JÄÄVIEN sanojen osuma — "Prahan
 * kansallismuseo" tunnistuu yhä sanasta "prahan".
 */
const KOHTEEN_YLEISSANAT = new Set([
  'torni', 'tornit', 'museo', 'museon', 'kirkko', 'kirkot', 'silta', 'sillat',
  'satama', 'satamat', 'teatteri', 'asema', 'linna', 'linnake', 'linnoitus',
  'palatsi', 'puisto', 'aukio', 'portti', 'katedraali', 'moskeija', 'temppeli',
  'basaari', 'koulu', 'panimo', 'laituri', 'laiturit', 'hautausmaa', 'majakka',
  'kirjasto', 'yliopisto', 'sairaala', 'tuomiokirkko', 'raatihuone',
  'eläintarha', 'elaintarha', 'kaupungintalo',
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
    // Kohdekartan pisteiden nimet, joista tämä merkintä puhuu. Täytetään
    // indeksin lopuksi (liitaKohdenimet).
    nimiSanat: [],
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
 * Nähtävyyskohteen nimen tunnistavat sanat, nimimuoto kerrallaan.
 *
 * Sulkumuoto on oma nimensä: "Pyhän Tapanin kirkko (Stephansdom)"
 * tunnistuu kummastakin puolikkaasta erikseen, koska pöllö voi käyttää
 * vastauksessaan kumpaa tahansa. Yhdysviiva ja muut välimerkit
 * pilkkovat nimen sanoiksi (sanoita), joten "Eiffel-torni" tunnistuu
 * sanasta "eiffel" ja yleissana "torni" jää pois.
 *
 * @returns {string[][]} lista sanaryhmiä; ryhmä osuu vain kokonaan
 */
export function kohteenNimiSanat(nimi) {
  const ryhmat = [];
  for (const osa of String(nimi ?? '').split(/[()[\]]/)) {
    const sanat = sanoita(osa).filter((sana) => sana.length >= ANKKURIN_VAHIMMAISPITUUS
      && !OHITETTAVAT.has(sana) && !KOHTEEN_YLEISSANAT.has(sana));
    if (sanat.length) ryhmat.push([...new Set(sanat)]);
  }
  return ryhmat;
}

/**
 * Kohdekarttojen pisteiden nimet kaupungeittain.
 *
 * Lähteitä on kaksi ja ne täydentävät toisiaan: kartan pisteet
 * (KAUPUNKIKARTAT) kattavat myös ne kohteet, joilla ei ole omaa juttua
 * — kuten Wienin Schönbrunn, joka on kartan kainalossa mutta jonka
 * juttu asuu kaupunkilehden sivulla.
 *
 * Kaupungin oman nimen kokoinen yksisanainen nimi jätetään pois
 * ("Kuwait-tornit" kaupungissa kuwait): se osuisi kaupungin jokaiseen
 * juttuun eikä kertoisi mistään yhdestä kohteesta.
 */
function keraaKohdenimet(kohdekartat = {}, nahtavyydet = {}) {
  const ulos = {};
  const lisaa = (kaupunki, nimi) => {
    for (const ryhma of kohteenNimiSanat(nimi)) {
      if (ryhma.length === 1 && yhteinenAlku(ryhma[0], String(kaupunki)) >= Math.min(5, ryhma[0].length)) {
        continue;
      }
      const avain = ryhma.join(' ');
      const lista = (ulos[kaupunki] ??= []);
      if (!lista.some((r) => r.join(' ') === avain)) lista.push(ryhma);
    }
  };
  for (const [kaupunki, kartta] of Object.entries(kohdekartat ?? {})) {
    for (const kohde of kartta?.kohteet ?? []) lisaa(kaupunki, kohde?.nimi);
  }
  for (const [kaupunki, kohteet] of Object.entries(nahtavyydet ?? {})) {
    for (const nimi of Object.keys(kohteet ?? {})) lisaa(kaupunki, nimi);
  }
  return ulos;
}

/**
 * Liittää kohteiden nimet niihin merkintöihin, jotka puhuvat niistä.
 *
 * OMISTAJAN HAVAINTO 13.8.2026 (Wien): vastaus mainitsi Stephansdomin,
 * Hofburgin ja Schönbrunnin, mutta yksikään ei linkittynyt. Syy oli
 * indeksissä: merkinnän tunnistesanat tulivat pelkästä OTSIKOSTA, ja
 * Schönbrunnista kertovan noston otsikko on "Keisarin aamiaishuone
 * eläintarhan keskellä" — nimeä ei ollut missään, mihin linkin olisi
 * voinut sitoa.
 *
 * Nyt kohteen nimi liitetään merkintään, jonka tekstissä se esiintyy.
 * Nimi menee sekä otsikkosanoihin (se painaa haussa kuin otsikko —
 * kohteen nimi on juuri se, mistä juttu kertoo) että nimiankkureihin,
 * joista linkki sidotaan vastaustekstiin.
 *
 * Nähtävyysjutut jätetään väliin: niiden otsikko ON kohteen nimi, ja
 * naapurikohteen nimen liittäminen tekisi linkistä väärään juttuun
 * osoittavan.
 */
function liitaKohdenimet(merkinnat, kohdenimet) {
  for (const m of merkinnat) {
    if (m.tyyppi === 'nahtavyys') continue;
    const ryhmat = kohdenimet[m.omistaja];
    if (!ryhmat?.length) continue;
    for (const ryhma of ryhmat) {
      const osuuKaikki = ryhma.every((sana) => osuu(m.tekstiSanat, sana)
        || osuu(m.otsikkoSanat, sana));
      if (!osuuKaikki) continue;
      for (const sana of ryhma) {
        if (!m.nimiSanat.includes(sana)) m.nimiSanat.push(sana);
        if (!m.otsikkoSanat.includes(sana)) m.otsikkoSanat.push(sana);
      }
    }
  }
}

/**
 * Rakentaa hakuindeksin. Kutsutaan kerran, laiskasti.
 *
 * @returns {{merkinnat: Array, kesto: number, sanoja: number}}
 */
export function rakennaIndeksi({
  kulttuuri = {}, maat = {}, nahtavyydet = {}, kohdekartat = {},
} = {}) {
  const alku = (globalThis.performance ?? Date).now();
  const merkinnat = [];
  lisaaKategoriat(merkinnat, kulttuuri, 'kaupunki');
  lisaaKategoriat(merkinnat, maat, 'maa');
  lisaaNahtavyydet(merkinnat, nahtavyydet);
  liitaKohdenimet(merkinnat, keraaKohdenimet(kohdekartat, nahtavyydet));
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
 * Ankkurisanat, joilla katkelman voi sitoa vastaustekstiin.
 *
 * Pöllön vastauksesta etsitään kohta, joka puhuu samasta asiasta, ja se
 * kohta muutetaan linkiksi (js/pollo.js korostaLinkit). Sanat tulevat
 * VAIN pelin omasta indeksistä — merkinnän nimisanoista, otsikosta ja
 * aiheen nimestä — eivät koskaan mallin tekstistä. Lyhyet ja yleiset
 * sanat jätetään pois, jottei linkki tarttuisi sanaan "ruoka" keskellä
 * lausetta.
 *
 * Järjestys on tarkkuusjärjestys. Nähtävyysjutussa otsikko ON kohteen
 * nimi, joten se tulee ensin; muissa merkinnöissä ensimmäisenä ovat
 * kohdekartalta liitetyt nimet (liitaKohdenimet), koska "Schönbrunn"
 * nimeää kohteen tarkemmin kuin otsikko "Keisarin aamiaishuone
 * eläintarhan keskellä". Aiheen nimi on aina viimeisenä.
 */
export function ankkuriSanat(m) {
  const ulos = [];
  const lisaa = (teksti) => {
    for (const sana of sanoita(teksti)) {
      if (sana.length < ANKKURIN_VAHIMMAISPITUUS) continue;
      if (OHITETTAVAT.has(sana)) continue;
      if (!ulos.includes(sana)) ulos.push(sana);
    }
  };
  const nimet = () => {
    for (const sana of m?.nimiSanat ?? []) if (!ulos.includes(sana)) ulos.push(sana);
  };
  if (m?.tyyppi === 'nahtavyys') {
    lisaa(m?.otsikko);
    nimet();
  } else {
    nimet();
    lisaa(m?.otsikko);
  }
  lisaa(m?.aiheNimi);
  return ulos;
}

/** Kahden sanan yhteisen alkuosan pituus. */
function yhteinenAlku(a, b) {
  const raja = Math.min(a.length, b.length);
  let i = 0;
  while (i < raja && a[i] === b[i]) i += 1;
  return i;
}

/**
 * Etsii vastaustekstistä kohdan, joka puhuu samasta asiasta.
 *
 * Palauttaa {alku, loppu} — merkkivälin, joka voidaan muuttaa linkiksi
 * — tai null, jos luontevaa kohtaa ei ole. Suomen taivutuksen takia
 * vertailu tehdään yhteisellä alkuosalla eikä tasan: "Akropolis" saa
 * osua sanaan "Akropoliin", mutta "kivet" ei sanaan "kivistä".
 *
 * @param {string} teksti mallin vastaus
 * @param {string[]} ankkurit ankkuriSanat()-lista pelin omasta indeksistä
 */
export function etsiAnkkuri(teksti, ankkurit = []) {
  const koko = String(teksti ?? '');
  if (!koko || !ankkurit?.length) return null;
  const sanat = [...koko.matchAll(/[0-9a-zà-öø-ÿåäöÅÄÖ]+/gi)];
  for (const ankkuri of ankkurit) {
    for (const osuma of sanat) {
      const sana = osuma[0].toLowerCase();
      if (sana.length < ANKKURIN_VAHIMMAISPITUUS) continue;
      const vaadittu = Math.min(6, sana.length, ankkuri.length);
      if (yhteinenAlku(sana, ankkuri) < vaadittu) continue;
      return { alku: osuma.index, loppu: osuma.index + osuma[0].length };
    }
  }
  return null;
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
 *   sijainti   { kaupunki: cityId, maa: ISO } — näiden omat jutut
 *              painotetaan ylös (HAUN_SIJAINTIKERROIN)
 *   kynnys     false ohittaa osuvuuskynnyksen (vain työkaluja varten)
 */
export function haeKatkelmat(indeksi, kysymys, {
  maara = 4, onVastattu = null, nimet = {}, sijainti = {}, kynnys = true,
} = {}) {
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
  const painot = tiheys.map((df) => Math.max(Math.log(yhteensa / (1 + df)), 0.05));
  /*
   * Kysymyksen avainsanat: harvinaisimmat sanat kertovat, mistä
   * kysymys on. Raja on suhteellinen, jotta lyhyt kysymys ("Mikä on
   * Akropolis?") toimii samalla säännöllä kuin pitkä.
   */
  const suurinPaino = painot.length ? Math.max(...painot) : 0;
  const avainsana = painot.map((paino) => paino >= HAUN_AVAINSANARAJA * suurinPaino);

  const pisteet = [];
  for (const { m, rivi } of osumat) {
    let piste = 0;
    let avaimia = 0;
    for (const [i, otsikossa, tekstissa] of rivi) {
      const paino = painot[i];
      if (otsikossa) piste += OTSIKON_PAINO * paino * (otsikossa === 2 ? TARKAN_OSUMAN_KERROIN : 1);
      if (tekstissa) piste += TEKSTIN_PAINO * paino * (tekstissa === 2 ? TARKAN_OSUMAN_KERROIN : 1);
      if (avainsana[i]) avaimia += 1;
    }
    // Pelaajan oma kaupunki ja maa painavat selvästi enemmän.
    const oma = Boolean((sijainti?.kaupunki && m.omistaja === sijainti.kaupunki)
      || (sijainti?.maa && m.omistaja === sijainti.maa));
    if (oma) piste *= HAUN_SIJAINTIKERROIN;
    if (kynnys && (avaimia < 1 || piste < HAUN_POHJAPISTE)) continue;
    pisteet.push({ m, piste, oma });
  }
  pisteet.sort((a, b) => b.piste - a.piste || b.m.teksti.length - a.m.teksti.length);
  const paras = pisteet[0]?.piste ?? 0;
  const kelvolliset = kynnys
    ? pisteet.filter(({ piste }) => piste >= HAUN_SUHDEKYNNYS * paras)
    : pisteet;
  const katkelmat = kelvolliset.slice(0, maara).map(({ m, piste, oma }) => ({
    piste,
    oma,
    leima: lahdeLeima(m, nimet),
    teksti: m.teksti.length > KATKELMAN_KATTO
      ? `${m.teksti.slice(0, KATKELMAN_KATTO - 1)}…`
      : m.teksti,
    lahde: m.lahde,
    // Sanat, joilla katkelman voi sitoa vastaustekstin kohtaan.
    ankkurit: ankkuriSanat(m),
    // Avausreitti pelin sisään. Linkit rakennetaan TÄSTÄ eikä mallin
    // tekstistä, joten pöllö ei voi keksiä rikkinäistä linkkiä.
    reitti: m.reitti ? { ...m.reitti, leima: lahdeLeima(m, nimet) } : null,
  }));
  return { katkelmat, kesto: (globalThis.performance ?? Date).now() - alku };
}
