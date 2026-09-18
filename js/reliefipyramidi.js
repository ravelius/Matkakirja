/*
 * RELIEFIPYRAMIDI — topografialinssin oma laatasto pääkartan laatikossa.
 *
 * Reliefi on tähän asti ollut YKSI ISO KUVA (js/linssit/topografia.js
 * piirtää `<image>`-elementin laudan rajasuorakulmioon) ja sen päälle
 * lähizoomissa laastari (js/linssit/topografia-tarkennus.js). Kuva on
 * 10 800 pikseliä leveä eli 30 px/aste; lähizoomissa ruudulla on
 * moninkertaisesti enemmän, joten laastari on se, mikä tekee
 * tarkkuuden — ja sekin lukee samaa yhtä kuvaa.
 *
 * tools/tee-reliefipyramidi.mjs polttaa saman reliefin 15″:n
 * lähdeaineistosta (ETOPO 2022) LAATOIKSI, z0…z7, jossa z7 on 86 400
 * pikseliä leveä eli 240 px/aste — kahdeksankertainen tiheys yhteen
 * kuvaan nähden, ja silti kevyempi ruudulla, koska näkyvästä
 * ikkunasta haetaan vain sen omat laatat.
 *
 * --- MIKSI TÄMÄ ON OMA MODUULI EIKÄ OSA laattapyramidi.js:ää ---
 *
 * Laatasto on PÄÄKARTAN RUUDUKKO PIKSELILLEEN. Reliefipyramidin arkki
 * on `{ x: 0, y: −1046.3149255312064, w: 12000, h: 7307.715927310571 }`
 * eli sama olio kuin laattapyramidin `ARKKI_VARALLA`, ja tasot ovat
 * samat 675 → 86 400 pikseliä 512:n laatoissa. Siksi reliefilaatta
 * z7/166/21 osuu TÄSMÄLLEEN samaan lautaruutuun kuin pohjalaatta
 * z7/166/21, ja sama laattakone (js/pallolaatat.js luoLaattakerros,
 * js/laattapyramidi.js paivitaKerros) osaa piirtää sen ilman yhtään
 * uutta geometriaa.
 *
 * Erillään siksi, että reliefillä on OMA LUETTELO omassa
 * osoitteessaan. Pohjan `pyramidi.json` ei tiedä reliefistä mitään
 * eikä sen tarvitse: jos ne pantaisiin samaan tiedostoon, jokainen
 * reliefin uusintapoltto pakottaisi pohjan luettelon uusiksi ja
 * päinvastoin.
 *
 * --- KYTKIN ON OLETUKSENA PÄÄLLÄ (18.9.2026, erä 4) ---
 *
 * Laatat ovat ämpärissä:
 * `https://media.matkakirja.app/matkakirja/reliefipyramidi/20260918/`
 * (luettelo `reliefipyramidi.json`, laatat z0–z7 ikuisessa
 * välimuistissa). Erän 3 mittaus totesi laataston valmiiksi — ei
 * seepiapyyntöjä, 12 laattaa näkyvälle ikkunalle, terävämpi kuva, ei
 * kehysajan hintaa, meri ehjä — ja kolme estettä oletukselle olivat
 * vienti, syvin zoomi ja avauksen kirkkausvälähdys. Kaikki kolme on
 * nyt purettu, joten laatasto on topografialinssin OLETUSLÄHDE.
 *
 * `?reliefipyramidi=0` palauttaa vanhan polun varalle: yksi kuva ja
 * tarkennuslaastari. Vipu jää siksi, että vanha polku on yhä koodissa
 * ja sen on oltava ajettavissa ilman kääntämistä, jos ämpäri on
 * alhaalla tai laatastossa löytyy vika kentällä.
 *
 * --- PAIKALLINEN KANSIO SAVUKKEILLE ---
 *
 * `globalThis.RELIEFIPYRAMIDI_KANSIO` korvaa ämpärin juuren. Savuke
 * ajaa pelin ilman verkkoa ja välittää laatat Noden route-välityksellä
 * levyltä (sama kuvio kuin ämpärin muillakin kuvilla), joten
 * mittaaminen ei odota vientiä. Selaimessa muuttujaa ei ole, ja juuri
 * on ämpäri.
 */

/*
 * ÄMPÄRIN ALIPOLKU. Vientikomento kirjoittaa
 * `s3://matkakirja/matkakirja/reliefipyramidi/<versio>/…`
 * (docs/raportit/viesti-fable-reliefi-kytkenta-20260918.md), ja
 * media.js:n R2-juuri on `https://media.matkakirja.app/`.
 */
const ALIPOLKU = 'matkakirja/reliefipyramidi/';

/*
 * VERSIO VAKIONA, MANIFESTI VOITTAA. Laatan osoitteessa on ajon
 * versio, joten laatta kelpaa ikuiseen välimuistiin; luettelo
 * tarkistetaan. Vakio on se, jolla ensimmäinen nouto osataan tehdä
 * ennen kuin luetteloa on kädessä — jos luettelossa on `versio`, se
 * voittaa seuraavasta noudosta alkaen.
 */
