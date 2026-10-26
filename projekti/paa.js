/*
 * Projektisivun pääohjain: piirtää kuusi pääosiota ja hoitaa
 * hash-reitityksen (#tilanne, #linssit, #linssit/katalogi, #pelit/osat …).
 *
 * Data tulee tavallisina skripteinä ennen tätä moduulia:
 *   linssikatalogi-data.js → window.LINSSIKATALOGI
 *   pelikatalogi-data.js   → window.PELIKATALOGI
 *   projekti-data.js       → window.PROJEKTIDATA
 * Katalogien data kulkee julkinen.js:n suodattimen läpi ennen piirtoa.
 */
import { julkisetLinssit, julkisetKuvatekstit, julkisetPelit } from './julkinen.js';
import { KUVATEKSTIT } from './linssi-kuvatekstit.js';
import { luoLinssit } from './linssit.js';
import { luoPelit } from './pelit.js';
import { kokoaLuvut, piirraTilanne, piirraOsaAlue } from './tilanne.js';

export const PAAOSIOT = ['tilanne', 'linssit', 'pelit', 'kartta', 'sisalto', 'natiivi'];

const linssit = julkisetLinssit(window.LINSSIKATALOGI);
const pelit = julkisetPelit(window.PELIKATALOGI);
const projekti = window.PROJEKTIDATA;
const L = kokoaLuvut(projekti, linssit, pelit);

const osio = (nimi) => document.getElementById(`osio-${nimi}`);
piirraTilanne(osio('tilanne'), projekti, L);
const aktivoiLinssit = luoLinssit(osio('linssit'), linssit, julkisetKuvatekstit(KUVATEKSTIT));
const aktivoiPelit = luoPelit(osio('pelit'), pelit);
for (const nimi of ['kartta', 'sisalto', 'natiivi']) piirraOsaAlue(osio(nimi), nimi, projekti, L);

document.getElementById('alatunniste').innerHTML = `Matkakirja ja unohdettu aarre · tilannekatsaus päivitetty ${
  projekti.tilanne.paivitetty ? projekti.tilanne.paivitetty.split('-').reverse().map(Number).join('.') : ''} ·
  luvut lasketaan pelin aineistosta · kuvat ovat kuvakaappauksia pelistä`;

// --- Reititys ---
function lueHash() {
  const [paa, ala] = decodeURIComponent((location.hash || '').replace(/^#/, '')).split('/');
  return { paa: PAAOSIOT.includes(paa) ? paa : 'tilanne', ala: ala || '' };
}
let edellinen = null;
function reitita() {
  const { paa, ala } = lueHash();
  for (const nimi of PAAOSIOT) {
    osio(nimi).hidden = nimi !== paa;
    document.querySelector(`.paa-nappi[data-paa="${nimi}"]`).setAttribute('aria-selected', nimi === paa ? 'true' : 'false');
  }
  if (paa === 'linssit') aktivoiLinssit(ala);
  if (paa === 'pelit') aktivoiPelit(ala);
  // Pääosion vaihtuessa näkymä välilehtien kohdalle, jos ne ovat jo vierineet pois.
  if (edellinen && edellinen !== paa) {
    const nav = document.getElementById('paavalilehdet');
    if (nav.getBoundingClientRect().top < 0) window.scrollTo(0, nav.offsetTop - 8);
  }
  edellinen = paa;
  document.body.dataset.paa = paa;
  document.title = `${document.querySelector(`.paa-nappi[data-paa="${paa}"] .pitka`).textContent} — Matkakirja ja unohdettu aarre`;
}
window.addEventListener('hashchange', reitita);
reitita();

// --- Teema (sama avain kuin pelissä ja vanhoissa katalogeissa) ---
const TEEMA_AVAIN = 'matkakirja-teema';
const kytkin = document.getElementById('teemakytkin');
function nykyinenTeema() {
  return document.documentElement.dataset.theme
    || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}
function asetaTeema(teema, tallenna) {
  if (teema === 'dark' || teema === 'light') document.documentElement.dataset.theme = teema;
  else delete document.documentElement.dataset.theme;
  if (tallenna) {
    try { localStorage.setItem(TEEMA_AVAIN, teema); } catch { /* yksityinen tila */ }
  }
  kytkin.textContent = nykyinenTeema() === 'dark' ? 'Päivätila' : 'Yötila';
}
try {
  const tallennettu = localStorage.getItem(TEEMA_AVAIN);
  asetaTeema(tallennettu === 'dark' || tallennettu === 'light' ? tallennettu : null, false);
} catch {
  asetaTeema(null, false);
}
kytkin.addEventListener('click', () => asetaTeema(nykyinenTeema() === 'dark' ? 'light' : 'dark', true));
