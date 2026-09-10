/*
 * ================== PULU-CAM: PULUN KUVAT PAKKANA ==================
 *
 * Omistaja 9.9.2026 klo 15.20–15.30 postilaatikon kautta (Raamattu,
 * "PULU-CAM: PULUN NYKYAJAN KUVAT PAKKANA ISOISAN KUVAN PAALLE,
 * YHTEINEN KARUSELLI", sanatarkasti):
 *
 *   *"Joo hyvä, tehdään juuri noin."* [pulun laajakulmakameran
 *   nykyajan kuva isoisän kuvan päälle pulun kommentin alkaessa, pieni
 *   piirretty selfie-merkki tekstillä PULU-CAM erillisenä elementtinä]
 *
 *   *"Ja jossain kohtaa esim siinä rakastumis kohtauksessa niitä kuvia
 *   voisi pulpahtaa vahingossa useampia ja kaikissa se pulun ihastus
 *   eri paikoissa kaupunkia?"*
 *
 *   *"Yksi tai useampi kuva voisi tosiaan tulla pelissä isoisän ottaman
 *   kuvan päälle ja ne voisivat limittyä hieman. Eri suuntiin pakan
 *   päälle, niin että siinä hahmottaa, että pakassa on useampi kuva."*
 *
 *   *"Sitten kun päällimmäistä kuvaa klikkaa, niin pääsee karuselliin,
 *   missä näkyy isoisän kuva isona sekä kaikki muut pulun kuvat."*
 *
 * TARKENNUS 9.9.2026 klo 18.50 (Raamattu, "PULU-CAM: RAKKAUSKOHTAUS
 * 3-5 KUVAA, KAKSI KUVATEKSTIA MOLEMMILLE, HAVAINNEKUVA-LINKKI PITKAN
 * LOPUSSA, TARRA YHTENA PNG:NA OMISTAJAN VALINNASTA"): tavallinen
 * kohde saa 1–3 kuvaa ja rakkauskohtaus 3–5, eli pakassa on isoisän
 * kanssa enintään kuusi kuvaa (PULUCAM_KATTO). PULU-CAM-merkki on nyt
 * YKSI tarra-PNG, jossa teksti on jo mukana — erillistä HTML-tekstiä
 * ei enää ole, ja ennen omistajan valintaa kuvat näkyvät puhtaina.
 *
 * ── MITÄ TÄMÄ MODUULI ON JA MITÄ SE EI OLE ────────────────────────
 *
 * TÄMÄ ON PAKAN PIIRTÄJÄ JA SEN AJASTIN — ei mitään muuta. Pakka
 * ladotaan aina LUENTAKUVAN PANEELIIN (js/fokusvirta.js
 * naytaLuentakuva → ankkuroiLuentakuva), joka hoitaa ankkurin kartan
 * kohtaan, raahauksen ja pienennyksen. Siitä seuraa kolme asiaa
 * ilmaiseksi, eikä yhtäkään niistä saa toteuttaa täällä uudestaan:
 *
 *   1. pakka seuraa karttaa, koska paneeli seuraa;
 *   2. raahaus siirtää KOKO PAKAN, koska ele on paneelin oma;
 *   3. kartan liike pienentää pakan yhdessä luentakuvan kanssa.
 *
 * TÄMÄ EI OSAA OSOITTEITA. Kuvan osoite ratkeaa talon yhdellä
 * porrastuksella (`osoite` → `ampari` → Commonsin `tiedosto`,
 * js/fokusvirta.js kuvanOsoite), ja kutsuja antaa sen valmiina
 * funktiona. Toinen osoiteketju tässä tiedostossa alkaisi heti ajautua
 * omaan suuntaansa — ja samalla syntyisi kehä (fokusvirta tuo tämän).
 *
 * TÄMÄ EI AVAA KARUSELLIA. Karuselli on laajennettu suurennos
 * (js/fokusvirta.js avaaSuurennos), ja kutsuja antaa sen `avaa`-
 * takaisinkutsuna samasta syystä.
 *
 * ── KOKEILUERÄ: MEKANISMI ENSIN, DATA PERÄSSÄ ─────────────────────
 *
 * Raamattu, UUSI SARJATEHTAVA ALOITETAAN AINA PIENELLA KOKEILUERALLA.
 * Tässä erässä EI ole yhtäkään pulun kuvaa tuotantodatassa: kenttä
 * `pollo.kuvat` on dokumentoitu (js/packs/fokusvirta-lontoo.js) ja
 * mekanismi tehty, ja kuvatoimitus tuo viiden kuvan kokeiluerän
 * (Lontoo 1, Pariisi 1, Venetsia 3) omistajan arvioon. Ilman kenttää
 * kaupungin kulku on TÄSMÄLLEEN ennallaan.
 */

