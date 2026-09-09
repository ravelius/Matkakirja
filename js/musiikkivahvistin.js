/*
 * ══════════════════════════════════════════════════════════════════
 * MUSIIKIN VAHVISTIN — YKSI TIE, JOTA PITKIN TASO MENEE PERILLE
 * ══════════════════════════════════════════════════════════════════
 *
 * Omistajan vika 9.9.2026 klo 16.30, sanatarkasti: *"Taustamusiikki on
 * ainakin iPhonilla vielä aivan liian kovalla. Saisiko säätimen niin,
 * että se oikeasti toimisi ja sen pystyisi säätämään todella isolla
 * välillä, niin, että musiikin saisi oikeasti säädettyä oikealle
 * tasolle?"* — sama vika toista kertaa (8.9.2026: *"eikä rattaan säädin
 * vaikuta sen tasoon ollenkaan"*), eli edellinen korjaus ei riittänyt.
 *
 * ------------------------------------------------------------------
 * JUURISYY
 * ------------------------------------------------------------------
 *
 * iOS:n WebKit ei anna JavaScriptin asettaa `<audio>`-elementin
 * `volumea`. Kirjoitus menee läpi ilman virhettä ja lukema palaa
 * ykköseksi. Silloin KOKO musiikin tasonsäätö katoaa — perustaso,
 * väistö, avauksen sekoitus ja säädin — ja raita soi tiedoston omalla
 * tasollaan (Lyria-masterit RMS −14,5 dBFS) eli kertojan yläpuolella.
 * Juuri niin kuin omistaja kuvasi: "aivan liian kovalla", eikä säädin
 * vaikuta "ollenkaan".
 *
 * 8.9. korjaus reititti POHJARAIDAN vahvistinsolmun läpi, mutta jätti
 * kolme aukkoa, joiden takia puhelimessa kuului yhä täysi taso:
 *
 *   1. REITITYSTÄ EI YRITETTY UUDESTAAN. Reititys tehtiin vain jos
 *      äänikonteksti oli JO käynnissä sillä sekunnilla, kun soitin
 *      syntyi. iOS:ssä konteksti on eleen jälkeenkin hetken
 *      `suspended` (resume on asynkroninen), joten pelin ensimmäinen
 *      raita päätyi lähes aina volume-polulle — ja se raita jää
 *      soimaan koko istunnoksi.
 *   2. MUUT MUSIIKKIREITIT EIVÄT OLLEET REITITETTYJÄ LAINKAAN:
 *      siirtymä- ja linssiraidat (js/siirtymamusiikki.js),
 *      visamusiikki ja aarreaihe. Ne soivat puhelimessa täydellä.
 *   3. VARAREITTI OLI PUHELIMESSA PAHEMPI KUIN VIKA. Hiljaisuusvahti
 *      pudotti mykän ketjun takaisin volume-polulle — iOS:ssä se
 *      tarkoittaa täyttä tasoa, ei entistä tasoa.
 *
 * ------------------------------------------------------------------
 * MITÄ TÄMÄ MODUULI TEKEE
 * ------------------------------------------------------------------
 *
 * Yksi paikka, josta jokainen musiikkisoitin (pohjaraita ja
 * kaupunkiraidat, visamusiikki, siirtymä- ja linssiraidat, aarreaihe)
 * pyytää saman kohtelun:
 *
 *   elementti → MediaElementAudioSourceNode → GainNode → Analyser → ulos
 *
 * Taso asetetaan GAINILLA, ja elementin oma `volume` jää ykköseen —
 * silloin sillä ei ole väliä, tottelisiko se. Reitittämättömällä
 * varapolulla taso menee `volumeen` kuten ennenkin.
 *
 * KAKSI VASTAUSTA, JOTKA PITÄÄ KYSYÄ ERIKSEEN:
 *   `volumeToimii()`  — tottelisiko tämä selain volumea lainkaan?
 *   `liitaMusiikkiin()` — saatiinko tälle elementille vahvistin?
 *
 * Vasta molemmat yhdessä kertovat, saako raidan päästää soimaan:
 * ilman vahvistinta JA ilman toimivaa volumea soitto tarkoittaisi
 * täyttä tasoa (`musiikkiSaaSoida`). Silloin raita odottaa — hiljaisuus
 * on parempi kuin hallitsematon täysi taso — ja lähtee soimaan heti kun
 * äänikonteksti herää (`kuunteleReitityksenAvautumista`).
 *
 * KONTEKSTI ON PELIN OMA, EI UUSI. `js/sound.js` `sfx.ensureContext()`
 * rakentaa yhden AudioContextin ensimmäisestä eleestä ja jatkaa sitä
 * paluussa; toinen konteksti kilpailisi siitä samasta iOS:n
 * äänisessiosta, jonka takia sanelu ja radio jo tekevät temppujaan.
 *
 * CORS. Web Audio lukee elementin ääntä, joten ämpäristä
 * (media.matkakirja.app) tuleva raita tarvitsee `crossOrigin`-luvan;
 * ilman sitä ketju olisi hiljainen ilman virhettä. Palvelutyöntekijän
 * äänipeili (sw.js `aaniPeilista`) noutaa CORS-tilassa ja palauttaa
 * CORS-vastauksen, joten lupa saadaan myös välimuistista. Repon oma
 * varapolku on samaa alkuperää eikä tarvitse lupaa lainkaan.
 */
