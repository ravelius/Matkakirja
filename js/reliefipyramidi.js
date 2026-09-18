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

/*
 * NAPAJÄÄN VÄRI. Sama luku kuin polttotyökalun `JAAN_VARI`
 * (tools/reliefivarit.mjs [236, 240, 244]). Etelämantereen laattoja ei
 * ole poltettu −65,4°:n eteläpuolelta, eikä siellä ole merta vaan
 * mannerjäätä: avomeren sininen maalasi sen kohdalle valtameren
 * (omistajan iPhone-kuva 18.9.2026, PAATOKSET 41 kohta 2).
 */
export const JAAVARI = 'rgb(236, 240, 244)';

/*
 * MISTÄ ETELÄSSÄ ALKAA JÄÄ.
 *
 * Laatasto on poltettu 18.9.2026 alueelle, jonka eteläreuna on z4:llä
 * −65,4° ja z5…z7:llä −60°; sitä etelämpänä KAIKKI tasot ovat
 * puuttuvia, myös karkeat — z0…z3 johdettiin alinäytteistämällä
 * z4:stä, ja puuttuvan lapsen tilalle työkalu kirjoitti MERIVARIn
 * (tools/tee-reliefipyramidi.mjs). Karkea laatta ei siis ole siellä
 * paikanpitäjäksi kelpaava: se on itsekin sinistä väriä. Siksi tämän
 * rajan eteläpuolella puuttuva laatta maalataan jään sävyllä eikä
 * haeta ylemmän tason laattaa lainkaan.
 */
export const JAARAJA_LAT = -65;

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

/*
 * KUMPI LINSSI PIIRTÄÄ? (PAATOKSET 41 kohta 4, LISAYS 16 kohta 47.)
 *
 * Sama laatasto palvelee kahta linssiä, mutta ne haluavat siitä eri
 * asiat. Topografialinssi on KARTTA: reliefin päälle kuuluvat rannat,
 * reitit ja poltetut nimiöt. Astronautin kamera on IKKUNA AVARUUTEEN:
 * siellä ei ole pelin mustetta lainkaan, vaan pallo, jonka pinta on
 * maasto ja jonka päällä ovat linssin omat kerrokset (ISS, varjo,
 * kohdepisteet). Sama laattakone kelpaa molemmille — vain kerroslista
 * ja sävy eroavat, ja tämä lippu kertoo kumpi on kyseessä.
 *
 * YKSI LAATTAKONE, EI KOPIOTA: ilman tätä Astronautin kameralle olisi
 * pitänyt kirjoittaa oma laatasto, ja kaksi laattakonetta samasta
 * pyramidista olisi kaksi kertaa muistia ja kaksi paikkaa korjata.
 */
let linssiTila = null;

/** Astronautin kameran kerroin kylläisyydelle (sama kuin linssin oma
 * RELIEFIN_SATURAATIO js/linssit/satelliitti-avaruus.js:ssä): astronautin
 * ikkunassa värit ovat vaimeampia kuin kartan asteikossa. */
export const ASTRONAUTIN_SUODATIN = 'saturate(0.8)';

