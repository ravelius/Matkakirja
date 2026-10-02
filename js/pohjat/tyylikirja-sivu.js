/**
 * TYYLIKIRJAN KEHITTÄJÄSIVU (tyylikirja.html; omistaja 1.10.2026, UI-pohjat kohta 7).
 *
 * 1. Teemat: jokaisen teeman roolivärit valitsimina. Muutos asettaa --tk-<teema>-<rooli>-muuttujan sivun juureen,
 *    joten kaikki esikatselut päivittyvät heti.
 * 2. Typografia: seitsemän porrasta näytetekstinä.
 * 3. Pohjat esimerkkidatalla (Ateena/Akropolis, sama nosto kuin natiivin kuvaparissa): NOSTOKORTTI 0/1/2/3+ kuvaa
 *    PAPERI ja 2 kuvaa TUMMA, KORTTI vahvistus (modaali) ja visa, PANEELI ja ERIKOISNOSTOT (ajattelijoiden päät).
 * 4. Tallenna ehdotus: muuttuneet tokenit JSONina palautekanavaan sivulla "Tyylikirja" (sama reitti kuin
 *    äänimikserin Tallenna). Rooli vie hyväksytyt arvot tyylikirja.json:iin ja ajaa generaattorin.
 */
import { luoPohjaNostokortti, luoPohjaKortti, luoPohjaPaneeli, luoPohjaGalleria } from './pohjat.js';
import { PEILI_JUURI, peiliKuvaPolku, julisteUrl, julistePieniUrl } from '../media.js';
import { JULISTEET, JULISTE_LAHDE } from '../packs/julisteet.js';
import { luoPohjaErikoisnostot, piirraEsikatselu } from '../ajattelijapaat.js';
import { AJATTELIJAT } from '../linssit/ajattelija.js';

// Pelin kuvapeili (sama reitti kuin nostojen kuvilla).
const TKS_KUVA = (nimi) => `${PEILI_JUURI}${peiliKuvaPolku(nimi, 'kuvat')}`;

const TKS_PERUS = {
  yla: 'Ateena · nähtävyys',
  otsikko: 'Akropolis, kaupunki kalliolla',
  kappaleet: [{
    teksti: 'Akropolis on kalliolinna keskellä Ateenaa: 156 metrin kalkkikivikallio, jonka päällä seisovat '
      + 'Parthenonin, Erekhtheionin ja Athena Niken temppelit sekä Propylaia-portti. Nykyiset rakennukset '
      + 'pystytettiin 400-luvulla eaa. Perikleen aikana, mutta kalliolla oli asuttu ja rakennettu jo tuhansia '
      + 'vuosia aiemmin.',
  }],
  lahde: 'en-Wikipedia "Acropolis of Athens"',
  napit: [
    { teksti: 'Kysy', tyyppi: 'toiminto', toiminto: 'kysy' },
    { teksti: 'Lue lisää', tyyppi: 'toiminto', toiminto: 'lue' },
    { teksti: 'Lehti', tyyppi: 'ensisijainen', toiminto: 'lehti' },
  ],
};

const TKS_KUVAT = [
  { url: TKS_KUVA('The Parthenon in Athens.jpg'), kuvateksti: 'Parthenon Akropoliin kalliolla.' },
  { url: TKS_KUVA('Temple of Hephaestus from ancient agora Athens.jpg'), kuvateksti: 'Hefaistoksen temppeli agoralta.' },
  { url: TKS_KUVA('Little owl (Athene noctua),.jpg'), kuvateksti: 'Minervanpöllö, Athenen lintu.' },
  { url: TKS_KUVA('Marathon Tomb of the Athenians 1.jpg'), kuvateksti: 'Ateenalaisten hautakumpu Marathonilla.' },
];

