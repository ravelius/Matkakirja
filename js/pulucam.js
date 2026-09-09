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
// Selfie-merkin varakuvake on pelin oma pulun kuvake (js/pollo.js
// POLLO_IKONI, sama viivapiirros kuin kelluvassa napissa) — kunnes
// kuvatoimitus toimittaa piirretyn selfien.
import { POLLO_IKONI } from './pollo.js';

/**
 * PULU-CAM-MERKIN PIIRRETTY SELFIE (kuvatoimitus toimittaa RGBA-PNG:n).
 *
 * Kenttä on tässä yhtenä vakiona, jotta kuvan liittäminen on yhden
 * rivin työ eikä etsintäretki: kun tiedosto on ämpärissä, tähän
 * kirjoitetaan sen osoite. NULL on tarkoituksellinen tila eikä
 * puute — silloin merkissä näkyy pelin nykyinen pulun kuvake
 * (POLLO_IKONI), ja kaikki muu toimii sellaisenaan.
 *
 * @type {?string}
 */
export const PULU_CAM_SELFIE_OSOITE = null;

/** Merkin teksti. Erillinen HTML-teksti, EI kuvaan poltettu. */
export const PULU_CAM_TEKSTI = 'PULU-CAM';

/** Enintään kolme kuvaa kaupunkia kohti (omistaja: "kaksi tai kolme"). */
export const PULUCAM_KATTO = 3;

/**
 * PAKAN ASENNOT — DETERMINISTISET, EIVÄT SATUNNAISIA.
 *
 * Satunnaisluku vaihtaisi pakan asentoa kesken pelin ja tekisi
 * ruutukaappauksista vertailukelvottomia. Kulmat ovat omistajan
 * kuvauksen mukaan "eri suuntiin" (+4°, −3°, +2°) ja siirtymä 6–10 %
 * KUVAN KOOSTA, jotta alempien kuvien reunat jäävät näkyviin.
 *
 * Siirtymä on prosenttia, ei pikseleitä: pakka pienenee kartan
 * liikkeestä paneelin mukana, ja pikselisiirtymä kasvaisi silloin
 * suhteessa liian isoksi.
 */
export const PULUCAM_ASENNOT = [
  { kulma: 4, x: 6, y: -6 },
  { kulma: -3, x: -7, y: 7 },
  { kulma: 2, x: 9, y: -9 },
];

/**
 * PULPAHDUSTEN VÄLIT (ms): ensimmäinen kuva nousee heti, seuraavat
 * 0,9–1,2 s välein. Omistaja: kuvia *"voisi pulpahtaa vahingossa
 * useampia"* — vahinko on sitä, että ne tulevat yksitellen ja hieman
 * eri tahtiin, ei kerralla riviin.
 */
export const PULUCAM_VALIT_MS = [0, 950, 1150];

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
 * Kaupungin pulun kuvat pakin sisällöstä, enintään kolme.
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
 * PULU-CAM-MERKKI: pieni piirretty selfie ja teksti kuvan oikeassa
 * alakulmassa.
 *
 * MERKKIÄ EI POLTETA KUVAAN (Raamattu, kohta 3). Se on kaksi HTML-
 * elementtiä kuvan päällä: selfie (kuva tai varakuvake) ja teksti
 * omanaan, jolloin teksti on terävä joka näytöllä ja skaalautuu kuvan
 * leveyden mukana (css `--pulucam-mitta`).
 *
 * @param {object} [asetukset]
 * @param {string} [asetukset.luokka] lisäluokka (suurennoksessa oma).
 * @returns {Element} `.pulucam-merkki`
 */
export function puluCamMerkki({ luokka = '' } = {}) {
  const merkki = html('span', luokka ? `pulucam-merkki ${luokka}` : 'pulucam-merkki');
  merkki.setAttribute('aria-hidden', 'true');
  const selfie = html('span', 'pulucam-selfie');
  if (PULU_CAM_SELFIE_OSOITE) {
    const img = document.createElement('img');
    img.alt = '';
    img.decoding = 'async';
    img.draggable = false;
    asetaKuva(img, PULU_CAM_SELFIE_OSOITE, null, () => { selfie.innerHTML = POLLO_IKONI; });
    selfie.appendChild(img);
  } else {
    // Kuvatoimituksen selfie puuttuu: pelin nykyinen pulun kuvake.
    selfie.innerHTML = POLLO_IKONI;
  }
  merkki.append(selfie, html('span', 'pulucam-teksti', PULU_CAM_TEKSTI));
  return merkki;
}

/**
 * Yksi pakan kortti: nappi, kuva ja PULU-CAM-merkki.
 *
 * @param {object} kuva pakin kuvaolio
 * @param {number} i sijaluku pakassa (asento ja pulpahdusvuoro)
 * @param {(kuva:object)=>?string} osoite osoitteen ratkaisija
 * @param {(kuva:object)=>?string} vara varaosoitteen ratkaisija
 * @returns {Element} `.pulucam-kuva`
 */
function pakanKortti(kuva, i, osoite, vara) {
  const asento = pulucamAsento(i);
  const kortti = html('button', 'pulucam-kuva');
  kortti.type = 'button';
  kortti.title = 'Katso kuvat suurempana';
  kortti.style.setProperty('--pulucam-kulma', `${asento.kulma}deg`);
  kortti.style.setProperty('--pulucam-x', `${asento.x}%`);
  kortti.style.setProperty('--pulucam-y', `${asento.y}%`);
  // Päällimmäisenä se, joka pulpahti viimeisenä.
  kortti.style.setProperty('--pulucam-kerros', String(i + 1));
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
  kortti.append(img, puluCamMerkki());
  return kortti;
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
 * @returns {boolean} nousiko pakka
 */
export function naytaPuluCamPakka(ui, {
  pohja, kuvat, osoite, vara, avaa, raahattu = () => false,
} = {}) {
  if (!ui || !pohja || !kuvat?.length) return false;
  piilotaPuluCamPakka(ui);
  const pakka = html('div', 'pulucam-pakka');
  pakka.setAttribute('role', 'group');
  pakka.setAttribute('aria-label', 'Pulun nykyajan kuvat');
  pohja.appendChild(pakka);

  const ajastimet = [];
  const tila = { pakka, ajastimet, kuvat, kortit: [] };
  ui.pulucamPakka = tila;

  kuvat.forEach((kuva, i) => {
    const kortti = pakanKortti(kuva, i, osoite, vara);
    /*
     * NAPAUTUS AVAA KARUSELLIN, RAAHAUS EI (sama sopimus kuin
     * luentakuvalla): selain lähettää klikin myös raahauksen
     * päätteeksi, ja ilman lippua jokainen siirto päättyisi
     * karuselliin.
     */
    kortti.addEventListener('click', (tapahtuma) => {
      tapahtuma?.stopPropagation?.();
      if (raahattu()) return;
      avaa?.(i);
    });
    tila.kortit.push(kortti);
    const nosta = () => {
      if (ui.pulucamPakka !== tila) return;
      pakka.appendChild(kortti);
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
  return true;
}

/** Onko pakka juuri nyt kartalla? (vartijoita ja testejä varten) */
export function puluCamPakassa(ui) {
  return Boolean(ui?.pulucamPakka);
}
