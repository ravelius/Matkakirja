/*
 * PULUN REAALIAIKAINEN ÄÄNIKESKUSTELU — KOE (omistajan tilaus 28.9.2026:
 * *"pelaaja voisi jutella ääneen pululle ja se vastaisi reaaliajassa heti
 * takaisin … Pidetään siis nykyinen malli edelleen päällä pelissä ja
 * tehdään tästä oma koenappi."*).
 *
 * Vain kehittäjätilassa (js/pollo.js puluRealtimeKoeNakyvissa); Sonnet-
 * chat on edelleen pelin Pulu. Moduuli ladataan dynaamisesti vasta
 * napautuksesta, joten se ei maksa mitään muille pelaajille.
 *
 * KULKU
 *   1. Mikrofonilupa (getUserMedia, kaiunpoisto päällä) — napautuksen
 *      eleestä, ennen mitään verkkoa.
 *   2. Lyhytikäinen token Pöllö-workerilta (tehtava 'realtime', vain
 *      kehittäjäkoodilla; API-avain ei koskaan tule selaimeen). Vastaus
 *      tuo myös valmiin session.update-istunnon: SAMA Pulun kehote kuin
 *      chatissa + pelin konteksti (tools/pollo/worker.js realtimeIstunto).
 *   3. WebSocket xAI:hin aliprotokollalla `xai-client-secret.<token>`
 *      (docs.x.ai: selaimen WebSocket ei voi lähettää otsakkeita).
 *   4. Mikrofoni → AudioWorklet → PCM16 LE base64 → input_audio_buffer.
 *      append. Syötetaajuus on mikrofonikontekstin oma, jos xAI tukee sitä
 *      (8/16/22,05/24/32/44,1/48 kHz), muuten näytteistetään 24 kHz:iin.
 *   5. Server VAD päättää vuoron; vastausääni (24 kHz PCM16) soi pelin
 *      puhepiirin vahvistimen läpi (js/puhe.js puhePiirinKohde), joten
 *      pelin äänenvoimakkuus pätee. Pelaajan puhe keskeyttää Pulun
 *      (speech_started → soivat palat pois).
 *   6. Tekstitys: pelaajan kuultu kysymys ja Pulun transkripti chattiin.
 *   7. Lopetus samasta napista, chatin sulkeutuessa tai istunnon
 *      enimmäispituuden (workerin varaama, oletus 3 min) täyttyessä.
 */
import { puhePiirinKohde, striimiaani, STRIIMIAANI_OLETUS } from './puhe.js';

/** xAI:n tukemat PCM-taajuudet (docs.x.ai Speech to Speech, 28.9.2026). */
export const REALTIME_TAAJUUDET = Object.freeze([8000, 16000, 22050, 24000, 32000, 44100, 48000]);
/** Vastausäänen taajuus = js/puhe.js PUHEPIIRIN_TAAJUUS. */
export const REALTIME_ULOS_TAAJUUS = 24000;
/** Mikrofonipalan pituus ennen lähetystä (ms). */
const LAHETYSPALA_MS = 40;

/** Syötteen taajuus xAI:lle: kontekstin oma, jos tuettu, muuten 24 kHz. */
export function syoteTaajuus(kontekstinTaajuus) {
  return REALTIME_TAAJUUDET.includes(kontekstinTaajuus) ? kontekstinTaajuus : 24000;
}

/** Selaimen aliprotokolla tokenille. */
export function realtimeProtokollat(token) {
  return [`xai-client-secret.${token}`];
}

/**
 * Float32 (−1…1) → Int16 PCM, tarvittaessa lineaarisesti näytteistäen
 * taajuudesta `lahde` taajuuteen `kohde`.
 */