/*
 * ══════════════════════════════════════════════════════════════════
 * VALON VASTAKAAVA MYÖS LAASTARILLE (PAATOKSET 41 kohta 4)
 * ══════════════════════════════════════════════════════════════════
 *
 * VIKA (Fablen luenta kaappauksista 18.9.2026): laastarin alue oli
 * *kirkas päivänvalo* siinä missä 4k-pohja oli astronautin hämärä
 * ("Italian saapas yöllä"), ja laastarin reunalla oli kirkkausraja.
 *
 * JUURISYY EI OLE KYLLÄISYYS VAAN VALO. Pallon valot ovat pelin omat:
 * AmbientLight π ja DirectionalLight 0,6 π SUORAAN POHJOISNAVAN
 * YLÄPUOLELTA (js/pallo.js). Pinnan kirkkaus on siis
 *
 *     tekstuuri × (1 + 0,6 · max(0, sin(leveysaste))),
 *
 * eli 41,6°:ssa 1,40-kertainen ja navalla 1,60-kertainen. Linssin oma
 * 4k-pohjatekstuuri EI ole valaistuksen armoilla: siihen poltetaan
 * valon KÄÄNTEISLUKU rivi riviltä ennen käyttöä
 * (js/linssit/satelliitti-avaruus.js `valoLiuku`, `VALON_KOMPENSAATIO`),
 * joten ruudulla näkyy täsmälleen se sävy, joka tekstuuriin on
 * kirjoitettu.
 *
 * Laastarin laatat ovat SAMA reliefi ja SAMA materiaali
 * (MeshLambertMaterial, samat valot) — mutta niille ei poltettu
 * käänteislukua. Ne saivat siis valon kertoimen ILMAN vastakaavaa ja
 * olivat 41,6°:ssa 1,40-kertaisesti kirkkaammat kuin pohja samassa
 * kohdassa. Kylläisyyskerroin 0,8 EI ole kirkkaus eikä korjaa tätä:
 * se vie värikylläisyyttä, ei valoa.
 *
 * EIKÄ TÄMÄ OLE YÖ. Astronautin kamerassa ei ole terminaattoria:
 * "yö" kaappauksessa on juuri tämä valon vastakaava (41,6°:ssa 0,72)
 * ja sen päällä kalvon reunavarjo. Kun laastari saa saman
 * vastakaavan, se on yhtä hämärä kuin pohja — eikä rajaa ole.
 *
 * KORJAUS: sama käänteisluku laastarin kankaalle. Se on RIVIKOHTAINEN
 * (riippuu vain leveysasteesta), joten se maalataan yhtenä
 * pystyliukuna `multiply`-sekoituksella — ei pikselisilmukkana.
 * Laatan kangas on tässä vaiheessa läpinäkymätön (meriväri on
 * maalattu taustaksi ennen laattaa), joten alfaa ei tarvitse palauttaa
 * erikseen kuten pallotekstuurin liu'ussa.
 *
 * LUKU ON SAMA KAHDESSA PAIKASSA (kuten MERIVARI): linssi ei tuo
 * laattakonetta eikä laattakone linssiä. Testi vartioi, että
 * `astronautinValokerroin` ja linssin `valokerroin` antavat saman
 * luvun.
 */
/*
 * ── TOINEN PUOLI SAMAA VIKAA: PALLON SÄVY (LISÄYS 15 kohta 43,
 *    LISÄYS 16 kohta 46) ─────────────────────────────────────────
 *
 * MITATTU 18.9.2026 (Chromium 390 × 844, Italia, korkeus 0,14): kun
 * valon vastakaava oli korjattu, laastari oli yhä 1,68-kertaisesti
 * kirkkaampi kuin pohja. Luku on 1 / 0,60.
 *
 * Omistaja tilasi pallon *"hieman tummemmaksi kauttaaltaan"*, ja se
 * tehtiin MATERIAALIN VÄRILLÄ eikä tekstuuria muokkaamalla
 * (js/linssit/satelliitti-avaruus.js `PALLON_SAVY` = 0x999999 eli
 * 0,60): diffuse-uniformi kertoo koko pinnan samalla kertoimella.
 * Laastarin laatoilla on OMA materiaalinsa, joka syntyy laattakoneessa
 * eikä käy linssin kautta — se jäi valkoiseksi (1,00).
 *
 * Sävy annetaan siksi laatan materiaalille samana lukuna. Se on sama
 * mekanismi kuin pohjalla, ei pikselityötä: jos omistaja muuttaa sävyä,
 * muuttuu yksi vakio ja molemmat seuraavat.
 */
/** Laastarin materiaalin sävy (sama kuin linssin PALLON_SAVY). */
export const ASTRONAUTIN_SAVY = 0x999999;

