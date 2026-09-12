/*
 * SATELLIITTILINSSI — astronauttien ottamia valokuvia Maasta.
 *
 * OMISTAJAN TILAUS 12.9.2026, sanatarkasti: *"Satelliittilinssi:
 * nykyinen maapallo, vain havaintokohteet. Ei haittaa vaikka
 * karttapohjalla näkyy muitakin tietoja. Uudet kohteet näkyisivät
 * hohtavina vihreinä pisteinä pallolla mitä klikkaamalla avautuu kukin
 * näkymä. Onko yhdestä kohteesta useampia kuvia ja jos on niin miten ne
 * kannattaisi näyttää pelissä? Koska kyseessä on pelin linssi niin
 * silloin koko Yläpalkki vaihtuu erilaiseen kuten pelin kahdessa
 * uudessa ihmis- ja tiedekeksintö linssissä"*
 *
 * Pelaaja suuntaa leikillisesti avaruudesta Maahan katsovan
 * kaukoputken kohteeseen ja näkee valokuvan, jonka astronautti on
 * ottanut ikkunasta.
 *
 * ── AINEISTO VAIHTUI, LOGIIKKA EI (omistaja 12.9.2026) ────────────
 *
 * Sanatarkasti: *"Uusi linssi toimii nyt hyvin, mutta valitettavasti
 * itse materiaali on aika epäkiinnostavaa. Onko mitään muuta
 * tietolähdettä, mitä voitaisiin käyttää samalla logiikalla ja korvata
 * vain data johonkin toiseen?"* — ja kysymyskorttiin vastaus:
 * *"Astronauttien Maa-kuvat"*.
 *
 * Harmaa tutkakuva (ICEYE, v1794–v1801) ei kerro katsojalle mitään
 * ilman selitystä; värivalokuvassa näkee heti mitä katsoo, ja juuri se
 * on linssin idea. Vaihtoon menivät VAIN aineistotiedosto ja
 * hakutyökalu — pisteet pallolla, galleria kohteen sisällä, info-nappi,
 * kuva koko ruutuun ja nipistyszoom ovat samat kuin ennen. Linssi on
 * tarkoituksella aineistosta riippumaton, ja se on sen arvo.
 *
 * ── MIKÄ TÄMÄ ON JA MIKÄ EI ───────────────────────────────────────
 *
 * TÄMÄ EI OLE LIVE-NÄKYMÄ eikä kuvaustilaus. Jokainen kuva on
 * ARKISTOKUVA NASAn kuvakirjastosta, ja sen mukana kulkee aina
 * kuvausaika, paikka, kuvaustapa, NASAn kuvatunnus ja suora linkki
 * lähteeseen. Kuvan päällä lukee "Valokuva avaruudesta · NASA", ja
 * loput tiedot ovat info-napin popupissa. Pelaajalle ei luvata, että
 * kuva otettaisiin juuri nyt.
 *
 * ── YKSI PISTE PER PAIKKA, GALLERIA PISTEEN SISÄLLÄ ───────────────
 *
 * Saman paikan eri kuvauskerrat ovat yhden pisteen galleria (Etna 2002
 * ja 2006, Dubai päivällä ja yöllä), eri paikat ovat eri pisteitä.
 * Galleriassa oletuskuva on kohteen paras yleiskuva — se on valittu
 * käsin aineistoon kenttään `oletus` (tools/hae-satelliittihavainnot.mjs
 * kertoo säännön auki), koska valokuvan laatua ei voi lukea
 * metatiedosta: kuva pitää katsoa. Päivämäärälliset pikkukuvat, laskuri
 * ja edellinen/seuraava ladotaan KUVAN PÄÄLLE alareunaan (omistaja
 * 12.9.2026).
 *
 * "Vertaa" avaa kaksi kuvaa RINNAKKAIN. Päällekkäistä
 * pyyhkäisyliukuria ei ole: se vaatisi, että kuvat ovat samasta
 * kohdasta samassa kulmassa, eivätkä astronautin käsin suuntaamat
 * otokset ole — liukuri loisi virheellisen vaikutelman muutoksesta.
 *
 * ── YLÄPALKIN ELINKAARI ───────────────────────────────────────────
 *
 * Sama kuin Ihmisen matka- ja Keksinnöt-linsseillä (js/aikajana.js
 * rakennaPalkki): Matkakirjan oma palkki piilotetaan body-luokalla
 * `aikajana-palkki-auki`, linssin palkki saa SEN mitatun korkeuden
 * (--aikajana-palkki-korkeus), ja luokka `aikajana-paalla` panee
 * pelin muut pinnat kiinni (js/ui-apurit.js linssiEstaa,
 * js/pallolauta/lauta.js kaupunkipisteet, css/aikajana.css merkit).
 * Sulkeminen poistaa molemmat luokat ja palauttaa pelitilan
 * täsmälleen; tallennukseen ei kosketa lainkaan.
 *
 * ── LINSSIN AIKANA VAIN VIHREÄ PISTE ON NAPAUTETTAVA ─────────────
 *
 * OMISTAJA 12.9.2026, sanatarkasti: *"Ja kartalta ei saa voida klikata
 * mitään muita kohteita kuin niitä vihreitä kohteita."*
 *
 * PIILOTTAMINEN EI RIITÄ, ja se oli v1794:n virhe: CSS piilotti pelin
 * omat lappuset, mutta näkymätön osumaLAATIKKO otti napautuksen yhä
 * vastaan (mitattu 12.9.2026: poltetun eläintäyn kortti aukesi tyhjältä
 * kartalta linssin päällä — sama vika kuin v1789:ssä). Portti on siksi
 * YHDESSÄ paikassa, laudan napautuksenreitityksessä
 * (js/pallolauta/lauta.js napautaPintaan ja onPointClick): kun bodyssa
 * on luokka `aikajana-paalla`, napautus tarjotaan VAIN linssin omalle
 * merkille ja kaikki muu — kohdemerkit, kaupunkipisteet ja niiden
 * kamerasukellus, nostot, eläintäyt, nimimuste — on kiinni.
 *
 * ── LINSSIN MERKIT EIVÄT KULUTA PELIVUOROA ────────────────────────
 *
 * ── LINSSI AVAUTUU AVARUUTEEN (omistaja 12.9.2026) ────────────────
 *
 * Sanatarkasti: *"Astronoottikuvat ovat hienoja, niitä voisi olla
 * vaikka enemmänkin. Saisiko maapallosta tehtyä sen näköistä, miltä se
 * näyttää avaruudestakin? Ja laittaisi vielä tähtiä taustalle. Linssi
 * voisi alkaa niin, että maapallon reunat näkyvät ja taustalla on
 * tähtiä. Maapallonhan ei tarvitse olla kovin tarkka. Eli zoomaustasoja
 * ei tarvitse olla juurikaan."*
 *
 * Näkymä asuu omassa moduulissaan (js/linssit/satelliitti-avaruus.js):
 * avauskorkeus, tähtitaivas, generoitu Maa-tekstuuri ja kapea zoom.
 * TÄMÄ TIEDOSTO EI MUUTU MUUTEN: vihreät pisteet, galleria, info-nappi,
 * kuva koko ruutuun, nipistyszoom ja yläpalkin elinkaari ovat samat
 * kuin ennen. Näkymä on linssin tilaa eikä pelin: `pura` kirjoittaa
 * pallon lähtötilan takaisin sellaisenaan.
 *
 * ── PULU PIILOON LINSSIN AJAKSI (omistaja 12.9.2026) ──────────────
 *
 * Sanatarkasti: *"Pulun voisi piilottaa"*. Avaruudesta katsottuna
 * ruudun oikeassa alalaidassa seisova kyyhky on väärästä tarinasta.
 *
 * SAMA MEKANISMI KUIN MUISSA LINSSEISSÄ, EI UUTTA:
 *   • `polloLinssiAlkoi()` (js/pollo.js) panee pulun puheenvuorot
 *     JONOON — ne sanotaan, kun linssi päättyy, eikä mitään menetetä;
 *     `polloKuplatPois()` vie jo auki olevat kuplat pois. Tämä on
 *     täsmälleen se, mitä js/aikajana.js suljeKelluvat tekee linssin
 *     alkaessa.
 *   • Body-luokka `aikajana-pulu-piilossa` (js/linssit/ihmisen-matka-
 *     esitys.js PULUN_PIILO_LUOKKA) piilottaa napin, paneelin ja
 *     kasvokankaan `visibility: hidden` -säännöllä. Juuri sen
 *     livia-eleet lukee näkyvyystestissään (js/livia-eleet.js
 *     nappiNakyy), joten piilotettu pulu ei jää elehtimään eikä
 *     puhumaan näkymättömissä — se ei katkea kesken eleen vaan
 *     lakkaa aloittamasta uusia.
 *   • Sulkeminen poistaa luokan ja kutsuu `polloLinssiPaattyi()`, joka
 *     päästää jonoon jääneet puheenvuorot ulos.
 *
 * LUOKKA ON KIRJOITETTU TÄHÄN MERKKIJONONA eikä tuotu Ihmisen matka
 * -linssistä: tuonti vetäisi koko kertomusesityksen (2 200 riviä)
 * muistiin satelliittilinssiä avattaessa. Vartio pitää merkkijonot
 * samoina (tests/satelliitti-avaruus.test.mjs).
 *
 * Havaintopiste on `laji: 'linssi'` -merkki, jonka napautuksen laskee
 * pallon oma osumatesti (js/pallolauta/lauta.js lahinLinssimerkki) —
 * ja se hyväksyy vain kameran puolella olevat merkit, joten pallon
 * takapuolen piste ei ota napautuksia. Matkustus ja lehdet ovat
 * linssin ajan kiinni saman portin takana kuin linssikartalla
 * (js/ui.js linssikarttaEstaa, joka lukee myös linssiEstaa()).
 */

