/*
 * "Maa numeroina" — lehden maaosaston tilastosivu (docs/valtion-analyysi.md).
 *
 * Kolme tehtävää:
 *  1. lataaMaakayrat() — hakee assets/data/maakayrat.json LAISKASTI
 *     vasta kun pelaaja avaa ensimmäisen Maa numeroina -sivun.
 *     Palvelutyöntekijä panee vastauksen koriin kuten muutkin omat
 *     tiedostot, joten toinen avaus toimii ilman verkkoa. Tiedostoa
 *     EI upoteta yhden tiedoston versioon — siellä tämä haku
 *     epäonnistuu ja sivu näyttää kohteliaan verkkoyhteysrivin.
 *  2. piirraMaaNumerot(kohde, iso, data, …) — käyrät ja pyramidi
 *     pelin mustekynän tyylillä (sama piirtotapa kuin js/saa.js:n
 *     vuosigraafissa — ei uutta grafiikkakieltä). Suomi kulkee
 *     jokaisessa käyrässä himmeänä vertailuviivana: absoluuttinen
 *     luku ei kerro lapselle mitään, mutta "meihin verrattuna"
 *     kertoo heti.
 *  3. tulkitse*-funktiot — yksi sääntöpohjainen lause käyrän alle
 *     pelin kertojan äänellä. Säännöt ovat koodissa (kynnysarvot +
 *     lausepohjat), jotta sama logiikka toimii kaikille maille ilman
 *     käsityötä. Sävy on utelias ja lämmin, ei arvottava: "maa
 *     vanhenee" on havainto, ei ongelma.
 *
 * Aukot piirretään aukkoina — käyrä katkeaa, ei interpolointia.
 */

const NS = 'http://www.w3.org/2000/svg';

let dataLupaus = null;

/**
 * Aineisto kerran per istunto; epäonnistunut haku palauttaa null ja
 * seuraava avaus yrittää uudestaan (siksi lupaus nollataan virheessä).
 */
export function lataaMaakayrat() {
  dataLupaus ??= fetch('assets/data/maakayrat.json')
    .then((v) => (v.ok ? v.json() : null))
    .catch(() => null)
    .then((data) => {
      if (!data) dataLupaus = null;
      return data;
    });
  return dataLupaus;
}

// ------------------------------------------------------------- apurit

/** Sarjan arvo vuodelta, tai null. */
function arvoVuonna(sarja, vuosi) {
  if (!sarja) return null;
  return sarja.arvot[vuosi - sarja.alku] ?? null;
}

/** Tuorein ei-tyhjä arvo ja sen vuosi. */
function tuorein(sarja) {
  if (!sarja) return null;
  for (let i = sarja.arvot.length - 1; i >= 0; i--) {
    if (sarja.arvot[i] !== null) return { arvo: sarja.arvot[i], vuosi: sarja.alku + i };
  }
  return null;
}

const NBSP = ' ';

/** Väkiluku sanoiksi: 5,6 milj. / 59 milj. / 1,7 mrd. / 390 000. */
export function muotoileVaki(n) {
  const desim = (x) => x.toFixed(1).replace('.', ',').replace(/,0$/, '');
  if (n >= 995e6) return `${desim(n / 1e9)}${NBSP}mrd.`;
  if (n >= 9.95e6) return `${Math.round(n / 1e6)}${NBSP}milj.`;
  if (n >= 0.95e6) return `${desim(n / 1e6)}${NBSP}milj.`;
  return `${Math.round(n / 1000)}${NBSP}000`;
}

// ------------------------------------------- sanalliset tulkinnat

/*
 * Pyramidin ikäluokat ovat 5 vuoden portaita: alle 15-vuotiaat ovat
 * kolme ensimmäistä, 65 vuotta täyttäneet luokasta 13 (65–69) ylös.
 */
function ikaosuudet(pyramidi) {
  const summa = (lista, alku, loppu) => lista.slice(alku, loppu).reduce((a, b) => a + b, 0);
  const kaikki = summa(pyramidi.miehet, 0, 21) + summa(pyramidi.naiset, 0, 21);
  if (!kaikki) return null;
  return {
    lapset: (summa(pyramidi.miehet, 0, 3) + summa(pyramidi.naiset, 0, 3)) / kaikki,
    isovanhemmat: (summa(pyramidi.miehet, 13, 21) + summa(pyramidi.naiset, 13, 21)) / kaikki,
  };
}

export function tulkitsePyramidi(pyramidi) {
  const osuudet = ikaosuudet(pyramidi);
  if (!osuudet) return null;
  const { lapset, isovanhemmat } = osuudet;
  if (lapset >= 0.42) return 'Melkein joka toinen asukas on alle 15-vuotias — maa on hyvin nuori.';
  if (lapset >= 0.3) return 'Joka kolmas asukas on alle 15-vuotias — maa on nuori.';
  if (lapset >= 0.24) return 'Joka neljäs asukas on alle 15-vuotias — lapsia on paljon.';
  if (isovanhemmat > lapset) return 'Isovanhempien ikäisiä on jo enemmän kuin lapsia — maa vanhenee.';
  return 'Nuoria ja vanhoja on melkein yhtä paljon.';
}