export function pcm16(naytteet, lahde = 24000, kohde = lahde) {
  const suhde = lahde / kohde;
  const pituus = suhde === 1 ? naytteet.length : Math.floor(naytteet.length / suhde);
  const ulos = new Int16Array(pituus);
  for (let i = 0; i < pituus; i += 1) {
    let x;
    if (suhde === 1) x = naytteet[i];
    else {
      const p = i * suhde;
      const a = Math.floor(p);
      const b = Math.min(a + 1, naytteet.length - 1);
      x = naytteet[a] + (naytteet[b] - naytteet[a]) * (p - a);
    }
    const r = Math.max(-1, Math.min(1, x));
    ulos[i] = r < 0 ? r * 0x8000 : r * 0x7fff;
  }
  return ulos;
}

/** Int16Array → base64 (pieninä paloina, ettei argumenttilista räjähdä). */
export function base64Pcm(int16) {
  const tavut = new Uint8Array(int16.buffer, int16.byteOffset, int16.byteLength);
  let s = '';
  for (let i = 0; i < tavut.length; i += 0x8000) {
    s += String.fromCharCode.apply(null, tavut.subarray(i, i + 0x8000));
  }
  return btoa(s);
}

/** base64 PCM16 LE → Float32Array (soittoa varten). */
export function pcmFloat(b64) {
  const s = atob(b64);
  const n = s.length >> 1;
  const ulos = new Float32Array(n);
  for (let i = 0; i < n; i += 1) {
    let v = s.charCodeAt(i * 2) | (s.charCodeAt(i * 2 + 1) << 8);
    if (v >= 0x8000) v -= 0x10000;
    ulos[i] = v / 0x8000;
  }
  return ulos;
}

/* AudioWorklet: kopioi mikrofonin kanavan 0 pääsäikeelle 128 näytteen paloina. */
const MIKKI_WORKLET = `class PuluMikki extends AudioWorkletProcessor {
  process(inputs) {
    const kanava = inputs[0] && inputs[0][0];
    if (kanava && kanava.length) this.port.postMessage(kanava.slice(0));
    return true;
  }
}
registerProcessor('pulu-mikki', PuluMikki);`;

/**
 * Yksi äänikeskustelu. Kutsujan (js/pollo.js) koukut:
 *   onTila(tila)            'yhdistaa' | 'kuuntelee' | 'puhuu' | 'loppu'
 *   onKayttajaAlku()        pelaajan vuoro päättyi (kupla paikalleen heti)
 *   onKayttaja(teksti)      pelaajan kuultu kysymys
 *   onPulu(pala)            Pulun transkriptin lisäpala
 *   onPuluValmis()          Pulun vuoro valmis
 *   onVirhe(viesti)         pelaajalle näytettävä virhe
 */
export class PuluRealtime {
  constructor({
    palvelin, otsakkeet = () => ({ 'content-type': 'application/json' }), konteksti = '',
    onTila = () => {}, onKayttajaAlku = () => {}, onKayttaja = () => {},
    onPulu = () => {}, onPuluValmis = () => {}, onVirhe = () => {},
    WebSocketLuokka = globalThis.WebSocket,
  } = {}) {
    Object.assign(this, {
      palvelin, otsakkeet, konteksti, onTila, onKayttajaAlku, onKayttaja, onPulu, onPuluValmis, onVirhe,
    });
    this.WebSocketLuokka = WebSocketLuokka;
    this.kaynnissa = false;
    this.ws = null;
    this.lahteet = new Set();
    this.seuraava = 0;
    this.puskuri = [];
    this.puskuriPituus = 0;
    this.ajastin = null;
  }