import { html } from '../ui-apurit.js';
import { polloKuplatPois, polloLinssiAlkoi, polloLinssiPaattyi } from '../pollo.js';
import { SATELLIITTI_KOHTEET, SATELLIITTI_LAHDE } from './satelliitti-data.js';
import { avaaAvaruusnakyma } from './satelliitti-avaruus.js';

/** Linssiosan nimi laudan linssiapurissa (lauta.linssit.merkit/pura). */
export const SATELLIITTI_OSA = 'satelliitti';

/**
 * Pulun piiloluokka. SAMA MERKKIJONO kuin
 * js/linssit/ihmisen-matka-esitys.js PULUN_PIILO_LUOKKA — ks. tiedoston
 * alku (PULU PIILOON LINSSIN AJAKSI) siitä, miksi se on kopio.
 */
export const PULUN_PIILO_LUOKKA = 'aikajana-pulu-piilossa';

/**
 * Pulu piiloon ja sen puheenvuorot jonoon. Palauttaa kahvan, jonka
 * `pura` palauttaa pulun täsmälleen ennalleen ja päästää jonon ulos.
 */
export function piilotaPulu(doc = document) {
  let purettu = false;
  try { polloLinssiAlkoi(); } catch { /* pöllöä ei ole asennettu */ }
  try { polloKuplatPois(); } catch { /* kuplia ei ollut */ }
  const oliPiilossa = Boolean(doc?.body?.classList?.contains(PULUN_PIILO_LUOKKA));
  if (!oliPiilossa) doc?.body?.classList?.add(PULUN_PIILO_LUOKKA);
  return {
    /** Mittari savukkeelle ja testeille. */
    piilossa: () => !purettu && Boolean(doc?.body?.classList?.contains(PULUN_PIILO_LUOKKA)),
    pura() {
      if (purettu) return;
      purettu = true;
      /*
       * LUOKKA POISTETAAN VAIN JOS TÄMÄ SEN LISÄSI: jos jokin toinen
       * linssi piti pulua piilossa jo ennen satelliittilinssiä, sen
       * piilotus ei saa purkautua tämän mukana.
       */
      if (!oliPiilossa) doc?.body?.classList?.remove(PULUN_PIILO_LUOKKA);
      try { polloLinssiPaattyi(); } catch { /* pöllöä ei ole asennettu */ }
    },
  };
}