/** Esimerkkipaneelin viivaikonit (24 × 24, viiva currentColor). */
const TKS_IKONI = (polku) => `<svg viewBox="0 0 24 24" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${polku}</svg>`;
const TKS_PANEELI = {
  ryhmat: [
    { vierekkain: true, rivit: [
      { tyyppi: 'navigointi', nimi: 'Linssit', ikoni: TKS_IKONI('<circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 4.5 4.5"/>') },
      { tyyppi: 'navigointi', nimi: 'Aarteet', ikoni: TKS_IKONI('<path d="M4 11h16v7H4zM4 11a8 5 0 0 1 16 0M10.5 13.5h3"/>') },
      { tyyppi: 'navigointi', nimi: 'Matka', ikoni: TKS_IKONI('<circle cx="7" cy="7" r="2"/><path d="M9 7h6a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h8"/>') },
    ] },
    { otsikko: 'Äänet', rivit: [
      { tyyppi: 'kytkin', nimi: 'Kertoja', paalla: true, ikoni: TKS_IKONI('<path d="M4 6c3-1 6-1 8 1 2-2 5-2 8-1v12c-3-1-6-1-8 1-2-2-5-2-8-1zM12 7v12"/>') },
      { tyyppi: 'kytkin', nimi: 'Musiikki', paalla: true, ikoni: TKS_IKONI('<path d="M9 17V6l10-2v11"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="15" r="2"/>') },
      { tyyppi: 'kytkin', nimi: 'Tila', paalla: false, ikoni: TKS_IKONI('<path d="M5 10h3l4-4v12l-4-4H5zM16 9a4 4 0 0 1 0 6M18.5 7a7 7 0 0 1 0 10"/>') },
    ] },
    { erotin: true, vierekkain: true, rivit: [
      { tyyppi: 'toiminto', nimi: 'Uusi peli' },
      { tyyppi: 'toiminto', nimi: 'Retkikunta' },
      { tyyppi: 'navigointi', nimi: 'Asetukset' },
    ] },
  ],
  alarivi: { vasen: 'Matkakirja', oikea: 'versio 2505' },
};
const TKS_PANEELI_ASETUKSET = {
  kapiteeli: 'Asetukset',
  takaisin: () => {},
  ryhmat: [
    { otsikko: 'Äänentasot', rivit: [
      { tyyppi: 'saadin', nimi: 'Kertoja', arvo: 80, muotoile: (v) => `${v} %` },
      { tyyppi: 'saadin', nimi: 'Musiikki', arvo: 45, muotoile: (v) => `${v} %` },
    ] },
    { rivit: [
      { tyyppi: 'kytkin', nimi: 'Automaattiheitto', paalla: false },
      { tyyppi: 'navigointi', nimi: 'Lukijaääni', arvo: 'Isoisä' },
    ] },
  ],
};

const TKS_POHJAT = [
  { nimi: 'NOSTOKORTTI · 0 kuvaa · PAPERI', luo: () => luoPohjaNostokortti(TKS_PERUS, { esikatselu: true }) },
  { nimi: 'NOSTOKORTTI · 1 kuva (hero 2:1) · PAPERI', luo: () => luoPohjaNostokortti({ ...TKS_PERUS, kuvat: TKS_KUVAT.slice(0, 1) }, { esikatselu: true }) },
  { nimi: 'NOSTOKORTTI · 2 kuvaa (hero + upotus) · PAPERI', luo: () => luoPohjaNostokortti({ ...TKS_PERUS, kuvat: TKS_KUVAT.slice(0, 2) }, { esikatselu: true }) },
  { nimi: 'NOSTOKORTTI · 3+ kuvaa (hero + galleria) · PAPERI', luo: () => luoPohjaNostokortti({ ...TKS_PERUS, kuvat: TKS_KUVAT }, { esikatselu: true }) },
  { nimi: 'NOSTOKORTTI · 2 kuvaa · TUMMA (linssi)', luo: () => luoPohjaNostokortti({ ...TKS_PERUS, kuvat: TKS_KUVAT.slice(0, 2) }, { esikatselu: true, teema: 'tumma' }) },
  {
    nimi: 'KORTTI · vahvistus (modaali)',
    luo: () => luoPohjaKortti({
      yla: 'Uusi matka',
      otsikko: 'Aloitetaanko uusi matka?',
      kappaleet: [{ teksti: 'Nykyinen matka, löydetyt aarteet ja kukkarosi nollautuvat. Isoisän päiväkirja pysyy mukana.' }],
      napit: [
        { teksti: 'Peruuta', tyyppi: 'toiminto', toiminto: 'peruuta' },
        { teksti: 'Aloita alusta', tyyppi: 'ensisijainen', toiminto: 'aloita' },
      ],
    }, { modaali: true, esikatselu: true }),
  },
  {
    nimi: 'KORTTI · visa (3 vastausta)',
    luo: () => luoPohjaKortti({
      yla: 'Ateena · kohtaaminen',
      otsikko: 'Parthenon-temppeli Akropoliilla oli omistettu jumalattarelle, jonka mukaan kaupunki sai nimensä. Kenelle?',
      napit: [
        { teksti: 'A  Heralle', tyyppi: 'toiminto', toiminto: 'a' },
        { teksti: 'B  Athenelle', tyyppi: 'toiminto', toiminto: 'b' },
        { teksti: 'C  Artemikselle', tyyppi: 'toiminto', toiminto: 'c' },
      ],
    }, { modaali: true, esikatselu: true }),
  },
  { nimi: 'PANEELI · pillerivalikon pääsivu · PAPERI (malli 09)', luo: () => luoPohjaPaneeli(TKS_PANEELI, { esikatselu: true }) },
  { nimi: 'PANEELI · alinäkymä: Asetukset (säätimet) · PAPERI', luo: () => luoPohjaPaneeli(TKS_PANEELI_ASETUKSET, { esikatselu: true }) },
  { nimi: 'PANEELI · LASI (linssin päällä)', luo: () => luoPohjaPaneeli({ ...TKS_PANEELI, teema: 'lasi' }, { esikatselu: true }) },
  {
    nimi: 'GALLERIA · Julisteet (4 voitettua, 2 lukossa) · PAPERI',
    luo: () => {
      const ruutu = (id) => {
        const j = JULISTEET[id];
        return j ? {
          nimi: j.kaupunki, kuva: julistePieniUrl(j.tiedosto), vara: julisteUrl(j.tiedosto),
          suuri: { url: julisteUrl(j.tiedosto), otsikko: j.otsikko, kuvateksti: j.lyhyt, lahde: JULISTE_LAHDE },
        } : { lukossa: true };
      };
      const idt = Object.keys(JULISTEET).slice(0, 4);
      return luoPohjaGalleria({
        otsikko: 'Julisteet', laskuri: `4/${Object.keys(JULISTEET).length}`, suhde: '2:3',
        osiot: [{ nimi: 'Eurooppa', laskuri: '4/6', ruudut: [...idt.map(ruutu), { lukossa: true }, { lukossa: true }] }],
      }, { esikatselu: true });
    },
  },
  {
    nimi: 'ERIKOISNOSTOT · ajattelijoiden päät (kartuutsin vieressä, kehittäjätila)',
    luo: () => {
      const pohja = luoPohjaErikoisnostot(Object.values(AJATTELIJAT).filter((a) => a.kartta), { esikatselu: true });
      piirraEsikatselu(pohja).catch((syy) => console.warn('erikoisnostot', syy));
      return pohja;
    },
  },
];