import { html } from './ui-apurit.js';
import { asetaKuva } from './media.js';
import { kuvatekstiLyhyt } from './kuvatekstit.js';

/**
 * PULU-CAM-TARRA: YKSI RGBA-PNG, JOSSA TEKSTI ON JO MUKANA.
 *
 * Omistaja 9.9.2026 klo 18.50 (Raamattu, PULU-CAM: RAKKAUSKOHTAUS 3-5
 * KUVAA…, kohta 4): *"PuluCam-tarra on yksi erillinen RGBA-PNG
 * (valkoinen pohja piirroksen ja PuluCam-tekstin siluetin sisalla,
 * ulkopuoli lapinakyva); se korvaa selfie-PNG + HTML-teksti
 * -rakenteen. Vaihtoehdot A-F ovat omistajan valintaan; ennen valintaa
 * kuvat nakyvat puhtaina ilman tarraa."*
 *
 * KAKSI ASIAA, JOTKA TÄSTÄ SEURAAVAT:
 *
 *   1. HTML-TEKSTIÄ EI ENÄÄ OLE. Aiemmin merkki oli kaksi elementtiä
 *      (selfie + `PULU-CAM`-teksti); nyt teksti on tarran sisällä, ja
 *      kaksi lähdettä samalle sanalle olisi kaksi totuutta.
 *   2. NULL EI OLE VARAKUVAKE VAAN PUHDAS KUVA. Kun omistaja ei ole
 *      vielä valinnut vaihtoehtoa A–F, pulun kuvissa EI näy mitään
 *      merkkiä — ei pakassa eikä karusellissa. Väliaikainen sijainen
 *      (entinen POLLO_IKONI) näyttäisi valinnalta, jota ei ole tehty.
 *
 * Osoitteen liittäminen on yhden rivin työ: kun tarra on ämpärissä,
 * tähän kirjoitetaan sen osoite.
 *
 * @type {?string}
 */
// Omistaja valitsi MUSTEENSINISEN SINETIN (9.9.2026, sanatarkasti: "Tuo
// sinetti on hyvä. Käytetään sitä. Vie peliin"): 1254×1254 RGBA-PNG, joka
// on läpinäkyvä myös sinetin sisällä (kuvatoimitus
// posti/kuvatoimitus-pulucam-sinetti-20260909.json). Sinetti sijoitetaan
// kuvan OIKEAAN YLÄKULMAAN (css/fokusvirta.css .pulucam-merkki).
// Aiempi B-tarra (pulucam-sticker-B-r20260909-v1.png) jää arkistoon.
export const PULU_CAM_TARRA_OSOITE = 'https://media.matkakirja.app/matkakirja/pulu-cam/pulu-cam-leima-musteensininen-v1.png';

/**
 * TARRAN LEVEYS: 22 % KUVAN LEVEYDESTÄ, KATTO 160 px.
 *
 * Osuus on css:n `--pulucam-mitta`-muuttujan (kartalla luentakuvan
 * leveys, suurennoksessa js:n laskema kuvan leveys) kerroin, ja katto
 * estää tarraa kasvamasta koko ruudun suurennoksessa julisteeksi.
 * Luvut ovat täällä eivätkä vain css:ssä, jotta testit valvovat samaa
 * sopimusta kuin ulkoasu.
 */
export const PULUCAM_TARRA_OSUUS = 0.22;
export const PULUCAM_TARRA_KATTO_PX = 160;