/** Oman tyylitiedoston tunnus (sama kaava kuin muilla kelluvilla pinnoilla). */
const TYYLIN_TUNNUS = 'satelliitti-tyyli';

/** Kameran lähikuva kohteeseen laudan yksiköinä (noin 900 km ruudulla). */
export const SATELLIITTI_LAHIKUVA = 250;

/**
 * PARAS YLEISKUVA — oletuskuvan valintasääntö, kirjoitettu auki.
 *
 * Oletuskuva EI ole "uusin": pelaajan ensimmäisen silmäyksen pitää olla
 * kohteen paras yleiskuva. Valokuvan laatua ei voi lukea metatiedosta —
 * pilvet, vino rajaus, ikkunankehys ja sumu näkyvät vain katsomalla —
 * joten paras kuva on valittu KÄSIN aineiston kenttään `oletus`
 * (tools/hae-satelliittihavainnot.mjs KOHTEET).
 *
 * Tämä funktio on se, mitä tehdään kun nimettyä oletusta ei ole:
 * otetaan uusin kuva. Puhdas funktio, sama sääntö pelissä ja testissä.
 */
export function parasHavainto(havainnot = []) {
  let paras = null;
  for (const h of havainnot) {
    if (!h) continue;
    if (!paras || String(h.aika ?? '') > String(paras.aika ?? '')) paras = h;
  }
  return paras;
}

/** Oletushavainnon indeksi kohteessa (aineiston `oletus` tai uusin). */
export function oletusIndeksi(kohde) {
  const lista = kohde?.havainnot ?? [];
  const nimetty = lista.findIndex((h) => h.id === kohde?.oletus);
  if (nimetty >= 0) return nimetty;
  const paras = parasHavainto(lista);
  const i = lista.indexOf(paras);
  return i >= 0 ? i : 0;
}

/**
 * Kuvausaika ihmisen luettavaksi.
 *
 * KELLONAIKAA EI KEKSITÄ. NASAn kuvakirjasto merkitsee astronauttikuvan
 * ajaksi useimmiten pelkän päivän, ja silloin aineistossa on pelkkä
 * päivä ("2002-10-30") — teksti on silloin "30.10.2002". Jos aineistossa
 * on oikea kellonaika, se näytetään ja aikavyöhyke sanotaan ääneen,
 * jottei lukija oleta omaa aikaansa.
 */
export function aikateksti(iso) {
  const t = String(iso ?? '');
  const paiva = t.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!paiva) return t;
  const [, v, kk, pp] = paiva;
  const kello = t.match(/T(\d{2}):(\d{2})/);
  const alku = `${Number(pp)}.${Number(kk)}.${v}`;
  return kello ? `${alku} klo ${kello[1]}.${kello[2]} UTC` : alku;
}

/** Lyhyt päiväys pikkukuvan alle (kello mukana vain jos se on tiedossa). */
export function paivateksti(iso) {
  const t = String(iso ?? '');
  const paiva = t.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!paiva) return t;
  const [, v, kk, pp] = paiva;
  const kello = t.match(/T(\d{2}):(\d{2})/);
  const alku = `${Number(pp)}.${Number(kk)}.${v.slice(2)}`;
  return kello ? `${alku} ${kello[1]}.${kello[2]}` : alku;
}

/** Paikka asteina, esim. "37,75° N · 14,99° E". */
export function paikkateksti(lat, lon) {
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return '';
  const luku = (x) => Math.abs(x).toFixed(2).replace('.', ',');
  return `${luku(lat)}° ${lat >= 0 ? 'N' : 'S'} · ${luku(lon)}° ${lon >= 0 ? 'E' : 'W'}`;
}

/** Oma tyylitiedosto sivulle, jos sitä ei vielä ole. */
function lataaSatelliittiTyyli() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(TYYLIN_TUNNUS)) return;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  if (!peruslinkki) return;
  const linkki = document.createElement('link');
  linkki.id = TYYLIN_TUNNUS;
  linkki.rel = 'stylesheet';
  linkki.href = new URL('satelliitti.css', peruslinkki.href).href;
  document.head.appendChild(linkki);
}

/** Ulkoinen linkki, joka ei vie pelaajaa pois pelistä. */
function ulkolinkki(teksti, osoite) {
  const a = html('a', 'satelliitti-linkki', teksti);
  a.href = osoite;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  return a;
}

/** Yhden merkin elementti: sädekehä, rengas, ydin ja nimi. */
function merkkiElementti(kohde) {
  const el = html('div', 'satelliitti-piste');
  el.append(
    html('span', 'satelliitti-hehku'),
    html('span', 'satelliitti-rengas'),
    html('span', 'satelliitti-ydin'),
    html('span', 'satelliitti-nimi', kohde.nimi),
  );
  el.setAttribute('aria-hidden', 'true');
  return el;
}

/**
 * Kuvan mukana kulkeva kuvatieto: `lyhyt` on kuvan vaihtoehtoinen
 * teksti (kohde ja hetki), `selite` ja `lahde` kantavat aineiston ja
 * lisenssin. Lähdetiedot ovat aina löydettävissä.
 */
export function kuvatiedot(kohde, havainto) {
  return {
    lyhyt: `${kohde.nimi} ${aikateksti(havainto.aika)}`,
    selite: `${kohde.nimi} (${kohde.seutu}) — ${SATELLIITTI_LAHDE.aineisto}, `
      + `${aikateksti(havainto.aika)}. ${havainto.teksti ?? kohde.selite}`,
    lahde: `${SATELLIITTI_LAHDE.tekija}, ${SATELLIITTI_LAHDE.lisenssi}`,
    osoite: havainto.kuva,
  };
}