function tksSolmu(tagi, luokka, teksti) {
  const e = document.createElement(tagi);
  if (luokka) e.className = luokka;
  if (teksti != null) e.textContent = teksti;
  return e;
}

/** #rrggbb värivalitsimelle; rgba-arvot jäävät tekstikenttään. */
function tksHeksa(arvo) {
  return /^#[0-9a-f]{6}$/i.test(arvo) ? arvo : null;
}

const tksMuutokset = {};

function tksTeemat(isa, tk) {
  isa.appendChild(tksSolmu('h2', null, 'Teemat'));
  isa.appendChild(tksSolmu('p', 'tks-ohje', 'Teeman valitsee konteksti, ei pinta: PAPERI (oletus), TUMMA (kuvan tai yön päällä), LASI (linssin ohjaimet).'));
  const ruudukko = tksSolmu('div', 'tks-teemat');
  for (const [teema, roolit] of Object.entries(tk.teemat ?? {})) {
    if (teema.startsWith('_') || typeof roolit !== 'object') continue;
    const laatikko = tksSolmu('div', `tks-teema tk-teema-${teema}`);
    laatikko.appendChild(tksSolmu('h3', null, teema));
    for (const [rooli, arvo] of Object.entries(roolit)) {
      if (rooli.startsWith('_')) continue;
      const muuttuja = `--tk-${teema}-${rooli}`;
      const rivi = tksSolmu('label', 'tks-vari');
      const teksti = tksSolmu('input');
      teksti.type = 'text';
      teksti.value = arvo;
      const aseta = (uusi) => {
        document.documentElement.style.setProperty(muuttuja, uusi);
        if (uusi === arvo) delete tksMuutokset[`teemat.${teema}.${rooli}`];
        else tksMuutokset[`teemat.${teema}.${rooli}`] = { vanha: arvo, uusi };
        tksPaivitaJson();
      };
      const heksa = tksHeksa(arvo);
      if (heksa) {
        const valitsin = tksSolmu('input');
        valitsin.type = 'color';
        valitsin.value = heksa;
        valitsin.addEventListener('input', () => { teksti.value = valitsin.value; aseta(valitsin.value); });
        rivi.appendChild(valitsin);
      }
      teksti.addEventListener('change', () => aseta(teksti.value.trim()));
      rivi.append(teksti, tksSolmu('span', null, rooli));
      laatikko.appendChild(rivi);
    }
    ruudukko.appendChild(laatikko);
  }
  isa.appendChild(ruudukko);
}

