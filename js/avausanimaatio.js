/*
 * AVAUS JA SULKU ANIMOIDEN — yhteinen apuri lapuille, korteille, paneeleille ja pop-upeille.
 *
 * Omistaja 29.9.2026 (maakuntalapusta, sanatarkasti): "Voiko lapun aukeamisen ja sulkeutumisen animoida? Ja
 * jatkossa myös kaikki vastaavat. Kirjaa raamattuun." Raamattu: jokainen lappu, kortti, paneeli, selite ja pop-up
 * avautuu kasvaen ja häivyttyen esiin sen avanneen napin tai kohdan suunnasta ja sulkeutuu samaa reittiä takaisin
 * (myös ✕:llä, ohinapautuksella ja uuden avautuessa), 200–250 ms, pehmeä jarrutus sisään ja kevyt kiihdytys ulos;
 * webissä ja natiivissa samat kestot (web on malli).
 *
 * ARVOT (samat natiivissa, Natiivi-UI 29.9.): sisään transform 220 ms cubic-bezier(0.22, 0.9, 0.24, 1) ja
 * läpinäkyvyys 180 ms cubic-bezier(0, 0, 0.2, 1); ulos molemmat 200 ms cubic-bezier(0.4, 0, 1, 1); lähtö- ja
 * lopputila scale(0.92) ja opacity 0. Paikka ei liiku — vain mittakaava ja läpinäkyvyys.
 *
 * AVAUSKOHTA: annettu nappi (sen keskipiste) tai, jos nappia ei anneta, viimeisin napautus alle 1,5 s sitten
 * (pointerdown koko sivulla). Muuten elementin keskusta.
 *
 * SULKU EI VIIVYTÄ SULKEMISTA: kutsuja poistaa tai piilottaa alkuperäisen heti kuten ennenkin, joten kaikki koodi,
 * joka tunnistaa avoimen kortin luokastaan (kartan eleet js/kartta-liike.js, lauta js/pallolauta/lauta.js,
 * savukkeet), näkee sen suljettuna samalla hetkellä. Liike piirretään irrallisella HAAMULLA, joka ei vastaa yhtäkään
 * pelin valitsinta, ei ota kosketuksia vastaan ja poistuu itse animaation lopussa:
 *   - korttikerros (kerros + kortti): sisältö siirretään haamukerrokseen (suljeKerrosAnimoiden) — kuvat ja
 *     kuuntelijat säilyvät, eikä tyylejä tarvitse kopioida;
 *   - yksittäinen laatikko (pop-up, valikko, paneeli): kopio, jonka laskettu tyyli on kirjoitettu auki ja luokat ja
 *     tunnisteet riisuttu (haamuSulku).
 *
 * Ilman liikettä (prefers-reduced-motion), ilman Web Animations API:a tai selaimen ulkopuolella (Noden testit)
 * mikään ei animoidu ja kaikki tapahtuu heti.
 */

export const AVAUS_MS = 220;
export const AVAUS_HAIVE_MS = 180;
export const SULKU_MS = 200;
export const AVAUS_KAARI = 'cubic-bezier(0.22, 0.9, 0.24, 1)';
export const AVAUS_HAIVE_KAARI = 'cubic-bezier(0, 0, 0.2, 1)';
export const SULKU_KAARI = 'cubic-bezier(0.4, 0, 1, 1)';
const MITTAKAAVA = 0.92;
const NAPAUTUS_TUORE_MS = 1500;

let viimeisinNapautus = null;
if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
  document.addEventListener('pointerdown', (tapahtuma) => {
    viimeisinNapautus = { x: tapahtuma.clientX, y: tapahtuma.clientY, t: Date.now() };
  }, { capture: true, passive: true });
}