/**
 * Enintään viisi pulun kuvaa kaupunkia kohti.
 *
 * Omistaja 9.9.2026 klo 18.50: *"Tavallinen kohde saa 1-3 pulun kuvaa,
 * rakkauskohtaus 3-5, jos tarina tarvitsee — pakassa siis enintaan
 * kuusi kuvaa isoisan kuvan kanssa."* Katto on siis rakkauskohtauksen
 * katto; tavallisen kohteen 1–3 on toimituksen ohje eikä koodin
 * rajoite, koska sama pakka piirtää molemmat.
 */
export const PULUCAM_KATTO = 5;

/**
 * PAKAN ASENNOT — DETERMINISTISET, EIVÄT SATUNNAISIA.
 *
 * Satunnaisluku vaihtaisi pakan asentoa kesken pelin ja tekisi
 * ruutukaappauksista vertailukelvottomia. Kulmat ovat omistajan
 * kuvauksen mukaan "eri suuntiin" (+4°, −3°, +2°, −6°, +7°) ja
 * siirtymä 6–10 % KUVAN KOOSTA, jotta alempien kuvien reunat jäävät
 * näkyviin.
 *
 * VIISI ASENTOA, KOSKA RAKKAUSKOHTAUS SAA VIISI KUVAA (omistaja
 * 9.9.2026 klo 18.50). Neljäs ja viides eivät ole kolmen ensimmäisen
 * toistoa: niiden kulmat ovat jyrkempiä ja siirtymät eri neljänneksiin
 * (alas-vasen, ylös-oikea), jotta viidenkin kuvan pakassa jokaisen
 * ALEMMAN kuvan reuna jää näkyviin eikä pakka sulkeudu yhdeksi
 * suorakaiteeksi. Kierto (pulucamAsento) ei siis koskaan osu peliin
 * käytännössä, mutta se säilyy varmuuden vuoksi.
 *
 * Siirtymä on prosenttia, ei pikseleitä: pakka pienenee kartan
 * liikkeestä paneelin mukana, ja pikselisiirtymä kasvaisi silloin
 * suhteessa liian isoksi.
 */
export const PULUCAM_ASENNOT = [
  { kulma: 4, x: 6, y: -6 },
  { kulma: -3, x: -7, y: 7 },
  { kulma: 2, x: 9, y: -9 },
  { kulma: -6, x: -9, y: -8 },
  { kulma: 7, x: 8, y: 10 },
];

/**
 * PULPAHDUSTEN VÄLIT (ms): ensimmäinen kuva nousee heti, seuraavat
 * 0,9–1,2 s välein. Omistaja: kuvia *"voisi pulpahtaa vahingossa
 * useampia"* — vahinko on sitä, että ne tulevat yksitellen ja hieman
 * eri tahtiin, ei kerralla riviin.
 *
 * VIISI VÄLIÄ VIIDELLE KUVALLE, eivätkä ne ole samat: tasavälinen
 * jono kuulostaisi ajastimelta, ja rakkauskohtauksen viisi kuvaa
 * tulevat "vahingossa". Koko pakka on kasassa noin 4,3 sekunnissa,
 * eli pulun repliikin aikana.
 */
export const PULUCAM_VALIT_MS = [0, 950, 1150, 1050, 1100];

/** Monennenko millisekunnin kohdalla kuva `i` pulpahtaa. */
export function pulucamViive(i) {
  let summa = 0;
  for (let n = 0; n <= i && n < PULUCAM_VALIT_MS.length; n += 1) summa += PULUCAM_VALIT_MS[n];
  return summa;
}

/** Kuvan asento pakassa (kierto ylimenevillä indekseillä). */
export function pulucamAsento(i) {
  const pituus = PULUCAM_ASENNOT.length;
  return PULUCAM_ASENNOT[(((i | 0) % pituus) + pituus) % pituus];
}

/**
 * Kaupungin pulun kuvat pakin sisällöstä, enintään PULUCAM_KATTO.
 *
 * SAMA EHTO KUIN LUENTAKUVALLA: kuva kelpaa vain, jos sillä on jokin
 * kolmesta osoitelähteestä. Pelkkä selite ilman kuvaa jättäisi
 * kartalle tyhjän kortin, joka selittää kuvaa jota ei ole.
 *
 * @param {?object} sisalto kaupungin fokusvirta (js/packs/fokusvirrat.js)
 * @returns {Array<object>} toimituksen järjestyksessä, enintään
 *   PULUCAM_KATTO kappaletta; tyhjä lista, jos kenttää ei ole.
 */
