/*
 * Linssikerroksen moottori: sopimuksen tarkistus, piirto, elementtien
 * laskenta, rasterointi ja linssin vaihto.
 *
 * Tämä tiedosto on ainoa paikka, joka tietää MITEN linssi pannaan
 * kartalle. Yksittäinen linssimoduuli kertoo vain mitä piirretään;
 * kaikki nopeus- ja muistipäätökset tehdään täällä, jotta kymmenen
 * rinnakkain kirjoitettua linssiä ei tee niitä kymmenellä eri tavalla.
 *
 * MOOTTORIA EI SAA TUODA STAATTISESTI js/ui.js:ään. Yhden tiedoston
 * version kokoaja (tools/build-standalone.mjs) vaatii, että jokainen
 * `from './...'`-tuonti löytyy sen MODULES-listalta, ja linssit eivät
 * kuulu sinne (docs/moduulit/linssit.md luku 2.1: yhden tiedoston
 * versio ei saa linssejä, sama tarkoituksellinen raja kuin valokuvilla
 * ja äänillä). Kutsuja tuo tämän dynaamisesti:
 *
 *     const { Linssikerros, linssitila } = await import('./linssit/kerros.js');
 *
 * Silloin kokoaja ei näe riippuvuutta, ja yhden tiedoston versiossa
 * tuonti kaatuu hallitusti — kutsuja jättää valitsimen näyttämättä.
 */

import { el } from '../mapart.js';
import { LINSSIT } from './rekisteri.js';

const NS = 'http://www.w3.org/2000/svg';

/*
 * ELÄVÄN PUUN ELEMENTTIKATTO.
 *
 * Mitattu (js/mapart.js 1166–1177): yhdistetyllä laudalla 7192
 * elementtiä maksoi 236 ms/kehys, Euroopan laudalla 741 elementtiä
 * 30 ms/kehys — noin 0,032 ms elementiltä. 60 kuvaa sekunnissa vaatii
 * alle 16,7 ms/kehys, ja elävässä puussa on jo noin 700 elementtiä
 * kaupunkeja ja nimiä. Linssille jää siis muutama sata.
 *
 * Tämän yli menevä linssi muutetaan yhdeksi kuvaksi, joka ei maksa
 * panoroinnissa mitään: se liikkuu CSS-muunnoksen mukana kuten kaikki
 * muukin.
 */
export const LINSSIN_ELEMENTTIKATTO = 400;

/*
 * RASTEROIDUN LINSSIN PISIN SIVU PIKSELEINÄ.
 *
 * 2400 × 1080 kattaa laudan 12000 × 5399 eli 5,0 laudan yksikköä
 * pikselillä. Yleiskuvassa 420 px leveä paneeli näyttää koko 12000
 * yksikön leveyden (28,6 yksikköä pikselillä), joten kuva on lähes
 * kuusinkertaisesti tarkempi kuin yleiskuva vaatii ja lähikuvassa
 * hieman pehmeä. Se kelpaa juuri näille linsseille: ilmastoraja,
 * korkeusvyöhyke ja yövalo ovat pehmeitä reunoja luonnostaan. Sama luku
 * on valittu kertaalleen samasta syystä — assets/linssit/yokartta.jpg
 * on 2400 × 1080.
 *
 * Muisti: 2400 × 1080 × 4 tavua = 10,4 Mt samasta budjetista, jossa
 * kartan omat ruudut elävät (MUISTIBUDJETTI 48 Mt, js/mapart.js 1352).
 * Siksi päällä on kerrallaan tarkalleen yksi linssi ja vanha
 * blob-osoite vapautetaan vaihdossa. Luku on tässä yhtenä vakiona,
 * jotta sitä voi laskea mittauksen perusteella.
 */
export const LINSSIN_PIKSELIT = 2400;

