/*
 * TIEDELIITE — keksijän oma lehtisivu Keksinnöt-linssistä.
 *
 * Raamattu, Karttalinssit, KEKSIJAT LINSSIN ALARIVILLA JA TIEDELIITE
 * (omistaja 3.9.2026, sanatarkasti): *"sitten kun henkilo klikkaa,
 * niin siella voisi olla generoidun kuvan lisaksi myos se oikea kuva
 * ja ne kaikki kuvat olisi kiva taittaa lehden muotoon samalle
 * sivulle. lehden otsikko voisi olla tiede-liite tms. pelaaja voisi
 * liikkua myos lehden sivuilla alanappien ja hampurilaisen kautta
 * edellisiin ja seuraaviin keksijoihin"*.
 *
 * ── MUOTO ─────────────────────────────────────────────────────────
 *
 * Sivu on LISÄLEHDEN TAITTOPERHETTÄ (css/fokusnosto.css osio 9,
 * luokat looppi-*): sama nimiö-, päiväys-, otsikko-, ingressi- ja
 * palstasääntö kuin skandaalin lööpillä (js/skandaalit.js
 * piirraSkandaalinSisus) — vain nimiö on "Tiedeliite" ja kuori oma
 * (.tiedeliite-kerros / .tiedeliite-kortti, css/aikajana.css), koska
 * jokainen korttiperhe siivoaa omat kerroksensa valitsimella.
 * Rakenne ylhäältä alas:
 *
 *   NIMIÖRIVI (kortin oma, ei vieri)     ☰ · Tiedeliite / vuosi ·
 *                                        paikka · kaiutin ✕
 *   ───── kaksoisviiva rivin ALLE ─────
 *   PÄÄOTSIKKO                           keksintö
 *   ingressi                             linssin lyhyt selite
 *   leipäteksti YHTENÄ palstana          juttu, muotokuva oikealla
 *   ilmiökuva(t) kuvateksteineen         ilmio, ilmioLisa — kaksi tai
 *                                        useampi selataan karusellina
 *   KEKSIJÄ ITSE                         henkilojuttu ja aito kuva
 *   lähderivi                            lahde
 *   ‹ edellinen keksijä | seuraava ›     alanapit
 *
 * ── YLÄREUNA JA KUVATEKSTIT (omistaja 8.9.2026) ───────────────────
 *
 * Raamattu "TIEDELIITTEEN ULKOASU", omistajan iPad-kaappaus 1897
 * Augsburg, sanatarkasti: *"Korjaa tuo yläreuna. Siinä on useampikin
 * asetteluvirhe ja kuvateksti voisi olla lyhyempi, ja sitten voisi
 * näkyä pidempi versio, kun sen kuvan avaa näkyviin. Myös jos sivua
 * vierittää, niin silloin kuuluu turha klikkaus ääni ja ehkä teksti
 * voisi olla yhdessä palstassa ja kuva hieman isompa. Myös alareunan
 * linkit seuraaviin juttuihin vois jolla päälle hyppäävällä värillä.
 * Ja myös tuo havainnekuva saisi mennä reunasta reunaan. Nyt siihen
 * jää oudot palkit sivuille."*
 *
 * Kolme näistä ratkeaa täällä, loput tyyleissä ja datassa:
 *
 *   1. NIMIÖRIVI ON YKSI RIVI. Hampurilainen, nimiö + paikkarivi ja
 *      kaiutin/sulku ovat SAMASSA ristikkorivissä kortin sisällä
 *      (.tiedeliite-ylarivi), eivät kolmena päällekkäin asemoituna
 *      palana. Kaksoisviiva on rivin alareunassa, ei tekstin päällä.
 *      Rivi asuu kortissa eikä sivussa, joten se pysyy paikallaan
 *      kun juttu vierii — ja sivunvaihdossa vaihtuu vain paikkarivin
 *      teksti.
 *   2. LYHYT KUVATEKSTI KORTISSA, PITKÄ AVATUSSA KUVASSA. Kortin
 *      kuvateksti on `kuva.lyhyt` (yksi virke, ks.
 *      js/linssit/keksinnot.js) ILMAN lähderiviä; suurennos näyttää
 *      pitkän `selite`-tekstin ja lähteen ("Matkakirjan
 *      havainnekuva"), koska se piirtyy avaaKohdeSuurennoksessa
 *      kuvatiedon omista kentistä.
 *   3. HAVAINNEKUVA REUNASTA REUNAAN. Yhden kuvan kehys piirretään
 *      täällä (piirraIlmiokuva) eikä yhteisellä piirraNostonKuvalla:
 *      yhteinen sääntö `.fokusnosto-kuva { width: fit-content }` ja
 *      `object-fit: contain` jättivät kuvan sivuille vaaleat palkit
 *      aina kun css/fokusnosto.css sattui latautumaan aikajanan
 *      tyylien JÄLKEEN (kaksi yhtä tarkkaa valitsinta, järjestys
 *      ratkaisi). Oma kehys ja oma kuvateksti tekevät myös kohdan 2
 *      mahdolliseksi.
 *
 * Kaikki kuvat ovat samalla sivulla, kuten omistaja tilasi: generoitu
 * ja aito muotokuva rinnakkain (aito on todiste, generoitu on
 * tunnistettava kasvo), ilmiökuvat niiden alla lehden kuvina.
 *
 * ── LIIKKUMINEN ───────────────────────────────────────────────────
 *
 * Alanapit vievät edelliseen ja seuraavaan keksijään; hampurilainen
 * avaa sisällyksen, jossa kaikki keksijät vuosineen. Merkkipaalu
 * (1873, isoisän lähtö) ohitetaan, koska sillä ei ole keksijää eikä
 * juttua. Sivun vaihto on ristihäivytys samassa kortissa (Raamattu:
 * KAIKKI LIIKE ANIMOIDAAN PEHMEASTI) — kortti ei sulkeudu ja avaudu
 * uudelleen. Kutsuja saa tiedon vaihdosta (`kunVaihtuu`), jotta
 * linssin paneeli ja valo voivat seurata sivua.
 *
 * ── MITÄ TÄMÄ EI OLE ──────────────────────────────────────────────
 *
 * Ei kaupunkilehden sivu (js/lehti.js) eikä nähtävyyskortti
 * (js/nahtavyydet.js): Tiedeliite on linssin oma lehti, joka elää
 * aikajanan päällä ja katoaa sen mukana (js/aikajana.js pura →
 * suljeTiedeliite).
 */

