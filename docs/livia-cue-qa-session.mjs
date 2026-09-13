import { kytkeLivianPuheEleet } from '../js/livia-puheleet.js';
import { seuraaLivianKasvoAanitetta } from '../js/livia-puhetila.js';

/**
 * Yksi uudelleen käytettävä QA-soitinistunto.
 *
 * Tuotannon seurantalohkot päättävät elinkaarensa luonnolliseen loppuun,
 * virheeseen tai emptied-tapahtumaan. Native-audion seuraava play tarvitsee
 * siksi uuden sidonnan ennen playing-tapahtumaa. Kasvopuhe sidotaan aina
 * ensin, jotta saman playing-tapahtuman cue näkee oikean puhetunnuksen.
 */
export function luoLivianQaToistokerta(audio, cues, text, {
  seuraaAanitetta = seuraaLivianKasvoAanitetta,
  kytkeCue = kytkeLivianPuheEleet,
} = {}) {
  let alive = true;
  let bound = false;
  let stopVoice = () => {};
  let stopCues = () => {};
  let waitingForPlaying = false;

  const startCues = () => {
    if (!alive || !bound || !waitingForPlaying) return;
    waitingForPlaying = false;
    audio.removeEventListener('playing', startCues);
    // Voice-kuuntelija rekisteröitiin ensin ja on jo käsitellyt saman
    // playing-tapahtuman. Nyt cue-ohjain voi sovittaa currentTimeen heti.
    stopCues = kytkeCue(audio, cues);
  };

  const bind = () => {
    if (!alive || bound) return bound;
    stopVoice = seuraaAanitetta(audio, text);
    bound = true;
    waitingForPlaying = true;
    audio.addEventListener('playing', startCues);
    return true;
  };
  const terminal = () => {
    // Tuotantomoduulien omat terminal-kuuntelijat irrottavat itsensä
    // saman tapahtuman aikana. Seuraava play rakentaa tuoreen elinkaaren.
    bound = false;
    waitingForPlaying = false;
    audio.removeEventListener('playing', startCues);
    stopVoice = () => {};
    stopCues = () => {};
  };
  const play = () => { bind(); };

  audio.addEventListener('play', play);
  for (const type of ['ended', 'error', 'emptied']) audio.addEventListener(type, terminal);
  bind();

  return {
    varmista: bind,
    kytketty: () => bound,
    tuhoa() {
      if (!alive) return;
      alive = false;
      audio.removeEventListener('play', play);
      for (const type of ['ended', 'error', 'emptied']) audio.removeEventListener(type, terminal);
      audio.removeEventListener('playing', startCues);
      waitingForPlaying = false;
      stopCues();
      stopVoice();
      bound = false;
    },
  };
}