/**
 * HAVAINTOIKKUNA — KUVA KOKO RUUTUUN HETI.
 *
 * OMISTAJA 12.9.2026, sanatarkasti: *"Kuva pitää avautua heti koko
 * ruudun peittäväksi ja sen päälle ladotaan pienet kuvat muista
 * otoksista. Sitten info nappi josta tulee mini popup tietoineen."*,
 * *"Oik. Oik alaeunaan x nappi josta ikkuna sulkeutuu"*,
 * *"Kuvaa pitää pystyä zoomaamaan sormi eleellä"* ja *"Kohteen nimi
 * vain yläpalkkiin"*.
 *
 * Tämä KUMOAA aiemman kaksivaiheisen nostokuva-avauksen (kuva ensin,
 * "Lisää" perässä) TÄSSÄ linssissä: se on kartan nostoja varten, joissa
 * kuva on kortin kuvitusta. Astronautin valokuva EI ole kuvitus vaan
 * itse sisältö, ja sitä katsotaan kokonaisena.
 *
 * RUUDUN JAKO — kaikki muu paitsi kuva on kuvan PÄÄLLÄ:
 *
 *   • kuva keskellä, oma kuvasuhde säilyy (object-fit: contain),
 *     loppu ruudusta tummaa,
 *   • "Valokuva avaruudesta · NASA" -leima kuvan yläkulmassa — kuvan
 *     lähde kulkee aina kuvan mukana, myös zoomatessa,
 *   • alapalkki kahtena rivinä: pikkukuvat ylärivillä, napit
 *     alarivillä. Kaksi riviä eikä yksi, jotta SULKURISTI ALHAALLA
 *     OIKEALLA ei koskaan jää pikkukuvien alle eikä sitä paineta
 *     vahingossa otoksia selatessa (omistajan vaatimus 12.9.2026),
 *   • kaikki tekstitieto info-napin takana pienessä popupissa.
 *
 * KOHTEEN NIMI ON VAIN YLÄPALKISSA (`palkki.nimeaKohde`): kuvan päällä
 * ei ole muuta tekstiä kuin lähdeleima ja pikkukuvien päiväykset.
 */