import { html, jaaKappaleiksi, nielaiseSulkevaNapautus } from './ui-apurit.js';
import { asetaNostonKuva } from './fokusnosto.js';
import { taytaLahderivi } from './tekijakortti.js';
import { avaaKohdeSuurennos, suljeKohdeSuurennos } from './fokuskohteet.js';
import { sfx } from './sound.js';
import { lisaaLukijanappi } from './lukija.js';

/** Ilmiökuvan leveys sivulla (sama kuin skandaalin kortilla). */
const TIEDELIITE_KUVA_PX = 800;
/** Muotokuvan leveys kasvoriveissä — kolme rinnakkain 40 rem:n sivulla. */
const TIEDELIITE_KASVO_PX = 400;
/** Kuvan suurennoksen ui-avain (sulkusiivous ja Esc-väistö). */
const ZOOM_AVAIN = 'tiedeliiteZoom';

/*
 * KAKSI TYYLITIEDOSTOA LAINASSA — sama järjestely kuin skandaalilla
 * (js/skandaalit.js SKANDAALI_TYYLIT): lööpin luokat ovat täkynoston
 * (css/fokusnosto.css), kuori ja kasvorivi linssin omassa tiedostossa
 * (css/aikajana.css). Tunnukset ovat samat kuin omistajilla, joten
 * kumpikin ladataan sivulle enintään kerran.
 */
const TIEDELIITE_TYYLIT = [
  ['fokusnosto-tyyli', 'fokusnosto.css'],
  ['aikajana-tyyli', 'aikajana.css'],
];

function tiedeliiteLataaTyyli() {
  if (typeof document === 'undefined') return;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  if (!peruslinkki) return;
  for (const [tunnus, tiedosto] of TIEDELIITE_TYYLIT) {
    if (document.getElementById(tunnus)) continue;
    const linkki = document.createElement('link');
    linkki.id = tunnus;
    linkki.rel = 'stylesheet';
    linkki.href = new URL(tiedosto, peruslinkki.href).href;
    document.head.appendChild(linkki);
  }
}

/* ==================== PUHTAAT APURIT ==================== */

/** Onko kuvatiedolla lähde: Commons-tiedosto tai valmis ämpäriosoite. */
const onKuva = (kuva) => Boolean(kuva?.tiedosto || kuva?.osoite);

/**
 * KORTIN KUVATEKSTI ON LYHYT (omistaja 8.9.2026: *"kuvateksti voisi
 * olla lyhyempi, ja sitten voisi näkyä pidempi versio, kun sen kuvan
 * avaa näkyviin"*).
 *
 * Datassa on kaksi pituutta: `lyhyt` on yhden virkkeen versio ja
 * `selite` entinen pitkä. Kortti näyttää lyhyen, suurennos pitkän —
 * ja kuvatiedot menevät suurennokseen sellaisenaan, joten pitkä
 * teksti ja lähderivi tulevat sinne ilman eri sääntöä. Ilman
 * `lyhyt`-kenttää (esim. aito Commons-kuva, jonka selite on jo
 * yhden rivin mittainen) kortissa on entinen selite.
 */
export const lyhytKuvateksti = (kuva) => kuva?.lyhyt ?? kuva?.selite ?? '';

/** Sivullinen pysäkki: keksijä, jolla on juttu — merkkipaalu ei ole. */
export function onTiedeliitteenSivu(t) {
  return Boolean(t && !t.paalu && t.juttu);
}

/**
 * Sivun kuvat kolmessa ryhmässä. Kasvorivillä ovat generoidut
 * muotokuvat (`kuva`, `kuvaToinen`) ja niiden perässä aito Commons-
 * kuva (`kuvaAito`); ilmiökuvat (`ilmio`, `ilmioLisa`) tulevat omalle
 * rivilleen. Kuvaton kenttä karsiutuu, joten rivi ei koskaan varaa
 * paikkaa kuvalle, jota ei ole.
 */
export function tiedeliitteenKuvat(t) {
  return {
    kasvot: [t?.kuva, t?.kuvaToinen, t?.kuvaAito].filter(onKuva),
    ilmiot: [t?.ilmio, t?.ilmioLisa].filter(onKuva),
  };
}

/**
 * Edellinen ja seuraava sivullinen pysäkki indeksistä `i`; -1 kun
 * kaaren pää tulee vastaan. Merkkipaalut hypätään yli molempiin
 * suuntiin.
 */
export function tiedeliitteenNaapurit(tapahtumat, i) {
  const etsi = (suunta) => {
    for (let j = i + suunta; j >= 0 && j < tapahtumat.length; j += suunta) {
      if (onTiedeliitteenSivu(tapahtumat[j])) return j;
    }
    return -1;
  };
  return { edellinen: etsi(-1), seuraava: etsi(1) };
}

/** Kaupungin nimi tapahtumasta (paikka on datan kenttä). */
const paikka = (t) => t.paikka ?? t.kaupunki ?? '';

/*
 * Näytettävä ajoitus: vuosiluku (keksinnöt) tai pysäkin oma teksti
 * ("300 000 vuotta sitten"), kun kaaren kello ei kulje vuosiluvuissa
 * (js/aikajana.js KELLON ASTEIKKO). Sama apuri kuin moottorissa.
 */
const ajoitus = (t) => t.ajoitus ?? t.vuosi;

/* ==================== SIVUN SISUS ==================== */

/**
 * KASVORIVI: generoitu muotokuva, mahdollinen toinen keksijä ja aito
 * kuva vierekkäin, jokaisella oma kuvateksti ja lähderivi. Napautus
 * suurentaa kuten kortin muillakin kuvilla; latautumaton kuva
 * pudotetaan riviltä (kehys piiloon), jottei paperille jää tyhjää
 * laatikkoa.
 */