/*
 * Mistä kerroksen <g> löytyy, kun kutsuja ei kerro sitä itse.
 *
 * Ryhmää ei oteta talteen kerran vaan kysytään joka vaihdossa: lauta
 * piirretään uudelleen (drawBoard) esikatselussa, laudan vaihdossa ja
 * uudessa pelissä, jolloin vanha kerros lapsineen katoaa DOM:sta.
 * Talteen otettu viittaus osoittaisi silloin irralliseen elementtiin ja
 * linssi jäisi näkymättömäksi ilman yhtään virhettä.
 */
function oletusRyhma() {
  return document.querySelector('#board g.linssi');
}

/** Sopimusvirhe kertoo tunnuksen, rikkeen ja kohdan suunnitelmasta. */
function sopimusvirhe(tunnus, viesti) {
  return new Error(
    `Linssi "${tunnus}" rikkoo linssisopimusta: ${viesti}. `
    + 'Ks. docs/moduulit/linssit.md luku 2.',
  );
}

/**
 * Tarkistaa linssimoduulin sopimuksen ja palauttaa LINSSI-olion.
 *
 * HEITTÄÄ eikä palauta virhelippua. Kymmenen tekijää kirjoittaa
 * linssejä rinnakkain, ja hiljainen epäonnistuminen — linssi joka vain
 * ei näy — olisi pahin mahdollinen lopputulos: sen syytä etsittäisiin
 * kartalta, rasteroinnista ja sauman rajauksesta, vaikka vika olisi
 * yhdessä puuttuvassa kentässä.
 */
export function tarkistaLinssi(moduuli, odotettuTunnus) {
  const linssi = moduuli?.LINSSI;
  if (!linssi || typeof linssi !== 'object') {
    throw sopimusvirhe(odotettuTunnus, 'moduuli ei vie LINSSI-vakiota');
  }
  if (typeof linssi.tunnus !== 'string' || !linssi.tunnus) {
    throw sopimusvirhe(odotettuTunnus, 'kenttä tunnus puuttuu tai ei ole merkkijono');
  }
  if (linssi.tunnus !== odotettuTunnus) {
    throw sopimusvirhe(
      odotettuTunnus,
      `moduulin tunnus on "${linssi.tunnus}" mutta rekisterissä lukee "${odotettuTunnus}"`,
    );
  }
  for (const kentta of ['nimi', 'lyhyt', 'ikoni']) {
    if (typeof linssi[kentta] !== 'string' || !linssi[kentta]) {
      throw sopimusvirhe(odotettuTunnus, `kenttä ${kentta} puuttuu tai ei ole merkkijono`);
    }
  }
  if (!Array.isArray(linssi.laudat) || !linssi.laudat.length) {
    throw sopimusvirhe(
      odotettuTunnus,
      "kenttä laudat puuttuu — anna pakkatunnukset listana tai ['*'] kaikille laudoille",
    );
  }
  if (!linssi.lahde || typeof linssi.lahde !== 'object') {
    throw sopimusvirhe(
      odotettuTunnus,
      'kenttä lahde puuttuu — jokainen pelin väittämä on tarkistettavissa',
    );
  }
  // kerros oletusarvoisesti true: karttakerros on tavallinen tapaus,
  // ja kerros: false on poikkeus (radio, tähtitaivas).
  if (linssi.kerros !== false && typeof linssi.piirra !== 'function') {
    throw sopimusvirhe(
      odotettuTunnus,
      'kerros === true mutta piirra puuttuu — kerroksellinen linssi tarvitsee '
      + 'funktion piirra(ryhma, tila)',
    );
  }
  for (const kentta of ['lataa', 'piirra', 'selite', 'askeleet', 'valitseAskel', 'vapauta']) {
    if (linssi[kentta] !== undefined && typeof linssi[kentta] !== 'function') {
      throw sopimusvirhe(odotettuTunnus, `kenttä ${kentta} ei ole funktio`);
    }
  }
  return linssi;
}

/*
 * Ladatut linssimoduulit tunnuksittain. null = moduulia ei ole (yhden
 * tiedoston versio), jolloin sitä ei yritetä hakea uudelleen.
 */