import { sfx } from './sound.js';

/* ── äänikonteksti: yksi, ja se herätetään eleestä ───────────────── */

/**
 * Pelin äänikonteksti, herätettynä jos se oli nukuksissa.
 * Palauttaa nullin, jos kontekstia ei voi rakentaa (äänet pois,
 * riisuttu ympäristö, sanelu käynnissä).
 */
export function musiikkiKonteksti() {
  try {
    const ctx = sfx.ensureContext?.();
    if (!ctx) return null;
    if (ctx.state === 'suspended') ctx.resume?.()?.catch?.(() => {});
    return ctx;
  } catch {
    return null;
  }
}

/** Onko konteksti juuri nyt siinä tilassa, että reititys kannattaa? */
const kaynnissa = (ctx) => Boolean(ctx) && ctx.state === 'running'
  && typeof ctx.createMediaElementSource === 'function';

/*
 * ODOTTAJAT. Soitin, joka ei voinut vielä reitittyä, jättää tähän
 * kahvan: "herätä minut, kun konteksti on käynnissä". Herätys tulee
 * käyttäjän eleestä (iOS vaatii eleen), sivun palaamisesta taustalta
 * ja kontekstin omasta tilanvaihdoksesta.
 */
const odottajat = new Set();
let vahtiPystyssa = false;

function herataOdottajat() {
  if (!kaynnissa(sfx.ctx)) return;
  for (const fn of [...odottajat]) {
    try { fn(); } catch { /* yksi odottaja ei kaada muita */ }
  }
}

/** Ele tai paluu: konteksti käyntiin ja odottajille tieto. */
function tyonna() {
  // Käynnissä olevaa kontekstia ei tarvitse pyytää uudestaan: tämä
  // ajetaan jokaisesta napautuksesta, eikä ensureContextin sivuvaikutuksia
  // (äänisession luokka) kannata ajaa turhaan.
  if (kaynnissa(sfx.ctx)) { herataOdottajat(); return; }
  const ctx = musiikkiKonteksti();
  if (!ctx) return;
  if (kaynnissa(ctx)) { herataOdottajat(); return; }
  // resume() on asynkroninen — JUURI SIKSI 8.9. korjaus ei riittänyt
  // puhelimessa. Odotetaan lupaus loppuun ja herätetään vasta sitten.
  ctx.resume?.()?.then?.(herataOdottajat)?.catch?.(() => {});
  if (typeof ctx.addEventListener === 'function') {
    ctx.addEventListener('statechange', herataOdottajat, { once: true });
  }
}

/** Vahdit pystyyn kerran; kutsuminen useasti on turvallista. */
function pystytaVahti() {
  // Riisuttu ympäristö (testien tynkä-document, työntekijä) ei tunne
  // tapahtumia — silloin vahtia ei ole, eikä se saa kaataa moduulia.
  if (vahtiPystyssa || typeof document === 'undefined' || !document
    || typeof document.addEventListener !== 'function') return;
  vahtiPystyssa = true;
  // Ele on iOS:n ehto äänikontekstin heräämiselle. Kuunnellaan
  // kaappausvaiheessa ja passiivisena, jottei tämä vaikuta peliin.
  for (const nimi of ['pointerdown', 'touchend', 'keydown']) {
    document.addEventListener(nimi, tyonna, { capture: true, passive: true });
  }
  // Sivu palaa taustalta: iOS pysäyttää kontekstin, ja ilman resumea
  // reititetty raita jää vaiti. Sama koukku kuin js/aani-tausta.js:llä.
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) tyonna();
  });
}

/**
 * Ilmoittaudu odottajaksi: `fn` kutsutaan, kun äänikonteksti on
 * käynnissä ja reititystä kannattaa yrittää uudelleen. Palauttaa
 * irrotusfunktion.
 *
 * Kutsutaan HETI kerran, jos konteksti on jo käynnissä — soitin ei saa
 * jäädä odottamaan elettä, joka on jo tapahtunut.
 */