function piirraKasvot(ui, sailio, kuvat, henkilo, luokka = '') {
  if (!kuvat.length) return;
  const rivi = html('div', `tiedeliite-kasvot${luokka ? ` ${luokka}` : ''}`);
  rivi.dataset.maara = String(kuvat.length);
  for (const kuva of kuvat) {
    const kehys = html('figure', 'tiedeliite-kasvo');
    const nappi = html('button', 'fokusnosto-kuvanappi');
    nappi.type = 'button';
    // Ei title-vihjettä: hiiren tooltip jäi kuvan päälle (ks.
    // piirraTiedeliitteenSivu, vihjeiden siivous). Lukuohjelma saa
    // saman tiedon aria-labelista.
    nappi.setAttribute('aria-label', `${lyhytKuvateksti(kuva) || henkilo || 'Kuva'} — avaa suurena`);
    const img = document.createElement('img');
    img.alt = lyhytKuvateksti(kuva) || henkilo || '';
    img.decoding = 'async';
    img.draggable = false;
    asetaNostonKuva(img, kuva, TIEDELIITE_KASVO_PX, () => { kehys.hidden = true; });
    nappi.appendChild(img);
    nappi.addEventListener('click', (tapahtuma) => {
      tapahtuma.stopPropagation();
      avaaKohdeSuurennos(ui, kuva, () => nappi, ZOOM_AVAIN);
    });
    kehys.appendChild(nappi);
    /*
     * KORTISSA VAIN LYHYT TEKSTI, EI LÄHDERIVIÄ (omistaja 8.9.2026:
     * *"Riittää myös, että havainnekuva mainitaan vasta kun kuvan
     * klikkaa isommaksi siinä pidemmässä kuvatekstissä"*). Lähde ja
     * pitkä selite kulkevat kuvatiedossa suurennokseen asti.
     */
    const teksti = html('figcaption', 'fokusnosto-kuvateksti');
    teksti.appendChild(html('span', 'fokusnosto-kuvaselite', lyhytKuvateksti(kuva)));
    kehys.appendChild(teksti);
    rivi.appendChild(kehys);
  }
  sailio.appendChild(rivi);
}

/**
 * YKSI HAVAINNEKUVA REUNASTA REUNAAN (omistaja 8.9.2026: *"tuo
 * havainnekuva saisi mennä reunasta reunaan. Nyt siihen jää oudot
 * palkit sivuille"*).
 *
 * Kuva piirretään täällä eikä yhteisellä piirraNostonKuvalla, koska
 * yhteinen kehys on tarkoituksella kuvan levyinen (`width:
 * fit-content`, `object-fit: contain`) — pystykuvan sääntö, joka
 * jättää vaakakuvalle vaaleat palkit heti kun css/fokusnosto.css
 * latautuu aikajanan tyylien jälkeen. Tiedeliitteen havainnekuva on
 * lehden kuva: se täyttää palstan reunasta reunaan samassa
 * 16/10-kehyksessä kuin karuselli, ja kuvateksti on lyhyt versio
 * ilman lähderiviä (ks. piirraKasvot).
 */
function piirraIlmiokuva(ui, sailio, kuva, henkilo) {
  const kehys = html('figure', 'fokusnosto-kuva tiedeliite-ilmiokuva');
  const nappi = html('button', 'fokusnosto-kuvanappi');
  nappi.type = 'button';
  nappi.setAttribute('aria-label', `${lyhytKuvateksti(kuva) || henkilo || 'Kuva'} — avaa suurena`);
  const img = document.createElement('img');
  img.alt = lyhytKuvateksti(kuva) || henkilo || '';
  img.decoding = 'async';
  img.draggable = false;
  asetaNostonKuva(img, kuva, TIEDELIITE_KUVA_PX, () => { kehys.hidden = true; });
  nappi.appendChild(img);
  nappi.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    avaaKohdeSuurennos(ui, kuva, () => nappi, ZOOM_AVAIN);
  });
  kehys.appendChild(nappi);
  const teksti = html('figcaption', 'fokusnosto-kuvateksti');
  teksti.appendChild(html('span', 'fokusnosto-kuvaselite', lyhytKuvateksti(kuva)));
  kehys.appendChild(teksti);
  sailio.appendChild(kehys);
}

/* ==================== HAVAINNEKUVIEN KARUSELLI ==================== */

/**
 * Pyyhkäisyn kynnys pikseleinä: tätä lyhyempi veto palauttaa kuvan
 * paikalleen (omistajan tilaus 3.9.2026: *"pyyhkäisy sormella"*).
 */
export const KARUSELLIN_KYNNYS = 30;

/**
 * Askel karusellissa. Raita on yhtenäinen nauha, joka ei voi kiertää
 * päästä päähän liukumatta koko matkaa takaisin — siksi karuselli
 * PYSÄHTYY PÄIHIN ja päädyn nuoli menee harmaaksi.
 */
export function karusellinKohta(kohdalla, suunta, maara) {
  if (!(maara >= 1)) return 0;
  return Math.min(maara - 1, Math.max(0, Math.trunc(kohdalla) + suunta));
}

/**
 * Pyyhkäisyn suunta: vasemmalle veto (dx < 0) vie seuraavaan kuvaan,
 * oikealle edelliseen. Kynnystä lyhyempi liike ei siirrä (0).
 */
export function karusellinPyyhkaisy(dx, kynnys = KARUSELLIN_KYNNYS) {
  if (!Number.isFinite(dx) || Math.abs(dx) < kynnys) return 0;
  return dx < 0 ? 1 : -1;
}