export function pulunKuvat(sisalto) {
  const lista = sisalto?.pollo?.kuvat;
  if (!Array.isArray(lista)) return [];
  return lista
    .filter((k) => k && (k.osoite || k.ampari || k.tiedosto))
    .slice(0, PULUCAM_KATTO);
}

/**
 * PULU-CAM-TARRA KUVAN OIKEAAN ALAKULMAAN — TAI EI MITÄÄN.
 *
 * TARRAA EI POLTETA KUVAAN (Raamattu, kohta 3 säilyy): se on yksi
 * HTML-elementti kuvan päällä, joten sama valokuva kelpaa
 * sellaisenaan pakkaan, karuselliin ja mahdolliseen myöhempään
 * käyttöön ilman merkkiä.
 *
 * TEKSTI ON TARRASSA, EI HTML:SSÄ (omistaja 9.9.2026 klo 18.50):
 * kuvassa on jo sana PuluCam piirroksen kanssa samassa siluetissa,
 * eikä sen viereen ladota toista tekstiä.
 *
 * ILMAN OSOITETTA PALAUTUU NULL. Se on tarkoituksellinen tila: ennen
 * omistajan valintaa (A–F) pulun kuvat näkyvät PUHTAINA. Kutsujan on
 * siis kestettävä null — pakan kortti jää ilman tarraa ja suurennos
 * ilman kuorta, eli täsmälleen samaan asuun kuin ennen tätä koko
 * ominaisuutta.
 *
 * @param {object} [asetukset]
 * @param {string} [asetukset.luokka] lisäluokka (suurennoksessa oma).
 * @param {?string} [asetukset.osoite] tarran osoite; oletus on
 *   `PULU_CAM_TARRA_OSOITE`. Parametri on testejä varten — vakiota ei
 *   voi vaihtaa ajon aikana, ja tarrallinen asu on silti valvottava.
 * @returns {?Element} `.pulucam-merkki`, tai null jos tarraa ei ole
 */
export function puluCamMerkki({ luokka = '', osoite = PULU_CAM_TARRA_OSOITE } = {}) {
  if (!osoite || typeof document === 'undefined') return null;
  const merkki = html('span', luokka ? `pulucam-merkki ${luokka}` : 'pulucam-merkki');
  merkki.setAttribute('aria-hidden', 'true');
  const img = document.createElement('img');
  img.className = 'pulucam-tarra';
  img.alt = '';
  img.decoding = 'async';
  img.draggable = false;
  // Rikkinäinen tarra vie oman elementtinsä, ei kuvaa: puhdas kuva on
  // parempi kuin tyhjä laatikko kulmassa.
  asetaKuva(img, osoite, null, () => merkki.remove());
  merkki.appendChild(img);
  return merkki;
}

/**
 * Yksi pakan kortti: nappi, kuva ja (jos tarra on valittu) PULU-CAM-tarra.
 *
 * @param {object} kuva pakin kuvaolio
 * @param {number} i sijaluku pakassa (asento ja pulpahdusvuoro)
 * @param {(kuva:object)=>?string} osoite osoitteen ratkaisija
 * @param {(kuva:object)=>?string} vara varaosoitteen ratkaisija
 * @returns {Element} `.pulucam-kuva`
 */
function pakanKortti(kuva, i, osoite, vara) {
  const kortti = html('button', 'pulucam-kuva');
  kortti.type = 'button';
  /*
   * NIMILAPPU KERTOO, MITÄ NAPAUTUS TEKEE. Alempi kortti nousee
   * päälle, päällimmäinen avaa karusellin — ja kumpikin teksti
   * kirjoitetaan pakan järjestyksestä (asetaKortinOhje), koska
   * järjestys vaihtuu pelaajan napautuksista.
   */
  kortti.title = 'Nosta kuva päälle';
  const img = document.createElement('img');
  // Kartalla lyhyt, suurennoksessa pitkä (js/kuvatekstit.js).
  img.alt = kuvatekstiLyhyt(kuva);
  img.decoding = 'async';
  img.draggable = false;
  /*
   * PUUTTUVA KUVA VIE OMAN KORTTINSA, ei koko pakkaa: kaksi muuta
   * kuvaa ovat yhä kuvia, ja rikkinäinen kolmas jättäisi vain tyhjän
   * paperin isoisän kuvan päälle.
   */
  asetaKuva(img, osoite(kuva), vara(kuva), () => kortti.remove());
  kortti.appendChild(img);
  // Ilman omistajan valitsemaa tarraa kuva näkyy puhtaana.
  const tarra = puluCamMerkki();
  if (tarra) kortti.appendChild(tarra);
  return kortti;
}