const ladatut = new Map();

/**
 * Hakee linssimoduulin ja tarkistaa sen sopimuksen.
 *
 * Palauttaa null vain silloin, kun moduulia ei ole olemassa lainkaan.
 * Sopimusrike sen sijaan HEITETÄÄN: puuttuva tiedosto on hyväksytty
 * rajaus, mutta rikkinäinen linssi on vika, joka pitää nähdä.
 */
export async function haeLinssi(tunnus) {
  if (ladatut.has(tunnus)) return ladatut.get(tunnus);
  const rivi = LINSSIT.find((r) => r.tunnus === tunnus);
  if (!rivi || typeof rivi.tuo !== 'function') {
    ladatut.set(tunnus, null);
    return null;
  }
  let moduuli = null;
  try {
    moduuli = await rivi.tuo();
  } catch (syy) {
    // Yhden tiedoston versio ei niputa linssejä (luku 2.1). Peli ei saa
    // kaatua siihen, vaan linssi jää yksinkertaisesti pois valikoimasta.
    console.warn(`Linssiä "${tunnus}" ei voitu ladata; se jätetään pois.`, syy);
    ladatut.set(tunnus, null);
    return null;
  }
  const linssi = tarkistaLinssi(moduuli, tunnus);
  ladatut.set(tunnus, linssi);
  return linssi;
}

/**
 * Kaikki olemassa olevat linssit valitsinta varten, järjestyskentän
 * mukaan. Metatiedot ovat muutaman kilotavun kokoisia, joten kaikkien
 * moduulien tuonti on halpaa — aineisto haetaan vasta lataa():ssa.
 */
export async function haeKaikki() {
  const linssit = await Promise.all(LINSSIT.map((rivi) => haeLinssi(rivi.tunnus)));
  return linssit
    .filter(Boolean)
    .sort((a, b) => (a.jarjestys ?? 1000) - (b.jarjestys ?? 1000));
}

/** Päteekö linssi tälle laudalle? */
export function kelpaaLaudalle(linssi, packId) {
  const laudat = linssi?.laudat ?? [];
  return laudat.includes('*') || laudat.includes(packId);
}

/**
 * Vain luettava tila, joka annetaan piirra():lle.
 *
 * Jäädytetään, koska sääntö "moduuli ei muokkaa tila-oliota" on helpompi
 * pitää kun kokeilu kaatuu heti. map jää jäädyttämättä tarkoituksella:
 * se on pelin oma pakkaolio eikä sitä saa lukita täältä käsin.
 */
export function linssitila(pack, askel = null) {
  const map = pack?.map ?? {};
  return Object.freeze({
    packId: pack?.id ?? null,
    map,
    leveys: map.width ?? 0,
    korkeus: map.height ?? 0,
    kiertava: map.kiertava === true,
    askel,
  });
}

/**
 * Käy piirretyn ryhmän läpi, tarkistaa kiellot ja palauttaa
 * elementtimäärän.
 *
 * Kaksi kieltoa valvotaan koneellisesti, koska molemmat epäonnistuvat
 * HILJAA — kerros jää tyhjäksi tai mustaksi eikä konsoliin tule mitään:
 *
 * 1. Suodatin. iOS:n webapp-tila palauttaa suodatetun kerroksen tyhjänä
 *    sen jälkeen kun sovellus on ollut taustalla. Tämä on repon
 *    toistuvin vika (js/mapart.js 72–91, js/ui.js 2986–3004), ja linssi
 *    kattaa koko maailman — se ei ole missään olosuhteissa "pieni".
 * 2. class-attribuutti. Rasteroitava SVG on irrallinen eikä peri sivun
 *    tyylitiedostoa, joten luokkaan nojaava väri katoaa ja jäljelle jää
 *    musta läiskä (js/ui.js 1858–1866).
 */
