/*
 * LAATTAPYRAMIDI — yksi maailmanlaajuinen kartta, näkyvät laatat vain.
 *
 * Omistajan päälinjaus 30.8.2026 (Raamattu, "YKSI MAAILMANBITTIKARTTA -
 * MAALEHDISTA LUOVUTAAN", sanatarkka: *"koko maailma on kokoajan yksi
 * iso bittikartta josta vain ladataan kulloinkin tarvittava palanen,
 * riippumatta siita onko maailma paalla vai ei? Maailma nappi pitaisi
 * vain ja ainoastaan rajoittaa miten pitkalle pelaaja voi panoroida
 * kartalla."*).
 *
 * Laatat tekee tools/generoi-laattapyramidi.mjs ja ne asuvat ämpärissä
 * polussa `pyramidi/z<taso>/<sarake>/<rivi>.webp`. Luettelo
 * (`pyramidi.json`) kertoo arkin paikan laudalla, laattakoon ja tasojen
 * mitat — peli ei arvaa niistä mitään.
 *
 * === TÄMÄ ON PELIN AINOA KARTTAPOHJA ===============================
 *
 * Omistajan päätös 30.8.2026, sanatarkka: *"Ei kun poista kaikki muut
 * vaihtoehdot käytöstä ja kytke peliin vain tämä uusi kartta, ei mitään
 * muuta."* ja *"Joo, ei pidetä mitään varajärjestelmiä yllä."*
 * Kytkintä (`?pyramidi`), kehittäjävalikon riviä ja vanhaa
 * maakohtaista fokuslehtijärjestelmää EI OLE — ne purettiin
 * kokonaisuudessaan, eikä pyramidille ole varajärjestelmää.
 *
 * === MIKSI SVG-KUVIA EIKÄ CANVASTA =================================
 *
 * Laatat ovat `<image>`-elementteinä laudan koordinaateissa. Silloin kartan oma siirtokuori liikuttaa niitä
 * kompositorilla eikä yksikään kehys maalaa niitä uudelleen — juuri se,
 * mitä Raamatun "BITTIKARTTA VAIHEET 2-3" vaatii ("kartan kooste elää
 * KARTTAKUOREN SISÄLLÄ"). Ruutuavaruudessa elävä canvas mitattiin
 * kahdeksan kertaa hitaammaksi, eikä sitä siis tehdä.
 *
 * === KOLME SÄÄNTÖÄ =================================================
 *
 * 1. VAIN NÄKYVÄT LAATAT, JA PUSKURI YMPÄRILLE. Näkyvän alueen
 *    ympärille ladataan yhden laatan reunus, jotta yksi sormiliike ei
 *    ehdi paljastaa tyhjää. Sama peruste kuin laudan oman bittikartan
 *    täydennyksellä (js/ui.js taydennaTaide).
 *
 * 2. VANHA TASO EI KATOA ENNEN KUIN UUSI ON PAIKALLAAN. Zoomatessa
 *    taso vaihtuu, ja jos edellisen tason laatat poistettaisiin heti,
 *    ruudulla välähtäisi tyhjä pergamentti sen sekunnin, jonka uudet
 *    laatat latautuvat. Vanha taso jää siksi alle kunnes uuden tason
 *    näkyvät laatat ovat kaikki latautuneet.
 *
 * 3. LAUTA KIERTÄÄ, EIKÄ KIERROS OLE LAATTAKOON MONIKERTA.
 *    Tason leveys on 675 · 2^z pikseliä (86 400 syvimmällä), eikä
 *    yksikään niistä ole jaollinen 512:lla — viimeinen sarake on siis
 *    VAJAA. Kierto ei siksi ole "sarake modulo sarakkeiden määrä"
 *    tasavälisellä ruudukolla: se veisi laatan 128 pikseliä väärään
 *    kohtaan päivämääränrajan takana. Kierros on `taso.leveys`
 *    PIKSELIÄ, ja laatan paikka lasketaan KIERROKSITTAIN:
 *    sarake c kierroksella k on pikselissä k · leveys + c · laatta.
 */
import { el } from './mapart.js';
import { pyramidiUrl } from './media.js';

/** Laattoja näkyvän alueen ympärille joka suuntaan. */
const PUSKURI = 1;

/**
 * Minkä laudan pyramidi kattaa.
 *
 * ARKKI ON MAAILMANKARTAN ARKKI (docs/moduulit/laattapyramidi.md luku 1:
 * 84 °N…66 °S, leveys 12000 lautayksikköä), ja laatan paikka lasketaan
 * suoraan siitä. Katselutilan maanosalaudoilla (?lauta=africa) sama
 * laskenta osoittaisi laatat aivan väärään kohtaan, joten pyramidi ei
 * kuulu niille — ne piirtävät oman karttansa kuten ennenkin.
 *
 * Tämä EI ole kytkin eikä varajärjestelmä: se on arkin identiteetti.
 * Pelilaudalla kartta on aina ja vain pyramidi.
 */