export function tulkitseVakiluku(vakiluku) {
  const nytVuosi = vakiluku.ennusteAlku - 1;
  const nyt = arvoVuonna(vakiluku, nytVuosi);
  const alku = vakiluku.arvot.find((a) => a !== null);
  const lopussa = vakiluku.arvot.at(-1);
  if (!nyt || !alku) return null;
  if (lopussa && lopussa < nyt * 0.97) {
    return `Käyrä taittuu: vuonna 2050 asukkaita odotetaan olevan vähemmän kuin nyt.`;
  }
  const kerroin = nyt / alku;
  if (kerroin >= 3.5 && lopussa > nyt * 1.03) {
    return `Asukkaita on nyt ${Math.round(kerroin)} kertaa niin paljon kuin vuonna 1950 — ja käyrä nousee yhä.`;
  }
  if (lopussa > nyt * 1.03) return 'Väki kasvaa yhä, ja ennuste jatkaa nousua vuoteen 2050.';
  return 'Väkiluku on tasaantunut: ennuste kulkee lähes vaakasuoraan.';
}

export function tulkitseBkt(bkt, suomiBkt, oma = false) {
  const nyt = tuorein(bkt);
  const suomi = tuorein(suomiBkt);
  if (!nyt || !suomi) return null;
  if (oma) return 'Tämä on vertailuviivan maa — muita käyriä verrataan tähän.';
  const suhde = nyt.arvo / suomi.arvo;
  if (suhde >= 1.2) return 'Tuloja asukasta kohti on enemmän kuin Suomessa.';
  if (suhde >= 0.85) return 'Elintaso on suunnilleen Suomen tasoa.';
  if (suhde >= 0.55) return 'Tulot asukasta kohti ovat noin kaksi kolmasosaa Suomen tasosta.';
  if (suhde >= 0.35) return 'Tulot asukasta kohti ovat noin puolet Suomen tasosta.';
  if (suhde >= 0.15) return 'Tulot asukasta kohti ovat noin neljäsosa Suomen tasosta.';
  return 'Tulot asukasta kohti ovat murto-osa Suomen tasosta.';
}

export function tulkitseElinika(elinika) {
  const nyt = tuorein(elinika);
  if (!nyt) return null;
  const alku = elinika.arvot.find((a) => a !== null);
  const ero = Math.round(nyt.arvo - alku);
  if (ero >= 3) {
    return `Vastasyntyneen odotetaan elävän ${Math.round(nyt.arvo)}-vuotiaaksi — `
      + `${ero} vuotta pidempään kuin vuonna ${elinika.alku}.`;
  }
  return `Vastasyntyneen odotetaan elävän ${Math.round(nyt.arvo)}-vuotiaaksi.`;
}

export function tulkitseKaupungistuminen(sarja) {
  const nyt = tuorein(sarja);
  if (!nyt) return null;
  const kymmenesta = Math.round(nyt.arvo / 10);
  const ylitys = sarja.arvot.findIndex((a) => a !== null && a >= 50);
  if (nyt.arvo < 50) {
    return `Kaupungeissa asuu ${kymmenesta} kymmenestä — useimmat asuvat yhä maaseudulla.`;
  }
  const ensimmainen = sarja.arvot.find((a) => a !== null);
  if (ensimmainen >= 50) {
    return `Kaupungeissa on asuttu pitkään: jo vuonna ${sarja.alku} yli puolet väestä asui kaupungissa.`;
  }
  return `Joka toinen asui kaupungissa ensi kertaa vuonna ${sarja.alku + ylitys} — nyt ${kymmenesta} kymmenestä.`;
}

/*
 * Sivun avaava yleisluonnehdinta (omistajan palaute 10.8.2026:
 * "voisi olla alussa tekstimuotoinen yleisluonnehdinta"). Kootaan
 * datasta 2–3 virkettä, jotka piirtävät maan yhdellä silmäyksellä —
 * eri sanoin kuin käyrien omat tulkintarivit, ettei sivu toista
 * itseään. Sävy sama kuin tulkinnoissa: havainto, ei arvio.
 */