export function kuunteleReitityksenAvautumista(fn) {
  pystytaVahti();
  odottajat.add(fn);
  if (kaynnissa(sfx.ctx)) {
    try { fn(); } catch { /* ei kaada ilmoittautumista */ }
  }
  /*
   * Nukkuvaa kontekstia EI herätetä täältä. Ilmoittautuminen tapahtuu
   * moduulitasolla (js/ambience-stream.js), eikä äänikontekstia saa
   * rakentaa sivun latauksessa pelkän ilmoittautumisen takia — herätys
   * kuuluu eleeseen, ja siitä huolehtii yllä pystytetty vahti.
   */
  return () => odottajat.delete(fn);
}

/* ── tottelee tämä selain volumea vai ei ─────────────────────────── */

/*
 * IOS:N TUNNISTUS MITTAAMALLA, EI KÄYTTÄJÄAGENTISTA. Selaimen nimi on
 * huono todiste (iPadOS esittelee itsensä Macintoshina, kuori ja
 * työpöytätila sekoittavat lisää), ja kysymys on joka tapauksessa
 * yksinkertainen: menikö kirjoitus perille. Yksi tyhjä elementti
 * riittää eikä sitä tarvitse soittaa.
 *
 * Vastaus talletetaan: se ei voi muuttua kesken istunnon, ja mittaus
 * osuu jokaisen raidan käynnistykseen.
 */
let volumeMuisti = null;

/** Tottelee ko `<audio>.volume` tässä selaimessa? (iOS: ei) */
export function volumeToimii() {
  if (volumeMuisti !== null) return volumeMuisti;
  try {
    /*
     * Koekappale tehdään `document.createElement`illa eikä `new
     * Audio()`:lla. Syy on kirjanpidollinen: peli ja testit seuraavat
     * `Audio`-konstruktorin kutsuja (soittimien rekisteri), ja mittaus
     * ei saa näkyä siellä yhtenä soittimena lisää. Ilman DOMia
     * (työntekijä, riisuttu testiympäristö) ei mitata mitään ja
     * vastaus on "toimii" — silloin käytös on täsmälleen entinen.
     */
    if (typeof document === 'undefined' || !document
      || typeof document.createElement !== 'function') return (volumeMuisti = true);
    const koe = document.createElement('audio');
    koe.volume = 0.4321;
    volumeMuisti = Math.abs(Number(koe.volume) - 0.4321) < 0.01;
  } catch {
    volumeMuisti = true;
  }
  return volumeMuisti;
}

/** Vain testejä varten: unohtaa mittaustuloksen ja odottajat. */
export function nollaaMusiikkivahvistin() {
  volumeMuisti = null;
  odottajat.clear();
}

/* ── reititys ────────────────────────────────────────────────────── */

/**
 * Reitittää musiikkisoittimen vahvistinsolmun läpi ja palauttaa
 * vahvistimen. Palauttaa nullin, jos reititys ei onnistu — silloin
 * soitin jää tavalliseksi `<audio>`-elementiksi.
 *
 * EI KOMPRESSORIA. Äänimaiseman ketjussa on kompressori, koska
 * kenttä-äänitteen sisäinen vaihtelu on suurta. Musiikkipaletti on jo
 * masteroitu (huiput nollassa), joten kompressori vain pumppaisi sen.
 *
 * MITTARI ON KETJUSSA EIKÄ HAARASSA: läpimenevä solmu tulee varmasti
 * ajetuksi, koska ulostulo vetää sitä, ja mykkä mittari valehtelisi
 * juuri sen, mitä sen pitäisi paljastaa. AnalyserNode ei muuta
 * signaalia, joten paikka ketjussa on ilmainen.
 *
 * Solmut talletetaan elementtiin (`aaniSolmut`), jotta soittimen
 * vapautus voi purkaa ne — `createMediaElementSource` on pysyvä
 * reititys, ja purkamatta jäänyt ketju pitää elementin muistissa.
 *
 * @param {HTMLAudioElement} audio
 * @returns {?GainNode}
 */