/**
 * ISOISÄN KUVAN TUNNUS PAKAN JÄRJESTYKSESSÄ.
 *
 * Omistaja 10.9.2026 (Raamattu, PULUN KUVALLE KUVATEKSTI, PAKAN
 * ALEMMAN KUVAN NAPAUTUS NOSTAA SEN PAALLE…, sanatarkasti: *"kuvia
 * pitäisi voida vaihdella näytöllä jos klikkaa alempana näkyvää
 * kuvaa"*). Isoisän kuva on pakassa YKSI KORTTI MUIDEN JOUKOSSA: sen
 * näkyvän reunan napautus nostaa sen päälle täsmälleen kuten pulun
 * kortin. Se ei kuitenkaan ole pakan lapsi vaan paneelin oma kuva
 * (js/fokusvirta.js), joten järjestyksessä se on nimetty tunnus eikä
 * sijaluku.
 */
export const PULUCAM_POHJA = 'pohja';

/** Kortin elementti tunnuksella (POHJA = isoisän kuva). */
function kortinElementti(tila, tunnus) {
  return tunnus === PULUCAM_POHJA ? tila?.pohjakortti ?? null : tila?.kortit?.[tunnus] ?? null;
}

/** Kortin kuvaolio tunnuksella. */
function kortinKuva(tila, tunnus) {
  return tunnus === PULUCAM_POHJA ? tila?.pohjakuva ?? null : tila?.kuvat?.[tunnus] ?? null;
}

/**
 * Kortin nimilappu kertoo, mitä napautus tekee (ks. pakanKortti).
 */
function asetaKortinOhje(el, paalla) {
  if (!el) return;
  el.title = paalla ? 'Katso kuvat suurempana' : 'Nosta kuva päälle';
}

/**
 * PAKAN JÄRJESTYS RUUDULLE: KERROKSET, ASENNOT JA KUVATEKSTI.
 *
 * KOLME ASIAA YHDESSÄ, KOSKA NE OVAT SAMA ASIA:
 *
 *  1. KERROS. `--pulucam-kerros` on korttien z-index, ja isoisän kuva
 *     lukee sen samasta muuttujasta (css .fokusvirta-luentakuva
 *     .fokusvirta-kuva) — muuten pohjaa ei voisi nostaa pakan päälle.
 *  2. ASENTO. Kulma ja siirtymä tulevat KORTIN SIJASTA PAKASSA eivätkä
 *     sen sijaluvusta toimituksen listalla: kun pelaaja nostaa alemman
 *     kortin päälle, kortit vaihtavat asentoa keskenään ja pakka
 *     näyttää yhä pakalta — samat viisi asentoa, sama limitys.
 *     Isoisän kuva pitää oman paikkansa (se on paneelin kuva, jonka
 *     päälle pakka on ladottu), joten asennot jaetaan vain pulun
 *     korteille.
 *  3. KUVATEKSTI. Kartalla luetaan aina PÄÄLLIMMÄISEN kuvan lyhyt
 *     teksti (omistaja 9.9. klo 18.50 ja 10.9.), joten teksti
 *     vaihtuu samassa kohdassa kuin kerrokset.
 */
function jarjestaPakka(tila) {
  let sija = 0;
  let pulusija = 0;
  for (const tunnus of tila.jarjestys) {
    sija += 1;
    const el = kortinElementti(tila, tunnus);
    el?.style?.setProperty?.('--pulucam-kerros', String(sija));
    asetaKortinOhje(el, sija === tila.jarjestys.length);
    if (tunnus === PULUCAM_POHJA) continue;
    const asento = pulucamAsento(pulusija);
    pulusija += 1;
    el?.style?.setProperty?.('--pulucam-kulma', `${asento.kulma}deg`);
    el?.style?.setProperty?.('--pulucam-x', `${asento.x}%`);
    el?.style?.setProperty?.('--pulucam-y', `${asento.y}%`);
  }
  const paallimmainen = tila.jarjestys[tila.jarjestys.length - 1];
  if (paallimmainen === undefined) return;
  tila.kuvateksti?.(kortinKuva(tila, paallimmainen));
}