export function yleisluonnehdinta(maa, suomi, omaSivuOnSuomen) {
  const virkkeet = [];
  const nyt = maa.vakiluku
    ? arvoVuonna(maa.vakiluku, maa.vakiluku.ennusteAlku - 1) : null;
  const osuudet = maa.pyramidi ? ikaosuudet(maa.pyramidi) : null;
  if (nyt) {
    let ika = '';
    if (osuudet) {
      if (osuudet.lapset >= 0.3) ika = ', ja sen väestö on nuorta';
      else if (osuudet.isovanhemmat > osuudet.lapset) ika = ', ja sen väestö harmaantuu';
    }
    virkkeet.push(`Tämä on ${muotoileVaki(nyt)} asukkaan maa${ika}.`);
  }
  const bkt = tuorein(maa.bkt);
  const suomiBkt = tuorein(suomi?.bkt);
  if (bkt && suomiBkt && !omaSivuOnSuomen) {
    const suhde = bkt.arvo / suomiBkt.arvo;
    if (suhde >= 1.2) virkkeet.push('Elintaso on Suomea korkeampi');
    else if (suhde >= 0.85) virkkeet.push('Elintaso on samaa luokkaa kuin Suomessa');
    else if (suhde >= 0.45) virkkeet.push('Elintaso jää Suomesta selvästi');
    else virkkeet.push('Elintaso on murto-osa Suomen tasosta');
    const kaup = tuorein(maa.kaupungistuminen);
    if (kaup) {
      virkkeet[virkkeet.length - 1] += `, ja kaupungeissa asuu ${Math.round(kaup.arvo / 10)} kymmenestä.`;
    } else {
      virkkeet[virkkeet.length - 1] += '.';
    }
  }
  const elinika = tuorein(maa.elinika);
  if (elinika) {
    virkkeet.push(`Täällä syntyvä lapsi elää keskimäärin ${Math.round(elinika.arvo)}-vuotiaaksi.`);
  }
  return virkkeet.length ? virkkeet.join(' ') : null;
}

export function tulkitseCo2(co2, suomiCo2) {
  const nyt = tuorein(co2);
  if (!nyt) return null;
  let huippu = { arvo: -Infinity, vuosi: null };
  co2.arvot.forEach((a, i) => {
    if (a !== null && a > huippu.arvo) huippu = { arvo: a, vuosi: co2.alku + i };
  });
  if (huippu.vuosi < nyt.vuosi - 5 && nyt.arvo < huippu.arvo * 0.7) {
    return `Päästöt asukasta kohti ovat kääntyneet laskuun — huippu oli vuonna ${huippu.vuosi}.`;
  }
  const suomi = tuorein(suomiCo2);
  if (!suomi) return null;
  const suhde = nyt.arvo / suomi.arvo;
  if (suhde < 0.5) return 'Päästöt asukasta kohti ovat alle puolet Suomen tasosta.';
  if (suhde > 1.5) return 'Päästöt asukasta kohti ovat selvästi suuremmat kuin Suomessa.';
  return 'Päästöt asukasta kohti ovat suunnilleen Suomen tasoa.';
}

// ---------------------------------------------------------- piirto

/*
 * Mitoitus on kiinteä viewBox kuten js/saa.js:ssä: SVG skaalautuu
 * koteloonsa ja tekstikoot on valittu sen mukaan.
 */
const L = 300;
const K = 150;
const VASEN = 36;
const OIKEA = 290;
const YLA = 12;
const ALA = 128;