function tksTypografia(isa, tk) {
  isa.appendChild(tksSolmu('h2', null, 'Typografia (7 porrasta)'));
  const portaat = tksSolmu('div', 'tks-portaat');
  for (const [nimi, p] of Object.entries(tk.typografia ?? {})) {
    if (nimi.startsWith('_') || typeof p !== 'object') continue;
    const rivi = tksSolmu('div', 'tks-porras');
    rivi.appendChild(tksSolmu('code', null, `${nimi} ${p.koko} · ${p.kirjasin}`));
    const naytto = tksSolmu('span', null, 'Akropolis, kaupunki kalliolla');
    naytto.style.fontSize = `var(--tk-koko-${nimi})`;
    naytto.style.fontFamily = /^Kone/.test(p.kirjasin) ? 'var(--font-type)' : 'var(--font-luku)';
    if (/Lihava|Bold/.test(p.kirjasin)) naytto.style.fontWeight = '700';
    if (/Kursiivi/.test(p.kirjasin)) naytto.style.fontStyle = 'italic';
    rivi.appendChild(naytto);
    portaat.appendChild(rivi);
  }
  isa.appendChild(portaat);
}

function tksPohjat(isa) {
  isa.appendChild(tksSolmu('h2', null, 'Pohjat'));
  isa.appendChild(tksSolmu('p', 'tks-ohje', 'Esimerkkidata Ateena/Akropolis (sama nosto kuin natiivin kuvaparissa). Webissä NOSTOKORTTI, KORTTI, PANEELI, GALLERIA ja ERIKOISNOSTOT; natiivissa kaikki pohjat.'));
  const ruudukko = tksSolmu('div', 'tks-pohjat');
  for (const p of TKS_POHJAT) {
    const lohko = tksSolmu('div', 'tks-pohja');
    lohko.appendChild(tksSolmu('h3', null, p.nimi));
    const esikatselu = tksSolmu('div', 'tk-esikatselu');
    const pohja = p.luo();
    if (pohja) {
      esikatselu.appendChild(pohja.el);
      pohja.avaa();
    }
    lohko.appendChild(esikatselu);
    ruudukko.appendChild(lohko);
  }
  isa.appendChild(ruudukko);
}

let tksJson = null;
function tksPaivitaJson() {
  if (!tksJson) return;
  tksJson.value = JSON.stringify({ tyylikirja: 'ehdotus', aika: new Date().toISOString(), muutokset: tksMuutokset }, null, 2);
}

function tksTallenna(isa) {
  isa.appendChild(tksSolmu('h2', null, 'Tallenna ehdotus'));
  isa.appendChild(tksSolmu('p', 'tks-ohje', 'Muuttuneet arvot lähetetään palautekanavaan sivulla "Tyylikirja" (kuten äänimikserin Tallenna). Rooli vie hyväksytyt arvot tyylikirja.json:iin.'));
  const lohko = tksSolmu('div', 'tks-tallenna');
  tksJson = tksSolmu('textarea');
  tksJson.readOnly = true;
  tksPaivitaJson();
  const rivi = tksSolmu('div', 'tk-napit tk-teema-paperi');
  const laheta = tksSolmu('button', 'tk-nappi tk-nappi--ensisijainen', 'Tallenna ehdotus');
  laheta.type = 'button';
  const tila = tksSolmu('p', 'tks-ohje');
  laheta.addEventListener('click', async () => {
    if (!Object.keys(tksMuutokset).length) { tila.textContent = 'Ei muutoksia.'; return; }
    laheta.disabled = true;
    tila.textContent = 'Lähetetään…';
    try {
      // Tuonti vasta lähetyksessä: ehdotukset.js vetää mukaan pelin käyttöliittymäapurit ja äänet.
      const { lahetaEhdotus } = await import('../ehdotukset.js');
      await lahetaEhdotus({ sivu: 'Tyylikirja', teksti: tksJson.value, nimimerkki: 'Tyylikirja' });
      tila.textContent = 'Ehdotus lähetetty.';
    } catch (e) {
      tila.textContent = `Lähetys ei onnistunut: ${e?.message ?? e}`;
    } finally {
      laheta.disabled = false;
    }
  });
  rivi.appendChild(laheta);
  lohko.append(tksJson, rivi, tila);
  isa.appendChild(lohko);
}

async function tksKaynnista() {
  const juuri = document.getElementById('tyylikirja');
  if (!juuri) return;
  let tk = null;
  try {
    tk = await (await fetch('tyylikirja/tyylikirja.json', { cache: 'no-cache' })).json();
  } catch {
    juuri.appendChild(tksSolmu('p', 'tks-ohje', 'tyylikirja.json ei latautunut.'));
    return;
  }
  tksTeemat(juuri, tk);
  tksTypografia(juuri, tk);
  tksPohjat(juuri);
  tksTallenna(juuri);
}

if (typeof document !== 'undefined') tksKaynnista();
