/* Viisi omistajan peliin hyväksymää B-kasvon elettä, 9.9.2026.
 * Nykyinen nappi, chat, tekstit ja audion omistajuus säilyvät.
 */
import { LIVIAN_KASVOELEET, livianKasvoAsento, luoLivianKasvot } from './livia-kasvot.js';

/** Liike seuraa jo arvottua, näkyvää repliikkiä. Ei uutta arvontaa. */
export function livianMietintaEle(teksti = '') {
  if (/pulla|pullalla|mur[uui]/iu.test(teksti)) return 'crumb';
  if (/pöll|kysyn|kysymässä|kysyn asiaa|oikealta linnulta|vien viestin|lent|vastatuul|kaart|kierrosta|kaukana|käyn hakemassa/iu.test(teksti)) return 'owl';
  if (/(?:^|[^\p{L}])(?:kaivan|arkist|hylly|katto|katolle|pienellä|kirjaan|kirjan|sähkeitä)/iu.test(teksti)) return 'peek';
  return 'glance';
}

export function asennaLivianKasvot(pollo) {
  const doc = pollo?.doc, nappi = pollo?.nappi;
  // Tekstipohjaiset testit ja vanhat selaimet käyttävät alkuperäistä kuvaketta.
  if (!doc?.createElement || !nappi?.append || typeof Image === 'undefined'
      || typeof MutationObserver === 'undefined' || typeof requestAnimationFrame === 'undefined') return null;
  const pinta = doc.createElement('span');
  pinta.className = 'livia-kasvot-pinta'; pinta.setAttribute('aria-hidden', 'true');
  nappi.append(pinta);
  const vahenna = matchMedia('(prefers-reduced-motion: reduce)');
  let kasvot = null, kuollut = false, frame = 0, ajastin = 0, nykyinen = null;
  let alkoi = 0, osuus = 0, alkuOsuus = 0, odotusrivi = null, odotusteksti = '';
  let viimeToimi = performance.now(), tyhjaVuoro = 0, paluu = null;
  const lepo = () => livianKasvoAsento('blink', 0);
  const nakyy = () => !doc.hidden && !nappi.hidden && nappi.isConnected
    && getComputedStyle(nappi).display !== 'none' && getComputedStyle(nappi).visibility !== 'hidden';
  function pysayta() { cancelAnimationFrame(frame); frame = 0; nykyinen = null; paluu = null; }
  function piirra(asento) { if (!kuollut) kasvot?.paint(asento); }
  function askel(nyt) {
    frame = 0;
    if (kuollut || !nykyinen || !nakyy()) { pysayta(); piirra(lepo()); return; }
    if (paluu) {
      const t = Math.min(1, (nyt - alkoi) / 240), k = t*t*(3-2*t), p = lepo();
      for (const avain of Object.keys(p)) p[avain] = paluu[avain] + (p[avain]-paluu[avain])*k;
      piirra(p);
      if (t === 1) { pysayta(); return; }
    } else {
      osuus = Math.min(1, alkuOsuus + (nyt-alkoi)/nykyinen.duration);
      // Pöllöretki pysyy poissa, kunnes sama odotusrivi poistuu.
      if (nykyinen.id === 'owl' && odotusrivi?.isConnected && osuus >= .6 && alkuOsuus < .6) {
        osuus = .6; piirra(livianKasvoAsento('owl', osuus)); return;
      }
      piirra(livianKasvoAsento(nykyinen.id, osuus));
      if (osuus === 1) { pysayta(); return; }
    }
    frame = requestAnimationFrame(askel);
  }
  function toista(id) {
    pysayta();
    if (!kasvot || kuollut || !nakyy() || vahenna.matches) { piirra(lepo()); return; }
    nykyinen = LIVIAN_KASVOELEET.find(e=>e.id===id);
    if (!nykyinen) return;
    osuus = 0; alkuOsuus = 0; alkoi = performance.now(); frame = requestAnimationFrame(askel);
  }
  function palaa() {
    if (!nykyinen) return;
    const p = livianKasvoAsento(nykyinen.id, osuus);
    cancelAnimationFrame(frame);
    if (!nakyy() || vahenna.matches) { pysayta(); piirra(lepo()); return; }
    if (nykyinen.id === 'owl' && osuus >= .32) {
      alkuOsuus = Math.max(.66, osuus); alkoi = performance.now();
    } else { paluu = p; alkoi = performance.now(); }
    frame = requestAnimationFrame(askel);
  }
  function mietintaMuuttui() {
    const rivi = pollo.auki ? pollo.virta?.querySelector('.pollo-odottaa') : null;
    const teksti = rivi?.textContent || '';
    if (rivi === odotusrivi && teksti === odotusteksti) return;
    const oli = odotusrivi, edellinenEle = nykyinen?.id;
    odotusrivi = rivi; odotusteksti = teksti;
    if (!rivi) { if (oli) palaa(); return; }
    if (rivi === oli && edellinenEle === 'owl') return;
    toista(livianMietintaEle(teksti));
  }
  function rauhallinen() {
    const ui = pollo.haeUi?.();
    return nakyy() && !pollo.auki && !odotusrivi && !ui?.liviaAani && !ui?.diaryVoice
      && !doc.querySelector('dialog[open], .pollo-kuplapino-kehys:not([hidden])')
      && !doc.body.classList.contains('aikajana-paalla')
      && !doc.body.classList.contains('flight-active') && !doc.body.classList.contains('kartalento');
  }
  function ajasta() {
    clearTimeout(ajastin);
    if (kuollut || vahenna.matches) return;
    ajastin = setTimeout(() => {
      if (!nykyinen && rauhallinen() && performance.now()-viimeToimi >= 30000) {
        toista(['blink','crumb','peek'][tyhjaVuoro++ % 3]); viimeToimi = performance.now();
      }
      ajasta();
    }, 12000);
  }
  function toiminta() { viimeToimi = performance.now(); if (!odotusrivi) palaa(); }
  let auki = Boolean(pollo.auki);
  const nappiVahti = new MutationObserver(() => {
    if (!nakyy()) { pysayta(); piirra(lepo()); }
    if (Boolean(pollo.auki) !== auki) {
      auki = Boolean(pollo.auki); odotusrivi = null; odotusteksti = '';
      toista(auki ? 'glance' : 'peek'); mietintaMuuttui();
    }
  });
  const virtaVahti = new MutationObserver(mietintaMuuttui);
  function liikeAsetus() { pysayta(); piirra(lepo()); ajasta(); }
  function tausta() { if (doc.hidden) { pysayta(); piirra(lepo()); } viimeToimi = performance.now(); }
  function tuhoa() {
    if (kuollut) return; kuollut = true; pysayta(); clearTimeout(ajastin);
    nappiVahti.disconnect(); virtaVahti.disconnect(); pinta.remove();
    nappi.classList.remove('livia-kasvot-valmis');
    doc.removeEventListener('pointerdown',toiminta,true);doc.removeEventListener('keydown',toiminta,true);
    doc.removeEventListener('visibilitychange',tausta);vahenna.removeEventListener('change',liikeAsetus);
    removeEventListener('pagehide',tausta);
  }
  luoLivianKasvot(pinta).then(k => {
    if (kuollut) { k.remove(); return; } kasvot = k;
    nappi.classList.add('livia-kasvot-valmis');
    nappiVahti.observe(nappi,{attributes:true,attributeFilter:['hidden','class','aria-expanded','style']});
    if(pollo.virta)virtaVahti.observe(pollo.virta,{childList:true,subtree:true,characterData:true});
    doc.addEventListener('pointerdown',toiminta,true);doc.addEventListener('keydown',toiminta,true);
    doc.addEventListener('visibilitychange',tausta);vahenna.addEventListener('change',liikeAsetus);
    addEventListener('pagehide',tausta);ajasta();toista('blink');mietintaMuuttui();
  }).catch(() => { pinta.remove(); });
  return {
    kupla(teksti) { viimeToimi=performance.now(); if(!odotusrivi)toista(/pulla|mur[uui]/iu.test(teksti||'')?'crumb':'blink'); },
    toista, palaa, tuhoa,
  };
}