/** Pallon suunnatun valon voimakkuus (sama kuin VALON_KOMPENSAATIO). */
export const ASTRONAUTIN_VALON_KOMPENSAATIO = 0.6;

/**
 * Valon kertoimen käänteisluku leveysasteella (1 = ei vaimennusta,
 * 0,625 pohjoisnavalla). Puhdas funktio.
 */
export function astronautinValokerroin(lat) {
  const l = Number(lat);
  if (!Number.isFinite(l)) return 1;
  return 1 / (1 + ASTRONAUTIN_VALON_KOMPENSAATIO * Math.max(0, Math.sin((l * Math.PI) / 180)));
}

/**
 * Pystyliu'un pysäkit laatan kankaalle: `t` on 0 kankaan yläreunassa ja
 * 1 alareunassa, `arvo` on sen rivin valokerroin.
 *
 * Kangas on laudan Millerin projektiossa, joten leveysaste EI ole
 * lineaarinen kankaan y:ssä — rivin leveysaste kysytään siksi
 * kutsujalta (`latRivilla`), joka tuntee arkin ja tason. Pysäkkejä on
 * oletuksena 32 eli tiheämmin kuin yksikään laatta tarvitsee: valon
 * käyrä on loiva, ja liuku on näytönohjaimen työtä.
 *
 * Palauttaa tyhjän taulukon, jos yhdenkin rivin leveysaste puuttuu
 * (arkin ulkopuoli) — silloin liukua ei maalata lainkaan, eikä laatta
 * voi mennä rikki mittauksen takia.
 *
 * @param {number} korkeus      kankaan korkeus pikseleinä
 * @param {function} latRivilla kankaan y (px) → leveysaste
 * @param {number} maara        liu'un välien määrä
 */
export function astronautinValoliuunPysakit(korkeus, latRivilla, maara = 32) {
  const H = Number(korkeus);
  if (!(H > 0) || typeof latRivilla !== 'function') return [];
  const n = Math.max(1, Math.round(maara));
  const ulos = [];
  for (let i = 0; i <= n; i += 1) {
    const t = i / n;
    const lat = latRivilla(t * H);
    if (!Number.isFinite(lat)) return [];
    ulos.push({ t, lat, arvo: astronautinValokerroin(lat) });
  }
  return ulos;
}

/*
 * ASTRONAUTIN LAASTARIN SYVIN TASO.
 *
 * Reliefipyramidi on poltettu z7:ään (240 px/aste). Astronautin
 * kamerassa laastari on pallon pinnalla eikä tasokartalla, ja jokainen
 * laatta on oma tekstuurinsa; jos muisti ylittää karttapallo.md luvun 6
 * rajan puhelimella, katto lasketaan tästä yhdellä luvulla eikä
 * laattakoneeseen kosketa. `null` = ei omaa kattoa (pyramidin oma
 * syvin taso).
 */
export const ASTRONAUTIN_SYVIN_Z = null;

/*
 * MILLOIN LAASTARI KANNATTAA (LISAYS 16 kohta 47).
 *
 * Astronautin kameran pallolla on 4k-tekstuuri (11,4 px/aste
 * puhelimella, 8k eli 22,8 leveällä ruudulla). Kaukaa katsottuna se on
 * ruudun tarvetta tarkempi eikä laatoista olisi hyötyä — päinvastoin,
 * ne peittäisivät avausnäkymän sinisen pallon omilla laatoillaan ja
 * maksaisivat muistia siitä hyvästä. Laastari on siis päällä vain
 * siellä, missä ruutu pyytää enemmän kuin pohja antaa. Sama kynnysajatus
 * kuin topografialinssin tarkennuslaastarissa (`perusTiheys`,
 * js/linssit/topografia-tarkennus.js).
 *
 * KAAVA. globe.gl:n kamera on säteellä R(1 + korkeus) ja fov on
 * pystysuunnan 50 astetta, joten alapisteessä yksi ruutupikseli kattaa
 * 2·korkeus·R·tan(25°)/H metriä pintaa; asteina se on
 * 53,43·korkeus/H. Ruudun tarve pikseleinä astetta kohti on siis
 * H/(53,43·korkeus), ja laastari kannattaa, kun se ylittää pohjan
 * oman tiheyden.
 */