/**
 * USEAMPI HAVAINNEKUVA ON KARUSELLI (omistajan tilaus 3.9.2026,
 * sanatarkasti: *"jos oli useampi havainnekuva, niin ne voisi laittaa
 * nostoihin karuselliksi"*).
 *
 * Yksi kuva kerrallaan samassa 16/10-kehyksessä (sama mittasuhde kuin
 * linssin paneelin ilmiökuvalla, .aikajana-ilmiokuva); kuvateksti ja
 * lähderivi vaihtuvat kuvan mukana, koska jokainen havainnekuva kertoo
 * mitä juuri siinä kuvassa on. Selaus kolmella tavalla: nuolet kuvan
 * laidoilla, pisteet alla ja pyyhkäisy sormella. Nuolinäppäimet
 * selaavat kuvia, kun kohdistus on karusellin sisällä — muuten ne
 * kuuluvat sivunvaihdolle (avaaTiedeliite → nappain).
 *
 * Siirtymä on liuku (CSS .tiedeliite-karuselli-raita: 480 ms,
 * nopeutus ja hidastus — Raamattu: KAIKKI LIIKE ANIMOIDAAN PEHMEASTI);
 * reduced motion vaihtaa kuvan suoraan. Napautus avaa yhä
 * suurennoksen (avaaKohdeSuurennos) — paitsi jos sormi oikeasti
 * liikkui, jolloin kyse oli pyyhkäisystä eikä napautuksesta.
 *
 * YKSI KUVA ei ole karuselli: silloin sivu piirtyy yhtenä kehyksenä
 * (piirraIlmiokuva), eikä nuolia tai pisteitä synny lainkaan.
 */
function piirraIlmiokaruselli(ui, sailio, kuvat, henkilo) {
  const kehys = html('figure', 'fokusnosto-kuva tiedeliite-karuselli');
  kehys.dataset.maara = String(kuvat.length);
  const ikkuna = html('div', 'tiedeliite-karuselli-ikkuna');
  const raita = html('div', 'tiedeliite-karuselli-raita');
  ikkuna.appendChild(raita);
  kehys.appendChild(ikkuna);

  let kohdalla = 0;
  let estaNapautus = false;
  let virheita = 0;
  const ruudut = [];

  for (const kuva of kuvat) {
    const nappi = html('button', 'fokusnosto-kuvanappi tiedeliite-karuselli-ruutu');
    nappi.type = 'button';
    nappi.setAttribute('aria-label', `${lyhytKuvateksti(kuva) || henkilo || 'Kuva'} — avaa suurena`);
    const img = document.createElement('img');
    img.alt = lyhytKuvateksti(kuva) || henkilo || '';
    img.decoding = 'async';
    img.draggable = false;
    /*
     * Rikkinäinen kuva jättää ruudun tyhjäksi paperiksi, ja vasta kun
     * KAIKKI kuvat pettävät, koko kehys katoaa — sama sääntö kuin
     * yhdellä kuvalla (piirraIlmiokuva): teksti kantaa sivun yksinkin.
     */
    asetaNostonKuva(img, kuva, TIEDELIITE_KUVA_PX, () => {
      img.hidden = true;
      virheita += 1;
      if (virheita === kuvat.length) kehys.hidden = true;
    });
    nappi.appendChild(img);
    nappi.addEventListener('click', (tapahtuma) => {
      tapahtuma.stopPropagation();
      if (estaNapautus) { estaNapautus = false; return; }
      avaaKohdeSuurennos(ui, kuvat[kohdalla], () => nappi, ZOOM_AVAIN);
    });
    raita.appendChild(nappi);
    ruudut.push(nappi);
  }

  const teksti = html('figcaption', 'fokusnosto-kuvateksti tiedeliite-karuselli-teksti');
  const selite = html('span', 'fokusnosto-kuvaselite');
  teksti.append(selite);

  const edellinen = html('button', 'tiedeliite-karuselli-nuoli edellinen', '‹');
  const seuraava = html('button', 'tiedeliite-karuselli-nuoli seuraava', '›');
  edellinen.type = 'button';
  seuraava.type = 'button';
  edellinen.setAttribute('aria-label', 'Edellinen havainnekuva');
  seuraava.setAttribute('aria-label', 'Seuraava havainnekuva');
  ikkuna.append(edellinen, seuraava);

  const pisteet = html('div', 'tiedeliite-karuselli-pisteet');
  const pistenapit = kuvat.map((kuva, j) => {
    const piste = html('button', 'tiedeliite-karuselli-piste');
    piste.type = 'button';
    piste.setAttribute('aria-label', `Havainnekuva ${j + 1}/${kuvat.length}`);
    piste.addEventListener('click', (tapahtuma) => {
      tapahtuma.stopPropagation();
      siirry(j);
    });
    pisteet.appendChild(piste);
    return piste;
  });
  kehys.append(teksti, pisteet);

  /** Raidan paikka: nykyinen kuva ja mahdollinen sormen veto päälle. */
  const asetaRaita = (dx = 0) => {
    const siirto = dx ? ` + ${Math.round(dx)}px` : '';
    raita.style.transform = `translate3d(calc(${-100 * kohdalla}%${siirto}), 0, 0)`;
  };

  /** Kuvateksti, lähderivi, nuolet, pisteet ja kohdistus kuvan mukaan. */
  const nayta = () => {
    const kuva = kuvat[kohdalla];
    // Kortissa lyhyt teksti ilman lähderiviä; pitkä selite ja
    // "Matkakirjan havainnekuva" näkyvät avatussa kuvassa (omistaja
    // 8.9.2026, ks. tiedoston alun lohko).
    selite.textContent = lyhytKuvateksti(kuva);
    // Uusi kuvateksti tulee esiin pehmeästi: luokka irrotetaan ja
    // kiinnitetään uudestaan, jotta CSS-animaatio alkaa alusta.
    teksti.classList.remove('vaihtui');
    void teksti.offsetWidth;
    teksti.classList.add('vaihtui');
    edellinen.disabled = kohdalla <= 0;
    seuraava.disabled = kohdalla >= kuvat.length - 1;
    ruudut.forEach((nappi, j) => {
      // Vain näkyvä kuva on sarkaimella tavoitettava.
      nappi.tabIndex = j === kohdalla ? 0 : -1;
      nappi.setAttribute('aria-hidden', j === kohdalla ? 'false' : 'true');
    });
    pistenapit.forEach((piste, j) => {
      piste.classList.toggle('nykyinen', j === kohdalla);
      if (j === kohdalla) piste.setAttribute('aria-current', 'true');
      else piste.removeAttribute('aria-current');
    });
    asetaRaita();
  };

  function siirry(j) {
    const uusi = Math.min(kuvat.length - 1, Math.max(0, j));
    if (uusi === kohdalla) { asetaRaita(); return; }
    kohdalla = uusi;
    sfx.play('paper');
    nayta();
  }

  edellinen.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    siirry(karusellinKohta(kohdalla, -1, kuvat.length));
  });
  seuraava.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    siirry(karusellinKohta(kohdalla, 1, kuvat.length));
  });

  /*
   * PYYHKÄISY: raita seuraa sormea ja napsahtaa kynnyksen ylityttyä
   * seuraavaan kuvaan. Pystysuora liike jätetään sivun vieritykselle
   * (kortti on `touch-action: pan-y`), joten suunta ratkaistaan
   * ensimmäisistä pikseleistä eikä vaakaraahaus ala vahingossa.
   */
  let raahaus = null;
  ikkuna.addEventListener('pointerdown', (tapahtuma) => {
    if (tapahtuma.pointerType === 'mouse' && tapahtuma.button !== 0) return;
    raahaus = {
      id: tapahtuma.pointerId, x: tapahtuma.clientX, y: tapahtuma.clientY,
      dx: 0, vaaka: false,
    };
  });
  ikkuna.addEventListener('pointermove', (tapahtuma) => {
    if (!raahaus || tapahtuma.pointerId !== raahaus.id) return;
    const dx = tapahtuma.clientX - raahaus.x;
    const dy = tapahtuma.clientY - raahaus.y;
    if (!raahaus.vaaka) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      if (Math.abs(dx) <= Math.abs(dy)) { raahaus = null; return; }
      raahaus.vaaka = true;
      raita.classList.add('raahataan');
      ikkuna.setPointerCapture?.(tapahtuma.pointerId);
    }
    raahaus.dx = dx;
    asetaRaita(dx);
  });
  const lopetaRaahaus = (tapahtuma) => {
    if (!raahaus || (tapahtuma && tapahtuma.pointerId !== raahaus.id)) return;
    const { dx, vaaka } = raahaus;
    raahaus = null;
    raita.classList.remove('raahataan');
    // Sormi liikkui: napautus oli pyyhkäisyn loppu eikä kuvan avaus.
    if (Math.abs(dx) > 6) estaNapautus = true;
    const suunta = vaaka ? karusellinPyyhkaisy(dx) : 0;
    if (suunta) siirry(karusellinKohta(kohdalla, suunta, kuvat.length));
    else asetaRaita();
  };
  ikkuna.addEventListener('pointerup', lopetaRaahaus);
  ikkuna.addEventListener('pointercancel', lopetaRaahaus);

  kehys.addEventListener('keydown', (tapahtuma) => {
    if (tapahtuma.key !== 'ArrowLeft' && tapahtuma.key !== 'ArrowRight') return;
    tapahtuma.stopPropagation();
    siirry(karusellinKohta(kohdalla, tapahtuma.key === 'ArrowRight' ? 1 : -1, kuvat.length));
  });

  nayta();
  sailio.appendChild(kehys);
}

