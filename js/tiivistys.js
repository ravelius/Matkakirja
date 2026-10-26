/*
 * PIENENNETTY = MAHDOLLISIMMAN TIIVIS, ANIMOIDEN (omistaja 28.9.2026,
 * Raamattu PR #3527, sanatarkasti astrolinssin selitteestä: *"pitää
 * pienentää tuo selittelen palkki kun se on Pienennetty. Tee siitä
 * yleinen tapa. Se on jo matkakirjassa. Eli animoitu pienennys
 * mahdollisimman tiiviiksi."*).
 *
 * YLEINEN APURI kaikille pienennettäville selitteille, inforuuduille ja
 * palkeille: `animoiKoko(el, muutos)` mittaa laatikon ennen muutosta,
 * tekee muutoksen (luokka pois/päälle), mittaa uuden koon ja liu'uttaa
 * leveyden ja korkeuden vanhasta uuteen (FLIP). Lopuksi kiinteät mitat
 * poistetaan, joten laatikko on taas sisältönsä kokoinen eikä jää
 * animaation lukitsemaan mittaan.
 *
 * MIKSI EI PELKKÄ CSS-SIIRTYMÄ: tiivis koko on sisällön koko (`width:
 * auto` / `max-content`), eikä selain animoi avainsanoja. Matkakirjan
 * kortti (.fact-card.pieni) animoi siksi vain korkeuden ja vaihtaa
 * leveyden hypyllä; tämä animoi molemmat.
 *
 * Liikkeenvähennys: muutos tehdään suoraan ilman liukua.
 */

/** Pienennyksen ja avauksen kesto (ms), sama kuin selitteen rungon kelaus. */
export const TIIVISTYKSEN_MS = 250;

const liikePois = () => Boolean(globalThis.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);

/**
 * Tekee `muutos()`-kutsun ja liu'uttaa `el`:n koon vanhasta uuteen.
 * @param {HTMLElement} el laatikko, jonka koko muuttuu
 * @param {() => void} muutos luokan vaihto tms., joka muuttaa kokoa
 * @param {{ kesto?: number }} [asetukset]
 */
export function animoiKoko(el, muutos, { kesto = TIIVISTYKSEN_MS } = {}) {
  const mittaa = () => el?.getBoundingClientRect?.() ?? null;
  const ennen = mittaa();
  // Kesken oleva liuku päättyy: uusi alkaa siitä, mihin edellinen jäi.
  el?.__tiivistysLoppu?.();
  muutos();
  if (!el?.style || !ennen || liikePois() || !(ennen.width > 0)) return;
  const jalkeen = mittaa();
  if (!jalkeen || (Math.abs(jalkeen.width - ennen.width) < 1 && Math.abs(jalkeen.height - ennen.height) < 1)) return;
  const s = el.style;
  const vanhaYlivuoto = s.overflow;
  s.width = `${ennen.width}px`;
  s.height = `${ennen.height}px`;
  s.overflow = 'hidden';
  void el.offsetWidth; // lähtömitat voimaan ennen siirtymää
  s.transition = `width ${kesto}ms ease, height ${kesto}ms ease`;
  s.width = `${jalkeen.width}px`;
  s.height = `${jalkeen.height}px`;
  let ajastin = 0;
  const loppu = () => {
    clearTimeout(ajastin);
    el.removeEventListener?.('transitionend', paatos);
    s.transition = '';
    s.width = '';
    s.height = '';
    s.overflow = vanhaYlivuoto;
    delete el.__tiivistysLoppu;
  };
  const paatos = (e) => { if (e.target === el && e.propertyName === 'width') loppu(); };
  el.addEventListener?.('transitionend', paatos);
  // Varmistus: transitionend ei tule, jos elementti irtoaa kesken.
  ajastin = setTimeout(loppu, kesto + 80);
  el.__tiivistysLoppu = loppu;
}