const PYRAMIDIN_LAUTA = 'maailmankartta';

/**
 * Kattaako laattapyramidi tämän laudan?
 *
 * Kutsutaan laudan pystytyksestä (js/ui.js drawBoard): kun pyramidi
 * kattaa laudan, laudan omaa pohjamaalausta — pergamenttia, mantereita,
 * maastoa — EI piirretä lainkaan. Laatat ovat pohjakerros, ja vanha
 * piirros jäisi niiden alle näkymättömiin: latauksen alussa se ehti
 * välähtää ruudulla (omistajan TestFlight-havainto 30.8.2026: *"Peli
 * piirtää alle ensin sen vanhan kartan ja sitten päälle sen uuden."*).
 */
export function pyramidiKattaa(lauta) {
  return lauta === PYRAMIDIN_LAUTA;
}

/* ------------------------------------------------------------ luettelo */

/*
 * Luettelo haetaan kerran istuntoa kohti. Moduulitasolla eikä
 * UI-oliossa: tiedosto ei muutu kesken istunnon, eikä uusi peli saa
 * aloittaa hakua alusta.
 */
let luettelo = null;
let luetteloHaku = null;

async function haeLuettelo() {
  if (luettelo) return luettelo;
  if (!luetteloHaku) {
    luetteloHaku = fetch(pyramidiUrl('pyramidi.json'))
      .then((v) => (v.ok ? v.json() : null))
      .then((j) => {
        // Kelpaa vain, jos siinä on se, mitä piirto lukee — versio
        // mukaan lukien, koska laatan osoite rakennetaan siitä.
        if (!j?.arkki?.w || !j?.laatta || !j?.versio
          || !Array.isArray(j.tasot) || !j.tasot.length) return null;
        luettelo = j;
        return j;
      })
      .catch(() => null);
  }
  return luetteloHaku;
}

/* ------------------------------------------------------------ tason valinta */

/**
 * Mikä taso ladataan tälle mittakaavalle?
 *
 * LÄHIN TASO, EI LÄHIN ALASPÄIN (omistajan lukitus 30.8.2026:
 * *"asiakas valitsee lähimmän laattatason ja skaalaa korkeintaan
 * 1,41×"*). Tasojen suhde on 2, joten lähin taso on aina korkeintaan
 * kertoimen √2 päässä kumpaankin suuntaan — puolet siitä virheestä,
 * jonka "hienoin joka on vielä karkeampi" antaisi, ja puolet myös sen
 * turhasta latauksesta.
 *
 * LÄHIN MITATAAN LOGARITMISESTI, samasta syystä kuin kameran
 * portaikossa (js/kartta.js napsautaTasoon): tasot ovat kertoimia, ja
 * aritmeettinen "lähin" vetäisi aina isompaan päin.
 *
 * KAMERAN ZOOMIPORTAIKKO PYSYY TÄSTÄ ERILLÄÄN. Se on 1,5 × 6 porrasta
 * (js/kartta.js zoomiTasot) eikä sitä sovitella laattatasoihin —
 * portaikko kertoo mihin nipistys napsahtaa, tämä kertoo mikä tarkkuus
 * levyltä ladataan.
 *
 * @param {number} tarve laitepikseliä yhtä lautayksikköä kohti
 */
function valitseTaso(tasot, tarve) {
  let paras = tasot[0];
  let ero = Infinity;
  for (const t of tasot) {
    const d = Math.abs(Math.log(t.pikseliaPerYksikko / Math.max(1e-6, tarve)));
    if (d < ero) { ero = d; paras = t; }
  }
  return paras;
}

/* ------------------------------------------------------------ mittarit */

/*
 * PILOTIN MITTARIT. Nämä ovat se syy, jonka takia pilotti ylipäätään
 * ajetaan: latausaika, laattojen määrä näkymässä ja muistin arvio
 * mitataan pelistä eikä arvata. Luetaan konsolista
 * `window.__pyramidinMittarit()`.
 */
const mittarit = {
  taso: null,
  nakymassa: 0,
  ladattu: 0,
  epaonnistui: 0,
  tavuja: 0,
  hitainMs: 0,
  yhteensaMs: 0,
  paivityksia: 0,
  viimeisinPaivitysMs: 0,
};