export const VERSIO_VARALLA = '20260918';

/*
 * AVOMEREN VÄRI. Polttotyökalu ei kirjoita avomerestä laattaa
 * lainkaan (tools/tee-reliefipyramidi.mjs `pelkkaaMerta`), koska se on
 * tasaista väriä — 6 228 laattaa 6 631:stä z7:llä. Kun reliefi on
 * pohja eikä sen alla ole seepiakarttaa, meri on maalattava, ja tämä
 * on sama väri, jonka työkalun asteikko antaa −4 000 metrille
 * (`MERIVARI`). Sama luku kahdessa paikassa on riski, mutta
 * vaihtoehto — värin lukeminen luettelosta — vaatisi sen
 * kirjoittamista sinne ensin; se kuuluu seuraavaan polttoon.
 */
export const MERIVARI = 'rgb(38, 78, 145)';

/** Kytkimen nimi osoiterivillä. */
export const KYTKIN = 'reliefipyramidi';

let reliefiLuettelo = null;
let haku = null;

/*
 * ONKO TOPOGRAFIALINSSI AUKI?
 *
 * TÄMÄ EI OLE KOSMETIIKKAA VAAN SE, MIKÄ TEKEE TÄSTÄ LINSSIN
 * LAATASTON EIKÄ UUTTA PÄÄKARTTAA. Reliefi piirtyy samalla
 * laattakoneella kuin pohja, joten pelkän kytkimen varassa se
 * värittäisi pelin oman seepiakartan maastoksi — juuri sen, mitä
 * omistaja 4.8.2026 kielsi (*"pidetään seepia normaalissa
 * pelinäkymässä"*). Lippu nousee, kun linssi avataan
 * (js/linssit/topografia.js `pallolle`), ja laskee sen `pura`ssa.
 */
let linssiAuki = false;

/**
 * Onko reliefipyramidi päällä tässä istunnossa?
 *
 * Luetaan joka kerta eikä välimuistiteta: savuke vaihtaa osoitetta
 * kesken ajon, ja välimuistitettu vastaus jäisi ensimmäiseen.
 */
export function reliefipyramidiPaalla(ikkuna = globalThis) {
  try {
    const haku2 = ikkuna?.location?.search ?? '';
    const arvo = new URLSearchParams(haku2).get(KYTKIN);
    // Vain nimenomainen kielto ottaa laataston pois; kaikki muu — myös
    // puuttuva parametri — on oletus eli päällä.
    return !(arvo === '0' || arvo === 'false');
  } catch {
    /*
     * Ei osoitetta (testiajo, työläinen). Oletus on sama kuin
     * selaimessa: laatasto päällä. Testi, joka haluaa vanhan polun,
     * antaa ikkunan, jonka `location.search` on `?reliefipyramidi=0`.
     */
    return true;
  }
}

/**
 * Laataston juuri: paikallinen kansio, jos savuke on sen asettanut,
 * muuten ämpäri.
 *
 * Paluuarvo päättyy AINA kauttaviivaan, jotta kutsuja voi liittää
 * polun perään ilman omaa tarkistusta.
 */
export function reliefinJuuri(ikkuna = globalThis, ampariJuuri = 'https://media.matkakirja.app/') {
  const kansio = ikkuna?.RELIEFIPYRAMIDI_KANSIO;
  if (typeof kansio === 'string' && kansio) {
    return kansio.endsWith('/') ? kansio : `${kansio}/`;
  }
  return `${ampariJuuri}${ALIPOLKU}`;
}

/** Käytössä oleva versio (luettelo voittaa vakion). */
export function reliefinVersio() {
  return reliefiLuettelo?.versio ?? VERSIO_VARALLA;
}

/** Luettelon osoite. */
export function reliefinLuetteloUrl(ikkuna = globalThis) {
  return `${reliefinJuuri(ikkuna)}${reliefinVersio()}/reliefipyramidi.json`;
}

/**
 * Yhden laatan osoite. Sama kaava kuin pohjalla — versio polussa,
 * z/sarake/rivi sen alla.
 */
export function reliefinLaattaUrl(taso, sarake, rivi, ikkuna = globalThis) {
  return `${reliefinJuuri(ikkuna)}${reliefinVersio()}`
    + `/z${taso.z}/${sarake}/${rivi}.webp`;
}

/**
 * Meripeitteestä laattakartan bittikartta.
 *
 * Reliefin luettelo kertoo PUUTTUVAT laatat (`meriLaatat`, lista
 * `"sarake/rivi"`) eikä olemassa olevia — avomeri on tasaista väriä,
 * eikä siitä polteta laattaa lainkaan (6 228 laattaa z7:llä). Pohjan
 * luettelossa sama tieto on base64-bittikarttana (`laatasto`), ja
 * `laattaOlemassa` lukee sen kentästä `__bitit`. Käännetään tässä,
 * jotta laattakone näkee molemmat laatastot samanlaisina eikä
 * yhdenkään puuttuvan laatan takia lähde 404:ää hakemaan.
 */
