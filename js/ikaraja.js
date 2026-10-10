/*
 * IKÄRAJA JA KURATOITU LIVE WEBISSÄ (Raamattu: LIVE-TEKOÄLY KAIKILLE, ALLE 18 KURATOITU, 10.10.2026; natiivi on malli:
 * Natiivi-UI:n Ikaraja.cs, natiivi-ui/ikakysely-176). Ennen ensimmäistä live-kysymystä peli kysyy kerran syntymävuoden
 * ja tallentaa vain tiedon aikuinen kyllä/ei (ei vuotta). Pulun pyynnöt kantavat otsakkeen x-matkakirja-aikuinen:
 * 1 = aikuinen, 0 = alle 18 tai tuntematon (worker tools/pollo/kuratoitu.js).
 *
 *   Pohja: olemassa oleva <dialog class="dialog"> (#ikaraja-dialog, index.html; PT 10.10. 11.0x, HYVÄKSYTTY POHJA KÄY
 *   VASTAAVIIN). Tekstit ja järjestys natiivikortista. Ei nyt (tai Esc) = tuntematon ikä: kuratoitu tämän käynnistyksen
 *   ajan, kysytään uudestaan seuraavalla käynnistyksellä. Aikuinen vain varmasti: vuosi − syntymävuosi − 1 ≥ 18.
 */
export const IKARAJA_AVAIN = 'matkakirja-aikuinen';
export const AIKUINEN_OTSAKE = 'x-matkakirja-aikuinen';
export const TAYSI_IKA = 18;
export const VANHIN_VUOSI = 1920;

export const IKARAJA_TEKSTIT = Object.freeze({
  otsikko: 'Minä vuonna olet syntynyt?',
  teksti: 'Pulun vapaat vastaukset tuottaa tekoäly (Claude). Alle 18-vuotiaille Pulu vastaa rajatummin: vain pelin paikoista ja aiheista.',
  tallennus: 'Syntymävuotta ei tallenneta. Peli muistaa vain, oletko täysi-ikäinen.',
  valitse: 'Valitse syntymävuosi',
  syntymavuosi: 'Syntymävuosi',
  eiNyt: 'Ei nyt',
  jatka: 'Jatka',
  merkinta: 'Vastaukset tuottaa tekoäly (Claude)',
});

let eiNyt = false;

/** Aikuinen (true), alle 18 (false) tai ei tiedossa (null). */
export function ikaAikuinen() {
  try {
    const a = globalThis.localStorage?.getItem(IKARAJA_AVAIN);
    return a === '1' ? true : a === '0' ? false : null;
  } catch {
    return null;
  }
}

/** Workerin otsakearvo: 1 vain varmalle aikuiselle, muuten 0 (kuratoitu). */
export function ikaOtsakeArvo() {
  return ikaAikuinen() === true ? '1' : '0';
}

/** Kysytty tällä käynnistyksellä (Ei nyt) tai aiemmin (vastaus tallessa). */
export function ikaKysytty() {
  return eiNyt || ikaAikuinen() !== null;
}

/** Pienin mahdollinen ikä tänä vuonna (syntymäpäivä voi olla vielä edessä) ≥ 18. */
export function onAikuinen(syntymavuosi, nyt) {
  return nyt - syntymavuosi - 1 >= TAYSI_IKA;
}

export function tallennaIka(aikuinen) {
  try { globalThis.localStorage?.setItem(IKARAJA_AVAIN, aikuinen ? '1' : '0'); } catch { /* yksityinen selaus: kysytään uudestaan */ }
  eiNyt = false;
}

/** Testien ja kehittäjän koukku: vastaus ja Ei nyt pois. */
export function nollaaIka() {
  try { globalThis.localStorage?.removeItem(IKARAJA_AVAIN); } catch { /* ei tallennusta */ }
  eiNyt = false;
}

/**
 * Ennen live-tekoälyä: jos ikää ei ole kysytty, #ikaraja-dialog aukeaa ja palautuu lupaus, joka ratkeaa kortin
 * sulkeutuessa (vastaus, Ei nyt tai Esc). Kysytty tai ei dialogia (muu sivu) → null, eikä kutsuja odota mitään
 * (kysymys lähtee samassa tahdissa kuin ennen).
 */
export function kysyIkaEnsin({ doc = globalThis.document, nyt = new Date().getFullYear() } = {}) {
  if (ikaKysytty()) return null;
  const dialogi = doc?.getElementById?.('ikaraja-dialog');
  if (!dialogi || typeof dialogi.showModal !== 'function') return null;
  const valinta = dialogi.querySelector('#ikaraja-vuosi');
  const jatka = dialogi.querySelector('#ikaraja-jatka');
  const eiNytNappi = dialogi.querySelector('#ikaraja-ei-nyt');
  valinta.replaceChildren(new Option(IKARAJA_TEKSTIT.valitse, ''));
  for (let v = nyt; v >= VANHIN_VUOSI; v--) valinta.add(new Option(String(v), String(v)));
  valinta.value = '';
  jatka.disabled = true;
  return new Promise((ratkea) => {
    const muuttui = () => { jatka.disabled = !valinta.value; };
    const vastaa = () => {
      if (!valinta.value) return;
      tallennaIka(onAikuinen(Number(valinta.value), nyt));
      dialogi.close();
    };
    const ohita = () => dialogi.close();
    const suljettu = () => {
      if (ikaAikuinen() === null) eiNyt = true;
      valinta.removeEventListener('change', muuttui);
      jatka.removeEventListener('click', vastaa);
      eiNytNappi.removeEventListener('click', ohita);
      ratkea();
    };
    valinta.addEventListener('change', muuttui);
    jatka.addEventListener('click', vastaa);
    eiNytNappi.addEventListener('click', ohita);
    dialogi.addEventListener('close', suljettu, { once: true });
    dialogi.showModal();
  });
}