/**
 * Yhden keksijän sivu lööpin riveinä.
 *
 * TAITTO (omistajan tilaus 3.9.2026, pilotti Watt): *"generoitu
 * henkilökuva voisi tulla pienellä oikean yläreunaan ja sen vasemmalle
 * puolelle tulisi leipäteksti. leipätekstin alle havainnekuva ja loppuun
 * voisi lisätä tekstiä itse henkilöstä ja siinä olisi oikealla puolella
 * aito kuva hänestä."*
 *
 *   nimiö · päiväys · otsikko · keksijä · ingressi
 *   ┌───────────────────────────┬──────────┐
 *   │ leipäteksti (juttu)       │ muotokuva│  ← generoitu, pieni
 *   └───────────────────────────┴──────────┘
 *   havainnekuva(t) kuvateksteineen
 *   ┌───────────────────────────┬──────────┐
 *   │ Keksijä: henkilöteksti    │ aito kuva│  ← Commons
 *   └───────────────────────────┴──────────┘
 *   lähderivi
 *
 * Henkilöosio piirtyy vain, kun pysäkillä on `henkilojuttu`; ilman sitä
 * aito kuva jää pois (se kuuluu henkilötekstin rinnalle, ei irralleen).
 * Kaksoispysäkillä (kaksi generoitua kasvoa) molemmat ovat yläkulmassa
 * vierekkäin.
 */