export const NAKOKENTAN_KERROIN = 53.43;

/**
 * Ruudun tarve (laitepikseleitä astetta kohti) kameran korkeudesta.
 *
 * @param {number} piirtokorkeus  piirtopuskurin korkeus pikseleinä
 * @param {number} korkeus        kameran korkeus pallon säteinä
 */
export function ruudunTarvePxAste(piirtokorkeus, korkeus) {
  if (!(piirtokorkeus > 0) || !(korkeus > 0)) return 0;
  return piirtokorkeus / (NAKOKENTAN_KERROIN * korkeus);
}

/**
 * Kannattaako laastari tällä korkeudella?
 *
 * Hystereesi (oletus 1,15) estää sen, että laastari syttyisi ja
 * sammuisi joka kehyksellä juuri kynnyksen kohdalla: päälle vaaditaan
 * enemmän kuin pois.
 */
export function astronautinLaastariKannattaa(
  piirtokorkeus, korkeus, perusTiheysPxAste, paallaNyt = false, hystereesi = 1.15,
) {
  if (!(perusTiheysPxAste > 0)) return false;
  const tarve = ruudunTarvePxAste(piirtokorkeus, korkeus);
  if (!(tarve > 0)) return false;
  return paallaNyt ? tarve >= perusTiheysPxAste : tarve >= perusTiheysPxAste * hystereesi;
}

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
  const syvin = tasot.reduce((a, t) => Math.max(a, t.z), 0);
  /*
   * Astronautin kameralla oma katto, jos sellainen on asetettu (ks.
   * ASTRONAUTIN_SYVIN_Z): laastari on pallon pinnalla ja jokainen
   * laatta oma tekstuurinsa, joten muistikatto on eri kuin
   * tasokartalla.
   */
  if (linssiTila === 'astronautti' && Number.isFinite(ASTRONAUTIN_SYVIN_Z)) {
    return Math.min(syvin, ASTRONAUTIN_SYVIN_Z);
  }
  return syvin;
}

/** Tason z reliefikerros tai null. */
export function reliefinTaso(z) {
  return reliefinTasot()?.find((t) => t.z === z) ?? null;
}

/** Onko laatta poltettu tälle tasolle? (bittikartta = meripeitto.) */
function laattaTasolla(taso, sarake, rivi) {
  if (!taso) return false;
  if (sarake < 0 || sarake >= taso.sarakkeita) return false;
  if (rivi < 0 || rivi >= taso.riveja) return false;
  const i = rivi * taso.sarakkeita + sarake;
  const tavu = taso.__bitit?.[i >> 3];
  return tavu === undefined ? false : ((tavu >> (i & 7)) & 1) === 1;
}

