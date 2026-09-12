import { ilmoitaLivianPuheEle, ilmoitaLivianTilanne, livianPuheeleenTiedot } from './livia-tilanteet.js';

/*
 * LIVIAN OMAN PUHEEN AIKAJANA.
 *
 * Kutsuja antaa vain lopulliseen äänitteeseen kohdistetut millisekunnit.
 * Tämä moduuli ei arvioi hetkiä tekstin pituudesta eikä yritä käyttää
 * ElevenLabsin tunnetageja eleiden niminä. Teksti- ja äänitiivisteen
 * tarkistus kuuluu kohdistusdatan lataajalle ennen tätä rajapintaa.
 */

/** CityExplain palaa lepoankkuriin viimeistään tässä ajassa. */
export const LIVIAN_PUHEELEEN_MAX_MS = 6200;

/** Tarkista ja järjestä yksi jo kohdistettu puhe-elelista. Virheessä hiljaisuus. */
export function tarkistaLivianPuheEleet(eleet) {
  if (!Array.isArray(eleet) || !eleet.length) return [];
  const tunnukset = new Set();
  const rivit = [];
  for (const raaka of eleet) {
    const id = String(raaka?.id ?? '');
    const alku = raaka?.alku;
    const loppu = raaka?.loppu;
    const tiedot = livianPuheeleenTiedot(raaka);
    if (!id || tunnukset.has(id) || !tiedot
      || !Number.isInteger(alku) || !Number.isInteger(loppu)
      || alku < 0 || loppu <= alku
      || loppu - alku > LIVIAN_PUHEELEEN_MAX_MS) return [];
    tunnukset.add(id);
    rivit.push({ id, alku, loppu, tarkoitus: tiedot.tarkoitus, voimakkuus: tiedot.voimakkuus });
  }
  rivit.sort((a, b) => a.alku - b.alku);
  for (let i = 1; i < rivit.length; i += 1) {
    if (rivit[i].alku < rivit[i - 1].loppu) return [];
  }
  return rivit;
}

/**
 * Kytke kohdistetut eleet HTMLAudioElementin omaan kelloon.
 * Tauko/puskurointi/kelaus lopettaa eleen heti. Seeked ja jatko sovittavat
 * nykyhetkeen ilman väliin jääneiden cueiden purkamista jälkikäteen.
 */
export function kytkeLivianPuheEleet(audio, eleet, { voimassa = () => true } = {}) {
  const rivit = tarkistaLivianPuheEleet(eleet);
  if (!audio?.addEventListener || !rivit.length) return () => {};
  let elossa = true;
  let soiva = false;
  let aktiivinen = null;

  const nyt = () => Math.round((Number(audio.currentTime) || 0) * 1000);
  const riviHetkella = (hetki) => rivit.find((rivi) => rivi.alku <= hetki && hetki < rivi.loppu) ?? null;
  const paata = () => {
    if (!aktiivinen) return;
    ilmoitaLivianTilanne('speechCueEnd', {
      tunnus: aktiivinen.id,
      puheTunnus: audio,
      lahde: 'livia-puhe',
    });
    aktiivinen = null;
  };
  const aloita = (rivi) => {
    if (!rivi || aktiivinen?.id === rivi.id) return;
    paata();
    const tulos = ilmoitaLivianPuheEle(rivi, {
      tunnus: rivi.id,
      puheTunnus: audio,
      lahde: 'livia-puhe',
    });
    if (tulos) aktiivinen = rivi;
  };
  const sovita = () => {
    if (!elossa) return;
    if (!voimassa()) { pura(); return; }
    if (!soiva || audio.paused || audio.ended || audio.muted || !(audio.volume > 0)) { paata(); return; }
    const rivi = riviHetkella(nyt());
    if (!rivi) paata();
    else aloita(rivi);
  };
  const alkoi = () => { soiva = true; sovita(); };
  const tauko = () => { soiva = false; paata(); };
  const kelaus = () => { paata(); };
  const loppu = () => { tauko(); irrota(); };
  const tapahtumat = {
    playing: alkoi,
    timeupdate: sovita,
    ratechange: sovita,
    volumechange: sovita,
    seeking: kelaus,
    seeked: sovita,
    pause: tauko,
    waiting: tauko,
    stalled: tauko,
    ended: loppu,
    error: loppu,
    emptied: loppu,
  };
  for (const [nimi, kuuntelija] of Object.entries(tapahtumat)) audio.addEventListener(nimi, kuuntelija);
  function irrota() {
    if (!elossa) return;
    elossa = false;
    for (const [nimi, kuuntelija] of Object.entries(tapahtumat)) audio.removeEventListener(nimi, kuuntelija);
  }
  function pura() { paata(); irrota(); }
  return pura;
}