function svgPohja(seloste, korkeus = K) {
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${L} ${korkeus}`);
  svg.setAttribute('class', 'maakayra');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', seloste);
  return svg;
}

function el(svg, nimi, attrs, teksti = null) {
  const e = document.createElementNS(NS, nimi);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  if (teksti != null) e.textContent = teksti;
  svg.appendChild(e);
  return e;
}

/*
 * Yläraja pyöristettynä somaan lukemaan. Tikapuissa on myös 1,5, 3,
 * 6 ja 8, jottei käyrä jää puolikkaaksi: 59 miljoonan maa saa rajan
 * 60, ei 100 — puoliväli 30 on yhä selkeä lukema.
 */
function somaYlaraja(suurin) {
  if (!(suurin > 0)) return 1;
  const kymppi = 10 ** Math.floor(Math.log10(suurin));
  for (const kerroin of [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]) {
    if (suurin <= kerroin * kymppi) return kerroin * kymppi;
  }
  return 10 * kymppi;
}

/**
 * Aikasarja muste+kulta-tyylillä. Kultainen pääkäyrä, Suomi ohuena
 * musteviivana taustalla, ennusteosa himmeämmällä musteella ja
 * "Silloin ja nyt" -jälki akselin reunassa. Aukoissa viiva katkeaa.
 */
/*
 * `lisat` on vertailunäkymän lisäsarjat: [{ sarja, luokka }]. Yhden
 * maan sivu ei käytä sitä lainkaan (sarja + suomi + toinen kuten
 * ennen), joten sen taitto ja värit pysyivät ennallaan, kun
 * karttanäkymän vertailu (v321) tuli rinnalle. Asteikko lasketaan
 * kaikista sarjoista, myös lisätyistä — muuten neljäs maa piirtyisi
 * kehyksen ulkopuolelle.
 */
function piirraKayra({
  seloste, sarja, suomi, toinen = null, lisat = [], jakaja = 1,
  ennusteAlku = null, silloin = null, katto = null, korkeus = K,
}) {
  /*
   * Valinnainen matalampi kehys (omistajan palaute 10.8.2026: "osa
   * voisi olla pienempiä niin sivuun saisi rytmiä") — pohjaviivan
   * etäisyys alareunasta pysyy vakiona, vain piirtoalue madaltuu.
   */
  const ala = korkeus - (K - ALA);
  const svg = svgPohja(seloste, korkeus);
  const sarjat = [sarja, suomi, toinen, ...lisat.map((l) => l.sarja)].filter(Boolean);
  const alku = Math.min(...sarjat.map((s) => s.alku));
  const loppu = Math.max(...sarjat.map((s) => s.alku + s.arvot.length)) - 1;
  const suurin = Math.max(
    ...sarjat.flatMap((s) => s.arvot.filter((a) => a !== null)),
    silloin?.arvo ?? 0,
  );
  // Kiinteä katto (esim. prosenttiasteikon 100) pitää puolivälin
  // apuviivan merkityksellisenä: 50 on "joka toinen".
  const ylaraja = katto ?? somaYlaraja(suurin / jakaja) * jakaja;
  const x = (vuosi) => VASEN + ((vuosi - alku) / (loppu - alku)) * (OIKEA - VASEN);
  const y = (arvo) => ala - (arvo / ylaraja) * (ala - YLA);

  // Vaaka-apuviivat ja asteikko vasempaan reunaan (nolla on pohjaviiva).
  for (const osa of [0.5, 1]) {
    const arvo = ylaraja * osa;
    el(svg, 'line', { class: 'maakayra-apuviiva', x1: VASEN, y1: y(arvo), x2: OIKEA, y2: y(arvo) });
    const luku = arvo / jakaja;
    el(svg, 'text', {
      class: 'maakayra-akseli', x: VASEN - 4, y: y(arvo) + 3, 'text-anchor': 'end',
    }, `${luku % 1 ? luku.toFixed(1).replace('.', ',') : luku}`);
  }

  // Vuosiluvut: neljännesvuosisata pitkälle, muuten tiheämmin.
  const jana = loppu - alku;
  const askel = jana >= 90 ? 25 : jana >= 50 ? 20 : 10;
  for (let vuosi = Math.ceil(alku / askel) * askel; vuosi <= loppu; vuosi += askel) {
    el(svg, 'text', {
      class: 'maakayra-akseli', x: x(vuosi), y: ala + 11, 'text-anchor': 'middle',
    }, `${vuosi}`);
    el(svg, 'line', { class: 'maakayra-apuviiva', x1: x(vuosi), y1: ala, x2: x(vuosi), y2: ala + 2.5 });
  }

  /*
   * Viiva piirretään pätkinä: null katkaisee, ja yksinäinen havainto
   * aukkojen keskellä saa pisteen, ettei se katoa kokonaan.
   */
  const patkat = (s, ehto) => {
    const ulos = [];
    let patka = [];
    s.arvot.forEach((arvo, i) => {
      const vuosi = s.alku + i;
      if (arvo === null || !ehto(vuosi)) {
        if (patka.length) ulos.push(patka);
        patka = [];
        return;
      }
      patka.push([x(vuosi), y(arvo)]);
    });
    if (patka.length) ulos.push(patka);
    return ulos;
  };
  const piirraPatkat = (lista, luokka) => {
    for (const pisteet of lista) {
      if (pisteet.length === 1) {
        el(svg, 'circle', { class: `${luokka}-piste`, cx: pisteet[0][0].toFixed(1), cy: pisteet[0][1].toFixed(1), r: 1.6 });
      } else {
        el(svg, 'polyline', {
          class: luokka,
          points: pisteet.map(([px, py]) => `${px.toFixed(1)},${py.toFixed(1)}`).join(' '),
        });
      }
    }
  };

  if (suomi) piirraPatkat(patkat(suomi, () => true), 'maakayra-suomi');
  // Vertailunäkymän lisämaat oman maan käyrän alle: jokainen omalla
  // värillään, ennusteen rajaa erottelematta (ks. kommentti alla).
  for (const { sarja: lisa, luokka } of lisat) {
    if (lisa) piirraPatkat(patkat(lisa, () => true), luokka);
  }
  // Vertailulinssin toinen maa punaruskealla — Suomen viivan päälle,
  // maan oman käyrän alle. Ennusteen rajaa ei eroteta: vertailussa
  // katsotaan muotoa, ja kaksi katkoluokkaa lisää olisi vain melua.
  if (toinen) piirraPatkat(patkat(toinen, () => true), 'maakayra-toinen');
  // Ennusteen raja: historia kulkee rajavuoteen asti, ennuste jatkaa
  // siitä himmeämpänä. Rajavuosi kuuluu molempiin, jotta viiva jatkuu.
  const raja = ennusteAlku ?? Infinity;
  piirraPatkat(patkat(sarja, (vuosi) => vuosi <= raja - 1), 'maakayra-viiva');
  if (ennusteAlku) {
    piirraPatkat(patkat(sarja, (vuosi) => vuosi >= raja - 1), 'maakayra-ennuste');
    el(svg, 'text', {
      class: 'maakayra-akseli maakayra-ennusteteksti',
      x: x(Math.min(raja + 2, loppu)),
      y: YLA + 6,
    }, 'ennuste');
  }

  /*
   * "Silloin ja nyt": isoisän matkan aikakausi (1873) on ennen
   * asteikon alkua, joten jälki piirretään akselin reunaan sen
   * korkeudelle, jolla väki silloin oli — pieni rengas ja vuosiluku.
   */
  if (silloin) {
    el(svg, 'circle', {
      class: 'maakayra-silloin', cx: VASEN, cy: y(silloin.arvo).toFixed(1), r: 2.6,
    });
    el(svg, 'text', {
      class: 'maakayra-akseli maakayra-silloinvuosi',
      x: VASEN + 5,
      y: Math.max(YLA + 6, y(silloin.arvo) - 4),
    }, `${silloin.vuosi}`);
  }

  el(svg, 'line', { class: 'maakayra-pohjaviiva', x1: VASEN, y1: ala, x2: OIKEA, y2: ala });
  return svg;
}

/**
 * Väestöpyramidi: miehet vasemmalle mustella, naiset oikealle
 * kullalla, nuorimmat alhaalla. Ainoa uusi piirtokomponentti — muoto
 * kertoo tarinan, joten numeroakselia ei tarvita: palkin pituus on
 * osuus koko väestöstä.
 */
function piirraPyramidi(pyramidi, ryhmat, toinen = null) {
  const KORKEUS = 168;
  const svg = svgPohja(`Väestöpyramidi vuodelta ${pyramidi.vuosi}`, KORKEUS);
  // Keskikäytävä on ikänumeroiden koti — sen on oltava numeron
  // levyinen, etteivät palkit aja lukemien yli.
  const keski = 150;
  const kaytava = 10;
  const leveinta = 96;
  const ala = 150;
  const yla = 16;
  const riviVali = (ala - yla) / ryhmat.length;
  const palkki = riviVali - 1.4;
  const kaikki = [...pyramidi.miehet, ...pyramidi.naiset].reduce((a, b) => a + b, 0);
  const toinenKaikki = toinen
    ? [...toinen.miehet, ...toinen.naiset].reduce((a, b) => a + b, 0)
    : 0;
  /*
   * Sama asteikko molemmille maille: palkin pituus on ikäluokan osuus
   * OMAN maan väestöstä, ja jakaja on suurin osuus kummasta tahansa —
   * muodot ovat silloin suoraan vertailukelpoisia eikä kumpikaan
   * vuoda kehyksen yli.
   */
  const isoin = Math.max(
    ...pyramidi.miehet.map((a) => a / kaikki),
    ...pyramidi.naiset.map((a) => a / kaikki),
    ...(toinen && toinenKaikki
      ? [...toinen.miehet, ...toinen.naiset].map((a) => a / toinenKaikki)
      : [0]),
  );
  const leveys = (arvo) => (arvo / kaikki / isoin) * leveinta;

  el(svg, 'text', { class: 'maakayra-akseli', x: keski - 12, y: yla - 6, 'text-anchor': 'end' }, 'miehet');
  el(svg, 'text', { class: 'maakayra-akseli', x: keski + 12, y: yla - 6 }, 'naiset');

  ryhmat.forEach((nimi, i) => {
    const yPohja = ala - i * riviVali;
    const m = leveys(pyramidi.miehet[i]);
    const n = leveys(pyramidi.naiset[i]);
    if (m > 0) {
      el(svg, 'rect', {
        class: 'pyramidi-miehet',
        x: (keski - kaytava - m).toFixed(1),
        y: (yPohja - palkki).toFixed(1),
        width: m.toFixed(1),
        height: palkki.toFixed(1),
      });
    }
    if (n > 0) {
      el(svg, 'rect', {
        class: 'pyramidi-naiset',
        x: keski + kaytava,
        y: (yPohja - palkki).toFixed(1),
        width: n.toFixed(1),
        height: palkki.toFixed(1),
      });
    }
    // Ikä joka neljännen portaan kohdalle keskikäytävään.
    if (i % 4 === 0) {
      el(svg, 'text', {
        class: 'maakayra-akseli pyramidi-ika',
        x: keski,
        y: (yPohja - palkki / 2 + 2.4).toFixed(1),
        'text-anchor': 'middle',
      }, `${i * 5}`);
    }
  });
  /*
   * Vertailumaa piirretään porrasviivana palkkien päälle: ääriviiva
   * näyttää muodon peittämättä palkkeja. Portaan x on ikäluokan osuus
   * vertailumaan omasta väestöstä samalla jakajalla kuin palkit.
   */
  if (toinen && toinenKaikki) {
    const porras = (arvot, suunta) => {
      let polku = '';
      ryhmat.forEach((_, i) => {
        const w = (arvot[i] / toinenKaikki / isoin) * leveinta;
        const x = (keski + suunta * (kaytava + w)).toFixed(1);
        polku += `${i ? 'L' : 'M'}${x},${(ala - i * riviVali).toFixed(1)} `
          + `L${x},${(ala - (i + 1) * riviVali).toFixed(1)} `;
      });
      return polku;
    };
    el(svg, 'path', { class: 'pyramidi-vertailu', d: porras(toinen.miehet, -1) });
    el(svg, 'path', { class: 'pyramidi-vertailu', d: porras(toinen.naiset, 1) });
  }
  el(svg, 'line', {
    class: 'maakayra-pohjaviiva',
    x1: keski - kaytava - leveinta,
    y1: ala,
    x2: keski + kaytava + leveinta,
    y2: ala,
  });
  return svg;
}

// ------------------------------------------------------------- sivu

function lohko(kohde, otsikko, kuvio, tulkinta) {
  const osa = document.createElement('div');
  osa.className = 'maakayra-lohko';
  const h = document.createElement('h4');
  h.className = 'maakayra-otsikko';
  h.textContent = otsikko;
  osa.appendChild(h);
  osa.appendChild(kuvio);
  if (tulkinta) {
    const p = document.createElement('p');
    p.className = 'maakayra-tulkinta';
    p.textContent = tulkinta;
    osa.appendChild(p);
  }
  kohde.appendChild(osa);
  return osa;
}

/**
 * Koko sivun sisältö otsikon alle.
 *
 * `demokratia` on pelin oma V-Dem-tieto (js/packs/*-maatiedot.js) —
 * sitä ei haeta uudestaan, vaan näytetään tässä yhteydessä uudelleen.
 *
 * Vapaa maavertailu EI ole enää tällä sivulla (v321): se muutti
 * karttanäkymään, jossa maat valitaan kartalta ja piirretään
 * piirraVertailu-funktiolla. Tämä sivu on yhden maan sivu, jolla
 * Suomi kulkee himmeänä vertailuviivana kuten alusta asti.
 */
export function piirraMaaNumerot(kohde, iso, data, { demokratia = null } = {}) {
  const maa = data.maat[iso];
  const suomi = data.maat.FIN;
  const omaSivuOnSuomen = iso === 'FIN';
  const kaveri = null;
  const vertailu = omaSivuOnSuomen ? null : suomi;

  // Yleisluonnehdinta ensin isolla (omistajan palaute 10.8.2026),
  // sitten vanha metarivi pienempänä lukuohjeena.
  const luonne = yleisluonnehdinta(maa, suomi, omaSivuOnSuomen);
  if (luonne) {
    const ingressi = document.createElement('p');
    ingressi.className = 'numeroina-ingressi';
    ingressi.textContent = luonne;
    kohde.appendChild(ingressi);
  }
  const johdanto = document.createElement('p');
  johdanto.className = 'johdanto';
  johdanto.textContent = omaSivuOnSuomen
    ? 'Muutama käyrä kertoo, mihin suuntaan maa on kulkenut.'
    : 'Muutama käyrä kertoo, mihin suuntaan maa on kulkenut. Ohut viiva on Suomi — sitä vasten luvut saavat mittakaavan.';
  kohde.appendChild(johdanto);

  const ristikko = document.createElement('div');
  ristikko.className = 'maakayrat';
  kohde.appendChild(ristikko);

  // Väestöpyramidi ensin: se on sivun ainoa uusi kuviotyyppi ja
  // kertoo yhdellä silmäyksellä, onko maa nuori vai vanheneva.
  if (maa.pyramidi) {
    lohko(ristikko, `Ikärakenne ${maa.pyramidi.vuosi}`,
      piirraPyramidi(maa.pyramidi, data.meta.pyramidiRyhmat, kaveri?.pyramidi ?? null),
      tulkitsePyramidi(maa.pyramidi));
  }

  if (maa.vakiluku) {
    const miljoonissa = Math.max(...maa.vakiluku.arvot.filter((a) => a !== null)) >= 2e6;
    const osa = lohko(ristikko, `Väkiluku, ${miljoonissa ? 'miljoonaa' : 'tuhatta'} asukasta`,
      piirraKayra({
        seloste: 'Väkiluku 1950–2050',
        sarja: maa.vakiluku,
        suomi: vertailu?.vakiluku,
        toinen: kaveri?.vakiluku,
        jakaja: miljoonissa ? 1e6 : 1e3,
        ennusteAlku: maa.vakiluku.ennusteAlku,
        silloin: maa.silloin,
      }),
      tulkitseVakiluku(maa.vakiluku));
    /*
     * "Silloin ja nyt": isoisän päiväkirja sitoo numerot pelin
     * tarinaan. Vanha ääni saa oman rivinsä käyrän alle.
     */
    if (maa.silloin) {
      const nyt = arvoVuonna(maa.vakiluku, maa.vakiluku.ennusteAlku - 1);
      if (nyt) {
        const rivi = document.createElement('p');
        rivi.className = 'maakayra-silloinrivi';
        // muotoileVaki päättyy usein pisteeseen (milj., mrd.) — ei toista.
        rivi.textContent = (`Isoisän käydessä täällä vuonna ${maa.silloin.vuosi} asukkaita oli `
          + `noin ${muotoileVaki(maa.silloin.arvo)} — nyt ${muotoileVaki(nyt)}.`).replace(/\.\.$/, '.');
        osa.appendChild(rivi);
      }
    }
  }

  if (maa.bkt) {
    lohko(ristikko, 'Tulot asukasta kohti, tuhatta dollaria vuodessa',
      piirraKayra({
        seloste: 'Bruttokansantuote asukasta kohti, ostovoimakorjattu',
        sarja: maa.bkt,
        suomi: vertailu?.bkt,
        toinen: kaveri?.bkt,
        jakaja: 1e3,
      }),
      tulkitseBkt(maa.bkt, suomi?.bkt, omaSivuOnSuomen));
  }

  if (maa.elinika) {
    lohko(ristikko, 'Elinajanodote, vuotta',
      piirraKayra({
        seloste: 'Vastasyntyneen odotettu elinikä',
        sarja: maa.elinika,
        suomi: vertailu?.elinika,
        toinen: kaveri?.elinika,
        korkeus: 106,
      }),
      tulkitseElinika(maa.elinika));
  }

  if (maa.kaupungistuminen) {
    lohko(ristikko, 'Kaupungeissa asuvien osuus, %',
      piirraKayra({
        seloste: 'Kaupungistumisaste',
        sarja: maa.kaupungistuminen,
        suomi: vertailu?.kaupungistuminen,
        toinen: kaveri?.kaupungistuminen,
        katto: 100,
        korkeus: 106,
      }),
      tulkitseKaupungistuminen(maa.kaupungistuminen));
  }

  if (maa.co2) {
    lohko(ristikko, 'Hiilidioksidipäästöt asukasta kohti, tonnia vuodessa',
      piirraKayra({
        seloste: 'Hiilidioksidipäästöt asukasta kohti',
        sarja: maa.co2,
        suomi: vertailu?.co2,
        toinen: kaveri?.co2,
        korkeus: 106,
      }),
      tulkitseCo2(maa.co2, suomi?.co2));
  }

  /*
   * Demokratiaindeksi on jo pelissä (V-Dem, maatiedot-paketit) —
   * kerrataan tässä samassa yhteydessä pienenä rivinä, ei käyränä.
   */
  if (demokratia?.arvo) {
    const rivi = document.createElement('p');
    rivi.className = 'maakayra-tulkinta maakayra-vdem';
    // Sija samassa muodossa kuin maaosaston tunnusluvuissa: (37./179).
    rivi.textContent = `Demokratiaindeksi (V-Dem): ${demokratia.arvo}`
      + (demokratia.sija ? ` (${demokratia.sija})` : '') + '.';
    kohde.appendChild(rivi);
  }

  // Lähderivi hakupäivineen tulee datatiedostosta, ei käsin.
  const lahde = document.createElement('p');
  lahde.className = 'lahde maakayra-lahde';
  lahde.textContent = data.meta.lahderivi
    + (maa.silloin ? ` · Gapminder (${maa.silloin.vuosi})` : '')
    + (demokratia?.arvo ? ' · V-Dem' : '');
  kohde.appendChild(lahde);
}

/*
 * ---------------------------------------------------------------
 * VERTAILUNÄKYMÄ (v321): 2–4 maata samoilla asteikoilla
 * ---------------------------------------------------------------
 *
 * Omistajan malli 7.8.2026: vertailu ei asu enää Tutki-ikkunan
 * sivulla vaan avautuu suoraan karttanäkymästä, jossa maat valitaan
 * kartalta. Tämä funktio piirtää sen näkymän sisällön.
 *
 * Työnjako ui.js:n kanssa: TÄMÄ MODUULI EI TUNNE PELIN PAKETTEJA.
 * Pienoiskartat ja tunnusluvut ovat pelin omaa aineistoa
 * (map.countryShapes, MAATIEDOT), joten kutsuja rakentaa ne valmiiksi
 * elementeiksi ja antaa ne `kortit`-listassa. Näin sama moduuli
 * piirtää yhä yhden maan sivun tietämättä kummastakaan mitään.
 *
 * Väestöpyramidi ja sanalliset tulkinnat jäävät pois: ne kertovat
 * yhdestä maasta kerrallaan, eikä neljää pyramidia voi lukea
 * rinnakkain samasta kehyksestä. Ne ovat yhä yhden maan sivulla.
 */
export const VERTAILUVARIT = [
  'maakayra-viiva', 'maakayra-toinen', 'maakayra-kolmas', 'maakayra-neljas',
];

/** Käyrälohko, jossa jokainen valittu maa on omalla värillään. */
function vertailuLohko(ristikko, otsikko, seloste, valitut, kentta, asetukset = {}) {
  const kanssa = valitut.filter((v) => v.maa?.[kentta]);
  if (kanssa.length < 1) return;
  lohko(ristikko, otsikko, piirraKayra({
    seloste,
    sarja: kanssa[0].maa[kentta],
    suomi: null,
    lisat: kanssa.slice(1).map((v) => ({ sarja: v.maa[kentta], luokka: v.luokka })),
    ...asetukset,
  }), null);
}

/**
 * Vertailunäkymän sisältö: maiden kortit ylös, käyrät niiden alle.
 *
 * `isot` on valittujen maiden ISO-3-tunnukset siinä järjestyksessä,
 * jossa pelaaja ne valitsi — järjestys päättää värin, ja sama väri
 * näkyy kartalla, alapalkissa ja käyrissä.
 *
 * `kortit` on kutsujan rakentama taulu: { ISO: { nimi, kartta,
 * tunnusluvut } }, jossa kartta ja tunnusluvut ovat valmiita
 * elementtejä tai null.
 */
export function piirraVertailu(kohde, isot, data, { kortit = {} } = {}) {
  kohde.replaceChildren();
  const valitut = isot
    .map((iso, i) => ({
      iso,
      maa: data.maat[iso],
      luokka: VERTAILUVARIT[i] ?? VERTAILUVARIT[VERTAILUVARIT.length - 1],
      kortti: kortit[iso] ?? null,
    }))
    .filter((v) => v.maa);

  if (!valitut.length) {
    const tyhja = document.createElement('p');
    tyhja.className = 'johdanto';
    tyhja.textContent = 'Näistä maista ei ole tilastosarjoja.';
    kohde.appendChild(tyhja);
    return;
  }

  /*
   * Maiden kortit: pienoiskartta ja tunnusluvut samassa muodossa kuin
   * Tutki-ikkunan maaosaston alussa (omistajan toive). Värilaatta
   * nimen edessä sitoo kortin käyrän viivaan.
   */
  const rivi = document.createElement('div');
  rivi.className = 'vertailu-kortit';
  for (const v of valitut) {
    const kortti = document.createElement('div');
    kortti.className = `vertailu-kortti ${v.luokka}-kortti`;
    const nimi = document.createElement('p');
    nimi.className = 'vertailu-kortti-nimi';
    const laatta = document.createElement('span');
    laatta.className = `vertailu-laatta ${v.luokka}-laatta`;
    nimi.appendChild(laatta);
    nimi.appendChild(document.createTextNode(v.kortti?.nimi ?? v.iso));
    kortti.appendChild(nimi);
    if (v.kortti?.kartta) kortti.appendChild(v.kortti.kartta);
    if (v.kortti?.tunnusluvut) kortti.appendChild(v.kortti.tunnusluvut);
    rivi.appendChild(kortti);
  }
  kohde.appendChild(rivi);

  const ristikko = document.createElement('div');
  ristikko.className = 'maakayrat';
  kohde.appendChild(ristikko);

  const vaki = valitut.filter((v) => v.maa.vakiluku);
  const miljoonissa = vaki.length
    && Math.max(...vaki.flatMap((v) => v.maa.vakiluku.arvot.filter((a) => a !== null))) >= 2e6;
  vertailuLohko(ristikko, `Väkiluku, ${miljoonissa ? 'miljoonaa' : 'tuhatta'} asukasta`,
    'Väkiluku 1950–2050', valitut, 'vakiluku', { jakaja: miljoonissa ? 1e6 : 1e3 });
  vertailuLohko(ristikko, 'Tulot asukasta kohti, tuhatta dollaria vuodessa',
    'Bruttokansantuote asukasta kohti, ostovoimakorjattu', valitut, 'bkt', { jakaja: 1e3 });
  vertailuLohko(ristikko, 'Elinajanodote, vuotta',
    'Vastasyntyneen odotettu elinikä', valitut, 'elinika');
  vertailuLohko(ristikko, 'Kaupungeissa asuvien osuus, %',
    'Kaupungistumisaste', valitut, 'kaupungistuminen', { katto: 100 });
  vertailuLohko(ristikko, 'Hiilidioksidipäästöt asukasta kohti, tonnia vuodessa',
    'Hiilidioksidipäästöt asukasta kohti', valitut, 'co2');

  const lahde = document.createElement('p');
  lahde.className = 'lahde maakayra-lahde';
  lahde.textContent = data.meta.lahderivi;
  kohde.appendChild(lahde);
}