/**
 * PUUTTUVAN LAATAN PAIKANPITÄJÄ ON YLEMMÄN TASON LAATTA
 * (Raamattu LISAYS 16 kohta 49, PAATOKSET 41 kohdat 1 ja 3).
 *
 * Laatasto on harva kahdesta syystä: avomerestä ei polteta laattaa
 * lainkaan (`meriLaatat`, 6 228 laattaa z7:llä) ja poltto on ajettu
 * rajatulle alueelle (18.9.2026: lat −60…76,7 z7:llä), joten sen
 * ulkopuolella laatta puuttuu myös luettelosta. Tähän asti molempien
 * tilalle maalattiin YKSI TASAINEN VÄRI (MERIVARI, −4 000 metrin
 * sävy). Omistajan puhelinkuvassa se näkyi Mustallamerellä ja
 * Välimerellä tummansinisenä suorakaiteena: pyramidin meri on
 * BATYMETRINEN, ja 1 000 metrin syvyinen Välimeri on reilusti
 * vaaleampi kuin valtameren pohja.
 *
 * KARKEA LAATTA ON OIKEA VASTAUS MOLEMPIIN. Se on samasta
 * aineistosta, samalla asteikolla ja samalla varjostuksella kuin
 * naapuri, joten sauman kahta puolta on sama väri — ja merellä, joka
 * on sileä kenttä, kahdeksankertainen venytys ei näy. Se on myös
 * kohdan 49 vaatima paikanpitäjä maalaatan aukolle: seepiapohjaa ei
 * ladota linssin alle.
 *
 * Palauttaa lähteen `{ z, sarake, rivi, sx, sy, sw, sh }`, jossa
 * sx…sh ovat karkean laatan OMIA pikseleitä — se osa, joka vastaa
 * pyydettyä laattaa. Null, jos yhtään olemassa olevaa esi-isää ei ole
 * (silloin kutsuja maalaa tasaisen värin).
 *
 * @param {number} z Pyydetyn laatan taso.
 * @param {number} sarake Pyydetyn laatan sarake.
 * @param {number} rivi Pyydetyn laatan rivi.
 * @param {number} laatta Laatan sivu pikseleinä (512).
 */
export function reliefinVaraLahde(z, sarake, rivi, laatta = 512) {
  for (let k = 1; k <= z; k += 1) {
    const taso = reliefinTaso(z - k);
    if (!taso) continue;
    const s = sarake >> k;
    const r = rivi >> k;
    if (!laattaTasolla(taso, s, r)) continue;
    const osa = laatta >> k;
    // Lapsen koko voi olla laattaa pienempi arkin oikealla ja alalla
    // reunalla; karkealla tasolla sama osuus on `osa`:n murto-osa.
    const leveysPx = Math.min(laatta, taso.leveys * 2 ** k - sarake * laatta);
    const korkeusPx = Math.min(laatta, taso.korkeus * 2 ** k - rivi * laatta);
    return {
      z: taso.z,
      sarake: s,
      rivi: r,
      sx: (sarake % 2 ** k) * osa,
      sy: (rivi % 2 ** k) * osa,
      sw: Math.max(1, Math.round(leveysPx / 2 ** k)),
      sh: Math.max(1, Math.round(korkeusPx / 2 ** k)),
    };
  }
  return null;
}

/**
 * Puuttuvan laatan tasainen väri, kun karkeaa laattaa ei ole.
 * Pohjoisessa ja keskileveyksillä avomeren sävy, Etelämantereella
 * jään sävy (PAATOKSET 41 kohta 2).
 *
 * @param {number} lat Laatan pohjoisreunan leveysaste (tai NaN).
 */