function avaaHavaintokortti({ kohde, palkki, onSuljettu }) {
  lataaSatelliittiTyyli();
  const katselu = html('div', 'satelliitti-katselu');
  katselu.setAttribute('role', 'dialog');
  katselu.setAttribute('aria-modal', 'true');
  katselu.setAttribute('aria-label', `${kohde.nimi}: valokuva avaruudesta`);

  const havainnot = kohde.havainnot ?? [];
  let indeksi = oletusIndeksi(kohde);
  if (!havainnot[indeksi]) return null;

  /* ---- kuva ja sen lava (eleet asuvat lavassa) --------------------- */
  const lava = html('div', 'satelliitti-lava');
  const kuva = document.createElement('img');
  kuva.className = 'satelliitti-kuva';
  kuva.decoding = 'async';
  kuva.draggable = false;
  const leima = html('span', 'satelliitti-leima', 'Valokuva avaruudesta · NASA');
  lava.append(kuva, leima);

  /* ---- alapalkki: pikkukuvat ylärivillä, napit alarivillä ---------- */
  const ala = html('div', 'satelliitti-ala');
  const nauha = html('div', 'satelliitti-nauha');
  const napit = html('div', 'satelliitti-napit');
  ala.append(nauha, napit);

  const nappi = (luokka, teksti, otsikko) => {
    const b = html('button', luokka, teksti);
    b.type = 'button';
    b.title = otsikko;
    b.setAttribute('aria-label', otsikko);
    return b;
  };
  const infoNappi = nappi('satelliitti-info', 'i', 'Havainnon tiedot');
  const vertaaNappi = nappi('satelliitti-vertaa', 'Vertaa', 'Näytä kaksi havaintoa rinnakkain');
  const edellinen = nappi('satelliitti-nuoli satelliitti-edellinen', '‹', 'Edellinen havainto');
  const seuraava = nappi('satelliitti-nuoli satelliitti-seuraava', '›', 'Seuraava havainto');
  const laskuri = html('span', 'satelliitti-laskuri');
  const sulku = nappi('satelliitti-sulku', '×', 'Sulje havainto');
  napit.append(infoNappi, vertaaNappi, html('span', 'satelliitti-vali'),
    edellinen, laskuri, seuraava, html('span', 'satelliitti-vali'), sulku);
  katselu.append(lava, ala);
  document.body.appendChild(katselu);

  /* ---- sulkeminen -------------------------------------------------- */
  let popup = null;
  const nappain = (e) => {
    if (e.key === 'Escape') { if (popup) { suljePopup(); return; } sulje(); return; }
    if (e.key === 'ArrowRight') nayta(indeksi + 1);
    if (e.key === 'ArrowLeft') nayta(indeksi - 1);
  };
  function sulje() {
    if (!katselu.isConnected) return;
    katselu.remove();
    document.removeEventListener('keydown', nappain);
    palkki?.nimeaKohde?.(null);
    onSuljettu?.();
  }
  katselu.satelliittiSulje = sulje;
  sulku.addEventListener('click', (e) => { e.stopPropagation(); sulje(); });
  document.addEventListener('keydown', nappain);
  palkki?.nimeaKohde?.(kohde.nimi);

  /* ---- info-popup: kaikki tekstitieto yhden napin takana ----------- */
  function suljePopup() {
    popup?.remove();
    popup = null;
    infoNappi.setAttribute('aria-expanded', 'false');
  }
  const teeRivi = (nimi, arvo) => {
    if (!arvo) return null;
    const d = html('div');
    d.append(html('b', null, `${nimi}: `), typeof arvo === 'string' ? document.createTextNode(arvo) : arvo);
    return d;
  };
  const avaaPopup = () => {
    if (popup) { suljePopup(); return; }
    const h = havainnot[indeksi] ?? {};
    popup = html('div', 'satelliitti-popup');
    popup.setAttribute('role', 'dialog');
    popup.setAttribute('aria-label', `${kohde.nimi}: havainnon tiedot`);
    const otsikko = html('div', 'satelliitti-popup-otsikko', kohde.nimi);
    otsikko.appendChild(html('span', 'satelliitti-seutu', ` — ${kohde.seutu}`));
    const kiinni = nappi('satelliitti-popup-sulku', '×', 'Sulje tiedot');
    kiinni.addEventListener('click', suljePopup);
    popup.append(otsikko, kiinni);
    /*
     * KUVATEKSTI ENSIN. Se on ainoa teksti, jonka pelaaja lukee, ja
     * sen tehtävä on kertoa mitä kuvassa näkyy — loput rivit ovat
     * lähdetietoa, joka kuuluu sen alle eikä sen eteen.
     */
    popup.appendChild(html('div', 'satelliitti-popup-selite', h.teksti ?? kohde.selite));
    for (const rivi of [
      teeRivi('Aineisto', `${SATELLIITTI_LAHDE.aineisto}, ${SATELLIITTI_LAHDE.tekija}`),
      teeRivi('Kuvausaika', aikateksti(h.aika)),
      teeRivi('Paikka', [kohde.seutu, paikkateksti(kohde.lat, kohde.lon)].filter(Boolean).join(' · ')),
      teeRivi('Kuvaustapa', [h.kuvaustapa, h.retkikunta,
        h.kuvaaja ? `kuvaaja ${h.kuvaaja}` : null].filter(Boolean).join(' · ')),
      teeRivi('Kuvatunnus', h.id),
      teeRivi('Lisenssi', `${SATELLIITTI_LAHDE.lisenssi} (${SATELLIITTI_LAHDE.tekija})`),
      h.sivu ? teeRivi('Lähde', ulkolinkki('NASAn kuvasivu', h.sivu)) : null,
      teeRivi('Kuvakirjasto', ulkolinkki('NASA Image and Video Library', SATELLIITTI_LAHDE.osoite)),
    ]) if (rivi) popup.appendChild(rivi);
    katselu.appendChild(popup);
    infoNappi.setAttribute('aria-expanded', 'true');
  };
  infoNappi.addEventListener('click', (e) => { e.stopPropagation(); avaaPopup(); });

  /* ---- vertailu: kaksi havaintoa rinnakkain, ei liukuria ----------- */
  const vertaa = () => {
    const toinen = havainnot[(indeksi + 1) % havainnot.length];
    const nyt = havainnot[indeksi];
    const kerros = html('div', 'satelliitti-vertailu');
    kerros.setAttribute('role', 'dialog');
    kerros.setAttribute('aria-label', `${kohde.nimi}: kaksi havaintoa rinnakkain`);
    const otsikko = html('div', 'satelliitti-otsikko', `${kohde.nimi} — kaksi havaintoa rinnakkain`);
    const parit = html('div', 'satelliitti-vertailu-parit');
    for (const h of [nyt, toinen]) {
      const kuvio = html('figure');
      const img = document.createElement('img');
      img.src = h.kuva;
      img.alt = `${kohde.nimi} ${aikateksti(h.aika)}`;
      img.decoding = 'async';
      kuvio.append(img, html('figcaption', null, aikateksti(h.aika)));
      parit.appendChild(kuvio);
    }
    const takaisin = html('button', 'satelliitti-nuoli', 'Sulje vertailu');
    takaisin.type = 'button';
    takaisin.addEventListener('click', () => kerros.remove());
    kerros.append(otsikko, parit, takaisin);
    document.body.appendChild(kerros);
  };
  vertaaNappi.addEventListener('click', (e) => { e.stopPropagation(); vertaa(); });

  /* ════════════════ SORMIZOOM KUVAN PÄÄLLÄ ════════════════════════
   *
   * OMISTAJA 12.9.2026: *"Kuvaa pitää pystyä zoomaamaan sormi
   * eleellä"*. Tutkakuvassa on kortteleita ja siltoja, ja koko pointti
   * on päästä niitä lähemmäs.
   *
   * OMA TOTEUTUS, EI KIERRÄTYSTÄ. Pelin kuvasuurennos
   * (js/fokuskohteet.js avaaKohdeSuurennos) kasvattaa kuvan
   * ankkuristaan koko ruudun kokoiseksi, mutta siinä EI ole nipistys-
   * eikä panorointielettä — se on avausanimaatio, ei katselin — ja
   * js/karttazoom.js zoomaa tasokarttaa, ei <img>-elementtiä. Kolmatta
   * toteutusta samasta asiasta ei siis synny: tätä ei ollut olemassa.
   *
   * ELE EI VUODA PALLOLLE. Kaikki eleet luetaan LAVAN omista
   * pointer-tapahtumista, jokainen `stopPropagation` + `preventDefault`
   * ja lavalla on `touch-action: none` — pallon oma elekuuntelija
   * (js/pallo.js asennaPallonEleet) kuuntelee kangasta, joka on tämän
   * kerroksen ALLA. Mitattu: kameran tila ei muutu eleen aikana.
   *
   * RAJA PIKKUKUVIIN ON YKSISELITTEINEN: eleet ovat LAVAN kuuntelijoita,
   * ja pikkukuvanauha on lavan SISAR (kuvan päällä, ei sen sisällä).
   * Sormi nauhan päällä ei siis koskaan ole kuvan päällä — vaakaveto
   * nauhassa selaa otoksia, sama veto kuvan päällä panoroi.
   *
   * KATTO ON KUVAN OMA TARKKUUS: suurennus ei venytä lähdettä
   * pikselipuuroksi, vaan pysähtyy siihen mitä kuvassa oikeasti on
   * (naturalWidth / ruudulla oleva leveys, vähintään 1).
   */
  let skaala = 1;
  let tx = 0;
  let ty = 0;
  const sormet = new Map();
  let ele = null; // { etaisyys, skaala, keskiX, keskiY, tx, ty } | { yksi }

  /*
   * MITTA LUETAAN ASETTELUSTA (offsetWidth), EI TRANSFORMOIDUSTA
   * LAATIKOSTA: getBoundingClientRect kertoisi jo zoomatun koon, ja
   * katto kasvaisi joka nipistyksellä. Kuva on `max-width/height: 100%`
   * ilman object-fitiä, joten elementti on täsmälleen kuvan kokoinen.
   */
  const kattoSkaala = () => {
    if (!kuva.offsetWidth || !kuva.naturalWidth) return 4;
    return Math.max(1, Math.min(8, kuva.naturalWidth / kuva.offsetWidth));
  };
  const rajaa = () => {
    // Kuva ei karkaa ruudulta: siirto rajataan siihen, paljonko
    // suurennettu kuva ylittää oman laatikkonsa.
    const rajaX = Math.max(0, (kuva.offsetWidth * skaala - lava.clientWidth) / 2);
    const rajaY = Math.max(0, (kuva.offsetHeight * skaala - lava.clientHeight) / 2);
    tx = Math.max(-rajaX, Math.min(rajaX, tx));
    ty = Math.max(-rajaY, Math.min(rajaY, ty));
  };
  const piirra = () => {
    rajaa();
    kuva.style.transform = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${skaala.toFixed(3)})`;
    katselu.classList.toggle('satelliitti-zoomattu', skaala > 1.01);
  };
  /** Zoom pois — uusi otos aukeaa aina kokonaisena. */
  const nollaaZoom = () => { skaala = 1; tx = 0; ty = 0; piirra(); };
  /** Zoomaa kohti ruudun pistettä (nipistyksen keskikohta tai kursori). */
  const zoomaa = (uusi, keskiX, keskiY) => {
    const katto = kattoSkaala();
    const rajattu = Math.max(1, Math.min(katto, uusi));
    const r = lava.getBoundingClientRect();
    const kx = keskiX - (r.left + r.width / 2);
    const ky = keskiY - (r.top + r.height / 2);
    const suhde = rajattu / skaala;
    tx = kx - (kx - tx) * suhde;
    ty = ky - (ky - ty) * suhde;
    skaala = rajattu;
    piirra();
  };

  const paikat = () => [...sormet.values()];
  lava.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    sormet.set(e.pointerId, { x: e.clientX, y: e.clientY });
    // Kaappaus on hyödyllinen mutta ei pakollinen: synteettinen
    // osoitin (savuke, testi) ei ole selaimen kirjoilla, ja heitetty
    // NotFoundError keskeyttäisi koko eleen alkuunsa.
    try { lava.setPointerCapture?.(e.pointerId); } catch { /* ei aktiivista osoitinta */ }
    const p = paikat();
    if (p.length === 2) {
      ele = {
        etaisyys: Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y),
        skaala,
        tx,
        ty,
        keskiX: (p[0].x + p[1].x) / 2,
        keskiY: (p[0].y + p[1].y) / 2,
      };
    } else {
      ele = { yksi: true, x: e.clientX, y: e.clientY, tx, ty };
    }
  });
  lava.addEventListener('pointermove', (e) => {
    if (!sormet.has(e.pointerId)) return;
    e.stopPropagation();
    e.preventDefault();
    sormet.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const p = paikat();
    if (p.length >= 2 && ele && ele.etaisyys) {
      const etaisyys = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
      const keskiX = (p[0].x + p[1].x) / 2;
      const keskiY = (p[0].y + p[1].y) / 2;
      tx = ele.tx;
      ty = ele.ty;
      const vanha = skaala;
      skaala = ele.skaala;
      zoomaa(ele.skaala * (etaisyys / ele.etaisyys), keskiX, keskiY);
      if (!Number.isFinite(skaala)) skaala = vanha;
    } else if (ele?.yksi && skaala > 1.01) {
      tx = ele.tx + (e.clientX - ele.x);
      ty = ele.ty + (e.clientY - ele.y);
      piirra();
    }
  });
  const sormiYlos = (e) => {
    sormet.delete(e.pointerId);
    if (sormet.size < 2) ele = sormet.size === 1 ? { yksi: true, x: paikat()[0].x, y: paikat()[0].y, tx, ty } : null;
  };
  lava.addEventListener('pointerup', sormiYlos);
  lava.addEventListener('pointercancel', sormiYlos);
  // Työpöytä: rulla zoomaa kursorin kohdalta, veto panoroi (yllä).
  lava.addEventListener('wheel', (e) => {
    e.preventDefault();
    e.stopPropagation();
    zoomaa(skaala * (e.deltaY < 0 ? 1.2 : 1 / 1.2), e.clientX, e.clientY);
  }, { passive: false });
  // Kaksoisnapautus: sisään ja takaisin.
  lava.addEventListener('dblclick', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (skaala > 1.01) nollaaZoom();
    else zoomaa(Math.min(2.5, kattoSkaala()), e.clientX, e.clientY);
  });

  /* ---- gallerian ladonta ------------------------------------------- */
  const latoNauha = () => {
    nauha.replaceChildren();
    if (havainnot.length < 2) { ala.classList.add('satelliitti-yksi'); return; }
    havainnot.forEach((toinen, i) => {
      const b = html('button', `satelliitti-pikku${i === indeksi ? ' valittu' : ''}`);
      b.type = 'button';
      const pikku = document.createElement('img');
      pikku.src = toinen.pikku ?? toinen.kuva;
      pikku.loading = 'lazy';
      pikku.decoding = 'async';
      pikku.alt = '';
      b.append(pikku, html('span', null, paivateksti(toinen.aika)));
      b.title = aikateksti(toinen.aika);
      b.setAttribute('aria-label', `${aikateksti(toinen.aika)} — näytä tämä havainto`);
      b.addEventListener('click', (e) => { e.stopPropagation(); nayta(i); });
      nauha.appendChild(b);
    });
  };
  function nayta(uusi) {
    if (!havainnot.length) return;
    const rajattu = Math.max(0, Math.min(havainnot.length - 1, uusi));
    const vaihtui = rajattu !== indeksi;
    indeksi = rajattu;
    const h = havainnot[indeksi];
    if (kuva.src !== h.kuva) {
      kuva.src = h.kuva;
      kuva.alt = kuvatiedot(kohde, h).lyhyt;
    }
    // ZOOM NOLLAUTUU OTOSTA VAIHDETTAESSA (omistajan vaatimus).
    if (vaihtui) nollaaZoom();
    laskuri.textContent = havainnot.length > 1 ? `${indeksi + 1} / ${havainnot.length}` : '';
    edellinen.disabled = indeksi <= 0;
    seuraava.disabled = indeksi >= havainnot.length - 1;
    latoNauha();
    if (popup) { suljePopup(); avaaPopup(); }
  }
  edellinen.addEventListener('click', (e) => { e.stopPropagation(); nayta(indeksi - 1); });
  seuraava.addEventListener('click', (e) => { e.stopPropagation(); nayta(indeksi + 1); });
  if (havainnot.length < 2) {
    for (const el of [edellinen, seuraava, vertaaNappi]) el.hidden = true;
  }
  kuva.addEventListener('error', () => katselu.classList.add('satelliitti-kuvatta'), { once: true });
  kuva.addEventListener('load', () => piirra());
  nayta(indeksi);
  kuva.src = havainnot[indeksi].kuva;
  kuva.alt = kuvatiedot(kohde, havainnot[indeksi]).lyhyt;
  nollaaZoom();
  return katselu;
}

/**
 * Linssin oma yläpalkki Matkakirjan palkin TILALLE (ks. tiedoston
 * alku). Palauttaa { el, nimeaKohde, pura }.
 *
 * EI VETOLAATIKKOA (omistaja 12.9.2026, sanatarkasti: *"Ota yläpalkin
 * vetolaatikko pois"*). Palkissa on linssin nimi, auki olevan kohteen
 * nimi ja Sulje linssi — ei mitään muuta. Kohteet etsitään
 * palloa pyörittämällä, mikä on omistajan valinta; tilalle EI lisätä
 * hakua eikä luetteloa.
 *
 * KOHTEEN NIMI VAIN TÄNNE (omistaja 12.9.2026: *"Kohteen nimi vain
 * yläpalkkiin"*): havaintoikkuna kirjoittaa nimen `nimeaKohde`-kutsulla
 * ja pyyhkii sen sulkeutuessaan. Nimikenttä on palkissa AINA (tyhjänä
 * kin), jotta palkin mitattu korkeus ei muutu nimen ilmestyessä —
 * korkeus on sidottu Matkakirjan oman palkin mittaan, ja kartta
 * hyppäisi jos se eläisi.
 */
export function rakennaPalkki({ ui, kohteet, onSulje, doc = document }) {
  const palkki = doc.createElement('div');
  palkki.className = 'satelliittipalkki';
  palkki.setAttribute('role', 'group');
  palkki.setAttribute('aria-label', 'Astronautin kamera');

  const nimi = doc.createElement('span');
  nimi.className = 'satelliittipalkki-nimi';
  nimi.textContent = 'Astronautin kamera';

  // Auki olevan havainnon kohde — tyhjä, kun ikkunaa ei ole auki.
  const kohdenimi = doc.createElement('span');
  kohdenimi.className = 'satelliittipalkki-kohde';
  kohdenimi.setAttribute('aria-live', 'polite');
  kohdenimi.textContent = '';

  const ohje = doc.createElement('span');
  ohje.className = 'satelliittipalkki-ohje';
  ohje.textContent = 'Napauta hohtavaa vihreää pistettä: valokuva avautuu.';

  const sulje = doc.createElement('button');
  sulje.type = 'button';
  sulje.className = 'satelliittipalkki-sulje';
  sulje.textContent = 'Sulje linssi';
  sulje.title = 'Sulje linssi ja palaa peliin';
  sulje.addEventListener('click', () => onSulje?.());

  palkki.append(nimi, kohdenimi, ohje, sulje);

  /*
   * YLÄPALKIN KORKEUS MITATAAN ENNEN PIILOTUSTA — sama kaava kuin
   * js/aikajana.js rakennaPalkki, jotta kartta ei hyppää ja linssin
   * palkki istuu täsmälleen Matkakirjan palkin paikalle.
   */
  const topbar = doc.querySelector('.topbar');
  const korkeus = topbar?.getBoundingClientRect?.().height ?? 0;
  if (korkeus > 0) {
    doc.body.style.setProperty('--aikajana-palkki-korkeus', `${Math.round(korkeus)}px`);
  }
  doc.body.classList.add('aikajana-palkki-auki', 'aikajana-paalla');
  (ui?.mapPane ?? doc.body).appendChild(palkki);

  return {
    el: palkki,
    kohdenimi,
    /** Kohteen nimi palkkiin (tai null pois). Korkeus ei muutu. */
    nimeaKohde: (teksti) => { kohdenimi.textContent = teksti ?? ''; },
    pura: () => {
      palkki.remove();
      doc.body.classList.remove('aikajana-palkki-auki', 'aikajana-paalla');
      doc.body.style.removeProperty('--aikajana-palkki-korkeus');
    },
  };
}

/**
 * Linssi pallolle. `ui` tulee kolmantena js/ui.js:n sytytaLinssistä.
 */
function avaa(lauta, tila, ui) {
  lataaSatelliittiTyyli();
  const kohteet = SATELLIITTI_KOHTEET.filter((k) => (k.havainnot ?? []).length);
  let kortti = null;
  let suljettiin = 0;

  const suljeKortti = () => {
    if (!kortti) return;
    const vanha = kortti;
    kortti = null;
    vanha.satelliittiSulje?.();
  };

  const palkki = rakennaPalkki({
    ui,
    kohteet,
    onSulje: () => ui?.valitseLinssi?.(null),
  });

  /*
   * AVARUUSNÄKYMÄ PÄÄLLE ENNEN MERKKEJÄ: kamera nousee niin, että koko
   * pallo reunoineen on ruudulla, ja merkkien ruutupaikat lasketaan
   * vasta sen jälkeen. Näkymä on vapaaehtoinen — jos pallo puuttuu
   * (tasokartta, kaatunut WebGL), linssi toimii kuten ennen.
   */
  const avaruus = avaaAvaruusnakyma(lauta, { ui });

  // Pulu piiloon ja sen puheenvuorot jonoon (ks. tiedoston alku).
  const pulu = piilotaPulu();

  const avaaKohde = (kohde) => {
    /*
     * SULKEVA NAPAUTUS EI AVAA UUTTA (v1783:n sääntö). Havaintoikkunan
     * sulku merkitsee hetken, eikä sama painallus avaa seuraavaa.
     */
    if (Date.now() - suljettiin < 350) return;
    suljeKortti();
    kortti = avaaHavaintokortti({
      kohde,
      palkki,
      onSuljettu: () => { suljettiin = Date.now(); kortti = null; },
    });
  };

  const merkit = kohteet.map((kohde) => ({
    avain: `satelliitti:${kohde.tunnus}`,
    lat: kohde.lat,
    lng: kohde.lon,
    elementti: () => merkkiElementti(kohde),
    napautus: () => avaaKohde(kohde),
  }));
  lauta?.linssit?.merkit?.(SATELLIITTI_OSA, merkit);

  return {
    kohteet,
    palkki,
    /** Avaruusnäkymän mittarit savukkeelle (null, jos palloa ei ole). */
    avaruus,
    /** Pulun piilotuksen kahva (savukkeet ja vartijat). */
    pulu,
    pura: () => {
      suljeKortti();
      // Pallon lähtötila takaisin ENSIN: kamera, pinta, ilmakehä,
      // tähdet ja zoomirajat. Merkkien häivytys jatkuu tämän päälle.
      avaruus?.pura?.();
      // Pulu takaisin ruudulle ja jonoon jääneet puheenvuorot ulos.
      pulu.pura();
      document.querySelectorAll('.satelliitti-vertailu').forEach((el) => el.remove());
      palkki.pura();
      lauta?.linssit?.pura?.(SATELLIITTI_OSA);
      /*
       * MERKIT HÄIVYTETÄÄN ULOS (js/pallolauta/merkit.js poista), ja
       * elementit poistuvat vasta siirtymän jälkeen seuraavassa
       * piirrossa. Pallon silmukka nukkuu lepotilassa, joten se
       * herätetään kahdesti: heti ja häivytyksen päätteeksi — muuten
       * hohtavat pisteet jäisivät ruudulle linssin sulkemisen jälkeen
       * (mitattu 12.9.2026: 21 pistettä jäi yhä DOMiin).
       */
      lauta?.heraa?.();
      /*
       * KOLME HERÄTYSTÄ. Merkkikerros poistaa datumin vasta häivytyksen
       * päätteeksi (js/pallolauta/merkit.js poista: setTimeout →
       * tyonna), ja kirjasto irrottaa elementit vasta SEURAAVASSA
       * piirrossa. Hitaalla laitteella 400 ms:n herätys ehti ennen
       * tuota tyontoa, ja 21 hohtavaa pistettä jäi ruudulle linssin
       * sulkemisen jälkeen (mitattu iPadilla ja puhelimella 12.9.2026).
       */
      setTimeout(() => lauta?.heraa?.(), 400);
      setTimeout(() => lauta?.heraa?.(), 1200);
    },
  };
}

export const LINSSI = {
  tunnus: 'satelliitti',
  jarjestys: 27,
  // Kerrokseton: linssi ei piirrä tasokartalle kerrosta vaan asuu
  // pallon pinnalla (pallolle alla), kuten radio ja aikajanalinssit.
  kerros: false,
  nimi: 'Astronautin kamera',
  lyhyt: 'Suuntaa kaukoputki Maahan ja katso valokuva, jonka astronautti otti ikkunasta.',
  /*
   * NIMI VAIHTUI 12.9.2026: "Satelliittilinssi" → "Astronautin kamera"
   * (omistaja, sanatarkasti: *"muuta linssin nimeksi astronautin kamera
   * ja generoi sille myös oma linssikuvake matkalaukkuun"*). Nimi
   * kertoo nyt sen mitä linssi oikeasti näyttää: ihmisen ikkunasta
   * ottamia valokuvia, ei satelliitin automaattista havaintoa. Tunnus
   * (`satelliitti`) ei muutu — se on tallennusavain ja tiedostonimi,
   * eikä sen vaihtaminen näy pelaajalle mutta rikkoisi polut.
   *
   * Piirretty kuvake jää varakuvaksi: matkalaukussa näkyy nyt oma
   * maalattu varustekuva (assets/varusteet/varuste-satelliitti.jpg,
   * tools/generoi-varustekuvat.mjs), kuten muillakin linsseillä.
   */
  ikoni: '<path d="M3.6 15.1 8 6.4l10.9 4.2-3.3 6.5z"/>'
    + '<path d="M9.4 17.6 12 20.6M7.1 20.6h9.4"/>'
    + '<circle cx="19.6" cy="5.1" r="1.6"/>',
  valokuva: false,
  laudat: ['*'],
  lahde: {
    aineisto: SATELLIITTI_LAHDE.aineisto,
    lisenssi: `${SATELLIITTI_LAHDE.lisenssi} (${SATELLIITTI_LAHDE.tekija})`,
    osoite: SATELLIITTI_LAHDE.osoite,
    haettu: SATELLIITTI_LAHDE.haettu,
  },
  pallolle(lauta, tila, ui) {
    return avaa(lauta, tila, ui);
  },
};