/**
 * ALEMMAN KORTIN NAPAUTUS NOSTAA SEN PÄÄLLE (omistaja 10.9.2026).
 *
 * Nosto on PAKAN LEIKKAUS eikä uusi pakka: kortti vedetään pois
 * välistä ja lasketaan päällimmäiseksi, muiden keskinäinen järjestys
 * säilyy. Asennot jaetaan uudestaan sijan mukaan (jarjestaPakka), eli
 * nostettu kortti saa päällimmäisen asennon ja väliin jääneet
 * siirtyvät yhden verran — pakka pysyy pakkana.
 *
 * @returns {boolean} nousiko kortti (false = se oli jo päällimmäisenä
 *   tai pakkaa ei ole)
 */
export function nostaPuluCamKortti(ui, tunnus) {
  const tila = ui?.pulucamPakka;
  if (!tila) return false;
  const i = tila.jarjestys.indexOf(tunnus);
  if (i < 0 || i === tila.jarjestys.length - 1) return false;
  tila.jarjestys.splice(i, 1);
  tila.jarjestys.push(tunnus);
  jarjestaPakka(tila);
  return true;
}

/**
 * Pakan päällimmäinen kortti: tunnus ja kuvaolio (tai null).
 *
 * Karuselli avautuu siitä kuvasta, joka on päällimmäisenä (omistajan
 * täsmennys 10.9.2026: *"riippuen siitä mikä kuva on pakan
 * päällimmäisenä pitää aueta ensimmäisenä karusellissa täydessä
 * koossa"*), joten kutsujan on voitava kysyä se.
 */
export function puluCamPaallimmainen(ui) {
  const tila = ui?.pulucamPakka;
  const tunnus = tila?.jarjestys?.[tila.jarjestys.length - 1];
  if (tila == null || tunnus === undefined) return null;
  return { tunnus, kuva: kortinKuva(tila, tunnus) };
}

/**
 * PAKKA ISOISÄN KUVAN PÄÄLLE.
 *
 * Kutsutaan siitä yhdestä kohdasta, jossa pulun kommenttikupla
 * OIKEASTI nousee ruudulle (js/fokusvirta.js fokusvirtaSaapumiskupla →
 * nayta, sama koukku kuin Etsi aarre -napilla) — ei kutsuhetkellä,
 * koska ketju odottaa luentaa ja paljastussarjaa.
 *
 * @param {object} ui
 * @param {object} asetukset
 * @param {Element} asetukset.pohja `.fokusvirta-kuva` (tai pohjaton laatikko)
 * @param {Array<object>} asetukset.kuvat pulun kuvat järjestyksessä
 * @param {(kuva:object)=>?string} asetukset.osoite
 * @param {(kuva:object)=>?string} asetukset.vara
 * @param {(i:number)=>void} asetukset.avaa karusellin avaus
 * @param {()=>boolean} [asetukset.raahattu] tosi, jos ele oli raahaus
 * @param {(kuva:object)=>void} [asetukset.kuvateksti] kutsutaan joka
 *   pulpahduksessa PÄÄLLIMMÄISEKSI nousseella kuvalla, jotta kuvan
 *   alla oleva lyhyt kuvateksti kertoo siitä kuvasta, joka on
 *   päällimmäisenä (omistaja 9.9.2026 klo 18.50).
 * @returns {boolean} nousiko pakka
 */