function piirraTiedeliitteenSivu(ui, sailio, t, lahdeVara) {
  /*
   * Nimiö ja paikkarivi EIVÄT ole enää sivulla vaan kortin omassa
   * nimiörivissä (avaaTiedeliite, .tiedeliite-ylarivi): yläreunan
   * kolme palaa kuuluvat samaan riviin, eikä masto saa vieriä pois
   * jutun mukana (omistaja 8.9.2026, ks. tiedoston alun lohko).
   */
  sailio.appendChild(html('h3', 'fokusnosto-kortti-otsikko looppi-otsikko', t.otsikko));
  if (t.henkilo) sailio.appendChild(html('p', 'tiedeliite-henkilo', t.henkilo));
  for (const kappale of jaaKappaleiksi(t.selite ?? '')) {
    sailio.appendChild(html('p', 'looppi-ingressi', kappale));
  }
  const { kasvot, ilmiot } = tiedeliitteenKuvat(t);
  const generoidut = kasvot.filter((k) => k !== t.kuvaAito);
  const aito = kasvot.find((k) => k === t.kuvaAito) ?? null;

  /*
   * 1. Leipäteksti YHTENÄ palstana ja generoitu muotokuva oikealla
   * entistä isompana (omistaja 8.9.2026: *"ehkä teksti voisi olla
   * yhdessä palstassa ja kuva hieman isompa"*). Mitat ovat tyyleissä
   * (.tiedeliite-palsta, css/aikajana.css).
   */
  const palsta = html('div', 'tiedeliite-palsta');
  const teksti = html('div', 'fokusnosto-teksti looppi-leipa tiedeliite-leipa');
  for (const kappale of jaaKappaleiksi(t.juttu ?? '')) {
    teksti.appendChild(html('p', '', kappale));
  }
  palsta.appendChild(teksti);
  piirraKasvot(ui, palsta, generoidut, t.henkilo, 'tiedeliite-kasvot-pieni');
  sailio.appendChild(palsta);

  /*
   * 2. HAVAINNEKUVA(T). Yksi kuva latoutuu entiseen tapaan lehden
   * kuvana, useampi karusellina (omistaja 3.9.2026: *"jos oli useampi
   * havainnekuva, niin ne voisi laittaa nostoihin karuselliksi"*).
   * Molemmilla on sama 16/10-kehys ja sama reunus kuin henkilökuvalla
   * (omistaja 3.9.2026: *"havainnekuvalla voisi olla samanlaiset
   * kehykset kuin henkilökuvalla"*), joten sivun kuvat ovat samaa
   * perhettä olipa niitä yksi tai kaksi — ja kumpikin täyttää palstan
   * reunasta reunaan (omistaja 8.9.2026, ks. piirraIlmiokuva).
   */
  if (ilmiot.length > 1) {
    piirraIlmiokaruselli(ui, sailio, ilmiot, t.henkilo);
  } else {
    for (const kuva of ilmiot) piirraIlmiokuva(ui, sailio, kuva, t.henkilo);
  }

  // 3. Keksijä itse: henkilöteksti ja aito kuva oikealla.
  const henkilojuttu = jaaKappaleiksi(t.henkilojuttu ?? '');
  if (henkilojuttu.length) {
    const osio = html('section', 'tiedeliite-keksija');
    osio.appendChild(html('h4', 'tiedeliite-valiotsikko', t.henkilo ?? 'Keksijä'));
    const rivi = html('div', 'tiedeliite-palsta');
    const henkiloTeksti = html('div', 'fokusnosto-teksti looppi-leipa tiedeliite-leipa');
    for (const kappale of henkilojuttu) henkiloTeksti.appendChild(html('p', '', kappale));
    rivi.appendChild(henkiloTeksti);
    if (aito) piirraKasvot(ui, rivi, [aito], t.henkilo, 'tiedeliite-kasvot-aito');
    osio.appendChild(rivi);
    sailio.appendChild(osio);
  }
  const lahde = t.lahde ?? lahdeVara;
  if (lahde) sailio.appendChild(taytaLahderivi(html('p', 'fokusnosto-lahde'), lahde, t));

  /*
   * VIHJEIDEN SIIVOUS (omistajan raportti 3.9.2026, kuvakaappaus Benz
   * 1886): hiiren tooltip *"Katso kuva suurempana"* jäi leijumaan
   * kuvan päälle ja peitti sivua. Lehtisivulla kuva on kuva, ei
   * työkalu, joten title otetaan pois kaikilta kuvanapeilta — myös
   * mahdollisilta yhteisiltä piirtäjiltä perityiltä; aria-label kertoo
   * saman apuvälineelle.
   */
  for (const nappi of sailio.querySelectorAll('.fokusnosto-kuvanappi[title]')) {
    nappi.removeAttribute('title');
  }
}

/* ==================== AVAUS JA SULKU ==================== */

/**
 * Avaa Tiedeliitteen pysäkille `i`. Palauttaa ohjaimen, jolla kutsuja
 * voi vaihtaa sivua (`vaihda(j)`), tai null jos pysäkillä ei ole
 * sivua.
 *
 * @param {object} ui pelin ui-olio (kortin kirjanpito ui.tiedeliite)
 * @param {object[]} tapahtumat linssin tapahtumat järjestyksessä
 * @param {number} i avattava pysäkki
 * @param {object} [asetukset]
 * @param {string} [asetukset.lahdeVara] lähderivi, jos pysäkillä ei omaa
 * @param {(j: number) => void} [asetukset.kunVaihtuu] sivu vaihtui
 * @param {() => void} [asetukset.kunSuljetaan] kortti suljettiin
 */