function tarkistaPiirros(ryhma, tunnus) {
  const solmut = ryhma.querySelectorAll('*');
  for (const solmu of solmut) {
    const nimi = solmu.tagName ?? '';
    if (solmu.hasAttribute?.('filter') || nimi === 'filter' || nimi.startsWith('fe')) {
      throw sopimusvirhe(
        tunnus,
        `piirsi suodattimen (<${nimi}>) — iOS:n webapp-tila palauttaa suodatetun `
        + 'kerroksen tyhjänä (luku 1.7). Esilaske pehmeys kuvaan tai <pattern>-laattaan',
      );
    }
    if (solmu.hasAttribute?.('class')) {
      throw sopimusvirhe(
        tunnus,
        `antoi elementille <${nimi}> class-attribuutin — irrallinen SVG ei peri sivun `
        + 'tyylitiedostoa, joten jokainen väri ja viivanleveys on annettava '
        + 'SVG-attribuuttina (luku 2.2)',
      );
    }
  }
  return solmut.length;
}

/**
 * Rasteroi linssin yhdeksi koko laudan kuvaksi.
 *
 * YKSI KUVA, EI RUUDUKKOA. Kartan oma ruudukko (js/ui.js taydennaTaide)
 * seuraa ikkunaa, ja kiertävällä laudalla se ei rasteroisi sauman
 * takaista aluetta lainkaan — linssi loppuisi pystysuoraan viivaan.
 * Koko laudan kuva ei myöskään tarvitse panoroinnissa eikä zoomissa
 * mitään työtä.
 *
 * Koneisto on sama kuin js/mapart.js rasteroiRuutu, mutta oma kopio
 * omalla katolla: rasteroiRuutu rajaa MOLEMMAT sivut 1100 pikseliin,
 * mikä vääristäisi 12000 × 5399 -kuvan.
 *
 * Palauttaa { kuva, osoite } tai null. Epäonnistuminen ei ole virhe —
 * kutsuja jättää silloin elävät vektorit paikalleen.
 */
async function rasteroiLinssi(ryhma, leveys, korkeus) {
  if (typeof XMLSerializer === 'undefined' || !window.Blob || !URL.createObjectURL) return null;
  try {
    const suurin = Math.max(leveys, korkeus, 1);
    const leveysPx = Math.max(32, Math.round((leveys / suurin) * LINSSIN_PIKSELIT));
    const korkeusPx = Math.max(32, Math.round((korkeus / suurin) * LINSSIN_PIKSELIT));
    const xml = `<svg xmlns="${NS}" viewBox="0 0 ${leveys} ${korkeus}"`
      + ` width="${leveysPx}" height="${korkeusPx}">`
      + `${new XMLSerializer().serializeToString(ryhma)}</svg>`;

    const lahdeOsoite = URL.createObjectURL(new Blob([xml], { type: 'image/svg+xml;charset=utf-8' }));
    let kuvalahde;
    try {
      kuvalahde = await new Promise((valmis, virhe) => {
        const koe = new Image();
        koe.onload = () => valmis(koe);
        koe.onerror = () => virhe(new Error('linssin kuvaa ei voitu ladata'));
        koe.src = lahdeOsoite;
      });
    } catch {
      URL.revokeObjectURL(lahdeOsoite);
      return null;
    }

    const canvas = document.createElement('canvas');
    canvas.width = leveysPx;
    canvas.height = korkeusPx;
    canvas.getContext('2d').drawImage(kuvalahde, 0, 0, leveysPx, korkeusPx);
    URL.revokeObjectURL(lahdeOsoite);

    const png = await new Promise((valmis) => {
      if (canvas.toBlob) canvas.toBlob((b) => valmis(b), 'image/png');
      else valmis(null);
    });
    const osoite = png ? URL.createObjectURL(png) : canvas.toDataURL('image/png');

    /*
     * PNG puretaan valmiiksi ennen kuin se pannaan puuhun. Ilman tätä
     * kuva välkkyy vaihtuessaan: <image> hakee ja purkaa blobin vasta
     * kun elementti on puussa, ja siinä välissä ehtii tyhjä kehys.
     */
    try {
      const valmis = new Image();
      valmis.src = osoite;
      if (valmis.decode) await valmis.decode();
      else await new Promise((r) => { valmis.onload = r; valmis.onerror = r; });
    } catch { /* purku ei onnistunut; kuva piirtyy silti, vain hitaammin */ }

    const kuva = el('image', {
      x: 0, y: 0, width: leveys, height: korkeus, href: osoite, preserveAspectRatio: 'none',
    });
    // Vain blob-osoite vapautetaan; data:-osoitteella ei ole omistajaa.
    return { kuva, osoite: png ? osoite : null };
  } catch {
    return null;
  }
}

