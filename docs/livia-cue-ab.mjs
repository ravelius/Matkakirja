import { AANI_JUURI } from '../js/media.js';
import { LIVIAN_VERSIOIDUT_AANET } from '../js/liviapuhe.js';
import { FOKUSVIRTA_BERLIINI } from '../js/packs/fokusvirta-berliini.js';
import { FOKUSVIRTA_TROMSSA } from '../js/packs/fokusvirta-tromssa.js';
import { livianEleidenOsoite, lataaLivianPilottiEleet } from '../js/livia-puheeleet-lataus.js';
import { kuunteleLivianTilanteita } from '../js/livia-tilanteet.js';
import { livianSelityseleenVariantti } from '../js/livia-svg.js';
import { luoLivianQaToistokerta } from './livia-cue-qa-session.mjs';

const $ = (id) => document.getElementById(id);
const params = new URLSearchParams(location.search);
const runner = params.get('runner') === '1';

if (!runner) {
  const frame = $('qa-frame');
  const update = () => {
    const city = $('host-case').value;
    const motion = $('host-motion').value;
    const mobile = $('host-viewport').value === 'mobile';
    frame.classList.toggle('mobile', mobile);
    frame.src = `livia-cue-ab.html?runner=1&case=${city}&motion=${motion}`;
  };
  for (const id of ['host-case', 'host-viewport', 'host-motion']) $(id).addEventListener('change', update);
  update();
} else {
  $('host').classList.add('qa-hidden');
  $('runner').classList.remove('qa-hidden');
  document.body.dataset.qaRunner = 'true';

  const city = params.get('case') === 'tromssa' ? 'tromssa' : 'berliini';
  const reduced = params.get('motion') === 'reduced';
  const nativeMatchMedia = globalThis.matchMedia?.bind(globalThis);
  const reducedQuery = { matches: reduced, media: '(prefers-reduced-motion: reduce)', onchange: null,
    addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, dispatchEvent() { return true; } };
  globalThis.matchMedia = (query) => query === reducedQuery.media ? reducedQuery
    : nativeMatchMedia?.(query) ?? { ...reducedQuery, matches: false, media: query };

  const { asennaLivianKasvot } = await import('../js/livia-eleet.js');
  const cases = {
    berliini: { label: 'Berliini', key: 'berliini-3', text: FOKUSVIRTA_BERLIINI.pollo.kommentti[0] },
    tromssa: { label: 'Tromssa', key: 'tromssa-3', text: FOKUSVIRTA_TROMSSA.pollo.kommentti[0] },
  };
  const chosen = cases[city];
  const audio = $('audio');
  const audioUrl = `${AANI_JUURI}${LIVIAN_VERSIOIDUT_AANET[chosen.key]}`;
  const sidecarUrl = livianEleidenOsoite(audioUrl);
  $('runner-title').textContent = `${chosen.label} — oikea puheohjain`;
  $('mode').textContent = `${document.documentElement.clientWidth}px · ${reduced ? 'reduced motion' : 'tavallinen liike'}`;
  $('sources').innerHTML = `<a href="${audioUrl}">MP3</a> · <a href="${sidecarUrl}">sidecar</a>`;

  const allowedOrigin = location.origin === 'https://matkakirja.app';
  $('origin-note').textContent = allowedOrigin
    ? 'Julkaistu matkakirja.app-origin: MP3:n ja sidecarin SHA-tarkistus voi kulkea tuotannon CORS-portin läpi.'
    : `Paikallinen origin ${location.origin}: media.matkakirja.app ei salli tuotannon fetch-validointia tästä originista. Sivua ei nimetä oikean pelipolun läpäisyksi ennen julkaisua.`;

  const pollo = { doc: document, nappi: $('pulu-anchor'), paneeli: null, virta: null, auki: false, haeUi: () => ({}) };
  const face = asennaLivianKasvot(pollo);
  let session = null;
  let activeCue = null;
  let cueRate = 1;
  let raf = 0;

  const updateReadout = () => {
    const duration = Number.isFinite(audio.duration) ? audio.duration : 0;
    const current = Number(audio.currentTime) || 0;
    const progress = duration > 0 ? current / duration : 0;
    $('time').textContent = `${current.toFixed(3)} / ${duration.toFixed(3)} s · ${audio.playbackRate}× · ${audio.paused ? 'tauko' : 'soi'}`;
    $('seek').value = String(Math.round(Math.max(0, Math.min(1, progress)) * 1000));
    $('seek-out').textContent = `${Math.round(progress * 100)} %`;
    if (activeCue) {
      const cueMs = activeCue.loppuMs - activeCue.alkuMs;
      $('cue').textContent = `${activeCue.tunnus} · ${activeCue.alkuMs}–${activeCue.loppuMs} ms · ${(Math.max(0, current * 1000 - activeCue.alkuMs) / cueMs * 100).toFixed(1)} %`;
      $('variant').textContent = activeCue.ele === 'cityExplain'
        ? livianSelityseleenVariantti(cueMs, cueRate)
        : `${activeCue.ele ?? activeCue.tarkoitus} · ${activeCue.tarkoitus}`;
    } else {
      $('cue').textContent = '—';
      $('variant').textContent = 'lepo';
    }
    raf = requestAnimationFrame(updateReadout);
  };

  const detachSituations = kuunteleLivianTilanteita((kind, detail) => {
    if (detail?.puheTunnus !== audio) return;
    if (kind === 'speechCue') { activeCue = detail; cueRate = audio.playbackRate; }
    if (kind === 'speechCueEnd' && activeCue?.tunnus === detail.tunnus) activeCue = null;
  });

  const cues = await lataaLivianPilottiEleet(city, audioUrl, { kaupunki: city, kentta: 'kommentti', kupla: 0, teksti: chosen.text });
  if (cues?.length) {
    audio.src = audioUrl;
    session = luoLivianQaToistokerta(audio, cues, chosen.text);
    audio.inert = false;
    audio.removeAttribute('aria-disabled');
    $('transport').disabled = false;
    $('controller').textContent = `PASS · ${cues.length} cuea · MP3/sidecar validoitu`;
  } else {
    $('controller').textContent = 'EI KYTKETTY';
    $('error').classList.remove('qa-hidden');
    $('error').textContent = allowedOrigin
      ? 'Tuotannon MP3:n tai sidecarin tarkistus epäonnistui. Älä hyväksy liikettä tämän ajon perusteella.'
      : 'Odotettu CORS-raja paikallisoriginilla: tuotannon validaattori ei saa lukea MP3:ta ja sidecaria. Julkaistu nykyinen sivu on vielä vanha simulaatio; oikea ajo edellyttää tämän täydennyksen erillistä julkaisupäätöstä.';
  }

  $('play').addEventListener('click', () => {
    session?.varmista();
    return audio.play().catch((error) => {
    $('error').classList.remove('qa-hidden');
    $('error').textContent = `Toisto ei käynnistynyt: ${error?.message ?? error}`;
    });
  });
  $('pause').addEventListener('click', () => audio.pause());
  for (const button of document.querySelectorAll('[data-rate]')) button.addEventListener('click', () => {
    audio.playbackRate = Number(button.dataset.rate);
  });
  $('seek').addEventListener('input', () => {
    if (Number.isFinite(audio.duration)) audio.currentTime = audio.duration * Number($('seek').value) / 1000;
  });
  updateReadout();
  addEventListener('pagehide', () => {
    cancelAnimationFrame(raf);
    audio.pause();
    session?.tuhoa();
    detachSituations();
    face?.tuhoa?.();
  }, { once: true });
}