export function reliefinTaustavari(lat) {
  return Number.isFinite(lat) && lat <= JAARAJA_LAT ? JAAVARI : MERIVARI;
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
export function asetaReliefiLinssi(paalla, tila = 'topografia') {
  const uusi = Boolean(paalla);
  const uusiTila = uusi ? tila : null;
  if (uusi === linssiAuki && uusiTila === linssiTila) return;
  linssiAuki = uusi;
  linssiTila = uusiTila;
  for (const kuuntelija of kuuntelijat) {
    try { kuuntelija(linssiAuki); } catch { /* yksi kuuntelija ei kaada linssiä */ }
  }
}

/** Kumpi linssi laatastoa piirtää: 'topografia', 'astronautti' tai null. */
export function reliefinLinssitila() {
  return linssiAuki ? linssiTila : null;
}

/** Piirtääkö Astronautin kamera laatastoa juuri nyt? */
export function reliefiAstronautilla(ikkuna = globalThis) {
  return reliefiKaytossa(ikkuna) && linssiTila === 'astronautti';
}

/*
 * KUKA MUU TARVITSEE TIEDON LINSSISTÄ: NAPAKANNET.
 *
 * Pallon navat eivät ole laatoilla. Arkki loppuu ~88,7°:seen ja sen
 * yli on kaksi yksiväristä kantta (js/pallo.js NAPAKANSI_POHJOINEN
 * `#c9c2af`, NAPAKANSI_ETELA `#dcd6c6`) sekä niiden päällä seepiakartan
 * napakalotti — pelin oman kartan sävyjä. Reliefilinssin alla ne
 * näkyivät omistajan puhelinkuvassa ISONA BEIGENÄ LEVYNÄ, jonka
 * ympärillä kiersi tummansininen rengas (avomerivärillä maalatut
 * laatat 76,7°…83,7°). Kansi ei tiedä linssistä mitään, eikä linssi
 * saa tuntea palloa — siksi tieto kulkee tämän moduulin kautta, joka
 * on molempien yhteinen.
 */
const kuuntelijat = new Set();

/**
 * Ilmoita, kun topografialinssi avataan tai suljetaan.
 * Palauttaa purkajan.
 */
export function kuunteleReliefiLinssi(kuuntelija) {
  if (typeof kuuntelija !== 'function') return () => {};
  kuuntelijat.add(kuuntelija);
  return () => kuuntelijat.delete(kuuntelija);
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
  linssiTila = null;
}

/*
 * ══════════════════════════════════════════════════════════════════════
 * LINSSIKETJUN LOKI — MISSÄ AVAUKSEN SEKUNTI KULUU
 * ══════════════════════════════════════════════════════════════════════
 *
 * Omistajan vika 18.9.2026: topografialinssin avauksesta kuluu lähes
 * sekunti ennen kuin reliefi on ruudulla. Avaus kulkee KOLMEN
 * MODUULIN läpi — js/ui.js `sytytaLinssi`, js/linssit/topografia.js
 * `pallolle` ja js/pallolaatat.js laattakerros — eikä yksikään niistä
 * näe muiden osuutta. Yhteinen loki on siksi ainoa tapa sanoa, MIKÄ
 * vaihe maksaa: ilman sitä optimointi olisi arvausta.
 *
 * Loki asuu TÄSSÄ moduulissa, koska se on ainoa, jonka kaikki kolme jo
 * tuovat (ui.js tuo sen tätä varten). Muistia se ei kuluta: yksi
 * taulukko avausta kohti, ja seuraava avaus nollaa sen.
 *
 * MITTARI EI OLE VAIN SAVUKKEELLE. Sama loki on kentällä `window.
 * matkakirja.ui.linssiketju()` eli se on luettavissa myös oikean
 * puhelimen etätarkastuksessa ilman erillistä ajoa.
 */
let ketjuAlku = 0;
let ketjuLoki = [];

const ketjunKello = () => (typeof performance === 'undefined' ? Date.now() : performance.now());

/** Aloittaa uuden ketjun (linssin valinta). Nollaa edellisen. */
export function aloitaLinssiketju() {
  ketjuAlku = ketjunKello();
  ketjuLoki = [];
}

/**
 * Merkitsee vaiheen. `kerran` (oletus tosi) jättää toistot pois: laattoja
 * on kymmeniä, mutta kiinnostava on ENSIMMÄINEN — se on se, joka vie
 * tumman peitteen pois ja jonka pelaaja näkee.
 */
export function merkitseLinssiketju(vaihe, kerran = true) {
  if (!ketjuAlku) return;
  if (kerran && ketjuLoki.some((r) => r.vaihe === vaihe)) return;
  ketjuLoki.push({ vaihe, ms: Math.round(ketjunKello() - ketjuAlku) });
}

/** Ketjun loki taulukkona (kopio). Tyhjä, jos avausta ei ole ollut. */
export function linssiketjunLoki() {
  return ketjuLoki.slice();
}