export function liitaMusiikkiin(audio) {
  if (!audio || audio.aaniVahvistin) return audio?.aaniVahvistin ?? null;
  try {
    const ctx = musiikkiKonteksti();
    if (!kaynnissa(ctx)) return null;
    const lahde = ctx.createMediaElementSource(audio);
    const vahvistin = ctx.createGain();
    vahvistin.gain.value = 0;
    const mittari = ctx.createAnalyser();
    mittari.fftSize = 256;
    lahde.connect(vahvistin).connect(mittari).connect(ctx.destination);
    audio.aaniSolmut = [lahde, vahvistin, mittari];
    audio.aaniMittari = mittari;
    audio.aaniVahvistin = vahvistin;
    /*
     * REITITETYN ELEMENTIN OMA VOLUME ON OSA KETJUA: nolla syöttäisi
     * graafiin hiljaisuutta. Reititettynä taso säädetään vahvistimella
     * ja elementti soittaa täydellä — ja juuri siksi iOS:n
     * tottelematon volume ei enää haittaa.
     */
    try { audio.volume = 1; } catch { /* volume on iOS:ssä vain luettava */ }
    return vahvistin;
  } catch {
    // createMediaElementSource heittää, jos elementti on jo reititetty.
    return null;
  }
}

/**
 * Saako tämä soitin päästää ääntä juuri nyt? Ilman vahvistinta ja
 * ilman toimivaa volumea soitto tarkoittaisi tiedoston omaa täyttä
 * tasoa — se on juuri se vika, jonka omistaja raportoi kahdesti, joten
 * silloin vastaus on EI ja raita odottaa reitityksen avautumista.
 */
export function musiikkiSaaSoida(audio) {
  return Boolean(audio?.aaniVahvistin) || volumeToimii();
}

/** Soittimen nykyinen taso riippumatta siitä, kumpi reitti on käytössä. */
export function lueMusiikinTaso(audio) {
  if (!audio) return 0;
  if (audio.aaniVahvistin) return audio.aaniVahvistin.gain.value;
  return Number(audio.volume) || 0;
}

/**
 * Asettaa tason oikeaan paikkaan. Vahvistin sallii yli ykkösen
 * (säätimen yläpää), elementin volume ei.
 */
export function asetaMusiikinTaso(audio, arvo) {
  if (!audio) return;
  const taso = Number.isFinite(Number(arvo)) ? Math.max(0, Number(arvo)) : 0;
  if (audio.aaniVahvistin) {
    audio.aaniVahvistin.gain.value = taso;
    return;
  }
  audio.volume = Math.min(1, taso);
}

/**
 * Pehmeä siirtymä tasosta toiseen.
 *
 * Reititetyllä polulla liuku ajastetaan ÄÄNISÄIKEELLE gain-ramppina:
 * rAF-askellus jäätyy, kun pääsäie on varattu, ja aikaan sidottu askel
 * hyppäisi jäätymisen jälkeen suoraan loppuarvoon. Reitittämättömällä
 * polulla käytetään rAF-askelta kuten ennenkin.
 *
 * @param {HTMLAudioElement} audio
 * @param {number} kohde tavoitetaso
 * @param {number} kesto ms
 * @param {Function} [done] kutsutaan liu'un päätteeksi
 */
export function liutaMusiikkia(audio, kohde, kesto, done) {
  if (!audio) return;
  const oma = (audio.liukuId = (audio.liukuId ?? 0) + 1);
  const aika = Math.max(1, Number(kesto) || 1);
  const maali = Math.max(0, Number(kohde) || 0);
  const ctx = sfx.ctx;
  if (audio.aaniVahvistin && ctx && typeof ctx.currentTime === 'number') {
    try {
      const gain = audio.aaniVahvistin.gain;
      gain.cancelScheduledValues(ctx.currentTime);
      gain.setValueAtTime(Math.max(0, lueMusiikinTaso(audio)), ctx.currentTime);
      gain.linearRampToValueAtTime(maali, ctx.currentTime + aika / 1000);
      setTimeout(() => { if (audio.liukuId === oma) done?.(); }, aika + 60);
      return;
    } catch {
      /* konteksti kiinni tms. — pudotaan rAF-reitille */
    }
  }
  const alku = lueMusiikinTaso(audio);
  let t0 = null;
  const askel = (nyt) => {
    if (audio.liukuId !== oma) return;
    if (t0 === null) t0 = nyt;
    const t = Math.min(1, Math.max(0, (nyt - t0) / aika));
    asetaMusiikinTaso(audio, alku + (maali - alku) * t);
    if (t < 1) requestAnimationFrame(askel);
    else done?.();
  };
  requestAnimationFrame(askel);
}

/**
 * Purkaa soittimen Web Audio -solmut. Vain kuolleelle soittimelle:
 * reititys on yksisuuntainen, eikä purettu elementti enää soi vaikka
 * sille antaisi uuden srcin.
 */
export function irrotaMusiikinVahvistin(audio) {
  if (!audio) return;
  for (const solmu of audio.aaniSolmut ?? []) {
    try { solmu.disconnect(); } catch { /* jo purettu */ }
  }
  audio.aaniSolmut = null;
  audio.aaniVahvistin = null;
  audio.aaniMittari = null;
}
