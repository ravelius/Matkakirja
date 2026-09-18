// CHROMIUM-LIPUT — rivikohtaiset lisäargumentit savukkeen selaimelle.
//
// Omistaja 18.9.2026 klo 18.35 (Raamattu: AGENTIT VAIN OPUS JA SONNET,
// TARKENNUS 11 kohta 24 d): *"Ajetaanko nuo aina GPU:lla vai voiko
// CPU:ta myös hyödyntää?"* — kun 12 Chromiumia ajaa yhtä aikaa, GPU on
// niiden YHTEINEN pullonkaula, kun taas Mac Studion 16 ydintä ovat
// suurimman osan ajasta vajaakäytöllä. Kevyet, pallottomat savukkeet
// voi siksi ajaa ANGLE/SwiftShaderin ohjelmallisella WebGL:llä ja
// jättää GPU raskaille pallorivistöille.
//
// ── MIKSI TÄMÄ ON ERILLINEN "SHIM" EIKÄ MUUTOS SAVUKKEISIIN ────────
//
// Savukkeita on yli 150 ja jokainen kutsuu `chromium.launch()`ia itse.
// Yhteistä käynnistysapuria EI ole, eikä sellaista voi lisätä tässä
// erässä koskematta jokaiseen tiedostoon. Tämä moduuli ladataan sen
// sijaan Noden `--import`illa ENNEN savuketta (tools/savukkeet/
// aja-sarja.mjs asettaa NODE_OPTIONSin), ja se kääriä Playwrightin
// `chromium.launch`in niin, että annetut liput lisätään `args`-listaan
// riippumatta siitä, mikä savuke ajetaan.
//
// Savuke saa yhä oman `args`-listansa: shim LISÄÄ liput perään eikä
// korvaa mitään. Jos ympäristömuuttujaa ei ole, tämä moduuli ei tee
// yhtään mitään.
//
// KÄYTTÖ:
//   SAVUKE_CHROMIUM_LIPUT="--use-gl=angle --use-angle=swiftshader"
// tai sarjat.jsonin rivikohtaisessa "env"-lohkossa (aja-sarja.mjs
// välittää sen ja kytkee shimin päälle automaattisesti).
//
// VIRHE EI SAA KAATAA SAVUKETTA: jos Playwrightia ei löydy tästä
// prosessista (eri polku, eri resoluutio), shim vaikenee ja savuke
// ajetaan aivan kuten ennenkin. Mittaus näkyy lokissa rivinä
// "INFO  chromium-liput: ...", joten hiljainen epäonnistuminen erottuu.

const liput = (process.env.SAVUKE_CHROMIUM_LIPUT ?? '')
  .split(/[,\s]+/)
  .map((s) => s.trim())
  .filter(Boolean);

if (liput.length) {
  // Sama kahden lähteen haku kuin savukkeissa itsessään: ensin repon
  // oma node_modules (bare specifier), sitten koneen oma polku.
  const lahteet = ['playwright', process.env.PLAYWRIGHT_JS].filter(Boolean);
  let osui = false;
  for (const lahde of lahteet) {
    let moduuli;
    try {
      // eslint-disable-next-line no-await-in-loop
      moduuli = await import(lahde);
    } catch {
      continue;
    }
    const chromium = moduuli?.chromium ?? moduuli?.default?.chromium;
    if (!chromium || typeof chromium.launch !== 'function') continue;
    if (chromium.__savukeLiput) { osui = true; continue; }
    const alkuperainen = chromium.launch.bind(chromium);
    chromium.launch = (asetukset = {}) => alkuperainen({
      ...asetukset,
      args: [...(asetukset.args ?? []), ...liput],
    });
    chromium.__savukeLiput = liput.join(' ');
    osui = true;
  }
  console.log(osui
    ? `INFO  chromium-liput: ${liput.join(' ')}`
    : `INFO  chromium-liput: EI KYTKETTY (Playwrightia ei löytynyt) — ${liput.join(' ')}`);
}