export function pyramidinMittarit() {
  return {
    ...mittarit,
    keskiMs: mittarit.ladattu ? Math.round(mittarit.yhteensaMs / mittarit.ladattu) : 0,
    // Purettu bittikartta on 4 tavua pikseliä kohti riippumatta siitä,
    // kuinka hyvin webp pakkasi sen — tämä on se luku, joka puhelimen
    // muistista oikeasti kuluu.
    muistiMt: luettelo
      ? Math.round((mittarit.nakymassa * luettelo.laatta ** 2 * 4) / 1e6 * 10) / 10
      : 0,
  };
}

/* ------------------------------------------------------------ piirto */

/** Laatan avain kerroksessa. Kierros mukana: sama tiedosto, eri paikka. */
const avain = (z, kierros, sarake, rivi) => `${z}:${kierros}:${sarake}:${rivi}`;

/**
 * Onko laatta olemassa levyllä?
 *
 * Harvassa pyramidissa umpimeren laattoja ei generoida lainkaan
 * (tools/generoi-laattapyramidi.mjs `umpimeriSavy`), ja peli maalaa
 * niiden tilalle merisävyn. Ilman tätä tarkistusta peli pyytäisi
 * jokaisen puuttuvan laatan ja saisi 404:n — tuhansia turhia pyyntöjä.
 *
 * Luettelo kantaa jokaiselta tasolta bittikartan (`laatasto`, base64).
 * Jos sitä ei ole, oletetaan että kaikki laatat ovat olemassa.
 */
function laattaOlemassa(taso, sarake, rivi) {
  const bitit = taso.__bitit;
  if (bitit === null) return true;
  if (bitit === undefined) {
    if (!taso.laatasto) { taso.__bitit = null; return true; }
    try {
      const raaka = atob(taso.laatasto);
      const puskuri = new Uint8Array(raaka.length);
      for (let i = 0; i < raaka.length; i += 1) puskuri[i] = raaka.charCodeAt(i);
      taso.__bitit = puskuri;
    } catch {
      taso.__bitit = null;
      return true;
    }
  }
  const i = rivi * taso.sarakkeita + sarake;
  const t = taso.__bitit[i >> 3];
  return t === undefined ? false : ((t >> (i & 7)) & 1) === 1;
}

/**
 * Päivittää näkyvät laatat. Turvallinen kutsua joka näkymän
 * asettumisesta: ilman näkyvää aluetta tai kerrosta palaa heti.
 */