/**
 * Päällä olevan linssin hallinta: vaihto, sammutus ja resurssien
 * vapautus.
 *
 * Vaihto EI koske karttaan: staattista taidetta ei sarjallisteta
 * uudelleen, karttaruutuja ei rasteroida eikä drawBoardia kutsuta.
 * Vain tämän yhden ryhmän lapset vaihtuvat.
 */
export class Linssikerros {
  constructor(haeRyhma = oletusRyhma) {
    this.haeRyhma = haeRyhma;
    this.ryhma = null;
    this.tunnus = null;
    this.linssi = null;
    // Päällä olevan rasterin blob-osoite. Vapauttamatta jokainen vaihto
    // vuotaisi kymmenen megatavua (luku 1.4).
    this.rasterinOsoite = null;
    // Kesken oleva vaihto tunnistetaan numerosta: hidas lataa() tai
    // rasterointi ei saa kirjoittaa kerrokseen sen jälkeen, kun pelaaja
    // on jo vaihtanut linssiä.
    this.vuoro = 0;
  }

  /** Onko jokin linssi päällä? */
  get paalla() {
    return this.tunnus !== null;
  }

  /**
   * Nykyinen kerroksen ryhmä. Jos lauta on piirretty uudelleen, vanha
   * ryhmä on irronnut puusta eikä sen rasteri vapaudu itsestään.
   */
  nykyinenRyhma() {
    let ryhma = null;
    try {
      ryhma = this.haeRyhma() ?? null;
    } catch {
      ryhma = null;
    }
    if (ryhma !== this.ryhma) {
      this.vapautaRasteri();
      this.ryhma = ryhma;
    }
    return ryhma;
  }

  vapautaRasteri() {
    if (!this.rasterinOsoite) return;
    URL.revokeObjectURL(this.rasterinOsoite);
    this.rasterinOsoite = null;
  }

  /** Poistaa linssin omat body-luokat. */
  poistaLuokat() {
    const body = document.body;
    if (!body) return;
    // Kaikki linssi-alkuiset kerralla: linssi-paalla, linssi-<tunnus> ja
    // linssi-valokuva. Näin unohtunut tunnus ei jää roikkumaan.
    for (const luokka of [...body.classList]) {
      if (luokka.startsWith('linssi-')) body.classList.remove(luokka);
    }
  }

  merkitseLuokat(linssi) {
    const body = document.body;
    if (!body) return;
    body.classList.add('linssi-paalla', `linssi-${linssi.tunnus}`);
    if (linssi.valokuva === true) body.classList.add('linssi-valokuva');
  }

  /** Sammuttaa päällä olevan linssin ja vapauttaa sen resurssit. */
  sammuta() {
    // Numeron nosto mitätöi kesken olevan vaihdon.
    this.vuoro += 1;
    try {
      this.linssi?.vapauta?.();
    } catch (syy) {
      console.warn(`Linssin "${this.tunnus}" vapautus epäonnistui.`, syy);
    }
    const ryhma = this.nykyinenRyhma();
    this.vapautaRasteri();
    ryhma?.replaceChildren();
    this.poistaLuokat();
    this.tunnus = null;
    this.linssi = null;
  }