export function meripeitonBitit(taso) {
  const n = taso.sarakkeita * taso.riveja;
  const bitit = new Uint8Array(Math.ceil(n / 8)).fill(0xff);
  for (const avain of taso.meriLaatat ?? []) {
    const [s, r] = String(avain).split('/').map(Number);
    if (!Number.isFinite(s) || !Number.isFinite(r)) continue;
    if (s < 0 || s >= taso.sarakkeita || r < 0 || r >= taso.riveja) continue;
    const i = r * taso.sarakkeita + s;
    bitit[i >> 3] &= ~(1 << (i & 7));
  }
  return bitit;
}

/**
 * Reliefin tasot laattakoneen muodossa: sama geometria kuin pohjalla,
 * `reliefi: true` ohjaamassa osoitteen ja noutokirjanpidon omalle
 * polulleen, ja `__bitit` valmiiksi purettuna meripeitosta.
 *
 * Null, jos luetteloa ei ole (kytkin pois tai nouto kesken) — kerros
 * jää silloin tyhjäksi eikä yksikään pyyntö lähde.
 */
export function reliefinTasot() {
  if (!reliefiLuettelo?.tasot?.length) return null;
  if (!reliefiLuettelo.__tasot) {
    reliefiLuettelo.__tasot = reliefiLuettelo.tasot.map((t) => ({
      ...t,
      reliefi: true,
      laatasto: undefined,
      __bitit: meripeitonBitit(t),
      taustavari: MERIVARI,
    }));
  }
  return reliefiLuettelo.__tasot.length ? reliefiLuettelo.__tasot : null;
}

/*
 * RELIEFIN SYVIN TASO — LAATTAKONEEN KATTO LINSSIN AJAN.
 *
 * Pohjapyramidissa on z8 (172 800 px), reliefissä vain z0…z7
 * (86 400 px). Mitattu 18.9.2026 (mittaa-reliefipyramidi.mjs, Alppien
 * lähizoomi): kerros valitsi tarpeen mukaan z8:n, jolle reliefitasoa
 * EI ole — jokainen laatta jäi tilaan `virhe`, ruutu oli musta eikä
 * yhtään laattapyyntöä lähtenyt. Taso valitaan pohjan luettelosta,
 * joten katto on kysyttävä reliefiltä erikseen.
 */
export function reliefinSyvinTaso() {
  const tasot = reliefinTasot();
  if (!tasot?.length) return null;
  return tasot.reduce((a, t) => Math.max(a, t.z), 0);
}

/** Tason z reliefikerros tai null. */
export function reliefinTaso(z) {
  return reliefinTasot()?.find((t) => t.z === z) ?? null;
}

/**
 * Hakee luettelon kerran istuntoa kohti.
 *
 * Ei heitä: puuttuva luettelo tarkoittaa, ettei laatastoa ole
 * viety — kerros jää tyhjäksi ja peli piirtää yhden kuvan kuten
 * ennenkin. Sama varareitti kuin pohjalla: `no-cache` TARKISTAA
 * välimuistin, ja jos tarkistus ei mene läpi, tavallinen nouto saa yhä
 * vastata välimuistista (lentokonetila).
 */
export async function haeReliefinLuettelo(ikkuna = globalThis) {
  if (reliefiLuettelo) return reliefiLuettelo;
  if (!reliefipyramidiPaalla(ikkuna)) return null;
  haku ??= (async () => {
    const osoite = reliefinLuetteloUrl(ikkuna);
    try {
      let v = await fetch(osoite, { cache: 'no-cache' });
      if (!v.ok) v = await fetch(osoite);
      if (!v.ok) return null;
      reliefiLuettelo = await v.json();
      return reliefiLuettelo;
    } catch {
      return null;
    }
  })();
  return haku;
}

/**
 * Topografialinssi avattiin tai suljettiin. Kutsutaan linssin
 * elinkaaresta; laattakone lukee tuloksen `reliefiKaytossa`:sta.
 */
export function asetaReliefiLinssi(paalla) {
  linssiAuki = Boolean(paalla);
}

/**
 * Piirretäänkö reliefilaatasto juuri nyt? Kytkin JA avoin linssi —
 * kumpikin yksinään ei riitä.
 */
export function reliefiKaytossa(ikkuna = globalThis) {
  return linssiAuki && reliefipyramidiPaalla(ikkuna);
}

/** Vain testejä varten: nollaa moduulin tila. */
export function nollaaReliefi(uusiLuettelo = null) {
  reliefiLuettelo = uusiLuettelo;
  haku = null;
  linssiAuki = false;
}