export function paivitaPyramidi(ui) {
  if (ui?.dead || !ui?.pyramidiKerros) return;
  // Katselutilan maanosalaudat piirtävät oman karttansa (ks.
  // pyramidiKattaa): niille laatat osuisivat väärään kohtaan.
  if (!pyramidiKattaa(ui.game?.pack?.id)) return;
  const nakyva = ui.nakyvaAlue?.();
  if (!nakyva?.w) return;
  if (!luettelo) {
    // Ensimmäinen kutsu käynnistää haun ja palaa; piirto tulee heti kun
    // luettelo on kädessä.
    void haeLuettelo().then((j) => { if (j && !ui.dead) paivitaPyramidi(ui); });
    return;
  }

  const alkoi = performance.now();
  const { arkki, laatta, tasot } = luettelo;
  const dpr = globalThis.devicePixelRatio || 1;
  const taso = valitseTaso(tasot, (nakyva.skaala ?? 1) * dpr);
  const yksikkoaPerLaatta = laatta / taso.pikseliaPerYksikko;

  /*
   * NÄKYVÄ ALUE ARKIN PIKSELEINÄ, ja siitä kierrokset. Kierros on
   * `taso.leveys` pikseliä (ei sarakkeita × laatta, ks. sääntö 3).
   */
  const nakyvaPx0 = (nakyva.x - arkki.x) * taso.pikseliaPerYksikko;
  const nakyvaPx1 = (nakyva.x + nakyva.w - arkki.x) * taso.pikseliaPerYksikko;
  const k0 = Math.floor(nakyvaPx0 / taso.leveys);
  const k1 = Math.floor(nakyvaPx1 / taso.leveys);
  const r0 = Math.max(0, Math.floor((nakyva.y - arkki.y) / yksikkoaPerLaatta) - PUSKURI);
  const r1 = Math.min(taso.riveja - 1,
    Math.floor((nakyva.y + nakyva.h - arkki.y) / yksikkoaPerLaatta) + PUSKURI);

  const kerros = ui.pyramidiKerros;
  /*
   * MERIPOHJA KAIKEN ALLE (harva pyramidi).
   *
   * Umpimeren laattoja ei ole generoitu; niiden tilalle jää tämä yksi
   * suorakaide arkin kokoisena. Se on kerroksen ENSIMMÄINEN lapsi,
   * joten jokainen laatta piirtyy sen päälle — mitään ei tarvitse
   * sovittaa laatta laatalta, ja puuttuva laatta paljastaa täsmälleen
   * sen sävyn, jonka generaattori laski sille ulapalle.
   */
  if (luettelo.meriSavy && !ui.pyramidiPohja) {
    const [pr, pg, pb] = luettelo.meriSavy;
    ui.pyramidiPohja = el('rect', {
      x: arkki.x,
      y: arkki.y,
      width: arkki.w,
      height: arkki.h,
      fill: `rgb(${pr},${pg},${pb})`,
      class: 'pyramidi-meri',
    }, kerros);
    kerros.prepend(ui.pyramidiPohja);
  }
  const vanhat = ui.pyramidiLaatat ?? new Map();
  const uudet = new Map();

  for (let kierros = k0; kierros <= k1; kierros += 1) {
    // Tämän kierroksen sarakeväli: mikä osa kierroksesta on näkyvissä.
    const alku = kierros * taso.leveys;
    const s0 = Math.max(0, Math.floor((nakyvaPx0 - alku) / laatta) - PUSKURI);
    const s1 = Math.min(taso.sarakkeita - 1,
      Math.floor((nakyvaPx1 - alku) / laatta) + PUSKURI);
    for (let rivi = r0; rivi <= r1; rivi += 1) {
      for (let sarake = s0; sarake <= s1; sarake += 1) {
        if (!laattaOlemassa(taso, sarake, rivi)) continue;
        const k = avain(taso.z, kierros, sarake, rivi);
        const oli = vanhat.get(k);
        if (oli) { uudet.set(k, oli); vanhat.delete(k); continue; }

        /*
         * VIIMEISEN RIVIN JA SARAKKEEN LAATTA ON VAJAA. Tason leveys ei
         * ole laattakoon monikerta, ja venytetty vajaa laatta osuisi
         * väärään kohtaan lautaa — leveys ja korkeus lasketaan siis
         * laatan omista pikseleistä.
         */
        const pw = Math.min(laatta, taso.leveys - sarake * laatta);
        const ph = Math.min(laatta, taso.korkeus - rivi * laatta);
        const kuva = el('image', {
          x: arkki.x + (alku + sarake * laatta) / taso.pikseliaPerYksikko,
          y: arkki.y + rivi * yksikkoaPerLaatta,
          width: pw / taso.pikseliaPerYksikko,
          height: ph / taso.pikseliaPerYksikko,
          href: pyramidiUrl(`${luettelo.versio}/z${taso.z}/${sarake}/${rivi}`
            + `.${luettelo.muoto ?? 'webp'}`),
          preserveAspectRatio: 'none',
          class: 'pyramidi-laatta',
          'data-taso': String(taso.z),
        }, kerros);
        const t0 = performance.now();
        kuva.addEventListener('load', () => {
          const kesto = performance.now() - t0;
          mittarit.ladattu += 1;
          mittarit.yhteensaMs += kesto;
          mittarit.hitainMs = Math.max(mittarit.hitainMs, Math.round(kesto));
        }, { once: true });
        kuva.addEventListener('error', () => { mittarit.epaonnistui += 1; }, { once: true });
        uudet.set(k, kuva);
      }
    }
  }

  /*
   * VANHAT POIS VASTA LOPUKSI. Kaikki, mikä ei ole uudessa joukossa, on
   * joko toisen tason laatta tai näkymän ulkopuolelle jäänyt — ja
   * molemmat saavat mennä, koska uuden tason laatat on jo LISÄTTY
   * puuhun ja selain piirtää välimuistista tulevat samassa kehyksessä.
   * Eri tason laatta jää siis näkyviin vain sen ajan, minkä uusi
   * odottaa verkkoa, koska vanha on puussa ENNEN uutta.
   */
  for (const kuva of vanhat.values()) kuva.remove();
  ui.pyramidiLaatat = uudet;

  mittarit.taso = taso.z;
  mittarit.nakymassa = uudet.size;
  mittarit.paivityksia += 1;
  mittarit.viimeisinPaivitysMs = Math.round((performance.now() - alkoi) * 100) / 100;
}

/** Tyhjentää laatat (laudan vaihto, pelin loppu). */
export function nollaaPyramidi(ui) {
  if (!ui?.pyramidiKerros) return;
  while (ui.pyramidiKerros.firstChild) ui.pyramidiKerros.firstChild.remove();
  ui.pyramidiLaatat = new Map();
  ui.pyramidiPohja = null;
  mittarit.nakymassa = 0;
}