  /**
   * Vaihtaa päällä olevan linssin. tunnus === null sammuttaa.
   *
   * Palauttaa { tunnus, linssi, elementteja, rasteroitu } kun linssi
   * syttyi, false kun linssillä ei ole tälle laudalle mitään (kutsuja
   * piilottaa sen valitsimesta) ja null kun mitään ei tapahtunut.
   */
  async vaihda(tunnus, tila) {
    this.sammuta();
    const vuoro = this.vuoro;
    if (!tunnus) return null;

    const linssi = await haeLinssi(tunnus);
    if (vuoro !== this.vuoro) return null;
    if (!linssi) return null;
    if (!kelpaaLaudalle(linssi, tila?.packId)) return false;

    // Kerrokseton linssi (radio, tähtitaivas) ei piirrä kartalle mitään:
    // se on oma näkymänsä, ja tänne jää vain merkintä siitä että se on
    // valittuna.
    if (linssi.kerros === false) {
      this.tunnus = tunnus;
      this.linssi = linssi;
      this.merkitseLuokat(linssi);
      return { tunnus, linssi, elementteja: 0, rasteroitu: false };
    }

    try {
      await linssi.lataa?.();
    } catch (syy) {
      console.warn(`Linssin "${tunnus}" aineistoa ei voitu ladata.`, syy);
      return null;
    }
    if (vuoro !== this.vuoro) return null;

    /*
     * Piirto irralliseen ryhmään, ei suoraan kerrokseen. Näin puolivalmis
     * linssi ei koskaan vilahda ruudulla, ja elementit voi laskea ennen
     * kuin päätetään mennäänkö elävänä vai kuvana.
     */
    const piirros = document.createElementNS(NS, 'g');
    if (linssi.piirra(piirros, tila) === false) return false;
    const elementteja = tarkistaPiirros(piirros, tunnus);

    let sisalto = piirros;
    let osoite = null;
    let rasteroitu = false;
    if (elementteja > LINSSIN_ELEMENTTIKATTO) {
      const rasteri = await rasteroiLinssi(piirros, tila.leveys, tila.korkeus);
      if (vuoro !== this.vuoro) {
        if (rasteri?.osoite) URL.revokeObjectURL(rasteri.osoite);
        return null;
      }
      /*
       * Jos rasterointi ei onnistu, elävät vektorit jäävät paikalleen.
       * Kartta näyttää silloin täsmälleen samalta, vain panorointi on
       * hitaampaa — sama linjaus kuin kartan omalla rasteroinnilla
       * (js/mapart.js 1187–1189).
       */
      if (rasteri) {
        sisalto = rasteri.kuva;
        osoite = rasteri.osoite;
        rasteroitu = true;
      }
    }

    const ryhma = this.nykyinenRyhma();
    if (!ryhma) {
      if (osoite) URL.revokeObjectURL(osoite);
      return null;
    }
    ryhma.replaceChildren(sisalto);
    this.rasterinOsoite = osoite;
    this.tunnus = tunnus;
    this.linssi = linssi;
    this.merkitseLuokat(linssi);
    this.haivyta(ryhma);
    return { tunnus, linssi, elementteja, rasteroitu };
  }

  /**
   * Kerran laukeava saapuminen, ei jatkuvaa animaatiota.
   *
   * Mitattu: yksikin sykkivä elementti kartan päällä pakottaa kartan
   * piirtymään uudelleen joka kehyksellä, 15 fps vastaan 60 fps
   * (js/ui.js 7529–7534). Häivytys kestää 220 ms ja jää sitten
   * paikalleen; siirtymän kesto on tyylitiedostossa, ja
   * prefers-reduced-motion nollaa sen.
   */
  haivyta(ryhma) {
    ryhma.style.opacity = '0';
    requestAnimationFrame(() => {
      if (ryhma.isConnected) ryhma.style.opacity = '1';
    });
  }
}