  async aloita() {
    if (this.kaynnissa) return;
    this.kaynnissa = true;
    this.onTila('yhdistaa');
    try {
      const md = globalThis.navigator?.mediaDevices;
      if (!md?.getUserMedia || typeof globalThis.AudioWorkletNode !== 'function' || !this.WebSocketLuokka) {
        throw Object.assign(new Error('tuki'), { viesti: 'Tämä selain ei tue äänikeskustelua.' });
      }
      // 1. Mikrofoni ensin: lupa kysytään napautuksen eleestä.
      this.virta = await md.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, channelCount: 1 },
      });
      if (!this.kaynnissa) return this.siivoa();
      // Ulostulo pelin puhepiiriin (sama vahvistin kuin lukijalla).
      this.ulos = await puhePiirinKohde();
      if (!this.ulos) throw Object.assign(new Error('piiri'), { viesti: 'Pelin äänipiiri ei käynnistynyt.' });
      // Mikrofonille oma konteksti laitteen omalla taajuudella: eri-
      // taajuinen MediaStreamSource kaatuu osassa selaimia.
      const AC = globalThis.AudioContext || globalThis.webkitAudioContext;
      this.mikkiKonteksti = new AC();
      await this.mikkiKonteksti.resume?.();
      const url = URL.createObjectURL(new Blob([MIKKI_WORKLET], { type: 'application/javascript' }));
      try {
        await this.mikkiKonteksti.audioWorklet.addModule(url);
      } finally {
        URL.revokeObjectURL(url);
      }
      this.lahdeTaajuus = this.mikkiKonteksti.sampleRate;
      this.taajuus = syoteTaajuus(this.lahdeTaajuus);

      // 2. Token ja valmis istunto workerilta.
      const vastaus = await fetch(this.palvelin, {
        method: 'POST',
        headers: this.otsakkeet(),
        body: JSON.stringify({
          tehtava: 'realtime',
          konteksti: this.konteksti,
          aani: striimiaani() ?? STRIIMIAANI_OLETUS,
          taajuus: this.taajuus,
        }),
      });
      const data = await vastaus.json().catch(() => ({}));
      if (!vastaus.ok || !data?.token) {
        throw Object.assign(new Error(data?.virhe ?? 'token'), {
          viesti: data?.viesti ?? 'Pulu ei saanut äänilinjaa auki.',
        });
      }
      if (!this.kaynnissa) return this.siivoa();

      // 3. WebSocket xAI:hin tokenilla.
      const ws = new this.WebSocketLuokka(data.osoite, realtimeProtokollat(data.token));
      this.ws = ws;
      ws.addEventListener('message', (e) => {
        try {
          this.kasittele(JSON.parse(e.data));
        } catch { /* rikkinäinen viesti ei kaada keskustelua */ }
      });
      let avattu = false;
      ws.addEventListener('open', () => { avattu = true; }, { once: true });
      ws.addEventListener('close', () => {
        if (this.kaynnissa && !avattu) this.onVirhe('Äänilinja ei auennut (token tai verkko).');
        this.lopeta();
      });
      ws.addEventListener('error', () => {
        this.onVirhe('Äänilinja katkesi.');
        this.lopeta();
      });
      await new Promise((ok, ei) => {
        ws.addEventListener('open', ok, { once: true });
        ws.addEventListener('close', () => ei(Object.assign(new Error('ws'), { viesti: 'Äänilinja ei auennut.' })), { once: true });
      });
      ws.send(JSON.stringify({ type: 'session.update', session: data.istunto }));

      // 4. Mikrofoni virtaan vasta kun linja on auki.
      const lahde = this.mikkiKonteksti.createMediaStreamSource(this.virta);
      this.worklet = new globalThis.AudioWorkletNode(this.mikkiKonteksti, 'pulu-mikki');
      this.worklet.port.onmessage = (e) => this.mikkiPala(e.data);
      lahde.connect(this.worklet);
      this.mikkiLahde = lahde;
      this.ajastin = setTimeout(() => {
        this.onVirhe('Kokeilun enimmäispituus täyttyi. Aloita uusi keskustelu napista.');
        this.lopeta();
      }, Math.max(30, Number(data.enintaanS) || 180) * 1000);
      this.onTila('kuuntelee');
    } catch (virhe) {
      const viesti = virhe?.name === 'NotAllowedError'
        ? 'Mikrofonin käyttö estettiin. Salli mikrofoni selaimen asetuksista.'
        : (virhe?.viesti ?? 'Äänikeskustelu ei käynnistynyt.');
      if (this.kaynnissa) this.onVirhe(viesti);
      this.lopeta();
    }
  }

  /** Mikrofonipala workletista: kerätään ~40 ms ja lähetetään. */
  mikkiPala(naytteet) {
    if (!this.ws || this.ws.readyState !== 1) return;
    this.puskuri.push(naytteet);
    this.puskuriPituus += naytteet.length;
    if (this.puskuriPituus < this.lahdeTaajuus * LAHETYSPALA_MS / 1000) return;
    const yhdessa = new Float32Array(this.puskuriPituus);
    let o = 0;
    for (const p of this.puskuri) { yhdessa.set(p, o); o += p.length; }
    this.puskuri = [];
    this.puskuriPituus = 0;
    const pcm = pcm16(yhdessa, this.lahdeTaajuus, this.taajuus);
    this.ws.send(JSON.stringify({ type: 'input_audio_buffer.append', audio: base64Pcm(pcm) }));
  }

  /** Palvelimen tapahtuma (docs.x.ai Speech to Speech, Server Messages). */
  kasittele(t) {
    switch (t?.type) {
      case 'input_audio_buffer.speech_started':
        // Pelaaja puhuu Pulun päälle: soiva vastaus pois heti.
        this.vaienna();
        this.onTila('kuuntelee');
        break;
      case 'input_audio_buffer.committed':
        this.onKayttajaAlku();
        break;
      case 'conversation.item.input_audio_transcription.completed':
        this.onKayttaja(String(t.transcript ?? '').trim());
        break;
      case 'response.output_audio.delta':
      case 'response.audio.delta':
        if (t.delta) this.soita(pcmFloat(t.delta));
        this.onTila('puhuu');
        break;
      case 'response.output_audio_transcript.delta':
        if (t.delta) this.onPulu(t.delta);
        break;
      case 'response.done':
        this.onPuluValmis();
        break;
      case 'error':
        this.onVirhe(`Pulun äänilinja: ${String(t.error?.message ?? 'virhe').slice(0, 160)}`);
        break;
      default:
        break;
    }
  }

  soita(naytteet) {
    const piiri = this.ulos?.piiri;
    if (!piiri || !naytteet.length) return;
    const puskuri = piiri.createBuffer(1, naytteet.length, REALTIME_ULOS_TAAJUUS);
    puskuri.getChannelData(0).set(naytteet);
    const s = piiri.createBufferSource();
    s.buffer = puskuri;
    s.connect(this.ulos.kohde);
    const alku = Math.max(piiri.currentTime + 0.03, this.seuraava);
    s.start(alku);
    this.seuraava = alku + puskuri.duration;
    this.lahteet.add(s);
    s.onended = () => {
      this.lahteet.delete(s);
      if (!this.lahteet.size && this.kaynnissa) this.onTila('kuuntelee');
    };
  }

  vaienna() {
    for (const s of this.lahteet) {
      try { s.stop(); } catch { /* jo loppunut */ }
    }
    this.lahteet.clear();
    this.seuraava = 0;
  }

  /** Lopetus: nappi, chatin sulku, aikaraja tai virhe. Turvallinen kutsua monesti. */
  lopeta() {
    if (!this.kaynnissa) return;
    this.kaynnissa = false;
    this.siivoa();
    this.onTila('loppu');
  }

  siivoa() {
    clearTimeout(this.ajastin);
    this.ajastin = null;
    this.vaienna();
    try { this.ws?.close(); } catch { /* jo kiinni */ }
    this.ws = null;
    try { this.mikkiLahde?.disconnect(); } catch { /* ok */ }
    try { this.worklet?.disconnect(); } catch { /* ok */ }
    for (const raita of this.virta?.getTracks?.() ?? []) raita.stop();
    this.virta = null;
    try { this.mikkiKonteksti?.close?.(); } catch { /* ok */ }
    this.mikkiKonteksti = null;
  }
}