export function naytaPuluCamPakka(ui, {
  pohja, kuvat, osoite, vara, avaa, raahattu = () => false, kuvateksti = null,
  pohjakortti = null, pohjakuva = null,
} = {}) {
  if (!ui || !pohja || !kuvat?.length) return false;
  piilotaPuluCamPakka(ui);
  const pakka = html('div', 'pulucam-pakka');
  pakka.setAttribute('role', 'group');
  pakka.setAttribute('aria-label', 'Pulun nykyajan kuvat');
  pohja.appendChild(pakka);

  const ajastimet = [];
  /*
   * ISOISÄN KUVA ON PAKAN ALIN KORTTI (omistaja 10.9.2026). Se on
   * järjestyksessä mukana vain jos se on oikea kuva: pohjattomassa
   * pakassa (kaupungilla ei ole luentakuvaa) alla on pelkkä
   * paikanvaraaja, jota ei voi nostaa päälle eikä selittää.
   */
  const tila = {
    pakka, ajastimet, kuvat, kortit: [], kuvateksti, pohjakortti, pohjakuva, jarjestys: [],
  };
  if (pohjakuva && pohjakortti) tila.jarjestys.push(PULUCAM_POHJA);
  ui.pulucamPakka = tila;

  kuvat.forEach((kuva, i) => {
    const kortti = pakanKortti(kuva, i, osoite, vara);
    /*
     * NAPAUTUS: ALEMPI KORTTI NOUSEE, PÄÄLLIMMÄINEN AVAA KARUSELLIN
     * (omistaja 10.9.2026, sanatarkasti: *"kuvia pitäisi voida
     * vaihdella näytöllä jos klikkaa alempana näkyvää kuvaa"*).
     * Karuselli avautuu siitä kuvasta, joka oli päällimmäisenä —
     * kutsuja lukee sen pakan järjestyksestä (avaa).
     *
     * RAAHAUS EI OLE NAPAUTUS (sama sopimus kuin luentakuvalla):
     * selain lähettää klikin myös raahauksen päätteeksi, ja ilman
     * lippua jokainen siirto päättyisi karuselliin.
     */
    kortti.addEventListener('click', (tapahtuma) => {
      tapahtuma?.stopPropagation?.();
      if (raahattu()) return;
      if (nostaPuluCamKortti(ui, i)) return;
      avaa?.(i);
    });
    tila.kortit.push(kortti);
    const nosta = () => {
      if (ui.pulucamPakka !== tila) return;
      pakka.appendChild(kortti);
      /*
       * PULPAHTANUT KORTTI ON PÄÄLLIMMÄINEN, ja sen mukana vaihtuvat
       * kerrokset, asennot ja LYHYT KUVATEKSTI (jarjestaPakka; omistaja
       * 9.9.2026 klo 18.50: *"lyhyt suoraan kuvan alle"*). Kutsu on
       * tässä eikä silmukan alussa, koska juuri tämä on se hetki,
       * jolloin kortti oikeasti nousee päällimmäiseksi.
       */
      tila.jarjestys.push(i);
      jarjestaPakka(tila);
      // Pulpahdus on luokanvaihto: css hoitaa pomppuanimaation.
      const nayta = () => { if (kortti.parentNode) kortti.classList.add('nakyy'); };
      globalThis.requestAnimationFrame?.(nayta);
      ajastimet.push(setTimeout(nayta, 50));
    };
    const viive = pulucamViive(i);
    if (viive <= 0) nosta();
    else ajastimet.push(setTimeout(nosta, viive));
  });
  return true;
}

/** Pakka pois ja ajastimet seis (kaupungista lähtö, uusi luentakuva). */
export function piilotaPuluCamPakka(ui) {
  const tila = ui?.pulucamPakka;
  if (!tila) return false;
  ui.pulucamPakka = null;
  for (const t of tila.ajastimet) clearTimeout(t);
  tila.pakka?.remove?.();
  /*
   * ISOISÄN KUVA JÄÄ, PAKAN JÄLJET EIVÄT. Pohjan kerros ja nimilappu
   * ovat pakan kirjoittamia (jarjestaPakka), ja ilman siivousta
   * pakaton paneeli jäisi kantamaan viimeisen pakan järjestystä.
   */
  tila.pohjakortti?.style?.setProperty?.('--pulucam-kerros', '0');
  if (tila.pohjakortti) tila.pohjakortti.title = 'Katso kuva suurempana';
  return true;
}

/** Onko pakka juuri nyt kartalla? (vartijoita ja testejä varten) */
export function puluCamPakassa(ui) {
  return Boolean(ui?.pulucamPakka);
}