/** Animoidaanko: selain, Web Animations API ja ei vähennetyn liikkeen pyyntöä. */
export function animoidaanko(elementti) {
  if (typeof matchMedia !== 'function' || typeof elementti?.animate !== 'function') return false;
  return !matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Avauskohta näytön koordinaateissa: napin keskipiste, tuore napautus tai null. */
function avauskohta(lahde) {
  const r = lahde?.getBoundingClientRect?.();
  if (r?.width || r?.height) return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  if (lahde && Number.isFinite(lahde.x) && Number.isFinite(lahde.y)) return { x: lahde.x, y: lahde.y };
  if (viimeisinNapautus && Date.now() - viimeisinNapautus.t < NAPAUTUS_TUORE_MS) return viimeisinNapautus;
  return null;
}

/** transform-origin avauskohtaan elementin omissa koordinaateissa (laatikko sellaisena kuin se nyt on ruudulla). */
function origo(elementti, kohta) {
  if (!kohta) return '50% 50%';
  const r = elementti.getBoundingClientRect();
  return `${Math.round(kohta.x - r.left)}px ${Math.round(kohta.y - r.top)}px`;
}

/** Elementin oma transform (esim. translate-keskitys) säilyy: skaalaus lisätään sen perään. */
function omaMuunnos(elementti) {
  const m = getComputedStyle(elementti).transform;
  return m && m !== 'none' ? m : '';
}

/**
 * Avaus: kasvaa ja häivyttyy esiin avauskohdasta. Kutsu heti, kun elementti on näkyvissä omalla paikallaan
 * (lisätty DOMiin, hidden pois, dialogi avattu).
 */
export function animoiAvaus(elementti, lahde = null) {
  if (!animoidaanko(elementti)) return;
  // Kesken jäänyt sulku (piilotaAnimoiden) perutaan: sama elementti avautuu uudelleen.
  for (const kesken of elementti.getAnimations?.() ?? []) kesken.cancel();
  const oma = omaMuunnos(elementti);
  const alkuperainen = elementti.style.transformOrigin;
  elementti.style.transformOrigin = origo(elementti, avauskohta(lahde));
  const kasvu = elementti.animate(
    [{ transform: `${oma} scale(${MITTAKAAVA})`.trim() }, { transform: oma || 'none' }],
    { duration: AVAUS_MS, easing: AVAUS_KAARI },
  );
  elementti.animate([{ opacity: 0 }, { opacity: 1 }], { duration: AVAUS_HAIVE_MS, easing: AVAUS_HAIVE_KAARI });
  const palauta = () => { elementti.style.transformOrigin = alkuperainen; };
  kasvu.addEventListener?.('finish', palauta);
  kasvu.addEventListener?.('cancel', palauta);
}

/** Sulkuanimaatio haamulle; haamu poistetaan lopussa (varmistus ajastimella, jos finish jää tulematta). */
function haivytaPois(haamu, liikkuva, kohta, oma) {
  liikkuva.style.transformOrigin = origo(liikkuva, kohta);
  const vaihe = { duration: SULKU_MS, easing: SULKU_KAARI, fill: 'forwards' };
  const liike = liikkuva.animate(
    [{ transform: oma || 'none', opacity: 1 }, { transform: `${oma} scale(${MITTAKAAVA})`.trim(), opacity: 0 }],
    vaihe,
  );
  let poistettu = false;
  const poista = () => { if (!poistettu) { poistettu = true; haamu.remove(); } };
  liike.addEventListener?.('finish', poista);
  setTimeout(poista, SULKU_MS + 80);
}

/**
 * KORTTIKERROS: kerros (koko ruudun himmennys) ja sen sisällä kortti. Kerros poistetaan DOMista heti; kortti
 * siirtyy haamukerrokseen, joka pitää kerroksen asettelun ja himmennyksen ja häivyttää molemmat pois.
 *
 * @param {Element} kerros       poistettava kerros
 * @param {string}  korttiValitsin kerroksen suora kortti (esim. '.fokusnosto-kortti')
 * @param {string[]} riisuttavat kerroksen luokat, joilla peli tunnistaa avoimen kortin (ne eivät siirry haamuun)
 * @param {?Element|{x,y}} lahde sulkeutumisen kohde (avannut nappi); oletuksena viimeisin napautus
 */
export function suljeKerrosAnimoiden(kerros, korttiValitsin, riisuttavat = [], lahde = null) {
  if (!kerros?.parentNode) return;
  const kortti = kerros.querySelector(`:scope > ${korttiValitsin}`);
  if (!kortti || !animoidaanko(kortti)) { kerros.remove(); return; }
  const tyyli = getComputedStyle(kerros);
  const haamu = document.createElement('div');
  for (const luokka of kerros.classList) if (!riisuttavat.includes(luokka)) haamu.classList.add(luokka);
  haamu.classList.add('sulkuhaamu');
  haamu.setAttribute('aria-hidden', 'true');
  haamu.inert = true;
  Object.assign(haamu.style, {
    position: 'fixed', inset: '0', zIndex: tyyli.zIndex, display: tyyli.display,
    flexDirection: tyyli.flexDirection, alignItems: tyyli.alignItems, justifyContent: tyyli.justifyContent,
    padding: tyyli.padding, background: tyyli.backgroundColor, pointerEvents: 'none',
    transition: `background ${SULKU_MS}ms ${SULKU_KAARI}`,
  });
  const oma = omaMuunnos(kortti);
  while (kerros.firstChild) haamu.appendChild(kerros.firstChild);
  kerros.replaceWith(haamu);
  void haamu.offsetWidth;
  haamu.style.background = 'transparent';
  haivytaPois(haamu, kortti, avauskohta(lahde), oma);
}

/** Lasketun tyylin kopio kohteeseen (elementit rinnakkain, samassa järjestyksessä). */
function kirjoitaTyylit(lahde, kohde) {
  const tyyli = getComputedStyle(lahde);
  for (let i = 0; i < tyyli.length; i += 1) {
    const nimi = tyyli[i];
    kohde.style.setProperty(nimi, tyyli.getPropertyValue(nimi));
  }
  // Kopio ei toista alkuperäisen omia avausanimaatioita tai siirtymiä.
  kohde.style.animation = 'none';
  kohde.style.transition = 'none';
  const lapset = lahde.children;
  const kopiot = kohde.children;
  for (let i = 0; i < lapset.length && i < kopiot.length; i += 1) kirjoitaTyylit(lapset[i], kopiot[i]);
}

/**
 * YKSITTÄINEN LAATIKKO (pop-up, valikko, paneeli, dialogi): kutsu JUURI ENNEN kuin alkuperäinen poistetaan,
 * piilotetaan tai suljetaan. Kopio (tyylit auki kirjoitettuina, ilman luokkia ja tunnisteita) jää samaan kohtaan ja
 * pienenee ja häivyttyy kohti avauskohtaa.
 */
export function haamuSulku(elementti, lahde = null) {
  if (!elementti?.isConnected || !animoidaanko(elementti)) return;
  const r = elementti.getBoundingClientRect();
  if (!r.width || !r.height) return;
  const kopio = elementti.cloneNode(true);
  kirjoitaTyylit(elementti, kopio);
  for (const solmu of [kopio, ...kopio.querySelectorAll('*')]) {
    solmu.removeAttribute('id');
    solmu.removeAttribute('class');
    solmu.removeAttribute('open');
  }
  const z = Number.parseInt(getComputedStyle(elementti).zIndex, 10);
  Object.assign(kopio.style, {
    position: 'fixed', left: `${r.left}px`, top: `${r.top}px`, right: 'auto', bottom: 'auto', margin: '0',
    width: `${r.width}px`, height: `${r.height}px`, boxSizing: 'border-box', transform: 'none',
    zIndex: String(Number.isFinite(z) ? Math.max(z, 60) : 1000), pointerEvents: 'none',
  });
  kopio.setAttribute('aria-hidden', 'true');
  kopio.inert = true;
  document.body.appendChild(kopio);
  haivytaPois(kopio, kopio, avauskohta(lahde), '');
}

/**
 * ISO TAI PYSYVÄ ELEMENTTI (Pulun paneeli, dialogi): elementti itse pienenee ja häivyttyy kohti avauskohtaa, ja
 * `valmis` (piilotus tai dialogin close) ajetaan animaation lopussa. Kopio olisi näille liian raskas (Pulun koko
 * keskusteluloki). Sulkeutuva elementti ei ota kosketuksia vastaan; animoiAvaus samalle elementille perii sulun,
 * jolloin `valmis` jää ajamatta. Ilman animaatiota `valmis` ajetaan heti.
 */
export function piilotaAnimoiden(elementti, lahde, valmis) {
  if (!animoidaanko(elementti) || elementti.hidden || !elementti.isConnected) { valmis(); return; }
  const oma = omaMuunnos(elementti);
  const kosketus = elementti.style.pointerEvents;
  const alkuperainen = elementti.style.transformOrigin;
  elementti.style.pointerEvents = 'none';
  elementti.style.transformOrigin = origo(elementti, avauskohta(lahde));
  const liike = elementti.animate(
    [{ transform: oma || 'none', opacity: 1 }, { transform: `${oma} scale(${MITTAKAAVA})`.trim(), opacity: 0 }],
    { duration: SULKU_MS, easing: SULKU_KAARI, fill: 'forwards' },
  );
  let ohi = false;
  const palauta = () => {
    elementti.style.pointerEvents = kosketus;
    elementti.style.transformOrigin = alkuperainen;
  };
  liike.addEventListener?.('cancel', () => { if (!ohi) { ohi = true; palauta(); } });
  const loppu = () => {
    if (ohi) return;
    ohi = true;
    valmis();
    palauta();
    liike.cancel();
  };
  liike.addEventListener?.('finish', loppu);
  setTimeout(loppu, SULKU_MS + 80);
}

/*
 * DIALOGIT (erä B). Pelin natiivit <dialog>-laput (.dialog, .muutokset-dialog: säännöt, laukku, visa, saapuminen,
 * muutokset, …) avautuvat ja sulkeutuvat samoin arvoin. Kytkentä on prototyypissä, jotta jokainen showModal- ja
 * close-kutsu (ui.js:ssä kymmeniä) kulkee saman reitin.
 *
 * SULKU ON NATIIVISTI HETI: close() suljetaan oikeasti samalla hetkellä kuin ennenkin, joten [open], .open,
 * close-tapahtuma ja returnValue käyttäytyvät täsmälleen kuten ennen (pelin `dialog[open]`-vahdit, `if
 * (!X.open) X.showModal()` -ketjut ja savukkeet). Vain KUVA jää: dialogi pidetään sulun ajan näkyvissä samassa
 * paikassa kiinteänä, kosketuksia ottamattomana elementtinä, ja sen kortti pienenee ja häivyttyy; taustan himmennys
 * häivyttyy erillisenä haamuna. Uusi showModal kesken sulun purkaa kuvan heti.
 *
 * Esc (cancel) ja <form method="dialog"> ohjataan samaan sulkuun vain, jos mikään pelin oma käsittelijä ei ole
 * estänyt oletusta (visan, tapahtuman ja lehden omat peruutukset kutsuvat close():a itse).
 *
 * Tiivis lehtiarkki (.tiivis-lehtiarkki) mitataan avauksen jälkeen (css/styles.css TIIVIS LEHTIARKKI EI LIU'U
 * ESIIN), joten sen kortti vain häivyttyy eikä skaalaudu. Dialogi, jolla on data-oma-sulku, hoitaa liikkeensä itse
 * (js/tekijakortti.js).
 */
const DIALOGIVALITSIN = '.dialog, .muutokset-dialog';

function animoitavaDialogi(dialogi) {
  return Boolean(dialogi?.matches?.(DIALOGIVALITSIN)) && !dialogi.hasAttribute('data-oma-sulku');
}

function dialoginKortti(dialogi) {
  return dialogi.querySelector(':scope > .dialog-card') ?? dialogi;
}

function vainHaive(dialogi) {
  return dialogi.matches('.tiivis-lehtiarkki');
}

function taustanVari(dialogi) {
  try { return getComputedStyle(dialogi, '::backdrop').backgroundColor || 'transparent'; } catch { return 'transparent'; }
}

/** Kesken oleva sulkukuva pois heti (uusi avaus tai toinen sulku). */
function puraSulkukuva(dialogi) {
  dialogi.avausSulkukuva?.();
}

function dialogiAuki(dialogi, lahde) {
  const kortti = dialoginKortti(dialogi);
  if (!animoidaanko(kortti)) return;
  if (vainHaive(dialogi)) {
    kortti.animate([{ opacity: 0 }, { opacity: 1 }], { duration: AVAUS_HAIVE_MS, easing: AVAUS_HAIVE_KAARI });
  } else {
    animoiAvaus(kortti, lahde);
  }
  try {
    dialogi.animate([{ opacity: 0 }, { opacity: 1 }],
      { duration: AVAUS_MS, easing: AVAUS_HAIVE_KAARI, pseudoElement: '::backdrop' });
  } catch { /* selain ei animoi ::backdropia: himmennys ilmestyy heti */ }
}

function dialogiKiinni(dialogi, natiiviSulku) {
  const kortti = dialoginKortti(dialogi);
  if (!animoidaanko(kortti)) { natiiviSulku(); return; }
  const r = dialogi.getBoundingClientRect();
  const tyyli = getComputedStyle(dialogi);
  const tausta = taustanVari(dialogi);
  const vanhaTyyli = dialogi.getAttribute('style');
  const vanhaInert = dialogi.inert;
  natiiviSulku();
  // close-tapahtuman käsittelijä voi avata saman dialogin heti uudelleen tai poistaa sen: silloin kuvaa ei jätetä.
  if (dialogi.open || !dialogi.isConnected || !r.width || !r.height) return;
  // Kuva paikalleen: sama laatikko kiinteänä, kaiken päällä, ei kosketuksia.
  Object.assign(dialogi.style, {
    display: tyyli.display === 'none' ? 'block' : tyyli.display, position: 'fixed', inset: 'auto',
    left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px`, margin: '0',
    maxWidth: 'none', maxHeight: 'none', zIndex: '2147483000', pointerEvents: 'none',
  });
  dialogi.inert = true;
  const verho = document.createElement('div');
  verho.setAttribute('aria-hidden', 'true');
  Object.assign(verho.style, {
    position: 'fixed', inset: '0', background: tausta, zIndex: '2147482999', pointerEvents: 'none',
  });
  dialogi.before(verho);
  const vaihe = { duration: SULKU_MS, easing: SULKU_KAARI, fill: 'forwards' };
  const liikkeet = [verho.animate([{ opacity: 1 }, { opacity: 0 }], vaihe)];
  if (vainHaive(dialogi)) liikkeet.push(kortti.animate([{ opacity: 1 }, { opacity: 0 }], vaihe));
  else {
    const oma = omaMuunnos(kortti);
    kortti.style.transformOrigin = origo(kortti, avauskohta(null));
    liikkeet.push(kortti.animate(
      [{ transform: oma || 'none', opacity: 1 }, { transform: `${oma} scale(${MITTAKAAVA})`.trim(), opacity: 0 }],
      vaihe,
    ));
  }
  let ohi = false;
  const pura = () => {
    if (ohi) return;
    ohi = true;
    for (const l of liikkeet) l.cancel();
    verho.remove();
    if (vanhaTyyli === null) dialogi.removeAttribute('style'); else dialogi.setAttribute('style', vanhaTyyli);
    dialogi.inert = vanhaInert;
    if (kortti !== dialogi) kortti.style.transformOrigin = '';
    if (dialogi.avausSulkukuva === pura) dialogi.avausSulkukuva = null;
  };
  dialogi.avausSulkukuva = pura;
  liikkeet[liikkeet.length - 1].addEventListener?.('finish', pura);
  setTimeout(pura, SULKU_MS + 80);
}

let dialogitAsennettu = false;

/** Kytkee dialogien avaus- ja sulkuliikkeen (kerran, js/main.js käynnistyksessä). */
export function asennaDialogianimaatiot() {
  if (dialogitAsennettu || typeof HTMLDialogElement === 'undefined' || typeof document === 'undefined') return;
  dialogitAsennettu = true;
  const proto = HTMLDialogElement.prototype;
  const natiiviAvaus = proto.showModal;
  const natiiviSulku = proto.close;
  proto.showModal = function showModal(...argumentit) {
    if (!animoitavaDialogi(this)) return natiiviAvaus.apply(this, argumentit);
    puraSulkukuva(this);
    const oliAuki = this.open;
    const tulos = natiiviAvaus.apply(this, argumentit);
    if (!oliAuki) dialogiAuki(this, null);
    return tulos;
  };
  proto.close = function close(...argumentit) {
    if (!animoitavaDialogi(this) || !this.open) return natiiviSulku.apply(this, argumentit);
    puraSulkukuva(this);
    dialogiKiinni(this, () => natiiviSulku.apply(this, argumentit));
    return undefined;
  };
  // Esc: pelin omat käsittelijät ensin; vasta jos kukaan ei estänyt, sulku kulkee animoiden.
  document.addEventListener('cancel', (tapahtuma) => {
    const dialogi = tapahtuma.target;
    if (!(dialogi instanceof HTMLDialogElement) || !animoitavaDialogi(dialogi)) return;
    dialogi.addEventListener('cancel', (e) => {
      if (e.defaultPrevented || !dialogi.open) return;
      e.preventDefault();
      dialogi.close();
    }, { once: true });
  }, true);
  document.addEventListener('submit', (tapahtuma) => {
    const lomake = tapahtuma.target;
    if (tapahtuma.defaultPrevented || lomake?.method !== 'dialog') return;
    const dialogi = lomake.closest('dialog');
    if (!animoitavaDialogi(dialogi) || !dialogi.open) return;
    tapahtuma.preventDefault();
    // Natiivisti returnValue saa lähettäjän arvon vain, jos napilla on value (muuten ennallaan).
    const lahettaja = tapahtuma.submitter;
    dialogi.close(lahettaja?.hasAttribute?.('value') ? lahettaja.value : undefined);
  });
}
