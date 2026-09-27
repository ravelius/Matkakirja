/*
 * Projektisivun yhteiset apurit: HTML-escapointi, lukurivi, päivämäärät
 * ja alavälilehtien ohjaus. Ei riippuvuuksia.
 */

export function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/** "2026-09-27" → "27.9.2026". */
export function paivaTeksti(iso) {
  if (!iso) return '';
  const [v, k, p] = iso.split('-').map(Number);
  return `${p}.${k}.${v}`;
}

/** Luku suomalaisittain tuhaterottimella: 298335 → "298 335". */
export function luku(n) {
  return Number(n).toLocaleString('fi-FI').replace(/ /g, ' ');
}

/** Katalogin otsakkeen lukurivi: [[nimi, luku, erittely], …]. */
export function luvutHTML(rivit) {
  return rivit.map(([nimi, arvo, erittely]) => `<div><b>${esc(arvo)}</b>${esc(nimi)}${erittely ? `<span class="erittely">${esc(erittely)}</span>` : ''}</div>`).join('');
}

/**
 * Alavälilehdet: napit [data-ala] ja paneelit [data-ala-paneeli] juuren
 * sisällä. Napin painallus vaihtaa osoitteen muotoon #<paa>/<ala>, ja
 * pääohjain (paa.js) kutsuu palautetun aktivoi-funktion.
 */
export function alavalilehdet(juuri, paa, nimet) {
  juuri.querySelector('.valilehdet').addEventListener('click', (ev) => {
    const nappi = ev.target.closest('.valilehti-nappi');
    if (nappi) location.hash = `${paa}/${nappi.dataset.ala}`;
  });
  return function aktivoi(ala) {
    const valittu = nimet.includes(ala) ? ala : nimet[0];
    for (const n of nimet) {
      juuri.querySelector(`[data-ala-paneeli="${n}"]`).hidden = n !== valittu;
      juuri.querySelector(`.valilehti-nappi[data-ala="${n}"]`).setAttribute('aria-selected', n === valittu ? 'true' : 'false');
    }
    return valittu;
  };
}