export function avaaTiedeliite(ui, tapahtumat, i, {
  lahdeVara = null, kunVaihtuu = null, kunSuljetaan = null, sisallys: sisallysAsetus = null,
  alkusanat = null,
} = {}) {
  if (typeof document === 'undefined') return null;
  if (!onTiedeliitteenSivu(tapahtumat?.[i])) return null;
  sfx.play('paper');
  tiedeliiteLataaTyyli();
  suljeTiedeliite(ui);

  const kerros = html('div', 'tiedeliite-kerros');
  const kortti = html('div', 'tiedeliite-kortti fokusnosto-looppi');
  kortti.setAttribute('role', 'dialog');
  kortti.setAttribute('aria-modal', 'false');

  const sulje = html('button', 'fokusnosto-kortti-sulje', '✕');
  sulje.type = 'button';
  sulje.title = 'Sulje';
  sulje.setAttribute('aria-label', 'Sulje');

  /*
   * HAMPURILAINEN JA SISÄLLYS: sama mustepiirros kuin lehden nimiössä
   * (css/styles.css .lehti-hampurilainen), tässä kortin nimiörivin
   * vasemmassa laidassa. Levy listaa kaikki keksijät vuosineen;
   * nykyinen on lihavoitu. Napautus levyn ulkopuolelle sulkee levyn,
   * ei korttia.
   */
  const hampurilainen = html('button', 'tiedeliite-hampurilainen');
  hampurilainen.type = 'button';
  hampurilainen.title = 'Sisällys';
  hampurilainen.setAttribute('aria-label', 'Sisällys: kaikki keksijät');
  hampurilainen.setAttribute('aria-expanded', 'false');
  hampurilainen.append(html('span'), html('span'), html('span'));

  /*
   * NIMIÖRIVI YHTENÄ RIVINÄ (omistaja 8.9.2026: *"Korjaa tuo yläreuna.
   * Siinä on useampikin asetteluvirhe"*). Kolme palaa samassa
   * ristikkorivissä kortin sisällä: vasemmalla hampurilainen, keskellä
   * nimiö ja sen alla paikkarivi, oikealla kaiutin ja sulku. Kaikki
   * mahtuvat kortin sisään eikä mikään asetu toisen päälle; kaksoisviiva
   * on rivin ALAREUNASSA (css .tiedeliite-ylarivi), ei tekstin päällä.
   *
   * Rivi on KORTISSA eikä sivussa, joten se pysyy paikallaan, kun juttu
   * vierii — sivunvaihdossa vaihtuu vain paikkarivin teksti.
   */
  const ylarivi = html('div', 'tiedeliite-ylarivi');
  const nimiot = html('div', 'tiedeliite-nimiot');
  const paikkarivi = html('p', 'looppi-paivays tiedeliite-paikkarivi');
  nimiot.append(html('p', 'looppi-nimio', 'Tiedeliite'), paikkarivi);
  const ylanapit = html('div', 'tiedeliite-ylanapit');
  ylanapit.appendChild(sulje);
  ylarivi.append(hampurilainen, nimiot, ylanapit);
  kortti.appendChild(ylarivi);

  const sisallys = html('nav', 'tiedeliite-sisallys');
  /*
   * SISÄLLYS YHTENÄ LISTANA (omistaja 7.9.2026 ilta, Raamattu "IHMISEN
   * MATKA: YKSI PALKKI …" kohta 6): kaksipalstainen levy meni Ihmisen
   * matkassa riveillään päällekkäin, koska ajoitukset ovat pitkiä
   * ("vähintään noin 230 000 vuotta sitten"). Kaari voi pyytää YHDEN
   * palstan aikajärjestyksen listan, jossa rivillä on vanan väripilkku,
   * lyhyt ajoitus ja otsikko: `sisallys: { lista, ajoitus(t), pilkku(t) }`.
   * Ilman asetusta (keksinnöt) levy on kirjaimelleen entinen.
   */
  if (sisallysAsetus?.lista) sisallys.classList.add('lista');
  sisallys.hidden = true;
  sisallys.setAttribute('aria-label', 'Keksijät');
  kortti.appendChild(sisallys);

  const sisalto = html('div', 'fokusnosto-sisalto tiedeliite-sisalto');
  kortti.appendChild(sisalto);

  const navi = html('div', 'tiedeliite-navi');
  const edellinenNappi = html('button', 'tiedeliite-navinappi edellinen');
  const seuraavaNappi = html('button', 'tiedeliite-navinappi seuraava');
  edellinenNappi.type = 'button';
  seuraavaNappi.type = 'button';
  navi.append(edellinenNappi, seuraavaNappi);
  kortti.appendChild(navi);

  kerros.appendChild(kortti);
  document.body.appendChild(kerros);

  let nykyinen = -1;
  let sivu = null;

  const naviteksti = (nappi, j, merkki, ennen) => {
    const t = tapahtumat[j];
    nappi.disabled = !t;
    nappi.textContent = '';
    if (!t) {
      nappi.textContent = ennen ? `${merkki} Kaaren alku` : `Kaaren loppu ${merkki}`;
      nappi.setAttribute('aria-label', ennen ? 'Ei edellistä keksijää' : 'Ei seuraavaa keksijää');
      return;
    }
    const nimi = t.henkilo ?? t.otsikko;
    nappi.append(
      html('span', 'tiedeliite-navimerkki', merkki),
      html('span', 'tiedeliite-navinimi', `${ajoitus(t)} ${nimi}`),
    );
    nappi.setAttribute('aria-label', `${ennen ? 'Edellinen' : 'Seuraava'} keksijä: ${ajoitus(t)} ${nimi}`);
  };

  const suljeSisallys = () => {
    sisallys.hidden = true;
    hampurilainen.setAttribute('aria-expanded', 'false');
  };

  /*
   * MIKÄ NÄHTIIN ESITYKSESSÄ (omistaja 6.9.2026 ilta: *"pelaaja voisi
   * itse katsella ne ohitettu kuvat läpi"*). Kun kaari merkitsee
   * pysäkkinsä hiljaisiksi (js/aikajana.js, Ihmisen matka), sisällys
   * kertoo merkillä, mitkä kuudesta tulivat jo vastaan matkalla — muut
   * ovat niitä ohitettuja, joita pelaaja tuli katsomaan. Kaarella ilman
   * lippua (keksinnöt) sisällys on kirjaimelleen entinen.
   */
  const merkitaanEsitys = tapahtumat.some((t) => t?.hiljainen !== undefined);

  const taytaSisallys = () => {
    sisallys.textContent = '';
    tapahtumat.forEach((t, j) => {
      if (!onTiedeliitteenSivu(t)) return;
      const rivi = html('button', `tiedeliite-sisallysrivi${j === nykyinen ? ' nykyinen' : ''}`);
      rivi.type = 'button';
      const vari = sisallysAsetus?.pilkku?.(t) ?? null;
      if (vari) {
        const pilkku = html('span', 'tiedeliite-sisallyspilkku');
        pilkku.style.setProperty('--pilkku', vari);
        pilkku.setAttribute('aria-hidden', 'true');
        rivi.appendChild(pilkku);
      }
      rivi.append(
        html('span', 'tiedeliite-sisallysvuosi', String(sisallysAsetus?.ajoitus?.(t) ?? ajoitus(t))),
        html('span', 'tiedeliite-sisallysnimi', t.henkilo ?? t.otsikko),
      );
      if (merkitaanEsitys && !t.hiljainen) {
        const merkki = html('span', 'tiedeliite-sisallysmerkki', '◈');
        merkki.title = 'näytettiin esityksessä';
        rivi.appendChild(merkki);
      }
      if (j === nykyinen) rivi.setAttribute('aria-current', 'page');
      rivi.addEventListener('click', () => { suljeSisallys(); vaihda(j); });
      sisallys.appendChild(rivi);
    });
  };

  /**
   * SIVUN VAIHTO RISTIHÄIVYTYKSENÄ: vanha sivu häipyy, uusi tulee
   * tilalle ja vieritys palaa alkuun. Kesto tulee CSS:stä
   * (.tiedeliite-sivu), reduced motion vaihtaa heti.
   */
  const vaihda = (j, { heti = false } = {}) => {
    const t = tapahtumat[j];
    if (!onTiedeliitteenSivu(t) || j === nykyinen) return;
    nykyinen = j;
    kortti.setAttribute('aria-label', `Tiedeliite: ${t.otsikko}`);
    // Paikkarivi on kortin nimiörivissä: vain sen teksti vaihtuu.
    paikkarivi.textContent = [ajoitus(t), paikka(t)].filter(Boolean).join(' · ');
    const uusi = html('div', 'tiedeliite-sivu');
    piirraTiedeliitteenSivu(ui, uusi, t, lahdeVara);
    /*
     * ALKUSANAT ENSIMMÄISELLE SIVULLE (omistaja 8.9.2026: kaistan selite
     * Tiedeliitteen alkuun): kaari voi antaa yhden kappaleen, joka
     * piirtyy vain kaaren ensimmäisen Tiedeliite-sivun kärkeen. Muut
     * sivut ja muut kaaret ovat ennallaan.
     */
    if (alkusanat && j === tapahtumat.findIndex((x) => onTiedeliitteenSivu(x))) {
      const kappale = html('p', 'tiedeliite-alkusanat', String(alkusanat));
      uusi.insertBefore(kappale, uusi.firstChild);
    }
    /*
     * Kaiutin kortin nimiöriville (js/lukija.js lisaaLukijanappi):
     * jokainen keksijäsivu on oma juttunsa ja saa oman luentansa.
     * Nimiö ei ole enää sivussa, joten rivi annetaan suoraan — ja
     * vanha nappi puretaan ensin, jotta uusi sivu pysäyttää edellisen
     * luennan kuten ennenkin (lisaaLukijanappi vertaa nappia).
     */
    ylanapit.querySelector('.lukija-nappi')?.remove();
    lisaaLukijanappi(uusi, { otsikko: 'Kuuntele tiedeliite', rivi: ylanapit });
    const vanha = sivu;
    sivu = uusi;
    const { edellinen, seuraava } = tiedeliitteenNaapurit(tapahtumat, j);
    naviteksti(edellinenNappi, edellinen, '‹', true);
    naviteksti(seuraavaNappi, seuraava, '›', false);
    edellinenNappi.onclick = () => { if (edellinen >= 0) { sfx.play('paper'); vaihda(edellinen); } };
    seuraavaNappi.onclick = () => { if (seuraava >= 0) { sfx.play('paper'); vaihda(seuraava); } };
    if (!vanha || heti) {
      sisalto.textContent = '';
      sisalto.appendChild(uusi);
    } else {
      suljeKohdeSuurennos(ui, ZOOM_AVAIN);
      vanha.classList.add('vaihtuu');
      uusi.classList.add('tulossa');
      sisalto.appendChild(uusi);
      void uusi.offsetWidth;
      uusi.classList.remove('tulossa');
      const pois = () => vanha.remove();
      vanha.addEventListener('transitionend', pois, { once: true });
      setTimeout(pois, 400);
    }
    sisalto.scrollTop = 0;
    kunVaihtuu?.(j);
  };

  const kiinni = () => {
    sfx.play('paper');
    suljeTiedeliite(ui);
  };
  sulje.addEventListener('click', kiinni);
  hampurilainen.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    if (sisallys.hidden) {
      taytaSisallys();
      sisallys.hidden = false;
      hampurilainen.setAttribute('aria-expanded', 'true');
    } else {
      suljeSisallys();
    }
  });
  // Napautus kortin ULKOPUOLELLE sulkee; nielu estää saman napautuksen
  // valumisen kartalle (ks. ui-apurit nielaiseSulkevaNapautus). Kortin
  // sisällä napautus levyn ulkopuolelle sulkee vain levyn.
  kerros.addEventListener('pointerdown', (tapahtuma) => {
    if (tapahtuma.target?.closest?.('.tiedeliite-kortti')) {
      if (!sisallys.hidden && !tapahtuma.target.closest('.tiedeliite-sisallys, .tiedeliite-hampurilainen')) {
        suljeSisallys();
      }
      return;
    }
    nielaiseSulkevaNapautus(tapahtuma);
    kiinni();
  });
  const nappain = (tapahtuma) => {
    if (tapahtuma.key === 'Escape') {
      // Kuvan suurennos ja sisällyslevy sulkeutuvat ensin.
      if (ui?.[ZOOM_AVAIN]) return;
      tapahtuma.stopPropagation();
      if (!sisallys.hidden) { suljeSisallys(); return; }
      suljeTiedeliite(ui);
      return;
    }
    /*
     * NUOLET KUULUVAT KARUSELLILLE, KUN KOHDISTUS ON SIINÄ. Sivun
     * vaihto on nuolten oletustyö, mutta kun pelaaja on juuri
     * napauttanut havainnekuvan karusellia, samat näppäimet selaavat
     * sen kuvia (kuuntelija on karusellin kehyksessä). Tämä kuuntelija
     * on kaappausvaiheessa, joten väistö on tehtävä tässä.
     */
    if (document.activeElement?.closest?.('.tiedeliite-karuselli')) return;
    if (tapahtuma.key === 'ArrowLeft' && !edellinenNappi.disabled) edellinenNappi.click();
    if (tapahtuma.key === 'ArrowRight' && !seuraavaNappi.disabled) seuraavaNappi.click();
  };
  document.addEventListener('keydown', nappain, true);

  ui.tiedeliite = {
    kerros,
    vaihda,
    purku: () => {
      document.removeEventListener('keydown', nappain, true);
      kunSuljetaan?.();
    },
  };

  vaihda(i, { heti: true });
  void kerros.offsetWidth;
  kerros.classList.add('tiedeliite-auki');
  return ui.tiedeliite;
}

/** Sulkee Tiedeliitteen; turvallinen myös kun mitään ei ole auki. */
export function suljeTiedeliite(ui) {
  const auki = ui?.tiedeliite;
  if (ui) ui.tiedeliite = null;
  auki?.purku?.();
  suljeKohdeSuurennos(ui, ZOOM_AVAIN);
  if (typeof document === 'undefined') return;
  for (const vanha of document.querySelectorAll('.tiedeliite-kerros')) vanha.remove();
}

/** Onko Tiedeliite auki. */
export function tiedeliitePaalla(ui) {
  return Boolean(ui?.tiedeliite);
}
