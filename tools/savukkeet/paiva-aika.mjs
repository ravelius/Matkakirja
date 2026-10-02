// WEBKIT PÄIVÄLLÄ CHROMIUMILLA (Päätoimittaja 30.9.2026): onko nyt päivä (07–22 Helsingin aikaa)? aja-sarja.mjs ohjaa
// päiväsaikaan WebKit-rivit Chromiumiin (WebKitillä ei ole --mute-audio-lippua), ellei WEBKIT_PAKOTA=1.
export function paivaAika(nyt = new Date()) {
  const tunti = Number(new Intl.DateTimeFormat('fi-FI', { timeZone: 'Europe/Helsinki', hour: '2-digit', hourCycle: 'h23' }).format(nyt));
  return tunti >= 7 && tunti < 22;
}

/** Ajetaanko WebKit-rivit Chromiumilla päivän takia. */
export function webkitChromiumilla(ymp = process.env, nyt = new Date()) {
  return paivaAika(nyt) && ymp.WEBKIT_PAKOTA !== '1';
}
